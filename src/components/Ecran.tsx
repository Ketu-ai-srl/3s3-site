import Link from "next/link";
import type { ReactNode } from "react";

// Ecranul, in doua limbaje, si diferenta dintre ele e chiar diferenta dintre pagina de start si
// o pagina interioara in REF-A:
//
//   ton="erou"   TIGLA. Banda pe toata latimea ferestrei, fara container: h2 de 56 px centrat,
//                subtitlu de 28 px, una sau doua pastile centrate, si fotografia MARE dedesubt,
//                in tigla. Fundalul e alb, `ceata` sau negru; pe negru litera e `ceata`. Raza
//                tiglei e ZERO - tiglele se despart intre ele prin 12 px de alb, nu prin colturi.
//   restul       Antet ALB de pagina interioara: eticheta, titlul de 48 px la stanga, un
//                paragraf de 21 / 29, butoanele, iar fotografia, cand pagina da una, intr-un
//                card cu raza 28 in dreapta.
//
// FOTOGRAFIA NU POARTA NICIODATA TEXT PESTE EA. E regula referintei, si ea rezolva dintr-o data
// problema care a costat trei felii in directia de acum doua site-uri: nu mai exista voal de
// calibrat pe fiecare cadru, nici contrast pe care axe il lasa „needs review" si il scoate din
// verdict. Textul sta DEASUPRA fotografiei in tigla, si langa ea in antet.
//
// INALTIMEA. Bara globala e fixa si are 44 px (48 pe telefon), deci fiecare forma isi pune
// singura rezerva. Tigla mare are 692 px la 1440 si 500 px la 390 - cifrele masurate pe
// referinta - iar antetul alb are 96 px de rezerva sus, adica bara plus o rasuflare.

type Imagine = {
  /** numele fisierului fara sufixul de marime, ex. `rafturi` -> rafturi-1920.webp */
  nume: string;
  alt: string;
  /** unde sa se ancoreze decupajul cand cadrul are alta proportie decat fotografia */
  pozitie?: string;
};

type Legatura = { href: string; text: string };

type Fundal = "alb" | "ceata" | "negru";

type Props = {
  id?: string;
  imagine?: Imagine;
  /** eticheta mica de deasupra titlului; tiglele REF-A n-au asa ceva, paginile interioare da */
  eticheta?: string;
  titlu: ReactNode;
  text?: ReactNode;
  /** UN buton primar pe ecran. */
  actiune?: Legatura;
  /** al doilea drum: pastila cu contur pe tigla, legatura de text in antet */
  secundar?: Legatura;
  /** o linie mica sub butoane, de ex. garantia sau atribuirea catre firma-mama */
  dovada?: ReactNode;
  /** deasupra etichetei: firul de navigare al paginilor interioare */
  inainte?: ReactNode;
  /** `h1` doar pe primul ecran */
  nivel?: "h1" | "h2";
  /** continut suplimentar sub text */
  children?: ReactNode;
  /**
   * `erou` = tigla mare a paginii de start. `foto` si `plin` dau amandoua antetul alb;
   * numele lor raman pentru paginile altor felii, care le scriu deja.
   */
  ton?: "foto" | "plin" | "erou";
  /** pe ce sta tigla. Are efect doar pe `ton="erou"`. */
  fundal?: Fundal;
  /** `banda` scurteaza antetul: paginile care sunt documente sau unelte */
  forma?: "ecran" | "banda";
  className?: string;
};

const FUNDAL: Record<Fundal, string> = {
  alb: "bg-alb",
  ceata: "bg-ceata",
  negru: "bg-negru",
};

// Butoanele ecranului, exportate fiindca le refolosesc sectiunile paginii de start care nu trec
// prin `Ecran`. Pe tigla NEAGRA butonul primar e ALB: `albastru` pe negru da 4,47:1 fata de
// fundal, adica muchia pastilei aproape ca dispare.
export const CLASA_BUTON_ECRAN =
  "inline-flex items-center justify-center rounded-pastila bg-alb px-[21px] py-[11px] text-corp leading-[22px] font-semibold text-cerneala no-underline transition-colors duration-200 hover:bg-ceata";

