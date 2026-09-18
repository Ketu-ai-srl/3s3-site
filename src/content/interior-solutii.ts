// Textele de INTERFATA ale paginilor de solutii, mecanism si securitate.
//
// DE CE EXISTA FISIERUL. Gramatica paginii interioare cere lucruri pe care continutul
// nu le avea: etichetele de navigare in pagina, titluri de grila, textul legaturii,
// titlurile benzilor. Ele nu sunt fapte despre client si nu au ce cauta in `segmente.ts`,
// `mecanism.ts` sau `securitate.ts`, care sunt INGHETATE ca text si ca chei in valul asta.
//
// Aici s-a mutat si proza care statea SCRISA DE MANA in `PaginaDeSegment.tsx` si in cele
// patru pagini: titluri si linii de sectiune, notele de sub liste, paragraful care trimite
// la mecanism. Nu s-a pierdut niciun rand - s-a mutat din componenta in continut, unde se
// citeste intr-un singur loc si nu se duplica de sapte ori.
//
// VOCE REF-A (rescris 2026-09-07): titlul de sectiune e o AFIRMATIE de doua-patru cuvinte,
// cu punct; linia de sub el e o singura propozitie, intre 15 si 35 de cuvinte. Etichetele si
// titlurile de lista au unul pana la patru cuvinte si NU poarta punct - o eticheta cu punct
// e agramata, si a fost defect reparat in S1-a. Adresarea e „dumneavoastra".

/** O fila-pastila de navigare in pagina: eticheta vizibila si ancora catre sectiune. */
export type Ancora = {
  ancora: string;
  eticheta: string;
};

/** Titlul si linia unei sectiuni. Titlul e propozitie, deci are punct; eticheta nu are. */
export type CapSectiune = {
  eticheta: string;
  titlu: string;
  lead?: string;
};

// BANDA DE „HIGHLIGHTS", capul ei. Sta pe ceata, imediat sub erou, pe toate cele
// unsprezece pagini ale feliei, si poarta cele trei fapte care nu tin de domeniu
// (`INDIFERENT_DE_DOMENIU` din segmente.ts) ca trei carduri albe.
//
// TEXTELE NU SUNT NOI. Eticheta si afirmatia sunt chiar cele pe care le purta banda inchisa a
// hub-ului pana la valul asta, iar cele doua legaturi sunt sirurile deja folosite in felie.
// Se scriu o singura data fiindca banda e aceeasi peste tot; pagina alege doar INCOTRO duce
// legatura din dreapta, ca sa nu trimita niciodata catre ea insasi.
export const HIGHLIGHTS = {
  eticheta: "Ce nu se schimbă",
  titlu: "Aceleași reguli peste tot.",
  spreMecanism: { href: "/cum-functioneaza", text: "Vedeți mecanismul întreg" },
  spreDomenii: { href: "/solutii", text: "Vedeți toate domeniile" },
  spreFizica: { href: "/arhivare-fizica", text: "Vedeți partea fizică" },
};

// Cele doua etichete ale unui card de etapa. Erau scrise de mana in `MecanismEtapa.tsx`;
// acelasi card e chemat de trei pagini, deci textul lui sta o singura data, aici.
export const ETAPA = {
  index: "Etapa",
  urma: "Rămâne scris",
};

