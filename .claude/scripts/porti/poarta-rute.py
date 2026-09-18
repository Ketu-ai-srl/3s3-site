#!/usr/bin/env python3
"""Poarta de rute: manifestul si sistemul de fisiere trebuie sa spuna acelasi lucru.

De ce exista, si de cand. Pe 5 sep 2026 o revizuire a masurat gaura: `src/content/rute.ts`
se declara "singurul loc din care se afla ce pagini exista pe site", dar nimic nu o obliga.
Revizorul a creat `src/app/proba-revizor/page.tsx` cu titlu, descriere si canonical proprii -
adica pasul 1 al instructiunilor din manifest facut corect, pasul 2 omis - si a masurat:

    EXIT POARTA = 0 · POARTA_3S_TOTUL_VERDE
    probe de browser: 22 (de la 17) - deci portile CHIAR au vizitat pagina si au aprobat-o
    aparitii in sitemap.xml: 0

Pagina era servita, testata si declarata buna, iar harta de site, meniul, subsolul si pagina
de 404 nu stiau ca exista. Zero legaturi catre ea din tot site-ul. Directia inversa - o
intrare in manifest fara pagina - producea legatura moarta pe FIECARE pagina, fiindca meniul
sta in layout; aceea era prinsa de poarta de legaturi, dar abia dupa ce ajungea in build.

CE VERIFICA, in ambele directii:
  RU-01  fiecare `page.tsx` din `src/app` are o intrare in `RUTE`
         (altfel pagina exista, e indexabila, si nimic nu duce la ea)
  RU-02  fiecare intrare din `RUTE` are un `page.tsx`
         (altfel meniul din layout produce o legatura moarta pe tot site-ul)

CONTROALE la fiecare rulare, pe arbori fabricati in memorie:
  - martor pozitiv A: pagina fara intrare in manifest TREBUIE prinsa;
  - martor pozitiv B: intrare in manifest fara pagina TREBUIE prinsa;
  - martor negativ: multimi identice NU trebuie sa produca nimic.
Daca vreunul cade, verdictul e NEMASURAT (iesire 3), nu "curat".

CE NU VERIFICA (reziduuri)
Intrebarea pe care o pune de fapt: "coincid doua multimi de siruri - caile citite din
manifest si caile deduse din arborele de fisiere?" Nu "e pagina accesibila".
  - O ruta prezenta in ambele multimi, dar cu inMeniu si inHarta false, e VERDE si totusi nu
    e legata de nicaieri. Asta e deliberat: sunt decizii editoriale.
  - Segmentele dinamice si grupurile de rute se sar; un subarbore dinamic intreg ramane
    nemasurat, in ambele directii.
  - Manifestul se citeste cu un tipar pe campul de cale. O cale compusa din bucati, dintr-o
    variabila sau dintr-o constanta nu se vede.
  - Se numara doar fisierele de pagina. Un manipulator de ruta care serveste o adresa nu e
    ruta pentru poarta asta.
  - Sitemap-ul, meniul si subsolul nu se citesc. Simptomul din incident - zero aparitii in
    sitemap - se DEDUCE din manifest, nu se masoara.

LA ROSU: CE AI VOIE SA EDITEZI
  DA  intrarea din src/content/rute.ts, sau fisierul de pagina care lipseste.
  NU  TIPAR_CALE, sarirea grupurilor si a segmentelor dinamice din rute_din_fisiere,
      compara(), controale().

IESIRE: 0 curat - 1 nepotriviri - 2 folosire gresita - 3 control picat
"""
import io
import os
import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

RADACINA = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
MANIFEST = os.path.join(RADACINA, 'src', 'content', 'rute.ts')
DOSAR_APP = os.path.join(RADACINA, 'src', 'app')

# `cale:` prinde numai intrarile din RUTE. Ancorele paginii de start au camp `ancora`,
# iar `ADRESA_BAZA` si `CALE_DISCUTIE` sunt constante, nu campuri - deci raman afara.
TIPAR_CALE = re.compile(r'\bcale:\s*"([^"]+)"')


def rute_din_manifest(text):
    return sorted(set(TIPAR_CALE.findall(text)))


