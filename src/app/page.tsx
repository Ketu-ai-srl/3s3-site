import type { Metadata } from "next";
import Link from "next/link";
import BandaIncredere from "@/components/BandaIncredere";
import Ecran from "@/components/Ecran";
import { FOTOGRAFII, type CheieFotografie } from "@/content/fotografii";
import { GRILA, INCREDERE, NOTE, TIGLE } from "@/content/start";

// Pagina de start, pe gramatica REF-A: trei tigle mari pe toata latimea, o grila de sase tigle,
// banda neagra a faptelor atribuite, notele numerotate, subsolul (din layout).
//
// CE A DISPARUT FATA DE DIRECTIA ANTERIOARA, si de ce fiecare lucru in parte:
//   - EROUL COLORAT. Referinta nu are erou: are tigle. Prima tigla e chiar primul argument, nu
//     un afis deasupra lui.
//   - FILELE-PASTILA ale celor trei etape. Comutau panouri cu JavaScript, iar cele trei etape
//     sunt acum chiar cele trei tigle mari - deschise amandoua, adica toate trei, tot timpul.
//   - BANDA CTA COLORATA. Referinta n-are banda de brand nicaieri; chemarea la actiune sta in
//     pastila plina a fiecarei tigle. Un buton primar pe tigla, si tigla e ecranul.
//   - GRILA CELOR SAPTE DOMENII. A ramas o singura tigla care duce la `/solutii`; cele sapte
//     pagini sunt in subsol, in coloana lor, deci nu s-a pierdut nicio legatura interna.
//   - PRETURILE. N-au fost niciodata pe start si nu urca acum.
//
// ANCORELE `scan`, `store`, `solve`, `domenii` si `discutie` raman, cu aceleasi nume:
// `/harta-site` si subsolul fac legaturi catre ele, iar o ancora fara tinta e legatura moarta pe
// o pagina care exista tocmai ca sa arate drumurile. Acum sunt chiar tigle, deci `/#store` nu
// mai deschide o fila, ci opreste derularea la ecranul cerut.
//
// FOTOGRAFIILE nu poarta text peste ele nicaieri. Textul sta DEASUPRA, in partea de sus a
// tiglei, iar fotografia umple ce ramane. De aceea pe pagina asta nu exista niciun voal, niciun
// contrast peste imagine si niciun bloc pe care axe sa-l lase „needs review".
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Ancora decupajului se citeste din registru, nu se scrie a doua oara in `start.ts`: cifrele
// sunt masurate pe cadru, si o copie a lor ar diverge la prima remasurare.
function pozitia(nume: string): string | undefined {
  return FOTOGRAFII[nume as CheieFotografie]?.pozitie;
}

