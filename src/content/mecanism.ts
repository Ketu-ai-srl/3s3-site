// Continutul celor doua pagini de mecanism: `/cum-functioneaza` si `/arhivare-fizica`.
//
// De ce sta aici si nu in `page.tsx`, ca la segmente: paginile astea sunt aproape numai
// text, iar textul e singurul lucru pe care il va reciti clientul inainte de publicare.
// Cu proza intr-un fisier de date, runda de editare atinge un singur loc si nu risca sa
// strice structura paginii. Forma paginii sta in `page.tsx`, componentele in
// `src/components/Mecanism*.tsx`.
//
// REGULA DE CONTINUT, aceeasi ca pe pagina de start si pe fisele de domeniu: zero cifre
// pe care nu le putem sustine, zero certificari, zero preturi, zero clienti dati ca
// referinta. Vechimea si autorizarea se scriu ATRIBUIT catre ADRIA Servicii Arhivare SRL,
// firma-mama - regula din `.claude/rules/afirmatii-atribuite.md`, aparata de
// `poarta-afirmatii.py`. Obligatiile legale se scriu cu ACTUL NUMIT; unde nu putem cita
// articolul, se spune pe fata ca nu il citam, exact ca la randul gol din `termene.ts`.
//
// Fiecare afirmatie verificabila de mai jos are o intrare in
// `src/content/afirmatii/mecanism.json`, cu stare `neconfirmat`.
//
// VOCE REF-A (rescris 2026-09-07): titlul unei etape sau al unei fise e o AFIRMATIE de
// doua-patru cuvinte, cu punct; sub ea sta explicatia, o propozitie (doua doar cand altfel
// s-ar pierde un fapt din registrul de afirmatii sau o rezerva legala), intre 15 si 35 de
// cuvinte. Litera obisnuita, fara superlative.
//
// DENUMIRILE DE ACTE din `temeiuri` NU sunt titluri si nu se scurteaza: sunt citari, si se
// scriu intregi ca sa poata fi cautate la sursa. La fel cuvintele din glosar, care sunt
// termeni, nu afirmatii, si nu poarta punct.

/** O etapa din proces: ce se intampla si ce hartie ramane dupa ea. */
export type Etapa = {
  titlu: string;
  text: string;
  /** Urma scrisa care ramane dupa etapa. Fara ea, etapa e o promisiune verbala. */
  urma: string;
};

/** O veriga din lantul intrebare-raspuns. */
export type Veriga = {
  titlu: string;
  text: string;
};

/** Un rand de fisa: o intrebare sau un termen, cu raspunsul lui. */
export type Fisa = {
  titlu: string;
  text: string;
};

// ---------------------------------------------------------------------------
// /cum-functioneaza
// ---------------------------------------------------------------------------

