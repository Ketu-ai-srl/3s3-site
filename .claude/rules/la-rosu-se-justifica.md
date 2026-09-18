---
paths:
  - ".claude/scripts/porti/**/*.py"
  - ".claude/scripts/porti/**/*.mjs"
  - ".claude/scripts/porti/**/*.sh"
  - ".claude/scripts/porti/probe/*.json"
  - "tests/**/*.ts"
  - "package.json"
  - "!node_modules/**"
  - "!.next/**"
  - "!dist/**"
---
# O poarta rosie se satisface ingust si numit, nu se slabeste larg

## Testul latimii

Cele doua editari arata la fel in diff: cateva randuri, intr-un fisier de poarta. Se deosebesc prin
ce lasa sa treaca de acum inainte.

Testul, aplicabil fara judecata: dupa editarea ta, **ce ALT defect, pe care nu l-ai scris tu, ar mai
trece?**

- Raspuns "niciunul, doar cazul pe care l-am numit": editarea e **ingusta**. Legitima.
- Orice alt raspuns: editarea e **slabire**, indiferent cate randuri are. Se opreste.

Corolarul mecanic: o editare ingusta numeste o INSTANTA (fisierul asta, valoarea asta, ruta asta) si
cara cu ea motivul. O slabire schimba o FORMA (un tipar, un prag, o lista de sarite, un martor) si
se aplica automat oricarei instante viitoare care nimereste forma.

## Ce inseamna "numit"

O exceptare legitima are trei lucruri, toate in acelasi commit:

1. **instanta**, scrisa explicit, nu o clasa care o contine;
2. **citarea** care o justifica - actul, sectiunea din documentul de porti, numarul incidentului,
   sau masuratoarea;
3. **conditia in care dispare**, cand exista una.

O exceptare NEGLIJENTA se re-examineaza la fiecare val. Una MOTIVATA nu se re-examineaza niciodata:
de asta traieste. Motivul e singurul lucru care le desparte.

## Un prag se muta numai spre partea grea

Un prag coborat ca sa treaca lotul de azi e o slabire, chiar cand cifra pare mica. Se coboara doar
cand munca pe care o apara chiar a disparut, si atunci coborarea se scrie in fisierul de referinta,
in acelasi commit cu stergerea, cu motivul. Poarta o marcheaza atunci "coborare declarata" si o
lasa sa treaca. Asta e forma vizibila; nu exista alta.

Si inaintea oricarui prag: un prag asezat pe punctul de esec e necrolog, nu avertisment. Intrebarea
nu e "de la ce valoare e o problema", ci **"cat timp mai am dupa ce suna"**.

## Cand poarta acuza forma corecta

Exista un caz in care editarea portii e reparatia potrivita: poarta se inroseste pe munca facuta
BINE. Atunci se repara poarta, nu textul. Se deosebeste de o slabire prin faptul ca dupa reparatie
poarta prinde in continuare defectul original - se dovedeste rulind martorul pozitiv, nu declarand.

Simetric: o proba care se inroseste cand implementezi reparatia poate fi refutarea premisei, nu o
fixtura de satisfacut. Si un mutant care supravietuieste inseamna intai ca mutantul nu a mutat tot,
si abia apoi ca proba e slaba.

## Zona editabila, pe poarta

Fiecare rand spune ce se editeaza cand poarta aceea e rosie, si ce nu se atinge in niciun caz.
Suprafata e larga - o poarta cu zona ei, pentru fiecare poarta - de aia e tabel.

