// Textele NOI de interfata cerute de gramatica REF-A pe paginile feliei juridice: cele patru
// acte (/termeni, /confidentialitate, /cookies, /accesibilitate), instrumentul de termene,
// harta site-ului si pagina de 404.
//
// DE CE UN FISIER SEPARAT SI NU O ADAUGARE IN `juridic.ts` SAU `termene-extins.ts`. Alea
// poarta CONTINUTUL - clauzele, termenele, actele citate - si sunt inghetate ca text si ca
// chei. Ce se scrie aici nu e continut: sunt etichetele de interfata pe care le cere asezarea
// noua si care nu existau in directia anterioara, fiindca nu existau nici bara locala, nici
// capitolele. Tinute separat, se vede dintr-o privire ce a adaugat valul si ce a mostenit.
//
// VOCEA REF-A. Titlul e o AFIRMATIE de doua-patru cuvinte cu punct, urmata de o singura
// propozitie de explicatie. Litera obisnuita, „dumneavoastra" ca adresare. Eticheta NU are
// punct la final - o eticheta cu punct e agramata. Propozitiile intregi au punct.

/**
 * ANCORELE DIN BARA LOCALA A UNUI ACT, pe `id`-ul sectiunii din `juridic.ts`.
 *
 * DE CE NU SE FOLOSESTE CHIAR TITLUL SECTIUNII, desi el exista si e in continut. Bara locala
 * REF-A e o singura linie de 52 px de la 768 px in sus: componenta poarta `flex-nowrap` si
 * `whitespace-nowrap`, deci ce nu incape nu se rupe pe randul urmator, ci impinge pagina
 * lateral. Titlurile actelor sunt propozitii, iar cele noua ale paginii de termeni insumeaza
 * in jur de 200 de caractere: la 12 px inseamna peste 1200 px numai ancorele, pe o coloana de
 * 1183 px care mai poarta si titlul de 21 px, si pastila.
 *
 * Deci ancora poarta un NUME SCURT, iar propozitia ramane titlul sectiunii, la locul ei, pe
 * pagina. Cheia e `id`-ul sectiunii: cine adauga o sectiune fara eticheta o vede lipsa la
 * proba, nu o descopera pe pagina. Cand eticheta lipseste, bara scrie titlul intreg - o
 * absenta vizibila, nu una tacuta.
 *
 * NUMELE SCURT N-A FOST DE AJUNS, si cifra o spune: cu toate cele noua etichete pe bara,
 * `document.documentElement.scrollWidth` masura 927 px pe /termeni si 993 px pe
 * /confidentialitate la o fereastra de 768 si de 834 px - adica pagina intreaga se trage
 * lateral, nu doar bara. Controlul care inchide cauza: cu bara pe `display:none` scrollWidth
 * cobora la exact 768. Elementul care iesea era pastila „Contact", impinsa de un `ul` de
 * 700 px. Etichetele raman toate scrise aici, fiindca toate se citesc - dar pe BARA urca doar
 * grupele din `GRUPE_ACT`, iar lista intreaga sta sub titlu (`JuridicAncore`).
 *
 * `moldova` e cheie in doua acte (termeni si confidentialitate) si poarta acelasi nume in
 * amandoua, deci o singura intrare o acopera.
 */
export const ANCORE_ACT: Record<string, string> = {
  // Termeni și condiții
  "cine-raspunde": "Cine răspunde",
  "ce-face-site-ul": "Ce face",
  formularul: "Formularul",
  continutul: "Conținutul",
  "ce-va-cerem": "Ce vă cerem",
  raspunderea: "Răspunderea",
  "legea-aplicabila": "Legea",
  moldova: "Moldova",
  schimbari: "Schimbări",
  // Politica de confidențialitate
  "cine-prelucreaza": "Cine prelucrează",
  "ce-date": "Ce date",
  temeiul: "Temeiul",
  "cat-pastram": "Cât păstrăm",
  "cui-le-dam": "Cui le dăm",
  drepturi: "Drepturile",
  automat: "Cine citește",
  limite: "Limitele",
  // Ce stocăm în browser
  "ce-stocam": "Ce stocăm",
  "de-ce-fara-caseta": "Fără casetă",
  "cum-verificam": "Cum verificăm",
  gazduirea: "Găzduirea",
  "daca-adaugam": "Dacă adăugăm",
};

