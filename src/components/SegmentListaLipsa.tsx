// Lista a ceea ce LIPSESTE: liniuta in loc de bifa.
//
// `ListaBifa`, componenta partajata, e jumatatea cu bifa - ce exista, ce se face, ce se poate
// arata. Asta e cealalta jumatate, si exista fiindca paginile feliei foloseau bifa si pe
// listele „Ce nu putem sustine": un semn de izbanda in dreptul fiecarui lucru pe care nu il
// putem dovedi.
//
// LINIUTA NU E UN CARACTER, e un dreptunghi de 12 x 1 px. Doua motive: poarta de tipografie
// refuza liniile lungi, iar un caracter de liniuta ales gresit s-ar citi cu voce tare in
// dreptul fiecarui rand. Marcajul e `aria-hidden`, deci lista se aude ca lista.
//
// Titlul e pe treapta etichetei de capitol (24), litera la 17 / 25 in `cerneala-3`: 5,07:1 pe
// alb si 4,66:1 pe ceata, deci trece pe amandoua suprafetele pe care sta lista.

type Props = {
  titlu: string;
  elemente: string[];
};

export default function SegmentListaLipsa({ titlu, elemente }: Props) {
  return (
    <div>
      <h3 className="mb-5 text-titlu-4 text-cerneala">{titlu}</h3>
      <ul className="m-0 list-none p-0">
        {elemente.map((e) => (
          <li key={e} className="mb-3 flex gap-3 text-corp text-cerneala-3">
            <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-cerneala-3" />
            <span>{e}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
