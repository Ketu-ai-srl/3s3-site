// Textele NOI ale paginii de start, cerute de gramatica REF-A: cele trei tigle mari, grila de
// sase tigle, banda neagra a faptelor atribuite si notele de subsol.
//
// CE STA AICI SI CE NU. Aici stau doar textele pe care structura noua le cere si care nu
// existau in continutul de azi. Tot ce exista deja se CITESTE de unde e: numele paginilor din
// `rute.ts`, identitatea firmei din `entitate.ts`, textul domeniilor din `segmente.ts`. Nu se
// copiaza aici, fiindca o copie si originalul diverg la prima editare, iar textul lor se
// rescrie in paralel, in alta felie, sub aceleasi chei.
//
// VOCEA, dupa REF-A: o afirmatie de doua-patru cuvinte cu PUNCT, apoi o propozitie de
// explicatie. Litera obisnuita, fara majuscule de afis, fara ton de reclama, fara liniute
// lungi. Titlul spune ce se intampla, nu cat de buni suntem.
//
// ADEVARUL. Nicio cifra noua si nicio certificare. Faptele din banda neagra sunt afirmatiile
// deja inregistrate in `src/content/afirmatii/pagina-principala.json`, scrise atribuit: ce face
// ADRIA, firma-mama, si ce se intampla la preluare. Ce nu detinem se scrie pe pagina, in notele
// numerotate de la final, nu se ocoleste.
//
// FOTOGRAFIILE. Fiecare cheie a registrului apare EXACT o data pe pagina: `maini`, `rafturi` si
// `sertare` in cele trei tigle mari, `legatura`, `cutii`, `dulapuri` si `dosare` in grila. Nu e
// simetrie de dragul simetriei: pe o pagina in care fotografia e mare cat tigla, acelasi cadru
// aparut de doua ori se citeste ca greseala de montaj.
//
// TEXTUL ALTERNATIV e scris aici, nu citit din `src/content/fotografii.ts`, fiindca pagina de
// start isi tine textele in fisierul asta. Cheile sunt aceleasi, deci cand se schimba setul de
// fotografii se rescriu AMBELE locuri, altfel alt-ul descrie o fotografie care nu mai exista.
// De asta se ocupa `tests/fotografii.test.ts`: cere ca fiecare `alt` de aici sa fie cuvant cu
// cuvant cel din registru.
//
// ANCORA DECUPAJULUI NU SE SCRIE AICI. Pagina o citeste din `FOTOGRAFII`, cu cheia de mai jos.
// O a doua copie a unei cifre masurate ar diverge la prima remasurare, si nimic nu se uita la ea.

export type Legatura = { href: string; text: string };

export type ImagineTigla = {
  nume: string;
  alt: string;
};

export type TiglaMare = {
  /** ancora sectiunii; `rute.ts` o inscrie in `SECTIUNI_ACASA` si subsolul trimite la ea */
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
  /** randul de 14 px de sub subtitlu: precizarea care tine afirmatia in adevar */
  nota: string;
  actiune: Legatura;
  secundar?: Legatura;
  imagine?: ImagineTigla;
  fundal: "alb" | "ceata" | "negru";
};

// Butonul primar e acelasi pe fiecare tigla, si asta e chiar gramatica referintei: fiecare tigla
// e un ecran, fiecare ecran are UN buton primar, si el duce mereu in acelasi loc. Ce se schimba
// de la o tigla la alta e drumul al doilea - pastila cu contur, care duce la fisa.
const DISCUTIE: Legatura = { href: "/contact", text: "Discuție de 30 de minute" };

