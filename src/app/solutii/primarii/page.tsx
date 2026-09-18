import type { Metadata } from "next";
import PaginaDeSegment from "@/components/PaginaDeSegment";
import { PRIMARII } from "@/content/segmente";

// Al doilea segment. Fisierul e scurt dinadins, ca la notari: continutul sta in
// `segmente.ts`, forma paginii in `PaginaDeSegment`. Aici nu se scrie proza.
//
// Canonical auto-referential: fara el, pagina ar mosteni canonical-ul layout-ului si
// ar arata spre pagina de start, ceea ce scoate ruta asta din index.
export const metadata: Metadata = {
  title: PRIMARII.titluMeta,
  description: PRIMARII.descriereMeta,
  alternates: { canonical: "/solutii/primarii" },
};

export default function Primarii() {
  return (
    <PaginaDeSegment
      segment={PRIMARII}
      nume="Primării și instituții publice"
      slug="primarii"
    />
  );
}
