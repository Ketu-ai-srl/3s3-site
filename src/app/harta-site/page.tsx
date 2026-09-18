import type { Metadata } from "next";
import AntetPagina from "@/components/AntetPagina";
import BaraLocala from "@/components/BaraLocala";
import HartaAncore from "@/components/HartaAncore";
import HartaLista from "@/components/HartaLista";
import JuridicSectiune from "@/components/JuridicSectiune";
import { ANCORE_ACASA, BARA_HARTA, MASURA_ACT } from "@/content/interior-juridic";
import { PAGINI_JURIDICE } from "@/content/juridic";
import { CALE_DISCUTIE, RUTE, SECTIUNI_ACASA, type Ruta } from "@/content/rute";
import { FOTOGRAFII } from "@/content/fotografii";

// Harta site-ului pentru om. `sitemap.xml` exista de mult si e pentru masini; pagina asta e
// pentru cineva care vrea sa vada dintr-o privire ce scrie pe site si sa aleaga.
//
// TOATE RUTELE VIN DIN `RUTE`, niciuna scrisa de mana. Daca as fi scris lista aici, ar fi
// existat a doua sursa de adevar despre ce pagini are site-ul, si s-ar fi desincronizat de
// prima exact in ziua in care cineva face lucrul corect si adauga o pagina. Pe proiectul asta
// s-a intamplat deja o data, si de aceea exista `poarta-rute.py`.
//
// IMPARTIREA PE GRUPE E O PARTITIE, nu o serie de filtre independente. Fiecare ruta e luata O
// SINGURA data, in ordinea regulilor, iar ultimul grup ia TOT ce a ramas. Asa, o ruta dintr-o
// categorie la care nu m-am gandit apare oricum in pagina, la „Paginile principale", in loc sa
// dispara tacut dintr-o harta care se declara completa. Ce se pierde e doar asezarea ei ideala,
// si aia se vede.
//
// ASEZAREA, la valul S2-b, si de ce fiecare bloc si-a schimbat forma:
//
//   BARA LOCALA cu cele cinci grupe. Harta e singura pagina a feliei pe care navigarea in
//   pagina chiar are ce naviga: cinci grupe, cu nume de un cuvant. Ele intra pe randul de 52 px
//   fara sa-l depaseasca, deci bara isi face treaba pentru care exista.
//
//   RUTELE SUNT RANDURI, nu carduri. Douazeci si doua de carduri de ceata cu raza 28, trei pe
//   rand, purtau fiecare un nume, o descriere si o adresa - adica trei randuri de text intr-un
//   dreptunghi cu patruzeci de pixeli de captuseala in jur. REF-A pune cardul acolo unde cardul
//   E continutul; un cuprins e o lista, si o lista se desparte prin firul de 1 px.
//
//   SECTIUNILE NU MAI SUNT BENZI. Fundalul nu mai alterneaza alb / ceata si nu mai exista
//   eticheta colorata deasupra titlului: cele cinci grupe sunt cinci parti ale aceluiasi
//   cuprins, nu cinci afise. Titlul a coborat de la 48 px la 32, treapta h2-ului de pagina
//   juridica.
//
// UN SINGUR BUTON IN ANTET, si nu e o ancora. Erau doua: „Vedeti toate paginile" catre
// `#pagini` si „Vedeti cum functioneaza" catre o pagina care sta oricum in bara de sus. Primul
// nu promitea nimic - derula catre lista care urmeaza imediat sub ecran - iar al doilea repeta
// un rand din bara. Butonul principal duce mereu la discutia de treizeci de minute.

export const metadata: Metadata = {
  title: "Harta site-ului",
  description:
    "Toate paginile publice 3S, grupate: prezentare, domenii, instrumente și documente juridice, plus secțiunile paginii de start. Lista vine din manifest.",
  alternates: { canonical: "/harta-site" },
};

const CAI_JURIDICE = new Set(PAGINI_JURIDICE.map((p) => p.cale));

