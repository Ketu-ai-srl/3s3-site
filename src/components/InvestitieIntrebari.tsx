import Acordeon from "./Acordeon";

// SECTIUNEA DE INTREBARI, pe alb, in containerul de 980. REF-A n-are o pagina de intrebari, dar
// are forma: titlu de sectiune la 48 px aliniat la stanga, iar dedesubt liniile subtiri de
// #d2d2d7 pe care le desparte `Acordeon` (componenta INGHETATA, importata asa cum e).
//
// DE CE NU UN CAPITOL. `Capitol` pune copilul intr-o rama de `ceata` cu podea de 620 px. Cinci
// intrebari pliate masoara mult sub atat, deci rama ar fi ramas o cutie goala sub ele - o forma
// care spune „aici lipseste ceva". Intrebarile stau direct pe alb, ca sectiunile juridice.
//
// PLIATE, DAR IN HTML. `Acordeon` foloseste `details` / `summary`, deci raspunsurile sunt in
// pagina servita si pentru cine citeste fara scripturi, si pentru cine indexeaza.
//
// SLOTUL DE SUB ACORDEON e pentru randul de legaturi catre celelalte pagini - locul in care o
// intrebare fara raspuns aici trimite mai departe, nu se termina.

type Props = {
  id?: string;
  eticheta?: string;
  titlu: React.ReactNode;
  lead?: React.ReactNode;
  elemente: { intrebare: string; raspuns: React.ReactNode }[];
  children?: React.ReactNode;
};

export default function InvestitieIntrebari({
  id,
  eticheta,
  titlu,
  lead,
  elemente,
  children,
}: Props) {
  return (
    <section id={id} className="bg-alb py-16 md:py-[110px]">
      <div className="mx-auto w-full max-w-registru px-4 md:px-8">
        {eticheta ? (
          <span className="mb-3 block text-titlu-4 font-semibold text-cerneala md:mb-4">
            {eticheta}
          </span>
        ) : null}
        <h2 className="max-w-[17ch] text-titlu-2 text-cerneala">{titlu}</h2>
        {lead ? (
          <p className="mt-6 max-w-[59ch] text-capitol font-semibold text-cerneala-3">{lead}</p>
        ) : null}

        <div className="mt-12 md:mt-14">
          <Acordeon elemente={elemente} />
        </div>

        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
