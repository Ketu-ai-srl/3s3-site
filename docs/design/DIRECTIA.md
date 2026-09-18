# Direcția vizuală 3S

Alb și gri deschis, text aproape negru, un singur albastru care duce acțiunea. Fără gradiente,
fără umbre, fără culoare de brand pe benzi. Titlurile sunt propoziții de două-patru cuvinte cu
punct, la greutatea 600. Fotografiile sunt mari, stau în țiglă, și nu poartă niciodată text peste
ele. Un ecran spune un singur lucru și are un singur buton principal - iar pe pagina de start
ecranul este **țigla**.

Regulile de mai jos sunt cele mecanizate: `tests/directia.test.ts` le măsoară pe sursă, în sub o
secundă, iar porțile de browser le măsoară pe pagina construită. Nu sunt preferințe.

## Paleta

Paleta are nouă roluri. Lista e închisă: o culoare în plus înseamnă un rol pe care nu l-a numit
nimeni, iar rolurile nenumite se aleg după gust, nu după măsurătoare. Proba refuză un jeton
`--color-*` care nu e în listă.

| Rol | Valoare | Unde se folosește |
|---|---|---|
| `cerneala` | `#1d1d1f` | titluri și text principal |
| `cerneala-3` | `#6e6e73` | note, etichete, text secundar - cerneala sigură la orice mărime |
| `albastru` | `#0071e3` | **suprafața** pastilei pline; niciodată literă |
| `albastru-2` | `#0066cc` | legături, conturul butonului secundar |
| `albastru-clar` | `#2997ff` | legături și contur **pe negru**; niciodată pe deschis |
| `alb` | `#ffffff` | fundalul implicit al site-ului |
| `ceata` | `#f5f5f7` | secțiuni alternative, subsol, carduri pe alb, litera de pe negru |
| `negru` | `#000000` | țiglele și benzile închise |
| `accent-nou` | `#bf4800` | rândul de noutate de sub un titlu de pagină, 17 px, o singură linie |

**Contrastul, calculat din valorile de mai sus** cu raportul de luminanță WCAG. Scriptul e la
finalul acestui document; controlul lui e alb pe negru, care trebuie să dea 21,00.

    cerneala      pe alb 16,83:1   pe ceata 15,46:1
    cerneala-3    pe alb  5,07:1   pe ceata  4,66:1
    albastru      alb pe el 4,70:1              pe ceata 4,31:1 (deci nu e literă)
    albastru-2    pe alb  5,57:1   pe ceata  5,11:1   pe negru 3,77:1 (deci nu e literă acolo)
    albastru-clar pe negru 6,96:1  pe alb    3,02:1 (deci nu e literă acolo)
    alb           pe negru 21,00:1
    ceata         pe negru 19,29:1
    accent-nou    pe alb  5,07:1   pe ceata  4,66:1

Regulile care decurg, și fiecare are o probă:

- `cerneala` și `cerneala-3` trec pe amândouă suprafețele deschise, iar proba nu o ia pe
  încredere: citește valorile din `globals.css` și calculează raportul;
- `albastru` nu scrie literă: 4,31:1 pe ceață. E fundal de pastilă, cu literă albă deasupra;
- fiecare albastru are **un** capăt pe care trece: `albastru-2` pe deschis, `albastru-clar` pe
  negru. Amândouă afirmațiile sunt scrise explicit în probă, ca defect, nu ca preferință: dacă
  vreuna ar începe să treacă și pe celălalt capăt, regula și-a pierdut motivul;
- pe negru se scrie `ceata`, nu alb: albul pur vibrează la mărimi mici.

### Griul de la 21 px al referinței nu există la noi, și e o refutare măsurată

Referința are două griuri de text: `#6e6e73`, care la noi e `cerneala-3`, și `#86868b`, pe care
îl folosește într-un singur loc - paragraful de capitol, 21 px la greutatea 600. Al doilea **nu e
definit** în paleta noastră, și nu din scăpare.

