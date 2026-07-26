"use client"

import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import { useTranslation } from "@/contexts/TranslationContext"

const content = {
  es: {
    title: "Política de privacidad",
    updated: "Última actualización: 1 de julio de 2026",
    intro: "ZeVi Capital respeta su privacidad y trata los datos personales de forma responsable, transparente y segura. Esta política explica qué información recopilamos, para qué la usamos y qué derechos puede ejercer.",
    sections: [
      ["Responsable y contacto", "ZeVi Capital, con domicilio en Cto. Plaza Bona Esmeralda 1, Bosque Esmeralda, 52930 Cdad. López Mateos, Méx., es responsable del tratamiento de los datos recabados a través de este sitio. Para asuntos de privacidad: info@zevicapital.com."],
      ["Datos que podemos recopilar", "Podemos recopilar nombre, correo electrónico, teléfono, empresa, interés inmobiliario, información proporcionada en formularios, comunicaciones, datos técnicos de navegación, dirección IP, dispositivo y cookies necesarias o analíticas."],
      ["Finalidades", "Usamos la información para responder consultas, prestar servicios inmobiliarios, evaluar oportunidades, coordinar operaciones, dar seguimiento comercial, mejorar el sitio, proteger nuestros sistemas, cumplir obligaciones legales y, con autorización cuando corresponda, enviar comunicaciones relevantes."],
      ["Base legal y consentimiento", "Tratamos datos con base en el consentimiento, la ejecución de medidas precontractuales o contractuales, obligaciones legales e intereses legítimos, según la jurisdicción aplicable. Puede retirar su consentimiento cuando el tratamiento dependa de él."],
      ["Transferencias y proveedores", "Podemos compartir información estrictamente necesaria con asesores legales o fiscales, notarios, proveedores tecnológicos, analíticos y operativos, y contrapartes de una operación, sujetos a deberes de confidencialidad y protección. No vendemos datos personales."],
      ["Conservación y seguridad", "Conservamos la información solo durante el tiempo necesario para las finalidades descritas, requisitos contractuales o plazos legales. Aplicamos medidas administrativas, técnicas y organizativas razonables, aunque ningún sistema ofrece seguridad absoluta."],
      ["Sus derechos", "En México puede ejercer derechos de acceso, rectificación, cancelación y oposición, así como revocar el consentimiento o limitar el uso. Cuando resulte aplicable, residentes de California pueden solicitar conocimiento, acceso, corrección, eliminación y exclusión de venta o intercambio. Personas en el EEE, Reino Unido o Suiza pueden ejercer acceso, rectificación, supresión, limitación, oposición y portabilidad, y presentar una reclamación ante su autoridad de control."],
      ["Transferencias internacionales", "Cuando los datos se transfieran entre países, aplicaremos las salvaguardas exigidas por la legislación aplicable, incluidas medidas contractuales y de seguridad apropiadas."],
      ["Cookies", "El sitio puede utilizar cookies esenciales y, cuando corresponda, herramientas analíticas. Puede gestionar cookies desde su navegador o el mecanismo de consentimiento disponible. Desactivar ciertas cookies puede afectar algunas funciones."],
      ["Menores y enlaces externos", "Nuestros servicios no están dirigidos a menores de edad. El sitio puede contener enlaces externos; ZeVi Capital no controla sus prácticas de privacidad."],
      ["Cambios", "Podemos actualizar esta política para reflejar cambios operativos o legales. La versión vigente se publicará en esta página con su fecha de actualización."],
    ],
    note: "Este documento ofrece información general y no constituye asesoría legal.",
  },
  en: {
    title: "Privacy Policy", updated: "Last updated: July 1, 2026",
    intro: "ZeVi Capital respects your privacy and handles personal data responsibly, transparently, and securely. This policy explains what we collect, why we use it, and the rights available to you.",
    sections: [
      ["Controller and contact", "ZeVi Capital, located at Cto. Plaza Bona Esmeralda 1, Bosque Esmeralda, 52930 Cdad. López Mateos, Méx., controls data collected through this website. Privacy contact: info@zevicapital.com."],
      ["Information we collect", "We may collect your name, email, telephone, company, real estate interests, form submissions, communications, IP address, device and browsing data, and necessary or analytics cookies."],
      ["Purposes", "We use information to answer inquiries, provide real estate services, assess opportunities, coordinate transactions, follow up commercially, improve and secure the website, comply with law, and—with consent where required—send relevant communications."],
      ["Legal bases", "Depending on the jurisdiction, processing relies on consent, pre-contractual or contractual necessity, legal obligations, and legitimate interests. Consent may be withdrawn where processing depends on it."],
      ["Sharing and service providers", "We may share necessary information with legal or tax advisers, notaries, technology and analytics providers, operational partners, and transaction counterparties under confidentiality and data-protection obligations. We do not sell personal data."],
      ["Retention and security", "We retain information only as needed for the purposes described, contractual requirements, or legal periods. We use reasonable administrative, technical, and organizational safeguards, but no system is completely secure."],
      ["Your rights", "Mexico residents may exercise access, rectification, cancellation, and objection rights. Where applicable, California residents may request to know, access, correct, delete, or opt out of sale or sharing. Individuals in the EEA, UK, or Switzerland may exercise access, rectification, erasure, restriction, objection, and portability rights and complain to a supervisory authority."],
      ["International transfers", "Where data crosses borders, we apply safeguards required by applicable law, including appropriate contractual and security measures."],
      ["Cookies", "The website may use essential cookies and, where applicable, analytics tools. You may manage cookies through your browser or available consent mechanism. Disabling cookies may affect functionality."],
      ["Children and external links", "Our services are not directed to minors. External links are governed by third parties’ privacy practices."],
      ["Changes", "We may update this policy for operational or legal changes. The current version and update date will appear on this page."],
    ], note: "This document provides general information and is not legal advice.",
  },
  fr: {
    title: "Politique de confidentialité", updated: "Dernière mise à jour : 1er juillet 2026",
    intro: "ZeVi Capital respecte votre vie privée et traite les données personnelles de manière responsable, transparente et sécurisée. Cette politique précise les données collectées, leur utilisation et vos droits.",
    sections: [
      ["Responsable et contact", "ZeVi Capital, située Cto. Plaza Bona Esmeralda 1, Bosque Esmeralda, 52930 Cdad. López Mateos, Méx., est responsable des données collectées via ce site. Contact : info@zevicapital.com."],
      ["Données collectées", "Nous pouvons collecter nom, courriel, téléphone, entreprise, intérêts immobiliers, formulaires, communications, adresse IP, appareil, navigation et cookies essentiels ou analytiques."],
      ["Finalités", "Les données servent à répondre aux demandes, fournir nos services immobiliers, évaluer des opportunités, coordonner des opérations, assurer le suivi commercial, améliorer et sécuriser le site, respecter la loi et, avec votre accord lorsque requis, communiquer avec vous."],
      ["Bases juridiques", "Selon la juridiction, le traitement repose sur le consentement, les mesures précontractuelles ou contractuelles, les obligations légales et les intérêts légitimes. Le consentement peut être retiré lorsqu’il constitue la base du traitement."],
      ["Partage et prestataires", "Les informations nécessaires peuvent être transmises à des conseillers juridiques ou fiscaux, notaires, prestataires technologiques et analytiques, partenaires opérationnels et contreparties, sous obligations de confidentialité. Nous ne vendons pas les données personnelles."],
      ["Conservation et sécurité", "Nous conservons les données uniquement pendant la durée nécessaire aux finalités, contrats ou obligations légales. Des mesures administratives, techniques et organisationnelles raisonnables sont appliquées, sans garantie de sécurité absolue."],
      ["Vos droits", "Au Mexique, vous pouvez exercer les droits d’accès, rectification, annulation et opposition. Le cas échéant, les résidents californiens disposent de droits d’information, accès, correction, suppression et retrait de la vente ou du partage. Dans l’EEE, au Royaume-Uni ou en Suisse, vous pouvez demander accès, rectification, effacement, limitation, opposition et portabilité, et saisir une autorité de contrôle."],
      ["Transferts internationaux", "Lors de transferts internationaux, nous appliquons les garanties exigées par la loi applicable, notamment des mesures contractuelles et de sécurité appropriées."],
      ["Cookies", "Le site peut utiliser des cookies essentiels et des outils analytiques. Vous pouvez les gérer dans votre navigateur ou via le mécanisme de consentement. Leur désactivation peut limiter certaines fonctions."],
      ["Mineurs et liens externes", "Nos services ne s’adressent pas aux mineurs. Les liens externes relèvent des politiques de confidentialité des tiers."],
      ["Modifications", "Cette politique peut être actualisée pour refléter des changements opérationnels ou juridiques. La version en vigueur et sa date seront publiées ici."],
    ], note: "Ce document fournit des informations générales et ne constitue pas un conseil juridique.",
  },
}

