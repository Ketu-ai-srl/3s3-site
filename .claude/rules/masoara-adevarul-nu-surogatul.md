---
paths:
  - ".claude/scripts/porti/**/*.py"
  - ".claude/scripts/porti/**/*.mjs"
  - "tests/**/*.ts"
  - "package.json"
  - "!node_modules/**"
  - "!.next/**"
  - "!dist/**"
---
# Fiecare poarta raspunde chiar la intrebarea pe care o pronunta

## Ce e un surogat

Testul, aplicabil fara judecata: scrie intr-un rand **intrebarea pe care poarta o pronunta** (numele
ei, mesajul ei de eroare). Scrie sub el **intrebarea pe care o pune codul**, in cuvintele codului
(ce multime aduna, ce compara, cu ce). Daca cele doua randuri difera printr-un cuvant care schimba
multimea masurata, ai un surogat.

Vecinul de care se desparte greu e limita declarata. O poarta care spune "nu verific X" si chiar nu
verifica X nu e surogat: e o intrebare mai ingusta, scrisa. Surogatul e intrebarea mai ingusta
NESCRISA, fiindca atunci zeroul ei se citeste ca acoperire.

De aceea antetul fiecarei porti poarta o sectiune "Ce NU verifica". Un verdict verde inseamna exact
"nimic din ce stiu sa caut nu a iesit", si asta trebuie sa poata fi citit fara sa deschizi codul.

## Zeroul are nevoie de acoperire

O poarta fara control pozitiv e decorativa. La fiecare rulare:

- **martor pozitiv**: un defect fabricat la rulare, care TREBUIE prins, cu mesaj care il numeste;
- **martor negativ**: forma corecta, care NU trebuie prinsa - cantareste cat cel pozitiv, fiindca o
  poarta zgomotoasa e dezarmata in cateva saptamani;
- **martor frate**: cand unealta poate raspunde la o intrebare mai larga decat cea ceruta, un caz
  care cade in aceeasi capcana si NU trebuie numarat.

Fixturile se asambleaza la rulare, din bucati, si nu stau literal pe disc: o poarta care scaneaza
depozitul se gaseste pe propria proba, si atunci cineva cere o scutire - iar scutirea e chiar
gaura. Aceeasi capcana loveste si proza: un comentariu care citeaza pe litere delimitatorul pe care
il descrie devine o instanta a lui.

## Controlul se alege plauzibil si specific

O valoare canonica de proba - un cuvant ca "test", un domeniu de exemplu, o cheie din documentatia
unui furnizor - e adesea chiar valoarea pe care unealta o ignora prin proiectare. Un control pozitiv
care pica are DOUA lecturi, si a doua se verifica intai: "nu cumva am ales exact ce unealta ignora
deliberat?" Se raspunde cu un al doilea control, din alta familie, nu cu o reparatie.

Cand se poate, un caz per poarta are valoarea asteptata din AFARA codului testat: o constanta
publicata, o cifra dintr-un incident notat. Asa unealta si asteptarea nu pot drifta impreuna. Cea
mai ieftina de folosit aici e un punct de cod Unicode: detectorul de liniute isi masoara fratii pe
U+2500, valoare publicata, si numarul din incident e 39 de liniute raportate pe un fisier cu zero.

## Codurile de iesire

`0` curat - `1` probleme - `2` folosire gresita - `3` NEMASURAT. **Trei nu e curat.** Un control
picat, o preconditie lipsa, o multime goala, un build mai vechi decat sursa: toate dau trei. O
poarta care iese zero fiindca nu a citit nimic e mai rea decat lipsa ei.

## Conducte

O conducta care se termina intr-un consumator cu iesire devreme minte peste tamponul tevii sub
`pipefail`: potrivirea REUSITA se citeste ca esec. Nu se foloseste in porti, in probe, sau in
scripturi de decizie. Conteaza iesirea devreme a consumatorului, nu teava in sine.

## Corect si gresit

```
gresit:  producator | consumator-cu-iesire-devreme  # verdictul depinde de marimea iesirii
corect:  iesire="$(producator)"; se cauta in variabila

gresit:  if not lista: return 0    # nimic de verificat, deci curat
corect:  if not lista: return 3    # nimic de verificat, deci NEMASURAT
```

## Why

Ce se strica: un verdict verde care nu masoara nimic. E cel mai scump defect din lantul asta,
fiindca opreste cautarea: nimeni nu se mai uita acolo.

Cum arata in momentul in care se strica: arata a poarta rapida. Iese zero, iese instant, si iese
asa luni intregi. Un caz masurat aici: extragerea de text a esuat pe primul sir scurt dintr-un
fisier, s-a resincronizat pe ghilimeaua de inchidere si a citit de atunci codul dintre siruri in
loc de continutul lor - douazeci si trei de bucati culese, toate cod, niciun titlu, verdict zero.

De ce nu-l vede masinaria: pentru lantul de deasupra, zero e zero. Nimic nu distinge "am cautat si
n-am gasit" de "n-am cautat", decat un martor care stie ce trebuia gasit.

Poarta care il prinde: fiecare poarta se apara singura, prin `controale()` (Python) sau prin
verificarea ca martorii au rulat (`browser-rulator.mjs`, care refuza sa spuna "trece" cand niciun
martor nu a rulat). Ce nu e aparat mecanic: faptul ca sectiunea "Ce NU verifica" din antet e
completa si actuala. Acolo **proza e singura garda**.
