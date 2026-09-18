import Card from "./Card";

// Grila de carduri din rama unui capitol: DOUA coloane de la 768 px in sus, una sub el.
//
// Cardul e `Card`, componenta partajata: de acolo vin raza de 28, lipsa umbrei si separarea
// prin culoarea de fundal. Cardurile stau pe `ceata` (rama capitolului), deci sunt albe -
// `fundal="ceata"` inseamna „fundalul pe care STA cardul", nu culoarea lui.
//
// MARIMILE, dupa fisa REF-A: titlul cardului 20 / 29 la greutatea 600 (`text-titlu-card` prin
// `mare={false}`), corpul 17 / 25 in `cerneala-3`. Varianta `mare` a lui `Card` urca titlul la
// 24 si nu se foloseste aici: 24 e treapta ETICHETEI de capitol, si doua roluri pe aceeasi
// treapta sterg ierarhia paginii.
//
// TREI COLOANE raman posibile pentru o singura multime - actele din sectiunea de temei, unde
// randul are trei elemente scurte. Nu e implicit: cerinta valului scrie doua coloane la 1440,
// iar exceptia se cere de la apelant, ca sa se vada in pagina cine o cere.

export type ElementGrila = {
  titlu: string;
  text: string;
};

type Props = {
  elemente: ElementGrila[];
  /** Pe ce STA grila: `ceata` (rama de capitol) da carduri albe, `alb` da carduri de ceata. */
  fundal?: "alb" | "ceata";
  coloane?: 2 | 3;
};

export default function SegmentGrila({ elemente, fundal = "ceata", coloane = 2 }: Props) {
  const grila = coloane === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";

  return (
    <ul className={"m-0 grid list-none gap-4 p-0 " + grila}>
      {elemente.map((e) => (
        <li key={e.titlu}>
          <Card titlu={e.titlu} fundal={fundal}>
            <p className="text-corp text-cerneala-3">{e.text}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
}