/**
 * GRUPELE care urca pe BARA LOCALA a fiecarui act, pe calea actului, ca `id`-uri de sectiune.
 *
 * Aceeasi parghie pe care felia o foloseste deja pe unealta de termene, unde bara poarta cele
 * PATRU sectiuni ale paginii si cele opt categorii stau in lista de sub ea. Pe acte lipsea, si
 * acolo chiar musca: noua ancore pe un rand de 52 px impingeau pagina la 927 px pe /termeni si
 * la 993 px pe /confidentialitate, la ferestre de 768 si 834 px.
 *
 * PATRU, ca la referinta, si patru masurat: la 768 px randul are 704 px utili, din care titlul
 * actului ia 187-220 px, pastila in jur de 66, iar cele doua spatii dintre grupuri 64 - deci
 * ancorelor le raman in jur de 350 px, adica patru etichete scurte cu spatiile dintre ele.
 *
 * NIMIC NU SE PIERDE, si asta e conditia care face taierea legitima: toate sectiunile raman
 * ancore, in lista de sub titlu, unde fiecare poarta si numele scurt, si propozitia intreaga a
 * titlului. Bara ramane ce e la REF-A - reperele mari ale actului, vizibile tot timpul - iar
 * cuprinsul e cuprins.
 *
 * Cand un act nu e in tabelul asta, bara ii poarta toate sectiunile: un act nou se vede la
 * proba (`tests/felie6-bara-acte.test.ts`), nu se strica tacut.
 */
export const GRUPE_ACT: Record<string, string[]> = {
  "/termeni": ["cine-raspunde", "ce-face-site-ul", "raspunderea", "legea-aplicabila"],
  "/confidentialitate": ["cine-prelucreaza", "ce-date", "temeiul", "drepturi"],
  "/cookies": ["ce-stocam", "de-ce-fara-caseta", "cum-verificam", "gazduirea"],
};

/** Lista de ancore catre toate sectiunile actului, asezata sub titlu. */
export const ANCORE_SECTIUNI = {
  /** Eticheta randului de deasupra listei. Fara punct: e eticheta, nu propozitie. */
  eticheta: "Săriți la o secțiune",
  /** Rezumatul listei pentru cititorul de ecran. */
  descriere:
    "Toate secțiunile actului, în ordinea din pagină. Numele scurt este cel din bara de sus; sub el stă titlul întreg al secțiunii.",
};

/** Bara locala a unui act: numele ei pentru cititorul de ecran si pastila din dreapta. */
export const BARA_ACT = {
  /** Se deosebeste de bara de sus, care poarta numele navigarii principale. */
  eticheta: "Secțiunile actului",
  /** Pastila de 24 px din dreapta barei. Un act nu vinde nimic; drumul lui e contactul. */
  pastila: "Contact",
};

/** Blocul de incheiere al unui act. */
export const INCHEIERE_ACT = {
  /** Titlul randului care spune ce NU i s-a facut textului. Eticheta, deci fara punct. */
  redactare: "Despre textul acesta",
  /** Titlul sectiunii de incheiere, ca h2. Propozitie, deci cu punct. */
  titlu: "Corectăm în text.",
};

/** Bara locala a instrumentului de termene. */
export const BARA_TERMENE = {
  eticheta: "Secțiunile paginii",
  pastila: "Contact",
  /**
   * Cele patru sectiuni ale paginii, in ordinea lor. Ancorele raman cele vechi (`randuri`,
   * `acoperire`, `moldova`, `folosire`): se citeaza in mesaje si nu se redenumesc la o
   * reasezare.
   *
   * Bara poarta SECTIUNILE, nu cele opt categorii, si motivul e acelasi cu al actelor: numele
   * categoriilor sunt lungi, iar opt dintre ele pe o bara de un singur rand depasesc coloana.
   * Categoriile raman ancore, in lista de sub bara, unde au loc sa poarte si termenul, si
   * actul - forma pe care textul din continut o cere explicit.
   */
  ancore: [
    { ancora: "randuri", eticheta: "Rândurile" },
    { ancora: "acoperire", eticheta: "Acoperirea" },
    { ancora: "moldova", eticheta: "Moldova" },
    { ancora: "folosire", eticheta: "Folosirea" },
  ],
};

