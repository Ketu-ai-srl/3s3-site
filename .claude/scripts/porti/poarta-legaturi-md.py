#!/usr/bin/env python3
"""Legaturile si citarile din markdown se rezolva pe disc, nu doar in intentie.

DE CE EXISTA. Poarta de legaturi care ruleaza azi (`tests/browser/legaturi-imagini.spec.ts`)
masoara HTML-ul LIVRAT: prinde legaturile moarte de pe site si nu are cum sa vada documentatia,
fiindca documentatia nu se randeaza. Iar acolo deriva e deja masurata: la citirea harness-ului
Serenity (2026-09-06) s-au gasit `dev-implementer.md:81` si `docs/agents/fabrica-3s.md:119`
descriind un lant de 5 pasi cand `package.json:16` avea 7, si `CONTEXT.md:14` trimitand la un
`docs/agents/factory-model.md` care nu exista. O citare care atarna in gol nu crapa nimic: se
citeste ca dovada si e o afirmatie fara acoperire. La ei aceeasi clasa a produs 62 de citari
catre un fisier de reguli sters din depozit.

CE PRINDE, in fisierele `.md` din `docs/**`, `.claude/rules/*.md`, `CONTEXT.md`, `README.md`,
`CLAUDE.md`:
  LG-01  legatura `[text](cale)` catre un fisier care nu exista pe disc
  LG-02  citare `cale/fisier.ext:NN` (sau `:NN-MM`) catre un fisier care nu exista
  LG-03  citare catre o linie de dincolo de sfarsitul fisierului
  LG-04  interval intors (`:120-90`)
  LG-05  citare ale carei linii sunt TOATE goale - fisierul si linia exista, dar nu sustin nimic

CUM DECIDE. Citeste, nu scrie. Legaturile se rezolva relativ la directorul fisierului care le
contine, ca in orice cititor de markdown. Citarile se rezolva intai de la radacina depozitului
(asa se scriu in rapoarte si asa le tipareste `grep -n`), si abia apoi relativ la fisier. Se sar:
schemele externe (`http:`, `https:`, `mailto:`), ancorele pure (`#ceva`) si tintele cu protocol.
Fragmentul `#ancora` de la capatul unei legaturi se taie inainte de rezolvare.

CE NU VERIFICA (reziduuri - un zero de aici nu inseamna acoperire)
  - Ancorele: `[x](fisier.md#sectiune)` se verifica pana la FISIER; daca `#sectiune` nu exista
    in el, poarta tace. Titlurile markdown nu se normalizeaza uniform intre randatoare.
  - Caile scrise doar cu accente grave, fara paranteze si fara `:NN` - forma majoritara in
    `CONTEXT.md` si `README.md` (207 candidati masurati, 14 fara fisier pe disc, din care 13
    sunt gazde, depozite si cai de URL, nu fisiere). O poarta care le-ar cere ar fi zgomotoasa
    de la prima rulare, si o poarta zgomotoasa e dezarmata in cateva saptamani.
  - Legaturile externe: nu se face nicio cerere de retea. O adresa moarta pe internet nu se
    vede de aici.
  - CONTINUTUL liniei citate: poarta cere sa existe si sa nu fie goala, nu ca ea sa spuna ce
    pretinde citarea. Un `fisier.py:40` mutat cu doua randuri trece.
  - Imaginile `![](...)` intra pe acelasi tipar ca legaturile, deci sunt acoperite; `<img src>`
    scris in HTML brut in markdown NU e.

LA ROSU: CE AI VOIE SA EDITEZI
  - Fisierul `.md` al feliei tale: corectezi calea sau numarul de linie, ori stergi citarea.
  - NU ai voie sa creezi fisierul-tinta doar ca sa treaca poarta, si nu ai voie sa adaugi un
    rand intr-un fisier al altei felii ca sa nu mai fie goala linia citata. Daca citarea
    trimite in codul altcuiva si s-a mutat, se recalculeaza numarul, nu se muta codul.
  - NU ai voie: corpul portii, tiparele, lista de fisiere scanate, martorii.

IESIRE: 0 curat - 1 legaturi sau citari care nu se rezolva - 2 folosire gresita - 3 control
picat sau preconditie lipsa
"""
import glob
import io
import os
import re
import shutil
import sys
import tempfile

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

RADACINA = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

FISIERE_RADACINA = ('CONTEXT.md', 'README.md', 'CLAUDE.md')
SARITE = {'node_modules', '.next', '.git', 'dist', 'build', '__pycache__'}
SCHEME = ('http:', 'https:', 'mailto:', 'tel:', 'ftp:', 'data:')

# `[text](tinta)`, cu titlul optional dintre ghilimele. Tinta nu are voie sa contina spatii:
# formele cu paranteze scapate nu apar in proiect si le-as prinde gresit.
TIPAR_LEGATURA = re.compile(r'\[[^\]]*\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)')

