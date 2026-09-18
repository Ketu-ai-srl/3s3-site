#!/usr/bin/env python3
"""Ce e pe disc trebuie sa fie si in lant, si in ordinea buna. Verificat mecanic.

DE CE EXISTA. O poarta scrisa si necablata nu apara nimic, si nu se vede: arborele arata
plin, iar lantul e mai scurt cu un pas. Aceeasi clasa a fost deja masurata la noi de doua
ori - cele trei probe cu mutant (`proba-juridic.py`, `proba-seo.py`, `proba-regresie.py`)
nu erau cablate NICAIERI, iar `meniu.spec.ts` nu are lansator propriu. Nicio poarta nu
punea intrebarea, fiindca fiecare poarta masoara CONTINUTUL site-ului, si asta e o
intrebare despre INVENTAR. Controlul exista deja pentru probele fabricii, unde lista
scrisa se compara cu `ls`; aici e replicat pentru porti, pentru probe si pentru ordine.

CE VERIFICA, in patru intrebari:
  (a) fiecare `poarta-*.py` de pe disc apare in `porti:sursa` sau in `porti:build`;
  (b) fiecare `tests/browser/*.spec.ts` isi poarta AMANDOI martorii in titluri;
  (c) ordinea pasilor din `verifica` respecta regula ieftinul-inaintea-scumpului;
  (d) fiecare `probe/proba-*.py` de pe disc apare in `porti:probe`.

DOUA ANCORE EXTERNE, ca unealta si asteptarea sa nu poata drifta impreuna:
  - marcajele martorilor nu sunt scrise aici, se citesc din `browser-rulator.mjs`, care e
    codul care le CERE la rulare. Cine le redenumeste acolo muta si asteptarea de aici;
  - regula de ordonare nu e o parere a fisierului asta: propozitia care o enunta se citeste
    din antetul lui `browser-toate.mjs`. Daca dispare, dispare si temeiul, deci proba iese
    NEMASURAT si spune de ce, in loc sa aplice o regula pe care n-o mai sustine nimeni.

PREMISA lui (b), verificata la rulare, nu presupusa: `browser-toate.mjs` da lui Playwright
DIRECTORUL `tests/browser`, deci fiecare spec de acolo ruleaza fara sa aiba nevoie de un
lansator propriu, iar absenta unui lansator NU e un gol. Criteriul devine altul: rulatorul
cere ca printre probele rulate sa existe si martor pozitiv, si martor negativ. Daca
`browser-toate.mjs` nu mai da directorul, criteriul de aici nu se mai aplica si proba iese
NEMASURAT.

REZIDUU DECLARAT: rulatorul cere martorii pe REUNIUNEA probelor rulate, deci un singur spec
cu amandoi i-ar fi de ajuns. Proba asta cere mai mult - fiecare spec cu amandoi - fiindca un
spec ai carui martori traiesc in alt fisier nu e el insusi masurat. E o cerinta mai stricta
decat contractul rulatorului, deliberat, si se scrie aici ca sa nu fie luata drept citat.

IESIRE: 0 totul cablat si in ordine, 1 lipseste ceva, 3 NEMASURAT (ancora sau premisa lipsa).
"""
import glob
import io
import json
import os
import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

AICI = os.path.dirname(os.path.abspath(__file__))
PORTI = os.path.dirname(AICI)
RADACINA = os.path.dirname(os.path.dirname(os.path.dirname(PORTI)))
RULATOR = os.path.join(PORTI, 'browser-rulator.mjs')
TOATE = os.path.join(PORTI, 'browser-toate.mjs')
SPECURI = os.path.join(RADACINA, 'tests', 'browser')

T = P = 0

# Ordinea ceruta in `verifica`, de la ieftin la scump. Fiecare pas trebuie sa existe si sa
# stea inaintea celui de dupa el. `build` e taietura: ce e inaintea lui nu are voie sa
# ceara un build, ce e dupa il consuma.
LANT_CERUT = ('lint', 'typecheck', 'porti:probe', 'porti:sursa', 'build', 'porti:build')
ULTIMUL = 'porti:browser'


def ok(mesaj):
    global T
    T += 1
    print('  OK    ' + mesaj)


