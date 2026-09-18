#!/usr/bin/env python3
"""Poarta de regresie a probelor: numarul de teste si de asertiuni nu scade tacut.

CLASA DE DEFECT PE CARE O INCHIDE. O suita de teste e singura poarta care creste
odata cu produsul, si singura pe care e cel mai ieftin sa o slabesti: stergi un
fisier, comentezi doua cazuri, pui `.skip` pe unul care s-a inrosit - si totul
ramane verde, fiindca ce a mai ramas trece. Nicio unealta din lant nu se plange.
Poarta asta numara, compara cu un prag scris intr-un fisier de referinta, si
refuza scaderea. Coborarea ramane posibila, dar devine VIZIBILA: trebuie scrisa
in fisierul de referinta, in acelasi commit cu stergerea.

DE CE COMPARA CU DOUA PRAGURI, nu cu unul. Daca ar compara doar cu valoarea din
fisierul de lucru, cine sterge un test ar cobori si pragul in aceeasi mana, iar
poarta ar fi verde fara ca nimeni sa fi vazut ceva. Deci se compara si cu
valoarea din HEAD, adica cu ce a fost ULTIMA DATA acceptat de echipa. O scadere
fata de HEAD trece numai daca fisierul de referinta e modificat in schimbarea
curenta - adica daca omul a scris explicit "cobor pragul, uite de ce".

DE CE NUMARA SI TESTELE SARITE. `.skip` si `.todo` lasa fisierul, functia si
numarul de linii pe loc, si scot exact ce conta. Un contor care nu le vede se
pacaleste cu doua caractere. Pragul lor implicit e zero.

CODURI. `R-01` fisiere, `R-02` teste active, `R-03` asertiuni, `R-04` teste
sarite. NU sunt din PORTI-FABRICA.md - documentul nu contine o poarta de
regresie a probelor - si nu se citeaza ca si cum ar fi.

CONTROALE, la fiecare rulare, pe DOUA niveluri, fiindca poarta are doua piese:
  contorul   un arbore de teste fabricat la rulare, cu numar CUNOSCUT de cazuri,
             inclusiv unul comentat si unul sarit; daca cifrele nu ies exact,
             verdictul e 3 (NEMASURAT). Fara asta, un contor care intoarce mereu
             zero ar face comparatorul sa para ca lucreaza.
  comparatorul  trei martori: scadere ascunsa (trebuie sa opreasca), crestere
             (trebuie sa treaca), si coborare declarata in acelasi commit
             (trebuie sa TREACA - martorul care apara munca legitima).

CE NU VERIFICA (reziduuri)
Intrebarea pe care o pune de fapt: "cate fisiere de proba, cate apeluri de caz, cate apeluri
de asertiune si cate cazuri sarite sunt in arbore, si sunt mai putine decat pragul?"
  - Nu ruleaza nimic. Un test care pica, unul gol si unul care afirma ceva fals se numara la
    fel ca unul bun. Poarta apara CANTITATEA, nu adevarul probelor.
  - Nu masoara acoperirea: cinci asertiuni pe acelasi lucru cantaresc cat cinci pe lucruri
    diferite. Contorul poate creste fara ca protectia sa creasca.
  - Numararea e pe TIPARE. Un caz generat intr-o bucla, un ajutor care ascunde asertiunea, sau
    un cadru de test cu alte cuvinte-cheie nu se numara.
  - Comentariile de linie se scot doar cand semnul INCEPE randul; o asertiune comentata la
    coada unui rand se numara in continuare.
  - Doar arborele tests/, doar extensiile din EXTENSII_PROBA. Probele Python ale portilor nu
    intra in niciun contor de aici.
  - Cand git nu raspunde, pragul din HEAD lipseste si a doua comparatie - cea care prinde
    coborarea pragului de aceeasi mana - pur si simplu nu se face.

LA ROSU: CE AI VOIE SA EDITEZI
  DA  probele insesi, scrise la loc.
      Fisierul de praguri, cu cifra COBORATA in acelasi commit cu stergerea si cu motivul in
      campul care ii e destinat. Ridicarea pragului la cifra masurata e libera.
  NU  TIPAR_TEST, TIPAR_TEST_SARIT, TIPAR_ASERTIUNE, fara_comentarii, verdict(), ridicarea lui
      sarite_maxim peste zero, controale().

IESIRE
    0 = curat (avertismentele se tiparesc, dar nu opresc)
    1 = regresie
    2 = eroare de folosire
    3 = NEMASURAT: control picat, lipsa fisierului de referinta, zero teste gasite
"""
import argparse
import json
import os
import re
import subprocess
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

