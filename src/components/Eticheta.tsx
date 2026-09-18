// Eticheta mica de deasupra unui titlu, sau cota unei fise: 12 px la greutatea 600, in
// `cerneala-3`. Fara majuscule si fara tracking larg - REF-A scrie etichetele cu litera
// obisnuita, ca pe orice alt text.
//
// DE CE `cerneala-3` SI NU `cerneala-2`. Cerneala secundara a directiei REF-A e #86868b, adica
// 3,62:1 pe alb si 3,33:1 pe ceata - sub pragul de 4,5:1. Referinta o foloseste doar de la
// 18,66 px in sus si numai la greutatea 600, unde pragul e 3:1. O eticheta de 12 px e chiar
// cazul opus, deci ia `cerneala-3` (5,07:1 pe alb, 4,66:1 pe ceata), care trece pe amandoua
// suprafetele deschise pe care poate ajunge.
//
// `inchis` a ramas in semnatura pentru paginile altor felii care il dau inca.

type Props = {
  children: React.ReactNode;
  inchis?: boolean;
  className?: string;
};

export default function Eticheta({ children, className = "" }: Props) {
  return (
    <span className={`text-mic font-semibold text-cerneala-3 ${className}`}>{children}</span>
  );
}
