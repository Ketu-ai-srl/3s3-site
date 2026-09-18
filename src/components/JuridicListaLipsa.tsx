import { LIPSA, MASURA_LISTA } from "@/content/interior-juridic";

// Lista lucrurilor care LIPSESC, ca perechea negativa a lui `ListaBifa`.
//
// CARDURILE AU DISPARUT la valul S2-b. Fiecare rand era un card pe ceata, iar opt carduri de
// cate treizeci de cuvinte formau o grila care citea a plan tarifar. `ListaBifa` a devenit,
// la felia de fundatie, exact ce cere REF-A pentru o lista: randuri despartite de firul de
// 1 px, la 17 / 25, fara nicio icoana colorata. Perechea negativa trebuie sa fie aceeasi
// forma, altfel cele doua liste de pe /instrumente/termene-de-pastrare - „ce este acoperit"
// si „ce nu este acoperit" - stau una langa alta in doua gramatici diferite.
//
// CE RAMANE DIFERIT FATA DE `ListaBifa`: LINIUTA din fata randului. Ea e singurul semn care
// spune „asta lipseste", iar `ListaBifa` nu-l are - randurile ei sunt lucruri care exista.
// Nu se refoloseste componenta aceea tocmai fiindca aceleasi randuri fara liniuta ar citi
// invers decat scriu, si asta a fost defectul masurat pe /accesibilitate inainte: opt
// afirmatii despre ce NU am masurat, fiecare cu o bifa in fata.
//
// CULOAREA. Liniuta si textul sunt `cerneala`, ca in `ListaBifa`. Informatia sta in cuvant, nu
// in culoare, iar `cerneala` trece pe amandoua suprafetele deschise (16,83:1 pe alb, 15,46:1
// pe ceata).

type Props = {
  /** Titlul listei, ca h3 de 20 px. Lipseste cand sectiunea il da ea. */
  titlu?: string;
  elemente: React.ReactNode[];
  /**
   * `fundal` si `oColoana` raman in semnatura fiindca paginile feliei le dau inca, si fiindca
   * o semnatura schimbata odata cu forma face doua schimbari intr-un singur pas. Lista nu mai
   * are card, deci suprafata pe care sta nu-i mai schimba nimic, iar randurile stau oricum pe
   * o singura coloana - forma pe care REF-A o da oricarei liste.
   */
  fundal?: "alb" | "ceata";
  oColoana?: boolean;
};

export default function JuridicListaLipsa({ titlu, elemente }: Props) {
  return (
    <div>
      <h3 className="mb-5 text-titlu-card font-semibold text-cerneala">
        {titlu ?? LIPSA.eticheta}
      </h3>
      <ul className="m-0 list-none border-t p-0">
        {elemente.map((e, i) => (
          <li key={i} className="flex gap-3 border-b py-3 text-corp text-cerneala">
            {/* Plafonul e pe textul randului, nu pe rand: firul de 1 px ramane lat cat lista. */}
            <span aria-hidden className="mt-[12px] h-px w-[10px] shrink-0 bg-cerneala-3" />
            <span className={MASURA_LISTA}>{e}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
