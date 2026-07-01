const differences = [
  {
    number: "01",
    title: "Análisis antes de acción",
    text: "Cada decisión se basa en información. Antes de promover, vender, rentar o recomendar una ubicación, analizamos el contexto y el potencial real.",
  },
  {
    number: "02",
    title: "Estrategia antes de promoción",
    text: "No publicamos propiedades sin dirección. Creamos una narrativa comercial, definimos el perfil del prospecto y estructuramos la forma correcta de presentar cada activo.",
  },
  {
    number: "03",
    title: "Confianza antes de cierre",
    text: "Una operación inmobiliaria segura requiere claridad. Por eso acompañamos cada etapa con comunicación, seguimiento y coordinación profesional.",
  },
]

const StrategicContent = () => (
  <section className="about-strategy" aria-labelledby="about-strategy-title">
    <div className="container">
      <div className="about-strategy__opening">
        <div>
          <span className="about-strategy__eyebrow">Where vision meets strategy</span>
          <h1 id="about-strategy-title">ZeVi Capital: donde la visión se encuentra con la estrategia</h1>
        </div>
        <div className="about-strategy__lead">
          <p>ZeVi Capital es una firma especializada en expansión empresarial, inversión inmobiliaria y manejo estratégico de activos.</p>
          <p>Nacimos con una convicción clara: una propiedad no debe estar detenida. Un activo inmobiliario debe generar movimiento, valor y oportunidades.</p>
          <p>Acompañamos a propietarios, empresas e inversionistas en decisiones inmobiliarias importantes, integrando análisis comercial, visión patrimonial, estructura operativa y acompañamiento estratégico.</p>
          <p>Nuestro enfoque está diseñado para quienes buscan algo más que una transacción. Trabajamos para construir operaciones inteligentes, sostenibles y alineadas con objetivos de crecimiento.</p>
        </div>
      </div>

      <div className="about-strategy__pillars">
        <article>
          <span>01 · Visión inmobiliaria estratégica</span>
          <h2>Nuestra visión</h2>
          <p>Ser una firma referente en expansión empresarial y estructuración inmobiliaria estratégica, reconocida por conectar oportunidades, capital y territorio.</p>
          <p>Buscamos impulsar el crecimiento de empresas y optimizar el valor patrimonial de propietarios mediante soluciones seguras, inteligentes y sostenibles.</p>
          <p>Nuestra visión es crear un puente entre activos inmobiliarios, empresas en crecimiento e inversionistas con visión de largo plazo.</p>
        </article>
        <article>
          <span>02 · Consultoría inmobiliaria integral</span>
          <h2>Nuestra misión</h2>
          <p>Ofrecer soluciones integrales que articulen estrategia comercial, análisis técnico, respaldo jurídico y ejecución operativa.</p>
          <p>Facilitamos tanto la expansión de empresas como la comercialización estructurada de activos inmobiliarios, garantizando certeza, eficiencia y valor en cada operación.</p>
          <p>Nuestra misión es transformar la complejidad inmobiliaria en procesos claros, medibles y ejecutables.</p>
        </article>
      </div>

      <div className="about-strategy__difference">
        <div className="about-strategy__difference-head">
          <div>
            <span className="about-strategy__eyebrow">Firma inmobiliaria boutique</span>
            <h2>Lo que nos hace diferentes</h2>
          </div>
          <div>
            <p className="statement">No trabajamos desde la improvisación. Trabajamos desde la estrategia.</p>
            <p>En ZeVi Capital analizamos cada activo y cada proyecto desde múltiples ángulos: ubicación, mercado, documentación, perfil del comprador, competencia, viabilidad, riesgos y potencial de retorno.</p>
            <p>Esto nos permite diseñar estrategias inmobiliarias más precisas, más profesionales y más alineadas con los objetivos del cliente.</p>
          </div>
        </div>
        <div className="about-strategy__cards">
          {differences.map(item => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>

    <style jsx>{`
      .about-strategy{padding:120px 0;background:#f7f4ef;color:#18201f}.about-strategy__opening{display:grid;grid-template-columns:1.05fr .95fr;gap:90px}.about-strategy__eyebrow,.about-strategy__pillars article>span{display:block;margin-bottom:20px;color:#a77d3d;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}.about-strategy h1{font-size:clamp(46px,5vw,75px);line-height:1.03;letter-spacing:-.045em}.about-strategy p{color:#5e6462;font-size:17px;line-height:1.75}.about-strategy__lead p:first-child{color:#18201f;font-size:22px}.about-strategy__pillars{display:grid;grid-template-columns:1fr 1fr;gap:1px;margin-top:95px;background:#d9d3ca;border:1px solid #d9d3ca}.about-strategy__pillars article{padding:55px;background:#fff}.about-strategy h2{margin-bottom:25px;font-size:clamp(34px,3vw,48px);letter-spacing:-.03em}.about-strategy__difference{margin-top:100px}.about-strategy__difference-head{display:grid;grid-template-columns:1fr 1fr;gap:80px;padding-bottom:50px;border-bottom:1px solid #d9d3ca}.about-strategy__difference .statement{color:#18201f;font-size:22px;font-weight:500}.about-strategy__cards{display:grid;grid-template-columns:repeat(3,1fr);gap:0}.about-strategy__cards article{padding:45px 35px;border-right:1px solid #d9d3ca}.about-strategy__cards article:last-child{border-right:0}.about-strategy__cards span{display:block;margin-bottom:45px;color:#a77d3d;font-size:14px;font-weight:700}.about-strategy h3{margin-bottom:18px;font-size:24px}@media(max-width:991px){.about-strategy{padding:80px 0}.about-strategy__opening,.about-strategy__difference-head{grid-template-columns:1fr;gap:35px}.about-strategy__pillars{margin-top:65px}.about-strategy__cards{grid-template-columns:1fr}.about-strategy__cards article{border-right:0;border-bottom:1px solid #d9d3ca}}@media(max-width:575px){.about-strategy h1{font-size:40px}.about-strategy__pillars{grid-template-columns:1fr}.about-strategy__pillars article{padding:35px 25px}.about-strategy__difference{margin-top:70px}.about-strategy__cards article{padding:35px 10px}}
    `}</style>
  </section>
)

export default StrategicContent
