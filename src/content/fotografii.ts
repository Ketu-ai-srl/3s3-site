// Fotografiile vitrinei: un singur loc care stie ce fisier exista in `public/img/` si ce
// scrie in textul alternativ al fiecaruia.
//
// DE CE UN REGISTRU, si nu textul alternativ scris in fiecare pagina. Pana acum fotografiile
// erau folosite doar de pagina de start, care si-l scria singura de trei ori. De cand
// deschid toate cele 22 de pagini, acelasi cadru apare pe doua-trei pagini diferite: cu
// textul scris de mana in fiecare, doua descrieri ale ACELEIASI fotografii diverg la prima
// editare, si nimic nu le-ar fi comparat. Aici e o singura descriere per cadru, iar pagina
// alege cheia.
//
// REGULA DE ADEVAR, scrisa in `docs/design/DIRECTIA.md`: sunt fotografii ILUSTRATIVE, de pe
// Pexels, cu licenta in `public/img/LICENTA.md`. Textul alternativ o SPUNE, in litere, si nu
// afirma nicaieri ca ar fi depozitul nostru.
//
// FIECARE SITE ARE SETUL LUI. Site-ul asta a pornit ca o copie a celui precedent al fabricii
// si a mostenit aceleasi sapte fotografii - toate cele 14 fisiere identice la octet, masurat
// cu sha256. Doua site-uri care se adreseaza acelorasi clienti nu pot arata aceleasi imagini,
// deci pe 2026-09-06, INAINTE de primul push, s-au schimbat toate, cu cheile NEATINSE: cheia e
// contractul cu paginile, fisierul e al acestui site. Nimic din `public/img/` nu se copiaza de
// la alt site. Dovada, cu control pozitiv, e in `public/img/LICENTA.md`.
//
// CINCI DIN SAPTE ID-URI sunt cele propuse la pornirea feliei; doua s-au schimbat, si fiecare
// isi poarta motivul langa cheie. `dulapuri` a trecut pe rezerva inca de la prima runda: cadrul
// propus (9219643, dulapuri metalice albe cu usi numerotate) poarta sub FIECARE cifra un slogan
// tiparit intr-un alfabet nelatin, perfect lizibil la 1:1 in original - text asezat pe chiar
// subiectul cadrului, deci imposibil de scos prin decupare. Locul lui il ia rezerva declarata,
// 29940222: usa alba a unui dulap de birou, cu cheia in broasca, prim-plan, fara nicio litera in
// cadru. `sertare` s-a schimbat abia in runda a TREIA, cu un cadru ales de om (8478370), fiindca
// amandoua optiunile lui de pana atunci picasera: una arata aceeasi sala de catalog ca site-ul
// precedent, cealalta purta etichete intr-un alfabet nelatin pe tot peretele.
//
// CE S-A TAIAT AFARA DIN FIECARE ORIGINAL, ca sa se vada ca ferestrele nu sunt preferinte:
//   `rafturi` - doua etichete de transport cu cod de bare, una la randul 1680 al sursei si una
//               la 3220. Fisierul de 1920 se opreste la 1501, iar cel de 960 taie si pe
//               LATIME (100-1220 din 2252), fiindca eticheta de la 1680 sta la x 272-574 si ar
//               fi cazut exact in fereastra cardului de telefon. Prima incercare de decupaj de
//               960 o continea, si s-a vazut abia la marirea de 6 ori a fisierului livrat.
//   `dosare`  - un scris de mana in alt alfabet, care incepe la randul 2650 al sursei si sta la
//               x 1717-2400. Fisierul de 1920 se opreste la 2595; cel de 960 il evita pe
//               LATIME, fereastra fiind 0-1700.
//   `maini`   - o hartie de ziar cu text englezesc lizibil la 1:1, de la randul 2375 in jos.
//               Amandoua fisierele se opresc deasupra ei (1920 la 2291, 960 la 2340), si de
//               aceea in cadrul livrat intra o SINGURA mana, desi originalul are doua.
// Inventarul urmelor de text ramase, pe amandoua fisierele livrate, e in `public/img/LICENTA.md`.
//
// UN ALT PER CHEIE, DOUA FISIERE PER CHEIE. Registrul tine o SINGURA descriere, dar `<picture>`
// serveste `-1920` peste 768 px si `-960` sub - deci alt-ul trebuie sa fie adevarat pe AMANDOUA
// fisierele, nu doar pe cel mare. Prima varianta a gresit exact aici, pe doua chei din sapte:
//   `legatura` numea „un calculator de birou si o planta". Fereastra de 960 e x 150-1483 din
//              2999, iar calculatorul incepe la x 1500 si planta la 2324: niciunul nu e in
//              fisierul servit sub 768 px. Pentru calculator faptul era deja SCRIS in
//              `LICENTA.md`, la inventarul urmelor de text, si n-a fost dus in alt.
//   `maini`    numea „un caiet cu spirala". El sta la x 2240-2639 in sursa, iar fereastra de
//              960 se opreste la 2310: in fisierul livrat intra o feliuta din marginea lui
//              stanga, fara nicio spirala vizibila.
// Corectate pe 2026-09-07, privind fisierele de 960 DIRECT, nu sursele. Celelalte cinci chei au
// fost privite la fel, tot pe `-960`: fiecare obiect numit de alt e in amandoua marimile.
// REGULA, ca sa nu se repete: se numeste doar ce e in AMANDOUA fisierele. Un obiect care intra
// doar in cel mare ramane nenumit - unul nenumit nu strica nimic, unul numit si absent minte.
//
// `pozitie` e ancora decupajului, si e o masuratoare, nu o preferinta. Toate cifrele de mai
// jos sunt citite din pagina CONSTRUITA, nu din CSS: `document.documentElement.clientWidth`
// raportat de browser, 1440 si 390.
//
// PE TELEFON E UN SINGUR CARD. La clientWidth 390 cardul de fotografie masoara 358x240 px pe
// toate paginile care poarta unul - `Ecran`, `TabPastila`, `InvestitieRandFoto`,
// `SegmentRandTextImagine`. Masurat cu bara de derulare ASCUNSA, fiindca bara clasica lasa
// innerWidth 390 dar clientWidth 375, adica un card cu 15 px mai ingust decat pe un telefon
// adevarat - si atunci cifra masurata nu e cea traita. Cardurile mici din randul eroului fac
// 171,2x120,0 la aceeasi latime - alt card, dar aceeasi fereastra pe practic acelasi procent
// (46,7% fata de 44,6%), deci o singura valoare le serveste pe amandoua. Toate cinci cifrele
// s-au REMASURAT pe setul de acum, pe pagina construita, nu preluate din setul mostenit.
//
// PE ECRAN LAT SUNT CINCI CARDURI DIFERITE, si nu una si aceeasi acoperire: intre randul de
// fisa si cardul mic de erou sunt 11,3 puncte, adica exact zona in care `pozitie` se vede sau
// nu. Masurat pe pagina construita la clientWidth 1440, cu `getBoundingClientRect` si
// `naturalWidth/naturalHeight`, cat la suta din inaltimea fisierului de 1920 incape in card:
//
//   (Randurile de mai jos sunt masurate pe asezarea de DINAINTEA valului S2: cardurile
//   directiei anterioare. Randul eroului e remasurat la S2-b0; celelalte carduri interioare
//   se remasoara la S2-b, cand paginile trec pe gramatica REF-A. Pe start, tiglele arata
//   fotografia pe 1440x329-373 la 1440 si pe 390x320 la 390 - vezi Ecran.tsx.)
//   card                                       marime    acoperire   unde
//   carduri mici de erou                       282x180   95,7%       `/`
//   rand text/imagine (`InvestitieRandFoto`)   569x360   95,0%       `/investitia`, `/comparatie`, `/despre`
//   card de fila (`TabPastila`)                577x360   93,7%       `/` - DISPARUT la S2-a (componenta stearsa)
//   antet de pagina (`AntetPagina`)            1183x640  81,1%       toate paginile interioare cu erou - REMASURAT la
//                                                                    S2-b0 (fotografia pe toata latimea vitrinei, 1247
//                                                                    minus 2x32; 640 = subset al ferestrei de 84,4%, ca
//                                                                    textul sa intre in linia de plutire); la 390: 358x320 = 59,6% din fisierul
//                                                                    de 960 (portret 2:3), fereastra care o CONTINE pe
//                                                                    cea a cardului vechi de 358x240 (44,6%), deci
//                                                                    ancorele `pozitie` raman valabile fara remasurare
//   rand de fisa (`SegmentRandTextImagine`)    569x320   84,4%       `/solutii`, `/solutii/<domeniu>`, `/arhivare-fizica`, `/cum-functioneaza`, `/securitate`
//
// ACOPERIREA E O SINGURA CIFRA PER CARD, nu un interval, si asta e o schimbare fata de setul
// mostenit: acolo fisierele de 1920 aveau inaltimi diferite (1272-1282 px, proportia fiecarei
// surse) si acoperirea varia cu cateva zecimi intre cadre. Setul de acum e taiat la 3:2 exact
// la toate sapte, deci toate cele sapte fisiere de 1920 masoara 1920x1280 si cardul se
// comporta la fel cu oricare. Cel mai strans e randul de fisa, 84,4%:
// acolo `pozitie` chiar se vede, aproape 16% din inaltime fiind taiati, si de aceea cifrele
// de mai jos spun pe CARE card s-a masurat fiecare cadru. Tabelul e masurat pe zece pagini,
// nu pe una: `/`, `/solutii`, `/solutii/notari`, `/investitia`, `/comparatie`, `/despre`,
// `/arhivare-fizica`, `/cum-functioneaza`, `/securitate`, `/contact`.
//
// CE INSEAMNA FEREASTRA. Sub 768 px se serveste fisierul de 960, care e PORTRET 2:3 (0,67)
// intr-un card de 358x240 (1,49): el se intinde pe latime, deci din inaltimea fisierului se
// vede 240 / 537,6 = 44,6%, si `pozitie` alege UNDE cade acea fereastra - de la 0-44,6% (la
// 0%) pana la 55,4-100% (la 100%). Pe ecran lat se serveste fisierul de 1920, peisaj 3:2, iar
// cardurile din tabelul de mai sus arata intre 84,4% si 95,7% din inaltimea lui: pe patru din
// cinci aceeasi valoare aproape ca nu se vede, si de aceea decupajul de telefon e cel care
// decide.
//
// ISTORIC, ca sa nu fie remasurat degeaba: pana la felia asta registrul mai avea doua campuri,
// `filtru` (o desaturare CSS) si `voalBanda` (subtierea voalului de sub text). Amandoua erau
// cifre masurate contra unei pagini de NOAPTE, pe care fotografia acoperea tot ecranul si
// purta text peste ea. In REF-V fotografia sta intr-un card alb cu raza 16 si nu mai poarta
// niciun text, deci nu mai exista nici banda de culoare in care sa fie adusa, nici contrast
// de aparat cu un voal: campurile n-ar mai fi avut ce masura si s-au scos, din registru si
// din tipul `Imagine` al lui `Ecran.tsx`. Cifrele lor vechi stau in istoricul git, la felia 29.

