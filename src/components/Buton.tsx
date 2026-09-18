import Link from "next/link";

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
const MARIME_TEXT: Record<Marime, string> = {
  bara: "py-[3px] text-mic leading-[18px]",
  mic: "py-[8px] text-nota leading-[20px]",
  normal: "py-[11px] text-corp leading-[22px]",
  mare: "py-[11px] text-corp leading-[22px]",
};

const BAZA =
  "inline-flex items-center justify-center gap-3 font-semibold transition-colors duration-200";

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
      
      {fel === "text" || sageata ? <span aria-hidden>→</span> : null}
    </Link>
  );
}
