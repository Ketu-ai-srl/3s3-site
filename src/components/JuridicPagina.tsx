import Link from "next/link";
import BaraLocala from "./BaraLocala";
import Buton from "./Buton";
import JuridicAncore from "./JuridicAncore";
import JuridicBlocuri from "./JuridicBlocuri";
import {
  ANCORE_ACT,
  BARA_ACT,
  BUTON_DISCUTIE,
  GRUPE_ACT,
  INCHEIERE_ACT,
  MASURA_ACT,
} from "@/content/interior-juridic";
import { PAGINI_JURIDICE, type PaginaJuridica } from "@/content/juridic";
import { RUTE } from "@/content/rute";

// Forma unei pagini juridice, o singura data pentru toate trei, pe gramatica ACTULUI din
// REF-A §4 („Pagina juridica"), citita in ordinea ei:
//
//   bara locala 52 px    titlul actului la 21 px, ancorele sectiunilor la 12 px, o pastila de
//                        24 px la dreapta;
//   h1 48 / 57 600       CENTRAT, in containerul de 653 px (`max-w-act`);
//   introducerea         21 / 29 la greutatea 400, centrata, tot pe 653;
//   sectiunile           la STANGA, pe 980 px (`max-w-registru`): h2 32, h3 20 / 29, p 21 / 29,
//                        liste 17 / 25, legaturi `albastru-2` fara subliniere.
//
// CE A DISPARUT FATA DE VALUL S1-b, si de ce fiecare lucru:
//
//   EROUL DE VITRINA. Actul deschidea cu `AntetPagina`: fir de navigare, eticheta, h1 de 64 px,
//   doua pastile si, pe forma de banda, fotografia. Pagina juridica a referintei n-are erou:
//   are un titlu centrat si doua-trei randuri de introducere, si intra direct in text. Cele
//   doua butoane din antet duceau la discutie si la celalalt act; amandoua raman, in blocul de
//   incheiere, unde un cititor care a terminat actul chiar are ce face cu ele.
//
//   CUPRINSUL LIPICIOS. `JuridicCuprins` era o coloana de 200 px in stanga documentului, cu
//   `IntersectionObserver` care muta accentul. REF-A spune explicit „fara cuprins lateral":
//   navigarea in pagina o fac BARA LOCALA, care sta oricum pe ecran tot timpul si nu fura o
//   coloana din latimea textului, si cuprinsul orizontal de sub titlu (`JuridicAncore`).
//
// BARA POARTA GRUPELE, NU TOATE SECTIUNILE, si e o corectura masurata, nu o preferinta. Cu cate
// o ancora de sectiune - noua pe /termeni si pe /confidentialitate - `scrollWidth`-ul PAGINII
// iesea 927 px pe /termeni si 993 px pe /confidentialitate la ferestre de 768 si de 834 px:
// componenta are `flex-nowrap` de la 768 px in sus, deci randul nu se rupe, ci impinge. Cu bara
// pe `display:none` scrollWidth cobora la exact 768, deci ea era singura cauza. Pe bara raman
// cele patru grupe din `GRUPE_ACT` - cate ancore are si bara referintei - iar toate sectiunile
// stau in cuprinsul de sub titlu, fiecare cu numele scurt SI cu propozitia titlului. Aceeasi
// parghie s-a aplicat la valul asta si uneltei de termene; pe acte lipsea, si acolo musca.
//
//   CIFRA DE SECTIUNE. „Secțiunea 4" statea deasupra fiecarui titlu, la 14 px. Actul referintei
//   nu numeroteaza sectiunile, iar ancora (`#raspunderea`) e mijlocul de trimitere care chiar
//   se copiaza dintr-un browser. Cifra a iesit odata cu cuprinsul care o purta si el.
//
//   CASETELE. `declaratie` si `limite` erau carduri pe ceata. „Fara casete, fara carduri" e
//   scris in fisa pentru pagina juridica, iar blocurile astea sunt continut al actului, nu note
//   de subsol: raman ca sectiuni de text cu titlu de 20 px. Vezi `JuridicBlocuri`.
//
// TITLUL DIN BARA vine din REGISTRUL DE RUTE, cautat dupa calea actului, nu din `titluMeta`.
// Doua motive, amandoua mecanice: numele scurt e chiar cel din meniu si din subsol, deci nu
// poate diverge de ele la o redenumire; si e mai scurt („Confidențialitate" fata de „Politica
// de confidențialitate"), adica lasa loc ancorelor pe randul de 52 px. Cand calea nu e in
// registru, bara ramane fara titlu in loc sa scrie o presupunere.
//
// RANDUL „ACTUALIZAT LA" DIN FISA REF-A NU EXISTA AICI, si e o absenta verificata, nu o
// scapare: `PaginaJuridica` n-are camp de data, iar singura data din `src/content/juridic.ts`
// e o constanta neexportata, folosita in propozitia de redactare. Data aceea spune cand a fost
// REDACTAT textul, nu cand a fost actualizat actul, si e citita in blocul de incheiere, in
// propozitia ei. O data inventata pe randul de sus ar fi o afirmatie despre propria noastra
// rigoare, adica exact clasa pe care poarta de afirmatii o refuza.

