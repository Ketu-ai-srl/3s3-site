import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { ANCORE_ACT, BARA_ACT, BARA_ACCESIBILITATE, BARA_HARTA, BARA_TERMENE, CAPITOLE_ACCESIBILITATE, CAPITOLE_TERMENE } from '../src/content/interior-juridic'
import { PAGINI_JURIDICE } from '../src/content/juridic'
import { RUTE } from '../src/content/rute'

/**
 * Probele feliei juridice, rescrise pentru REF-A (val S2-b): cele patru acte, instrumentul de
 * termene, harta site-ului si pagina de 404.
 *
 * FISIER EXISTENT, RESCRIS, nu adaugiri in `directia.test.ts`. Acela e partajat si inghetat in
 * valul asta; ce se masoara aici e specific feliei, iar o proba scrisa in fisierul altcuiva ar
 * fi o scriere pe un bun comun pentru un motiv local.
 *
 * CE S-A SCHIMBAT FATA DE VALUL S1-b, si de ce fiecare afirmatie a trebuit inlocuita, nu doar
 * mutata. Probele de dinainte codificau gramatica directiei ANTERIOARE pe componentele feliei:
 * titlul de sectiune pe treapta de card (24 px), masura randului scrisa in pixeli intr-o
 * constanta de continut, cuprinsul derivat din sectiuni pentru o coloana lipicioasa, pastilele
 * de stare cerute din paleta REF-V. Toate patru pazeau forme care nu mai exista pe pagina: o
 * proba care cere ce a fost scos nu apara nimic, se inroseste pe lucrul corect.
 *
 * CE CLASA DE DEFECT INCHID PROBELE DE AICI, si de ce niciuna dintre portile existente nu o
 * vede. Clasele Tailwind sunt SIRURI: `typecheck`, `lint` si `build` nu le citesc, iar `axe` nu
 * le vede nici el cand elementul ramane lizibil din alt motiv. Deci o clasa din paleta veche
 * ramasa intr-unul din fisierele feliei nu inroseste nimic - degradarea e tacuta.
 * `directia.test.ts` masoara `src/components` si pagina de start; PAGINILE feliei (harta,
 * instrumente, not-found, cele trei acte) nu sunt in acoperirea lui.
 *
 * CE NU VERIFICA (reziduuri - un verde de aici nu inseamna ca paginile arata bine)
 * Intrebarea pe care o pune de fapt: „scriu fisierele feliei numai jetoane din paleta noua, si
 * au componentele ei forma pe care o cere gramatica REF-A?" Nu „e pagina asezata corect".
 *   - Nu randeaza nimic si nu deschide niciun browser: masoara SURSA. Asezarea, ritmul si
 *     caracterele pe rand se masoara pe pagina construita, cu stiluri calculate, si cifrele
 *     stau in raportul feliei, nu aici.
 *   - Nu numara butoanele primare pe sectiune: aia o face `directia.test.ts`, si numai pe
 *     pagina de start.
 *   - Numele vechi de culoare se cauta ca sir, deci un jeton compus dintr-o variabila
 *     (`"bg-" + numeVechi`) trece nevazut. Pe felia asta nu exista asemenea constructie, dar
 *     proba nu o poate exclude.
 *   - Latimea barei locale nu se poate decide pe sursa: ca ancorele incap pe randul de 52 px se
 *     masoara in browser. Ce se masoara aici e ca fiecare sectiune ARE o eticheta scurta.
 */

const RADACINA = join(__dirname, '..')

// Fisierele PE CARE LE-A ATINS felia. Lista e scrisa pe litere dinadins: o proba care ar balei
// tot `src` s-ar inrosi pe munca altor felii, care se rescrie in acelasi val si pe care nimeni
// de aici nu are voie sa o atinga.
const FISIERELE_FELIEI = [
  'src/app/termeni/page.tsx',
  'src/app/confidentialitate/page.tsx',
  'src/app/cookies/page.tsx',
  'src/app/accesibilitate/page.tsx',
  'src/app/instrumente/termene-de-pastrare/page.tsx',
  'src/app/harta-site/page.tsx',
  'src/app/not-found.tsx',
  'src/components/JuridicPagina.tsx',
  'src/components/JuridicBlocuri.tsx',
  'src/components/JuridicIdentificare.tsx',
  'src/components/JuridicSectiune.tsx',
  'src/components/JuridicListaLipsa.tsx',
  'src/components/TermeneCuprins.tsx',
  'src/components/TermeneFisa.tsx',
  'src/components/TermeneRegula.tsx',
  'src/components/HartaLista.tsx',
  'src/components/HartaAncore.tsx',
  'src/components/Invelis.tsx',
  'src/content/interior-juridic.ts',
  'src/content/termene.ts',
]

