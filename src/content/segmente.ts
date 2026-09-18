// Datele segmentelor de clienti. Hub-ul /solutii si fiecare pagina de segment se
// genereaza DE AICI, ca urmatorul segment sa se adauge scriind o intrare, nu
// rescriind o pagina. Concret, ca sa adaugi "primarii":
//   1. scrii constanta PRIMARII de tipul PaginaSegment, dupa modelul NOTARI;
//   2. legi `pagina: PRIMARII` in intrarea din SEGMENTE;
//   3. creezi src/app/solutii/primarii/page.tsx, care doar randeaza constanta.
// Hub-ul se actualizeaza singur: listeaza toate intrarile si pune legatura numai
// la cele care au `pagina` nenul, deci nu poate produce o legatura moarta.
//
// REGULA DE CONTINUT, aceeasi ca pe pagina de start: zero cifre pe care nu le
// putem sustine, zero certificari, zero preturi, zero clienti dati ca referinta.
// Ce e obligatie legala se scrie cu ACTUL NUMIT. Ce nu putem cita pe articol
// ramane GOL si scrie de ce, in campul `deschise` - precedentul e randul gol al
// dosarelor de avocatura din `termene.ts`, care spune pe fata ca nu am gasit
// norma si de ce preferam sa nu inventam una.
//
// Fiecare afirmatie verificabila de mai jos are o intrare in
// `src/content/afirmatii/solutii-notari.json`, cu stare `neconfirmat`.
//
// VOCE REF-A (rescris 2026-09-07): titlul unei fise e o AFIRMATIE de doua-patru cuvinte, cu
// punct, iar sub el sta explicatia, o propozitie de 15-35 de cuvinte. Litera obisnuita, fara
// superlative si fara ton de reclama. Adresarea e „dumneavoastra” peste tot - poarta de limba
// pica pe amestecul cu forma familiara. Titlurile sectiunilor III si V raman DIFERITE de la
// un domeniu la altul: ele poarta continut propriu, si asta nu s-a schimbat la scurtare.
// CE NU S-A ATINS: denumirile actelor, numerele de articol si cifrele de termen. Sunt
// citari, si stau si in `termene.ts`; doua adevaruri despre acelasi termen nu au voie
// sa existe pe acelasi site.

// SPATIUL INSECABIL DIN CELE SAPTE `h1`. Se scrie ca `\u00a0`, nu ca semn invizibil in
// sursa: un caracter care nu se vede nu se poate revizui. Rolul lui e sa tina ultimul
// cuvant lipit de penultimul, ca titlul mare sa nu ramana cu un cuvant singur pe randul
// de jos. Pozitia e ALEASA PE TEXT (inaintea ultimului cuvant), nu masurata pe designul
// nou - felia 1 schimba scara tipografica, deci NU e o calibrare, ci o regula de forma.

/** Un fapt scurt: un titlu si un paragraf. Folosit la durere, schimbare, dovezi. */
export type Fapt = {
  titlu: string;
  text: string;
};

/** Un act normativ NUMIT, plus ce anume reglementeaza. Fara numere de articol pe care nu le putem cita. */
export type Temei = {
  act: string;
  ce: string;
};

export type Intrebare = {
  intrebare: string;
  raspuns: string;
};

/** Continutul unei pagini de segment. Tot ce se vede pe pagina vine de aici. */
export type PaginaSegment = {
  /** Titlul din <title>, fara sufixul de site. Sablonul din layout adauga 24 de caractere. */
  titluMeta: string;
  /** meta description: intre 50 si 160 de caractere, unica in lot. Poarta S-01 masoara. */
  descriereMeta: string;
  eticheta: string;
  h1: string;
  /**
   * Linia de sub titlu, pe ecranul de deschidere. Sub 40 de cuvinte, regula directiei:
   * un ecran spune un singur lucru. Ce nu incape aici NU se taie, trece in `continuare`.
   */
  lead: string;
  /**
   * Restul deschiderii, mutat SUB ecran, ca linie de deschidere a primei sectiuni.
   *
   * De ce exista campul. Cele sapte lead-uri aveau intre 38 si 73 de cuvinte, adica de
   * pana la doua ori peste pragul directiei, si impingeau butonul spre marginea de jos a
   * ecranului. Taierea ar fi pierdut text scris atribuit - inclusiv propozitia care spune
   * ce SCRIE pagina si unde nu avem raspuns, adica exact semnalul de onestitate. Asa
   * ecranul respira si nu se pierde niciun rand.
   */
  continuare: string;
  durere: Fapt[];
  schimbare: Fapt[];
  /** Ce poate verifica cineva inainte sa ne creada pe cuvant. */
  aratam: string[];
  /** Ce NU putem sustine inca. Se scrie pe pagina, nu se ascunde in subsol. */
  deschise: string[];
  /**
   * Titlul sectiunii de dovada, scris din materialul ACESTUI domeniu.
   *
   * De ce e in date si nu in componenta, ca fratii lui. Masurat pe cele sapte fise: cinci
   * din sase titluri de sectiune erau identice cuvant cu cuvant, la 53,76 px, adica cel mai
   * mare text de pe pagina dupa titlul de sus - 337 de cuvinte comune tuturor, intre 21,5%
   * si 29,2% din textul fiecarei pagini. Formele sectiunilor difera deja (sase geometrii),
   * dar la doua fise citite una dupa alta ochiul prinde titlurile, nu grilele. Sectiunile
   * III si V sunt exact partile care poarta continut propriu, deci isi scriu si titlul; I,
   * II si IV raman comune dinadins - ele SUNT promisiunea "aceleasi reguli, in orice
   * domeniu".
   */
  titluDovada: string;
  temeiuri: Temei[];
  /**
   * De ce randul de termen ramane gol. Sub 60 de cuvinte: era singurul bloc de pe fisa care
   * trecea de prag, intre 70 si 115 cuvinte, si e chiar blocul cel mai important pentru
   * onestitatea paginii - deci cel mai pagubos de sarit. Nota avea de la inceput doua
   * miscari; acum sunt doua blocuri.
   */
  notaTermene: string;
  /** A doua miscare a notei: ce se aplica in locul termenului pe care nu il scriem. */
  notaCerere: string;
  /** Titlul sectiunii de intrebari, scris din intrebarile ACESTUI domeniu. Vezi `titluDovada`. */
  titluIntrebari: string;
  intrebari: Intrebare[];
  /** Titlul si textul sectiunii finale, care duce la aceeasi discutie ca pagina de start. */
  incheiere: {
    titlu: string;
    text: string;
    /**
     * Ce scrie pe butonul de incheiere. NU repeta butonul de sus: masurat, pagina de start
     * are sase butoane cu sase texte distincte, fiecare ecran cu pasul lui, in timp ce fisele
     * aveau acelasi sir de doua ori pe aceeasi pagina, plus inca o cerere in bara fixa. Dupa
     * sase sectiuni de temeiuri si intrebari, cererea e alta decat la primul ecran: aici omul
     * are ce cere, si fiecare fisa scrie ce anume - din propriul ei paragraf de incheiere.
     */
    buton: string;
  };
};

export type Segment = {
  slug: string;
  nume: string;
  /** Randul de pe hub: durerea segmentului, intr-o propozitie. */
  rezumat: string;
  /** Nenul cand segmentul are pagina proprie. Hub-ul pune legatura numai atunci. */
  pagina: PaginaSegment | null;
};

