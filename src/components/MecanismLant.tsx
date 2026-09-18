import type { Veriga } from "@/content/mecanism";

// Cele cinci verigi ale cautarii, ca LANT vertical, in rama unui capitol.
//
// DE CE NU O GRILA, ca restul multimilor din felie. Verigile nu sunt fapte alaturate, ci o
// ordine: „daca una lipseste, lantul se opreste acolo" e chiar textul sectiunii. O grila de
// doua coloane se citeste in Z, deci ar rupe ordinea pe care sectiunea o afirma.
//
// Pastila numarului e ALBA, nu de ceata: lantul sta in rama de capitol, care e chiar ceata, si
// o pastila de aceeasi culoare cu fundalul nu se vede. Firul dintre verigi e #d2d2d7, firul de
// 1 px al referintei - acelasi cu al chenarelor, prin regula de baza din globals.css.

type Props = {
  verigi: Veriga[];
};

export default function MecanismLant({ verigi }: Props) {
  return (
    <ol className="m-0 list-none p-0">
      {verigi.map((v, i) => (
        <li key={v.titlu} className="relative flex gap-5 pb-8 last:pb-0 md:gap-7">
          <div className="relative shrink-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-pastila bg-alb text-nota font-semibold text-cerneala">
              {i + 1}
            </span>
            {i < verigi.length - 1 ? (
              <span
                aria-hidden
                className="absolute top-11 bottom-[-32px] left-1/2 w-px -translate-x-1/2 bg-[#d2d2d7]"
              />
            ) : null}
          </div>

          <div className="pt-1.5">
            <h3 className="max-w-[28ch] text-titlu-card text-cerneala">{v.titlu}</h3>
            <p className="mt-2 max-w-[58ch] text-corp text-cerneala-3">{v.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
