import { createServer, type Server } from 'node:http'
import type { AddressInfo } from 'node:net'

/**
 * Serverul de fixturi: paginile-martor ale portilor de browser.
 *
 * Doua decizii care nu sunt de comoditate:
 *
 * 1. Fixturile se ASAMBLEAZA LA RULARE, din bucati, si nu stau ca fisiere `.html` in
 *    arbore. Motivul e platit deja pe alt proiect: o proba care poarta literal ce
 *    vaneaza devine ea insasi o instanta a defectului si inroseste alte porti
 *    (tipografie, limba, secrete) pe cod corect.
 * 2. Serverul asculta pe 127.0.0.1 cu port 0, adica port liber ales de sistem. Nicio
 *    constanta de port, deci nicio bomba cu ceas cand ruleaza doua loturi deodata.
 */

// Gazdele straine se compun din bucati, din acelasi motiv ca mai sus. TLD-ul `.invalid`
// e rezervat prin RFC 2606: nu se rezolva niciodata, deci controlul pozitiv nu produce
// trafic real catre nimeni. Cererea se INREGISTREAZA oricum de browser inainte de DNS,
// si exact asta masuram.
export const GAZDA_STRAINA_SCRIPT = ['cdn', 'a-treia-parte', 'invalid'].join('.')
export const GAZDA_STRAINA_PIXEL = ['pixel', 'masurare-externa', 'invalid'].join('.')

// PNG 1x1 transparent, ca fixturile de imagine sa nu ceara nimic din retea. O imagine
// adusa prin retea ar amesteca poarta de accesibilitate cu cea de terti.
const PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

const PARAGRAF_UNU =
  'Ridicam arhiva cu proces-verbal de predare-primire, masuram metrii liniari si sigilam cutiile in fata dumneavoastra, ca sa stiti exact ce a plecat din institutie.'
const PARAGRAF_DOI =
  'Fiecare unitate arhivistica primeste cota si intra in opis, dupa nomenclatorul institutiei, iar originalul ramane in raft cat timp copia devine cautabila.'

function pagina(titlu: string, corp: string, capSuplimentar = ''): string {
  return (
    '<!doctype html><html lang="ro"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<title>' +
    titlu +
    '</title>' +
    capSuplimentar +
    '</head><body>' +
    corp +
    '</body></html>'
  )
}

/** Corpul corect, folosit de TOATE martorii negativi: acelasi schelet, un singur defect injectat. */
function corpCorect(extra = ''): string {
  return (
    '<main><h1>Arhiva care raspunde</h1>' +
    '<p style="color:#1a1a1a;background:#ffffff">' +
    PARAGRAF_UNU +
    '</p>' +
    '<p style="color:#1a1a1a;background:#ffffff">' +
    PARAGRAF_DOI +
    '</p>' +
    '<img src="' +
    PIXEL +
    '" alt="Sigiliu de verificare" width="40" height="40">' +
    extra +
    '</main>'
  )
}