export const NOTARI: PaginaSegment = {
  titluMeta: "Arhivă pentru birouri notariale",
  descriereMeta:
    "Ce facem pentru un birou notarial: preluare cu proces-verbal și inventar, digitalizare și căutare care citează pagina. Temeiul legal, numit pe față.",
  eticheta: "Domenii · Birouri notariale",
  h1: "Actul se cere\u00a0azi.",
  lead:
    "Arhiva unui birou notarial crește în fiecare zi lucrătoare, se păstrează ani lungi și se caută după nume, dată și număr de înregistrare.",
  continuare:
    "Pagina scrie ce preluăm noi, ce rămâne la biroul dumneavoastră și unde încă nu avem un răspuns pe care să îl putem susține.",

  durere: [
    {
      titlu: "Fondul crește, spațiul nu.",
      text: "Actele se adaugă în fiecare zi lucrătoare și rafturile cresc. Plătiți chirie de birou pentru hârtie care nu se mai atinge.",
    },
    {
      titlu: "Cheia e a hârtiei.",
      text: "Actele se găsesc după nume, dată și număr de înregistrare. Cererea vine cu un nume și un an aproximative. Opisul pe hârtie se citește pe o singură cheie odată.",
    },
    {
      titlu: "Predarea nu suportă improvizație.",
      text: "Arhiva se predă cu proces-verbal și inventar. Dacă inventarul nu e la zi în ziua aceea, predarea devine o inventariere de avarie, făcută sub termen.",
    },
  ],

  schimbare: [
    {
      titlu: "Dimineața, la ghișeu.",
      text: "Cererea se pune ca întrebare, în română, de pe telefon sau din pagina de căutare. Răspunsul vine cu documentul și pagina. Se verifică pe loc.",
    },
    {
      titlu: "Raftul, la Golești.",
      text: "Fondul stă inventariat, cu cotă, în depozitul din județul Argeș. Ce se cere des se scanează. Originalul rămâne în raft și vine la birou când aveți nevoie de hârtie.",
    },
    {
      titlu: "Inventarul, permanent.",
      text: "Opisul se ține la zi tot timpul. O predare cu proces-verbal se face din ce există deja, nu dintr-o numărătoare făcută în grabă.",
    },
  ],

  aratam: [
    "Depozitul din Golești, județul Argeș, cu tot cu condițiile de temperatură, umiditate și acces",
    "Procesul-verbal de preluare și inventarul, în forma exactă în care le semnați",
    "Un răspuns dat pe documente-model, cu documentul și pagina citate, ca să vedeți ce înseamnă „cu sursă”",
    "Contractul în limba română, sub lege română, cu anexa de prelucrare a datelor semnată odată cu el",
  ],

  deschise: [
    "Nu deținem certificare ISO 27001 și nu ne prezentăm ca și cum am avea",
    "Nu avem un birou notarial pe care să îl dăm ca referință, fiindcă 3S este o firmă nouă",
    "Nu publicăm preț: costul se face pe metri liniari și pe ce anume se digitalizează",
    "Nu scriem un timp de răspuns în secunde sau minute, fiindcă nu l-am măsurat pe un fond real",
    "Nu scriem termenul de păstrare pe categorii de acte notariale, fiindcă nu îl putem cita pe articol",
  ],

  titluDovada:
    "Arătăm pe documente-model.",

  temeiuri: [
    {
      act: "Legea Arhivelor Naționale nr. 16/1996",
      ce: "Obligațiile creatorilor și deținătorilor de documente: evidența documentelor create și primite, gruparea lor pe termene de păstrare într-un nomenclator arhivistic avizat, condițiile de păstrare și selecționarea numai prin comisie, cu avizul Arhivelor Naționale.",
    },
    {
      act: "Legea notarilor publici și a activității notariale nr. 36/1995, republicată, cu regulamentul ei de aplicare",
      ce: "Regimul arhivei activității notariale: registrele ținute de birou și situația arhivei când activitatea încetează sau se transferă. Termenele concrete se citesc din acest act și din regulamentul lui.",
    },
  ],

  notaTermene:
    "Nu scriem un termen în ani pentru actele notariale, fiindcă nu îl putem cita pe articol, la fel ca la dosarele cabinetelor de avocatură. Preferăm golul unei cifre pe care nu am putea să o susținem în fața unui control.",
  notaCerere:
    "Termenul care vă obligă este cel din nomenclatorul arhivistic al biroului, avizat de Arhivele Naționale. Dacă îi cunoașteți articolul, scrieți-ne și îl publicăm cu trimiterea la act.",

  titluIntrebari:
    "Ale cui sunt actele.",

  intrebari: [
    {
      intrebare: "Originalele rămân ale biroului?",
      raspuns:
        "Da, fiindcă suntem custode, nu proprietar. Fondul se preia cu proces-verbal și inventar semnate de dumneavoastră. Originalul vine înapoi la cerere, în termenul din contract.",
    },
    {
      intrebare: "Cine vede actele și ce rămâne scris",
      raspuns:
        "Accesul se dă nominal, pe persoană și pe fond. Fiecare căutare și fiecare deschidere de document se jurnalizează, inclusiv pentru personalul nostru. Jurnalul vi se pune la dispoziție.",
    },
    {
      intrebare: "Ce se întâmplă dacă biroul își încetează activitatea",
      raspuns:
        "Predarea arhivei se face în condițiile legii notariale, către cine indică ea. Partea noastră este fondul complet și inventariat, cu proces-verbal, plus copiile digitale în PDF cu index CSV.",
    },
    {
      intrebare: "Actele ajung la un model de limbaj",
      raspuns:
        "Documentele dumneavoastră nu sunt folosite pentru antrenarea niciunui model. Furnizorul de procesare, regiunea și politica de păstrare a interogărilor vi le arătăm la prima discuție.",
    },
  ],

  incheiere: {
    titlu: "De luni, se întreabă.",
    text: "Treizeci de minute în care ne uităm la arhiva biroului așa cum arată azi. La final plecați cu estimarea volumului, cu ordinea digitalizării și cu un calendar de preluare scris.",
    buton: "Cereți calendarul de preluare",
  },
};

// Al doilea lot de segmente: primarii, contabilitate, avocatura. Fiecare constanta
// respecta aceeasi regula ca NOTARI - cifra intra pe pagina NUMAI daca actul si articolul
// se pot cita. Unde se poate, cifrele sunt chiar cele din `termene.ts`, cu acelasi articol,
// ca sa nu existe doua adevaruri despre acelasi termen pe acelasi site.
//
// Diferenta dintre cele trei nu e de vocabular. Durerea unei primarii e fondul MOSTENIT
// peste mandate si categoriile care nu se elimina niciodata; a unui birou de contabilitate
// e ca tine hartia ALTORA, pe termene care difera de zece ori intre ele; a unei case de
// avocatura e ca cine VEDE documentul conteaza cat unde sta el. Daca se pot schimba
// paragrafele intre pagini fara sa se observe, paginile sunt gresite.

