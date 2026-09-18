"use client";

import { usePathname } from "next/navigation";
import type { Ancora } from "@/content/interior-solutii";
import { CALE_DISCUTIE, RUTE } from "@/content/rute";
import BaraLocala from "./BaraLocala";

// Navigarea in pagina, pe paginile interioare. Semnatura ramane cea mostenita (`ancore`,
// `eticheta`), deci cele patru pagini care o cheama nu se ating; ce s-a schimbat e forma:
// randul de file-pastila pe ceata a devenit BARA LOCALA a directiei REF-A - lipicioasa,
// titlul paginii la stanga, ancorele si pastila la dreapta.
//
// TITLUL NU SE CERE DE LA APELANT, se citeste din registrul de rute dupa calea curenta. Asa
// n-a trebuit atinsa nicio pagina, si nici nu se poate strecura un titlu care sa nu fie chiar
// numele paginii din meniu si din subsol - o a doua copie a lui ar diverge la prima redenumire.
// De aici si `usePathname`, deci si componenta de client: numele rutei nu se poate deduce pe
// server dintr-o componenta care nu primeste calea.
//
// Cand calea nu e in registru - o pagina noua inainte sa fie inscrisa - bara ramane fara titlu
// in loc sa scrie o presupunere. Absenta se vede si se repara; o presupunere pare informatie.

type Props = {
  ancore: Ancora[];
  /** Numele benzii pentru cititorul de ecran, ca sa se deosebeasca de bara de sus. */
  eticheta: string;
};

export default function SegmentAncore({ ancore, eticheta }: Props) {
  const cale = usePathname();
  const ruta = RUTE.find((r) => r.cale === cale);
  return (
    <BaraLocala
      titlu={ruta?.scurt}
      ancore={ancore.map((a) => ({ ancora: a.ancora, eticheta: a.eticheta }))}
      actiune={{ href: CALE_DISCUTIE, text: "Discuție" }}
      eticheta={eticheta}
    />
  );
}
