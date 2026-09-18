import type { Metadata } from "next";
import PaginaDeSegment from "@/components/PaginaDeSegment";
import { IMOBILIARE } from "@/content/segmente";

// Al saptelea segment. Acelasi tipar ca la celelalte sase: constanta in `segmente.ts`,
// legata in `SEGMENTE`, plus ruta scurta de mai jos. Hub-ul o preia singur.
//
// Canonical auto-referential: fara el, pagina ar mosteni canonical-ul layout-ului si
// ar arata spre pagina de start, ceea ce scoate ruta asta din index.
export const metadata: Metadata = {
  title: IMOBILIARE.titluMeta,
  description: IMOBILIARE.descriereMeta,
  alternates: { canonical: "/solutii/imobiliare" },
};

export default function Imobiliare() {
  return (
    <PaginaDeSegment
      segment={IMOBILIARE}
      nume="Agenții imobiliare și administrare de imobile"
      slug="imobiliare"
    />
  );
}
