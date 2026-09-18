import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { FOTOGRAFII } from '../src/content/fotografii'

/**
 * Probele feliei 6 (val S1-d): setul de fotografii al ACESTUI site.
 *
 * CE CLASA DE DEFECT INCHID. Site-ul a pornit ca o copie a primului si a mostenit cele sapte
 * cadre ale lui, identice la octet. Regula noua a fabricii e ca fiecare site are cadrele lui,
 * cu cheile NESCHIMBATE - cheia e contractul cu paginile, fisierul e al site-ului. Modurile de
 * a esua tacut, pe care nu le prinde nicio poarta de azi:
 *   1. o cheie ramane in registru fara fisier pe disc (pagina cere un 404),
 *   2. un fisier ramane pe disc fara cheie in registru (cadrul vechi supravietuieste in repo),
 *   3. marimile nu mai sunt cele cerute - `-1920` cu alta latime, `-960` peisaj in loc de
 *      portret, adica exact inmuierea pe telefon pentru care exista a doua marime,
 *   4. `LICENTA.md` ramane fara rand pentru o cheie, sau cu un rand care nu duce la nicio
 *      fotografie Pexels, sau cu aceeasi adresa la doua chei (copiere de rand),
 *   5. `src/content/start.ts`, care isi tine propriile alt-uri pentru aceleasi chei, ramane cu
 *      descrierea cadrului VECHI - un alt rescris intr-un singur loc,
 *   6. acelasi start.ts tine si `pozitie` pentru trei dintre chei, si ea poate diverge la fel
 *      de tacut: pana la runda a treia chiar diverguse (file-le: dosare 55%, cutii 45%;
 *      registrul: 50% pentru amandoua), fiindca cifrele lor fusesera alese contra cadrelor
 *      dinaintea schimbarii setului.
 * Plus regula de adevar a textului alternativ: descrie ce se vede, se termina cu mentiunea
 * ilustrativa si NU afirma ca ar fi depozitul nostru.
 *
 * CE NU INCHIDE, MASURAT. Punctul 4 verifica FORMA randului din `LICENTA.md`, nu provenienta:
 * un ID de fotografie inlocuit cu unul inventat trece verde. Masurat pe 2026-09-06: cu trei
 * ID-uri fabricate in `LICENTA.md` (7303393 -> 1000000, 6169026 -> 1000001, 33686677 ->
 * 1000002) proba a ramas verde pe toate cazurile. Ca sa cada mutantul asta ar trebui
 * re-descarcate originalele si comparate cu fisierele, adica retea intr-o proba de unitate;
 * provenienta se masoara o data, la schimbarea setului, in afara probei (semnatura 32x32 gri a
 * fiecarui `-1920` fata de toate sursele: cea mai apropiata trebuie sa fie sursa declarata).
 * Verificarea de aici prinde randul lipsa, randul fara adresa si adresa copiata la doua chei.
 *
 * CE NU FACE. Nu masoara unicitatea fata de alt site: dovada aceea e a fabricii (sume sha256
 * comparate intre depozite, comanda in `public/img/LICENTA.md`), iar o proba care ar purta
 * sumele altui site le-ar transforma in fixturi care se invechesc la prima recompresie de
 * acolo.
 *
 * Fisier NOU, cum cere regula valului: `praguri-regresie.json` e partajat, iar din
 * `tests/directia.test.ts` s-a corectat doar o NOTA devenita falsa, nicio verificare.
 */

const RADACINA = join(__dirname, '..')
const DOSAR_IMG = join(RADACINA, 'public', 'img')
const MARIMI = ['1920', '960'] as const

const CHEI = Object.keys(FOTOGRAFII) as (keyof typeof FOTOGRAFII)[]

/**
 * Latimea si inaltimea unui WebP, citite din antet, fara librarie noua: `sharp` nu e in
 * `node_modules` (verificat), iar o dependenta adaugata doar ca sa citesti doi intregi din
 * primii 30 de octeti ai fisierului costa mai mult decat codul asta.
 *
 * Container RIFF: RIFF, marime, WEBP, apoi eticheta de patru litere a primului fragment. Se
 * acopera toate cele trei forme, nu doar cea pe care o scrie generatorul de azi - un fisier
 * reconvertit maine cu alt utilitar poate iesi VP8L sau VP8X, iar o proba care s-ar rupe
 * atunci ar masura utilitarul, nu contractul.
 */
