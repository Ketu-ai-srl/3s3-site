import type { Metadata } from "next";
import PaginaDeSegment from "@/components/PaginaDeSegment";
import { AVOCATURA } from "@/content/segmente";

// Al patrulea segment, si singurul care se sprijina pe un rand GOL din `termene.ts`:
// termenul dosarelor de cabinet nu are norma citabila cu articol, iar pagina o spune.
//
// Canonical auto-referential: fara el, pagina ar mosteni canonical-ul layout-ului si
// ar arata spre pagina de start, ceea ce scoate ruta asta din index.
export const metadata: Metadata = {
  title: AVOCATURA.titluMeta,
  description: AVOCATURA.descriereMeta,
  alternates: { canonical: "/solutii/avocatura" },
};

export default function Avocatura() {
  return (
    <PaginaDeSegment segment={AVOCATURA} nume="Case de avocatură" slug="avocatura" />
  );
}
