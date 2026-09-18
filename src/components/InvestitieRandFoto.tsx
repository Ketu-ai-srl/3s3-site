import type { Fotografie } from "@/content/fotografii";

// FOTOGRAFIA DIN RAMA UNUI CAPITOL. E copilul-fotografie pe care `Capitol.tsx` il descrie in
// contractul lui, scris o singura data si folosit de toate paginile feliei, nu copiat in
// fiecare - un `<picture>` de zece randuri repetat de patru ori diverge la prima corectie, si
// nimic nu le-ar compara.
//
// CE ERA INAINTE. Componenta desena un RAND text/imagine pe doua coloane, cu titlu de 40 px la
// stanga si fotografia intr-un card la dreapta - forma directiei anterioare pentru sectiunile
// de mijloc. In REF-A locul acela e chiar capitolul: eticheta, afirmatia de 80 px, paragraful,
// si abia sub ele rama de `ceata` cu fotografia pe toata latimea. Textul a urcat in `Capitol`,
// aici a ramas numai fotografia.
//
// CONTRACTUL, si de ce e scris pe litere. `Capitol` randeaza rama ca `flex`, deci copilul se
// intinde pe inaltime; `h-full` SINGUR nu ajunge sub 768 px, unde inaltimea ramei vine dintr-un
// `min-height` si `height: 100%` nu are contra ce se rezolva - masurat la felia de fundatie,
// fotografia iesea 358 x 537, adica inaltimea proprie a fisierului portret de 960, nu podeaua.
// De aceea `h-[320px]` pe capatul ingust si `md:h-full` pe cel lat.
//
// CELE DOUA FISIERE. Sub 768 px se serveste `-960.webp` (960x1440, portret 2:3), peste - cel de
// 1920 (1920x1280, 3:2). `alt`-ul si ancora verticala `pozitie` vin din registrul
// `src/content/fotografii.ts` si nu se scriu in pagina: registrul e singurul loc in care au
// fost masurate.
//
// FARA TEXT PESTE FOTOGRAFIE, deci fara voal si fara niciun calcul de contrast peste imagine.

type Props = {
  imagine: Fotografie;
  /** Eroul isi incarca fotografia devreme; capitolele sunt sub linia de plutire. */
  incarcare?: "lazy" | "eager";
};

export default function InvestitieRandFoto({ imagine, incarcare = "lazy" }: Props) {
  return (
    <picture className="w-full">
      <source media="(max-width: 767px)" srcSet={"/img/" + imagine.nume + "-960.webp"} />
      <img
        src={"/img/" + imagine.nume + "-1920.webp"}
        alt={imagine.alt}
        className="h-[320px] w-full object-cover md:h-full"
        style={{ objectPosition: imagine.pozitie ?? "center" }}
        loading={incarcare}
        decoding="async"
      />
    </picture>
  );
}
