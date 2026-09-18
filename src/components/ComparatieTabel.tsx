import { Fragment } from "react";
import type { ColoanaComparatie, RandComparatie } from "@/content/comparatie";

// TABELUL DE COMPARATIE, in gramatica REF-A: un card mare, ALB, cu raza 28, pus pe o sectiune
// de `ceata`; liniile sunt implicitul global #d2d2d7 al referintei; capul de tabel la 14 px si
// greutatea 600; coloana noastra marcata O SINGURA DATA, prin FUNDAL de `ceata` si prin litera
// `albastru-2` in cap. Fara umbra - cardul se desparte de sectiune prin culoarea lui de fundal,
// ca in `Card.tsx`. Fata de valul dinainte s-au schimbat raza (16 -> 28) si culoarea marcajului
// (nu mai exista culoare de brand in paleta); asezarea masurata mai jos a ramas, fiindca
// masuratoarea care a produs-o nu s-a schimbat.
//
// RAMANE O GRILA, NU UN `<table>`, si motivul e cel masurat: patru coloane de proza nu incap la
// 390 px in niciun fel. Ori tabelul depaseste latimea ferestrei si poarta de derapaj opreste
// lotul, ori intra intr-un recipient care se deruleaza lateral, si atunci pe telefon se citeste
// o coloana pe rand, orbeste, fara sa se vada cu ce compari.
//
// PRETUL ALEGERII, scris ca sa nu para gratuit: se pierde semantica de tabel, deci un cititor
// de ecran nu anunta „coloana 3 din 4". Se plateste inapoi punand numele variantei IN FIECARE
// CELULA: pe telefon se vede, pe ecran lat ramane in arborele de accesibilitate prin
// `lg:sr-only`, iar capul de tabel vizual e marcat `aria-hidden`, fiindca ar repeta acelasi
// lucru a doua oara.
//
// PE TELEFON FIECARE RAND E UN CARD, si asta fara sa se randeze nimic de doua ori. Grila ramane
// PLATA - celulele sunt copii directi ai ei, deci nu e nevoie nici de `display: contents`, scos
// ani buni din arborele de accesibilitate de mai multe motoare, nici de doua randari ascunse
// una cate una. Cardul se obtine din culoarea de fundal: intr-o grila cu o singura coloana si
// fara jgheab, intrebarea si cele patru raspunsuri ale ei stau lipite pe acelasi `ceata`,
// primul colt sus rotunjit si ultimul jos. Distanta dintre carduri vine din marginea de sus a
// intrebarii, pusa pe toate randurile in afara de primul; de aceea componenta are nevoie de
// indicele randului, si de aceea nu se poate scrie cu `first:`.
//
// UN RAND INCOMPLET OPRESTE CONSTRUCTIA, nu se deseneaza pe jumatate: o celula lipsa intr-un
// tabel de comparatie se citeste ca „varianta aia nu are raspuns", ceea ce e o afirmatie, nu
// o omisiune.

type Props = {
  coloane: ColoanaComparatie[];
  randuri: RandComparatie[];
};

const GRILA =
  "grid grid-cols-1 gap-0 lg:grid-cols-[minmax(160px,1fr)_repeat(4,minmax(0,1.05fr))]";

export default function ComparatieTabel({ coloane, randuri }: Props) {
  for (const rand of randuri) {
    if (rand.celule.length !== coloane.length) {
      throw new Error(
        "ComparatieTabel: randul `" +
          rand.axa +
          "` are " +
          rand.celule.length +
          " celule pentru " +
          coloane.length +
          " coloane. Un rand incomplet nu se deseneaza.",
      );
    }
  }

  const ultima = coloane.length - 1;

  return (
    <div className="rounded-card-mare bg-alb p-5 md:p-8 lg:p-10">
      <div className={GRILA}>
        {/* Capul de tabel: numai pe ecran lat, si numai vizual. Numele variantei ajunge la
            cititorul de ecran din celula, unde e legat de raspunsul lui. */}
        <div aria-hidden className="hidden lg:block" />
        {coloane.map((c) => (
          <div
            key={c.id}
            aria-hidden
            className={
              "hidden pb-5 lg:block lg:px-5 lg:pt-5 " +
              (c.aNoastra ? "lg:rounded-t-card lg:bg-ceata" : "")
            }
          >
            <span
              className={
                "block text-nota font-semibold " +
                (c.aNoastra ? "text-albastru-2" : "text-cerneala")
              }
            >
              {c.nume}
            </span>
            <span className="mt-2 block text-nota text-cerneala-3">{c.rezumat}</span>
          </div>
        ))}

        {randuri.map((rand, i) => (
          // Fragment, nu un `div`: celulele trebuie sa fie copii directi ai grilei.
          <Fragment key={rand.axa}>
            <div
              className={
                "rounded-t-card bg-ceata px-5 pt-5 pb-3 lg:rounded-none lg:bg-transparent lg:border-t lg:px-0 lg:pr-5 lg:pt-7 lg:pb-9 " +
                (i === 0 ? "" : "mt-4 lg:mt-0")
              }
            >
              <h3 className="max-w-[24ch] text-corp font-semibold text-cerneala">{rand.axa}</h3>
            </div>

            {rand.celule.map((celula, j) => {
              const c = coloane[j];
              // Rotunjirea se decide o singura data per capat, in JS, si se emite o singura
              // clasa `lg:rounded-*`. Doua clase de rotunjire pe acelasi element, amandoua
              // sub `lg:`, s-ar rezolva dupa ordinea din foaia GENERATA, nu dupa ordinea din
              // sirul de aici - adica dupa noroc.
              const colturiLat =
                c.aNoastra && i === randuri.length - 1
                  ? "lg:rounded-t-none lg:rounded-b-card "
                  : "lg:rounded-none ";
              return (
                <div
                  key={c.id}
                  className={
                    "bg-ceata px-5 lg:border-t lg:px-5 lg:pt-7 lg:pb-9 " +
                    (j === ultima ? "rounded-b-card pb-5 " : "pb-4 ") +
                    (c.aNoastra ? "lg:bg-ceata " : "lg:bg-transparent ") +
                    colturiLat
                  }
                >
                  <span className="mb-1 block text-nota font-semibold text-cerneala lg:sr-only">
                    {c.nume}
                  </span>
                  <p
                    className={
                      "text-nota " + (c.aNoastra ? "text-cerneala" : "text-cerneala-3")
                    }
                  >
                    {celula}
                  </p>
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