/**
 * Capitolele instrumentului de termene: eticheta de 24 px deasupra afirmatiei de 80 px, plus
 * titlurile de lista dinauntrul ramei. Toate au venit din `page.tsx`, unde erau scrise in
 * marcaj; aici se citesc odata cu restul textelor de interfata ale feliei.
 */
export const CAPITOLE_TERMENE = {
  randuriEticheta: "Rândurile",
  randuriAfirmatie: "Termenele, pe categorii.",
  acoperireEticheta: "Acoperirea",
  acoperitTitlu: "Ce este acoperit",
  neacoperitTitlu: "Ce nu este acoperit",
  acoperireNotaTitlu: "Ce este pagina aceasta",
  moldovaEticheta: "A doua jurisdicție",
  folosireEticheta: "Folosirea",
  temeiuriTitlu: "Actele pe care le citim",
  folosireNotaTitlu: "Limitele instrumentului",
};

/** Lista de ancore catre cele opt fise, asezata sub bara locala. */
export const ANCORE_TERMENE = {
  eticheta: "Săriți la o categorie",
  /** Rezumatul listei, pentru cititorul de ecran. Nu e tabel: vezi `TermeneCuprins`. */
  descriere:
    "Opt categorii de documente, fiecare cu termenul ei și cu actul din care vine. Numele categoriei duce la fișa întreagă.",
};

/** Bara locala si grupele hartii site-ului. */
export const BARA_HARTA = {
  eticheta: "Grupele hărții",
  pastila: "Contact",
  ancore: [
    { ancora: "pagini", eticheta: "Prezentarea" },
    { ancora: "domenii", eticheta: "Domeniile" },
    { ancora: "instrumente", eticheta: "Instrumentele" },
    { ancora: "juridic", eticheta: "Documentele" },
    { ancora: "sectiuni", eticheta: "Pagina de start" },
  ],
};

/** Randul cu ancorele paginii de start, din harta site-ului. */
export const ANCORE_ACASA = {
  eticheta: "Din pagina de start",
};

/** Bara locala a declaratiei de accesibilitate. */
export const BARA_ACCESIBILITATE = {
  eticheta: "Secțiunile paginii",
  pastila: "Contact",
  ancore: [
    { ancora: "masurat", eticheta: "Ce am măsurat" },
    { ancora: "nemasurat", eticheta: "Ce lipsește" },
    { ancora: "semnalare", eticheta: "Cum ne spuneți" },
  ],
};

/**
 * Capitolele declaratiei de accesibilitate: eticheta de 24 px, afirmatia de 80 px si
 * paragraful de 21 / 29 de sub ea.
 *
 * CE S-A INTAMPLAT CU TITLURILE VECHI DE SECTIUNE. Erau propozitii intregi („Zero încălcări
 * găsite automat nu înseamnă conform.") si stateau pe treapta de 48 px. Afirmatia de capitol e
 * de doua-trei cuvinte, deci propozitiile n-aveau unde sa mai incapa acolo - si nu s-au
 * pierdut: au coborat in paragraful capitolului, care e chiar locul unde REF-A pune propozitia
 * de explicatie. Nimic nu a fost taiat, doar mutat cu un rand mai jos.
 */
