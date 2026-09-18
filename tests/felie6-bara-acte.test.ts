import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { ANCORE_ACT, GRUPE_ACT } from '../src/content/interior-juridic'
import { PAGINI_JURIDICE } from '../src/content/juridic'

/**
 * Bara locala a unui act poarta GRUPELE, nu toate sectiunile - proba noua a valului S2-b.
 *
 * DEFECTUL PE CARE IL INCHIDE, cu cifrele lui. Cu cate o ancora de sectiune pe bara, noua pe
 * /termeni si pe /confidentialitate, `document.documentElement.scrollWidth` masura 927 px pe
 * /termeni si 993 px pe /confidentialitate la ferestre de 768 si de 834 px: bara are
 * `flex-nowrap` de la 768 px in sus, deci randul nu se rupe, ci impinge pagina lateral.
 * Controlul care a inchis cauza: cu bara pe `display:none`, scrollWidth cobora la exact 768.
 *
 * DE CE O PROBA NOUA SI NU O LARGIRE A CELEI DE DERAPAJ. `tests/browser/derapaj.spec.ts`
 * masoara latimile 390 si 1440, unde derapajul chiar e 0 - defectul traia intre ele. Proba de
 * browser e partajata si inghetata in valul asta, deci cifra se pazeste aici, pe sursa.
 *
 * CE NU MASOARA, si e limita ei, nu o scapare: nu deschide niciun browser si nu vede pixeli.
 * Numara ancorele care urca pe bara si verifica tintele. Ca patru ancore INCAP pe randul de
 * 52 px la 768 px se stabileste numai masurand pagina construita, iar cifrele stau in raportul
 * feliei. Proba de aici prinde clasa - „au urcat iar toate sectiunile pe bara" - nu cazul.
 */

const RADACINA = join(__dirname, '..')
const PLAFON = 4

describe('felia 6: bara actului poarta grupele, cuprinsul poarta sectiunile', () => {
  it('fiecare act are cel mult patru ancore pe bara locala', () => {
    const peste: string[] = []
    for (const p of PAGINI_JURIDICE) {
      const grupe = GRUPE_ACT[p.cale]
      expect(grupe, 'act fara grupe de bara: ' + p.cale).toBeDefined()
      if (grupe && grupe.length > PLAFON) peste.push(p.cale + ' ' + grupe.length)
    }
    expect(peste, 'act cu bara peste plafonul de ' + PLAFON + ' ancore').toEqual([])
    // Controlul ca proba a citit acte, nu o lista goala.
    expect(PAGINI_JURIDICE.length, 'nu am citit niciun act').toBeGreaterThan(2)
  })

  it('fiecare grupa de bara e o sectiune reala a actului ei, cu eticheta scurta', () => {
    const straine: string[] = []
    const faraEticheta: string[] = []
    for (const p of PAGINI_JURIDICE) {
      const iduri = new Set(p.sectiuni.map((s) => s.id))
      for (const id of GRUPE_ACT[p.cale] ?? []) {
        if (!iduri.has(id)) straine.push(p.cale + ' #' + id)
        if (!ANCORE_ACT[id]) faraEticheta.push(p.cale + ' #' + id)
      }
    }
    expect(straine, 'grupa de bara fara sectiune pe actul ei').toEqual([])
    expect(faraEticheta, 'grupa de bara fara eticheta scurta').toEqual([])
    // Si invers: nicio cale in tabel care sa nu fie act.
    const cai = new Set(PAGINI_JURIDICE.map((p) => p.cale))
    expect(
      Object.keys(GRUPE_ACT).filter((c) => !cai.has(c)),
      'grupe scrise pentru o cale care nu e act',
    ).toEqual([])
  })

  it('sectiunile care NU urca pe bara raman ancore in cuprinsul de sub titlu', () => {
    // Taierea barei e legitima doar cu conditia asta: nimic nu dispare din pagina. Cuprinsul
    // primeste `pagina.sectiuni` intregi, nu grupele.
    const pagina = readFileSync(join(RADACINA, 'src/components/JuridicPagina.tsx'), 'utf8')
    expect(pagina, 'cuprinsul actului nu mai ajunge pe pagina').toContain(
      '<JuridicAncore sectiuni={pagina.sectiuni} />',
    )
    // Si bara chiar primeste altceva decat lista intreaga.
    expect(pagina, 'bara nu mai filtreaza pe grupe').toContain('grupe.includes(s.id)')

    const cuprins = readFileSync(join(RADACINA, 'src/components/JuridicAncore.tsx'), 'utf8')
    for (const semn of ['ANCORE_ACT[s.id]', 's.titlu', 'href={"#" + s.id}']) {
      expect(cuprins, 'cuprinsul nu mai poarta ' + semn).toContain(semn)
    }

    // Cate sectiuni pierde bara pe fiecare act - cifra care da masura defectului reparat.
    const coborate = PAGINI_JURIDICE.map(
      (p) => p.sectiuni.length - (GRUPE_ACT[p.cale] ?? p.sectiuni).length,
    )
    expect(coborate.some((n) => n > 0), 'nicio sectiune nu a coborat de pe bara').toBe(true)
  })
})
