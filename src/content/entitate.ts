// Datele de identificare ale comerciantului, citite dintr-un singur loc.
//
// Sursa e `config/entitate.ro.json`, nu JSX, fiindca acolo le cauta si poarta juridica
// (`.claude/scripts/porti/poarta-juridic.py`, codul L-01). Doua surse pentru aceleasi
// date ar insemna ca poarta masoara fisierul si vizitatorul citeste pagina, iar cele
// doua se pot contrazice fara ca nimeni sa observe.
//
// Temeiul: Legea 365/2002 republicata, art. 5 alin. (1) lit. a)-e). Sanctiuni: art. 22
// lit. b), amenda 1.000-50.000 lei, si art. 21 lit. a), nulitatea relativa a contractului.

import date from "../../config/entitate.ro.json";

/**
 * Marcajul locului gol. Se scrie exact asa si in fisierul de configurare.
 *
 * De ce un marcaj si nu sirul vid: un camp lipsa se poate citi drept "am uitat", iar un
 * camp cu `de completat` spune ca data NU exista inca. 3S e in curs de infiintare, deci
 * nu are cod fiscal, numar de registru, sediu declarat sau telefon. Nu se completeaza cu
 * datele firmei-mama: ar fi o afirmatie falsa despre alta persoana juridica.
 */
export const NECOMPLETAT = "de completat";

export type Entitate = {
  denumire: string;
  sediu: string;
  email: string;
  telefon: string;
  numar_orc: string;
  cod_fiscal: string;
};

/** Campurile neconditionate din art. 5 alin. (1) lit. a)-e), in ordinea de afisare. */
export const CAMPURI_IDENTITATE: (keyof Entitate)[] = [
  "denumire",
  "sediu",
  "numar_orc",
  "cod_fiscal",
  "email",
  "telefon",
];

/** Eticheta cu care apare fiecare camp in subsol, cand blocul se randeaza. */
export const ETICHETE: Record<keyof Entitate, string> = {
  denumire: "Denumire",
  sediu: "Sediu",
  numar_orc: "Număr de ordine în registrul comerțului",
  cod_fiscal: "Cod de identificare fiscală",
  email: "Poștă electronică",
  telefon: "Telefon",
};

export const entitate: Entitate = {
  denumire: date.denumire,
  sediu: date.sediu,
  email: date.email,
  telefon: date.telefon,
  numar_orc: date.numar_orc,
  cod_fiscal: date.cod_fiscal,
};

// Substituentii pe care ii recunoaste si `poarta-juridic.py`. Lista trebuie sa fie ACEEASI
// in cele doua locuri. Cat timp aici erau doar doua forme, iar in poarta noua, o valoare ca
// `TODO` sau `completati aici` trecea de amandoua: blocul de identificare s-ar fi randat pe
// productie cu substituentul la vedere, cu poarta verde. Doua definitii ale aceluiasi lucru
// nu se contrazic zgomotos - se contrazic exact pe cazul dintre ele.
const SUBSTITUENTI = [
  NECOMPLETAT,
  "de-completat",
  "completati aici",
  "completați aici",
  "todo",
  "tbd",
  "xxx",
  "???",
  "n/a",
  "necunoscut",
  "lorem",
];

/** Un camp e gol cand lipseste sau cand poarta un marcaj de necompletat. */
export function campLipsa(valoare: string): boolean {
  const v = valoare.trim().toLowerCase();
  return v === "" || SUBSTITUENTI.includes(v);
}

/** Campurile care inca nu au valoare. Lista goala inseamna identitate completa. */
export function campuriLipsa(): (keyof Entitate)[] {
  return CAMPURI_IDENTITATE.filter((c) => campLipsa(entitate[c]));
}

/**
 * Se poate afisa blocul de identificare?
 *
 * Totul sau nimic, deliberat. Un bloc care afiseaza jumatate din date, cu `de completat`
 * la rest, nu informeaza pe nimeni si arata a santier; iar textul `de completat` ajuns pe
 * un site public e mai rau decat absenta lui, fiindca pare o valoare. Cat timp lipseste
 * un camp, blocul nu se randeaza deloc, si poarta juridica ramane rosie la productie -
 * exact mecanismul care impiedica publicarea unei identitati incomplete.
 */
export function identitateCompleta(): boolean {
  return campuriLipsa().length === 0;
}