// Numele directiei DE NOAPTE, ca UTILITARE Tailwind. Tiparul cere ca dupa nume sa NU urmeze
// cratima sau cifra, altfel un jeton valid al paletei de atunci, format din numele scurt plus o
// litera, ar fi prins de numele scurt.
//
// NUMELE MOARTE NU SE SCRIU PE LITERE nicaieri in fisierul asta, nici in comentarii, nici in
// martori: comanda de inventar din `docs/design/DIRECTIA.md` scaneaza fisierul intreg cu `grep`,
// iar `grep` nu stie ce e proza. Masurat pe prima versiune a probei: sase instante, din care cinci
// intr-un singur martor scris intreg - adica proba devenea ea insasi cazul pe care il vaneaza.
// Martorii se ASAMBLEAZA la rulare, din bucati (vezi `mort`), si tiparele raman singurul loc unde
// numele apar, acolo unde `grep` nu le poate citi ca utilitare fiindca n-au prefix.
const CLASE_NOAPTE =
  /\b(?:hover:|group-hover:|focus:)?(?:bg|text|border|decoration|from|to|via|ring|fill|stroke)-(?:noapte-[23]|noapte(?![-\w])|hartie|hartie-veche|hartie-veche-[23]|arama|arama-clar|arama-moale|arama-inchis|verde|verde-adanc|verde-apasat|verde-moale|tus|tus-[23]|pe-inchis(?:-[23])?|suprafata|linie-noapte|linie-suprafata|linie-fn|linie-inchis|cerneala-accent)(?![-\w])/g

// Numele directiei REF-V, retrase din `globals.css` la felia de fundatie a valului S2-a. Sunt
// alta multime decat cele de mai sus si se cauta separat: fiecare val a lasat alt set de nume,
// iar un singur tipar imbinat n-ar mai spune care val a lasat urma.
const CLASE_REFV =
  /\b(?:hover:|group-hover:|focus:)?(?:bg|text|border|decoration|from|to|via|ring|fill|stroke|outline|divide)-(?:violet(?:-(?:2|clar|pal|adanc))?|noapte-v|ceata-2|cerneala-2|linie|succes)(?![-\w])/g

// Rolurile de culoare ale paletei REF-A. Lista e inchisa, ca in `globals.css`.
const PALETA_REFA = [
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

/**
 * Un nume de utilitar mort, asamblat din bucati. Scris intreg, ar fi o instanta a defectului pe
 * care proba il vaneaza, si ar intra in cifra de inventar - masurat, o data, pe fisierul asta.
 */
function mort(prefix: string, rol: string[]) {
  return prefix + '-' + rol.join('-')
}

function citeste(cale: string) {
  const intreg = join(RADACINA, cale)
  expect(existsSync(intreg), 'lipseste fisierul feliei: ' + cale).toBe(true)
  return readFileSync(intreg, 'utf8')
}

// Comentariile se scot inainte de a cauta clase in COD. Unde nota istorica are voie sa citeze un
// nume vechi se spune explicit, la proba respectiva.
function faraComentarii(text: string) {
  return text.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^[ \t]*\/\/.*$/gm, '')
}

