# ADR-0002: Un singur canal de stare

**Data:** 2026-09-05 · **Stare:** acceptata

## Context

Pe `platforma-prp`, doua masini de stare - etichete GitHub si coloana `Status` din board - au
divergat tacit. Pe 24.08.2026 toate etichetele de stare au fost sterse din ambele repo-uri, dupa
ce contorul raporta "totul e triat" in timp ce eticheta corespunzatoare avea zero purtatori.

## Decizie

- **Coloana `Status` din boardul "Fabrica 3S" este singura masina de stare.**
- Etichetele raspund la alte intrebari: zona atinsa, limba, blocaj de lansare, agent responsabil.
  Nicio eticheta nu descrie starea unei sarcini.
- `CODEOWNERS` si aprobarea obligatorie **nu se armeaza acum**, cu motiv masurat: exista un singur
  om cu drept de scriere, deci o aprobare obligatorie ar bloca orice merge. Se rearmeaza cand intra
  al doilea om. Exceptarea e motivata, deci nu se re-examineaza la fiecare val.