**Ce s-a măsurat**, cu `axe` pe arborele construit, la 1280 px: `color-contrast` de impact
`serious` pe **20 din cele 22 de rute**, câte un nod pe fiecare - exact paragraful acela. Cifra
raportată: **3,62 la 19 px**. Motivul stă în definiția WCAG a „textului mare", pe care axe o
aplică literal: pragul coboară la 3:1 numai de la **24 px**, sau de la 18,66 px **cu greutatea cel
puțin 700**. Greutatea 600 nu e „bold" acolo - axe chiar așa o scrie în raport, `font weight:
normal`. **Condiția referinței (18,66 px și 600) nu este condiția WCAG**, iar diferența nu se vede
până nu rulează poarta.

Cele trei ieșiri, și de ce am ales-o pe a treia:

1. **încărcarea greutății 700** doar pentru culoarea asta - direcția are două greutăți, iar un al
   treilea fișier de font pe fiecare pagină, pentru un singur paragraf, nu se justifică;
2. **urcarea paragrafului la 24 px** - ar fi însemnat schimbarea unei mărimi pe care referința a
   măsurat-o (21 / 29), ca să salvăm o culoare;
3. **scrierea paragrafului cu `cerneala-3`** (5,07:1 pe alb, 4,66:1 pe ceață) - mărimile rămân
   exact cele măsurate, și dispare o culoare pe care nu o puteam folosi legal nicăieri.

Rolul nu rămâne definit „pentru valul următor": o culoare definită și nefolosită e chiar gaura
prin care o direcție supraviețuiește tăcut, iar aici ar fi fost și o capcană - valul următor ar fi
aflat la fel de târziu ca noi, din poartă. Clasa `text-cerneala-2` rămâne scrisă în 38 de locuri
din unsprezece pagini ale valului următor; fără jeton, Tailwind nu mai generează utilitarul deloc,
deci acele elemente moștenesc `cerneala` (16,83:1) - degradare în direcția sigură.

## Litera

O singură familie: **Inter**, încărcată prin `next/font/google`, cu greutățile **400 și 600**. 700
nu se încarcă: direcția nu are titluri mai grele. Jetoanele moștenite `font-afis`, `font-vitrina`
și `font-mono` arată toate către aceeași variabilă, deci un nume vechi rămas într-o componentă nu
poate strecura o a doua familie. Subsetul `latin-ext` e obligatoriu: fără el, ș și ț cad pe fontul
de rezervă în mijlocul cuvântului.

Scara, măsurată pe referință, la 1440 și la 390:

| Rol | 1440 | 390 | Jeton |
|---|---|---|---|
| afirmație de capitol | 80 px | 40 px | `text-afirmatie` |
| titlu de erou interior | 64 px | 40 px | `text-titlu-1` |
| titlu de țiglă mare | 56 px | 32 px | `text-tigla` |
| titlu de secțiune, h1 juridic | 48 px | 32 px | `text-titlu-2` |
| titlu de țiglă mică | 40 px | 32 px | `text-titlu-3` |
| h2 juridic, etichetă de capitol | 32 px, 24 px | - | `text-titlu-4` |
| subtitlu de țiglă mare | 28 px | 19 px | `text-subtitlu-tigla` |
| paragraf de capitol, corp juridic | 21 px | 19 px | `text-capitol` |
| subtitlu de țiglă mică | 21 px | 19 px | `text-subtitlu` |
| titlu de card juridic | 20 px | - | `text-titlu-card` |
| corp | 17 px | 17 px | `text-corp` |
| notă, etichetă | 14 px | 14 px | `text-nota` |
| bara globală, bara locală, subsol | 12 px | 12 px | `text-mic` |

Capetele de la 1440 sunt toate măsurate pe referință. La 390 sunt măsurate cele de pe pagina de
start; pentru `afirmatie` și `titlu-1` capătul îngust e **ales de noi**, fiindcă referința nu și-a
măsurat pagina de produs pe telefon. Alegerea e scrisă ca atare în `globals.css`, nu prezentată ca
măsurătoare.

### Pasul de rând: pragul diacriticelor românești, măsurat pe Inter

Toate treptele de titlu au raportul **1,19**, nu perechile referinței (80/84, 64/70, 56/60,
48/52, 40/44, 24/28 - adică 1,05 până la 1,17). E singura abatere de scară din tot fișierul, și e
măsurată:

    urcarea maximă   0,945 em   Î, Â, Ă (aceeași la 400 și la 600)
    coborârea maximă 0,245 em   Ș, Ț, ș, ț la greutatea 400 (0,240 la 600)
    prag = 0,945 + 0,245 =      1,190 em
    martor: H urcă 0,730 și coboară 0,000; g coboară 0,220

Măsurătoarea se face pe pagina construită, cu fontul real servit de site:

```js
const c = document.createElement('canvas').getContext('2d')
c.font = '600 200px ' + getComputedStyle(document.body).fontFamily
const t = c.measureText('Î')
t.actualBoundingBoxAscent / 200   // urcarea, în em
```

Sub 1,19 em, un Î de pe rândul al doilea intră în virgula unui ș de pe primul. La raportul
referinței, un titlu de 80 px s-ar suprapune cu 0,14 em, adică 11 px - nu o subtilitate, o
greșeală vizibilă. Referința n-are de ce să respecte pragul: textul ei e în altă limbă, în care
nici virgula de sub s, nici circumflexul nu apar.

**Ce s-a schimbat și ce nu:** mărimile literei sunt exact cele măsurate, la amândouă capetele, și
nu se ating. S-a ridicat doar pasul de rând, cu 11-13%. Pe titluri de două-patru cuvinte, care
încap pe un rând, diferența nu se vede deloc; se vede exact acolo unde titlul se rupe, adică în
singurul caz în care contează.

## Forme

**Două forme, și atât.** Pastila (rază 980 px) pentru orice buton, și cardul cu rază **28 px**.
Țiglele de pe pagina de start au rază zero și se despart prin **12 px de alb** între ele.

**Umbre: niciuna.** Nici măcar definită ca jeton - cât timp există una, „doar o umbră mică aici" e
la o clasă distanță. Cardurile se despart prin culoare de fundal: ceață pe alb, alb pe ceață,
negru pentru țigla închisă. Conturul butonului secundar e o umbră interioară de 0,8 px, nu un
chenar, ca să nu miște înălțimea cu un pixel față de pastila plină de lângă el.

Butoanele au trei înălțimi, legate de mărimea literei, nu alese:

```tsx
<Buton href="/contact">Discuție de 30 de minute</Buton>          // 44 px, 17 px literă
<Buton href="/solutii" fel="contur">Toate domeniile</Buton>      // contur 0,8 px albastru-2
<Buton href="/despre" marime="mic">Despre noi</Buton>            // 36 px, 14 px literă
<Buton href="/contact" marime="bara">Discuție</Buton>            // 24 px, 12 px - bare
<Buton href="/cum-functioneaza" fel="text">Cum funcționează</Buton>  // legătură cu chevron
```

**Un singur buton primar pe ecran**, iar pe pagina de start ecranul e țigla: fiecare țiglă are o
pastilă plină (discuția) și cel mult una cu contur (fișa). `plin` și `alb` sunt amândouă primare -
`alb` e varianta de pe țigla neagră, unde `albastru` ar da 4,47:1 față de fundal și muchia
pastilei aproape ar dispărea.

Containerele: **1247 px** (`max-w-vitrina`) pentru erou și rândurile de carduri, **980 px**
(`max-w-registru`) pentru capitolele de pagină interioară și secțiunile juridice, **653 px**
(`max-w-act`) pentru introducerea centrată a unei pagini juridice. Țiglele nu au container: merg
pe toată lățimea ferestrei.

Chenarele nu-și mai scriu culoarea: implicitul global e chiar firul de 1 px al referinței
(`#d2d2d7`), pus în `@layer base` pe `*`. Un `border-b` simplu desenează firul corect, iar o clasă
de culoare rămasă dintr-o direcție veche cade tot pe el, în loc să înnegrească pagina.

