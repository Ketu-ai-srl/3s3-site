"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CALE_DISCUTIE, rutePentruMeniu } from "@/content/rute";

const LEGATURA =
  "text-[14px] no-underline whitespace-nowrap text-cerneala transition-colors duration-200 hover:text-albastru-2";

export default function Navigatie() {
  const cale = usePathname();
  const pagini = rutePentruMeniu();
  const [deschis, setDeschis] = useState(false);
  const butonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDeschis(false);
  }, [cale]);
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
      <div className="mx-auto flex h-[64px] max-w-vitrina items-center gap-6 px-4 md:h-[80px] md:px-8">
        <Link href="/" className="flex items-baseline gap-2 text-cerneala no-underline">
          <span className="text-[32px] leading-none font-semibold tracking-[-0.01em]">3S</span>
          
          <span className="hidden text-mic text-cerneala xl:inline">Scan · Store · Solve</span>
        </Link>

        <nav className="ml-auto flex items-center gap-5" aria-label="Meniu principal">
          <div className="hidden items-center gap-6 xl:flex">
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

          
          <Link
            href={CALE_DISCUTIE}
            className="hidden shrink-0 rounded-pastila bg-albastru px-[18px] py-[11px] text-[14px] leading-[18px] font-semibold text-alb no-underline transition-colors duration-200 hover:bg-albastru-2 sm:inline-block"
          >
            Să discutăm
          </Link>

          <button
            ref={butonRef}
            type="button"
            onClick={() => setDeschis((d) => !d)}
            aria-expanded={deschis}
            aria-controls="meniu-pliabil"
            className="-mr-1 shrink-0 cursor-pointer border-0 bg-transparent p-1.5 text-cerneala xl:hidden"
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

      
      <div
        id="meniu-pliabil"
        hidden={!deschis}
        className="fixed inset-x-0 top-[64px] h-[calc(100dvh-64px)] overflow-y-auto border-t bg-alb md:top-[80px] md:h-[calc(100dvh-80px)] xl:hidden"
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
