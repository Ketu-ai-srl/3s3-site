import { defineConfig, devices } from '@playwright/test'
import { RADACINA } from './ajutor/proiect'

/**
 * Configurarea portilor de browser.
 *
 * Sta aici, langa probe, nu in radacina, ca sa nu se ciocneasca cu `vitest.config.ts`
 * si ca zona sa fie una singura. Se ruleaza cu:
 *   pnpm exec playwright test --config tests/browser/playwright.config.ts
 *
 * Serverul e cel LOCAL, construit din arborele curent, niciodata staging. O poarta care
 * depinde de reteaua publica se inroseste din motive straine de cod, iar atunci se invata
 * a fi ignorata exact pana in ziua in care avea dreptate.
 */

// Portul vine de la lansator, care alege unul liber inainte de a porni Playwright.
// Rezerva fixa exista doar pentru rularea manuala; daca e ocupat, `next start` cade
// zgomotos, ceea ce e preferabil unei probe care masoara alt proces.
const PORT = Number(process.env.PORT_3S ?? 3907)
const BAZA = 'http://127.0.0.1:' + PORT

export default defineConfig({
  testDir: __dirname,
  // Artefactele raman in zona probelor, nu in radacina repo-ului: un director `test-results/`
  // aparut la rulare in radacina ar intra in commit-ul altcuiva fara ca nimeni sa-l ceara.
  outputDir: __dirname + '/.rezultate',
  fullyParallel: false,
  workers: 1,
  forbidOnly: true,
  retries: 0,
  // Portile de browser sunt lente prin natura lor, dar un timeout generos ascunde o
  // regresie de performanta in loc s-o arate. 60 s e plafon, nu buget.
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: process.env.PLAYWRIGHT_JSON_OUTPUT_NAME
    ? [['list'], ['json']]
    : [['list']],
  use: {
    baseURL: BAZA,
    ...devices['Desktop Chrome'],
    // Fara stare mostenita intre probe: `C-01` masoara prima vizita a unui om nou.
    storageState: undefined,
    // Animatiile de intrare se opresc: masurat pe 2026-09-05, axe a raportat contrast
    // 4,48:1 pe o eticheta care are, statica, 6,46:1 - elementul era la `opacity: 0.995`
    // in mijlocul unui fade-in. Fara asta, poarta pica pe cod corect, iar o poarta care
    // se inroseste pe lucrul corect e dezactivata de primul om pe care il incurca.
    reducedMotion: 'reduce',
  },
  webServer: {
    // Binarul local, chemat direct: nu depinde de `pnpm` in PATH-ul procesului care
    // porneste probele, si nu trece prin inca un strat de rezolvare.
    command: 'node ./node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port ' + PORT,
    cwd: RADACINA,
    url: BAZA,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    // Fara `SITE_ENV=staging` nu se activeaza autentificarea de baza si nici antetul de
    // neindexare: masuram forma pe care o vede publicul, nu mediul de proba.
    env: { SITE_ENV: 'local' },
  },
})
