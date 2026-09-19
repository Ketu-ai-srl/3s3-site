"use client";
import {useState} from "react";
const OPTIONS=["Organizare internă","Depozitare externă","Arhivă fizică și digitală"];
const ROWS=[
 ["Spațiu","Rămâne la sediul organizației.","Originalele sunt păstrate la operator.","Locul originalelor se stabilește separat de accesul digital."],
 ["Regăsire","Depinde de inventar și de responsabilul intern.","Prin inventar și cerere de consultare.","Prin inventar și câmpuri de căutare agreate."],
 ["Acces la informație","Consultare fizică sau copii făcute la cerere.","Copii sau originale cerute operatorului.","Copii digitale pentru documentele incluse în proiect."],
 ["Efort inițial","Organizare, spațiu și instruire internă.","Inventariere, ambalare și transfer.","Inventariere plus digitalizare și configurare."],
 ["Costuri de urmărit","Spațiu, personal și timp de consultare.","Păstrare, consultări, transport și retur.","Lucrări inițiale, servicii recurente și export."],
 ["Potrivit când","Volumul și cererile pot fi gestionate de echipă.","Prioritatea este eliberarea spațiului.","Documentele sunt consultate frecvent de mai multe persoane."]
];
export default function Comparison(){const [option,setOption]=useState(2);return <div className="comparison"><div className="comparison-selector"><label htmlFor="compare">Varianta de analizat</label><select id="compare" value={option} onChange={e=>setOption(Number(e.target.value))}>{OPTIONS.map((x,i)=><option key={x} value={i}>{x}</option>)}</select></div><div className="comparison-table"><div className="comparison-head"><span>Criteriu</span>{OPTIONS.map((x,i)=><strong className={i===2?"featured":""} key={x}>{x}</strong>)}</div>{ROWS.map(row=><div className="comparison-row" key={row[0]}><h2>{row[0]}</h2>{row.slice(1).map((cell,i)=><p key={i} className={`${i===2?"featured":""} ${i===option?"mobile-selected":""}`}>{cell}</p>)}</div>)}</div><p className="note">Comparație între moduri de organizare. Condițiile fiecărui serviciu se verifică în oferta și contractul furnizorului.</p></div>;}