## Gramatica paginii de start

1. **Trei țigle mari**, pe toată lățimea, 692 px la 1440 (sub 768 px cresc cu textul, fotografia
   are 320 px ficși): h2 de 56 px centrat,
   subtitlu de 28 px, o pastilă plină și una cu contur, fotografia mare dedesubt, în țiglă.
   Fundalul alternează alb, ceață, negru. Cele trei sunt Scan, Store și Solve, și poartă chiar
   ancorele `#scan`, `#store`, `#solve`.
2. **Grilă de două coloane pe trei rânduri**, țigle de 580 px la 1440 (sub 768 px la fel: cresc cu
   textul, fotografia 320 px), cu 12 px
   între ele: h3 de 40 px centrat, subtitlu de 21 px, o notă de 14 px în `cerneala-3`, pastile de
   36 px, fotografia sub text. Una dintre țigle e neagră, cu literă `ceata`.
   Înălțimile de 692 și 580 sunt **legate de la 768 px în sus**: fotografia stă într-o cutie cu
   `md:flex-1 md:min-h-0` și ia doar ce rămâne. **Sub 768 px țigla NU e legată la cei 500 px pe care
   îi măsoară fișa REF-A pe referință.** Textul referinței are două rânduri; al nostru are titlul pe
   două, subtitlul pe trei și două pastile una sub alta, adică 385 px de text din 500, și cu țigla
   legată la 500 fotografiei îi rămâneau 97,8 px la 390 (74,8 la 320) - o fâșie, nu o fotografie
   mare. Așa că sub 768 țigla crește cu textul și fotografia are `h-[320px]` (82% din lățimea de
   390). Nici podeaua veche (`min-h-[500px]`) nu se întoarce: cu ea cutia fotografiei creștea la
   înălțimea proprie a cadrului (585 px la 390) și țiglele ieșeau 885-987 px, pagina 9784 px.
   Măsurat pe pagina construită, cu `innerWidth` citit din pagină, la 390: țiglele mari
   722 / 636 / 697 px, țiglele de grilă cu fotografie 620-658 px, pagina 7968 px
   (referința: 7327 px); la 1440 nimic nu se schimbă (692 / 580 px, pagina 5014 px). Țiglele fără
   fotografie își păstrează podeaua (`min-h-[320px]`), fiindcă n-au niciun element elastic care
   să absoarbă un text mai lung.

