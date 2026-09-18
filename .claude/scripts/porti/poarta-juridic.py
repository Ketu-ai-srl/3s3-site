#!/usr/bin/env python3
"""Poarta juridica: cerintele legale din PORTI-FABRICA.md sectiunea 2 care se pot
verifica in cod, fara browser si fara serviciu extern.

FIECARE MESAJ DE EROARE CITEAZA ACTUL. Un om care vede poarta rosie trebuie sa
stie de ce e obligat, nu doar ca "asa zice scriptul". Un temei nescris se
negociaza; unul scris se respecta.

CE VERIFICA, cu codurile stabile din documentul de porti:
  L-01  paginile obligatorii de identificare a comerciantului exista, iar datele
        firmei sunt complete si apar in HTML-ul livrat pe FIECARE pagina publica
  L-05  temeiul formularului de contact nu e consimtamantul
  L-09  zero trimiteri catre platforma SOL / ODR (abrogata, deci link mort)
  L-10  site-ul NU afiseaza numar de inregistrare ca operator de date
  L-15  textele juridice exista in romana
  C-01  zero scripturi si resurse de la terti in sursa si in HTML-ul construit

DOUA SEVERITATI, si de ce difera pe mediu:
  Portile de ABSENTA (L-09, L-10, C-01, si tiparul interzis din L-05) OPRESC
  intotdeauna. Sunt gratuite de satisfacut: nu ceri nimanui sa scrie ceva, ceri
  sa nu adauge. Nu au cum sa blocheze munca legitima.
  Portile de PREZENTA (L-01, L-15, textul cerut de L-05) sunt AVERT pe staging si
  OPRESC la productie. Motivul e faptul, nu comoditatea: firma 3S nu e inregistrata
  inca, deci CUI-ul si numarul ORC nu EXISTA, iar o poarta pe care nimeni din
  fabrica nu o poate satisface nu e poarta (sectiunea 1.5 din document). Ce face
  poarta in schimb e sa BLOCHEZE PUBLICAREA IN PRODUCTIE cat timp raman locuri
  goale - exact cerinta, si singura forma in care e onesta.

  Mediul: --mediu productie, sau variabila SITE_ENV. Implicit e staging.

DE UNDE CITESTE. Sursa (`src/`, `public/`) SI HTML-ul construit din
`.next/server/app`, cand exista. Amandoua, fiindca un link catre ODR poate fi
adaugat si intr-o componenta, si intr-un fisier static din public/, iar datele
firmei se dovedesc numai pe ce se LIVREAZA, nu pe ce se scrie.

DATELE FIRMEI NU SE CODEAZA IN JSX. Poarta le citeste din
`config/entitate.<jurisdictie>.json`, care e forma corecta oricum si e ceruta
explicit de document. Fisierul nu exista inca; poarta spune exact ce forma are.

CONTROALE, la fiecare rulare:
  martor POZITIV  un arbore de proiect fabricat la rulare, cu cate un defect din
                  fiecare clasa; daca nu e prins integral, verdictul e 3, nu 0
  martor NEGATIV  acelasi arbore, curat; daca e prins, tiparele sunt prea late
Tiparele interzise se asambleaza din bucati la RULARE: un link ODR scris intreg
in corpul acestui fisier ar fi chiar defectul pe care poarta il vaneaza.

CE NU VERIFICA (reziduuri)
Intrebarea pe care o pune de fapt, pe cod:
  L-01  "apare valoarea LITERALA a fiecarui camp undeva in pagina livrata?" Un cod fiscal
        dintr-un comentariu sau dintr-un bloc ascuns satisface verificarea. Nu se masoara ca
        datele sunt PREZENTATE ca identificare a comerciantului, si nici ca sunt corecte.
  L-05  "apare undeva sintagma care numeste temeiul, si lipseste tiparul de consimtamant?"
        Ce face formularul in realitate nu se citeste.
  L-09, L-10  cautare de tipare in text. O trimitere construita din bucati la randare trece.
  L-15  "exista rutele juridice?" Nimic despre continutul lor: o pagina goala trece.
  C-01  resurse SUB-INCARCATE din HTML-ul static, plus o lista de nume de furnizori in sursa.
        Un tert incarcat la RULARE de un script al paginii e invizibil, fiindca nimeni nu
        executa pagina aici. Lista de nume e scrisa de mana; un furnizor nelistat trece.
Si limita cea mai usor de citit gresit: pe STAGING, portile de PREZENTA (L-01, L-15, textul
cerut de L-05) sunt AVERT, nu OPRESTE. Verde pe staging inseamna "nimic din clasa de absenta
nu a iesit", nu "site-ul e in regula juridic". Fara HTML construit, jumatatea livrata a lui
L-01 si a lui C-01 nu ruleaza deloc si se raporteaza ca avertisment.

LA ROSU: CE AI VOIE SA EDITEZI
  DA  fisierul de configurare a entitatii, care se COMPLETEAZA.
      Paginile juridice si textul formularului.
      GAZDE_PROPRII si NUME_TERTI prin ADAUGARE, cu motiv scris pe rand.
  NU  RUTE_JURIDICE, CAMPURI_IDENTITATE, TIPAR_SUBSTITUENT, temeiurile citate, gradarea pe
      mediu, stergerea unui nume din NUME_TERTI, controale().

IESIRE
    0 = curat (avertismentele se tiparesc, dar nu opresc)
    1 = defecte din clasa OPRESTE
    2 = eroare de folosire
    3 = NEMASURAT: control picat sau nicio sursa de citit
"""
import argparse
import glob
import json
import os
import re
import sys
import unicodedata

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

