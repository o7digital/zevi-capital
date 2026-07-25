const structuredData = {
  "@context": "https://schema.org",
  "@type": ["Organization", "RealEstateAgent"],
  "@id": "https://www.zevicapital.com/#organization",
  "name": "ZeVi Capital",
  "url": "https://www.zevicapital.com/",
  "logo": "https://www.zevicapital.com/favicon.png",
  "description": "Firma de consultoría inmobiliaria estratégica especializada en inversión, comercialización y manejo de activos en Zona Esmeralda y el Estado de México.",
  "areaServed": [
    { "@type": "Place", "name": "Zona Esmeralda, Estado de México" },
    { "@type": "City", "name": "Atizapán de Zaragoza" },
    { "@type": "City", "name": "Naucalpan de Juárez" },
    { "@type": "City", "name": "Huixquilucan" }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Montes Urales 755, piso 18, Lomas de Chapultepec",
    "addressLocality": "Ciudad de México",
    "postalCode": "11500",
    "addressCountry": "MX"
  },
  "knowsAbout": [
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
