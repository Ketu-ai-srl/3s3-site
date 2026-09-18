// RETINTUIT PENTRU REF-V (felia 1, val S1-a). S-a schimbat DOAR paleta si greutatea
// literei, mecanic: gramatica, asezarea si marimile raman cele ale directiei
// anterioare si se rescriu la valul S1-b. Comentariile de mai jos sunt ale acelei
// directii, cu masuratorile ei pe fundal de noapte: se citesc ca istorie, nu ca
// descriere a designului de acum.
import Eticheta from "./Eticheta";

// Blocul care spune ce NU putem sustine. Doua feluri: `declaratie` (ce nu scriem aici) si
// `limite` (ce nu poate face instrumentul). E semnalul de onestitate al paginii, deci are
// voie sa fie vizibil, nu ascuns in subsol - o linie de arama in stanga, pe fundalul cu o
// treapta mai deschis decat pagina.

type Fel = "declaratie" | "limite";

type Props = {
  fel?: Fel;
  eticheta?: string;
  children: React.ReactNode;
  className?: string;
};

export default function BlocDovada({
  fel = "declaratie",
  eticheta,
  children,
  className = "",
}: Props) {
  const stil =
    fel === "declaratie"
      ? "border-l-2 border-albastru bg-alb px-6 py-5"
      : "border bg-ceata px-6 py-5";

  return (
    <div className={`${stil} ${className}`}>
      {/* `arama-clar` pe `noapte-3`: 5,72:1, deci trece si ca text mic. */}
      {eticheta ? (
        <Eticheta className="mb-2 block text-albastru-2!">{eticheta}</Eticheta>
      ) : null}
      <p className="max-w-[70ch] text-[16px] leading-[1.55] text-cerneala-3">{children}</p>
    </div>
  );
}
