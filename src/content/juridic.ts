// Textele juridice ale site-ului, intr-un singur loc.
//
// DE CE STAU AICI SI NU IN PAGINI. Un text juridic se reciteste, se compara intre versiuni
// si se corecteaza de cineva care nu vrea sa deschida JSX. Tinut in `page.tsx`, s-ar fi
// amestecat cu marcajul, iar o corectura de fond ar fi cerut atingerea unei rute. Asa,
// paginile sunt trei fisiere de douazeci de randuri, iar continutul se revizuieste aici.
//
// O SINGURA JURISDICTIE PE PAGINA, CU O SECTIUNE PENTRU MOLDOVA. Alegerea e scrisa aici
// fiindca e o decizie, nu o comoditate:
//   - 3S e o singura persoana juridica, in curs de infiintare, FARA sediu sau reprezentant
//     in Republica Moldova. Doua seturi de pagini, `/termeni` si `/md/termeni`, ar sugera
//     o prezenta locala pe care nu o avem - adica exact clasa de afirmatie pe care restul
//     site-ului o refuza;
//   - Legea nr. 195/2024 a Republicii Moldova e aliniata la Regulamentul (UE) 2016/679,
//     deci fondul descrierii e acelasi. Ce difera e actul citat si autoritatea la care se
//     face plangere, adica exact cat incape intr-o sectiune;
//   - doua texte aproape identice diverg la prima corectura facuta intr-unul singur.
//     Un singur text cu o sectiune de diferente nu are cum sa se contrazica cu el insusi.
// Daca 3S deschide vreodata sediu in Moldova, decizia se reia: atunci exista doua entitati
// de identificat, iar `config/entitate.md.json` devine necesar.
//
// CE ACTE SE CITEAZA, si de unde vine fiecare citare. Actele se numesc complet, ca sa poata
// fi cautate la sursa, dar NU se pun legaturi catre texte externe: o legatura catre un act
// e utila doar daca a fost deschisa si verificata, iar o adresa scrisa din memorie e chiar
// clasa de defect pentru care exista poarta L-09. Cine vrea textul il gaseste dupa denumire.
//
// CE NU SCRIEM AICI: nu inventam date de inmatriculare si nu folosim datele firmei-mama
// ADRIA Servicii Arhivare SRL ca si cum ar fi ale 3S. Blocul de identificare se randeaza
// din `src/content/entitate.ts` numai cand datele exista; pana atunci, sectiunea spune in
// proza ce lipseste si de ce. Poarta juridica ramane pe AVERT L-01 la staging si OPRESTE la
// productie, si asta e corect: site-ul nu are voie sa fie publicat cu identitatea pe jumatate.
//
// VOCE REF-A (rescris 2026-09-07): titlul de sectiune e o AFIRMATIE de doua-patru cuvinte, cu
// punct, iar antetul paginii are un h1 la fel de scurt si o singura propozitie de introducere.
//
// CE NU S-A ATINS, si de ce. Denumirile actelor, numerele de articol, temeiurile, ancorele
// (`id`) si CLAUZELE insele. Ele sunt citari si obligatii, nu stil: o clauza scurtata isi
// schimba intelesul, si atunci scurtarea n-ar mai fi o schimbare de voce, ci una de fond.
// Regula valului a fost deci: se scurteaza ANTETUL si TITLURILE, nu textul care obliga.

/** O bucata de text: sir simplu sau legatura interna. */
export type Frag = string | { href: string; text: string };

/**
 * Blocurile din care se compune o sectiune.
 *
 * Lista e scurta dinadins. Un text juridic are nevoie de paragraf, de enumerare, de rand
 * cu termen si explicatie, si de doua feluri de caseta: una care declara ceva si una care
 * recunoaste o limita. Al cincilea fel de bloc ar fi inceputul unui editor.
 */
export type Bloc =
  | { fel: "paragraf"; text: Frag[] }
  | { fel: "lista"; elemente: Frag[][] }
  | { fel: "randuri"; randuri: { titlu: string; text: Frag[] }[] }
  | { fel: "declaratie"; eticheta: string; text: Frag[] }
  | { fel: "limite"; eticheta: string; text: Frag[] }
  /** Blocul de identificare a comerciantului. Se randeaza din `entitate.ts`, nu de aici. */
  | { fel: "identificare" };

