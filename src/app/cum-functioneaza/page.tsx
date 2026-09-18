import type { Metadata } from "next";
import Link from "next/link";
import Acordeon from "@/components/Acordeon";
import AntetPagina from "@/components/AntetPagina";
import BandaCTA from "@/components/BandaCTA";
import BlocDovada from "@/components/BlocDovada";
import Capitol from "@/components/Capitol";
import ListaBifa from "@/components/ListaBifa";
import MecanismEtapa from "@/components/MecanismEtapa";
import MecanismLant from "@/components/MecanismLant";
import SegmentAncore from "@/components/SegmentAncore";
import SegmentBandaDovezi from "@/components/SegmentBandaDovezi";
import SegmentCadru from "@/components/SegmentCadru";
import SegmentIncredere from "@/components/SegmentIncredere";
import SegmentListaLipsa from "@/components/SegmentListaLipsa";
import SegmentRandTextImagine from "@/components/SegmentRandTextImagine";
import { FOTOGRAFII } from "@/content/fotografii";
import {
  ETAPA,
  HIGHLIGHTS,
  MECANISM_INTERIOR as M,
  NOTA_CONTACT,
} from "@/content/interior-solutii";
import { CUM_FUNCTIONEAZA as C } from "@/content/mecanism";
import { INDIFERENT_DE_DOMENIU } from "@/content/segmente";

// Pagina de mecanism. Aici ajunge butonul secundar de pe fisele de domeniu si de pe hub, deci
// sarcina ei e sa raspunda o singura data, complet, la intrebarea pe care o pune oricine preda
// o arhiva: ce se intampla cu arhiva, in ce ordine, si ce hartie ii ramane dupa fiecare pas.
//
// GRAMATICA, dupa REF-A §4: bara locala -> erou -> highlights pe ceata -> cinci capitole, cu
// un rand text / fotografie intre primul si al doilea -> banda neagra -> banda CTA. Fiecare
// capitol are eticheta de 24, afirmatia de 80 si continutul in rama de ceata de 980.
//
// CE S-A SCHIMBAT LA VALUL S2-b: asezarea, nu textul. Sectiunile stateau pe `SegmentSectiune`
// - titlu de 48 px centrat, eticheta albastra, alternanta alb / ceata - iar cardurile de etapa
// purtau numarul intr-o pastila. Continutul e neatins: sta in `src/content/mecanism.ts`,
// inghetat in valul asta.
//
// CELE SASE ETAPE RAMAN INTR-UN SINGUR CAPITOL, si nu s-au impartit in trei dupa Scan / Store
// / Solve, cum sugera lotul. Motivul e in date: `mecanism.ts` nu grupeaza etapele pe cele trei
// verbe, iar gruparea lor ar fi fost o afirmatie noua despre serviciu, scrisa de mine. Etapele
// 1 si 2 tin de preluare si asezare, 3 de scanare, 4 de raspuns, 5 si 6 de intoarcere - adica
// taietura nu cade curat pe niciunul dintre cele trei nume. Numerotarea continua 1..6 se
// citeste dintr-o privire, asa cum promite h1-ul.
//
// Cele cinci verigi ale cautarii NU au trecut in grila, si asta e o alegere de forma, nu o
// scapare: sunt un lant, iar o grila care se citeste in Z ii rupe ordinea. Motivul intreg, in
// `MecanismLant.tsx`.
//
// Canonical auto-referential: fara el, pagina ar mosteni canonical-ul layout-ului si ar arata
// spre pagina de start, ceea ce o scoate din index.
export const metadata: Metadata = {
  title: C.titluMeta,
  description: C.descriereMeta,
  alternates: { canonical: "/cum-functioneaza" },
};

const LEGATURA = "text-albastru-2 underline decoration-albastru-2 underline-offset-[3px]";