RADACINA_IMPLICITA = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

OPRESTE = 'OPRESTE'
AVERT = 'AVERT'

CAI_SURSA = ('src', 'public')
EXTENSII = ('.tsx', '.ts', '.jsx', '.js', '.mdx', '.md', '.json', '.css', '.html', '.txt', '.xml', '.svg')
SARITE = {'node_modules', '.next', '.git', '__pycache__', '.claude'}

# Rutele juridice cerute la V1. `cookie-uri` NU e in lista neconditionat: decizia
# de arhitectura (sectiunea 1.6) e zero cookie-uri neesentiale, iar o pagina de
# politica de cookie-uri pe un site fara cookie-uri e o afirmatie despre ceva ce
# nu exista. Devine ceruta in clipa in care C-01 gaseste primul tert.
RUTE_JURIDICE = ('confidentialitate', 'termeni')

# Campurile neconditionate din Legea 365/2002 art. 5 alin. (1) lit. a)-e).
# Lit. f)-i) sunt conditionate (regim de autorizare, profesie reglementata,
# afisare de tarife) si se cer prin steaguri din aceeasi configurare.
CAMPURI_IDENTITATE = ('denumire', 'sediu', 'email', 'telefon', 'numar_orc', 'cod_fiscal')

# Ce inseamna "loc gol". Nu doar sirul vid: un substituent lasat in fisier e mai
# periculos, fiindca trece orice verificare de "nevid" si ajunge pe pagina.
TIPAR_SUBSTITUENT = re.compile(r'(TODO|TBD|XXX+|\?\?\?|N/?A\b|de\s+completat|necunoscut|<[^>]*>|lorem)', re.I)

# Gazdele proprii. O resursa incarcata de aici nu e "tert". Lista e scurta si
# motivata: doar mediile noastre. O gazda adaugata aici trebuie sa vina cu motiv.
GAZDE_PROPRII = {'3s2.ke2.in', '3s.ro', 'localhost', '127.0.0.1'}

# Furnizori de urmarire cunoscuti, cautati si in sursa, nu doar in HTML: un
# `import` de SDK nu produce neaparat un `<script src>` absolut in build.
NUME_TERTI = [
    'googletagmanager', 'google-analytics', 'gtag/js', 'doubleclick',
    'connect.facebook.net', 'fbevents', 'hotjar', 'clarity.ms', 'mixpanel',
    'segment.com', 'analytics.js', 'matomo', 'plausible.io', 'fullstory',
    'fonts.googleapis.com', 'fonts.gstatic.com', 'cdn.jsdelivr.net', 'unpkg.com',
]


