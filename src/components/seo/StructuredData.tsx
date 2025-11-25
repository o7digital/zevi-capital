"use client"

const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "O7 REALESTATES",
  "url": "https://o7realestates.vercel.app/",
  "description": "O7 REALESTATES, site officiel de l'agence immobilière présente à Montreal, Paris, Los Angeles, Mexico et Londres pour villas, penthouses et investissements premium.",
  "areaServed": ["Montreal", "Paris", "Los Angeles", "Mexico", "Londres", "International"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1030, Avenue Muguette",
    "addressLocality": "Saint-Élie-de-Caxton",
    "addressRegion": "QC",
    "postalCode": "G0X 2N0",
    "addressCountry": "CA"
  }
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
