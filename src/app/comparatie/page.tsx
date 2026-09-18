import type { Metadata } from "next";
import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BandaCTA from "@/components/BandaCTA";
import BandaIncredere from "@/components/BandaIncredere";
import BlocDovada from "@/components/BlocDovada";
import ComparatieTabel from "@/components/ComparatieTabel";
import ComparatieVariante from "@/components/ComparatieVariante";
import InvestitieBanda from "@/components/InvestitieBanda";
import InvestitieIntrebari from "@/components/InvestitieIntrebari";
import SegmentAncore from "@/components/SegmentAncore";
import { COMPARATIE as C } from "@/content/comparatie";
import { FOTOGRAFII } from "@/content/fotografii";
import { COMPARATIE_INTERIOR as CI } from "@/content/interior-investitia";

// Pagina de comparatie, pe sectiunea de COMPARATIE din REF-A §4 punctul 6 - singura de pe o
// pagina de produs care isi centreaza titlul: h2 de 64 px in mijloc, coloanele dedesubt ca
// patru carduri albe cu h3 de 24 si nota de 14. Urmeaza tabelul intr-un card alb mare pe o
// banda de ceata, banda neagra cu randurile pe care le pierdem, intrebarile de refuz ca
// acordeon si banda de incheiere.
//
// COMPARA CE COMPARA CLIENTUL: dulapul din birou, colegul care se ocupa si de arhiva, un
// depozit fara cautare si o arhiva administrata. Nu compara spatii de stocare intre ele - aia
// e comparatia altcuiva, pentru un om care are deja documentele scanate, iar clientul nostru
// are hartie.
//
// TABELUL RAMANE TABEL. E cel mai bun lucru de pe pagina si singura forma in care sase
// intrebari cu patru raspunsuri se citesc ca raspunsuri. Ce s-a schimbat e suprafata pe care
// sta - un card alb cu raza 28, pe ceata - si felul in care se reaseaza pe telefon: fiecare
// rand devine un card. Motivul pentru care e o grila si nu un `<table>` e masurat si scris in
// `ComparatieTabel.tsx`.
//
// „UNDE PIERDEM" RAMANE O BANDA NEAGRA, si ramane inaintea situatiilor in care raspunsul e nu.
// E decizia de continut a paginii: o comparatie care iese in avantajul nostru pe fiecare rand
// nu convinge un cumparator institutional, il alerteaza. Pe negru se scrie `ceata` (19,29:1) si
// eticheta e `albastru-clar` (6,96:1) - `BandaIncredere` e componenta INGHETATA si le stie.
//
// FOTOGRAFIA e `legatura`, o singura data, in erou: /comparatie si /cum-functioneaza se leaga
// una de alta, iar cadrul lor de deschidere nu are voie sa fie acelasi. Randul text/fotografie
// de la mijlocul paginii, forma directiei anterioare, a disparut odata cu ea; ritmul il fac
// acum cele patru suprafete alternate - alb, ceata, negru, alb.
//
// Bara locala sta dupa erou, ca pe celelalte 21 de rute; motivul masurat e scris pe /investitia.
//
// Faptele stau in `src/content/comparatie.ts` si nu se ating; titlurile de sectiune care nu
// existau in continut sunt in fisierul feliei.
export const metadata: Metadata = {
  title: C.titluMeta,
  description: C.descriereMeta,
  alternates: { canonical: "/comparatie" },
};

const LEGATURA = "text-albastru-2 underline underline-offset-[3px] hover:text-cerneala";

export default function Comparatie() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/comparatie"
        imagine={FOTOGRAFII.legatura}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Comparație" }]}
        eticheta={C.eticheta}
        titlu={C.h1}
        lead={C.lead}
        actiune={{ href: "/contact", text: "Discuție de 30 de minute" }}
        secundar={{ href: "/investitia", text: "Ce determină costul" }}
      />

      <SegmentAncore ancore={CI.navigare} eticheta="Secțiunile paginii" />

      <ComparatieVariante
        id="variante"
        eticheta={CI.varianteEticheta}
        titlu={CI.varianteTitlu}
        lead={CI.varianteLead}
        elemente={C.variante}
      >
        <p className="mx-auto max-w-[59ch] text-corp text-cerneala-3 text-center">
          Ce se întâmplă concret în varianta a patra, pas cu pas, de la ridicarea cutiilor până
          la restituire, este scris pe{" "}
          <Link href="/cum-functioneaza" className={LEGATURA}>
            pagina de mecanism
          </Link>
          , iar partea cu rafturi și depozit pe{" "}
          <Link href="/arhivare-fizica" className={LEGATURA}>
            pagina de arhivare fizică
          </Link>
          .
        </p>
      </ComparatieVariante>

      <InvestitieBanda
        id="tabel"
        eticheta={CI.tabelEticheta}
        titlu={CI.tabelTitlu}
        lead={CI.tabelLead}
      >
        <ComparatieTabel coloane={C.coloane} randuri={C.randuri} />

        <BlocDovada eticheta="Ce nu măsoară tabelul" className="mt-10">
          {C.notaTabel}
        </BlocDovada>
      </InvestitieBanda>

      <div id="pierdem">
        <BandaIncredere
          eticheta={CI.pierdemEticheta}
          titlu={CI.pierdemTitlu}
          elemente={C.pierdem}
        />
      </div>

      <InvestitieIntrebari
        id="cand-nu-merita"
        eticheta={CI.nuMeritaEticheta}
        titlu={CI.nuMeritaTitlu}
        lead={CI.nuMeritaLead}
        elemente={C.nuMerita.map((n) => ({ intrebare: n.titlu, raspuns: n.text }))}
      >
        <p className="max-w-[59ch] text-corp text-cerneala-3">
          Cât timp trebuie păstrată legal fiecare categorie, cu actul normativ din care vine
          termenul, se vede în{" "}
          <Link href="/instrumente/termene-de-pastrare" className={LEGATURA}>
            verificatorul de termene
          </Link>
          . Din el se vede și ce se poate elimina legal chiar acum.
        </p>
      </InvestitieIntrebari>

      <div id="discutie">
        <BandaCTA
          titlu={C.incheiere.titlu}
          text={C.incheiere.text}
          actiune={{ href: "/contact", text: "Discuție de 30 de minute" }}
          nota={
            <>
              Dacă vreți întâi să vedeți ce se schimbă la fondul dumneavoastră în funcție de
              domeniu, fișele stau la{" "}
              <Link
                href="/solutii"
                className="text-albastru-2 underline underline-offset-[3px]"
              >
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
