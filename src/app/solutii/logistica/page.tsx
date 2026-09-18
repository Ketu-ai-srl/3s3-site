import type { Metadata } from "next";
import PaginaDeSegment from "@/components/PaginaDeSegment";
import { LOGISTICA } from "@/content/segmente";

// Al saselea segment. Vezi nota din `solutii/notari/page.tsx`: tot ce e continut sta in
// `segmente.ts`, iar forma paginii intr-o singura componenta, pentru toate segmentele.
//
// Canonical auto-referential: fara el, pagina ar mosteni canonical-ul layout-ului si
// ar arata spre pagina de start, ceea ce scoate ruta asta din index.
export const metadata: Metadata = {
  title: LOGISTICA.titluMeta,
  description: LOGISTICA.descriereMeta,
  alternates: { canonical: "/solutii/logistica" },
};

export default function Logistica() {
  return (
    <PaginaDeSegment segment={LOGISTICA} nume="Transport și logistică" slug="logistica" />
  );
}
