import type { Metadata } from "next";
import JuridicPagina from "@/components/JuridicPagina";
import { CONFIDENTIALITATE } from "@/content/juridic";

// Politica de confidentialitate. Textul sta in `src/content/juridic.ts`; aici raman doar
// metadatele si canonical-ul auto-referential, cerut pe fiecare pagina de poarta S-02.
//
// Republica Moldova e o SECTIUNE a paginii, nu o ruta separata. Motivul e scris in antetul
// fisierului de continut si se rezuma la un fapt: 3S nu are sediu sau reprezentant acolo,
// iar pagini separate ar sugera o prezenta locala pe care nu o avem.
export const metadata: Metadata = {
  title: CONFIDENTIALITATE.titluMeta,
  description: CONFIDENTIALITATE.descriereMeta,
  alternates: { canonical: "/confidentialitate" },
};

export default function Confidentialitate() {
  return <JuridicPagina pagina={CONFIDENTIALITATE} />;
}