RADACINA_IMPLICITA = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
REFERINTA_IMPLICITA = os.path.join('.claude', 'scripts', 'porti', 'probe', 'praguri-regresie.json')

OPRESTE = 'OPRESTE'
AVERT = 'AVERT'

EXTENSII_PROBA = ('.test.ts', '.test.tsx', '.test.js', '.spec.ts', '.spec.tsx', '.spec.js')
SARITE_DOSAR = {'node_modules', '.git', '__pycache__', '.next'}

# Comentariile de linie se scot NUMAI cand `//` incepe randul. Un `//` din
# mijlocul randului e aproape intotdeauna intr-o adresa (`https://`), iar
# taierea de acolo pana la capat ar sterge un `expect(` real de pe acelasi rand.
# Aici pierderea unui comentariu la coada randului nu costa nimic; pierderea unei
# asertiuni costa un fals verde.
TIPAR_COMENTARIU_BLOC = re.compile(r'/\*.*?\*/', re.S)
TIPAR_COMENTARIU_RAND = re.compile(r'^[ \t]*//.*$', re.M)

TIPAR_TEST_SARIT = re.compile(r'\b(?:it|test)\s*\.\s*(?:skip|todo|failing)\s*(?:\.\s*each\s*)?[(`]|\bx(?:it|test)\s*\(')
TIPAR_TEST = re.compile(r'\b(?:it|test)\s*(?:\.\s*(?:each|concurrent|only|skip|todo|failing)\s*)*[(`]')
TIPAR_ASERTIUNE = re.compile(r'\bexpect\s*\(')


def fara_comentarii(text):
    return TIPAR_COMENTARIU_RAND.sub('', TIPAR_COMENTARIU_BLOC.sub(' ', text))


def fisiere_proba(radacina, dosar='tests'):
    baza = os.path.join(radacina, dosar)
    gasite = []
    if not os.path.isdir(baza):
        return gasite
    for r, directoare, nume in os.walk(baza):
        directoare[:] = [d for d in directoare if d not in SARITE_DOSAR]
        for n in nume:
            if n.endswith(EXTENSII_PROBA):
                gasite.append(os.path.join(r, n))
    return sorted(gasite)


def numara(radacina, dosar='tests'):
    """Intoarce dictionarul masurat. Aceeasi functie ruleaza pe depozitul real si
    pe arborele fabricat pentru control - un contor probat prin alt cod nu e probat."""
    cai = fisiere_proba(radacina, dosar)
    teste = sarite = asertiuni = 0
    for cale in cai:
        text = fara_comentarii(open(cale, encoding='utf-8', errors='replace').read())
        s = len(TIPAR_TEST_SARIT.findall(text))
        t = len(TIPAR_TEST.findall(text))
        sarite += s
        # `it.skip(` se potriveste si cu tiparul general: se scade, ca sa ramana
        # in `teste` doar cazurile care chiar ruleaza.
        teste += t - s
        asertiuni += len(TIPAR_ASERTIUNE.findall(text))
    return {'fisiere': len(cai), 'teste': teste, 'asertiuni': asertiuni, 'sarite': sarite}


def git(radacina, *argumente):
    """Git-ul se apeleaza cu lista de argumente si cu MSYS_NO_PATHCONV: pe Windows,
    `git show HEAD:cale` primeste altfel o cale convertita si iese cu 128."""
    mediu = dict(os.environ)
    mediu['MSYS_NO_PATHCONV'] = '1'
    try:
        r = subprocess.run(['git', '-C', radacina] + list(argumente),
                           capture_output=True, text=True, encoding='utf-8', errors='replace', env=mediu)
    except OSError:
        return None
    if r.returncode != 0:
        return None
    return r.stdout


