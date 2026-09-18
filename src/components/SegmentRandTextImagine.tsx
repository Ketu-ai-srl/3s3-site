import Buton from "./Buton";
import type { Fotografie } from "@/content/fotografii";

// Randul text / fotografie: textul la STANGA, fotografia intr-o rama cu raza 28 la DREAPTA de
// la 768 px in sus, dedesubt sub el.
//
// DE CE E SECTIUNE PROPRIE, si nu copilul unui `Capitol`. Rama de capitol e o cutie de `ceata`
// in containerul de 980, si copilul ei e ori o fotografie care atinge muchia, ori carduri.
// Randul asta are DOUA jumatati care se citesc una langa alta, iar textul lui e chiar titlul
// si paragraful pe care un capitol le-ar scrie deasupra ramei: pus inauntru, ar fi aparut de
// doua ori. Sta deci in containerul de vitrina, pe alb, intre doua capitole.
//
// MARIMILE: eticheta 24 (treapta etichetei de capitol), afirmatia 48 (`text-titlu-2`, treapta
// h2-ului de rand de carduri din REF-A §4), paragraful 21 / 29 la 600 in `cerneala-3` - exact
// paragraful de capitol. Fotografia are 320 px sub 768 px, cat masoara si cutia din erou, si
// 420 px de la 768 in sus, unde imparte randul cu textul.
//
// `loading="lazy"`: randul nu apare niciodata pe primul ecran - deasupra lui stau eroul, banda
// de highlights si cel putin un capitol.

type Props = {
  titlu: string;
  text: string;
  legatura: { href: string; text: string };
  eticheta?: string;
  imagine?: Fotografie;
  /** Fotografia la stanga, textul la dreapta. Alterneaza de la o pagina la alta. */
  invers?: boolean;
};

export default function SegmentRandTextImagine({
  titlu,
  text,
  legatura,
  eticheta,
  imagine,
  invers = false,
}: Props) {
  return (
    <section className="bg-alb py-16 md:py-[110px]">
      <div className="mx-auto w-full max-w-vitrina px-4 md:px-8">
        <div className="md:grid md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-16">
          <div className={invers ? "md:order-2" : ""}>
            {eticheta ? (
              <span className="mb-3 block text-titlu-4 font-semibold text-cerneala md:mb-4">
                {eticheta}
              </span>
            ) : null}
            <h2 className="max-w-[20ch] text-titlu-2 text-cerneala">{titlu}</h2>
            <p className="mt-6 max-w-[54ch] text-capitol font-semibold text-cerneala-3">{text}</p>
            <div className="mt-7">
              <Buton href={legatura.href} fel="text">
                {legatura.text}
              </Buton>
            </div>
          </div>

          {imagine ? (
            <div
              className={
                "mt-10 flex h-[320px] w-full overflow-hidden rounded-card md:mt-0 md:h-[420px] " +
                (invers ? "md:order-1" : "")
              }
            >
              <picture className="w-full">
                <source media="(max-width: 767px)" srcSet={"/img/" + imagine.nume + "-960.webp"} />
                <img
                  src={"/img/" + imagine.nume + "-1920.webp"}
                  alt={imagine.alt}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: imagine.pozitie ?? "center" }}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
