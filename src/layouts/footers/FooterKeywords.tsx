"use client"

import type { CSSProperties } from "react";
import { useTranslation } from "@/contexts/TranslationContext";

const frenchVisibleKeywords = [
  "Agence immobilière au Canada",
  "Immobilier de luxe Canada",
  "Villas de prestige Canada",
  "Penthouse Canada",
  "Investir au Canada",
  "Maisons haut de gamme",
  "Résidences premium Canada",
  "Propriétés exclusives",
  "Québec immobilier",
  "Montréal immobilier",
  "Appartements de luxe Canada",
  "Investissement immobilier",
  "Immobilier expatriés",
  "Maisons modernes Canada",
  "Propriétés bord de mer",
  "Immobilier international",
  "Gestion immobilière Canada",
  "Résidence sécurisée Canada",
  "Achat propriété Canada",
  "Saint-Élie-de-Caxton immobilier",
];

const englishVisibleKeywords = [
  "Canada real estate agency",
  "Canada luxury real estate",
  "Luxury villas Canada",
  "Canada penthouses",
  "Invest in Canada",
  "High-end properties",
  "Premium residences Canada",
  "Exclusive properties",
  "Quebec real estate",
  "Montreal properties",
  "Luxury apartments Canada",
  "Property investment",
  "Expat real estate Canada",
  "Modern homes Canada",
  "Waterfront properties",
  "International real estate",
  "Property management Canada",
  "Secure residences Canada",
  "Buy property in Canada",
  "Saint-Élie-de-Caxton real estate",
];

const FooterKeywords = () => {
  const { locale } = useTranslation();
  const isFrench = locale === "fr";
  const visibleKeywords = isFrench ? frenchVisibleKeywords : englishVisibleKeywords;

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
    <div className="footer-keywords" style={wrapperStyle} aria-label={isFrench ? "Mots-clés immobiliers" : "Real estate keywords"}>
      <span style={textStyle}>{visibleKeywords.join(" • ")}</span>
    </div>
  );
};

export default FooterKeywords;
