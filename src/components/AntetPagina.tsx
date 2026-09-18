import Link from "next/link";
import Buton from "./Buton";
import type { Fotografie } from "@/content/fotografii";
import { ADRESA_BAZA } from "@/content/rute";

export type Veriga = { text: string; href?: string };
type Props = {
  fir: Veriga[]; eticheta: string; titlu: React.ReactNode; lead?: React.ReactNode;
  actiune?: { href: string; text: string }; secundar?: { href: string; text: string };
  adresa: string; imagine?: Fotografie; forma?: "ecran" | "banda";
};

export default function AntetPagina({fir,eticheta,titlu,lead,actiune,secundar,adresa,imagine,forma="ecran"}:Props) {
  const foto = forma === "ecran" && imagine;
  const url = new URL(adresa, ADRESA_BAZA).href;
  const firStructurat = {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:fir.map((v,i)=>({"@type":"ListItem",position:i+1,name:v.text,item:v.href ? new URL(v.href,url).href : url}))};
  return <>
    <section className={"s4-inner-hero " + (!foto ? "s4-inner-band" : "")}>
      <div className="s4-shell">
        <nav aria-label="Fir de navigare" className="s4-breadcrumb">
          {fir.map((v,i)=><span key={i}>{i>0 && <span aria-hidden="true" className="mr-2">/</span>}{v.href ? <Link href={v.href}>{v.text}</Link> : <span aria-current="page">{v.text}</span>}</span>)}
        </nav>
        <div className="s4-inner-grid">
          <div>
            <span className="s4-label">{eticheta}</span>
            <h1 className="text-titlu-1 text-cerneala">{titlu}</h1>
            {lead && <p className="mt-6 text-lead text-cerneala-3">{lead}</p>}
            {actiune && <div className="s4-actions"><Buton href={actiune.href} sageata>{actiune.text}</Buton>{secundar && <Buton href={secundar.href} fel="text" sageata>{secundar.text}</Buton>}</div>}
          </div>
          {foto && <picture><source media="(max-width:767px)" srcSet={"/img/"+foto.nume+"-960.webp"}/><img src={"/img/"+foto.nume+"-1920.webp"} alt={foto.alt} style={{objectPosition:foto.pozitie}} width="1920" height="1280" fetchPriority="high"/></picture>}
        </div>
      </div>
    </section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(firStructurat)}}/>
  </>;
}
