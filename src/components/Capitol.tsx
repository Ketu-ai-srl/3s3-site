
type Props = {
  
  id?: string;
  
  eticheta?: string;
  
  afirmatie: React.ReactNode;
  
  text?: React.ReactNode;
  
  aliniere?: "stanga" | "centrat";
  
  children?: React.ReactNode;
};

export default function Capitol({
  id,
  eticheta,
  afirmatie,
  text,
  aliniere = "stanga",
  children,
}: Props) {
  const centrat = aliniere === "centrat";
  const inCutie = centrat ? "mx-auto text-center" : "";

  return (
    <section id={id} className="bg-alb py-16 md:py-[88px] border-b">
      <div className="mx-auto w-full max-w-registru px-4 md:px-8">
        {eticheta ? (
          <span
            className={"mb-3 block text-titlu-4 font-semibold text-albastru-2 md:mb-4 " + inCutie}
          >
            {eticheta}
          </span>
        ) : null}

        
        <h2 className={"max-w-[28ch] text-afirmatie text-cerneala " + inCutie}>{afirmatie}</h2>

        {text ? (
          <p className={"mt-6 max-w-[59ch] text-capitol font-semibold text-cerneala-3 " + inCutie}>
            {text}
          </p>
        ) : null}

        {children ? (
          <div className="mt-12 flex min-h-[320px] w-full overflow-hidden rounded-card bg-ceata md:mt-14 md:min-h-[620px]">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