3. **Banda neagră** cu faptele atribuite ale firmei-mamă, cu titlul legat printr-un exponent de
   nota de la bază.
4. **Notele numerotate**, 12 px, pe alb: locul în care pagina își scrie limitele.
5. **Subsolul** pe ceață, cinci coloane de legături de 12 px și rândul juridic - fără buton.

Nu există erou colorat, nu există bandă CTA colorată, nu există carusel și nu există prețuri pe
pagina de start. Chemarea la acțiune stă în pastila fiecărei țigle.

## Cum se construiește o pagină interioară

Eroul și capitolul **sunt construite** - `src/components/AntetPagina.tsx` și
`src/components/Capitol.tsx` - și sunt componente partajate: valul care rescrie paginile
interioare le folosește, nu le rescrie. Ce urmează descrie ce există, cu cifrele citite din
pagina construită; ce nu există încă e marcat ca atare, la finalul secțiunii.

Ordinea în care se citește o pagină interioară:

1. **Bara locală**, 52 px, lipicioasă, chiar sub bara globală: titlul paginii la stânga (21 px,
   600), ancorele secțiunilor la 12 px și o pastilă de 24 px la dreapta. Sub 768 px trece pe
   două rânduri, ca să nu ascundă nicio ancoră. Se pune prin `SegmentAncore`, care îi citește
   titlul din registrul de rute, nu din pagină.
2. **Eroul**, pe alb, în containerul de 1247, tot textul la stânga: firul de navigare, apoi
   **fotografia, pe toată lățimea, ÎNAINTEA textului**, apoi numele paginii, afirmația cu
   ultimul cuvânt albastru, rândul de sub ea și pastilele. Centrat e doar pe pagina de start,
   unde ecranul e țigla. Ordinea e cea a **capturii** referinței (`produs-1440-fold`,
   `produs-3-ecrane`: fotografia produsului ocupă ecranul, numele de 28 și afirmația de 64 vin
   abia sub ea); fișa REF-A §4.2 o înșiruise invers, iar felia 3 a urmat fișa - la
   reconcilierea lotului s2-b0 ordinea s-a întors după captură, cât costa o mutare de bloc.
   Consecința: la 1440 afirmația intră sub linia de plutire (pe referință stă la ~840 px), iar
   la 390 fotografia de 320 px e primul lucru văzut.
