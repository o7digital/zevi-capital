import Image from "next/image"
import Link from "next/link"
import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import FancyBanner from "@/components/common/FancyBanner"

const articles = [
  { category: "Expansión", read: "8 min", image: "/assets/images/blog/blog_img_13.jpg", title: "Cómo construir una estrategia de expansión territorial antes de buscar locales", excerpt: "Cobertura, demanda, competencia y operación: las variables que deben definirse antes de iniciar una búsqueda inmobiliaria." },
  { category: "Activos", read: "6 min", image: "/assets/images/blog/blog_img_09.jpg", title: "De activo detenido a activo productivo: cuatro rutas para recuperar valor", excerpt: "Venta, renta, reconversión o asociación: cómo evaluar la salida adecuada según el perfil y potencial de cada inmueble." },
  { category: "Ubicación", read: "7 min", image: "/assets/images/blog/blog_img_16.jpg", title: "Site selection: qué datos realmente importan al elegir una nueva ubicación", excerpt: "Una metodología para comparar ubicaciones con criterios comerciales, logísticos, demográficos y operativos." },
  { category: "Industrial", read: "5 min", image: "/assets/images/blog/blog_img_04.jpg", title: "Corredores industriales emergentes: cómo leer una oportunidad antes del mercado", excerpt: "Infraestructura, talento, conectividad y demanda: señales para detectar territorios con potencial de crecimiento." },
  { category: "Negociación", read: "6 min", image: "/assets/images/blog/blog_img_11.jpg", title: "Renta corporativa: siete variables que pesan más que el precio por metro cuadrado", excerpt: "Plazos, adecuaciones, garantías, mantenimiento y flexibilidad operativa pueden cambiar por completo el valor de un contrato." },
  { category: "Certeza", read: "7 min", image: "/assets/images/blog/blog_img_06.jpg", title: "El data room inmobiliario: la herramienta que acelera operaciones complejas", excerpt: "Qué información debe estar lista para reducir fricción, responder preguntas críticas y generar confianza en compradores e inversionistas." },
]

const Insights = () => (
  <>
    <HeaderOne style={true} />
    <main className="insights-page">
      <section className="insights-hero">
        <div className="container">
          <span>ZeVi Capital · Inteligencia inmobiliaria</span>
          <h1>Ideas para tomar mejores decisiones inmobiliarias.</h1>
          <p>Análisis sobre territorio, activos, expansión empresarial e inversión estratégica. Perspectivas diseñadas para convertir información en dirección.</p>
        </div>
      </section>
      <section className="insights-list">
        <div className="container">
          <div className="insights-list__head"><h2>Insights recientes</h2><p>Contenido original enfocado en decisiones inmobiliarias de alto impacto.</p></div>
          <div className="insights-grid">
            {articles.map((article, index) => (
              <article key={article.title} className={index === 0 ? "featured" : ""}>
                <div className="insights-card__image"><Image src={article.image} alt={article.title} fill sizes={index === 0 ? "(max-width: 991px) 100vw, 66vw" : "(max-width: 991px) 100vw, 33vw"} /></div>
                <div className="insights-card__body">
                  <div className="insights-card__meta"><span>{article.category}</span><span>{article.read} de lectura</span></div>
                  <h2>{article.title}</h2><p>{article.excerpt}</p>
                  <Link href="/contact">Conversar sobre este tema <i className="bi bi-arrow-up-right" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="insights-newsletter"><div className="container"><div><span>Perspectiva ZeVi</span><h2>Información que mueve activos y empresas.</h2></div><Link href="/contact">Recibir próximos insights <i className="bi bi-arrow-right" /></Link></div></section>
    </main>
    <FancyBanner style={false} />
    <FooterOne style={false} />
  </>
)

export default Insights
