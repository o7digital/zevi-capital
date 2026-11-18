import Link from "next/link"
import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import FancyBanner from "@/components/common/FancyBanner"

const services = [
  {
    "number": "01",
    "title": "Retail & Corporate Expansion",
    "intro": "Expansión comercial y selección de ubicaciones para marcas, cadenas y operadores.",
    "text": "Integramos búsqueda de locales comerciales, análisis de zona, compatibilidad comercial, negociación de rentas y coordinación con propietarios. El objetivo es una ubicación coherente con el formato, el mercado y el crecimiento de cada negocio.",
    "subtitle": "Expansión empresarial y site selection",
    "items": [
      "Definición del formato y criterios de ubicación",
      "Búsqueda de locales comerciales",
      "Site selection México",
      "Análisis de zona",
      "Ubicaciones para franquicias",
      "Contacto con propietarios",
      "Compatibilidad comercial",
      "Negociación de arrendamientos",
      "Seguimiento del cierre"
    ]
  },
  {
    "number": "02",
    "title": "Capital Markets",
    "intro": "Inversión inmobiliaria comercial, adquisición y manejo de activos inmobiliarios.",
    "text": "Apoyamos la evaluación de terrenos, inmuebles generadores de renta y proyectos con potencial de inversión. Consideramos condiciones de mercado, perfil de comprador, documentación y estructura de la transacción para definir alternativas de adquisición, disposición y comercialización.",
    "subtitle": "Evaluación y estrategia del activo",
    "items": [
      "Diagnóstico del activo",
      "Análisis de comparables",
      "Evaluación de inmuebles generadores de renta",
      "Adquisición de activos inmobiliarios",
      "Comercialización de terrenos",
      "Perfil del comprador",
      "Documentación de la transacción",
      "Coordinación y seguimiento"
    ],
    "quote": "No se prometen rendimientos ni se sustituye asesoría financiera regulada."
  },
  {
    "number": "03",
    "title": "Industrial & Logistics",
    "intro": "Asesoría para la ocupación, comercialización y adquisición de inmuebles industriales.",
    "text": "Identificamos naves, terrenos, parques industriales y oportunidades build-to-suit conforme a los requerimientos técnicos, financieros y operativos de cada proyecto. Evaluamos superficies, andenes, alturas, conectividad, infraestructura, disponibilidad y condiciones contractuales antes de recomendar alternativas.",
    "subtitle": "Requerimientos de logística inmobiliaria",
    "items": [
      "Renta de naves industriales",
      "Parques industriales",
      "Terrenos industriales",
      "Build to suit México",
      "Superficies, alturas y andenes",
      "Conectividad e infraestructura",
      "Condiciones de arrendamiento",
      "Adquisición y negociación"
    ]
  },
  {
    "number": "04",
    "title": "Research & Market Intelligence",
    "intro": "Inteligencia inmobiliaria para decisiones de negocio.",
    "text": "Integramos comparables de mercado, análisis de oferta, corredores industriales, accesibilidad, condiciones comerciales y viabilidad preliminar de ubicaciones. La información se documenta con fecha, fuente y alcance; se distingue entre datos confirmados y estimaciones.",
    "subtitle": "Análisis de mercado y localización",
    "items": [
      "Comparables de mercado",
      "Análisis de oferta",
      "Corredores industriales",
      "Accesibilidad y localización",
      "Condiciones comerciales",
      "Fuentes, fechas y estimaciones"
    ]
  },
  {
    "number": "05",
    "title": "Comercialización de activos inmobiliarios",
    "intro": "Presentación profesional y una estrategia dirigida al comprador u ocupante adecuado.",
    "text": "Partimos del diagnóstico del activo, el mercado y el perfil de los prospectos. Organizamos fichas comerciales, materiales visuales y canales de difusión para acompañar la prospección, las visitas, la negociación y el seguimiento de cada oportunidad.",
    "subtitle": "Posicionamiento y seguimiento comercial",
    "items": [
      "Diagnóstico del activo",
      "Perfil del comprador u ocupante",
      "Estrategia de posicionamiento",
      "Fichas comerciales y presentaciones",
      "Material visual del inmueble",
      "Canales de difusión por sector",
      "Prospección y seguimiento",
      "Negociación y cierre"
    ]
  },
  {
    "number": "06",
    "title": "Legal & Transaction Advisory",
    "intro": "Coordinación jurídica y documental de operaciones inmobiliarias.",
    "text": "Acompañamos cartas de intención, arrendamientos, compraventas, análisis preliminar de riesgos y procesos de due diligence. El alcance y la prestación de servicios jurídicos especializados se delimitan contractualmente según cada asunto.",
    "subtitle": "Due diligence y negociación inmobiliaria",
    "items": [
      "Revisión documental",
      "Cartas de intención",
      "Due diligence inmobiliario",
      "Asesoría en arrendamiento comercial",
      "Negociación inmobiliaria corporativa",
      "Condiciones de compraventa",
      "Identificación de riesgos",
      "Coordinación jurídica",
      "Seguimiento del cierre"
    ]
  }
]

const Services = () => (
  <>
    <HeaderOne style={true} />
    <main className="services-page">
      <section className="services-hero">
        <div className="container">
          <span>ZeVi | Capital · Real Estate & Investment Advisory</span>
          <h1>Consultoría inmobiliaria corporativa para empresas e inversionistas</h1>
          <p>Conectamos empresas, capital y oportunidades inmobiliarias mediante análisis de mercado, asesoría transaccional y estrategias de expansión.</p>
          <Link href="/contact">Hablar con un asesor corporativo <i className="bi bi-arrow-up-right" /></Link>
        </div>
      </section>
      <section className="services-intro"><div className="container"><span>Nuestro enfoque</span><h2>Soluciones estratégicas para cada decisión inmobiliaria.</h2><p>Entendemos el objetivo de cada proyecto: optimizar una operación logística, abrir nuevas unidades comerciales, evaluar una adquisición o posicionar un activo ante compradores y ocupantes calificados.</p></div></section>
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
  </>
)

export default Services
