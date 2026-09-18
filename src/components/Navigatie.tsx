"use client";

// Bara de sus, randata din `src/app/layout.tsx`, deci prezenta pe fiecare pagina.
//
// REF-A: 44 px inaltime (48 pe telefon), alb la 80% cu estompare in spate, fixa, sigla in
// stanga, legaturi de 12 px, iar in dreapta o pastila de 24 px. E cea mai mica bara pe care
// am facut-o: in referinta bara nu e un loc in care stai, e un loc din care pleci.
//
// NU MAI EXISTA STARE TRANSPARENTA. In directia anterioara bara devenea transparenta peste
// eroul violet al paginii de start, fiindca acolo era singurul ecran inchis din tot site-ul.
// REF-A n-are erou colorat - are tigle albe, ceata si negre - deci starea aceea n-ar mai avea
// nici pe ce sa se aplice, si o litera alba peste o tigla alba ar fi alb pe alb. Bara e mereu
// `sticla`: alb translucid cu estompare, litera `cerneala`. Cel mai intunecat lucru care poate
// trece pe sub ea e o fotografie, iar prin alb de 80% cerneala ramane peste 12:1 (calculul e
// in `globals.css`, langa clasa).
//
// Bara ramane FIXA, nu lipita in flux: bara locala a paginilor interioare e `sticky` si se
// opreste SUB ea, iar doua elemente lipite in flux s-ar impinge unul pe altul.
//
// Panoul de sub 768 px e HTML servit de la inceput, doar ascuns: cine citeste pagina fara
// JavaScript vede toate legaturile. Proba `tests/browser/meniu.spec.ts` masoara exact asta,
// plus deschiderea, inchiderea cu Escape si intoarcerea focalizarii pe buton.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CALE_DISCUTIE, rutePentruMeniu } from "@/content/rute";

const LEGATURA =
  "text-mic no-underline whitespace-nowrap text-cerneala transition-colors duration-200 hover:text-albastru-2";

export default function Navigatie() {
  const cale = usePathname();
  const pagini = rutePentruMeniu();
  const [deschis, setDeschis] = useState(false);
  const butonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDeschis(false);
  }, [cale]);

  // Panoul acopera tot ecranul, deci pagina de sub el nu are voie sa se mai deruleze:
  // altfel degetul care cauta un rand din meniu muta pagina, nu meniul.
  useEffect(() => {
    if (!deschis) return;
    const inainte = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = inainte;
    };
  }, [deschis]);

  useEffect(() => {
    if (!deschis) return;
    const laTasta = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDeschis(false);
        butonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", laTasta);
    return () => document.removeEventListener("keydown", laTasta);
  }, [deschis]);

  return (
    <header className="sticla fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-[48px] max-w-vitrina items-center gap-6 px-4 md:h-[44px] md:px-8">
        <Link href="/" className="flex items-baseline gap-2 text-cerneala no-underline">
          <span className="text-[18px] leading-none font-semibold tracking-[-0.01em]">3S</span>
          {/* `cerneala`, nu `cerneala-3`, si e o corectie MASURATA pe captura. Bara e translucida,
              deci fundalul ei nu e o culoare a paletei: e alb la 80% peste ce trece pe dedesubt.
              Cu fotografia cea mai inchisa a paginii sub ea, randul asta de 12 px in `cerneala-3`
              a dat minim 4,07:1 (litera facuta transparenta, pixelii cititi din captura) - sub
              pragul de 4,5:1. Cu `cerneala` urca la 13,03:1. Tabelul de contraste al paletei nu
              acopera cazul asta, fiindca acolo fundalul e o culoare, nu o suprapunere. */}
          <span className="hidden text-mic text-cerneala sm:inline">Scan · Store · Solve</span>
        </Link>

        <nav className="ml-auto flex items-center gap-5" aria-label="Meniu principal">
          <div className="hidden items-center gap-6 md:flex">
            {pagini.map((r) => (
              <Link
                key={r.cale}
                href={r.cale}
                title={r.descriere}
                aria-current={cale === r.cale ? "page" : undefined}
                className={LEGATURA + (cale === r.cale ? " font-semibold" : "")}
              >
                {r.scurt}
              </Link>
            ))}
          </div>

          {/* Pastila de 24 px, marimea masurata a butonului din bara. Litera de 12 px alba pe
              `albastru` da 4,70:1, peste pragul de 4,5:1 pentru text mic. */}
          <Link
            href={CALE_DISCUTIE}
            className="hidden shrink-0 rounded-pastila bg-albastru px-[10px] py-[3px] text-mic leading-[18px] font-semibold text-alb no-underline transition-colors duration-200 hover:bg-albastru-2 sm:inline-block"
          >
            Discuție
          </Link>

          <button
            ref={butonRef}
            type="button"
            onClick={() => setDeschis((d) => !d)}
            aria-expanded={deschis}
            aria-controls="meniu-pliabil"
            className="-mr-1 shrink-0 cursor-pointer border-0 bg-transparent p-1.5 text-cerneala md:hidden"
          >
            <span className="sr-only">{deschis ? "Închideți meniul" : "Deschideți meniul"}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
              {deschis ? (
                <path d="M4 4 L16 16 M16 4 L4 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              ) : (
                <path d="M2 6 H18 M2 14 H18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </nav>
      </div>

      {/* Inaltimea panoului e calculata, nu `bottom-0`: bara e fixa, deci `bottom-0` ar fi
          insemnat marginea de jos a barei, nu a ecranului. Panoul apare doar sub 768 px, unde
          bara are 48 px, deci scaderea e cu 48. */}
      <div
        id="meniu-pliabil"
        hidden={!deschis}
        className="fixed inset-x-0 top-[48px] h-[calc(100dvh-48px)] overflow-y-auto border-t bg-alb md:hidden"
      >
        <div className="mx-auto flex min-h-full max-w-vitrina flex-col px-4 pt-2 pb-10">
          {pagini.map((r) => (
            <Link
              key={r.cale}
              href={r.cale}
              aria-current={cale === r.cale ? "page" : undefined}
              className="border-b py-4 text-subtitlu text-cerneala no-underline"
            >
              {r.scurt}
            </Link>
          ))}
          <Link
            href={CALE_DISCUTIE}
            className="mt-8 inline-flex items-center justify-center self-start rounded-pastila bg-albastru px-[21px] py-[11px] text-corp leading-[22px] font-semibold text-alb no-underline"
          >
            Discuție de 30 de minute
          </Link>
        </div>
      </div>
    </header>
  );
}
