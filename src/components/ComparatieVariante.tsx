import type { FisaComparatie } from "@/content/comparatie";

// SECTIUNEA DE COMPARATIE a referintei, REF-A §4 punctul 6, singura de pe o pagina de produs
// care isi CENTREAZA titlul: h2 de 64 px in mijloc, iar dedesubt coloanele - carduri cu raza
// 28, fiecare cu un h3 de 24 px si o nota de 14.
//
// CARDURILE SUNT `ceata` PE ALB, nu alb pe `ceata` cum le masoara fisa referintei, si inversarea
// e ceruta de vecinul de dedesubt: tabelul e un card ALB si are nevoie de `ceata` sub el ca sa
// se desparta. Doua sectiuni de `ceata` una sub alta ar fi topit granita dintre variante si
// tabel, iar suprafetele paginii ar fi iesit alb, ceata, ceata, negru, alb. Directia da explicit
// amandoua perechile - „ceata pe alb, alb pe ceata" - deci alegerea e intre ele, nu in afara lor.
//
// DE CE 14 SI NU 17 in corpul cardului. Referinta scrie coloanele comparatiei la treapta de
// nota, nu la cea de corp, si asta nu e economie de spatiu: patru coloane citite in paralel se
// scaneaza, nu se citesc rand cu rand, iar treapta mica tine coloana ingusta destul cat sa
// intre patru pe un ecran de 1440. `cerneala-3` la 14 px da 5,07:1 pe alb, deci trece.
//
// PATRU COLOANE PE ECRAN LAT, DOUA LA MIJLOC, UNA PE TELEFON. Nu exista derulare laterala: cele
// patru variante se compara intre ele, iar o coloana scoasa din cadru nu se mai compara cu
// nimic. Aceeasi hotarare, cu aceeasi masuratoare, ca in `ComparatieTabel.tsx`.
//
// TITLUL CENTRAT CERE SI CUTIA CENTRATA: `text-center` singur aliniaza literele in cutie, dar
// cutia ramane lipita la stanga si textul iese cu un umar mai lung - aceeasi capcana pe care o
// numeste `Capitol.tsx` la alinierea centrata.

type Props = {
  id?: string;
  eticheta?: string;
  titlu: React.ReactNode;
  lead?: React.ReactNode;
  elemente: FisaComparatie[];
  /** Randul de legaturi de sub coloane, cand sectiunea trimite mai departe. */
  children?: React.ReactNode;
};

export default function ComparatieVariante({
  id,
  eticheta,
  titlu,
  lead,
  elemente,
  children,
}: Props) {
  return (
    <section id={id} className="bg-alb py-16 md:py-[110px]">
      <div className="mx-auto w-full max-w-vitrina px-4 md:px-8">
        {eticheta ? (
          <span className="mx-auto mb-3 block text-titlu-4 font-semibold text-cerneala text-center md:mb-4">
            {eticheta}
          </span>
        ) : null}
        <h2 className="mx-auto max-w-[20ch] text-titlu-1 text-cerneala text-center">{titlu}</h2>
        {lead ? (
          <p className="mx-auto mt-6 max-w-[59ch] text-capitol font-semibold text-cerneala-3 text-center">
            {lead}
          </p>
        ) : null}

        <ul className="m-0 mt-12 grid list-none gap-6 p-0 md:mt-14 md:grid-cols-2 lg:grid-cols-4">
          {elemente.map((e) => (
            <li key={e.titlu} className="h-full rounded-card bg-ceata p-6 md:p-8">
              <h3 className="text-titlu-4 text-cerneala">{e.titlu}</h3>
              <p className="mt-4 text-nota text-cerneala-3">{e.text}</p>
            </li>
          ))}
        </ul>

        {children ? <div className="mt-12 md:mt-14">{children}</div> : null}
      </div>
    </section>
  );
}
