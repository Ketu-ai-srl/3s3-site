import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DateStructurate from "@/components/DateStructurate";
import Navigatie from "@/components/Navigatie";
import Subsol from "@/components/Subsol";
import { ADRESA_BAZA, indexareaEstePermisa } from "@/content/rute";

// UN SINGUR FONT, Inter, cu doua greutati: 400 pentru corp, 600 pentru titluri, etichete
// si butoane. Directia REF-A pune TOATE titlurile la 600 si niciunul cu majuscule, deci
// 700 nu se incarca deloc - un `font-bold` ramas undeva cade pe 600, nu aduce un fisier in
// plus pe fiecare pagina.
//
// DE CE Inter si nu fontul referintei: acela e proprietar, iar licenta lui il leaga de
// platformele proprietarului. Inter are aceeasi constructie - grotesc neutru, x-height mare,
// cifre proportionale, forme deschise la 12 px - si licenta OFL.
//
// Cinci familii au devenit una. Fiecare familie in plus inseamna fisiere preincarcate pe
// FIECARE pagina, pentru litere pe care nu le mai foloseste nimeni; jetoanele `--font-afis`,
// `--font-vitrina` si `--font-mono` din `globals.css` arata acum toate catre variabila de mai
// jos, deci fisierele altor felii care le mai scriu primesc acelasi font, nu o a doua familie
// strecurata printr-un nume mostenit.
//
// NUMELE VARIABILEI incepe cu `--fnt-`, nu cu `--font-`, si nu e cosmetica. Jetoanele
// Tailwind se numesc `--font-*`, iar `next/font` isi pune si el variabila pe elementul
// cu clasa. Cand amandoua se numeau la fel, jetonul se definea prin el insusi si
// depindea de ordinea foilor de stil daca se rezolva sau nu.
//
// CLASA STA PE `<html>`, NU PE `<body>`, si asta a fost un defect masurat: cu variabila
// pusa pe `body`, jetonul de pe `:root` se evalua pe un element care nu o avea, deci era
// invalid, iar `body { font-family: var(--font-vitrina) }` cadea pe fontul de sistem pe
// toate cele 22 de pagini.
//
// Subsetul `latin-ext` e obligatoriu, nu decorativ: fara el, s si t cu virgula
// (U+0219 / U+021B) cad pe fontul de rezerva si diacriticele romanesti se vad dintr-o
// alta familie in mijlocul cuvantului.
const text = Inter({
  variable: "--fnt-text",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(ADRESA_BAZA),
  title: {
    default: "3S - Scan Store Solve | Arhiva care răspunde",
    template: "%s | 3S - Scan Store Solve",
  },
  // Descrierea sta sub 160 de caractere: peste prag, motoarele o taie si ultima
  // propozitie se pierde. Poarta S-01 masoara si opreste lotul.
  description:
    "Arhivare fizică, digitalizare și căutare în documente pentru primării, notari și firme. Întrebați în română, răspunsul vine cu pagina din care provine.",
  //
  // AICI NU SE DECLARA CANONICAL. Nu e o omisiune, e regula.
  //
  // Un `alternates: { canonical: "/" }` scris in layout se mosteneste de fiecare pagina,
  // deci pe un site cu mai multe pagini toate ar declara aceeasi adresa canonica si
  // motorul ar pastra una singura in index. Canonical-ul se scrie PE PAGINA, in
  // `metadata` din `page.tsx`, cu propria cale:
  //     export const metadata = { alternates: { canonical: "/solutii" } }
  // Fiind relativ, se rezolva absolut prin `metadataBase` de mai sus.
  //
  // O pagina care uita canonical-ul nu trece tacut: poarta S-02 din
  // `.claude/scripts/porti/poarta-seo.py` cere exact o eticheta `link[rel=canonical]`,
  // absoluta, pe https, fara parametri si auto-referentiala.
  //
  // Indexarea e oprita implicit si se deschide numai in productie. Valoarea se citeste la
  // construire; plasa de siguranta la rulare e antetul pus de `src/middleware.ts`.
  robots: indexareaEstePermisa()
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "3S - Scan Store Solve",
  },
};

// Meniul si subsolul stau aici, nu in pagini: sunt aceleasi pe tot site-ul, iar o pagina
// noua trebuie sa le primeasca fara ca autorul ei sa faca ceva.
//
// Legatura de sarire tinteste `#zona-continut`, un invelis randat tot aici. Daca ar tinti
// un identificator din pagina, fiecare pagina noua ar fi obligata sa il puna, iar prima
// care ar uita ar produce o ancora fara tinta pe toata sectiunea de site. Asa, contractul
// e indeplinit de layout, nu cerut de la fiecare autor.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={text.variable}>
      <body className="antialiased">
        <DateStructurate />
        <a
          className="absolute top-[-100px] left-4 z-[99] rounded-pastila bg-albastru px-[21px] py-[11px] text-[17px] leading-[22px] font-semibold text-alb no-underline focus:top-3"
          href="#zona-continut"
        >
          Săriți la conținut
        </a>
        <Navigatie />
        {/* `tabIndex={-1}` nu e decorativ: fara el, "Sariti la continut" schimba doar hash-ul,
            iar focalizarea ramane pe BODY - masurat: dupa Enter, document.activeElement
            era BODY, deci urmatorul Tab relua de la capatul paginii. Cu el, focalizarea
            chiar aterizeaza in continut. -1 inseamna focalizabil din cod, nu din Tab. */}
        <div id="zona-continut" tabIndex={-1}>
          {children}
        </div>
        <Subsol />
      </body>
    </html>
  );
}
