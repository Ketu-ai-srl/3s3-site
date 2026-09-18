import { readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

// Radacina repo-ului, dedusa din locul fisierului, nu din cwd: Playwright poate fi
// pornit din alt director, iar o cale relativa la cwd ar face portile sa masoare alt
// arbore fara sa spuna nimic.
export const RADACINA = resolve(__dirname, '..', '..', '..')

/**
 * Rutele publice, DEDUSE din `src/app`, nu scrise de mana.
 *
 * O lista scrisa de mana devine falsa exact atunci cand cineva face lucrul corect
 * (adauga o pagina): poarta ar ramane verde pe un site pe care nu l-a mai vazut.
 * Sursa de adevar e structura App Router: fiecare `page.tsx` este o ruta.
 */
export function rutePublice(): string[] {
  const baza = join(RADACINA, 'src', 'app')
  const gasite: string[] = []

  const mergi = (director: string, ruta: string) => {
    for (const intrare of readdirSync(director, { withFileTypes: true })) {
      if (intrare.isDirectory()) {
        // Grupurile de rute `(nume)` si directoarele private `_nume` nu produc segment.
        const nume = intrare.name
        if (nume.startsWith('_') || nume.startsWith('.')) continue
        const segment = nume.startsWith('(') && nume.endsWith(')') ? '' : '/' + nume
        mergi(join(director, nume), ruta + segment)
      } else if (/^page\.(tsx|ts|jsx|js|mdx)$/.test(intrare.name)) {
        gasite.push(ruta === '' ? '/' : ruta)
      }
    }
  }

  mergi(baza, '')
  return [...new Set(gasite)].sort()
}

/** Marcaj de masuratoare invalida. Vezi `browser-rulator.mjs`, care il traduce in iesire 3. */
export const NEMASURAT = 'NEMASURAT:'

export function nemasurat(motiv: string): never {
  throw new Error(NEMASURAT + ' ' + motiv)
}
