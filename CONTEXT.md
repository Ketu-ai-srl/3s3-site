# Glosar 3S

Termenii care apar in cod, in sarcini si in discutie. Fiecare rand spune ce e termenul si unde
traieste detaliul lui. Randul e definitia; nu tine inventarul fisierelor si nu poarta cifre care
imbatranesc - alea traiesc in fisierul catre care trimite.

| Termen | Ce inseamna | Unde e detaliul |
|---|---|---|
| **3S** | Marca "Scan Store Solve": arhivare fizica autorizata, digitalizare si cautare AI in documente. Firma din spate e in curs de infiintare. | `docs/adr/ADR-0001-stiva-si-medii.md` |
| **ADRIA** | ADRIA SERVICII ARHIVARE SRL, Pitesti - firma-mama, operator de arhivare. Orice afirmatie de vechime sau autorizare vine de la ea si se scrie ATRIBUIT. | `.claude/rules/afirmatii-atribuite.md` |
| **SerenityFlow** | Platforma care exista deja si face munca. Site-ul nu o contine: doar vinde si trimite spre ea. | - |
| **staging** | `3s2.ke2.in` - mediul de proba: inchis cu autentificare de baza si marcat `noindex`. Pe el, portile de prezenta avertizeaza in loc sa opreasca. | `src/middleware.ts` |
| **productie** | Mediul pe care portile de prezenta OPRESC in loc sa avertizeze. Se creeaza cand owner-ul comunica domeniul real. | `docs/adr/ADR-0001-stiva-si-medii.md` |
| **marcaj de livrare** | Valoarea servita la `/stamp`, produsa din marcajul comis in arbore. Dovedeste ca deploy-ul a schimbat CONTINUTUL livrat, nu doar ca serviciul raspunde. | `src/app/stamp/route.ts` |
| **poarta** | O comanda care opreste munca printr-un cod de iesire: `0` curat, `1` probleme, `2` folosire gresita, `3` NEMASURAT. Trei nu e curat. Nu e o intentie, e un cod. | `package.json`, scriptul `verifica` |
| **reziduu** | Ce o poarta NU verifica, scris in antetul ei. Exista ca zeroul portii sa nu fie citit drept acoperire: verde inseamna "nimic din ce stie sa caute nu a iesit". | antetul fiecarei porti din `.claude/scripts/porti/` |
| **martor** | Fixtura fabricata la rulare care TREBUIE prinsa (pozitiv) sau care NU trebuie prinsa (negativ). O poarta care nu si-a rulat martorii nu are voie sa spuna "curat". | `.claude/rules/masoara-adevarul-nu-surogatul.md` |
| **val** (lot) | Un grup de felii duse impreuna: agenti in worktree separat, poarta locala, un singur push, o singura rulare de integrare, promovare prin API. Masinaria sta in depozitul privat al fabricii; aici raman doar portile site-ului. | `.claude/scripts/porti/` (portile), depozitul fabricii (masinaria) |
| **discutia de 30 de minute** | Actiunea principala a site-ului. Nu vindem proba gratuita, vindem o discutie. | - |
