// Continutul celor doua pagini ale feliei de securitate: `/securitate` si
// `/accesibilitate`.
//
// De ce stau amandoua aici, intr-un singur fisier: sunt doua declaratii despre acelasi
// lucru - ce am masurat si ce nu -, se recitesc impreuna inainte de publicare, iar textul
// e singurul lucru pe care il va parcurge clientul. Forma paginilor sta in `page.tsx`,
// componenta proprie in `src/components/SecuritateIntrebare.tsx`.
//
// REGULA DE CONTINUT A ACESTEI FELII, mai stricta decat pe restul site-ului, si scrisa
// aici fiindca e usor de incalcat din reflex la o pagina de securitate:
//
//   1. ZERO detalii de infrastructura. Nu scriem ce criptare exista, unde stau serverele,
//      ce copii de siguranta se fac, cine are acces administrativ sau ce jurnale raman.
//      Platforma pe care ruleaza cautarea in documente nu e scrisa de noi si nimeni nu
//      ne-a confirmat nimic in scris. O pagina de securitate care insira asemenea
//      detalii pe baza a ce s-a spus intr-o discutie e exact genul de afirmatie care
//      cade la prima intrebare a unui serviciu juridic.
//   2. ZERO certificari. Nu detinem niciuna si nu ne prezentam ca si cum am avea;
//      `poarta-afirmatii.py` masoara asta la fiecare lot.
//   3. Ce NU stim se scrie ca INTREBARE DESCHISA, in pagina, la vedere - nu se omite.
//      Coloana asta e argumentul paginii, nu scuza ei.
//
// Ce PUTEM afirma despre partea digitala e strict ce masoara portile la fiecare lot:
// site-ul acesta nu incarca nimic de la alt domeniu, nu pune cookie-uri, nu scrie in
// memoria browserului si nu are instrument de urmarire (poarta C-01, proba de browser
// `tests/browser/consimtamant.spec.ts`), iar formularul de cerere nu are inca destinatar.
//
// Fiecare afirmatie verificabila de mai jos are o intrare in
// `src/content/afirmatii/securitate.json`, cu stare `neconfirmat`.
//
// VOCE REF-A (rescris 2026-09-07): titlul e o AFIRMATIE de doua-patru cuvinte, cu punct,
// iar sub el sta o propozitie de explicatie, intre 15 si 35 de cuvinte. Nicio afirmatie noua
// despre infrastructura - regula 1 de mai sus s-a aplicat si la rescrierea asta, deci
// scurtarea a taiat cuvinte, niciodata rezerve.

/** Un rand de fisa: intrebarea sau termenul pe stanga, raspunsul pe dreapta. */
export type Fisa = {
  titlu: string;
  text: string;
};

/** O etapa din drumul unui fond, cu documentul care ramane dupa ea. */
export type Etapa = {
  titlu: string;
  text: string;
  /** Urma scrisa. Fara ea, etapa e o promisiune verbala. */
  urma: string;
};

/** O intrebare la care NU avem inca raspuns scris, plus miza ei. */
export type IntrebareDeschisa = {
  intrebare: string;
  deCeConteaza: string;
  /** Starea de azi, scrisa scurt. Se schimba numai cand vine raspunsul, cu sursa. */
  stare: string;
};

// ---------------------------------------------------------------------------
// /securitate
// ---------------------------------------------------------------------------