def fara_diacritice(text):
    """Comparatiile juridice se fac pe text normalizat: legea nu se schimba daca
    cineva scrie `soluţionarea` cu sedila in loc de virgula."""
    d = unicodedata.normalize('NFD', text)
    return ''.join(c for c in d if unicodedata.category(c) != 'Mn')


def normalizeaza(text):
    return re.sub(r'\s+', ' ', fara_diacritice(text)).lower()


# --- tiparele interzise, asamblate la rulare -------------------------------
# Se compun din bucati fiindca poarta scaneaza depozitul: un link ODR scris
# intreg aici ar fi cules ca defect real la prima rulare peste propriul dosar.

def tipare_sol():
    odr = 'consumers' + '/' + 'odr'
    return [
        (re.compile(re.escape(odr)), 'adresa platformei ODR a Comisiei'),
        (re.compile(r'webgate\.ec\.europa\.eu' + r'/' + r'odr'), 'adresa webgate ODR'),
        (re.compile(r'\bsolutionarea\s+online\s+a\s+litigiilor\b'), 'sintagma SOL'),
        (re.compile(r'\bplatforma\s+sol\b'), 'trimitere la platforma SOL'),
        (re.compile(r'\bonline\s+dispute\s+resolution\b'), 'trimitere ODR in engleza'),
    ]


TEMEI_SOL = ('Reg. (UE) 2024/3228 a abrogat Reg. (UE) 524/2013, platforma s-a inchis 20.07.2025. '
             'Un link mort e informatie inexacta, sanctionata de Legea 365/2002 art. 21 lit. a)')

TIPAR_OPERATOR = re.compile(r'\bnum[ae]r\w*\b.{0,120}?\boperator', re.S)
TEMEI_OPERATOR = ('Registrul operatorilor de date a fost desfiintat. Nu afisam numarul fiindca nu '
                  'putem dovedi ca mai exista, nu fiindca am citit actul de abrogare (L-10)')

TEMEI_IDENTITATE = ('Legea 365/2002 republicata, art. 5 alin. (1) lit. a)-e). Sanctiuni: art. 22 lit. b), '
                    'amenda 1.000-50.000 lei, si art. 21 lit. a), nulitatea relativa a contractului')
TEMEI_ART13 = 'GDPR art. 12 alin. (1) si art. 13; pentru MD, Legea 195/2024 art. 13'
TEMEI_FORMULAR = ('GDPR art. 6 alin. (1) lit. b): relatia precontractuala e temeiul, nu consimtamantul. '
                  'Un temei declarat gresit e eroare de fond, nu de redactare')
TEMEI_TERTI = ('Art. 5 alin. (3) ePrivacy / Directiva 2002/58 si GDPR art. 44-49. Zero terti inseamna '
               'zero banner, zero transfer de declarat si zero clasa de risc care a produs amenzile ANSPDCP')


def tipare_formular_interzis():
    a = r'trimiterea\s+(acestui\s+)?formular\w*'
    b = r'consimt'
    return [
        re.compile(a + r'.{0,90}?' + b, re.S),
        re.compile(b + r'.{0,90}?' + a, re.S),
    ]


TEXT_CERUT_FORMULAR = 'demersuri precontractuale'


# --- culegerea fisierelor --------------------------------------------------

def fisiere_sursa(radacina):
    gasite = []
    for cale in CAI_SURSA:
        absolut = os.path.join(radacina, cale)
        if not os.path.isdir(absolut):
            continue
        for r, directoare, nume in os.walk(absolut):
            directoare[:] = [d for d in directoare if d not in SARITE]
            for n in nume:
                if n.endswith(EXTENSII):
                    gasite.append(os.path.join(r, n))
    return sorted(gasite)


def fisiere_construite(radacina):
    dosar = os.path.join(radacina, '.next', 'server', 'app')
    return sorted(glob.glob(os.path.join(dosar, '**', '*.html'), recursive=True))


