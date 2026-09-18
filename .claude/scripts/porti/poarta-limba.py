#!/usr/bin/env python3
"""Poarta de limba romana: diacritice complete si o singura forma de adresare.

De ce exista: un site de arhivare din regiune, masurat de noi, livreaza in ROMANA
titluri fara diacritice, o pagina intreaga netradusa si o cheie de traducere ramasa
in tabelul de preturi. Sunt exact defectele pe care le prinde un om abia dupa ce
le-a vazut clientul. Le prindem mecanic, la fiecare lot.

Verifica trei lucruri, in textul VIZIBIL:
  1. cuvinte romanesti frecvente scrise fara diacritice (lista curata, fara ambiguitati)
  2. amestec de adresare: "dumneavoastra" impreuna cu "tu / tau / tie" in acelasi fisier
  3. chei de traducere scapate in text (forma "ceva.altceva_" ramasa neprocesata)

CONTROALE la fiecare rulare:
  - martor pozitiv, fabricat la rulare: un text cu toate cele trei defecte; daca nu-l prinde,
    verdictul e NEMASURAT (iesire 3)
  - martor negativ: un text corect; daca il prinde, tiparele sunt prea late (iesire 3)

CE NU VERIFICA (reziduuri)
Intrebarea pe care o pune de fapt: "apare vreunul dintre cuvintele din CUVINTE fara
diacritice, exista o forma de cheie de traducere, si apar in ACELASI fisier si adresarea
formala si cea informala?" Nu "e romana corecta".
  - Orice cuvant din afara listei trece. Lista a fost curatata deliberat de intrarile
    ambigue, deci e o margine de jos prin constructie, nu o acoperire.
  - Gramatica, acordul, topica si tonul nu se masoara deloc.
  - Se citeste doar arborele src/. docs/, .github/ si README raman nemasurate de poarta asta.
  - Din cod se ia doar ce trece de scanerul propriu: sirurile sub LUNGIME_MINIMA_SIR se
    arunca, si pare_cod arunca orice bucata cu semne de sintaxa ori cu mai putin de doua
    cuvinte. Un titlu scurt cu o interpolare nu ajunge sa fie masurat.
  - Fisierele de marcare se citesc BRUT, deci blocurile de cod din ele se analizeaza ca proza.
  - Amestecul de adresare se masoara PE FISIER. Doua fisiere, cate o adresare in fiecare, trec
    amandoua, desi site-ul e inconsecvent.

LA ROSU: CE AI VOIE SA EDITEZI
  DA  textul acuzat.
      Un cuvant se scoate din CUVINTE DOAR cand poarta acuza o forma CORECTA, si scoaterea se
      scrie in nota deja existenta de mai sus, cu motivul. Adaugarea de cuvinte e libera.
  NU  LUNGIME_MINIMA_SIR, pare_cod, siruri_din_cod, CAI, EXTENSII, SARITE, controale().

IESIRE: 0 curat · 1 defecte gasite · 2 eroare de folosire · 3 control picat
"""
import os
import re
import sys

RADACINA = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
CAI = ('src',)
# `.ts` e aici fiindca proza de continut sta in `src/content/*.ts` - liste de segmente,
# tabele de termene. Cat timp lipsea, textul de acolo nu trecea prin nicio poarta de limba.
EXTENSII = ('.tsx', '.ts', '.mdx', '.md')
SARITE = {'node_modules', '.next', '.git', '__pycache__'}

# Cuvinte care in romana corecta NU pot aparea fara diacritice. Lista e scurta si
# curata deliberat: fiecare intrare trebuie sa nu aiba alta lectura valida.
#
# Ce s-a SCOS din lista, si de ce - nota ramane aici ca sa nu le readaug din reflex:
# 'arhivare', 'contabilitate', 'termene', 'facturi', 'documentatie' si 'digitalizare'
# se scriu EXACT asa, fara niciun semn. Cat au stat in lista, poarta se inrosea pe
# text CORECT (ultima, 'digitalizare', pe 5 sep 2026, in JSON-LD, unde restul randului
# chiar era fara diacritice - deci acuza nimerea fisierul si rata cuvantul).
# Regula: cand poarta acuza o forma corecta, se repara POARTA, nu textul.
CUVINTE = [
    'romana', 'romaneasca', 'romanesti', 'pastrare', 'pastram', 'cautare', 'cautati',
    'raspuns', 'raspunde', 'raspundem', 'intrebare', 'intrebati', 'incredere',
    'primarie', 'primarii', 'inregistrare', 'urmarire', 'sanatate', 'siguranta',
]

