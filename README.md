# 3S - Scan Store Solve

Site public de vanzare pentru **3S - Scan Store Solve**: arhivare fizica autorizata, digitalizare si cautare AI in documente.

- Mediu de proba: `https://3s2.ke2.in` (inchis: cere autentificare, `noindex`)
- Productie: nu exista inca
- Stiva: Next.js 15, Tailwind v4, continut in MDX, pnpm
- Livrare: Docker pe Coolify (server `s3.ke2.in`)

## Comenzi

| Comanda | Ce face |
|---|---|
| `pnpm dev` | pornire locala |
| `pnpm verifica` | poarta locala completa: lint, tipuri, tipografie, build, teste |
| `pnpm porti` | doar poarta de tipografie (liniute lungi interzise) |

## Marcajul de livrare

`/stamp` intoarce valoarea din `src/content/_stamp.json` a commit-ului construit. Se foloseste ca sa
dovedim ca un deploy a schimbat efectiv continutul livrat, nu doar ca serviciul raspunde 200.
