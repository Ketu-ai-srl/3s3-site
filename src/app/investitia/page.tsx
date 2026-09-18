import type { Metadata } from "next";
import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BandaCTA from "@/components/BandaCTA";
import Capitol from "@/components/Capitol";
import InvestitiaFactor from "@/components/InvestitiaFactor";
import InvestitieBanda from "@/components/InvestitieBanda";
import InvestitieCardLista from "@/components/InvestitieCardLista";
import InvestitieGarantii from "@/components/InvestitieGarantii";
import InvestitieIntrebari from "@/components/InvestitieIntrebari";
import InvestitieRandFoto from "@/components/InvestitieRandFoto";
import ListaBifa from "@/components/ListaBifa";
import SegmentAncore from "@/components/SegmentAncore";
import { INVESTITIA as I } from "@/content/comparatie";
import { FOTOGRAFII } from "@/content/fotografii";
import { INVESTITIA_INTERIOR as II } from "@/content/interior-investitia";

// Pagina de investitie, pe gramatica paginii de PRODUS din REF-A §4: erou cu fotografia mare
// intai, banda de „highlights" pe ceata, patru capitole in containerul de 980 cu afirmatia de
// 80 px, intrebari ca acordeon, banda de incheiere.
//
// PAGINA NU CONTINE PRETURI si nu contine intervale - nici „de la", nici exemplu de calcul.
// Decizia e a owner-ului si e scrisa in `CLAUDE.md`; pagina o respecta si, mai important,
// spune DE CE, in acordeonul de la final.
//
// UNDE STA ADAPTAREA FATA DE REFERINTA. Pe pagina de produs a referintei, locul de sub erou e
// pretul: cifra mare, cifra barata, butonul. Noi tinem forma - banda pe ceata, apoi capitole -
// si schimbam ce sta in ea: in locul cifrei, SCARA. Fiecare element de cost isi scrie cele doua
// directii, „creste cand" si „scade cand". E singurul lucru pe care o pagina fara preturi il
// poate da cinstit.
//
// CELE SAPTE ELEMENTE INTRA IN TREI CARDURI, nu in sapte randuri. Gruparea sta in
// `src/content/interior-investitia.ts`, cu indici care acopera multimea de sapte exact o data;
// `tests/interior-felie4.test.ts` o masoara, ca o regrupare viitoare sa nu piarda un element.
//
// BARA LOCALA STA DUPA EROU, CA IN REF-A. Pe captura de produs a referintei, primul ecran e
// bara globala plus eroul, iar bara cu numele paginii si ancorele apare abia in al doilea -
// privita, nu presupusa. Fisa REF-A §4 punctul 1 o insiruie inaintea eroului; insiruirea
// fisei e gresita, ca si punctul 2 pana la corectia din 07.09, si aici se masoara captura, nu
// lista. Aici a stat pana acum o auto-acuzare de „abatere DECLARATA" fata de referinta; nu
// exista abatere, si o retrag, ca urmatoarea felie sa nu „repare" ce e deja corect.
//
// ORDINEA ARE SI O A DOUA JUSTIFICARE, masurata la noi.
// `AntetPagina` e componenta INGHETATA si isi rezerva 96 px in partea de sus
// pentru bara globala fixa; asezata deasupra eroului, bara locala ar adauga inca 96 px (44 bara
// globala + 52 bara locala) inaintea firului de navigare, iar numele paginii ar cobori de la
// 842 px, cifra masurata la reconcilierea lotului S2-b0, spre 938 - adica sub linia de plutire
// a unui ecran de 900, exact proprietatea pentru care eroul a fost coborat la 640 px. Cele 22
// de rute ale site-ului o aseaza azi la fel. Ancorele nu pierd nimic: ele trimit la sectiunile
// de sub erou, iar bara e lipicioasa, deci urca sub bara globala la prima derulare.
//
// Faptele stau in `src/content/comparatie.ts` si nu se ating; aici e numai forma paginii, iar
// titlurile de sectiune care nu existau in continut sunt in fisierul feliei.
export const metadata: Metadata = {
  title: I.titluMeta,
  description: I.descriereMeta,
  alternates: { canonical: "/investitia" },
};

// Raspunsurile acordeonului vin din continutul deja scris. Cheia leaga intrebarea NOUA de
// textul VECHI, ca sa nu existe doua locuri in care se poate scrie acelasi raspuns.
const RASPUNSURI: Record<string, string> = {
  "fara-pret-0": I.deCeFaraPret[0].text,
  "fara-pret-1": I.deCeFaraPret[1].text,
  "fara-pret-2": I.deCeFaraPret[2].text,
  "nota-costuri": I.notaCosturi,
  incheiere: I.incheiere.text,
};