export default function CumFunctioneaza() {
  return (
    <main id="continut">
      <SegmentAncore ancore={M.navigare} eticheta="Secțiunile paginii" />

      <AntetPagina
        adresa="/cum-functioneaza"
        imagine={FOTOGRAFII.maini}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Cum funcționează" }]}
        eticheta={C.eticheta}
        titlu={C.h1}
        lead={C.lead}
        actiune={{ href: "/#discutie", text: M.butonCta }}
        secundar={HIGHLIGHTS.spreFizica}
      />

      <SegmentIncredere
        fapte={INDIFERENT_DE_DOMENIU}
        eticheta={HIGHLIGHTS.eticheta}
        titlu={HIGHLIGHTS.titlu}
        legatura={HIGHLIGHTS.spreDomenii}
      />

      <Capitol
        id="etape"
        eticheta={M.etape.eticheta}
        afirmatie={M.etape.titlu}
        text={M.etape.lead}
      >
        <SegmentCadru>
          <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
            {C.etape.map((e, i) => (
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
        eticheta={M.spreFizica.eticheta}
        titlu={M.spreFizica.titlu}
        text={M.spreFizica.text}
        legatura={M.spreFizica.legatura}
        imagine={FOTOGRAFII.cutii}
      />

      <Capitol
        id="digitalizare"
        eticheta={M.digitalizare.eticheta}
        afirmatie={M.digitalizare.titlu}
        text={M.digitalizare.lead}
        aliniere="centrat"
      >
        <SegmentCadru>
          {/* Amandoua listele poarta bifa, si asta e corect aici: nu e „ce avem" contra „ce nu
              avem", ci doua drumuri legitime, alese impreuna. Lista cu liniuta e rezervata
              lucrurilor care LIPSESC. */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-card bg-alb p-8">
              <ListaBifa titlu={M.listaDigitalizat} elemente={C.digitalizat} />
            </div>
            <div className="rounded-card bg-alb p-8">
              <ListaBifa titlu={M.listaPeHartie} elemente={C.peHartie} />
            </div>
          </div>

          <div className="mt-8">
            <BlocDovada eticheta={M.etichetaNotaDigitalizare}>{C.notaDigitalizare}</BlocDovada>
          </div>
        </SegmentCadru>
      </Capitol>

      <Capitol
        id="cautare"
        eticheta={M.cautare.eticheta}
        afirmatie={M.cautare.titlu}
        text={M.cautare.lead}
      >
        <SegmentCadru>
          <MecanismLant verigi={C.lant} />

          <div className="mt-10 rounded-card bg-alb p-8">
            <SegmentListaLipsa titlu={M.listaNuFace} elemente={C.nuFace} />
          </div>
        </SegmentCadru>
      </Capitol>

      <Capitol
        id="dovada"
        eticheta={M.dovada.eticheta}
        afirmatie={M.dovada.titlu}
        text={M.dovada.lead}
        aliniere="centrat"
      >
        <SegmentCadru>
          <SegmentListaLipsa titlu={M.listaDeschise} elemente={C.deschise} />
        </SegmentCadru>
      </Capitol>

      <SegmentBandaDovezi
        eticheta={M.bandaAratam.eticheta}
        titlu={M.bandaAratam.titlu}
        elemente={C.aratam}
      />

      <Capitol
        id="hartia"
        eticheta={M.hartia.eticheta}
        afirmatie={M.hartia.titlu}
        text={M.hartia.lead}
      >
        <SegmentCadru>
          <Acordeon elemente={C.hartie.map((f) => ({ intrebare: f.titlu, raspuns: f.text }))} />

          <p className="mt-8 max-w-[62ch] text-corp text-cerneala-3">
            Termenele de păstrare, cu actul normativ din care vin, stau în{" "}
            <Link href="/instrumente/termene-de-pastrare" className={LEGATURA}>
              verificatorul de termene
            </Link>
            . Ce diferă de la un domeniu la altul se citește pe{" "}
            <Link href="/solutii" className={LEGATURA}>
              fișele de domeniu
            </Link>
            .
          </p>
        </SegmentCadru>
      </Capitol>

      <BandaCTA
        titlu={C.incheiere.titlu}
        text={C.incheiere.text}
        actiune={{ href: "/#discutie", text: M.butonCta }}
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