# `cale/fisier.ext:NN` sau `cale/fisier.ext:NN-MM`. Extensia e obligatorie: fara ea, orice
# `ora 10:30` ar deveni citare. Grupul din fata refuza sa inceapa dupa `/` sau `:`, ca sa nu
# decupez coada unui URL (`https://gazda:8080/x.ts:12` ramane afara).
TIPAR_CITARE = re.compile(
    r'(?<![\w/:.-])([A-Za-z0-9_][A-Za-z0-9_./-]*\.[A-Za-z][A-Za-z0-9]{0,4}):(\d+)(?:-(\d+))?(?![\w.-])'
)


# --- extractoare pure ------------------------------------------------------------------------

def legaturi_din_text(text):
    """[(numar_linie, tinta)] pentru fiecare `[text](tinta)` care merita rezolvat pe disc."""
    gasite = []
    for n, rand in enumerate(text.splitlines(), start=1):
        for tinta in TIPAR_LEGATURA.findall(rand):
            if tinta.startswith('#') or '://' in tinta:
                continue
            if tinta.lower().startswith(SCHEME):
                continue
            gasite.append((n, tinta))
    return gasite


def citari_din_text(text):
    """[(numar_linie, cale, de_la, pana_la)]; `pana_la` e None cand citarea e pe o linie."""
    gasite = []
    for n, rand in enumerate(text.splitlines(), start=1):
        for cale, de_la, pana_la in TIPAR_CITARE.findall(rand):
            gasite.append((n, cale, int(de_la), int(pana_la) if pana_la else None))
    return gasite


def verifica_interval(de_la, pana_la, randuri):
    """Ce e in neregula cu (de_la, pana_la) fata de `randuri` (lista de linii, fara terminator).

    Intoarce lista de (cod, explicatie). Goala = citarea sta pe text real.
    """
    gasite = []
    sfarsit = pana_la if pana_la is not None else de_la
    if pana_la is not None and pana_la < de_la:
        gasite.append(('LG-04', 'interval intors: ' + str(de_la) + '-' + str(pana_la)))
        return gasite
    if de_la < 1:
        gasite.append(('LG-03', 'numar de linie sub 1'))
        return gasite
    if sfarsit > len(randuri):
        gasite.append(('LG-03', 'fisierul are ' + str(len(randuri)) + ' linii, citarea cere ' +
                       str(sfarsit)))
        return gasite
    felie = randuri[de_la - 1:sfarsit]
    if all(not r.strip() for r in felie):
        gasite.append(('LG-05', 'toate cele ' + str(len(felie)) +
                       ' linii citate sunt goale - citarea nu sustine nimic'))
    return gasite


# --- controale -------------------------------------------------------------------------------

