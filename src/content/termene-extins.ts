// Continutul paginii de instrument `/instrumente/termene-de-pastrare`.
//
// DE CE EXISTA FISIERUL ASTA, si de ce NU e o a doua lista de termene. Cifrele raman
// intr-un singur loc, `src/content/termene.ts`, care hraneste si widgetul de pe pagina de
// start. Doua liste de termene ar diverge exact in ziua in care se modifica o lege si
// cineva repara o singura lista. Aici se adauga numai ce cere pagina de sine statatoare:
// o ancora stabila pentru fiecare rand, ca sa poata fi trimisa prin mesaj, si proza care
// spune ce acopera instrumentul si ce nu.
//
// UNDE INTRA UN RAND NOU, romanesc sau moldovenesc: in `termene.ts`, si numai cu actul si
// articolul CITITE LA SURSA. Cat timp articolul nu e citit cuvant cu cuvant, randul nu se
// scrie. Precedentul e randul dosarelor de avocatura, lasat gol dinadins, cu motivul pe el.

import { TERMENE, type Termen } from "./termene";

/** Un rand de termen, plus ancora din pagina de instrument. */
export type TermenCuAncora = Termen & { ancora: string };

const FARA_SEMNE: Record<string, string> = {
  ă: "a",
  â: "a",
  î: "i",
  ș: "s",
  ț: "t",
  Ă: "a",
  Â: "a",
  Î: "i",
  Ș: "s",
  Ț: "t",
};

/**
 * Ancora unui rand, derivata din textul scurt. Derivata, nu scrisa de mana: o lista de
 * ancore scrise separat s-ar desincroniza de randuri la prima redenumire, si legaturile
 * din cuprins ar duce in gol fara ca nimic sa se planga. Textele scurte sunt distincte
 * intre ele, fiindca sunt deja folosite drept chei de lista in verificator.
 */
export function ancoraTermen(scurt: string): string {
  const literal = Array.from(scurt)
    .map((c) => FARA_SEMNE[c] ?? c)
    .join("");
  return (
    "termen-" +
    literal
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "")
  );
}

/** Randurile romanesti, in ordinea din verificator, fiecare cu ancora lui. */
export const TERMENE_ROMANIA: TermenCuAncora[] = TERMENE.map((t) => ({
  ...t,
  ancora: ancoraTermen(t.scurt),
}));

// Nu exista o lista `TERMENE_MOLDOVA`. Nu e o omisiune: n-am citit actele moldovenesti la
// sursa, iar o lista goala randata printr-o ramura care nu se executa niciodata ar fi cod
// neverificat pus in pagina. Partea de Moldova e scrisa ca text, in campul `moldova` de mai jos,
// si spune exact ce lipseste. Cand cineva are actul si articolul, randurile intra in
// `termene.ts` langa cele romanesti, cu acelasi temei pe rand.

