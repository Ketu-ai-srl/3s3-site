#!/usr/bin/env python3
"""Poarta de SEO: se masoara pe HTML-ul CONSTRUIT, niciodata pe sursa JSX.

DE CE pe HTML-ul construit. Titlul, descrierea si canonical-ul din Next.js nu
exista in `layout.tsx` in forma in care le vede un crawler: se compun din
`metadata`, din `template`, din pagina si din segmentul de ruta. O poarta care
citeste JSX masoara intentia, nu livrarea. Cea mai scumpa clasa de defect din
SEO - canonical mostenit din mediul de proba - e invizibila in sursa si evidenta
in `.next/server/app/*.html`.

DE CE refuza sa masoare un build vechi. Un HTML construit inainte de ultima
modificare a sursei da un verdict despre un site care nu mai exista. Verdictul
ala e mai rau decat lipsa lui, fiindca poarta iese VERDE. Deci: build mai vechi
decat `src/` inseamna iesire 3 (NEMASURAT), nu 0.

CE VERIFICA, cu codurile stabile din PORTI-FABRICA.md sectiunea 5:
  S-01  un singur <title> nevid, 15-65 caractere, unic in lot
        o singura <meta name="description"> nevida, 50-160 caractere, unica
  S-02  exact un <link rel="canonical">, absolut, https, fara parametri,
        auto-referential (calea din canonical = ruta paginii), gazda consecventa
  S-03  exact un <h1> nevid si nicio saritura de nivel (h2 urmat de h4 pica)
  S-09  fiecare bloc application/ld+json trece JSON.parse, @context e schema.org
        si fiecare @type e in vocabularul declarat

SEVERITATI, luate din tabelul de operare (sectiunea 8), nu inventate aici:
  S-01, S-02, S-09 = OPRESTE (iesire 1)
  S-03             = AVERT (se raporteaza, lotul avanseaza)
Absenta oricarui bloc JSON-LD e AVERT: S-09 pune conditii asupra blocurilor care
EXISTA. Cerinta ca un nod Organization sa existe e o decizie de continut, nu una
de poarta, si se ia in alta zona decat asta.

PRAGURILE. Sursa e PORTI-FABRICA.md sectiunea 5, S-01: titlu 15-65, descriere
50-160. Briefingul de sarcina cerea 15-60 si 70-160; am pastrat forma din
document, fiindca sarcina trimite explicit la el ca sursa a pragurilor, si
fiindca o forma mai stricta care nu prinde nimic in plus e o bomba cu ceas
(sectiunea 1.4): se inroseste cand cineva scrie un titlu corect de 62 de
caractere. Pragurile stau in PRAGURI, un singur loc, si se schimba acolo.

CONTROALE, la fiecare rulare:
  martor POZITIV  o pagina fabricata la rulare, cu cate un defect din fiecare
                  clasa; daca nu e prinsa integral, verdictul e 3, nu 0
  martor NEGATIV  o pagina corecta; daca e prinsa, tiparele sunt prea late (3)
Fixturile se asambleaza din bucati la RULARE, niciodata scrise intregi in corpul
fisierului: altfel poarta ajunge sa se raporteze pe propria proba.

CE NU VERIFICA (reziduuri)
Intrebarea pe care o pune de fapt: "au fisierele HTML construite forma ceruta la titlu,
descriere, canonical, antete si blocuri de date structurate?" Nu "se indexeaza site-ul bine".
  - Titlul si descrierea se masoara pe LUNGIME si pe unicitate in lot. Ce SPUN nu se masoara:
    un titlu fara niciun sens, de lungime potrivita, trece.
  - Unicitatea se masoara in interiorul lotului construit acum, nu contra a ce e deja publicat.
  - PAGINI_SARITE scoate paginile interne de eroare din TOATE verificarile, nu doar din
    unicitate. Exceptare motivata, dar ramane o gaura daca cineva pune continut acolo.
  - La datele structurate se verifica parsarea, contextul si ca fiecare tip e in vocabularul
    declarat. NU se verifica daca nodul are campurile obligatorii ale tipului, si nici daca ce
    afirma corespunde paginii. Absenta oricarui bloc e AVERT, deliberat.
  - S-03 (un singur antet de nivel unu, fara sarituri de nivel) e AVERT: nu opreste nimic.
  - Nu se ating: robots, sitemap, viteza, imagini, legaturi interne, limbi alternative,
    redirectari.
  - Se masoara HTML-ul STATIC generat la build. Ce adauga sau schimba codul din browser nu se
    vede de aici.

LA ROSU: CE AI VOIE SA EDITEZI
  DA  metadata paginii acuzate.
      PRAGURI numai odata cu documentul de porti, citand sectiunea din el.
      PAGINI_SARITE numai cu motiv scris pe rand; TIPURI_CUNOSCUTE numai cu un tip real din
      vocabularul declarat.
  NU  Culegator, analizeaza_pagina, analizeaza_lot, refuzul buildului invechit, controale().

IESIRE
    0 = curat (eventual cu avertismente tiparite)
    1 = defecte din clasa OPRESTE
    2 = eroare de folosire
    3 = NEMASURAT: control picat, build lipsa sau build mai vechi decat sursa
"""
import argparse
import glob
import json
import os
import re
import subprocess
import sys
from html.parser import HTMLParser

