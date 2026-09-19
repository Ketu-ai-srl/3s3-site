import type {Metadata} from "next";
import {CTA,PageIntro} from "@/components/Elements";
import Icon from "@/components/Icon";
import RetentionGuide from "@/components/RetentionGuide";
export const metadata:Metadata={"title": "Termene de păstrare: surse și calcul contabil", "description": "Regula de păstrare pentru documente contabile și state de salarii, surse oficiale și calculator orientativ. Verificare: 19 septembrie 2026.", "alternates": {"canonical": "/instrumente/termene-de-pastrare"}};
export default function Page(){return <main>
<PageIntro eyebrow="Ghid de păstrare" title="Un termen corect începe cu încadrarea documentului." intro="Consultați regula verificată și sursa ei. Pentru documentele din alte categorii, termenul trebuie stabilit din nomenclator și din reglementările aplicabile."/>
<div className="container review-date"><Icon name="clock" size={16}/>Surse consultate: Portalul Legislativ · 19 septembrie 2026</div><RetentionGuide/><section className="container section guide-note"><Icon name="shield" size={30}/><div><h2>Termenul de păstrare nu este o decizie de eliminare.</h2><p>Un litigiu, o obligație specială sau valoarea arhivistică pot impune păstrarea în continuare. Legea 16/1996 prevede procedura de selecționare; verificați situația concretă înainte de scoaterea documentelor din evidență.</p><a className="text-link" href="https://legislatie.just.ro/Public/DetaliiDocument/7937" target="_blank" rel="noreferrer">Legea 16/1996, art. 8 și 11 (filă nouă)<Icon/></a></div></section><CTA title="Nu este clar cum se încadrează arhiva?" text="Descrieți categoriile și perioadele acoperite. Nu eliminați documente doar pe baza unui exemplu de calcul." context="Clarificare categorii și termene de păstrare"/>
</main>;}
