import type { Metadata } from "next";
import Link from "next/link";
import Acordeon from "@/components/Acordeon";
import AntetPagina from "@/components/AntetPagina";
import BandaCTA from "@/components/BandaCTA";
import BlocDovada from "@/components/BlocDovada";
import Capitol from "@/components/Capitol";
import MecanismEtapa from "@/components/MecanismEtapa";
import SegmentAncore from "@/components/SegmentAncore";
import SegmentBandaDovezi from "@/components/SegmentBandaDovezi";
import SegmentCadru from "@/components/SegmentCadru";
import SegmentGrila from "@/components/SegmentGrila";
import SegmentIncredere from "@/components/SegmentIncredere";
import SegmentListaLipsa from "@/components/SegmentListaLipsa";
import SegmentRandTextImagine from "@/components/SegmentRandTextImagine";
import { FOTOGRAFII } from "@/content/fotografii";
import {
  ETAPA,
  FIZICA_INTERIOR as F,
  HIGHLIGHTS,
  NOTA_CONTACT,
} from "@/content/interior-solutii";
import { ARHIVARE_FIZICA as A } from "@/content/mecanism";
import { INDIFERENT_DE_DOMENIU } from "@/content/segmente";

// Pagina partii fizice: depozit, preluare, inventar, selectionare, temei.
//
// Ce face pagina asta si nu apartine niciunei alte pagini: leaga fiecare afirmatie de un
// obiect sau de un act - raftul, cutia, cota, procesul-verbal, avizul. Vechimea si autorizarea
// se scriu ATRIBUIT catre ADRIA, firma-mama, nu la persoana intai: 3S nu e inregistrata inca,
// deci nu are ce sa fie autorizat. Regula sta in `.claude/rules/afirmatii-atribuite.md` si e
// aparata de `poarta-afirmatii.py`.
//
// GRAMATICA, dupa REF-A §4: bara locala -> erou -> highlights pe ceata -> cinci capitole, cu
// un rand text / fotografie dupa al doilea -> banda neagra -> lista limitelor -> banda CTA.
//
// DE CE ACORDEON TOCMAI LA CUVINTE. Sectiunea aceea e un glosar: cine stie deja ce e un metru
// liniar nu are ce citi acolo, si ar trece peste cinci randuri late ca sa ajunga la
// selectionare. Pliate, cele cinci definitii ocupa cinci linii si raman la un clic distanta.
// Textul e in HTML-ul servit oricum - `details` / `summary` - deci nu se pierde pentru cine
// citeste fara scripturi.
//
// LISTA LIMITELOR nu are capitol propriu, si asta e deliberat: e o incheiere, nu o sectiune -
// nu are ancora in bara locala, si un titlu de 80 px deasupra ei ar promite o a sasea parte a
// paginii. Sta intr-un card alb pe ceata, cu titlul ei de 24, imediat dupa banda neagra care
// spune ce PUTEM arata. Cele doua se citesc ca o pereche.
//
// Continutul sta in `src/content/mecanism.ts`; aici e numai forma paginii.
export const metadata: Metadata = {
  title: A.titluMeta,
  description: A.descriereMeta,
  alternates: { canonical: "/arhivare-fizica" },
};

const LEGATURA = "text-albastru-2 underline decoration-albastru-2 underline-offset-[3px]";