# Consola Windows e cp1252 si crapa pe diacritice; iesirea se forteaza pe UTF-8,
# altfel poarta moare exact cand are ceva de raportat.
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

RADACINA_IMPLICITA = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

PRAGURI = {
    'titlu_min': 15,
    'titlu_max': 65,
    'descriere_min': 50,
    'descriere_max': 160,
}

# Paginile interne de eroare ale Next.js nu intra in masuratoare. EXCEPTIE MOTIVATA:
# nu apar in sitemap, deci S-01 (unicitate in lot) nu li se aplica, si mostenesc
# prin proiectare metadata implicita a layout-ului, deci ar produce un duplicat
# fantoma la fiecare rulare. O scutire fara motiv scris se sterge; asta are motiv.
PAGINI_SARITE = {'_not-found', '404', '500'}

# Vocabularul de tipuri pe care le emitem noi. Un @type din afara listei NU e
# declarat gresit de la sine - e declarat NEVERIFICAT, si poarta cere sa fie
# adaugat aici de mana, cu cap. Asta e deliberat: lista inchisa prinde exact
# clasa "typo in @type", care altfel trece tacut prin orice validator permisiv.
TIPURI_CUNOSCUTE = {
    'Organization', 'LocalBusiness', 'ProfessionalService', 'WebSite', 'WebPage',
    'BreadcrumbList', 'ListItem', 'PostalAddress', 'ContactPoint', 'ImageObject',
    'Service', 'Offer', 'OfferCatalog', 'Person', 'Article', 'BlogPosting',
    'FAQPage', 'Question', 'Answer', 'SoftwareApplication', 'WebApplication',
    'AggregateRating', 'Review', 'Rating', 'SearchAction', 'EntryPoint',
    # Adaugate pe 2026-09-05, dupa ce poarta s-a inrosit pe cod CORECT: `Country`
    # e tip real schema.org, folosit in `areaServed`. Cand o poarta pica pe forma
    # permisa explicit, se repara POARTA, nu codul - altfel o dezactiveaza primul
    # om pe care il incurca, si atunci nu mai apara nimic.
    'Country', 'State', 'City', 'AdministrativeArea', 'Place', 'GeoCoordinates',
    'OpeningHoursSpecification', 'PropertyValue', 'HowTo', 'HowToStep', 'ItemList',
}

OPRESTE = 'OPRESTE'
AVERT = 'AVERT'


