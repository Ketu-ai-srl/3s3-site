// Datele structurate se scriu o singura data, aici, si se pun in pagina ca JSON-LD.
//
// De ce nu FAQPage, desi e tentant: din 7 mai 2026 Google nu mai produce rezultate
// imbogatite din FAQPage, iar pagina de documentatie a fost stearsa in iunie 2026
// (masurat in cercetarea de porti). Deci ramane ce e inca folosit: identitatea
// organizatiei si serviciul, plus firul de navigatie acolo unde exista.
//
// Regula de continut care se aplica si aici: nicio afirmatie care nu se poate sustine.
// Fara `aggregateRating` inventat, fara numar de clienti, fara certificari.
//
// Textul din JSON-LD e continut de citit, nu identificatori: se scrie cu diacritice.
// Un agent care raspunde in romana citeste exact sirurile de mai jos, iar poarta de
// limba le masoara ca pe orice alt text vizibil.

const ORGANIZATIE = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "3S - Scan Store Solve",
  description:
    "Arhivare fizică, digitalizare și căutare în documente, pentru instituții publice, notari, cabinete de avocatură și firme din România.",
  url: "https://3s2.ke2.in",
  areaServed: { "@type": "Country", name: "România" },
  knowsLanguage: ["ro"],
  parentOrganization: {
    "@type": "Organization",
    name: "ADRIA SERVICII ARHIVARE SRL",
    description:
      "Firma-mamă, care se ocupă de arhivare fizică și digitalizare din 2019, în județul Argeș.",
  },
} as const;

const SERVICIU = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Arhivare, digitalizare și căutare în documente",
  serviceType: "Arhivare de documente",
  provider: { "@type": "Organization", name: "3S - Scan Store Solve" },
  areaServed: { "@type": "Country", name: "România" },
  availableLanguage: "ro",
} as const;

export default function DateStructurate() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATIE) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICIU) }}
      />
    </>
  );
}
