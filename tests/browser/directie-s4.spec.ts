import { expect, test, type Page } from '@playwright/test'

async function outsideViewport(page: Page) {
  return page.locator('header').evaluate(header => {
    const items = [...header.querySelectorAll('a,button')].filter(el => !!(el as HTMLElement).offsetParent)
    return items.filter(el => {const r=el.getBoundingClientRect(); return r.left<0 || r.right>innerWidth}).map(el=>el.textContent)
  })
}

test('demonstratia schimba impreuna intrebarea, raspunsul si sursa', async ({ page }) => {
  await page.goto('/')
  const demo = page.locator('.s4-demo')
  await expect(demo).toContainText('ilustrativ')
  const before = await demo.locator('.s4-demo-answer').innerText()
  const source = await demo.locator('.s4-demo-source').innerText()
  await demo.getByRole('button', {name:'Factură', exact:true}).click()
  await expect(demo.getByRole('button', {name:'Factură', exact:true})).toHaveAttribute('aria-pressed', 'true')
  await expect(demo.locator('.s4-demo-answer')).not.toHaveText(before)
  await expect(demo.locator('.s4-demo-source')).not.toHaveText(source)
  await expect(demo.locator('button[aria-pressed="true"]')).toHaveCount(1)
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')
  await expect(demo.getByRole('button', {name:'Proces-verbal', exact:true})).toHaveAttribute('aria-pressed', 'true')
})

test('antetul ramane in viewport la latimi de telefon, tableta si desktop', async ({ page }) => {
  for (const width of [320,390,768,1024,1440]) {
    await page.setViewportSize({width,height:900})
    await page.goto('/')
    expect(await outsideViewport(page), 'actiuni in afara ferestrei la '+width).toEqual([])
    await expect(page.locator('h1')).toBeVisible()
  }
})

test('martor POZITIV: detecteaza o actiune impinsa in afara ferestrei', async ({ page }) => {
  await page.setViewportSize({width:390,height:844})
  await page.setContent('<header><a href="/" style="position:absolute;left:500px">Depaseste</a></header>')
  expect(await outsideViewport(page)).toEqual(['Depaseste'])
})

test('martor NEGATIV: actiunile vizibile din fereastra nu sunt raportate', async ({ page }) => {
  await page.setViewportSize({width:390,height:844})
  await page.setContent('<header><a href="/">Corect</a><a href="/" style="display:none;position:absolute;left:500px">Ascuns</a></header>')
  expect(await outsideViewport(page)).toEqual([])
})

test('preferinta de miscare redusa opreste decorul', async ({ page }) => {
  await page.emulateMedia({reducedMotion:'reduce'})
  await page.goto('/')
  expect(await page.locator('.s4-hero-art').evaluate(el=>getComputedStyle(el).animationName)).toBe('none')
  expect(await page.locator('.s4-hero-art').evaluate(el=>(el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
})
