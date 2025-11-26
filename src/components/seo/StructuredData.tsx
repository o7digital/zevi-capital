"use client"

const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "O7 Realestates",
  "url": "https://o7realestates.vercel.app/",
  "description": "O7 Realestates – International luxury real estate agency. High-end properties, investment opportunities, premium buyers network. Presence in Los Angeles, Montreal, Paris, Mexico. Luxury villas, penthouses, waterfront estates, investment deals.",
  "areaServed": ["Los Angeles", "Montreal", "Paris", "Mexico", "International"],
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
