import Link from "next/link"
import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import FancyBanner from "@/components/common/FancyBanner"

const services = [
  {
    number: "01",
    title: "Expansión empresarial",
    intro: "Sabemos que una empresa no es solo un negocio. Es una creación, una visión y una historia construida con esfuerzo.",
    text: "Expandir una empresa requiere elegir ubicaciones correctas, entender el mercado, anticipar riesgos y estructurar cada operación con inteligencia. Acompañamos a empresas que buscan abrir nuevas unidades, ingresar a nuevas ciudades, desarrollar franquicias o crecer en zonas estratégicas.",
    subtitle: "Qué incluye",
    items: ["Búsqueda de ubicaciones", "Análisis de zonas", "Evaluación de competencia", "Estudios de mercado", "Contacto con propietarios", "Revisión de condiciones comerciales", "Análisis de viabilidad", "Negociación", "Acompañamiento hasta el cierre"],
  },
  {
    number: "02",
    title: "Manejo de activos inmobiliarios",
    intro: "Una propiedad no debe estar detenida. Debe estar generando valor para ti.",
    text: "Nos especializamos en maximizar el rendimiento de tu patrimonio con estrategias personalizadas para vender, alquilar o reposicionar cada activo frente a clientes calificados.",
    subtitle: "Qué hacemos por tu propiedad",
    items: ["Analizamos su valor", "Definimos una estrategia comercial", "Creamos materiales profesionales", "Identificamos prospectos calificados", "Promovemos en canales adecuados", "Gestionamos visitas", "Negociamos condiciones", "Acompañamos el cierre"],
    quote: "El dinero, como el agua, debe fluir para generar vida. Deja que ZeVi Capital impulse tu propiedad al siguiente nivel.",
  },
  {
    number: "03",
    title: "Comercialización inmobiliaria estructurada",
    intro: "Una propiedad no se vende únicamente por estar publicada.",
    text: "Se vende cuando está bien posicionada, bien presentada y dirigida al comprador adecuado. Desarrollamos estrategias para activos comerciales, industriales, corporativos, hoteleros, residenciales premium y terrenos.",
    subtitle: "Nuestro enfoque",
    items: ["Diagnóstico del activo", "Definición del comprador ideal", "Estrategia de posicionamiento", "Material visual y comercial", "Campañas digitales", "Prospección directa", "Seguimiento profesional", "Negociación y cierre"],
  },
  {
    number: "04",
    title: "Asesoría comercial inmobiliaria",
    intro: "Decisiones inmobiliarias con mayor claridad.",
    text: "Ayudamos a propietarios, inversionistas y empresas a resolver dudas críticas antes de vender, rentar, invertir o expandirse.",
    subtitle: "Preguntas que ayudamos a resolver",
    items: ["¿Cuál es el valor real de mi propiedad?", "¿Conviene vender o rentar?", "¿Qué comprador puede interesarse?", "¿Cómo presento mejor mi activo?", "¿Qué riesgos debo revisar?", "¿Qué ubicación conviene para una sucursal?"],
  },
  {
    number: "05",
    title: "Marketing inmobiliario",
    intro: "Presentación profesional, narrativa clara y difusión enfocada.",
    text: "En una era digital, el marketing inmobiliario es clave para generar interés real y llegar a prospectos calificados.",
    subtitle: "Herramientas",
    items: ["Ficha comercial", "Presentación ejecutiva", "Landing page de propiedad", "Galería visual", "Campañas digitales", "Prospección por sector", "Contenido para inversionistas", "Seguimiento de leads"],
  },
  {
    number: "06",
    title: "Asesoría legal y fiscal",
    intro: "Certeza para cada operación.",
    text: "Acompañamos el proceso con revisión documental y coordinación con especialistas para reducir riesgos y facilitar cierres ordenados.",
    subtitle: "Aspectos que pueden revisarse",
    items: ["Escrituras", "Uso de suelo", "Situación jurídica", "Contratos", "Cartas de intención", "Condiciones de compraventa", "Arrendamientos", "Riesgos fiscales", "Procesos de cierre"],
  },
]

