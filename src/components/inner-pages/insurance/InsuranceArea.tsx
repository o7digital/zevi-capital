import Link from "next/link"

const services = [
  {
    number: "01",
    eyebrow: "Revisión de propiedades · Análisis documental",
    title: "Due diligence inmobiliario",
    text: "Coordinamos la revisión documental y el análisis preliminar de riesgos del inmueble para acompañar procesos de due diligence antes de avanzar en una operación.",
    details: ["Documentación del activo", "Condiciones de la operación", "Identificación preventiva de riesgos"],
  },
  {
    number: "02",
    eyebrow: "Riesgo inmobiliario · Evaluación de inversión",
    title: "Análisis de riesgo comercial",
    text: "Evaluamos factores que pueden impactar la viabilidad de una propiedad: ubicación, demanda, competencia, precio, condiciones de mercado, accesibilidad y perfil del comprador o arrendatario.",
    details: ["Mercado y competencia", "Demanda y accesibilidad", "Perfil comercial y viabilidad"],
  },
  {
    number: "03",
    eyebrow: "Contratos inmobiliarios · Operación segura",
    title: "Legal & Transaction Advisory",
    text: "Coordinamos cartas de intención, arrendamientos y compraventas con los especialistas correspondientes. El alcance de los servicios jurídicos se delimita contractualmente.",
    details: ["Coordinación con especialistas", "Revisión de elementos críticos", "Seguimiento estructurado"],
  },
]

const InsuranceArea = () => (
  <main className="certainty-page">
    <section className="certainty-intro">
      <div className="container">
        <div className="certainty-intro__grid">
          <div>
            <span className="certainty-eyebrow">Legal & Transaction Advisory</span>
            <h1>Due diligence inmobiliario y asesoría transaccional</h1>
          </div>
          <div className="certainty-intro__copy">
            <p className="lead">Análisis documental y coordinación para cada operación inmobiliaria.</p>
            <p>La asesoría en arrendamiento comercial, adquisición de activos y negociación inmobiliaria corporativa requiere evaluar documentos, condiciones económicas y riesgos.</p>
            <p>En ZeVi | Capital organizamos la información y el seguimiento de la transacción. El alcance y la prestación de servicios jurídicos especializados se acuerdan según cada asunto.</p>
            <Link href="/contact" className="certainty-cta">Solicitar una evaluación <i className="bi bi-arrow-up-right" /></Link>
          </div>
        </div>
        <div className="certainty-principles">
          <span>Análisis documental</span><span>Evaluación de riesgos</span><span>Coordinación profesional</span><span>Certeza patrimonial</span>
        </div>
      </div>
    </section>

    <section className="certainty-services">
      <div className="container">
        <div className="certainty-services__head">
          <span className="certainty-eyebrow">Nuestro enfoque preventivo</span>
          <h2>Claridad antes de cada decisión</h2>
          <p>Integramos criterios documentales, comerciales y operativos para que cada operación avance con una base más sólida.</p>
        </div>
        <div className="certainty-services__grid">
          {services.map(service => (
            <article key={service.number}>
              <div className="certainty-card__number">{service.number}</div>
              <span>{service.eyebrow}</span>
              <h2>{service.title}</h2>
              <p>{service.text}</p>
              <ul>{service.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="certainty-footer-cta">
      <div className="container">
        <div>
          <span className="certainty-eyebrow">Decisiones con fundamento</span>
          <h2>Avanza con mayor claridad y seguridad.</h2>
        </div>
        <Link href="/contact" className="certainty-cta certainty-cta--light">Hablar con un asesor <i className="bi bi-arrow-right" /></Link>
      </div>
    </section>
  </main>
)

export default InsuranceArea
