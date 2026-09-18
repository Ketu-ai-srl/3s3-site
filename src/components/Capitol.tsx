// CAPITOLUL de pagina interioara, dupa REF-A §4 punctul 4. E a doua componenta partajata a
// gramaticii REF-A, langa eroul din `AntetPagina`, si pana la felia asta exista doar ca RETETA
// scrisa in `docs/design/DIRECTIA.md` - jetoanele `text-afirmatie` (80 / 40) si `text-titlu-4`
// (24) erau definite in `globals.css` si nu le randa nimeni.
//
// FORMA, masurata pe referinta: pe alb, in containerul de 980 (`max-w-registru`, jetonul care
// exista deja), cu
//
//   eticheta    24 px, greutatea 600, `cerneala` (16,83:1 pe alb)
//   afirmatia   h2, 80 px la 1440 si 40 la 390, greutatea 600, `cerneala`
//   paragraful  21 / 29, greutatea 600, `cerneala-3` (5,07:1 pe alb)
//   copilul     fotografia sau cardurile, intr-o rama de 980 x cel putin 620, raza 28, pe `ceata`
//
// ALINIEREA ALTERNEAZA pe referinta - un capitol la stanga, urmatorul centrat - si de aceea e
// un camp, nu o decizie luata inauntru: componenta nu stie al catelea capitol e pe pagina.
//
// CULOAREA PARAGRAFULUI E `cerneala-3`, NU griul referintei. Referinta scrie paragraful de
// capitol cu #86868b la 21 px si greutatea 600; masurat cu axe pe arborele construit, asta da
// 3,62:1, impact `serious`. Usa de 3:1 pentru „text mare" din WCAG se deschide de la 24 px sau
// de la 18,66 px CU greutatea 700, iar 600 nu e „bold" acolo. Marimea ramane cea masurata
// (21 / 29); culoarea urca la 5,07:1. Cele trei iesiri cantarite: `globals.css`.
//
// RAMA DA CUTIA, COPILUL DA CONTINUTUL. Referinta pune in capitol fie o fotografie mare, fie un
// rand de carduri; ce e inauntru difera de la pagina la pagina, deci componenta nu decide. Ce
// decide e cutia: raza 28, fundal `ceata`, si o PODEA de inaltime, nu o inaltime legata - un
// rand de carduri mai inalt decat podeaua trebuie sa poata creste, altfel rama l-ar taia.
//
// CONTRACTUL COPILULUI-FOTOGRAFIE, masurat pe pagina construita, fiindca el NU se ghiceste:
// `<picture className="w-full">` cu `<img className="h-[320px] w-full object-cover md:h-full">`.
// Rama e `flex`, deci copilul se intinde pe inaltime; `h-full` singur NU ajunge sub 768 px,
// unde inaltimea ramei vine dintr-un `min-height` si `height: 100%` nu are contra ce se
// rezolva - masurat, rama iesea 358 x 537, adica inaltimea proprie a fisierului portret de 960,
// nu podeaua. Cu cei 320 px scrisi pe capatul ingust si `md:h-full` pe cel lat, masuratoarea da
// 916 x 620 la 1440 si 358 x 320 la 390, exact cifrele ramei.
//
// PODEAUA DE 620 px LA 1440 e aleasa masurat, din intervalul de 560-740 al referintei, si cifra
// de plecare e latimea REALA a ramei: masurata pe pagina construita, cu `clientWidth` 1440, rama
// are 916 px - cei 980 ai registrului minus captuseala de 2 x 32. Raportul cutiei iese 916 / 620
// = 1,477, iar fisierele de 1920 ale site-ului sunt toate 1920x1280, adica 1,500. Cele doua
// rapoarte sunt la 1,5% distanta si asta e chiar argumentul: o fotografie asezata aici cu
// `object-cover` se decupeaza pe LATIME, nu pe inaltime, deci se vede TOATA inaltimea cadrului
// si `pozitie` - ancora verticala masurata pentru fiecare cheie in `src/content/fotografii.ts` -
// nu are ce sa aleaga si nu poate gresi. La 740 raportul ar fi fost 1,238 si s-ar fi taiat 17,5%
// din latime; la 560, 1,636, si s-ar fi pierdut 8,3% din inaltime, adica exact intrebarea pe
// care alegerea de acum o inchide. Sub 768 px podeaua e 320 px, aceeasi cifra ca fotografia
// tiglelor de pe start.
//
// FARA UMBRA, FARA GRADIENT, FARA TEXT PESTE FOTOGRAFIE: cutia se desparte de pagina prin
// culoarea de fundal, `ceata` pe alb, ca orice card al directiei.