class Culegator(HTMLParser):
    """Culege din HTML doar ce priveste porti: titlu, meta, canonical, titluri, JSON-LD.

    HTMLParser din biblioteca standard trateaza comentariile ca noduri separate,
    deci un `>` dintr-un comentariu nu mai produce defecte fantoma - clasa de
    eroare masurata in PORTI-FABRICA sectiunea 0.5. De aia nu se scrie cu regex.
    """

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.titluri_pagina = []      # continutul fiecarui <title>
        self.descrieri = []           # continutul fiecarui meta[name=description]
        self.canonice = []            # href-ul fiecarui link[rel=canonical]
        self.antete = []              # (nivel, text) in ordinea documentului
        self.blocuri_ld = []          # textul brut al fiecarui script ld+json
        self._in = None               # 'title' | 'ld' | 'antet'
        self._tampon = []
        self._nivel = 0

    def handle_starttag(self, tag, atribute):
        a = dict(atribute)
        if tag == 'title':
            self._in, self._tampon = 'title', []
        elif tag == 'meta':
            if (a.get('name') or '').lower() == 'description':
                self.descrieri.append(a.get('content') or '')
        elif tag == 'link':
            if 'canonical' in (a.get('rel') or '').lower().split():
                self.canonice.append(a.get('href') or '')
        elif tag == 'script':
            if (a.get('type') or '').lower().strip() == 'application/ld+json':
                self._in, self._tampon = 'ld', []
        elif tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            self._in, self._tampon, self._nivel = 'antet', [], int(tag[1])

    def handle_endtag(self, tag):
        text = ''.join(self._tampon).strip()
        if tag == 'title' and self._in == 'title':
            self.titluri_pagina.append(text)
        elif tag == 'script' and self._in == 'ld':
            self.blocuri_ld.append(text)
        elif tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6') and self._in == 'antet':
            self.antete.append((self._nivel, re.sub(r'\s+', ' ', text)))
        if tag in ('title', 'script', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            self._in, self._tampon = None, []

    def handle_data(self, date):
        if self._in:
            self._tampon.append(date)


def tipuri_din(nod, adunate):
    """Aduna recursiv toate valorile @type dintr-un arbore JSON-LD, oricat de adanc."""
    if isinstance(nod, dict):
        t = nod.get('@type')
        if isinstance(t, str):
            adunate.add(t)
        elif isinstance(t, list):
            adunate.update(x for x in t if isinstance(x, str))
        for v in nod.values():
            tipuri_din(v, adunate)
    elif isinstance(nod, list):
        for v in nod:
            tipuri_din(v, adunate)


def analizeaza_pagina(ruta, html, gazda_asteptata=None):
    """Verdictul pentru O pagina. Intoarce lista de (severitate, cod, mesaj).

    Functia asta e si ce ruleaza pe continutul real, si ce ruleaza pe martori.
    Un control care ar trece prin alt cod decat poarta nu controleaza poarta.
    """
    c = Culegator()
    c.feed(html)
    g = []

    # --- S-01 titlu ---
    if len(c.titluri_pagina) != 1:
        g.append((OPRESTE, 'S-01', ruta + ': ' + str(len(c.titluri_pagina)) + ' etichete <title>, se cere exact una'))
    else:
        t = c.titluri_pagina[0]
        n = len(t)
        if n == 0:
            g.append((OPRESTE, 'S-01', ruta + ': <title> gol'))
        elif n < PRAGURI['titlu_min'] or n > PRAGURI['titlu_max']:
            g.append((OPRESTE, 'S-01', ruta + ': titlu de ' + str(n) + ' caractere, in afara intervalului '
                      + str(PRAGURI['titlu_min']) + '-' + str(PRAGURI['titlu_max']) + ' | ' + t[:80]))

    # --- S-01 descriere ---
    if len(c.descrieri) != 1:
        g.append((OPRESTE, 'S-01', ruta + ': ' + str(len(c.descrieri)) + ' etichete meta[name=description], se cere exact una'))
    else:
        d = c.descrieri[0].strip()
        n = len(d)
        if n == 0:
            g.append((OPRESTE, 'S-01', ruta + ': meta description goala'))
        elif n < PRAGURI['descriere_min'] or n > PRAGURI['descriere_max']:
            g.append((OPRESTE, 'S-01', ruta + ': descriere de ' + str(n) + ' caractere, in afara intervalului '
                      + str(PRAGURI['descriere_min']) + '-' + str(PRAGURI['descriere_max'])))

    # --- S-02 canonical ---
    if len(c.canonice) != 1:
        g.append((OPRESTE, 'S-02', ruta + ': ' + str(len(c.canonice))
                  + ' etichete link[rel=canonical], se cere exact una. Un canonical lipsa lasa motorul '
                  'sa aleaga singur adresa preferata, iar unul mostenit din mediul de proba scoate '
                  'site-ul din index'))
    else:
        u = c.canonice[0].strip()
        if not u.startswith('https://'):
            g.append((OPRESTE, 'S-02', ruta + ': canonical care nu e absolut https: ' + u[:90]))
        elif '?' in u or '#' in u:
            g.append((OPRESTE, 'S-02', ruta + ': canonical cu parametri sau ancora: ' + u[:90]))
        else:
            rest = u[len('https://'):]
            taiat = rest.split('/', 1)
            gazda = taiat[0]
            cale = '/' + (taiat[1] if len(taiat) > 1 else '')
            cale_n = cale.rstrip('/') or '/'
            ruta_n = ruta.rstrip('/') or '/'
            if cale_n != ruta_n:
                g.append((OPRESTE, 'S-02', ruta + ': canonical nu e auto-referential, arata spre ' + cale_n))
            if gazda_asteptata and gazda != gazda_asteptata:
                g.append((OPRESTE, 'S-02', ruta + ': canonical pe gazda ' + gazda
                          + ', mediul servit e ' + gazda_asteptata))

    # --- S-03 titluri (AVERT, conform tabelului de operare) ---
    h1 = [t for n, t in c.antete if n == 1]
    if len(h1) != 1:
        g.append((AVERT, 'S-03', ruta + ': ' + str(len(h1)) + ' etichete h1, se cere exact una'))
    elif not h1[0]:
        g.append((AVERT, 'S-03', ruta + ': h1 gol'))
    anterior = None
    for nivel, text in c.antete:
        if anterior is not None and nivel > anterior + 1:
            g.append((AVERT, 'S-03', ruta + ': saritura de nivel h' + str(anterior) + ' spre h' + str(nivel)
                      + ' | ' + text[:60]))
        anterior = nivel

    # --- S-09 JSON-LD ---
    if not c.blocuri_ld:
        g.append((AVERT, 'S-09', ruta + ': niciun bloc application/ld+json'))
    for i, brut in enumerate(c.blocuri_ld, start=1):
        try:
            date = json.loads(brut)
        except ValueError as e:
            g.append((OPRESTE, 'S-09', ruta + ': blocul ld+json ' + str(i) + ' nu e JSON valid: ' + str(e)))
            continue
        radacini = date if isinstance(date, list) else [date]
        for r in radacini:
            if isinstance(r, dict):
                ctx = r.get('@context')
                if isinstance(ctx, str) and ctx.rstrip('/').replace('http://', 'https://') != 'https://schema.org':
                    g.append((OPRESTE, 'S-09', ruta + ': blocul ld+json ' + str(i) + ' are @context ' + str(ctx)))
        tipuri = set()
        tipuri_din(date, tipuri)
        if not tipuri:
            g.append((OPRESTE, 'S-09', ruta + ': blocul ld+json ' + str(i) + ' nu declara niciun @type'))
        for t in sorted(tipuri):
            if t not in TIPURI_CUNOSCUTE:
                g.append((OPRESTE, 'S-09', ruta + ': @type necunoscut "' + t
                          + '". Daca e real, adauga-l in TIPURI_CUNOSCUTE din poarta; daca e typo, repara-l'))
    return g


def analizeaza_lot(pagini, gazda_asteptata=None):
    """Verdictul pe tot lotul: adauga unicitatea, care nu se poate masura pe o pagina."""
    g = []
    for ruta, html in pagini:
        g.extend(analizeaza_pagina(ruta, html, gazda_asteptata))

    def aduna(extrage):
        harta = {}
        for ruta, html in pagini:
            c = Culegator()
            c.feed(html)
            v = extrage(c)
            if v:
                harta.setdefault(v.strip(), []).append(ruta)
        return harta

    for eticheta, extrage in (
        ('titlu', lambda c: c.titluri_pagina[0] if len(c.titluri_pagina) == 1 else ''),
        ('descriere', lambda c: c.descrieri[0] if len(c.descrieri) == 1 else ''),
    ):
        for valoare, rute in aduna(extrage).items():
            if len(rute) > 1:
                g.append((OPRESTE, 'S-01', eticheta + ' identic pe ' + str(len(rute)) + ' rute ('
                          + ', '.join(sorted(rute)) + '): ' + valoare[:60]))
    return g


# ---------------------------------------------------------------- martorii

def fabrica_pagina_defecta():
    """Se asambleaza la rulare, din bucati. Un HTML defect scris intreg in fisier
    ar fi cules de orice poarta care scaneaza depozitul, inclusiv de asta."""
    ld_rupt = '{' + '"@context": "https://schema.org", "@type": "Organization",'  # acolada neinchisa
    ld_tip = json.dumps({'@context': 'https://schema.org', '@type': 'Organizatie'})
    cap = ''.join([
        '<html><head>',
        '<title>' + 'Prea scurt' + '</title>',
        '<meta name="' + 'description' + '" content="' + ('x' * 400) + '"/>',
        '<link rel="' + 'canonical' + '" href="' + 'https://alt-mediu.example/gresit?utm=1' + '"/>',
        '<script type="' + 'application/ld+json' + '">' + ld_rupt + '</script>',
        '<script type="' + 'application/ld+json' + '">' + ld_tip + '</script>',
        '</head><body>',
        '<h1>Unu</h1><h1>Doi</h1><h2>Doi</h2><h4>Patru dupa doi</h4>',
        '</body></html>',
    ])
    return cap


def fabrica_pagina_corecta():
    ld = json.dumps({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'Trei S',
        'url': 'https://exemplu-corect.test/',
    })
    return ''.join([
        '<html><head>',
        '<title>' + 'Arhiva care raspunde cu pagina' + '</title>',
        '<meta name="' + 'description' + '" content="'
        + 'Arhivare autorizata, digitalizare si cautare care citeaza pagina din care vine raspunsul.'
        + '"/>',
        '<link rel="' + 'canonical' + '" href="' + 'https://exemplu-corect.test/' + '"/>',
        '<script type="' + 'application/ld+json' + '">' + ld + '</script>',
        '</head><body>',
        '<h1>Arhiva care raspunde</h1><h2>Cum</h2><h3>Pasi</h3><h2>Pentru cine</h2>',
        # comentariul contine un `>` si un `<h1>` fals: daca extragerea s-ar face cu
        # regex peste text brut, martorul negativ ar pica aici. De aia sta in fixtura.
        '<!-- nota interna: 3 > 2, si aici scrie <h1> fara sa fie unul -->',
        '</body></html>',
    ])


def controale():
    """Intoarce None daca ambii martori se comporta cum trebuie, altfel motivul."""
    defecta = analizeaza_pagina('/proba', fabrica_pagina_defecta(), gazda_asteptata='exemplu-corect.test')
    coduri = set()
    for sev, cod, mesaj in defecta:
        coduri.add(cod)
    for asteptat in ('S-01', 'S-02', 'S-03', 'S-09'):
        if asteptat not in coduri:
            return 'martorul pozitiv nu a fost prins pe ' + asteptat
    mesaje = ' | '.join(m for _, _, m in defecta)
    # Cele doua praguri de lungime se controleaza SEPARAT, nu prin cuvantul comun
    # "caractere". Masurat: un mutant care dezarma pragul descrierii trecea de
    # control, fiindca titlul prea scurt producea singur codul S-01 si controlul
    # se declara multumit. Doua ramuri diferite cer doua dovezi diferite.
    if 'titlu de ' not in mesaje:
        return 'martorul pozitiv: pragul de lungime al TITLULUI nu a raportat numarul masurat'
    if 'descriere de ' not in mesaje:
        return 'martorul pozitiv: pragul de lungime al DESCRIERII nu a raportat numarul masurat'
    if 'nu e JSON valid' not in mesaje:
        return 'martorul pozitiv: blocul ld+json rupt nu a fost prins ca JSON invalid'
    if '@type necunoscut' not in mesaje:
        return 'martorul pozitiv: tipul inventat nu a fost prins'

    corecta = analizeaza_pagina('/', fabrica_pagina_corecta(), gazda_asteptata='exemplu-corect.test')
    if corecta:
        return 'martorul negativ a fost prins: ' + '; '.join(m for _, _, m in corecta)

    # al treilea martor: unicitatea se masoara pe LOT, nu pe pagina, deci se
    # controleaza separat. Aceeasi pagina servita pe doua rute trebuie sa pice.
    lot = analizeaza_lot([('/', fabrica_pagina_corecta()), ('/altundeva', fabrica_pagina_corecta())],
                         gazda_asteptata='exemplu-corect.test')
    if not any(c == 'S-01' and 'identic' in m for _, c, m in lot):
        return 'martorul pozitiv de lot: titlul duplicat pe doua rute nu a fost prins'
    return None


# ---------------------------------------------------------------- sursa

def ruta_din_cale(cale, dosar):
    rel = os.path.relpath(cale, dosar).replace(os.sep, '/')
    rel = rel[:-len('.html')]
    if rel == 'index':
        return '/'
    if rel.endswith('/index'):
        rel = rel[:-len('/index')]
    return '/' + rel


def cele_mai_noi(dosar, extensii=None):
    """Cea mai recenta data de modificare dintr-un arbore. None daca arborele lipseste."""
    if not os.path.isdir(dosar):
        return None
    varf = None
    for radacina, directoare, nume in os.walk(dosar):
        directoare[:] = [d for d in directoare if d not in ('node_modules', '.git', '__pycache__')]
        for n in nume:
            if extensii and not n.endswith(extensii):
                continue
            t = os.path.getmtime(os.path.join(radacina, n))
            if varf is None or t > varf:
                varf = t
    return varf


def construieste(radacina):
    import shutil
    pnpm = shutil.which('pnpm')
    if not pnpm:
        print('poarta-seo: pnpm nu e in PATH, nu pot construi', file=sys.stderr)
        return False
    print('poarta-seo: rulez pnpm build (buildul lipseste sau e mai vechi decat sursa)...')
    r = subprocess.run([pnpm, 'build'], cwd=radacina)
    return r.returncode == 0


def main():
    p = argparse.ArgumentParser(description='Poarta de SEO pe HTML-ul construit (S-01, S-02, S-03, S-09).')
    p.add_argument('--radacina', default=RADACINA_IMPLICITA, help='radacina proiectului')
    p.add_argument('--gazda', default=os.environ.get('SITE_GAZDA') or None,
                   help='gazda mediului servit; canonical care arata in alta parte pica')
    p.add_argument('--construieste', action='store_true',
                   help='ruleaza pnpm build daca HTML-ul lipseste sau e mai vechi decat sursa')
    a = p.parse_args()

    motiv = controale()
    if motiv:
        print('CONTROL PICAT: ' + motiv, file=sys.stderr)
        return 3

    radacina = os.path.abspath(a.radacina)
    dosar = os.path.join(radacina, '.next', 'server', 'app')
    cai = sorted(glob.glob(os.path.join(dosar, '**', '*.html'), recursive=True))
    cai = [c for c in cai if os.path.splitext(os.path.basename(c))[0] not in PAGINI_SARITE]

    proaspat_sursa = cele_mai_noi(os.path.join(radacina, 'src'))
    vechi_build = min((os.path.getmtime(c) for c in cai), default=None)
    invechit = (proaspat_sursa is not None and vechi_build is not None and proaspat_sursa > vechi_build)

    if (not cai or invechit) and a.construieste:
        if not construieste(radacina):
            print('poarta-seo: pnpm build a esuat - NEMASURAT', file=sys.stderr)
            return 3
        cai = sorted(glob.glob(os.path.join(dosar, '**', '*.html'), recursive=True))
        cai = [c for c in cai if os.path.splitext(os.path.basename(c))[0] not in PAGINI_SARITE]
        invechit = False

    if not cai:
        print('poarta-seo: niciun HTML construit in ' + os.path.relpath(dosar, radacina)
              + ' - masuratoarea e invalida, nu curata. Ruleaza pnpm build, sau poarta cu --construieste',
              file=sys.stderr)
        return 3
    if invechit:
        print('poarta-seo: buildul e mai vechi decat src/ - as masura un site care nu mai exista. '
              'Ruleaza pnpm build, sau poarta cu --construieste', file=sys.stderr)
        return 3

    pagini = []
    for c in cai:
        pagini.append((ruta_din_cale(c, dosar), open(c, encoding='utf-8').read()))

    gasiri = analizeaza_lot(pagini, a.gazda)
    opreste = [g for g in gasiri if g[0] == OPRESTE]
    avert = [g for g in gasiri if g[0] == AVERT]

    for sev, cod, mesaj in opreste:
        print('OPRESTE  ' + cod + '  ' + mesaj)
    for sev, cod, mesaj in avert:
        print('AVERT    ' + cod + '  ' + mesaj)

    print('CONTROALE: martor pozitiv OK, martor negativ OK, martor de lot OK')
    print('SURSA: ' + str(len(pagini)) + ' pagina(i) construita(e): ' + ', '.join(r for r, _ in pagini))
    print('GAZDA ASTEPTATA: ' + (a.gazda if a.gazda else 'nedeclarata (S-02 verifica doar forma si auto-referinta)'))
    print('DEFECTE SEO: ' + str(len(opreste)) + ' care opresc, ' + str(len(avert)) + ' de avertisment')
    return 1 if opreste else 0


if __name__ == '__main__':
    sys.exit(main())