export const PAGINA_TERMENE = {
  titluMeta: "Termene de păstrare a documentelor",
  descriereMeta:
    "Cât se păstrează registrele contabile, statele de salarii sau actele de stare civilă, cu actul normativ și cu articolul pe fiecare rând. Acoperim România, atât.",
  eticheta: "Instrument",
  h1: "Termenul vine cu articolul.",
  // Nu mai exista camp `lead` pentru antet, si nu s-a pierdut niciun cuvant din el: textul
  // a coborat in `cuprins.subTabel`, sub randul de ancore. Motivul e masurat, nu de gust - vezi nota
  // din `src/app/instrumente/termene-de-pastrare/page.tsx`.

  acoperire: {
    titlu: "România, atât.",
    lead: "O listă cu optsprezece jurisdicții arată bine până în ziua în care cineva o folosește ca să apere o eliminare. Am ales lista scurtă, pe care o ducem la sursă rând cu rând.",
    acoperit: [
      "Documente create sau deținute de organizații din România, sub lege română.",
      "Opt categorii frecvente: contabilitate, salarizare, personal, stare civilă, acte administrative locale, construcții, contracte comerciale, dosare de avocatură.",
      "Pentru fiecare rând: termenul, momentul din care curge, actul normativ și, unde există, articolul.",
      "Starea rândului, scrisă pe el: confirmat cu articol, orientativ, sau lăsat gol cu motivul alături.",
    ],
    neacoperit: [
      "Republica Moldova. Motivul este mai jos, pe aceeași pagină.",
      "Celelalte jurisdicții europene, pe care nu le-am citit la sursă.",
      "Nomenclatorul arhivistic al organizației dumneavoastră, adică termenul care obligă efectiv.",
      "Termenele speciale din legislația sectorială: medical, farmaceutic, bancar, energetic.",
      "Prescripția fiscală și cea civilă, care pot curge din alte momente decât termenul de arhivare.",
    ],
    nota: "Pagina nu este consultanță juridică și nu ține loc de aviz: este lista actelor pe care le citim, scrisă astfel încât să le deschideți singur. Unde termenul practic vine din nomenclatorul propriu, rândul o spune pe el.",
  },

  cuprins: {
    // Tabelul nu mai are titlu de sectiune si nici linie de deschidere DEASUPRA lui: h1-ul
    // paginii este chiar titlul lui, iar cele doua paragrafe de mai jos - unul mutat din
    // antet, celalalt de deasupra tabelului - se citesc dupa randuri, unde nu mai tin pe
    // nimeni departe de raspuns.
    subTabel: [
      "Opt categorii de documente, fiecare cu termenul ei, cu momentul din care începe să curgă și cu actul din care provine. Unde nu putem arăta articolul, rândul rămâne gol și scriem de ce.",
      "Actul normativ stă pe rând, sub numele categoriei, la orice lățime de ecran. Categoria duce la fișa întreagă, cu momentul din care curge termenul și cu nota lui.",
    ],
    // Cele trei antete de coloana ale tabelului (categoria / termen / actul normativ) au
    // iesit odata cu tabelul, la reconcilierea lotului S1-b: DIRECTIA cere ca ce se taie din
    // pagina sa se taie si din registrul ei, iar grep peste `src/` si `tests/` nu le mai gasea
    // citite de nimeni.
    fara: "Rând gol",
    faraTemei: "Nu îl putem cita",
  },

  fise: {
    titlu: "Fiecare rând, actul lui.",
    // Propozitia asta a trimis de doua ori la un obiect care nu e pe pagina. Intai
    // „verificatorul de pe pagina de start" (`id="termene"` da zero potriviri, iar
    // `VerificatorTermene` nu e importat de nicio pagina), apoi „tabelul de mai sus", scris
    // cand tabelul tocmai fusese inlocuit cu randul de ancore: `<table` da 0 in HTML-ul
    // servit. Obiectul care CHIAR sta deasupra fiselor e lista de ancore din `TermeneCuprins`,
    // si ordinea ei e ordinea fiselor - amandoua vin din `TERMENE_ROMANIA`, in aceeasi
    // iterare. Numele din text trebuie sa fie al lui; `tests/felie-juridic-referinte.test.ts`
    // masoara asta la fiecare rulare.
    lead: "Ordinea este cea din lista de mai sus. Rândul fără cifră nu are cifră fiindcă nu am găsit articolul, nu fiindcă am uitat de el.",
  },

  moldova: {
    titlu: "Moldova nu e aici.",
    paragrafe: [
      "Lucrăm pentru România și pentru Republica Moldova. Întrebarea despre termenele moldovenești vine des. Pe pagina aceasta nu apare totuși niciun termen moldovenesc.",
      "Motivul nu ne avantajează: nu am citit actele moldovenești la sursă, articol cu articol. Un termen luat din memorie arată la fel cu unul corect. E mai periculos decât un rând gol.",
      "Ne trebuie actul moldovenesc, articolul citit la sursă și confirmarea că forma citită este în vigoare. Când le avem, rândurile intră în aceeași listă, cu același temei pe rând.",
      "Dacă lucrați cu arhive în Republica Moldova și cunoașteți actul și articolul, scrieți-ne și adăugăm rândul cu trimiterea la act. Dacă ne arătați că un rând românesc contrazice actul citat, îl corectăm în pagină.",
    ],
  },

  folosire: {
    titlu: "Folosiți lista cu grijă.",
    lead: "Patru lucruri pe care le întreabă un control și pe care o listă de termene, oricât de corectă, nu le rezolvă singură.",
    reguli: [
      {
        titlu: "Nomenclatorul propriu obligă.",
        text: "Nomenclatorul avizat de Arhivele Naționale stabilește termenul fiecărei categorii. Când el spune altceva decât o listă tipărită de un furnizor, el câștigă și noi ne aliniem la el.",
      },
      {
        titlu: "Comisia și avizul obligă.",
        text: "Eliminarea trece prin comisia de selecționare, cu proces-verbal și cu inventarele documentelor propuse. Avizul Arhivelor Naționale vine înainte de distrugere. La control arătați procesul-verbal al comisiei.",
      },
      {
        titlu: "Termenul permanent nu curge.",
        text: "Categoriile cu termen permanent fac parte din Fondul Arhivistic Național și nu se propun spre eliminare, indiferent câte rafturi ar elibera. Apariția lor într-un proces-verbal de eliminare este eroarea cea mai gravă.",
      },
      {
        titlu: "Orientativul se confirmă întâi.",
        text: "Un rând orientativ are temei general citabil, însă cifra din el vine din practica nomenclatoarelor avizate. Diferența contează exact în clipa în care cineva vă cere temeiul.",
      },
    ],
    temeiuri: [
      "Legea Arhivelor Naționale nr. 16/1996: evidența documentelor create și primite, gruparea lor pe termene într-un nomenclator avizat, condițiile de păstrare și selecționarea numai prin comisie, cu aviz.",
      "Instrucțiunile privind activitatea de arhivă la creatorii și deținătorii de documente, aprobate prin Ordinul de zi nr. 217/1996 al Arhivelor Naționale: partea practică a aceleiași obligații.",
    ],
    nota: "Instrumentul nu înlocuiește nomenclatorul avizat și nu este temei pentru eliminarea vreunui document. Numerele de articol au fost culese odată cu termenele, din actele citate pe fiecare rând, și nu au fost recitite la sursă în ziua scrierii paginii; un arhivist autorizat confirmă lista înainte de publicare. Dacă găsiți un rând care contrazice actul citat, scrieți-ne și corectăm în pagină.",
  },

  incheiere: {
    titlu: "Plecați cu o listă.",
    text: "Discuția începe de la fondul dumneavoastră: câți metri liniari, ce categorii, ce se cere des și ce are termen permanent. Lista care iese o duceți la comisia de selecționare, indiferent dacă lucrăm împreună.",
  },
};