def rute_din_fisiere(dosar):
    """Rutele reale: fiecare `page.tsx` din arborele `src/app`.

    Se sar segmentele care nu produc o adresa proprie: grupurile de rute `(nume)`, care
    exista doar ca sa imparta un layout, si segmentele dinamice `[param]`, care n-au o
    cale fixa de pus in manifest.
    """
    gasite = []
    for radacina, directoare, nume in os.walk(dosar):
        directoare[:] = [d for d in directoare if d not in ('node_modules', '__pycache__')]
        if 'page.tsx' not in nume and 'page.mdx' not in nume:
            continue
        rel = os.path.relpath(radacina, dosar).replace(os.sep, '/')
        if rel == '.':
            gasite.append('/')
            continue
        segmente = [s for s in rel.split('/') if not (s.startswith('(') and s.endswith(')'))]
        if any(s.startswith('[') for s in segmente):
            continue
        gasite.append('/' + '/'.join(segmente))
    return sorted(set(gasite))


def compara(manifest, fisiere):
    """Intoarce lista de (cod, mesaj). Goala = cele doua multimi coincid."""
    gasiri = []
    for r in fisiere:
        if r not in manifest:
            gasiri.append(('RU-01', 'pagina `' + r + '` exista in src/app dar NU e in RUTE: '
                                    'e servita si indexabila, dar nimic din site nu duce la ea '
                                    '(nici meniul, nici subsolul, nici sitemap.xml, nici 404)'))
    for r in manifest:
        if r not in fisiere:
            gasiri.append(('RU-02', 'ruta `' + r + '` e in RUTE dar nu are page.tsx: meniul sta in '
                                    'layout, deci ar produce o legatura moarta pe FIECARE pagina'))
    return gasiri


def controale():
    a = compara(['/'], ['/', '/proba'])
    if not any(c == 'RU-01' for c, _ in a):
        return 'martorul pozitiv A: o pagina lipsa din manifest nu a fost prinsa'
    b = compara(['/', '/promisa'], ['/'])
    if not any(c == 'RU-02' for c, _ in b):
        return 'martorul pozitiv B: o intrare din manifest fara pagina nu a fost prinsa'
    if compara(['/', '/solutii'], ['/solutii', '/']):
        return 'martorul negativ: doua multimi identice au produs constatari (ordinea nu conteaza)'
    # Si un control peste EXTRAGERE, nu doar peste comparatie: fara el, poarta ar putea
    # iesi curata fiindca nu a citit nicio ruta din manifest.
    fals_manifest = 'export const RUTE = [\n  { cale: "/", inMeniu: false },\n' \
                    '  { cale: "/contact", inMeniu: true },\n];\n' \
                    'export const CALE_DISCUTIE = "/#discutie";\n'
    citite = rute_din_manifest(fals_manifest)
    if citite != ['/', '/contact']:
        return ('martorul de extragere: din manifestul de proba am citit ' + repr(citite) +
                ' in loc de ' + repr(['/', '/contact']))
    return None


def main():
    motiv = controale()
    if motiv:
        print('CONTROL PICAT: ' + motiv, file=sys.stderr)
        return 3

    if not os.path.isfile(MANIFEST):
        print('poarta-rute: lipseste ' + os.path.relpath(MANIFEST, RADACINA), file=sys.stderr)
        return 3
    if not os.path.isdir(DOSAR_APP):
        print('poarta-rute: lipseste src/app - masuratoarea e invalida', file=sys.stderr)
        return 3

    manifest = rute_din_manifest(io.open(MANIFEST, encoding='utf-8').read())
    fisiere = rute_din_fisiere(DOSAR_APP)
    if not manifest or not fisiere:
        print('poarta-rute: una dintre multimi e goala (manifest ' + str(len(manifest)) +
              ', fisiere ' + str(len(fisiere)) + ') - NEMASURAT, nu curat', file=sys.stderr)
        return 3

    gasiri = compara(manifest, fisiere)
    for cod, mesaj in gasiri:
        print('OPRESTE  ' + cod + '  ' + mesaj)

    print('CONTROALE: martor pozitiv A OK, martor pozitiv B OK, martor negativ OK, extragere OK')
    print('MANIFEST: ' + str(len(manifest)) + ' rute · FISIERE: ' + str(len(fisiere)) + ' pagini')
    print('NEPOTRIVIRI: ' + str(len(gasiri)))
    return 1 if gasiri else 0


if __name__ == '__main__':
    sys.exit(main())
