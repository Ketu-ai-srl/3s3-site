// Manifestul rutelor: singurul loc din care se afla ce pagini exista pe site.
//
// CINE IL CITESTE: meniul din `src/components/Navigatie.tsx`, subsolul din
// `src/components/Subsol.tsx` si harta de site din `src/app/sitemap.ts`. Nicio alta
// lista de pagini nu se scrie de mana nicaieri. Daca ar exista a doua, cele doua ar
// diverge exact in ziua in care cineva face lucrul corect si adauga o pagina.
//
// CUM SE ADAUGA O PAGINA (asta e tot ce e de facut):
//   1. se creeaza `src/app/<segment>/page.tsx`, cu `export const metadata` proprie,
//      care contine si `alternates: { canonical: "/<segment>" }`;
//   2. se adauga o intrare in `RUTE`, in pozitia in care trebuie sa apara in meniu.
// Meniul, subsolul si `sitemap.xml` o preiau singure, fara alta modificare.
//
// REGULA DURA: aici intra NUMAI rute care exista deja in `src/app`. Meniul si subsolul
// stau in layout, deci apar pe fiecare pagina: o intrare scrisa inainte de pagina nu
// produce o legatura moarta intr-un loc, ci in toate. Poarta de legaturi din
// `tests/browser/legaturi-imagini.spec.ts` o prinde si opreste lotul, pe drept.

/** Adresa publica a site-ului. Din ea se compun canonical-urile, harta de site si robots. */
export const ADRESA_BAZA = "https://3s2.ke2.in";

export type Ruta = {
  /** Calea absoluta, exact cum apare in bara de adrese. Fara bara la final, in afara de "/". */
  cale: string;
  /** Titlul scurt, pentru bara de sus si pentru subsol. Nu titlul din `metadata`. */
  scurt: string;
  /** O propozitie despre ce gaseste omul acolo. Se foloseste ca `title` pe legatura. */
  descriere: string;
  /** Apare ca element separat in bara de sus? */
  inMeniu: boolean;
  /** Intra in `sitemap.xml`? Se pune pe `false` doar pentru pagini care nu se indexeaza. */
  inHarta: boolean;
};

