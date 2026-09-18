# ADR-0001: Stiva, gazduire si medii

**Data:** 2026-09-05, actualizata 2026-09-06 · **Stare:** acceptata

## Context

Construim site-ul public de vanzare al brandului 3S. Platforma de produs exista deja
(SerenityFlow); site-ul doar vinde si trimite spre ea.

## Decizie

- **Stiva:** Next.js 15 (App Router) + Tailwind v4, continut MDX versionat, pnpm 10.33.0, Node 24.
- **Livrare:** imagine Docker construita de Coolify, server `s3.ke2.in`. Panoul `c1.ke2.in` NU e
  tinta de deploy.
- **Medii:** `3s2.ke2.in` = staging, PUBLIC (decizie owner 5 sep 2026: site de prezentare, se arata partenerilor fara frecare), dar cu `X-Robots-Tag: noindex` pana la lansare. Dupa lansarea pe domeniul real, staging-ul redirectioneaza spre productie.
  **Productia nu exista** si nu se creeaza pana cand owner-ul comunica domeniul real.
- **Repo:** `Ketu-ai-srl/3s2-site`, PUBLIC (al treilea site, pornit din arborele lui `3s1-site@main` (4d6dad0) pe 2026-09-06; depozit propriu, fara fork si fara istoricul primului) (reconfirmat de owner 2026-09-06, dupa o zi in care a
  fost privat pentru cateva ore). Consecinte: minutele de Actions sunt gratuite si nelimitate,
  protectia de ramura e disponibila pe planul Free (pe repo privat nu e), iar regula "zero secrete
  in cod" e critica. Site-ul isi tine PORTILE (`.claude/scripts/porti/`, `tests/`) - sunt testele
  lui si le ruleaza CI-ul lui.
- **Fabrica** (scripturile de lot, agentii, orchestrarea, verdictele, marcajele de GO, planurile)
  sta in depozitul PRIVAT `Ketu-ai-srl/3s-fabrica` (decizie owner 2026-09-06). Pana atunci a stat
  in acest depozit, sub `.claude/scripts/fabrica/`, `.claude/agents/`, `docs/agents/` - istoricul
  nu se rescrie (decizie owner), deci acele fisiere raman vizibile in commit-urile de dinainte de
  2026-09-06.
- `output: standalone` e conditionat de `BUILD_STANDALONE=1`: pe Windows fara drept de legaturi
  simbolice build-ul cade cu EPERM (masurat 2026-09-05). In Docker si CI, ambele Linux, e pornit.

## Consecinte

Un deploy se dovedeste cerand `/stamp` si comparand cu `src/content/_stamp.json` din commit.
Nicio alta forma de dovada nu se accepta.