| Poarta | La rosu se editeaza | Nu se atinge |
|---|---|---|
| `poarta-scurgeri.py` | fisierul raportat, din care se scoate scurgerea; `AMPRENTE` doar prin ADAUGARE, cu amprenta produsa de `--amprenta` | stergerea unei amprente, `SARITE`, `EXTENSII`, `TIPARE`, filtrul `telefon_plauzibil`, `controale()` |
| `poarta-rute.py` | intrarea din `src/content/rute.ts`, sau fisierul de pagina care lipseste | `TIPAR_CALE`, sarirea grupurilor si a segmentelor dinamice din `rute_din_fisiere`, `compara`, `controale()` |
| `poarta-afirmatii.py` | textul acuzat, rescris atribuit; intrarea din registrul de afirmatii | `TIPARE`, `NEGARI`, `FEREASTRA`, regula care decide `este_site`, `controale()` |
| `poarta-limba.py` | textul acuzat. Un cuvant se scoate din `CUVINTE` DOAR cand poarta acuza o forma corecta, si scoaterea se scrie in nota deja existenta din fisier, cu motivul | `LUNGIME_MINIMA_SIR`, `pare_cod`, `siruri_din_cod`, `CAI`, `EXTENSII`, `SARITE`, `controale()` |
| `poarta-evidenta.py` | fisierele din `src/content/afirmatii/`; listele regenerate din `docs/afirmatii/`, comise in acelasi commit | `OBLIGATORII`, `STARI`, `probleme`, `genereaza_lista`, `controale()` |
| `poarta-tipografie.py` | fisierul raportat, in care liniuta lunga devine cratima | multimea de cai din care aduna `fisiere()`, `EXTENSII`, `SARITE` - largirea lor e permisa, ingustarea nu |
| `tipografie-liniute.py` | fisierul raportat | `TINTE`, `FRATI`, `controale()` |
| `poarta-seo.py` | metadata paginii acuzate. `PRAGURI` se schimba numai odata cu documentul de porti si citand sectiunea; `PAGINI_SARITE` numai cu motiv scris; `TIPURI_CUNOSCUTE` numai cu un tip real din vocabularul declarat | `Culegator`, `analizeaza_pagina`, `analizeaza_lot`, refuzul buildului invechit, `controale()` |
| `poarta-juridic.py` | `config/entitate.<jurisdictie>.json`, paginile juridice, textul formularului. O gazda in `GAZDE_PROPRII` se adauga numai cu motiv scris | `RUTE_JURIDICE`, `CAMPURI_IDENTITATE`, `TIPAR_SUBSTITUENT`, temeiurile citate, gradarea pe mediu, `NUME_TERTI` prin stergere, `controale()` |
| `poarta-regresie.py` | probele insesi, scrise la loc. Fisierul de praguri se coboara in acelasi commit cu stergerea, cu motivul in campul care ii e destinat | `TIPAR_TEST`, `TIPAR_TEST_SARIT`, `TIPAR_ASERTIUNE`, `fara_comentarii`, `verdict`, ridicarea lui `sarite_maxim` peste zero, `controale()` |
| `browser-*.mjs` prin `browser-rulator.mjs` | proba din `tests/browser/` si codul paginii pe care il acuza | cerinta ca ambii martori sa fi rulat, tratarea cazului "nicio proba nu a rulat", si `SARI_BUILD` folosit ca sa treaca o poarta |

Tabelul numeste INSTANTE - fisiere, constante, functii - si asta e deliberat: o zona editabila
descrisa in general ("configurarea", "datele") se lasa citita cum are nevoie cine o citeste, si
atunci regula nu mai desparte nimic. Coloana a treia numeste constante si functii din corpul portii - adica exact
contractul ei - iar acolo unde numele nu e stabil intre versiunile portii, numeste locul care e.
Cand poarta se rescrie, se rescrie si randul, in acelasi commit.

## Tabelul de la rosu la verde

Cerut DOAR pentru o editare care duce o poarta din rosu in verde, si cerut atunci intotdeauna. Un
tabel tiparit la fiecare schimbare se invata a fi ignorat in doua saptamani; unul care apare numai
la editarile astea se citeste.

Trei randuri, fiecare DONE sau MISSING, inainte de a incheia editarea:

| | |
|---|---|
| mecanismul citat chiar confineaza cazul de fata | DONE / MISSING |
| nimic din afara zonei editabile nu a fost atins | DONE / MISSING |
| ce nu a putut fi justificat a ramas rosu | DONE / MISSING |

Un MISSING nu e o rusine: e raspunsul corect cand justificarea nu s-a putut construi. Ce nu se face
e sa treaca linia in verde ca sa iasa tabelul plin.

## Corect si gresit

```
gresit:  se adauga in lista de sarite forma care a produs constatarea
corect:  se repara instanta; daca chiar e legitima, se numeste ea, cu citare

gresit:  se coboara pragul pana trece lotul
corect:  se scrie proba lipsa; sau se coboara pragul in acelasi commit cu stergerea, cu motiv
```

## Why

Ce se strica: poarta ramane pe disc, ruleaza, iese verde, si nu mai apara clasa pentru care a fost
scrisa. Din acel moment lantul raporteaza acoperire pe care nu o are.

Cum arata in momentul in care se strica: arata a reparatie. Diff-ul e mic, mesajul de commit spune
"repar poarta", si lotul avanseaza. Cine il citeste peste o luna nu are cum sa deosebeasca un
tipar ingustat legitim de unul ingustat ca sa treaca ziua, fiindca amandoua sunt un rand schimbat.

De ce nu-l vede masinaria: poarta se pazeste pe sine cu martorii ei, iar cine editeaza poarta
editeaza si martorii in aceeasi mana. Integrarea ruleaza la fiecare impingere, deci o poarta
slabita obtine verde si acolo. Nu exista nicio veriga in lant care sa vada intentia.

Poarta care il prinde: **niciuna. Proza e singura garda**, plus separarea rolurilor - cine
implementeaza nu e cine revizuieste. Singurul lucru mecanic din zona asta e `poarta-regresie.py`,
care face vizibila coborarea unei podele, si ea acopera doar numarul de probe, nu si corpul
celorlalte porti.
