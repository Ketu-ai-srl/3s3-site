import Link from "next/link";

// Butoanele directiei REF-A. O SINGURA FORMA - pastila, raza 980 px - si trei feluri, fiindca
// referinta atat are:
//
//   plin    actiunea principala: `albastru` plin, litera alba (4,70:1).
//   alb     actiunea principala pe o tigla NEAGRA: alb plin, litera cerneala (21:1). Pe negru
//           un buton `albastru` ar da 4,47:1 fata de fundal, adica muchia lui aproape ca
//           dispare; pe alb, in schimb, tigla insasi il ridica.
//   contur  drumul al doilea: transparent, litera `albastru-2`, contur de 0,8 px desenat ca
//           `box-shadow` interior, nu ca chenar, ca sa nu mute inaltimea cu un pixel fata de
//           pastila plina de langa el. Pe negru contururile si litera trec pe `albastru-clar`
//           (6,96:1), fiindca `albastru-2` pe negru da 3,77:1.
//   text    drumul al doilea cand nu merita greutatea unui buton: legatura `albastru-2` cu un
//           chevron dupa cuvant. NU e subliniata: in REF-A legaturile de actiune se recunosc
//           dupa culoare si dupa chevron. Sublinierea ramane pe legaturile din proza, unde nu
//           exista chevron care sa le semnaleze.
//
// UN SINGUR BUTON PRIMAR PE ECRAN ramane regula. `plin` si `alb` sunt amandoua primare - nu se
// pun doua pe acelasi ecran, indiferent de fundal. In REF-A ecranul e TIGLA, deci regula se
// citeste „un buton primar pe tigla", si asa o numara proba din `tests/directia.test.ts`.
//
// MARIMILE sunt cele trei masurate pe referinta, si sunt legate de marimea literei, nu alese:
//   17 px -> 44 px inalt (captuseala 11 / 21, pas de rand 22)
//   14 px -> 36 px inalt (captuseala  8 / 15, pas de rand 20)
//   12 px -> 24 px inalt (captuseala  3 / 10, pas de rand 18) - bara globala si bara locala
// Pasul de rand se scrie EXPLICIT pe fiecare marime. Fara el, butonul ar mosteni 1,4706 de pe
// `body` si un buton de 17 px ar iesi 47 px, nu 44 - inaltimea unui buton e suma captuselii cu
// pasul de rand, nu cu marimea literei.
//
// Semnatura (href, fel, marime, sageata, className) ramane cea mostenita, ca paginile altor
// felii sa compileze fara sa fie atinse. `marime="bara"` e noua si e a treia marime masurata.

type Fel = "plin" | "alb" | "contur" | "text";
type Marime = "bara" | "mic" | "normal" | "mare";

const FEL: Record<Fel, string> = {
  plin: "rounded-pastila bg-albastru text-alb no-underline hover:bg-albastru-2",
  alb: "rounded-pastila bg-alb text-cerneala no-underline hover:bg-ceata",
  contur:
    "rounded-pastila contur-albastru bg-transparent text-albastru-2 no-underline hover:bg-ceata",
  text: "bg-transparent text-albastru-2 no-underline hover:text-albastru",
};

const MARIME: Record<Marime, string> = {
  bara: "px-[10px] py-[3px] text-mic leading-[18px]",
  mic: "px-[15px] py-[8px] text-nota leading-[20px]",
  normal: "px-[21px] py-[11px] text-corp leading-[22px]",
  mare: "px-[21px] py-[11px] text-corp leading-[22px]",
};

// Legatura de text nu poarta contur, deci nu poarta nici captuseala orizontala: aliniata cu
// butonul de langa ea, nu impinsa de un chenar inexistent.
const MARIME_TEXT: Record<Marime, string> = {
  bara: "py-[3px] text-mic leading-[18px]",
  mic: "py-[8px] text-nota leading-[20px]",
  normal: "py-[11px] text-corp leading-[22px]",
  mare: "py-[11px] text-corp leading-[22px]",
};

const BAZA =
  "inline-flex items-center justify-center gap-1 font-semibold transition-colors duration-200";

type Props = {
  href: string;
  children: React.ReactNode;
  fel?: Fel;
  marime?: Marime;
  sageata?: boolean;
  className?: string;
};

export default function Buton({
  href,
  children,
  fel = "plin",
  marime = "normal",
  sageata = false,
  className = "",
}: Props) {
  const cutie = fel !== "text";
  return (
    <Link
      href={href}
      className={`${BAZA} ${FEL[fel]} ${cutie ? MARIME[marime] : MARIME_TEXT[marime]} ${className}`}
    >
      {children}
      {/* Chevronul e implicit pe legatura de text: asa arata „Afla mai mult" in referinta, si
          el e semnul care o deosebeste de proza din jur, o data ce sublinierea a disparut.
          `sageata` ramane in semnatura pentru apelurile mostenite si il pune si pe butoane. */}
      {fel === "text" || sageata ? <span aria-hidden>&rsaquo;</span> : null}
    </Link>
  );
}
