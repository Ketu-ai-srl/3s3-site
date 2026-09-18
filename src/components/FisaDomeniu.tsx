import Link from "next/link";

// Un domeniu pe hub-ul /solutii: un card alb pe `ceata`, in grila de doua coloane.
//
// FORMA, dupa REF-A §4: raza 28, fara umbra, titlul la 20 / 29 si greutatea 600, rezumatul la
// 17 / 25 in `cerneala-3`, iar jos o legatura scrisa - „Vedeti fisa" cu chevron, in
// `albastru-2`. Sageata diagonala din coltul de sus a disparut odata cu directia anterioara:
// era un semn fara cuvinte, iar REF-A scrie unde duce cardul.
//
// CELE DOUA STARI RAMAN, si diferenta e tot o decizie de onestitate, nu de stil:
//   - cu `href`: domeniul are pagina proprie, cardul intreg e legatura;
//   - fara `href`: domeniul e pe lista, dar pagina nu exista inca, deci cardul NU e legatura,
//     iar in locul randului de jos sta „In pregatire". O legatura catre o pagina care nu
//     exista e o legatura moarta.
// Starea vine din date (`pagina` nenul in `segmente.ts`), nu dintr-un steag scris de mana pe
// hub: asa nu poate exista un card care promite o pagina inexistenta.

type Props = {
  titlu: string;
  href?: string;
  /** Textul legaturii de jos, citit din continut. */
  legatura: string;
  children: React.ReactNode;
};

const CUTIE = "flex h-full flex-col rounded-card bg-alb p-8 no-underline";
const TITLU = "max-w-[18ch] text-titlu-card text-cerneala";
const REZUMAT = "mt-3 max-w-[42ch] text-corp text-cerneala-3";

export default function FisaDomeniu({ titlu, href, legatura, children }: Props) {
  if (!href) {
    return (
      <li className="list-none">
        <div className={CUTIE}>
          <h3 className={TITLU}>{titlu}</h3>
          <p className={REZUMAT}>{children}</p>
          <span className="mt-auto block pt-6 text-corp font-semibold text-cerneala-3">În pregătire</span>
        </div>
      </li>
    );
  }

  return (
    <li className="list-none">
      <Link href={href} className={CUTIE + " transition-colors duration-200 hover:bg-ceata"}>
        <h3 className={TITLU}>{titlu}</h3>
        <p className={REZUMAT}>{children}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-6 text-corp font-semibold text-albastru-2">
          {legatura}
          <span aria-hidden>&rsaquo;</span>
        </span>
      </Link>
    </li>
  );
}
