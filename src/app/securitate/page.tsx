import type { Metadata } from "next";
import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BandaCTA from "@/components/BandaCTA";
import BlocDovada from "@/components/BlocDovada";
import Capitol from "@/components/Capitol";
import ListaBifa from "@/components/ListaBifa";
import MecanismEtapa from "@/components/MecanismEtapa";
import SecuritateIntrebare from "@/components/SecuritateIntrebare";
import SegmentAncore from "@/components/SegmentAncore";
import SegmentBandaDovezi from "@/components/SegmentBandaDovezi";
import SegmentCadru from "@/components/SegmentCadru";
import SegmentGrila from "@/components/SegmentGrila";
import SegmentIncredere from "@/components/SegmentIncredere";
import SegmentRandTextImagine from "@/components/SegmentRandTextImagine";
import { FOTOGRAFII } from "@/content/fotografii";
import {
  ETAPA,
  HIGHLIGHTS,
  NOTA_CONTACT,
  SECURITATE_INTERIOR as I,
} from "@/content/interior-solutii";
import { SECURITATE as S } from "@/content/securitate";
import { INDIFERENT_DE_DOMENIU } from "@/content/segmente";

// Pagina de securitate. Ordinea sectiunilor e argumentul ei, deci nu se rearanjeaza fara
// motiv: depozit, drum, acces, iesire - adica tot lantul pe hartie - si abia la sfarsit partea
// digitala, impartita in ce am masurat si ce nu putem sustine.
//
// De ce asa. Un furnizor de programe isi scrie pagina de securitate numai despre biti. Aici
// documentul e un obiect: se pierde printr-o cutie asezata gresit, o predare fara
// proces-verbal, o eliminare fara aviz. Lantul de hartie e partea pe care o cunoastem si pe
// care o poate vedea oricine vine in vizita; partea digitala ruleaza pe o platforma care nu e
// scrisa de noi si despre care nu avem inca raspunsuri in scris. Daca ordinea s-ar inversa,
// pagina ar incepe cu ce stim cel mai putin. Valul S2-b a schimbat ASEZAREA, nu ordinea.
//
// GRAMATICA, dupa REF-A §4: bara locala -> erou -> highlights pe ceata -> sase capitole, cu un
// rand text / fotografie dupa primul -> banda neagra a lipsurilor -> banda CTA.
//
// CELE SASE INTREBARI DESCHISE stau in acordeon, si ce se castiga si ce se pierde e scris in
// `SecuritateIntrebare.tsx`. Ce ramane neschimbat: sunt argumentul paginii, nu subsolul ei, si
// numarul lor e in afirmatia capitolului, unde se vede fara sa deschida nimeni nimic.
//
// Continutul sta in `src/content/securitate.ts`; aici e numai forma paginii.
export const metadata: Metadata = {
  title: S.titluMeta,
  description: S.descriereMeta,
  alternates: { canonical: "/securitate" },
};

const LEGATURA = "text-albastru-2 underline decoration-albastru-2 underline-offset-[3px]";