export const SECURITATE = {
  titluMeta: "Cum sunt protejate documentele",
  descriereMeta:
    "Depozitul și accesul în el, transportul, cotele și inventarul, cine vede ce document și pe ce bază, ieșirea din contract, eliminarea cu aviz.",
  eticheta: "Protecția fondului",
  h1: "Raftul greșit pierde date.",
  // Sub 40 de cuvinte, regula directiei. Ce spunea fraza veche despre cine vede ce document
  // si despre incetarea contractului sta in liniile sectiunilor III si IV, iar impartirea partii
  // digitale in masurat si nemasurat sta in linia sectiunii V. Nimic nu s-a pierdut.
  lead:
    "Lanțul întreg prin care trece un document la noi: depozitul și cine ajunge în el, transportul și predarea, cota după care se cere din raft, ieșirea din contract și, la final, partea digitală.",

  // --- I. depozitul -------------------------------------------------------
  depozit: [
    {
      titlu: "Locul fondului e scris.",
      text: "Fondul fiecărei instituții stă separat. Poziția fiecărei unități intră în evidența depozitului, legată de cota din inventar. Dosarul se găsește după o adresă scrisă.",
    },
    {
      titlu: "Nu se intră neînsoțit.",
      text: "Accesul îl are personalul care lucrează efectiv pe fonduri, iar o vizită se face însoțit și anunțat. Lista persoanelor cu acces se scrie în contract, unde nu îmbătrânește tăcut.",
    },
    {
      titlu: "Fiecare ieșire lasă fișă.",
      text: "Scoaterea unei unități se face pe cotă, cu fișă de ieșire, la fel și pentru personalul nostru. Dacă un dosar lipsește din raft, un rând spune cine l-a luat.",
    },
    {
      titlu: "Condițiile se văd.",
      text: "Temperatură, umiditate, protecție împotriva focului și a apei, rafturile și spațiul de manipulare le vedeți la Golești, în ziua vizitei, așa cum sunt atunci.",
    },
  ] as Fisa[],

  notaDepozit:
    "Nu publicăm planul depozitului, lista persoanelor cu acces și nici descrierea sistemelor de protecție: un document care spune unde sunt punctele slabe ale unui depozit ajută în primul rând pe cine le caută. Le arătăm la vizită și le scriem în contract, unde au și destinatar, și răspundere.",

  // --- II. drumul ---------------------------------------------------------
  drum: [
    {
      titlu: "Numărăm înainte de plecare.",
      text: "Documentele se așază în cutii, se numerotează și se sigilează de față cu persoana pe care o desemnați. Ce lipsește sau e deteriorat se consemnează cât timp lipsa mai poate fi explicată.",
      urma: "Lista cutiilor, cu numerotarea și cu observațiile de stare, anexată la procesul-verbal.",
    },
    {
      titlu: "Semnătura numește custodele.",
      text: "Procesul-verbal de predare-primire spune ce pleacă, în câte cutii, câți metri liniari și pe ce ani. Fără el, o discuție de peste un an despre un dosar lipsă nu are pe ce se sprijini.",
      urma: "Proces-verbal de predare-primire, în două exemplare semnate.",
    },
    {
      titlu: "Transportul îl facem noi.",
      text: "Nu predăm arhiva unui curier și nu împărțim un lot între două curse decât dacă scrie în procesul-verbal, fiindcă un dosar rătăcit nu se mai reface.",
      urma: "Cursa și lotul transportat, notate în procesul-verbal al preluării.",
    },
    {
      titlu: "Originalul revine pe hârtie.",
      text: "Unitatea arhivistică iese pe cotă și se predă cu fișă, cu traseul scris în ambele sensuri. Copia digitală nu înlocuiește originalul acolo unde legea sau instanța cere hârtia.",
      urma: "Fișă de ieșire și, la întoarcere, consemnarea repunerii în raft.",
    },
  ] as Etapa[],

  // --- III. cine vede ce --------------------------------------------------
  acces: [
    {
      titlu: "Lista o faceți dumneavoastră.",
      text: "Cine are voie să ceară documente din fondul dumneavoastră se stabilește nominal și se schimbă tot în scris. La cerere verbală nu adăugăm pe nimeni, oricât de cunoscută ar fi persoana.",
    },
    {
      titlu: "Cererea merge pe fond.",
      text: "Un solicitant vede documentele fondului pentru care este trecut pe listă. Căutarea nu traversează fondurile mai multor clienți: separarea din raft se păstrează și în partea digitală.",
    },
    {
      titlu: "Aceeași regulă la noi.",
      text: "Arhivarul care manipulează fondul lucrează pe cote, cu fișă, și e ținut de o obligație de confidențialitate scrisă. Nu scoate un dosar în afara procedurii fiindcă are cheia depozitului.",
    },
    {
      titlu: "Împuternicirea se semnează.",
      text: "Dosarele de personal, statele de salarii și documentele medicale conțin date personale. Prelucrarea lor se scrie în anexa la contract. Dacă anexa lipsește dintr-o ofertă, cereți-o înainte de semnătură.",
    },
  ] as Fisa[],

  // --- IV. iesirea --------------------------------------------------------
  iesire: [
    {
      titlu: "Fondul se întoarce inventariat.",
      text: "Fondul se restituie pe baza aceluiași inventar cu care a fost preluat, cu proces-verbal. Termenul și cine suportă transportul se scriu în contract înainte de prima cutie ridicată.",
    },
    {
      titlu: "Contractul spune ce rămâne.",
      text: "Ce primiți, în ce format și ce rămâne la noi după încetare se hotărăsc la semnare. O firmă care nu vrea să scrie asta vă spune ceva despre ieșire.",
    },
    {
      titlu: "Comisia dumneavoastră elimină.",
      text: "Documentele care au împlinit termenul se elimină prin comisia de selecționare a instituției dumneavoastră și cu avizul Arhivelor Naționale. Noi pregătim lucrarea și întocmim documentația. Până la aviz nu se elimină nimic.",
    },
    {
      titlu: "Urma rămâne după eliminare.",
      text: "Documentele avizate se scot din evidența fondului și se distrug cu proces-verbal, astfel încât conținutul să nu mai poată fi reconstituit. În evidență rămâne ce s-a eliminat și pe baza cărui aviz.",
    },
  ] as Fisa[],

  notaIesire:
    "Eliminarea fără avizul Arhivelor Naționale încalcă Legea Arhivelor Naționale nr. 16/1996. Răspunderea rămâne a creatorului documentelor. Dacă cineva vă promite eliminare rapidă și fără hârtii, cereți-i să vă arate cu ce document rămâneți în fața unui control.",

  // --- V. partea digitala -------------------------------------------------
  masurat: [
    "Site-ul nu încarcă nimic de la alt domeniu: nici fonturi, nici hărți, nici statistici, nici butoane sociale",
    "Nu pune cookie-uri și nu scrie nimic în memoria locală sau de sesiune a browserului dumneavoastră",
    "Nu există instrument de măsurare a traficului, nici al nostru, nici al altcuiva",
    "Un browser automat deschide fiecare pagină publică înainte de publicare și cere ca listele de cookie-uri, de chei locale și de domenii străine să fie goale, și înainte, și după apăsarea butoanelor",
    "Verificarea are martorii ei: o pagină fabricată cu defectul înăuntru, pe care trebuie să o respingă, și una curată, pe care trebuie să o accepte",
    "Formularul de cerere nu are încă destinatar: ce scrieți rămâne în pagină, nu pleacă niciun mesaj și nu se salvează nimic",
  ],

  intrebariDeschise: [
    {
      intrebare: "Unde stau, fizic, copiile digitale ale documentelor?",
      deCeConteaza:
        "O instituție publică trebuie să știe în ce țară ajung datele înainte de semnătură. Răspunsul intră în anexa de prelucrare, nu într-o discuție.",
      stare: "fără răspuns scris",
    },
    {
      intrebare: "Cum sunt protejate copiile la transport și la păstrare?",
      deCeConteaza:
        "Este prima întrebare a oricărui serviciu juridic. Un răspuns dat din memorie, fără document de la furnizorul platformei, nu rezistă la a doua întrebare.",
      stare: "fără răspuns scris",
    },
    {
      intrebare: "Ce copii de siguranță există, cât se păstrează și a fost probată vreodată o restaurare?",
      deCeConteaza:
        "O copie de siguranță din care nu s-a restaurat niciodată nimic este o presupunere, nu o măsură de protecție.",
      stare: "fără răspuns scris",
    },
    {
      intrebare: "Cine are acces administrativ la platformă și ce jurnal rămâne după fiecare acces?",
      deCeConteaza:
        "În depozit, ce iese din raft lasă o fișă. Despre partea digitală nu putem afirma că are echivalentul ei cât timp nu am văzut cum arată.",
      stare: "fără răspuns scris",
    },
    {
      intrebare: "Ce se întâmplă cu copiile digitale în ziua în care contractul încetează?",
      deCeConteaza:
        "Restituirea hârtiei are proces-verbal. Pentru partea digitală, procedura echivalentă trebuie scrisă înainte, nu descoperită la ieșire.",
      stare: "se scrie în contract, procedura furnizorului nu ne-a fost confirmată",
    },
    {
      intrebare: "A fost supusă platforma unei testări de securitate independente?",
      deCeConteaza:
        "Fără un raport pe care să îl putem arăta, orice afirmație despre rezistența platformei este o părere despre munca altcuiva.",
      stare: "nu avem un raport de arătat",
    },
  ] as IntrebareDeschisa[],

  notaDigital:
    "Sunt scrise ca întrebări fiindcă platforma pe care rulează căutarea nu este scrisă de noi. Despre infrastructura altcuiva nu afirmăm nimic pe baza unei discuții. Le cerem în scris, de la furnizor. Când primim răspunsurile, rândurile trec în coloana măsurată, cu sursa lângă ele.",

  nuDetinem: [
    "Nu deținem nicio certificare de securitate a informației și nu ne prezentăm ca și cum am avea",
    "Nu dăm o cifră de disponibilitate a serviciului: nu am măsurat-o pe un fond real de client",
    "Nu descriem măsuri tehnice ale platformei pe care nu le-am văzut documentate",
    "Nu dăm nicio instituție ca referință pentru felul în care i-am păstrat arhiva, fiindcă 3S este o firmă nouă",
  ],

  incheiere: {
    titlu: "Veniți cu lista dumneavoastră.",
    text: "Aduceți la discuție cerințele de securitate ale instituției, așa cum le formulează serviciul juridic sau auditorul intern. La cele la care avem răspuns răspundem pe loc. La restul spunem de la cine îl cerem.",
  },
};