export type Sectiune = {
  /** Ancora sectiunii. Apare in cuprins si in bara de adrese, deci se scrie citibil. */
  id: string;
  titlu: string;
  blocuri: Bloc[];
};

export type PaginaJuridica = {
  cale: string;
  titluMeta: string;
  descriereMeta: string;
  eticheta: string;
  h1: string;
  lead: string;
  /** A doua legatura din antet. Prima e mereu discutia de treizeci de minute. */
  secundar: { href: string; text: string };
  sectiuni: Sectiune[];
  /** Randul de inchidere: cand a fost redactat textul si ce nu i s-a facut inca. */
  redactat: string;
};

/**
 * Data la care au fost scrise textele de mai jos.
 *
 * Se scrie langa VERBUL care spune ce s-a facut atunci - "redactat la" - nu ca sigiliu de
 * felul "pagina verificata la". Un sigiliu de verificare fara cine si contra a ce e o
 * afirmatie despre propria noastra rigoare, iar poarta de afirmatii il prinde pe drept.
 */
const REDACTAT = "5 septembrie 2026";

const NEREVIZUIT_DE_AVOCAT =
  "Textele de pe pagina aceasta au fost redactate de echipa proiectului la " +
  REDACTAT +
  " și nu au trecut printr-o revizuire de avocat. Le publicăm așa, cu mențiunea scrisă, " +
  "fiindcă un text juridic copiat dintr-un șablon ar fi arătat mai sigur și ar fi spus mai puțin.";

// ---------------------------------------------------------------------------------------
// Termeni și condiții
// ---------------------------------------------------------------------------------------

