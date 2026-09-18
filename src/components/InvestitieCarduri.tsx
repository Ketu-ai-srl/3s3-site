import Card from "./Card";

// RANDUL DE CARDURI ALBE, in cele doua locuri in care REF-A il pune: in rama de `ceata` a unui
// capitol (§4 punctul 4) si direct pe o banda de `ceata` (§4 punctul 5). Aceeasi forma, doua
// asezari, deci un singur fisier cu un comutator - nu doua componente care ar diverge.
//
// CARDUL E `Card` cu `fundal="ceata"`, adica alb cu raza 28, titlu de 24 si corp de 17 in
// `cerneala-3`. E componenta INGHETATA a fundatiei si se importa asa cum e; ce adauga fisierul
// asta e numai grila si captuseala ramei.
//
// CAPTUSEALA E A RAMEI, NU A CARDULUI. Rama capitolului e o cutie cu raza 28 si fara padding:
// carduri lipite de muchia ei ar arata a greseala. Cand randul sta pe banda, captuseala vine
// din sectiune si aici nu mai trebuie nimic - de aici `inRama`.
//
// RANDUL SE CENTREAZA IN RAMA, si asta nu e cosmetica. Rama capitolului are o PODEA de 620 px
// la 1440; un rand de carduri mai scund lasa sub el o banda de `ceata` goala - masurat pe
// /despre: carduri de ~330 px intr-o rama de 620, adica 210 px de nimic sub ele, care se
// citeste ca „aici lipseste ceva". Prima reparatie a fost intinderea cardurilor pe toata
// inaltimea (`flex-1`) si a MUTAT defectul, nu l-a scos: golul a ajuns inauntrul cardului alb,
// ~320 px de alb sub cinci randuri de text, masurat pe aceeasi captura. Ce ramane e a treia
// iesire: cardurile isi pastreaza inaltimea data de text, iar randul se centreaza pe verticala
// in rama, deci surplusul se imparte in doua si devine captuseala simetrica. Cardurile din
// acelasi rand raman egale intre ele - grila le intinde pe cel mai inalt - deci nu apar muchii
// de jos la inaltimi diferite; de aceea randul nu mai poarta nici `items-start`.

type Element = { titlu: string; text: string };

const COLOANE: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

type Props = {
  elemente: Element[];
  /** Cate coloane pe ecran lat. Implicit, cate elemente sunt, pana la patru. */
  coloane?: 2 | 3 | 4;
  /** Randul sta in rama unui capitol si are nevoie de captuseala. */
  inRama?: boolean;
  /** Ce mai sta sub rand, in aceeasi captuseala: o nota, un bloc de dovada. */
  children?: React.ReactNode;
};

export default function InvestitieCarduri({
  elemente,
  coloane,
  inRama = true,
  children,
}: Props) {
  const grila = COLOANE[coloane ?? Math.min(elemente.length, 4)] ?? COLOANE[3];
  return (
    <div className={inRama ? "flex w-full flex-col justify-center p-6 md:p-10" : "w-full"}>
      <ul className={"m-0 grid list-none gap-6 p-0 " + grila}>
        {elemente.map((e) => (
          <li key={e.titlu}>
            <Card titlu={e.titlu} fundal="ceata" mare>
              {e.text}
            </Card>
          </li>
        ))}
      </ul>

      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}
