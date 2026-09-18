# 3S Site - reguli de lucru

Site de vanzare pentru marca **3S - Scan Store Solve**.

Ce se comite aici pleaca din controlul nostru in momentul commit-ului: ramane in obiectele git,
in clonele existente si in orice copie de la distanta. Vizibilitatea depozitului se schimba
dintr-un buton si nu schimba nimic din ce e deja in istoric, deci nu e o aparare si nu se
invoca niciodata ca motiv.

## Inainte de orice modificare

1. Citeste `CONTEXT.md`. Este glosarul: fiecare termen care apare in cod, in sarcini si in
   discutie, cu locul unde ii traieste detaliul.
2. Fiecare regula din `.claude/rules/` isi declara suprafata in frontmatter-ul `paths`, pe
   calea fisierului atins. `paths` e o DECLARATIE, nu un mecanism al depozitului: nimic din
   `pnpm verifica` nu o citeste, iar daca unealta cu care lucrezi nu o onoreaza, nimic nu
   incarca regula. Atunci `.claude/rules/INDEX.md` e harta pe care o deschizi de mana.
3. Ruleaza poarta locala: `pnpm verifica`. Nimic nu pleaca spre depozitul de la distanta fara
   ea verde. Un pas care iese 3 inseamna NEMASURAT, nu curat.

## Deciziile care nu se renegociaza in cod

- **Doar cratima**, niciodata liniuta lunga. Se aplica la tot ce se comite.
- **Diacritice complete** in textul vizibil, si o singura forma de adresare pe tot site-ul.
- **Fara preturi** pe site. Pagina de investitie explica ce influenteaza costul.
- **Fara numar de telefon** pe site: formular si adresa de posta.
- **Vechimea, autorizarea si certificarile se scriu atribuit** entitatii care ar scoate actul
  daca un cititor cere dovada. Regula are fisierul ei: `.claude/rules/afirmatii-atribuite.md`.
- **Site-ul are o singura actiune principala**, iar fiecare pagina duce la ea. Nu se adauga a
  doua actiune concurenta; care e actiunea, si in ce forma, sta in glosar.
- **Portile nu se slabesc ca sa treaca lotul.** Cand una e rosie, editarea legitima e ingusta si
  numita; regula si zona editabila a fiecarei porti sunt scrise, poarta cu poarta.

## Dovada, nu declaratia

Un deploy se dovedeste comparand marcajul servit de mediu cu cel din commit. "Serviciul raspunde
200", "containerul e sus" si "build success" nu sunt dovezi: un endpoint de sanatate raspunde
200 cu dependintele cazute.

Aceeasi regula se aplica muncii proprii. Se separa mereu, explicit: **ce am rulat si am vazut** ·
**ce presupun** · **ce ramane nemasurat**. Al doilea si al treilea nu se prezinta ca primul.
