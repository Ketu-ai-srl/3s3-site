import type { FactorCost } from "@/content/comparatie";

// CARDUL MARE al capitolului de factori de pe /investitia. Trei carduri intr-un rand, in rama
// de `ceata` a capitolului, cu cel din MIJLOC negru - tigla inchisa pe care REF-A o pune pe
// randurile de trei (§4 punctul 3 de pe pagina de start, aceeasi forma).
//
// ADAPTAREA, si e singura de fond. In referinta locul acesta poarta pretul: cifra mare, cifra
// barata, butonul, apoi lista. Noi nu publicam preturi si nu publicam intervale - decizia e a
// owner-ului si pagina o explica in acordeonul de la final. Ce punem in locul cifrei e singurul
// lucru pe care il putem da cinstit: SCARA. Fiecare element de cost isi scrie cele doua
// directii, „creste cand" si „scade cand", asa incat cititorul sa-si aseze singur fondul
// undeva intre ele.
//
// DE CE TREI CARDURI SI NU SAPTE RANDURI. Forma dinaintea gruparii era o lista tipografica de
// sapte randuri, cu titlul fiecarui element urcat la litera de afis: 3368 px la 1280, adica
// 4,21 ecrane si 561 de cuvinte sub un singur titlu. Gruparea in trei sta in
// `src/content/interior-investitia.ts`, cu indicii care acopera multimea de sapte exact o data;
// `tests/interior-felie4.test.ts` o masoara, ca o regrupare viitoare sa nu piarda un element.
//
// CULORILE NU SUNT ALESE DUPA GUST, sunt cele doua capete pe care paleta REF-A le permite. Pe
// cardul alb: `cerneala` 16,83:1 pentru titluri, `cerneala-3` 5,07:1 pentru text. Pe cardul
// negru se scrie `ceata` (19,29:1), nu alb pur, care vibreaza la marimi mici, iar eticheta lui
// e o pastila `albastru` cu litera alba (4,70:1) - `albastru` e suprafata, niciodata litera.
// Linia dintre elemente e implicitul global #d2d2d7 pe alb si #333336 pe negru.
//
// FARA UMBRA. Cardul se desparte de rama de `ceata` prin culoarea lui de fundal, ca in
// `Card.tsx`; o umbra pe un card static e chiar tiparul pe care directia il refuza.
//
// `self-start`, SI E MASURAT. Grupele au 2, 2 si 3 elemente, deci cardurile nu poarta aceeasi
// cantitate de text. Cat timp randul le intindea la inaltimea celui mai inalt, surplusul cadea
// INAUNTRUL unei suprafete colorate: la 1440, 488 px de alb gol sub „Marimea si starea" (33%
// din card) si 445 px de negru gol sub „Timpul si frecventa" (30%), pe carduri de 1472 px.
// Aici cardul ESTE elementul de grila si isi poarta fundalul, spre deosebire de
// `InvestitieCarduri`, unde elementul de grila e transparent - de aceea argumentul de acolo,
// „cardurile raman egale intre ele", nu se muta si aici: acolo golul cade pe rama, aici pe
// cerneala. Cu `self-start` cardurile isi tin inaltimea data de text - 1017, 1060 si 1472 - si
// sub cele scunde se vede rama de `ceata`, o suprafata neutra care spune adevarul: grupa aceea
// are mai putin de spus.
//
// SCOATEREA LUI `h-full` NU ERA DE AJUNS, si am masurat-o inainte s-o cred: `<li>` e element de
// grila, iar `align-items` implicit il intinde oricum, deci fara `h-full` cifrele au iesit
// IDENTICE (488 / 445 / 32). Alinierea trebuie ceruta, nu doar ne-impiedicata.
//
// La 390 nu se schimba nimic: cardurile se stivuiesc, isi au deja inaltimea din text (864, 882,
// 1209) si golul de la baza e captuseala de 24 px.

type Props = {
  eticheta: string;
  titlu: string;
  lead: string;
  elemente: FactorCost[];
  inchis?: boolean;
};

export default function InvestitiaFactor({
  eticheta,
  titlu,
  lead,
  elemente,
  inchis = false,
}: Props) {
  const cutie = inchis ? "bg-negru" : "bg-alb";
  const pastila = inchis ? "bg-albastru text-alb" : "bg-ceata text-albastru-2";
  const titluCard = inchis ? "text-ceata" : "text-cerneala";
  const corp = inchis ? "text-ceata" : "text-cerneala-3";
  const separator = inchis ? "border-[#333336]" : "border-[#d2d2d7]";
  const numeElement = inchis ? "text-ceata" : "text-cerneala";
  const etichetaCreste = inchis ? "text-albastru-clar" : "text-albastru-2";
  const etichetaScade = inchis ? "text-ceata" : "text-cerneala-3";

  return (
    <li className={"self-start rounded-card p-6 md:p-8 " + cutie}>
      <span
        className={
          "inline-block rounded-pastila px-[10px] py-[3px] text-mic leading-[18px] font-semibold " +
          pastila
        }
      >
        {eticheta}
      </span>
      <h3 className={"mt-5 max-w-[18ch] text-titlu-4 " + titluCard}>{titlu}</h3>
      <p className={"mt-3 text-nota " + corp}>{lead}</p>

      <ul className="m-0 mt-8 list-none p-0">
        {elemente.map((e) => (
          <li key={e.titlu} className={"border-t py-6 first:pt-0 " + separator}>
            <h4 className={"text-corp font-semibold " + numeElement}>{e.titlu}</h4>
            <p className={"mt-2 text-nota " + corp}>{e.text}</p>

            {/* Cele doua directii raman o lista de definitii, nu doua paragrafe: sunt
                perechi termen-explicatie, si asa se anunta si intr-un cititor de ecran. */}
            <dl className="m-0 mt-4">
              <dt className={"m-0 text-nota font-semibold " + etichetaCreste}>Crește când</dt>
              <dd className={"m-0 mt-1 text-nota " + corp}>{e.creste}</dd>
              <dt className={"m-0 mt-3 text-nota font-semibold " + etichetaScade}>
                Scade când
              </dt>
              <dd className={"m-0 mt-1 text-nota " + corp}>{e.scade}</dd>
            </dl>
          </li>
        ))}
      </ul>
    </li>
  );
}
