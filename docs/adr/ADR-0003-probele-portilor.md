# ADR-0003: Probele portilor ruleaza inaintea portilor

**Data:** 2026-09-06 · **Stare:** acceptata

## Context

Trei lucruri masurate in aceeasi zi, pe arborele nostru:

1. **Probele cu mutant nu erau cablate nicaieri.** `proba-juridic.py`, `proba-seo.py` si
   `proba-regresie.py` existau, treceau, si nu le rula nimic: nici `verifica`, nici CI-ul.
   Nivelul cel mai adanc de verificare din proiect nu se atingea niciodata singur.
2. **Martorii portilor traiesc INAUNTRUL portilor.** Fiecare `poarta-*.py` are `controale()`,
   si acolo se cheama functia interna - `probleme()`, `analizeaza()`, `compara()`. Proba si
   lucrul probat sunt acelasi proces. Ce ramane nemasurat e stratul care se strica in practica:
   argumentele, citirea de pe disc si codul de iesire. O poarta care gaseste defectul, il
   tipareste corect si iese 0 trece prin toti martorii ei.
3. **Nimic nu masura inventarul.** O poarta scrisa si necablata nu apara nimic si nu se vede;
   `tests/browser/README.md` spunea „cinci porti" cand pe disc erau sase spec-uri. Fiecare
   poarta masoara CONTINUTUL site-ului; nici una nu punea o intrebare despre INVENTAR.

## Decizie

**1. `porti:probe` intra in `verifica`, imediat inaintea lui `porti:sursa`.**

Criteriul asezarii e unul singur, si NU e costul: contractul e o PRECONDITIE a portii, deci trebuie
sa fie adevarat inainte ca portile sa ruleze, iar `porti:probe` e singurul pas dintre cei de
dinaintea browserului care nu consuma un build - fiecare proba isi fabrica arborele in `temp` si
cheama poarta ca proces. De aceea incape acolo unde preconditia cere sa fie. Daca vreo proba
viitoare ajunge sa aiba nevoie de build, ea se muta dupa `build`, nu se muta pasul.

Cat costa, pe 6 sep 2026, pe aceeasi statie si cu alte felii lucrand in paralel: **18,3-52,6 s pe
sapte esantioane masurate aici** - patru cronometrate direct (32,5 / 35,5 / 46,3 / 52,6 s) si trei
citite din verdictele feliei (18,3 s in `769ed14`, 31,6 s in `b6584cc`, 35,4 s in `42e4f8d`).
Trecerea de control a raportat un maxim de 59,5 s; cifra aceea e relatata, nu masurata de mine, si
conteaza fiindca ajunge la 0,5 s de plafonul care era scris aici. Se scrie ca interval, nu ca o
cifra: o singura valoare sugereaza o stabilitate pe care masuratoarea nu o arata, iar imprastierea
de aproape 3x vine din ce mai ruleaza pe masina, nu din pas.

Pasul NU e cel mai ieftin dintre vecinii lui. `porti:probe` contra `build`, in cele trei verdicte
de mai sus: 31,6 contra 21,2 s · 18,3 contra 17,6 s · 35,4 contra 21,9 s. Ordinea celor doi nu s-a
schimbat in niciunul, dar distanta dintre ei da, de la 13,5 s la 0,7 s - inca un motiv sa nu se
sprijine nicio decizie pe un singur esantion. Regula „ieftinul inaintea scumpului" ordoneaza restul
lantului; locul acestui pas il tine preconditia, si numai ea.

Plafonul de 60 s nu se mai scrie in proza. Un prag enuntat intr-un document nu opreste nimic, iar
maximul masurat a ajuns la 0,5 s de el fara ca ceva sa se strice - un prag asezat pe punctul de
esec e necrolog, nu avertisment. Nu se pune nici ca poarta: pe o statie incarcata ar suna din
imprastiere, nu din regresie, si o poarta zgomotoasa se dezarmeaza in cateva saptamani. Singurul
plafon care exista azi e `timeout-minutes: 10` din `.github/workflows/ci.yml:29`, si e pe tot
jobul, nu pe pasul asta. Nu am declansat nicio rulare CI: cifra e citita din fisier, nu masurata.

Un pas ieftin asezat dupa unul scump nu economiseste nimic - regula e scrisa in antetul lui
`browser-toate.mjs` si de acolo o citeste verificarea de ordine, ca sa nu existe doua exemplare
ale ei care pot diverge.

**2. Partea B a contractului: fiecare poarta se probeaza si ca PROCES.**

`proba-porti-proces.py` ruleaza fiecare `poarta-*.py` ca subproces pe un arbore fabricat si
pineaza codul de iesire plus textul care numeste defectul: un caz care trebuie sa iasa 1, unul
care trebuie sa iasa 0, si - unde poarta are preconditie - unul care trebuie sa iasa 3. Partea A
(ce intoarce logica pura) ramane in `controale()`, unde e.