def nu(mesaj):
    global P
    P += 1
    print('  PICAT ' + mesaj)


def nemasurat(mesaj):
    print('NEMASURAT: ' + mesaj, file=sys.stderr)
    print('Verdictul nu e "curat", e nemasurat.', file=sys.stderr)
    sys.exit(3)


# ------------------------------------------------------------------ ancorele externe

def marcajele_martorilor():
    """Sirurile pe care rulatorul le cauta in titluri, citite din rulator."""
    if not os.path.isfile(RULATOR):
        nemasurat('lipseste browser-rulator.mjs - nu am de unde lua marcajele martorilor')
    text = io.open(RULATOR, encoding='utf-8').read()
    gasite = re.findall(r"titlu\.includes\('([^']+)'\)", text)
    pozitiv = [g for g in gasite if 'POZITIV' in g]
    negativ = [g for g in gasite if 'NEGATIV' in g]
    if len(pozitiv) != 1 or len(negativ) != 1:
        nemasurat('browser-rulator.mjs nu mai cauta exact un marcaj pozitiv si unul negativ '
                  'in titluri (gasit: ' + repr(gasite) + ')')
    return pozitiv[0], negativ[0]


def regula_de_ordine():
    """Propozitia care justifica ordonarea, citita din antetul lui browser-toate.mjs."""
    if not os.path.isfile(TOATE):
        nemasurat('lipseste browser-toate.mjs - nu am de unde lua regula de ordonare')
    text = io.open(TOATE, encoding='utf-8').read()
    m = re.search(r'([^\n]*pas ieftin pus dupa unul scump[^\n]*)', text)
    if not m:
        nemasurat('browser-toate.mjs nu mai enunta regula ieftinul-inaintea-scumpului; '
                  'fara ea, ordinea ceruta aici n-are temei scris nicaieri')
    return ' '.join(m.group(1).replace('//', ' ').split())


def da_directorul_intreg():
    """Premisa lui (b): rulatorul primeste DIRECTORUL, nu o lista de fisiere."""
    text = io.open(TOATE, encoding='utf-8').read()
    return re.search(r"ruleazaPoarta\([^)]*\[\s*'tests/browser'\s*\]", text) is not None


# ------------------------------------------------------------------ verificarile, pure

def pasi_din_lant(verifica):
    """Numele pasilor din `verifica`, in ordine. `pnpm x` si `x` sunt acelasi pas."""
    pasi = []
    for bucata in verifica.split('&&'):
        bucata = bucata.strip()
        if not bucata:
            continue
        pasi.append(re.sub(r'^(pnpm|npm run|yarn)\s+', '', bucata))
    return pasi


def ordine_gresita(verifica):
    """Mesaje despre ordinea pasilor. Lista goala = lantul respecta regula."""
    pasi = pasi_din_lant(verifica)
    gasite = []
    pozitii = {}
    for cerut in LANT_CERUT + (ULTIMUL,):
        if cerut not in pasi:
            gasite.append('pasul `' + cerut + '` lipseste din `verifica`')
        elif pasi.count(cerut) > 1:
            gasite.append('pasul `' + cerut + '` apare de ' + str(pasi.count(cerut)) + ' ori')
        else:
            pozitii[cerut] = pasi.index(cerut)
    for anterior, urmator in zip(LANT_CERUT, LANT_CERUT[1:]):
        if anterior in pozitii and urmator in pozitii and pozitii[anterior] > pozitii[urmator]:
            gasite.append('`' + anterior + '` sta DUPA `' + urmator
                          + '` in `verifica`; ordinea ceruta e ieftinul inaintea scumpului')
    if ULTIMUL in pozitii and pozitii[ULTIMUL] != len(pasi) - 1:
        gasite.append('`' + ULTIMUL + '` nu e ultimul pas din `verifica`; dupa el sta `'
                      + pasi[pozitii[ULTIMUL] + 1] + '`')
    return gasite


def numite_in(text, tipar):
    return set(re.findall(tipar, text or ''))


def necablate(pe_disc, cablate, unde):
    return [f + ' e pe disc dar nu apare in `' + unde + '`' for f in sorted(pe_disc - cablate)]


def fantome(pe_disc, cablate, unde):
    return [f + ' e cerut de `' + unde + '` dar nu exista pe disc'
            for f in sorted(cablate - pe_disc)]