export const PRIMARII: PaginaSegment = {
  titluMeta: "Arhivă pentru primării și instituții",
  descriereMeta:
    "Ce facem pentru o primărie: inventar pe nomenclatorul instituției, categorii permanente marcate ca atare și căutare care citează pagina. Actele, numite.",
  eticheta: "Domenii · Primării și instituții publice",
  h1: "Ghișeul așteaptă\u00a0registrul.",
  lead:
    "Arhiva unei primării s-a strâns peste mandate, are categorii care nu se elimină niciodată și un nomenclator care se avizează la Arhivele Naționale.",
  continuare:
    "Pagina scrie ce preluăm noi, ce rămâne obligația instituției și unde încă nu avem un răspuns pe care să îl putem susține.",

  durere: [
    {
      titlu: "Fondul e moștenit.",
      text: "Cutiile din subsol vin de la mandate anterioare, uneori fără cotă și fără opis. Nomenclatorul acoperă doar ce se creează de acum înainte. Restanța nu o revendică nimeni.",
    },
    {
      titlu: "Cetățeanul așteaptă în picioare.",
      text: "Cererea de informații de interes public are termen scris în Legea nr. 544/2001. Căutarea se face în altă clădire, de omul care știe unde e raftul și care poate lipsi o săptămână.",
    },
    {
      titlu: "Eliminarea greșită rămâne.",
      text: "Hotărârile consiliului local și dispozițiile primarului au termen permanent. Apariția unui asemenea document într-un proces-verbal de eliminare este cea mai gravă constatare a unui control.",
    },
  ],

  schimbare: [
    {
      titlu: "Ghișeul întreabă.",
      text: "Funcționarul pune întrebarea în română, de la calculatorul de la ghișeu. Răspunsul vine cu documentul și pagina. Se verifică înainte de a fi spus cetățeanului.",
    },
    {
      titlu: "Restanța primește aceeași cheie.",
      text: "Fondul vechi se inventariază pe nomenclatorul instituției dumneavoastră. Ce s-a strâns peste mandate se caută la fel ca dosarul înregistrat luna trecută.",
    },
    {
      titlu: "Evidența există înainte.",
      text: "Opisul, cotele și jurnalul de acces stau la zi tot timpul. La o verificare sau la o solicitare de la altă instituție se scoate ce există deja.",
    },
  ],

  aratam: [
    "Depozitul din Golești, județul Argeș, cu tot cu condițiile de temperatură, umiditate și acces",
    "Inventarul construit pe nomenclatorul arhivistic al instituției dumneavoastră, pe un fond de probă ales de dumneavoastră",
    "Un răspuns dat pe documente-model, cu documentul și pagina citate, ca să vedeți ce înseamnă „cu sursă”",
    "Jurnalul de acces, în forma în care îl puteți pune la dosarul unui control",
  ],

  deschise: [
    "Nu deținem certificare ISO 27001 și nu ne prezentăm ca și cum am avea",
    "Nu avem o primărie pe care să o dăm ca referință: 3S este o firmă nouă. Arhivarea din 2019 este a firmei-mamă, ADRIA Servicii Arhivare SRL",
    "Nu publicăm preț: costul se face pe metri liniari și pe ce anume se digitalizează",
    "Nu scriem în zile termenul din Legea nr. 544/2001: el obligă instituția, nu furnizorul de arhivă, și se citește din act",
    "Nu ne pronunțăm asupra procedurii de achiziție: forma contractului o stabiliți dumneavoastră, cu compartimentul juridic",
    "Nu scriem un timp de răspuns în secunde, fiindcă nu l-am măsurat pe un fond real de primărie",
  ],

  titluDovada:
    "Ce puneți la dosar.",

  temeiuri: [
    {
      act: "Legea Arhivelor Naționale nr. 16/1996",
      ce: "Evidența documentelor create și primite, gruparea pe termene într-un nomenclator avizat, condițiile de păstrare și selecționarea numai prin comisie, cu aviz. Tot de aici vine termenul permanent al hotărârilor de consiliu și al dispozițiilor primarului.",
    },
    {
      act: "Legea nr. 119/1996 cu privire la actele de stare civilă",
      ce: "Regimul registrelor de stare civilă: se păstrează 100 de ani de la întocmire. După împlinirea termenului se predau Arhivelor Naționale, exemplarul al doilea având propriul regim de depunere.",
    },
    {
      act: "HG nr. 273/1994, Regulamentul de recepție a lucrărilor de construcții",
      ce: "Cartea tehnică se păstrează pe toată durata existenței construcției și îl urmează pe proprietar la fiecare schimbare. Lipsa ei se constată la o expertiză, la o vânzare sau după un eveniment.",
    },
  ],

  notaTermene:
    "Termenele de mai sus le putem cita pe articol și stau, fiecare cu actul lui, în instrumentul de termene de păstrare. Nu scriem numărul de ani pentru fiecare categorie din nomenclatorul dumneavoastră, fiindcă acela vine din nomenclatorul instituției, avizat de Arhivele Naționale.",
  notaCerere:
    "Dacă nomenclatorul dumneavoastră spune altceva decât o listă tipărită de un furnizor, nomenclatorul câștigă. Noi ne aliniem la el.",

  titluIntrebari:
    "Ce rămâne instituției.",

  intrebari: [
    {
      intrebare: "Fondul rămâne al instituției?",
      raspuns:
        "Da, documentele rămân proprietate publică și noi suntem custode. Preluarea se face cu proces-verbal și inventar semnate de dumneavoastră. Originalul se aduce la cerere, în termenul din contract.",
    },
    {
      intrebare: "Ce se întâmplă cu documentele cu termen permanent",
      raspuns:
        "Nu se propun spre eliminare, indiferent câte rafturi ar elibera: le inventariem separat și le marcăm ca atare. Predarea către Arhivele Naționale rămâne a instituției, în condițiile legii.",
    },
    {
      intrebare: "Ce rămâne în sarcina instituției",
      raspuns:
        "Nomenclatorul arhivistic, comisia de selecționare și relația cu Arhivele Naționale, pe care legea le pune pe seama creatorului de documente. Noi ducem munca fizică, ținem evidența la zi și facem fondul căutabil.",
    },
    {
      intrebare: "Datele cetățenilor ajung la un model de limbaj",
      raspuns:
        "Documentele instituției nu sunt folosite pentru antrenarea niciunui model. Furnizorul de procesare, regiunea și politica de păstrare a interogărilor vi le arătăm la prima discuție, pentru evaluarea de impact.",
    },
  ],

  incheiere: {
    titlu: "Începem de la ghișeu.",
    text: "Treizeci de minute în care ne uităm la arhiva instituției așa cum arată azi. La final plecați cu estimarea volumului și cu ordinea digitalizării, începând cu fondul care produce cozi.",
    buton: "Cereți ordinea digitalizării",
  },
};

