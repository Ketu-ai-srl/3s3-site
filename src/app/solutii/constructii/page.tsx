import type { Metadata } from "next";
import PaginaDeSegment from "@/components/PaginaDeSegment";
import { CONSTRUCTII } from "@/content/segmente";

// Al cincilea segment. Fisierul ramane scurt, ca la notari: continutul sta in
// `segmente.ts`, forma paginii in `PaginaDeSegment`.
//
// Canonical auto-referential: fara el, pagina ar mosteni canonical-ul layout-ului si
// ar arata spre pagina de start, ceea ce scoate ruta asta din index.
export const metadata: Metadata = {
  title: CONSTRUCTII.titluMeta,
  description: CONSTRUCTII.descriereMeta,
  alternates: { canonical: "/solutii/constructii" },
};

export default function Constructii() {
  return (
    <PaginaDeSegment
      segment={CONSTRUCTII}
      nume="Firme de construcții și dezvoltatori"
      slug="constructii"
    />
  );
}