def build_invechit(radacina):
    """True cand HTML-ul construit e mai vechi decat sursa din care ar trebui sa vina.

    De ce e nevoie: identitatea firmei (L-01) si tertii (C-01) se masoara pe HTML-ul
    LIVRAT. Un HTML vechi citit ca si cum ar fi cel de acum e mai rau decat lipsa lui,
    fiindca poarta iese VERDE pe un site care nu mai exista. Lipsa se trateaza separat,
    ca avertisment; invechirea inseamna NEMASURAT.
    """
    construite = fisiere_construite(radacina)
    if not construite:
        return False
    sursa = fisiere_sursa(radacina)
    cel_mai_nou_din_sursa = max((os.path.getmtime(c) for c in sursa), default=0)
    cel_mai_vechi_din_build = min(os.path.getmtime(c) for c in construite)
    return cel_mai_nou_din_sursa > cel_mai_vechi_din_build


def citeste(cale):
    try:
        return open(cale, encoding='utf-8', errors='replace').read()
    except OSError:
        return ''


# --- verificarile ----------------------------------------------------------

def cauta_absenta(documente, tipare, cod, temei, eticheta):
    """Portile de absenta. `documente` = lista de (nume, text)."""
    g = []
    for nume, text in documente:
        n = normalizeaza(text)
        for tipar, descriere in tipare:
            m = tipar.search(n)
            if m:
                context = n[max(0, m.start() - 30):m.end() + 30]
                g.append((OPRESTE, cod, nume + ': ' + eticheta + ' (' + descriere + ') | ...'
                          + context + '... | TEMEI: ' + temei))
    return g


def verifica_terti(construite, sursa):
    """C-01. In HTML se cauta resursele SUB-INCARCATE (script/link/iframe/img), nu
    orice adresa absoluta: un `<a href>` catre un site extern e link normal, nu
    tert incarcat in echipamentul vizitatorului."""
    g = []
    tipar_resursa = re.compile(
        r'<(script|iframe|img|link|source|video|audio)\b[^>]*?\b(?:src|href)\s*=\s*["\'](https?://[^"\']+)["\']',
        re.I | re.S)
    for nume, text in construite:
        # comentariile HTML se scot inainte: un `<script src="...">` citat intr-un
        # comentariu nu incarca nimic, dar ar produce un defect fantoma
        curat = re.sub(r'<!--.*?-->', ' ', text, flags=re.S)
        for m in tipar_resursa.finditer(curat):
            adresa = m.group(2)
            gazda = re.sub(r'^https?://', '', adresa).split('/')[0].split(':')[0].lower()
            if gazda not in GAZDE_PROPRII:
                g.append((OPRESTE, 'C-01', nume + ': resursa <' + m.group(1).lower() + '> incarcata de la tertul '
                          + gazda + ' | TEMEI: ' + TEMEI_TERTI))
    for nume, text in sursa + construite:
        n = text.lower()
        for furnizor in NUME_TERTI:
            if furnizor in n:
                g.append((OPRESTE, 'C-01', nume + ': apare furnizorul tert "' + furnizor
                          + '" | TEMEI: ' + TEMEI_TERTI))
    return g


def verifica_formular(documente, sever_prezenta):
    g = []
    are_formular = False
    for nume, text in documente:
        n = normalizeaza(text)
        for tipar in tipare_formular_interzis():
            m = tipar.search(n)
            if m:
                g.append((OPRESTE, 'L-05', nume + ': formularul isi declara temeiul drept consimtamant | ...'
                          + n[max(0, m.start() - 20):m.end() + 20] + '... | TEMEI: ' + TEMEI_FORMULAR))
        if '<form' in n or 'onsubmit' in n:
            are_formular = True
    if are_formular:
        gasit = any(TEXT_CERUT_FORMULAR in normalizeaza(t) for _, t in documente)
        if not gasit:
            g.append((sever_prezenta, 'L-05', 'exista formular, dar nicaieri nu apare sintagma "'
                      + TEXT_CERUT_FORMULAR + '" care numeste temeiul | TEMEI: ' + TEMEI_FORMULAR))
    return g