function dimensiuniWebp(cale: string): { latime: number; inaltime: number } {
  const o = readFileSync(cale)
  if (o.toString('ascii', 0, 4) !== 'RIFF' || o.toString('ascii', 8, 12) !== 'WEBP') {
    throw new Error('nu e WebP: ' + cale)
  }
  const eticheta = o.toString('ascii', 12, 16)
  if (eticheta === 'VP8 ') {
    // Cadru cheie VP8: 3 octeti de eticheta de cadru, apoi codul de sincronizare 9d 01 2a,
    // apoi doua valori pe 16 biti din care conteaza cei 14 de jos (2 biti sunt scalarea).
    if (o[23] !== 0x9d || o[24] !== 0x01 || o[25] !== 0x2a) {
      throw new Error('cod de sincronizare VP8 lipsa: ' + cale)
    }
    return { latime: o.readUInt16LE(26) & 0x3fff, inaltime: o.readUInt16LE(28) & 0x3fff }
  }
  if (eticheta === 'VP8L') {
    // Semnatura 0x2f la octetul 20, apoi 14 biti latime-1 si 14 biti inaltime-1.
    const biti = o.readUInt32LE(21)
    return { latime: (biti & 0x3fff) + 1, inaltime: ((biti >> 14) & 0x3fff) + 1 }
  }
  if (eticheta === 'VP8X') {
    // Panza extinsa: doua valori pe 24 de biti, minus 1, incepand la octetul 24.
    const cite = (i: number) => o[i] | (o[i + 1] << 8) | (o[i + 2] << 16)
    return { latime: cite(24) + 1, inaltime: cite(27) + 1 }
  }
  throw new Error('eticheta WebP necunoscuta (' + eticheta + '): ' + cale)
}

/** Cheile care nu au amandoua fisierele in multimea data. Scoasa afara ca sa aiba un martor. */
function cheiFaraFisier(chei: readonly string[], fisiere: ReadonlySet<string>): string[] {
  const lipsa: string[] = []
  for (const cheie of chei) {
    for (const marime of MARIMI) {
      const fisier = cheie + '-' + marime + '.webp'
      if (!fisiere.has(fisier)) lipsa.push(fisier)
    }
  }
  return lipsa
}

/**
 * Campurile `nume` / `alt` / `pozitie` scrise de mana intr-un fisier de continut. Se citeste
 * linie cu linie, nu cu un tipar peste tot fisierul, fiindca intre ele pot sta comentarii si
 * alte campuri, iar un tipar lacom ar lega numele unui card de alt-ul urmatorului.
 *
 * Cautarea se opreste la ACOLADA care inchide obiectul, nu dupa un numar fix de randuri. Cu o
 * fereastra de +8 randuri, un card FARA `pozitie` - cum sunt cele din `CARDURI_EROU` - si-ar
 * imprumuta valoarea de la cardul urmator, iar comparatia de mai jos ar cadea pe un card care
 * n-a scris niciodata nimic. Acolada e chiar capatul obiectului, deci nu poate imprumuta.
 */
function campuriFoto(text: string): { nume: string; alt: string; pozitie?: string }[] {
  const randuri = text.split('\n')
  const gasite: { nume: string; alt: string; pozitie?: string }[] = []
  for (let i = 0; i < randuri.length; i++) {
    const n = randuri[i].match(/^\s*nume:\s*"([a-z]+)",\s*$/)
    if (!n) continue
    let alt: string | undefined
    let pozitie: string | undefined
    for (let j = i + 1; j < randuri.length; j++) {
      if (/^\s*\}/.test(randuri[j])) break
      const a = randuri[j].match(/^\s*alt:\s*"(.*)",\s*$/)
      if (a && alt === undefined) alt = a[1]
      const pz = randuri[j].match(/^\s*pozitie:\s*"(.*)",\s*$/)
      if (pz && pozitie === undefined) pozitie = pz[1]
    }
    if (alt !== undefined) gasite.push({ nume: n[1], alt, pozitie })
  }
  return gasite
}

const FISIERE_WEBP = readdirSync(DOSAR_IMG).filter((f) => f.endsWith('.webp'))

