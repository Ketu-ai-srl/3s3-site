import stamp from '@/content/_stamp.json'

// Marcajul de dovada a livrarii: raspunde cu valoarea din commit-ul construit.
// Nu depinde de nicio variabila de mediu, deci un container vechi care raspunde
// 200 pe alta ruta nu poate satisface aceasta proba.
export const dynamic = 'force-static'
export const revalidate = false

export function GET() {
  return new Response(stamp.marcaj, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
