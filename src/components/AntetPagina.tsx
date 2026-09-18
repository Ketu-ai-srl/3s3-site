import Link from "next/link";
import Buton from "./Buton";
import type { Fotografie } from "@/content/fotografii";

// EROUL DE PAGINA INTERIOARA, dupa REF-A §4 punctul 2 („pagina de produs"). Se citeste de sus
// in jos, tot pe alb, tot in containerul de 1247 (`max-w-vitrina`), TOT LA STANGA:
//
//   firul de navigare        12,5 px `cerneala-3`
//   fotografia               INTAI, pe toata latimea celor 1247, raza 28, fara text peste ea
//   numele paginii           28 / 34 la 1440, 19 / 23 la 390, greutatea 600, `cerneala`
//   afirmatia (h1)           64 la 1440, 40 la 390, greutatea 600, cu ULTIMUL CUVANT albastru
//   randul de sub ea (lead)  21 / 29 la 1440, 19 / 23 la 390, greutatea 400, `cerneala`
//   pastilele                una plina de 44 px si, cand pagina da un al doilea drum, una cu contur
//
// FOTOGRAFIA STA DEASUPRA TEXTULUI, nu dedesubt. Fisa REF-A.md §4.2 insiruise invers (nume ->
// afirmatie -> rand -> fotografie), dar capturile din care a fost scrisa fisa - produs-1440-fold
// si produs-3-ecrane - arata fotografia produsului ocupand ecranul si ABIA SUB EA numele de 28
// si afirmatia de 64. Criticul pre-valului S2-b0 a vazut divergenta; ordinea s-a intors dupa
// captura la reconcilierea lotului, cat costa o mutare de bloc, inainte ca S2-b sa rescrie 20 de
// pagini peste erou. Consecinta masurata: la 1440 afirmatia intra sub linia de plutire (asa e si
// pe referinta, unde sta la ~840 px), iar la 390 fotografia de 320 px e primul lucru vazut.
//
// CENTRAT E DOAR PE START. Pe referinta textul eroului de produs e aliniat la stanga, iar
// centrarea e gestul tiglei de pe pagina de start. Erau doua asezari diferite pentru acelasi
// lucru; a ramas cea a referintei.
//
// NOTELE DIRECTIEI ANTERIOARE NU S-AU PASTRAT „ca istorie": un comentariu care descrie ce nu
// mai exista in fisier e un defect, iar ce a fost inainte se citeste din git. Din acelasi motiv
// `Ecran` nu se mai importa aici deloc.
//
// API-UL RAMANE COMPATIBIL. Semnatura (fir, eticheta, titlu, lead, actiune, secundar, adresa,
// imagine, forma) e neatinsa: cele 20 de pagini interioare o dau azi asa si nu se ating la felia
// asta. S-au schimbat doar rolurile pe care le joaca doua campuri, si amandoua sunt scrise in
// tipuri: `eticheta` e NUMELE paginii (nu o eticheta mica deasupra titlului), iar `titlu` e
// AFIRMATIA de 64 px.
//
// FIRUL DE NAVIGARE nu e decor: e legatura inapoi, ceruta explicit in ambele sensuri. Ultimul
// element e pagina curenta si NU are legatura - o legatura catre pagina in care esti deja e
// zgomot pentru cititorul cu cititor de ecran, nu ajutor. Datele structurate BreadcrumbList se
// emit din aceeasi lista, ca sa nu existe doua surse pentru acelasi fir; tipurile folosite -
// BreadcrumbList, ListItem - sunt in vocabularul pe care poarta S-09 il accepta.
//
// FORMA. `ecran` e eroul intreg. `banda` e antetul scurt al paginilor care sunt DOCUMENTE sau
// UNELTE (/termeni, /confidentialitate, /cookies, /instrumente): acolo omul a venit dupa o
// clauza sau dupa un termen, si o fotografie de 700 px il tine departe de raspuns. Pe `banda`
// fotografia NU se randeaza deloc, chiar daca pagina o da - campul ramane in semnatura fiindca
// aceleasi pagini il trimit azi, iar valul S2-b le rescrie oricum.

export type Veriga = {
  text: string;
  /** Lipsa inseamna pagina curenta: se scrie ca text, nu ca legatura. */
  href?: string;
};

type Props = {
  fir: Veriga[];
  /** NUMELE paginii, randul de 28 px de deasupra afirmatiei. */
  eticheta: string;
  /** AFIRMATIA paginii, h1 de 64 px. Cand e sir, ultimul cuvant se coloreaza. */
  titlu: React.ReactNode;
  /**
   * Randul de sub afirmatie. Optional DOAR pentru banda unei unelte, unde continutul urmeaza
   * imediat sub h1.
   */
  lead?: React.ReactNode;
  /**
   * UN buton primar. Optional din acelasi motiv, si numai acolo: pe `/instrumente` raspunsul e
   * chiar tabelul de dedesubt, iar butonul care statea aici era o ancora spre el.
   */
  actiune?: { href: string; text: string };
  /** Drumul al doilea: pastila cu CONTUR, aceeasi inaltime de 44 px ca pastila plina. */
  secundar?: { href: string; text: string };
  /** Adresa canonica a paginii, ca ultima veriga din datele structurate sa aiba adresa. */
  adresa: string;
  /** Fotografie ilustrativa, luata din registrul `src/content/fotografii.ts`. */
  imagine?: Fotografie;
  /** `banda` scurteaza eroul si ii scoate fotografia: paginile care sunt documente sau unelte. */
  forma?: "ecran" | "banda";
};

