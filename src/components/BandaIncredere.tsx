// Banda de incredere: TIGLA NEAGRA, singura suprafata inchisa a directiei REF-A. Litera e
// `ceata` (19,29:1 pe negru), nu alb: asa scrie referinta pe suprafetele ei inchise, si
// diferenta se vede - albul pur pe negru vibreaza la marimi mici.
//
// Legaturile de pe negru, cand exista, sunt `albastru-clar` (6,96:1). `albastru-2`, care duce
// legaturile pe deschis, da pe negru 3,77:1 si nu are ce cauta aici; simetric, `albastru-clar`
// da pe alb 3,02:1 si nu are ce cauta pe deschis. Fiecare albastru are UN capat pe care trece.
//
// Ce scrie pe ea sunt afirmatii ATRIBUITE, din registrul `src/content/afirmatii/`: ce face
// ADRIA, firma-mama, si ce se intampla la preluare. Nu se adauga cifre noi si nu se scrie
// „avem X ani" - poarta de adevar refuza forma cu persoana intai, si pe drept: firma 3S nu e
// inregistrata inca.

type Element = { titlu: string; text: string };

type Props = {
  eticheta?: string;
  titlu: React.ReactNode;
  elemente: Element[];
};

// Coloanele urmeaza NUMARUL de elemente, nu un patru fix. Pana la valul precedent grila era
// `lg:grid-cols-4` pentru orice lista, si /despre, cu cele cinci fapte mostenite de la ADRIA,
// lasa al cincilea singur pe randul al doilea la 1440. Numele claselor sunt scrise intregi, nu
// compuse: Tailwind genereaza doar clasele pe care le gaseste literal in sursa.
const COLOANE: Record<number, string> = {
  3: "md:grid-cols-3",
  5: "md:grid-cols-3 lg:grid-cols-5",
};
const COLOANE_IMPLICIT = "md:grid-cols-2 lg:grid-cols-4";

export default function BandaIncredere({ eticheta, titlu, elemente }: Props) {
  const coloane = COLOANE[elemente.length] ?? COLOANE_IMPLICIT;
  return (
    <section className="bg-negru">
      <div className="mx-auto w-full max-w-vitrina px-4 py-24 md:px-8 md:py-28">
        {eticheta ? (
          <span className="mb-4 block text-mic font-semibold text-albastru-clar">{eticheta}</span>
        ) : null}
        <h2 className="max-w-[22ch] text-titlu-2 text-ceata">{titlu}</h2>
        <ul className={"m-0 mt-12 grid list-none gap-8 p-0 " + coloane}>
          {elemente.map((e) => (
            // Firul de pe negru nu poate fi cel implicit (#d2d2d7): pe negru ar fi o linie
            // aproape alba, adica un chenar mai puternic decat textul de langa el. #333336 e
            // acelasi gest ca firul de pe alb - se vede, si atat.
            <li key={e.titlu} className="border-t border-[#333336] pt-5">
              <h3 className="text-titlu-card text-ceata">{e.titlu}</h3>
              <p className="mt-2 text-corp text-ceata">{e.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