export const CONTABILITATE: PaginaSegment = {
  titluMeta: "Arhivă pentru birouri de contabilitate",
  descriereMeta:
    "Ce facem pentru un birou de contabilitate: fond separat pe firmă și pe an, statele de salarii ținute deoparte de la preluare, căutare cu sursa citată.",
  eticheta: "Domenii · Birouri de contabilitate",
  h1: "Cinci ani și\u00a0cincizeci.",
  lead:
    "Un birou de contabilitate păstrează hârtia altora, pe termene care diferă de zece ori între ele și care ies din aceeași imprimantă, în aceeași lună.",
  continuare:
    "Pagina scrie ce preluăm, cum se separă fondul fiecărei firme și unde încă nu avem un răspuns pe care să îl putem susține.",

  durere: [
    {
      titlu: "Două termene, un biblioraft.",
      text: "Registrele și documentele justificative se păstrează cinci ani, statele de salarii cincizeci. Amestecarea lor se vede abia când un fost angajat cere dovada vechimii.",
    },
    {
      titlu: "Hârtia e a clientului.",
      text: "Fiecare cutie aparține altei firme. Când un client își mută contabilitatea trebuie predat fondul lui, complet și numai al lui, de obicei în săptămâna declarațiilor.",
    },
    {
      titlu: "Controlul cere un an.",
      text: "Inspecția vine cu un an anume și cu o listă de documente. Căutarea o fac aceiași oameni care duc termenele lunii.",
    },
  ],

  schimbare: [
    {
      titlu: "Termenele se separă devreme.",
      text: "Statele de salarii intră în alt fond, cu altă cotă, din ziua preluării. La selecționare separarea există deja și nu se face sub presiune.",
    },
    {
      titlu: "Un an, o firmă.",
      text: "Întrebarea se pune în română. Răspunsul vine cu documentul și pagina, filtrat pe firma-client și pe exercițiu financiar. Un control care cere un singur an nu deschide restul.",
    },
    {
      titlu: "Fondul pleacă întreg.",
      text: "Inventarul pe firmă stă la zi permanent. Când un client se mută, predarea se face din ce există, cu proces-verbal, plus copiile digitale în format deschis.",
    },
  ],

  aratam: [
    "Depozitul din Golești, județul Argeș, și felul în care fondurile a doi clienți diferiți stau separate în același depozit",
    "Inventarul pe firmă și pe exercițiu financiar, în forma exactă în care l-ați preda unui client care pleacă",
    "Un răspuns dat pe documente-model, cu documentul și pagina citate, ca să vedeți ce înseamnă „cu sursă”",
    "Clauza care spune ce se întâmplă cu fondul unui client care pleacă, scrisă în contract înainte de prima cutie",
  ],

  deschise: [
    "Nu deținem certificare ISO 27001 și nu ne prezentăm ca și cum am avea",
    "Nu avem un birou de contabilitate pe care să îl dăm ca referință: 3S este o firmă nouă. Arhivarea din 2019 este a firmei-mamă, ADRIA Servicii Arhivare SRL",
    "Nu publicăm preț: costul se face pe metri liniari și pe ce anume se digitalizează",
    "Nu dăm consultanță fiscală și nu vă spunem noi ce se poate elimina: propunerea rămâne a dumneavoastră și a comisiei de selecționare",
    "Nu prezentăm termenul dosarelor de personal ca literă de lege: cei 75 de ani sunt practica din nomenclatoarele avizate, nu un articol general",
    "Nu scriem un timp de răspuns în secunde, fiindcă nu l-am măsurat pe un fond real de birou de contabilitate",
  ],

  titluDovada:
    "Fondul unui client.",

  temeiuri: [
    {
      act: "Legea contabilității nr. 82/1991, art. 25 alin. (1)",
      ce: "Registrele de contabilitate și documentele justificative se păstrează cinci ani de la încheierea exercițiului financiar în cursul căruia au fost întocmite, termen redus de la zece ani prin Legea nr. 36/2023. Facturile, inclusiv cele din RO e-Factura, intră aici.",
    },
    {
      act: "Legea contabilității nr. 82/1991, art. 25 alin. (2)",
      ce: "Statele de salarii se păstrează cincizeci de ani de la întocmire, ca excepție expresă de la termenul documentelor financiare, fiindcă din ele se dovedește vechimea, uneori la treizeci de ani după plecare.",
    },
    {
      act: "Legea Arhivelor Naționale nr. 16/1996",
      ce: "Evidența documentelor, gruparea pe termene într-un nomenclator avizat și selecționarea numai prin comisie. De aici vine și termenul dosarelor de personal: cei 75 de ani sunt practica din nomenclatoarele avizate, nu un articol general.",
    },
  ],

  notaTermene:
    "Cifrele de mai sus le putem cita pe articol. Un termen unic pentru „arhiva biroului” nu scriem, fiindcă fiecare categorie are actul ei.",
  notaCerere:
    "Atenție la o suprapunere care induce în eroare. Prescripția dreptului organului fiscal este tot de cinci ani, însă poate curge de la altă dată decât termenul de arhivare. Termenul dosarelor de personal rămâne cel din nomenclatorul dumneavoastră avizat.",

  titluIntrebari:
    "Când pleacă un client.",

  intrebari: [
    {
      intrebare: "Ale cui rămân documentele",
      raspuns:
        "Ale firmelor care le-au creat: biroul dumneavoastră răspunde față de ele. Noi suntem custode, cu proces-verbal și inventar. Originalul se aduce la cerere, în termenul din contract.",
    },
    {
      intrebare: "Ce se întâmplă când un client își mută contabilitatea",
      raspuns:
        "Se predă fondul lui, întreg și numai al lui, din inventarul ținut la zi, cu proces-verbal, plus copiile digitale în format deschis, PDF cu index CSV, ca preluarea să nu depindă de noi.",
    },
    {
      intrebare: "Cum se face selecționarea, concret",
      raspuns:
        "Comisia de selecționare rămâne a biroului dumneavoastră. Noi pregătim listele pe categorii și pe termene, cu statele de salarii deja separate, și scoatem din propunere ce are termen mai lung.",
    },
    {
      intrebare: "Cine vede documentele și ce rămâne scris",
      raspuns:
        "Accesul se dă nominal, pe persoană și pe fondul unei singure firme. Fiecare căutare și fiecare deschidere de document se jurnalizează, inclusiv pentru personalul nostru.",
    },
  ],

  incheiere: {
    titlu: "Pornim de la control.",
    text: "Treizeci de minute în care ne uităm la câte firme aveți, câți metri liniari și cum stau statele de salarii. La final plecați cu ordinea preluării.",
    buton: "Cereți ordinea preluării",
  },
};

