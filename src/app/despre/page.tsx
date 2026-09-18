import type { Metadata } from "next";
import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BandaCTA from "@/components/BandaCTA";
import BandaIncredere from "@/components/BandaIncredere";
import BlocDovada from "@/components/BlocDovada";
import Capitol from "@/components/Capitol";
import Card from "@/components/Card";
import InvestitieBanda from "@/components/InvestitieBanda";
import InvestitieCardLista from "@/components/InvestitieCardLista";
import InvestitieCarduri from "@/components/InvestitieCarduri";
import ListaBifa from "@/components/ListaBifa";
import SegmentAncore from "@/components/SegmentAncore";
import {
  ARATAM,
  CONSTRUIT,
  DESPRE,
  MOSTENIT,
  NESCRIS,
  NUMELE,
  STAREA_DE_AZI,
} from "@/content/despre";
import { FOTOGRAFII } from "@/content/fotografii";
import { DESPRE_INTERIOR as DI } from "@/content/interior-investitia";

// Pagina despre noi, pe gramatica paginii interioare REF-A, scrisa pe dos fata de obicei:
// incepe cu impartirea dintre cele doua firme, nu cu ce avem.
//
// AFIRMATIA EROULUI E CEA DIN CONTINUT, un SIR. Pana la valul S2-b pagina isi compunea singura
// h1-ul din doua propozitii legate cu un rand nou; `AntetPagina` randeaza intreg orice titlu
// care nu e sir, fara sa coloreze nimic, fiindca nu se poate sti unde se termina ultimul cuvant
// intr-un arbore de elemente. Consecinta era ca /despre ramanea singura pagina fara cuvantul
// albastru din capatul afirmatiei. `DESPRE.h1` spune acelasi lucru in patru cuvinte, deci e si
// voce REF-A, si primeste colorarea.
//
// CELE PATRU SUPRAFETE, in ordinea in care se citesc: erou si primele doua capitole pe alb,
// banda numelui pe ceata, capitolul limitelor iar pe alb, faptele mostenite pe negru, incheierea
// pe ceata. Alternanta nu e simetrie: banda neagra sta imediat dupa ce pagina si-a scris
// limitele, fiindca acolo e singurul loc in care afirmatiile ATRIBUITE nu se pot confunda cu
// ale noastre.
//
// CELE CINCI FAPTE MOSTENITE SUNT SCRISE O SINGURA DATA, pe banda neagra. Nu stau si intr-o
// lista alaturi de cardul ADRIEI: doua sectiuni cu acelasi continut pe aceeasi pagina inseamna
// ca a doua nu se mai citeste. Textele vin verbatim din `MOSTENIT` (`src/content/despre.ts`,
// inghetat in valul asta); din fisierul feliei vine numai eticheta fiecarui rand, iar
// `tests/interior-felie4` masoara si ca sunt tot atatea etichete cate randuri, si ca niciun
// text din `MOSTENIT` nu e copiat in fisierul feliei.
//
// `Ecran` NU SE MAI FOLOSESTE pe pagini interioare, si nici nu se mai importa aici. Impartirea
// dintre ADRIA si 3S statea in doua `Ecran` de mijloc de pagina, adica in doua anteturi puse
// unul sub altul, fiecare cu rezerva lui de 96 px pentru bara fixa de sus - care la mijlocul
// paginii nu are ce sa rezerve. Acum sunt doua carduri in rama unui capitol.
//
// Bara locala sta dupa erou, ca pe celelalte 21 de rute; motivul masurat e scris pe /investitia.
//
// Canonical auto-referential, ca pe celelalte pagini: fara el, ruta ar mosteni canonical-ul
// layout-ului, ar arata catre pagina de start si ar iesi din index.
export const metadata: Metadata = {
  title: DESPRE.titluMeta,
  description: DESPRE.descriereMeta,
  alternates: { canonical: "/despre" },
};

const LEGATURA = "text-albastru-2 underline underline-offset-[3px] hover:text-cerneala";

