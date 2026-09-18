# ADR-0004: Identificatorii se verifica pe arborele plin, la fiecare poarta locala

**Data:** 2026-09-06 · **Stare:** acceptata

## Context

Fabrica lucreaza cu felii paralele. Conditia care face paralelismul sa functioneze e ca feliile
sa atinga multimi DISJUNCTE de fisiere. Inainte de pliere, `plieaza.sh` PREZICE suprapunerea de
fisiere sursa si o tipareste - nu refuza nimic pe ea, si o spune el insusi in doua locuri: in
comentariul din dreptul verificarii ("Un fisier atins de doua felii NU e neaparat un conflict -
poate fi acelasi fisier, randuri diferite") si in randul de rezumat ("predictie, nu verdict").
Refuzul vine de la merge-ul propriu-zis, la primul conflict real. Sursa e `scripturi/plieaza.sh`
din depozitul fabricii - alt depozit decat asta, de aceea e numit fara citare de linie: o citare
`fisier:NN` catre el ar trimite poarta de legaturi sa caute in arborele site-ului si ar pica pe
drept. Cine citeste ADR-ul ca sa afle daca plierea il apara de suprapuneri: nu il apara - randul
de predictie se citeste cu ochii, si abia merge-ul da verdictul. Registrul de afirmatii a
fost spart in `src/content/afirmatii/` cu cate un fisier per felie exact din motivul asta, si
listele generate din el la fel.

Disjunctia rezolva conflictul de IMBINARE. Nu rezolva coliziunea de NUME. Doua felii care nu se
ating deloc in git pot alege acelasi identificator global:

- aceeasi `cale` in `RUTE` - sau doua cai care difera doar prin litere mari/mici, adica doua
  URI-uri legitime (RFC 3986 §6.2.2.1 lasa calea sensibila la registru) si un singur director in
  `src/app` pe Windows si pe macOS;
- acelasi `id="..."` intr-o pagina randata, cand una din felii il pune in pagina si alta intr-un
  component partajat pe care pagina il importa;
- acelasi nume de registru, care produce acelasi `docs/afirmatii/<nume>.md`, iar a doua generare
  il suprascrie tacut pe prima.

Fiecare felie e verde la ea acasa. Pliere fara conflict. `git merge` nu are ce sa raporteze:
fisierele chiar sunt diferite. Defectul apare dupa, in arborele plin, iar cine il vede primul e
publicul.

Mai exista o cale prin care coliziunea ar putea fi prinsa - dispecerul, la reconciliere, cu
ochiul. Aia e disciplina, si disciplina e prima care cedeaza sub viteza: la trei felii pe val,
dispecerul citeste diferente, nu multimi de nume.

## Decizie

- **`poarta-identificatori.py` ruleaza pe arborele PLIN al worktree-ului, la fiecare poarta
  locala, si nu pe diferenta feliei.** Diferenta nu poate raspunde la intrebarea "mai exista
  numele asta undeva"; numai arborele intreg poate.
- **Consecinta care e chiar rostul deciziei: coliziunea se vede in primul loc in care ambele
  felii exista deodata, si acela e inaintea push-ului.** Doua locuri, si conteaza ca sunt
  amandoua:
  - *poarta locala, in worktree-ul feliei* - prinde coliziunea cu tot ce e deja pe `main`, adica
    cu valurile anterioare. Reparatia e cea mai ieftina posibila: agentul isi schimba propriul
    identificator, singur, fara sa atinga munca nimanui.
  - *poarta pe ramura de lot, dupa `plieaza.sh`* - singurul loc in care doua felii din ACELASI
    val se vad una pe alta. Worktree-ul unei felii pleaca din `main` si nu contine sora ei, deci
    poarta locala nu are cum sa prinda coliziunea din acelasi val; poarta de pe lot are.
    `plieaza.sh` spune acelasi lucru despre clasa vecina de defecte: "ramura de lot e singurul
    loc unde poarta le vede impreuna".

  Ce nu se schimba prin decizia asta: coliziunea din acelasi val e prinsa dupa pliere, nu
  inainte. Castigul e ca e prinsa inainte de push si inainte de `main`, unde desfacerea costa
  un val intreg.
- **Cine gaseste numele ocupat il schimba pe al lui.** E regula de precedenta, nu de merit, si e
  scrisa in sectiunea "La rosu" a portii: nu redenumesti ruta sau id-ul altei felii, fiindca e
  adresa publica a altcuiva si o schimbi pentru toate paginile deodata.
- **Poarta nu cere unicitate GLOBALA a id-urilor de sectiune, doar in aceeasi pagina randata.**
  `#continut` exista intentionat pe fiecare pagina - e ancora de accesibilitate. O poarta care ar
  cere nume unice pe tot site-ul ar cere renumerotarea a 22 de pagini pentru zero castig si ar fi
  dezarmata in cateva saptamani, pe drept.

## Ce ramane in afara, si de ce

- **Coliziunile pe care git le vede oricum** (acelasi fisier atins de doua felii) raman treaba lui
  `plieaza.sh`. Doua mecanisme care raporteaza acelasi defect il fac de doua ori de reparat.
- **Id-urile din registrul de afirmatii** raman ale lui `poarta-evidenta.py`, care le verifica pe
  lista concatenata a TUTUROR registrelor, deci deja global. Masurat, nu presupus.
- **Ordinea de pliere nu se schimba** ca sa evite coliziuni. Poarta le raporteaza; nu incearca sa
  le prezica si nu rezerva nume.

## De ce nu invers

Alternativa era un registru central de identificatori - un fisier in care fiecare felie isi
rezerva numele inainte sa scrie. Ar fi mutat coliziunea din arbore intr-un fisier partajat pe care
toate feliile il modifica, adica exact cuplarea pe care spargerea registrului de afirmatii
tocmai o desfacuse. Un fisier pe care il scriu toti e conflict de imbinare la fiecare val.