export type Fotografie = {
  /** numele fisierului fara sufixul de marime: `rafturi` -> rafturi-1920.webp / rafturi-960.webp */
  nume: string;
  alt: string;
  pozitie?: string;
};

export const FOTOGRAFII = {
  rafturi: {
    nume: "rafturi",
    alt: "Rafturi metalice înalte de depozit, pe mai multe niveluri, încărcate cu cutii de carton și cu paleți înfoliați, fotografie ilustrativă",
    // 50%, si e o masuratoare care spune ca nu e nimic de castigat: subiectul umple fisierul de
    // 960 de la un capat la altul - banda de detaliu (abaterea standard pe randuri, peste 45%
    // din maxim) tine 0,0-99,9% din inaltime, deci fereastra de 44,6% a cardului de telefon
    // cade pe rafturi oriunde ar fi pusa. Cand nicio valoare nu castiga nimic masurabil, ramane
    // cea care nu cere explicatie.
    pozitie: "center 50%",
  },
  cutii: {
    nume: "cutii",
    alt: "Trei cutii de arhivă din carton kraft, așezate pe un birou alb, cu dosare suspendate prinse în ele; o mână așază unul dintre dosare, fotografie ilustrativă",
    // 45%, masurat: cat la suta din fereastra cardului de telefon e carton kraft (rosu peste
    // albastru cu 25 de niveluri, rosu intre 150 si 235), din 5 in 5 puncte - 73,8% la 25%,
    // 80,1% la 40%, 82,4% la 45%, 81,8% la 50%, 75,4% la 60%. Maximul e la 45%.
    //
    // Diferenta fata de 50% e de 0,6 puncte, adica sub orice rezolutie utila, si alegerea NU se
    // sprijina pe ea, ci pe ce anume se pierde: cutiile tin 25,7-70,5% din inaltimea fisierului
    // de 960, iar carligele dosarelor suspendate - detaliul care spune „arhiva" si nu „mutare" -
    // stau chiar pe muchia lor de sus, la 25,7-30%. La 45% fereastra e 24,9-69,5% si le prinde;
    // la 50% e 27,7-72,3%, le taie, si castiga in loc o dunga de birou gol.
    pozitie: "center 45%",
  },
  dosare: {
    nume: "dosare",
    alt: "Teancuri de dosare vechi de carton, cu filele ieșind dintre coperți, în lumină caldă de prim-plan, fotografie ilustrativă",
    // 50%, si tot fiindca masuratoarea nu departajeaza: teancurile sunt prim-plan si umplu
    // fisierul de 960 pe toata inaltimea (banda de detaliu 2,3-99,9%). Ce trebuia tinut afara -
    // scrisul de mana in alt alfabet - nu e in fisier deloc: a fost taiat la GENERARE, pe
    // latime, nu lasat pe seama lui `pozitie`. O ancora nu apara de un continut care e in
    // fisier: pe ecran lat se vede oricum 84-96% din inaltime.
    pozitie: "center 50%",
  },
  dulapuri: {
    nume: "dulapuri",
    alt: "Ușa albă a unui dulap de birou, cu cheia lăsată în broască, prim-plan în lumină de zi, fotografie ilustrativă",
    // MATERIALUL NU SE AFIRMA. Pana pe 2026-09-07 alt-ul spunea „dulap metalic de birou". Privita
    // la 2x pe zona broastei (x 900-1300, y 300-900 din fisierul de 1920), suprafata e un panou
    // alb neted, fara nervura, imbinare sau reflexie specifica tablei; cheia si rozeta cromata
    // sunt de mobilier de birou obisnuit si nu deosebesc tabla de melamina. Nu era o incalcare de
    // regula - alt-ul se incheie cu mentiunea ilustrativa si nu afirma ca ar fi depozitul nostru -
    // dar era o afirmatie mai tare decat suporta imaginea, intr-un set in care restul sunt exacte.
    // Cuvantul s-a scos: alt-ul spune ce se vede, nu din ce banuiesc ca e facut obiectul.
    //
    // 35%, si e o masuratoare pe cadrul NOU, nu cifra mostenita. Cadrul e aproape gol: singurul
    // detaliu e cheia, restul e panou alb. Masurat pe banda x 55-90% a fisierului de 960 -
    // fundalul intunecat din dreapta incepe la 90% si ar fi falsificat pragul - pixelii sub
    // nivelul 70 de gri, adica cheia si umbra ei, tin 30,8-49,5% din inaltime, cu varful la
    // 46,2%; centrul benzii cade la 40,2%.
    //
    // Centrul ferestrei de telefon e `pozitie` x 0,554 + 0,223. Pentru 40,2% ar iesi 32%; la 35%
    // centrul cade la 41,7%, deci la 1,5 puncte de cheie, iar fereastra 19,4-64,0% o cuprinde
    // intreaga. La 50% centrul ar fi 50,0%, cu cheia impinsa in jumatatea de sus si 14 puncte de
    // tabla goala dedesubt; de la 60% in sus cheia iese partial din fereastra.
    pozitie: "center 35%",
  },
  sertare: {
    nume: "sertare",
    alt: "Fronturile mai multor sertare plate suprapuse, cu mânere de sârmă, văzute în prim-plan apropiat și oblic; benzile lor merg de la negru și maro închis la tonuri de nisip, alb, gri și un galben, fotografie ilustrativă",
    // CADRU NOU IN RUNDA A TREIA, si de ce nu mai e cel dinainte. Cheia purta 6550462, care arata
    // ACEEASI sala de catalog ca doua cadre ale site-ului precedent (6549926 si 6550460): regula
    // MASURATA era respectata - 0 sume sha256 comune, control pozitiv 14 din 14 - dar scopul ei
    // nu, fiindca cine deschidea amandoua site-urile vedea aceeasi incapere. Rezerva de atunci,
    // 6333856, nu putea lua locul: fiecare sertar poarta o eticheta tiparita, lizibila cuvant cu
    // cuvant, intr-un alfabet nelatin, si etichetele acopera TOT peretele. Cadrul de acum,
    // 8478370, e ales de om si nu are nimic comun cu niciuna din cele doua sali.
    //
    // A DOUA REZERVA A PICAT LA FEL, si se scrie ca sa nu fie re-descarcata de runda urmatoare:
    // 3747525 (sertare de catalog din lemn cu etichete de hartie) are pe cartonase text tiparit
    // intr-un alfabet nelatin, lizibil cuvant cu cuvant - si nu abia la 1:1, ci deja in
    // previzualizarea de 800 px; confirmat apoi si la 1:1, pe decupajul x 1200-2600, y 700-1400
    // din 3840x5760. E exact motivul pentru care au cazut 9219643 la `dulapuri` si 6333856 aici,
    // deci a treia oara nu se mai rediscuta.
    //
    // SURSA E EXACT 3:2, 6720x4480, deci fisierul de 1920 e cadrul INTREG redus: la cheia asta
    // nu exista fereastra de 1920 si nimic nu s-a taiat afara. Fisierul iese 162.928 octeti la
    // calitate 81, adica la mai putin de doua treimi din plafonul de 250 KB.
    //
    // CE SE VEDE, PRIVIT, si ce anume NU se afirma. Fronturi plate suprapuse, taiate oblic de
    // cadru, cu MAI MULTE manere de sarma pe fiecare front (3-4 pe banda alba, x 150-570,
    // 830-1090, 1180-1290, 1400-1520 din 1920 - criticul rundei a treia le-a numarat, de aceea
    // alt-ul spune „cu manere", nu „fiecare cu un maner") si cu umbrele lor pe placa de
    // dedesubt. Culorile din alt incep cu negru si maro inchis fiindca o treime din cadru e
    // intunecata: pixeli cu V < 0,25 in HSV = 35,5% pe `-1920`, 33,2% pe `-960` (galben saturat
    // 7,3% / 8,7%, luminos si neutru 16,7% / 17,5%), masurat de acelasi critic. Marit de 4 ori
    // pe `-1920` (banda alba, x 300-700 y 560-720) si pe `-960` (x 0-480 y 820-1160 si
    // x 480-960 y 180-520): nicio litera, nicio marca, niciun cod de bare, niciun chip. LIMITA,
    // scrisa ca atare: corpul dulapului nu intra in cadru, deci „sertar" e citirea pe care o
    // sustine un maner de sarma pe un front plat, nu ceva ce se poate dovedi din imagine; iar
    // materialul placilor nu se afirma deloc, aceeasi masura ca la `dulapuri`. Singura urma care
    // ar putea fi luata drept litera e in coltul de jos-stanga al lui `-1920`: la 6x arata a „V"
    // unghiular, dar e UMBRA unui maner taiat de marginea cadrului - aceeasi tonalitate si
    // acelasi rand cu celelalte umbre de maner - si nu e in `-960`, a carui fereastra incepe la
    // x 1866 din sursa.
    //
    // DECUPAJUL DE 960 E FEREASTRA 2:3 CENTRATA, x 1866-4853 din 6720. Masurat pe 13 pozitii,
    // din 300 in 300: luminanta ferestrei are un maxim plat, 40,53 la x 1600-1700, iar centrul
    // geometric (1866) da 40,52 - o diferenta sub orice rezolutie utila. Celelalte doua criterii
    // nu au maxim in interval, ci trag invers unul de altul: suprafata luminoasa si neutra creste
    // monoton cu x (15,95% la 0, 21,80% la 3300), galbenul scade monoton (15,4% la 0, 6,0% la
    // 3300). Cand doua criterii sunt monotone si opuse, iar al treilea e plat, ramane centrul.
    //
    // 70%, masurat pe doua criterii care se opresc amandoua aici. Banda galbena - singurul accent
    // de culoare intr-un cadru altfel neutru - tine 59,7-81,2% din inaltimea fisierului de 960.
    // Capatul de jos al ferestrei cardului de telefon e `pozitie` x 0,554 + 0,446, deci ca sa
    // incapa banda INTREAGA e nevoie de cel putin 66,1%. Al doilea criteriu trage invers:
    // suprafata luminoasa si neutra - manerele plus placile palide, V peste 0,62 si saturatie sub
    // 0,14 - are un platou intre 45% si 65%, cu varful 29,15% la 55%, si scade dupa.
    //
    // La 70% fereastra e 38,8-83,3%: banda galbena incape toata, cu 2,1 puncte marja dedesubt,
    // iar suprafata luminoasa e 28,28%, la 0,87 puncte de varf. La 65% s-ar castiga 0,6 puncte de
    // suprafata luminoasa si s-ar taia 0,6 puncte din banda galbena, iar marja de sub ea ar
    // disparea cu totul - adica prima reincadrare de maine ar scoate accentul din card.
    pozitie: "center 70%",
  },
  maini: {
    nume: "maini",
    alt: "Mână care scoate un dosar dintr-un suport de documente din carton, cu file de hârtie ieșind dintre despărțitoare, fotografie ilustrativă",
    // 30%, masurat: cat la suta din fereastra cardului de telefon e mana (rosu peste 140, cu
    // rosu > verde > albastru si rosu peste albastru cu 25 de niveluri), din 5 in 5 puncte -
    // 44,1% la 25%, 44,3% la 30%, 42,9% la 35%, 40,5% la 40%, 33,0% la 50%, 24,5% la 60%.
    // Maximul e la 30%, iar de la 35% in sus scaderea e continua: mana tine 16,7-53,8% din
    // inaltimea fisierului de 960, deci orice coborare a ferestrei o taie de sus.
    //
    // ALT-UL DESCRIE FISIERELE LIVRATE, nu sursa - si nu doar pe cel mare. Originalul are DOUA
    // maini; fereastra se opreste deasupra hartiei de ziar cu text lizibil, si odata cu ea ramane
    // afara si a doua mana, de aceea alt-ul spune o singura mana.
    //
    // A doua jumatate a aceleiasi greseli a stat aici pana pe 2026-09-07: alt-ul numea si „un
    // caiet cu spirala". El e in `-1920`, dar in sursa sta la x 2240-2639, iar fereastra de 960 se
    // opreste la 2310. Marit de 3 ori, coltul din dreapta al fisierului de 960 (x 760-960,
    // y 1060-1440) e carton gol si o muchie de coala alba: nicio spirala. Principiul era scris
    // chiar aici si fusese aplicat contra SURSEI, dar nu si contra celeilalte MARIMI.
    pozitie: "center 30%",
  },
  legatura: {
    nume: "legatura",
    alt: "Bibliorafturi negre așezate în evantai pe un birou alb, cu semne colorate între file, alături de o mapă cu fermoar, fotografie ilustrativă",
    // CE NU E NUMIT, si de ce. Fisierul de 1920 mai are un calculator de birou si o planta, dar
    // fereastra de 960 e x 150-1483 din 2999, iar ele incep la x 1500, respectiv 2324: in fisierul
    // servit sub 768 px nu exista niciunul. Privit direct, `legatura-960` arata bibliorafturile,
    // semnele colorate si mapa cu fermoar - atat numeste si alt-ul. Faptul despre calculator era
    // deja masurat si scris in `LICENTA.md`, la inventarul urmelor de text; pana pe 2026-09-07 nu
    // ajunsese si in alt.
    //
    // 40%, si aici masuratoarea a fost un compromis intre doua marimi care trag invers. Semnele
    // colorate de pe cotoare - singurul detaliu care nu e o suprafata neagra - tin 20,8-64,1%
    // din inaltimea fisierului de 960. Luminanta medie a ferestrei creste monoton cu `pozitie`,
    // fiindca in jos vine biroul alb: 60,3 din 255 la 30%, 72,7 la 40%, 84,1 la 50%, 93,3 la 65%.
    //
    // La 35% fereastra (19,4-64,0%) prinde toata banda de semne, dar cardul iese la 66,4, adica
    // aproape o placa neagra. La 50% (27,7-72,3%) e luminos, dar taie 6,9 puncte din banda, de
    // sus. La 40% fereastra e 22,2-66,8%: pierde 1,4 puncte din banda si urca luminanta la 72,7.
    pozitie: "center 40%",
  },
} as const satisfies Record<string, Fotografie>;

export type CheieFotografie = keyof typeof FOTOGRAFII;