3. **Capitole** în containerul de 980: etichetă de 24 px, afirmație de 80 px, paragraf de 21/29
   la 600 în `cerneala-3`, apoi rama de ceață cu fotografia sau cardurile. Alinierea alternează
   stânga / centrat, ca pe referință.
4. **Carduri** cu raza 28, albe pe ceață sau ceață pe alb, fără umbră.
5. **Subsolul** pe ceață, ca pe pagina de start.

```tsx
import AntetPagina from "@/components/AntetPagina";
import Capitol from "@/components/Capitol";
import SegmentAncore from "@/components/SegmentAncore";
import { FOTOGRAFII } from "@/content/fotografii";

export const metadata = { alternates: { canonical: "/arhivare-fizica" } };

export default function Pagina() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/arhivare-fizica"
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Arhivare fizică" }]}
        eticheta="Serviciul de bază"
        titlu="Hârtia cere rafturi."
        lead="O propoziție care spune ce găsește omul pe pagina asta."
        actiune={{ href: "/#discutie", text: "Discuție de 30 de minute" }}
        secundar={{ href: "/cum-functioneaza", text: "Vedeți mecanismul complet" }}
        imagine={FOTOGRAFII.cutii}
      />

      <SegmentAncore ancore={[{ ancora: "depozit", eticheta: "Depozit" }]} eticheta="Secțiunile paginii" />

      <Capitol
        id="depozit"
        eticheta="Depozit"
        afirmatie="Hârtia stă pe raft."
        text="Paragraful capitolului, la douăzeci și unu de pixeli, greutatea șase sute."
      >
        <picture className="w-full">
          <source media="(max-width: 767px)" srcSet="/img/rafturi-960.webp" />
          <img
            src="/img/rafturi-1920.webp"
            alt={FOTOGRAFII.rafturi.alt}
            className="h-[320px] w-full object-cover md:h-full"
            style={{ objectPosition: FOTOGRAFII.rafturi.pozitie }}
          />
        </picture>
      </Capitol>
    </main>
  );
}
```

`titlu` și `afirmatie` primesc un **șir**, nu elemente: din șir componenta desparte ultimul
cuvânt și îl scrie în `albastru-2`, cu punctul final în aceeași culoare, tăind la ultima
înșiruire de spații - deci spațiul neîntreruptibil din `Actul se cere azi.` rămâne exact cum e
scris în conținut. Un `titlu` compus din elemente se randează întreg, fără culoare: nu se poate
ști unde se termină ultimul cuvânt într-un arbore, iar o ghicitoare ar colora ce nimerește.
`h1`-ul rămâne un singur element cu toată propoziția.

Copilul ramei de capitol trebuie să-și scrie singur înălțimea pe capătul îngust
(`h-[320px] … md:h-full`): rama e o **podea**, nu o înălțime legată - un rând de carduri mai
înalt decât ea trebuie să poată crește - iar sub 768 px un `h-full` singur nu are contra ce se
rezolva și fotografia iese la înălțimea proprie a fișierului portret (măsurat: 358 x 537 în loc
de 358 x 320).

### Cifrele, măsurate pe pagina construită

Playwright fără interfață, `next start`, `document.documentElement.clientWidth` citit din
pagină la fiecare măsurătoare (1440 și 390), pe `/arhivare-fizica`, `/investitia`,
`/solutii/notari` și `/instrumente/termene-de-pastrare`; capitolul, pe o pagină de probă
ștearsă după măsurătoare. Derapaj orizontal: **0 px** pe toate, la amândouă lățimile.