TIPAR_CUVINTE = re.compile(r'\b(' + '|'.join(CUVINTE) + r')\b', re.I)
TIPAR_CHEIE = re.compile(r'\b[a-z][a-z0-9]{2,}\.[a-z][a-z0-9_]*_\s')
TIPAR_FORMAL = re.compile(r'dumneavoastr', re.I)
TIPAR_INFORMAL = re.compile(r'\b(tu|t[aă]u|t[aă]i|t[aă]|tale|tie|ție)\b', re.I)

# Textul vizibil dintr-un fisier de cod: ce sta intre > si <, plus continutul sirurilor.
TIPAR_TEXT_JSX = re.compile(r'>([^<>{}]{3,})<')

# Sirurile se extrag INTREGI, fara prag de lungime in tipar; cele scurte se arunca dupa.
#
# De ce conteaza ordinea, masurat pe 5 sep 2026: tiparul vechi cerea cel putin 12
# caractere CHIAR IN TIPAR. Cand primul sir dintr-un fisier era mai scurt - `from "next"` -
# potrivirea esua acolo, motorul avansa un caracter si se resincroniza pe ghilimeaua de
# INCHIDERE. De acolo incolo perechile erau decalate cu unu, deci poarta citea CODUL
# DINTRE siruri in loc de continutul lor. Pe `layout.tsx` a extras 23 de bucati, toate
# cod, si niciun titlu: `Arhiva care raspunde` a stat in `<title>` fara diacritice, desi
# `raspunde` e in lista de cuvinte de cand exista poarta. Verdictul 0 nu insemna curat,
# insemna ca nu se masura nimic.
#
# Extragerea are de acum martorii ei in `controale()`. Martorii vechi probau doar
# `analizeaza()`, adica pasul de DUPA extragere - tocmai pasul care nu era stricat.
#
# A DOUA reparatie, in aceeasi zi: tiparele nu stiau ce e COMENTARIU. Un identificator
# citat cu accente grave intr-o nota - `pagina: PRIMARII`, scris ca sa explice cum se
# adauga un segment - devenea "text romanesc fara diacritice", fiindca sirul sablon se
# potriveste oriunde, si in proza. E acelasi tipar ca peste tot: o explicatie care
# CITEAZA constructia pe litere devine o instanta a ei. Deci extragerea nu mai e o
# colectie de tipare, ci un scaner care stie in ce stare e: cod, sir, comentariu.
LUNGIME_MINIMA_SIR = 12
BSLASH = chr(92)


def siruri_din_cod(continut):
    """Continutul sirurilor dintr-un fisier TypeScript, fara ce e in comentarii.

    Un scaner, nu tipare: numai asa se poate deosebi `//` dintr-o adresa web de `//`
    care incepe o nota, si numai asa un sir citat intr-un comentariu nu ajunge sa fie
    masurat ca text de citit. Nu e un parser de TypeScript si nu trebuie sa fie -
    trebuie doar sa nu confunde cele trei stari.
    """
    siruri = []
    i, n = 0, len(continut)
    while i < n:
        c = continut[i]
        if c == '/' and i + 1 < n and continut[i + 1] == '/':
            j = continut.find('\n', i)
            i = n if j < 0 else j + 1
            continue
        if c == '/' and i + 1 < n and continut[i + 1] == '*':
            j = continut.find('*/', i + 2)
            i = n if j < 0 else j + 2
            continue
        if c in ('"', "'", '`'):
            inceput = i + 1
            i += 1
            while i < n:
                if continut[i] == BSLASH:
                    i += 2
                    continue
                if continut[i] == c:
                    break
                # Un sir cu ghilimele simple sau duble nu trece de capatul randului:
                # daca vad linie noua inainte de inchidere, nu era un sir, era altceva
                # (o apostrofa in proza, un operator). Ma opresc si reiau de acolo.
                if continut[i] == '\n' and c != '`':
                    break
                i += 1
            if i < n and continut[i] == c:
                siruri.append(continut[inceput:i])
                i += 1
            else:
                i = inceput
            continue
        i += 1
    return siruri


