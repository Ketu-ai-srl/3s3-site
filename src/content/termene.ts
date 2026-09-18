// Termenele legale din verificatorul de la sectiunea IV. Starea spune cat de
// tare se poate sprijini cifra: `confirmat` are articol de lege citabil,
// `orientativ` cere confirmare pe nomenclatorul propriu, `neconfirmat` lasa
// randul GOL, dinadins, si scrie de ce.
//
// VALORILE LEGALE NU SE REFORMULEAZA. `termen`, `dela`, `lege` si `legeNota` au ramas
// neatinse si la rescrierea vocii din 2026-09-07 (REF-A): sunt cifre si trimiteri la act, nu
// stil. La valul asta s-au rescris doar notele, mai scurt, si eticheta primei stari. `tip` si
// `scurt` au ramas neatinse dintr-un motiv mecanic, nu de gust: din `scurt` se deriva ancora
// fiecarei fise (`ancoraTermen` din `termene-extins.ts`), deci o reformulare ar muta ancore
// pe care le pot purta legaturi trimise prin mesaj.

export type StareTermen = "confirmat" | "orientativ" | "neconfirmat";

export type Termen = {
  tip: string;
  /** Textul de pe buton, scurt cat sa incapa in coloana. */
  scurt: string;
  stare: StareTermen;
  /** Gol inseamna rand lasat gol intentionat. */
  termen: string;
  dela: string;
  lege: string;
  legeNota: string;
  nota: string;
};

// PASTILELE DE STARE, mutate pe paleta REF-A la valul S2-b. S-a schimbat DOAR sirul `clase`:
// textul si cheile sunt neatinse, fiindca ele sunt continut, nu stil. Doua dintre perechile de
// dinainte numeau roluri care nu mai exista in `globals.css` de la felia de fundatie, deci nu
// mai produceau CSS - pastila isi pierdea si fundalul, si culoarea, si ramanea text simplu.
//
// CINE E CEA MAI APASATA, si de ce nu cea confirmata. Cinci randuri sunt confirmate cu articol,
// doua orientative si UNUL nu poate fi sustinut. Pastila inchisa se da randului care are nevoie
// sa fie observat, adica exceptiei: cazul normal ramane discret, iar cel care cere atentie o
// primeste. Invers - cinci pastile negre si una palida - accentul ar fi cazut pe regula si ar
// fi tacut exact acolo unde pagina isi scrie limita.
//
// Perechile de acum, cu contrastul calculat din valorile paletei:
//   confirmat    cerneala pe ceata     15,46:1 - cazul obisnuit, fara accent
//   orientativ   cerneala-3 pe ceata    4,66:1 - o treapta mai discreta (12 px la 600: prag 4,5)
//   neconfirmat  ceata pe negru        19,29:1 - singura pastila inchisa, fiindca e singurul
//                rand pe care nu il putem sustine
//
// Pe negru se scrie ceata, nu alb: regula paletei, si e cea care alege litera de aici.
//
// Codul de culoare nu poarta singur informatia: starea e scrisa in litere, intreaga, pe
// fiecare pastila.
export const STARI: Record<StareTermen, { text: string; clase: string }> = {
  confirmat: {
    text: "Confirmat cu articol",
    clase: "bg-ceata text-cerneala",
  },
  orientativ: {
    text: "Orientativ, confirmați pe nomenclator",
    clase: "bg-ceata text-cerneala-3",
  },
  neconfirmat: {
    text: "Nu îl putem susține încă",
    clase: "bg-negru text-ceata",
  },
};

