"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect,useRef} from "react";
import {rutePentruMeniu} from "@/content/rute";
import Icon from "./Icon";
import {keepDialogFocus} from "./dialogFocus";
export function Logo(){return <><span className="wordmark">3S<span className="logo-dot"/></span><span className="brand-line">Scan. Store. Solve.</span></>;}
export default function SiteHeader(){
 const path=usePathname(); const previousPath=useRef(path); const dialog=useRef<HTMLDialogElement>(null); const trigger=useRef<HTMLButtonElement>(null);
 function close(){dialog.current?.close();trigger.current?.focus();}
 useEffect(()=>{if(previousPath.current===path)return;previousPath.current=path;const d=dialog.current;if(d?.open)d.close();document.body.style.overflow="";},[path]);
 useEffect(()=>{const d=dialog.current;const cleanup=()=>{document.body.style.overflow="";trigger.current?.focus();};d?.addEventListener("close",cleanup);return()=>{d?.removeEventListener("close",cleanup);document.body.style.overflow="";};},[]);
 return <header className="site-header"><div className="container header-inner"><Link href="/" className="brand" aria-label="3S, pagina principală"><Logo/></Link><nav className="desktop-nav" aria-label="Navigație principală">{rutePentruMeniu().map(r=><Link key={r.cale} href={r.cale} aria-current={path===r.cale?"page":undefined}>{r.scurt}</Link>)}</nav><Link className="button header-contact" href="/contact">Să discutăm <Icon/></Link><button className="menu-trigger icon-button" ref={trigger} onClick={()=>{dialog.current?.showModal();document.body.style.overflow="hidden";}} aria-label="Deschideți meniul" aria-haspopup="dialog"><Icon name="menu"/></button></div><dialog onKeyDown={keepDialogFocus} className="mobile-dialog" ref={dialog} aria-label="Meniu principal" onClick={e=>{if(e.target===e.currentTarget)close();}}><div className="mobile-menu"><div className="mobile-menu-top"><span className="wordmark">3S<span className="logo-dot"/></span><button className="icon-button" onClick={close} aria-label="Închideți meniul" autoFocus><Icon name="close"/></button></div><nav aria-label="Navigație mobilă">{rutePentruMeniu().map(r=><Link key={r.cale} href={r.cale} onClick={close} aria-current={path===r.cale?"page":undefined}>{r.scurt}<Icon/></Link>)}<Link href="/contact" onClick={close}>Contact <Icon name="mail"/></Link></nav></div></dialog></header>;
}
