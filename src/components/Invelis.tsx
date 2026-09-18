// Coloana de conținut: aceeași lățime și aceleași margini peste tot pe pagină.

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Invelis({ children, className = "" }: Props) {
  return (
    <div className={`mx-auto w-full max-w-registru px-4 sm:px-6 ${className}`}>{children}</div>
  );
}
