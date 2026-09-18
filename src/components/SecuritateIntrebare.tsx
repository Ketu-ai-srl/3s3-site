import Acordeon from "./Acordeon";
import type { IntrebareDeschisa } from "@/content/securitate";

// Cele sase intrebari fara raspuns scris, ca acordeon: intrebarea in capul randului, iar sub
// ea de ce conteaza si starea ei de azi.
//
// `Acordeon` e componenta partajata si da liniile de #d2d2d7, deci forma vine de acolo. Ce
// adauga fisierul asta e randul de stare: eticheta la 14 px si pastila cu raspunsul de azi.
//
// PASTILA E ALBA, nu de ceata. Acordeonul sta in rama de capitol, care e chiar ceata, si o
// pastila de aceeasi culoare cu fundalul nu se vede - defect masurat pe pagina construita la
// mutarea sectiunilor in capitole.
//
// Continutul, si tacerea din el, raman intocmai: nu inventam un raspuns fiindca sectiunea e
// chiar lista intrebarilor la care nu avem unul.

type Props = {
  intrebari: IntrebareDeschisa[];
  /** eticheta de deasupra pastilei de stare, ca sa se stie ce spune randul de langa ea */
  etichetaStare: string;
};

export default function SecuritateIntrebare({ intrebari, etichetaStare }: Props) {
  return (
    <Acordeon
      elemente={intrebari.map((i) => ({
        intrebare: i.intrebare,
        raspuns: (
          <>
            <p className="m-0">{i.deCeConteaza}</p>
            <p className="m-0 mt-4 flex flex-wrap items-baseline gap-2">
              <span className="text-nota font-semibold text-cerneala">{etichetaStare}</span>
              <span className="rounded-pastila bg-alb px-3 py-1 text-nota font-semibold text-cerneala">
                {i.stare}
              </span>
            </p>
          </>
        ),
      }))}
    />
  );
}
