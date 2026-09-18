
export type Legatura = { href: string; text: string };

export type ImagineTigla = {
  nume: string;
  alt: string;
};

export type TiglaMare = {
  
  cheie: string;
  titlu: string;
  subtitlu: string;
  actiune: Legatura;
  secundar: Legatura;
  imagine: ImagineTigla;
  fundal: "alb" | "ceata" | "negru";
};

export type TiglaMica = {
  cheie?: string;
  titlu: string;
  subtitlu: string;
  
  nota: string;
  actiune: Legatura;
  secundar?: Legatura;
  imagine?: ImagineTigla;
  fundal: "alb" | "ceata" | "negru";
};
const DISCUTIE: Legatura = { href: "/contact", text: "Discuție de 30 de minute" };

export const TIGLE: TiglaMare[] = [
  {
    cheie: "scan",
    titlu: "Documentele devin accesibile.",
    subtitlu: "Digitalizați documentele de care aveți nevoie des. Păstrați originalele și lucrați cu o copie pe care o puteți căuta.",
    actiune: DISCUTIE,
    secundar: { href: "/cum-functioneaza", text: "Cum funcționează" },
    imagine: {
      nume: "maini",
      alt: "Mâini care așază documente de hârtie lângă un scaner, fotografie ilustrativă",
    },
    fundal: "alb",
  },
  {
    cheie: "store",
    titlu: "Un loc pentru fiecare document.",
    subtitlu: "Fiecare cutie are o cotă. Depozitul este la Golești, județul Argeș, și poate fi vizitat.",
    actiune: DISCUTIE,
    secundar: { href: "/arhivare-fizica", text: "Arhivare fizică" },
    imagine: {
      nume: "rafturi",
      alt: "Rafturi de arhivă cu rânduri de cutii de carton într-un culoar luminos, fotografie ilustrativă",
    },
    fundal: "ceata",
  },
  {
    cheie: "solve",
    titlu: "De la întrebare la document.",
    subtitlu: "Întrebați în română. Fraza se deschide la documentul și pagina din care a fost scoasă.",
    actiune: DISCUTIE,
    secundar: { href: "/instrumente/termene-de-pastrare", text: "Termene de păstrare" },
    imagine: {
      nume: "sertare",
      alt: "Sertar de arhivă deschis cu documente și mânere metalice, fotografie ilustrativă",
    },
    fundal: "negru",
  },
];

export const GRILA: TiglaMica[] = [
  {
    cheie: "domenii",
    titlu: "Servicii adaptate documentelor dumneavoastră.",
    subtitlu: "Un notar caută altceva decât o primărie.",
    nota: "Fiecare domeniu are pagina lui, cu termenele și actele care i se aplică.",
    actiune: { href: "/solutii", text: "Toate domeniile" },
    imagine: {
      nume: "legatura",
      alt: "Dosare și volume legate în material textil, așezate vertical pe un birou, fotografie ilustrativă",
    },
    fundal: "alb",
  },
  {
    titlu: "Un parcurs clar pentru documente.",
    subtitlu: "Preluarea, depozitarea și căutarea sunt lucruri diferite.",
    nota: "Se pot lua separat. Preluarea se face cu proces-verbal și cu măsurarea metrilor liniari.",
    actiune: { href: "/cum-functioneaza", text: "Vedeți mecanismul" },
    imagine: {
      nume: "cutii",
      alt: "Cutii închise de carton kraft pe o masă deschisă la culoare, fotografie ilustrativă",
    },
    fundal: "ceata",
  },
  {
    titlu: "Accesul lasă o urmă.",
    subtitlu: "Acces pe persoană, cu urmă scrisă a fiecărei scoateri.",
    nota: "Pagina de securitate scrie și ce nu deținem, nu doar ce facem.",
    actiune: { href: "/securitate", text: "Ce protejăm" },
    imagine: {
      nume: "dulapuri",
      alt: "Dulapuri metalice deschise la culoare, cu ușile închise, fotografie ilustrativă",
    },
    fundal: "negru",
  },
  {
    titlu: "Costuri pornind de la volumul real.",
    subtitlu: "Costul pornește de la metrii liniari măsurați la preluare.",
    nota: "Factorii sunt scriși unul câte unul, cu ce îi mărește și ce îi micșorează.",
    actiune: { href: "/investitia", text: "Cum se calculează" },
    imagine: {
      nume: "dosare",
      alt: "Dosare de carton crem și violet așezate în teanc pe un birou, fotografie ilustrativă",
    },
    fundal: "alb",
  },
  {
    titlu: "3S vine din ADRIA.",
    subtitlu: "Firma-mamă arhivează documente din 2019, la Golești.",
    nota: "Ce ține de ADRIA scrie ADRIA. Firma 3S nu este încă înregistrată.",
    actiune: { href: "/despre", text: "Despre noi" },
    fundal: "ceata",
  },
  {
    cheie: "discutie",
    titlu: "Treizeci de minute.",
    subtitlu: "Ne uităm la câți metri liniari aveți și la ce se cere des.",
    nota: "Plecați cu o estimare de volum și un calendar de preluare, scrise. Fără ofertă a doua zi.",
    actiune: DISCUTIE,
    fundal: "alb",
  },
];