export const RUTE: Ruta[] = [
  {
    cale: "/",
    scurt: "Acasă",
    descriere:
      "Arhivare fizică, digitalizare și căutare care citează pagina din care vine răspunsul.",
    // Pagina de start NU se repeta ca element de meniu: sigla din stanga duce deja acolo,
    // pe fiecare pagina. Un al doilea drum catre acelasi loc ocupa un rand in bara de sus
    // fara sa adauge nimic. In subsol apare, fiindca acolo lista e un cuprins, nu o bara.
    inMeniu: false,
    inHarta: true,
  },
  {
    cale: "/solutii",
    scurt: "Domenii",
    descriere:
      "Ce facem pentru fiecare domeniu: notari, primării, contabilitate, avocatură, construcții, logistică.",
    inMeniu: true,
    inHarta: true,
  },
  // ANCORE DE FELIE. Fiecare felie de pagini isi scrie intrarile NUMAI sub marcajul ei si
  // nu atinge celelalte marcaje. Motivul e mecanic, nu organizatoric: `rute.ts` e singurul
  // fisier pe care mai multe felii trebuie sa il modifice deodata, iar imbinarea in trei
  // puncte reuseste doar daca hunk-urile au randuri de context intre ele. Marcajele sunt
  // acele randuri. Fara ele, doua felii care adauga cate o pagina se ciocnesc de fiecare data.
  //
  // Ordinea marcajelor = ordinea din bara de sus. Se muta doar de dispecer.

  // Cele doua pagini de mai jos stau pe `inMeniu: false`, ca toate cele adaugate dupa
  // masuratoarea de derapaj de la 390 px: bara de sus e la capacitate cu o intrare de
  // pagina plus butonul, iar bara sta in layout, deci un rand in plus sparge fiecare
  // pagina a site-ului deodata, nu doar pe ale feliei. Locul lor firesc e oricum
  // subsolul, care listeaza toate rutele: o declaratie de accesibilitate si o pagina de
  // securitate se cauta acolo sau direct din adresa, nu in navigatia principala. In
  // harta de site intra amandoua - sunt pagini publice, cerute pe nume in dosarele de
  // achizitie.
  {
    cale: "/securitate",
    scurt: "Securitate",
    descriere:
      "Lanțul întreg: depozitul și accesul în el, transportul, cine vede ce document, ieșirea din contract și eliminarea cu aviz.",
    inMeniu: false,
    inHarta: true,
  },
  {
    cale: "/accesibilitate",
    scurt: "Accesibilitate",
    descriere:
      "Ce se măsoară automat la fiecare publicare, ce nu a fost măsurat niciodată și cum ne semnalați o problemă.",
    inMeniu: false,
    inHarta: true,
  },

  // <<felie:mecanism>>
  //
  // De ce cele doua pagini de mai jos NU urca in bara de sus, cu cifre, nu cu impresii.
  // Le-am pus intai cu `inMeniu: true` si am rulat poarta de derapaj: la 390 px,
  // scrollWidth 529 peste innerWidth 390, si nu pe paginile mele, ci pe TOATE CINCI -
  // `/`, `/solutii`, `/solutii/notari` incluse. Bara sta in layout, deci doua randuri in
  // plus in meniu sparg fiecare pagina a site-ului deodata; masurat pe 2026-09-05, lot
  // felie/9. Cu `inMeniu: false` derapajul dispare pe toate cinci.
  //
  // Deci intrarea in pagini se face din corpul paginilor (butonul secundar de pe fisele
  // de domeniu, legaturile incrucisate dintre cele doua) si din subsol, unde lista de
  // rute e un cuprins si are loc sa creasca. Se muta in bara de sus in ziua in care
  // `Navigatie` primeste un meniu pliabil sub 768 px - atunci se remasoara, nu inainte.
  {
    cale: "/cum-functioneaza",
    scurt: "Cum funcționează",
    descriere:
      "Mecanismul cap la cap: preluare, inventar, digitalizare, căutare cu sursa citată, retur, ieșire.",
    inMeniu: true,
    inHarta: true,
  },
  {
    cale: "/arhivare-fizica",
    scurt: "Arhivare fizică",
    descriere:
      "Depozitul, condițiile de păstrare, preluarea cu proces-verbal, cotele și selecționarea cu aviz.",
    inMeniu: true,
    inHarta: true,
  },

  // Lotul trei de segmente: constructii, logistica, imobiliare. `inMeniu: false` din acelasi
  // motiv masurat mai sus, la lotul de mecanism: bara de sus sta in layout si depaseste 390 px
  // cu doua intrari in plus, pe TOATE paginile deodata, nu doar pe cele noi. Intrarea in domenii
  // se face prin hub-ul `/solutii`, care listeaza singur orice segment cu pagina proprie, si din
  // subsol, unde lista de rute e un cuprins si are loc sa creasca. In harta de site intra toate
  // trei: fiecare e o pagina de sine statatoare, cu titlu, descriere si canonical proprii.
  {
    cale: "/solutii/constructii",
    scurt: "Firme de construcții",
    descriere:
      "Dosarul de șantier inventariat pe obiectiv, cartea tehnică predată și exemplarul digital care rămâne firmei.",
    inMeniu: false,
    inHarta: true,
  },
  {
    cale: "/solutii/logistica",
    scurt: "Transport și logistică",
    descriere:
      "Scrisori de trăsură și avize regăsite după cursă, client și lună, pe fonduri separate pe exercițiu financiar.",
    inMeniu: false,
    inHarta: true,
  },
  {
    cale: "/solutii/imobiliare",
    scurt: "Agenții imobiliare",
    descriere:
      "Dosare de tranzacție căutate după adresă, cu acces nominal și jurnal peste datele personale din ele.",
    inMeniu: false,
    inHarta: true,
  },

  // <<felie:segmente>>
  // Lotul doi de segmente. Nu urca in bara de sus, din acelasi motiv scris la notari:
  // intrarea in domenii se face prin hub. In harta de site intra toate trei, fiindca
  // fiecare e o pagina de sine statatoare, cu titlu, descriere si canonical proprii.
  {
    cale: "/solutii/primarii",
    scurt: "Primării și instituții publice",
    descriere:
      "Fond moștenit peste mandate, categorii cu termen permanent și cereri care se rezolvă la ghișeu.",
    inMeniu: false,
    inHarta: true,
  },
  {
    cale: "/solutii/contabilitate",
    scurt: "Birouri de contabilitate",
    descriere:
      "Fond separat pe firmă și pe exercițiu financiar, cu statele de salarii ținute deoparte de la preluare.",
    inMeniu: false,
    inHarta: true,
  },
  {
    cale: "/solutii/avocatura",
    scurt: "Case de avocatură",
    descriere:
      "Dosare inventariate, acces nominal pe dosar cu jurnal și un rând de termen lăsat gol, dinadins.",
    inMeniu: false,
    inHarta: true,
  },

  // <<felie:instrumente-harta>>
  // Pagina de instrument si harta de site. Amandoua cu `inMeniu: false`: asezarea in bara
  // de sus e decizie de dispecer, la reconcilierea lotului, si se ia dupa ce se vede cate
  // pagini intra deodata. Pana atunci nu sunt orfane - subsolul listeaza TOATE rutele din
  // `RUTE`, pe fiecare pagina, iar harta de site le arata pe amandoua langa restul.
  //
  // Ordinea: intai instrumentul, care e continut de citit, apoi harta, care e un cuprins
  // al restului.
  {
    cale: "/instrumente/termene-de-pastrare",
    scurt: "Termene de păstrare",
    descriere:
      "Cât se păstrează fiecare categorie de documente, cu actul normativ și articolul pe rândul lui.",
    inMeniu: true,
    inHarta: true,
  },
  {
    cale: "/harta-site",
    scurt: "Harta site-ului",
    descriere:
      "Toate paginile publice, grupate pe prezentare, domenii, instrumente și documente juridice.",
    inMeniu: false,
    inHarta: true,
  },

  // <<felie:despre-contact>>
  //
  // DE CE AMANDOUA CU `inMeniu: false`, desi sunt pagini de sine statatoare. Nu e o
  // preferinta editoriala, e o masuratoare. Cu ele doua puse in bara de sus, poarta de
  // derapaj de la 390 px s-a inrosit pe TOATE cele cinci pagini deodata, cu aceeasi
  // cifra: scrollWidth 487 px la innerWidth 390 (devicePixelRatio 1), iar elementul care
  // depaseste e `nav.ml-auto` din `Navigatie.tsx`, impreuna cu butonul de discutie.
  // Bara de sus e la capacitate cu O SINGURA intrare de pagina plus butonul: chiar si una
  // singura ar fi lasat-o peste 390 px (487 minus latimea unui element si a unei
  // distante, tot peste prag).
  //
  // Comentariul din `Navigatie.tsx` prevede exact situatia asta si spune ce urmeaza:
  // cand lista creste, se pune acolo un meniu pliabil. Fisierul ala nu e al feliei de
  // fata, deci intrarile stau pe `false` pana il atinge felia care are voie. Pana atunci
  // paginile nu sunt orfane: subsolul listeaza TOATE rutele din `RUTE`, pe fiecare
  // pagina, iar cele doua se leaga si intre ele, si din antetul fiecareia.
  {
    cale: "/despre",
    scurt: "Despre",
    descriere:
      "Cine este 3S, ce vine de la ADRIA, firma-mamă, și ce nu putem susține încă.",
    inMeniu: false,
    inHarta: true,
  },
  {
    cale: "/contact",
    scurt: "Contact",
    descriere:
      "Pe ce drum ajunge un mesaj la noi și care drumuri nu există încă.",
    inMeniu: true,
    inHarta: true,
  },

  // <<felie:comparatie>>
  // Cele doua pagini de decizie. NU urca in bara de sus, si nu fiindca ar fi secundare:
  // sunt paginile catre care trimit butoanele secundare din corpul site-ului, deci se intra
  // in ele de acolo, nu din meniu. Motivul mecanic e cel deja masurat pe felia 9: bara sta
  // in layout, iar fiecare intrare in plus se plateste pe TOATE paginile deodata. Cine
  // decide ce urca in bara vede bara intreaga, adica dispecerul; o felie singura nu are cum
  // sa masoare efectul cumulat al altor felii care scriu in acelasi timp.
  // In harta de site intra amandoua: sunt pagini publice, cu titlu, descriere si canonical
  // proprii, si raspund exact la intrebarile cu care lumea ajunge din cautare.
  {
    cale: "/comparatie",
    scurt: "Comparație",
    descriere:
      "Dulapul din birou, colegul care se ocupă și de arhivă, depozitarea fără căutare și arhiva administrată. Inclusiv când nu merită.",
    inMeniu: false,
    inHarta: true,
  },
  {
    cale: "/investitia",
    scurt: "Investiția",
    descriere:
      "Ce determină costul arhivării, ce se plătește o dată și ce recurent, și ce iese din discuția de 30 de minute.",
    inMeniu: true,
    inHarta: true,
  },

  // <<felie:juridic>>
  // Cele trei pagini juridice. NU urca in bara de sus: o bara care creste cu termeni,
  // confidentialitate si cookie-uri impinge afara exact paginile pentru care vine lumea.
  // Locul lor e subsolul, care se genereaza tot din lista asta, deci le preia singur.
  // In harta de site intra: sunt pagini publice, indexabile si cautate adesea direct.
  {
    cale: "/termeni",
    scurt: "Termeni și condiții",
    descriere:
      "Cine răspunde de site, ce face el azi și ce nu face, plus datele de identificare cerute de lege.",
    inMeniu: false,
    inHarta: true,
  },
  {
    cale: "/confidentialitate",
    scurt: "Confidențialitate",
    descriere:
      "Ce date primim prin formular, în ce temei le folosim, cât le păstrăm și ce drepturi aveți.",
    inMeniu: false,
    inHarta: true,
  },
  {
    cale: "/cookies",
    scurt: "Ce stocăm în browser",
    descriere:
      "Site-ul nu pune cookie-uri și nu scrie nimic în browser. De ce nu vă cerem acordul și cum verificăm.",
    inMeniu: false,
    inHarta: true,
  },

  {
    cale: "/solutii/notari",
    scurt: "Birouri notariale",
    descriere:
      "Preluare cu proces-verbal și inventar, digitalizare și căutare care citează pagina.",
    // Pagina de segment nu urca in bara de sus: intrarea in domenii se face prin hub,
    // iar o bara care creste cu fiecare segment nou devine ilizibila la al treilea.
    inMeniu: false,
    inHarta: true,
  },
];

