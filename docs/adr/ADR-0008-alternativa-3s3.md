# ADR-0008: alternativa 3s3

Data: 2026-09-19. Utilizatorul a cerut remedierea integrala a prezentarii si publicarea alternativei pe 3s3.ke2.in.

## Decizia

Un depozit separat pastreaza cele 22 de rute, dar inlocuieste prezentarea, continutul si interactiunile. Actiunea principala este pregatirea unui e-mail contextual catre adresa publica ADRIA. Nu se promit rezervari sau trimitere automata.

Serviciile fizice sunt atribuite ADRIA; 3S ramane proiectul de prezentare. Demonstratia foloseste trei documente fictive descarcabile si un rezultat absent. O intrebare nesuportata nu este asociata unei surse doar dupa un cuvant izolat.

Ghidul aplica art. 25 din Legea contabilitatii, modificat prin Legea 36/2023: 5 ani de la 1 iulie a anului urmator incheierii exercitiului financiar, inclusiv pentru statele de salarii. Nu autorizeaza eliminarea. Nu afirma un termen universal pentru alte categorii.

Doua imagini originale ilustrative inlocuiesc fotografiile vechi. Provenienta si instructiunile de generare sunt in src/content/assets.json. Fotografiile nu sunt prezentate ca dovezi ale sediului sau ale personalului real.

## Retragerea continutului vechi

Registrele anterioare sunt pastrate cu starea retras si motiv explicit. Locurile lor istorice sunt in Git; campul unde trimite aici deoarece vechile componente nu mai exista. Afirmatiile active sunt inventariate separat, in registrul alternativei.

## Migrarea probelor

Cele sase fisiere unitare dependente de componentele vechi au fost inlocuite cu verificari pentru calcul, selectarea sursei, contact, paginile reale, continut si active. Proba de marcaj si cele cinci porti generice de browser raman. Meniul si interactiunile sunt verificate cu tastatura si in browser pe produsul nou.

Pragurile de regresie sunt recalculate si coborarea se declara in acelasi commit. Nicio proba nu este sarita. Detectorii, controalele pozitive/negative, criteriile juridice si SEO raman active.

## Ajustari permise ale portilor

GAZDE_PROPRII primeste 3s3.ke2.in fiindca este domeniul acestei alternative. Pragurile probelor reflecta migrarea explicata mai sus. Nu se schimba clasele de defect ale portilor.

| Conditie pentru trecerea de la rosu la verde | Stare |
|---|---|
| Mecanismul citat confineaza cazul: migrare declarata de probe si adaugare de gazda proprie | DONE |
| Nu sunt modificati detectorii sau martorii din afara zonei editabile | DONE |
| Problemele de produs sunt reparate in cod, nu ascunse prin exceptii | DONE |

## Limite

Testele si verificarea manuala nu certifica legal o societate noua sau o platforma digitala. Mediul ramane o prezentare neindexabila. Conditiile reale ale serviciilor se stabilesc contractual.
