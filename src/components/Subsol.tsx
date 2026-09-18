
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
  "text-[14px] text-cerneala-3 no-underline transition-colors duration-200 hover:text-cerneala";


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
    <footer className="bg-ceata border-t">
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
            <span className="text-[14px] text-cerneala-3">Scan · Store · Solve</span>
          </Link>
          <p className="mt-3 max-w-[64ch] text-[14px] text-cerneala-3">
            3S este proiectul ADRIA Servicii Arhivare SRL, Golești, județul Argeș, firma-mamă
            care arhivează documente din 2019. Contract în limba română, sub lege română.
          </p>
          <a href="mailto:contact@3s.ro" className="mt-3 inline-block text-mic text-albastru-2">
            contact@3s.ro
          </a>
        </div>

        <Identificare />

        
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-6 text-[14px] text-cerneala-3">
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