const CLASA_BUTON_ALBASTRU =
  "inline-flex items-center justify-center rounded-pastila bg-albastru px-[21px] py-[11px] text-corp leading-[22px] font-semibold text-alb no-underline transition-colors duration-200 hover:bg-albastru-2";

const CLASA_CONTUR =
  "inline-flex items-center justify-center rounded-pastila contur-albastru bg-transparent px-[21px] py-[11px] text-corp leading-[22px] font-semibold text-albastru-2 no-underline transition-colors duration-200 hover:bg-alb";

const CLASA_CONTUR_PE_NEGRU =
  "inline-flex items-center justify-center rounded-pastila contur-albastru-clar bg-transparent px-[21px] py-[11px] text-corp leading-[22px] font-semibold text-albastru-clar no-underline transition-colors duration-200 hover:bg-[#141414]";

export default function Ecran({
  id,
  imagine,
  eticheta,
  titlu,
  text,
  actiune,
  secundar,
  dovada,
  inainte,
  nivel = "h2",
  children,
  ton = "foto",
  fundal = "alb",
  forma = "ecran",
  className = "",
}: Props) {
  const Titlu = nivel;
  const tigla = ton === "erou";
  const banda = forma === "banda";
  const peNegru = tigla && fundal === "negru";
  const cuFoto = Boolean(imagine);

  if (tigla) {
    return (
      <section
        id={id}
        className={
          "relative isolate flex flex-col overflow-hidden md:h-[692px] " +
          FUNDAL[fundal] +
          " " +
          className
        }
      >
        {/* Textul incepe la 56 px sub marginea de sus a tiglei - cifra masurata pe referinta. */}
        <div className="mx-auto w-full max-w-vitrina shrink-0 px-4 pt-14 text-center md:px-8">
          {eticheta ? (
            <span
              className={
                "mb-3 block text-mic font-semibold " +
                (peNegru ? "text-albastru-clar" : "text-cerneala-3")
              }
            >
              {eticheta}
            </span>
          ) : null}
          <Titlu
            className={
              "mx-auto max-w-[22ch] text-tigla " + (peNegru ? "text-ceata" : "text-cerneala")
            }
          >
            {titlu}
          </Titlu>
          {text ? (
            <p
              className={
                "mx-auto mt-3 max-w-[34ch] text-subtitlu-tigla " +
                (peNegru ? "text-ceata" : "text-cerneala")
              }
            >
              {text}
            </p>
          ) : null}
          {children}
          {actiune ? (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <Link
                href={actiune.href}
                className={peNegru ? CLASA_BUTON_ECRAN : CLASA_BUTON_ALBASTRU}
              >
                {actiune.text}
              </Link>
              {secundar ? (
                <Link
                  href={secundar.href}
                  className={peNegru ? CLASA_CONTUR_PE_NEGRU : CLASA_CONTUR}
                >
                  {secundar.text}
                </Link>
              ) : null}
            </div>
          ) : null}
          {dovada ? (
            <p
              className={
                "mx-auto mt-4 max-w-[52ch] text-mic " +
                (peNegru ? "text-ceata" : "text-cerneala-3")
              }
            >
              {dovada}
            </p>
          ) : null}
        </div>

        {/* De la 768 px in sus fotografia umple restul tiglei, sub text, si ATAT: `flex-1` plus
            `min-h-0` ii dau exact ce ramane din inaltimea legata (692 px); fara `min-h-0` cutia
            ar creste la inaltimea proprie a cadrului si tigla ar ajunge la 1016 px - masurat,
            pagina de start iesea 7460 px in loc de 6002, adica un sfert mai lunga decat
            referinta.
            SUB 768 px tigla NU mai e legata la 500 px, cat masoara fisa pe referinta: acolo
            textul are doua randuri, al nostru are titlu pe doua randuri, subtitlu pe trei si
            doua pastile una sub alta, adica 385 px de text din 500, si fotografiei ii ramaneau
            97,8 px la 390 (74,8 la 320) - o fasie, nu o fotografie mare, contra filosofiei pe
            care o urmarim. Asa ca sub 768 tigla creste cu textul, iar fotografia are 320 px
            FICSI (82% din latimea de 390); podeaua veche (`min-h-`) nu se intoarce, fiindca ea
            lasa cutia sa creasca la inaltimea proprie a cadrului (585 px) si tigla ajungea la
            987 px. Cifrele de dupa sunt scrise in docs/design/DIRECTIA.md, „Gramatica paginii
            de start". */}
        {cuFoto && imagine ? (
          <div className="mt-10 h-[320px] w-full md:mt-12 md:h-auto md:min-h-0 md:flex-1">
            <picture>
              <source media="(max-width: 767px)" srcSet={"/img/" + imagine.nume + "-960.webp"} />
              <img
                src={"/img/" + imagine.nume + "-1920.webp"}
                alt={imagine.alt}
                className="h-full w-full object-cover"
                style={{ objectPosition: imagine.pozitie ?? "center" }}
                loading={nivel === "h1" ? "eager" : "lazy"}
                decoding="async"
              />
            </picture>
          </div>
        ) : null}
      </section>
    );
  }

  const captuseala = banda
    ? "pt-[96px] pb-10 md:pt-[104px] md:pb-12"
    : "pt-[96px] pb-14 md:pt-[112px] md:pb-16";

  return (
    <section id={id} className={"relative isolate bg-alb " + className}>
      <div className={"mx-auto w-full max-w-vitrina px-4 md:px-8 " + captuseala}>
        <div
          className={
            cuFoto
              ? "md:grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:items-center md:gap-x-12 lg:gap-x-16"
              : ""
          }
        >
          <div>
            {inainte}
            {/* Eticheta e `span`, nu `p`, si nu e cosmetica de markup: un cuvant-doua deasupra
                titlului nu e proza, iar poarta S-17 cantareste paragrafele adevarate, comparand
                textul randat cu cel citit fara JavaScript. */}
            {eticheta ? (
              <span className="mb-4 block text-mic font-semibold text-cerneala-3">{eticheta}</span>
            ) : null}
            <Titlu className="max-w-[20ch] text-titlu-2 text-cerneala">{titlu}</Titlu>
            {text ? (
              // Paragraful de capitol: 21 / 29 la greutatea 600, in `cerneala-3`. Referinta il
              // scrie cu griul ei mai deschis (#86868b), si asa a fost si aici pana la
              // masuratoarea cu axe: 3,62:1 la 19 px, `serious` pe 20 din 22 de rute. Pragul de
              // 3:1 pentru text mare cere 24 px, sau 18,66 px la greutatea 700 - iar 600 nu e
              // „bold" pentru WCAG. Marimea ramane cea masurata; culoarea urca la 5,07:1.
              // Povestea intreaga, cu cele trei iesiri cantarite: `globals.css`.
              <p className="mt-5 max-w-[52ch] text-capitol font-semibold text-cerneala-3">{text}</p>
            ) : null}
            {children}
            {actiune ? (
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link href={actiune.href} className={CLASA_BUTON_ALBASTRU}>
                  {actiune.text}
                </Link>
                {secundar ? (
                  <Link
                    href={secundar.href}
                    className="inline-flex items-center gap-1 text-corp font-semibold text-albastru-2 no-underline hover:text-albastru"
                  >
                    {secundar.text}
                    <span aria-hidden>&rsaquo;</span>
                  </Link>
                ) : null}
              </div>
            ) : null}
            {dovada ? (
              <p className="mt-5 max-w-[60ch] text-nota text-cerneala-3">{dovada}</p>
            ) : null}
          </div>

          {cuFoto && imagine ? (
            // Fotografia paginii interioare: card cu raza 28, nu fond de ecran. Nu poarta text
            // peste ea, deci nu are nevoie de voal si nu intra in niciun calcul de contrast.
            <div className="mt-10 overflow-hidden rounded-card md:mt-0">
              <picture>
                <source media="(max-width: 767px)" srcSet={"/img/" + imagine.nume + "-960.webp"} />
                <img
                  src={"/img/" + imagine.nume + "-1920.webp"}
                  alt={imagine.alt}
                  className="h-[240px] w-full object-cover md:h-[340px]"
                  style={{ objectPosition: imagine.pozitie ?? "center" }}
                  loading={nivel === "h1" ? "eager" : "lazy"}
                  decoding="async"
                />
              </picture>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