export const AVOCATURA: PaginaSegment = {
  titluMeta: "Arhivă pentru case de avocatură",
  descriereMeta:
    "Ce facem pentru o casă de avocatură: dosare inventariate, acces nominal pe dosar cu jurnal, căutare cu sursa citată. Rândul de termen rămâne gol, dinadins.",
  eticheta: "Domenii · Case de avocatură",
  h1: "Termenul e\u00a0miercuri.",
  lead:
    "Un dosar de instanță se măsoară în bibliorafturi. Termenele care contează se măsoară în zile.",
  continuare:
    "Pagina scrie ce preluăm, cum se dă accesul pe dosar și de ce lăsăm gol, dinadins, rândul cu termenul de păstrare.",

  durere: [
    {
      titlu: "Volumul vine din dosar.",
      text: "Un singur litigiu produce zeci de centimetri de hârtie. Dosarele închise nu se micșorează și nu se aruncă. Ocupă rafturi în biroul din centru, la chirie de birou.",
    },
    {
      titlu: "Termenul nu așteaptă căutarea.",
      text: "Când se cere un înscris dintr-un dosar de acum șase ani, căutarea intră pe drumul critic al termenului. Diferența dintre răsfoire și întrebare directă este, în cazurile proaste, chiar termenul.",
    },
    {
      titlu: "Contează și cine vede.",
      text: "Secretul profesional nu se oprește la ușa depozitului. Un furnizor care păstrează cutiile în siguranță și dă acces „echipei” la grămadă a mutat problema în altă clădire.",
    },
  ],

  schimbare: [
    {
      titlu: "Întrebarea în locul răsfoirii.",
      text: "Puneți întrebarea în română, de pe telefon sau din pagina de căutare. Răspunsul vine cu dosarul, documentul și pagina, fiindcă un citat aproximativ dintr-un înscris nu folosește la nimic.",
    },
    {
      titlu: "Acces pe dosar.",
      text: "Fiecare persoană primește acces nominal, pe dosarele la care lucrează. Colaboratorul intrat pentru un singur litigiu vede un singur fond, cu accesul retras la încetarea colaborării.",
    },
    {
      titlu: "Originalul stă, copia circulă.",
      text: "Ce se cere des se digitalizează și devine căutabil. Originalul rămâne în raft, la Golești, și vine înapoi la cabinet în termenul din contract.",
    },
  ],

  aratam: [
    "Depozitul din Golești, județul Argeș, și cine are acces fizic la raft, cu nume",
    "Jurnalul de acces pe dosar: cine a căutat, ce a deschis și când, inclusiv personalul nostru",
    "Un răspuns dat pe documente-model, cu dosarul și pagina citate, ca să vedeți ce înseamnă „cu sursă”",
    "Angajamentul de confidențialitate și anexa de prelucrare a datelor, semnate înainte de prima cutie ridicată",
  ],

  deschise: [
    "Nu deținem certificare ISO 27001 și nu ne prezentăm ca și cum am avea",
    "Nu avem o casă de avocatură pe care să o dăm ca referință: 3S este o firmă nouă. Arhivarea din 2019 este a firmei-mamă, ADRIA Servicii Arhivare SRL",
    "Nu publicăm preț: costul se face pe metri liniari și pe ce anume se digitalizează",
    "Nu scriem un termen de păstrare pentru dosarele unui cabinet, fiindcă nu am găsit o normă generală pe care să o putem cita cu articol",
    "Nu interpretăm ce impune statutul profesiei: acela se citește la barou, nu la furnizorul de arhivă",
    "Nu scriem un timp de aducere a originalului ca promisiune generală de pagină: se negociază pe categorii și se scrie în contract",
  ],

  titluDovada:
    "Ce arătăm despre acces.",

  temeiuri: [
    {
      act: "Legea Arhivelor Naționale nr. 16/1996",
      ce: "Obligațiile deținătorului de documente: evidența, gruparea pe termene într-un nomenclator arhivistic, condițiile de păstrare și selecționarea prin comisie, valabile și pentru un cabinet mic, cu un singur depozit.",
    },
    {
      act: "Legea nr. 51/1995 pentru organizarea și exercitarea profesiei de avocat, cu statutul profesiei",
      ce: "De aici vin secretul profesional și regimul dosarelor cabinetului. Termenul concret se citește din statut, din contractul de asistență juridică și din nomenclatorul propriu, acte pe care le citiți la barou.",
    },
  ],

  notaTermene:
    "Rândul cu termenul de păstrare a dosarelor de cabinet este gol în instrumentul de termene și rămâne gol, fiindcă nu am găsit o normă generală, aplicabilă tuturor dosarelor, pe care să o putem cita cu articol.",
  notaCerere:
    "Termenul se construiește din statutul profesiei, din contractul de asistență juridică și din nomenclatorul propriu. Dacă lucrați într-un cabinet și cunoașteți temeiul, scrieți-ne și îl publicăm cu trimiterea la act.",

  titluIntrebari:
    "Secretul profesional, la despărțire.",

  intrebari: [
    {
      intrebare: "Dosarele rămân ale cabinetului?",
      raspuns:
        "Da, fiindcă suntem custode, nu proprietar. Fondul se preia cu proces-verbal și inventar semnate de dumneavoastră. Originalul vine înapoi la cerere, în termenul din contract.",
    },
    {
      intrebare: "Cum se împacă asta cu secretul profesional",
      raspuns:
        "Accesul se dă nominal și pe dosar. Personalul nostru semnează angajament de confidențialitate. Fiecare deschidere rămâne în jurnal, cu nume și oră.",
    },
    {
      intrebare: "Cât de repede vine un dosar înapoi pe hârtie",
      raspuns:
        "Termenul se stabilește pe categorii și se scrie în contract, înainte de prima ridicare, fiindcă depinde de distanță și de ora cererii. Un număr pus pe pagină nu ajută în instanță.",
    },
    {
      intrebare: "Ce se întâmplă dacă încetează colaborarea",
      raspuns:
        "Vă dăm fondul complet și inventariat, cu proces-verbal, plus copiile digitale în format deschis, PDF cu index CSV, fără format proprietar și fără vreo cheie rămasă la noi.",
    },
  ],

  incheiere: {
    titlu: "Alegeți un dosar închis.",
    text: "Treizeci de minute în care ne uităm la câți metri liniari aveți și cine are voie să vadă ce. La final plecați cu regulile de acces.",
    buton: "Cereți regulile de acces",
  },
};

// Al treilea lot: constructii, logistica, imobiliare. Aceeasi regula ca la loturile
// dinainte - cifra intra pe pagina NUMAI daca actul si articolul se pot cita, iar unde
// se poate cifrele sunt chiar cele din `termene.ts`, cu acelasi articol.
//
// Ce deosebeste cele trei, ca sa nu iasa acelasi text cu alte substantive. La o firma de
// CONSTRUCTII documentul se naste pe santier si trebuie si PREDAT proprietarului, si
// pastrat de executant, fiindca raspunderea nu se inchide la receptie. La un TRANSPORTATOR
// hartia circula cu marfa si se intoarce tarziu, in exemplare multiple din care unul singur
// poarta mentiunea scrisa la descarcare; volumul e mare si marunt, iar cererea vine cu o
// data si un client, nu cu numarul de inregistrare. La o agentie IMOBILIARA dosarul
// supravietuieste relatiei si poarta datele unor oameni care nu mai sunt clienti, deci
// intrebarea grea devine cine are voie sa il deschida si pana cand.

