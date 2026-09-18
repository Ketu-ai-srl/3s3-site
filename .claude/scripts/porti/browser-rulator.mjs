#!/usr/bin/env node
// Lansatorul comun al portilor de browser.
//
// De ce exista, in loc sa se cheme direct `playwright test`: Playwright iese cu 1 si cand
// o proba a picat, si cand NU a rulat nicio proba. Cele doua stari nu au voie sa arate la
// fel. O suita care nu a gasit nimic de rulat nu e "curata", e NEMASURATA, iar aici asta
// primeste cod de iesire propriu.
//
// Iesire: 0 = poarta trece · 1 = poarta pica · 2 = folosire gresita · 3 = NEMASURAT
//
// CE NU VERIFICA (reziduurile comune ale tuturor portilor de browser)
// Intrebarea pe care o pune de fapt: "au rulat probele cerute, au trecut toate, si au rulat
// printre ele si un martor pozitiv si unul negativ?" Nu "e pagina buna".
//  - Martorii se recunosc dupa TITLU: un titlu care contine 'martor POZITIV' respectiv
//    'martor NEGATIV'. O proba redenumita dezarmeaza verificarea fara sa schimbe nimic altceva,
//    si nimic nu semnaleaza asta.
//  - Se cere ca AMANDOI martorii sa fi rulat undeva in rularea curenta, nu ca fiecare fisier
//    de proba sa aiba martorii lui. Cu mai multe fisiere deodata, unul fara martori trece pe
//    seama celorlalte.
//  - NEMASURAT se deduce dintr-un sir cautat in textul erorilor. O proba care esueaza altfel,
//    fara acel sir, se citeste ca defect obisnuit, nu ca masuratoare invalida.
//  - Build-ul se REFOLOSESTE cand e mai nou decat sursa, iar prospetimea se judeca doar dupa
//    src, public, next.config.ts si package.json. O schimbare in afara acestor patru radacini
//    nu declanseaza reconstruirea.
//  - SARI_BUILD=1 sare build-ul cu totul: rularea masoara atunci ce era construit dinainte.
//  - Probele sarite se scot din numarare inainte de verdict, deci un fisier sarit integral nu
//    coboara numarul de porti trecute; el dispare pur si simplu.
//  - Verdictul se citeste din raportul JSON, nu din codul de iesire al rulatorului de probe.
//
// LA ROSU: se editeaza proba picata sau codul paginii. Nu se ating: cerinta ca ambii martori
// sa fi rulat, tratarea cazului 'nicio proba nu a rulat', deducerea lui NEMASURAT, si nu se
// foloseste SARI_BUILD ca sa treaca o poarta.
//
// Tot ce tipareste scriptul e ASCII, deliberat: consola Windows e cp1252 si ar strica
// diacriticele, iar un raport cu litere rupte se citeste gresit exact cand conteaza.