def spec_fara_martori(nume, text, pozitiv, negativ):
    lipsa = [m for m in (pozitiv, negativ) if m not in text]
    if not lipsa:
        return None
    return (nume + ' nu poarta ' + ' si '.join('`' + m + '`' for m in lipsa)
            + ' in niciun titlu de proba')


# ------------------------------------------------------------------ martorii

def controale(pozitiv, negativ):
    """Martori pozitivi si negativi pe fiecare dintre cele patru verificari.

    Fixturile se asambleaza aici, la rulare. Un `package.json` de proba lasat pe disc ar fi
    citit de altcineva ca fiind lantul adevarat.
    """
    # (a) si (d): aceeasi functie, doua multimi.
    if necablate({'poarta-a.py'}, {'poarta-a.py'}, 'porti:sursa'):
        return 'martorul negativ (cablare): un fisier cablat a fost raportat ca necablat'
    m = necablate({'poarta-a.py', 'poarta-b.py'}, {'poarta-a.py'}, 'porti:sursa')
    if len(m) != 1 or 'poarta-b.py' not in m[0]:
        return 'martorul pozitiv (cablare): o poarta necablata nu a fost numita'
    m = fantome({'poarta-a.py'}, {'poarta-a.py', 'poarta-disparuta.py'}, 'porti:sursa')
    if len(m) != 1 or 'poarta-disparuta.py' not in m[0]:
        return 'martorul pozitiv (fantoma): un pas care cheama un fisier inexistent nu a fost prins'

    # (c) ordinea. Lantul corect se asambleaza din chiar lista ceruta, ca martorul negativ
    # sa nu fie o a doua copie scrisa de mana, care ar putea diverge de ea.
    corect = ' && '.join('pnpm ' + p for p in LANT_CERUT + (ULTIMUL,))
    if ordine_gresita(corect):
        return ('martorul negativ (ordine): lantul cerut a fost raportat ca gresit - '
                + '; '.join(ordine_gresita(corect)))
    inversat = corect.replace('pnpm porti:sursa && pnpm build', 'pnpm build && pnpm porti:sursa')
    if not any('porti:sursa' in x and 'build' in x for x in ordine_gresita(inversat)):
        return 'martorul pozitiv (ordine): un pas scump mutat in fata nu a fost prins'
    fara_probe = ' && '.join('pnpm ' + p for p in LANT_CERUT + (ULTIMUL,) if p != 'porti:probe')
    if not any('porti:probe' in x for x in ordine_gresita(fara_probe)):
        return 'martorul pozitiv (ordine): lipsa pasului de probe nu a fost prinsa'
    coada = corect + ' && pnpm build'
    if not any(ULTIMUL in x for x in ordine_gresita(coada)):
        return 'martorul pozitiv (ordine): un pas asezat dupa portile de browser nu a fost prins'

    # (b) martorii din titluri.
    intreg = "test('" + pozitiv + ": x', () => {})\ntest('" + negativ + ": y', () => {})\n"
    if spec_fara_martori('proba.spec.ts', intreg, pozitiv, negativ):
        return 'martorul negativ (spec): un spec cu amandoi martorii a fost raportat ca incomplet'
    ciung = "test('" + pozitiv + ": x', () => {})\n"
    mesaj = spec_fara_martori('proba.spec.ts', ciung, pozitiv, negativ)
    if not mesaj or negativ not in mesaj:
        return 'martorul pozitiv (spec): un spec fara martor negativ nu a fost prins'
    return None


# ------------------------------------------------------------------ rularea pe arborele real