| Element | 1440 | 390 |
|---|---|---|
| numele paginii | 28,00 / 34,00 px, 600, `cerneala` (referința: 28 / 32 - abatere, vezi sub tabel) | 19 / 23 px |
| afirmația (h1) | 64,00 / 76,16 px, 600, `cerneala`, lățime 844 px (20ch) | 40 / 47,6 px, 358 px |
| ultimul cuvânt | `albastru-2`, aceeași treaptă | la fel |
| rândul de sub afirmație | 21,00 / 29,00 px, **400**, `cerneala`, 689 px (52ch) | 19 / 23 px, 358 px |
| pastilele | 44 px înălțime, literă 17 px, una lângă alta | 36 px, literă 14 px, una sub alta |
| fotografia eroului | 1183 x 640 px, rază 28, `object-cover` (700 la felia 3; 640 la reconciliere, vezi sub tabel) | 358 x 320 px |
| eticheta de capitol | 24 / 28,56 px, 600, `cerneala` | la fel |
| afirmația de capitol | 80 / 95,2 px, 600, lățime 897 px (17ch) | 40 px |
| paragraful de capitol | 21 / 29 px, 600, `cerneala-3`, 817 px (59ch) | 19 / 23 px |
| rama capitolului | 916 x 620 px, rază 28, `ceata`, `box-shadow: none` | 358 x 320 px |
| captușeala capitolului | 110 px sus și jos | 64 px |

**Două abateri declarate față de cifrele fișei.** (1) Numele paginii are pasul de rând 34, nu
32 cât măsoară referința: jetonul `--text-subtitlu-tigla` are pasul 1,214 (34/28), fiindcă
regula diacriticelor din secțiunea „Litera" cere cel puțin 1,19 (28 x 1,19 = 33,3, rotunjit la
34 - un pas de 33,32 ar tăia pixeli); tabelul de scară din `globals.css` scria „28 / 32" după
referință și a fost corectat să spună ce servește jetonul. (2) Lățimile: containerele din fișă
(1247, 980) sunt lățimi de **conținut** măsurate pe referință; la noi `max-w-vitrina` și
`max-w-registru` **includ** căptușeala de 2 x 32, deci conținutul are 1183 și 916 px la 1440.
Fotografia eroului (1183) și rama capitolului (916) sunt aliniate cu coloana de text, iar
înălțimile de mai jos sunt calculate din aceste lățimi reale, nu din numele containerului.

Cele două înălțimi de fotografie sunt alese din **acoperire** și din **linia de plutire**, nu
din gust. Fișierele de 1920 sunt toate 1920x1280 (3:2). Felia 3 a pus 700 px (88,8% din
înălțimea cadrului, în mijlocul benzii de 84,4-95,7% pentru care s-au ales ancorele `pozitie`
din `src/content/fotografii.ts`). Cu fotografia mutată **înaintea** textului, la 700 numele
ajungea la y 926 și afirmația la 972 pe un ecran de 1440 x 900 - niciun cuvânt vizibil fără
derulare, pe când referința ține numele la ~780 și afirmația la ~840. Reconcilierea a coborât
cutia la **640** (81,1%) și căptușeala de sus a eroului la 96 px: măsurat, numele stă la 842 și
afirmația la 888. Fereastra de 81,1% e, la aceeași ancoră, un subset al celei de 84,4%, deci nu
arată nimic neprivit la 1:1; ancorele rămân valabile. În rama capitolului, 916 x 620,
raportul cutiei e 1,477 față de 1,500 al cadrului: decupajul cade pe **lățime**, 1,5%, și se
vede toată înălțimea - acolo `pozitie` nici nu are ce alege. Sub 768 px se servește fișierul de
960, care e 960x1440 (portret 2:3): într-o cutie de 358 x 320 se vede 59,6% din înălțimea lui,
față de 44,7% cât se vedea în cardul de 358 x 240 al direcției anterioare. Fereastra mai largă o
**conține** pe cea măsurată, pentru orice ancoră: capătul de sus e `pozitie` x (1 - f), care
scade când f crește, iar cel de jos e `pozitie` + f x (1 - `pozitie`), care crește.