export default function PrivacyPolicy() {
  const { locale } = useTranslation()
  const page = content[locale]
  return <>
    <HeaderOne style={true} />
    <main className="privacy-page"><div className="container">
      <span className="eyebrow">ZeVi Capital · Legal</span><h1>{page.title}</h1><p className="updated">{page.updated}</p><p className="intro">{page.intro}</p>
      <div className="privacy-grid">{page.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}</div>
      <p className="note">{page.note}</p>
    </div></main>
    <FooterOne style={false} />
    <style>{`.privacy-page{padding:150px 0 100px;background:#f6f3ee;color:#17201f}.privacy-page .eyebrow{color:#a67c3c;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}.privacy-page h1{margin:22px 0;font-size:clamp(52px,7vw,90px);letter-spacing:-.05em}.updated{color:#8a8f8d}.intro{max-width:900px;margin:35px 0 75px;font-size:22px;line-height:1.65}.privacy-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#d9d3ca;border:1px solid #d9d3ca}.privacy-grid section{padding:38px;background:#fff}.privacy-grid h2{font-size:24px}.privacy-grid p{color:#626866;line-height:1.75}.note{margin-top:35px;font-size:14px;font-style:italic}@media(max-width:767px){.privacy-page{padding:100px 0 70px}.privacy-grid{grid-template-columns:1fr}}`}</style>
  </>
}
