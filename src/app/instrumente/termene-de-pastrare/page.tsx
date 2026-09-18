import type { Metadata } from "next";
import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BandaCTA from "@/components/BandaCTA";
import BaraLocala from "@/components/BaraLocala";
import Capitol from "@/components/Capitol";
import JuridicListaLipsa from "@/components/JuridicListaLipsa";
import ListaBifa from "@/components/ListaBifa";
import TermeneCuprins from "@/components/TermeneCuprins";
import TermeneFisa from "@/components/TermeneFisa";
import TermeneRegula from "@/components/TermeneRegula";
import { FOTOGRAFII } from "@/content/fotografii";
import {
  ANCORE_TERMENE,
  BARA_TERMENE,
  BUTON_DISCUTIE,
  CAPITOLE_TERMENE,
  MASURA_ACT,
  MASURA_LISTA,
} from "@/content/interior-juridic";
import { PAGINA_TERMENE as P, TERMENE_ROMANIA } from "@/content/termene-extins";

// Verificatorul de termene, ca document de sine statator, pe gramatica REF-A a paginii
// interioare (val S2-b).
//
// CE FACE, si de ce e singurul loc in care se face: de la reasezarea paginii de start in
// directia noua, widgetul cu clic nu mai exista acolo, deci pagina asta e SINGURUL loc de pe
// site in care se citesc cele opt randuri. Toate sunt in HTML de la prima cerere, fiecare cu
// ancora proprie, deci pagina se poate tipari, trimite prin mesaj cu trimitere la un rand
// anume, si citi de un crawler care nu executa JavaScript.
//
// CE NU FACE, si e o decizie, nu o scapare: nu adauga niciun termen nou. Cifrele raman cele
// din `src/content/termene.ts`, unde le-a scris felia care le-a cules, cu actul pe fiecare
// rand. Un instrument corect pe o jurisdictie bate unul plauzibil pe optsprezece, iar randul
// care nu are articol ramane gol, cu motivul scris pe el.
//
// ASEZAREA, la valul S2-b, si ce s-a schimbat fata de valul dinainte:
//
//   BARA LOCALA in loc de banda de sectiune. Cele cinci benzi de registru, cu fundalul
//   alternand alb / ceata si cu eticheta colorata deasupra fiecarui titlu, au devenit CAPITOLE
//   (`Capitol`): eticheta de 24 px, afirmatia de 80 px, rama de ceata cu continutul. Navigarea
//   intre ele o face bara lipicioasa de 52 px, adica forma pe care REF-A o da navigarii in
//   pagina.
//
//   BARA POARTA SECTIUNILE, NU CATEGORIILE, si e o abatere declarata de la brief, cu motivul
//   masurat: numele celor opt categorii sunt lungi, iar bara are `flex-nowrap` de la 768 px in
//   sus - opt dintre ele trec de coloana de 1183 px si impinge pagina lateral. Referinta pune
//   PATRU ancore pe bara ei, exact cate are pagina asta. Categoriile raman ancore, in lista de
//   sub bara (`TermeneCuprins`), unde au loc sa poarte si termenul, si actul - ceea ce textul
//   din `cuprins.subTabel` cere explicit.
//
//   FISELE STAU IN RAMA CAPITOLULUI, doua pe rand la 1440 si una la 390, ca doua carduri albe
//   pe ceata. Inainte erau carduri de ceata pe o banda de ceata, adica un card care nu se
//   deosebea de suprafata pe care statea.
//
//   INCHEIEREA ramane `BandaCTA` - tigla pe ceata cu un singur buton, forma REF-A pentru
//   randul de la coada unei pagini.
//
// SECTIUNILE SI ANCORELE LOR RAMAN CELE VECHI (`pe-scurt`, `randuri`, `acoperire`, `moldova`,
// `folosire`, `discutie`): se citeaza in mesaje si nu se redenumesc la o reasezare.
//
// Canonical auto-referential: fara el pagina ar mosteni canonical-ul layout-ului si ar arata
// spre pagina de start, ceea ce o scoate din index.
export const metadata: Metadata = {
  title: P.titluMeta,
  description: P.descriereMeta,
  alternates: { canonical: "/instrumente/termene-de-pastrare" },
};

const LEGATURA = "text-albastru-2 no-underline hover:text-cerneala";

