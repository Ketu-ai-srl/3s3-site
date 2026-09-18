#!/usr/bin/env python3
"""Proba portii juridice. Ruleaza poarta ca PROCES, pe arbori de proiect fabricati.

Doua lucruri se probeaza aici, si al doilea e cel usor de uitat:
  1. fiecare clasa de defect e prinsa (martori pozitivi);
  2. gradarea pe MEDIU chiar functioneaza - acelasi arbore incomplet trebuie sa
     fie AVERT pe staging si sa OPREASCA la productie. Fara cazul asta,
     "blocheaza publicarea in productie" ramane o propozitie din documentatie.

Tiparele interzise se asambleaza din bucati la rulare: proba sta in depozit, iar
un link ODR scris intreg aici ar deveni chiar defectul pe care poarta il vaneaza,
data viitoare cand cineva largeste zona scanata.

IESIRE: 0 toate cazurile trec, 1 macar unul pica.
"""
import json
import os
import shutil
import subprocess
import sys
import tempfile

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

AICI = os.path.dirname(os.path.abspath(__file__))
POARTA = os.path.join(os.path.dirname(AICI), 'poarta-juridic.py')

T = P = 0

DATE_FIRMA = {
    'denumire': 'Trei S Arhivare SRL',
    'sediu': 'Golesti, judetul Arges',
    'email': 'contact@exemplu-3s.test',
    'telefon': '+40 000 000 000',
    'numar_orc': 'J03/1234/2026',
    'cod_fiscal': 'RO12345678',
}


def ok(mesaj):
    global T
    T += 1
    print('  OK    ' + mesaj)


def nu(mesaj):
    global P
    P += 1
    print('  PICAT ' + mesaj)


def scrie(cale, continut):
    os.makedirs(os.path.dirname(cale), exist_ok=True)
    with open(cale, 'w', encoding='utf-8', newline='\n') as f:
        f.write(continut)


def arbore(corp_in_plus=(), date_firma=DATE_FIRMA, cu_rute=True, cu_config=True):
    d = tempfile.mkdtemp(prefix='proba-juridic-')
    if cu_rute:
        scrie(os.path.join(d, 'src', 'app', 'confidentialitate', 'page.tsx'),
              'export default function P() { return <p>Politica</p> }\n')
        scrie(os.path.join(d, 'src', 'app', 'termeni', 'page.tsx'),
              'export default function P() { return <p>Termeni</p> }\n')
    if cu_config and date_firma is not None:
        scrie(os.path.join(d, 'config', 'entitate.ro.json'),
              json.dumps(date_firma, ensure_ascii=False, indent=2) + '\n')
    corp = ['<html><body>']
    if date_firma:
        for camp in ('denumire', 'sediu', 'email', 'telefon', 'numar_orc', 'cod_fiscal'):
            corp.append('<p>' + str(date_firma.get(camp, '')) + '</p>')
    corp.append('<form><input name="nume"/><p>Prelucram datele pentru demersuri precontractuale.</p></form>')
    corp.extend(corp_in_plus)
    corp.append('</body></html>')
    scrie(os.path.join(d, '.next', 'server', 'app', 'index.html'), ''.join(corp))
    return d


def ruleaza(radacina, mediu='staging', poarta=None):
    r = subprocess.run([sys.executable, poarta or POARTA, '--radacina', radacina, '--mediu', mediu],
                       capture_output=True, text=True, encoding='utf-8', errors='replace')
    return r.returncode, (r.stdout or '') + (r.stderr or '')


def caz(nume, d, cod_asteptat, contine=None, mediu='staging'):
    try:
        cod, iesire = ruleaza(d, mediu)
        if cod != cod_asteptat:
            nu(nume + ': cod ' + str(cod) + ', asteptam ' + str(cod_asteptat) + '\n' + iesire.strip())
            return
        if contine and contine not in iesire:
            nu(nume + ': iesirea nu contine "' + contine + '"\n' + iesire.strip())
            return
        ok(nume)
    finally:
        shutil.rmtree(d, ignore_errors=True)


