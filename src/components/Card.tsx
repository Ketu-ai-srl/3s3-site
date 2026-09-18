import Link from "next/link";

// Cardul REF-A: raza 28 px, FARA umbra, si se desparte de vecinatate prin CULOARE DE FUNDAL -
// ceata pe alb, alb pe ceata. Masurat pe referinta: `box-shadow: none` pe toate cardurile din
// 17 sectiuni. Umbra pe card static nu exista acolo si nu se adauga: pe o pagina alba cu multe
// carduri, umbrele produc exact „grila de cartonase" pe care directia o refuza.
//
// De aceea `fundal` are doua valori si nu o implicita frumoasa: cardul trebuie sa stie pe ce
// sta, altfel iese ceata pe ceata, adica un dreptunghi invizibil.
//
// A TREIA VALOARE, `negru`, e noua: REF-A pune in fiecare grila o tigla inchisa, cu litera
// `ceata` (19,29:1) si legaturi `albastru-clar` (6,96:1). Nu e o culoare de brand pe o banda -
// e absenta oricarei culori.
//
// `mare` nu mai schimba raza, fiindca raza e una singura in toata directia. Schimba doar
// captuseala si marimea titlului.

type Fundal = "alb" | "ceata" | "negru";

type Props = {
  titlu: string;
  children: React.ReactNode;
  /** pe ce sta cardul: `alb` = sectiune alba, deci cardul e ceata; `ceata` = invers */
  fundal?: Fundal;
  eticheta?: string;
  href?: string;
  mare?: boolean;
  className?: string;
};

const CUTIE: Record<Fundal, string> = {
  alb: "bg-ceata",
  ceata: "bg-alb",
  negru: "bg-negru",
};

const HOVER: Record<Fundal, string> = {
  alb: "hover:bg-[#ebebee]",
  ceata: "hover:bg-ceata",
  negru: "hover:bg-[#141414]",
};

export default function Card({
  titlu,
  children,
  fundal = "alb",
  eticheta,
  href,
  mare = false,
  className = "",
}: Props) {
  const peNegru = fundal === "negru";
  const cutie =
    CUTIE[fundal] +
    " " +
    (mare ? "p-8 " : "p-6 ") +
    "block h-full rounded-card no-underline transition-colors duration-200 " +
    className;

  const continut = (
    <>
      {eticheta ? (
        // Eticheta e 12 px, deci NU poate fi `cerneala-2` (3,62:1 pe alb): sub 18,66 px se ia
        // `cerneala-3`, care da 5,07:1 pe alb si 4,66:1 pe ceata.
        <span
          className={
            "mb-3 block text-mic font-semibold " +
            (peNegru ? "text-albastru-clar" : "text-cerneala-3")
          }
        >
          {eticheta}
        </span>
      ) : null}
      <h3
        className={
          (mare ? "text-titlu-4" : "text-titlu-card") +
          " " +
          (peNegru ? "text-ceata" : "text-cerneala")
        }
      >
        {titlu}
      </h3>
      <div className={"mt-2 text-corp " + (peNegru ? "text-ceata" : "text-cerneala-3")}>
        {children}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cutie + " " + HOVER[fundal]}>
        {continut}
      </Link>
    );
  }
  return <div className={cutie}>{continut}</div>;
}
