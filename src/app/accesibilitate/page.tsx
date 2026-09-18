import type { Metadata } from "next";
import Link from "next/link";
import Acordeon from "@/components/Acordeon";
import AntetPagina from "@/components/AntetPagina";
import BandaCTA from "@/components/BandaCTA";
import BaraLocala from "@/components/BaraLocala";
import Capitol from "@/components/Capitol";
import JuridicListaLipsa from "@/components/JuridicListaLipsa";
import ListaBifa from "@/components/ListaBifa";
import { ACCESIBILITATE as A } from "@/content/securitate";
import {
  BARA_ACCESIBILITATE,
  CAPITOLE_ACCESIBILITATE as C,
  MASURA_ACT,
  MASURA_LISTA,
} from "@/content/interior-juridic";
import { FOTOGRAFII } from "@/content/fotografii";

// Declaratia de accesibilitate, scrisa ca lista de masuratori si nu ca declaratie de
// conformitate.
//
// Distinctia e tot continutul paginii. „Zero incalcari gasite de o unealta automata" si
// „conform cu un nivel dintr-un standard" sunt doua afirmatii diferite, iar a doua nu decurge
// din prima: unealta acopera o parte din criterii, restul se judeca de un om, si niciun om nu a
// facut inca auditul. Pagina spune amandoua lucrurile, in ordinea asta, si nu foloseste litera
// unui nivel nicaieri.
//
// ASEZAREA, la valul S2-b, si de ce fiecare bloc si-a schimbat forma:
//
//   TREI CAPITOLE in loc de trei benzi de sectiune. Banda cu fundal alternand alb / ceata si
//   cu eticheta colorata deasupra titlului era gramatica directiei anterioare; REF-A pune pe o
//   pagina interioara CAPITOLE - eticheta de 24 px, afirmatia de 80 px, un paragraf de 21 / 29,
//   apoi rama de ceata cu continutul. Afirmatiile sunt cele trei intrebari ale paginii, in
//   ordinea in care si le pune cineva: ce am masurat, ce lipseste, cum ne spuneti.
//
//   CE AM MASURAT e o LISTA, nu sase carduri. Cele sase randuri sunt perechi de forma
//   „afirmatie scurta cu punct, apoi explicatia": exact ce citeste bine intr-un rand de lista
//   despartit de un fir de 1 px. Sase carduri pe trei coloane faceau din verificarile care
//   chiar ruleaza o vitrina de fise identice - forma pe care „Ce nu se face" o numeste pe fata.
//   Textele intra INTREGI, titlul lipit de explicatie, deci nu se pierde niciun cuvant; asa
//   ramane vizibila si afirmatia cu cele 390 de puncte, pe care registrul de afirmatii o cere.
//
//   CE NU AM MASURAT ramane `JuridicListaLipsa`, care la valul asta a devenit tot o lista pe
//   fir - aceeasi forma cu lista de deasupra, si cu liniuta in fata fiecarui rand. Liniuta e
//   singurul semn care spune „asta lipseste"; bifa spunea contrariul textului de langa ea.
//
//   SEMNALAREA ramane acordeon pe linii: patru pasi deschisi, dupa doua liste, se citesc ca
//   inca un perete. Textul ramane in HTML-ul servit, fiindca `Acordeon` e `details`/`summary`.
//
// Continutul sta in `src/content/securitate.ts`; aici e numai forma paginii.
//
// Canonical auto-referential: fara el, pagina ar mosteni canonical-ul layout-ului si ar arata
// spre pagina de start, ceea ce o scoate din index.
export const metadata: Metadata = {
  title: A.titluMeta,
  description: A.descriereMeta,
  alternates: { canonical: "/accesibilitate" },
};

const LEGATURA = "text-albastru-2 no-underline hover:text-cerneala";

// Fiecare verificare intra in lista ca un singur rand: afirmatia scurta, apoi explicatia ei.
// Nu se taie nimic - `ListaBifa` primeste siruri, iar a-i da numai titlurile ar fi pierdut
// tocmai propozitiile in care stau cifrele.
const MASURAT = A.masurat.map((f) => f.titlu + " " + f.text);

