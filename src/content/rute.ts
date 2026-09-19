export const ADRESA_BAZA = "https://3s3.ke2.in";
export type Ruta = { cale:string; scurt:string; descriere:string; inMeniu:boolean; inHarta:boolean };
export const RUTE: Ruta[] = [
  {
    cale: "/",
    scurt: "Acasă",
    descriere: "Arhivare fizică, digitalizare și demonstrație de căutare în documente.",
    inMeniu: false,
    inHarta: true
  },
  {
    cale: "/cum-functioneaza",
    scurt: "Servicii",
    descriere: "De la evaluarea arhivei la inventar, scanare și consultare.",
    inMeniu: true,
    inHarta: true
  },
  {
    cale: "/solutii",
    scurt: "Domenii",
    descriere: "Organizarea documentelor pentru șapte domenii de activitate.",
    inMeniu: true,
    inHarta: true
  },
  {
    cale: "/arhivare-fizica",
    scurt: "Arhivare fizică",
    descriere: "Preluare, inventariere, păstrare și consultare prin ADRIA.",
    inMeniu: false,
    inHarta: true
  },
  {
    cale: "/instrumente/termene-de-pastrare",
    scurt: "Ghid de păstrare",
    descriere: "Termene verificate, surse oficiale și calcul contabil orientativ.",
    inMeniu: true,
    inHarta: true
  },
  {
    cale: "/investitia",
    scurt: "Costuri",
    descriere: "Ce influențează oferta și cum pregătiți o cerere de evaluare.",
    inMeniu: true,
    inHarta: true
  },
  {
    cale: "/despre",
    scurt: "Despre 3S",
    descriere: "Proiectul 3S și activitatea de arhivare a ADRIA.",
    inMeniu: true,
    inHarta: true
  },
  {
    cale: "/contact",
    scurt: "Contact",
    descriere: "Pregătiți un e-mail către ADRIA pentru proiectul 3S.",
    inMeniu: false,
    inHarta: true
  },
  {
    cale: "/comparatie",
    scurt: "Comparație",
    descriere: "Cum comparați organizarea internă, depozitarea și digitalizarea.",
    inMeniu: false,
    inHarta: true
  },
  {
    cale: "/securitate",
    scurt: "Securitate",
    descriere: "Condițiile de acces, prelucrare și ieșire dintr-un proiect.",
    inMeniu: false,
    inHarta: true
  },
  {
    cale: "/accesibilitate",
    scurt: "Accesibilitate",
    descriere: "Navigarea cu tastatura, citirea și semnalarea problemelor.",
    inMeniu: false,
    inHarta: true
  },
  {
    cale: "/termeni",
    scurt: "Termeni",
    descriere: "Condițiile de utilizare a acestei prezentări 3S.",
    inMeniu: false,
    inHarta: true
  },
  {
    cale: "/confidentialitate",
    scurt: "Confidențialitate",
    descriere: "Datele de navigare și corespondența prin e-mail.",
    inMeniu: false,
    inHarta: true
  },
  {
    cale: "/cookies",
    scurt: "Cookie-uri",
    descriere: "Stocarea locală și resursele folosite de site.",
    inMeniu: false,
    inHarta: true
  },
  {
    cale: "/harta-site",
    scurt: "Harta site-ului",
    descriere: "Toate paginile prezentării 3S.",
    inMeniu: false,
    inHarta: true
  },
  {
    cale: "/solutii/constructii",
    scurt: "Construcții",
    descriere: "Dosare de șantier, revizii și predarea documentelor.",
    inMeniu: false,
    inHarta: true
  },
  {
    cale: "/solutii/logistica",
    scurt: "Transport și logistică",
    descriere: "Documente legate de cursă, client și livrare.",
    inMeniu: false,
    inHarta: true
  },
  {
    cale: "/solutii/imobiliare",
    scurt: "Imobiliare",
    descriere: "Dosare organizate după proprietate și tranzacție.",
    inMeniu: false,
    inHarta: true
  },
  {
    cale: "/solutii/primarii",
    scurt: "Instituții publice",
    descriere: "Fonduri, compartimente, inventare și continuitate.",
    inMeniu: false,
    inHarta: true
  },
  {
    cale: "/solutii/contabilitate",
    scurt: "Contabilitate",
    descriere: "Fonduri distincte pe firmă și exercițiu financiar.",
    inMeniu: false,
    inHarta: true
  },
  {
    cale: "/solutii/avocatura",
    scurt: "Avocatură",
    descriere: "Dosare de cauză, confidențialitate și acces justificat.",
    inMeniu: false,
    inHarta: true
  },
  {
    cale: "/solutii/notari",
    scurt: "Notariat",
    descriere: "Acte regăsite după registru, an și număr.",
    inMeniu: false,
    inHarta: true
  }
];
export const CALE_DISCUTIE = "/contact";
export const SECTIUNI_ACASA = [
 {ancora:"servicii",scurt:"Servicii",inMeniu:false},
 {ancora:"demonstratie",scurt:"Demonstrație",inMeniu:false},
 {ancora:"domenii",scurt:"Domenii",inMeniu:false}
];
export function rutePentruMeniu() { return RUTE.filter(r => r.inMeniu); }
export function rutePentruHarta() { return RUTE.filter(r => r.inHarta); }
export function indexareaEstePermisa() { return process.env.SITE_ENV === "productie"; }
