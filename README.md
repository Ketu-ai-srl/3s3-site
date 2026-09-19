# 3s3 / Scan Store Solve

Alternativa de prezentare pentru proiectul 3S, cu 22 de pagini, servicii de arhivare atribuite ADRIA si exemple digitale fictive.

- Prezentare: https://3s3.ke2.in, neindexabila.
- Depozit: Ketu-ai-srl/3s3-site.
- Next.js 15, React 19, TypeScript, Tailwind 4, pnpm.
- Livrare: Dockerfile pe Coolify; port 3000; SITE_ENV=staging.

## Interactiuni

Demonstratia ofera trei documente locale, sursa evidentiata, navigare pe pagini, PDF descarcabil si cautare fara rezultat. Nu contacteaza un model AI.

Contactul pregateste un e-mail contextual catre adresa publica ADRIA si permite copierea mesajului. Trimiterea are loc din aplicatia de e-mail a vizitatorului.

Ghidul de pastrare filtreaza categorii si calculeaza regula contabila de 5 ani de la 1 iulie. Comparația mobila si selectia serviciilor completeaza fluxul de evaluare.

## Verificare si rulare

| Comanda | Scop |
|---|---|
| pnpm dev | Server local de dezvoltare |
| pnpm verifica | Lint, tipuri, probele portilor, sursa, build, SEO, juridic, unitare si browser |
| pnpm build | Constructie pentru publicare |
| pnpm start | Servire locala a constructiei |

Marcajul /stamp vine din src/content/_stamp.json. Publicarea se confirma prin compararea marcajului servit cu cel din commit.

Decizia de reconstructie si migrarea probelor: docs/adr/ADR-0008-alternativa-3s3.md. Registrele istorice sunt retrase explicit. Registrul activ: src/content/afirmatii/alternativa-3s3.json.

## Imagini

Doua fotografii ilustrative originale, generate prin instrumentul integrat, sunt servite local ca WebP. Nu prezinta sediul sau personalul ADRIA. Caile, dimensiunile si instructiunile exacte de generare sunt in src/content/assets.json.
