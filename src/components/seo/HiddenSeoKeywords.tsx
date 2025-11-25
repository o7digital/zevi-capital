"use client"

const frenchKeywordBlock = `agence immobilière Canada, immobilier de luxe Canada, achat propriété Canada, investir au Canada, villa de luxe Canada, penthouse Canada, Québec immobilier, Montréal villa, Saint-Élie-de-Caxton immobilier, Canada immobilier, résidence premium Canada, investissement immobilier Canada, villa moderne Canada, appartements luxe Canada, loft Canada, résidence exclusive Canada, propriétés haut de gamme Canada, luxury real estate Canada, agence premium Canada, real estate Canada francophone, acheter villa Canada, acheter appartement Canada, Canada expat immobilier, location propriété Canada, gestion immobilière Canada, propriétés VIP Canada, niches premium Canada, district immobilier Canada, soumission immobilière Canada, investisseur francophone Canada, marché immobilier Canada, résidence sécurisée Canada, maisons Canada, appartement vue mer Canada, immobilier bord de mer Canada, exclusive Canada listings, private real estate Canada, investissement haut rendement Canada, résidence Québec Canada, maisons contemporaines Canada, architecture moderne Canada, vue mer Canada, prestige property Canada, premium property Canada, villa avec piscine Canada, villa front mer Canada, achat premium Canada, transaction sécurisée Canada, accompagnement francophone Canada, expert immobilier Canada, discrétion immobilière Canada, conciergerie immobilière Canada, résidence secondaire Canada, location saisonnière Canada, property management Canada, full service Canada immobilier, high-end real estate Canada, investisseur européen Canada, fiscalité Canada investissement, résidence fiscal Canada, résident Canada, off-market Canada properties, ultra-luxury Canada, prix immobilier Canada, opportunité Canada, développement immobilier Canada, quartiers Canada premium, achat rapide Canada, procédure achat Canada, avocat Canada immobilier, notaire Canada, sécurisation transaction Canada, financement achat Canada, créer société Canada, expatriation Canada, déménagement Canada, frais achat Canada, Canada lifestyle, taxes Canada, ROI Canada, rentabilité Canada, investissement rentable Canada, résidence long terme Canada`;

const englishKeywordBlock = `Canada real estate agency, Canada luxury real estate, buy property in Canada, invest in Canada, Canada luxury villa, Canada penthouse, Quebec properties, Montreal villa, Saint-Élie-de-Caxton properties, Canada real estate, premium real estate Canada, investment property Canada, modern villa Canada, luxury apartments Canada, Canada loft, exclusive residences Canada, high-end properties Canada, Canada property market, premium agency Canada, French Canada real estate, property for sale Canada, buy apartment Canada, Canada expat property, long-term rental Canada, property management Canada, VIP properties Canada, Canada prime real estate, Canada property district, real estate listings Canada, French investor Canada, Canada housing market, secure residence Canada, Canada homes, seafront apartment Canada, waterfront real estate Canada, exclusive Canada listings, private property Canada, high return investment Canada, Quebec residence Canada, Canada luxury homes, contemporary homes Canada, modern architecture Canada, sea view Canada, prestige real estate Canada, premium property Canada, villa with pool Canada, beachfront villa Canada, premium property purchase Canada, secure transaction Canada, French-speaking agent Canada, Canada real estate expert, confidential property Canada, Canada property concierge, secondary residence Canada, holiday rentals Canada, property management Canada, full-service agency Canada, high-end Canada homes, European investor Canada, Canada investment taxation, Canada residency, residential Canada properties, off-market Canada properties, ultra-luxury real estate Canada, Canada house prices, Canada opportunities, Canada property developments, Canada premium districts, fast purchase Canada, Canada buying process, Canada lawyer real estate, Canada legal check, secure property transfer Canada, Canada financing, create company in Canada, relocation to Canada, move to Canada, Canada property fees, Canada lifestyle, Canada taxes, Canada ROI, Canada profitability, profitable investment Canada`;

export const frenchKeywords = frenchKeywordBlock.split(",").map((keyword) => keyword.trim()).filter(Boolean);
export const englishKeywords = englishKeywordBlock.split(",").map((keyword) => keyword.trim()).filter(Boolean);
export const combinedKeywords = [...frenchKeywords, ...englishKeywords];

const HiddenSeoKeywords = () => {
  const hiddenPayload = JSON.stringify({ frenchKeywords, englishKeywords });

  return (
    <div style={{ display: "none" }} aria-hidden="true">
      {combinedKeywords.join(", ")}
      <script
        type="application/json"
        dangerouslySetInnerHTML={{ __html: hiddenPayload }}
      />
    </div>
  );
};

export default HiddenSeoKeywords;
