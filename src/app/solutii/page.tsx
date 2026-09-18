import type { Metadata } from "next";
import AntetPagina from "@/components/AntetPagina";
import BandaCTA from "@/components/BandaCTA";
import BlocDovada from "@/components/BlocDovada";
import Capitol from "@/components/Capitol";
import FisaDomeniu from "@/components/FisaDomeniu";
import SegmentCadru from "@/components/SegmentCadru";
import SegmentIncredere from "@/components/SegmentIncredere";
import SegmentRandTextImagine from "@/components/SegmentRandTextImagine";
import { FOTOGRAFII } from "@/content/fotografii";
import { HIGHLIGHTS, HUB_INTERIOR, NOTA_CONTACT } from "@/content/interior-solutii";
import { HUB, INDIFERENT_DE_DOMENIU, SEGMENTE } from "@/content/segmente";

// Hub-ul de domenii. Nu contine continut scris de mana despre vreun segment: grila se
// genereaza din SEGMENTE, deci un domeniu nou apare aici in clipa in care primeste o intrare,
// fara sa atinga nimeni fisierul asta.
//
// GRAMATICA, dupa REF-A §4: erou -> highlights pe ceata -> capitolul cu grila celor sapte
// domenii -> capitolul de onestitate -> randul text / fotografie catre verificatorul de
// termene -> banda CTA.
//
// CE S-A SCHIMBAT LA VALUL S2-b. Sectiunile stateau pe `SegmentSectiune` (titlu de 48 px
// centrat, eticheta albastra de 14 px, alternanta alb / ceata) si cele trei fapte care nu tin
// de domeniu apareau de DOUA ori pe pagina: titlurile lor intr-un rand de iconite sub erou, si
// perechea intreaga pe o banda inchisa mai jos. Acum sectiunile sunt `Capitol` - eticheta 24,
// afirmatie 80, rama de ceata cu raza 28 in containerul de 980 - iar faptele apar o singura
// data, cu textul intreg, in banda de highlights. `SegmentBandaReguli`, care purta banda
// inchisa, nu mai avea niciun apelant si s-a sters.
//
// NU EXISTA BARA LOCALA aici, si nu e o scapare: grila ESTE navigarea paginii. Niste ancore
// care trimit catre trei sectiuni, dintre care una e chiar lista de sub ele, ar dubla acelasi
// gest. Paginile de segment, care au cinci sectiuni lungi, o au.
//
// Canonical auto-referential, ca la pagina de start: fara el, mediul de proba indexat ar
// concura cu productia pe aceleasi cuvinte.
export const metadata: Metadata = {
  title: HUB.titluMeta,
  description: HUB.descriereMeta,
  alternates: { canonical: "/solutii" },
};

// Titlul eroului, rupt unde l-a rupt autorul in `segmente.ts`. Se citeste dintr-un singur loc:
// sirul poarta ruperea, pagina doar o randeaza.
const TITLU_RUPT = HUB.h1.split("\n").flatMap((rand, i) =>
  i === 0 ? [rand] : [<br key={"rand-" + i} />, rand],
);

export default function Solutii() {
  return (
    <main id="continut">
      {/* Cadrul e `rafturi`, cel mai general din registru: o sala de depozitare, fara niciun
          obiect care sa trimita la o meserie anume - hub-ul nu are voie sa numeasca un singur
          domeniu. Nu se ciocneste cu randul text / fotografie de mai jos, care foloseste
          `dosare`. */}
      <AntetPagina
        adresa="/solutii"
        imagine={FOTOGRAFII.rafturi}
        fir={[{ text: "Pagina de start", href: "/" }, { text: HUB.titluMeta }]}
        eticheta={HUB.eticheta}
        titlu={TITLU_RUPT}
        lead={HUB.lead}
        actiune={{ href: "/#discutie", text: HUB_INTERIOR.butonCta }}
        secundar={HIGHLIGHTS.spreFizica}
      />

      <SegmentIncredere
        fapte={INDIFERENT_DE_DOMENIU}
        eticheta={HIGHLIGHTS.eticheta}
        titlu={HIGHLIGHTS.titlu}
        legatura={HIGHLIGHTS.spreMecanism}
        lead={HUB_INTERIOR.reguliLead}
      />

      <Capitol
        id="domenii"
        eticheta={HUB_INTERIOR.grila.eticheta}
        afirmatie={HUB_INTERIOR.grila.titlu}
        text={HUB.listaLead}
      >
        <SegmentCadru>
          <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
            {SEGMENTE.map((s) => (
              <FisaDomeniu
                key={s.slug}
                titlu={s.nume}
                legatura={HUB_INTERIOR.legaturaFisa}
                // Legatura exista exact atunci cand exista pagina. Starea vine din date, deci
                // nu poate aparea un card care promite o ruta inexistenta.
                href={s.pagina ? "/solutii/" + s.slug : undefined}
              >
                {s.rezumat}
              </FisaDomeniu>
            ))}
          </ul>
        </SegmentCadru>
      </Capitol>

      <Capitol
        eticheta={HUB_INTERIOR.onestitate.eticheta}
        afirmatie={HUB_INTERIOR.onestitate.titlu}
        aliniere="centrat"
      >
        <SegmentCadru>
          <BlocDovada eticheta={HUB_INTERIOR.etichetaNota}>{HUB_INTERIOR.nota}</BlocDovada>
        </SegmentCadru>
      </Capitol>

      <SegmentRandTextImagine
        eticheta={HUB_INTERIOR.spreTermene.eticheta}
        titlu={HUB_INTERIOR.spreTermene.titlu}
        text={HUB_INTERIOR.spreTermene.text}
        legatura={HUB_INTERIOR.spreTermene.legatura}
        imagine={FOTOGRAFII.dosare}
        invers
      />

      {/* Butonul NU repeta cererea din erou. Acolo scrie „Discutie de 30 de minute"; aici,
          dupa grila de domenii si dupa ce nu se schimba, omul are ce cere. */}
      <BandaCTA
        titlu={HUB_INTERIOR.cta.titlu}
        text={HUB_INTERIOR.cta.text}
        actiune={{ href: "/contact", text: HUB_INTERIOR.cta.buton }}
        nota={
          <>
            {NOTA_CONTACT.inainte}
            <a
              href={"mailto:" + NOTA_CONTACT.adresa}
              className="text-albastru-2 underline underline-offset-[3px]"
            >
              {NOTA_CONTACT.adresa}
            </a>
            {NOTA_CONTACT.dupa}
          </>
        }
      />
    </main>
  );
}
