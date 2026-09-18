# Imagini ilustrative - proveniență și licență

Toate fotografiile de aici sunt de pe Pexels, sub licența Pexels (folosire comercială permisă, fără
atribuire obligatorie): https://www.pexels.com/license/

| Fișier | Sursă |
|---|---|
| rafturi-*.webp | https://www.pexels.com/photo/38195854/ |
| cutii-*.webp | https://www.pexels.com/photo/8473770/ |
| dosare-*.webp | https://www.pexels.com/photo/30350318/ |
| dulapuri-*.webp | https://www.pexels.com/photo/29940222/ |
| sertare-*.webp | https://www.pexels.com/photo/8478370/ |
| maini-*.webp | https://www.pexels.com/photo/6636324/ |
| legatura-*.webp | https://www.pexels.com/photo/17065769/ |

**Sunt imagini ILUSTRATIVE, nu fotografii ale depozitului de la Golești.** Se înlocuiesc cu fotografii
reale ale depozitului ADRIA în ziua în care există. Până atunci, site-ul nu afirmă nicăieri că ar fi
depozitul nostru.

## De ce setul acesta e al acestui site

Site-ul a pornit ca o copie a arborelui site-ului precedent al fabricii și a moștenit de la el
aceleași șapte fotografii: toate cele 14 fișiere erau identice la octet cu ale lui, măsurat cu
`sha256sum`. Două site-uri care se adresează acelorași clienți nu pot arăta aceleași imagini, așa că
fiecare site are cadrele lui, iar schimbarea s-a făcut **înainte de primul push**, ca site-ul să nu
apară public nici măcar o oră cu fotografiile altuia.

Cheile au rămas neschimbate - `rafturi`, `cutii`, `dosare`, `dulapuri`, `sertare`, `maini`,
`legatura` - deci nicio pagină nu s-a atins; s-au schimbat fișierele, textele alternative din
`src/content/fotografii.ts` și copiile lor din `src/content/start.ts`.

**Două cadre din șapte nu mai sunt cele propuse la pornire.** Pentru `dulapuri` fusese propus
9219643, dulapuri metalice albe cu uși numerotate. Privit la 1:1 înainte de generare, are sub
**fiecare** cifră un slogan tipărit într-un alfabet nelatin, care se citește cuvânt cu cuvânt în
original - text așezat pe chiar subiectul cadrului, deci imposibil de scos printr-un decupaj.
Locul lui îl ia rezerva declarată, 29940222: ușa albă a unui dulap de birou, cu cheia lăsată în
broască, prim-plan, fără nicio literă în cadru. `sertare` s-a schimbat abia în runda a treia, și
are secțiunea lui mai jos.

## `sertare`: cadrul s-a schimbat în runda a treia

**Până acum cheia purta 6550462, care arăta aceeași sală de catalog ca două cadre ale site-ului
precedent al fabricii** (6549926 și 6550460). Încadrarea era alta - acolo peretele întreg de
sertare, aici un singur sertar tras afară - dar erau aceeași mobilă de arțar, aceleași suporturi
metalice de etichetă, aceeași podea gri și aceeași lumină, iar ID-urile vecine spun că sunt cadre
din aceeași ședință foto. **Regula măsurată era respectată** (0 sume sha256 comune, control pozitiv
14 din 14), dar scopul ei nu: cine deschidea amândouă site-urile vedea aceeași încăpere. Regula a
rămas cum e; s-a schimbat cadrul, fiindcă o regulă respectată la literă și ratată la scop nu se
repară rescriind regula.

**Rezerva declarată atunci, 6333856, nu putea lua locul**, și de aceea cheia a plecat cu decizia la
om în loc să fie închisă de mașină. A fost re-descărcată și privită la 1:1 (5971x3981, decupaje
x 0-700 și x 1000-1800 pe rândurile 1900-2500): fiecare sertar poartă o etichetă tipărită,
**lizibilă cuvânt cu cuvânt, într-un alfabet care nu e cel latin** - un antet repetat, plus un număr
și un interval alfabetic. Etichetele acoperă tot peretele, adică chiar subiectul cadrului, deci
nicio fereastră 3:2 nu le lasă afară.

**Cadrul de acum, 8478370, e ales de om**, după ce amândouă opțiunile declarate ale cheii au căzut.
Nu are nimic comun cu cele două săli de catalog: sunt fronturile plate ale unor sertare suprapuse,
tăiate oblic de cadru, cu mai multe mânere de sârmă pe fiecare front (3-4 pe banda albă) și cu umbrele
lor, de la negru și maro închis (35,5% din fișierul de 1920 stă sub V 0,25) la tonuri de nisip, alb, gri și
un galben. Sursa are 6720x4480, adică **exact 3:2**, deci fișierul de 1920 este cadrul întreg redus
și la cheia asta nu s-a tăiat nimic afară.

