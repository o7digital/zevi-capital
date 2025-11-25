"use client"

const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "O7 Realestates",
  "url": "https://o7realestates.vercel.app/",
  "description": "Agence immobilière de luxe officielle au Canada, spécialisée dans la vente de villas et propriétés haut de gamme.",
  "areaServed": ["Canada", "Quebec", "International"],
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
