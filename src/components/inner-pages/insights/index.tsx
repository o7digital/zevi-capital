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
    <style>{`
      .insights-page{color:#17201f}.insights-hero{padding:150px 0 120px;background:linear-gradient(90deg,rgba(18,28,27,.92),rgba(18,28,27,.62)),url('/images/thought-catalog-505eectW54k-unsplash.jpg') center/cover no-repeat;color:#fff}.insights-hero span,.insights-newsletter span{display:block;margin-bottom:24px;color:#c5a36d;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}.insights-hero h1{max-width:1000px;color:#fff;font-size:clamp(55px,7vw,100px);line-height:.98;letter-spacing:-.055em}.insights-hero p{max-width:720px;margin:38px 0 0;color:rgba(255,255,255,.72);font-size:20px;line-height:1.65}.insights-list{padding:120px 0;background:#f6f3ee}.insights-list__head{display:flex;align-items:end;justify-content:space-between;gap:40px;margin-bottom:55px}.insights-list__head h2{font-size:52px}.insights-list__head p{max-width:460px;color:#686e6c;font-size:17px}.insights-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:28px}.insights-grid article{background:#fff}.insights-grid .featured{grid-column:1/-1;display:grid;grid-template-columns:1.1fr .9fr}.insights-card__image{position:relative;min-height:310px;overflow:hidden}.insights-card__image img{object-fit:cover;transition:transform .5s}.insights-grid article:hover img{transform:scale(1.025)}.insights-card__body{padding:38px}.insights-card__meta{display:flex;justify-content:space-between;gap:20px;margin-bottom:24px;color:#9a7948;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}.insights-card__body h2{font-size:30px;line-height:1.18}.featured .insights-card__body h2{font-size:42px}.insights-card__body p{color:#686e6c;font-size:16px;line-height:1.7}.insights-card__body a{display:inline-block;margin-top:18px;padding-bottom:5px;border-bottom:1px solid #9b9285;color:#17201f;font-weight:600}.insights-newsletter{padding:90px 0;background:#c5a36d}.insights-newsletter .container{display:flex;align-items:center;justify-content:space-between;gap:40px}.insights-newsletter span{color:#17201f}.insights-newsletter h2{max-width:760px;font-size:clamp(40px,4.5vw,65px);line-height:1.05}.insights-newsletter a{padding:18px 24px;background:#17201f;color:#fff;font-weight:700;white-space:nowrap}@media(max-width:991px){.insights-grid,.insights-grid .featured{grid-template-columns:1fr}.insights-list__head,.insights-newsletter .container{align-items:flex-start;flex-direction:column}.featured .insights-card__body h2{font-size:32px}}@media(max-width:575px){.insights-hero{padding:100px 0 80px}.insights-hero h1{font-size:49px}.insights-list{padding:80px 0}.insights-grid{grid-template-columns:1fr}.insights-card__body{padding:28px 22px}}
    `}</style>
  </>
)

export default Insights
