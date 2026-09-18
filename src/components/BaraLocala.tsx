import Link from "next/link";

// BARA LOCALA - navigarea IN pagina, componenta noua a directiei REF-A.
//
// Masurata pe referinta: 52 px, lipicioasa, cu titlul paginii la stanga (21 px, greutate 600)
// si, la dreapta, ancorele sectiunilor la 12 px plus o pastila de 24 px. Inlocuieste filele-
// pastila cu care directia anterioara facea navigarea in pagina. Diferenta nu e de gust: filele
// comutau PANOURI cu JavaScript, deci jumatate din pagina nu exista pentru cine nu-l executa,
// iar cititorul de ecran primea `role="tablist"`. Aici totul e in pagina, una sub alta, iar
// bara e o lista de legaturi catre ancore.
//
// NICIO ANCORA NU E MARCATA ACTIVA, si e o decizie, nu o scapare: serverul nu stie la ce
// sectiune a ajuns cititorul, iar o ancora colorata „activ" ar fi o afirmatie despre pozitia
// lui pe care n-o putem sustine. Toate arata la fel si se aprind la trecerea cu mausul.
//
// CE FACE LA 390 px, si de ce se abate de la referinta. Bara de 52 px a referintei a fost
// masurata DOAR la 1440; pagina de produs pe telefon nu e masurata deloc (limita scrisa in fisa
// referintei). La 390, titlul de 19 px plus patru-cinci ancore de 12 px plus pastila nu incap pe
// un rand: masurat, textul lor insumeaza mai mult decat latimea ferestrei. Cele doua iesiri
// gresite ar fi fost tragerea laterala - care ascunde jumatate din intrari fara niciun semn, si
// care a fost deja respinsa o data pe captura, la felia de segmente a primului site - si
// taierea ancorelor, care scoate exact informatia pentru care exista bara. Deci sub 768 px bara
// are DOUA randuri: titlul cu pastila sus, ancorele dedesubt, pe cate randuri le trebuie.
// Inaltimea nu mai e 52; e cat cer randurile. Cifra de 52 se pastreaza de la 768 px in sus.
//
// LIPICIOASA, NU FIXA: bara globala e fixa si sta deasupra, iar `top` de aici o asaza EXACT sub
// ea (48 px pe telefon, 44 de la 768 px in sus - inaltimile masurate ale barei globale). Doua
// elemente fixe s-ar suprapune; unul lipicios se opreste sub celalalt.

export type AncoraBara = { ancora: string; eticheta: string };

type Props = {
  /** Titlul paginii, la stanga. Lipseste doar acolo unde pagina nu are inca unul. */
  titlu?: string;
  ancore: AncoraBara[];
  /** Pastila de 24 px din dreapta. Fara ea, bara ramane doar navigare. */
  actiune?: { href: string; text: string };
  /** Numele barei pentru cititorul de ecran, ca sa se deosebeasca de bara de sus. */
  eticheta: string;
};

const ANCORA =
  "text-mic whitespace-nowrap text-cerneala no-underline transition-colors duration-200 hover:text-albastru-2";

export default function BaraLocala({ titlu, ancore, actiune, eticheta }: Props) {
  return (
    <nav
      aria-label={eticheta}
      className="sticla sticky top-[48px] z-30 border-b md:top-[44px]"
    >
      <div className="mx-auto w-full max-w-vitrina px-4 py-3 md:flex md:h-[52px] md:items-center md:gap-8 md:py-0 md:px-8">
        <div className="flex items-center gap-4">
          {titlu ? (
            <span className="text-subtitlu font-semibold text-cerneala">{titlu}</span>
          ) : null}
          {actiune ? (
            <Link
              href={actiune.href}
              className="ml-auto shrink-0 rounded-pastila bg-albastru px-[10px] py-[3px] text-mic leading-[18px] font-semibold text-alb no-underline transition-colors duration-200 hover:bg-albastru-2 md:hidden"
            >
              {actiune.text}
            </Link>
          ) : null}
        </div>

        <ul className="m-0 mt-2 flex list-none flex-wrap items-center gap-x-6 gap-y-1 p-0 md:mt-0 md:ml-auto md:flex-nowrap">
          {ancore.map((a) => (
            <li key={a.ancora}>
              <a href={"#" + a.ancora} className={ANCORA}>
                {a.eticheta}
              </a>
            </li>
          ))}
        </ul>

        {actiune ? (
          <Link
            href={actiune.href}
            className="hidden shrink-0 rounded-pastila bg-albastru px-[10px] py-[3px] text-mic leading-[18px] font-semibold text-alb no-underline transition-colors duration-200 hover:bg-albastru-2 md:inline-block"
          >
            {actiune.text}
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
