import type { SectiuneAcasa } from "@/content/rute";

// Ancorele paginii de start, in harta site-ului: nu sunt pagini, sunt locuri dintr-o pagina.
//
// FORMA, la valul S2-b: aceeasi cu a ancorelor din BARA LOCALA - legaturi simple, fara pastila
// si fara sageata, pe un singur rand care se rupe cand nu incape. Bara locala e locul in care
// REF-A pune trimiterile scurte in interiorul unei pagini, iar cele cinci ancore de aici sunt
// exact asta, doar ca ale ALTEI pagini; deci poarta acelasi semn.
//
// CE ERA INAINTE, si de ce a picat. Cinci pastile albe cu sageata, pe o rama de ceata cu raza
// 28. Pastila e forma BUTONULUI in REF-A - raza 980, o singura marime pe rol - iar cinci
// pastile una langa alta arata a cinci butoane pe acelasi ecran, adica exact regula pe care
// pagina o respecta peste tot in rest.
//
// DE CE ARATA ALTFEL DECAT RANDURILE DE RUTA, si de ce trebuie sa arate altfel. Un rand de
// ruta poarta nume, descriere si adresa, fiindca fiecare e o pagina cu continutul ei; aici nu
// exista nici descriere, nici adresa proprie - exista doar un nume si un diez. Randate la fel,
// cele cinci ancore ar fi aratat ca inca cinci pagini, adica exact afirmatia pe care pagina de
// fata o dezminte in linia ei.

export default function HartaAncore({ sectiuni }: { sectiuni: SectiuneAcasa[] }) {
  return (
    <ul className="m-0 flex list-none flex-wrap items-center gap-x-6 gap-y-2 p-0">
      {sectiuni.map((s) => (
        <li key={s.ancora}>
          <a
            href={"/#" + s.ancora}
            className="text-corp text-albastru-2 no-underline hover:text-cerneala"
          >
            {s.scurt}
          </a>
        </li>
      ))}
    </ul>
  );
}