describe('felia juridica: paleta REF-A', () => {
  it('niciun fisier al feliei nu mai scrie o clasa din directia de noapte, nici in comentarii', () => {
    // In COMENTARII, nu doar in cod, si asta e o alegere masurata: comanda de inventar din
    // `docs/design/DIRECTIA.md` scaneaza fisierul intreg cu `grep`, iar `grep` nu stie ce e
    // proza. Un comentariu care descrie mecanismul vechi citand clasa pe litere devine chiar o
    // instanta a ei si intra in cifra. S-a intamplat o data pe felia asta, in nota de deschidere
    // a paginii de 404, si a fost prins de aceeasi comanda.
    const abateri: string[] = []
    for (const cale of FISIERELE_FELIEI) {
      for (const m of citeste(cale).matchAll(CLASE_NOAPTE)) abateri.push(cale + ': ' + m[0])
    }
    expect(abateri, 'clase din directia de noapte in fisierele feliei juridice').toEqual([])

    // MARTOR POZITIV: tiparul prinde toate cele trei forme pe care le vaneaza, si un al
    // patrulea sir - jetonul valid al paletei de atunci - pe care NU are voie sa-l prinda.
    const martor =
      'className="' +
      [mort('bg', ['noapte']), mort('text', ['hartie', 'veche', '2']), mort('hover:text', ['arama', 'clar'])].join(' ') +
      '"'
    expect([...martor.matchAll(CLASE_NOAPTE)].length, 'tiparul nu prinde martorul').toBe(3)
    expect(
      [...mort('bg', ['noapte', 'v']).matchAll(CLASE_NOAPTE)].length,
      'tiparul inghite jetonul valid al paletei de atunci',
    ).toBe(0)
    // MARTOR NEGATIV: doua jetoane VALIDE ale paletei de acum nu au voie sa fie prinse.
    expect([...'bg-negru text-cerneala-3'.matchAll(CLASE_NOAPTE)].length).toBe(0)
  })

  it('niciun fisier al feliei nu mai scrie o clasa REF-V, nici in comentarii', () => {
    // Multimea asta e cea pe care o numara comanda de inventar din DIRECTIA.md, si cifra ei
    // masurata pe felie inainte de valul S2-b era 31, in cinci fisiere. Aici e ceruta la ZERO,
    // fiindca fisierele feliei sunt tocmai cele rescrise; `directia.test.ts` plafoneaza restul.
    const abateri: string[] = []
    for (const cale of FISIERELE_FELIEI) {
      for (const m of citeste(cale).matchAll(CLASE_REFV)) abateri.push(cale + ': ' + m[0])
    }
    expect(abateri, 'clase REF-V in fisierele feliei juridice').toEqual([])

    // MARTOR POZITIV, cu toate cele patru forme: fundal, litera, subliniere si chenar. Se
    // ASAMBLEAZA la rulare: scris intreg, ar fi cinci instante ale defectului chiar in proba lui.
    const martor =
      'className="' +
      [
        mort('bg', ['violet', 'pal']),
        mort('text', ['violet']),
        mort('decoration', ['violet', '2']),
        mort('border', ['linie']),
        mort('text', ['cerneala', '2']),
      ].join(' ') +
      '"'
    expect([...martor.matchAll(CLASE_REFV)].length, 'tiparul REF-V nu prinde martorul').toBe(5)
    // MARTOR NEGATIV: `albastru-clar` si `cerneala-3` sunt roluri VII si nu au voie sa fie prinse.
    expect(
      [...'bg-albastru-clar text-cerneala-3 border-ceata'.matchAll(CLASE_REFV)].length,
      'tiparul REF-V inghite roluri vii',
    ).toBe(0)
  })

  it('pastilele de stare ale termenelor stau pe perechi din paleta REF-A', () => {
    // `STARI` da trei perechi de clase, cate una pe stare, si e singurul loc din `content` in
    // care traiesc siruri de clase. Perechile de dinainte numeau doua culori sterse din
    // `globals.css`, deci pastila isi pierdea si fundalul, si litera.
    const termene = citeste('src/content/termene.ts')
    const perechi = [...termene.matchAll(/clase:\s*"([^"]+)"/g)].map((m) => m[1])
    expect(perechi.length, 'nu mai gasesc cele trei perechi de clase ale starilor').toBe(3)
    for (const pereche of perechi) {
      for (const clasa of pereche.split(/\s+/)) {
        const rol = clasa.replace(/^(bg|text|border)-/, '')
        expect(PALETA_REFA, 'rol de culoare in afara paletei REF-A: ' + clasa).toContain(rol)
      }
    }
    // Exact o pastila inchisa: cea a randului pe care nu il putem sustine. Doua ar fi insemnat
    // ca accentul nu mai arata nimic.
    const inchise = perechi.filter((p) => p.includes('bg-negru'))
    expect(inchise.length, 'pastila inchisa se da unui singur rand').toBe(1)
    // Si pe negru se scrie ceata, nu alb - regula paletei.
    expect(inchise[0], 'litera de pe pastila inchisa nu e ceata').toContain('text-ceata')
    // Textele si cheile nu s-au atins: sunt continut, nu stil.
    for (const cheie of ['confirmat', 'orientativ', 'neconfirmat']) {
      expect(termene, 'a disparut starea ' + cheie).toContain(cheie + ': {')
    }
  })
})