export default function TermeneDePastrare() {
  return (
    <main id="continut">
      {/* ANTETUL E O BANDA, NU UN ECRAN PLIN, si nu poarta buton. Pagina asta ESTE unealta.
          Masurat inainte de scurtare: antet de vitrina de 800 px al carui buton principal
          cerea o intalnire, urmat de o sectiune de 1126 px despre acoperire, iar primul rand
          aparea pe la 1800 px - dupa 2,25 ecrane la 1280 px. Discutia n-a disparut: sta in
          banda de incheiere. */}
      <AntetPagina
        adresa="/instrumente/termene-de-pastrare"
        forma="banda"
        imagine={FOTOGRAFII.sertare}
        fir={[{ text: "Pagina de start", href: "/" }, { text: "Termene de păstrare" }]}
        eticheta={P.eticheta}
        titlu={P.h1}
      />

      <BaraLocala
        ancore={BARA_TERMENE.ancore}
        actiune={{ href: "/contact", text: BARA_TERMENE.pastila }}
        eticheta={BARA_TERMENE.eticheta}
      />

      {/* Lista de ancore catre cele opt fise, deasupra capitolelor: e cuprinsul paginii, deci
          sta inaintea primului capitol si nu inauntrul lui. */}
      <section id="pe-scurt" className="bg-alb pt-12 md:pt-16">
        <div className="mx-auto w-full max-w-registru px-4 md:px-8">
          <span className="mb-4 block text-mic font-semibold text-cerneala-3">
            {ANCORE_TERMENE.eticheta}
          </span>
          <TermeneCuprins
            termene={TERMENE_ROMANIA}
            fara={P.cuprins.fara}
            faraTemei={P.cuprins.faraTemei}
          />
          {P.cuprins.subTabel.map((text) => (
            <p key={text.slice(0, 40)} className={`mt-6 ${MASURA_ACT} text-capitol text-cerneala`}>
              {text}
            </p>
          ))}
        </div>
      </section>

      <Capitol
        id="randuri"
        eticheta={CAPITOLE_TERMENE.randuriEticheta}
        afirmatie={CAPITOLE_TERMENE.randuriAfirmatie}
        text={P.fise.lead}
      >
        {/* Rama capitolului e o PODEA, nu o inaltime legata, deci un rand de carduri mai inalt
            decat ea creste. Captuseala se scrie aici: rama e `flex` si `overflow-hidden`, iar
            un continut lipit de muchia ei ar atinge raza de 28 px. */}
        <div className="w-full p-6 md:p-10">
          <ul className="m-0 grid list-none gap-6 p-0 lg:grid-cols-2">
            {TERMENE_ROMANIA.map((t) => (
              <li key={t.ancora}>
                <TermeneFisa termen={t} />
              </li>
            ))}
          </ul>

          <p className={`mt-8 ${MASURA_ACT} text-capitol text-cerneala`}>
            Ce diferă de la un domeniu la altul, inclusiv rândul lăsat gol la{" "}
            <Link href="/solutii/avocatura" className={LEGATURA}>
              casele de avocatură
            </Link>
            , se citește pe fișele de domeniu.
          </p>
        </div>
      </Capitol>

      <Capitol
        id="acoperire"
        eticheta={CAPITOLE_TERMENE.acoperireEticheta}
        afirmatie={P.acoperire.titlu}
        text={P.acoperire.lead}
      >
        <div className="w-full p-6 md:p-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <ListaBifa titlu={CAPITOLE_TERMENE.acoperitTitlu} elemente={P.acoperire.acoperit} />
            <JuridicListaLipsa
              titlu={CAPITOLE_TERMENE.neacoperitTitlu}
              elemente={P.acoperire.neacoperit}
              oColoana
            />
          </div>

          <h3 className="mt-10 text-titlu-card font-semibold text-cerneala">
            {CAPITOLE_TERMENE.acoperireNotaTitlu}
          </h3>
          <p className={`mt-2 ${MASURA_ACT} text-capitol text-cerneala`}>{P.acoperire.nota}</p>
        </div>
      </Capitol>

      <Capitol
        id="moldova"
        eticheta={CAPITOLE_TERMENE.moldovaEticheta}
        afirmatie={P.moldova.titlu}
        aliniere="centrat"
      >
        <div className="w-full p-6 md:p-10">
          {P.moldova.paragrafe.map((text) => (
            <p key={text.slice(0, 40)} className={`mb-5 ${MASURA_ACT} text-capitol text-cerneala last:mb-0`}>
              {text}
            </p>
          ))}

          <p className={`mt-8 ${MASURA_ACT} text-capitol text-cerneala`}>
            Scrieți-ne la{" "}
            <a href="mailto:contact@3s.ro" className={LEGATURA}>
              contact@3s.ro
            </a>
            , cu actul și articolul. Adăugăm rândul și scriem de unde vine.
          </p>
        </div>
      </Capitol>

      <Capitol
        id="folosire"
        eticheta={CAPITOLE_TERMENE.folosireEticheta}
        afirmatie={P.folosire.titlu}
        text={P.folosire.lead}
      >
        <div className="w-full p-6 md:p-10">
          <TermeneRegula reguli={P.folosire.reguli} />

          {/* `ListaBifa` e INGHETATA si nu poarta plafon de masura: pe toata latimea ramei
              randul iesea 109-115 caractere, masurat. Plafonul se pune pe invelis, singurul loc
              pe care il am. Lista de deasupra, cea pe doua coloane, n-are nevoie: coloana ei are
              386 px. */}
          <div className={`mt-12 ${MASURA_LISTA}`}>
            <ListaBifa titlu={CAPITOLE_TERMENE.temeiuriTitlu} elemente={P.folosire.temeiuri} />
          </div>

          <h3 className="mt-10 text-titlu-card font-semibold text-cerneala">
            {CAPITOLE_TERMENE.folosireNotaTitlu}
          </h3>
          <p className={`mt-2 ${MASURA_ACT} text-capitol text-cerneala`}>{P.folosire.nota}</p>

          <p className={`mt-8 ${MASURA_ACT} text-capitol text-cerneala`}>
            Cum se face selecționarea, pas cu pas, și ce hârtie rămâne după fiecare etapă sunt
            scrise pe{" "}
            <Link href="/arhivare-fizica" className={LEGATURA}>
              pagina de arhivare fizică
            </Link>
            , iar mecanismul întreg, de la preluare până la răspunsul cu sursa citată, pe{" "}
            <Link href="/cum-functioneaza" className={LEGATURA}>
              pagina de mecanism
            </Link>
            . Restul paginilor sunt listate în{" "}
            <Link href="/harta-site" className={LEGATURA}>
              harta site-ului
            </Link>
            .
          </p>
        </div>
      </Capitol>

      <div id="discutie">
        <BandaCTA
          titlu={P.incheiere.titlu}
          text={P.incheiere.text}
          actiune={{ href: "/contact", text: BUTON_DISCUTIE }}
        />
      </div>
    </main>
  );
}