export const TERMENI: PaginaJuridica = {
  cale: "/termeni",
  titluMeta: "Termeni și condiții",
  descriereMeta:
    "Cine răspunde de site-ul 3S, ce face el azi și ce nu face. Firma este în curs de înființare și textul spune asta deschis.",
  eticheta: "Cadrul juridic",
  h1: "Site-ul prezintă, contractul obligă.",
  lead:
    "Pagina spune cine este în spatele site-ului, ce faceți aici azi și ce nu se poate face, inclusiv datele cerute de lege care încă nu există, fiindcă firma este în curs de înființare.",
  secundar: { href: "/confidentialitate", text: "Citiți politica de confidențialitate" },
  redactat: NEREVIZUIT_DE_AVOCAT,
  sectiuni: [
    {
      id: "cine-raspunde",
      titlu: "Răspunderea pentru site.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "Legea nr. 365/2002 privind comerțul electronic, republicată, cere la art. 5 alin. (1) lit. a)-e) ca orice furnizor de servicii ale societății informaționale să pună la dispoziția publicului, direct și permanent, denumirea, sediul, datele de contact, datele din registrul comerțului și codul de identificare fiscală.",
          ],
        },
        { fel: "identificare" },
        {
          fel: "paragraf",
          text: [
            "Arhivarea din spatele proiectului este a firmei-mamă, ADRIA Servicii Arhivare SRL, din Golești, județul Argeș, care arhivează documente din 2019. Datele ei de identificare nu sunt scrise aici ca și cum ar fi ale 3S: sunt ale unei alte persoane juridice. O afirmație despre altcineva nu ține locul unei afirmații despre noi.",
          ],
        },
      ],
    },
    {
      id: "ce-face-site-ul",
      titlu: "Site-ul face puține lucruri.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "Site-ul prezintă serviciile de arhivare, digitalizare și căutare în documente și primește cereri de discuție. Atât. Ca să nu rămână loc de interpretare, scriem și lista a ceea ce nu se întâmplă aici:",
          ],
        },
        {
          fel: "lista",
          elemente: [
            ["nu se încheie contracte prin site și nu există un buton care să genereze o comandă;"],
            ["nu se vinde nimic online, nu se afișează prețuri și nu se procesează plăți;"],
            ["nu există cont de utilizator, autentificare sau zonă privată;"],
            [
              "nu se încarcă documente. Formularul are câmpuri de text, nu atașamente. Arhiva se preia fizic, cu proces-verbal, nu prin site;",
            ],
            [
              "nu se pune nimic în browserul dumneavoastră. Detaliile stau pe pagina ",
              { href: "/cookies", text: "despre ce stocăm în browser" },
              ".",
            ],
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Din listă decurge o consecință practică: prin site nu se încheie niciun contract la distanță cu un consumator. Site-ul nu are atașat niciun mecanism de reclamație specific vânzării online. Nemulțumirile legate de site sau de textele lui se trimit la contact@3s.ro și primesc răspuns scris.",
          ],
        },
      ],
    },
    {
      id: "formularul",
      titlu: "Formularul nu trimite încă.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "Cererea rămâne în pagină, se afișează o confirmare, și atât: nu pleacă niciun mesaj, nu se salvează nimic și nimeni nu primește o notificare. Nu este o formulare de precauție, este starea reală a site-ului azi.",
          ],
        },
        {
          fel: "declaratie",
          eticheta: "De ce scrie aici",
          text: [
            "Un formular care pare că trimite și nu trimite este cea mai ieftină cale de a pierde încrederea cuiva care chiar avea nevoie de un răspuns. Până când cererea ajunge la un om, scrie în trei locuri că nu ajunge: în confirmarea din pagină, aici și în ",
            { href: "/confidentialitate", text: "politica de confidențialitate" },
            ".",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Calea care funcționează este poșta electronică: contact@3s.ro. Când formularul va livra cererile, textul acesta se schimbă în aceeași zi, împreună cu descrierea prelucrării datelor.",
          ],
        },
      ],
    },
    {
      id: "continutul",
      titlu: "Textele sunt ale noastre.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "Textele, structura paginilor și forma vizuală a site-ului sunt lucrarea noastră. Citați din ele, cu indicarea sursei și cu legătură către pagina din care ați citat. Preluarea integrală a unei pagini, republicarea ei sub altă semnătură sau folosirea textelor într-un material comercial al altcuiva se fac numai cu acordul nostru scris.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Denumirea 3S și formula Scan · Store · Solve sunt folosite de noi ca semne ale proiectului. Nu afirmăm aici că ar fi mărci înregistrate.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Denumirile actelor normative, ale instituțiilor și ale altor firme apar în pagini ca informație, nu ca sugestie de asociere sau de recomandare din partea lor.",
          ],
        },
      ],
    },
    {
      id: "ce-va-cerem",
      titlu: "Vă cerem grijă la ce trimiteți.",
      blocuri: [
        {
          fel: "lista",
          elemente: [
            [
              "Nu trimiteți prin formular date personale ale altor oameni. Descrieți situația arhivei dumneavoastră în cuvinte, nu cu exemple de documente reale.",
            ],
            [
              "Nu trimiteți prin formular date sensibile: stare de sănătate, apartenență sindicală, date judiciare. Dacă discuția are nevoie de ele, se poartă pe un canal potrivit, cu un acord scris în prealabil.",
            ],
            [
              "Nu încercați să obțineți acces la părți neexpuse ale site-ului, să îl testați automat sau să îl supraîncărcați. Dacă ați găsit o slăbiciune, scrieți-ne la contact@3s.ro: răspundem și mulțumim.",
            ],
          ],
        },
      ],
    },
    {
      id: "raspunderea",
      titlu: "Contractul obligă, nu pagina.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "Termenele legale, obligațiile de arhivare și trimiterile la acte normative de pe site sunt informație redacțională. Sunt preluate din actele citate și scrise ca să fie de folos. Nu sunt consultanță juridică și nu înlocuiesc citirea actului, avizul unui avocat sau avizul unui arhivist autorizat.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Regula pe care am ales-o pentru tot site-ul: unde nu putem cita articolul, rândul rămâne gol și scriem de ce, în loc să punem o cifră care sună bine. O găsiți aplicată și pe ",
            { href: "/solutii/notari", text: "pagina pentru birouri notariale" },
            ", la secțiunea de temei legal.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Obligațiile noastre față de o arhivă preluată nu se nasc din site. Se nasc din contractul semnat cu dumneavoastră, împreună cu procesul-verbal de predare-primire și cu inventarul.",
          ],
        },
      ],
    },
    {
      id: "legea-aplicabila",
      titlu: "Legea și limba, române.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "Site-ul, textele lui și relația care începe dintr-o cerere trimisă de aici sunt guvernate de legea română. Comunicăm și încheiem contractul în română. Litigiile care nu se rezolvă prin corespondență revin instanțelor competente de la sediul nostru, după înmatriculare.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Prima cale rămâne cea directă: scrieți-ne la contact@3s.ro și răspundem în scris, ca să rămână o urmă a cererii dumneavoastră și a răspunsului nostru.",
          ],
        },
      ],
    },
    {
      id: "moldova",
      titlu: "Fără sediu în Moldova.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "Este o singură firmă, în curs de înființare în România, fără sediu, sucursală sau reprezentant acolo. De aceea nu veți găsi aici un set separat de pagini pentru Moldova: ar sugera o prezență locală pe care nu o avem.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Ce se schimbă pentru un vizitator din Republica Moldova ține de prelucrarea datelor. Diferența este scrisă în ",
            { href: "/confidentialitate#moldova", text: "secțiunea despre Moldova din politica de confidențialitate" },
            ". Contracte prin site nu se încheie nici într-o țară, nici în cealaltă.",
          ],
        },
      ],
    },
    {
      id: "schimbari",
      titlu: "Textul urmează site-ul.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "Nu după un calendar. Trei momente sunt deja programate: înmatricularea firmei, care completează datele de identificare; legarea formularului la un destinatar real; și apariția oricărui serviciu al altcuiva în pagini, dacă se va întâmpla vreodată.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Versiunea publicată este cea pe care o citiți acum. Nu păstrăm încă un istoric public al versiunilor; când textul va conta pentru un contract în derulare, îl vom păstra.",
          ],
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------------------
// Politica de confidențialitate
// ---------------------------------------------------------------------------------------
//
// ATENTIE LA UN TIPAR MECANIC, si la felul in care se descrie. Poarta juridica (codul L-10)
// vaneaza o formulare devenita falsa: afisarea unei inregistrari la registrul desfiintat al
// entitatilor care decid scopul prelucrarii datelor. Tiparul ei prinde un cuvant din familia
// care denumeste un contor, urmat indeaproape de termenul care numeste acele entitati.
// Textul de mai jos foloseste des al doilea termen, in sensul din Regulament, deci evita
// deliberat intreaga familie a primului.
//
// Nota nu scrie cele doua cuvinte pe litere, si nici alaturi. Prima versiune le scria, ca sa
// explice mecanismul, iar poarta a oprit lotul pe ea: o explicatie care CITEAZA tiparul devine
// o instanta a lui. Masurat, nu presupus - doua opriri, una aici si una in componenta.
//
// Blocul de identificare poarta o eticheta din familia interzisa, deci sta pe pagina de
// termeni, unde al doilea termen nu apare deloc; aici se trimite la el prin legatura.