export const SEGMENT = {
  /** Filele de navigare in pagina. Ordinea lor e ordinea sectiunilor de mai jos. */
  navigare: [
    { ancora: "situatia", eticheta: "Situația" },
    { ancora: "schimbare", eticheta: "Ce se schimbă" },
    { ancora: "dovada", eticheta: "Dovada" },
    { ancora: "temei", eticheta: "Temeiul legal" },
    { ancora: "intrebari", eticheta: "Întrebări" },
  ] as Ancora[],

  situatia: {
    eticheta: "Situația de azi",
    titlu: "Așa arată azi.",
  } as CapSectiune,

  // Invitatia la corectie sta SUB carduri, nu inaintea lor: e o reactie la ce tocmai s-a
  // citit. Textul e cel scris in directia anterioara, mutat aici din componenta.
  situatiaNota:
    "Scriem problema așa cum arată ea dintr-un birou. Dacă nu vă recunoașteți în rândurile de mai sus, spuneți-ne: înseamnă că am înțeles greșit domeniul.",

  schimbare: {
    eticheta: "Ce se schimbă",
    titlu: "Aceleași documente, alt drum.",
    lead: "Pașii serviciului sunt aceiași peste tot. Aici scriem numai ce arată altfel în ziua de lucru a acestui domeniu.",
  } as CapSectiune,

  /** Randul text / fotografie care duce la pagina de mecanism. */
  spreMecanism: {
    eticheta: "Mecanismul",
    titlu: "Etapele sunt aceleași.",
    text: "Fiecare etapă se închide cu documentul ei semnat. Pagina despre mecanism scrie ce trece în grija noastră, ce rămâne la dumneavoastră și ce hârtie vă rămâne după fiecare pas.",
    legatura: { href: "/cum-functioneaza", text: "Vedeți mecanismul întreg" },
  },

  dovada: {
    eticheta: "Dovada",
    lead: "Într-o relație care începe cu predarea unei arhive, afirmația nesusținută costă mai mult decât tăcerea. Punem pe masă prima listă. Pe a doua o scriem tot noi.",
  },

  /** Banda inchisa de sub sectiunea de dovada: ce se poate vedea inainte de semnatura. */
  bandaAratam: {
    eticheta: "Înainte de semnătură",
    titlu: "Le vedeți cu ochii dumneavoastră.",
  },

  listaDeschise: "Ce nu putem susține",

  temei: {
    eticheta: "Temeiul legal",
    titlu: "Actele, numite pe față.",
    lead: "Nu scriem un termen fără să spunem din ce act vine. Unde nu putem cita articolul, rândul rămâne gol și scriem de ce.",
  } as CapSectiune,

  etichetaTermenGol: "Termenul nescris",
  etichetaTermenCerere: "Ce se aplică",

  intrebari: {
    eticheta: "Întrebări",
    lead: "Apar în prima discuție sau în chestionarul de securitate. Le punem primii, ca să nu pierdeți o săptămână pe corespondență.",
  },

  // Eticheta butonului de antet. E scurta DIN MASURATOARE: forma lunga, „Programati o
  // discutie de 30 de minute", are 36 de caractere si se rupe pe doua randuri la 390 px,
  // ducand pastila la doua randuri in loc de unul. Cu textul de mai jos butonul intra pe un
  // rand. Cererea nu se schimba, doar numarul de cuvinte: ora si durata raman scrise in el.
  butonCta: "Discuție de 30 de minute",
};

export const HUB_INTERIOR = {
  grila: {
    eticheta: "Domenii",
    titlu: "Fiecare domeniu, fișa lui.",
  } as CapSectiune,

  /** Textul legaturii din cardul unui domeniu. Chevronul il deseneaza componenta. */
  legaturaFisa: "Vedeți fișa",

  reguliLead:
    "Restul paginii vorbește despre diferențe. Rândurile de aici nu se negociază pe segment, fiindcă țin de felul în care e construit serviciul.",

  onestitate: {
    eticheta: "Ce lipsește dinadins",
    titlu: "Nu scriem asta nicăieri.",
  } as CapSectiune,

  etichetaNota: "Ce nu scriem",

  // Textul blocului de onestitate. Formularea nu se atinge: fiecare afirmatie negativa isi
  // poarta negatia lipita de ea, iar poarta de afirmatii citeste fereastra dinaintea
  // potrivirii. Vechimea si autorizarea se scriu ATRIBUIT catre ADRIA, firma-mama.
  nota: "Nu deținem certificare ISO 27001, nu afișăm sigle de clienți, nu publicăm un număr de firme deservite și nu punem preț pe pagină. 3S este o firmă nouă, crescută din ADRIA Servicii Arhivare SRL, care arhivează documente din 2019. Vechimea și autorizarea sunt ale firmei-mamă și se citesc așa.",

  spreTermene: {
    eticheta: "Termenele",
    titlu: "Termenul legal se verifică.",
    text: "Cât se păstrează fiecare categorie de documente, cu actul normativ din care vine termenul, stă într-o listă pe care o puteți deschide acum.",
    legatura: { href: "/instrumente/termene-de-pastrare", text: "Verificați un termen legal" },
  },

  cta: {
    titlu: "Începem de la arhivă.",
    text: "Treizeci de minute în care ne uităm la ce aveți azi. La final plecați cu o estimare a volumului și cu un calendar de preluare scris, nu cu o ofertă trimisă a doua zi.",
    buton: "Cereți estimarea de volum",
  },

  // Aceeasi eticheta scurta ca pe fisele de domeniu, din acelasi motiv masurat: pe un rand
  // la 390 px, deci buton de 48 px.
  butonCta: "Discuție de 30 de minute",
};

