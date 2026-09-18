import { expect, test } from '@playwright/test'
import { rutePublice } from './ajutor/proiect'

/**
 * Meniul pliabil de sub 768 px: exista, se deschide, si nu se sprijina pe JavaScript.
 *
 * De ce exista proba. Bara de sus sta in `src/app/layout.tsx`, deci o intrare in plus nu
 * strica o pagina, le strica pe TOATE. Doua felii au lovit zidul asta independent, in
 * aceeasi zi, cu aceleasi cifre: scrollWidth 529, respectiv 487, la innerWidth 390, pe
 * toate cele cinci pagini de atunci. Poarta de derapaj le-a prins pe amandoua - deci
 * consecinta e deja aparata si nu se dubleaza aici.
 *
 * Ce NU era aparat, si e treaba probei asteia: mecanismul care face crestere posibila.
 * Un meniu pliabil se poate strica in trei feluri pe care derapajul nu le vede:
 *   1. panoul nu se mai deschide (butonul ramane, functia dispare);
 *   2. panoul pierde rute - creste site-ul, meniul nu;
 *   3. panoul ajunge sa fie construit din JavaScript, si atunci structura site-ului
 *      dispare pentru orice cititor care nu executa JS, agentii de cautare inclusi.
 * A treia e cea mai tacuta: pagina arata identic in browser si devine goala pentru masini.
 *
 * Latimea de 390 px e aceeasi ca la poarta de derapaj, si tot din brief, nu din catalog.
 */

const LATIME = 390

// `rutePublice()` umbla prin `src/app`, deci e SURSA INDEPENDENTA fata de manifest. Daca
// proba ar citi tot `RUTE`, ar compara manifestul cu el insusi si ar trece orice.
const RUTE_REALE = rutePublice()

test.use({ viewport: { width: LATIME, height: 844 } })

test.describe('Meniu pliabil la ' + LATIME + ' px', () => {
  test('pagina reala / are un panou care se deschide si se inchide', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const buton = page.locator('button[aria-controls="meniu-pliabil"]')
    const panou = page.locator('#meniu-pliabil')

    await expect(buton, 'nu exista butonul de meniu sub ' + LATIME + ' px').toHaveCount(1)
    await expect(panou, 'panoul e vizibil inainte de orice apasare').toBeHidden()
    await expect(buton).toHaveAttribute('aria-expanded', 'false')

    await buton.click()
    await expect(panou, 'panoul nu s-a deschis la apasare').toBeVisible()
    await expect(buton).toHaveAttribute('aria-expanded', 'true')

    const legaturi = await panou.locator('a').count()
    console.log(
      '[meniu] / | buton: 1 | legaturi in panou: ' +
        legaturi +
        ' | rute reale in src/app: ' +
        RUTE_REALE.length,
    )
    expect(legaturi, 'panoul deschis nu contine nicio legatura').toBeGreaterThan(0)

    // Escape inchide SI intoarce focalizarea pe buton. Un panou care se inchide fara sa
    // spuna unde a plecat focalizarea trimite urmatorul Tab la inceputul paginii.
    await page.keyboard.press('Escape')
    await expect(panou, 'Escape nu inchide panoul').toBeHidden()
    const peButon = await page.evaluate(
      () => document.activeElement?.getAttribute('aria-controls') === 'meniu-pliabil',
    )
    expect(peButon, 'dupa Escape focalizarea nu s-a intors pe buton').toBe(true)
  })

  test('panoul e in HTML-ul servit, nu construit din JavaScript', async ({ page, baseURL }) => {
    // Se cere pagina cu `fetch`, deci fara sa se execute JavaScript-ul ei: exact ce vede
    // un agent de cautare care nu randeaza. Daca panoul apare doar dupa hidratare, aici
    // lipseste, si asta e defectul pe care il vanam.
    const raspuns = await page.request.get(baseURL + '/')
    const brut = await raspuns.text()

    const arePanou = brut.includes('id="meniu-pliabil"')
    console.log(
      '[meniu HTML brut] contine panoul: ' + arePanou + ' | octeti: ' + brut.length,
    )
    expect(arePanou, 'panoul nu e in HTML-ul servit: se construieste din JavaScript').toBe(true)

    // Si legaturile din el, nu doar recipientul gol. Un panou prezent dar gol in HTML
    // trece prima verificare si pica exact la ce conteaza.
    const alteRute = RUTE_REALE.filter((r) => r !== '/')
    let gasite = 0
    for (const ruta of alteRute) if (brut.includes('href="' + ruta + '"')) gasite++
    console.log(
      '[meniu HTML brut] rute regasite: ' + gasite + ' din ' + alteRute.length,
    )
    expect(
      gasite,
      'nicio ruta reala nu se regaseste in HTML-ul servit al paginii de start',
    ).toBeGreaterThan(0)
  })

  test('martor POZITIV: un panou construit din JavaScript TREBUIE sa o inroseasca', async ({
    page,
  }) => {
    // Fixtura se asambleaza aici, la rulare, si imita exact defectul: butonul si panoul
    // apar abia dupa incarcare. Verificarea de mai sus se face pe HTML-ul INITIAL, deci
    // trebuie sa nu gaseasca nimic.
    const bucati = ['id=', '"meniu', '-pliabil"']
    const semnatura = bucati.join('')
    const paginaFalsa =
      '<!doctype html><html lang="ro"><body><header></header>' +
      '<script>' +
      'const d=document.createElement("div");' +
      'd.setAttribute("' + bucati[0].slice(0, -1) + '","meniu-pliabil");' +
      'd.innerHTML=\'<a href="/undeva">Undeva</a>\';' +
      'document.body.appendChild(d);' +
      '</script></body></html>'

    const initialAre = paginaFalsa.includes(semnatura)
    await page.setContent(paginaFalsa, { waitUntil: 'networkidle' })
    const dupaHidratareAre = (await page.locator('#meniu-pliabil').count()) === 1

    console.log(
      '[meniu martor pozitiv] in HTML-ul initial: ' +
        initialAre +
        ' | dupa executarea JS: ' +
        dupaHidratareAre,
    )

    expect(initialAre, 'martorul pozitiv nu imita defectul: panoul e deja in HTML').toBe(false)
    expect(dupaHidratareAre, 'martorul pozitiv nu a produs panoul deloc').toBe(true)
  })

  test('martor NEGATIV: un panou servit din HTML NU trebuie prins', async ({ page }) => {
    const paginaBuna =
      '<!doctype html><html lang="ro"><body>' +
      '<button aria-controls="meniu-pliabil" aria-expanded="false">Meniu</button>' +
      '<div id="meniu-pliabil" hidden><a href="/solutii">Domenii</a></div>' +
      '</body></html>'

    const initialAre = paginaBuna.includes('id="meniu-pliabil"')
    await page.setContent(paginaBuna, { waitUntil: 'networkidle' })
    const panou = page.locator('#meniu-pliabil')

    console.log('[meniu martor negativ] in HTML-ul initial: ' + initialAre)

    expect(initialAre, 'un panou servit din HTML a fost raportat ca lipsa').toBe(true)
    await expect(panou, 'un panou marcat hidden nu trebuie sa fie vizibil').toBeHidden()
  })
})
