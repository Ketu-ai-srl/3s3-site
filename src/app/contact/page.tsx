import type { Metadata } from "next";
import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BandaCTA from "@/components/BandaCTA";
import BlocDovada from "@/components/BlocDovada";
import Capitol from "@/components/Capitol";
import ContactDrumuri, { type Drum } from "@/components/ContactDrumuri";
import InvestitieCardLista from "@/components/InvestitieCardLista";
import InvestitieIntrebari from "@/components/InvestitieIntrebari";
import ListaBifa from "@/components/ListaBifa";
import SegmentAncore from "@/components/SegmentAncore";
import { campLipsa, entitate } from "@/content/entitate";
import { FOTOGRAFII } from "@/content/fotografii";
import { CONTACT_INTERIOR as CT } from "@/content/interior-investitia";

// PAGINA DE CONTACT, pe gramatica paginii de PRODUS din REF-A, nu pe cea a unui act: erou cu
// fotografie mare, doua capitole in containerul de 980 si intrebarile ca acordeon. Trei drumuri,
// din care unul singur ajunge la noi azi.
//
// DE CE EROU CU FOTOGRAFIE SI NU BANDA SCURTA. `AntetPagina` are forma `banda` pentru paginile
// care sunt DOCUMENTE sau UNELTE - acolo omul a venit dupa o clauza sau dupa un termen, si o
// fotografie il tine departe de raspuns. Contactul nu e nici document, nici unealta: nu se
// consulta, se citeste o data, ca sa se afle pe ce drum ajunge un mesaj. Cadrul e `maini` -
// mana care scoate un dosar - fiindca e singurul din registru in care se vede un GEST, nu un
// depozit; pe pagina asta gestul e chiar subiectul.
//
// NU EXISTA NICIUN FORMULAR PE SITE, nici aici, nici pe pagina de start, si asta nu e o
// omisiune. Un camp in care se scrie o cerere trebuie sa aiba un destinatar, iar 3S nu are inca
// unul configurat. Un buton care spune „Trimiteti cererea" si nu trimite costa mai mult decat
// absenta lui, fiindca omul pleaca convins ca a lasat o cerere si asteapta un raspuns care nu
// are de unde sa vina. Afirmatia care descria vechiul formular a fost RETRASA din registru
// odata cu el.
//
// DE CE VALORILE NU SUNT SCRISE IN PAGINA. Adresa si telefonul se citesc din
// `config/entitate.ro.json`, prin `src/content/entitate.ts` - acelasi loc din care le ia poarta
// juridica si blocul de identificare din subsol. Consecinta: nu putem inventa aici o valoare
// care nu exista in configurare, iar in ziua in care cineva completeaza telefonul dupa
// inmatriculare, cardul se umple singur, fara sa treaca nimeni prin fisierul acesta.
// `campLipsa` recunoaste substituentii, deci `de completat` nu poate ajunge pe pagina aratand
// ca un numar.
//
// Bara locala sta dupa erou, ca pe celelalte 21 de rute; motivul masurat e scris pe /investitia.
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Adresa la care ne scrieți, ce ajută să conțină primul mesaj și care date de contact nu există încă, fiindcă 3S este o firmă în curs de înființare.",
  alternates: { canonical: "/contact" },
};

const ARE_EMAIL = !campLipsa(entitate.email);
const CATRE = "mailto:" + entitate.email;

const DRUMURI: Drum[] = [
  {
    eticheta: "Poștă electronică",
    iconita: "posta",
    valoare: ARE_EMAIL ? entitate.email : null,
    href: ARE_EMAIL ? CATRE : undefined,
    lipsa: "Nu există încă o adresă",
    nota: ARE_EMAIL
      ? "Drumul care funcționează azi, și singurul. Scrieți de la adresa la care vreți să primiți răspunsul, ca discuția să rămână într-un singur fir."
      : "Adresa se scrie aici din configurarea firmei. Cât timp lipsește de acolo, nu punem alta în loc.",
  },
  {
    eticheta: "Telefon",
    iconita: "telefon",
    valoare: campLipsa(entitate.telefon) ? null : entitate.telefon,
    lipsa: "Nu există încă un număr",
    nota: "3S nu are încă număr propriu. Numărul ADRIEI nu îl punem în loc: ar suna la altă firmă decât cea cu care discutați, iar cine răspunde nu ar avea de unde să știe despre ce este vorba. Cardul acesta se completează la înmatriculare.",
  },
  {
    // Eticheta ramane „Sediu", nu „Vizita la depozit", si diferenta nu e de gust: titlul
    // cardului poarta VALOAREA, iar valoarea care lipseste aici e sediul declarat. Un card
    // numit „Vizita la depozit" al carui titlu spune ca nu exista inca ar spune ceva FALS -
    // vizitele cu programare exista, si nota de dedesubt le descrie. Eticheta numeste campul
    // care se completeaza la inmatriculare, iar titlul spune ce scrie azi in el.
    eticheta: "Sediu",
    iconita: "sediu",
    valoare: campLipsa(entitate.sediu) ? null : entitate.sediu,
    lipsa: "Nu există încă un sediu declarat",
    nota: "Sediul se declară la înmatriculare și abia atunci se scrie. Depozitul în care ajunge hârtia este cel al ADRIEI, la Golești, județul Argeș, și poate fi vizitat cu programare înainte să semnați ceva.",
  },
];

const PRIMUL_MESAJ = [
  "Instituția sau firma, și cine semnează pentru ea",
  "Cât credeți că aveți: metri liniari, rafturi ocupate sau număr de cutii",
  "Ce document se cere cel mai des și cât durează azi până este găsit",
  "Dacă vă apasă un control, un termen sau o mutare de sediu, și până când",
  "Un interval în care puteți vorbi treizeci de minute",
];

