import type { MetadataRoute } from "next";
import { ADRESA_BAZA, rutePentruHarta } from "@/content/rute";

// Harta de site se DERIVA din manifestul de rute, nu se scrie de mana. O lista scrisa de
// mana devine falsa exact atunci cand cineva face lucrul corect si adauga o pagina: harta
// ar ramane la fel, iar motorul ar continua sa vada un site pe care nu il mai avem.
//
// De ce nu are `lastModified`: nu stim data reala a ultimei modificari a fiecarei pagini,
// iar `new Date()` la construire ar declara ca TOATE paginile s-au schimbat la fiecare
// build, ceea ce e neadevarat si face campul sa fie ignorat oricum. Un camp lipsa e mai
// onest decat unul inventat. Se adauga in ziua in care exista o data reala de pus in el.
//
// `changeFrequency` si `priority` lipsesc din acelasi motiv de fond: sunt declaratii
// despre viitor pe care nu le putem sustine.

export default function sitemap(): MetadataRoute.Sitemap {
  return rutePentruHarta().map((ruta) => ({
    url: new URL(ruta.cale, ADRESA_BAZA).toString(),
  }));
}