def controale():
    """Martori pe fixturi asamblate la rulare; specimenul se CALCULEAZA, nu se scrie de mana.

    Ancora externa: numerele de linie de mai jos sunt copiate verbatim din constatarea scrisa in
    `plan/FABRICA-LECTII-SERENITY.md` §2.6 din depozitul fabricii - `dev-implementer.md:81`,
    `docs/agents/fabrica-3s.md:119`, `package.json:16` - scrise de un om, in alt depozit decat
    codul de fata. Daca tiparul de citare deriva, nu poate deriva impreuna cu ele. Forma e cea
    pe care o tipareste `grep -n` si o inteleg compilatoarele: `cale:linie`.
    """
    ancore = citari_din_text('vezi `dev-implementer.md:81` si `docs/agents/fabrica-3s.md:119` '
                             'cand `package.json:16` are 7')
    asteptat = [(1, 'dev-implementer.md', 81, None),
                (1, 'docs/agents/fabrica-3s.md', 119, None),
                (1, 'package.json', 16, None)]
    if ancore != asteptat:
        return ('ancora externa: din citarile scrise in FABRICA-LECTII-SERENITY §2.6 am citit ' +
                repr(ancore) + ' in loc de ' + repr(asteptat))

    # martor negativ pe extragere: ce NU e citare nu are voie sa devina una
    zgomot = citari_din_text('sedinta la 10:30, https://gazda:8080/x, versiunea 1.2:3')
    if zgomot:
        return 'martor negativ: text fara citari a produs ' + repr(zgomot)
    interval = citari_din_text('vezi `lib.sh:154-163`')
    if interval != [(1, 'lib.sh', 154, 163)]:
        return 'martorul de extragere: intervalul `lib.sh:154-163` citit ca ' + repr(interval)

    legaturi = legaturi_din_text('[a](docs/adr/ADR-0001-stiva-si-medii.md) [b](#sus) '
                                 '[c](https://3s.ke2.in) [d](../CONTEXT.md#glosar)')
    if legaturi != [(1, 'docs/adr/ADR-0001-stiva-si-medii.md'), (1, '../CONTEXT.md#glosar')]:
        return 'martorul de extragere: legaturile citite ca ' + repr(legaturi)

    # martori pe interval, pe un specimen fabricat aici
    randuri = ['unu', '', 'trei']
    if verifica_interval(2, None, randuri) == []:
        return 'martor pozitiv LG-05: o citare pe o linie goala nu a fost prinsa'
    if not any(c == 'LG-03' for c, _ in verifica_interval(len(randuri) + 1, None, randuri)):
        return 'martor pozitiv LG-03: o citare dincolo de sfarsitul fisierului nu a fost prinsa'
    if not any(c == 'LG-04' for c, _ in verifica_interval(3, 1, randuri)):
        return 'martor pozitiv LG-04: un interval intors nu a fost prins'
    if verifica_interval(1, 3, randuri):
        return 'martor negativ: un interval valid peste text real a fost raportat'
    if verifica_interval(3, None, randuri):
        return 'martor negativ: o citare pe o linie plina a fost raportata'
    if verifica_interval(1, 2, randuri):
        return ('martor negativ: un interval in care doar UNA din linii e goala nu e defect - '
                'poarta cere ca TOATE sa fie goale')

    # martor pozitiv cap la cap, prin acelasi drum ca masuratoarea reala: fisier pe disc,
    # citari extrase din el, rezolvate si verificate. Numerele de linie se CALCULEAZA din
    # lungimea reala a specimenului; scrise de mana ar fi devenit false la prima editare.
    lucru = tempfile.mkdtemp(prefix='poarta-legaturi-')
    try:
        tinta_rel = 'docs/specimen.md'
        tinta_abs = os.path.join(lucru, 'docs', 'specimen.md')
        os.makedirs(os.path.dirname(tinta_abs))
        corp = ['# Specimen', '', 'un rand cu text', '', '']
        io.open(tinta_abs, 'w', encoding='utf-8', newline='\n').write('\n'.join(corp) + '\n')
        randuri_tinta = io.open(tinta_abs, encoding='utf-8').read().splitlines()
        linie_goala = next(i + 1 for i, r in enumerate(randuri_tinta) if not r.strip())
        linie_plina = next(i + 1 for i, r in enumerate(randuri_tinta) if r.strip())
        dincolo = len(randuri_tinta) + 1

        document = ('vezi ' + tinta_rel + ':' + str(linie_goala) + ' si ' +
                    tinta_rel + ':' + str(dincolo) + ' si ' +
                    tinta_rel + ':' + str(linie_plina) + ' si docs/lipsa.md:3 si [x](' +
                    tinta_rel + ') si [y](docs/inexistent.md)\n')
        cale_doc = os.path.join(lucru, 'RAPORT.md')
        io.open(cale_doc, 'w', encoding='utf-8', newline='\n').write(document)

        gasiri = masoara_fisier(cale_doc, lucru)
        coduri = sorted(set(c for c, _ in gasiri))
        if coduri != ['LG-01', 'LG-02', 'LG-03', 'LG-05']:
            return ('martorul cap la cap: pe specimenul fabricat asteptam exact LG-01, LG-02, '
                    'LG-03 si LG-05, si am primit ' + repr(coduri) + ' (linie goala ' +
                    str(linie_goala) + ', dincolo de sfarsit ' + str(dincolo) + ')')
        citare_plina = tinta_rel + ':' + str(linie_plina)
        if any(c == 'LG-05' and citare_plina in m for c, m in gasiri):
            return ('martorul cap la cap: citarea catre linia cu text (' + citare_plina +
                    ') a fost raportata ca goala')
        if len(gasiri) != 4:
            return ('martorul cap la cap: asteptam exact patru constatari pe specimen si am '
                    'primit ' + str(len(gasiri)) + ' - ' + repr(gasiri))
    finally:
        shutil.rmtree(lucru, ignore_errors=True)
    return None


# --- masuratoarea ------------------------------------------------------------------------------

def fisiere_de_scanat(radacina):
    gasite = []
    for nume in FISIERE_RADACINA:
        cale = os.path.join(radacina, nume)
        if os.path.isfile(cale):
            gasite.append(cale)
    gasite.extend(sorted(glob.glob(os.path.join(radacina, '.claude', 'rules', '*.md'))))
    dosar_docs = os.path.join(radacina, 'docs')
    if os.path.isdir(dosar_docs):
        for rad, directoare, nume in os.walk(dosar_docs):
            directoare[:] = [d for d in directoare if d not in SARITE]
            for n in sorted(nume):
                if n.endswith('.md'):
                    gasite.append(os.path.join(rad, n))
    return gasite