def main():
    pozitiv, negativ = marcajele_martorilor()
    regula = regula_de_ordine()
    print('proba-completitudine: arborele ' + RADACINA)
    print('marcaje citite din browser-rulator.mjs: "' + pozitiv + '" / "' + negativ + '"')
    print('regula de ordine, citita din browser-toate.mjs: ' + regula)

    motiv = controale(pozitiv, negativ)
    if motiv:
        print('CONTROL PICAT: ' + motiv, file=sys.stderr)
        print('Verdictul e NEMASURAT, nu "curat".', file=sys.stderr)
        return 3

    cale_pachet = os.path.join(RADACINA, 'package.json')
    if not os.path.isfile(cale_pachet):
        nemasurat('lipseste package.json in ' + RADACINA)
    scripturi = json.load(io.open(cale_pachet, encoding='utf-8')).get('scripts', {})
    for cerut in ('verifica', 'porti:sursa', 'porti:build', 'porti:probe'):
        if not scripturi.get(cerut):
            nemasurat('package.json nu are scriptul `' + cerut + '`')

    # --- (a) portile de pe disc, contra celor cablate ------------------------------------
    tipar_poarta = r'poarta-[a-z0-9-]+\.py'
    pe_disc = {os.path.basename(c) for c in glob.glob(os.path.join(PORTI, 'poarta-*.py'))}
    cablate = numite_in(scripturi['porti:sursa'] + ' ' + scripturi['porti:build'], tipar_poarta)
    if not pe_disc:
        nemasurat('nu gasesc nicio poarta in ' + PORTI + ' - as compara doua multimi goale')
    for mesaj in necablate(pe_disc, cablate, 'porti:sursa` sau `porti:build'):
        nu('(a) ' + mesaj)
    for mesaj in fantome(pe_disc, cablate, 'porti:sursa` sau `porti:build'):
        nu('(a) ' + mesaj)
    if pe_disc == cablate:
        ok('(a) toate cele ' + str(len(pe_disc)) + ' porti de pe disc sunt cablate in verifica')

    # --- (d) probele de pe disc, contra celor cablate -----------------------------------
    tipar_proba = r'proba-[a-z0-9-]+\.py'
    probe_disc = {os.path.basename(c) for c in glob.glob(os.path.join(AICI, 'proba-*.py'))}
    probe_cablate = numite_in(scripturi['porti:probe'], tipar_proba)
    if not probe_disc:
        nemasurat('nu gasesc nicio proba in ' + AICI + ' - as compara doua multimi goale')
    for mesaj in necablate(probe_disc, probe_cablate, 'porti:probe'):
        nu('(d) ' + mesaj)
    for mesaj in fantome(probe_disc, probe_cablate, 'porti:probe'):
        nu('(d) ' + mesaj)
    if probe_disc == probe_cablate:
        ok('(d) toate cele ' + str(len(probe_disc)) + ' probe de pe disc sunt cablate in porti:probe')

    # --- (c) ordinea -------------------------------------------------------------------
    gresite = ordine_gresita(scripturi['verifica'])
    for mesaj in gresite:
        nu('(c) ' + mesaj)
    if not gresite:
        ok('(c) ordinea din verifica: ' + ' -> '.join(pasi_din_lant(scripturi['verifica'])))

    # --- (b) martorii din spec-urile de browser ----------------------------------------
    if not os.path.isdir(SPECURI):
        nemasurat('lipseste ' + SPECURI)
    if not da_directorul_intreg():
        nemasurat('browser-toate.mjs nu mai da directorul `tests/browser` lui Playwright; '
                  'criteriul de acoperire a spec-urilor era construit pe premisa asta')
    specuri = sorted(glob.glob(os.path.join(SPECURI, '*.spec.ts')))
    if not specuri:
        nemasurat('niciun spec in tests/browser - as raporta acoperire completa pe multimea vida')
    lipsuri = 0
    for cale in specuri:
        mesaj = spec_fara_martori(os.path.relpath(cale, RADACINA).replace(os.sep, '/'),
                                  io.open(cale, encoding='utf-8').read(), pozitiv, negativ)
        if mesaj:
            nu('(b) ' + mesaj)
            lipsuri += 1
    if not lipsuri:
        ok('(b) toate cele ' + str(len(specuri)) + ' spec-uri de browser poarta amandoi martorii')

    print('\nINVENTAR: ' + str(len(pe_disc)) + ' porti, ' + str(len(probe_disc)) + ' probe, '
          + str(len(specuri)) + ' spec-uri de browser, '
          + str(len(pasi_din_lant(scripturi['verifica']))) + ' pasi in verifica')
    print('REZULTAT: ' + str(T) + ' trecute, ' + str(P) + ' picate')
    return 1 if P else 0


if __name__ == '__main__':
    sys.exit(main())
