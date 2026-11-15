const structuredData = {
  "@context": "https://schema.org",
  "@type": ["Organization", "RealEstateAgent"],
  "@id": "https://www.zevicapital.com/#organization",
  "name": "ZeVi Capital",
  "url": "https://www.zevicapital.com/",
  "logo": "https://www.zevicapital.com/favicon.png",
  "description": "Firma de asesoría inmobiliaria corporativa e inversión con base en Zona Esmeralda, Estado de México. Análisis de mercado, expansión comercial y acompañamiento transaccional.",
  "areaServed": [
    { "@type": "Place", "name": "Zona Esmeralda, Estado de México" },
    { "@type": "City", "name": "Atizapán de Zaragoza" },
    { "@type": "City", "name": "Naucalpan de Juárez" },
    { "@type": "City", "name": "Huixquilucan" }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Cto. Plaza Bona Esmeralda 1, Bosque Esmeralda",
    "addressLocality": "Ciudad López Mateos",
    "postalCode": "52930",
    "addressRegion": "Estado de México",
    "addressCountry": "MX"
  },
  "knowsAbout": [
    "Consultoría inmobiliaria corporativa",
    "Industrial & Logistics",
    "Retail & Corporate Expansion",
    "Capital Markets",
    "Research & Market Intelligence",
    "Expansión empresarial",
    "Inversión inmobiliaria",
    "Manejo de activos inmobiliarios",
    "Due diligence inmobiliario"
  ]
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
