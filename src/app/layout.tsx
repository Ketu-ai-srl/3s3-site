import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DateStructurate from "@/components/DateStructurate";
import Navigatie from "@/components/Navigatie";
import Subsol from "@/components/Subsol";
import { ADRESA_BAZA, indexareaEstePermisa } from "@/content/rute";
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
  description:
    "Arhivare fizică, digitalizare și căutare în documente pentru primării, notari și firme. Întrebați în română, răspunsul vine cu pagina din care provine.",
  robots: indexareaEstePermisa()
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "3S - Scan Store Solve",
  },
};
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
        
        <div id="zona-continut" tabIndex={-1}>
          {children}
        </div>
        <Subsol />
      </body>
    </html>
  );
}