function imparte() {
  const luate = new Set<string>();
  const ia = (potrivit: (r: Ruta) => boolean): Ruta[] => {
    const gasite = RUTE.filter((r) => !luate.has(r.cale) && potrivit(r));
    for (const r of gasite) luate.add(r.cale);
    return gasite;
  };

  const domenii = ia((r) => r.cale === "/solutii" || r.cale.startsWith("/solutii/"));
  const instrumente = ia((r) => r.cale.startsWith("/instrumente/"));
  const juridice = ia((r) => CAI_JURIDICE.has(r.cale));
  const principale = ia(() => true);

  return { principale, domenii, instrumente, juridice };
}

export default function HartaSite() {
  const { principale, domenii, instrumente, juridice } = imparte();

  return (
    <main id="continut">
      <AntetPagina
        adresa="/harta-site"
        forma="banda"
        imagine={FOTOGRAFII.cutii}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Harta site-ului" }]}
        eticheta="Cuprins"
        titlu={
          <>
            Tot ce scrie pe site,
            <br />
            într-o singură listă.
          </>
        }
        lead="Lista se face din manifestul de rute al site-ului, deci nu poate arăta o pagină care nu există și nici ascunde una care există."
        actiune={{ href: CALE_DISCUTIE, text: "Discuție de 30 de minute" }}
      />

      <BaraLocala
        ancore={BARA_HARTA.ancore}
        actiune={{ href: CALE_DISCUTIE, text: BARA_HARTA.pastila }}
        eticheta={BARA_HARTA.eticheta}
      />

      <JuridicSectiune
        id="pagini"
        titlu="Paginile principale."
        lead="De aici începe oricine ne vede prima dată: ce facem, cum lucrăm, cine suntem și pe ce drum ne scrieți."
      >
        <HartaLista rute={principale} />
      </JuridicSectiune>

      <JuridicSectiune
        id="domenii"
        titlu="Fișele pe domenii."
        lead="Aceleași etape, scrise cu documentele și termenele fiecărui domeniu. Hubul le adună pe toate."
      >
        <HartaLista rute={domenii} />
      </JuridicSectiune>

      <JuridicSectiune
        id="instrumente"
        titlu="Ce puteți folosi fără să ne cumpărați nimic."
        lead="Pagini scrise ca să fie utile singure. Se pot tipări, trimite prin mesaj sau cita, iar noi le corectăm când cineva ne arată că un rând contrazice actul citat."
      >
        <HartaLista rute={instrumente} />
      </JuridicSectiune>

      <JuridicSectiune
        id="juridic"
        titlu="Textele juridice ale site-ului."
        lead="Cine răspunde de site, ce date primim printr-un mesaj și ce scriem în browserul dumneavoastră. Sunt scurte dinadins."
      >
        <HartaLista rute={juridice} />
      </JuridicSectiune>

      <JuridicSectiune
        id="sectiuni"
        titlu="Secțiunile paginii de start."
        lead="Nu sunt pagini separate, sunt locuri din pagina de start. Legăturile duc direct la ele."
      >
        <span className="mb-3 block text-mic font-semibold text-cerneala-3">
          {ANCORE_ACASA.eticheta}
        </span>
        <HartaAncore sectiuni={SECTIUNI_ACASA} />

        <p className={`mt-10 ${MASURA_ACT} text-capitol text-cerneala`}>
          Pagini publice pe tot site-ul: {RUTE.length}. Toate sunt listate mai sus, în cele
          patru grupe, fiindcă ultima grupă ia tot ce nu a intrat în celelalte.
        </p>

        <p className={`mt-5 ${MASURA_ACT} text-capitol text-cerneala`}>
          Harta pentru mașini stă la{" "}
          <a href="/sitemap.xml" className="text-albastru-2 no-underline hover:text-cerneala">
            sitemap.xml
          </a>
          . Se face din același manifest, păstrând rutele marcate pentru indexare. Pagina aceasta
          le arată pe toate, inclusiv pe cele care nu se indexează.
        </p>
      </JuridicSectiune>
    </main>
  );
}
