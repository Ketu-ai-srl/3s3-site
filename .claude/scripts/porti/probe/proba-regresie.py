#!/usr/bin/env python3
"""Proba portii de regresie. Fabrica un DEPOZIT GIT adevarat si ruleaza poarta
ca proces peste el.

DE CE git adevarat si nu o simulare: jumatate din poarta se sprijina pe
`git show HEAD:...` si pe `git status --porcelain`, adica pe forma exacta a
argumentelor si pe conversia de cai. Pe Windows, `git show HEAD:cale` primeste o
cale convertita de MSYS si iese cu 128 - o simulare a lui git ar fi trecut
frumos peste exact defectul care conteaza.

DE CE un caz pentru stergerea LEGITIMA: un test invechit are voie sa fie sters.
Daca poarta s-ar inrosi si atunci, ar fi o poarta defecta, oricat de bine ar
prinde regresia reala. Cazul "coborare declarata in acelasi commit" e martorul
care apara munca legitima, si e la fel de obligatoriu ca martorul pozitiv.

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
POARTA = os.path.join(os.path.dirname(AICI), 'poarta-regresie.py')
REFERINTA = '.claude/scripts/porti/probe/praguri-regresie.json'

T = P = 0


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


def git(d, *argumente):
    mediu = dict(os.environ)
    mediu['MSYS_NO_PATHCONV'] = '1'
    r = subprocess.run(['git', '-C', d] + list(argumente), capture_output=True,
                       text=True, encoding='utf-8', errors='replace', env=mediu)
    return r.returncode, (r.stdout or '') + (r.stderr or '')


def fisier_proba(nume_teste, asertiuni_pe_test=2, sarit=False):
    """Se asambleaza la rulare. Un fisier de proba scris pe litere in corpul
    acesteia ar fi numarat de poarta la scanarea depozitului real."""
    it = 'it'
    ex = 'expect'
    randuri = ["import { " + ex + ", " + it + " } from 'vitest'"]
    for n in nume_teste:
        corp = '; '.join([ex + '(' + str(i) + ').toBe(' + str(i) + ')' for i in range(asertiuni_pe_test)])
        prefix = it + ('.skip' if sarit else '')
        randuri.append(prefix + "('" + n + "', () => { " + corp + " })")
    return '\n'.join(randuri) + '\n'


def depozit(prag, fisiere):
    """Depozit git cu un commit initial care contine referinta si probele date."""
    d = tempfile.mkdtemp(prefix='proba-regresie-')
    for nume, continut in fisiere.items():
        scrie(os.path.join(d, 'tests', nume), continut)
    scrie(os.path.join(d, REFERINTA.replace('/', os.sep)), json.dumps(prag, indent=2) + '\n')
    git(d, 'init', '-q')
    git(d, 'add', '-A')
    cod, iesire = git(d, '-c', 'user.email=proba@exemplu.test', '-c', 'user.name=Proba',
                      'commit', '-q', '-m', 'initial')
    if cod != 0:
        print('  NOTA  commit-ul initial a esuat: ' + iesire.strip())
    return d


def ruleaza(d, poarta=None):
    r = subprocess.run([sys.executable, poarta or POARTA, '--radacina', d],
                       capture_output=True, text=True, encoding='utf-8', errors='replace')
    return r.returncode, (r.stdout or '') + (r.stderr or '')


def verifica(nume, d, cod_asteptat, contine=None, curata=True):
    try:
        cod, iesire = ruleaza(d)
        if cod != cod_asteptat:
            nu(nume + ': cod ' + str(cod) + ', asteptam ' + str(cod_asteptat) + '\n' + iesire.strip())
            return
        if contine and contine not in iesire:
            nu(nume + ': iesirea nu contine "' + contine + '"\n' + iesire.strip())
            return
        ok(nume)
    finally:
        if curata:
            shutil.rmtree(d, ignore_errors=True)


PRAG = {'fisiere': 2, 'teste': 3, 'asertiuni': 6, 'sarite_maxim': 0}
PROBE = {
    'unu.test.ts': fisier_proba(['a', 'b']),
    'doi.test.ts': fisier_proba(['c']),
}


def main():
    print('proba-regresie: poarta ' + POARTA)
    cod, iesire = git(tempfile.gettempdir(), '--version')
    if cod != 0:
        print('  NOTA  git nu raspunde in acest mediu: ' + iesire.strip())

    # --- martorul negativ: starea comitata, neatinsa, trebuie sa treaca ---
    verifica('starea comitata trece', depozit(PRAG, PROBE), 0)

    # --- martorul pozitiv: un fisier de proba sters, referinta neatinsa ---
    d = depozit(PRAG, PROBE)
    os.remove(os.path.join(d, 'tests', 'doi.test.ts'))
    verifica('fisier de proba sters, referinta neatinsa: OPRESTE', d, 1, 'OPRESTE  R-01')

    # --- teste golite din interiorul unui fisier care ramane pe loc ---
    d = depozit(PRAG, PROBE)
    scrie(os.path.join(d, 'tests', 'unu.test.ts'), fisier_proba(['a']))
    verifica('un test scos dintr-un fisier ramas pe loc: OPRESTE', d, 1, 'OPRESTE  R-02')

    # --- asertiuni scoase, testele raman la numar ---
    d = depozit(PRAG, PROBE)
    scrie(os.path.join(d, 'tests', 'unu.test.ts'), fisier_proba(['a', 'b'], asertiuni_pe_test=1))
    verifica('asertiuni scoase, testele ramase la numar: OPRESTE', d, 1, 'OPRESTE  R-03')

    # --- testul dezactivat cu .skip, nu sters: fisierul si numarul de linii raman ---
    d = depozit(PRAG, PROBE)
    scrie(os.path.join(d, 'tests', 'doi.test.ts'), fisier_proba(['c'], sarit=True))
    verifica('test dezactivat cu .skip: OPRESTE', d, 1, 'R-04')

    # --- MUNCA LEGITIMA: stergere plus coborarea pragului in aceeasi schimbare ---
    d = depozit(PRAG, PROBE)
    os.remove(os.path.join(d, 'tests', 'doi.test.ts'))
    prag_nou = {'fisiere': 1, 'teste': 2, 'asertiuni': 4, 'sarite_maxim': 0}
    scrie(os.path.join(d, REFERINTA.replace('/', os.sep)), json.dumps(prag_nou, indent=2) + '\n')
    verifica('stergere cu prag coborat in aceeasi schimbare: trece, marcata DECLARATA',
             d, 0, 'coborare DECLARATA')

    # --- coborarea pragului fara ca fisierul sa fie in schimbare (comitata separat) ---
    d = depozit(PRAG, PROBE)
    scrie(os.path.join(d, REFERINTA.replace('/', os.sep)), json.dumps(prag_nou, indent=2) + '\n')
    git(d, 'add', '-A')
    git(d, '-c', 'user.email=proba@exemplu.test', '-c', 'user.name=Proba', 'commit', '-q', '-m', 'coborare')
    os.remove(os.path.join(d, 'tests', 'doi.test.ts'))
    # aici pragul din HEAD e deja cel coborat, deci masuratoarea il respecta:
    # poarta trece, si asta e corect - coborarea a fost vizibila la commit-ul ei
    verifica('dupa un commit care coboara pragul explicit, masuratoarea noua trece', d, 0)

    # --- probe adaugate: nu e defect, e prag ramas in urma ---
    d = depozit(PRAG, PROBE)
    scrie(os.path.join(d, 'tests', 'trei.test.ts'), fisier_proba(['d', 'e']))
    verifica('probe adaugate: AVERT "ridica pragul", nu oprire', d, 0, 'ridica pragul')

    # --- starile NEMASURAT ---
    d = depozit(PRAG, PROBE)
    os.remove(os.path.join(d, REFERINTA.replace('/', os.sep)))
    verifica('fara fisier de referinta: 3 (NEMASURAT), nu 0', d, 3, 'lipseste fisierul de referinta')

    d = depozit(PRAG, PROBE)
    shutil.rmtree(os.path.join(d, 'tests'))
    verifica('fara niciun fisier de proba: 3 (NEMASURAT), nu 0', d, 3, 'invalida')

    d = depozit(PRAG, PROBE)
    scrie(os.path.join(d, REFERINTA.replace('/', os.sep)), '{ nu e json\n')
    verifica('referinta stricata: 3 (NEMASURAT), nu 0', d, 3, 'nu e JSON valid')

    # --- fara git: poarta o spune, nu presupune ---
    d = depozit(PRAG, PROBE)
    shutil.rmtree(os.path.join(d, '.git'), ignore_errors=True)
    verifica('fara git: spune ca a comparat doar cu pragul din fisier', d, 0, 'git nu a raspuns')

    # --- MUTANTUL: dovada ca martorii de mai sus ating chiar comparatorul ---
    mutant_dir = tempfile.mkdtemp(prefix='mutant-regresie-')
    try:
        sursa = open(POARTA, encoding='utf-8').read()
        ancora = '        if acum < cerut:'
        inlocuitor = '        if False:  # mutant'
        if sursa.count(ancora) != 1:
            nu('MUTANT NEATERIZAT: ancora nu apare exact o data (' + str(sursa.count(ancora)) + ')')
        else:
            copie = os.path.join(mutant_dir, 'poarta-mutant.py')
            with open(copie, 'w', encoding='utf-8', newline='\n') as f:
                f.write(sursa.replace(ancora, inlocuitor))
            if '# mutant' not in open(copie, encoding='utf-8').read():
                nu('MUTANT NEATERIZAT: substitutia nu se regaseste in copie')
            else:
                d = depozit(PRAG, PROBE)
                try:
                    os.remove(os.path.join(d, 'tests', 'doi.test.ts'))
                    cod, iesire = ruleaza(d, poarta=copie)
                    if cod == 3:
                        ok('mutantul fara comparatia cu pragul cade la 3: martorul din poarta l-a prins')
                    elif cod == 0:
                        ok('mutantul fara comparatia cu pragul iese VERDE: cazurile chiar o ataca')
                    else:
                        nu('mutantul a ramas rosu (cod ' + str(cod)
                           + '): stergerea e prinsa de alta ramura decat comparatia cu pragul\n'
                           + iesire.strip())
                finally:
                    shutil.rmtree(d, ignore_errors=True)
    finally:
        shutil.rmtree(mutant_dir, ignore_errors=True)

    print('\nREZULTAT: ' + str(T) + ' trecute, ' + str(P) + ' picate')
    return 1 if P else 0


if __name__ == '__main__':
    sys.exit(main())