**Și a doua rezervă a picat, scris aici ca să nu fie re-descărcată de runda următoare.** 3747525
(sertare de catalog din lemn, cu etichete de hârtie) are pe cartonașe text tipărit într-un alfabet
nelatin, lizibil cuvânt cu cuvânt - și nu abia la 1:1, ci deja în previzualizarea de 800 px;
confirmat apoi și la 1:1, pe decupajul x 1200-2600, y 700-1400 din 3840x5760. E același motiv
pentru care au căzut 9219643 la `dulapuri` și 6333856 aici, deci criteriul e aplicat a treia oară
la fel, nu renegociat.

**Ce nu afirmă textul alternativ despre cadrul nou.** Corpul dulapului nu intră în cadru, deci
„sertar" e citirea pe care o susține un mâner de sârmă montat pe un front plat, nu ceva ce se poate
dovedi din imagine; iar materialul plăcilor nu se afirmă deloc, aceeași măsură ca la `dulapuri`,
unde s-a scos cuvântul „metalic".

## Cele două mărimi, și ce lasă afară fiecare fereastră

Fiecare fotografie are o variantă de 1920 px lățime, pentru ecran lat, și una de 960 px, servită sub
768 px. Niciuna nu e mărită: toate cele șapte surse au fost descărcate de pe Pexels și măsurate cu
Pillow. Măsurat, sursă cu sursă: `rafturi` 2252x3376, `cutii` 3872x5808, `dosare` 2992x4000,
`dulapuri` 3000x2001, `sertare` 6720x4480, `maini` 2987x4480, `legatura` 2999x2000. Cea mai îngustă
are 2252 px, cea mai lată 6720 px - fiecare peste 1920 cu marjă, iar fereastra din care se scoate
varianta de 960 are între 1120 și 2987 px lățime, adică tot peste 960.

Varianta de 1920 este PEISAJ 3:2 la toate șapte, varianta de 960 este PORTRET 2:3 (960x1440) la
toate șapte - un peisaj întins cu `object-cover` pe un telefon ținut vertical se mărește de peste o
dată și un sfert și se înmoaie.

**Ferestrele nu sunt preferințe.** Trei dintre ele sunt așezate ca să țină afară o urmă de text pe
care fișierul livrat nu are voie s-o poarte, iar poziția fiecărei urme a fost citită în original, la
1:1, înainte de generare:

| cheie | fereastra de 1920 | fereastra de 960 | ce ține afară |
|---|---|---|---|
| rafturi | rândurile 0-1501 din 3376 | x 100-1220, rândurile 0-1680 | **două etichete de transport cu cod de bare**, una la rândul 1680 al sursei (x 272-574), una la 3220. Decupajul de 960 taie și pe lățime, nu doar pe înălțime |
| cutii | rândurile 1750-4331 | x 700-3280, rândurile 1250-5120 | nimic - fereastra e pusă doar pe subiect |
| dosare | rândurile 600-2595 din 4000 | **x 0-1700 din 2992**, rândurile 350-2900 | **un scris de mână în alt alfabet**, care începe la rândul 2650 și stă la x 1717-2400. La 960 e evitat pe LĂȚIME |
| dulapuri | cadrul întreg (3000x2000 din 3000x2001) | x 800-2134 | nimic |
| sertare | cadrul întreg (6720x4480, exact 3:2) | x 1866-4853 din 6720, fereastra 2:3 CENTRATĂ | nimic |
| maini | rândurile 300-2291 din 4480 | x 750-2310, rândurile 0-2340 | **o hârtie de ziar cu text englezesc lizibil**, de la rândul 2375 în jos. Odată cu ea rămâne afară și a doua mână: originalul are două, cadrul livrat are una, iar textul alternativ descrie ce se livrează |
| legatura | cadrul întreg (2999x1999 din 2999x2000) | x 150-1483 | nimic |

Prima variantă a decupajului de 960 pentru `rafturi` conținea eticheta cu cod de bare de la rândul
1680. Nu se vedea la privirea normală; a ieșit la mărirea de 6 ori a **fișierului livrat**, nu a
originalului, și fereastra a fost refăcută. De aceea inventarul de mai jos se face pe fișierele
livrate, nu pe surse.

Generate cu Pillow, calitate WebP 81, `method=6`. **Excepția, măsurată:** `dosare-1920` e la
calitate **78**, fiindcă la 81 ieșea 269.466 octeți (263 KB), peste plafonul de 250 KB - cadrul e o
textură de file, cel mai scump de comprimat din lot. La 78 are 236.856 octeți (231 KB). Cel mai
ușor fișier este `dulapuri-960` cu 17 KB.

## Luminanța și saturația setului

Măsurat pe fișierele livrate de 1920, după generare:

