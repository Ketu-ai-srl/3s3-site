import type { Metadata } from "next";
import JuridicPagina from "@/components/JuridicPagina";
import { COOKIES } from "@/content/juridic";

// Pagina despre ce se stocheaza in browser. Scrisa pe starea REALA a site-ului - zero
// cookie-uri, zero stocare locala, zero servicii ale altcuiva - nu pe un sablon care ar
// declara un instrument de statistici pe care nu il avem.
//
// Afirmatia nu sta pe cuvantul nostru: poarta C-01 scaneaza sursa si HTML-ul construit la
// fiecare lot, iar `tests/browser/consimtamant.spec.ts` deschide fiecare ruta intr-un
// browser real si cere multime vida de cookie-uri, de chei de stocare si de gazde straine.
// Daca cineva adauga vreodata un tert, publicarea se opreste inainte ca pagina asta sa
// devina falsa.
export const metadata: Metadata = {
  title: COOKIES.titluMeta,
  description: COOKIES.descriereMeta,
  alternates: { canonical: "/cookies" },
};

export default function Cookies() {
  return <JuridicPagina pagina={COOKIES} />;
}