export default function Acasa() {
  return (
    <main id="continut">
      {/* Cele trei tigle mari, despartite prin 12 px de alb - `gap-3`. Fundalul containerului e
          alb, deci rostul dintre tigle e chiar alb, cum il masoara referinta. */}
      <div className="flex flex-col gap-3 bg-alb">
        {TIGLE.map((t, i) => (
          <Ecran
            key={t.cheie}
            id={t.cheie}
            nivel={i === 0 ? "h1" : "h2"}
            ton="erou"
            fundal={t.fundal}
            titlu={t.titlu}
            text={t.subtitlu}
            actiune={t.actiune}
            secundar={t.secundar}
            imagine={{ ...t.imagine, pozitie: pozitia(t.imagine.nume) }}
            // Prima tigla incepe sub bara globala, care e fixa: 48 px pe telefon, 44 de la
            // 768 px in sus. Fara rezerva, titlul ei ar incepe sub bara.
            className={i === 0 ? "pt-[48px] md:pt-[44px]" : ""}
          />
        ))}
      </div>

      {/* Grila de doua coloane pe trei randuri, tigle de 580 px la 1440 si 500 px la 390,
          masurate amandoua pe pagina construita, cu 12 px intre ele. Aceeasi despartire ca sus,
          acelasi alb intre ele. */}
      <div className="mt-3 grid grid-cols-1 gap-3 bg-alb md:grid-cols-2">
        {GRILA.map((t) => {
          const peNegru = t.fundal === "negru";
          const fundal =
            t.fundal === "negru" ? "bg-negru" : t.fundal === "ceata" ? "bg-ceata" : "bg-alb";
          return (
            <section
              key={t.titlu}
              id={t.cheie}
              className={
                // Tiglele CU fotografie au 580 px la 1440, cifra masurata pe referinta, cu
                // fotografia pe `flex-1 min-h-0` (ia doar ce ramane). Sub 768 tigla NU e legata
                // la cei 500 px ai referintei: textul romanesc e mai lung si fotografiei ii
                // ramanea o fasie; tigla creste cu textul si fotografia are 320 px ficsi (vezi
                // Ecran.tsx si DIRECTIA.md). Podeaua veche (`min-h-`) nu se intoarce: cu ea
                // cutia fotografiei lua 585 px la 390 si tigla iesea 885-900 px.
                // Cele fara fotografie pastreaza podeaua, fiindca n-au niciun element elastic
                // care sa absoarba un text mai lung; masurat, ele dau oricum exact 320 px.
                // Sunt mai scunde, si nu din economie: masurat pe captura, o tigla de 580 px cu
                // doua randuri de text si o pastila lasa 340 px de suprafata goala sub ele,
                // adica un gol care se citeste ca lipsa, nu ca ritm. Cele doua tigle fara cadru
                // stau pe acelasi rand, deci randul ramane drept.
                "flex flex-col overflow-hidden " +
                (t.imagine ? "md:h-[580px] " : "min-h-[320px] md:h-[380px] ") +
                fundal
              }
            >
              <div className="shrink-0 px-4 pt-14 text-center md:px-10">
                <h3
                  className={
                    "mx-auto max-w-[18ch] text-titlu-3 " +
                    (peNegru ? "text-ceata" : "text-cerneala")
                  }
                >
                  {t.titlu}
                </h3>
                <p
                  className={
                    "mx-auto mt-3 max-w-[34ch] text-subtitlu " +
                    (peNegru ? "text-ceata" : "text-cerneala")
                  }
                >
                  {t.subtitlu}
                </p>
                {/* Nota de 14 px: `cerneala-3` pe deschis (5,07:1 pe alb, 4,66:1 pe ceata).
                    `cerneala-2` ar da 3,62 si 3,33, deci sub prag la marimea asta. */}
                <p
                  className={
                    "mx-auto mt-3 max-w-[38ch] text-nota " +
                    (peNegru ? "text-ceata" : "text-cerneala-3")
                  }
                >
                  {t.nota}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
                  <Link
                    href={t.actiune.href}
                    className={
                      "inline-flex items-center justify-center rounded-pastila px-[15px] py-[8px] text-nota leading-[20px] font-semibold no-underline transition-colors duration-200 " +
                      (peNegru
                        ? "bg-alb text-cerneala hover:bg-ceata"
                        : "bg-albastru text-alb hover:bg-albastru-2")
                    }
                  >
                    {t.actiune.text}
                  </Link>
                  {t.secundar ? (
                    <Link
                      href={t.secundar.href}
                      className={
                        "inline-flex items-center justify-center rounded-pastila px-[15px] py-[8px] text-nota leading-[20px] font-semibold no-underline transition-colors duration-200 " +
                        (peNegru
                          ? "contur-albastru-clar text-albastru-clar hover:bg-[#141414]"
                          : "contur-albastru text-albastru-2 hover:bg-alb")
                      }
                    >
                      {t.secundar.text}
                    </Link>
                  ) : null}
                </div>
              </div>

              {t.imagine ? (
                <div className="mt-10 h-[320px] w-full md:h-auto md:min-h-0 md:flex-1">
                  <picture>
                    <source
                      media="(max-width: 767px)"
                      srcSet={"/img/" + t.imagine.nume + "-960.webp"}
                    />
                    <img
                      src={"/img/" + t.imagine.nume + "-1920.webp"}
                      alt={t.imagine.alt}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: pozitia(t.imagine.nume) ?? "center" }}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
              ) : null}
            </section>
          );
        })}
      </div>

      <div className="mt-3">
        <BandaIncredere
          eticheta={INCREDERE.eticheta}
          titlu={
            <>
              {INCREDERE.titlu}
              <a href={"#" + NOTE[0].id} className="text-albastru-clar no-underline">
                <sup className="text-mic">1</sup>
                <span className="sr-only"> vezi nota 1</span>
              </a>
            </>
          }
          elemente={INCREDERE.elemente}
        />
      </div>

      {/* Notele numerotate, 12 px, pe alb: locul in care pagina isi scrie limitele. Sunt o
          lista ordonata, nu doua paragrafe, fiindca numarul lor e chiar legatura cu exponentul
          de mai sus. */}
      <section className="bg-alb">
        <div className="mx-auto w-full max-w-vitrina px-4 py-12 md:px-8">
          <ol className="m-0 flex list-none flex-col gap-2 p-0">
            {NOTE.map((n, i) => (
              <li key={n.id} id={n.id} className="flex gap-2 text-mic text-cerneala-3">
                <span aria-hidden>{i + 1}.</span>
                <span className="max-w-[92ch]">{n.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
