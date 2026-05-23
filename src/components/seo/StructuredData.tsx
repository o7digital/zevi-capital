const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "ZeVi Capital",
  url: "https://zevi-capital-git-main-olivier-steineur.vercel.app",
  logo: "https://zevi-capital-git-main-olivier-steineur.vercel.app/logo.png",
  description:
    "ZeVi Capital asesora operaciones inmobiliarias de compra, venta, renta e inversion en Mexico.",
  areaServed: [
    "Ciudad de Mexico",
    "Monterrey",
    "Guadalajara",
    "Queretaro",
    "Puebla",
    "Merida",
    "Cancun",
    "Playa del Carmen",
    "Tulum",
    "Los Cabos",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Montes Urales 755 piso 18",
    addressLocality: "Ciudad de Mexico",
    addressRegion: "CDMX",
    postalCode: "11500",
    addressCountry: "MX",
  },
};

const StructuredData = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData;