export const CUM_FUNCTIONEAZA = {
  titluMeta: "Cum funcționează, pas cu pas",
  descriereMeta:
    "Preluarea cu proces-verbal, inventarul pe cote, ce se digitalizează și ce nu, căutarea cu pagina citată și ce primiți în ziua în care plecați.",
  eticheta: "Mecanismul serviciului",
  h1: "Cutia pleacă, urma rămâne.",
  // Linia ecranului de deschidere: sub 40 de cuvinte, regula directiei. Ce spunea fraza
  // veche despre incheierea contractului sta in etapa a sasea, iar avertismentul despre
  // avizele care nu sunt ale noastre sta in linia sectiunii I. Nimic nu s-a pierdut.
  lead:
    "Serviciul în ordinea în care se întâmplă: cine ridică arhiva, ce se semnează, ce se scanează, cum se caută și cum vine originalul înapoi pe hârtie.",

  etape: [
    {
      titlu: "Ridicăm arhiva numărată.",
      text: "Venim la sediu, măsurăm fondul în metri liniari, împachetăm și sigilăm cutiile de față cu persoana pe care o desemnați. Transportul îl facem noi.",
      urma: "Proces-verbal de predare-primire, semnat pe loc, cu numărul de cutii, metrii liniari și anii acoperiți.",
    },
    {
      titlu: "Fiecare dosar primește cotă.",
      text: "În depozit fondul se desface pe unități arhivistice, fiecare cu cota ei în inventar, după nomenclatorul instituției dumneavoastră. Când nomenclatorul lipsește, îl întocmim și îl pregătim pentru avizare. Avizul îl dau Arhivele Naționale.",
      urma: "Inventarul pe unități arhivistice, cu cota fiecăreia. O copie rămâne la dumneavoastră, în format editabil.",
    },
    {
      titlu: "Scanăm ce se cere.",
      text: "Lista se face împreună și în scris, înainte de prima cutie deschisă. Scanarea rezistă la recunoașterea automată a textului și se verifică pe diacritice, unde se pierd cele mai multe căutări în română.",
      urma: "Lista de digitalizare, convenită în scris înainte de scanare, cu ordinea loturilor.",
    },
    {
      titlu: "Întrebați, primiți pagina.",
      text: "Fiecare pagină scanată rămâne legată de cota unității din care provine, adică de raftul real. Răspunsul vine cu documentul și pagina. Când răspunsul nu se află în documentele dumneavoastră, primiți exact asta.",
      urma: "Jurnalul căutărilor și al deschiderilor de documente, pus la dispoziția dumneavoastră, inclusiv pentru accesul personalului nostru.",
    },
    {
      titlu: "Originalul vine înapoi.",
      text: "Cereți unitatea pe cotă, o scoatem din raft și o aducem, cu ieșirea și cu întoarcerea consemnate, în termenul scris în contract, nu la latitudinea noastră.",
      urma: "Fișă de ieșire și de retur pe cotă: cine a cerut unitatea, când a plecat din depozit și când s-a întors în raft.",
    },
    {
      titlu: "Plecați cu tot.",
      text: "Fondul fizic se restituie cu proces-verbal și inventar. Cel digital se predă în format deschis, PDF plus index CSV, ca preluarea lui de către altcineva să nu depindă de noi.",
      urma: "Proces-verbal de restituire a fondului fizic, plus arhiva digitală pe suport, în format deschis.",
    },
  ] as Etapa[],

  digitalizat: [
    "Documentele cerute des la ghișeu sau în control, oricât de vechi ar fi",
    "Fondul căutat după mai multe chei deodată: nume, dată, număr de înregistrare",
    "Registrele de intrare și opisurile vechi, din care pornește orice căutare",
    "Documentele fragile, care s-ar deteriora la fiecare manipulare",
  ],

  peHartie: [
    "Fondul necerut de ani buni, unde scanarea costă mai mult decât căutarea",
    "Documentele legate strâns, deteriorate sau în formate care cer alt scaner",
    "Ce urmează la selecționare anul viitor: nu se scanează ce se va elimina",
    "Documentele folosite numai în original, unde o copie nu ajută la nimic",
  ],

  notaDigitalizare:
    "Digitalizarea integrală este varianta cea mai scumpă și rar cea mai utilă. Nu o propunem ca implicit, deși o facem dacă o cereți. Pornim de la ce se caută, restul rămâne pe raft și vine la cerere. Preț pe pagină sau pe metru liniar nu publicăm: ar fi o cifră ruptă de fondul dumneavoastră.",

  lant: [
    {
      titlu: "Întrebați în română.",
      text: "Scrieți cum ați spune unui coleg care cunoaște arhiva: ce autorizație s-a dat pe o stradă, într-un an. Fără cuvinte-cheie și fără o sintaxă pe care trebuie să o învețe cineva de la ghișeu.",
    },
    {
      titlu: "Fondul dumneavoastră, atât.",
      text: "Nu se caută pe internet și nici în fondul altui client. Fondurile rămân separate, iar accesul se dă nominal, pe persoană și pe fond.",
    },
    {
      titlu: "Ies pasajele cu răspunsul.",
      text: "Fiecare fragment vine cu documentul și pagina din care provine. Fără fragmente, pasul următor nu se face deloc.",
    },
    {
      titlu: "Răspunsul vine cu sursa.",
      text: "Se formulează pe fragmentele găsite și se afișează cu documentul și pagina alături. Fără sursă nu se afișează deloc.",
    },
    {
      titlu: "Verificați dumneavoastră.",
      text: "Deschideți documentul la pagina citată și citiți fraza pe care se sprijină răspunsul, adică partea pe care nu v-o cerem pe încredere.",
    },
  ] as Veriga[],

  nuFace: [
    "Nu inventează o cifră sau o dată ca să nu vă lase fără răspuns",
    "Nu caută în afara documentelor pe care ni le-ați dat",
    "Nu ține loc de original acolo unde vi se cere hârtia semnată",
    "Nu decide în locul dumneavoastră ce se păstrează și ce se elimină",
  ],

  hartie: [
    {
      titlu: "Fondul rămâne al dumneavoastră.",
      text: "Noi suntem custode. Custodia se dovedește cu procesul-verbal de preluare și cu inventarul semnat, nu cu o clauză generală în contract.",
    },
    {
      titlu: "Se iese pe cotă.",
      text: "Unitatea iese la cererea unei persoane cu drept de acces pe fondul acela. Ieșirea, întoarcerea și fișa rămân la dosarul fondului. Se vede oricând pe mâna cui a trecut hârtia.",
    },
    {
      titlu: "Copia digitală se șterge.",
      text: "Se predă întâi în format deschis, PDF plus index CSV, apoi se șterge din sistemele noastre la termenul scris în contract, cu confirmare scrisă.",
    },
    {
      titlu: "Lipsa se scrie atunci.",
      text: "Un document lipsă sau deteriorat se consemnează în inventar la preluare, cu trimitere la procesul-verbal, cât timp lipsa mai poate fi explicată de cineva care era acolo.",
    },
  ] as Fisa[],

  aratam: [
    "Depozitul de la Golești, județul Argeș, cu condițiile de păstrare și cu regimul de acces",
    "Procesul-verbal de preluare și inventarul, în forma exactă în care le veți semna",
    "Un răspuns dat pe documente-model, cu documentul și pagina citate",
    "Contractul în limba română, cu anexa de prelucrare a datelor semnată odată cu el",
  ],

  deschise: [
    "Nu deținem certificare ISO 27001 și nu ne prezentăm ca și cum am avea",
    "Nu scriem un timp de răspuns în secunde: nu l-am măsurat pe un fond real de client",
    "Nu publicăm preț, nici pe pagină, nici pe metru liniar",
    "Nu dăm nicio instituție ca referință, fiindcă 3S este o firmă nouă",
    "Nu promitem un termen pentru avizarea nomenclatorului: avizul îl dau Arhivele Naționale",
  ],

  incheiere: {
    titlu: "Discuția nu mută cutii.",
    text: "Treizeci de minute în care ne uităm la arhiva dumneavoastră așa cum arată azi. La final plecați cu estimarea volumului, cu ordinea digitalizării și cu un calendar de preluare scris.",
  },
};