type Props = {
  /** Ancora sectiunii, pentru bara locala. */
  id?: string;
  /** Randul de 24 px de deasupra afirmatiei. Lipseste cand capitolul se deschide direct. */
  eticheta?: string;
  /** Afirmatia capitolului, h2 de 80 px. */
  afirmatie: React.ReactNode;
  /** Paragraful de sub afirmatie. */
  text?: React.ReactNode;
  /** Referinta alterneaza capitolele stanga / centrat. */
  aliniere?: "stanga" | "centrat";
  /** Fotografia sau cardurile, in rama de 980. Fara ele, capitolul e doar text. */
  children?: React.ReactNode;
};

export default function Capitol({
  id,
  eticheta,
  afirmatie,
  text,
  aliniere = "stanga",
  children,
}: Props) {
  const centrat = aliniere === "centrat";
  // Centrarea cere si `mx-auto` pe blocurile cu latime limitata: `text-center` singur aliniaza
  // literele in cutie, dar cutia ramane lipita la stanga si textul iese cu un umar mai lung.
  const inCutie = centrat ? "mx-auto text-center" : "";

  return (
    // Ritmul vertical al referintei pentru o sectiune de capitol: 110 px sus si jos la 1440
    // (§3 „ritm" din fisa REF-A da 110-160 px, iar capitolul e capatul de jos al intervalului -
    // 160 e pentru sectiunea de mediu, cea mai rara de pe pagina). Sub 768 px se strange la 64,
    // altfel doua capitole alaturate lasa un ecran gol intre ele pe telefon.
    <section id={id} className="bg-alb py-16 md:py-[110px]">
      <div className="mx-auto w-full max-w-registru px-4 md:px-8">
        {eticheta ? (
          <span
            className={"mb-3 block text-titlu-4 font-semibold text-cerneala md:mb-4 " + inCutie}
          >
            {eticheta}
          </span>
        ) : null}

        {/* Latimea maxima a afirmatiei e in `ch`, si cifra e MASURATA pe pagina construita, cu
            fontul real servit de site: un `ch` al lui Inter la 80 px si greutatea 600 masoara
            52,77 px (canvas `measureText('0')`), adica 0,660 em - nu 0,5, cum s-ar ghici. Rama
            de continut are 916 px la 1440, deci plafonul trebuie sa fie sub 916 / 52,77 = 17,4ch:
            la 18ch ar iesi 950 px, adica peste container, si plafonul n-ar mai plafona nimic.
            17ch = 897 px si chiar leaga.
            CATE RANDURI INSEAMNA. Litera medie a afirmatiei e mai ingusta decat cifra `0`:
            masurat pe eroul construit, `azi.` are 108,8 px la 64 px, adica 0,425 em de caracter.
            La 897 px intra deci aproximativ 26 de caractere pe rand, si trei randuri tin ~79 -
            de doua ori cat are cea mai lunga afirmatie de doua-patru cuvinte. */}
        <h2 className={"max-w-[17ch] text-afirmatie text-cerneala " + inCutie}>{afirmatie}</h2>

        {text ? (
          // 21 / 29 la greutatea 600, in `cerneala-3`: 5,07:1 pe alb. Latimea e tot in `ch` si
          // tot masurata: un `ch` la 21 px si greutatea 600 are 13,85 px, deci 59ch = 817 px -
          // chiar masura pe care referinta o da paragrafului de capitol (817 px pe containerul
          // de 980). Cifra nu e derivata din marimea literei, e citita din pagina.
          <p className={"mt-6 max-w-[59ch] text-capitol font-semibold text-cerneala-3 " + inCutie}>
            {text}
          </p>
        ) : null}

        {children ? (
          <div className="mt-12 flex min-h-[320px] w-full overflow-hidden rounded-card bg-ceata md:mt-14 md:min-h-[620px]">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
