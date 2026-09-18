import { ANCORE_ACT, ANCORE_SECTIUNI } from "@/content/interior-juridic";
import type { PaginaJuridica } from "@/content/juridic";

// CUPRINSUL UNUI ACT: lista de ancore catre TOATE sectiunile lui, sub titlu si introducere.
//
// DE CE EXISTA, cu cifra care l-a cerut. Bara locala purta cate o ancora de sectiune - noua pe
// /termeni si pe /confidentialitate - iar de la 768 px in sus componenta are `flex-nowrap`:
// randul nu se rupe, ci creste. Masurat la fereastra de 768 px, `scrollWidth`-ul PAGINII iesea
// 927 px pe /termeni si 993 px pe /confidentialitate, la fel la 834; cu bara pe `display:none`
// cobora la exact 768, deci bara era singura cauza. Pe bara au ramas grupele (`GRUPE_ACT`), iar
// sectiunile au coborat aici.
//
// FORMA E CEA A CUPRINSULUI DE LA UNEALTA (`TermeneCuprins`), si tot din motivul de acolo:
// randuri despartite de firul de 1 px, fara carduri - REF-A pune card acolo unde cardul E
// continutul, nu la un cuprins. Trei coloane la 1440, doua de la 768, una la 390.
//
// RANDUL POARTA DOUA LUCRURI, nu unul: numele scurt - chiar cel de pe bara, ca sa se recunoasca
// - si titlul intreg al sectiunii, care e o propozitie si spune ce scrie inauntru. Un cuprins
// care ar purta doar numele scurt ar fi o copie a barei, adica zgomot; asa e singurul loc din
// pagina unde se citesc, una sub alta, cele noua afirmatii ale actului.
//
// FIRELE SUNT ALE BLOCULUI, NU ALE FIECARUI RAND, si asta e o corectura facuta pe captura, nu
// din principiu. Cu firul pus pe fiecare celula, ultimul rand al grilei ramane incomplet cand
// numarul de sectiuni nu se imparte la numarul de coloane - noua sectiuni pe doua coloane la
// 768 px, cinci pe trei coloane la 1440 - si linia de sub el se opreste la jumatate sau la doua
// treimi, adica citeste a rigla uitata. Numarul de coloane se schimba cu latimea, deci nicio
// regula scrisa pe „ultimul copil" nu il poate acoperi la toate trei. Firele urca pe lista
// intreaga, unde nu depind de cate elemente au ramas pe ultimul rand, iar randurile se despart
// prin spatiu. `TermeneCuprins` nu are defectul fiindca opt se imparte si la doua, si la patru;
// aici numarul de sectiuni difera de la un act la altul si nu poate fi ales.

export default function JuridicAncore({ sectiuni }: { sectiuni: PaginaJuridica["sectiuni"] }) {
  return (
    <nav aria-label={ANCORE_SECTIUNI.eticheta} className="mb-14 md:mb-16">
      <span className="mb-4 block text-mic font-semibold text-cerneala-3">
        {ANCORE_SECTIUNI.eticheta}
      </span>
      <p className="sr-only">{ANCORE_SECTIUNI.descriere}</p>
      <ul className="m-0 grid list-none gap-x-8 gap-y-6 border-t border-b py-6 pl-0 md:grid-cols-2 lg:grid-cols-3">
        {sectiuni.map((s) => (
          <li key={s.id}>
            <a href={"#" + s.id} className="block no-underline">
              <span className="block text-corp font-semibold text-albastru-2">
                {ANCORE_ACT[s.id] ?? s.titlu}
              </span>
              <span className="mt-1 block text-nota text-cerneala-3">{s.titlu}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