export default function Securitate() {
  return (
    <main id="continut">
      <SegmentAncore ancore={I.navigare} eticheta="Secțiunile paginii" />

      <AntetPagina
        adresa="/securitate"
        imagine={FOTOGRAFII.rafturi}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Securitate" }]}
        eticheta={S.eticheta}
        titlu={S.h1}
        lead={S.lead}
        actiune={{ href: "/#discutie", text: I.butonCta }}
        secundar={HIGHLIGHTS.spreFizica}
      />

      <SegmentIncredere
        fapte={INDIFERENT_DE_DOMENIU}
        eticheta={HIGHLIGHTS.eticheta}
        titlu={HIGHLIGHTS.titlu}
        legatura={HIGHLIGHTS.spreDomenii}
      />

      <Capitol
        id="depozit"
        eticheta={I.depozit.eticheta}
        afirmatie={I.depozit.titlu}
        text={I.depozit.lead}
      >
        <SegmentCadru>
          <SegmentGrila elemente={S.depozit} />

          <div className="mt-8">
            <BlocDovada fel="limite" eticheta={I.etichetaNotaDepozit}>
              {S.notaDepozit}
            </BlocDovada>
          </div>
        </SegmentCadru>
      </Capitol>

      <SegmentRandTextImagine
        eticheta={I.spreFizica.eticheta}
        titlu={I.spreFizica.titlu}
        text={I.spreFizica.text}
        legatura={I.spreFizica.legatura}
        imagine={FOTOGRAFII.sertare}
      />

      <Capitol
        id="drum"
        eticheta={I.drum.eticheta}
        afirmatie={I.drum.titlu}
        text={I.drum.lead}
        aliniere="centrat"
      >
        <SegmentCadru>
          <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
            {S.drum.map((e, i) => (
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

      <Capitol
        id="acces"
        eticheta={I.acces.eticheta}
        afirmatie={I.acces.titlu}
        text={I.acces.lead}
      >
        <SegmentCadru>
          <SegmentGrila elemente={S.acces} />
        </SegmentCadru>
      </Capitol>

      <Capitol
        id="iesire"
        eticheta={I.iesire.eticheta}
        afirmatie={I.iesire.titlu}
        text={I.iesire.lead}
        aliniere="centrat"
      >
        <SegmentCadru>
          <SegmentGrila elemente={S.iesire} />

          <div className="mt-8">
            <BlocDovada eticheta={I.etichetaNotaIesire}>{S.notaIesire}</BlocDovada>
          </div>
        </SegmentCadru>
      </Capitol>

      <Capitol
        id="digital"
        eticheta={I.digital.eticheta}
        afirmatie={I.digital.titlu}
        text={I.digital.lead}
      >
        <SegmentCadru>
          <div className="rounded-card bg-alb p-8 md:p-10">
            <ListaBifa titlu={I.listaMasurat} elemente={S.masurat} />
          </div>

          <p className="mt-8 max-w-[62ch] text-corp text-cerneala-3">
            Prima coloană este descrisă pe larg în{" "}
            <Link href="/cookies" className={LEGATURA}>
              pagina despre ce stocăm în browser
            </Link>
            , iar ce vede găzduirea, chiar când browserul rămâne curat, în{" "}
            <Link href="/confidentialitate" className={LEGATURA}>
              politica de confidențialitate
            </Link>
            .
          </p>
        </SegmentCadru>
      </Capitol>

      {/* Liniuta, nu bifa: randurile de mai jos sunt lucruri care LIPSESC. */}
      <SegmentBandaDovezi
        eticheta={I.bandaNuDetinem.eticheta}
        titlu={I.bandaNuDetinem.titlu}
        elemente={S.nuDetinem}
        semn="liniuta"
      />

      <Capitol
        id="intrebari"
        eticheta={I.intrebari.eticheta}
        afirmatie={I.intrebari.titlu}
        text={I.intrebari.lead}
      >
        <SegmentCadru>
          <SecuritateIntrebare intrebari={S.intrebariDeschise} etichetaStare={I.etichetaStare} />

          <div className="mt-10">
            <BlocDovada eticheta={I.etichetaNotaDigital}>{S.notaDigital}</BlocDovada>
          </div>

          <p className="mt-8 max-w-[62ch] text-corp text-cerneala-3">
            Dacă întrebarea dumneavoastră este despre felul în care se citește site-ul, nu despre
            documente, răspunsul stă în{" "}
            <Link href="/accesibilitate" className={LEGATURA}>
              declarația de accesibilitate
            </Link>
            . Pe ce drum ajunge un mesaj la noi scrie pe{" "}
            <Link href="/contact" className={LEGATURA}>
              pagina de contact
            </Link>
            .
          </p>
        </SegmentCadru>
      </Capitol>

      <BandaCTA
        titlu={S.incheiere.titlu}
        text={S.incheiere.text}
        actiune={{ href: "/#discutie", text: I.butonCta }}
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
