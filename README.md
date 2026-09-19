# 3s4 - Scan Store Solve

Site public de vanzare pentru **3S - Scan Store Solve**: arhivare fizica autorizata, digitalizare si cautare AI in documente.

- Mediu de proba: `https://3s4.ke2.in` (public, `noindex`; `3s3.ke2.in` ramane disponibil)
- Productie: nu exista inca
- Stiva: Next.js 15, Tailwind v4, React 19, pnpm
- Livrare: Docker pe Coolify (server `s3.ke2.in`)

## Comenzi

| Comanda | Ce face |
|---|---|
| `pnpm dev` | pornire locala |
| `pnpm verifica` | poarta locala completa: lint, tipuri, tipografie, build, teste |
| `pnpm porti` | portile sursei, build si verificarea SEO/juridic |

Directia REF-S foloseste opt imagini originale generate pentru acest site, o demonstratie ilustrativa interactiva si 22 de pagini. Fotografiile nu reprezinta depozitul sau echipa clientului. Detalii: `docs/design/DIRECTIA.md` si `docs/adr/ADR-0006-directie-ref-s.md`.

## Marcajul de livrare

`/stamp` intoarce valoarea din `src/content/_stamp.json` a commit-ului construit. Se foloseste ca sa
dovedim ca un deploy a schimbat efectiv continutul livrat, nu doar ca serviciul raspunde 200.