// ---------------------------------------------------------------------------
// /accesibilitate
// ---------------------------------------------------------------------------
//
// Ce se poate AFIRMA aici e strict ce ruleaza mecanic la fiecare lot, in
// `tests/browser/accesibilitate.spec.ts`, `tests/browser/derapaj.spec.ts` si
// `tests/browser/html-brut.spec.ts`. Ce NU se poate afirma e conformitatea cu un nivel
// WCAG: nimeni nu a facut un audit, iar verificarea automata acopera o parte din
// criterii, nu pe toate. Distinctia asta e continutul paginii, nu o nota de subsol.

export const ACCESIBILITATE = {
  titluMeta: "Declarația de accesibilitate",
  descriereMeta:
    "Ce se măsoară mecanic la fiecare livrare a site-ului, ce nu a fost măsurat niciodată și cum ne semnalați o problemă de accesibilitate pe care ați întâlnit-o.",
  eticheta: "Accesibilitate",
  h1: "Măsurat și nemăsurat.",
  // Sub 40 de cuvinte. Fraza despre felul in care se scriu de obicei declaratiile de
  // accesibilitate sta in linia sectiunii II, unde e chiar argumentul ei, iar cuprinsul
  // paginii il dau titlurile sectiunilor. Nimic nu s-a pierdut.
  lead:
    "Verificările de mai jos rulează automat pe fiecare pagină publică înainte de fiecare publicare. Dacă una se înroșește, versiunea aceea nu ajunge la dumneavoastră.",

  masurat: [
    {
      titlu: "Motorul deschide fiecare pagină.",
      text: "Evaluează regulile de accesibilitate pe care le poate judeca o mașină, cu pragul la zero încălcări serioase sau critice. Ce apare la gravitate mică se tipărește în raport și se citește. Publicarea nu se oprește pentru asta.",
    },
    {
      titlu: "Contrastul trece de 4,5.",
      text: "Aceeași verificare cere cel puțin atât între text și fundal. Culorile au fost alese pornind de la prag. Judecă perechi de culori, așa că textul peste fotografie stă la nemăsurat.",
    },
    {
      titlu: "Nu apare derapaj lateral.",
      text: "Fiecare pagină se deschide la 390 de puncte, lățimea unui telefon obișnuit, și nimic nu are voie să vă oblige să trageți pagina lateral. Verificarea a și schimbat site-ul: bara de sus a rămas cu puține intrări.",
    },
    {
      titlu: "Textul există fără scripturi.",
      text: "Conținutul fiecărei pagini există în documentul livrat de server. Se citește și când scripturile sunt oprite, blocate sau nu se încarcă.",
    },
    {
      titlu: "Săritura la conținut există.",
      text: "Cine navighează de la tastatură sare peste bara de sus. Legătura devine vizibilă în clipa în care ajunge pe ea focalizarea. Automat se verifică doar că ținta ei există pe fiecare pagină publică.",
    },
    {
      titlu: "Fiecare verificare are martori.",
      text: "O pagină fabricată cu defectul înăuntru, pe care trebuie să o respingă, și una corectă, pe care trebuie să o accepte, fiindcă o verificare fără martori care nu găsește nimic dovedește doar că tace.",
    },
  ] as Fisa[],

  neMasurat: [
    "Nu declarăm conformitatea cu un nivel dintr-un standard: nu s-a făcut niciun audit al site-ului, nici de noi, nici de altcineva",
    "Contrastul textului așezat peste fotografie nu e judecat automat: motorul îl marchează drept nesigur, fiindcă nu poate ști ce pixel ajunge sub fiecare literă. Îl măsurăm noi, pe captura paginii, cu literele ascunse. Cifra vine de la noi și nu oprește singură o publicare",
    "Verificarea automată acoperă o parte din criterii, nu pe toate; multe se pot judeca numai de un om",
    "Nu am parcurs site-ul cu un cititor de ecran real, pe tot fluxul. Nu putem spune cum sună",
    "Nu am parcurs site-ul exclusiv de la tastatură, pagină cu pagină, ca probă separată",
    "Nu l-am dat spre încercare niciunei persoane cu dizabilități. Nu avem observații din folosire reală",
    "Nu există versiune în limbaj simplificat, nici variantă audio a textelor",
    "Nu invocăm aici niciun act normativ, fiindcă nu am stabilit care obligații ni se aplică. O trimitere nesigură la o lege e mai rea decât lipsa ei",
  ],

  semnalare: [
    {
      titlu: "Scrieți-ne pe adresă.",
      text: "Cea de pe pagina de contact, fiindcă nu avem încă un formular dedicat semnalărilor de accesibilitate: adresa aceea este citită, un formular fără destinatar nu ar fi.",
    },
    {
      titlu: "Trei detalii ajută.",
      text: "Adresa paginii, ce încercați să faceți acolo și cu ce o citiți, dacă vă este comod să ne spuneți. O propoziție despre ce nu a mers ajută mai mult decât un raport tehnic.",
    },
    {
      titlu: "Reparăm și adăugăm verificarea.",
      text: "Răspundem la mesaj. Dacă problema ține de site o reparăm și, unde se poate, punem o verificare automată care să o prindă dacă revine. Termen nu promitem, fiindcă nu am măsurat unul.",
    },
    {
      titlu: "Spuneți-ne dacă nu ajunge.",
      text: "În același fir, fiindcă nu vă trimitem către o procedură de reclamație pe care nu am pus-o încă la punct, pe un drum care nu duce nicăieri.",
    },
  ] as Fisa[],

  incheiere: {
    titlu: "Declarația urmează măsurătoarea.",
    text: "Rândurile din coloana nemăsurată trec la măsurat în ziua în care apare verificarea care le susține. Dacă întâlniți ceva ce nu funcționează, scrieți-ne: e măsurătoarea pe care nu o putem face singuri.",
  },
};