export const CONFIDENTIALITATE: PaginaJuridica = {
  cale: "/confidentialitate",
  titluMeta: "Politica de confidențialitate",
  descriereMeta:
    "Ce date primim prin formular, în ce temei le folosim și cât le păstrăm. Azi nu avem urmărire, terți sau destinatar pentru cereri.",
  eticheta: "Prelucrarea datelor",
  h1: "Datele care ajung la noi.",
  lead:
    "Politica este scrisă pe ce se întâmplă azi: site-ul nu are urmărire, nu încarcă nimic de la altcineva și nu are încă un destinatar pentru cererile din formular.",
  secundar: { href: "/cookies", text: "Vedeți ce stocăm în browser" },
  redactat: NEREVIZUIT_DE_AVOCAT,
  sectiuni: [
    {
      id: "cine-prelucreaza",
      titlu: "Datele le prelucrăm noi.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "Operatorul este 3S, proiectul de arhivare descris pe acest site, aflat în curs de înființare. Datele de identificare cerute de lege sunt scrise, în măsura în care există azi, în ",
            { href: "/termeni#cine-raspunde", text: "prima secțiune din termeni și condiții" },
            ". Până la înmatriculare, adresa la care ajungeți sigur la un om este contact@3s.ro.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Nu am desemnat un responsabil cu protecția datelor. Cererile privind datele dumneavoastră ajung la aceeași adresă de poștă electronică și primesc răspuns scris. Când 3S va prelucra efectiv arhive ale clienților, obligația de a desemna un responsabil se reevaluează. Rândul acesta se rescrie atunci.",
          ],
        },
      ],
    },
    {
      id: "ce-date",
      titlu: "De unde vin datele.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "Din formularul de cerere de discuție, atunci când îl completați: numele și prenumele, instituția sau firma, adresa de poștă electronică, felul organizației ales din listă și textul liber în care descrieți ce vă apasă în arhivă.",
          ],
        },
        {
          fel: "declaratie",
          eticheta: "Ce se întâmplă azi",
          text: [
            "Nimic. Formularul nu are încă un destinatar: cererea rămâne în pagina deschisă de dumneavoastră, se afișează o confirmare, nu pleacă niciun mesaj și nu se scrie nimic nicăieri. Când legăm formularul la un destinatar real, secțiunile de mai jos se completează cu termenele efective. Schimbarea se vede în pagină.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "În afara formularului, site-ul nu vă cere nimic: nu are cont, nu are abonare la buletin informativ și nu are chat. Dacă ne scrieți direct, la noi ajung mesajul dumneavoastră și adresa de pe care l-ați trimis.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Serverul care servește paginile păstrează jurnale tehnice ale cererilor, așa cum face orice server web: adresa IP, momentul cererii, pagina cerută și tipul de browser. Nu construim profiluri din ele, nu le legăm de datele din formular și nu le folosim pentru marketing.",
          ],
        },
        {
          fel: "limite",
          eticheta: "Jurnalele găzduirii",
          text: [
            "Nu am inventariat jurnalele furnizorului de găzduire. Nu vă putem spune azi cât timp le păstrează el și cine are acces la ele. Preferăm rândul acesta unei durate scrise din presupunere. Se completează odată cu legarea formularului, cu cifra reală.",
          ],
        },
      ],
    },
    {
      id: "temeiul",
      titlu: "Scopul și temeiul.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "Scopul este unul singur: să vă răspundem la cererea de discuție și să pregătim, dacă vreți, o colaborare. Temeiul este art. 6 alin. (1) lit. b) din Regulamentul (UE) 2016/679, care acoperă prelucrarea necesară pentru executarea unui contract sau pentru demersuri precontractuale făcute la cererea persoanei vizate.",
          ],
        },
        {
          fel: "declaratie",
          eticheta: "De ce fără acord",
          text: [
            "Nu bifați nicio căsuță și nu vă cerem consimțământul, fiindcă nu acesta este temeiul potrivit aici. Cereți o discuție. Răspunsul la cererea dumneavoastră este chiar motivul pentru care avem nevoie de datele din formular: sunt demersuri precontractuale, la inițiativa dumneavoastră. Un temei declarat greșit nu este o scăpare de redactare, ci o eroare de fond, fiindcă schimbă drepturile pe care le aveți mai departe.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Nu folosim datele din formular pentru marketing, nu vă înscriem într-o listă de corespondență și nu le dăm mai departe pentru ca altcineva să vă contacteze. Dacă vom trimite vreodată un material comercial, va fi pe alt temei, cu acordul dumneavoastră cerut separat și cu posibilitatea de a-l retrage.",
          ],
        },
      ],
    },
    {
      id: "cat-pastram",
      titlu: "Nu le păstrăm încă.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "Azi, deloc: nu există stocare, fiindcă formularul nu livrează cererea nicăieri. Nu avem o bază de date de contacte, un instrument de vânzări sau un dosar de cereri.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Când formularul va livra, regula pe care o vom scrie aici este: cererile fără urmare se șterg după o perioadă scurtă. Cele care duc la o ofertă sau la un contract se păstrează cât cere relația și cât cer obligațiile legale de evidență. Rândul rămâne fără cifră până când cifra este decisă și poate fi respectată.",
          ],
        },
      ],
    },
    {
      id: "cui-le-dam",
      titlu: "Nu ajung la nimeni.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "Azi, nimănui. Site-ul nu încarcă niciun serviciu al altcuiva, nu are instrument de măsurare a traficului, nu are hărți, filme sau butoane de rețele sociale integrate. Fonturile sunt aduse la construirea site-ului și servite de pe domeniul nostru. Browserul dumneavoastră nu cere nimic de la altcineva.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Furnizorul de găzduire vede cererile către server, prin natura serviciului. Când formularul va livra cereri, el devine împuternicit al nostru pentru prelucrarea acelor date. Contractul care reglementează asta se încheie înainte de prima cerere livrată, nu după.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Nu am pus în funcțiune niciun furnizor din afara Spațiului Economic European și nu trimitem date nicăieri. Nu am verificat încă unde se află fizic serverul care servește paginile. O aflăm înainte ca formularul să livreze prima cerere. Dacă răspunsul cere garanții pentru un transfer, ele se scriu aici înainte, nu după.",
          ],
        },
      ],
    },
    {
      id: "drepturi",
      titlu: "Drepturile dumneavoastră.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "Regulamentul (UE) 2016/679 vă dă următoarele drepturi față de operator. Le scriem cu articolul lângă fiecare, ca să le puteți verifica la sursă:",
          ],
        },
        {
          fel: "randuri",
          randuri: [
            {
              titlu: "Acces, art. 15",
              text: ["Să aflați dacă prelucrăm date despre dumneavoastră, care sunt și ce facem cu ele."],
            },
            {
              titlu: "Rectificare, art. 16",
              text: ["Să corectăm o dată inexactă sau să completăm una incompletă."],
            },
            {
              titlu: "Ștergere, art. 17",
              text: ["Să ștergem datele, în cazurile prevăzute de Regulament."],
            },
            {
              titlu: "Restricționare, art. 18",
              text: ["Să oprim prelucrarea, păstrând datele, cât timp se lămurește o contestație."],
            },
            {
              titlu: "Portabilitate, art. 20",
              text: ["Să primiți datele într-un format citibil de o mașină sau să le trimitem altcuiva."],
            },
            {
              titlu: "Opoziție, art. 21",
              text: ["Să vă opuneți prelucrării, în cazurile în care Regulamentul o permite."],
            },
            {
              titlu: "Plângere, art. 77",
              text: ["Să vă adresați autorității de supraveghere, fără să treceți întâi pe la noi."],
            },
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Cererile se trimit la contact@3s.ro și primesc răspuns în cel mult o lună, termenul prevăzut la art. 12 din Regulament. Dacă cererea este complicată și avem nevoie de mai mult, vă spunem în interiorul lunii de ce și cât.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Autoritatea de supraveghere la care puteți face plângere este, în România, Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal. În Republica Moldova este autoritatea de supraveghere prevăzută de Legea nr. 195/2024.",
          ],
        },
        {
          fel: "limite",
          eticheta: "Ce înseamnă azi",
          text: [
            "Azi nu avem ce să vă arătăm, să corectăm sau să ștergem, fiindcă nu stocăm nimic. Le scriem acum fiindcă vor avea obiect din ziua în care formularul livrează prima cerere. Politica trebuie să fie deja scrisă atunci, nu după.",
          ],
        },
      ],
    },
    {
      id: "automat",
      titlu: "Un om citește cererea.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "Nu luăm decizii automate cu efecte asupra dumneavoastră și nu facem profilare.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Serviciul de căutare pe care îl construim lucrează pe documentele clientului, în fondul lui, nu pe datele din formular. Documentele clienților nu sunt folosite pentru antrenarea vreunui model de limbaj. Afirmația aceasta stă și în contract, nu doar pe site.",
          ],
        },
      ],
    },
    {
      id: "moldova",
      titlu: "Moldova, alt act citat.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "Acolo, prelucrarea datelor cu caracter personal este reglementată de Legea nr. 195/2024 privind protecția datelor cu caracter personal. Ea a înlocuit Legea nr. 133/2011, abrogată la 23 august 2026. Un text care mai citează astăzi Legea nr. 133/2011 se referă la un act care nu mai este în vigoare.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Legea nr. 195/2024 este aliniată la Regulamentul (UE) 2016/679. Descrierea de mai sus se aplică fără modificări de fond unui vizitator din Republica Moldova: același scop, același temei precontractual, aceleași drepturi. Diferă actul pe care îl invocați și autoritatea la care faceți plângere.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Motivul pentru care Moldova este o secțiune, nu un set separat de pagini, este scris în ",
            { href: "/termeni#moldova", text: "secțiunea corespunzătoare din termeni și condiții" },
            ": 3S nu are sediu sau reprezentant acolo. Pagini separate ar sugera o prezență locală pe care nu o avem.",
          ],
        },
      ],
    },
    {
      id: "limite",
      titlu: "Nu putem scrie tot.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "Lista stă la vedere, nu în subsol: absența unei informații este ea însăși o informație.",
          ],
        },
        {
          fel: "lista",
          elemente: [
            [
              "datele de înmatriculare ale operatorului nu există încă și site-ul nu poate fi publicat în producție cât timp lipsesc;",
            ],
            ["durata de păstrare a jurnalelor tehnice ale găzduirii nu a fost inventariată;"],
            ["nu am verificat încă unde se află fizic serverul care servește paginile;"],
            ["nu am desemnat un responsabil cu protecția datelor;"],
            ["nu deținem certificare ISO 27001 și nu invocăm niciun audit extern de securitate;"],
            [
              "textul nu a trecut printr-o revizuire de avocat. Îl publicăm cu mențiunea asta scrisă, nu fără ea.",
            ],
          ],
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------------------
// Ce stocăm în browser
// ---------------------------------------------------------------------------------------
//
// Pagina se scrie pe STAREA REALA, masurata, nu pe un sablon. Un sablon de politica de
// cookie-uri declara Google Analytics si o caseta de acord; ambele ar fi false aici, iar
// poarta C-01 din `.claude/scripts/porti/poarta-juridic.py` masoara la fiecare lot ca sunt
// false. Proba de browser `tests/browser/consimtamant.spec.ts` viziteaza fiecare ruta si
// cere multime VIDA de cookie-uri, de chei in localStorage si sessionStorage, si de gazde
// straine - fara interactiune si dupa refuz. Pagina descrie exact ce masoara ele.

export const COOKIES: PaginaJuridica = {
  cale: "/cookies",
  titluMeta: "Ce stocăm în browserul dumneavoastră",
  descriereMeta:
    "Site-ul nu pune cookie-uri și nu scrie nimic în browser. Explicăm de ce nu vă cerem acordul și cum verificăm asta la fiecare livrare.",
  eticheta: "Browser și stocare",
  h1: "Browserul rămâne curat.",
  lead:
    "Nu punem cookie-uri, nu scriem în memoria locală și nu încărcăm nimic de la altcineva. Nu vedeți nicio casetă care să vă ceară acordul, fiindcă nu avem ce să vă cerem.",
  secundar: { href: "/confidentialitate", text: "Citiți politica de confidențialitate" },
  redactat: NEREVIZUIT_DE_AVOCAT,
  sectiuni: [
    {
      id: "ce-stocam",
      titlu: "Azi nu e stocat nimic.",
      blocuri: [
        {
          fel: "randuri",
          randuri: [
            { titlu: "Cookie-uri", text: ["Niciunul. Nici ale noastre, nici ale altcuiva."] },
            {
              titlu: "Memorie locală și de sesiune",
              text: ["Nimic. Nu scriem chei în localStorage și nici în sessionStorage."],
            },
            {
              titlu: "Pixeli și scripturi de urmărire",
              text: ["Niciunul. Nu avem instrument de măsurare a traficului, nici propriu, nici al altcuiva."],
            },
            {
              titlu: "Fonturi",
              text: [
                "Aduse la construirea site-ului și servite de pe domeniul nostru. Browserul nu cere nimic de la un serviciu de fonturi din afară.",
              ],
            },
            {
              titlu: "Filme, hărți, butoane sociale",
              text: ["Niciunul. Nu există cadre integrate de la alte servicii."],
            },
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Browserul dumneavoastră păstrează, ca pentru orice site, paginile și fișierele descărcate în memoria lui temporară. Aceea este o funcție a browserului, pe care o controlați din setările lui. Nu este scrisă de noi și nu conține date despre dumneavoastră.",
          ],
        },
      ],
    },
    {
      id: "de-ce-fara-caseta",
      titlu: "Caseta de acord nu are temei.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "Obligația de a cere acordul se naște din stocarea de informații în echipamentul dumneavoastră sau din accesul la informații deja stocate acolo. Regula vine din art. 5 alin. (3) al Directivei 2002/58/CE, transpusă în România prin Legea nr. 506/2004 privind prelucrarea datelor cu caracter personal și protecția vieții private în sectorul comunicațiilor electronice.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Noi nu stocăm nimic și nu citim nimic din echipamentul dumneavoastră. Obligația nu se declanșează și nu avem ce să vă cerem. O casetă de acord pe un site fără stocare nu ar fi o precauție, ci o afirmație despre ceva ce nu există.",
          ],
        },
        {
          fel: "declaratie",
          eticheta: "În locul casetei",
          text: [
            "Zero servicii ale altcuiva în pagini. Decizia costă câteva facilități la care am renunțat, printre care măsurarea traficului, și scutește orice vizitator de o casetă, de un transfer de declarat și de întreaga clasă de risc care a produs cele mai multe amenzi în domeniu.",
          ],
        },
      ],
    },
    {
      id: "cum-verificam",
      titlu: "Afirmația se verifică automat.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "O declarație de felul acesta este ușor de scris și greu de susținut peste timp: e de ajuns ca cineva să adauge o hartă sau un instrument de statistici, și pagina devine falsă fără să observe nimeni. De aceea afirmația este legată de două verificări automate, care rulează înainte de fiecare publicare:",
          ],
        },
        {
          fel: "randuri",
          randuri: [
            {
              titlu: "Verificarea codului livrat",
              text: [
                "Codul sursă și paginile construite sunt scanate după resurse încărcate de la alte domenii și după numele furnizorilor de urmărire cunoscuți. O singură potrivire oprește publicarea.",
              ],
            },
            {
              titlu: "Verificarea într-un browser real",
              text: [
                "Un browser automat deschide fiecare pagină publică și citește cookie-urile, memoria locală, memoria de sesiune și lista de domenii către care s-a făcut vreo cerere. Toate trebuie să fie goale, atât fără nicio interacțiune, cât și după ce se apasă butoanele din pagină.",
              ],
            },
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Verificările au fiecare martorii lor: o pagină fabricată anume, cu defectul înăuntru, pe care trebuie să o respingă, și una curată, pe care trebuie să o accepte. Fără martori, o verificare care nu găsește nimic nu dovedește că site-ul e curat, ci doar că verificarea tace.",
          ],
        },
      ],
    },
    {
      id: "gazduirea",
      titlu: "Găzduirea vede cererile.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "Faptul că nu scriem nimic la dumneavoastră nu înseamnă că vizita nu lasă nicio urmă nicăieri. Serverul care servește paginile păstrează jurnale tehnice ale cererilor, ca orice server web.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Ce conține un asemenea jurnal și ce nu putem încă spune despre el este scris în ",
            { href: "/confidentialitate#ce-date", text: "secțiunea despre datele pe care le primim" },
            " din politica de confidențialitate. Distincția între ce se stochează la dumneavoastră și ce vede serverul este exact locul în care majoritatea politicilor de cookie-uri devin neclare, așa că o scriem apăsat.",
          ],
        },
      ],
    },
    {
      id: "daca-adaugam",
      titlu: "Adăugarea are ordine scrisă.",
      blocuri: [
        {
          fel: "paragraf",
          text: [
            "Dacă vom avea nevoie de statistici de trafic, de un film încorporat sau de orice alt serviciu al altcuiva, ordinea este stabilită dinainte: se schimbă întâi pagina aceasta, apoi apare un mecanism prin care refuzul dumneavoastră este posibil și eficient, și abia apoi se pune serviciul în funcțiune.",
          ],
        },
        {
          fel: "paragraf",
          text: [
            "Ordinea nu ține de bunăvoința noastră: verificările descrise mai sus opresc publicarea în clipa în care apare primul serviciu al altcuiva. Ca să treacă, cineva trebuie să scrie explicit ce s-a adăugat și de ce, aici, în pagină.",
          ],
        },
      ],
    },
  ],
};

/** Cele trei pagini juridice, in ordinea in care se leaga intre ele. */
export const PAGINI_JURIDICE: PaginaJuridica[] = [TERMENI, CONFIDENTIALITATE, COOKIES];
