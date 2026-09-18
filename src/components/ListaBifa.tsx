// Lista simpla a directiei REF-A. NU mai are bifa verde, si nu e o economie: referinta nu are
// nicaieri o icoana colorata langa un rand de lista. Bifa era, in plus, o culoare care nu
// putea purta informatie (3,48:1 fata de alb, sub pragul de text), deci semnalul ei era
// decorativ oricum; ce ramane e un fir de 1 px intre randuri, exact ca in listele referintei.
//
// Numele componentei ramane cel mostenit fiindca il scriu unsprezece pagini pe care felia 1 nu
// le atinge. Un nume care descrie ce NU mai face e o datorie, si se plateste la valul S2-b,
// cand paginile alea se rescriu si numele se poate schimba odata cu ele.
//
// `inchis` a ramas in semnatura pentru paginile altor felii care il dau inca; nu mai are efect.

type Props = {
  titlu: string;
  elemente: string[];
  inchis?: boolean;
};

export default function ListaBifa({ titlu, elemente }: Props) {
  return (
    <div>
      <h3 className="mb-5 text-titlu-4 text-cerneala">{titlu}</h3>
      <ul className="m-0 list-none border-t p-0">
        {elemente.map((e) => (
          <li key={e} className="border-b py-3 text-corp text-cerneala-3">
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
}
