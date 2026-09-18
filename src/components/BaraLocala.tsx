import Link from "next/link";

export type AncoraBara = { ancora: string; eticheta: string };

type Props = {
  
  titlu?: string;
  ancore: AncoraBara[];
  
  actiune?: { href: string; text: string };
  
  eticheta: string;
};

const ANCORA =
  "text-mic whitespace-nowrap text-cerneala no-underline transition-colors duration-200 hover:text-albastru-2";

export default function BaraLocala({ titlu, ancore, actiune, eticheta }: Props) {
  return (
    <nav
      aria-label={eticheta}
      className="sticla sticky top-[64px] z-30 border-b md:top-[80px]"
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
