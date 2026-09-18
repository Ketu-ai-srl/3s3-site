import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Felia juridica, val S1-b: TEXTUL NU ARE VOIE SA NUMEASCA UN OBIECT CARE NU E PE PAGINA.
 *
 * FISIER NOU. `directia.test.ts` si `praguri-regresie.json` sunt partajate si inghetate in
 * valul asta, iar `felie-juridic.test.ts` masoara alta intrebare (jetoane de paleta si forma
 * componentelor). Ce se masoara aici e o a treia clasa, si merita fisierul ei.
 *
 * CLASA DE DEFECT, si de ce nicio poarta existenta nu o vede. O reasezare schimba OBIECTUL de
 * pe pagina - un tabel devine rand de ancore - iar textul care il numea ramane in continut,
 * neatins, fiindca e alt fisier. Rezultatul e o propozitie care trimite cititorul la ceva ce
 * nu exista. `typecheck`, `lint` si `build` nu citesc proza; `axe` vede un `<ul>` valid; probele
 * de browser masoara jetoane si asezare, nu adevarul unei trimiteri. Defectul a aparut de DOUA
 * ori pe aceeasi propozitie (`fise.lead`): intai „verificatorul de pe pagina de start", scos
 * cand widgetul a disparut, apoi „tabelul de mai sus", scris chiar in valul care inlocuia
 * tabelul. A doua oara a scapat de reparatie fiindca s-a verificat campul VECIN, `cuprins.subTabel`.
 *
 * CUM SE MASOARA. Deicticul e marcat de ARTICULARE, nu de cuvant: „tabelul de mai sus" si
 * „acelasi tabel" trimit la un obiect al paginii, deci cer un `<table>` randat de ea; „un tabel
 * cu optsprezece jurisdictii" e un obiect ipotetic, dintr-o fraza despre ce NU am ales sa
 * facem, si nu cere nimic. Proba nu poarta literal niciun sir vanat: detectorul e o regula
 * despre forma gramaticala, iar cele doua controale de mai jos il tin cinstit.
 *
 * CE NU VERIFICA (limite declarate - un verde de aici nu inseamna ca textul e adevarat)
 *   - Doar substantivul „tabel". Un text care ar spune „butonul de mai sus" fara buton trece.
 *     Nu extind lista pe presupunere: fiecare cuvant din ea trebuie sa aiba o forma randata
 *     dupa care sa se uite, iar `<table` e singura care se citeste fara sa randez pagina.
 *   - Citeste SURSA, nu HTML-ul servit. Un `<table>` construit dintr-o variabila ar trece
 *     nevazut. Pe felia asta nu exista asemenea constructie.
 *   - Un fisier de continut atins de alta felie poate inrosi proba asta, daca ajunge pe o
 *     pagina de-a mea. Asta e voit: pagina ar fi a mea, si textul fals tot pe ea s-ar vedea.
 */

const RADACINA = join(__dirname, '..')

const PAGINILE_FELIEI = [
  'src/app/termeni/page.tsx',
  'src/app/confidentialitate/page.tsx',
  'src/app/cookies/page.tsx',
  'src/app/accesibilitate/page.tsx',
  'src/app/instrumente/termene-de-pastrare/page.tsx',
  'src/app/harta-site/page.tsx',
  'src/app/not-found.tsx',
]

const citeste = (rel: string) => readFileSync(join(RADACINA, rel), 'utf8')

/** Sursa fara comentarii: altfel o nota care CITEAZA propozitia gresita ar trece drept text. */
function faraComentarii(sursa: string): string {
  return sursa.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|\s)\/\/[^\n]*/g, '$1')
}

/** Literalii de sir ai unui fisier de continut. Doar VALORI - `subTabel` e cheie, nu proza. */
function siruriDeProza(sursa: string): string[] {
  const fara = faraComentarii(sursa)
  return [...fara.matchAll(/"([^"]*)"/g)]
    .map((m) => m[1])
    .filter((s) => s.includes(' '))
}

/**
 * Trimitere la un tabel AL PAGINII. Articulat sau precedat de un determinant: obiect despre
 * care textul presupune ca il are cititorul in fata. Nedeterminat („un tabel") = ipotetic.
 */
const TRIMITERE_LA_TABEL =
  /(?:\b(?:tabelul|tabelului|tabelele|tabelelor)\b)|(?:(?:^|\s)(?:acest|acel|același|aceluiași|acelei|în|din|pe|sub|deasupra)\s+tabel\b)/i

/** Fisierele pe care le importa o pagina, pe prefixul cerut, urmarite doua nivele. */
function importuri(rel: string, prefix: string, adancime = 2): string[] {
  const vazute = new Set<string>()
  const coada = [rel]
  const gasite = new Set<string>()
  for (let nivel = 0; nivel <= adancime && coada.length; nivel++) {
    for (const f of coada.splice(0)) {
      if (vazute.has(f) || !existsSync(join(RADACINA, f))) continue
      vazute.add(f)
      const sursa = citeste(f)
      for (const m of sursa.matchAll(/from ["']@\/(content|components)\/([\w-]+)["']/g)) {
        const cale = `src/${m[1]}/${m[2]}` + (m[1] === 'components' ? '.tsx' : '.ts')
        if (m[1] === prefix.replace('src/', '').replace('/', '')) gasite.add(cale)
        coada.push(cale)
      }
    }
  }
  return [...gasite]
}

describe('felia juridica: textul nu numeste un obiect care nu e pe pagina', () => {
  it('detectorul prinde trimiterea la un obiect al paginii', () => {
    // Control POZITIV, cu valorile care au fost defecte cu adevarat, plus una fabricata.
    for (const s of [
      'Ordinea este cea din tabelul de mai sus.',
      'rândurile intră în același tabel, cu aceeași coloană de temei',
      'Cifra se citește în tabel, pe rândul categoriei.',
    ]) {
      expect(TRIMITERE_LA_TABEL.test(s), `detectorul rateaza: ${s}`).toBe(true)
    }
  })

  it('detectorul nu prinde un obiect ipotetic, nearticulat', () => {
    // Control NEGATIV. Fara el, regula s-ar putea inaspri pana cand ar cere un `<table>`
    // pentru o fraza care spune tocmai ca NU am facut tabel - si atunci reparatia ar fi sa
    // stricam textul corect.
    for (const s of [
      'Un tabel cu optsprezece jurisdicții arată bine până în ziua în care cineva îl folosește.',
      'Am ales lista scurtă, pe care o ducem la sursă rând cu rând.',
    ]) {
      expect(TRIMITERE_LA_TABEL.test(s), `detectorul da fals pozitiv pe: ${s}`).toBe(false)
    }
  })

  it('fiecare pagina a feliei: daca textul ei numeste tabelul, pagina randeaza un tabel', () => {
    let siruriCitite = 0
    for (const pagina of PAGINILE_FELIEI) {
      const bucati = [pagina, ...importuri(pagina, 'src/components/')]
      const randeazaTabel = bucati.some((f) => citeste(f).includes('<table'))

      for (const continut of importuri(pagina, 'src/content/')) {
        for (const sir of siruriDeProza(citeste(continut))) {
          siruriCitite++
          if (!TRIMITERE_LA_TABEL.test(sir)) continue
          expect(
            randeazaTabel,
            `${pagina} nu randeaza niciun <table>, dar textul din ${continut} trimite la unul: „${sir}"`,
          ).toBe(true)
        }
      }
    }
    // Controlul ca proba a citit ceva: un zero aici ar da verde pe o cautare in gol.
    expect(siruriCitite, 'proba nu a citit niciun sir de continut').toBeGreaterThan(100)
  })
})