def prag_din_head(radacina, cale_relativa):
    """Valoarea acceptata ultima data. None daca nu exista git sau fisierul e nou."""
    iesire = git(radacina, 'show', 'HEAD:' + cale_relativa.replace(os.sep, '/'))
    if iesire is None:
        return None
    try:
        return json.loads(iesire)
    except ValueError:
        return None


def referinta_modificata(radacina, cale_relativa):
    """Adevarat daca fisierul de referinta e schimbat fata de HEAD - in index sau
    in arborele de lucru. Asta e "in acelasi commit" vazut dinainte de commit."""
    iesire = git(radacina, 'status', '--porcelain', '--', cale_relativa.replace(os.sep, '/'))
    if iesire is None:
        return None
    return bool(iesire.strip())


def verdict(masurat, prag_lucru, prag_head, ref_modificat, nume_referinta):
    """Comparatorul, pur si probabil separat de citirea de pe disc."""
    g = []
    campuri = (('fisiere', 'R-01', 'fisiere de proba'),
               ('teste', 'R-02', 'teste active'),
               ('asertiuni', 'R-03', 'asertiuni'))

    maxim_sarite = int(prag_lucru.get('sarite_maxim', 0))
    if masurat['sarite'] > maxim_sarite:
        g.append((OPRESTE, 'R-04', str(masurat['sarite']) + ' teste sarite (.skip/.todo/xit), maxim admis '
                  + str(maxim_sarite) + '. Un test sarit lasa fisierul pe loc si scoate exact ce conta'))

    for camp, cod, eticheta in campuri:
        acum = masurat[camp]
        cerut = int(prag_lucru.get(camp, 0))
        anterior = None if prag_head is None else int(prag_head.get(camp, 0))

        # 1. Masuratoarea sub pragul declarat. Asta e regresia propriu-zisa: cineva
        # a sters sau a golit o proba si nu a atins fisierul de referinta.
        if acum < cerut:
            g.append((OPRESTE, cod, eticheta + ': ' + str(acum) + ' masurate, pragul declarat in '
                      + nume_referinta + ' e ' + str(cerut)
                      + '. Daca stergerea e voita, coboara pragul in acelasi commit'))
            continue

        # 2. Pragul insusi e mai mic decat cel acceptat la ultimul commit. Se compara
        # PRAGURILE, nu masuratorile: cine sterge un test isi coboara si pragul in
        # aceeasi mana, si atunci punctul 1 nu mai vede nimic. Ce ramane vizibil e
        # ca podeaua a fost lasata mai jos, si asta trebuie sa fie in acelasi commit.
        if anterior is not None and cerut < anterior:
            if ref_modificat:
                g.append((AVERT, cod, eticheta + ': coborare DECLARATA a pragului, de la ' + str(anterior)
                          + ' la ' + str(cerut) + '; ' + nume_referinta + ' e modificat in aceeasi schimbare'))
            else:
                g.append((OPRESTE, cod, eticheta + ': pragul din ' + nume_referinta + ' e ' + str(cerut)
                          + ', sub cel din HEAD (' + str(anterior) + '), iar fisierul NU apare in schimbarea '
                          'curenta. O podea coborata pe alta cale decat un commit vizibil nu se accepta'))

        # 3. Masuratoarea peste prag: nu e defect, e prag ramas in urma.
        if acum > cerut:
            g.append((AVERT, cod, eticheta + ': ' + str(acum) + ' masurate peste pragul de ' + str(cerut)
                      + '; ridica pragul in ' + nume_referinta + ' ca sa apere ce ai scris'))
    return g


# ---------------------------------------------------------------- martorii

def scrie(cale, continut):
    os.makedirs(os.path.dirname(cale), exist_ok=True)
    # newline='\n' explicit: un \r intr-un fisier intermediar scris pe Windows
    # face potrivirea sa depinda de pozitia elementului in fisier.
    with open(cale, 'w', encoding='utf-8', newline='\n') as f:
        f.write(continut)


