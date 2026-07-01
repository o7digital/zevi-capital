"use client"

import Link from "next/link"

const operations = ["Comprar propiedad", "Rentar propiedad", "Vender propiedad", "Rentar espacio industrial", "Invertir en inmueble", "Buscar terreno estratégico"]
const locations = ["Ciudad de México", "Monterrey", "Guadalajara", "Querétaro", "Puebla", "Mérida", "Cancún", "Playa del Carmen", "Tulum", "Los Cabos", "Estado de México", "Bajío", "Riviera Maya"]
const ranges = ["Desde $2,000,000 hasta $30,000,000 MXN", "$2,000,000 - $5,000,000 MXN", "$5,000,000 - $10,000,000 MXN", "$10,000,000 - $30,000,000 MXN", "Más de $30,000,000 MXN", "Precio a consultar"]

const BLockFeatureOne = () => (
  <section className="strategy-home" aria-labelledby="strategy-title">
    <div className="container">
      <div className="strategy-home__intro">
        <div>
          <span className="strategy-home__eyebrow">ZeVi Capital · México</span>
          <h1 id="strategy-title">Expansión empresarial e inversión inmobiliaria estratégica en México</h1>
        </div>
        <div className="strategy-home__copy">
          <p className="lead">En ZeVi Capital conectamos visión, capital, territorio y estrategia para transformar oportunidades inmobiliarias en operaciones reales, rentables y seguras.</p>
          <p>Acompañamos a empresas que buscan expandirse, propietarios que desean maximizar el valor de sus activos e inversionistas que buscan oportunidades inmobiliarias con potencial en México.</p>
          <p>No somos una inmobiliaria tradicional. Somos una firma estratégica que integra análisis de mercado, visión comercial, evaluación técnica, respaldo jurídico y ejecución operativa para que cada decisión inmobiliaria tenga fundamento, dirección y valor.</p>
          <strong>Where vision meets strategy.</strong>
        </div>
      </div>

      <div className="strategy-home__actions">
        <Link href="/contact" className="strategy-btn strategy-btn--dark">Solicitar asesoría</Link>
        <Link href="/listing_01" className="strategy-btn">Ver propiedades</Link>
        <Link href="/contact" className="strategy-link">Quiero vender o rentar mi propiedad <i className="bi bi-arrow-up-right" /></Link>
        <Link href="/contact" className="strategy-link">Busco ubicación para mi empresa <i className="bi bi-arrow-up-right" /></Link>
      </div>

      <div className="strategy-home__search">
        <div className="strategy-home__search-head">
          <h2>Encuentra oportunidades inmobiliarias estratégicas en México</h2>
          <p>Explora propiedades comerciales, industriales, corporativas, hoteleras, residenciales premium, terrenos y activos con potencial de inversión.</p>
        </div>
        <div className="strategy-home__columns">
          <div><h3>Tipo de operación</h3><ul>{operations.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div><h3>Ubicación</h3><ul className="two-columns">{locations.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div><h3>Rango de inversión</h3><ul>{ranges.map(item => <li key={item}>{item}</li>)}</ul></div>
        </div>
        <p className="strategy-home__note">Ya sea que busques comprar, rentar, vender, invertir o expandir tu empresa, ZeVi Capital te ayuda a identificar la oportunidad adecuada.</p>
      </div>
    </div>

    <style jsx>{`
      .strategy-home{padding:120px 0;background:#f7f4ef;color:#17201f}.strategy-home__intro{display:grid;grid-template-columns:1.05fr .95fr;gap:90px}.strategy-home__eyebrow{display:block;margin-bottom:22px;color:#a67c3c;font-size:13px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}.strategy-home h1{font-size:clamp(46px,5vw,76px);line-height:1.02;letter-spacing:-.045em}.strategy-home__copy p{color:#5c6260;font-size:17px;line-height:1.75}.strategy-home__copy .lead{color:#17201f;font-size:21px}.strategy-home__copy strong{display:block;margin-top:24px;color:#a67c3c;font-size:20px;font-style:italic}.strategy-home__actions{display:flex;align-items:center;flex-wrap:wrap;gap:14px 28px;margin:55px 0 90px;padding-top:35px;border-top:1px solid #d7d1c7}.strategy-btn{padding:16px 24px;border:1px solid #17201f;color:#17201f;font-weight:600}.strategy-btn--dark,.strategy-btn:hover{background:#17201f;color:#fff}.strategy-link{color:#17201f;font-weight:600;border-bottom:1px solid #9f9688;padding:8px 0}.strategy-home__search{padding:55px;background:#fff;box-shadow:0 25px 70px rgba(29,36,34,.08)}.strategy-home__search-head{display:grid;grid-template-columns:1.15fr .85fr;gap:70px;padding-bottom:40px;border-bottom:1px solid #ddd8d0}.strategy-home h2{font-size:clamp(34px,3.5vw,52px);line-height:1.08}.strategy-home__search-head p,.strategy-home__note{color:#6a706e;font-size:17px;line-height:1.7}.strategy-home__columns{display:grid;grid-template-columns:.9fr 1.1fr 1.25fr;gap:50px;padding:45px 0}.strategy-home h3{margin-bottom:22px;font-size:18px}.strategy-home ul{list-style:none;padding:0;margin:0}.strategy-home li{position:relative;margin:11px 0;padding-left:18px;color:#585f5d;font-size:15px}.strategy-home li:before{content:'';position:absolute;left:0;top:.7em;width:6px;height:6px;border-radius:50%;background:#b58d50}.two-columns{columns:2}.strategy-home__note{margin:0;padding-top:25px;border-top:1px solid #ddd8d0}@media(max-width:991px){.strategy-home{padding:80px 0}.strategy-home__intro,.strategy-home__search-head{grid-template-columns:1fr;gap:30px}.strategy-home__columns{grid-template-columns:1fr 1fr}.strategy-home__actions{margin-bottom:60px}}@media(max-width:575px){.strategy-home h1{font-size:40px}.strategy-home__search{padding:30px 22px}.strategy-home__columns{grid-template-columns:1fr}.two-columns{columns:1}.strategy-home__actions{align-items:stretch}.strategy-btn{width:100%;text-align:center}}
    `}</style>
  </section>
)

export default BLockFeatureOne