describe('setul de fotografii al site-ului', () => {
  it('fiecare cheie din registru are ambele marimi pe disc', () => {
    expect(CHEI.length, 'registrul de fotografii pare gol').toBeGreaterThan(5)
    expect(cheiFaraFisier(CHEI, new Set(FISIERE_WEBP)), 'chei fara fisier').toEqual([])
  })

  it('martor: o cheie fara fisier chiar e raportata', () => {
    // Controlul pozitiv al probei de mai sus. Fara el, verificarea ar trece la fel de frumos
    // daca `cheiFaraFisier` ar intoarce mereu lista goala - adica proba ar fi verde tocmai
    // cand nu mai masoara nimic.
    const fabricat = [...CHEI, 'cheie-inventata']
    expect(cheiFaraFisier(fabricat, new Set(FISIERE_WEBP))).toEqual([
      'cheie-inventata-1920.webp',
      'cheie-inventata-960.webp',
    ])
  })

  it('niciun fisier orfan: tot ce e in public/img/ e numit de registru', () => {
    const asteptate = new Set(CHEI.flatMap((c) => MARIMI.map((m) => c + '-' + m + '.webp')))
    const orfane = FISIERE_WEBP.filter((f) => !asteptate.has(f))
    expect(orfane, 'fisiere pe disc pe care registrul nu le numeste').toEqual([])
    expect(FISIERE_WEBP.length, 'numarul de fisiere nu e doua per cheie').toBe(CHEI.length * 2)
  })

  it('marimea de 1920 are chiar 1920 px latime, iar cea de 960 e PORTRET', () => {
    for (const cheie of CHEI) {
      const lat = dimensiuniWebp(join(DOSAR_IMG, cheie + '-1920.webp'))
      expect(lat.latime, cheie + '-1920 nu are 1920 px latime').toBe(1920)

      const port = dimensiuniWebp(join(DOSAR_IMG, cheie + '-960.webp'))
      expect(port.latime, cheie + '-960 nu are 960 px latime').toBe(960)
      // Portret, si nu marginal: raportul cerut e intre 3:4 (1,333) si 2:3 (1,5), fiindca
      // asta e fereastra in care un card de telefon nu mai mareste fotografia.
      const raport = port.inaltime / port.latime
      expect(
        raport,
        cheie + '-960 nu e portret (raport ' + raport.toFixed(3) + ')',
      ).toBeGreaterThanOrEqual(1.33)
      expect(
        raport,
        cheie + '-960 e mai inalt decat 2:3 (raport ' + raport.toFixed(3) + ')',
      ).toBeLessThanOrEqual(1.51)
    }
  })

  it('LICENTA.md numeste fiecare cheie cu o adresa Pexels, si nu de doua ori aceeasi', () => {
    // LIMITA, masurata: verificarea e pe FORMA randului, nu pe provenienta. Un ID inlocuit cu
    // unul inventat trece verde - masurat cu trei ID-uri fabricate, proba a ramas verde. Ce
    // prinde: randul lipsa, randul fara adresa Pexels si acelasi ID pus la doua chei, care e
    // modul real in care se strica tabelul cand se schimba un singur cadru prin copiere de
    // rand. Provenienta se masoara in afara probei, la schimbarea setului.
    const licenta = readFileSync(join(DOSAR_IMG, 'LICENTA.md'), 'utf8')
    const randuri = licenta.split('\n')
    const idPerCheie = new Map<string, string>()
    for (const cheie of CHEI) {
      const rand = randuri.find((l) => l.includes('| ' + cheie + '-*.webp'))
      expect(rand, 'LICENTA.md nu are rand pentru ' + cheie).toBeTruthy()
      const potrivire = (rand as string).match(/https:\/\/www\.pexels\.com\/photo\/(\d+)\//)
      expect(potrivire, 'randul lui ' + cheie + ' nu duce la o fotografie Pexels').toBeTruthy()
      idPerCheie.set(cheie, (potrivire as RegExpMatchArray)[1])
    }
    const idUri = [...idPerCheie.values()]
    expect(new Set(idUri).size, 'doua chei trimit la aceeasi fotografie: ' + idUri.join(', ')).toBe(
      idUri.length,
    )
    expect(licenta, 'LICENTA.md nu mai numeste licenta Pexels').toContain('pexels.com/license/')
  })

  it('alt-ul SI pozitia din pagina de start sunt cele din registru', () => {
    // `src/content/start.ts` isi tine propriile alt-uri pentru aceleasi chei, fiindca pagina de
    // start isi tine textele acolo. Doua descrieri ale ACELUIASI cadru diverg la prima editare,
    // si pana acum nimic nu le compara: verificarea din `directia.test.ts` cere doar ca fiecare
    // alt din start.ts sa contina „ilustrativ", deci un alt rescris intr-un singur loc trecea
    // verde. Asta e chiar clasa de defect pe care registrul spune ca o inchide, deci se masoara.
    const start = readFileSync(join(RADACINA, 'src', 'content', 'start.ts'), 'utf8')
    const perechi = campuriFoto(start)
    // Martorul extractorului: numarate independent, direct pe randurile `nume:`. Fara asta,
    // comparatia ar trece pe o lista goala daca tiparul nu mai potriveste - adica proba ar fi
    // verde tocmai cand nu mai citeste nimic. Pragul de jos e o podea, nu o cifra fixa: azi
    // sunt 7 perechi pe 5 chei (`legatura` si `dulapuri` nu apar pe pagina de start), iar o
    // pagina care adauga un card nu are de ce sa inroseasca proba.
    const cateNume = (start.match(/^\s*nume:\s*"/gm) || []).length
    expect(cateNume, 'start.ts nu mai declara nicio fotografie').toBeGreaterThan(3)
    expect(perechi.length, 'extractorul a pierdut perechi nume/alt').toBe(cateNume)
    for (const { nume, alt, pozitie } of perechi) {
      expect(CHEI as readonly string[], 'start.ts foloseste o cheie din afara registrului: ' + nume).toContain(nume)
      const dinRegistru = FOTOGRAFII[nume as keyof typeof FOTOGRAFII]
      expect(alt, 'alt-ul lui ' + nume + ' din start.ts a divergit de registru').toBe(dinRegistru.alt)
      // `pozitie` e a DOUA cifra pe care start.ts o tinea pe cont propriu, si pana la runda a
      // treia diverguse chiar: file-le scriau dosare 55% si cutii 45%, alese contra cadrelor
      // dinaintea schimbarii setului, in timp ce registrul spunea 50% pentru amandoua - iar
      // nicio proba nu se uita la asta. Un card care NU scrie `pozitie` (cele din
      // `CARDURI_EROU`) e in regula: pagina lui o citeste din registru.
      if (pozitie !== undefined) {
        expect(
          pozitie,
          'pozitia lui ' + nume + ' din start.ts a divergit de registru',
        ).toBe(dinRegistru.pozitie)
      }
    }
  })

  it('martor: extractorul chiar vede pozitia, si nu o imprumuta de la cardul urmator', () => {
    // Doua controale pozitive intr-unul, pe o fixtura asamblata AICI, nu citita din proiect:
    // primul card nu are `pozitie` si nu trebuie sa capete una de la al doilea (asta era
    // greseala pe care o facea fereastra de +8 randuri), iar al doilea trebuie s-o poarte pe a
    // lui. Fara martor, comparatia de mai sus ar trece la fel de frumos daca extractorul ar
    // intoarce mereu `pozitie: undefined`, adica tocmai cand nu mai masoara nimic.
    const fixtura = [
      '  {',
      '    nume: "unu",',
      '    alt: "alt unu",',
      '    eticheta: "Unu",',
      '  },',
      '  {',
      '    nume: "doi",',
      '    alt: "alt doi",',
      '    pozitie: "center 33%",',
      '  },',
    ].join('\n')
    expect(campuriFoto(fixtura)).toEqual([
      { nume: 'unu', alt: 'alt unu', pozitie: undefined },
      { nume: 'doi', alt: 'alt doi', pozitie: 'center 33%' },
    ])
  })

  it('textul alternativ descrie o fotografie ilustrativa, nu depozitul nostru', () => {
    for (const cheie of CHEI) {
      const alt: string = FOTOGRAFII[cheie].alt
      expect(alt, 'alt-ul lui ' + cheie + ' nu se incheie cu mentiunea ilustrativa').toMatch(
        /fotografie ilustrativă$/,
      )
      expect(alt, 'alt-ul lui ' + cheie + ' isi insuseste fotografia').not.toMatch(
        /nostru|noastră|Golești/i,
      )
      expect(alt.length, 'alt-ul lui ' + cheie + ' e prea scurt ca sa descrie ceva').toBeGreaterThan(
        30,
      )
    }
  })

  it('registrul nu mai poarta campurile moarte ale directiei de noapte', () => {
    // `filtru` si `voalBanda` erau cifre masurate contra unei pagini pe care fotografia
    // acoperea tot ecranul si purta text peste ea. In REF-V fotografia sta in card si nu mai
    // poarta text, deci campurile n-au ce masura. Se cauta in COD, nu in note: notele au voie
    // sa spuna de ce nu mai exista, si chiar trebuie.
    const faraComentarii = (text: string) =>
      text.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^[ \t]*\/\/.*$/gm, '')
    for (const fisier of [
      join(RADACINA, 'src', 'content', 'fotografii.ts'),
      join(RADACINA, 'src', 'components', 'Ecran.tsx'),
    ]) {
      const cod = faraComentarii(readFileSync(fisier, 'utf8'))
      expect(cod, fisier + ' inca declara campul filtru').not.toMatch(/\bfiltru\b/)
      expect(cod, fisier + ' inca declara campul voalBanda').not.toMatch(/\bvoalBanda\b/)
    }
  })
})