describe('felia juridica: gramatica actului', () => {
  it('actul nu mai deschide cu eroul de vitrina si nu mai poarta fotografie', () => {
    // Pagina juridica a referintei n-are erou: h1 centrat, introducere, si intra in text.
    // `AntetPagina` randeaza firul de navigare, numele de 28 px si h1-ul de 64 px - alta
    // gramatica, si singura care poarta `imagine`.
    const pagina = faraComentarii(citeste('src/components/JuridicPagina.tsx'))
    expect(pagina, 'actul inca trece prin eroul de pagina interioara').not.toContain('AntetPagina')
    expect(pagina, 'actul inca poarta o fotografie de antet').not.toContain('FOTOGRAFII')
  })

  it('h1-ul actului sta pe treapta de 48 px si e centrat, in containerul de 653', () => {
    const pagina = citeste('src/components/JuridicPagina.tsx')
    expect(pagina, 'h1-ul actului nu mai e pe treapta de 48 px').toMatch(
      /<h1[^>]*text-titlu-2/,
    )
    expect(pagina, 'introducerea actului nu mai e centrata pe containerul de 653').toMatch(
      /max-w-act[^"]*text-center|text-center[^"]*max-w-act/,
    )
  })

  it('sectiunile actului stau la stanga pe 980, cu h2 pe treapta de 32 px', () => {
    // 48 e treapta h1-ului si e singurul afis al unui act; sectiunile sunt titluri de paragraf.
    // Treapta de 24 px, ceruta de proba valului dinainte, era a ETICHETEI de capitol.
    const pagina = citeste('src/components/JuridicPagina.tsx')
    expect(pagina, 'sectiunile actului nu mai stau in containerul de 980').toContain(
      'max-w-registru',
    )
    expect(pagina, 'titlul de sectiune nu mai e pe treapta juridica de 32 px').toMatch(
      /<h2[^>]*text-\[32px\]/,
    )
    expect(pagina, 'a ramas o marime de afis pe titlul de sectiune').not.toMatch(
      /<h2[^>]*text-titlu-[12]\b/,
    )
  })

  it('cuprinsul lateral lipicios a disparut cu totul', () => {
    // „Fara cuprins lateral" e scris in fisa pentru pagina juridica. Navigarea in pagina o face
    // bara locala, care sta oricum pe ecran si nu fura o coloana din latimea textului.
    expect(
      existsSync(join(RADACINA, 'src/components/JuridicCuprins.tsx')),
      'componenta de cuprins lipicios exista inca pe disc',
    ).toBe(false)
    const importuri: string[] = []
    for (const cale of FISIERELE_FELIEI) {
      if (faraComentarii(citeste(cale)).includes('JuridicCuprins')) importuri.push(cale)
    }
    expect(importuri, 'cineva inca importa cuprinsul lipicios').toEqual([])
  })

  it('actul nu mai poarta casete si nici carduri', () => {
    // „Fara casete, fara carduri" - fisa REF-A, pagina juridica. Blocurile `declaratie` si
    // `limite` sunt continut al actului, nu note laterale, deci raman text cu titlu de 20 px.
    const blocuri = faraComentarii(citeste('src/components/JuridicBlocuri.tsx'))
    expect(blocuri, 'a ramas un card in blocurile actului').not.toMatch(/rounded-card/)
    expect(blocuri, 'a ramas o suprafata de caseta in blocurile actului').not.toMatch(/\bbg-ceata\b/)
    const identificare = faraComentarii(citeste('src/components/JuridicIdentificare.tsx'))
    expect(identificare, 'blocul de identificare a ramas un card').not.toMatch(/rounded-card/)
    // Control pozitiv: tiparul chiar prinde forma pe care o vaneaza.
    expect(/rounded-card/.test('className="rounded-card bg-ceata p-6"')).toBe(true)
  })

  it('legaturile actului sunt albastru-2 si NU sunt subliniate', () => {
    // Fisa scrie explicit „legaturi `albastru-2` fara subliniere" pentru pagina juridica.
    // Sublinierea era forma directiei anterioare, cu `decoration-*` si `underline-offset`.
    const cuSubliniere: string[] = []
    for (const cale of FISIERELE_FELIEI) {
      const cod = faraComentarii(citeste(cale))
      if (/\bunderline(?!-offset)\b/.test(cod) && !/no-underline/.test(cod)) {
        cuSubliniere.push(cale)
      }
      if (/\bunderline-offset-/.test(cod)) cuSubliniere.push(cale + ': offset')
    }
    expect(cuSubliniere, 'legatura subliniata intr-un fisier al feliei').toEqual([])
    expect(citeste('src/components/JuridicBlocuri.tsx'), 'legatura actului nu mai e albastru-2')
      .toContain('text-albastru-2')
  })

  it('masura randului e scrisa o singura data, in continut, si e in pixeli', () => {
    // Un al doilea plafon scris pe elemente s-ar abate de la primul. Si e in PIXELI, nu in `ch`:
    // `ch` e latimea glifei zero, deci `max-w-[74ch]` suna a 74 de caractere si masura 98 -
    // capcana masurata pe chiar paginile astea, la un val anterior.
    //
    // Cifrele sunt masurate pe pagina construita, cu un `Range` peste fiecare rand vizual. Prima
    // varianta a valului S2-b scosese plafonul cu totul, pe argumentul ca 916 px la 21 px dau un
    // rand in banda de 60-75 de caractere; masurat, dadea 95-103, fiindca argumentul uitase
    // `letter-spacing`-ul negativ mostenit de pe `body`. Proba pazeste intervalul, nu cifra.
    const continut = citeste('src/content/interior-juridic.ts')
    // Tiparul se scrie LITERAL, nu construit dintr-un sir: un regex construit cere doua nivele
    // de evadare fata de unul literal, iar greseala nu crapa - intoarce zero potriviri.
    const masuri: [string, RegExpMatchArray | null, number, number][] = [
      ['MASURA_ACT', continut.match(/export const MASURA_ACT = "max-w-\[(\d+)px\]"/), 560, 700],
      ['MASURA_LISTA', continut.match(/export const MASURA_LISTA = "max-w-\[(\d+)px\]"/), 480, 620],
    ]
    for (const [nume, m, jos, sus] of masuri) {
      expect(m, nume + ' lipseste sau nu mai e in pixeli').not.toBeNull()
      const px = Number(m![1])
      expect(px, nume + ' a iesit din intervalul masurat').toBeGreaterThanOrEqual(jos)
      expect(px, nume + ' a iesit din intervalul masurat').toBeLessThanOrEqual(sus)
    }
    // Si cititorii o iau de acolo, nu isi scriu fiecare plafonul lui.
    for (const cale of [
      'src/components/JuridicPagina.tsx',
      'src/components/JuridicBlocuri.tsx',
      'src/components/JuridicIdentificare.tsx',
      'src/components/JuridicSectiune.tsx',
      'src/components/JuridicListaLipsa.tsx',
    ]) {
      expect(faraComentarii(citeste(cale)), cale + ' nu citeste masura din continut').toMatch(
        /MASURA_(ACT|LISTA)/,
      )
    }
    // Plafonul se cauta DOAR pe proza, si asta e o ingustare masurata: proba scrisa pe tot
    // fisierul se inrosea pe plafonul legitim al unui titlu, care e alta marime si alta regula.
    const cuCh: string[] = []
    for (const cale of FISIERELE_FELIEI) {
      if (/<p[^>]*max-w-\[\d+ch\]/.test(faraComentarii(citeste(cale)))) cuCh.push(cale)
    }
    expect(cuCh, 'o masura de proza scrisa in `ch`').toEqual([])
    // Control pozitiv, si unul negativ pe plafonul de titlu.
    expect(/<p[^>]*max-w-\[\d+ch\]/.test('<p className="max-w-[74ch] text-corp">')).toBe(true)
    expect(/<p[^>]*max-w-\[\d+ch\]/.test('<h2 className="max-w-[30ch] text-titlu-4">')).toBe(false)
  })

  it('fiecare sectiune a fiecarui act are o eticheta scurta pentru bara locala', () => {
    // Bara e o singura linie de 52 px si poarta `flex-nowrap`: titlurile-propozitie ale
    // sectiunilor n-au unde sa incapa. Componenta cade pe titlul intreg cand eticheta lipseste,
    // deci absenta se vede pe pagina; proba o prinde inainte.
    const fara: string[] = []
    for (const p of PAGINI_JURIDICE) {
      for (const s of p.sectiuni) {
        if (!ANCORE_ACT[s.id]) fara.push(p.cale + ' ' + s.id)
      }
    }
    expect(fara, 'sectiune fara eticheta de bara').toEqual([])
    // Si invers: nicio eticheta orfana, care sa numeasca o sectiune stearsa.
    const iduri = new Set(PAGINI_JURIDICE.flatMap((p) => p.sectiuni.map((s) => s.id)))
    const orfane = Object.keys(ANCORE_ACT).filter((id) => !iduri.has(id))
    expect(orfane, 'eticheta de bara care nu mai are sectiune').toEqual([])
    // Controlul ca proba a citit ceva: un zero aici ar da verde pe o cautare in gol.
    expect(iduri.size, 'nu am citit nicio sectiune de act').toBeGreaterThan(20)
  })

  it('titlul din bara actului vine din registrul de rute, nu din titlul de meta', () => {
    // Numele scurt e chiar cel din meniu si din subsol, deci nu poate diverge de ele la o
    // redenumire, si e mai scurt - adica lasa loc ancorelor pe randul de 52 px.
    const pagina = citeste('src/components/JuridicPagina.tsx')
    expect(pagina, 'titlul barei nu mai vine din registrul de rute').toMatch(
      /RUTE\.find\(\(r\) => r\.cale === pagina\.cale\)/,
    )
    expect(pagina, 'titlul barei a fost luat din titlul de meta').not.toMatch(
      /titlu=\{pagina\.titluMeta\}/,
    )
    // Si fiecare act chiar are un nume scurt in registru, altfel bara ar ramane fara titlu.
    const fara = PAGINI_JURIDICE.filter((p) => !RUTE.some((r) => r.cale === p.cale))
    expect(fara.map((p) => p.cale), 'act care nu e in registrul de rute').toEqual([])
  })
})

