import Link from "next/link";

// BANDA PE `ceata` - forma pe care REF-A o foloseste in doua locuri de pe pagina de produs:
// „highlights" imediat sub erou (§4 punctul 3: h2 de 56 la STANGA, o legatura la dreapta,
// captuseala 110/120) si randul de carduri de mai jos (§4 punctul 5: h2 de 48 la stanga).
// Aceeasi banda, doua trepte de titlu, deci un camp - nu doua componente.
//
// TITLUL LA STANGA SI LEGATURA LA DREAPTA se aseaza pe acelasi rand de baza de la 768 px in
// sus; sub 768 legatura coboara sub titlu. Nu se stramteaza si nu se taie: o legatura pusa pe
// acelasi rand cu un h2 de 56 px la 390 ar lasa titlului patru caractere pe rand.
//
// LEGATURA E OPTIONALA fiindca a doua banda a referintei n-are niciuna, iar o legatura pusa
// „ca sa fie simetric" ar duce undeva doar de dragul asezarii. Chevronul e desenat cu caracter,
// `aria-hidden`: „>" citit cu voce tare nu inseamna nimic.
//
// CAPTUSEALA e 110 px de la 768 in sus, capatul de jos al intervalului de 110-160 masurat pe
// referinta, si 64 sub - la fel ca in `Capitol.tsx`, ca doua sectiuni alaturate sa nu lase un
// ecran gol intre ele pe telefon.

type Props = {
  id?: string;
  /** Afirmatia benzii. `mare` o pune la 56 px, implicitul e 48. */
  titlu: React.ReactNode;
  /** Randul de sub titlu, cand banda are nevoie de o propozitie de asezare. */
  lead?: React.ReactNode;
  /** Eticheta de 24 px de deasupra titlului. */
  eticheta?: string;
  /** Legatura din dreapta titlului. */
  legatura?: { href: string; text: string };
  marime?: "mare" | "mica";
  children: React.ReactNode;
};

export default function InvestitieBanda({
  id,
  titlu,
  lead,
  eticheta,
  legatura,
  marime = "mica",
  children,
}: Props) {
  return (
    <section id={id} className="bg-ceata py-16 md:py-[110px]">
      <div className="mx-auto w-full max-w-vitrina px-4 md:px-8">
        <div className="md:flex md:items-baseline md:justify-between md:gap-10">
          <div>
            {eticheta ? (
              <span className="mb-3 block text-titlu-4 font-semibold text-cerneala md:mb-4">
                {eticheta}
              </span>
            ) : null}
            <h2
              className={
                "max-w-[17ch] text-cerneala " +
                (marime === "mare" ? "text-tigla" : "text-titlu-2")
              }
            >
              {titlu}
            </h2>
          </div>
          {legatura ? (
            <Link
              href={legatura.href}
              className="mt-4 inline-block shrink-0 text-corp font-semibold text-albastru-2 no-underline hover:text-cerneala md:mt-0"
            >
              {legatura.text}
              <span aria-hidden> &gt;</span>
            </Link>
          ) : null}
        </div>

        {lead ? (
          <p className="mt-6 max-w-[59ch] text-capitol font-semibold text-cerneala-3">{lead}</p>
        ) : null}

        <div className="mt-12 md:mt-14">{children}</div>
      </div>
    </section>
  );
}
