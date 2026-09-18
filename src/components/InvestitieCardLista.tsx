// CARDUL ALB CU DOUA COLOANE de liste, copilul ramei de capitol acolo unde continutul e o
// impartire in doua: ce se plateste o data si ce se plateste lunar, ce primiti si ce nu
// promitem, ce nu scriem si ce aratam in loc.
//
// DE CE UN CARD SI NU DOUA COLOANE PE CEATA. Cele doua liste sunt UN singur lucru citit in
// oglinda; puse direct pe rama, se citesc ca doua sectiuni alaturate si perechea se pierde.
// Cardul alb le tine impreuna si le desparte de rama prin culoare, ca orice card al directiei.
//
// FARA UMBRA si fara chenar intre coloane: distanta face despartirea. Pe telefon coloanele trec
// una sub alta, iar `ListaBifa` isi pastreaza titlul de 24 px deasupra fiecareia, deci perechea
// ramane citibila si acolo unde nu mai sta alaturi.

type Props = {
  /** Cele doua (sau mai multe) coloane, de obicei `ListaBifa`. */
  children: React.ReactNode;
  /** Randul de sub coloane, in acelasi card, despartit prin firul de 1 px. */
  sub?: React.ReactNode;
};

export default function InvestitieCardLista({ children, sub }: Props) {
  return (
    <div className="flex w-full flex-col justify-center p-6 md:p-10">
      <div className="rounded-card bg-alb p-6 md:p-10">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">{children}</div>
        {sub ? <div className="mt-10 border-t pt-8">{sub}</div> : null}
      </div>
    </div>
  );
}
