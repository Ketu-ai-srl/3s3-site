import { STARI } from "@/content/termene";
import type { TermenCuAncora } from "@/content/termene-extins";

// O fisa de termen, ca un CARD ALB pe ceata, randata INTREAGA si STATIC.
//
// Fiecare rand e in HTML de la prima cerere, cu ancora lui, deci pagina se poate tipari,
// trimite prin mesaj cu trimitere la un rand anume, si citi de un crawler care nu executa
// JavaScript. Poarta care cere continut in HTML brut il vede pe tot.
//
// FORMA, pe gramatica REF-A (val S2-b), in ordinea in care le cauta cineva care a deschis
// pagina cu o intrebare:
//
//   starea      pastila de 24 px, cu perechea de clase din `STARI`;
//   categoria   h3 de 20 / 29 la 600 (`text-titlu-card`), treapta titlului de card;
//   termenul    40 / 47,6 la 600 (`text-titlu-3`) - cifra e RASPUNSUL, deci e cel mai mare
//               lucru de pe card;
//   temeiul     14 px in `cerneala-3`, pe randul lui;
//   nota        17 / 25 in `cerneala`.
//
// CE S-A SCHIMBAT FATA DE VALUL S1-b. Randurile dinauntru erau o lista de definitii cu firul
// de 1 px si cu etichete la 14 px la 600 („Curge din", „Temei legal"), iar temeiul statea
// intr-o stampila colorata cu fundal propriu. Cardul avea deci trei suprafete una in alta.
// REF-A pune pe un card alb text, si atat: eticheta randului si valoarea lui stau pe acelasi
// rand de text, iar temeiul e o linie de 14 px sub cifra. Stampila a iesit odata cu ea.
//
// STAREA isi ia culorile din `STARI` (`src/content/termene.ts`), nu de aici: trei perechi de
// clase, cate una pe stare. Nu se citeaza pe litere in niciun comentariu - probele cauta
// numele de culori in sursa si citesc fisierul intreg, nu doar codul; un comentariu care scrie
// clasa devine chiar instanta pe care proba o vaneaza.

export default function TermeneFisa({
  termen,
  fundal = "ceata",
}: {
  termen: TermenCuAncora;
  /** pe ce sta cardul: `ceata` = sectiune de ceata, deci cardul e alb */
  fundal?: "alb" | "ceata";
}) {
  const stare = STARI[termen.stare];

  return (
    <article
      id={termen.ancora}
      className={
        "flex h-full flex-col rounded-card p-6 md:p-8 " +
        (fundal === "ceata" ? "bg-alb" : "bg-ceata")
      }
    >
      <span
        className={`mb-5 inline-block w-fit rounded-pastila px-[10px] py-[3px] text-mic leading-[18px] font-semibold ${stare.clase}`}
      >
        {stare.text}
      </span>

      <h3 className="text-titlu-card font-semibold text-cerneala">{termen.tip}</h3>

      {termen.termen ? (
        <p className="mt-3 text-titlu-3 font-semibold text-cerneala">{termen.termen}</p>
      ) : (
        <p className="mt-3 text-capitol text-cerneala-3">Rând lăsat gol, intenționat</p>
      )}

      {termen.lege ? (
        <p className="mt-2 text-nota text-cerneala-3">{termen.lege}</p>
      ) : null}

      {termen.dela ? (
        <p className="mt-5 text-corp text-cerneala">
          <span className="font-semibold">Curge din:</span> {termen.dela}
        </p>
      ) : null}

      {termen.legeNota ? (
        <p className="mt-3 text-corp text-cerneala">{termen.legeNota}</p>
      ) : null}

      {/* Eticheta sta pe randul ei, nu lipita in fata frazei: una dintre note are 55 de
          cuvinte, iar cu eticheta in acelasi paragraf blocul trecea de 60 fara nicio pauza
          vizuala - masurat pe pagina construita. */}
      <span className="mt-5 block text-nota font-semibold text-cerneala">
        {termen.termen ? "Ce mai trebuie știut" : "De ce este gol"}
      </span>
      <p className="mt-1 text-corp text-cerneala">{termen.nota}</p>
    </article>
  );
}
