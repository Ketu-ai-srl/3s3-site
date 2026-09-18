// Captuseala din interiorul ramei de capitol.
//
// DE CE EXISTA. `Capitol` (componenta partajata, inghetata) da copilului o rama de `ceata` cu
// raza 28 si o podea de 320 / 620 px, dar NU ii da captuseala: exemplul din DIRECTIA.md pune
// acolo o fotografie, care trebuie sa atinga muchia ramei. Cardurile, listele si acordeoanele
// nu au voie sa o atinga, deci captuseala se pune de fiecare data cand copilul e text.
//
// Scrisa o singura data, aici, fiindca altfel cele unsprezece pagini ale feliei ar purta
// aceeasi pereche de clase in vreo treizeci de locuri, si a doua zi in doua marimi diferite.
//
// CONTINUTUL SE CENTREAZA PE VERTICALA, si cifra care a cerut-o e masurata: rama de capitol are
// o PODEA de 620 px la 1440, iar acordeonul de patru intrebari al fisei de notari masoara 300 px
// - cu continutul lipit de marginea de sus ramaneau ~280 px de ceata goala sub el, adica o
// gaura, nu o captuseala. Centrat, aceiasi 280 px se impart in doua si se citesc ca margine.
// Cand continutul e mai inalt decat podeaua, `justify-center` nu face nimic: rama creste, si
// nimic nu se decupeaza.

type Props = {
  children: React.ReactNode;
  /** Clase in plus pe cutia de captuseala, cand o pagina are nevoie de o asezare proprie. */
  className?: string;
};

export default function SegmentCadru({ children, className = "" }: Props) {
  return (
    <div className={"flex w-full flex-col justify-center p-6 md:p-10 " + className}>{children}</div>
  );
}
