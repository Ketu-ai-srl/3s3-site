import type {Metadata} from "next";
import Link from "next/link";
import {CTA,Eyebrow,PageIntro} from "@/components/Elements";
import Icon from "@/components/Icon";
import Comparison from "@/components/Comparison";
export const metadata:Metadata={"title": "Comparați modurile de organizare a arhivei", "description": "Comparați organizarea internă, depozitarea externă și arhiva fizică plus digitală, după acces, efort, spațiu și costuri de urmărit.", "alternates": {"canonical": "/comparatie"}};
export default function Page(){return <main>
<PageIntro eyebrow="Comparație" title="Alegeți după felul în care folosiți documentele." intro="Uneori este suficient un inventar intern mai bun. Alteori, accesul frecvent sau lipsa spațiului justifică un proiect mai amplu."/><section className="container comparison-section"><Comparison/></section><section className="container section split-info"><div><Eyebrow>Întrebarea de pornire</Eyebrow><h2>Ce vă costă astăzi<br/>o căutare dificilă?</h2></div><div><p>Urmăriți o săptămână: cine cere documente, cât durează regăsirea și de câte ori este nevoie de original. Aceste observații ajută mai mult decât alegerea unei tehnologii înainte de evaluare.</p><Link className="text-link" href="/investitia">Ce trebuie să conțină oferta<Icon/></Link></div></section><CTA context="Compararea variantelor de arhivare"/>
</main>;}
