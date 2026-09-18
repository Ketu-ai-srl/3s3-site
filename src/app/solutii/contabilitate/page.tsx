import type { Metadata } from "next";
import PaginaDeSegment from "@/components/PaginaDeSegment";
import { CONTABILITATE } from "@/content/segmente";

// Al treilea segment. Ca la notari si la primarii: ruta randeaza constanta, nimic mai mult.
//
// Canonical auto-referential: fara el, pagina ar mosteni canonical-ul layout-ului si
// ar arata spre pagina de start, ceea ce scoate ruta asta din index.
export const metadata: Metadata = {
  title: CONTABILITATE.titluMeta,
  description: CONTABILITATE.descriereMeta,
  alternates: { canonical: "/solutii/contabilitate" },
};

export default function Contabilitate() {
  return (
    <PaginaDeSegment
      segment={CONTABILITATE}
      nume="Birouri de contabilitate"
      slug="contabilitate"
    />
  );
}
