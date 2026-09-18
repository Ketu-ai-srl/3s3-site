import Link from "next/link";
import Buton from "@/components/Buton";
import Eticheta from "@/components/Eticheta";
import HartaLista from "@/components/HartaLista";
import Invelis from "@/components/Invelis";
import { MASURA_ACT, NEGASITA } from "@/content/interior-juridic";
import { RUTE, type Ruta } from "@/content/rute";

// Pagina de 404, pe gramatica REF-A: fundal ALB, eticheta de 12 px, h1 de 48 / 57 la 600
// CENTRAT, un paragraf de 21 / 29, O pastila plina catre pagina de start si patru drumuri ca
// lista simpla pe firul de 1 px.
//
// CE ERA INAINTE, si de ce a picat fiecare bucata. Titlul si paragraful stateau la stanga, iar
// drumurile erau carduri: forma paginilor de vitrina, pusa pe un indicator. Un 404 e cel mai
// aproape de titlul centrat al unui act - o singura propozitie, fara nimic de vandut - si asa e
// asezat acum. Erau si sase clase din paleta anterioara, care nu mai produceau CSS de la felia
// de fundatie: pagina se randa cu culorile implicite si cu chenare invizibile. Numele lor nu se
// scriu aici pe litere - comanda de inventar din DIRECTIA.md cauta in fisierul intreg, iar un
// comentariu care citeaza clasa devine chiar instanta pe care inventarul o numara.
//
// Nu se deschide cu ecran plin si nu poarta fotografie: nu e o pagina de vitrina, e un
// indicator. Cine ajunge aici cauta un drum, nu un afis. Meniul si subsolul vin din layout,
// deci omul care nimereste aici are aceleasi drumuri ca pe orice alta pagina.
//
// PATRU DRUMURI, NU TOT SITE-UL. Doua runde au incercat sa faca lista de 22 de rute mai
// suportabila - intai scotandu-le descrierile, apoi asezandu-le pe trei coloane - si niciuna
// n-a atins defectul. Masurat inainte: 27 de randuri identice (22 de rute plus cele 5 ancore
// ale paginii de start), 23 dintre ele in primul ecran la 1280 px, iar la 390 px pagina avea
// 2569 px si iesirea catre pagina de start statea sub doua ecrane de legaturi. Ordinea era cea
// bruta a manifestului, deci pozitiile 3 si 4 erau „Securitate" si „Accesibilitate", inaintea
// lui „Cum functioneaza". Descrierile, mutate in atributul `title`, nu se vad pe atingere -
// adica pentru cititorul de pe telefon disparusera cu totul.
//
// Omul care ajunge aici cauta UN drum, nu harta intreaga; harta intreaga are pagina ei, si
// randul care duce la ea sta chiar sub lista.
//
// Numele si adresele vin tot din manifest, cautate dupa cale: daca o ruta e redenumita, randul
// isi ia numele nou, iar daca dispare din manifest, randul dispare cu ea. O pagina de 404 care
// trimite spre adrese inexistente ar fi chiar defectul pe care il explica.
const CAI_SCURTE = ["/", "/solutii", "/instrumente/termene-de-pastrare", "/contact"];

const DESTINATII: Ruta[] = CAI_SCURTE.map((cale) => RUTE.find((r) => r.cale === cale)).filter(
  (r): r is Ruta => Boolean(r),
);

// Nu poarta titlu propriu in `metadata`: fisierul asta nu e o pagina de ruta, iar HTML-ul lui
// (`_not-found`) nu intra in harta de site si nu se indexeaza.

export default function PaginaNegasita() {
  return (
    <main className="bg-alb">
      <Invelis className="pt-[96px] pb-20 md:pt-[120px] md:pb-24">
        <div className="mx-auto max-w-act text-center">
          <Eticheta className="mb-4 block">{NEGASITA.eticheta}</Eticheta>

          <h1 className="text-titlu-2 text-cerneala">{NEGASITA.titlu}</h1>

          <p className="mt-6 text-capitol text-cerneala">{NEGASITA.text}</p>

          {/* UN singur buton, si e plin: pagina asta are de dat un singur raspuns. */}
          <div className="mt-8 flex justify-center">
            <Buton href="/" sageata className="max-sm:w-full">
              {NEGASITA.buton}
            </Buton>
          </div>
        </div>

        <span className="mt-16 mb-4 block text-mic font-semibold text-cerneala-3">
          {NEGASITA.drumuri}
        </span>
        <HartaLista rute={DESTINATII} coloane={2} />

        <p className={`mt-8 ${MASURA_ACT} text-capitol text-cerneala`}>
          Toate paginile site-ului, fiecare cu ce scrie pe ea într-un rând, stau în{" "}
          <Link href="/harta-site" className="text-albastru-2 no-underline hover:text-cerneala">
            harta site-ului
          </Link>
          .
        </p>
      </Invelis>
    </main>
  );
}