export const CONSTRUCTII: PaginaSegment = {
  titluMeta: "Arhivă pentru firme de construcții",
  descriereMeta:
    "Ce facem pentru un constructor: dosarul de șantier inventariat pe obiectiv, cartea tehnică predată și un exemplar digital care rămâne firmei.",
  eticheta: "Domenii · Firme de construcții și dezvoltatori",
  h1: "Fisura cere\u00a0procesul-verbal.",
  lead:
    "Arhiva unei firme de construcții crește în valuri: un șantier produce metri de dosare cât ține execuția, apoi tace ani buni.",
  continuare:
    "Ce rămâne după el se predă proprietarului și vă rămâne și dumneavoastră, fiindcă răspunderea nu se închide odată cu recepția. Pagina scrie ce preluăm, ce rămâne obligația firmei și unde încă nu avem un răspuns pe care să îl putem susține.",

  durere: [
    {
      titlu: "Dosarul se naște afară.",
      text: "Procesele-verbale de lucrări ascunse, buletinele de încercări și certificatele materialelor se semnează pe șantier, în exemplare care pleacă la firme diferite. La demontarea organizării de șantier dosarul ajunge unde apucă.",
    },
    {
      titlu: "Cartea pleacă, răspunderea rămâne.",
      text: "Cartea tehnică pleacă la proprietar, cum cere regulamentul de recepție. Firma care a executat rămâne cea căreia i se cer explicații peste ani. Are nevoie de propriul exemplar.",
    },
    {
      titlu: "Dovada stă sub tencuială.",
      text: "La o infiltrație sau la o fisură se cere ce s-a executat acolo, în ce zi și cine a semnat înainte de acoperire. Răspunsul stă într-un proces-verbal semnat de mai multe părți.",
    },
  ],

  schimbare: [
    {
      titlu: "Un fond pe obiectiv.",
      text: "Fiecare șantier primește fondul lui, cu cotă proprie, de la autorizația de construire până la recepția finală. Se caută într-un obiectiv, nu în arhiva firmei la grămadă.",
    },
    {
      titlu: "Predarea și copia, deodată.",
      text: "Cartea tehnică se predă proprietarului. Firma rămâne cu exemplarul digital complet și indexat. Noi ducem inventarul, scanarea și predarea, nu răspunderea tehnică.",
    },
    {
      titlu: "Întrebarea, în locul teancului.",
      text: "Se întreabă în română ce proces-verbal acoperă hidroizolația de la corpul B și în ce zi s-a semnat. Răspunsul vine cu documentul și pagina, așa cum ajunge la expert un citat.",
    },
  ],

  aratam: [
    "Depozitul din Golești, județul Argeș, și felul în care dosarul unui obiectiv stă întreg, într-un singur loc",
    "Inventarul unui șantier încheiat, de la autorizația de construire la procesul-verbal de recepție, pe un proiect ales de dumneavoastră",
    "Un răspuns dat pe documente-model, cu documentul și pagina citate, ca să vedeți ce înseamnă „cu sursă”",
    "Predarea cărții tehnice către proprietar, cu proces-verbal, plus exemplarul digital care vă rămâne dumneavoastră",
  ],

  deschise: [
    "Nu deținem certificare ISO 27001 și nu ne prezentăm ca și cum am avea",
    "Nu avem o firmă de construcții pe care să o dăm ca referință: 3S este o firmă nouă. Arhivarea din 2019 este a firmei-mamă, ADRIA Servicii Arhivare SRL",
    "Nu publicăm preț: costul se face pe metri liniari și pe ce anume se digitalizează",
    "Nu întocmim cartea tehnică și nu ne substituim dirigintelui de șantier sau responsabilului tehnic cu execuția: ducem hârtia, evidența și predarea, nu răspunderea tehnică",
    "Nu scriem în ani durata răspunderii pentru vicii și nici perioada de garanție: sunt termene care se citesc din contract și din actul normativ, nu de pe pagina unui furnizor de arhivă",
    "Nu dăm preț pe planșe fără să le vedem: peste formatul A3 se schimbă și scanerul, și felul în care stau pe raft. O estimare făcută înainte de măsurare nu ar ține",
    "Nu scriem un timp de răspuns în secunde, fiindcă nu l-am măsurat pe un fond real de șantier",
  ],

  titluDovada:
    "Dosarul unui obiectiv.",

  temeiuri: [
    {
      act: "HG nr. 273/1994, Regulamentul de recepție a lucrărilor de construcții",
      ce: "Cartea tehnică a construcției se păstrează pe toată durata existenței construcției și îl urmează pe proprietar la fiecare schimbare. Tot de aici vin recepția la terminarea lucrărilor și recepția finală, cerute la ani distanță.",
    },
    {
      act: "Legea nr. 10/1995 privind calitatea în construcții",
      ce: "Actul care așază sistemul calității în construcții și obligațiile participanților. Întinderea răspunderii și termenele concrete se citesc din el și din regulamentele lui de aplicare, nu dintr-o cifră scrisă de noi.",
    },
    {
      act: "Legea Arhivelor Naționale nr. 16/1996",
      ce: "Evidența documentelor create și primite, gruparea pe termene într-un nomenclator avizat, condițiile de păstrare și selecționarea prin comisie. Obligă firma care creează documentele, inclusiv o societate de construcții.",
    },
  ],

  notaTermene:
    "O singură durată din dosarul unui șantier o putem cita pe articol: cartea tehnică se păstrează pe toată durata existenței construcției, potrivit HG nr. 273/1994. Pentru jurnalul de șantier, buletinele de încercări și dosarele subantreprenorilor nu punem un număr de ani pe pagină.",
  notaCerere:
    "Termenul lor se compune din contract, din durata răspunderii pentru vicii și din nomenclatorul firmei. Dacă lucrați în construcții și aveți articolul, scrieți-ne și îl publicăm cu trimiterea la act.",

  titluIntrebari:
    "Cine ține cartea tehnică.",

  intrebari: [
    {
      intrebare: "Cartea tehnică o întocmiți dumneavoastră?",
      raspuns:
        "Nu, întocmirea și semnarea rămân la cei pe care îi obligă regulamentul de recepție. Noi adunăm, inventariem, scanăm și predăm ce ne dați, cu piesele lipsă scrise în inventar ca lipsă.",
    },
    {
      intrebare: "Ce se întâmplă cu dosarul unui subantreprenor care a dispărut",
      raspuns:
        "Rămâne ce ați primit de la el, inventariat ca atare, cu lipsurile scrise pe față, fiindcă nu reconstituim documente și nu semnăm în locul nimănui.",
    },
    {
      intrebare: "Planurile și planșele mari intră în același fond",
      raspuns:
        "Le preluăm, însă le vedem întâi: peste formatul A3 se schimbă și scanerul, și modul în care stau pe raft. Ce nu se poate scana citibil rămâne pe hârtie, inventariat.",
    },
    {
      intrebare: "Ce se întâmplă cu documentele în timpul procesării",
      raspuns:
        "Niciun document al dumneavoastră nu ajunge în antrenarea vreunui model. Furnizorul care procesează, regiunea în care rulează și cât se păstrează interogările se scriu în contract, cu anexa semnată odată cu el.",
    },
  ],

  incheiere: {
    titlu: "Începem cu un obiectiv.",
    text: "Treizeci de minute în care ne uităm la câte șantiere închise aveți și unde au ajuns dosarele lor. La final plecați cu lista pieselor lipsă din primul dosar deschis.",
    buton: "Cereți lista pieselor lipsă",
  },
};