const LEGATURA = "text-albastru-2 underline underline-offset-[3px] hover:text-cerneala";

export default function Investitia() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/investitia"
        // Cadrul e `dulapuri` dintr-un motiv masurat, nu de gust: /accesibilitate deschidea cu
        // `dosare` pe aceeasi ancora, si cele doua benzi ieseau identice la octet.
        imagine={FOTOGRAFII.dulapuri}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Investiția" }]}
        eticheta={I.eticheta}
        titlu={I.h1}
        lead={I.lead}
        actiune={{ href: "/contact", text: "Discuție de 30 de minute" }}
        secundar={{ href: "/comparatie", text: "Vedeți comparația" }}
      />

      <SegmentAncore ancore={II.navigare} eticheta="Secțiunile paginii" />

      <InvestitieBanda
        titlu={II.garantiiTitlu}
        legatura={{ href: "/comparatie", text: II.garantiiLegatura }}
        marime="mare"
      >
        <InvestitieGarantii elemente={II.garantii} note={II.garantiiNote} />
      </InvestitieBanda>

      <Capitol
        id="factori"
        eticheta={II.factoriEticheta}
        afirmatie={II.factoriTitlu}
        text={II.factoriLead}
      >
        {/* Captuseala e a RAMEI: rama capitolului n-are padding, iar cardurile lipite de muchia
            ei ar arata a greseala. Randul ia spatiul ramas si cardurile se intind pe inaltimea
            lui, iar randul se centreaza pe verticala, ca sub carduri sa nu ramana o banda de
            ceata goala - motivul masurat, cu cele trei iesiri cantarite, e in
            `InvestitieCarduri.tsx`. */}
        <div className="flex w-full flex-col justify-center p-6 md:p-10">
          <ul className="m-0 grid list-none gap-6 p-0 lg:grid-cols-3">
            {II.grupe.map((g) => (
              <InvestitiaFactor
                key={g.eticheta}
                eticheta={g.eticheta}
                titlu={g.titlu}
                lead={g.lead}
                inchis={g.inchis}
                elemente={g.indici.map((n) => I.factori[n])}
              />
            ))}
          </ul>
        </div>
      </Capitol>

      <Capitol
        id="structura"
        eticheta={II.structuraEticheta}
        afirmatie={II.structuraTitlu}
        text={II.structuraLead}
        aliniere="centrat"
      >
        <InvestitieCardLista>
          <ListaBifa titlu="Se plătește o singură dată" elemente={I.costUnic} />
          <ListaBifa titlu="Se plătește recurent" elemente={I.costRecurent} />
        </InvestitieCardLista>
      </Capitol>

      <Capitol
        id="discutia"
        eticheta={II.discutiaEticheta}
        afirmatie={II.discutiaTitlu}
        text={II.discutiaLead}
      >
        <InvestitieRandFoto imagine={FOTOGRAFII.maini} />
      </Capitol>

      <Capitol
        id="promisiuni"
        eticheta={II.refuzEticheta}
        afirmatie={II.refuzTitlu}
        text={II.refuzLead}
        aliniere="centrat"
      >
        <InvestitieCardLista>
          <ListaBifa titlu="Ce primiți, în scris" elemente={I.primiti} />
          <ListaBifa titlu="Ce nu primiți, și nici nu promitem" elemente={I.nuPrimiti} />
        </InvestitieCardLista>
      </Capitol>

      <InvestitieIntrebari
        id="intrebari"
        eticheta={II.intrebariEticheta}
        titlu={II.intrebariTitlu}
        lead={II.intrebariLead}
        elemente={II.intrebari.map((q) => ({
          intrebare: q.intrebare,
          raspuns: RASPUNSURI[q.cheie],
        }))}
      >
        <p className="max-w-[59ch] text-corp text-cerneala-3">
          Termenele legale de păstrare, care hotărăsc cât timp stă fiecare categorie în depozit,
          se pot verifica în{" "}
          <Link href="/instrumente/termene-de-pastrare" className={LEGATURA}>
            verificatorul de termene
          </Link>
          . Ce se întâmplă fizic cu fondul, de la ridicare până la retur, este descris pe{" "}
          <Link href="/cum-functioneaza" className={LEGATURA}>
            pagina de mecanism
          </Link>
          .
        </p>
      </InvestitieIntrebari>

      <div id="discutie">
        <BandaCTA
          titlu={I.incheiere.titlu}
          text={I.incheiere.text}
          actiune={{ href: "/contact", text: "Discuție de 30 de minute" }}
          nota={II.ctaNota}
        />
      </div>
    </main>
  );
}