def main():
    print('proba-juridic: poarta ' + POARTA)

    # --- martorul negativ: proiectul complet si curat nu are voie sa fie prins ---
    caz('proiect complet si curat trece', arbore(), 0)

    # --- martori negativi pentru tiparele care ar putea fi prea late ---
    caz('un link extern normal nu e tert incarcat',
        arbore(['<a href="https://exemplu-extern.test/x">legatura externa</a>']), 0)
    caz('un script de tert CITAT intr-un comentariu nu produce defect',
        arbore(['<!-- nu punem <script src="https://cdn.tert.test/a.js"></script> aici -->']), 0)
    caz('cuvantul operator singur, fara numar langa el, nu produce defect',
        arbore(['<p>Operatorul de date raspunde la cererile primite.</p>']), 0)

    # --- L-09: platforma SOL / ODR, poarta de absenta, opreste pe orice mediu ---
    odr = 'https://ec.europa.eu/' + 'consumers' + '/' + 'odr'
    caz('link ODR opreste', arbore(['<a href="' + odr + '">SOL</a>']), 1, 'L-09')
    sintagma = 'solutionarea' + ' online a litigiilor'
    caz('sintagma SOL in romana opreste',
        arbore(['<p>Puteti folosi platforma de ' + sintagma + '.</p>']), 1, 'L-09')
    caz('sintagma SOL cu diacritice opreste',
        arbore(['<p>Platforma de ' + 'soluționarea online a litigiilor' + '.</p>']), 1, 'L-09')

    # --- L-10: numar de inregistrare ca operator ---
    caz('numar de operator de date opreste',
        arbore(['<p>Numarul nostru de inregistrare ca operator de date este 12345.</p>']), 1, 'L-10')

    # --- C-01: terti ---
    caz('script de la tert opreste',
        arbore(['<script src="https://cdn.tert.test/urmarire.js"></script>']), 1, 'C-01')
    caz('iframe de la tert opreste',
        arbore(['<iframe src="https://video.tert.test/embed/1"></iframe>']), 1, 'C-01')
    caz('font de la Google opreste',
        arbore(['<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=X"/>']), 1, 'C-01')

    # --- L-05: temeiul formularului ---
    caz('formularul care cere consimtamant opreste',
        arbore(['<p>Prin ' + 'trimiterea formularului' + ' va dati ' + 'consimtamantul' + '.</p>']), 1, 'L-05')

    # --- gradarea pe mediu: acelasi arbore, doua verdicte ---
    caz('rute juridice lipsa: AVERT pe staging', arbore(cu_rute=False), 0, 'AVERT    L-15', mediu='staging')
    caz('rute juridice lipsa: OPRESTE la productie', arbore(cu_rute=False), 1, 'OPRESTE  L-15', mediu='productie')

    incomplet = dict(DATE_FIRMA)
    incomplet['cod_fiscal'] = 'de completat'
    caz('loc gol in datele firmei: AVERT pe staging', arbore(date_firma=incomplet), 0, 'AVERT    L-01')
    caz('loc gol in datele firmei: OPRESTE la productie',
        arbore(date_firma=incomplet), 1, 'OPRESTE  L-01', mediu='productie')
    caz('configurare lipsa: AVERT pe staging', arbore(cu_config=False), 0, 'AVERT    L-01')

    # date complete in configurare, dar ABSENTE din pagina livrata: asta opreste
    # pe orice mediu, fiindca nu e un loc gol, e o neconcordanta.
    d = arbore()
    cale = os.path.join(d, '.next', 'server', 'app', 'index.html')
    html = open(cale, encoding='utf-8').read().replace(DATE_FIRMA['cod_fiscal'], '')
    scrie(cale, html)
    caz('date declarate dar absente din pagina livrata opresc si pe staging', d, 1, 'nu apare in pagina livrata')

    # --- MUTANTUL: dovada ca cazul L-09 chiar trece prin tiparele SOL ---
    mutant_dir = tempfile.mkdtemp(prefix='mutant-juridic-')
    try:
        sursa = open(POARTA, encoding='utf-8').read()
        # se goleste lista de tipare SOL, si numai ea. Codul de dupa `return`
        # ramane pe loc: mutatia e minima si nu atinge nimic altceva.
        ancora = 'def tipare_sol():'
        inlocuitor = 'def tipare_sol():\n    return []  # mutant'
        if sursa.count(ancora) != 1:
            nu('MUTANT NEATERIZAT: ancora nu apare exact o data (' + str(sursa.count(ancora)) + ')')
        else:
            copie = os.path.join(mutant_dir, 'poarta-mutant.py')
            with open(copie, 'w', encoding='utf-8', newline='\n') as f:
                f.write(sursa.replace(ancora, inlocuitor))
            continut = open(copie, encoding='utf-8').read()
            if '# mutant' not in continut:
                nu('MUTANT NEATERIZAT: substitutia nu se regaseste in copie')
            else:
                d = arbore(['<a href="' + odr + '">SOL</a>'])
                try:
                    cod, iesire = ruleaza(d, 'staging', poarta=copie)
                    # 3 e deznodamantul bun: martorul din interiorul portii prinde
                    # mutatia si refuza sa dea verdict. 0 ar insemna ca numai proba
                    # asta apara tiparele. 1 ar insemna ca defectul e prins de alta
                    # ramura, deci cazul nu masoara ce pretinde.
                    if cod == 3 and 'L-09' in iesire:
                        ok('mutantul fara tiparele SOL cade la 3: martorul din poarta l-a prins')
                    elif cod == 0:
                        ok('mutantul fara tiparele SOL iese VERDE: cazul L-09 chiar le ataca')
                    else:
                        nu('mutantul a ramas rosu (cod ' + str(cod) + '): cazul L-09 pica pe altceva\n'
                           + iesire.strip())
                finally:
                    shutil.rmtree(d, ignore_errors=True)
    finally:
        shutil.rmtree(mutant_dir, ignore_errors=True)

    print('\nREZULTAT: ' + str(T) + ' trecute, ' + str(P) + ' picate')
    return 1 if P else 0


if __name__ == '__main__':
    sys.exit(main())