const Services = () => (
  <>
    <HeaderOne style={true} />
    <main className="services-page">
      <section className="services-hero">
        <div className="container">
          <span>ZeVi Capital · Soluciones integrales</span>
          <h1>Servicios inmobiliarios estratégicos para empresas, propietarios e inversionistas</h1>
          <p>Combinamos análisis, estrategia, promoción, negociación y acompañamiento para transformar activos e ideas de expansión en operaciones concretas.</p>
          <Link href="/contact">Solicitar asesoría <i className="bi bi-arrow-up-right" /></Link>
        </div>
      </section>
      <section className="services-intro"><div className="container"><span>Nuestro enfoque</span><h2>Decisiones con impacto patrimonial, comercial y operativo.</h2><p>ZeVi Capital ofrece soluciones integrales para clientes que necesitan tomar decisiones inmobiliarias con dirección, certeza y visión de largo plazo.</p></div></section>
      <section className="services-list"><div className="container">
        {services.map((service, index) => (
          <article key={service.number} className={index % 2 ? "reverse" : ""}>
            <div className="service-title"><span>{service.number}</span><h2>{service.title}</h2><p className="lead">{service.intro}</p><p>{service.text}</p>{service.quote && <blockquote>{service.quote}</blockquote>}</div>
            <div className="service-detail"><h3>{service.subtitle}</h3><ul>{service.items.map(item => <li key={item}>{item}</li>)}</ul></div>
          </article>
        ))}
      </div></section>
      <section className="services-cta"><div className="container"><div><span>Where vision meets strategy</span><h2>Convirtamos una necesidad inmobiliaria en una estrategia ejecutable.</h2></div><Link href="/contact">Hablar con un asesor</Link></div></section>
    </main>
    <FancyBanner style={false} />
    <FooterOne style={false} />
    <style>{`
      .services-page{color:#17201f}.services-hero{padding:150px 0 120px;background:linear-gradient(90deg,rgba(18,28,27,.93),rgba(18,28,27,.64)),url('/images/retrosupply-jLwVAUtLOAQ-unsplash(1).jpg') center/cover no-repeat;color:#fff}.services-hero span,.services-intro span,.services-cta span{display:block;margin-bottom:22px;color:#c5a36d;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}.services-hero h1{max-width:1080px;color:#fff;font-size:clamp(52px,6.5vw,92px);line-height:.98;letter-spacing:-.055em}.services-hero p{max-width:760px;margin:35px 0;color:rgba(255,255,255,.78);font-size:20px;line-height:1.65}.services-hero a,.services-cta a{display:inline-block;padding:17px 24px;background:#c5a36d;color:#17201f;font-weight:700}.services-intro{padding:110px 0;background:#f4f0e9}.services-intro .container{display:grid;grid-template-columns:1fr 1fr;gap:25px 80px}.services-intro span{grid-column:1/-1}.services-intro h2{font-size:clamp(40px,4vw,62px);line-height:1.04}.services-intro p{color:#656b69;font-size:19px;line-height:1.75}.services-list{background:#fff}.services-list article{display:grid;grid-template-columns:1.15fr .85fr;gap:90px;padding:105px 0;border-bottom:1px solid #ddd8d0}.services-list article.reverse .service-title{order:2}.service-title>span{color:#b0874d;font-weight:700}.service-title h2{margin:24px 0;font-size:clamp(40px,4vw,60px);line-height:1.05}.service-title p{color:#636967;font-size:17px;line-height:1.75}.service-title .lead{color:#17201f;font-size:22px}.service-title blockquote{margin:30px 0 0;padding:24px;border-left:3px solid #c5a36d;background:#f4f0e9;font-size:19px;font-style:italic}.service-detail{align-self:start;padding:40px;background:#f4f0e9}.service-detail h3{margin-bottom:25px;font-size:23px}.service-detail ul{columns:2;list-style:none;padding:0}.service-detail li{position:relative;margin:12px 0;padding-left:18px;color:#575e5c}.service-detail li:before{content:'•';position:absolute;left:0;color:#b0874d}.services-cta{padding:90px 0;background:#17201f;color:#fff}.services-cta .container{display:flex;align-items:center;justify-content:space-between;gap:50px}.services-cta h2{max-width:800px;color:#fff;font-size:clamp(38px,4vw,58px);line-height:1.05}.services-cta a{white-space:nowrap}@media(max-width:991px){.services-intro .container,.services-list article{grid-template-columns:1fr;gap:35px}.services-list article.reverse .service-title{order:0}.services-cta .container{align-items:flex-start;flex-direction:column}}@media(max-width:575px){.services-hero{padding:100px 0 80px}.services-hero h1{font-size:46px}.services-intro,.services-list article{padding:75px 0}.service-detail{padding:30px 22px}.service-detail ul{columns:1}}
    `}</style>
  </>
)

export default Services
