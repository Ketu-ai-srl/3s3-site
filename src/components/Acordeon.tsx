// Acordeonul de intrebari: fire de 1 px, fara cutii si fara umbre, ca in REF-A. Culoarea
// firului e implicita acum (`globals.css`, regula de chenar), deci aici se scrie doar UNDE e
// linia, nu si ce culoare are - o culoare scrisa a doua oara e o culoare care poate diverge.
//
// Se construieste din `details`/`summary`, nu din stare React, si nu e comoditate: asa
// intrebarea SI raspunsul sunt in HTML-ul servit, deci le citeste si un agent care nu
// executa JavaScript, iar deschiderea merge din tastatura fara sa scriem noi nimic.
//
// Semnul din dreapta e `albastru-2` (5,57:1 pe alb): singurul element colorat din tot
// acordeonul. E ICOANA, deci informatia nu sta in culoarea lui, ci in cuvantul de langa.

type Intrebare = { intrebare: string; raspuns: React.ReactNode };

type Props = {
  elemente: Intrebare[];
};

export default function Acordeon({ elemente }: Props) {
  return (
    <div className="border-t">
      {elemente.map((e) => (
        <details key={e.intrebare} className="group border-b">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-titlu-card font-semibold text-cerneala">
            {e.intrebare}
            <span
              aria-hidden
              className="mt-1 shrink-0 text-albastru-2 transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="max-w-[70ch] pb-6 text-corp text-cerneala-3">{e.raspuns}</div>
        </details>
      ))}
    </div>
  );
}
