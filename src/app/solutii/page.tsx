import type {Metadata} from "next";
import Link from "next/link";
import {CTA,Eyebrow,PageIntro,SectorLinks} from "@/components/Elements";
import Icon from "@/components/Icon";

export const metadata:Metadata={"title": "Soluții de arhivare pentru domeniul dumneavoastră", "description": "Modele de organizare pentru construcții, logistică, contabilitate, imobiliare, instituții publice, avocatură și notariat.", "alternates": {"canonical": "/solutii"}};
export default function Page(){return <main>
<PageIntro eyebrow="Domenii" title="Documente diferite. O organizare pe măsură." intro="Alegeți domeniul și vedeți cum poate arăta un inventar util, ce trebuie clarificat și de unde începe evaluarea."/>
<section className="container sector-hub"><SectorLinks/></section><section className="container section split-info"><div><Eyebrow>Punctul comun</Eyebrow><h2>Regăsirea începe<br/>cu un reper bun.</h2></div><div><p>Numărul actului, codul cursei, anul financiar sau proiectul: acestea sunt cheile după care oamenii caută. Structura arhivei trebuie să le păstreze.</p><p>Exemplele din paginile de domeniu sunt fictive. Proiectul dumneavoastră se definește după documentele, accesul și obligațiile reale.</p><Link className="text-link" href="/cum-functioneaza">Cum pregătim proiectul<Icon/></Link></div></section><CTA title="Domeniul dumneavoastră nu este în listă?" text="Descrieți documentele și modul în care le folosiți. Putem porni evaluarea de la fluxul de lucru."/>
</main>;}
