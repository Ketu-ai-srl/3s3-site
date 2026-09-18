// Sectiunea de REGISTRU a feliei juridice, pe gramatica REF-A a paginii juridice: coloana de
// 980 px (`max-w-registru`), titlu h2 de 32 px la greutatea 600, o propozitie de introducere
// la 21 / 29, apoi continutul. Fara banda de fundal, fara eticheta colorata, fara centrare.
//
// CE S-A SCHIMBAT LA VALUL S2-b, si de ce fiecare lucru:
//
//   BANDA A DISPARUT. Sectiunea era o banda pe toata latimea ferestrei, cu fundalul alternand
//   alb / ceata de sus in jos, in containerul de vitrina (1247). Alternanta e gramatica paginii
//   de PRODUS, unde fiecare banda spune alt lucru si e despartita de vecina prin culoare; pe o
//   harta de site sau pe un act, cinci benzi colorate taie un singur document in cinci afise.
//   Fisa REF-A scrie pentru pagina juridica „sectiuni la stanga pe 980", si atat.
//
//   TITLUL A COBORAT de la 48 px (`text-titlu-2`) la 32 px. 48 e treapta h1-ului paginii, iar
//   pe pagina juridica el e singurul afis; sectiunile sunt titluri de paragraf. 32 / 38 e chiar
//   perechea masurata pe referinta pentru h2-ul juridic (32 / 36 la ea; pasul de rand urca la
//   1,19 din regula diacriticelor romanesti - vezi `globals.css`).
//
//   ETICHETA DE 14 px IN CULOARE A DISPARUT. Era un cuvant colorat deasupra fiecarui titlu,
//   forma directiei anterioare. REF-A n-are asa ceva pe pagina juridica: eticheta de 24 px
//   exista numai deasupra afirmatiei unui CAPITOL, si acolo o pune `Capitol`. Campul ramane in
//   semnatura fiindca paginile feliei il dau inca; cand e dat, se scrie la 12 px in `cerneala-3`
//   (5,07:1 pe alb), adica exact treapta pe care o are eticheta mica peste tot in rest.
//
// DE CE NU `SectiuneRegistru`. Aceea e componenta altei felii, inghetata in valul asta, si
// poarta gramatica directiei anterioare - cota romana, titlu la greutatea 400, alt ritm
// vertical. Regula feliei spune exact asta: o componenta inghetata se importa cum e, iar cine
// are nevoie de alta asezare scrie una noua cu prefixul feliei.

import { MASURA_ACT } from "@/content/interior-juridic";

type Props = {
  id?: string;
  /** Ramas in semnatura pentru paginile care il dau inca. Sectiunea nu mai poarta fundal. */
  ton?: "alb" | "ceata";
  /** Cuvantul de deasupra titlului, la 12 px. Lipseste pe majoritatea sectiunilor. */
  eticheta?: string;
  /** Titlul sectiunii, ca `h2` de 32 px. */
  titlu?: React.ReactNode;
  lead?: React.ReactNode;
  /** Ramas in semnatura; pagina juridica REF-A nu centreaza nicio sectiune. */
  centrat?: boolean;
  children: React.ReactNode;
};

export default function JuridicSectiune({ id, eticheta, titlu, lead, children }: Props) {
  const antet = titlu || lead || eticheta;

  return (
    <section id={id} className="bg-alb">
      <div className="mx-auto w-full max-w-registru px-4 py-14 md:px-8 md:py-20">
        {antet ? (
          <div>
            {/* `span`, nu `p`: un cuvant-doua deasupra titlului nu e proza, iar poarta S-17
                cantareste paragrafele adevarate. */}
            {eticheta ? (
              <span className="mb-3 block text-mic font-semibold text-cerneala-3">{eticheta}</span>
            ) : null}
            {titlu ? <h2 className="text-[32px] text-cerneala">{titlu}</h2> : null}
            {lead ? <p className={`mt-4 ${MASURA_ACT} text-capitol text-cerneala`}>{lead}</p> : null}
          </div>
        ) : null}
        <div className={antet ? "mt-10" : ""}>{children}</div>
      </div>
    </section>
  );
}
