// Exemplele de raspuns din cartonasul de erou. Sunt ILUSTRARE, construite pe
// documente-model: nu sunt documentele unui client si nu reproduc o conversatie
// reala. Ultimul exemplu este un refuz, si e acolo dinadins.
//
// Voce REF-A (rescris 2026-09-07): raspunsul incepe cu ce voia omul sa afle - data,
// termenul, numarul facturii - si abia dupa vine de unde iese. Propozitii scurte,
// afirmative, punct la final. Textul legaturii e o comanda de doua-trei cuvinte.

export type ExempluRaspuns = {
  /** Textul scurt de pe butonul care schimba exemplul. */
  intrebare: string;
  raspuns: string;
  /** Codul sursei: document, pagina, articol. Gol la refuz. */
  sursa: string;
  /** Textul legaturii catre document. Gol la refuz. */
  legatura: string;
  refuz: boolean;
  ora: string;
};

export const EXEMPLE: ExempluRaspuns[] = [
  {
    intrebare: "Când expiră contractul de salubritate?",
    raspuns:
      "Expiră pe 13 martie 2027. Semnat pe 14 martie 2019, pe opt ani. Nu se prelungește singur: cere act adițional.",
    sursa: "Contract 214/2019 · pag. 4 · art. 7.2",
    legatura: "Deschideți pagina 4",
    refuz: false,
    ora: "09:41",
  },
  {
    intrebare: "Ce garanție are hala din Mioveni?",
    raspuns:
      "Ține până pe 12 iunie 2025. Garanție de bună execuție, 24 de luni de la recepția semnată pe 12 iunie 2023.",
    sursa: "PV recepție hala Mioveni 2023 · pag. 3 · cap. IV",
    legatura: "Deschideți pagina 3",
    refuz: false,
    ora: "11:08",
  },
  {
    intrebare: "Pe ce factură a intrat avizul 4412?",
    raspuns:
      "Pe factura 2024-0871, emisă pe 18 septembrie 2024. Avizul 4412 este poziția 6 dintre cele 14 de pe factură.",
    sursa: "Facturi emise 2024, trimestrul III · pag. 42 · poziția 6",
    legatura: "Deschideți pagina 42",
    refuz: false,
    ora: "14:20",
  },
  {
    intrebare: "Câți angajați aveam în 2011?",
    raspuns: "Nu am găsit asta în documentele dumneavoastră.",
    sursa: "",
    legatura: "",
    refuz: true,
    ora: "17:35",
  },
];
