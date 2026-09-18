import Link from "next/link";

// Banda de incheiere, in gramatica REF-A: o TIGLA pe `ceata`, cu h2 de 48 px centrat, un
// paragraf si O pastila. FARA culoare de brand.
//
// Asta e schimbarea de fond fata de directia anterioara, unde banda era violet plin pe toata
// latimea. Referinta nu are nicaieri o banda colorata: pagina ei e alb, `ceata` si negru, iar
// singura culoare vine din fotografii. O banda violeta pastrata „ca sa se vada chemarea" ar fi
// fost exact felul in care directia veche supravietuieste sub un nume nou.
//
// Numele componentei ramane cel mostenit: il scriu opt pagini pe care felia 1 nu le atinge.
//
// SLOTUL `nota` PRIMESTE O CLASA DE CONTEXT, si e o reparatie masurata. Sapte pagini trimit in
// slotul asta o legatura scrisa `text-alb`, fiindca pana acum banda era violet plin. Pe `ceata`,
// alb da 1,09:1 - adica legatura dispare. Paginile alea sunt ale valului S2-b si nu se ating
// acum, deci contextul isi spune singur culoarea: regula `.nota-banda .text-alb` din
// `globals.css`. Masurat inainte de reparatie: 7 blocuri invizibile pe 7 rute.

type Props = {
  titlu: React.ReactNode;
  text?: React.ReactNode;
  actiune: { href: string; text: string };
  nota?: React.ReactNode;
};

export default function BandaCTA({ titlu, text, actiune, nota }: Props) {
  return (
    <section className="bg-ceata">
      <div className="mx-auto w-full max-w-vitrina px-4 py-24 text-center md:px-8 md:py-28">
        <h2 className="mx-auto max-w-[20ch] text-titlu-2 text-cerneala">{titlu}</h2>
        {text ? (
          <p className="mx-auto mt-4 max-w-[52ch] text-subtitlu text-cerneala-3">{text}</p>
        ) : null}
        <div className="mt-8">
          <Link
            href={actiune.href}
            className="inline-flex items-center justify-center rounded-pastila bg-albastru px-[21px] py-[11px] text-corp leading-[22px] font-semibold text-alb no-underline transition-colors duration-200 hover:bg-albastru-2"
          >
            {actiune.text}
          </Link>
        </div>
        {/* Nota e 12 px, deci `cerneala-3`: pe `ceata` da 4,66:1, iar `cerneala-2` ar da 3,33. */}
        {nota ? (
          <p className="nota-banda mx-auto mt-4 max-w-[46ch] text-mic text-cerneala-3">{nota}</p>
        ) : null}
      </div>
    </section>
  );
}