function ancorele(pagina: PaginaJuridica) {
  // Bara poarta grupele actului. Cand actul nu e in tabel - unul nou, de pilda - le poarta pe
  // toate: forma dinainte, vizibila si masurabila, nu o bara goala.
  const grupe = GRUPE_ACT[pagina.cale];
  const sectiuni = grupe
    ? pagina.sectiuni.filter((s) => grupe.includes(s.id))
    : pagina.sectiuni;

  return sectiuni.map((s) => ({
    ancora: s.id,
    // Fara eticheta scurta, bara scrie titlul intreg: absenta se vede si se repara.
    eticheta: ANCORE_ACT[s.id] ?? s.titlu,
  }));
}

function Incheiere({ pagina }: { pagina: PaginaJuridica }) {
  // Drumurile de la coada actului, fara destinatii duplicate: legatura secundara scrisa in
  // continut vine prima, apoi celelalte acte pe care ea nu le numeste deja. Fara filtrul asta,
  // /termeni ar fi aratat de doua ori catre /confidentialitate, o data cu fiecare nume.
  const drumuri = [
    pagina.secundar,
    ...PAGINI_JURIDICE.filter((p) => p.cale !== pagina.cale && p.cale !== pagina.secundar.href).map(
      (p) => ({ href: p.cale, text: p.titluMeta }),
    ),
  ];

  return (
    <section className="mt-16 border-t pt-12 md:mt-20 md:pt-16">
      <h2 className="text-[32px] text-cerneala">{INCHEIERE_ACT.titlu}</h2>

      <h3 className="mt-8 text-titlu-card font-semibold text-cerneala">
        {INCHEIERE_ACT.redactare}
      </h3>
      <p className={`mt-2 ${MASURA_ACT} text-capitol text-cerneala`}>{pagina.redactat}</p>

      <p className={`mt-6 ${MASURA_ACT} text-capitol text-cerneala`}>
        Dacă ceva din pagina aceasta este neclar sau vă pare greșit, scrieți-ne la{" "}
        <a href="mailto:contact@3s.ro" className="text-albastru-2 no-underline">
          contact@3s.ro
        </a>
        . Corectăm în text, nu în corespondență, ca să vadă și următorul cititor corectura.
        Serviciile sunt descrise pe{" "}
        <Link href="/solutii" className="text-albastru-2 no-underline">
          pagina de domenii
        </Link>
        .
      </p>

      {/* UN singur buton primar. Celelalte acte sunt drumuri secundare, deci legaturi de text. */}
      <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
        <Buton href="/#discutie" sageata className="max-sm:w-full">
          {BUTON_DISCUTIE}
        </Buton>
        {drumuri.map((d) => (
          <Buton key={d.href} href={d.href} fel="text">
            {d.text}
          </Buton>
        ))}
      </div>
    </section>
  );
}

export default function JuridicPagina({ pagina }: { pagina: PaginaJuridica }) {
  const ruta = RUTE.find((r) => r.cale === pagina.cale);

  return (
    // Captuseala de sus acopera bara globala FIXA (48 px pe telefon, 44 de la 768 px in sus).
    // Fara ea, bara locala - care e lipicioasa, nu fixa - ar porni sub ea si primul ei rand ar
    // fi acoperit la incarcarea paginii.
    <main id="continut" className="bg-alb pt-[48px] md:pt-[44px]">
      <BaraLocala
        titlu={ruta?.scurt}
        ancore={ancorele(pagina)}
        actiune={{ href: "/contact", text: BARA_ACT.pastila }}
        eticheta={BARA_ACT.eticheta}
      />

      {/* TITLUL SI INTRODUCEREA, centrate pe 653 px. Eticheta ramane deasupra, la 12 px: e
          continut al actului (`pagina.eticheta`), iar pagina juridica a referintei n-are unde
          altundeva sa o poarte. */}
      <div className="mx-auto w-full max-w-act px-4 pt-16 pb-12 text-center md:pt-20 md:pb-16">
        <span className="mb-4 block text-mic font-semibold text-cerneala-3">
          {pagina.eticheta}
        </span>
        <h1 className="text-titlu-2 text-cerneala">{pagina.h1}</h1>
        <p className="mt-6 text-capitol text-cerneala">{pagina.lead}</p>
      </div>

      <div className="mx-auto w-full max-w-registru px-4 pb-20 md:px-8 md:pb-24">
        {/* Cuprinsul actului: toate sectiunile, inaintea primei dintre ele. */}
        <JuridicAncore sectiuni={pagina.sectiuni} />

        {pagina.sectiuni.map((s) => (
          <section key={s.id} id={s.id} className="mb-14 last:mb-0 md:mb-16">
            <h2 className="mb-6 text-[32px] text-cerneala">{s.titlu}</h2>
            <JuridicBlocuri blocuri={s.blocuri} />
          </section>
        ))}
        <Incheiere pagina={pagina} />
      </div>
    </main>
  );
}
