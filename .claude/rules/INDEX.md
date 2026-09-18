# Fiecare regula isi declara suprafata, in frontmatter

Fiecare regula din directorul asta spune singura pe ce fisiere se aplica, in frontmatter-ul
`paths`. Intentia e ca cine atinge un fisier sa primeasca regulile a caror suprafata il contine.
Cat din intentie se intampla depinde de unealta - vezi nota de la finalul fisierului.

Randurile de mai jos sunt harta suprafetelor. Cand unealta nu incarca nimic dupa `paths`, tabelul
asta e chiar pasul de lectura: se deschide regula a carei suprafata contine fisierul atins.

| Regula | Suprafata declarata |
|---|---|
| `afirmatii-atribuite.md` | textul vizibil al site-ului si registrul de afirmatii |
| `zero-secrete-in-cod.md` | tot arborele, mai putin dependintele si iesirile de build |
| `verifica-preconditii-externe.md` | scripturile de mediu, lantul de integrare, deciziile de arhitectura |
| `masoara-adevarul-nu-surogatul.md` | portile si probele |
| `la-rosu-se-justifica.md` | portile, probele si pragurile lor |

## Doua lucruri de stiut despre forma asta

**`paths` e o declaratie, nu un mecanism al depozitului.** Nimic din `pnpm verifica` nu o citeste;
o citeste unealta cu care lucreaza agentul. Cifrele suprafetelor au fost masurate contra
`git ls-files` cand au fost scrise, si se remasoara la fel cand se schimba.

**Fiecare regula e auto-continenta.** Niciuna nu spune "tine si cealalta". Cand doua reguli au
nevoie de aceeasi propozitie, propozitia se scrie in amandoua: un pointer moare tacut cand tinta
lui e stearsa, o duplicare nu.

Regulile sunt scurte prin proiectare. Daca una creste peste o pagina, se taie. Formatul si motivul
fiecarei alegeri: `docs/adr/ADR-0005-format-reguli.md`.
