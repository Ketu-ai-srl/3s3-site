// Banda NEAGRA a paginii de produs: afirmatiile atribuite pe care le poate verifica cineva
// inainte sa ne creada pe cuvant.
//
// DE CE NU `BandaIncredere`, componenta partajata. Aceea cere perechi titlu / text si le
// aseaza pe coloane. Listele pe care le poarta banda asta - `aratam` de pe fisele de domeniu
// si de pe pagina partii fizice, `nuDetinem` de pe pagina de securitate - sunt siruri simple,
// propozitii intregi, fara titlu. Taiate in doua ca sa incapa in forma aceea, jumatatile ar fi
// text NOU pus in gura continutului inghetat. Componenta e alaturi, nu in locul ei.
//
// CONTRAST, din valorile paletei: pe `negru`, `ceata` da 19,29:1 si `albastru-clar` 6,96:1.
// Pe negru se scrie `ceata`, nu alb - albul pur vibreaza la marimi mici - iar semnul liniutei
// ia `albastru-clar`, singura culoare de accent care trece pe fundal inchis.

type Props = {
  eticheta: string;
  titlu: React.ReactNode;
  elemente: string[];
  /**
   * Semnul din dreptul fiecarui rand. `bifa` pentru ce se poate verifica, `liniuta` pentru ce
   * LIPSESTE. O bifa in dreptul unui lucru pe care nu il putem dovedi ar fi o izbanda
   * desenata pe o lipsa.
   */
  semn?: "bifa" | "liniuta";
};

export default function SegmentBandaDovezi({
  eticheta,
  titlu,
  elemente,
  semn = "bifa",
}: Props) {
  return (
    <section className="bg-negru">
      <div className="mx-auto w-full max-w-vitrina px-4 py-16 md:px-8 md:py-[110px]">
        <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:items-start md:gap-x-16">
          <div>
            <span className="mb-4 block text-mic font-semibold text-albastru-clar">
              {eticheta}
            </span>
            <h2 className="max-w-[18ch] text-titlu-2 text-ceata">{titlu}</h2>
          </div>

          <ul className="m-0 mt-10 list-none p-0 md:mt-0">
            {elemente.map((e) => (
              <li
                key={e}
                className="flex gap-3 border-t border-[#333336] py-4 text-corp text-ceata first:border-t-0 first:pt-0"
              >
                {semn === "bifa" ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    aria-hidden="true"
                    focusable="false"
                    className="mt-1 shrink-0 text-ceata"
                  >
                    <path
                      d="M3.5 9.5 L7 13 L14.5 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-albastru-clar" />
                )}
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