const GAZDA = "https://3s2.ke2.in";

// ULTIMUL CUVANT AL AFIRMATIEI STA IN ALBASTRU, ca pe referinta, iar punctul final ramane in
// aceeasi culoare cu el, fiindca e lipit de cuvant si nu e despartit de niciun spatiu.
//
// Se taie la ULTIMA insiruire de spatii, nu la un `split(" ")`, si nu din eleganta: doua
// afirmatii din continut au un spatiu NEINTRERUPTIBIL inaintea ultimului cuvant - `Actul se
// cere`, spatiul acela, `azi.` - si una are un rand nou in mijloc. `\s` din JavaScript prinde si
// spatiul neintreruptibil si randul nou, iar taietura pastreaza caracterul EXACT asa cum e
// scris in continut - un `join(" ")` l-ar fi inlocuit tacut cu un spatiu obisnuit si cuvintele
// s-ar fi despartit tocmai acolo unde continutul cere sa nu se desparta.
//
// Cand `titlu` nu e sir (o pagina care isi compune singura afirmatia) se randeaza intreg, fara
// culoare: nu avem cum sa stim unde se termina ultimul cuvant intr-un arbore de elemente, iar
// o ghicitoare acolo ar colora ce nimereste. Cand afirmatia e UN SINGUR cuvant, tot fara
// culoare: albastrul e un contrast fata de restul propozitiei, iar un h1 colorat in intregime
// n-ar mai contrasta cu nimic.
//
// h1-UL RAMANE UN SINGUR ELEMENT cu tot textul: SEO-ul si cititorul de ecran citesc aceeasi
// propozitie, iar span-ul e doar o vopsea inauntrul ei.
function afirmatia(titlu: React.ReactNode) {
  if (typeof titlu !== "string") return titlu;
  const taietura = /\s+(?=\S+$)/.exec(titlu);
  if (!taietura) return titlu;
  const pana = taietura.index + taietura[0].length;
  return (
    <>
      {titlu.slice(0, pana)}
      <span className="text-albastru-2">{titlu.slice(pana)}</span>
    </>
  );
}