Contrastul, măsurat pe pagina construită (culoarea calculată a fiecărui bloc contra fundalului
lui efectiv), cu martorii de lângă rezultat - alb pe negru 21,00, alb pe alb 1,00, iar griul
refuzat al referinței 3,62:

    firul de navigare       5,07   prag 4,5
    pagina curentă în fir  16,83   prag 4,5
    numele paginii         16,83   prag 3
    afirmația              16,83   prag 3
    ultimul cuvânt          5,57   prag 3
    rândul de sub ea       16,83   prag 4,5
    pastila plină           4,70   prag 4,5
    pastila cu contur       5,57   prag 4,5
    eticheta de capitol    16,83   prag 3
    afirmația de capitol   16,83   prag 3
    paragraful de capitol   5,07   prag 4,5

Pragul se aplică pe mărimea și greutatea reale ale fiecărui bloc: 3:1 de la 24 px, sau de la
18,66 px cu greutatea cel puțin 700; 4,5:1 în rest. Paragraful de capitol e la 21 px și 600,
deci pragul lui e 4,5 - motivul pentru care griul referinței nu poate sta acolo.

### Ce nu e încă construit - rămâne rețetă pentru S2-b

Următoarele trei forme sunt descrise în fișa REF-A și **nu au componentă**; cine le construiește
le măsoară el, ca pe erou și pe capitol, și le mută de aici în lista de sus:

- **„Highlights"** - bandă pe ceață, padding 110/120, h2 de 56 px la stânga cu o legătură la
  dreapta, carduri albe cu raza 28. Fără carusel: grilă sau rând derulabil, măsurat de agent.
- **Rândul de carduri** pe ceață - h2 de 48 px la stânga, carduri albe de 372 x 452, raza 28.
- **Comparația** - h2 de 64 px centrat, coloane cu h3 de 24 px și note de 14 px.

Componentele de pagină moștenite (`PaginaDeSegment`, `Fisa*`, `Juridic*`, `Mecanism*`,
`Termene*`, `Comparatie*`, `Segment*`, `Investitie*`) au fost **retintuite mecanic** la felia de
fundație: li s-a schimbat paleta, nu așezarea. Notele lor lungi descriu direcții anterioare, cu
măsurătorile lor pe alte fundaluri; se citesc ca istorie. Gramatica lor se rescrie la valul
următor.

## Ce nu se face

- **Gradiente.** Nici pe erou, nici pe carduri. Culoarea vine din fotografii; restul e alb, ceață
  și negru.
- **Umbre.** Separarea se face cu culoarea de fundal, iar conturul e o umbră interioară de 0,8 px
  fără difuzie, care nu mișcă așezarea.
- **Culoare de brand pe o bandă.** Banda de încheiere e o țiglă pe ceață cu o pastilă. O bandă
  colorată păstrată „ca să se vadă chemarea" e felul în care o direcție veche supraviețuiește sub
  un nume nou.
- **Text peste fotografie.** Textul stă deasupra fotografiei sau lângă ea, niciodată peste. Așa
  dispare tot mecanismul de voal: nu mai există contrast peste imagine, adică exact cazul pe care
  `axe` îl marchează „needs review" și îl lasă în afara verdictului.
- **Majuscule pe titluri.** Nici din CSS, nici scrise în text. Titlul e o propoziție cu punct.
- **Al doilea buton primar** pe aceeași țiglă.
- **Culori din direcția anterioară**, nici măcar definite „pentru orice eventualitate": o culoare
  definită și nefolosită e gaura prin care direcția veche supraviețuiește tăcut.
- **Emoji, grilă de fișe identice cu icoane, numere mari de ornament, sigilii despre propria
  noastră rigoare** - de felul unei date de verificare tipărite în subsol.

Conținutul nu se inventează și nu se pierde. Fiecare afirmație verificabilă are o intrare în
`src/content/afirmatii/`, iar ce nu putem susține rămâne scris ca atare - pe pagina de start, în
notele numerotate de la bază. Cifre, certificări sau clienți nu se adaugă.

## Reziduurile paletei vechi - inventar măsurat

Felia de fundație a schimbat paleta, dar nu a rescris toate paginile interioare. Clasele Tailwind
rămase sunt **șiruri**, nu identificatori: `typecheck`, `lint` și `build` nu le văd, iar `axe` nu
le vede nici el atunci când elementul rămâne lizibil din alt motiv. Degradarea e tăcută, deci
inventarul se face cu o comandă, nu din memorie.

