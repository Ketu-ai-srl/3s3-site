# ADR-0005: Formatul unei reguli din `.claude/rules/`

**Data:** 2026-09-06 · **Stare:** acceptata

## Context

Regulile din `.claude/rules/` erau titluri-subiect ("Regula: zero secrete in cod") cu liste de
sfaturi dedesubt. Trei lipsuri masurate pe ele:

1. Niciun titlu nu se putea VERIFICA. "Zero secrete in cod" e un subiect; nu exista nicio stare a
   arborelui despre care sa poti spune "titlul asta e incalcat aici".
2. Nicio regula nu definea termenul pe care se invarte, deci aplicarea cerea judecata la fiecare
   caz. "Nu comite materiale interne" cere sa stii ce e intern.
3. Regulile se incarcau toate, la orice atingere, iar cine le citea nu afla niciodata daca
   masinaria le apara sau nu.

## Decizie

O regula are, in ordinea asta:

**Frontmatter `paths`**, cu glob-uri pe FORMA (un glob per forma de fisier, nu per instanta) si cu
excluderi `!` pentru dependinte si iesiri de build. Numarul de fisiere potrivite se masoara contra
`git ls-files` cand se scrie regula si la fiecare schimbare a listei.

**Titlul e o afirmatie care e ori tinuta ori incalcata.** Nu un subiect, nu un imperativ. Testul:
poti arata un fisier despre care sa spui "aici titlul asta e fals"? Daca nu, titlul e o eticheta.

**Sectiuni care poarta o DECIZIE.** Fiecare defineste termenul pe care se invarte regula si da
testul care il separa de vecinul lui, aplicabil fara judecata. Nu "fii atent la secrete", ci
"daca valoarea ar trebui schimbata cand un strain o citeste, e secret".

**Corect si gresit doar ca pereche minima, intr-un bloc de cod.** Doua randuri care difera prin
lucrul despre care e regula, nimic altceva.

**`## Why` ULTIMA.** Patru lucruri: ce se strica; cum arata in momentul in care se strica; de ce nu
o vede masinaria; si NUMELE portii care o prinde, sau propozitia "proza e singura garda".

**Auto-continenta.** Nicio regula nu deleaga alteia. "Tine si X" e interzis; cand doua reguli au
nevoie de aceeasi propozitie, propozitia se scrie in amandoua.

**Fara tabel-checklist**, decat unde suprafata chiar e larga. Un singur control mecanic nu primeste
tabel.

## De ce fiecare alegere

**De ce titlu-afirmatie.** Un titlu care poate fi fals se poate verifica, se poate cita intr-o
revizuire si se poate contrazice cu o masuratoare. Un titlu-subiect nu produce niciodata un
dezacord, deci nu produce nici o corectie.

**De ce definitia si testul, nu sfatul.** O regula fara test se aplica dupa cat de atent e cel
care o citeste in ziua aceea. Un test aplicabil fara judecata produce acelasi raspuns de la doi
oameni si de la doi agenti; asta e tot rostul.

**De ce perechea minima si nu tabelul de exemple.** Un tabel de forme permise si interzise creste
la fiecare caz nou si devine o lista pe care nimeni nu o citeste pana la capat. O pereche care
difera printr-un singur lucru arata EXACT ce e lucrul.

**De ce `Why` la sfarsit.** Cine deschide regula ca sa lucreze are nevoie intai de decizie. Cine o
deschide ca sa o conteste are nevoie de motiv, si atunci citeste pana jos. Motivul pus primul
amana decizia cu un ecran si se sare.

**De ce numele portii in `Why`.** Fara el, o regula se citeste ca o obligatie egala cu toate
celelalte. Cu el, cititorul afla daca greseala lui e prinsa mecanic sau nu, si isi imparte atentia
altfel. Iar propozitia "proza e singura garda" e o masuratoare, nu o scuza: spune negru pe alb ca
in zona aceea nu exista nicio veriga automata.

**De ce auto-continenta si nu pointeri.** Un pointer catre alta regula moare tacut in ziua in care
tinta lui e stearsa sau redenumita, si nimeni nu observa - regula ramane pe disc si aparent
completa. O duplicare nu moare. Aici duplicarea e forma corecta, nu o scapare.

**De ce `paths` pe forma si nu pe instanta.** Un glob pe instanta (`src/app/contact/page.tsx`)
inceteaza sa potriveasca in clipa in care fisierul se muta, si nimeni nu primeste o eroare: regula
pur si simplu nu se mai incarca. Un glob pe forma (`src/**/*.tsx`) supravietuieste mutarilor. De
aceea se si masoara contra `git ls-files`: o cifra care scade brusc arata ca globul a murit.

**Un glob care potriveste zero fisiere nu e automat mort.** Se deosebesc doua cazuri, si testul
e mecanic: exista in proiect o unealta care ACCEPTA forma aceea? Daca da, globul e o forma
suportata fara instante azi si se pastreaza - `src/**/*.mdx` potriveste zero fisiere, dar
`poarta-rute.py` numara paginile `.mdx` si dependinta e instalata, deci prima pagina scrisa asa
intra sub regula fara ca cineva sa-si aminteasca s-o adauge. Daca nu, globul e o ramasita si se
taie. Cifra zero se noteaza in raportul masuratorii in ambele cazuri, ca sa fie o alegere, nu o
scapare.

**De ce excluderile `!` sunt scrise chiar cand directoarele lipsesc din arbore.** `node_modules`,
`.next` si `dist` sunt produse de comenzi, nu de oameni, deci absenta lor la un moment dat nu e o
garantie. Excluderea scrisa costa un rand si nu poate fi uitata la urmatorul build.

## Testul redenumirii, aplicat pe tot ce e proza

Pe fiecare substantiv concret dintr-un fisier de reguli, din `CLAUDE.md` sau din `CONTEXT.md`:
**redenumeste-l si reciteste propozitia.** Daca propozitia devine falsa, propozitia cacheaza starea
arborelui si se rescrie ca granita sau se taie.

Supravietuiesc testului trei feluri de nume, si se scriu linistit: comanda-contract (`pnpm
verifica`), numele unei porti, si suprafata publicata (o adresa servita, o ruta). Nu supravietuiesc:
listele de fisiere, numararile ("cinci porti", "sapte pasi"), si starile care se schimba dintr-un
buton.

## Consecinte

- Fiecare regula devine mai lunga la prima citire si mai scurta la a suta: se citeste titlul, se
  aplica testul, restul se sare.
- `paths` e o declaratie, nu un mecanism al depozitului: nimic din `pnpm verifica` nu o citeste. E
  citita de unealta cu care lucreaza agentul. Cifrele masurate contra `git ls-files` sunt singura
  dovada ca globurile chiar potrivesc ceva.
- Nimic nu verifica mecanic ca o regula respecta formatul asta. Aici proza e singura garda, si e
  scris ca atare.