def pare_cod(bucata):
    """Textul citit de om nu poarta sintaxa.

    Fara filtrul asta, poarta raporteaza numele proprietatilor - `intrebare=`,
    `ex.raspuns` - ca text romanesc fara diacritice, adica se inroseste pe cod corect.
    Masurat pe primul continut real: 8 din 9 constatari erau de acest fel.
    """
    b = bucata.strip()
    if any(ch in b for ch in '<>{}=$`'):
        return True
    if len(b.split()) < 2:
        return True
    return False


def text_vizibil(cale, continut):
    """Ce citeste un OM din fisier: textul din JSX plus continutul sirurilor.

    `.ts` intra la fel ca `.tsx`, nu ca text brut: fisierele de continut - liste de
    segmente, tabele de termene - tin proza in siruri, iar restul e cod. Cat timp `.ts`
    lipsea din `EXTENSII`, proza din `src/content/*.ts` nu era masurata deloc.
    """
    if cale.endswith(('.tsx', '.ts')):
        bucati = TIPAR_TEXT_JSX.findall(continut) if cale.endswith('.tsx') else []
        bucati += [s for s in siruri_din_cod(continut) if len(s) >= LUNGIME_MINIMA_SIR]
        return '\n'.join(b for b in bucati if not pare_cod(b))
    return continut


def fisiere():
    gasite = []
    for cale in CAI:
        absolut = os.path.join(RADACINA, cale)
        if not os.path.isdir(absolut):
            continue
        for radacina, directoare, nume in os.walk(absolut):
            directoare[:] = [d for d in directoare if d not in SARITE]
            for n in nume:
                if n.endswith(EXTENSII):
                    gasite.append(os.path.join(radacina, n))
    return sorted(gasite)


def analizeaza(text):
    """Intoarce lista de (fel, numar_rand, fragment)."""
    gasiri = []
    for numar, rand in enumerate(text.splitlines(), start=1):
        # sarim adresele si caile, unde diacriticele nu au ce cauta
        curat = re.sub(r'https?://\S+', ' ', rand)
        curat = re.sub(r'[\w./-]+\.(?:tsx|ts|mdx|md|png|svg|json)\b', ' ', curat)
        # Se raporteaza TOATE potrivirile de pe rand, nu doar prima: cu `search`, un
        # rand cu trei cuvinte gresite se repara in trei rulari, iar ultimele doua par
        # aparute din senin dupa ce le-am "reparat" pe primele.
        for m in TIPAR_CUVINTE.finditer(curat):
            gasiri.append(('cuvant fara diacritice: ' + m.group(1), numar, rand.strip()[:110]))
        k = TIPAR_CHEIE.search(curat)
        if k:
            gasiri.append(('cheie de traducere scapata: ' + k.group(0).strip(), numar, rand.strip()[:110]))
    if TIPAR_FORMAL.search(text) and TIPAR_INFORMAL.search(text):
        gasiri.append(('adresare amestecata: dumneavoastra impreuna cu tu', 0, ''))
    return gasiri