const CE_PRIMITI = [
  "Un răspuns în aceeași zi lucrătoare, cu două intervale de discuție propuse",
  "O estimare a volumului, în metri liniari și în cutii, după discuție",
  "Ce se digitalizează primul și ce poate aștepta un an",
  "Un calendar de preluare, cu datele scrise",
];

const CU_MESAJUL = [
  "Se folosește numai ca să răspundem cererii dumneavoastră",
  "Temeiul prelucrării sunt demersuri precontractuale, făcute la cererea dumneavoastră",
  "Nu ajunge la nimeni din afara discuției și nu intră în nicio listă de trimiteri",
  "Rămâne în corespondența noastră, ca să existe o urmă scrisă a cererii și a răspunsului",
];

const NU_CEREM = [
  "Documente scanate sau fișiere cu date personale",
  "Numere de dosar, coduri numerice personale sau date medicale",
  "Inventarul complet al arhivei: îl măsurăm împreună, la fața locului",
];

// Lista din acordeon se scrie o singura data, aici: `Acordeon` primeste noduri, iar bifa nu are
// ce cauta pe un raspuns care e o insiruire de fapte, nu o lista de lucruri promise. Firul din
// stanga nu-si mai scrie culoarea: implicitul global e chiar #d2d2d7 al referintei.
function Insiruire({ elemente }: { elemente: string[] }) {
  return (
    <ul className="m-0 list-none p-0">
      {elemente.map((e) => (
        <li key={e} className="mb-2 border-l-2 pl-4">
          {e}
        </li>
      ))}
    </ul>
  );
}

export default function Contact() {
  return (
    <main id="continut">
      <AntetPagina
        adresa="/contact"
        imagine={FOTOGRAFII.maini}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Contact" }]}
        eticheta={CT.antetEticheta}
        titlu={CT.antetTitlu}
        lead={CT.antetLead}
        // Butonul al doilea RAMANE numai aici, din cele patru pagini ale lotului: /despre e
        // singura destinatie secundara care nu sta si in bara de sus, deci singura care nu
        // repeta un rand deja vizibil. Cand adresa lipseste din configurare, pagina nu are ce
        // actiune sa promita: locul principal il ia „Cine suntem".
        actiune={
          ARE_EMAIL
            ? { href: CATRE, text: "Scrieți-ne la " + entitate.email }
            : { href: "/despre", text: "Cine suntem" }
        }
        secundar={ARE_EMAIL ? { href: "/despre", text: "Cine suntem" } : undefined}
      />

      <SegmentAncore ancore={CT.navigare} eticheta="Secțiunile paginii" />

      <Capitol
        id="drumuri"
        eticheta={CT.drumuriEticheta}
        afirmatie={CT.drumuriTitlu}
        text={CT.drumuriLead}
      >
        <ContactDrumuri
          drumuri={DRUMURI}
          sub={
            // 53 de cuvinte, masurate pe pagina randata. Forma dinainte avea 69, adica zece
            // randuri neintrerupte la 390 px - `BlocDovada` randeaza UN paragraf si e o
            // componenta inghetata in valul asta, deci pauza vizuala nu se putea adauga
            // inauntru; s-a scurtat textul, fara sa se piarda vreo propozitie de fond.
            <BlocDovada>
              <strong className="font-semibold text-cerneala">
                Nu există niciun formular pe site:
              </strong>{" "}
              nici aici, nici pe pagina de start. Un câmp în care se scrie o cerere are nevoie de
              un destinatar, iar 3S nu are încă unul. Până atunci, cererea se lasă pe poșta
              electronică, unde se vede că a plecat. Când formularul are destinatar, apare și
              aici.
            </BlocDovada>
          }
        />
      </Capitol>

      <Capitol
        id="primul-mesaj"
        eticheta={CT.mesajEticheta}
        afirmatie={CT.mesajTitlu}
        text={CT.mesajLead}
        aliniere="centrat"
      >
        <InvestitieCardLista>
          <ListaBifa titlu="Ce ajută să scrieți" elemente={PRIMUL_MESAJ} />
          <ListaBifa titlu="Ce primiți înapoi" elemente={CE_PRIMITI} />
        </InvestitieCardLista>
      </Capitol>

      <InvestitieIntrebari
        id="datele"
        eticheta={CT.dateleEticheta}
        titlu={CT.dateleTitlu}
        lead={CT.dateleLead}
        elemente={[
          {
            intrebare: CT.dateleIntrebari[0],
            raspuns: <Insiruire elemente={CU_MESAJUL} />,
          },
          {
            intrebare: CT.dateleIntrebari[1],
            raspuns: <Insiruire elemente={NU_CEREM} />,
          },
        ]}
      />

      <div id="discutie">
        <BandaCTA
          titlu="Cinci rânduri sunt de ajuns."
          text="Discuția de treizeci de minute se programează din același mesaj. Ne uităm peste umăr la arhiva dumneavoastră așa cum arată ea azi, nu la o prezentare a noastră."
          actiune={
            ARE_EMAIL
              ? { href: CATRE, text: "Scrieți-ne la " + entitate.email }
              : { href: "/despre", text: "Cine suntem" }
          }
          nota={
            <>
              Termenele legale, cu actul normativ citat, stau în{" "}
              <Link
                href="/instrumente/termene-de-pastrare"
                className="text-albastru-2 underline underline-offset-[3px]"
              >
                instrumentul de termene
              </Link>
              .
            </>
          }
        />
      </div>
    </main>
  );
}