describe('felia juridica: forma componentelor', () => {
  it('niciun titlu al feliei nu e cu majuscule sau bold', () => {
    // Amandoua sunt scrise in „Ce nu se face" din DIRECTIA.md, si amandoua traiau pe pagina de
    // 404: titlul avea `uppercase` si `font-bold`, intr-un font incarcat doar cu 400 si 600 -
    // deci browserul l-ar fi ingrosat mecanic.
    const gasite: string[] = []
    for (const cale of FISIERELE_FELIEI) {
      const cod = citeste(cale)
      if (/\buppercase\b/.test(cod)) gasite.push(cale + ': uppercase')
      if (/\bfont-bold\b/.test(cod)) gasite.push(cale + ': font-bold')
    }
    expect(gasite, 'majuscule sau bold in fisierele feliei').toEqual([])
    // Control pozitiv, in amandoua formele.
    expect(/\buppercase\b/.test('className="tracking-wide uppercase"')).toBe(true)
    expect(/\bfont-bold\b/.test('className="font-bold"')).toBe(true)
  })

  it('niciun card al feliei nu poarta umbra', () => {
    // Cardurile se despart prin CULOARE DE FUNDAL, nu prin umbra. Singura umbra din sistem e
    // conturul butonului secundar, si el sta in `Buton`, care nu e al feliei.
    const cuUmbra: string[] = []
    for (const cale of FISIERELE_FELIEI) {
      for (const m of citeste(cale).matchAll(/\bshadow-[a-z-]+/g)) cuUmbra.push(cale + ': ' + m[0])
    }
    expect(cuUmbra, 'umbra pe un card al feliei').toEqual([])
    expect([...'className="rounded-card shadow-plutitor"'.matchAll(/\bshadow-[a-z-]+/g)].length).toBe(1)
  })

  it('listele feliei se despart prin firul de 1 px, nu prin carduri', () => {
    // REF-A da unei liste randuri despartite de fir. Cardul e pentru continutul care E card:
    // fisa, capitolul, domeniul. Douazeci si doua de carduri identice fac dintr-un cuprins o
    // vitrina, si asta era harta site-ului inainte.
    for (const cale of ['src/components/HartaLista.tsx', 'src/components/JuridicListaLipsa.tsx', 'src/components/TermeneCuprins.tsx']) {
      const cod = faraComentarii(citeste(cale))
      expect(cod, cale + ' inca randeaza carduri').not.toMatch(/rounded-card/)
      expect(cod, cale + ' nu mai desparte randurile prin fir').toMatch(/border-[bt]\b/)
    }
  })

  it('fisa de termen ramane card alb pe ceata, cu termenul pe treapta cea mai mare', () => {
    // Cifra e RASPUNSUL, deci e cel mai mare lucru de pe card: 40 / 47,6 la 1440.
    const fisa = faraComentarii(citeste('src/components/TermeneFisa.tsx'))
    expect(fisa, 'fisa nu mai e card cu raza 28').toContain('rounded-card')
    expect(fisa, 'fisa nu mai e alba pe ceata').toContain('bg-alb')
    expect(fisa, 'termenul nu mai e pe treapta de 40 px').toMatch(/text-titlu-3/)
    expect(fisa, 'categoria nu mai e pe treapta titlului de card').toMatch(
      /<h3[^>]*text-titlu-card/,
    )
    // Stampila colorata a temeiului a iesit: pe un card alb REF-A pune text, nu inca o suprafata.
    expect(fisa, 'temeiul a ramas intr-o stampila cu fundal propriu').not.toMatch(
      /rounded-card bg-ceata px-3/,
    )
  })

  it('cele opt ancore ale instrumentului poarta si termenul, si actul', () => {
    // `cuprins.subTabel` - text inghetat - spune ca actul normativ sta sub numele categoriei, la
    // orice latime, si ca numele duce la fisa. Daca ancorele ar purta doar numele, propozitia
    // aceea ar deveni falsa.
    const cuprins = citeste('src/components/TermeneCuprins.tsx')
    expect(cuprins, 'ancora nu mai poarta termenul').toMatch(/t\.termen \? t\.termen : fara/)
    expect(cuprins, 'ancora nu mai poarta actul normativ').toMatch(/t\.lege \? t\.lege : faraTemei/)
    expect(cuprins, 'ancora nu mai duce la fisa').toMatch(/href=\{"#" \+ t\.ancora\}/)
  })

  it('regulile de folosire raman in HTML-ul servit, nu in stare de browser', () => {
    // Acordeonul se construieste din `details`/`summary`, deci si intrebarea, si raspunsul ajung
    // la cine citeste pagina fara scripturi. Un acordeon facut din stare React ar fi ascuns trei
    // reguli din patru.
    const regula = citeste('src/components/TermeneRegula.tsx')
    expect(regula, 'regulile nu mai trec prin acordeonul de linii').toContain('Acordeon')
    expect(regula, 'componenta a devenit componenta de client').not.toContain('use client')
    const acordeon = readFileSync(join(RADACINA, 'src/components/Acordeon.tsx'), 'utf8')
    expect(acordeon, 'acordeonul nu mai e din details/summary').toMatch(/<details/)
  })

  it('nicio componenta a feliei nu e componenta de client', () => {
    // Cuprinsul lipicios era singura, si a plecat cu tot cu `IntersectionObserver`. Ce ramane se
    // randeaza pe server, deci intra intreg in HTML-ul livrat - chiar conditia pe care poarta de
    // HTML brut o masoara pe fiecare ruta.
    const client = FISIERELE_FELIEI.filter(
      (c) => c.startsWith('src/components/') && citeste(c).includes('use client'),
    )
    expect(client, 'componenta de client in felia juridica').toEqual([])
  })
})