def controale():
    pozitiv = '\n'.join([
        'Va ' + 'raspunde' + ' in ' + 'romana' + ' imediat.',
        'pricing.f_workspace_ 7',
        'Arhiva dumneavoastra si arhiva ta.',
    ])
    g = analizeaza(pozitiv)
    feluri = ' '.join(x[0] for x in g)
    if 'cuvant fara diacritice' not in feluri:
        return 'martorul pozitiv: cuvintele fara diacritice nu au fost prinse'
    if 'cheie de traducere' not in feluri:
        return 'martorul pozitiv: cheia de traducere nu a fost prinsa'
    if 'adresare amestecata' not in feluri:
        return 'martorul pozitiv: amestecul de adresare nu a fost prins'
    negativ = 'Va răspundem în română, iar arhiva dumneavoastră rămâne a dumneavoastră.'
    if analizeaza(negativ):
        return 'martorul negativ a fost prins: tiparele sunt prea late'

    # Martorii EXTRAGERII, nu ai analizei. Fara ei, poarta poate iesi 0 fiindca nu a
    # citit nimic - si exact asta s-a intamplat luni intregi pe `layout.tsx`.
    # Fixtura se asambleaza aici, la rulare, nu sta scrisa intr-un fisier: un fisier de
    # proba cu un cuvant gresit ar fi el insusi prins de poarta pe care o probeaza.
    g = chr(96)  # accent grav, scris asa ca sa nu deschida o comanda in shell
    sursa = '\n'.join([
        'import type { Metadata } from "next";',   # sirul SCURT care decala perechile
        'export const T = {',
        '  titlu: "3S - arhiva care raspunde repede",',
        "  nota: 'Va pastram documentele in conditii de siguranta.',",
        '  sablon: ' + g + 'Termenul de pastrare a fost stabilit prin lege.' + g + ',',
        # nota care CITEAZA un identificator: nu e text de citit, e explicatie de cod
        '  // se scrie ' + g + 'pagina: PRIMARII' + g + ' in lista de segmente',
        # adresa web cu doua bare INTR-UN SIR: nu incepe un comentariu
        '  adresa: "https://exemplu.test/pagina-de-proba",',
        '  dupa: "Documentele se pastreaza in depozit.",',
        '};',
    ])
    extras = text_vizibil('proba.ts', sursa)
    for asteptat in ('raspunde', 'pastram', 'pastrare'):
        if asteptat not in extras:
            return ('martorul de extragere: sirul cu `' + asteptat + '` nu a fost extras din `.ts` - '
                    'poarta ar iesi 0 fiindca nu citeste, nu fiindca e curat')
    if not analizeaza(extras):
        return 'martorul de extragere: textul extras contine greseli, dar analiza nu le-a gasit'
    if 'PRIMARII' in extras:
        return ('martorul de comentariu: un identificator citat intr-o nota a fost extras ca text - '
                'poarta ar cere sa se strice o explicatie corecta')
    if 'Documentele se pastreaza' not in extras:
        return ('martorul de adresa web: scanerul a luat cele doua bare dintr-o adresa drept inceput '
                'de comentariu si a inghitit restul fisierului')

    # Si controlul opus: un fisier care contine NUMAI cod nu trebuie sa produca text.
    doar_cod = 'import { useState } from "react";\nconst x = a.b_ + 1;\n'
    if analizeaza(text_vizibil('proba.ts', doar_cod)):
        return 'martorul negativ de extragere: cod curat a fost raportat ca text gresit'
    return None


def main():
    motiv = controale()
    if motiv:
        print('CONTROL PICAT: ' + motiv, file=sys.stderr)
        return 3

    lista = fisiere()
    if not lista:
        print('poarta-limba: niciun fisier de verificat - masuratoarea e invalida', file=sys.stderr)
        return 3

    total = 0
    for cale in lista:
        continut = open(cale, encoding='utf-8').read()
        vizibil = text_vizibil(cale, continut)
        rel = os.path.relpath(cale, RADACINA)
        for fel, numar, fragment in analizeaza(vizibil):
            unde = rel + (':' + str(numar) if numar else '')
            print(unde + '  ' + fel + ('  | ' + fragment if fragment else ''))
            total += 1

    print('CONTROALE: martor pozitiv OK, martor negativ OK')
    print('SURSA: ' + str(len(lista)) + ' fisier(e)')
    print('DEFECTE DE LIMBA: ' + str(total))
    return 1 if total else 0


if __name__ == '__main__':
    sys.exit(main())
