// Imagini originale generate pentru acest site; nu reprezinta sediul clientului.
export type Fotografie = { nume:string; alt:string; pozitie:string };
export const FOTOGRAFII = {
  "rafturi": {
    "nume": "rafturi",
    "alt": "Rafturi de arhivă cu rânduri de cutii de carton într-un culoar luminos, fotografie ilustrativă",
    "pozitie": "center 50%"
  },
  "cutii": {
    "nume": "cutii",
    "alt": "Cutii închise de carton kraft pe o masă deschisă la culoare, fotografie ilustrativă",
    "pozitie": "center 50%"
  },
  "dosare": {
    "nume": "dosare",
    "alt": "Dosare de carton crem și violet așezate în teanc pe un birou, fotografie ilustrativă",
    "pozitie": "center 50%"
  },
  "dulapuri": {
    "nume": "dulapuri",
    "alt": "Dulapuri metalice deschise la culoare, cu ușile închise, fotografie ilustrativă",
    "pozitie": "center 50%"
  },
  "sertare": {
    "nume": "sertare",
    "alt": "Sertar de arhivă deschis cu documente și mânere metalice, fotografie ilustrativă",
    "pozitie": "center 50%"
  },
  "maini": {
    "nume": "maini",
    "alt": "Mâini care așază documente de hârtie lângă un scaner, fotografie ilustrativă",
    "pozitie": "center 50%"
  },
  "legatura": {
    "nume": "legatura",
    "alt": "Dosare și volume legate în material textil, așezate vertical pe un birou, fotografie ilustrativă",
    "pozitie": "center 50%"
  }
} as const satisfies Record<string,Fotografie>;
export type CheieFotografie = keyof typeof FOTOGRAFII;
