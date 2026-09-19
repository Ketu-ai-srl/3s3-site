import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import AntetPagina from '../src/components/AntetPagina'
import Buton from '../src/components/Buton'
import DocumentDemo from '../src/components/DocumentDemo'
import { FOTOGRAFII } from '../src/content/fotografii'
import { DEMO, HOME, TIGLE } from '../src/content/start'

// REF-S inlocuieste specificatiile REF-A; motivul si limitele sunt in ADR-0006.
const read = (path: string) => readFileSync(join(__dirname, '..', path), 'utf8')
const css = read('src/app/globals.css')
const palette = Object.fromEntries([...css.matchAll(/--color-([\w-]+):\s*(#[\da-f]{6});/g)].map(m => [m[1], m[2]]))
function luminance(hex: string) {
  const c = hex.slice(1).match(/../g)!.map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4)
  return c[0] * .2126 + c[1] * .7152 + c[2] * .0722
}
function contrast(a: string, b: string) {
  const [lo, hi] = [luminance(a), luminance(b)].sort((a, b) => a - b)
  return (hi + .05) / (lo + .05)
}
const base = { fir: [{ text: 'Acasă', href: '/' }, { text: 'Documente' }], eticheta: 'Scan', titlu: 'Documentele în ordine.', adresa: '/documente' }
const hero = (props = {}) => renderToStaticMarkup(createElement(AntetPagina, { ...base, ...props }))

describe('paleta si accesibilitatea REF-S', () => {
  it('masoara independent contrastul, inclusiv martorul care nu trece', () => {
    expect(contrast('#000000', '#ffffff')).toBe(21)
    expect(contrast('#ffffff', '#ffffff')).toBe(1)
    expect(contrast('#aaaaaa', '#ffffff')).toBeLessThan(4.5)
  })
  it('pastreaza rolurile semantice folosite de paginile interioare', () => {
    expect(Object.keys(palette).sort()).toEqual(['cerneala','cerneala-3','albastru','albastru-2','albastru-clar','alb','ceata','negru','accent-nou'].sort())
    for (const role of Object.keys(palette)) expect(read('docs/design/DIRECTIA.md')).toContain('`' + role + '`')
  })
  it('textul si actiunile trec AA pe ambele suprafete deschise', () => {
    for (const ink of ['cerneala', 'cerneala-3', 'albastru-2', 'accent-nou']) {
      for (const bg of ['alb', 'ceata']) expect(contrast(palette[ink], palette[bg]), ink + '/' + bg).toBeGreaterThanOrEqual(4.5)
    }
  })
  it('butoanele pline si textul pe fond inchis trec AA', () => {
    expect(contrast(palette.alb, palette.albastru)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(palette.ceata, palette.negru)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(palette['albastru-clar'], palette.negru)).toBeGreaterThanOrEqual(4.5)
  })
  it('foloseste o singura familie si lasa spatiu diacriticelor', () => {
    expect(read('src/app/layout.tsx')).toMatch(/Inter/)
    for (const role of ['vitrina','afis','mono']) expect(css).toContain('--font-' + role + ': var(--fnt-text)')
    const lines = [...css.matchAll(/--text-[\w-]+--line-height:\s*([\d.]+)/g)]
    expect(lines.length).toBeGreaterThan(10)
    for (const line of lines) expect(Number(line[1])).toBeGreaterThanOrEqual(1.2)
  })
  it('respecta preferinta de miscare redusa si nu anima in bucla', () => {
    expect(css).toContain('@media (prefers-reduced-motion:reduce)')
    expect(css).toContain('animation:none !important')
    expect(css).not.toMatch(/animation:[^;}]*infinite/)
    expect(css).toContain(':focus-visible')
  })
})
describe('antetul paginilor, randat din componenta reala', () => {
  it('afiseaza un singur h1 si titlul integral', () => {
    const html = hero()
    expect((html.match(/<h1\b/g) || []).length).toBe(1)
    expect(html).toContain(base.titlu)
    expect(html).not.toContain('<picture>')
  })
  it('pastreaza titlurile React compuse', () => {
    expect(hero({ titlu: createElement('span', null, 'Titlu compus') })).toContain('<span>Titlu compus</span>')
  })
  it('imaginea are sursa mobila, dimensiuni si descrierea corecta', () => {
    const html = hero({ imagine: FOTOGRAFII.rafturi })
    expect(html).toContain('/img/rafturi-960.webp')
    expect(html).toContain('/img/rafturi-1920.webp')
    expect(html).toContain('width="1920"')
    expect(html).toContain(FOTOGRAFII.rafturi.alt)
    expect(html.indexOf('</h1>')).toBeLessThan(html.indexOf('<picture>'))
  })
  it('forma banda nu incarca fotografia decorativa', () => {
    const html = hero({ forma: 'banda', imagine: FOTOGRAFII.rafturi })
    expect(html).not.toContain('<picture>')
    expect(html).toContain('s4-inner-band')
  })
  it('firul vizibil si cel structurat au aceleasi destinatii', () => {
    const html = hero()
    expect(html).toContain('aria-label="Fir de navigare"')
    expect(html).toContain('aria-current="page">Documente')
    const json = JSON.parse(html.match(/<script[^>]+>(.*?)<\/script>/)![1])
    expect(json['@type']).toBe('BreadcrumbList')
    expect(json.itemListElement.map((item: {item: string}) => item.item)).toEqual(['https://3s3.ke2.in/', 'https://3s3.ke2.in/documente'])
    expect(json.itemListElement.map((item: {position: number}) => item.position)).toEqual([1,2])
  })
  it('o pagina informativa nu inventeaza o actiune', () => {
    expect(hero()).not.toContain('/contact')
    expect(hero({ lead: 'Descriere verificabilă.' })).toContain('Descriere verificabilă.')
  })
  it('actiunile configurate duc la destinatiile reale', () => {
    const html = hero({ actiune:{href:'/contact',text:'Discuție'}, secundar:{href:'/cum-functioneaza',text:'Proces'} })
    expect(html).toContain('href="/contact"')
    expect(html).toContain('href="/cum-functioneaza"')
    expect(html).toContain('Discuție')
    expect(html).toContain('Proces')
  })
})
describe('continutul si demonstratia', () => {
  it('demonstreaza explicit exemple ilustrative, fara a simula un serviciu conectat', () => {
    const html = renderToStaticMarkup(createElement(DocumentDemo))
    expect(html).toContain(DEMO.nota)
    expect(DEMO.nota.toLowerCase()).toContain('ilustrativ')
    expect(html).toContain('aria-live="polite"')
    expect(html).not.toContain('<form')
  })
  it('primul exemplu are raspuns si sursa, cu o singura selectie activa', () => {
    const html = renderToStaticMarkup(createElement(DocumentDemo))
    expect((html.match(/aria-pressed="true"/g) || []).length).toBe(1)
    expect((html.match(/<button\b/g) || []).length).toBe(DEMO.exemple.length)
    expect(html).toContain(DEMO.exemple[0].raspuns)
    expect(html).toContain(DEMO.exemple[0].sursa)
    expect(html).toContain(DEMO.exemple[0].pagina)
  })
  it('toate exemplele au surse si raspunsuri distincte', () => {
    expect(DEMO.exemple.length).toBe(3)
    expect(new Set(DEMO.exemple.map(e => e.raspuns)).size).toBe(3)
    for (const e of DEMO.exemple) {
      expect(e.intrebare.length).toBeGreaterThan(10)
      expect(e.sursa.length).toBeGreaterThan(5)
      expect(e.pagina.length).toBeGreaterThan(5)
    }
  })
  it('pastreaza continutul editorial separat si serviciile originale', () => {
    expect(HOME.titlu.length).toBeGreaterThan(10)
    expect(TIGLE.map(t => t.cheie)).toEqual(['scan','store','solve'])
    for (const t of TIGLE) expect(t.secundar.href).toMatch(/^\//)
  })
  it('decorul nu concureaza cu textul alternativ al fotografiilor', () => {
    expect(read('src/app/page.tsx')).toMatch(/s4-hero-art[^>]+alt=""/)
    expect(read('src/app/page.tsx')).toContain('fetchPriority="high"')
    expect(read('src/app/page.tsx')).toContain('loading="lazy"')
  })
  it('butonul ramane o legatura semantica fara sageata in numele accesibil', () => {
    // Semnatura componentei cere children in props chiar si in createElement.
    // eslint-disable-next-line react/no-children-prop
    const html = renderToStaticMarkup(createElement(Buton, {href:'/contact',sageata:true,children:'Contact'}))
    expect(html).toContain('href="/contact"')
    expect(html).toContain('aria-hidden="true"')
    expect(html).not.toContain('<button')
  })
})
