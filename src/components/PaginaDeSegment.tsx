import Link from "next/link";
import Acordeon from "./Acordeon";
import AntetPagina from "./AntetPagina";
import BandaCTA from "./BandaCTA";
import BlocDovada from "./BlocDovada";
import Capitol from "./Capitol";
import SegmentAncore from "./SegmentAncore";
import SegmentBandaDovezi from "./SegmentBandaDovezi";
import SegmentCadru from "./SegmentCadru";
import SegmentGrila from "./SegmentGrila";
import SegmentIncredere from "./SegmentIncredere";
import SegmentListaLipsa from "./SegmentListaLipsa";
import SegmentRandTextImagine from "./SegmentRandTextImagine";
import { FOTOGRAFII, type CheieFotografie } from "@/content/fotografii";
import { HIGHLIGHTS, NOTA_CONTACT, SEGMENT } from "@/content/interior-solutii";
import { HUB, INDIFERENT_DE_DOMENIU, type PaginaSegment } from "@/content/segmente";

// Corpul unei pagini de segment, o singura data pentru toate cele sapte.
//
// De ce e componenta si nu cod copiat in fiecare `page.tsx`: cerinta feliei e ca urmatorul
// segment sa se adauge FARA sa rescrie cineva paginile. Cu sablonul aici, un segment nou
// inseamna o constanta in `segmente.ts` si un fisier de ruta de vreo douazeci de randuri.
//
// GRAMATICA PAGINII DE PRODUS (REF-A §4), in ordinea citirii:
//   bara locala          52 px, lipicioasa, cu ancorele celor cinci sectiuni
//   erou                 AntetPagina: fotografia intai, apoi numele, afirmatia, randul, pastilele
//   highlights pe ceata  cele trei fapte care nu tin de domeniu, ca trei carduri albe
//   Capitol „Situatia"   grila de carduri: ce se intampla azi in domeniul asta
//   Capitol „Ce se schimba"  grila de carduri: ce arata altfel dupa
//   rand text / fotografie   duce la pagina de mecanism
//   Capitol „Dovada"     ce NU putem sustine, ca lista cu liniuta
//   banda NEAGRA         cele patru fapte atribuite pe care le poate verifica oricine
//   Capitol „Temeiul legal"  actele numite, plus cele doua note despre randul gol
//   Capitol „Intrebari"  FAQ ca acordeon
//   banda CTA            o tigla pe ceata cu o singura pastila
//
// UN SINGUR BUTON PRIMAR PE ECRAN: pastila plina din erou si cea din banda de incheiere. Restul
// drumurilor sunt contur (erou) sau legaturi cu chevron.
//
// CE INLOCUIESTE. Pagina statea pe `SegmentSectiune` - titlu de 48 px centrat, eticheta
// albastra de 14 px, sectiuni alternate alb / ceata - gramatica directiei anterioare. Acum
// fiecare sectiune e un `Capitol` (componenta partajata): eticheta 24, afirmatie 80, paragraf
// 21 / 29 la 600, si continutul intr-o rama de ceata cu raza 28, in containerul de 980.
// Textul e acelasi, pana la virgula: continutul sta in `segmente.ts`, inghetat in valul asta.
//
// ABATERE DECLARATA fata de cererea feliei. Cerinta scria intrebarile segmentului ca grila de
// carduri, si lista „ce nu detinem" in acordeonul de FAQ. S-a facut invers, si motivul e in
// date: `intrebari` sunt perechi intrebare / raspuns, adica exact forma pe care o cere un
// acordeon, iar `deschise` sunt cinci propozitii fara intrebare - taiate in perechi, jumatatile
// ar fi fost text NOU pus in gura continutului inghetat. Acordeonul ramane deci FAQ-ul cerut de
// gramatica, cu intrebarile reale in el.
//
// FOTOGRAFIA DE ANTET se alege dupa slug, aici si nu in `segmente.ts`, fiindca e o decizie de
// vitrina, nu un fapt despre domeniu.
const FOTO_ANTET: Record<string, CheieFotografie> = {
  notari: "maini",
  primarii: "sertare",
  contabilitate: "cutii",
  avocatura: "dosare",
  constructii: "rafturi",
  logistica: "legatura",
  imobiliare: "dulapuri",
};

// Al doilea cadru al paginii, cel din randul text / fotografie. E ALTUL decat cel de antet pe
// fiecare fisa: doua cadre identice pe aceeasi pagina se citesc ca greseala de montaj.
const FOTO_RAND: Record<string, CheieFotografie> = {
  notari: "dosare",
  primarii: "dulapuri",
  contabilitate: "legatura",
  avocatura: "maini",
  constructii: "cutii",
  logistica: "sertare",
  imobiliare: "rafturi",
};

type Props = {
  segment: PaginaSegment;
  /** Numele domeniului, asa cum apare pe hub. Ultima veriga din firul de navigare. */
  nume: string;
  slug: string;
};