def verifica_rute_juridice(radacina, construite, sever_prezenta):
    g = []
    for ruta in RUTE_JURIDICE:
        exista = False
        for tipar in ('src/app/%s/page.tsx', 'src/app/%s/page.mdx', 'src/app/%s/page.ts',
                      'src/app/ro/%s/page.tsx', 'src/app/ro/%s/page.mdx'):
            if os.path.isfile(os.path.join(radacina, tipar % ruta)):
                exista = True
        for nume, _ in construite:
            if ruta in nume.replace(os.sep, '/'):
                exista = True
        if not exista:
            g.append((sever_prezenta, 'L-15', 'lipseste ruta juridica /' + ruta
                      + ' | TEMEI: ' + TEMEI_ART13 + '; identificarea comerciantului, Legea 365/2002 art. 5'))
    return g


def verifica_identitate(radacina, jurisdictie, construite, sever_prezenta):
    g = []
    cale = os.path.join(radacina, 'config', 'entitate.' + jurisdictie + '.json')
    rel = os.path.relpath(cale, radacina).replace(os.sep, '/')
    if not os.path.isfile(cale):
        g.append((sever_prezenta, 'L-01', 'lipseste ' + rel + ', cu campurile '
                  + ', '.join(CAMPURI_IDENTITATE) + ' | TEMEI: ' + TEMEI_IDENTITATE))
        return g
    try:
        date = json.loads(citeste(cale))
    except ValueError as e:
        g.append((OPRESTE, 'L-01', rel + ' nu e JSON valid: ' + str(e)))
        return g

    goale = []
    for camp in CAMPURI_IDENTITATE:
        valoare = str(date.get(camp, '')).strip()
        if not valoare or TIPAR_SUBSTITUENT.search(valoare):
            goale.append(camp)
    if goale:
        g.append((sever_prezenta, 'L-01', rel + ': loc gol la ' + ', '.join(goale)
                  + ' | TEMEI: ' + TEMEI_IDENTITATE))
        return g

    # Configurarea e completa: de aici incolo obligatia e sa APARA pe fiecare
    # pagina publica livrata, iar asta se masoara numai pe HTML-ul construit.
    if not construite:
        g.append((AVERT, 'L-01', 'datele firmei sunt complete, dar nu exista HTML construit '
                  'in care sa verific ca apar pe fiecare pagina. Ruleaza pnpm build'))
        return g
    for nume, text in construite:
        n = normalizeaza(text)
        for camp in CAMPURI_IDENTITATE:
            valoare = normalizeaza(str(date[camp]))
            if valoare not in n:
                g.append((OPRESTE, 'L-01', nume + ': campul ' + camp + ' din ' + rel
                          + ' nu apare in pagina livrata | TEMEI: ' + TEMEI_IDENTITATE))
    return g


def analizeaza(radacina, mediu, jurisdictie='ro'):
    """Verdictul complet. Aceeasi functie ruleaza pe proiectul real si pe martori."""
    sever_prezenta = OPRESTE if mediu == 'productie' else AVERT

    sursa = [(os.path.relpath(c, radacina).replace(os.sep, '/'), citeste(c)) for c in fisiere_sursa(radacina)]
    construite = [(os.path.relpath(c, radacina).replace(os.sep, '/'), citeste(c))
                  for c in fisiere_construite(radacina)]
    toate = sursa + construite

    g = []
    # Ordinea: portile ieftine de absenta intai. Un pas ieftin pus dupa cel scump
    # nu economiseste nimic, iar aici cel scump e comparatia pe fiecare pagina.
    g.extend(cauta_absenta(toate, tipare_sol(), 'L-09', TEMEI_SOL, 'trimitere catre platforma SOL/ODR'))
    g.extend(cauta_absenta(toate, [(TIPAR_OPERATOR, 'numar langa cuvantul operator')],
                           'L-10', TEMEI_OPERATOR, 'numar de inregistrare ca operator de date'))
    g.extend(verifica_terti(construite, sursa))
    g.extend(verifica_formular(toate, sever_prezenta))
    g.extend(verifica_rute_juridice(radacina, construite, sever_prezenta))
    g.extend(verifica_identitate(radacina, jurisdictie, construite, sever_prezenta))
    return g, len(toate)


