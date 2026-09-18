import type { TermenCuAncora } from "@/content/termene-extins";
import { ANCORE_TERMENE } from "@/content/interior-juridic";

// Cuprinsul instrumentului de termene: LISTA DE ANCORE catre cele opt fise, fiecare cu
// termenul si cu actul scrise pe ea.
//
// DE CE NU STA PE BARA LOCALA, desi acolo e locul navigarii in pagina la REF-A. Bara e o
// singura linie de 52 px de la 768 px in sus, iar numele categoriilor sunt lungi („Registre
// și documente justificative", „Acte administrative ale autorităților locale"): opt dintre
// ele, la 12 px, trec de coloana de 1183 px si impinge pagina lateral, fiindca bara poarta
// `flex-nowrap`. Pe bara au ramas cele PATRU sectiuni ale paginii - exact cate ancore are
// bara referintei - iar categoriile au ramas aici, unde au loc sa poarte trei lucruri.
//
// CE NU S-A PIERDUT, si de asta randul poarta trei lucruri, nu unul: actul normativ sta SUB
// numele categoriei, la orice latime, iar numele duce la fisa intreaga. Amandoua sunt scrise
// in `cuprins.subTabel`, adica in continut, deci un rand cu numele singur ar fi facut textul
// acela fals.
//
// CE S-A SCHIMBAT LA VALUL S2-b. Cardurile au disparut. Cele opt intrari erau carduri de ceata
// cu raza 28 si sageata la capat; REF-A pune carduri acolo unde cardul e continutul (fisa,
// domeniul, capitolul), nu la un cuprins. Aici raman randuri despartite de firul de 1 px -
// aceeasi forma cu a oricarei liste din pagina - pe patru coloane la 1440 si pe una la 390.

export default function TermeneCuprins({
  termene,
  fara,
  faraTemei,
}: {
  termene: TermenCuAncora[];
  fara: string;
  faraTemei: string;
  /** Ramas in semnatura pentru pagina care il da inca; lista nu mai are card. */
  fundal?: "alb" | "ceata";
}) {
  return (
    <nav aria-label={ANCORE_TERMENE.eticheta}>
      <p className="sr-only">{ANCORE_TERMENE.descriere}</p>
      {/* Firul de 1 px desparte randurile, si atat: fara linii verticale intre coloane.
          O grila de patru coloane cu chenar la stanga cere o regula pentru primul element al
          FIECARUI rand, iar numarul de coloane se schimba cu latimea - deci regula ar fi
          trebuit scrisa de trei ori, pentru trei praguri, si ar fi gresit la al patrulea. */}
      <ul className="m-0 grid list-none border-t p-0 md:grid-cols-2 lg:grid-cols-4">
        {termene.map((t) => (
          <li key={t.ancora} className="border-b py-4 md:pr-8">
            <a href={"#" + t.ancora} className="block no-underline">
              <span className="block text-corp font-semibold text-albastru-2">{t.scurt}</span>
              <span className="mt-1 block text-nota font-semibold text-cerneala">
                {t.termen ? t.termen : fara}
              </span>
              <span className="mt-1 block text-nota text-cerneala-3">
                {t.lege ? t.lege : faraTemei}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
