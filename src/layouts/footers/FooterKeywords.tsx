"use client"

import type { CSSProperties } from "react";
import { useTranslation } from "@/contexts/TranslationContext";

const frenchVisibleKeywords = [
  "Agence immobilière au Mexico",
  "Immobilier de luxe Mexico",
  "Villas de prestige Mexico",
  "Penthouse Mexico",
  "Investir au Mexico",
  "Maisons haut de gamme",
  "Résidences premium Mexico",
  "Propriétés exclusives",
  "CDMX immobilier",
  "Montréal immobilier",
  "Appartements de luxe Mexico",
  "Investissement immobilier",
  "Immobilier expatriés",
  "Maisons modernes Mexico",
  "Propriétés bord de mer",
  "Immobilier international",
  "Gestion immobilière Mexico",
  "Résidence sécurisée Mexico",
  "Achat propriété Mexico",
  "Saint-Élie-de-Caxton immobilier",
];

const englishVisibleKeywords = [
  "Mexico real estate agency",
  "Mexico luxury real estate",
  "Luxury villas Mexico",
  "Mexico penthouses",
  "Invest in Mexico",
  "High-end properties",
  "Premium residences Mexico",
  "Exclusive properties",
  "CDMX real estate",
  "Montreal properties",
  "Luxury apartments Mexico",
  "Property investment",
  "Expat real estate Mexico",
  "Modern homes Mexico",
  "Waterfront properties",
  "International real estate",
  "Property management Mexico",
  "Secure residences Mexico",
  "Buy property in Mexico",
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
