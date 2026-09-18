// O etapa a mecanismului, ca CARD in rama unui capitol: eticheta etapei, afirmatia ei,
// paragraful, si dedesubt hartia care ramane dupa pas.
//
// CE S-A SCHIMBAT LA VALUL S2-b. Numarul statea intr-o pastila de `ceata` pe un card care, in
// rama de capitol, e chiar el pe ceata: pastila disparea. Acum e o eticheta de 14 px la
// greutatea 600, ca orice alta eticheta din felie. DIRECTIA.md, la „Ce nu se face", refuza
// numerele mari de ornament; cifra de aici e indexul pasului, si arata ca atare.
//
// Cardul e alb pe rama de `ceata`, cu raza 28 si fara umbra - separarea se face prin culoarea
// de fundal. Titlul e pe treapta cardului (20 / 29, greutatea 600), corpul la 17 / 25.
//
// „Ramane scris" se desparte de restul printr-un fir de 1 px, nu printr-o a doua cutie: e a
// doua jumatate a aceleiasi etape, nu o nota alaturata.

type Props = {
  numar: number;
  titlu: string;
  text: string;
  urma: string;
  /** Eticheta indexului si a hartiei, citite din continut de pagina care cheama cardul. */
  etichetaEtapa: string;
  etichetaUrma: string;
};

export default function MecanismEtapa({
  numar,
  titlu,
  text,
  urma,
  etichetaEtapa,
  etichetaUrma,
}: Props) {
  return (
    <li className="flex h-full list-none flex-col rounded-card bg-alb p-8">
      <span className="mb-4 block text-nota font-semibold text-cerneala-3">
        {etichetaEtapa} {numar}
      </span>

      <h3 className="max-w-[22ch] text-titlu-card text-cerneala">{titlu}</h3>
      <p className="mt-3 grow text-corp text-cerneala-3">{text}</p>

      <div className="mt-6 border-t pt-5">
        <span className="mb-1.5 block text-nota font-semibold text-cerneala">{etichetaUrma}</span>
        <p className="text-nota text-cerneala-3">{urma}</p>
      </div>
    </li>
  );
}
