"use client"

import Link from "next/link"
import { useTranslation } from "@/contexts/TranslationContext"

const content = {
  es: {
    eyebrow: "ZeVi Capital · Estado de México",
    title: "Inversión inmobiliaria estratégica en Zona Esmeralda y Estado de México",
    lead: "En ZeVi Capital conectamos visión, capital, territorio y estrategia para transformar oportunidades inmobiliarias en operaciones reales, rentables y seguras.",
    description: "Acompañamos a empresas, propietarios e inversionistas en Zona Esmeralda, Atizapán, Naucalpan, Huixquilucan y otras zonas estratégicas del Estado de México.",
    positioning: "No somos una inmobiliaria tradicional. Somos una firma estratégica que integra análisis de mercado, visión comercial, evaluación técnica, respaldo jurídico y ejecución operativa.",
    advice: "Solicitar asesoría", properties: "Ver propiedades", sell: "Quiero vender o rentar mi propiedad", business: "Busco ubicación para mi empresa",
    searchTitle: "Encuentra oportunidades inmobiliarias en Zona Esmeralda",
    searchText: "Explora propiedades comerciales, industriales, corporativas, residenciales premium, terrenos y activos con potencial de inversión.",
    operationTitle: "Tipo de operación", locationTitle: "Ubicación", rangeTitle: "Rango de inversión",
    operations: ["Comprar propiedad", "Rentar propiedad", "Vender propiedad", "Rentar espacio industrial", "Invertir en inmueble", "Buscar terreno estratégico"],
    note: "Ya sea que busques comprar, rentar, vender, invertir o expandir tu empresa, ZeVi Capital te ayuda a identificar la oportunidad adecuada."
  },
  fr: {
    eyebrow: "ZeVi Capital · État de Mexico",
    title: "Investissement immobilier stratégique à Zona Esmeralda et dans l’État de Mexico",
    lead: "ZeVi Capital associe vision, capital, territoire et stratégie pour transformer les opportunités immobilières en opérations concrètes, rentables et sécurisées.",
    description: "Nous accompagnons entreprises, propriétaires et investisseurs à Zona Esmeralda, Atizapán, Naucalpan, Huixquilucan et dans les zones stratégiques de l’État de Mexico.",
    positioning: "Nous ne sommes pas une agence immobilière traditionnelle. Nous sommes un cabinet stratégique qui réunit analyse de marché, vision commerciale, évaluation technique, soutien juridique et exécution opérationnelle.",
    advice: "Demander conseil", properties: "Voir les propriétés", sell: "Je souhaite vendre ou louer mon bien", business: "Je cherche un emplacement pour mon entreprise",
    searchTitle: "Trouvez des opportunités immobilières à Zona Esmeralda",
    searchText: "Découvrez des biens commerciaux, industriels, professionnels et résidentiels premium, ainsi que des terrains et actifs à potentiel d’investissement.",
    operationTitle: "Type d’opération", locationTitle: "Localisation", rangeTitle: "Budget d’investissement",
    operations: ["Acheter un bien", "Louer un bien", "Vendre un bien", "Louer un espace industriel", "Investir dans l’immobilier", "Rechercher un terrain stratégique"],
    note: "Pour acheter, louer, vendre, investir ou développer votre entreprise, ZeVi Capital vous aide à identifier la bonne opportunité."
  },
  en: {
    eyebrow: "ZeVi Capital · State of Mexico",
    title: "Strategic real estate investment in Zona Esmeralda and the State of Mexico",
    lead: "ZeVi Capital connects vision, capital, territory and strategy to turn real estate opportunities into viable, profitable and secure transactions.",
    description: "We advise businesses, property owners and investors in Zona Esmeralda, Atizapán, Naucalpan, Huixquilucan and other strategic areas of the State of Mexico.",
    positioning: "We are not a traditional real estate agency. We are a strategic firm combining market analysis, commercial vision, technical assessment, legal support and operational execution.",
    advice: "Request advice", properties: "View properties", sell: "I want to sell or lease my property", business: "I need a location for my business",
    searchTitle: "Find real estate opportunities in Zona Esmeralda",
    searchText: "Explore commercial, industrial, corporate and premium residential properties, land and investment assets.",
    operationTitle: "Transaction type", locationTitle: "Location", rangeTitle: "Investment range",
    operations: ["Buy a property", "Rent a property", "Sell a property", "Lease industrial space", "Invest in real estate", "Find strategic land"],
    note: "Whether you want to buy, rent, sell, invest or expand your business, ZeVi Capital helps you identify the right opportunity."
  }
}

const locations = ["Zona Esmeralda", "Atizapán de Zaragoza", "Naucalpan", "Huixquilucan", "Tlalnepantla", "Estado de México", "Ciudad de México", "Querétaro", "Bajío"]
const ranges = ["$2,000,000 - $5,000,000 MXN", "$5,000,000 - $10,000,000 MXN", "$10,000,000 - $30,000,000 MXN", "+$30,000,000 MXN"]

