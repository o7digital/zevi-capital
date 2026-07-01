"use client"

import { useTranslation } from "@/contexts/TranslationContext"

const keywords = {
  fr: [
    "Conseil immobilier Zona Esmeralda", "Investissement immobilier Zona Esmeralda", "Immobilier dans l’État de Mexico", "Immobilier Atizapán", "Biens immobiliers Naucalpan",
    "Investissement immobilier Huixquilucan", "Immobilier Tlalnepantla", "Achat immobilier Zona Esmeralda", "Vente immobilière Zona Esmeralda", "Location immobilière Zona Esmeralda",
    "Locaux commerciaux Zona Esmeralda", "Immobilier industriel État de Mexico", "Terrains d’investissement", "Gestion d’actifs immobiliers", "Valorisation d’actifs immobiliers",
    "Commercialisation immobilière", "Expansion d’entreprise au Mexique", "Implantation d’entreprise au Mexique", "Analyse du marché immobilier", "Due diligence immobilière",
    "Sécurité patrimoniale", "Opportunités immobilières", "Propriétés premium Zona Esmeralda", "Conseil aux investisseurs immobiliers", "ZeVi Capital"
  ],
  en: [
    "Zona Esmeralda real estate advisory", "Zona Esmeralda real estate investment", "State of Mexico real estate", "Atizapán real estate", "Naucalpan properties",
    "Huixquilucan real estate investment", "Tlalnepantla real estate", "Buy property in Zona Esmeralda", "Sell property in Zona Esmeralda", "Zona Esmeralda property rentals",
    "Zona Esmeralda commercial properties", "State of Mexico industrial real estate", "Investment land", "Real estate asset management", "Real estate asset valuation",
    "Property commercialization", "Business expansion in Mexico", "Business site selection Mexico", "Real estate market analysis", "Real estate due diligence",
    "Property risk assessment", "Real estate opportunities", "Premium properties Zona Esmeralda", "Real estate investor advisory", "ZeVi Capital"
  ],
  es: [
    "Consultoría inmobiliaria Zona Esmeralda", "Inversión inmobiliaria Zona Esmeralda", "Inmuebles Estado de México", "Bienes raíces Atizapán", "Propiedades Naucalpan",
    "Inversión inmobiliaria Huixquilucan", "Inmuebles Tlalnepantla", "Comprar propiedad Zona Esmeralda", "Vender propiedad Zona Esmeralda", "Renta de propiedades Zona Esmeralda",
    "Locales comerciales Zona Esmeralda", "Inmuebles industriales Estado de México", "Terrenos para inversión", "Manejo de activos inmobiliarios", "Valuación de activos inmobiliarios",
    "Comercialización inmobiliaria", "Expansión empresarial México", "Selección de ubicaciones comerciales", "Análisis de mercado inmobiliario", "Due diligence inmobiliario",
    "Certeza patrimonial", "Oportunidades inmobiliarias", "Propiedades premium Zona Esmeralda", "Asesoría para inversionistas", "ZeVi Capital"
  ]
}

export default function FooterKeywords() {
  const { locale } = useTranslation()
  return (
    <div className="footer-keywords" aria-label="SEO keywords">
      {keywords[locale].join(" • ")}
      <style jsx>{`
        .footer-keywords{margin-top:14px;padding:10px 0;border-top:1px solid rgba(0,0,0,.08);color:#666;font-size:11px;font-weight:500;line-height:1.65}
      `}</style>
    </div>
  )
}
