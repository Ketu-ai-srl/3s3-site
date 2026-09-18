// CARDURILE BENZII DE „HIGHLIGHTS", dupa REF-A §4 punctul 3: banda pe `ceata`, iar in ea
// carduri ALBE cu raza 28 al caror text de sus e 17 / 21 la greutatea 600. Nu e o alta banda
// decat cea a referintei: acolo cardurile poarta cate o proprietate a produsului, aici cate o
// promisiune pe care o tine chiar site-ul.
//
// CE ERA INAINTE, si de ce nu mai e. Randul era o insiruire de trei etichete de 14 px cu cate
// un scut desenat langa ele, centrate pe alb. Doua lucruri il scoteau din gramatica REF-A:
// randul de incredere cu iconite nu exista in referinta, iar iconita insasi e decor - directia
// refuza „grila de fise identice cu icoane". Ce ramane e cardul, care e chiar forma referintei.
//
// TEXTUL DE SUS RAMANE ETICHETA, adica FARA punct: „Fara oferta pripita" nu e propozitie, si o
// eticheta cu punct e agramata. Propozitia care o sustine sta dedesubt, la 14 px `cerneala-3`
// (5,07:1 pe alb), si ea are punct pe drept. Cele doua siruri stau in
// `src/content/interior-investitia.ts`, in liste paralele, si componenta le imperecheaza dupa
// indice: perechea se rupe vizibil daca listele nu au aceeasi lungime, fiindca ultimul card ar
// ramane fara rand.
//
// FARA UMBRA. Cardul alb se desparte de banda de `ceata` prin culoarea lui de fundal, ca orice
// card al directiei.

type Props = {
  /** Eticheta fiecarui card, 17 / 21 la 600. Fara punct: nu sunt propozitii. */
  elemente: string[];
  /** Propozitia de sub eticheta, 14 px. Se imperecheaza dupa indice. */
  note?: string[];
};

export default function InvestitieGarantii({ elemente, note = [] }: Props) {
  return (
    <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-3">
      {elemente.map((e, i) => (
        <li key={e} className="h-full rounded-card bg-alb p-6 md:p-8">
          <p className="text-corp leading-[21px] font-semibold text-cerneala">{e}</p>
          {note[i] ? <p className="mt-3 text-nota text-cerneala-3">{note[i]}</p> : null}
        </li>
      ))}
    </ul>
  );
}
