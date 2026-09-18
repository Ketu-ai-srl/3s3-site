import { readFileSync, readdirSync } from 'node:fs'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { join, sep } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Fundatia directiei REF-A (felia 1, val S2-a): alb si gri deschis, text aproape negru, UN
 * albastru care duce actiunea, fara gradiente si fara umbre, titluri la 600 in propozitii de
 * doua-patru cuvinte cu punct, fotografii mari in tigle si niciodata text peste ele.
 *
 * CE CLASA DE DEFECT INCHID PROBELE DE AICI. Portile de browser masoara pagina CONSTRUITA: axe
 * pe 22 de rute plus un build inseamna minute, si raspunde abia dupa. Regulile de mai jos se pot
 * decide pe sursa, in sub o secunda, si sunt exact acelea pe care nicio alta poarta nu le vede:
 *   - o culoare din paleta REF-V reintrodusa „temporar" in globals.css. Contrastul ei poate fi
 *     impecabil, deci nicio poarta de contrast nu se inroseste; ce se pierde e directia.
 *   - un al doilea font incarcat printr-un nume mostenit (`font-mono`, `font-afis`).
 *   - `albastru` scris ca litera, unde da 4,31:1 pe ceata. Axe il prinde doar daca acel text
 *     ajunge randat pe o pagina din lista de rute, la latimea masurata.
 *   - `albastru-clar` pe deschis sau `albastru-2` pe negru: fiecare albastru are UN capat pe
 *     care trece, si nicio unealta nu se uita la care.
 *   - doua butoane primare pe aceeasi tigla. Nicio unealta nu numara asta.
 *   - inaltimea de rand sub pragul diacriticelor romanesti.
 *
 * Cifrele de contrast citate mai jos sunt calculate din valorile paletei (raportul de luminanta
 * WCAG), iar pragul diacriticelor e masurat pe fontul REAL servit de site, cu TextMetrics.
 * Amandoua, cu metoda si cu martorii lor: `docs/design/DIRECTIA.md`.
 */

const RADACINA = join(__dirname, '..')
const COMPONENTE = join(RADACINA, 'src', 'components')
const SURSA = join(RADACINA, 'src')
const CSS = readFileSync(join(RADACINA, 'src', 'app', 'globals.css'), 'utf8')
const DIRECTIA = readFileSync(join(RADACINA, 'docs', 'design', 'DIRECTIA.md'), 'utf8')
const PAGINA = join(RADACINA, 'src', 'app', 'page.tsx')

// Cele 9 roluri ale paletei REF-A, asa cum le poate folosi acest site. Lista e inchisa: o
// culoare in plus inseamna un rol pe care nu l-a numit nimeni, iar rolurile nenumite se aleg
// dupa gust, nu dupa masuratoare.
//
// AL ZECELEA ROL AL REFERINTEI, griul deschis de la paragraful de capitol, NU e aici, si e o
// refutare masurata: la 21 px si greutatea 600 da 3,62:1, iar axe l-a raportat `serious` pe 20
// din 22 de rute. Pragul de 3:1 pentru text mare cere 24 px sau greutatea 700, iar directia are
// doua greutati. Motivul intreg, cu cele trei iesiri cantarite: `globals.css` si DIRECTIA.md.
const PALETA = [
  'cerneala',
  'cerneala-3',
  'albastru',
  'albastru-2',
  'albastru-clar',
  'alb',
  'ceata',
  'negru',
  'accent-nou',
]

// Numele directiei anterioare (REF-V). `albastru-clar` NU e printre ele si nu se potriveste:
// tiparele cer numele intreg, nu o bucata din el.
const PALETA_VECHE = [
  /--color-violet(-[a-z0-9-]+)?:/,
  /--color-noapte-v:/,
  /--color-ceata-2:/,
  /--color-linie(-[a-z0-9-]+)?:/,
  /--color-succes:/,
]

// Clasele pe care le-ar scrie cineva care se intoarce, din obisnuinta, la directia REF-V.
const CLASE_VECHI =
  /\b(?:hover:|group-hover:|focus:)?(?:bg|text|border|decoration|from|to|via|ring|fill|stroke|outline|divide)-(?:violet|violet-2|violet-clar|violet-pal|violet-adanc|noapte-v|ceata-2|linie|succes)\b/g

// FISIERELE FELIEI 1. Restul lui `src/` apartine valului S2-b, si acolo reziduul e MASURAT si
// plafonat, nu zero - vezi proba lui.
const ALE_FELIEI = ['src/components/', 'src/app/page.tsx', 'src/app/layout.tsx', 'src/content/start.ts']

// Reziduul masurat azi in afara feliei 1, cu comentariile scoase: 41 de clase REF-V, in 11
// pagini din `src/app` si in `src/content/termene.ts`. E o PODEA care poate doar sa scada:
// scrisa ca `<=`, nu ca `===`, tocmai ca sa nu se inroseasca atunci cand cineva face lucrul
// corect si rescrie una dintre pagini.
const REZIDUU_MAXIM = 41

function fisiereTsx(dir: string, acc: string[] = []): string[] {
  for (const intrare of readdirSync(dir, { withFileTypes: true })) {
    const cale = join(dir, intrare.name)
    if (intrare.isDirectory()) fisiereTsx(cale, acc)
    else if (/\.tsx?$/.test(intrare.name)) acc.push(cale)
  }
  return acc
}

function relativa(cale: string) {
  return cale.replace(RADACINA, '').split(sep).join('/').replace(/^\//, '')
}

// Comentariile se scot inainte de a cauta clase: notele istorice ale componentelor retintuite
// numesc pe fata culorile directiei anterioare, si asta e chiar ce vrem sa ramana scris. Ce nu
// are voie sa existe e clasa in COD.
function faraComentarii(text: string) {
  return text.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^[ \t]*\/\/.*$/gm, '')
}

// Raportul de luminanta WCAG, din valorile paletei. Nu numele, VALORILE.
const canal = (v: number) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4))
const luminanta = (hex: string) => {
  const n = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  return 0.2126 * canal(n[0]) + 0.7152 * canal(n[1]) + 0.0722 * canal(n[2])
}
const contrast = (a: string, b: string) => {
  const [la, lb] = [luminanta(a), luminanta(b)]
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}
const valoare = (rol: string) => {
  const m = CSS.match(new RegExp('--color-' + rol + ':\\s*(#[0-9a-f]{6})'))
  expect(m, 'nu gasesc valoarea rolului ' + rol).not.toBeNull()
  return m![1]
}