export default function AntetPagina({
  fir,
  eticheta,
  titlu,
  lead,
  actiune,
  secundar,
  adresa,
  imagine,
  forma = "ecran",
}: Props) {
  const banda = forma === "banda";
  const cuFoto = Boolean(imagine) && !banda;

  const firStructurat = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fir.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: v.text,
      item: GAZDA + (v.href ?? adresa),
    })),
  };

  // Rezerva de sus acopera bara globala fixa (44 px de la 768, 48 pe telefon) plus o rasuflare.
  const captuseala = banda
    ? "pt-[96px] pb-10 md:pt-[104px] md:pb-12"
    : "pt-[96px] pb-14 md:pt-[96px] md:pb-16";

  return (
    <>
      <section className={"relative isolate bg-alb " + captuseala}>
        <div className="mx-auto w-full max-w-vitrina px-4 md:px-8">
          <nav aria-label="Firul de navigare" className="mb-8 md:mb-10">
            <ol className="m-0 flex flex-wrap items-baseline gap-x-2 gap-y-1 p-0 text-[12.5px] text-cerneala-3">
              {fir.map((v, i) => (
                <li key={v.text} className="flex items-baseline gap-2">
                  {i > 0 ? (
                    <span aria-hidden className="text-cerneala-3">
                      /
                    </span>
                  ) : null}
                  {v.href ? (
                    <Link
                      href={v.href}
                      className="text-cerneala-3 underline decoration-albastru-2 underline-offset-[3px] hover:text-cerneala"
                    >
                      {v.text}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-cerneala">
                      {v.text}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* FOTOGRAFIA, INTAI - sub firul de navigare, deasupra numelui - pe toata latimea celor
              1247, ca pe captura referintei. Nu poarta text peste ea, deci nu intra in niciun
              calcul de contrast.

              INALTIMEA DE 640 px LA 1440 e aleasa dintr-o masuratoare, nu din gust, si cifra de
              plecare e latimea REALA a cutiei, nu numele containerului: masurat pe pagina
              construita, cu `clientWidth` 1440, fotografia are 1183 px, adica cei 1247 ai
              vitrinei minus captuseala de 2 x 32. Fisierul de 1920 al fiecarei chei masoara
              1920x1280 (3:2, verificat pe fisiere), deci intr-o cutie de 1183 x 640 se vede
              640 / (1183 / 1,5) = 81,1% din inaltimea lui. Banda pentru care s-au ales ancorele
              `pozitie` din `src/content/fotografii.ts` e 84,4-95,7%; fereastra de 81,1% e, la
              aceeasi ancora, un SUBSET al ferestrei de 84,4% (capatul de sus `pozitie` x (1 - f)
              creste cand f scade, cel de jos `pozitie` + f x (1 - `pozitie`) scade), deci nu
              arata nimic din ce n-a fost privit la 1:1 - poate doar sa taie putin din margini.
              De ce nu 700 (88,8%, in mijlocul benzii): cu fotografia INAINTEA textului, la 700
              numele ajungea la y 926 si afirmatia la 972 pe un ecran de 1440 x 900, adica nimic
              din text nu se vedea fara derulare; pe referinta numele sta la ~780 si afirmatia la
              ~840. Cu 640 si captuseala de sus de 96 (nu 112), masurat: nume la 842, afirmatie
              la 888 - amandoua in linia de plutire, ca pe referinta.

              SUB 768 px cutia are 320 px, aceeasi cifra ca fotografia tiglelor de pe start si
              din acelasi motiv (82% din latimea de 390). Acolo se serveste fisierul de 960, care
              e 960x1440, adica portret 2:3: intr-o cutie masurata de 358 x 320 se vede
              320 / (358 / 0,667) = 59,6% din inaltimea lui, fata de 44,7% cat se vedea in cardul
              de 358 x 240 al directiei anterioare - chiar cifra de 44,6% scrisa in registru.
              Fereastra mai larga o CONTINE pe cea masurata, pentru ORICE ancora: capatul de sus
              al ferestrei e `pozitie` x (1 - f), care scade cand f creste, iar cel de jos e
              `pozitie` + f x (1 - `pozitie`), care creste. Deci nicio ancora din registru nu
              pierde ce arata azi, si nimic nu trebuie remasurat. */}
          {cuFoto && imagine ? (
            <div className="mb-10 flex h-[320px] w-full overflow-hidden rounded-card md:mb-12 md:h-[640px]">
              <picture className="w-full">
                <source media="(max-width: 767px)" srcSet={"/img/" + imagine.nume + "-960.webp"} />
                <img
                  src={"/img/" + imagine.nume + "-1920.webp"}
                  alt={imagine.alt}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: imagine.pozitie ?? "center" }}
                  loading="eager"
                  decoding="async"
                />
              </picture>
            </div>
          ) : null}

          {/* Numele paginii e `span`, nu `p`, si nu e cosmetica de markup: doua-trei cuvinte
              deasupra afirmatiei nu sunt proza, iar poarta S-17 cantareste paragrafele
              adevarate, comparand textul randat cu cel citit fara JavaScript. Culoarea e
              `cerneala` (16,83:1 pe alb) - pe referinta numele produsului are aceeasi cerneala
              ca afirmatia de sub el, iar ierarhia o face marimea: 28 fata de 64. */}
          <span className="mb-2 block text-subtitlu-tigla font-semibold text-cerneala md:mb-3">
            {eticheta}
          </span>

          <h1 className="max-w-[20ch] text-titlu-1 text-cerneala">{afirmatia(titlu)}</h1>

          {lead ? (
            // 21 / 29 la greutatea 400, in `cerneala` (16,83:1 pe alb). NU `cerneala-2`:
            // #86868b da 3,62:1, iar usa de 3:1 pentru text mare cere 24 px sau greutatea 700 -
            // 600 nu e „bold" pentru WCAG, si la 400 nici atat. Povestea intreaga, cu cele trei
            // iesiri cantarite: `globals.css`.
            <p className="mt-5 max-w-[52ch] text-lead text-cerneala">{lead}</p>
          ) : null}

          {/* PASTILELE. UNA plina (drumul principal) si cel mult una cu CONTUR - amandoua de
              44 px de la 768 px in sus, cele doua marimi masurate ale referintei fiind legate de
              marimea literei, nu alese. Sub 768 px trec la 36 px, marimea pe care referinta o
              masoara pe telefon (fisa REF-A §3, „Grila de start pe 390: butoane de 36 px"), si
              stau UNA SUB ALTA, nu una langa alta care se rup unde nimereste.
              Marimea nu poate fi un singur `marime`, fiindca `Buton` e INGHETAT si nu are
              variante dupa latime: se cere cea mica si se ridica la cea mare prin `md:`, pe
              poarta de `className` pe care componenta o expune. Variantele `md:` ies dupa
              utilitarele de baza in foaia generata, deci ele castiga de la 768 px in sus -
              masurat pe pagina construita, nu presupus. */}
          {actiune ? (
            <div className="mt-8 flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-4">
              <Buton
                href={actiune.href}
                marime="mic"
                className="md:px-[21px] md:py-[11px] md:text-corp md:leading-[22px]"
              >
                {actiune.text}
              </Buton>
              {secundar ? (
                <Buton
                  href={secundar.href}
                  fel="contur"
                  marime="mic"
                  className="md:px-[21px] md:py-[11px] md:text-corp md:leading-[22px]"
                >
                  {secundar.text}
                </Buton>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(firStructurat) }}
      />
    </>
  );
}
