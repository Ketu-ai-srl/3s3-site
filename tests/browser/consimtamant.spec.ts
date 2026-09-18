import { expect, test } from '@playwright/test'
import { masoaraTerti } from './ajutor/detectori'
import {
  GAZDA_STRAINA_PIXEL,
  GAZDA_STRAINA_SCRIPT,
  pornesteFixturile,
  type ServerFixturi,
} from './ajutor/fixturi'
import { rutePublice } from './ajutor/proiect'

/**
 * `C-01` Zero retea terta si zero stocare inainte de orice interactiune. Poarta-mama a
 * sectiunii de consimtamant din PORTI-FABRICA.md.
 *
 * Pragul e ZERO, fara exceptii pentru fonturi, harti, video, chat sau CMP. Astazi site-ul
 * nu are terti (fonturile vin prin `next/font`, adica autogazduite la build), deci poarta
 * TRECE. Asta nu e un motiv sa fie mai slaba: e o poarta de regresie, si valoarea ei se
 * vede in ziua in care cineva lipeste un pixel.
 *
 * Ramura de banner nu e cod mort chiar daca site-ul nu are banner azi: martorii o executa
 * la fiecare rulare, deci nu poate putrezi in tacere pana la prima campanie platita.
 */

let fixturi: ServerFixturi

test.beforeAll(async () => {
  fixturi = await pornesteFixturile()
})

test.afterAll(async () => {
  await fixturi.oprire()
})

const rute = rutePublice()

test.describe('C-01 zero terti', () => {
  for (const ruta of rute) {
    test('pagina reala ' + ruta + ' nu contacteaza niciun tert', async ({ browser, baseURL }) => {
      const masura = await masoaraTerti(browser, (baseURL ?? '') + ruta)

      console.log(
        '[C-01] ' +
          ruta +
          ' | gazda proprie: ' +
          masura.gazdaProprie +
          ' | cereri totale: ' +
          masura.totalCereri +
          ' | gazde straine: ' +
          (masura.gazdeStraine.join(', ') || '(niciuna)') +
          ' | banner: ' +
          (masura.bannerGasit ? 'da, refuz apasat=' + masura.refuzApasat : 'nu exista'),
      )
      console.log(
        '    cookies: ' +
          (masura.cookies.join(', ') || '(niciunul)') +
          ' | chei de stocare: ' +
          (masura.cheiStocare.join(', ') || '(niciuna)'),
      )

      // O masuratoare care nu a vazut nicio cerere nu e "curata", e goala. Pagina isi
      // cere macar propriul document.
      expect(masura.totalCereri, 'nu s-a inregistrat nicio cerere pe ' + ruta).toBeGreaterThan(0)
      expect(masura.gazdeStraine, 'cereri catre terti pe ' + ruta).toEqual([])
      expect(masura.cookies, 'cookie-uri scrise fara consimtamant pe ' + ruta).toEqual([])
      expect(masura.cheiStocare, 'stocare locala scrisa fara consimtamant pe ' + ruta).toEqual([])
    })
  }

  test('martor POZITIV: script si pixel catre gazde straine TREBUIE sa o inroseasca', async ({
    browser,
  }) => {
    const masura = await masoaraTerti(browser, fixturi.baza + '/terti/rau')

    console.log('[C-01 martor pozitiv] gazde straine: ' + masura.gazdeStraine.join(', '))

    // Se cer AMBELE familii de subresursa. Un detector care ar asculta doar `<script>` ar
    // trece un pixel de urmarire, adica exact forma cea mai des folosita.
    expect(masura.gazdeStraine, 'scriptul strain nu a fost vazut').toContain(GAZDA_STRAINA_SCRIPT)
    expect(masura.gazdeStraine, 'pixelul strain nu a fost vazut').toContain(GAZDA_STRAINA_PIXEL)
  })

  test('martor POZITIV: banner care incarca tertul INAINTE de interactiune TREBUIE sa o inroseasca', async ({
    browser,
  }) => {
    const masura = await masoaraTerti(browser, fixturi.baza + '/terti/rau-banner')

    console.log(
      '[C-01 martor pozitiv, banner] banner gasit: ' +
        masura.bannerGasit +
        ' | refuz apasat: ' +
        masura.refuzApasat +
        ' | gazde straine: ' +
        masura.gazdeStraine.join(', '),
    )

    expect(masura.bannerGasit, 'bannerul fixturii nu a fost gasit').toBe(true)
    expect(masura.refuzApasat, 'butonul de refuz nu a fost apasat').toBe(true)
    expect(masura.gazdeStraine).toContain(GAZDA_STRAINA_SCRIPT)
  })

  test('martor NEGATIV: banner corect, cu refuz respectat, NU trebuie prins', async ({
    browser,
  }) => {
    const masura = await masoaraTerti(browser, fixturi.baza + '/terti/bun-banner')

    console.log(
      '[C-01 martor negativ, banner] banner gasit: ' +
        masura.bannerGasit +
        ' | refuz apasat: ' +
        masura.refuzApasat +
        ' | gazde straine: ' +
        (masura.gazdeStraine.join(', ') || '(niciuna)'),
    )

    // Fara verificarea pe `refuzApasat`, un detector care nu gaseste butonul ar trece
    // martorul negativ din motivul gresit: n-a apasat nimic, deci n-a incarcat nimic.
    expect(masura.bannerGasit).toBe(true)
    expect(masura.refuzApasat, 'ramura de refuz nu s-a executat, deci nu s-a masurat').toBe(true)
    expect(masura.gazdeStraine, 'poarta inroseste un banner care respecta refuzul').toEqual([])
  })

  test('martor NEGATIV: pagina fara terti NU trebuie prinsa', async ({ browser }) => {
    const masura = await masoaraTerti(browser, fixturi.baza + '/terti/bun')

    console.log(
      '[C-01 martor negativ] cereri totale: ' +
        masura.totalCereri +
        ' | gazde straine: ' +
        (masura.gazdeStraine.join(', ') || '(niciuna)'),
    )

    expect(masura.totalCereri).toBeGreaterThan(0)
    expect(masura.gazdeStraine).toEqual([])
  })
})