const PAGINI: Record<string, () => string> = {
  // --- accesibilitate -------------------------------------------------------
  // Martor pozitiv: contrast prost (serious) plus imagine fara text alternativ (critical).
  '/a11y/rau': () =>
    pagina(
      'Fixtura accesibilitate, defecta',
      '<main><h1>Arhiva care raspunde</h1>' +
        '<p style="color:#a8a8a8;background:#ffffff">' +
        PARAGRAF_UNU +
        '</p>' +
        '<img src="' +
        PIXEL +
        '" width="40" height="40">' +
        '</main>',
    ),
  '/a11y/bun': () => pagina('Fixtura accesibilitate, corecta', corpCorect()),

  // --- HTML brut ------------------------------------------------------------
  // Martor pozitiv: titlul si paragrafele exista DOAR daca ruleaza JavaScript.
  // E fix defectul masurat la concurent (cifrele lui sunt contoare animate).
  '/brut/rau': () =>
    pagina(
      'Se incarca',
      '<main><h1>Se incarca</h1><div id="continut"></div></main>' +
        '<script>' +
        'document.title=' +
        JSON.stringify('Arhiva care raspunde') +
        ';' +
        'document.getElementById("continut").innerHTML=' +
        JSON.stringify(
          '<p>' + PARAGRAF_UNU + '</p><p>' + PARAGRAF_DOI + '</p>',
        ) +
        ';</script>',
    ),
  // Martor negativ: acelasi continut, livrat de server, cu JavaScript doar decorativ.
  '/brut/bun': () =>
    pagina(
      'Arhiva care raspunde',
      corpCorect() +
        '<script>document.body.setAttribute("data-hidratat","1")</script>',
    ),

  // --- derapaj orizontal ----------------------------------------------------
  '/derapaj/rau': () =>
    pagina(
      'Fixtura derapaj, defecta',
      '<main><h1>Arhiva care raspunde</h1>' +
        '<div style="width:1200px;background:#1a1a1a;color:#ffffff">' +
        PARAGRAF_UNU +
        '</div></main>',
    ),
  '/derapaj/bun': () =>
    pagina(
      'Fixtura derapaj, corecta',
      '<style>*{box-sizing:border-box}body{margin:0}</style>' + corpCorect(),
    ),

  // --- terti si consimtamant ------------------------------------------------
  // Martor pozitiv 1: doua familii de subresurse straine, script si imagine, fara banner.
  '/terti/rau': () =>
    pagina(
      'Fixtura terti, defecta',
      corpCorect(
        '<img src="https://' +
          GAZDA_STRAINA_PIXEL +
          '/p.gif" alt="" role="presentation" width="1" height="1">',
      ),
      '<script src="https://' + GAZDA_STRAINA_SCRIPT + '/tracker.js"></script>',
    ),
  // Martor pozitiv 2: exista banner, dar tertul pleaca INAINTE de orice interactiune.
  // Fara cazul asta, poarta ar trece un site care intreaba politicos si incarca oricum.
  '/terti/rau-banner': () =>
    pagina(
      'Fixtura banner, defecta',
      corpCorect() +
        bannerHtml() +
        '<script>' +
        'var s=document.createElement("script");' +
        's.src="https://' +
        GAZDA_STRAINA_SCRIPT +
        '/tracker.js";document.head.appendChild(s);' +
        '</script>',
    ),
  // Martor negativ: banner care incarca tertul DOAR la accept. Refuzul trebuie sa lase
  // reteaua curata, iar proba verifica si ca butonul de refuz chiar a fost apasat.
  '/terti/bun-banner': () =>
    pagina(
      'Fixtura banner, corecta',
      corpCorect() +
        bannerHtml() +
        '<script>' +
        'document.querySelector("[data-accept]").addEventListener("click",function(){' +
        'var s=document.createElement("script");' +
        's.src="https://' +
        GAZDA_STRAINA_SCRIPT +
        '/tracker.js";document.head.appendChild(s);' +
        'document.querySelector("[data-consimtamant]").remove();});' +
        'document.querySelector("[data-refuz]").addEventListener("click",function(){' +
        'document.querySelector("[data-consimtamant]").remove();});' +
        '</script>',
    ),
  '/terti/bun': () => pagina('Fixtura terti, corecta', corpCorect()),

  // --- legaturi si imagini --------------------------------------------------
  // Martor pozitiv: legatura interna moarta, ancora inexistenta, imagine fara alt.
  '/legaturi/rau': () =>
    pagina(
      'Fixtura legaturi, defecta',
      '<main><h1>Arhiva care raspunde</h1>' +
        '<p>' +
        PARAGRAF_UNU +
        '</p>' +
        '<a href="/legaturi/ruta-care-nu-exista">Opisul complet</a>' +
        '<a href="#ancora-inexistenta">Sari la termene</a>' +
        '<img src="' +
        PIXEL +
        '" width="40" height="40">' +
        '</main>',
    ),
  '/legaturi/bun': () =>
    pagina(
      'Fixtura legaturi, corecta',
      corpCorect(
        '<a href="/legaturi/bun">Aceeasi pagina</a>' +
          '<a href="#termene">Sari la termene</a>' +
          '<a href="mailto:contact@exemplu-3s.invalid">Scrieti-ne</a>' +
          '<h2 id="termene">Termene</h2>' +
          '<p>' +
          PARAGRAF_DOI +
          '</p>',
      ),
    ),
}

function bannerHtml(): string {
  return (
    '<div data-consimtamant style="position:fixed;bottom:0;left:0;right:0;background:#ffffff;color:#1a1a1a">' +
    '<p style="color:#1a1a1a;background:#ffffff">Folosim masurare de trafic.</p>' +
    '<button data-refuz type="button">Refuz tot</button>' +
    '<button data-accept type="button">Accept tot</button>' +
    '</div>'
  )
}

export type ServerFixturi = { baza: string; oprire: () => Promise<void> }

export async function pornesteFixturile(): Promise<ServerFixturi> {
  const server: Server = createServer((cerere, raspuns) => {
    const cale = (cerere.url ?? '/').split('?')[0]
    const constructor = PAGINI[cale]
    if (!constructor) {
      raspuns.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
      raspuns.end('Nu exista')
      return
    }
    raspuns.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
    raspuns.end(constructor())
  })

  await new Promise<void>((gata) => server.listen(0, '127.0.0.1', gata))
  const adresa = server.address() as AddressInfo
  return {
    baza: 'http://127.0.0.1:' + adresa.port,
    oprire: () => new Promise<void>((gata) => server.close(() => gata())),
  }
}