| cheie | luminanță | saturație |
|---|---|---|
| rafturi | 43,6 | 17,3 |
| cutii | 59,9 | 36,3 |
| dosare | 31,1 | 43,0 |
| dulapuri | 58,5 | 12,9 |
| sertare | 37,4 | 30,8 |
| maini | 41,1 | 34,3 |
| legatura | 37,7 | 19,6 |

Niciun cadru sub 30 la luminanță, niciunul peste 50 la saturație. Cel mai strâns e `dosare`, la 31,1
luminanță și 43,0 saturație - la 1,1 respectiv 7,0 puncte de praguri, deci un cadru de urmărit dacă
se recomprimă vreodată setul.

Cifrele lui `sertare` sunt ale cadrului NOU (8478370) și s-au mișcat mult față de cel înlocuit:
luminanța a coborât de la 46,2 la 37,4, iar saturația a urcat de la 15,7 la 30,8, fiindcă banda
galbenă e singurul accent de culoare tare din set după `dosare` și `cutii`. Amândouă rămân cu marjă
față de praguri - 7,4 puncte peste podeaua de luminanță și 19,2 sub plafonul de saturație.

**Riscul nu e teoretic, și cele două fapte se ating.** `dosare-1920` e chiar fișierul care a cerut
calitate 78 în loc de 81 ca să intre sub 250 KB (236.856 octeți), adică e **cel mai probabil din
lot să fie recomprimat** data viitoare când se strânge plafonul de mărime - și e totodată singurul
la 1,1 puncte de podeaua de luminanță. Cine coboară calitatea aici remăsoară L înainte de a comite:
de sub 30 nu se mai iese fără schimbarea cadrului.

**Cum se măsoară, ca să nu iasă altă cifră data viitoare.** „Eșantion de 160x160" înseamnă **întregul
fișier de 1920 redus la 160x160** (Pillow, LANCZOS), apoi media pe pixeli a lui `L` din
`colorsys.rgb_to_hls` și a lui `S` din `colorsys.rgb_to_hsv`, înmulțite cu 100. NU înseamnă un
decupaj de 160x160 din mijlocul fișierului: pe seturile anterioare ale fabricii decupajul din mijloc
a dat abateri de peste 60 de puncte la saturație față de miniatură, adică ar aprinde praguri care nu
sunt depășite.

## Inventarul urmelor de text, pe AMÂNDOUĂ fișierele livrate

Fiecare zonă suspectă a fost decupată din fișierul livrat și mărită de 3 până la 6 ori cu LANCZOS. Se
scrie ce SE DISTINGE și ce NU, nu ce știu din original.

| cheie | în `-1920` | în `-960` |
|---|---|---|
| rafturi | etichetele de coordonate ale consolelor de raft: `02-12-40`, `02-11-40`, `02-12-30` și vecinele - **numai cifre și cratime**, coordonate de amplasare, nici marcă, nici cod de bare. Pe folia paleților, urme cenușii-albăstrui de tipar de sub folie: la 4x nu se identifică nicio literă | aceleași coduri de raft, la aceeași lizibilitate. Pe paletul înfoliat din colțul de jos, la 4x, doar pete albastre pe folie, nicio literă. Eticheta cu cod de bare nu e în fișier |
| cutii | nicio urmă de text. Cartonul kraft e gol, cârligele dosarelor suspendate sunt din plastic alb, fără inscripție | nicio urmă de text |
| dosare | pe cotorul unui dosar aflat în umbră, **trei semne ștanțate** care se citesc ca cifre (`161` sau `181`): un număr de dosar, nu un cuvânt și nu o marcă. Restul teancurilor e gol | același număr ștanțat, la 6x la fel de clar. Scrisul de mână în alt alfabet nu e în fișier |
| dulapuri | nicio urmă de text. Ușa e un panou alb neted, broasca și cheia nu poartă inscripție. **Materialul nu se poate stabili din cadru** - nicio nervură, îmbinare sau reflexie de tablă; poate fi la fel de bine melamină, iar cheia și rozeta sunt de mobilier de birou obișnuit. De aceea nici textul alternativ nu îl mai afirmă | nicio urmă de text |
| sertare | **nicio literă, nicio marcă, niciun cod de bare.** Plăcile sunt suprafețe goale; măritul de 4x pe banda albă (x 300-700, y 560-720) arată textura fibroasă și o pată de ton ușor diferit, fără niciun glif. Singura urmă care poate fi luată drept literă e în colțul din stânga-jos: la 6x arată a „V" unghiular, dar e **umbra unui mâner tăiat de marginea cadrului** - aceeași tonalitate și același rând cu celelalte umbre de mâner din cadru, iar mânerul care o aruncă e în afara cadrului, la stânga | **nicio urmă de text.** Mărit de 4 ori pe două zone (x 0-480, y 820-1160 și x 480-960, y 180-520): plăci, mânere de sârmă și umbrele lor, atât. „V"-ul de mai sus nu e în fișier: fereastra de 960 începe la x 1866 din sursă |
| maini | pe o coală albă dintre despărțitoare, **un singur semn de pix în formă de X**. Nicio literă, niciun cuvânt. Ziarul cu text lizibil nu e în fișier | aceeași coală, același X, nimic altceva |
| legatura | calculatorul de birou poartă inscripțiile standard ale tastelor: cifrele, `MU`, `M+`, `M-`, `MR`, `MC`, `%`, `+/-`, `C/CE`, `00`. Sunt **funcții de tastă, nu un nume de firmă** - pe carcasă nu apare nicio marcă, iar afișajul e stins. Bibliorafturile și mapa cu fermoar sunt goale | calculatorul nu e în fișier: fereastra de 960 se oprește la x 1483, iar el începe la 1500. Nicio urmă de text |