export type SectiuneAcasa = {
  /** Identificatorul sectiunii din pagina de start, fara diez. */
  ancora: string;
  /** Titlul scurt, pentru meniu si pentru subsol. */
  scurt: string;
  /** Apare in bara de sus cand esti pe pagina de start? */
  inMeniu: boolean;
};

// Ancorele de mai jos sunt SECTIUNI ale paginii de start, nu rute.
//
// De ce conteaza distinctia: meniul si subsolul apar acum pe fiecare pagina. O ancora
// `#mecanism` afisata in bara de sus pe alta pagina decat `/` nu duce nicaieri, iar
// scrisa ca `/#mecanism` ar arata in meniul global un rand care nu e o pagina.
//
// Solutia aleasa: `Navigatie` cunoaste calea curenta (`usePathname`) si arata ancorele
// NUMAI cand esti pe `/`. Cealalta varianta - un sub-meniu randat de pagina de start -
// ar fi insemnat doua bare suprapuse, una lipita si una nu, adica doua limbaje vizuale
// pentru acelasi gest. In subsol ancorele apar pe orice pagina, dar scrise `/#ancora`,
// fiindca acolo sunt un cuprins al paginii de start, nu navigatia paginii curente.
export const SECTIUNI_ACASA: SectiuneAcasa[] = [
  // Niciuna nu urca in bara: cand au stat acolo langa pagini, bara arata "Cum functioneaza"
  // de doua ori si "Domenii" de doua ori. Raman pentru subsol, unde sunt cuprins.
  { ancora: "scan", scurt: "Scan", inMeniu: false },
  { ancora: "store", scurt: "Store", inMeniu: false },
  { ancora: "solve", scurt: "Solve", inMeniu: false },
  { ancora: "domenii", scurt: "Domenii", inMeniu: false },
  { ancora: "discutie", scurt: "Discuție", inMeniu: false },
];