Cusatura pentru arborii fabricati nu cere modificarea portilor: cele cu `--radacina` se cheama cu
el, cele care isi deduc radacina din propria cale se copiaza in `<temp>/.claude/scripts/porti/`
si se ruleaza copia. Ce accepta fiecare se citeste din sursa portii la fiecare rulare, nu dintr-o
lista scrisa de mana - o lista de nume imbatraneste in ziua in care cineva adauga un argument.

**3. Completitudinea se verifica mecanic, nu prin disciplina.**

`proba-completitudine.py` compara ce e pe disc cu ce e in lant: porti contra `porti:sursa` si
`porti:build`, probe contra `porti:probe`, spec-uri de browser contra martorilor pe care
rulatorul ii cere, si ordinea pasilor din `verifica`. E acelasi control care exista deja pentru
probele fabricii (lista scrisa comparata cu `ls`), replicat pe cele patru inventare ale noastre.

Verificarea merge in ambele sensuri: un fisier de pe disc necablat pica, dar si un pas care
cheama un fisier care nu mai exista.

**4. Asteptarile se ancoreaza in afara codului probat.**

Codurile de iesire folosite de `proba-porti-proces.py` se citesc din `browser-rulator.mjs` - alt
fisier, alta limba, si singurul loc unde contractul casei e publicat ca text. Marcajele martorilor
din titlurile spec-urilor se citesc din acelasi rulator, care e codul care le CERE. Cifra
martorului negativ al portii de tipografie (cate U+2500 avea fisierul din incidentul cu numararea
pe octeti) se citeste din antetul detectorului. Cand ancora dispare, proba iese 3, nu 0.

**5. `poarta-evidenta.py` capata `--radacina` si `--doar-raport`.**

E singura poarta care SCRIE in arbore. Fara `--radacina`, o rulare pe un arbore fabricat scria in
depozitul real si ii murdarea `fisiere_murdare` din verdict. `--doar-raport` spune ce ar regenera
si iese 1 daca difera, fara sa atinga nimic. In `verifica` ramane comportamentul de azi -
regenerarea - fiindca lista trebuie sa ajunga in acelasi commit cu registrul.

**6. Portile intra in igiena pe care o impun.**

`poarta-tipografie.py` sarea `.claude`, deci nicio poarta nu trecea prin detectorul de liniute
lungi. Scutirea nu avea motiv scris, si o scutire nemotivata se re-examineaza: masurat, zero
liniute lungi in cele 22 de fisiere ale directorului, deci includerea nu costa nimic azi si prinde
ce ar veni maine. Restul lui `.claude` ramane afara - `.claude/scripts/porti` e numit pe cale
intreaga, nu prin numele directorului parinte.

Includerea are doua jumatati - calea in `CAI` si `.py`/`.sh` in `EXTENSII` - si amandoua sunt
probate de acelasi caz din `proba-porti-proces.py`: martorul e un `poarta-martor.py` cu liniuta
lunga, cu un frate curat sub `docs` care tine arborele nevid. Dezarmata oricare dintre ele, cazul
se inroseste cu „cod 0, asteptam 1". Martorul a fost initial un `.md`, adica proba jumatatii
ieftine: `.md` ar fi fost prins si fara schimbarea de extensii, deci extensiile erau o schimbare
cu cost declarat si beneficiu nemasurat.

## Consecinte

- `verifica` are un pas in plus, de 18,3-52,6 s pe esantioanele masurate la 6 sep 2026 (un al
  optulea, relatat de trecerea de control, a dat 59,5 s). Rosul vine mai devreme, nu mai ieftin:
  in fiecare verdict masurat pana acum `porti:probe` a iesit mai scump decat `build`, iar castigul
  e ordinea cauzala - o poarta stricata se vede inainte sa se plateasca build-ul. Propozitia nu
  numara verdictele intentionat: fiecare rulare a portii mai produce unul, si un numar scris aici
  ar deveni fals fara ca ceva sa se fi stricat.
- Acoperirea per poarta se numara, nu se presupune. `caz()` inregistreaza perechea (poarta, cod
  cerut), iar la finalul rularii un control cere fiecarei porti macar un caz de 1, unul de 0 si -
  daca nu e in tabelul de scutiri - unul de 3; altfel iesirea e 3, NEMASURAT. Fara el, un corp de
  functie golit tiparea antetul portii si lasa verdictul verde: `controale()` verifica doar ca
  poarta ARE o intrare in `CAZURI`, nu ca intrarea ruleaza ceva.
- Doua porti nu au caz de cod 3 in `proba-porti-proces.py`, si motivul e scris in fisier si
  tiparit la fiecare rulare: `poarta-scurgeri.py` si `poarta-tipografie.py` isi scaneaza propriul
  fisier, deci ramura „zero fisiere" e inaccesibila prin constructie. Un zero de acolo nu e
  acoperire, si asta se spune, nu se lasa dedus.
- `tests/browser/README.md` nu mai contine numarul spec-urilor. O cifra scrisa de mana intr-un
  document imbatraneste in tacere; lista adevarata e `ls`, si e verificata mecanic.
