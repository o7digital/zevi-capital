const differences = [
  {
    number: "01",
    title: "Discover · Entender el objetivo",
    text: "Definimos el mandato, las necesidades y los criterios de éxito: arrendamiento, adquisición, expansión comercial o posicionamiento de un activo.",
  },
  {
    number: "02",
    title: "Evaluate · Contrastar alternativas",
    text: "Contrastamos mercado, ubicación, condiciones económicas y riesgos. Evaluamos comparables, oferta y compatibilidad con los requerimientos del proyecto.",
  },
  {
    number: "03",
    title: "Structure & Execute · Coordinar",
    text: "Organizamos alternativas, documentos y términos de negociación. Coordinamos seguimiento y cierre con las partes y los especialistas correspondientes.",
  },
]

const StrategicContent = () => (
  <section className="about-strategy" aria-labelledby="about-strategy-title">
    <div className="container">
      <div className="about-strategy__opening">
        <div>
          <span className="about-strategy__eyebrow">Where vision meets strategy</span>
          <h1 id="about-strategy-title">ZeVi | Capital: asesoría inmobiliaria e inversión estratégica</h1>
        </div>
        <div className="about-strategy__lead">
          <p>ZeVi | Capital es una firma de asesoría inmobiliaria y de inversión que acompaña a empresas, inversionistas y propietarios en la identificación, evaluación, negociación y ejecución de oportunidades inmobiliarias.</p>
          <p>Integramos información de mercado, criterio transaccional y coordinación jurídica para evaluar cada activo y las necesidades del negocio.</p>
          <p>Acompañamos decisiones de arrendamiento, adquisición, comercialización e inversión, así como proyectos de expansión empresarial y selección de ubicaciones comerciales.</p>
          <p>Desde Zona Esmeralda, Estado de México, definimos con cada cliente el alcance territorial del proyecto y los especialistas que intervienen en la operación.</p>
        </div>
      </div>

      <div className="about-strategy__pillars">
        <article>
          <span>01 · Visión inmobiliaria estratégica</span>
          <h2>Nuestra visión</h2>
          <p>Conectar empresas, capital y oportunidades inmobiliarias mediante análisis de mercado y una visión integral del activo y del negocio.</p>
          <p>Buscamos acompañar decisiones de ocupación, expansión comercial e inversión con información, criterios claros y una metodología de trabajo.</p>
          <p>Orientamos cada mandato a relaciones de largo plazo con empresas, propietarios e inversionistas, según los objetivos y el alcance acordados.</p>
        </article>
        <article>
          <span>02 · Consultoría inmobiliaria integral</span>
          <h2>Nuestra misión</h2>
          <p>Acompañar la identificación, evaluación y negociación de oportunidades inmobiliarias con análisis comercial y coordinación documental.</p>
          <p>Integramos comparables de mercado, análisis de localización, condiciones económicas y revisión preliminar de riesgos antes de recomendar alternativas.</p>
          <p>Delimitamos el alcance de cada servicio y coordinamos la participación de especialistas cuando la operación lo requiere.</p>
        </article>
      </div>

      <div className="about-strategy__difference">
        <div className="about-strategy__difference-head">
          <div>
            <span className="about-strategy__eyebrow">Real Estate & Investment Advisory</span>
            <h2>Lo que nos hace diferentes</h2>
          </div>
          <div>
            <p className="statement">Información, metodología y seguimiento para decisiones inmobiliarias.</p>
            <p>Analizamos ubicación, mercado, documentación, perfil del comprador u ocupante, condiciones comerciales y riesgos. Distinguimos los datos confirmados de las estimaciones.</p>
            <p>Definimos una ruta de análisis, selección, negociación y ejecución acorde con el objetivo del cliente y las características del activo.</p>
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
