// Subsolul, randat din `src/app/layout.tsx`, deci prezent pe fiecare pagina.
//
// REF-A: pe `ceata`, CINCI coloane de legaturi de 12 px cu titlu de coloana tot de 12 px, si un
// rand juridic de 12 px la baza. E cel mai dens loc din pagina, si e singurul loc din tot
// site-ul in care litera coboara la 12 px. FARA buton si FARA chemare la actiune: referinta
// n-are asa ceva in subsol, iar butonul de aici era, oricum, al doilea buton primar al ultimei
// sectiuni de pe fiecare pagina.
//
// COLOANELE SE COMPUN DIN MANIFEST, dupa cale, nu se scriu de mana: o cale care ar disparea din
// `RUTE` ar disparea si de aici, in loc sa ramana o legatura moarta pe toate cele 22 de pagini -
// subsolul sta in layout, deci un rand gresit aici e gresit peste tot. A cincea coloana e
// cuprinsul paginii de start, compus din `SECTIUNI_ACASA`, cu adresele scrise `/#ancora`:
// pe orice alta pagina un `#ancora` simplu n-ar duce nicaieri.
//
// LITERA DE 12 PX E `cerneala-3`, NU `cerneala-2`. In REF-A cerneala secundara e #86868b, adica
// 3,33:1 pe ceata: sub pragul de 4,5:1 si sub tot ce se poate justifica la 12 px. Referinta isi
// scrie subsolul cu negru translucid (.88, .72, .56 peste `ceata`), adica exact acelasi gest -
// trei trepte de gri - dar noi il facem din jetoane care trec pragul: `cerneala` pentru titlul
// de coloana (15,46:1) si `cerneala-3` pentru legaturi si note (4,66:1).
//
// Nu se repeta tot site-ul. Pentru asta exista `/harta-site`, care e chiar una dintre legaturi.
// Aici a stat si „Pagină verificată la <data>", si nu se intoarce: nimeni nu verificase nimic,
// iar odata ce subsolul a trecut in layout, sigiliul a ajuns si pe pagini pe care nu le citise
// nimeni. O data fara verb e un sigiliu, nu o informatie.

import Link from "next/link";
import {
  CAMPURI_IDENTITATE,
  ETICHETE,
  entitate,
  identitateCompleta,
} from "@/content/entitate";
import { RUTE, SECTIUNI_ACASA } from "@/content/rute";

const GRUPURI: Array<{ titlu: string; cai: string[] }> = [
  {
    titlu: "Ce facem",
    cai: ["/solutii", "/arhivare-fizica", "/cum-functioneaza", "/instrumente/termene-de-pastrare"],
  },
  {
    titlu: "Domenii",
    cai: [
      "/solutii/primarii",
      "/solutii/notari",
      "/solutii/contabilitate",
      "/solutii/avocatura",
      "/solutii/imobiliare",
      "/solutii/constructii",
      "/solutii/logistica",
    ],
  },
  { titlu: "Firma", cai: ["/despre", "/contact", "/investitia", "/comparatie"] },
  { titlu: "Documente", cai: ["/termeni", "/confidentialitate", "/cookies", "/securitate"] },
];

const CAI_JURIDICE = ["/accesibilitate", "/harta-site"];

function legaturi(cai: string[]) {
  return cai.flatMap((cale) => RUTE.filter((r) => r.cale === cale));
}

const LEGATURA =
  "text-mic text-cerneala-3 no-underline transition-colors duration-200 hover:text-cerneala";

/**
 * Blocul de identificare a comerciantului, cerut de Legea 365/2002 art. 5 alin. (1).
 *
 * Se randeaza numai cand TOATE campurile au valoare. Cat timp unul e necompletat, blocul
 * lipseste cu totul: textul `de completat` ajuns pe un site public arata a santier si, mai
 * rau, pare o valoare. Absenta lui e vizibila si mecanic - poarta juridica o trateaza ca
 * avertisment pe mediul de proba si ca oprire la productie, deci site-ul nu poate fi
 * publicat cu identitatea pe jumatate.
 *
 * Telefonul apare aici fiindca il cere art. 5 alin. (1) lit. c). Nu contrazice decizia
 * comerciala de a nu folosi telefonul drept canal de contact: una e datul de identificare
 * al firmei, alta e canalul prin care se primesc cererile.
 */
function Identificare() {
  if (!identitateCompleta()) {
    return null;
  }
  return (
    <dl className="mt-8 grid gap-x-8 gap-y-1.5 border-t pt-6 text-mic sm:grid-cols-2 lg:grid-cols-3">
      {CAMPURI_IDENTITATE.map((camp) => (
        <div key={camp} className="flex flex-wrap gap-x-2">
          <dt className="text-cerneala-3">{ETICHETE[camp]}:</dt>
          <dd className="m-0 text-cerneala">{entitate[camp]}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Subsol() {
  return (
    <footer className="bg-ceata">
      <div className="mx-auto w-full max-w-vitrina px-4 py-16 md:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {GRUPURI.map((grup) => (
            <nav key={grup.titlu} aria-label={grup.titlu}>
              <h2 className="mb-4 text-mic font-semibold text-cerneala">{grup.titlu}</h2>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {legaturi(grup.cai).map((r) => (
                  <li key={r.cale}>
                    <Link href={r.cale} title={r.descriere} className={LEGATURA}>
                      {r.scurt}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="Pagina de start">
            <h2 className="mb-4 text-mic font-semibold text-cerneala">Pagina de start</h2>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {SECTIUNI_ACASA.map((s) => (
                <li key={s.ancora}>
                  <Link href={"/#" + s.ancora} className={LEGATURA}>
                    {s.scurt}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t pt-8">
          <Link href="/" className="flex items-baseline gap-2 text-cerneala no-underline">
            <span className="text-[18px] leading-none font-semibold tracking-[-0.01em]">3S</span>
            <span className="text-mic text-cerneala-3">Scan · Store · Solve</span>
          </Link>
          <p className="mt-3 max-w-[64ch] text-mic text-cerneala-3">
            3S este proiectul ADRIA Servicii Arhivare SRL, Golești, județul Argeș, firma-mamă
            care arhivează documente din 2019. Contract în limba română, sub lege română.
          </p>
          <a href="mailto:contact@3s.ro" className="mt-3 inline-block text-mic text-albastru-2">
            contact@3s.ro
          </a>
        </div>

        <Identificare />

        {/* Randul juridic: 12 px, ca tot subsolul, si sta pe `ceata` - deci se scrie cu
            `cerneala-3` (4,66:1). `cerneala-2` ar da 3,33:1 si ar pica pragul de text mic. */}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-6 text-mic text-cerneala-3">
          <span>© {new Date().getFullYear()} ADRIA Servicii Arhivare SRL</span>
          {legaturi(CAI_JURIDICE).map((r) => (
            <Link key={r.cale} href={r.cale} className="text-cerneala-3 no-underline hover:text-cerneala">
              {r.scurt}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