import { spawnSync } from 'node:child_process'
import { createServer } from 'node:net'
import { mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const AICI = dirname(fileURLToPath(import.meta.url))
export const RADACINA = resolve(AICI, '..', '..', '..')
const CONFIG = join('tests', 'browser', 'playwright.config.ts')

/** Un port liber, cerut sistemului. Nicio constanta de port: doua loturi pot rula deodata. */
async function portLiber() {
  return new Promise((gata, esec) => {
    const s = createServer()
    s.on('error', esec)
    s.listen(0, '127.0.0.1', () => {
      const port = s.address().port
      s.close(() => gata(port))
    })
  })
}

// Binarele locale se cheama prin `node <cale>`, nu prin `pnpm ... { shell: true }`.
// Motivul e masurat, nu teoretic: cu `shell: true` argumentele sunt CONCATENATE, nu
// escapate, deci orice argument cu spatiu se rupe in doua tacut. Am prins-o rulind un
// control cu `--grep "pagina reala"`, care a ajuns la Playwright ca `--grep pagina` plus
// filtrul de fisier `reala`, si a rulat alte probe decat cele cerute. Fara shell, calea
// repo-ului poate contine spatii fara consecinte.
const CLI_NEXT = join(RADACINA, 'node_modules', 'next', 'dist', 'bin', 'next')
const CLI_PLAYWRIGHT = join(RADACINA, 'node_modules', '@playwright', 'test', 'cli.js')

/** Cel mai nou moment de modificare din arborele care intra in build. */
function celMaiNouDinSursa() {
  const radacini = ['src', 'public', 'next.config.ts', 'package.json']
  let cel_mai_nou = 0
  const urca = (cale) => {
    let st
    try {
      st = statSync(cale)
    } catch {
      return
    }
    if (st.isDirectory()) {
      for (const n of readdirSync(cale)) urca(join(cale, n))
    } else if (st.mtimeMs > cel_mai_nou) {
      cel_mai_nou = st.mtimeMs
    }
  }
  for (const r of radacini) urca(join(RADACINA, r))
  return cel_mai_nou
}

function construieste() {
  if (process.env.SARI_BUILD === '1') {
    console.log('[rulator] build sarit (SARI_BUILD=1)')
    return 0
  }
  // Build-ul se reface doar daca sursa e mai noua decat el. Fara verificarea asta,
  // `verifica` construia de doua ori: o data la pasul `pnpm build`, inca o data aici.
  // Variabila de mediu nu era o solutie portabila - `VAR=1 comanda` nu exista in cmd.exe,
  // iar scripturile de pachet ruleaza pe Windows prin cmd, deci ar fi picat tacut.
  // Nu e o scurtatura de viteza cu risc: cand sursa e mai noua, se construieste.
  let build = 0
  try {
    build = statSync(join(RADACINA, '.next', 'BUILD_ID')).mtimeMs
  } catch {
    build = 0
  }
  const sursa = celMaiNouDinSursa()
  if (build > 0 && build >= sursa) {
    console.log('[rulator] build refolosit (mai nou decat sursa) - nu reconstruiesc')
    return 0
  }
  console.log('[rulator] next build (build ' + (build ? 'invechit' : 'lipsa') + ')')
  const r = spawnSync(process.execPath, [CLI_NEXT, 'build'], {
    cwd: RADACINA,
    stdio: 'inherit',
  })
  return r.status ?? 1
}

/**
 * Citeste raportul JSON si intoarce ce s-a intamplat CU ADEVARAT.
 * Codul de iesire al lui Playwright nu distinge "a picat" de "n-a rulat nimic".
 */
function citesteRaportul(cale) {
  const raport = JSON.parse(readFileSync(cale, 'utf8'))
  const probe = []

  const parcurge = (suite) => {
    for (const spec of suite.specs ?? []) {
      for (const t of spec.tests ?? []) {
        const ultim = (t.results ?? [])[t.results.length - 1]
        probe.push({
          titlu: spec.title,
          stare: ultim?.status ?? 'fara rezultat',
          erori: (ultim?.errors ?? []).map((e) => e.message ?? '').join('\n'),
        })
      }
    }
    for (const sub of suite.suites ?? []) parcurge(sub)
  }
  for (const s of raport.suites ?? []) parcurge(s)

  return probe
}

/**
 * @param {string} eticheta  numele portii, pentru raport
 * @param {string[]} fisiere probele de rulat, relativ la radacina repo-ului
 */
export async function ruleazaPoarta(eticheta, fisiere) {
  const codBuild = construieste()
  if (codBuild !== 0) {
    console.error('[' + eticheta + '] build-ul a picat: poarta e NEMASURATA, nu trecuta')
    return 3
  }

  const port = await portLiber()
  const temp = mkdtempSync(join(tmpdir(), 'porti-3s-'))
  const caleRaport = join(temp, 'raport.json')

  console.log('[' + eticheta + '] port local ales: ' + port)

  const r = spawnSync(
    process.execPath,
    [CLI_PLAYWRIGHT, 'test', '--config', CONFIG, ...fisiere],
    {
      cwd: RADACINA,
      stdio: 'inherit',
      env: {
        ...process.env,
        PORT_3S: String(port),
        PLAYWRIGHT_JSON_OUTPUT_NAME: caleRaport,
        // Serverul se porneste de fiecare data proaspat: un `next start` ramas din alta
        // rulare ar servi alt build, si poarta ar masura alt cod decat cel din arbore.
        CI: '1',
      },
    },
  )

  let probe
  try {
    probe = citesteRaportul(caleRaport)
  } catch (e) {
    console.error(
      '[' + eticheta + '] raportul JSON nu a putut fi citit (' + e.message + '): NEMASURAT',
    )
    rmSync(temp, { recursive: true, force: true })
    return 3
  }
  rmSync(temp, { recursive: true, force: true })

  const rulate = probe.filter((p) => p.stare !== 'skipped')
  const picate = rulate.filter((p) => p.stare !== 'passed')
  const nemasurat = rulate.some((p) => p.erori.includes('NEMASURAT:'))
  const arePozitiv = rulate.some((p) => p.titlu.includes('martor POZITIV'))
  const areNegativ = rulate.some((p) => p.titlu.includes('martor NEGATIV'))

  console.log(
    '[' +
      eticheta +
      '] probe rulate: ' +
      rulate.length +
      ' | picate: ' +
      picate.length +
      ' | martor pozitiv rulat: ' +
      arePozitiv +
      ' | martor negativ rulat: ' +
      areNegativ,
  )

  if (rulate.length === 0) {
    console.error('[' + eticheta + '] nicio proba nu a rulat: NEMASURAT, nu curat')
    return 3
  }
  if (nemasurat) {
    console.error('[' + eticheta + '] o proba a semnalat NEMASURAT')
    return 3
  }
  // Regula din PORTI-FABRICA.md §1.2: o poarta fara control pozitiv nu e poarta, e o
  // decoratiune. Daca martorii nu au rulat, verdictul nu are voie sa fie "curat".
  if (!arePozitiv || !areNegativ) {
    console.error(
      '[' + eticheta + '] martorii nu au rulat amandoi: verdictul e NEMASURAT, nu curat',
    )
    return 3
  }
  if (picate.length > 0 || (r.status ?? 1) !== 0) {
    for (const p of picate) console.error('  PICAT: ' + p.titlu)
    return 1
  }
  return 0
}