def rezolva_legatura(tinta, cale_document, radacina):
    curat = tinta.split('#', 1)[0].split('?', 1)[0]
    if not curat:
        return None, True  # doar ancora, nimic de rezolvat
    candidat = os.path.normpath(os.path.join(os.path.dirname(cale_document), curat))
    if os.path.exists(candidat):
        return candidat, True
    return candidat, False


def rezolva_citare(cale, cale_document, radacina):
    """Intai de la radacina depozitului, apoi relativ la document. Intoarce calea sau None."""
    for candidat in (os.path.normpath(os.path.join(radacina, cale)),
                     os.path.normpath(os.path.join(os.path.dirname(cale_document), cale))):
        if os.path.isfile(candidat):
            return candidat
    return None


def masoara_fisier(cale_document, radacina):
    """[(cod, mesaj)] pentru un singur fisier markdown."""
    gasiri = []
    rel_doc = os.path.relpath(cale_document, radacina).replace(os.sep, '/')
    text = io.open(cale_document, encoding='utf-8', errors='replace').read()

    for linie, tinta in legaturi_din_text(text):
        candidat, exista = rezolva_legatura(tinta, cale_document, radacina)
        if candidat is not None and not exista:
            gasiri.append(('LG-01', rel_doc + ':' + str(linie) + ' legatura `' + tinta +
                           '` nu se rezolva pe disc'))

    memorie = {}
    for linie, cale, de_la, pana_la in citari_din_text(text):
        tinta = rezolva_citare(cale, cale_document, radacina)
        interval = str(de_la) + ('-' + str(pana_la) if pana_la is not None else '')
        if tinta is None:
            gasiri.append(('LG-02', rel_doc + ':' + str(linie) + ' citarea `' + cale + ':' +
                           interval + '` trimite la un fisier care nu exista'))
            continue
        if tinta not in memorie:
            try:
                memorie[tinta] = io.open(tinta, encoding='utf-8', errors='replace').read().splitlines()
            except (IOError, OSError):
                memorie[tinta] = None
        randuri = memorie[tinta]
        if randuri is None:
            gasiri.append(('LG-02', rel_doc + ':' + str(linie) + ' citarea `' + cale + ':' +
                           interval + '` trimite la un fisier care nu poate fi citit'))
            continue
        for cod, explicatie in verifica_interval(de_la, pana_la, randuri):
            gasiri.append((cod, rel_doc + ':' + str(linie) + ' citarea `' + cale + ':' +
                           interval + '`: ' + explicatie))
    return gasiri


def main():
    motiv = controale()
    if motiv:
        print('CONTROL PICAT: ' + motiv, file=sys.stderr)
        return 3

    fisiere = fisiere_de_scanat(RADACINA)
    if not fisiere:
        print('poarta-legaturi-md: zero fisiere .md de scanat - NEMASURAT, nu curat',
              file=sys.stderr)
        return 3
    nume = set(os.path.basename(f) for f in fisiere)
    for obligatoriu in ('README.md', 'CONTEXT.md'):
        if obligatoriu not in nume:
            print('poarta-legaturi-md: ' + obligatoriu + ' nu e in lista scanata; culegerea de '
                  'fisiere masoara altceva decat crede - NEMASURAT', file=sys.stderr)
            return 3

    gasiri = []
    legaturi = 0
    citari = 0
    for f in fisiere:
        text = io.open(f, encoding='utf-8', errors='replace').read()
        legaturi += len(legaturi_din_text(text))
        citari += len(citari_din_text(text))
        gasiri.extend(masoara_fisier(f, RADACINA))

    for cod, mesaj in sorted(gasiri):
        print('OPRESTE  ' + cod + '  ' + mesaj)

    print('CONTROALE: ancora externa (citari din FABRICA-LECTII-SERENITY §2.6) OK, martori '
          'LG-03/LG-04/LG-05 OK, martori negativi OK, martor cap la cap pe specimen fabricat OK')
    print('MASURAT: ' + str(len(fisiere)) + ' fisiere .md, ' + str(legaturi) +
          ' legaturi interne, ' + str(citari) + ' citari cu numar de linie')
    if legaturi == 0 and citari == 0:
        print('ATENTIE: zero subiecte in arbore. Verdictul e curat fiindca nu exista inca nicio '
              'legatura interna si nicio citare cu numar de linie in cele ' + str(len(fisiere)) +
              ' fisiere scanate, nu fiindca ar fi fost verificate. Ca poarta chiar cauta o arata '
              'martorul cap la cap, care trece prin exact aceeasi functie de masurare.')
    print('PROBLEME: ' + str(len(gasiri)))
    print('REZIDUURI: ancorele `#sectiune` neverificate · caile scrise doar cu accente grave '
          '(fara paranteze si fara :NN) nu se rezolva - ar fi zgomot masurat · adresele externe '
          'nu se ating · continutul liniei citate nu se compara cu ce pretinde citarea')
    return 1 if gasiri else 0


if __name__ == '__main__':
    sys.exit(main())