# ---------------------------------------------------------------- martorii

def scrie(cale, continut):
    os.makedirs(os.path.dirname(cale), exist_ok=True)
    # newline='\n' explicit: pe Windows, un \r intr-un fisier intermediar face
    # potrivirea sa reuseasca sau sa esueze dupa POZITIA elementului in fisier.
    with open(cale, 'w', encoding='utf-8', newline='\n') as f:
        f.write(continut)


def fabrica_arbore(dosar, defect):
    """Construieste un proiect minimal in `dosar`. `defect` False = curat."""
    scrie(os.path.join(dosar, 'src', 'app', 'confidentialitate', 'page.tsx'),
          'export default function P() { return <p>Politica</p> }\n')
    scrie(os.path.join(dosar, 'src', 'app', 'termeni', 'page.tsx'),
          'export default function P() { return <p>Termeni</p> }\n')
    scrie(os.path.join(dosar, 'config', 'entitate.ro.json'), json.dumps({
        'denumire': 'Trei S Arhivare SRL',
        'sediu': 'Golesti, judetul Arges',
        'email': 'contact@exemplu-3s.test',
        'telefon': '+40 000 000 000',
        'numar_orc': 'J03/1234/2026',
        'cod_fiscal': 'RO12345678',
    }, ensure_ascii=False, indent=2) + '\n')

    corp = [
        '<html><body>',
        '<p>Trei S Arhivare SRL, Golesti, judetul Arges</p>',
        '<p>contact@exemplu-3s.test, +40 000 000 000</p>',
        '<p>J03/1234/2026, RO12345678</p>',
        '<form><input name="nume"/><p>Prelucram datele pentru demersuri precontractuale.</p></form>',
        # control negativ inclus in fixtura: un link EXTERN normal, care NU e tert
        # incarcat, si un comentariu care CITEAZA un script de la un tert.
        '<a href="https://exemplu-extern.test/pagina">un link extern normal</a>',
        '<!-- nota: aici NU punem <script src="https://cdn.exemplu.test/x.js"></script> -->',
    ]
    if defect:
        odr = 'https://ec.europa.eu/' + 'consumers' + '/' + 'odr'
        corp.append('<a href="' + odr + '">Platforma SOL</a>')
        corp.append('<p>Numarul nostru de inregistrare ca operator de date este 12345.</p>')
        corp.append('<script src="' + 'https://cdn.' + 'exemplu-tert.test' + '/urmarire.js"></script>')
        corp.append('<p>Prin ' + 'trimiterea formularului' + ' va dati ' + 'consimtamantul' + ' expres.</p>')
    corp.append('</body></html>')
    scrie(os.path.join(dosar, '.next', 'server', 'app', 'index.html'), ''.join(corp))


