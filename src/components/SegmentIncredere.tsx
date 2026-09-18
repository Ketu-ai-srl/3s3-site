import Buton from "./Buton";
import type { Fapt } from "@/content/segmente";

// BANDA DE „HIGHLIGHTS" a paginii de produs REF-A (§4): stă pe `ceata`, imediat sub erou.
// Capul benzii are afirmatia la STANGA si o legatura la DREAPTA, pe acelasi rand de la 768 px
// in sus; sub ele, carduri albe cu raza 28.
//
// CE PUNE IN CARDURI. Cele trei fapte care nu tin de domeniu, scrise in
// `INDIFERENT_DE_DOMENIU` (segmente.ts). Pana la valul asta se vedeau de DOUA ori pe hub -
// titlurile lor intr-un rand de iconite sub erou, si perechea intreaga pe o banda inchisa mai
// jos. Aici apar o singura data, cu textul intreg, si banda inchisa a hub-ului dispare.
//
// FARA ICONITE. Randul de dinainte desena trei contururi svg in componenta, fiindca directia
// anterioara cerea un semn in dreptul fiecarui fapt. REF-A nu pune iconite decorative in
// highlights: cardul poarta text, si atat.
//
// LITERA CARDULUI, dupa fisa REF-A: 17 px la pasul 21 si greutatea 600 pentru randul de sus,
// apoi explicatia la 17 / 25 in `cerneala-3` (4,66:1 pe alb; cardul e alb, banda e ceata).
// Pasul de 21 e sub pragul de 1,19 al diacriticelor doar pe hartie: randul de sus are
// doua-patru cuvinte si nu se rupe niciodata la latimea cardului - masurat la 390, cel mai
// lung („Fiecare răspuns are sursă.") intra pe un rand. Explicatia, care CHIAR se rupe, sta la
// 17 / 25, adica 1,47.

type Props = {
  fapte: Fapt[];
  /** Eticheta de 12 px de deasupra afirmatiei. */
  eticheta: string;
  /** Afirmatia benzii, h2 de 56 px la stanga. */
  titlu: string;
  /** Legatura din dreapta capului. Pagina alege incotro duce, ca sa nu arate spre ea insasi. */
  legatura: { href: string; text: string };
  /** Un rand de explicatie sub afirmatie, unde pagina are ce spune. */
  lead?: string;
};

export default function SegmentIncredere({ fapte, eticheta, titlu, legatura, lead }: Props) {
  return (
    <section className="bg-ceata">
      <div className="mx-auto w-full max-w-vitrina px-4 py-16 md:px-8 md:py-[110px]">
        <div className="md:flex md:items-end md:justify-between md:gap-10">
          <div>
            <span className="mb-3 block text-mic font-semibold text-cerneala-3">{eticheta}</span>
            <h2 className="max-w-[20ch] text-tigla text-cerneala">{titlu}</h2>
          </div>
          <div className="mt-5 shrink-0 md:mt-0 md:pb-2">
            <Buton href={legatura.href} fel="text">
              {legatura.text}
            </Buton>
          </div>
        </div>

        {lead ? (
          <p className="mt-6 max-w-[62ch] text-capitol font-semibold text-cerneala-3">{lead}</p>
        ) : null}

        <ul className="m-0 mt-10 grid list-none gap-4 p-0 md:mt-12 md:grid-cols-3">
          {fapte.map((f) => (
            <li key={f.titlu} className="rounded-card bg-alb p-8">
              <h3 className="text-corp leading-[21px] font-semibold text-cerneala">{f.titlu}</h3>
              <p className="mt-3 text-corp text-cerneala-3">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
