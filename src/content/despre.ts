// Continutul paginii `/despre`, tinut aici din acelasi motiv ca `segmente.ts`: pagina
// ramane o forma, iar textul care se discuta cu clientul sta intr-un singur loc, unde se
// poate citi fara sa treaca cineva prin JSX.
//
// REGULA CARE GUVERNEAZA FIECARE RAND DE MAI JOS. 3S nu este inca inmatriculata. Vechimea,
// depozitul si autorizatiile sunt ale ADRIA Servicii Arhivare SRL, firma-mama, si se scriu
// ATRIBUIT catre ea. „Avem sase ani de experienta” este o afirmatie pe care 3S nu o poate
// sustine, iar `.claude/scripts/porti/poarta-afirmatii.py` o prinde mecanic. Regula intreaga
// sta in `.claude/rules/afirmatii-atribuite.md`.
//
// Fiecare afirmatie verificabila de mai jos are o intrare in
// `src/content/afirmatii/despre-contact.json`, cu stare `neconfirmat` pana cand o confirma
// cineva care cunoaste firma, cu sursa.
//
// VOCE REF-A (rescris 2026-09-07): titlul e o AFIRMATIE de doua-patru cuvinte, cu punct;
// sub el sta o singura propozitie de explicatie, intre 15 si 35 de cuvinte. Litera
// obisnuita, fara superlative. Adresarea ramane „dumneavoastra”, aceeasi peste tot pe site -
// poarta de limba pica pe amestec.

/** Un fapt scurt: un titlu si un paragraf. Aceeasi forma ca `Fapt` din `segmente.ts`. */
export type FaptDespre = {
  titlu: string;
  text: string;
};

export const DESPRE = {
  /** Titlul din `<title>`, fara sufixul de site. Sablonul din layout adauga 24 de caractere. */
  titluMeta: "Despre 3S și ADRIA",
  /** meta description: intre 50 si 160 de caractere, unica in lot. Poarta S-01 masoara. */
  descriereMeta:
    "Vechimea este a ADRIEI, firma-mamă care arhivează din 2019 în Argeș. 3S construiește căutarea. Ce e moștenit, ce e nou și ce lipsește încă.",
  eticheta: "Despre noi",
  h1: "Vechimea este a ADRIEI.",
  lead:
    "Depozitul de la Golești, arhivarea fizică și anii de la 2019 încoace sunt ale ADRIA Servicii Arhivare SRL, firma-mamă. 3S construiește căutarea peste ele.",
};

/** Ce exista azi, ce se construieste si ce lipseste. Trei fise, in ordinea asta. */
export const STAREA_DE_AZI: FaptDespre[] = [
  {
    titlu: "Depozitul lucrează deja.",
    text: "Oamenii, depozitul de la Golești și preluarea cu proces-verbal sunt ale ADRIEI și lucrează pentru clienții ei dinainte să existe site-ul acesta.",
  },
  {
    titlu: "Căutarea se construiește acum.",
    text: "Documentele se scanează, se indexează și se întreabă în română, cu documentul și pagina alături de răspuns. Aici este munca nouă și riscul pe care ni-l asumăm noi.",
  },
  {
    titlu: "Datele firmei încă lipsesc.",
    text: "Cod fiscal, număr de registru, sediu declarat și telefon apar în subsol în ziua în care există, copiate dintr-un certificat, nu scrise din memorie.",
  },
];

/** Ce vine de la firma-mama. Fiecare rand este o afirmatie despre ADRIA, nu despre 3S. */
export const MOSTENIT: string[] = [
  "Arhivare fizică și digitalizare din 2019, în județul Argeș",
  "Depozitul de la Golești, cu condițiile și cu regimul lui de acces",
  "Autorizațiile de arhivare, cerute scanate înainte de semnătură",
  "Preluarea cu proces-verbal, metrii liniari măsurați, opisul la zi",
  "Oamenii care ridică, inventariază și scanează documentele",
];

/**
 * Ce se construieste la 3S. Nimic de aici nu are vechime, si nu se scrie ca si cum ar avea.
 *
 * PROZA, NU LISTA, din 2026-09-06, si nu din gust. Erau cinci randuri bifate, langa cele
 * cinci randuri bifate ale ADRIEI, pe doua ecrane construite identic - iar despartirea in
 * doua ecrane exista tocmai ca cele doua firme sa nu se citeasca drept una singura. Lista
 * bifata promite lucruri gata facute; aici niciunul nu este. Forma de proza ramane si dupa
 * rescrierea in vocea noua; s-au schimbat propozitiile, nu felul textului.
 */
export const CONSTRUIT =
  "Se construiește căutarea: întrebarea pusă în română, ca unui coleg care cunoaște arhiva. Răspunsul vine cu documentul și pagina citate sau cu un „nu am găsit” limpede. Tot acum se construiesc canalul de pe telefon, site-ul acesta și firma însăși, româno-moldovenească, aflată în curs de înființare.";

/** Cele trei verbe din nume, in ordinea in care se intampla cu documentele dumneavoastra. */
export const NUMELE: FaptDespre[] = [
  {
    titlu: "Scan",
    text: "Scanăm ce se cere des, la o rezoluție care rezistă la citire automată, și verificăm textul pe diacritice. Originalul rămâne în raft.",
  },
  {
    titlu: "Store",
    text: "Hârtia stă în depozit, cu cotă și opis. Copia digitală stă pe infrastructură din Uniunea Europeană, cu locul exact scris în contract.",
  },
  {
    titlu: "Solve",
    text: "Răspundem la întrebarea pusă în română, cu documentul și pagina alături. Când răspunsul nu se află în documente, o spunem pe față.",
  },
];

/** Ce nu scriem pe site. Lista se citeste ca o limita asumata, nu ca o scuza. */
export const NESCRIS: string[] = [
  "Ani de experiență pe seama 3S: firma nu are încă vârstă proprie",
  "Cod fiscal, număr de registru sau sediu, câtă vreme înmatricularea nu s-a încheiat",
  "Certificări: nu deținem certificare ISO 27001 și nu punem sigle de standarde în pagină",
  "Un număr de clienți deserviți sau sigle de referință",
  "Prețuri, cât timp costul depinde de volum și de ce se digitalizează întâi",
  "Nume și funcții ale echipei, cât timp organigrama firmei noi nu e stabilită",
];

/** Ce se poate vedea, in schimb, inainte de orice semnatura. */
export const ARATAM: string[] = [
  "Autorizațiile ADRIEI, scanate, la cerere",
  "Depozitul de la Golești, cu programare, înainte să semnați ceva",
  "Procesul-verbal de predare-primire, în forma exactă în care se semnează",
  "Contractul și anexa de prelucrare a datelor, în română, înainte de preluare",
  "Termenele legale cu actul citat, în instrumentul de termene de păstrare",
];