export const MECANISM_INTERIOR = {
  navigare: [
    { ancora: "etape", eticheta: "Cele șase etape" },
    { ancora: "digitalizare", eticheta: "Ce se scanează" },
    { ancora: "cautare", eticheta: "Căutarea" },
    { ancora: "dovada", eticheta: "Dovada" },
    { ancora: "hartia", eticheta: "Întrebări" },
  ] as Ancora[],

  etape: {
    eticheta: "Etapele 1-6",
    titlu: "Șase etape, șase hârtii.",
    lead: "Fiecare etapă se închide cu un document care spune ce s-a mutat, ce s-a numărat și cine răspunde de fondul dumneavoastră. Unde un pas depinde de un aviz străin, scriem asta pe față.",
  } as CapSectiune,

  spreFizica: {
    eticheta: "Partea fizică",
    titlu: "Primele etape cer rafturi.",
    text: "Cum arată depozitul, cum se măsoară un fond în metri liniari și cum se elimină legal ce nu mai trebuie păstrat sunt scrise pe pagina părții fizice.",
    legatura: { href: "/arhivare-fizica", text: "Vedeți partea fizică" },
  },

  digitalizare: {
    eticheta: "Ce se scanează",
    titlu: "Scanăm ce se caută.",
    lead: "Împărțirea de mai jos este punctul de plecare al discuției. Lista finală o hotărâți dumneavoastră și intră în contract înainte să se deschidă prima cutie.",
  } as CapSectiune,

  listaDigitalizat: "Ce intră la scanat",
  listaPeHartie: "Ce rămâne pe hârtie",
  etichetaNotaDigitalizare: "Ce nu propunem",

  cautare: {
    eticheta: "Căutarea",
    titlu: "Întrebare, apoi pagină.",
    lead: "Cinci verigi, în ordine. Dacă una lipsește, lanțul se oprește acolo și nu vedeți un răspuns pe care nu îl putem susține cu un document.",
  } as CapSectiune,

  listaNuFace: "Ce nu face căutarea",

  dovada: {
    eticheta: "Dovada",
    titlu: "Dovada stă la vedere.",
    lead: "Prima listă se poate vedea înainte de semnătură. Pe a doua o scriem tot noi, primii, fiindcă o afirmație nesusținută costă mai mult decât tăcerea.",
  } as CapSectiune,

  bandaAratam: {
    eticheta: "Înainte de semnătură",
    titlu: "Le vedeți cu ochii dumneavoastră.",
  },

  listaDeschise: "Ce nu putem susține",

  hartia: {
    eticheta: "Hârtia",
    titlu: "Întrebările despre hârtie.",
    lead: "Sunt întrebările pe care le pune un serviciu juridic sau un auditor intern. Le punem primii, cu răspunsul scris, ca să nu pierdeți o săptămână pe corespondență.",
  } as CapSectiune,

  butonCta: "Discuție de 30 de minute",
};

export const FIZICA_INTERIOR = {
  navigare: [
    { ancora: "depozit", eticheta: "Depozitul" },
    { ancora: "preluare", eticheta: "Preluarea" },
    { ancora: "inventar", eticheta: "Cuvintele" },
    { ancora: "selectionare", eticheta: "Selecționarea" },
    { ancora: "temei", eticheta: "Temeiul legal" },
  ] as Ancora[],

  depozit: {
    eticheta: "Depozitul",
    titlu: "Hârtia stă la adresă.",
    lead: "Un depozit se judecă după ce se vede la fața locului. Vizita este primul lucru pe care îl propunem, nu ultimul.",
  } as CapSectiune,

  preluare: {
    eticheta: "Preluarea",
    titlu: "Preluarea are patru pași.",
    lead: "Numărătoarea de la început decide tot ce urmează, fiindcă un fond preluat pe ochi se plătește mai târziu, când cineva caută un dosar despre care nimeni nu mai poate spune nimic.",
  } as CapSectiune,

  spreMecanism: {
    eticheta: "Mecanismul",
    titlu: "Partea fizică vine prima.",
    text: "După ce fondul ajunge pe raft cu cotă, urmează ce se scanează, cum se întreabă în română și ce se întâmplă la încheierea contractului. Mecanismul întreg stă pe pagina lui.",
    legatura: { href: "/cum-functioneaza", text: "Vedeți mecanismul complet" },
  },

  inventar: {
    eticheta: "Inventarul",
    titlu: "Cinci cuvinte de știut.",
    lead: "Sunt cuvintele din contract, din procesul-verbal și din discuția cu Arhivele Naționale, scrise aici ca să nu semnați nimic pe baza unei aproximări.",
  } as CapSectiune,

  selectionare: {
    eticheta: "Selecționarea",
    titlu: "Eliminarea are procedură.",
    lead: "Este partea în care o scurtătură costă cel mai mult, fiindcă răspunderea rămâne la instituția care a creat documentele. Ordinea de mai jos nu se schimbă și nu se scurtează.",
  } as CapSectiune,

  etichetaNotaSelectionare: "Fără aviz, nimic",

  temei: {
    eticheta: "Temeiul legal",
    titlu: "Actele, numite pe față.",
    lead: "Nu scriem o obligație fără să spunem din ce act vine. Unde nu putem cita articolul, rândul rămâne gol și scriem de ce.",
  } as CapSectiune,

  etichetaNotaTemei: "Ce nu scriem aici",
  etichetaNotaConsultanta: "Ce nu facem",

  bandaAratam: {
    eticheta: "La o vizită anunțată",
    titlu: "Se vede într-o oră.",
  },

  listaDeschise: "Ce nu putem susține",

  butonCta: "Discuție de 30 de minute",
};