export default function ArhivareFizica() {
  return (
    <main id="continut">
      <SegmentAncore ancore={F.navigare} eticheta="Secțiunile paginii" />

      <AntetPagina
        adresa="/arhivare-fizica"
        imagine={FOTOGRAFII.cutii}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Arhivare fizică" }]}
        eticheta={A.eticheta}
        titlu={A.h1}
        lead={A.lead}
        actiune={{ href: "/#discutie", text: F.butonCta }}
        secundar={HIGHLIGHTS.spreMecanism}
      />

      <SegmentIncredere
        fapte={INDIFERENT_DE_DOMENIU}
        eticheta={HIGHLIGHTS.eticheta}
        titlu={HIGHLIGHTS.titlu}
        legatura={HIGHLIGHTS.spreDomenii}
      />

      <Capitol
        id="depozit"
        eticheta={F.depozit.eticheta}
        afirmatie={F.depozit.titlu}
        text={F.depozit.lead}
      >
        <SegmentCadru>
          <SegmentGrila elemente={A.depozit} />
        </SegmentCadru>
      </Capitol>

      <Capitol
        id="preluare"
        eticheta={F.preluare.eticheta}
        afirmatie={F.preluare.titlu}
        text={F.preluare.lead}
        aliniere="centrat"
      >
        <SegmentCadru>
          <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
            {A.preluare.map((e, i) => (
              <MecanismEtapa
                key={e.titlu}
                numar={i + 1}
                titlu={e.titlu}
                text={e.text}
                urma={e.urma}
                etichetaEtapa={ETAPA.index}
                etichetaUrma={ETAPA.urma}
              />
            ))}
          </ol>
        </SegmentCadru>
      </Capitol>

      <SegmentRandTextImagine
        eticheta={F.spreMecanism.eticheta}
        titlu={F.spreMecanism.titlu}
        text={F.spreMecanism.text}
        legatura={F.spreMecanism.legatura}
        imagine={FOTOGRAFII.rafturi}
        invers
      />

      <Capitol
        id="inventar"
        eticheta={F.inventar.eticheta}
        afirmatie={F.inventar.titlu}
        text={F.inventar.lead}
      >
        <SegmentCadru>
          <Acordeon elemente={A.cuvinte.map((f) => ({ intrebare: f.titlu, raspuns: f.text }))} />
        </SegmentCadru>
      </Capitol>

      <Capitol
        id="selectionare"
        eticheta={F.selectionare.eticheta}
        afirmatie={F.selectionare.titlu}
        text={F.selectionare.lead}
        aliniere="centrat"
      >
        <SegmentCadru>
          <SegmentGrila elemente={A.selectionare} />

          <div className="mt-8">
            <BlocDovada eticheta={F.etichetaNotaSelectionare}>{A.notaSelectionare}</BlocDovada>
          </div>
        </SegmentCadru>
      </Capitol>

      <Capitol
        id="temei"
        eticheta={F.temei.eticheta}
        afirmatie={F.temei.titlu}
        text={F.temei.lead}
      >
        <SegmentCadru>
          <SegmentGrila elemente={A.temeiuri} coloane={3} />

          <div className="mt-8">
            <BlocDovada fel="limite" eticheta={F.etichetaNotaTemei}>
              {A.notaTemei}
            </BlocDovada>
            <div className="mt-6">
              <BlocDovada fel="limite" eticheta={F.etichetaNotaConsultanta}>
                {A.notaConsultanta}
              </BlocDovada>
            </div>

            <p className="mt-8 max-w-[62ch] text-corp text-cerneala-3">
              Termenele pe care le putem cita pe articol stau în{" "}
              <Link href="/instrumente/termene-de-pastrare" className={LEGATURA}>
                verificatorul de termene
              </Link>
              , fiecare cu actul normativ și cu data la care a fost citit.
            </p>
          </div>
        </SegmentCadru>
      </Capitol>

      <SegmentBandaDovezi
        eticheta={F.bandaAratam.eticheta}
        titlu={F.bandaAratam.titlu}
        elemente={A.aratam}
      />

      <section className="bg-ceata py-16 md:py-[110px]">
        <div className="mx-auto w-full max-w-registru px-4 md:px-8">
          <div className="rounded-card bg-alb p-8 md:p-10">
            <SegmentListaLipsa titlu={F.listaDeschise} elemente={A.deschise} />
          </div>
        </div>
      </section>

      <BandaCTA
        titlu={A.incheiere.titlu}
        text={A.incheiere.text}
        actiune={{ href: "/#discutie", text: F.butonCta }}
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
