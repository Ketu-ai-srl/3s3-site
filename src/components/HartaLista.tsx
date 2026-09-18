import Link from "next/link";

// O grupa de rute din harta site-ului, ca LISTA DE LEGATURI pe firul de 1 px - gramatica
// REF-A pentru orice lista.
//
// CE S-A SCHIMBAT LA VALUL S2-b, si de ce. Cele douazeci si doua de rute stateau in carduri de
// ceata cu raza 28, trei pe rand, fiecare cu nume, descriere, adresa si o sageata. Fisa REF-A
// pune cardul acolo unde cardul E continutul - o fisa, un capitol, un domeniu - iar aici
// continutul e o legatura. Douazeci si doua de carduri identice fac dintr-un cuprins o vitrina,
// si asta se vedea: fiecare card avea patruzeci de pixeli de captuseala in jurul unui rand de
// text.
//
// NUMELE E LEGATURA, `albastru-2`, FARA SUBLINIERE - regula pe care fisa o scrie pentru
// legaturile paginii juridice, si care se aplica la fel unei harti. Descrierea si adresa raman
// sub el, la 14 px in `cerneala-3`: harta e singurul loc de pe site unde adresa insasi e
// informatie - se copiaza intr-un mesaj, se lipeste intr-un browser, se compara cu
// `sitemap.xml`.
//
// RANDUL INTREG E LEGATURA, nu doar numele: pe telefon, o tinta de un cuvant intr-o lista de
// douazeci si doua de randuri se rateaza.
//
// COLOANELE. Doua de la 768 px, trei de la 1024 px, una pe telefon. Grupa se vede intreaga
// dintr-o privire, ceea ce e chiar sarcina unei harti, iar randurile raman randuri.
//
// FIRELE SUNT ALE GRUPEI, NU ALE FIECARUI RAND, si e o corectura facuta pe captura la valul
// S2-b. Cu firul pe celula, ultimul rand al grilei ramane incomplet cand numarul de rute nu se
// imparte la numarul de coloane, iar linia de sub el se opreste la o treime sau la doua: pe
// /harta-site se vedea la trei grupe din cinci - zece rute pe trei coloane, unsprezece pe trei,
// una singura la instrumente. Numarul de coloane se schimba cu latimea, deci nicio regula
// scrisa pe „ultimul copil" nu il acopera la toate trei. Firele urca pe lista, unde nu depind
// de cate elemente au ramas pe ultimul rand, si randurile se despart prin spatiu.

export type RandHarta = {
  cale: string;
  scurt: string;
  descriere: string;
};

type Props = {
  rute: RandHarta[];
  /** Ramas in semnatura pentru paginile care il dau inca; lista nu mai are card. */
  fundal?: "alb" | "ceata";
  /**
   * Cate coloane de la 1024 px in sus. Trei e implicitul grupelor mari din harta; doua e
   * pentru cele patru drumuri ale paginii de 404, unde trei coloane lasa al patrulea rand
   * singur pe randul al doilea. Nu e o optiune de gust: se alege dupa cate rute sunt.
   */
  coloane?: 2 | 3;
};

export default function HartaLista({ rute, coloane = 3 }: Props) {
  return (
    <ul
      className={
        "m-0 grid list-none gap-x-8 gap-y-6 border-t border-b py-6 pl-0 md:grid-cols-2 " +
        (coloane === 3 ? "lg:grid-cols-3" : "")
      }
    >
      {rute.map((r) => (
        <li key={r.cale}>
          <Link href={r.cale} className="block no-underline">
            <span className="block text-corp font-semibold text-albastru-2">{r.scurt}</span>
            <span className="mt-1 block text-nota text-cerneala-3">{r.descriere}</span>
            <span className="mt-1 block text-nota text-cerneala-3">{r.cale}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
