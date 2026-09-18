import Link from "next/link";
import JuridicIdentificare from "./JuridicIdentificare";
import type { Bloc, Frag } from "@/content/juridic";
import { MASURA_ACT, MASURA_LISTA } from "@/content/interior-juridic";

// Randarea blocurilor dintr-o sectiune juridica, pe gramatica ACTULUI din REF-A §4: text pe
// toata coloana de 980, fara casete si fara carduri.
//
// TREPTELE, si de unde vine fiecare:
//
//   paragraf     21 / 29 la greutatea 400, in `cerneala` (16,83:1 pe alb). `text-capitol` e
//                jetonul care poarta perechea 21 / 29 la 1440 si 19 / 23 la 390.
//   lista        17 / 25 (`text-corp`), cu liniuta simpla la inceputul randului.
//   rand         h3 de 20 / 29 (`text-titlu-card`) plus paragraful lui, despartite de firul
//                de 1 px. Nu e tabel si nu e card: e o lista de definitii pe doua coloane de
//                la 768 px in sus.
//   legaturi     `albastru-2` FARA subliniere - asa scrie fisa pentru pagina juridica. Pe alb
//                da 5,57:1, deci culoarea singura poarta destul contrast fata de `cerneala`.
//
// CE S-A SCHIMBAT FATA DE VALUL S1-b, si de ce:
//
//   CASETELE AU DISPARUT. `declaratie` si `limite` erau doua carduri cu raza 28 pe ceata,
//   fiecare cu eticheta la 14 px. „Fara casete, fara carduri" e chiar propozitia din fisa
//   pentru pagina juridica, iar cele doua blocuri sunt continut al actului - o declaratie de
//   alegere si o recunoastere de limita - nu note laterale. Raman deci text, cu eticheta lor
//   promovata la titlu de 20 px: acelasi cuvant, aceeasi ordine, alta suprafata.
//
//   MASURA RANDULUI ARE ACUM DOUA TREPTE, si a doua e o REPARATIE masurata. Prima varianta a
//   valului scosese plafonul cu totul, pe argumentul ca 916 px de coloana la 21 px dau un rand
//   in banda de 60-75 de caractere ceruta de fisa. Masurat pe pagina construita, cu un `Range`
//   peste fiecare rand vizual: 95-103 caractere, nu 70. Argumentul uitase `letter-spacing`-ul
//   negativ mostenit de pe `body`, si nu se putea vedea fara masuratoare - nicio poarta nu
//   numara caractere. Plafoanele sunt in `MASURA_ACT` (21 px) si `MASURA_LISTA` (17 px), cu
//   cifrele si metoda langa ele; se pun pe PROZA, iar titlurile si firele raman late cat
//   coloana.
//
// LEGATURILE. Regula e cea din subsol si e mecanica, nu de gust: `Link` pentru o ruta, `<a>`
// cand adresa contine un diez. `Link` trece intre pagini fara reincarcare, dar pe o ancora din
// pagina CURENTA sare peste derularea lina din `globals.css`. Conditia pe diez acopera ambele
// cazuri cu o singura regula, deci nu se poate aplica gresit.

const LEGATURA = "text-albastru-2 no-underline hover:text-cerneala";

function bucata(f: Frag, i: number) {
  if (typeof f === "string") {
    return <span key={i}>{f}</span>;
  }
  if (f.href.includes("#")) {
    return (
      <a key={i} href={f.href} className={LEGATURA}>
        {f.text}
      </a>
    );
  }
  return (
    <Link key={i} href={f.href} className={LEGATURA}>
      {f.text}
    </Link>
  );
}

function Text({ parti }: { parti: Frag[] }) {
  return <>{parti.map(bucata)}</>;
}

export default function JuridicBlocuri({ blocuri }: { blocuri: Bloc[] }) {
  return (
    <>
      {blocuri.map((b, i) => {
        switch (b.fel) {
          case "paragraf":
            return (
              <p key={i} className={`mb-5 ${MASURA_ACT} text-capitol text-cerneala last:mb-0`}>
                <Text parti={b.text} />
              </p>
            );

          case "lista":
            return (
              <ul key={i} className="m-0 mb-5 list-none p-0 last:mb-0">
                {b.elemente.map((e, j) => (
                  <li key={j} className={`mb-3 flex ${MASURA_LISTA} gap-3 text-corp text-cerneala last:mb-0`}>
                    {/* Liniuta e un element real, nu un marcator de lista: se aliniaza pe
                        prima linie oricat de lung ar fi randul. */}
                    <span aria-hidden className="mt-[12px] h-px w-[10px] shrink-0 bg-cerneala-3" />
                    <span>
                      <Text parti={e} />
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "randuri":
            return (
              <div key={i} className="my-8 border-t last:mb-0">
                {b.randuri.map((r) => (
                  <div
                    key={r.titlu}
                    className="grid gap-2 border-b py-5 md:grid-cols-[220px_1fr] md:gap-8"
                  >
                    <h3 className="text-titlu-card font-semibold text-cerneala">{r.titlu}</h3>
                    <p className={`${MASURA_LISTA} text-corp text-cerneala`}>
                      <Text parti={r.text} />
                    </p>
                  </div>
                ))}
              </div>
            );

          case "declaratie":
          case "limite":
            // Aceleasi doua feluri ca inainte - `declaratie` spune ce am ales si de ce,
            // `limite` spune ce nu putem sustine - fara suprafata proprie. Eticheta devine
            // titlul de 20 px al bucatii, adica marcajul pe care actul referintei il da unei
            // subdiviziuni de sectiune.
            return (
              <div key={i} className="my-8">
                <h3 className="text-titlu-card font-semibold text-cerneala">{b.eticheta}</h3>
                <p className={`mt-2 ${MASURA_ACT} text-capitol text-cerneala`}>
                  <Text parti={b.text} />
                </p>
              </div>
            );

          case "identificare":
            return (
              <div key={i} className="my-8">
                <JuridicIdentificare />
              </div>
            );
        }
      })}
    </>
  );
}