export const INCREDERE = {
  eticheta: "Ce se poate verifica",
  titlu: "Încrederea începe cu lucruri verificabile.",
  elemente: [
    {
      titlu: "Depozit care se poate vedea",
      text: "Depozitul este la Golești, lângă Pitești, și poate fi vizitat înainte de semnare.",
    },
    {
      titlu: "Preluare cu proces-verbal",
      text: "Preluarea se face cu proces-verbal de predare-primire, cu măsurarea metrilor liniari și sigilarea cutiilor.",
    },
    {
      titlu: "Nomenclator pregătit",
      text: "Nomenclatorul arhivistic se întocmește și se pregătește pentru avizare la Arhivele Naționale.",
    },
    {
      titlu: "Originalul rămâne al dumneavoastră",
      text: "Originalul se aduce pe hârtie atunci când este cerut. Contract în limba română, sub lege română.",
    },
  ],
};
export const NOTE = [
  {
    id: "nota-1",
    text: "Faptele de mai sus sunt ale ADRIA Servicii Arhivare SRL, firma-mamă, și se verifică în contractul de prestări servicii și în procesul-verbal de preluare.",
  },
  {
    id: "nota-2",
    text: "Nu deținem certificare ISO 27001. Ce nu deținem este scris pe pagina de securitate, nu ocolit.",
  },
];

export const HOME = {
  eticheta: "Scan · Store · Solve",
  titlu: "Documentele în ordine.",
  continuare: "Răspunsurile la îndemână.",
  lead: "Arhivare fizică, digitalizare și căutare în documente. De la cutia de pe raft la pagina de care aveți nevoie.",
  actiune: "Discuție de 30 de minute",
  secundar: "Descoperiți cum funcționează",
  repere: ["Arhivare fizică prin ADRIA", "Căutare în limba română", "Răspunsuri cu sursa la vedere"],
  serviciiEticheta: "O arhivă, trei servicii",
  serviciiTitlu: "Alegeți de unde începeți.",
  serviciiText: "Documentele fizice și cele digitale pot lucra împreună.",
  solveText: "Verificați informația în documentul original. Sursa rămâne lângă răspuns, ca să puteți vedea exact de unde provine.",
  solveActiune: "Vedeți cum se caută",
  domeniiEticheta: "Pentru munca dumneavoastră",
  domeniiTitlu: "Documente diferite. Aceeași nevoie de claritate.",
  domeniiText: "Găsiți serviciile potrivite domeniului în care lucrați.",
  toateDomeniile: "Toate domeniile",
  despreActiune: "Cunoașteți echipa din spate",
  finalEticheta: "Următorul pas",
  finalTitlu: "Să pornim de la arhiva dumneavoastră.",
  finalText: "Discutăm despre documentele pe care le aveți, ce căutați frecvent și de unde are sens să începeți. Rezervăm o jumătate de oră pentru întrebările dumneavoastră.",
};
export const DEMO = {
  titlu: "Întrebați arhiva",
  nota: "Exemplu ilustrativ",
  alegere: "Alegeți un exemplu de document",
  exemple: [
    {nume:"Contract",intrebare:"Când expiră contractul de închiriere?",raspuns:"În acest exemplu, contractul se încheie la 31 decembrie. Data este menționată în clauza privind durata închirierii.",sursa:"Contract de închiriere · exemplu",pagina:"Pagina 2 · Durata contractului"},
    {nume:"Factură",intrebare:"Care este termenul de plată?",raspuns:"Factura din acest exemplu prevede plata în 30 de zile de la emitere. Condiția apare în secțiunea de plată a documentului.",sursa:"Factură · exemplu",pagina:"Pagina 1 · Condiții de plată"},
    {nume:"Proces-verbal",intrebare:"Ce documente au fost predate?",raspuns:"Procesul-verbal din acest exemplu enumeră dosarele predate și persoanele care au semnat. Lista poate fi verificată în anexa documentului.",sursa:"Proces-verbal de predare · exemplu",pagina:"Pagina 3 · Lista documentelor"},
  ],
};