export const SECURITATE_INTERIOR = {
  navigare: [
    { ancora: "depozit", eticheta: "Depozitul" },
    { ancora: "drum", eticheta: "Drumul" },
    { ancora: "acces", eticheta: "Accesul" },
    { ancora: "iesire", eticheta: "Ieșirea" },
    { ancora: "digital", eticheta: "Partea digitală" },
    { ancora: "intrebari", eticheta: "Întrebări deschise" },
  ] as Ancora[],

  depozit: {
    eticheta: "Depozitul",
    titlu: "Puțini ajung la hârtie.",
    lead: "Riscul care mută un dosar din locul lui vine rareori dintr-o rețea, ci dintr-un raft greșit, dintr-o cutie deschisă fără fișă și dintr-o cheie care circulă.",
  } as CapSectiune,

  etichetaNotaDepozit: "Ce nu publicăm, dinadins",

  spreFizica: {
    eticheta: "Depozitul",
    titlu: "Depozitul se vede.",
    text: "Cum arată, cum se măsoară un fond în metri liniari și ce înseamnă cota unei unități arhivistice sunt scrise pe pagina părții fizice, cu tot cu ce vă arătăm la o vizită.",
    legatura: { href: "/arhivare-fizica", text: "Vedeți depozitul și inventarul" },
  },

  drum: {
    eticheta: "Drumul",
    titlu: "Mutarea pierde arhiva.",
    lead: "Un lot împărțit între două curse, o cutie nenumărată, o predare fără hârtie: de aici vin discuțiile de peste un an despre un dosar care lipsește.",
  } as CapSectiune,

  acces: {
    eticheta: "Accesul",
    titlu: "Fiecare vede doar ce îi trebuie.",
    lead: "Un depozit bine păzit din care oricine poate cere orice dosar nu păzește nimic. Regula de acces se scrie nominal, se schimbă în scris și se aplică la fel personalului nostru.",
  } as CapSectiune,

  iesire: {
    eticheta: "Ieșirea",
    titlu: "Plecarea are procedură.",
    lead: "Sunt cele două momente în care un fond poate dispărea legal. Exact ele se scriu înainte: unul ține de contract, celălalt de o comisie și de un aviz străine de noi.",
  } as CapSectiune,

  etichetaNotaIesire: "Temeiul",

  digital: {
    eticheta: "Partea digitală",
    titlu: "Măsurat pe site.",
    lead: "Prima listă se măsoară automat înainte de fiecare publicare. Dacă o verificare se înroșește, versiunea aceea nu ajunge la dumneavoastră.",
  } as CapSectiune,

  listaMasurat: "Măsurat la fiecare publicare",

  bandaNuDetinem: {
    eticheta: "Lista scurtă",
    titlu: "Nu putem dovedi rândurile de mai jos.",
  },

  intrebari: {
    eticheta: "Fără răspuns scris",
    titlu: "Șase întrebări fără răspuns.",
    lead: "Căutarea rulează pe o platformă care nu este scrisă de noi. Despre infrastructura altcuiva nu afirmăm nimic pe baza unei discuții. Întrebările stau aici, formulate ca de un serviciu juridic.",
  } as CapSectiune,

  etichetaNotaDigital: "De ce sunt întrebări",
  etichetaStare: "Stare",

  butonCta: "Discuție de 30 de minute",
};

/** Nota de contact, aceeasi pe paginile feliei. Nu se rescrie de patru ori. */
export const NOTA_CONTACT = {
  inainte: "Scrieți-ne și direct, dacă preferați: ",
  adresa: "contact@3s.ro",
  dupa: ". Nu afișăm număr de telefon: cererile intră prin poșta electronică, ca să rămână o urmă scrisă a cererii dumneavoastră și a răspunsului nostru.",
};
