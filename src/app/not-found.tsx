import Link from "next/link";
import {PageIntro} from "@/components/Elements";
import Icon from "@/components/Icon";
export default function NotFound(){return <main><PageIntro eyebrow="404 / Pagina nu există" title="Pagina nu a fost găsită." intro="Adresa poate fi incompletă sau pagina poate fi mutată. Puteți continua de la pagina principală ori din harta site-ului."><div className="hero-actions"><Link className="button" href="/">Înapoi la început<Icon/></Link><Link className="text-link" href="/harta-site">Harta site-ului<Icon/></Link></div></PageIntro></main>;}