export const LOGISTICA: PaginaSegment = {
  titluMeta: "Arhivă pentru transport și logistică",
  descriereMeta:
    "Ce facem pentru un transportator: scrisori de trăsură și avize regăsite după cursă, client și lună, pe fonduri separate pe exercițiu financiar.",
  eticheta: "Domenii · Transport și logistică",
  h1: "Mențiunea de mână\u00a0decide.",
  lead:
    "Hârtia unui transportator se produce pe drum, se semnează la rampă și se întoarce în geanta șoferului, cu întârziere.",
  continuare:
    "Volumul e mare, formatul e mărunt și repetitiv. Documentul care decide o reclamație de marfă este cel pe care cineva a scris trei rânduri cu pixul. Pagina scrie ce preluăm, cum se regăsește o cursă și unde încă nu avem un răspuns pe care să îl putem susține.",

  durere: [
    {
      titlu: "Documentul circulă cu marfa.",
      text: "Scrisoarea de trăsură pleacă odată cu marfa, se semnează la destinație și se întoarce peste zile sau săptămâni, în exemplare care nu ajung toate în același loc.",
    },
    {
      titlu: "Foile seamănă între ele.",
      text: "Teancuri de foi aproape identice, cu aceeași casetă tipărită, alt număr și altă dată, într-o arhivă în care răsfoirea nu duce nicăieri: se caută pe index sau deloc.",
    },
    {
      titlu: "Cererea vine cu data.",
      text: "Reclamația spune „transportul de pe 14 martie, către depozitul de la Deva”. Controlul spune un an și un cod de client. Teancul e ordonat după numărul de înregistrare pe care nu îl are nimeni.",
    },
  ],

  schimbare: [
    {
      titlu: "Cursa devine cheia.",
      text: "Se întreabă cum se vorbește în depozit, ce a plecat pe 14 martie către clientul acela și cine a semnat la descărcare. Răspunsul vine cu documentul și pagina.",
    },
    {
      titlu: "Un an, un fond.",
      text: "Documentele se grupează pe an financiar și pe client din ziua preluării. Când un control cere un singur an se scoate un singur fond. Restul arhivei rămâne închis.",
    },
    {
      titlu: "Hârtia măruntă pleacă.",
      text: "Cutiile cu scrisori de trăsură și avize ocupă spațiu plătit ca birou. La Golești stau inventariate, cu cotă, cu ce se cere des deja scanat.",
    },
  ],

  aratam: [
    "Depozitul din Golești, județul Argeș, și cum arată un raft de documente de transport, cotate pe an și pe client",
    "Indexul după care se regăsește o cursă - dată, client, localitate de descărcare, număr de document - pe un teanc de probă adus de dumneavoastră",
    "Un răspuns dat pe documente-model, cu documentul și pagina citate, ca să vedeți ce înseamnă „cu sursă”",
    "Cum arată scanat un exemplar mototolit, ștampilat peste text și completat de mână, și ce rămâne necitibil din el",
  ],

  deschise: [
    "Nu deținem certificare ISO 27001 și nu ne prezentăm ca și cum am avea",
    "Nu avem o firmă de transport pe care să o dăm ca referință: 3S este o firmă nouă. Arhivarea din 2019 este a firmei-mamă, ADRIA Servicii Arhivare SRL",
    "Nu publicăm preț: costul se face pe metri liniari și pe ce anume se digitalizează",
    "Nu promitem că citim orice scris de mână: o mențiune făcută cu pixul pe un exemplar la indigo poate rămâne necitibilă. Atunci o marcăm ca atare în loc să o ghicim",
    "Nu scriem termenul de păstrare pentru datele din tahograf și pentru evidența timpilor de conducere și odihnă: au alt regim decât documentele contabile. Articolul nu îl putem cita încă",
    "Nu ne pronunțăm dacă un anume document justifică sau nu o înregistrare contabilă: acela e răspunsul contabilului dumneavoastră, nu al arhivarului",
    "Nu scriem un timp de răspuns în secunde, fiindcă nu l-am măsurat pe un fond real de firmă de transport",
  ],

  titluDovada:
    "Exemplarul mototolit, citit.",

  temeiuri: [
    {
      act: "Legea contabilității nr. 82/1991, art. 25 alin. (1)",
      ce: "Registrele de contabilitate și documentele justificative se păstrează cinci ani de la încheierea exercițiului financiar în cursul căruia au fost întocmite, termen redus de la zece ani prin Legea nr. 36/2023. Scrisoarea de trăsură și avizul de însoțire intră aici când stau la baza unei înregistrări contabile.",
    },
    {
      act: "Legea contabilității nr. 82/1991, art. 25 alin. (2)",
      ce: "Statele de salarii se păstrează cincizeci de ani de la întocmire, ca excepție expresă de la termenul documentelor financiare. Într-o firmă cu mulți șoferi acesta este fondul care supraviețuiește tuturor celorlalte.",
    },
    {
      act: "Legea Arhivelor Naționale nr. 16/1996",
      ce: "Evidența documentelor create și primite, gruparea pe termene într-un nomenclator avizat și selecționarea prin comisie. Nomenclatorul decide ce se întâmplă cu documentele de transport după împlinirea termenului contabil. Decizia rămâne a firmei.",
    },
  ],

  notaTermene:
    "Cele trei termene de mai sus le putem cita pe articol și stau, fiecare cu actul lui, în instrumentul de termene. Rândul rămâne gol pentru datele din tahograf, foile de parcurs și evidența timpilor de conducere și odihnă, cu regim propriu pe care nu îl putem cita încă.",
  notaCerere:
    "Mai este o graniță pe care nu o trecem. Dacă un document justifică sau nu o înregistrare contabilă este răspunsul contabilului dumneavoastră. Noi păstrăm ce ne dați, pe termenul din nomenclatorul propriu.",

  titluIntrebari:
    "Căutarea unei curse.",

  intrebari: [
    {
      intrebare: "Cum se caută o cursă de acum trei ani",
      raspuns:
        "După ce știți: data, clientul, localitatea de descărcare, numărul mașinii, nu după numărul de înregistrare, pe care nu îl are nimeni la îndemână când sună un client. Răspunsul vine cu documentul și pagina.",
    },
    {
      intrebare: "Ce faceți cu exemplarele multiple ale aceluiași document",
      raspuns:
        "Le inventariem ca exemplare ale aceluiași document și marcăm care poartă semnătura și mențiunea de la descărcare, fiindcă acela decide o reclamație de marfă; dacă lipsește, scriem în inventar că lipsește.",
    },
    {
      intrebare: "Preluați și cutiile care nu au fost niciodată ordonate",
      raspuns:
        "Da, însă nu ne prefacem că sunt ordonate: se inventariază așa cum vin și se cotează. Ce nu se poate identifica se marchează ca atare, ca să nu descoperiți lipsa în ziua controlului.",
    },
    {
      intrebare: "Cine vede documentele și ce se întâmplă cu datele din ele",
      raspuns:
        "Documentele de transport poartă nume și semnături de șoferi. Prelucrarea se scrie în anexa semnată odată cu contractul. Nu intră în antrenarea niciunui model. Accesul rămâne în jurnal.",
    },
  ],

  incheiere: {
    titlu: "Aduceți un teanc.",
    text: "Treizeci de minute pornind de la ce a rămas în urma curselor de anul trecut, câte cutii și după ce anume căutați. La final plecați cu indexul propus.",
    buton: "Cereți indexul propus",
  },
};

export const IMOBILIARE: PaginaSegment = {
  titluMeta: "Arhivă pentru agenții imobiliare",
  descriereMeta:
    "Ce facem pentru o agenție imobiliară sau un administrator de imobile: dosare regăsite după adresă, acces nominal cu jurnal peste datele personale.",
  eticheta: "Domenii · Agenții imobiliare și administrare de imobile",
  h1: "Dosarul rămâne după\u00a0vânzare.",
  lead:
    "Un dosar de tranzacție se închide odată cu semnătura la notar. Din arhiva agenției nu dispare.",
  continuare:
    "Rămâne cu actele de proprietate, cu documentația cadastrală și cu datele unor oameni care nu vă mai sunt clienți. Se caută după adresă, se cere la ani distanță și trebuie predat sau șters cum spune legea. Pagina scrie ce preluăm, ce rămâne obligația agenției și unde încă nu avem un răspuns pe care să îl putem susține.",

  durere: [
    {
      titlu: "Se caută după adresă.",
      text: "Cererea vine în forma în care o ține minte omul: blocul de pe strada aceea, apartamentul de la etajul trei. Dosarul e clasat după numărul de intrare sau după agentul care l-a lucrat.",
    },
    {
      titlu: "Păstrați datele unor străini.",
      text: "Într-un dosar stau copii de acte de identitate, extrase de carte funciară și documentații cadastrale ale ambelor părți, uneori și ale unor terți. Obligația de a le ține în siguranță este a agenției.",
    },
    {
      titlu: "Predarea ține de bunăvoință.",
      text: "Când pleacă agentul care a lucrat dosarul sau când o asociație schimbă administratorul, se predă ce își aduce cineva aminte. Cel care rămâne află lipsurile pe rând, la fiecare telefon.",
    },
  ],

  schimbare: [
    {
      titlu: "Adresa devine cheie.",
      text: "Se întreabă așa cum se vorbește la telefon, ce s-a semnat pentru apartamentul de pe strada aceea și cine a fost vânzătorul. Răspunsul vine cu documentul și pagina.",
    },
    {
      titlu: "Accesul lasă jurnal.",
      text: "Fondul se preia cu proces-verbal. Accesul se dă nominal, pe persoană și pe dosar. Fiecare deschidere de document rămâne în jurnal, inclusiv pentru personalul nostru.",
    },
    {
      titlu: "Inventarul există dinainte.",
      text: "Evidența pe dosar și pe imobil se ține la zi tot timpul. Când pleacă un agent sau se schimbă administratorul, predarea se face din ce există deja, cu proces-verbal.",
    },
  ],

  aratam: [
    "Depozitul din Golești, județul Argeș, cu condițiile de păstrare și cu lista celor care au acces fizic la raft",
    "Inventarul unui dosar de tranzacție încheiat, ales de dumneavoastră, cu adresa imobilului ca și cheie de căutare",
    "Un răspuns dat pe documente-model, cu documentul și pagina citate, ca să vedeți ce înseamnă „cu sursă”",
    "Jurnalul de acces și anexa de prelucrare a datelor, în forma în care le arătați cuiva care vă cere socoteală pentru datele lui",
  ],

  deschise: [
    "Nu deținem certificare ISO 27001 și nu ne prezentăm ca și cum am avea",
    "Nu avem o agenție imobiliară pe care să o dăm ca referință: 3S este o firmă nouă. Arhivarea din 2019 este a firmei-mamă, ADRIA Servicii Arhivare SRL",
    "Nu publicăm preț: costul se face pe metri liniari și pe ce anume se digitalizează",
    "Nu scriem un termen de păstrare pentru dosarele de tranzacție: nu am găsit o normă generală pe care să o putem cita cu articol",
    "Nu facem evaluarea de impact și nu stabilim noi ce date aveți dreptul să păstrați: acela e răspunsul celui care răspunde de protecția datelor în agenție",
    "Nu ștergem nimic din proprie inițiativă: la o cerere de ștergere executăm ce ne cereți în scris și vă dăm dovada. Decizia rămâne a dumneavoastră",
    "Nu scriem un timp de răspuns în secunde, fiindcă nu l-am măsurat pe un fond real de agenție",
  ],

  titluDovada:
    "Ce arătați la socoteală.",

  temeiuri: [
    {
      act: "Regulamentul (UE) 2016/679 privind protecția datelor, cu Legea nr. 190/2018",
      ce: "Un dosar de tranzacție e plin de date ale unor oameni care nu vă mai sunt clienți. De aici vin temeiul păstrării, durata, obligația de a răspunde cererilor de acces și de ștergere și contractul de prelucrare. Operatorul rămâne agenția, noi suntem persoana împuternicită.",
    },
    {
      act: "Legea contabilității nr. 82/1991, art. 25 alin. (1)",
      ce: "Contractul de intermediere și facturile de comision sunt documente justificative și se păstrează cinci ani de la încheierea exercițiului financiar în cursul căruia au fost întocmite, termen care acoperă doar partea comercială a dosarului.",
    },
    {
      act: "Legea Arhivelor Naționale nr. 16/1996",
      ce: "Evidența documentelor create și primite, gruparea pe termene într-un nomenclator arhivistic și condițiile de păstrare. Nomenclatorul e locul unde agenția își scrie propriile termene, și el ne obligă și pe noi.",
    },
  ],

  notaTermene:
    "Un singur termen din dosarul unei tranzacții îl putem cita pe articol: cei cinci ani ai documentelor justificative, din Legea contabilității. Pentru actele de proprietate, documentația cadastrală și copiile de acte de identitate rândul rămâne gol, dinadins.",
  notaCerere:
    "El se compune din contractul de intermediere, din obligațiile fiscale și, pentru datele personale, din temeiul în baza căruia le păstrați; când temeiul se stinge, datele se șterg. Dacă lucrați într-o agenție și cunoașteți articolul, scrieți-ne.",

  titluIntrebari:
    "Adresa și ștergerea datelor.",

  intrebari: [
    {
      intrebare: "Cum se caută un dosar după adresă",
      raspuns:
        "Adresa imobilului intră ca și cheie de căutare la inventariere, alături de numele părților, de numărul de dosar și de an. Răspunsul vine cu documentul și pagina.",
    },
    {
      intrebare: "Ce faceți la o cerere de ștergere a datelor",
      raspuns:
        "Decizia este a dumneavoastră, ca operator. Noi executăm ce ne cereți în scris, pe dosarele indicate, și vă întoarcem dovada a ceea ce s-a șters și când, fără să interpretăm cererea.",
    },
    {
      intrebare: "Preluați și arhiva unei asociații de proprietari",
      raspuns:
        "Da, cu aceleași reguli: preluare cu proces-verbal și inventar, cotă, jurnal de acces. Cine are dreptul să consulte se stabilește din actele asociației, nu de la depozitar. Accesul se dă tot nominal.",
    },
    {
      intrebare: "Documentele ajung la un model de limbaj",
      raspuns:
        "Nu intră în antrenarea niciunui model. Într-un dosar imobiliar stau date ale unor oameni care nu au dat niciun acord, așa că prelucrarea se scrie în anexa semnată odată cu contractul.",
    },
  ],

  incheiere: {
    titlu: "Începem cu un dosar.",
    text: "Treizeci de minute în care ne uităm la câte dosare închise aveți, unde stau ele acum și după ce anume le caută cineva. La final plecați cu lista câmpurilor după care veți putea întreba.",
    buton: "Cereți lista câmpurilor",
  },
};