const BLockFeatureOne = () => {
  const { locale } = useTranslation()
  const copy = content[locale]

  return (
  <section className="strategy-home" aria-labelledby="strategy-title">
    <div className="container">
      <div className="strategy-home__intro">
        <div>
          <span className="strategy-home__eyebrow">{copy.eyebrow}</span>
          <h1 id="strategy-title">{copy.title}</h1>
        </div>
        <div className="strategy-home__copy">
          <p className="lead">{copy.lead}</p>
          <p>{copy.description}</p>
          <p>{copy.positioning}</p>
          <strong>Where vision meets strategy.</strong>
        </div>
      </div>

      <div className="strategy-home__actions">
        <Link href="/contact" className="strategy-btn strategy-btn--dark">{copy.advice}</Link>
        <Link href="/listing_01" className="strategy-btn">{copy.properties}</Link>
        <Link href="/contact" className="strategy-link">{copy.sell} <i className="bi bi-arrow-up-right" /></Link>
        <Link href="/contact" className="strategy-link">{copy.business} <i className="bi bi-arrow-up-right" /></Link>
      </div>

      <div className="strategy-home__search">
        <div className="strategy-home__search-head">
          <h2>{copy.searchTitle}</h2>
          <p>{copy.searchText}</p>
        </div>
        <div className="strategy-home__columns">
          <div><h3>{copy.operationTitle}</h3><ul>{copy.operations.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div><h3>{copy.locationTitle}</h3><ul className="two-columns">{locations.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div><h3>{copy.rangeTitle}</h3><ul>{ranges.map(item => <li key={item}>{item}</li>)}</ul></div>
        </div>
        <p className="strategy-home__note">{copy.note}</p>
      </div>
    </div>

    <style jsx>{`
      .strategy-home{padding:120px 0;background:#f7f4ef;color:#17201f}.strategy-home__intro{display:grid;grid-template-columns:1.05fr .95fr;gap:90px}.strategy-home__eyebrow{display:block;margin-bottom:22px;color:#a67c3c;font-size:13px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}.strategy-home h1{font-size:clamp(46px,5vw,76px);line-height:1.02;letter-spacing:-.045em}.strategy-home__copy p{color:#5c6260;font-size:17px;line-height:1.75}.strategy-home__copy .lead{color:#17201f;font-size:21px}.strategy-home__copy strong{display:block;margin-top:24px;color:#a67c3c;font-size:20px;font-style:italic}.strategy-home__actions{display:flex;align-items:center;flex-wrap:wrap;gap:14px 28px;margin:55px 0 90px;padding-top:35px;border-top:1px solid #d7d1c7}.strategy-btn{padding:16px 24px;border:1px solid #17201f;color:#17201f;font-weight:600}.strategy-btn--dark,.strategy-btn:hover{background:#17201f;color:#fff}.strategy-link{color:#17201f;font-weight:600;border-bottom:1px solid #9f9688;padding:8px 0}.strategy-home__search{padding:55px;background:#fff;box-shadow:0 25px 70px rgba(29,36,34,.08)}.strategy-home__search-head{display:grid;grid-template-columns:1.15fr .85fr;gap:70px;padding-bottom:40px;border-bottom:1px solid #ddd8d0}.strategy-home h2{font-size:clamp(34px,3.5vw,52px);line-height:1.08}.strategy-home__search-head p,.strategy-home__note{color:#6a706e;font-size:17px;line-height:1.7}.strategy-home__columns{display:grid;grid-template-columns:.9fr 1.1fr 1.25fr;gap:50px;padding:45px 0}.strategy-home h3{margin-bottom:22px;font-size:18px}.strategy-home ul{list-style:none;padding:0;margin:0}.strategy-home li{position:relative;margin:11px 0;padding-left:18px;color:#585f5d;font-size:15px}.strategy-home li:before{content:'';position:absolute;left:0;top:.7em;width:6px;height:6px;border-radius:50%;background:#b58d50}.two-columns{columns:2}.strategy-home__note{margin:0;padding-top:25px;border-top:1px solid #ddd8d0}@media(max-width:991px){.strategy-home{padding:80px 0}.strategy-home__intro,.strategy-home__search-head{grid-template-columns:1fr;gap:30px}.strategy-home__columns{grid-template-columns:1fr 1fr}.strategy-home__actions{margin-bottom:60px}}@media(max-width:575px){.strategy-home h1{font-size:40px}.strategy-home__search{padding:30px 22px}.strategy-home__columns{grid-template-columns:1fr}.two-columns{columns:1}.strategy-home__actions{align-items:stretch}.strategy-btn{width:100%;text-align:center}}
    `}</style>
  </section>
  )
}

export default BLockFeatureOne