def fabrica_probe(dosar):
    """Arbore cu numar CUNOSCUT: 2 fisiere, 3 teste active, 1 sarit, 5 asertiuni.

    Se asambleaza din bucati la rulare. Un fisier de proba fabricat si lasat pe
    disc ar fi numarat de poarta insasi la urmatoarea rulare - poarta si-ar
    fabrica singura pragul.
    """
    it = 'it'
    ex = 'expect'
    unu = '\n'.join([
        "import { describe, " + ex + ", " + it + " } from 'vitest'",
        "describe('unu', () => {",
        "  " + it + "('a', () => { " + ex + "(1).toBe(1); " + ex + "(2).toBe(2) })",
        "  " + it + "('b', () => { " + ex + "(3).toBe(3) })",
        "  // " + it + "('comentat', () => { " + ex + "(9).toBe(9) })",
        "  " + it + ".skip('sarit', () => { " + ex + "(4).toBe(4) })",
        "})",
        "",
    ])
    doi = '\n'.join([
        "import { " + ex + ", " + it + " } from 'vitest'",
        "// adresa cu doua bare, care NU are voie sa taie randul: https://exemplu.test/x",
        it + "('c', () => { const u = 'https://exemplu.test'; " + ex + "(u).toContain('exemplu') })",
        "/* bloc comentat",
        "   " + it + "('din bloc', () => { " + ex + "(0).toBe(0) })",
        "*/",
        "",
    ])
    scrie(os.path.join(dosar, 'tests', 'unu.test.ts'), unu)
    scrie(os.path.join(dosar, 'tests', 'adanc', 'doi.test.ts'), doi)
    # 3 active (a, b, c), 1 sarit, 5 asertiuni active: 2+1+1(sarit)+1(c) = 5 in total,
    # fiindca `expect` din testul sarit ramane in fisier si se numara ca text.
    return {'fisiere': 2, 'teste': 3, 'asertiuni': 5, 'sarite': 1}


def controale():
    import shutil
    import tempfile
    temp = tempfile.mkdtemp(prefix='proba-regresie-')
    try:
        # --- nivelul 1: contorul ---
        asteptat = fabrica_probe(temp)
        masurat = numara(temp)
        if masurat != asteptat:
            return ('contorul: am masurat ' + json.dumps(masurat, sort_keys=True)
                    + ', asteptam ' + json.dumps(asteptat, sort_keys=True)
                    + ' (comentariul de rand sau blocul comentat au fost numarate, ori `.skip` nu a fost scazut)')

        # --- nivelul 2: comparatorul ---
        prag = {'fisiere': 2, 'teste': 3, 'asertiuni': 5, 'sarite_maxim': 1}
        scazut = {'fisiere': 1, 'teste': 2, 'asertiuni': 3, 'sarite': 1}

        ascuns = verdict(scazut, prag, prag, False, 'referinta')
        if not any(sev == OPRESTE and c == 'R-02' for sev, c, _ in ascuns):
            return 'martorul pozitiv: scaderea cu referinta NEmodificata nu a oprit'

        crescut = {'fisiere': 2, 'teste': 3, 'asertiuni': 5, 'sarite': 1}
        egal = verdict(crescut, prag, prag, False, 'referinta')
        if any(sev == OPRESTE for sev, _, _ in egal):
            return 'martorul negativ: numarul neschimbat a fost raportat ca regresie'

        # martorul care apara munca legitima: pragul e coborat SI declarat in
        # aceeasi schimbare. Fara el, poarta ar bloca stergerea intentionata a
        # unui test invechit, adica s-ar inrosi cand cineva face lucrul corect.
        prag_nou = {'fisiere': 1, 'teste': 2, 'asertiuni': 3, 'sarite_maxim': 1}
        declarat = verdict(scazut, prag_nou, prag, True, 'referinta')
        if any(sev == OPRESTE for sev, _, _ in declarat):
            return 'martorul de coborare declarata a fost oprit, desi referinta era modificata'
        if not any('DECLARATA' in m for _, _, m in declarat):
            return 'martorul de coborare declarata: coborarea nu a fost raportata deloc, deci trece nevazuta'

        # simetricul: aceeasi coborare, dar fisierul nu apare in schimbare
        nedeclarat = verdict(scazut, prag_nou, prag, False, 'referinta')
        if not any(sev == OPRESTE for sev, _, _ in nedeclarat):
            return 'martorul pozitiv: pragul coborat sub cel din HEAD, fara fisierul in schimbare, nu a oprit'

        prea_multe_sarite = {'fisiere': 2, 'teste': 3, 'asertiuni': 5, 'sarite': 2}
        g = verdict(prea_multe_sarite, prag, prag, False, 'referinta')
        if not any(sev == OPRESTE and c == 'R-04' for sev, c, _ in g):
            return 'martorul pozitiv: testele sarite peste prag nu au oprit'
        return None
    finally:
        shutil.rmtree(temp, ignore_errors=True)


