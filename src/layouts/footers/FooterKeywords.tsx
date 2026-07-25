"use client"

import type { CSSProperties } from "react";
import { useTranslation } from "@/contexts/TranslationContext";

const spanishVisibleKeywords = [
  "Consultoría inmobiliaria Zona Esmeralda",
  "Inversión inmobiliaria Zona Esmeralda",
  "Inmuebles Estado de México",
  "Bienes raíces Atizapán",
  "Propiedades Naucalpan",
  "Inversión inmobiliaria Huixquilucan",
  "Inmuebles Tlalnepantla",
  "Comprar propiedad Zona Esmeralda",
  "Vender propiedad Zona Esmeralda",
  "Renta de propiedades Zona Esmeralda",
  "Locales comerciales Zona Esmeralda",
  "Inmuebles industriales Estado de México",
  "Terrenos para inversión Estado de México",
  "Manejo de activos inmobiliarios Estado de México",
  "Valuación de activos inmobiliarios Estado de México",
  "Comercialización inmobiliaria Estado de México",
  "Expansión empresarial México",
  "Selección de ubicaciones comerciales Estado de México",
  "Análisis de mercado inmobiliario Estado de México",
  "Due diligence inmobiliario Estado de México",
  "Certeza patrimonial Estado de México",
  "Oportunidades inmobiliarias Estado de México",
  "Propiedades premium Zona Esmeralda",
  "Asesoría para inversionistas Estado de México",
  "ZeVi Capital",
];

const englishVisibleKeywords = [
  "Real estate consulting Zona Esmeralda",
  "Real estate investment Zona Esmeralda",
  "Real estate assets Estado de Mexico",
  "Real estate Atizapan",
  "Properties Naucalpan",
  "Real estate investment Huixquilucan",
  "Properties Tlalnepantla",
  "Buy property Zona Esmeralda",
  "Sell property Zona Esmeralda",
  "Property rentals Zona Esmeralda",
  "Commercial spaces Zona Esmeralda",
  "Industrial properties Estado de Mexico",
  "Investment land Estado de Mexico",
  "Real estate asset management Estado de Mexico",
  "Real estate asset valuation Estado de Mexico",
  "Real estate commercialization Estado de Mexico",
  "Business expansion Estado de Mexico",
  "Commercial site selection Estado de Mexico",
  "Real estate market analysis Estado de Mexico",
  "Real estate due diligence Estado de Mexico",
  "Patrimonial certainty Estado de Mexico",
  "Real estate opportunities Estado de Mexico",
  "Premium properties Zona Esmeralda",
  "Investor advisory Estado de Mexico",
  "ZeVi Capital",
];

const frenchVisibleKeywords = [
  "Conseil immobilier Zona Esmeralda",
  "Investissement immobilier Zona Esmeralda",
  "Actifs immobiliers Estado de Mexico",
  "Immobilier Atizapan",
  "Proprietes Naucalpan",
  "Investissement immobilier Huixquilucan",
  "Proprietes Tlalnepantla",
  "Acheter une propriete Zona Esmeralda",
  "Vendre une propriete Zona Esmeralda",
  "Location de proprietes Zona Esmeralda",
  "Locaux commerciaux Zona Esmeralda",
  "Biens industriels Estado de Mexico",
  "Terrains d'investissement Estado de Mexico",
  "Gestion d'actifs immobiliers Estado de Mexico",
  "Valorisation d'actifs immobiliers Estado de Mexico",
  "Commercialisation immobiliere Estado de Mexico",
  "Expansion d'entreprise Estado de Mexico",
  "Selection d'emplacements commerciaux Estado de Mexico",
  "Analyse du marche immobilier Estado de Mexico",
  "Due diligence immobiliere Estado de Mexico",
  "Securite patrimoniale Estado de Mexico",
  "Opportunites immobilieres Estado de Mexico",
  "Proprietes premium Zona Esmeralda",
  "Conseil aux investisseurs Estado de Mexico",
  "ZeVi Capital",
];

const FooterKeywords = () => {
  const { locale } = useTranslation();
  const isFrench = locale === "fr";
  const isSpanish = locale === "es";
  const visibleKeywords = isFrench
    ? frenchVisibleKeywords
    : isSpanish
      ? spanishVisibleKeywords
      : englishVisibleKeywords;

  const wrapperStyle: CSSProperties = {
    marginTop: "14px",
    paddingTop: "10px",
    borderTop: "1px solid rgba(0, 0, 0, 0.06)",
    color: "#777",
    fontSize: "11px",
    lineHeight: 1.6,
    fontWeight: 500,
  };

  const textStyle: CSSProperties = {
    margin: 0,
    display: "block",
  };

  return (
    <div
      className="footer-keywords"
      style={wrapperStyle}
      aria-label={isFrench ? "Mots-clés immobiliers" : isSpanish ? "Palabras clave inmobiliarias" : "Real estate keywords"}
    >
      <span style={textStyle}>{visibleKeywords.join(" • ")}</span>
    </div>
  );
};

export default FooterKeywords;
