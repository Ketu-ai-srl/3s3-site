"use client";
import { useState } from "react";
import { DEMO } from "@/content/start";

export default function DocumentDemo() {
  const [ales,setAles] = useState(0);
  const exemplu = DEMO.exemple[ales];
  return <div className="s4-demo">
    <div className="s4-demo-top"><span className="s4-demo-logo">3S</span><span>{DEMO.titlu}</span><span className="ml-auto">{DEMO.nota}</span></div>
    <div className="s4-demo-body" aria-live="polite" aria-atomic="true">
      <p className="s4-demo-query">{exemplu.intrebare}</p>
      <p className="s4-demo-answer">{exemplu.raspuns}</p>
      <div className="s4-demo-source"><span className="block font-semibold">{exemplu.sursa}</span><span>{exemplu.pagina}</span></div>
    </div>
    <div className="s4-demo-tabs" aria-label={DEMO.alegere}>
      {DEMO.exemple.map((e,i)=><button key={e.nume} type="button" aria-pressed={ales===i} onClick={()=>setAles(i)}>{e.nume}</button>)}
    </div>
  </div>;
}
