import type { Metadata } from "next";
import Link from "next/link";
import Buton from "@/components/Buton";
import DocumentDemo from "@/components/DocumentDemo";
import { FOTOGRAFII } from "@/content/fotografii";
import { HOME, INCREDERE, NOTE, TIGLE } from "@/content/start";
import { RUTE } from "@/content/rute";

export const metadata: Metadata = { alternates:{canonical:"/"} };

function Semn({index}:{index:number}) {
  return <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true"><rect x="5" y="3" width="18" height="22" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d={index%2 ? "M9 9h10M9 14h10M9 19h5" : "M10 9h8M10 14h8M10 19h8"} stroke="currentColor" strokeWidth="1.5"/></svg>;
}

export default function Acasa() {
  const domenii = RUTE.filter(r=>r.cale.startsWith("/solutii/"));
  return <main id="continut">
    <section className="s4-hero">
      {/* Variantele WebP sunt generate local; srcSet pastreaza decorul fara procesare externa. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="s4-hero-art" src="/art/flux-1536.webp" srcSet="/art/flux-768.webp 768w, /art/flux-1536.webp 1536w" sizes="(max-width:600px) 100vw, 90vw" alt="" aria-hidden="true" width="1536" height="1024" fetchPriority="high"/>
      <div className="s4-shell">
        <div className="s4-hero-inner"><div className="s4-hero-copy">
          <span className="s4-label">{HOME.eticheta}</span>
          <h1>{HOME.titlu} <span className="s4-secondary">{HOME.continuare}</span></h1>
          <p className="s4-hero-lead">{HOME.lead}</p>
          <div className="s4-actions"><Buton href="/contact" sageata>{HOME.actiune}</Buton><Buton href="/cum-functioneaza" fel="text" sageata>{HOME.secundar}</Buton></div>
        </div></div>
        <div className="s4-trust">{HOME.repere.map(t=><span key={t}><i aria-hidden="true"/>{t}</span>)}</div>
      </div>
    </section>

    <section className="s4-section bg-ceata">
      <div className="s4-shell">
        <span className="s4-label">{HOME.serviciiEticheta}</span>
        <h2 className="s4-section-title">{HOME.serviciiTitlu} <span className="s4-secondary">{HOME.serviciiText}</span></h2>
        <div className="s4-products">{TIGLE.slice(0,2).map((t,i)=>{
          const f=FOTOGRAFII[t.imagine.nume as keyof typeof FOTOGRAFII];
          return <article id={t.cheie} className="s4-product" key={t.cheie}>
            <div className="s4-product-copy"><span className="s4-label">{i===0 ? "01 / Scan" : "02 / Store"}</span><h3>{t.titlu}</h3><p>{t.subtitlu}</p><Link href={t.secundar.href} className="s4-text-link">{t.secundar.text}<span aria-hidden="true">→</span></Link></div>
            <picture><source media="(max-width:767px)" srcSet={"/img/"+f.nume+"-960.webp"}/><img src={"/img/"+f.nume+"-1920.webp"} alt={f.alt} className="s4-product-photo" loading="lazy" width="1920" height="1280" style={{objectPosition:f.pozitie}}/></picture>
          </article>;
        })}</div>
      </div>
    </section>

    <section id="solve" className="s4-section s4-dark">
      <div className="s4-shell s4-solve-grid"><div>
        <span className="s4-label">03 / Solve</span>
        <h2 className="s4-section-title mb-6">{TIGLE[2].titlu}</h2>
        <p className="s4-secondary text-lead">{TIGLE[2].subtitlu}</p>
        <p className="s4-secondary mt-5">{HOME.solveText}</p>
        <div className="mt-8"><Buton href="/cum-functioneaza" fel="alb" sageata>{HOME.solveActiune}</Buton></div>
      </div><DocumentDemo/></div>
    </section>

    <section id="domenii" className="s4-section"><div className="s4-shell">
      <span className="s4-label">{HOME.domeniiEticheta}</span>
      <h2 className="s4-section-title">{HOME.domeniiTitlu} <span className="s4-secondary">{HOME.domeniiText}</span></h2>
      <div className="s4-domains">{domenii.map((d,i)=><Link key={d.cale} href={d.cale} className="s4-domain"><Semn index={i}/><span>{d.scurt}<b aria-hidden="true">↗</b></span></Link>)}<Link href="/solutii" className="s4-domain bg-ceata"><Semn index={7}/><span>{HOME.toateDomeniile}<b aria-hidden="true">↗</b></span></Link></div>
    </div></section>

    <section className="s4-section bg-ceata"><div className="s4-shell s4-proof">
      <picture><source media="(max-width:767px)" srcSet="/img/dosare-960.webp"/><img src="/img/dosare-1920.webp" width="1920" height="1280" loading="lazy" alt={FOTOGRAFII.dosare.alt}/></picture>
      <div><span className="s4-label">{INCREDERE.eticheta}</span><h2 className="s4-section-title mb-8">{INCREDERE.titlu}</h2><div className="s4-proof-list">{INCREDERE.elemente.slice(0,3).map(e=><article key={e.titlu}><h3>{e.titlu}</h3><p>{e.text}</p></article>)}</div><Link href="/despre" className="s4-text-link">{HOME.despreActiune}<span aria-hidden="true">→</span></Link></div>
    </div></section>

    <section id="discutie" className="s4-section s4-final"><div className="s4-shell s4-final-inner"><div><span className="s4-label">{HOME.finalEticheta}</span><h2 className="s4-section-title mb-5">{HOME.finalTitlu}</h2><p className="max-w-[54ch] text-corp text-cerneala-3">{HOME.finalText}</p></div><div className="shrink-0"><Buton href="/contact" sageata>{HOME.actiune}</Buton></div></div></section>
    <section className="s4-shell py-10"><ol className="m-0 list-none p-0 space-y-3">{NOTE.map((n,i)=><li key={n.id} id={n.id} className="flex gap-3 text-mic text-cerneala-3"><span>{i+1}.</span><span>{n.text}</span></li>)}</ol></section>
  </main>;
}