export default function PaginaDeSegment({ segment, nume, slug }: Props) {
  const adresa = "/solutii/" + slug;

  return (
    <main id="continut">
      <SegmentAncore ancore={SEGMENT.navigare} eticheta="Secțiunile paginii" />

      <AntetPagina
        adresa={adresa}
        imagine={FOTOGRAFII[FOTO_ANTET[slug]]}
        fir={[
          { text: "Pagina de start", href: "/" },
          { text: HUB.titluMeta, href: "/solutii" },
          { text: nume },
        ]}
        eticheta={segment.eticheta}
        titlu={segment.h1}
        lead={segment.lead}
        actiune={{ href: "/#discutie", text: SEGMENT.butonCta }}
        secundar={HIGHLIGHTS.spreDomenii}
      />

      <SegmentIncredere
        fapte={INDIFERENT_DE_DOMENIU}
        eticheta={HIGHLIGHTS.eticheta}
        titlu={HIGHLIGHTS.titlu}
        legatura={HIGHLIGHTS.spreMecanism}
      />

      <Capitol
        id="situatia"
        eticheta={SEGMENT.situatia.eticheta}
        afirmatie={SEGMENT.situatia.titlu}
        // Restul deschiderii, mutat de pe ecran (campul `continuare` din `segmente.ts`):
        // eroul pastreaza prima propozitie, aici vine ce nu incapea in cele 40 de cuvinte.
        text={segment.continuare}
      >
        <SegmentCadru>
          <SegmentGrila elemente={segment.durere} />

          {/* Invitatia la corectie sta SUB carduri: e o reactie la ce tocmai s-a citit. */}
          <p className="mt-8 max-w-[62ch] text-corp text-cerneala-3">{SEGMENT.situatiaNota}</p>
        </SegmentCadru>
      </Capitol>

      <Capitol
        id="schimbare"
        eticheta={SEGMENT.schimbare.eticheta}
        afirmatie={SEGMENT.schimbare.titlu}
        text={SEGMENT.schimbare.lead}
        aliniere="centrat"
      >
        <SegmentCadru>
          <SegmentGrila elemente={segment.schimbare} />
        </SegmentCadru>
      </Capitol>

      <SegmentRandTextImagine
        eticheta={SEGMENT.spreMecanism.eticheta}
        titlu={SEGMENT.spreMecanism.titlu}
        text={SEGMENT.spreMecanism.text}
        legatura={SEGMENT.spreMecanism.legatura}
        imagine={FOTOGRAFII[FOTO_RAND[slug]]}
      />

      <Capitol
        id="dovada"
        eticheta={SEGMENT.dovada.eticheta}
        afirmatie={segment.titluDovada}
        text={SEGMENT.dovada.lead}
      >
        <SegmentCadru>
          <SegmentListaLipsa titlu={SEGMENT.listaDeschise} elemente={segment.deschise} />
        </SegmentCadru>
      </Capitol>

      <SegmentBandaDovezi
        eticheta={SEGMENT.bandaAratam.eticheta}
        titlu={SEGMENT.bandaAratam.titlu}
        elemente={segment.aratam}
      />

      <Capitol
        id="temei"
        eticheta={SEGMENT.temei.eticheta}
        afirmatie={SEGMENT.temei.titlu}
        text={SEGMENT.temei.lead}
        aliniere="centrat"
      >
        <SegmentCadru>
          <SegmentGrila elemente={segment.temeiuri.map((t) => ({ titlu: t.act, text: t.ce }))} />

          {/* Doua blocuri, nu unul. Masurat pe cele sapte fise, nota asta era SINGURUL bloc
              care trecea de cele 60 de cuvinte ale directiei - intre 70 si 115 - si e chiar
              blocul pe care pagina isi sprijina onestitatea, deci cel mai pagubos de sarit.
              Taietura e la granita celor doua miscari ale ei: de ce randul ramane gol, si ce se
              aplica in locul lui. */}
          <div className="mt-10">
            <BlocDovada eticheta={SEGMENT.etichetaTermenGol}>{segment.notaTermene}</BlocDovada>
            <BlocDovada eticheta={SEGMENT.etichetaTermenCerere} className="mt-5">
              {segment.notaCerere}
            </BlocDovada>

            <p className="mt-8 max-w-[62ch] text-corp text-cerneala-3">
              Termenele pe care le putem cita pe articol stau în{" "}
              <Link
                href="/instrumente/termene-de-pastrare"
                className="text-albastru-2 underline decoration-albastru-2 underline-offset-[3px]"
              >
                verificatorul de termene
              </Link>
              , fiecare cu actul normativ și cu data la care a fost citit.
            </p>
          </div>
        </SegmentCadru>
      </Capitol>

      <Capitol
        id="intrebari"
        eticheta={SEGMENT.intrebari.eticheta}
        afirmatie={segment.titluIntrebari}
        text={SEGMENT.intrebari.lead}
      >
        <SegmentCadru>
          <Acordeon
            elemente={segment.intrebari.map((i) => ({
              intrebare: i.intrebare,
              raspuns: i.raspuns,
            }))}
          />
        </SegmentCadru>
      </Capitol>

      {/* UN buton, si spune ce se cere AICI: nu repeta „Discutie de 30 de minute" din erou.
          Fiecare fisa isi scrie textul butonului din propriul paragraf de incheiere. */}
      <BandaCTA
        titlu={segment.incheiere.titlu}
        text={segment.incheiere.text}
        actiune={{ href: "/contact", text: segment.incheiere.buton }}
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