export const SEGMENTE: Segment[] = [
  {
    slug: "notari",
    nume: "Birouri notariale",
    rezumat:
      "Fond care crește în fiecare zi lucrătoare și se caută după nume, dată și număr de înregistrare. Predarea lui cere inventar la zi.",
    pagina: NOTARI,
  },
  {
    slug: "primarii",
    nume: "Primării și instituții publice",
    rezumat:
      "Registre de stare civilă, hotărâri de consiliu, documentații de urbanism: termene lungi, control extern și un cetățean care așteaptă la ghișeu.",
    pagina: PRIMARII,
  },
  {
    slug: "contabilitate",
    nume: "Birouri de contabilitate",
    rezumat:
      "Un control fiscal se uită la un an vechi de cinci ani. Statele de salarii au propriul termen, mult mai lung. Amestecul lor costă.",
    pagina: CONTABILITATE,
  },
  {
    slug: "avocatura",
    nume: "Case de avocatură",
    rezumat:
      "Dosare voluminoase și termene procedurale scurte, unde diferența dintre douăzeci de bibliorafturi și o întrebare directă este un termen câștigat.",
    pagina: AVOCATURA,
  },
  {
    slug: "constructii",
    nume: "Firme de construcții și dezvoltatori",
    rezumat:
      "Dosarul de șantier se produce pe teren, în exemplare care pleacă la firme diferite. Dovada se cere la ani după recepție.",
    pagina: CONSTRUCTII,
  },
  {
    slug: "logistica",
    nume: "Transport și logistică",
    rezumat:
      "Foi aproape identice, care circulă cu marfa și se întorc târziu. Cererea vine cu o dată și un client, nu cu numărul de înregistrare.",
    pagina: LOGISTICA,
  },
  {
    slug: "imobiliare",
    nume: "Agenții imobiliare și administrare de imobile",
    rezumat:
      "Dosarele se caută după adresă și poartă datele unor oameni care nu vă mai sunt clienți. Predarea cade când pleacă cine le-a lucrat.",
    pagina: IMOBILIARE,
  },
];

/** Titlul si descrierea hub-ului. Stau aici, langa segmente, ca sa nu se rupa de lista. */
export const HUB = {
  titluMeta: "Soluții pe domenii",
  descriereMeta:
    "Arhivare fizică, digitalizare și căutare cu sursa citată, pe domenii: notariat, primării, contabilitate, avocatură, construcții, transport, imobiliare.",
  eticheta: "Domenii deservite",
  // Ruperea de rand e scrisa AICI, in date, nu duplicata in pagina: pagina o randeaza
  // taind sirul la newline. Fara ea, titlul se rupea la marginea de 24ch si lasa
  // un singur cuvant pe randul trei, la 83 px inaltime.
  h1: "Fiecare domeniu\nîntreabă altceva.",
  // Linia de pe ecranul de deschidere, sub 40 de cuvinte. A treia propozitie a plecat in
  // `listaLead`, ca linie a sectiunii cu lista - nu s-a taiat: acolo e chiar la locul ei,
  // deasupra listei despre care vorbeste.
  lead:
    "Pașii sunt aceiași peste tot: ridicăm, inventariem, digitalizăm, răspundem. Diferă ce se cere des, cine controlează și cât se păstrează.",
  /** Linia de deasupra listei de domenii. */
  listaLead:
    "Paginile de mai jos scriu diferența, domeniu cu domeniu, și spun pe față unde nu avem încă un răspuns.",
};

/** Ce nu depinde de domeniu. Se scrie o singura data si apare pe hub. */
export const INDIFERENT_DE_DOMENIU: Fapt[] = [
  {
    titlu: "Un singur furnizor.",
    text: "Hârtia și căutarea vin de la aceeași firmă. Dispare conversația în care depozitarul dă vina pe furnizorul de programe.",
  },
  {
    titlu: "Fiecare răspuns are sursă.",
    text: "Document, pagină, fragment: deschideți originalul și citiți fraza pe care se sprijină răspunsul. Fără sursă, răspunsul nu se afișează.",
  },
  {
    titlu: "Contractul se judecă aici.",
    text: "Contract în limba română, sub lege română, cu instanțele din România. Anexa de prelucrare a datelor se semnează odată cu el.",
  },
];