def controale():
    import shutil
    import tempfile
    temp = tempfile.mkdtemp(prefix='proba-juridic-')
    try:
        pozitiv = os.path.join(temp, 'defect')
        fabrica_arbore(pozitiv, defect=True)
        g, _ = analizeaza(pozitiv, 'staging')
        coduri = set(c for _, c, _ in g)
        for asteptat in ('L-09', 'L-10', 'C-01', 'L-05'):
            if asteptat not in coduri:
                return 'martorul pozitiv nu a fost prins pe ' + asteptat
        if any(sev != 'OPRESTE' for sev, c, _ in g if c in ('L-09', 'L-10', 'C-01')):
            return 'martorul pozitiv: o poarta de absenta a iesit ca avertisment, nu ca oprire'

        negativ = os.path.join(temp, 'curat')
        fabrica_arbore(negativ, defect=False)
        g2, _ = analizeaza(negativ, 'staging')
        if g2:
            return 'martorul negativ a fost prins: ' + '; '.join(c + ' ' + m[:90] for _, c, m in g2)

        # al treilea martor, cel care apara chiar mecanismul de mediu: acelasi
        # arbore curat, dar cu date de firma incomplete, trebuie sa fie AVERT pe
        # staging si OPRESTE la productie. Fara el, gradarea pe mediu e o intentie.
        pe_jumatate = os.path.join(temp, 'jumatate')
        fabrica_arbore(pe_jumatate, defect=False)
        cale_cfg = os.path.join(pe_jumatate, 'config', 'entitate.ro.json')
        date = json.loads(citeste(cale_cfg))
        date['cod_fiscal'] = 'de completat'
        scrie(cale_cfg, json.dumps(date, ensure_ascii=False, indent=2) + '\n')
        gs, _ = analizeaza(pe_jumatate, 'staging')
        gp, _ = analizeaza(pe_jumatate, 'productie')
        if not any(c == 'L-01' and sev == AVERT for sev, c, _ in gs):
            return 'martorul de mediu: locul gol nu a iesit ca AVERT pe staging'
        if not any(c == 'L-01' and sev == OPRESTE for sev, c, _ in gp):
            return 'martorul de mediu: locul gol nu a OPRIT la productie'

        # al patrulea martor: prospetimea build-ului. Arborele curat de mai sus are
        # HTML-ul scris ULTIMUL, deci proaspat - nu trebuie raportat invechit. Acelasi
        # arbore cu HTML-ul imbatranit cu o ora trebuie raportat invechit.
        if build_invechit(negativ):
            return 'martorul de prospetime: un build proaspat a fost raportat invechit'
        html = os.path.join(negativ, '.next', 'server', 'app', 'index.html')
        batran = os.path.getmtime(html) - 3600
        os.utime(html, (batran, batran))
        if not build_invechit(negativ):
            return 'martorul de prospetime: un build mai vechi decat sursa a trecut ca proaspat'
        return None
    finally:
        shutil.rmtree(temp, ignore_errors=True)


def main():
    p = argparse.ArgumentParser(description='Poarta juridica (L-01, L-05, L-09, L-10, L-15, C-01).')
    p.add_argument('--radacina', default=RADACINA_IMPLICITA)
    p.add_argument('--mediu', choices=('staging', 'productie'),
                   default=('productie' if os.environ.get('SITE_ENV') == 'productie' else 'staging'),
                   help='la productie, locurile goale OPRESC in loc sa avertizeze')
    p.add_argument('--jurisdictie', default='ro')
    a = p.parse_args()

    motiv = controale()
    if motiv:
        print('CONTROL PICAT: ' + motiv, file=sys.stderr)
        return 3

    radacina = os.path.abspath(a.radacina)
    if build_invechit(radacina):
        print('poarta-juridic: HTML-ul construit e mai vechi decat sursa - as masura un site '
              'care nu mai exista. Ruleaza pnpm build.', file=sys.stderr)
        return 3
    gasiri, numar = analizeaza(radacina, a.mediu, a.jurisdictie)
    if numar == 0:
        print('poarta-juridic: niciun fisier de citit - masuratoarea e invalida, nu curata', file=sys.stderr)
        return 3

    opreste = [g for g in gasiri if g[0] == OPRESTE]
    avert = [g for g in gasiri if g[0] == AVERT]
    for sev, cod, mesaj in opreste:
        print('OPRESTE  ' + cod + '  ' + mesaj)
    for sev, cod, mesaj in avert:
        print('AVERT    ' + cod + '  ' + mesaj)

    print('CONTROALE: martor pozitiv OK, martor negativ OK, martor de mediu OK')
    print('MEDIU: ' + a.mediu + ' (la productie, avertismentele de mai sus devin opriri)')
    print('SURSA: ' + str(numar) + ' fisier(e), sursa plus HTML construit')
    print('DEFECTE JURIDICE: ' + str(len(opreste)) + ' care opresc, ' + str(len(avert)) + ' de avertisment')
    return 1 if opreste else 0


if __name__ == '__main__':
    sys.exit(main())
