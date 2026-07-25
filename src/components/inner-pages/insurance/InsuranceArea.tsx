import Link from "next/link"

const services = [
  {
    number: "01",
    eyebrow: "Revisión de propiedades · Análisis documental",
    title: "Due diligence inmobiliario",
    text: "Apoyamos en la revisión de información relevante del activo para identificar posibles riesgos antes de avanzar en una operación.",
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
    title: "Coordinación legal y fiscal",
    text: "Coordinamos con especialistas legales y fiscales para revisar elementos críticos y facilitar operaciones más ordenadas.",
    details: ["Coordinación con especialistas", "Revisión de elementos críticos", "Seguimiento estructurado"],
  },
]

const InsuranceArea = () => (
  <main className="certainty-page">
    <section className="certainty-intro">
      <div className="container">
        <div className="certainty-intro__grid">
          <div>
            <span className="certainty-eyebrow">Insurance · Manejo de riesgo y certeza</span>
            <h1>Certeza, análisis y respaldo para operaciones inmobiliarias</h1>
          </div>
          <div className="certainty-intro__copy">
            <p className="lead">Toda operación inmobiliaria implica decisiones importantes.</p>
            <p>Comprar, vender, rentar, invertir o expandirse requiere analizar riesgos, documentos, condiciones comerciales y viabilidad operativa.</p>
            <p>En ZeVi Capital integramos una visión preventiva para ayudar a nuestros clientes a avanzar con mayor claridad y seguridad.</p>
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

    <style>{`
      .certainty-page{color:#17201f}.certainty-intro{padding:120px 0 80px;background:#f4f0e9}.certainty-intro__grid{display:grid;grid-template-columns:1.08fr .92fr;gap:90px}.certainty-eyebrow{display:block;margin-bottom:20px;color:#aa8144;font-size:12px;font-weight:700;letter-spacing:.15em;text-transform:uppercase}.certainty-intro h1{font-size:clamp(48px,5.5vw,82px);line-height:1;letter-spacing:-.05em}.certainty-intro__copy p{color:#5c6360;font-size:18px;line-height:1.75}.certainty-intro__copy .lead{color:#17201f;font-size:23px;font-weight:500}.certainty-cta{display:inline-flex;align-items:center;gap:20px;margin-top:25px;padding:17px 23px;background:#17201f;color:#fff;font-weight:600}.certainty-cta:hover{color:#fff;background:#aa8144}.certainty-principles{display:grid;grid-template-columns:repeat(4,1fr);margin-top:85px;border-top:1px solid #d7d0c6;border-bottom:1px solid #d7d0c6}.certainty-principles span{padding:22px 15px;border-right:1px solid #d7d0c6;text-align:center;font-size:13px;font-weight:700;text-transform:uppercase}.certainty-principles span:last-child{border-right:0}.certainty-services{padding:120px 0;background:#fff}.certainty-services__head{display:grid;grid-template-columns:1fr 1.1fr;gap:20px 80px;max-width:1000px;margin-bottom:65px}.certainty-services__head .certainty-eyebrow{grid-column:1/-1}.certainty-services__head h2{font-size:clamp(40px,4vw,60px);line-height:1.05;letter-spacing:-.04em}.certainty-services__head p{color:#646a68;font-size:18px;line-height:1.7}.certainty-services__grid{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid #ddd8d0}.certainty-services article{display:flex;flex-direction:column;padding:45px 38px;border-right:1px solid #ddd8d0}.certainty-services article:last-child{border-right:0}.certainty-card__number{margin-bottom:55px;color:#aa8144;font-size:15px;font-weight:700}.certainty-services article>span{min-height:42px;color:#8b7351;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}.certainty-services article h2{margin:18px 0;font-size:29px;line-height:1.15}.certainty-services article p{min-height:150px;color:#666c6a;line-height:1.7}.certainty-services ul{margin:25px 0 0;padding:25px 0 0;border-top:1px solid #ddd8d0;list-style:none}.certainty-services li{position:relative;margin:10px 0;padding-left:18px;font-size:14px}.certainty-services li:before{content:'✓';position:absolute;left:0;color:#aa8144}.certainty-footer-cta{padding:85px 0;background:#17201f;color:#fff}.certainty-footer-cta .container{display:flex;align-items:center;justify-content:space-between;gap:40px}.certainty-footer-cta h2{color:#fff;font-size:clamp(38px,4vw,58px)}.certainty-cta--light{margin:0;background:#fff;color:#17201f;white-space:nowrap}@media(max-width:991px){.certainty-intro__grid,.certainty-services__head{grid-template-columns:1fr;gap:35px}.certainty-services__grid{grid-template-columns:1fr}.certainty-services article{border-right:0;border-bottom:1px solid #ddd8d0}.certainty-services article p{min-height:0}.certainty-principles{grid-template-columns:1fr 1fr}.certainty-principles span:nth-child(2){border-right:0}.certainty-footer-cta .container{align-items:flex-start;flex-direction:column}}@media(max-width:575px){.certainty-intro,.certainty-services{padding:75px 0}.certainty-intro h1{font-size:43px}.certainty-principles{grid-template-columns:1fr}.certainty-principles span{border-right:0;border-bottom:1px solid #d7d0c6}.certainty-services article{padding:35px 25px}}
    `}</style>
  </main>
)

export default InsuranceArea
