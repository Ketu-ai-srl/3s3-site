import type {Metadata} from "next";
import Link from "next/link";
import {PageIntro} from "@/components/Elements";
import Icon from "@/components/Icon";
import {RUTE} from "@/content/rute";
export const metadata:Metadata={"title": "Harta site-ului: toate paginile de prezentare 3S", "description": "Acces direct la serviciile 3S, cele șapte domenii, ghidul de păstrare, evaluarea costurilor și informațiile de contact și confidențialitate.", "alternates": {"canonical": "/harta-site"}};
export default function Page(){return <main>
<PageIntro eyebrow="Orientare" title="Tot ce puteți explora în 3S." intro="Servicii, exemple pe domenii, instrumente și informații despre site, grupate pentru acces direct."/><section className="container sitemap-grid">{[{title:"Prezentare și decizie",test:(p:string)=>!p.startsWith("/solutii/")&&!["/termeni","/confidentialitate","/cookies","/accesibilitate","/harta-site"].includes(p)},{title:"Domenii",test:(p:string)=>p.startsWith("/solutii/")},{title:"Informații despre site",test:(p:string)=>["/termeni","/confidentialitate","/cookies","/accesibilitate"].includes(p)}].map(g=><div key={g.title}><h2>{g.title}</h2>{RUTE.filter(r=>g.test(r.cale)).map(r=><Link key={r.cale} href={r.cale}><span>{r.scurt}</span><Icon size={17}/></Link>)}</div>)}</section>
</main>;}