describe('felia juridica: capitolele si barele', () => {
  it('paginile de unealta, harta si accesibilitate poarta bara locala', () => {
    for (const cale of [
      'src/app/instrumente/termene-de-pastrare/page.tsx',
      'src/app/harta-site/page.tsx',
      'src/app/accesibilitate/page.tsx',
    ]) {
      expect(faraComentarii(citeste(cale)), cale + ' nu mai are bara locala').toContain(
        'BaraLocala',
      )
    }
    expect(faraComentarii(citeste('src/components/JuridicPagina.tsx')), 'actul nu mai are bara')
      .toContain('BaraLocala')
  })

  it('fiecare ancora de bara trimite la o sectiune care exista pe pagina ei', () => {
    // O ancora care nu are tinta deruleaza in gol, si nimic nu se plange: nici `build`, nici
    // `axe`, nici poarta de rute, care compara manifestul cu arborele, nu cu ancorele.
    const perechi: [string, { ancora: string }[]][] = [
      ['src/app/instrumente/termene-de-pastrare/page.tsx', BARA_TERMENE.ancore],
      ['src/app/harta-site/page.tsx', BARA_HARTA.ancore],
      ['src/app/accesibilitate/page.tsx', BARA_ACCESIBILITATE.ancore],
    ]
    const fara: string[] = []
    for (const [cale, ancore] of perechi) {
      const cod = citeste(cale)
      for (const a of ancore) {
        if (!cod.includes('id="' + a.ancora + '"')) fara.push(cale + ' #' + a.ancora)
      }
    }
    expect(fara, 'ancora de bara fara sectiune pe pagina').toEqual([])
    // Controlul ca proba a citit ceva.
    const total = perechi.reduce((n, [, a]) => n + a.length, 0)
    expect(total, 'nu am citit nicio ancora de bara').toBe(12)
  })

  it('etichetele de interfata ale feliei nu se termina cu punct', () => {
    // O eticheta cu punct e agramata, si a fost defect reparat in valul S1-a. Se masoara
    // etichetele, nu propozitiile: afirmatiile si textele lungi au punct pe drept.
    const etichete = [
      ...Object.values(ANCORE_ACT),
      BARA_ACT.eticheta,
      BARA_ACT.pastila,
      BARA_TERMENE.eticheta,
      BARA_TERMENE.pastila,
      ...BARA_TERMENE.ancore.map((a) => a.eticheta),
      ...BARA_HARTA.ancore.map((a) => a.eticheta),
      ...BARA_ACCESIBILITATE.ancore.map((a) => a.eticheta),
      CAPITOLE_TERMENE.randuriEticheta,
      CAPITOLE_TERMENE.acoperireEticheta,
      CAPITOLE_TERMENE.moldovaEticheta,
      CAPITOLE_TERMENE.folosireEticheta,
      CAPITOLE_TERMENE.acoperitTitlu,
      CAPITOLE_TERMENE.neacoperitTitlu,
      CAPITOLE_ACCESIBILITATE.masuratEticheta,
      CAPITOLE_ACCESIBILITATE.nemasuratEticheta,
      CAPITOLE_ACCESIBILITATE.semnalareEticheta,
      CAPITOLE_ACCESIBILITATE.adresaTitlu,
    ]
    expect(etichete.length, 'lista de etichete pare goala').toBeGreaterThan(30)
    expect(etichete.filter((e) => e.trim().endsWith('.')), 'eticheta cu punct la final').toEqual([])
    // Control: tiparul chiar prinde forma pe care o vaneaza.
    expect(['Rândurile.'].filter((e) => e.trim().endsWith('.')).length).toBe(1)
  })

  it('afirmatiile de capitol sunt propozitii de doua-patru cuvinte, deci au punct', () => {
    const afirmatii = [
      CAPITOLE_TERMENE.randuriAfirmatie,
      CAPITOLE_ACCESIBILITATE.masuratAfirmatie,
      CAPITOLE_ACCESIBILITATE.nemasuratAfirmatie,
      CAPITOLE_ACCESIBILITATE.semnalareAfirmatie,
    ]
    expect(afirmatii.filter((a) => !a.trim().endsWith('.')), 'afirmatie fara punct').toEqual([])
    const lungi = afirmatii.filter((a) => a.split(/\s+/).length > 4)
    expect(lungi, 'afirmatie de capitol mai lunga de patru cuvinte').toEqual([])
  })

  it('textele feliei nu sudeaza doua propozitii cu virgula si iar', () => {
    // Sudura „, iar" e tell-ul pe care criticul valului S2-a l-a numarat pe tot site-ul: 244 de
    // aparitii inainte, 2 dupa. Proba pazeste doar fisierul de continut al feliei, singurul in
    // care valul asta scrie text nou.
    const continut = citeste('src/content/interior-juridic.ts')
    const siruri = [...faraComentarii(continut).matchAll(/"([^"]{20,})"/g)].map((m) => m[1])
    expect(siruri.length, 'nu am citit niciun sir de continut').toBeGreaterThan(5)
    expect(siruri.filter((s) => s.includes(', iar ')), 'sudura „, iar" intr-un text nou').toEqual([])
    // Control: tiparul chiar prinde forma pe care o vaneaza.
    expect(['Rulează automat, iar dacă una pică nu publicăm.'].filter((s) => s.includes(', iar ')).length).toBe(1)
  })
})