// ---------------------------------------------------------------------------
// /arhivare-fizica
// ---------------------------------------------------------------------------

export const ARHIVARE_FIZICA = {
  titluMeta: "Arhivare fizică și depozitare",
  descriereMeta:
    "Depozitul de la Golești, preluarea cu proces-verbal, inventarul pe cote și selecționarea cu avizul Arhivelor Naționale. Partea care se face cu rafturi.",
  eticheta: "Serviciul de bază",
  h1: "Hârtia cere rafturi.",
  // Sub 40 de cuvinte. Enumerarea din fraza veche - unde stau documentele, in ce conditii,
  // cum se numara, cum se face inventarul, cum se elimina cu avizul cerut de lege - e chiar
  // lista sectiunilor de dedesubt, deci s-a mutat in linia sectiunii I.
  lead:
    "Partea care se face cu mașina, cu rafturi și cu semnături, fără de care căutarea în documente rămâne un ecran pus peste o problemă nerezolvată.",

  depozit: [
    {
      titlu: "Depozitul are adresă.",
      text: "Este la Golești, județul Argeș, lângă Pitești, și este al ADRIA Servicii Arhivare SRL, firma-mamă, care arhivează documente din 2019. Vizita se face înainte de semnătură.",
    },
    {
      titlu: "Condițiile se văd.",
      text: "Temperatură, umiditate, protecție împotriva focului și a apei, rafturi și spațiu de manipulare le vedeți pe teren. Autorizația de funcționare, a firmei-mamă, v-o dăm scanată la cerere.",
    },
    {
      titlu: "Fondurile stau separate.",
      text: "Fondul fiecărei instituții are locul lui în raft, cota lui și inventarul lui, și nu se amestecă nici la depozitare, nici la căutare.",
    },
    {
      titlu: "Fiecare mișcare se consemnează.",
      text: "Intrările în depozit se țin într-o evidență. Scoaterea unei unități arhivistice se face pe cotă, cu fișă de ieșire, la fel și pentru personalul nostru.",
    },
  ] as Fisa[],

  preluare: [
    {
      titlu: "Vedem fondul întâi.",
      text: "Venim la dumneavoastră și ne uităm la ce există: câți metri liniari, în ce stare, ce e legat și ce e vrac. Din vizită iese estimarea.",
      urma: "Notă de evaluare a fondului, cu volumul măsurat și cu ce am găsit deja inventariat.",
    },
    {
      titlu: "Numărăm de față.",
      text: "Documentele se așază în cutii de arhivă, se numerotează și se sigilează în prezența persoanei pe care o desemnați. Ce lipsește sau e deteriorat se scrie în ziua aceea.",
      urma: "Lista cutiilor, cu numerotare și cu observațiile de stare, anexată la procesul-verbal.",
    },
    {
      titlu: "Semnătura dă un custode.",
      text: "Procesul-verbal de predare-primire spune ce pleacă, în câte cutii, câți metri liniari și pe ce ani. Din clipa semnării aveți hârtia care o dovedește.",
      urma: "Proces-verbal de predare-primire, în două exemplare semnate.",
    },
    {
      titlu: "Transportul îl facem noi.",
      text: "La depozit, poziția fiecărei unități intră în evidență, legată de cota din inventar, ca să fie găsită pe cotă și nu din memoria cuiva care poate pleca.",
      urma: "Evidența pozițiilor din depozit, legată de cota din inventar.",
    },
  ] as Etapa[],

  cuvinte: [
    {
      titlu: "Metru liniar",
      text: "Unitatea în care se măsoară un fond: un metru de raft plin, măsurat la fața locului cu ruleta. De aici pornesc și volumul de lucru, și costul.",
    },
    {
      titlu: "Unitate arhivistică",
      text: "Dosarul, registrul sau pachetul care se păstrează ca un întreg, adică cea mai mică bucată care primește cotă și poate ieși singură din depozit.",
    },
    {
      titlu: "Cota",
      text: "Adresa unei unități arhivistice în fond: cu ea cereți hârtia din raft și tot cu ea rămâne legată copia digitală, până la raftul din care vine răspunsul.",
    },
    {
      titlu: "Nomenclatorul arhivistic",
      text: "Lista avizată de Arhivele Naționale care spune ce documente creează instituția, pe ce compartimente și cât se păstrează fiecare categorie. Fără ea, selecționarea nu are pe ce se sprijini.",
    },
    {
      titlu: "Inventarul",
      text: "Lista unităților arhivistice dintr-un fond, cu cota, conținutul pe scurt și anii acoperiți, semnată de dumneavoastră la preluare și primită înapoi la restituire.",
    },
  ] as Fisa[],

  selectionare: [
    {
      titlu: "Comisia dumneavoastră decide.",
      text: "Noi pregătim lucrarea: grupăm documentele pe termene, scoatem ce a împlinit termenul de păstrare și întocmim documentația. Decizia rămâne unde o pune legea.",
    },
    {
      titlu: "Comisia semnează procesul-verbal.",
      text: "Se semnează împreună cu inventarele documentelor propuse spre eliminare. Acesta este documentul pe care îl arătați la un control, nu o adresă de la firma de arhivare.",
    },
    {
      titlu: "Avizează Arhivele Naționale.",
      text: "Avizul vine prin structura teritorială competentă și până la el nu se elimină nimic. Termenul de răspuns nu depinde de noi și nu îl scriem nicăieri.",
    },
    {
      titlu: "Distrugerea lasă urmă.",
      text: "Documentele avizate se scot din evidența fondului și se distrug astfel încât conținutul să nu mai poată fi reconstituit, cu proces-verbal de eliminare.",
    },
  ] as Fisa[],

  notaSelectionare:
    "Eliminarea fără avizul Arhivelor Naționale încalcă Legea Arhivelor Naționale nr. 16/1996. Răspunderea rămâne a creatorului documentelor, adică a dumneavoastră. Cine vă promite eliminare rapidă și fără hârtii are de arătat cu ce document rămâneți în fața controlului.",

  temeiuri: [
    {
      titlu: "Legea Arhivelor Naționale nr. 16/1996",
      text: "Obligațiile creatorilor și deținătorilor de documente: evidența celor create și primite, gruparea pe termene într-un nomenclator avizat, condițiile de păstrare, selecționarea numai prin comisie și cu aviz.",
    },
    {
      titlu: "Instrucțiunile privind activitatea de arhivă la creatorii și deținătorii de documente, aprobate prin Ordinul de zi nr. 217/1996 al Arhivelor Naționale",
      text: "Partea practică a aceleiași obligații: cum se întocmește nomenclatorul, cum se constituie unitățile arhivistice, ce cuprinde inventarul, cum lucrează comisia și ce cere spațiul de depozitare.",
    },
    {
      titlu: "Regulamentul (UE) 2016/679, cu legislația română de aplicare",
      text: "Dosarele de personal, statele de salarii și documentele medicale conțin date cu caracter personal. Prelucrarea lor de către noi, ca persoană împuternicită, se scrie în anexa la contract.",
    },
  ] as Fisa[],

  // Doua note, nu una: criticul valului S2-b a masurat 89 de cuvinte intr-un singur paragraf pe
  // /arhivare-fizica, peste pragul de 60 fara pauza vizuala; textul e taiat la granita celor doua
  // miscari (de unde vin numerele / ce nu facem), fara niciun cuvant schimbat.
  notaTemei:
    "Actele de mai sus sunt numite ca să le puteți citi la sursă. Numerele de articol au fost culese odată cu termenele, din actele citate pe fiecare rând, și nu au fost recitite la sursă în ziua în care s-a scris pagina; un arhivist autorizat le confirmă înainte de publicare.",
  notaConsultanta:
    "Nu dăm consultanță juridică: termenul care vă obligă este cel din nomenclatorul propriu, avizat. Legea specifică domeniului dumneavoastră are prioritate față de regula generală. Dacă o cunoașteți și lipsește de aici, scrieți-ne și o adăugăm cu trimiterea la act.",

  aratam: [
    "Depozitul, rafturile și spațiul de manipulare, la o vizită anunțată din timp",
    "Condițiile de temperatură, umiditate și protecție, așa cum sunt în ziua vizitei",
    "Cutiile, etichetele și felul în care arată o cotă pe raft",
    "Modelele de proces-verbal și de inventar pe care urmează să le semnați",
    "Autorizația de funcționare a depozitului, care este a firmei-mamă",
  ],

  deschise: [
    "Nu deținem certificare ISO 27001 și nu ne prezentăm ca și cum am avea",
    "Nu publicăm capacitatea liberă a depozitului: se schimbă de la lună la lună și v-o spunem la discuție, pentru ziua aceea",
    "Nu publicăm preț pe metru liniar",
    "Nu dăm nicio instituție ca referință, fiindcă 3S este o firmă nouă",
    "Nu promitem termene pentru avizele care se dau de Arhivele Naționale",
  ],

  incheiere: {
    titlu: "Începem cu o măsurătoare.",
    text: "Venim și măsurăm fondul în metri liniari. Din vizită ies estimarea volumului, ordinea de preluare a loturilor și un calendar scris. Dacă vă este mai bine cu arhiva la dumneavoastră, o spunem.",
  },
};
