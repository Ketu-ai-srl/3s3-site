import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./site.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import DateStructurate from "@/components/DateStructurate";
import {ADRESA_BAZA,indexareaEstePermisa} from "@/content/rute";
const font=Inter({variable:"--font-body",subsets:["latin","latin-ext"],weight:["400","600"],display:"swap"});
export const metadata:Metadata={metadataBase:new URL(ADRESA_BAZA),title:{default:"3S - Scan Store Solve | Documente organizate",template:"%s | 3S"},description:"Descoperiți 3S: arhivare fizică prin ADRIA, digitalizare și o demonstrație de căutare cu documentul sursă. Începeți cu evaluarea arhivei.",robots:indexareaEstePermisa()?{index:true,follow:true}:{index:false,follow:false},openGraph:{type:"website",locale:"ro_RO",siteName:"3S - Scan Store Solve"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ro" className={font.variable}><body><a className="skip-link" href="#zona-continut">Săriți la conținut</a><SiteHeader/><div id="zona-continut" tabIndex={-1}>{children}</div><SiteFooter/><DateStructurate/></body></html>;}
