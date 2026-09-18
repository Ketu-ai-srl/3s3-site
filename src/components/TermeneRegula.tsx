import Acordeon from "./Acordeon";

// Cele patru reguli de folosire a listei de termene, ca ACORDEON pe linii - forma pe care
// REF-V o da intrebarilor frecvente de la coada unei pagini interioare.
//
// DE CE ACORDEON SI NU PATRU RANDURI DESCHISE. Regulile sunt lucrurile care pot opri o
// eliminare gresita, deci trebuie sa fie GASITE, nu citite din obligatie: patru titluri unul
// sub altul se parcurg din ochi in doua secunde si se deschide cel care raspunde intrebarii
// pe care o are omul. Deschise, erau patru blocuri de cate cincizeci de cuvinte asezate dupa
// opt fise de termen - adica un al doilea perete de text, exact acolo unde atentia e deja
// consumata.
//
// TEXTUL RAMANE IN HTML-UL SERVIT. `Acordeon` se construieste din `details`/`summary`, deci
// si intrebarea, si raspunsul sunt in documentul livrat de server: le citeste si un agent
// care nu executa JavaScript, iar deschiderea merge din tastatura fara sa scriem noi nimic.
// Un acordeon facut din stare React ar fi ascuns trei reguli din patru de cine citeste
// pagina fara scripturi.
//
// COMPONENTA PRIMESTE LISTA, nu o regula, si asta e schimbarea de semnatura: un acordeon e
// un grup, nu un rand. Pagina ii da direct `folosire.reguli` din continut.

export type Regula = { titlu: string; text: string };

export default function TermeneRegula({ reguli }: { reguli: Regula[] }) {
  return (
    <Acordeon
      elemente={reguli.map((r) => ({ intrebare: r.titlu, raspuns: r.text }))}
    />
  );
}