export default function Accesibilitate() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/accesibilitate"
        forma="banda"
        imagine={FOTOGRAFII.dosare}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Accesibilitate" }]}
        eticheta={A.eticheta}
        titlu={A.h1}
        lead={A.lead}
        actiune={{ href: "/contact", text: "Semnalați-ne o problemă" }}
        secundar={{ href: "/securitate", text: "Vedeți pagina de securitate" }}
      />

      <BaraLocala
        ancore={BARA_ACCESIBILITATE.ancore}
        actiune={{ href: "/contact", text: BARA_ACCESIBILITATE.pastila }}
        eticheta={BARA_ACCESIBILITATE.eticheta}
      />

      <Capitol
        id="masurat"
        eticheta={C.masuratEticheta}
        afirmatie={C.masuratAfirmatie}
        text={C.masuratText}
      >
        <div className="w-full p-6 md:p-10">
          {/* `mx-auto` langa plafonul de 505 px, si e o cifra, nu un gust: rama capitolului are
              916 px la 1440, iar coloana ancorata la stanga lasa 371 px de ceata goala numai la
              dreapta - 40% din rama, cat sa citeasca a aliniere ratata. Plafonul cere o coloana
              INGUSTA, nu una lipita de margine; centrata, golul se imparte 185 / 185 si masura
              randului ramane neatinsa. Celelalte doua rame ale paginii sunt pline (gol 40 px,
              adica exact captuseala), deci abaterea era a acesteia. */}
          <div className={`mx-auto ${MASURA_LISTA}`}>
            <ListaBifa titlu={C.masuratTitlu} elemente={MASURAT} />
          </div>
        </div>
      </Capitol>

      <Capitol
        id="nemasurat"
        eticheta={C.nemasuratEticheta}
        afirmatie={C.nemasuratAfirmatie}
        text={C.nemasuratText}
        aliniere="centrat"
      >
        <div className="w-full p-6 md:p-10">
          <JuridicListaLipsa titlu={C.lipsaTitlu} elemente={A.neMasurat} />

          <p className={`mt-10 ${MASURA_ACT} text-capitol text-cerneala`}>
            Distincția are o consecință practică pentru dumneavoastră: dacă instituția
            dumneavoastră are nevoie de o declarație de conformitate ca document de achiziție,
            pagina asta nu ține locul ei și nu vă lăsăm să credeți că ține. Spuneți-ne ce formă
            vă trebuie și vă spunem ce e nevoie ca să existe.
          </p>
        </div>
      </Capitol>

      <Capitol
        id="semnalare"
        eticheta={C.semnalareEticheta}
        afirmatie={C.semnalareAfirmatie}
        text={C.semnalareText}
      >
        <div className="w-full p-6 md:p-10">
          <Acordeon
            elemente={A.semnalare.map((f) => ({ intrebare: f.titlu, raspuns: f.text }))}
          />

          <h3 className="mt-10 text-titlu-card font-semibold text-cerneala">{C.adresaTitlu}</h3>
          <p className={`mt-2 ${MASURA_ACT} text-capitol text-cerneala`}>
            Ne scrieți la{" "}
            <a href="mailto:contact@3s.ro" className={LEGATURA}>
              contact@3s.ro
            </a>
            . Nu afișăm număr de telefon, iar drumurile care există și cele care încă nu există
            sunt scrise pe pagina de contact, ca să nu așteptați răspuns pe un canal pe care nu
            îl citim.
          </p>

          <p className={`mt-6 ${MASURA_ACT} text-capitol text-cerneala`}>
            Același fel de împărțire, între ce am măsurat și ce nu, stă și în{" "}
            <Link href="/securitate" className={LEGATURA}>
              pagina despre protecția documentelor
            </Link>{" "}
            și în{" "}
            <Link href="/cookies" className={LEGATURA}>
              pagina despre ce stocăm în browser
            </Link>
            .
          </p>
        </div>
      </Capitol>

      <BandaCTA
        titlu={A.incheiere.titlu}
        text={A.incheiere.text}
        actiune={{ href: "/contact", text: "Vedeți cum ne scrieți" }}
      />
    </main>
  );
}
