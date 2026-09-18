# Direcția vizuală 3s4: REF-S

Suprafețe albe, text marin, accent violet, grilă fină și compoziție editorială. Antetul are o ilustrație abstractă originală, cu o mișcare discretă care se încheie în cinci secunde. Fotografiile ilustrative stau în carduri, cu descrieri explicite. Acțiunile au colțuri de 6 px, cardurile de 12 px. Inter este singura familie; corpul este de 17 px, titlurile au greutatea 400, iar înălțimea de rând este minimum 1,2 pentru diacritice.

Numele semantice moștenite sunt păstrate pentru compatibilitatea paginilor interioare.

| Rol | Valoare | Utilizare |
|---|---|---|
| `cerneala` | #102b3f | text principal |
| `cerneala-3` | #526475 | text secundar pe alb sau ceață |
| `albastru` | #533afd | violetul acțiunii principale |
| `albastru-2` | #4930dd | legături pe fond deschis |
| `albastru-clar` | #bcb4ff | legături pe fond închis |
| `alb` | #ffffff | suprafață principală |
| `ceata` | #f6f9fc | suprafață secundară |
| `negru` | #102b3f | suprafața închisă Solve |
| `accent-nou` | #4930dd | etichete și repere |

Contrastul este calculat din valorile reale în testele direcției. Fiecare pereche folosită pentru text obișnuit trebuie să treacă 4,5:1. Testele browser verifică suplimentar contrastul paginilor randate. Accentul deschis se folosește numai pe suprafețe închise.

Containerul are maximum 1248 px. La 900 px, grilele principale devin o coloană, iar domeniile două coloane. La 600 px, spațiul lateral devine 20 px și acțiunile antetului se așază vertical. `prefers-reduced-motion` dezactivează animațiile și tranzițiile. Focusul tastaturii rămâne vizibil.

Motivarea migrării testelor: [ADR-0006](../adr/ADR-0006-directie-ref-s.md). Demonstrația Solve folosește numai exemple ilustrative locale, marcate vizibil.