def main():
    p = argparse.ArgumentParser(description='Poarta de regresie a probelor (R-01..R-04).')
    p.add_argument('--radacina', default=RADACINA_IMPLICITA)
    p.add_argument('--referinta', default=None, help='cale relativa la radacina catre fisierul de praguri')
    p.add_argument('--dosar-probe', default='tests')
    a = p.parse_args()

    motiv = controale()
    if motiv:
        print('CONTROL PICAT: ' + motiv, file=sys.stderr)
        return 3

    radacina = os.path.abspath(a.radacina)
    rel = a.referinta or REFERINTA_IMPLICITA
    cale = os.path.join(radacina, rel)
    if not os.path.isfile(cale):
        print('poarta-regresie: lipseste fisierul de referinta ' + rel.replace(os.sep, '/')
              + ' - fara prag nu exista masuratoare, doar o numaratoare', file=sys.stderr)
        return 3
    try:
        prag_lucru = json.loads(open(cale, encoding='utf-8').read())
    except ValueError as e:
        print('poarta-regresie: ' + rel.replace(os.sep, '/') + ' nu e JSON valid: ' + str(e), file=sys.stderr)
        return 3

    masurat = numara(radacina, a.dosar_probe)
    if masurat['fisiere'] == 0:
        print('poarta-regresie: niciun fisier de proba in ' + a.dosar_probe
              + '/ - masuratoarea e invalida, nu curata', file=sys.stderr)
        return 3

    prag_head = prag_din_head(radacina, rel)
    modificat = referinta_modificata(radacina, rel)
    if modificat is None:
        # Fara git nu exista notiunea de "acelasi commit". Se spune, nu se
        # presupune: comparatia ramane doar fata de pragul din arborele de lucru.
        print('AVERT    R-00  git nu a raspuns: compar doar cu pragul din fisier, nu si cu cel din HEAD')
        prag_head = None
        modificat = False

    gasiri = verdict(masurat, prag_lucru, prag_head, modificat, rel.replace(os.sep, '/'))
    opreste = [g for g in gasiri if g[0] == OPRESTE]
    avert = [g for g in gasiri if g[0] == AVERT]
    for sev, cod, mesaj in opreste:
        print('OPRESTE  ' + cod + '  ' + mesaj)
    for sev, cod, mesaj in avert:
        print('AVERT    ' + cod + '  ' + mesaj)

    print('CONTROALE: contor OK, comparator OK (scadere ascunsa, egalitate, coborare declarata, '
          'coborare nedeclarata, sarite)')
    print('MASURAT: ' + json.dumps(masurat, sort_keys=True))
    print('PRAG (fisier): ' + json.dumps({k: prag_lucru.get(k) for k in ('fisiere', 'teste', 'asertiuni', 'sarite_maxim')}, sort_keys=True))
    print('PRAG (HEAD): ' + ('indisponibil' if prag_head is None
                             else json.dumps({k: prag_head.get(k) for k in ('fisiere', 'teste', 'asertiuni')}, sort_keys=True)))
    print('REFERINTA MODIFICATA IN SCHIMBAREA CURENTA: ' + ('da' if modificat else 'nu'))
    print('REGRESII: ' + str(len(opreste)) + ' care opresc, ' + str(len(avert)) + ' de avertisment')
    return 1 if opreste else 0


if __name__ == '__main__':
    sys.exit(main())