/**
 * Unde duce butonul principal, de pe orice pagina. Regula de proiect: butonul principal
 * duce mereu la discutia de treizeci de minute. Se scrie cu calea in fata, nu doar
 * `#discutie`, ca sa functioneze si de pe o pagina care nu are sectiunea aceea.
 */
export const CALE_DISCUTIE = "/contact";

/** Rutele care apar ca element separat in bara de sus. */
export function rutePentruMeniu(): Ruta[] {
  return RUTE.filter((r) => r.inMeniu);
}

/** Rutele care intra in `sitemap.xml`. */
export function rutePentruHarta(): Ruta[] {
  return RUTE.filter((r) => r.inHarta);
}

/**
 * Indexarea e permisa DOAR in productie, si implicitul e neindexarea.
 *
 * Scris asa, nu invers, deliberat: o variabila de mediu uitata trebuie sa lase site-ul
 * in afara indexului, nu in el. Un mediu de proba indexat concureaza cu productia pe
 * aceleasi cuvinte si motorul alege singur care adresa castiga.
 *
 * Se citeste la construire, deci un `SITE_ENV` schimbat dupa build nu are efect pana la
 * urmatorul build. Plasa de siguranta la rulare e antetul `X-Robots-Tag: noindex` pus de
 * `src/middleware.ts`. Functia se cheama numai din cod de server (`layout.tsx`,
 * `robots.ts`); in pachetul de browser `process.env.SITE_ENV` nu exista.
 */
export function indexareaEstePermisa(): boolean {
  return process.env.SITE_ENV === "productie";
}