export default function Despre() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/despre"
        imagine={FOTOGRAFII.rafturi}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Despre noi" }]}
        eticheta={DESPRE.eticheta}
        titlu={DESPRE.h1}
        lead={DESPRE.lead}
        actiune={{ href: "/contact", text: "Scrieți-ne" }}
        secundar={{ href: "/comparatie", text: "Vedeți comparația" }}
      />

      <SegmentAncore ancore={DI.navigare} eticheta="Secțiunile paginii" />

      <Capitol
        id="impartirea"
        eticheta={DI.impartireaEticheta}
        afirmatie={DI.impartireaTitlu}
        text={DI.impartireaLead}
      >
        {/* ASIMETRIA CELOR DOUA CARDURI E CONTINUT, nu decor: ADRIA are ani in spate si un
            depozit care se poate arata, 3S are munca neinceputa. Al doilea card poarta si
            paragraful de constructie, fiindca acolo e tot ce se poate spune azi despre ea. */}
        <div className="flex w-full flex-col justify-center p-6 md:p-10">
          <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2">
            <li>
              <Card titlu={DI.adriaTitlu} fundal="ceata" mare>
                {DI.adriaText}
              </Card>
            </li>
            <li>
              <Card titlu={DI.treiSTitlu} fundal="ceata" mare>
                {DI.treiSText}
                <span className="mt-4 block">{CONSTRUIT}</span>
              </Card>
            </li>
          </ul>
        </div>
      </Capitol>

      <Capitol
        id="starea"
        eticheta={DI.stareaEticheta}
        afirmatie={DI.stareaTitlu}
        text={DI.stareaLead}
        aliniere="centrat"
      >
        <InvestitieCarduri elemente={STAREA_DE_AZI} coloane={3}>
          <BlocDovada>
            <strong className="font-semibold text-cerneala">De ce citiți asta aici:</strong>{" "}
            starea juridică a unui furnizor se află oricum, la prima verificare de dosar. Scrisă
            de noi, costă o secțiune. Descoperită de dumneavoastră după trei discuții, costă
            discuțiile.
          </BlocDovada>
        </InvestitieCarduri>
      </Capitol>

      <InvestitieBanda
        id="numele"
        eticheta={DI.numeleEticheta}
        titlu={DI.numeleTitlu}
        lead={DI.numeleLead}
      >
        <InvestitieCarduri elemente={NUMELE} coloane={3} inRama={false} />
      </InvestitieBanda>

      <Capitol
        id="limite"
        eticheta={DI.limiteEticheta}
        afirmatie={DI.limiteTitlu}
        text={DI.limiteLead}
      >
        <InvestitieCardLista
          sub={
            <p className="max-w-[62ch] text-corp text-cerneala-3">
              Termenele de păstrare, cu actul normativ din care provin, stau în{" "}
              <Link href="/instrumente/termene-de-pastrare" className={LEGATURA}>
                instrumentul de termene
              </Link>
              . Sunt un punct de plecare, nu un aviz: confirmarea lor de către un arhivist
              autorizat se face înainte de publicare.
            </p>
          }
        >
          <ListaBifa titlu="Ce nu scriem pe site" elemente={NESCRIS} />
          <ListaBifa titlu="Ce vă arătăm în schimb" elemente={ARATAM} />
        </InvestitieCardLista>
      </Capitol>

      {/* Faptele mostenite, verbatim din `MOSTENIT`. Eticheta fiecaruia vine din fisierul
          feliei; textul NU se copiaza nicaieri, deci nu are cum sa divearga de continut. */}
      <div id="mostenit">
        <BandaIncredere
          eticheta={DI.bandaEticheta}
          titlu={DI.bandaTitlu}
          elemente={MOSTENIT.map((text, i) => ({
            titlu: DI.bandaEtichete[i],
            text,
          }))}
        />
      </div>

      <div id="discutie">
        <BandaCTA
          titlu="Întrebarea rămasă se scrie."
          text="Pagina de contact spune pe ce drum ajunge un mesaj la noi și pe care încă nu ajunge. Sunt trei rânduri și se citesc în jumătate de minut, înainte să vă apucați să scrieți."
          actiune={{ href: "/contact", text: "Pagina de contact" }}
          nota={
            <>
              Fișele pe domenii spun ce diferă la un birou notarial față de o primărie:{" "}
              <Link href="/solutii" className="text-albastru-2 underline underline-offset-[3px]">
                domenii
              </Link>
              .
            </>
          }
        />
      </div>
    </main>
  );
}