describe('paleta REF-A', () => {
  it('globals.css defineste exact cele 9 roluri folosibile, si nimic in plus', () => {
    for (const rol of PALETA) {
      expect(CSS, 'globals.css nu defineste --color-' + rol).toContain('--color-' + rol + ':')
    }
    const definite = [...CSS.matchAll(/--color-([a-z0-9-]+):/g)].map((m) => m[1]).sort()
    expect(definite, 'roluri de culoare in plus fata de lista REF-A').toEqual([...PALETA].sort())
  })

  it('paleta REF-V nu mai e definita, nici macar ca alias', () => {
    const ramase: string[] = []
    for (const tipar of PALETA_VECHE) {
      const m = CSS.match(tipar)
      if (m) ramase.push(m[0])
    }
    expect(ramase, 'jetoane ale directiei REF-V ramase in globals.css').toEqual([])
    // Si controlul: tiparul chiar prinde ceva, altfel proba de mai sus ar fi verde si oarba.
    expect('--color-violet-2: #7b66ff;'.match(PALETA_VECHE[0]), 'tiparul nu prinde nici macar forma pe care o vaneaza').not.toBeNull()
    expect('--color-linie: #e9e9ec;'.match(PALETA_VECHE[3]), 'tiparul de linie nu prinde forma vanata').not.toBeNull()
    // Martor negativ: numele NOI nu au voie sa fie inghitite de tiparele vechi.
    for (const tipar of PALETA_VECHE) {
      expect('--color-albastru-clar: #2997ff;'.match(tipar), 'un tipar vechi inghite un rol nou').toBeNull()
    }
  })

  it('fisierele feliei 1 nu mai scriu nicio clasa REF-V, iar reziduul din rest nu creste', () => {
    const aleMele: string[] = []
    let reziduu = 0
    const fisiereReziduu = new Set<string>()
    for (const cale of fisiereTsx(SURSA)) {
      const rel = relativa(cale)
      const cod = faraComentarii(readFileSync(cale, 'utf8'))
      const gasite = [...cod.matchAll(CLASE_VECHI)]
      if (gasite.length === 0) continue
      if (ALE_FELIEI.some((p) => rel.startsWith(p))) {
        for (const m of gasite) aleMele.push(rel + ': ' + m[0])
      } else {
        reziduu += gasite.length
        fisiereReziduu.add(rel)
      }
    }
    expect(aleMele, 'clase REF-V in fisierele feliei 1').toEqual([])
    // Reziduul valului urmator: masurat 41 azi, in 12 fisiere. Poate doar sa scada.
    expect(reziduu, 'reziduul REF-V din afara feliei 1 a CRESCUT peste cel masurat').toBeLessThanOrEqual(
      REZIDUU_MAXIM,
    )
    expect(fisiereReziduu.size, 'reziduul s-a raspandit in mai multe fisiere decat cele masurate').toBeLessThanOrEqual(12)
    // Control pozitiv: tiparul prinde forma pe care o vaneaza, inclusiv variantele.
    const martor = 'className="bg-noapte-v text-violet-clar hover:text-violet decoration-violet-2 border-linie"'
    expect([...martor.matchAll(CLASE_VECHI)].length, 'tiparul de clase vechi nu prinde martorul').toBe(5)
    // Control negativ: clasele NOI nu au voie sa fie prinse.
    const martorNou = 'className="bg-albastru text-albastru-clar hover:bg-albastru-2 text-cerneala-3"'
    expect([...martorNou.matchAll(CLASE_VECHI)].length, 'tiparul vechi inghite clasele noi').toBe(0)
  })

  it('fiecare culoare trece pragul pe suprafata pe care are voie sa scrie, calculat din valori', () => {
    // Control: doua valori al caror raspuns se stie dinainte.
    expect(contrast('#ffffff', '#000000'), 'formula de contrast e gresita').toBeCloseTo(21, 2)
    expect(contrast('#ffffff', '#ffffff'), 'formula de contrast e gresita').toBeCloseTo(1, 2)

    const sub: string[] = []
    for (const cerneala of ['cerneala', 'cerneala-3', 'accent-nou']) {
      for (const suprafata of ['alb', 'ceata']) {
        const c = contrast(valoare(cerneala), valoare(suprafata))
        if (c < 4.5) sub.push(cerneala + ' pe ' + suprafata + ': ' + c.toFixed(2))
      }
    }
    expect(sub, 'culoare de litera sub pragul de 4,5:1 pe o suprafata deschisa').toEqual([])
    // Legaturile pe deschis, si albul pe pastila plina.
    expect(contrast(valoare('albastru-2'), valoare('alb')), 'albastru-2 nu mai trece pe alb').toBeGreaterThan(4.5)
    expect(contrast(valoare('albastru-2'), valoare('ceata')), 'albastru-2 nu mai trece pe ceata').toBeGreaterThan(4.5)
    expect(contrast(valoare('alb'), valoare('albastru')), 'albul de pe pastila plina nu mai trece').toBeGreaterThan(4.5)
    // Pe negru: litera `ceata`, legaturile `albastru-clar`.
    expect(contrast(valoare('ceata'), valoare('negru'))).toBeGreaterThan(4.5)
    expect(contrast(valoare('albastru-clar'), valoare('negru'))).toBeGreaterThan(4.5)
  })

  it('cele doua culori care NU sunt de litera raman sub prag, si asta se afirma explicit', () => {
    // Daca vreuna ar ajunge sa treaca, regula care o tine departe de litera si-a pierdut motivul
    // si trebuie rescrisa. De aia se afirma, nu se presupune.
    expect(
      contrast(valoare('albastru'), valoare('ceata')),
      'albastru a devenit culoare de text pe ceata',
    ).toBeLessThan(4.5)
    expect(
      contrast(valoare('albastru-clar'), valoare('alb')),
      'albastru-clar a devenit culoare de text pe alb',
    ).toBeLessThan(4.5)
    // Si griul referintei, cel care NU e definit: calculat aici din valoarea lui literala,
    // ca sa ramana scris de ce nu poate exista. 3,62:1 pe alb, adica sub 4,5:1; iar usa de
    // 3:1 pentru text mare cere 24 px sau greutatea 700, pe care directia nu le are la
    // paragraful de capitol. Daca cineva il reintroduce, prima proba din fisier se inroseste.
    expect(contrast('#86868b', valoare('alb')), 'griul referintei ar trece pragul de text mic').toBeLessThan(4.5)
    expect(contrast('#86868b', valoare('ceata'))).toBeLessThan(4.5)
  })

  it('griul de la 21 px al referintei nu se intoarce, nici ca jeton, nici ca clasa', () => {
    // Rolul a fost RETRAS dupa o masuratoare cu axe, nu uitat: 3,62:1 la 19 px, impact
    // `serious` pe 20 din 22 de rute, un nod pe fiecare - paragraful de capitol. Proba pazeste
    // exact intoarcerea lui, in amandoua formele in care s-ar putea intoarce.
    expect(CSS, 'griul de 21 px a fost redefinit ca jeton').not.toMatch(/--color-cerneala-2:/)
    expect(CSS, 'valoarea lui a fost strecurata sub alt nume').not.toMatch(/--color-[a-z0-9-]+:\s*#86868b/)
    const scriu: string[] = []
    for (const cale of fisiereTsx(SURSA)) {
      const rel = relativa(cale)
      if (!ALE_FELIEI.some((x) => rel.startsWith(x))) continue
      const cod = faraComentarii(readFileSync(cale, 'utf8'))
      for (const m of cod.matchAll(/\btext-cerneala-2\b/g)) scriu.push(rel + ': ' + m[0])
    }
    expect(scriu, 'fisierele feliei 1 inca scriu clasa griului retras').toEqual([])
    // Control pozitiv: tiparele prind formele pe care le vaneaza.
    expect('--color-cerneala-2: #86868b;'.match(/--color-cerneala-2:/), 'tiparul de jeton nu prinde martorul').not.toBeNull()
    expect('--color-gri-nou: #86868b;'.match(/--color-[a-z0-9-]+:\s*#86868b/), 'tiparul de valoare nu prinde martorul').not.toBeNull()
    expect([...'className="text-cerneala-2"'.matchAll(/\btext-cerneala-2\b/g)].length).toBe(1)
    // Si motivul retragerii e SCRIS, nu doar aplicat: cifra masurata si pragul care o judeca.
    expect(CSS, 'globals.css nu scrie cifra masurata de axe').toContain('3,62')
    expect(DIRECTIA, 'DIRECTIA.md nu scrie de ce a fost retras rolul').toMatch(/700/)
    // SI documentul nu are voie sa prescrie in alta parte chiar pragul pe care il refuta aici.
    // Asa s-a intamplat: reteta de masurare de la finalul lui DIRECTIA.md cerea „18,66 px la
    // greutatea 600", adica exact conditia referintei, nu a WCAG - un agent care o urma masura
    // cu pragul larg si lasa griul de 3,62:1 sa treaca. Refutarea si reteta trebuie sa spuna
    // acelasi lucru, si asta o tine proba, nu buna-credinta.
    expect(DIRECTIA, 'DIRECTIA.md prescrie undeva pragul de 3:1 la greutatea 600, pe care tot el il refuta').not.toMatch(
      /18,66\s*px\s*(?:cu|la)\s*greutatea\s*600/,
    )
    // Control pozitiv: tiparul chiar prinde forma pe care o vaneaza.
    expect(
      'de la 18,66 px la greutatea 600;'.match(/18,66\s*px\s*(?:cu|la)\s*greutatea\s*600/),
      'tiparul pragului refuzat nu prinde martorul',
    ).not.toBeNull()
  })

  it('cifrele de contrast si pragul diacriticelor sunt scrise in globals.css si in DIRECTIA.md', () => {
    // `3,77` e cifra pe care se sprijina regula „albastru-2 nu se scrie pe negru". A stat scrisa
    // `3,86` in patru locuri si nicio proba n-o cerea, deci nimeni n-a recalculat-o: valoarea
    // reala a lui #0066cc pe #000000 e 3,7725. De aici incolo o cere lista de mai jos.
    for (const cifra of ['16,83', '3,62', '5,07', '4,70', '5,57', '6,96', '19,29', '3,77']) {
      expect(CSS, 'globals.css nu scrie contrastul ' + cifra).toContain(cifra)
    }
    for (const cifra of ['16,83', '3,62', '5,07', '6,96', '3,77']) {
      expect(DIRECTIA, 'DIRECTIA.md nu scrie contrastul ' + cifra).toContain(cifra)
    }
    // Si cifra scrisa trebuie sa fie CEA CALCULATA, nu una apropiata: se reface din valorile
    // paletei, cu martorii alaturi.
    expect(contrast(valoare('albastru-2'), valoare('negru'))).toBeCloseTo(3.77, 2)
    expect(CSS, 'globals.css nu scrie pragul masurat al diacriticelor').toContain('1,190')
    expect(DIRECTIA, 'DIRECTIA.md nu scrie urcarea masurata a lui I cu circumflex').toContain('0,945')
    expect(DIRECTIA, 'DIRECTIA.md nu scrie coborarea masurata a virgulei').toContain('0,245')
  })

  it('fiecare jeton de culoare definit in globals.css e explicat in DIRECTIA.md', () => {
    const definite = [...CSS.matchAll(/--color-([a-z0-9-]+):/g)].map((m) => m[1])
    expect(definite.length, 'blocul de paleta din globals.css pare gol').toBeGreaterThan(8)
    for (const j of definite) {
      expect(DIRECTIA, 'DIRECTIA.md nu numeste jetonul ' + j).toContain(j)
    }
  })
})

describe('litera si scara', () => {
  it('se incarca o singura familie, Inter, si toate jetoanele de familie arata catre ea', () => {
    const layout = readFileSync(join(RADACINA, 'src', 'app', 'layout.tsx'), 'utf8')
    const importuri = layout.match(/from "next\/font\/google"/g) ?? []
    expect(importuri.length, 'mai mult sau mai putin de un import de font').toBe(1)
    expect(layout, 'fontul nu e Inter').toMatch(/Inter\(/)
    // Doua greutati, 400 si 600: 700 nu se incarca, fiindca REF-A n-are titluri mai grele.
    expect(layout).toMatch(/weight:\s*\["400",\s*"600"\]/)
    expect(layout, 'lipseste subsetul latin-ext, fara de care s si t cu virgula cad pe alt font').toMatch(
      /subsets:\s*\["latin",\s*"latin-ext"\]/,
    )
    const familii = [...CSS.matchAll(/--font-(afis|vitrina|mono|sans|serif):\s*([^;]+);/g)]
    expect(familii.length, 'jetoanele de familie lipsesc din globals.css').toBeGreaterThan(2)
    for (const [, nume, val] of familii) {
      expect(val, 'jetonul --font-' + nume + ' nu arata catre familia unica').toContain('var(--fnt-text)')
    }
  })

  it('titlurile sunt la 600 si nu sunt majuscule nicaieri', () => {
    const baza = CSS.match(/h1,\s*\n\s*h2,\s*\n\s*h3,\s*\n\s*h4\s*\{([\s\S]*?)\}/)
    expect(baza, 'nu gasesc regula de baza h1..h4').not.toBeNull()
    expect(baza![1], 'titlurile nu sunt la greutatea 600').toMatch(/font-weight:\s*600\s*;/)
    expect(baza![1], 'titlurile nu declara text-transform: none').toMatch(/text-transform:\s*none\s*;/)
    const cuMajuscule: string[] = []
    for (const cale of fisiereTsx(SURSA)) {
      const cod = faraComentarii(readFileSync(cale, 'utf8'))
      if (/\buppercase\b/.test(cod)) cuMajuscule.push(relativa(cale))
    }
    expect(cuMajuscule, 'clase `uppercase` ramase in src/').toEqual([])
  })

  // Evaluator minim de valori CSS, pentru jetoanele scarii: numar fara unitate, `px`, `rem`, si
  // `clamp(minim, preferat, maxim)` unde fiecare parte e o suma de termeni `px`/`rem`/`vw`. Nu e
  // un motor CSS: acopera exact formele folosite in globals.css, si crapa daca apare alta -
  // tacerea ar fi mai rea decat eroarea.
  const px = (termen: string, latime: number): number => {
    let total = 0
    const gasite = termen.match(/-?[0-9.]+(?:px|rem|vw)/g)
    if (!gasite) throw new Error('nu stiu sa evaluez termenul CSS: ' + termen)
    for (const t of gasite) {
      const n = parseFloat(t)
      if (t.endsWith('px')) total += n
      else if (t.endsWith('rem')) total += n * 16
      else total += (n / 100) * latime
    }
    return total
  }
  const evalueaza = (expr: string, latime: number): number => {
    const e = expr.trim()
    const c = e.match(/^clamp\((.+)\)$/)
    if (c) {
      const parti = c[1].split(',').map((s) => s.trim())
      if (parti.length !== 3) throw new Error('clamp cu alt numar de parti: ' + e)
      const [mn, pref, mx] = parti.map((p) => px(p, latime))
      return Math.min(Math.max(mn, pref), mx)
    }
    return px(e, latime)
  }
  const marimea = (css: string, jeton: string, latime: number) => {
    const fs = css.match(new RegExp('--text-' + jeton + ':\\s*([^;]+);'))
    if (!fs) throw new Error('nu gasesc --text-' + jeton)
    return evalueaza(fs[1], latime)
  }
  // Raportul REAL dintre pasul de rand si marimea literei, la o latime data. Cand inaltimea de
  // rand e un numar fara unitate, raportul e chiar acel numar, la orice latime.
  const raportLa = (css: string, jeton: string, latime: number): number => {
    const lh = css.match(new RegExp('--text-' + jeton + '--line-height:\\s*([^;]+);'))
    if (!lh) throw new Error('nu gasesc --text-' + jeton + '--line-height')
    const v = lh[1].trim()
    if (/^[0-9.]+$/.test(v)) return Number(v)
    return evalueaza(v, latime) / marimea(css, jeton, latime)
  }
  const raportMinim = (css: string, jeton: string): { r: number; la: number } => {
    let r = Infinity
    let la = 0
    for (let w = 320; w <= 1920; w++) {
      const x = raportLa(css, jeton, w)
      if (x < r) {
        r = x
        la = w
      }
    }
    return { r, la }
  }

  it('marimile literei sunt EXACT cele masurate pe REF-A, la amandoua capetele', () => {
    // Cifrele sunt cele din fisa referintei, citite din stilurile calculate la 1440 si la 390.
    // Capetele inguste ale lui `afirmatie` si `titlu-1` sunt ALESE de noi (referinta nu si-a
    // masurat pagina de produs pe telefon) si scrise ca atare in globals.css.
    const CERUT: Array<[string, number, number]> = [
      ['afirmatie', 1440, 80],
      ['afirmatie', 390, 40],
      ['titlu-1', 1440, 64],
      ['titlu-1', 390, 40],
      ['tigla', 1440, 56],
      ['tigla', 390, 32],
      ['titlu-2', 1440, 48],
      ['titlu-2', 390, 32],
      ['titlu-3', 1440, 40],
      ['titlu-3', 390, 32],
      ['subtitlu-tigla', 1440, 28],
      ['subtitlu-tigla', 390, 19],
      ['subtitlu', 1440, 21],
      ['subtitlu', 390, 19],
      ['capitol', 1440, 21],
      ['capitol', 390, 19],
    ]
    for (const [jeton, latime, cerut] of CERUT) {
      expect(marimea(CSS, jeton, latime), jeton + ' la ' + latime + ' px').toBeCloseTo(cerut, 2)
    }
    // Treptele fixe, care nu se schimba cu latimea.
    expect(CSS, 'eticheta de capitol nu e 24 px').toMatch(/--text-titlu-4:\s*24px/)
    expect(CSS, 'titlul de card juridic nu e 20 px').toMatch(/--text-titlu-card:\s*20px/)
    expect(CSS, 'corpul nu e 17 px').toMatch(/--text-corp:\s*17px/)
    expect(CSS, 'nota nu e 14 px').toMatch(/--text-nota:\s*14px/)
    expect(CSS, 'treapta de 12 px a barelor si a subsolului lipseste').toMatch(/--text-mic:\s*12px/)
    // MARTOR: evaluatorul chiar calculeaza, nu intoarce mereu aceeasi cifra.
    expect(evalueaza('clamp(2rem, 3.8889vw, 3.5rem)', 1440)).toBeCloseTo(56, 2)
    expect(evalueaza('clamp(2rem, 3.8889vw, 3.5rem)', 390)).toBeCloseTo(32, 2)
  })

  it('inaltimea de rand trece pragul MASURAT al diacriticelor romanesti', () => {
    // PRAGUL NU E MOSTENIT, e masurat pe Inter, pe pagina construita, cu TextMetrics: urcarea
    // maxima 0,945 em (I / A cu circumflex sau breve) plus coborarea maxima 0,245 em (S / T cu
    // virgula) = 1,190 em. Sub el, un I cu circumflex de pe randul al doilea intra in virgula
    // unui s de pe primul. Referinta da 1,05-1,17 pe treptele de titlu, fiindca textul ei e in
    // alta limba; noi ridicam PASUL DE RAND, niciodata marimea literei.
    const PRAG = 1.19
    for (const jeton of ['afirmatie', 'titlu-1', 'tigla', 'titlu-2', 'titlu-3', 'titlu-4',
                         'subtitlu-tigla', 'subtitlu', 'capitol', 'titlu-card', 'corp', 'nota', 'mic']) {
      const { r, la } = raportMinim(CSS, jeton)
      expect(r, jeton + ' scade sub pragul diacriticelor la ' + la + ' px').toBeGreaterThanOrEqual(PRAG)
    }

    // MARTOR POZITIV, in AMANDOUA formele in care defectul poate aparea. Fara el, trecerea de
    // mai sus nu dovedeste nimic. Prima e chiar cifra referintei: 80 / 84 = 1,05.
    const caReferinta = '--text-afirmatie: 80px; --text-afirmatie--line-height: 84px;'
    expect(raportMinim(caReferinta, 'afirmatie').r, 'martor pozitiv (cifra referintei) NU a fost prins').toBeLessThan(PRAG)
    // A doua: aceeasi greseala ascunsa intr-un clamp, care la 1440 da tot 1,05.
    const clampSubPrag =
      '--text-afirmatie: clamp(2.5rem, 5.5556vw, 5rem); --text-afirmatie--line-height: clamp(2.75rem, 5.8333vw, 5.25rem);'
    expect(raportMinim(clampSubPrag, 'afirmatie').r, 'martor pozitiv (clamp sub prag) NU a fost prins').toBeLessThan(PRAG)
    // MARTOR NEGATIV: valoarea din arbore, care trebuie sa treaca.
    expect(raportMinim(CSS, 'afirmatie').r, 'martor negativ respins pe nedrept').toBeGreaterThanOrEqual(PRAG)

    const baza = CSS.match(/h1,\s*\n\s*h2,\s*\n\s*h3,\s*\n\s*h4\s*\{([\s\S]*?)\}/)
    const pas = baza![1].match(/line-height:\s*([0-9.]+)\s*;/)
    expect(pas, 'regula de baza h1..h4 nu are line-height').not.toBeNull()
    expect(Number(pas![1]), 'line-height de baza sub pragul diacriticelor').toBeGreaterThanOrEqual(PRAG)
  })
})

describe('forma: pastila, cardul de 28, zero umbre', () => {
  it('razele REF-A exista ca jetoane, si nu mai exista niciun jeton de umbra', () => {
    for (const raza of ['buton', 'pastila', 'card', 'card-mare']) {
      expect(CSS, 'lipseste raza --radius-' + raza).toContain('--radius-' + raza + ':')
    }
    expect(CSS, 'pastila nu are 980 px').toMatch(/--radius-pastila:\s*980px/)
    expect(CSS, 'cardul nu are 28 px').toMatch(/--radius-card:\s*28px/)
    expect(CSS, 'raza mostenita `buton` nu da o pastila').toMatch(/--radius-buton:\s*980px/)
    // Umbre: niciuna, nici macar definita. Cat timp exista una, „doar o umbra mica aici" e la o
    // clasa distanta.
    expect(CSS, 'a ramas un jeton de umbra in paleta').not.toMatch(/--shadow-[a-z-]+:/)
  })

  it('cardul nu poarta umbra si se desparte prin culoare de fundal', () => {
    const card = faraComentarii(readFileSync(join(COMPONENTE, 'Card.tsx'), 'utf8'))
    expect(card, 'cardul static poarta umbra').not.toMatch(/\bshadow-/)
    expect(card, 'cardul nu se desparte prin culoare de fundal').toMatch(/bg-ceata|bg-alb/)
    expect(card, 'cardul nu are raza de 28').toMatch(/rounded-card/)
    // Si niciun `shadow-` in tot `src`: umbra nu mai exista in directie.
    const cuUmbra: string[] = []
    for (const cale of fisiereTsx(SURSA)) {
      const cod = faraComentarii(readFileSync(cale, 'utf8'))
      if (/\bshadow-[a-z]/.test(cod)) cuUmbra.push(relativa(cale))
    }
    expect(cuUmbra, 'clase de umbra ramase in src/').toEqual([])
  })

  it('butonul are cele patru feluri REF-A si cele trei marimi masurate', () => {
    const buton = readFileSync(join(COMPONENTE, 'Buton.tsx'), 'utf8')
    for (const fel of ['plin', 'alb', 'contur', 'text']) {
      expect(buton, 'lipseste felul de buton ' + fel).toContain(fel + ':')
    }
    expect(buton, 'butonul primar nu e albastru plin cu litera alba').toMatch(
      /plin:\s*"[^"]*bg-albastru\b[^"]*text-alb/,
    )
    expect(buton, 'butonul de pe tigla neagra nu e alb cu litera cerneala').toMatch(
      /alb:\s*"[^"]*bg-alb[^"]*text-cerneala/,
    )
    expect(buton, 'butonul secundar nu are conturul de 0,8 px').toMatch(/contur:[\s\S]{0,140}contur-albastru/)
    // Cele trei inaltimi masurate: 44 (17 px), 36 (14 px), 24 (12 px). Se recunosc dupa
    // captuseala, care e chiar cifra masurata pe referinta.
    expect(buton, 'lipseste pastila de 44 px').toContain('px-[21px] py-[11px]')
    expect(buton, 'lipseste pastila de 36 px').toContain('px-[15px] py-[8px]')
    expect(buton, 'lipseste pastila de 24 px').toContain('px-[10px] py-[3px]')
    // Toate butoanele sunt pastile: nicio alta raza pe niciun fel.
    expect(buton, 'un fel de buton nu e pastila').not.toMatch(/rounded-(?!pastila)[a-z]/)
  })

  it('conturul e desenat ca umbra interioara de 0,8 px, nu ca chenar', () => {
    // Ca sa nu mute inaltimea cu un pixel fata de pastila plina de langa el. Nu e umbra: n-are
    // difuzie si n-are deplasare.
    expect(CSS, 'lipseste conturul de 0,8 px').toMatch(
      /\.contur-albastru\s*\{\s*box-shadow:\s*inset 0 0 0 0\.8px var\(--color-albastru-2\)/,
    )
    expect(CSS, 'lipseste conturul pentru tigla neagra').toMatch(
      /\.contur-albastru-clar\s*\{\s*box-shadow:\s*inset 0 0 0 0\.8px var\(--color-albastru-clar\)/,
    )
  })

  it('fiecare tigla a paginii de start are exact un buton primar', () => {
    // In REF-A ecranul e TIGLA, deci regula „un singur buton primar pe ecran" se citeste pe
    // tigla. NU se numara clasele: butonul isi alege culoarea printr-un ternar (alb pe tigla
    // neagra, albastru pe cele deschise), deci amandoua ramurile stau in sursa si o numaratoare
    // de clase ar raporta doua butoane acolo unde se randeaza unul. Se numara INTENTIA - cate
    // legaturi primesc `actiune` - si se cere ca fiecare tigla din continut sa aiba exact una.
    const pagina = faraComentarii(readFileSync(PAGINA, 'utf8'))
    expect(
      [...pagina.matchAll(/href=\{t.actiune.href\}/g)].length,
      'grila randeaza alt numar de butoane primare decat unul pe tigla',
    ).toBe(1)
    expect(
      [...pagina.matchAll(/href=\{t.secundar.href\}/g)].length,
      'grila randeaza mai mult de un drum al doilea pe tigla',
    ).toBe(1)
    // Si in continut: fiecare tigla are un `actiune` si cel mult un `secundar`.
    const start = readFileSync(join(RADACINA, 'src', 'content', 'start.ts'), 'utf8')
    const tigle = (start.match(/^    titlu:/gm) || []).length
    const actiuni = (start.match(/^    actiune:/gm) || []).length
    const secundare = (start.match(/^    secundar:/gm) || []).length
    expect(tigle, 'nu mai gasesc tiglele in continut').toBeGreaterThan(5)
    expect(actiuni, 'o tigla fara buton primar, sau una cu doua').toBe(tigle)
    expect(secundare, 'mai multe drumuri secundare decat tigle').toBeLessThanOrEqual(tigle)
    // Controlul tiparului: forma cautata chiar exista in sursa paginii.
    expect(pagina, 'tiparul nu mai potriveste forma butonului primar').toMatch(/rounded-pastila/)
  })
})

describe('gramatica paginilor', () => {
  it('bara globala are 44 px, e sticla si nu mai are stare transparenta', () => {
    const nav = readFileSync(join(COMPONENTE, 'Navigatie.tsx'), 'utf8')
    expect(nav, 'bara nu are 44 px de la 768 in sus').toContain('md:h-[44px]')
    expect(nav, 'bara nu are 48 px pe telefon').toContain('h-[48px]')
    expect(nav, 'bara nu e alb translucid cu estompare').toMatch(/\bsticla\b/)
    expect(CSS, 'clasa sticla nu are backdrop-filter cu prefix pentru Safari').toMatch(
      /-webkit-backdrop-filter:\s*saturate\(180%\) blur\(20px\)/,
    )
    expect(CSS, 'clasa sticla nu e alb la 80%').toMatch(/\.sticla\s*\{[\s\S]*rgba\(255, 255, 255, 0\.8\)/)
    // Starea transparenta a disparut: nu mai exista ecran inchis peste care sa stea bara, deci
    // nici variabilele care o comutau. Nu se cauta `bg-transparent` - butonul de meniu il are pe
    // drept - ci chiar mecanismul: culoarea barei nu mai depinde de cale sau de derulare.
    expect(faraComentarii(nav), 'bara inca isi comuta culorile dupa erou').not.toMatch(/peErou|derulat/)
    expect(faraComentarii(nav), 'bara inca isi alege fundalul dupa cale').not.toMatch(/cale === "\/" \?/)
    // Panoul pliabil ramane HTML servit, cu contractul pe care il masoara proba de browser.
    expect(nav, 'panoul pliabil si-a pierdut identificatorul').toContain('id="meniu-pliabil"')
    expect(nav, 'butonul nu mai controleaza panoul').toContain('aria-controls="meniu-pliabil"')
  })

  it('bara locala exista, are 52 px, e lipicioasa si sta chiar sub bara globala', () => {
    const bara = readFileSync(join(COMPONENTE, 'BaraLocala.tsx'), 'utf8')
    expect(bara, 'bara locala nu are 52 px').toContain('md:h-[52px]')
    expect(bara, 'bara locala nu e lipicioasa').toMatch(/\bsticky\b/)
    expect(bara, 'bara locala nu se opreste sub bara globala').toContain('md:top-[44px]')
    expect(bara, 'ancorele barei locale nu sunt de 12 px').toMatch(/text-mic/)
    expect(bara, 'bara locala nu are pastila de 24 px').toContain('px-[10px] py-[3px]')
    // Si chiar e folosita: navigarea in pagina a paginilor interioare trece prin ea, altfel
    // componenta ar fi cod scris si niciodata randat.
    const ancore = readFileSync(join(COMPONENTE, 'SegmentAncore.tsx'), 'utf8')
    expect(ancore, 'navigarea in pagina nu foloseste bara locala').toContain('BaraLocala')
    // Filele-pastila care faceau navigarea in pagina nu mai exista deloc.
    expect(readdirSync(COMPONENTE), 'TabPastila a ramas in arbore').not.toContain('TabPastila.tsx')
  })

  it('pagina de start e facuta din tigle, fara erou colorat si fara banda CTA', () => {
    const pagina = faraComentarii(readFileSync(PAGINA, 'utf8'))
    expect(pagina, 'pagina de start nu mai randeaza tigle mari').toContain('ton="erou"')
    expect(pagina, 'pagina de start nu mai citeste cele trei tigle din continut').toMatch(/\bTIGLE\b/)
    expect(pagina, 'pagina de start nu mai citeste grila din continut').toMatch(/\bGRILA\b/)
    // Gradientul si cardul violet au disparut din CSS cu totul.
    expect(CSS, 'a ramas gradientul eroului').not.toMatch(/\.erou-violet/)
    expect(CSS, 'a ramas cardul cu gradient').not.toMatch(/\.card-violet/)
    // Banda CTA nu mai are culoare de brand nici in componenta ei.
    const cta = faraComentarii(readFileSync(join(COMPONENTE, 'BandaCTA.tsx'), 'utf8'))
    // Conteaza fundalul SECTIUNII, nu butonul din ea: pastila plina ramane albastra oriunde.
    const sectiune = cta.match(/<section className="([^"]+)"/)
    expect(sectiune, 'banda CTA nu mai are o sectiune cu fundal').not.toBeNull()
    expect(sectiune![1], 'banda CTA nu sta pe ceata').toContain('bg-ceata')
    expect(sectiune![1], 'banda CTA a ramas colorata').not.toMatch(/bg-(?:albastru|negru)/)
    // Si nu e chemata de pe pagina de start: chemarea la actiune sta in pastila fiecarei tigle.
    expect(pagina, 'pagina de start a ramas cu o banda CTA').not.toContain('BandaCTA')
  })

  it('tigla cu fotografie: legata la 1440, iar sub 768 fotografia are 320 px ficsi', () => {
    // Doua clase de defect, amandoua vazute pe pagina construita la 390:
    // (a) `min-h-[500px]` pe tigla e o PODEA, nu o inaltime: cutia fotografiei crestea la
    //     inaltimea proprie a cadrului (585 px) si tigla iesea 885-987 px, pagina 9784 px.
    // (b) `h-[500px]` pe tigla (cifra referintei) lasa fotografiei 97,8 px la 390: textul
    //     romanesc are 385 px, deci fotografia devenea o fasie - contra filosofiei „fotografii
    //     mari in tigle". Reparatia: sub 768 tigla creste cu textul si fotografia are 320 px
    //     ficsi; de la 768 ramane legata (692 / 580) cu fotografia pe `md:flex-1 md:min-h-0`.
    // Poarta de browser nu vede asta - ea masoara culori si roluri, nu inaltimi - deci regula
    // sta aici.
    const tigla = faraComentarii(readFileSync(join(COMPONENTE, 'Ecran.tsx'), 'utf8'))
    const pagina = faraComentarii(readFileSync(PAGINA, 'utf8'))
    for (const [nume, cod, legata] of [
      ['Ecran.tsx', tigla, 'md:h-[692px]'],
      ['page.tsx', pagina, 'md:h-[580px]'],
    ] as const) {
      expect(cod, nume + ': tigla e legata cu o podea la capatul ingust').not.toMatch(
        /min-h-\[500px\]/,
      )
      // Privirea inapoi conteaza: `min-h-[500px]` il contine pe `h-[500px]`.
      expect(cod, nume + ': tigla e legata la 500 px sub 768, fotografia ramane o fasie').not.toMatch(
        /(?<!min-)h-\[500px\]/,
      )
      expect(cod, nume + ': tigla nu mai e legata de la 768 in sus').toContain(legata)
      // Cutia fotografiei: 320 px ficsi sub 768 (nu podea), elastica de la 768.
      expect(cod, nume + ': fotografia nu are 320 px ficsi sub 768').toMatch(/(?<!min-)(?<!md:)h-\[320px\]/)
      expect(cod, nume + ': fotografia nu e elastica de la 768').toContain('md:flex-1')
      expect(cod, nume + ': fotografia poate creste peste tigla de la 768').toContain('md:min-h-0')
    }
    // Cutia fotografiei nu are voie sa-si impuna o podea proprie sub 768 px: podeaua ei era
    // chiar mecanismul prin care tigla crestea.
    expect(tigla, 'cutia fotografiei si-a recapatat podeaua').not.toMatch(/(?<!md:)min-h-\[[0-9]{3}px\]/)
    expect(pagina, 'cutia fotografiei din grila si-a recapatat podeaua').not.toMatch(
      /min-h-\[200px\]/,
    )
    // Control pozitiv: tiparele prind formele pe care le vaneaza.
    expect('flex min-h-[500px] flex-col'.match(/min-h-\[500px\]/), 'tiparul podelei nu prinde martorul').not.toBeNull()
    expect('flex h-[500px] flex-col'.match(/(?<!min-)h-\[500px\]/), 'tiparul inaltimii nu prinde martorul').not.toBeNull()
    expect('mt-10 h-[320px] w-full'.match(/(?<!min-)(?<!md:)h-\[320px\]/), 'tiparul celor 320 px nu prinde martorul').not.toBeNull()
    // Control NEGATIV: tiparele nu au voie sa se aprinda pe podea sau pe forma de la 768.
    expect('flex min-h-[500px] flex-col'.match(/(?<!min-)h-\[500px\]/), 'tiparul inaltimii se aprinde si pe podea').toBeNull()
    expect('min-h-[320px] md:h-[320px]'.match(/(?<!min-)(?<!md:)h-\[320px\]/), 'tiparul celor 320 px se aprinde pe podea sau pe md').toBeNull()
  })

  it('nu exista voal: fotografia nu poarta text peste ea nicaieri', () => {
    // Voalul era mecanismul prin care textul statea peste fotografie, si el cerea calibrare per
    // cadru, plus o masuratoare pe captura pentru fiecare fotografie noua, fiindca axe lasa
    // contrastul peste imagine in afara verdictului. In REF-A textul sta deasupra fotografiei,
    // in partea de sus a tiglei, deci mecanismul intreg dispare.
    for (const clasa of ['.voal', '.voal-banda', '.voal-bara']) {
      expect(CSS, 'a ramas definit ' + clasa).not.toContain(clasa + ' {')
    }
    const ecran = faraComentarii(readFileSync(join(COMPONENTE, 'Ecran.tsx'), 'utf8'))
    expect(ecran, 'Ecran inca pune un voal').not.toMatch(/voal/)
    expect(ecran, 'fotografia paginii interioare nu mai sta in card cu raza de 28').toMatch(/rounded-card/)
  })

  it('ancorele paginii de start raman, fiindca harta site-ului trimite la ele', () => {
    const rute = readFileSync(join(RADACINA, 'src', 'content', 'rute.ts'), 'utf8')
    const ancore = [...rute.matchAll(/ancora:\s*"([a-z-]+)"/g)].map((m) => m[1])
    expect(ancore.length, 'registrul de ancore pare gol').toBeGreaterThan(3)
    const pagina = readFileSync(PAGINA, 'utf8')
    const start = readFileSync(join(RADACINA, 'src', 'content', 'start.ts'), 'utf8')
    const lipsa = ancore.filter(
      (a) => !pagina.includes('id="' + a + '"') && !start.includes('cheie: "' + a + '"'),
    )
    expect(lipsa, 'ancore fara tinta pe pagina de start').toEqual([])
  })

  it('fotografiile paginii de start exista in ambele marimi si se declara ilustrative', () => {
    const start = readFileSync(join(RADACINA, 'src', 'content', 'start.ts'), 'utf8')
    const nume = [...start.matchAll(/nume:\s*"([a-z]+)"/g)].map((m) => m[1])
    expect(nume.length, 'pagina de start nu mai foloseste nicio fotografie').toBeGreaterThan(3)
    // Fiecare cadru apare o SINGURA data pe pagina: acelasi cadru de doua ori, la marimea la
    // care il pune REF-A, se citeste ca greseala de montaj.
    expect(new Set(nume).size, 'un cadru apare de doua ori pe pagina de start').toBe(nume.length)
    const existente = new Set(readdirSync(join(RADACINA, 'public', 'img')))
    for (const n of nume) {
      for (const marime of ['1920', '960']) {
        expect(existente.has(n + '-' + marime + '.webp'), 'lipseste ' + n + '-' + marime).toBe(true)
      }
    }
    const alturi = [...start.matchAll(/alt:\s*"([^"]+)"/g)].map((m) => m[1])
    expect(alturi.length, 'fotografii fara text alternativ').toBe(nume.length)
    for (const a of alturi) expect(a, 'alt fara mentiunea ilustrativa: ' + a).toMatch(/ilustrativ/)
  })

  it('registrul de fotografii numeste doar fisiere care exista, in ambele marimi', () => {
    const registru = readFileSync(join(RADACINA, 'src', 'content', 'fotografii.ts'), 'utf8')
    const nume = [...registru.matchAll(/nume:\s*"([a-z]+)"/g)].map((m) => m[1])
    expect(nume.length, 'registrul de fotografii pare gol').toBeGreaterThan(5)
    const existente = new Set(readdirSync(join(RADACINA, 'public', 'img')))
    for (const n of nume) {
      for (const marime of ['1920', '960']) {
        expect(existente.has(n + '-' + marime + '.webp'), 'lipseste ' + n + '-' + marime).toBe(true)
      }
    }
  })

  it('textele noi ale paginii de start stau in continut, nu in componenta', () => {
    const start = readFileSync(join(RADACINA, 'src', 'content', 'start.ts'), 'utf8')
    for (const cheie of ['TIGLE', 'GRILA', 'INCREDERE', 'NOTE']) {
      expect(start, 'lipseste blocul de text ' + cheie).toContain('export const ' + cheie)
    }
    // Vocea REF-A: fiecare titlu de tigla e o propozitie cu PUNCT la final, de cel mult sase
    // cuvinte. Nu e stil, e chiar regula pe care o masoara referinta in fiecare tigla.
    const tigle = start.slice(start.indexOf('export const TIGLE'), start.indexOf('export const INCREDERE'))
    const titluri = [...tigle.matchAll(/^\s*titlu:\s*"([^"]+)",$/gm)].map((m) => m[1])
    expect(titluri.length, 'nu mai exista titluri de tigla in continut').toBeGreaterThan(5)
    for (const t of titluri) {
      expect(t, 'titlu de tigla fara punct la final: ' + t).toMatch(/[.?]$/)
      expect(t.split(/\s+/).length, 'titlu de tigla mai lung de sase cuvinte: ' + t).toBeLessThanOrEqual(6)
    }
    // Si pagina chiar le citeste de acolo, in loc sa-si scrie propriile siruri.
    const pagina = readFileSync(PAGINA, 'utf8')
    expect(pagina, 'pagina de start nu citeste textele din continut').toContain('@/content/start')
  })

  it('subsolul sta pe ceata, scrie la 12 px si nu mai are buton', () => {
    const subsol = faraComentarii(readFileSync(join(COMPONENTE, 'Subsol.tsx'), 'utf8'))
    expect(subsol, 'subsolul nu mai sta pe ceata').toMatch(/bg-ceata/)
    expect(subsol, 'subsolul nu scrie la 12 px').toMatch(/text-mic/)
    expect(subsol, 'subsolul are cinci coloane').toMatch(/lg:grid-cols-5/)
    // Pe ceata, la 12 px, trec doar `cerneala` si `cerneala-3`.
    expect(subsol, 'text sub prag pe ceata, in subsol').not.toMatch(/text-cerneala-2|text-albastru-clar/)
    // Fara chemare la actiune: butonul de aici era al doilea buton primar al fiecarei pagini.
    expect(subsol, 'subsolul si-a recapatat butonul').not.toMatch(/bg-albastru\b/)
  })

  it('pe negru se scrie ceata si albastru-clar, pe deschis niciodata albastru-clar', () => {
    const banda = faraComentarii(readFileSync(join(COMPONENTE, 'BandaIncredere.tsx'), 'utf8'))
    expect(banda, 'banda de incredere nu mai sta pe negru').toMatch(/bg-negru/)
    expect(banda, 'banda de incredere nu scrie cu ceata').toMatch(/text-ceata/)
    // Tiparul cere ca dupa nume sa NU urmeze cratima: altfel `text-albastru-clar`, singura
    // culoare de legatura permisa pe negru, ar fi prinsa de `text-albastru` si proba s-ar
    // inrosi exact pe forma corecta.
    expect(banda, 'pe negru s-a strecurat o culoare de deschis').not.toMatch(
      /text-(?:cerneala|cerneala-2|cerneala-3|albastru|albastru-2)(?![-\w])/,
    )
    expect(banda, 'banda nu foloseste albastru-clar pentru eticheta').toMatch(/text-albastru-clar/)
    // Si regula generala, pe tot `src`: `albastru-clar` (3,02:1 pe alb) nu are voie sa apara
    // decat in fisiere care au si o suprafata neagra sub el.
    const gresite: string[] = []
    for (const cale of fisiereTsx(SURSA)) {
      const cod = faraComentarii(readFileSync(cale, 'utf8'))
      if (!/\b(?:hover:)?text-albastru-clar\b/.test(cod)) continue
      if (!/bg-negru|peNegru|inchis|fundal === "negru"|#141414/.test(cod)) gresite.push(relativa(cale))
    }
    expect(gresite, 'albastru-clar scris in fisiere fara suprafata neagra').toEqual([])
  })

  it('notele numerotate ale paginii de start au tinta si stau la 12 px', () => {
    const pagina = faraComentarii(readFileSync(PAGINA, 'utf8'))
    const start = readFileSync(join(RADACINA, 'src', 'content', 'start.ts'), 'utf8')
    const identificatori = [...start.matchAll(/id:\s*"(nota-\d+)"/g)].map((m) => m[1])
    expect(identificatori.length, 'pagina de start nu mai are note numerotate').toBeGreaterThan(1)
    expect(pagina, 'notele nu se randeaza cu identificatorul lor').toMatch(/id=\{n\.id\}/)
    expect(pagina, 'notele nu sunt la 12 px').toMatch(/text-mic/)
    // Exponentul din banda trimite la prima nota, deci ancora chiar are tinta.
    expect(pagina, 'exponentul nu trimite la nota').toMatch(/href=\{"#" \+ NOTE\[0\]\.id\}/)
    // Si nota despre ce NU detinem e scrisa, nu ocolita.
    expect(start, 'nota despre certificarea pe care nu o detinem a disparut').toMatch(/Nu deținem certificare/)
  })
})

/**
 * FELIA 3 (pre-valul S2-b0): eroul de pagina interioara si capitolul, construite o singura data
 * ca sa nu le scrie diferit cele trei felii ale valului urmator.
 *
 * CE CLASA DE DEFECT INCHID CAZURILE DE AICI, si de ce nu o inchide nimic altceva:
 *   - eroul se intoarce tacut la grila de doua coloane a directiei anterioare (fotografia intr-un
 *     card la dreapta). `typecheck`, `lint` si `build` nu vad clase Tailwind, iar `axe` nu se uita
 *     la asezare: totul ar ramane verde.
 *   - ultimul cuvant al afirmatiei inceteaza sa mai fie colorat, sau - mai rau - se coloreaza si
 *     acolo unde nu se poate sti unde se termina, adica pe un titlu compus din elemente.
 *   - h1-ul se sparge in doua elemente ca sa se coloreze mai usor, si cititorul de ecran primeste
 *     doua propozitii in loc de una.
 *   - griul de 21 px al referintei se intoarce chiar in capitol, singurul loc din care a fost scos.
 *
 * CUM SE RANDEAZA COMPONENTELE INTR-O PROBA DE NOD. `tsconfig.json` are `jsx: preserve` - asa
 * cere Next - iar Vite, care transforma fisierele probei, ar citi aceeasi setare si ar lasa JSX-ul
 * netransformat. `vitest.config.ts` ii da probei `oxc.jsx.runtime = 'automatic'` (Vite 8 transforma cu
 * oxc) si aliasul `@/`, deci
 * componentele se importa DIRECT din `src/components`, cu calea lor reala. Prima varianta copia
 * fisierele in node_modules/.cache si le importa de acolo cu o cale literala: local trecea (copia
 * exista de la rularea dinainte), iar in CI `typecheck` - care ruleaza inaintea probelor - a picat
 * cu TS2307, fiindca acolo copia nu exista inca. O cale care exista doar dupa ce a rulat proba nu
 * poate fi verificata static de nimeni.
 */
describe('eroul de pagina interioara si capitolul', () => {
  const ANTET = readFileSync(join(COMPONENTE, 'AntetPagina.tsx'), 'utf8')
  const CAPITOL = readFileSync(join(COMPONENTE, 'Capitol.tsx'), 'utf8')

  const AFIRMATIE = 'Actul se cere\u00a0azi.'
  const textul = (html: string) => html.replace(/<[^>]*>/g, '')
  const h1ul = (html: string): string[] => Array.from(html.match(/<h1[\s\S]*?<\/h1>/g) ?? [])

  async function erou(prop: Record<string, unknown>) {
    const m = await import('../src/components/AntetPagina')
    return renderToStaticMarkup(
      createElement(m.default as never, {
        adresa: '/proba',
        fir: [{ text: 'Pagina de start', href: '/' }, { text: 'Proba' }],
        eticheta: 'Numele paginii',
        lead: 'Randul de sub afirmatie.',
        actiune: { href: '/contact', text: 'Discutie de 30 de minute' },
        secundar: { href: '/solutii', text: 'Toate domeniile' },
        imagine: { nume: 'rafturi', alt: 'Rafturi, fotografie ilustrativa', pozitie: 'center 50%' },
        ...prop,
      } as never),
    )
  }

  async function capitol(prop: Record<string, unknown>) {
    const m = await import('../src/components/Capitol')
    return renderToStaticMarkup(
      createElement(m.default as never, {
        id: 'capitolul',
        eticheta: 'Depozit',
        afirmatie: 'Hartia sta pe raft.',
        text: 'Paragraful capitolului.',
        ...prop,
      } as never),
    )
  }

  it('componentele randate sunt chiar cele din src/components, nu o copie', async () => {
    // CONTROLUL mecanismului de mai jos: proba importa sursa livrata, cu calea ei reala, si
    // functia randata poarta numele exportului din fisier. Prima varianta randa o copie din
    // node_modules/.cache; daca cineva reintroduce copia, calea de aici nu se mai potriveste.
    const antet = await import('../src/components/AntetPagina')
    const capitol = await import('../src/components/Capitol')
    expect(typeof antet.default, 'AntetPagina nu exporta o componenta').toBe('function')
    expect(typeof capitol.default, 'Capitol nu exporta o componenta').toBe('function')
    expect(ANTET, 'sursa nu mai exporta implicit AntetPagina').toMatch(/export default function AntetPagina/)
    expect(CAPITOL, 'sursa nu mai exporta implicit Capitol').toMatch(/export default function Capitol/)
  })

  it('eroul nu mai are grila de doua coloane si nu mai trece prin Ecran', async () => {
    const GRILA = /\bmd:grid-cols-|\bmd:grid\b/
    const IMPORT_ECRAN = /import\s+Ecran\s+from\s+"\.\/Ecran"/
    expect(faraComentarii(ANTET), 'eroul si-a recapatat grila de doua coloane').not.toMatch(GRILA)
    expect(ANTET, 'eroul inca importa Ecran').not.toMatch(IMPORT_ECRAN)
    // Si pe rezultatul randat, nu doar pe sursa: nicio clasa de grila in tot eroul.
    const html = await erou({ titlu: AFIRMATIE })
    expect(html, 'eroul randeaza o grila').not.toMatch(/class="[^"]*\bgrid\b/)
    // MARTORI POZITIVI: tiparele prind chiar formele pe care le vaneaza - asezarea veche a
    // antetului si importul vechi, amandoua citate din fisierul de dinainte de felia asta.
    expect(
      'md:grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:items-center'.match(GRILA),
      'tiparul de grila nu prinde asezarea veche',
    ).not.toBeNull()
    expect(
      'import Ecran from "./Ecran";'.match(IMPORT_ECRAN),
      'tiparul de import nu prinde importul vechi',
    ).not.toBeNull()
    expect(
      '<div class="mt-10 grid gap-4">'.match(/class="[^"]*\bgrid\b/),
      'tiparul randat nu prinde martorul',
    ).not.toBeNull()
  })

  it('fotografia eroului vine INAINTEA textului si ocupa toata latimea, nu un card la dreapta', async () => {
    // Ordinea e cea a capturii referintei (produs-1440-fold: fotografia, apoi numele si
    // afirmatia), nu cea pe care o insiruise fisa REF-A.md §4.2 - vezi antetul din AntetPagina.
    const html = await erou({ titlu: AFIRMATIE })
    const laH1 = html.indexOf('<h1')
    const laFoto = html.indexOf('<img')
    const laFir = html.indexOf('</nav>')
    expect(laH1, 'eroul nu mai are h1').toBeGreaterThan(-1)
    expect(laFoto, 'eroul nu mai randeaza fotografia').toBeGreaterThan(-1)
    expect(laFir, 'eroul nu mai are firul de navigare').toBeGreaterThan(-1)
    expect(laFoto, 'fotografia a ajuns dupa afirmatie').toBeLessThan(laH1)
    expect(laFoto, 'fotografia a ajuns inaintea firului de navigare').toBeGreaterThan(laFir)
    // Cutia fotografiei e pe toata latimea containerului si pastreaza raza de 28.
    expect(html, 'cutia fotografiei nu mai e pe toata latimea').toMatch(
      /<div class="[^"]*\bw-full\b[^"]*\brounded-card\b[^"]*"><picture/,
    )
    // MARTOR POZITIV: pe o insiruire in care fotografia sta DUPA titlu (forma veche), comparatia
    // de ordine trebuie sa cada. Fara el, „mai mic decat" ar trece si daca fotografia ar lipsi
    // (-1) - de asta e verificata si prezenta ei, mai sus.
    const invers = '</nav><h1>Titlu</h1><div><img src="x"/></div>'
    expect(invers.indexOf('<img') < invers.indexOf('<h1'), 'martorul de ordine nu e prins').toBe(
      false,
    )
  })

  it('ultimul cuvant al afirmatiei sta intr-un span albastru cand titlul e sir', async () => {
    const html = await erou({ titlu: AFIRMATIE })
    const h1 = h1ul(html)
    expect(h1.length, 'eroul randeaza alt numar de h1 decat unul').toBe(1)
    expect(h1[0], 'afirmatia nu mai sta pe jetonul de 64 px').toContain('text-titlu-1')
    expect(h1[0], 'ultimul cuvant nu mai e colorat').toContain(
      '<span class="text-albastru-2">azi.</span>',
    )
    // Punctul final ramane in aceeasi culoare cu cuvantul: e in interiorul span-ului, nu dupa el.
    expect(h1[0], 'punctul a ramas in afara cuvantului colorat').not.toMatch(/<\/span>\s*\./)
    // h1-ul contine TOT textul, cu spatiul neintreruptibil pastrat exact asa cum e in continut.
    expect(textul(h1[0]), 'h1-ul nu mai contine propozitia intreaga').toBe(AFIRMATIE)
    expect(
      textul(h1[0]).includes('\u00a0'),
      'spatiul neintreruptibil s-a pierdut la taiere',
    ).toBe(true)
    // MARTOR POZITIV: un h1 in care cuvantul e lasat necolorat trebuie sa pice pe aceeasi cautare.
    expect(
      '<h1 class="text-titlu-1">Actul se cere azi.</h1>'.includes('text-albastru-2'),
      'martorul necolorat nu e prins',
    ).toBe(false)
  })

  it('un titlu care nu e sir se randeaza intreg, fara niciun cuvant colorat', async () => {
    // Nu se poate sti unde se termina ultimul cuvant intr-un arbore de elemente, iar o ghicitoare
    // ar colora ce nimereste. Deci regula e: se coloreaza NUMAI sirul.
    const compus = createElement('em', null, 'Titlu compus fara sir.')
    const html = await erou({ titlu: compus })
    const h1 = h1ul(html)
    expect(h1.length).toBe(1)
    expect(h1[0], 'un titlu compus a primit totusi culoare pe un cuvant').not.toContain(
      'text-albastru-2',
    )
    expect(textul(h1[0]), 'titlul compus nu se mai randeaza intreg').toBe('Titlu compus fara sir.')
    // Si o afirmatie de UN SINGUR cuvant: albastrul e un contrast fata de restul propozitiei, iar
    // un h1 colorat in intregime n-ar mai contrasta cu nimic.
    const singur = h1ul(await erou({ titlu: 'Nemasurat.' }))
    expect(singur[0], 'un titlu de un singur cuvant a fost colorat in intregime').not.toContain(
      'text-albastru-2',
    )
    expect(textul(singur[0])).toBe('Nemasurat.')
    // MARTOR NEGATIV al aceleiasi cautari: pe titlul de doua cuvinte ea TREBUIE sa gaseasca ceva,
    // altfel cele doua afirmatii de mai sus ar trece si daca span-ul n-ar exista niciodata.
    expect(
      h1ul(await erou({ titlu: AFIRMATIE }))[0],
      'cautarea nu gaseste culoarea nici acolo unde trebuie sa fie',
    ).toContain('text-albastru-2')
  })

  it('numele paginii si randul de sub afirmatie stau pe treptele masurate', async () => {
    const html = await erou({ titlu: AFIRMATIE })
    // Numele: 28 px la 1440 (19 la 390), greutatea 600, `cerneala` - 16,83:1 pe alb.
    expect(html, 'numele paginii nu mai e pe treapta de 28 px').toMatch(
      /<span class="[^"]*\btext-subtitlu-tigla\b[^"]*\bfont-semibold\b[^"]*\btext-cerneala\b/,
    )
    // Randul de sub afirmatie: 21 / 29 la greutatea 400. NU `font-semibold` - la 400 si 21 px
    // pragul e 4,5:1, iar `cerneala` da 16,83:1; griul de 3,62:1 al referintei n-ar trece nici
    // la 600, motiv scris in globals.css.
    const lead = html.match(/<p class="([^"]*)">Randul de sub afirmatie\.<\/p>/)
    expect(lead, 'nu mai gasesc randul de sub afirmatie').not.toBeNull()
    expect(lead![1], 'randul de sub afirmatie nu mai e pe jetonul de 21 / 29').toContain('text-lead')
    expect(lead![1], 'randul de sub afirmatie a fost ingrosat').not.toContain('font-semibold')
    expect(lead![1], 'randul de sub afirmatie a trecut pe alta cerneala').toContain('text-cerneala')
    expect(lead![1], 'randul de sub afirmatie scrie cu griul retras').not.toMatch(
      /\btext-cerneala-[23]\b/,
    )
    // MARTOR POZITIV pentru ultimele doua cautari, care sunt negatii: pe un sir care chiar poarta
    // formele vanate ele trebuie sa gaseasca.
    expect('mt-5 text-lead font-semibold text-cerneala-2'.includes('font-semibold')).toBe(true)
    expect(/\btext-cerneala-[23]\b/.test('mt-5 text-lead text-cerneala-2')).toBe(true)
  })

  it('capitolul sta in containerul de 980, cu afirmatia de 80 px si fara umbra', async () => {
    const html = await capitol({})
    expect(html, 'capitolul nu mai sta in containerul de 980').toContain('max-w-registru')
    expect(html, 'capitolul a primit alt container').not.toContain('max-w-vitrina')
    expect(html, 'afirmatia capitolului nu mai foloseste jetonul de 80 px').toMatch(
      /<h2 class="[^"]*\btext-afirmatie\b/,
    )
    expect(html, 'eticheta capitolului nu mai e pe treapta de 24 px').toMatch(
      /<span class="[^"]*\btext-titlu-4\b/,
    )
    expect(html, 'capitolul nu mai sta pe alb').toContain('bg-alb')
    // Rama copilului: raza 28, `ceata` pe alb, si NICIO umbra - nici ca jeton, nici ca clasa.
    const cuCopil = await capitol({ children: createElement('img', { src: '/x.webp', alt: 'a' }) })
    expect(cuCopil, 'rama capitolului si-a pierdut raza de 28').toMatch(
      /<div class="[^"]*\brounded-card\b[^"]*\bbg-ceata\b/,
    )
    expect(cuCopil, 'rama capitolului a primit o umbra').not.toMatch(/\bshadow-[a-z]/)
    expect(faraComentarii(CAPITOL), 'capitolul scrie o umbra in sursa').not.toMatch(/\bshadow-[a-z]/)
    // MARTORI POZITIVI: fiecare cautare negativa prinde forma pe care o vaneaza.
    expect(
      '<div class="rounded-card bg-ceata shadow-plutitor">'.match(/\bshadow-[a-z]/),
      'tiparul de umbra nu prinde martorul',
    ).not.toBeNull()
    expect(
      '<div class="mx-auto max-w-vitrina">'.includes('max-w-vitrina'),
      'tiparul de container nu prinde martorul',
    ).toBe(true)
  })

  it('paragraful capitolului e cerneala-3, NU griul de 21 px al referintei', async () => {
    // Singurul loc in care referinta foloseste #86868b e chiar paragraful asta. Rolul a fost
    // retras dupa o masuratoare cu axe (3,62:1, `serious` pe 20 din 22 de rute), iar capitolul e
    // prima componenta care il randeaza dupa retragere - deci si primul loc pe unde s-ar intoarce.
    const html = await capitol({})
    const p = html.match(/<p class="([^"]*)">/)
    expect(p, 'capitolul nu mai are paragraf').not.toBeNull()
    expect(p![1], 'paragraful capitolului nu mai e la 21 / 29').toContain('text-capitol')
    expect(p![1], 'paragraful capitolului nu mai e la greutatea 600').toContain('font-semibold')
    expect(p![1], 'paragraful capitolului a trecut pe griul retras').not.toMatch(
      /\btext-cerneala-2\b/,
    )
    expect(p![1], 'paragraful capitolului nu mai scrie cu cerneala-3').toContain('text-cerneala-3')
    // Cifra care sustine alegerea, recalculata aici din valori, cu martorii de la formula:
    // #86868b da 3,62:1 pe alb (sub 4,5), iar `cerneala-3` da 5,07:1.
    expect(contrast('#86868b', valoare('alb'))).toBeCloseTo(3.62, 2)
    expect(contrast(valoare('cerneala-3'), valoare('alb'))).toBeCloseTo(5.07, 2)
    // MARTOR POZITIV: pe clasa retrasa, cautarea trebuie sa se aprinda.
    expect(
      /\btext-cerneala-2\b/.test('mt-6 text-capitol font-semibold text-cerneala-2'),
      'tiparul griului retras nu prinde martorul',
    ).toBe(true)
  })

  it('capitolul centrat centreaza si cutiile, nu doar literele din ele', async () => {
    // `text-center` singur aliniaza literele in cutie, dar cutia ramane lipita la stanga si
    // afirmatia iese cu un umar mai lung decat celalalt. Amandoua clasele, sau niciuna.
    const centrat = await capitol({ aliniere: 'centrat' })
    const h2 = centrat.match(/<h2 class="([^"]*)">/)!
    expect(h2[1], 'afirmatia centrata nu si-a centrat literele').toContain('text-center')
    expect(h2[1], 'afirmatia centrata si-a lasat cutia la stanga').toContain('mx-auto')
    // Iar implicitul ramane stanga, ca pe referinta: centrarea e un gest, nu norma.
    const stanga = await capitol({})
    expect(
      stanga.match(/<h2 class="([^"]*)">/)![1],
      'capitolul e centrat implicit',
    ).not.toContain('text-center')
    // MARTOR POZITIV: cautarea `mx-auto` prinde exact defectul pe care il vaneaza - o cutie
    // centrata doar la litere.
    expect(
      'max-w-[17ch] text-afirmatie text-cerneala text-center'.includes('mx-auto'),
      'martorul cutiei necentrate nu e prins',
    ).toBe(false)
  })
})
