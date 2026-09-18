import type { Metadata } from "next";
import JuridicPagina from "@/components/JuridicPagina";
import { TERMENI } from "@/content/juridic";

// Termeni si conditii. Fisierul e scurt dinadins: textul sta in `src/content/juridic.ts`,
// forma paginii in `JuridicPagina`. O corectura de fond se face intr-un singur loc, iar
// ruta ramane douazeci de randuri pe care nu are nimeni motiv sa le atinga.
//
// Canonical auto-referential: fara el, pagina ar mosteni canonical-ul din layout si ar
// arata spre pagina de start, ceea ce o scoate din index.
export const metadata: Metadata = {
  title: TERMENI.titluMeta,
  description: TERMENI.descriereMeta,
  alternates: { canonical: "/termeni" },
};

export default function Termeni() {
  return <JuridicPagina pagina={TERMENI} />;
}
