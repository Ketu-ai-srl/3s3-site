import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Antetul de neindexare se pune peste tot IN AFARA de productie, nu doar cand mediul se
// numeste exact `staging`.
//
// Ce s-a masurat, pe 5 sep 2026, pe porturi distincte si cu control pozitiv (cu BASIC_AUTH
// setat, `staging` chiar da 401, deci mediul chiar ajunsese la proces):
//
//     SITE_ENV=staging    HTTP 401  X-Robots-Tag: noindex, nofollow
//     SITE_ENV=proba      HTTP 200  X-Robots-Tag: ABSENT
//     SITE_ENV=(nesetat)  HTTP 200  X-Robots-Tag: ABSENT
//
// Conditia veche era `!== 'staging'`, iar `src/content/rute.ts` foloseste `=== 'productie'`.
// Nu sunt complemente: orice alta valoare cadea intre ele. Sursa de la construire ramanea
// sigura implicit, deci gaura nu deschidea singura site-ul - dar asta ERA plasa de siguranta
// la rulare, iar cazul pentru care exista (mediul schimbat fara build nou) era chiar cazul
// pe care nu-l acoperea.
//
// Regula, scrisa in directia asta deliberat: implicitul e NEindexarea. O variabila uitata
// trebuie sa lase site-ul in afara indexului, nu in el.
export function middleware(request: NextRequest) {
  if (process.env.SITE_ENV === 'productie') {
    return NextResponse.next()
  }

  // Autentificarea de baza ramane optionala si separata: e o poarta de ACCES, nu de
  // indexare, iar owner-ul a scos-o pentru mediul de proba, care e public.
  const user = process.env.BASIC_AUTH_USER
  const pass = process.env.BASIC_AUTH_PASS

  if (user && pass) {
    const header = request.headers.get('authorization')
    const asteptat = 'Basic ' + Buffer.from(user + ':' + pass).toString('base64')
    if (header !== asteptat) {
      return new NextResponse('Autentificare necesara', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="3S staging", charset="UTF-8"',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      })
    }
  }

  const raspuns = NextResponse.next()
  raspuns.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return raspuns
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