export const TIGLE: TiglaMare[] = [
  {
    cheie: "scan",
    titlu: "Se digitalizează ce se caută.",
    subtitlu: "Nu tot fondul. Se scanează documentele cerute des, iar originalul rămâne pe raft.",
    actiune: DISCUTIE,
    secundar: { href: "/cum-functioneaza", text: "Cum funcționează" },
    imagine: {
      nume: "maini",
      alt: "Mână care scoate un dosar dintr-un suport de documente din carton, cu file de hârtie ieșind dintre despărțitoare, fotografie ilustrativă",
    },
    fundal: "alb",
  },
  {
    cheie: "store",
    titlu: "Hârtia stă la depozit.",
    subtitlu: "Fiecare cutie are o cotă. Depozitul este la Golești, județul Argeș, și poate fi vizitat.",
    actiune: DISCUTIE,
    secundar: { href: "/arhivare-fizica", text: "Arhivare fizică" },
    imagine: {
      nume: "rafturi",
      alt: "Rafturi metalice înalte de depozit, pe mai multe niveluri, încărcate cu cutii de carton și cu paleți înfoliați, fotografie ilustrativă",
    },
    fundal: "ceata",
  },
  {
    cheie: "solve",
    titlu: "Răspunsul vine cu pagina.",
    subtitlu: "Întrebați în română. Fraza se deschide la documentul și pagina din care a fost scoasă.",
    actiune: DISCUTIE,
    secundar: { href: "/instrumente/termene-de-pastrare", text: "Termene de păstrare" },
    imagine: {
      nume: "sertare",
      alt: "Fronturile mai multor sertare plate suprapuse, cu mânere de sârmă, văzute în prim-plan apropiat și oblic; benzile lor merg de la negru și maro închis la tonuri de nisip, alb, gri și un galben, fotografie ilustrativă",
    },
    fundal: "negru",
  },
];

export const GRILA: TiglaMica[] = [
  {
    cheie: "domenii",
    titlu: "Aceeași arhivă, alte întrebări.",
    subtitlu: "Un notar caută altceva decât o primărie.",
    nota: "Fiecare domeniu are pagina lui, cu termenele și actele care i se aplică.",
    actiune: { href: "/solutii", text: "Toate domeniile" },
    imagine: {
      nume: "legatura",
      alt: "Bibliorafturi negre așezate în evantai pe un birou alb, cu semne colorate între file, alături de o mapă cu fermoar, fotografie ilustrativă",
    },
    fundal: "alb",
  },
  {
    titlu: "Trei pași, în ordine.",
    subtitlu: "Preluarea, depozitarea și căutarea sunt lucruri diferite.",
    nota: "Se pot lua separat. Preluarea se face cu proces-verbal și cu măsurarea metrilor liniari.",
    actiune: { href: "/cum-functioneaza", text: "Vedeți mecanismul" },
    imagine: {
      nume: "cutii",
      alt: "Trei cutii de arhivă din carton kraft, așezate pe un birou alb, cu dosare suspendate prinse în ele; o mână așază unul dintre dosare, fotografie ilustrativă",
    },
    fundal: "ceata",
  },
  {
    titlu: "Intrarea se consemnează.",
    subtitlu: "Acces pe persoană, cu urmă scrisă a fiecărei scoateri.",
    nota: "Pagina de securitate scrie și ce nu deținem, nu doar ce facem.",
    actiune: { href: "/securitate", text: "Ce protejăm" },
    imagine: {
      nume: "dulapuri",
      alt: "Ușa albă a unui dulap de birou, cu cheia lăsată în broască, prim-plan în lumină de zi, fotografie ilustrativă",
    },
    fundal: "negru",
  },
  {
    titlu: "Plătiți volumul real.",
    subtitlu: "Costul pornește de la metrii liniari măsurați la preluare.",
    nota: "Factorii sunt scriși unul câte unul, cu ce îi mărește și ce îi micșorează.",
    actiune: { href: "/investitia", text: "Cum se calculează" },
    imagine: {
      nume: "dosare",
      alt: "Teancuri de dosare vechi de carton, cu filele ieșind dintre coperți, în lumină caldă de prim-plan, fotografie ilustrativă",
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
  titlu: "Faptele stau în acte.",
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

// Notele numerotate de la baza paginii, la 12 px, exact ca in referinta. Sunt locul in care
// pagina isi spune limitele: cine sustine faptele de mai sus si ce nu detinem. Prima nota e
// legata de titlul benzii negre printr-un exponent; a doua sta pe cont propriu, fiindca e
// despre tot ce scrie pe pagina.
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
