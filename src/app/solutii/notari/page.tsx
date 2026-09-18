import type { Metadata } from "next";
import PaginaDeSegment from "@/components/PaginaDeSegment";
import { NOTARI } from "@/content/segmente";

// Primul segment. Fisierul e scurt dinadins: tot continutul sta in `segmente.ts`, iar
// forma paginii in `PaginaDeSegment`. Urmatorul segment se adauga copiind cele
// douazeci de randuri de mai jos si schimband constanta, numele si slug-ul.
//
// Canonical auto-referential: fara el, pagina ar mosteni canonical-ul layout-ului si
// ar arata spre pagina de start, ceea ce scoate ruta asta din index.
export const metadata: Metadata = {
  title: NOTARI.titluMeta,
  description: NOTARI.descriereMeta,
  alternates: { canonical: "/solutii/notari" },
};

export default function Notari() {
  return <PaginaDeSegment segment={NOTARI} nume="Birouri notariale" slug="notari" />;
}
