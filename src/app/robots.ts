import type { MetadataRoute } from "next";
import { ADRESA_BAZA, indexareaEstePermisa } from "@/content/rute";

// Implicitul e NEINDEXAREA, si se deschide numai in productie.
//
// Scris in ordinea asta deliberat: daca `SITE_ENV` lipseste sau e scris gresit, site-ul
// ramane in afara indexului. Invers - permite implicit, interzice pe staging - ar face ca
// o variabila uitata sa publice mediul de proba, iar acela concureaza cu productia pe
// aceleasi cuvinte si motorul alege singur care adresa castiga.
//
// Nu inlocuieste antetul `X-Robots-Tag: noindex` pus de `src/middleware.ts` pe staging,
// il dubleaza: `robots.txt` cere unui robot cuminte sa nu ceara pagina, antetul o
// marcheaza chiar in raspuns. Fisierul asta se genereaza la construire, antetul la fiecare
// cerere, deci al doilea prinde si cazul in care mediul se schimba fara build nou.
//
// Harta de site se anunta numai in productie: intr-un fisier care interzice tot, o
// trimitere catre lista completa de pagini se contrazice singura.

export default function robots(): MetadataRoute.Robots {
  if (!indexareaEstePermisa()) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: new URL("/sitemap.xml", ADRESA_BAZA).toString(),
  };
}
