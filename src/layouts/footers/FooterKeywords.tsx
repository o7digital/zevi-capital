"use client"

import { useTranslation } from "@/contexts/TranslationContext"

const keywords = {
  fr: [
    "Conseil immobilier Zona Esmeralda", "Investissement immobilier Zona Esmeralda", "Immobilier dans l'Etat de Mexico", "Immobilier Atizapan", "Biens immobiliers Naucalpan",
    "Investissement immobilier Huixquilucan", "Immobilier Tlalnepantla", "Achat immobilier Zona Esmeralda", "Vente immobiliere Zona Esmeralda", "Location immobiliere Zona Esmeralda",
    "Locaux commerciaux Zona Esmeralda", "Immobilier industriel Etat de Mexico", "Terrains d'investissement Etat de Mexico", "Gestion d'actifs immobiliers Etat de Mexico", "Valorisation d'actifs immobiliers Etat de Mexico",
    "Commercialisation immobiliere Etat de Mexico", "Expansion d'entreprise Etat de Mexico", "Implantation d'entreprise Etat de Mexico", "Analyse du marche immobilier Etat de Mexico", "Due diligence immobiliere Etat de Mexico",
    "Securite patrimoniale Etat de Mexico", "Opportunites immobilieres Etat de Mexico", "Proprietes premium Zona Esmeralda", "Conseil aux investisseurs immobiliers Etat de Mexico", "ZeVi Capital"
  ],
  en: [
    "Zona Esmeralda real estate advisory", "Zona Esmeralda real estate investment", "State of Mexico real estate", "Atizapan real estate", "Naucalpan properties",
    "Huixquilucan real estate investment", "Tlalnepantla real estate", "Buy property in Zona Esmeralda", "Sell property in Zona Esmeralda", "Zona Esmeralda property rentals",
    "Zona Esmeralda commercial properties", "State of Mexico industrial real estate", "Investment land State of Mexico", "Real estate asset management State of Mexico", "Real estate asset valuation State of Mexico",
    "Property commercialization State of Mexico", "Business expansion State of Mexico", "Business site selection State of Mexico", "Real estate market analysis State of Mexico", "Real estate due diligence State of Mexico",
    "Property risk assessment State of Mexico", "Real estate opportunities State of Mexico", "Premium properties Zona Esmeralda", "Real estate investor advisory State of Mexico", "ZeVi Capital"
  ],
  es: [
    "Consultoría inmobiliaria Zona Esmeralda", "Inversión inmobiliaria Zona Esmeralda", "Inmuebles Estado de México", "Bienes raíces Atizapán", "Propiedades Naucalpan",
    "Inversión inmobiliaria Huixquilucan", "Inmuebles Tlalnepantla", "Comprar propiedad Zona Esmeralda", "Vender propiedad Zona Esmeralda", "Renta de propiedades Zona Esmeralda",
    "Locales comerciales Zona Esmeralda", "Inmuebles industriales Estado de México", "Terrenos para inversión Estado de México", "Manejo de activos inmobiliarios Estado de México", "Valuación de activos inmobiliarios Estado de México",
    "Comercialización inmobiliaria Estado de México", "Expansión empresarial Estado de México", "Selección de ubicaciones comerciales Estado de México", "Análisis de mercado inmobiliario Estado de México", "Due diligence inmobiliario Estado de México",
    "Certeza patrimonial Estado de México", "Oportunidades inmobiliarias Estado de México", "Propiedades premium Zona Esmeralda", "Asesoría para inversionistas Estado de México", "ZeVi Capital"
  ]
}

export default function FooterKeywords() {
  const { locale } = useTranslation()
  return (
    <div className="footer-keywords" aria-label="SEO keywords">
      {keywords[locale].join(" • ")}
      <style jsx>{`
        .footer-keywords{margin-top:14px;padding:14px 0;border-top:1px solid rgba(0,0,0,.08);color:#555;font-size:14px;font-weight:500;line-height:1.7}
      `}</style>
    </div>
  )
}
