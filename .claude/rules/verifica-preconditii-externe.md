---
paths:
  - ".github/workflows/*.yml"
  - ".claude/scripts/**/*.sh"
  - ".claude/scripts/**/*.mjs"
  - "docs/adr/*.md"
  - "Dockerfile"
  - "!node_modules/**"
  - "!.next/**"
  - "!dist/**"
---
# Starea unui serviciu extern se citeste in momentul actiunii, nu din amintire

## Ce e o preconditie externa

Testul, aplicabil fara judecata: **poate deveni falsa fara ca vreun fisier din depozit sa se
schimbe?** Daca da, e externa si se reinteroga. Daca nu poate deveni falsa decat printr-un commit,
e un invariant intern si o citire veche e la fel de buna ca una noua.

Sub test cad: starea unui deploy, continutul servit de un mediu, o inregistrare DNS, starea unei
rulari de integrare, existenta si drepturile unei chei, soldul unui contingent de minute, ce a
scris altcineva intr-o discutie. Nu cad: continutul unui fisier comis, forma unei configurari din
arbore, rezultatul unei porti rulate pe acelasi commit.

## Cat tine o citire

O citire e valabila pentru actiunea care o urmeaza imediat. **Orice pas intre citire si actiune o
invalideaza**, fiindca lumea are si alti actori decat noi. Testul: intre momentul citirii si
momentul apasarii a putut interveni altcineva? Daca nu poti dovedi ca nu, reciteste.

Cazul care a costat: o cerere trimisa unui client la 91 de secunde dupa ce clientul isi rezolvase
singur problema si primise confirmare. Investigatia era corecta si veche de o jumatate de ora.

## Ce conteaza ca dovada, pe fel

- **Continut livrat**: ca marcajul servit de mediu se potriveste cu cel din commit. "Serviciul
  raspunde 200" nu e dovada, si nici "build success". Un endpoint de sanatate raspunde 200 cu
  dependintele cazute.
- **DNS**: raspunsul autoritatii. Rezolvatorul local raspunde din cache si va confirma ore intregi
  o inregistrare deja stearsa.
- **Starea unei rulari sau a unei cereri de imbinare**: citita pe SHA, nu pe numele ramurii. Numele
  arata spre altceva a doua zi.
- **Un contor de limita**: nu e martor pentru limita insasi. O cerere reala si ieftina e. Un contor
  poate raporta rezerva plina in timp ce o limita secundara refuza tot.
- **Un serviciu cazut**: un raspuns de eroare de la un intermediar nu inseamna masina cazuta. Daca
  masina ar fi cazut, ai fi primit refuz de conexiune, nu un raspuns.

## Corect si gresit

```
gresit:  citeste starea; alte zece minute de lucru; apasa pe baza acelei citiri
corect:  alte zece minute de lucru; reciteste starea; apasa

gresit:  starea deploy-ului = "containerul e healthy"
corect:  starea deploy-ului = marcajul servit == marcajul din commit
```

## Why

Ce se strica: o actiune care iese in afara - un deploy, un mesaj catre client, o promovare pe ramura
principala - se sprijina pe o stare care nu mai exista.

Cum arata in momentul in care se strica: arata a succes. Poarta e verde, containerul e sus, si
verdictul descrie o lume de acum treizeci de minute. Se descopera abia cand cineva se uita la ce e
servit efectiv.

De ce nu-l vede masinaria: nimic din arbore nu s-a schimbat. Diferenta e in afara depozitului, iar
codul care ar trebui s-o vada e chiar codul care nu intreaba a doua oara.

Poarta care il prinde: pentru continutul livrat, **`verifica-staging.sh`** compara marcajul servit
cu cel din commit. Pentru ramura principala, verificarile de retea ale scriptului de promovare, care sta in
depozitul masinariei. Pentru
DNS, pentru contingente si pentru starea unei discutii cu un om, **proza e singura garda**.