Lista se reface din **diferența** dintre culorile paletei vechi și cele de acum. Baza de comparație
e **primul commit al depozitului** - punctul din care a plecat site-ul, cu paleta veche întreagă -
și se citește din git, nu se scrie de mână, ca să nu îmbătrânească:

```bash
BAZA=$(git rev-list --max-parents=0 HEAD)
git show "$BAZA":src/app/globals.css | grep -oP '^\s*--color-\K[a-z0-9-]+' | sort -u > /tmp/culori_vechi
grep -oP '^\s*--color-\K[a-z0-9-]+' src/app/globals.css | sort -u > /tmp/culori_head
ALT=$(comm -23 /tmp/culori_vechi /tmp/culori_head | paste -sd'|')
test -n "$ALT" || { echo "lista de roluri dispărute e goală: baza e greșită"; exit 1; }
grep -rnoP "\b(bg|text|border|from|to|via|ring|fill|stroke|decoration|outline|divide|placeholder|caret|accent)-($ALT)(?![-a-zA-Z0-9])" src/
```

**Garda `test -n "$ALT"` nu e decor.** Prima versiune a comenzii, pe site-ul precedent, compara cu
`main`; din clipa în care `main` a primit paleta nouă, diferența ieșea goală, alternarea din regex
devenea `-()`, expresia potrivea orice `text-`/`bg-`, și trei agenți au raportat independent
zeci de „apariții" false. O listă goală înseamnă bază greșită, nu depozit curat.

**Măsurat la felia de fundație a acestui site:** 9 roluri de culoare dispărute; **41 de apariții în
cod**, în 12 fișiere - unsprezece pagini din `src/app` plus `src/content/termene.ts`. Dintre ele:
25 `text-violet`, 10 `decoration-violet-2`, 3 `decoration-violet-clar`, 2 `bg-violet-pal` și una
`border-linie`. Niciuna nu e o pereche de fundal închis cu literă albă, adică singura formă care ar
fi produs alb pe alb; de asta ștergerea se putea face acum. Comanda de mai sus raportează câteva
mai multe, fiindcă numără și comentariile și `globals.css`, unde numele vechi sunt citate în note.

Proba `tests/directia.test.ts` ține cifra la **zero** în fișierele feliei de fundație, iar pentru
rest o plafonează la cea măsurată: reziduul poate doar să scadă. E scrisă ca `<=`, nu ca `===`,
tocmai ca să nu se înroșească atunci când valul următor rescrie una dintre pagini.

**Controlul regexului**, obligatoriu înainte de a te încrede în cifră: un șir fabricat cu
`text-violet-clar` și `border-linie` trebuie să dea 2, iar `bg-albastru-clar` - un jeton valid din
paleta nouă - trebuie să dea 0. De asta expresia se termină cu `(?![-a-zA-Z0-9])`: fără el, orice
`-clar` sau `-2` lipit de un nume mort ar fi numărat greșit.

## Scriptul de contrast

Cifrele din acest document se pot reface. Raportul de luminanță WCAG, din valorile paletei:

```python
def canal(v):
    v = v / 255.0
    return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4

def luminanta(rgb):
    r, g, b = rgb
    return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b)

def contrast(a, b):
    la, lb = luminanta(a), luminanta(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)
```

Lângă rezultat se pune întotdeauna un martor cu răspuns cunoscut - alb pe negru, care trebuie să
dea 21,00, și alb pe alb, care trebuie să dea 1,00. Pe pagina construită se măsoară altfel: se
citește culoarea calculată a fiecărui bloc de text și fundalul lui efectiv, se calculează raportul
și se compară cu pragul care i se aplică (3:1 de la 24 px, sau de la 18,66 px la greutatea cel
puțin 700; 4,5:1 în rest). Verificarea pe pagină se face **după** repornirea serverului: numele fișierului CSS
se schimbă la fiecare build, iar un server pornit înaintea lui servește o pagină fără foaie de
stil, cu legături albastre implicite - și atunci toate blocurile ies perfect, din alt motiv.