describe('felia juridica: continutul nu se pierde', () => {
  it('cele patru drumuri ale paginii de 404 vin din manifest, nu scrise de mana', () => {
    const negasita = citeste('src/app/not-found.tsx')
    expect(negasita, '404 si-a scris destinatiile in loc sa le caute in manifest').toMatch(
      /RUTE\.find\(\(r\) => r\.cale === cale\)/,
    )
    // Si un singur buton primar: pagina asta are de dat un singur raspuns.
    expect([...negasita.matchAll(/<Buton\b/g)].length, 'au reaparut doua butoane pe 404').toBe(1)
    // Titlul e centrat pe containerul de act, ca titlul unui document.
    expect(negasita, 'titlul paginii de 404 nu mai e centrat').toMatch(/max-w-act[^"]*text-center/)
  })

  it('incheierea actului duce si la discutie, si la celelalte acte, fara destinatie dubla', () => {
    // Legatura secundara scrisa in continut numeste uneori chiar unul dintre celelalte acte;
    // fara filtru, /termeni ar fi aratat de doua ori catre /confidentialitate.
    const pagina = citeste('src/components/JuridicPagina.tsx')
    expect(pagina, 'legatura secundara din continut nu mai ajunge pe pagina').toContain(
      'pagina.secundar',
    )
    expect(pagina, 'destinatia dubla nu mai e filtrata').toMatch(
      /p\.cale !== pagina\.secundar\.href/,
    )
    // Si textul de redactare, cu data din continut, ramane pe pagina.
    expect(pagina, 'randul de redactare a disparut din act').toContain('pagina.redactat')
  })

  it('cele sase verificari de accesibilitate ajung INTREGI pe pagina', () => {
    // Lista primeste siruri, deci titlul si explicatia se lipesc. A da numai titlurile ar fi
    // pierdut propozitiile in care stau cifrele - intre ele si afirmatia cu 390 de puncte, pe
    // care registrul de afirmatii o cere vizibila.
    const pagina = citeste('src/app/accesibilitate/page.tsx')
    expect(pagina, 'verificarile nu mai intra intregi in lista').toMatch(
      /A\.masurat\.map\(\(f\) => f\.titlu \+ " " \+ f\.text\)/,
    )
    expect(pagina, 'lista de verificari nu mai ajunge pe pagina').toContain('ListaBifa')
  })

  it('harta site-ului isi ia in continuare toate grupele din manifest', () => {
    const harta = citeste('src/app/harta-site/page.tsx')
    expect(harta, 'harta si-a scris rutele in loc sa le ia din manifest').toContain('RUTE.filter')
    expect(harta, 'ultima grupa nu mai ia tot ce a ramas').toMatch(/ia\(\(\) => true\)/)
  })
})