export const CAPITOLE_ACCESIBILITATE = {
  masuratEticheta: "Măsurat",
  masuratAfirmatie: "Ce am măsurat.",
  masuratText:
    "Nu sunt intenții și nu au fost făcute o singură dată, la lansare. Rulează înaintea fiecărei publicări, pe fiecare pagină publică.",
  nemasuratEticheta: "Nemăsurat",
  nemasuratAfirmatie: "Ce lipsește.",
  nemasuratText:
    "Zero încălcări găsite automat nu înseamnă conform. Declarațiile de accesibilitate se scriu de obicei ca o promisiune de conformitate; rândurile de mai jos sunt lucrurile pe care o asemenea promisiune le trece sub tăcere, fiindcă niciunul nu arată bine scris pe față.",
  semnalareEticheta: "Semnalarea",
  semnalareAfirmatie: "Cum ne spuneți.",
  semnalareText:
    "Dacă ceva nu funcționează pentru dumneavoastră, spuneți-ne. Partea pe care nu o poate măsura nicio unealtă este dacă pagina se poate folosi. Aceea se află numai de la cine o folosește, deci drumul până la noi este scris aici, pe scurt, și nu trece prin niciun formular care nu are destinatar.",
  /** Titlul listei de verificari care chiar ruleaza. */
  masuratTitlu: "Ce rulează automat, pe fiecare pagină, înainte de fiecare publicare",
  /** Titlul listei de goluri. */
  lipsaTitlu: "Ce nu putem afirma despre site-ul acesta",
  /** Titlul randului cu adresa de contact. */
  adresaTitlu: "Adresa",
};

/**
 * MASURA RANDULUI, ca sir de clasa, intr-un singur loc, si in DOUA trepte - fiindca felia
 * scrie proza la doua marimi si o singura cifra ar fi corecta pentru una si gresita pentru
 * cealalta.
 *
 * Cifrele sunt MASURATE pe pagina construita, cu un `Range` peste fiecare rand vizual, nu
 * derivate din marimea literei. Coloana sectiunilor unui act are 916 px (containerul de 980
 * minus captuseala de 2 x 32), iar pe toata latimea ei randul iesea de 95-103 caractere - fisa
 * cere 60-75 pentru un text care se citeste. Litera are si `letter-spacing` negativ mostenit de
 * pe `body` (-0,022em), deci un caracter costa in jur de 8,9 px la 21 px si 7,5 px la 17 px:
 * de aici cele doua plafoane: 620 px da 70-75 de caractere la 21 px, 505 px da 68-74 la 17 px,
 * amandoua masurate DUPA ce plafonul a fost pus, nu prezise.
 *
 * DE CE IN PIXELI SI NU IN `ch`. Unitatea `ch` e latimea glifei ZERO, printre cele mai late ale
 * fontului, deci raspunde la alta intrebare decat cea pusa. Capcana e masurata pe chiar
 * paginile astea, la un val anterior: plafonul scris `max-w-[74ch]` suna a „74 de caractere pe
 * rand" si masura 98.
 *
 * PLAFONUL E PE PROZA, NU PE CADRU. Titlurile, randurile de definitii si listele de rute iau
 * toata latimea coloanei; altfel coloana ar deveni o panglica ingusta plutind intr-un
 * dreptunghi gol.
 */
export const MASURA_ACT = "max-w-[620px]";

/** Aceeasi masura, pentru proza de 17 px: liste, randuri de definitie, note. */
export const MASURA_LISTA = "max-w-[505px]";

/** Lista lucrurilor care lipsesc: liniuta, nu bifa. */
export const LIPSA = {
  /** Numele listei, cand sectiunea nu il da ea. */
  eticheta: "Ce lipsește",
};

/**
 * Pagina de 404. Textele au venit din `src/app/not-found.tsx` si au fost rescrise in vocea
 * REF-A la valul S2-a: titlul e afirmatie scurta, explicatia o singura propozitie. Cheile si
 * numarul de campuri sunt cele de dinainte, fiindca pagina le citeste pe nume.
 */
export const NEGASITA = {
  eticheta: "Adresă negăsită",
  titlu: "Adresa nu duce nicăieri.",
  text: "Fie a fost scrisă altfel, fie pagina pe care o căutați nu există pe acest site. Mai jos sunt patru drumuri scurte.",
  drumuri: "Drumuri",
  buton: "Înapoi la pagina de start",
};

/**
 * Eticheta butonului primar de pe actele juridice si de pe instrumentul de termene. Aceeasi
 * cu a fiselor de domeniu (`interior-solutii.ts`), si scurta dintr-un motiv masurat, nu de
 * gust: forma lunga se rupea pe doua randuri la 390 si dadea un buton de 72 px pe /termeni,
 * /confidentialitate si /cookies (de doua ori pe fiecare), fata de 48 px cat are butonul
 * peste tot in rest. Masurat la reconcilierea lotului S1-b.
 */
export const BUTON_DISCUTIE = "Discuție de 30 de minute";
