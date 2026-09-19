import type { CSSProperties } from "react";
const paths:Record<string,React.ReactNode> = {
 arrow:<><path d="M4 12h15M13 6l6 6-6 6"/></>,
 search:<><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></>,
 file:<><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h6"/></>,
 box:<><path d="m3 7 9-4 9 4v12l-9 3-9-3zM3 7l9 4 9-4M12 11v11M7 5l10 4"/></>,
 scan:<><path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M2 12h20M8 8h8M8 16h8"/></>,
 shield:<><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6"/></>,
 check:<path d="m5 12 4 4L19 6"/>,
 close:<path d="m6 6 12 12M18 6 6 18"/>,
 menu:<path d="M4 7h16M4 12h16M4 17h16"/>,
 plus:<path d="M12 5v14M5 12h14"/>,
 mail:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></>,
 copy:<><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M15 8V3H3v13h5"/></>,
 grid:<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
 clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
 download:<><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></>,
 pin:<><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2"/></>
};
export default function Icon({name="arrow",size=20,style}:{name?:string;size?:number;style?:CSSProperties}) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>{paths[name]??paths.file}</svg>; }