Ce rămâne nemăsurat, scris ca atare: nu am rulat OCR pe fișiere, deci „nu se identifică nicio
literă" înseamnă ce am văzut privind mărirea, nu un rezultat de recunoaștere automată.

**Tabelul ăsta e și sursa textelor alternative, nu doar un inventar de text.** Coloana `-960`
spune ce NU e în fișierul servit sub 768 px, iar un obiect scris acolo ca absent nu are voie să
rămână numit în `src/content/fotografii.ts`. S-a întâmplat o dată: rândul `legatura` scria deja
că „calculatorul nu e în fișier", iar textul alternativ îl numea mai departe. Corectat pe
2026-09-07, împreună cu `maini`; regula, cu cifrele ferestrelor, e scrisă în antetul registrului.

<!-- Dovada unicității, măsurată pe 2026-09-06 și REMĂSURATĂ pe 2026-09-07, după ce `sertare`
     a primit alt cadru. O sumă schimbată e chiar cazul în care dovada de ieri nu mai spune nimic.

     Site-ul ăsta e al TREILEA al fabricii, deci comparația se face cu AMÂNDOUĂ cele dinainte.
     Rădăcina fiecăruia e o variabilă, oriunde ar fi clonat local - de aceea nu e scrisă aici
     nicio cale fixă.

     Comanda tipărește și câte sume s-au citit de fiecare parte, fiindcă varianta scurtă MINTE:
     pe o cale greșită `sha256sum` eșuează pe stderr, `comm` primește o listă goală, conducta
     tipărește chiar `0` și iese cu cod 0 - adică exact răspunsul „bun", fără să se fi comparat
     nimic. Un rând care nu arată 14 de fiecare parte invalidează cifra de lângă el.

       sha256sum public/img/*.webp | cut -c1-64 | sort > /tmp/aici.txt
       wc -l < /tmp/aici.txt                                   # trebuie 14
       for ALT in "$SITE_UNU" "$SITE_DOI"; do
         ( cd "$ALT" && sha256sum public/img/*.webp | cut -c1-64 | sort ) > /tmp/acolo.txt
         echo "$ALT: acolo=$(wc -l < /tmp/acolo.txt)" \
              "comune=$(comm -12 /tmp/aici.txt /tmp/acolo.txt | wc -l)"
       done

     Măsurat pe 2026-09-07, cu `sertare` deja înlocuit: 14 sume aici, 14 la fiecare dintre cele
     două site-uri, 0 sume comune cu oricare. Aceleași cifre ca pe 2026-09-06.

     CONTROALE POZITIVE, ca să se știe că măsurătoarea chiar ar fi văzut coincidențele:
       - fiecare site anterior comparat cu el însuși: 14 din 14, de două ori;
       - cele două site-uri anterioare comparate între ele: 0 - adică sunt deja disjuncte;
       - controlul cel mai tare, fiindcă e o coincidență REALĂ pe care măsurătoarea a găsit-o:
         fișierele de pe `main` ale acestei felii (cele MOȘTENITE, dinainte de schimbare)
         comparate cu site-ul din care a fost copiat arborele dau 14 din 14 identice. Deci
         moștenirea chiar exista, iar comanda o vede.

     A doua direcție, contra versiunii de pe `main` a acestei felii, fiindcă niciun cadru
     moștenit nu are voie să supraviețuiască sub același nume:

       for f in $(cd public/img && ls *.webp); do
         git show "main:public/img/$f" | sha256sum | cut -c1-64
       done | sort > /tmp/main.txt
       wc -l < /tmp/main.txt                          # trebuie 14
       comm -12 /tmp/aici.txt /tmp/main.txt | wc -l   # sume comune

     Măsurat: 14 sume citite din `main`, 0 comune cu arborele de aici. Control pozitiv, aceeași
     comandă cu `main` contra lui însuși: 14 din 14. -->