export const TERMENE: Termen[] = [
  {
    tip: "Registre de contabilitate și documente justificative",
    scurt: "Registre și documente justificative",
    stare: "confirmat",
    termen: "5 ani",
    dela: "De la data încheierii exercițiului financiar în cursul căruia au fost întocmite.",
    lege: "Legea contabilității nr. 82/1991, art. 25 alin. (1)",
    legeNota: "Termen redus de la 10 la 5 ani prin Legea nr. 36/2023.",
    nota: "Facturile intră aici, inclusiv cele emise prin RO e-Factura. Atenție la a doua cifră de cinci ani: prescripția dreptului organului fiscal poate curge de la altă dată decât termenul de arhivare.",
  },
  {
    tip: "State de salarii",
    scurt: "State de salarii",
    stare: "confirmat",
    termen: "50 de ani",
    dela: "De la data întocmirii.",
    lege: "Legea contabilității nr. 82/1991, art. 25 alin. (2)",
    legeNota: "Excepție expresă de la termenul general al documentelor financiare.",
    nota: "Este actul pe care îl cere un fost angajat pentru vechime, uneori la treizeci de ani după plecare. Se ține separat de restul documentelor financiare. Amestecul lor este cauza cea mai frecventă a eliminărilor greșite.",
  },
  {
    tip: "Dosare de personal",
    scurt: "Dosare de personal",
    stare: "orientativ",
    termen: "75 de ani",
    dela: "De la data încetării raportului de muncă.",
    lege: "Legea Arhivelor Naționale nr. 16/1996",
    legeNota:
      "Termenul concret se stabilește prin nomenclatorul arhivistic avizat al organizației.",
    nota: "Nomenclatorul propriu decide, nu cifra de aici: cei 75 de ani sunt practica preluată în nomenclatoarele avizate, nu un termen scris ca atare într-un articol general. Dacă nomenclatorul dumneavoastră spune altceva, el câștigă.",
  },
  {
    tip: "Registre de stare civilă",
    scurt: "Registre de stare civilă",
    stare: "confirmat",
    termen: "100 de ani",
    dela: "De la data întocmirii registrului.",
    lege: "Legea nr. 119/1996 cu privire la actele de stare civilă",
    legeNota: "După împlinirea termenului, registrele se predau Arhivelor Naționale.",
    nota: "Pentru o primărie acesta este fondul cu cea mai lungă viață și cel mai cerut la ghișeu. Exemplarul al doilea are propriul regim de păstrare și de depunere.",
  },
  {
    tip: "Hotărâri ale consiliului local și dispoziții ale primarului",
    scurt: "Hotărâri și dispoziții",
    stare: "confirmat",
    termen: "Permanent",
    dela: "Nu curge un termen. Documentele nu pot fi propuse spre eliminare niciodată.",
    lege: "Legea Arhivelor Naționale nr. 16/1996",
    legeNota: "Documente care fac parte din Fondul Arhivistic Național al României.",
    nota: "Permanent înseamnă păstrare până la predarea către Arhivele Naționale, în condițiile legii. Un asemenea document apărut într-un proces-verbal de eliminare este cea mai gravă eroare pe care o găsește un control.",
  },
  {
    tip: "Cartea tehnică a construcției",
    scurt: "Cartea tehnică a construcției",
    stare: "confirmat",
    termen: "Pe toată durata existenței construcției",
    dela: "De la recepția la terminarea lucrărilor.",
    lege: "HG nr. 273/1994, Regulamentul de recepție a lucrărilor de construcții",
    legeNota: "Se predă proprietarului și îl urmează la fiecare schimbare de proprietar.",
    nota: "Lipsa ei se vede exact atunci când aveți nevoie de ea: la o expertiză, la o vânzare sau după un eveniment. Reconstituirea costă de câteva ori mai mult decât păstrarea.",
  },
  {
    tip: "Contracte comerciale",
    scurt: "Contracte comerciale",
    stare: "orientativ",
    termen: "Durata contractului plus 3 ani",
    dela: "De la data la care obligația a devenit exigibilă.",
    lege: "Codul civil, art. 2517",
    legeNota: "Termenul general de prescripție este de 3 ani, dacă legea nu prevede altfel.",
    nota: "Prescripția generală este punctul de plecare: garanțiile de bună execuție, clauzele de răspundere pe termen lung și obligațiile fiscale pot cere mai mult. Termenul practic se stabilește pe tip de contract, nu pe categoria întreagă.",
  },
  {
    tip: "Dosare ale cabinetelor de avocatură",
    scurt: "Dosare de cabinet de avocatură",
    stare: "neconfirmat",
    termen: "",
    dela: "",
    lege: "",
    legeNota: "",
    nota: "Preferăm rândul gol unei cifre pe care nu am putea să o susținem în fața unui control: nu am găsit o normă generală, cu articol, valabilă pentru toate dosarele unui cabinet. Termenul se construiește din statutul profesiei, din contractul de asistență juridică și din nomenclatorul propriu. Dacă îl cunoașteți, scrieți-ne și îl completăm cu trimiterea la act.",
  },
];
