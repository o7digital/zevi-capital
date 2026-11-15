"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/contexts/TranslationContext";
import { advisoryCopy, divisions, type Division } from "@/data/advisory";

export function AdvisoryHero() {
  const { locale } = useTranslation();
  const copy = advisoryCopy[locale];
  return (
    <section className="advisory-hero" aria-labelledby="advisory-title">
      <div className="container advisory-hero__grid">
        <div className="advisory-hero__content">
          <span className="advisory-eyebrow">Real Estate & Investment Advisory</span>
          <h1 id="advisory-title">{copy.heroTitle}</h1>
          <p className="advisory-signature">Where vision meets strategy.</p>
          <p>{copy.heroText}</p>
          <div className="advisory-actions">
            <Link className="advisory-button" href="/contact">{copy.contact} <span aria-hidden="true">↗</span></Link>
            <Link className="advisory-text-link" href="/services">{copy.explore} <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="advisory-hero__image">
          <Image src="/images/hammer-group-fxIcYymZHJg-unsplash.webp" alt={locale === "es" ? "Espacio de oficinas y sala de reuniones" : locale === "fr" ? "Bureaux et salle de réunion" : "Office space and meeting room"} fill priority sizes="100vw" />
          <span>ZeVi | Capital</span>
        </div>
      </div>
    </section>
  );
}

export function DivisionCards() {
  const { locale } = useTranslation();
  return (
    <div className="advisory-cards">
      {divisions.map((division, index) => (
        <article key={division.slug}>
          <span className="advisory-card-number">0{index + 1}</span>
          <h3><Link href={division.href}>{division.title} <span aria-hidden="true">↗</span></Link></h3>
          <p>{division[locale].summary}</p>
        </article>
      ))}
    </div>
  );
}

export function AdvisorySolutions() {
  const { locale } = useTranslation();
  const copy = advisoryCopy[locale];
  return (
    <section className="advisory-section" id="solutions" aria-labelledby="solutions-title">
      <div className="container">
        <div className="advisory-section-intro">
          <div><span className="advisory-eyebrow">Real Estate & Investment Advisory</span><h2 id="solutions-title">{copy.solutionsTitle}</h2></div>
          <p>{copy.solutionsText}</p>
        </div>
        <DivisionCards />
      </div>
    </section>
  );
}

export function AdvisoryMethod() {
  const { locale } = useTranslation();
  const copy = advisoryCopy[locale];
  return (
    <section className="advisory-section advisory-method" aria-labelledby="method-title">
      <div className="container">
        <span className="advisory-eyebrow">Discover. Evaluate. Structure. Execute.</span>
        <h2 id="method-title">{copy.methodTitle}</h2>
        <ol className="advisory-steps">
          {["Discover", "Evaluate", "Structure", "Execute"].map((step, i) => (
            <li key={step}><span>0{i + 1}</span><h3>{step}</h3><p>{copy.steps[i]}</p></li>
          ))}
        </ol>
        <div className="advisory-audience"><h2>{copy.audienceTitle}</h2><ul>{copy.audience.map(item => <li key={item}>{item}</li>)}</ul></div>
      </div>
    </section>
  );
}

export function LocalExpertise() {
  const { locale } = useTranslation();
  const copy = advisoryCopy[locale];
  return (
    <section className="advisory-section advisory-local" aria-labelledby="local-title">
      <div className="container advisory-section-intro">
        <div><span className="advisory-eyebrow">Zona Esmeralda · Estado de México</span><h2 id="local-title">{copy.localTitle}</h2></div>
        <div><p>{copy.localText}</p><p>{copy.localNote}</p><Link className="advisory-text-link" href="#properties">{copy.properties} <span aria-hidden="true">→</span></Link></div>
      </div>
    </section>
  );
}

export function AdvisoryAbout() {
  const { locale } = useTranslation();
  const copy = advisoryCopy[locale];
  return (
    <>
      <section className="advisory-section advisory-about">
        <div className="container">
          <span className="advisory-eyebrow">ZeVi | Capital · Real Estate & Investment Advisory</span>
          <h1>{copy.aboutTitle}</h1>
          <p className="advisory-signature">Where vision meets strategy.</p>
          <div className="advisory-section-intro"><p className="advisory-lead">{copy.aboutText}</p><p>{copy.aboutSecond}</p></div>
          <ul className="advisory-values">{copy.aboutValues.map((value, i) => <li key={value}><span>0{i + 1}</span>{value}</li>)}</ul>
        </div>
      </section>
      <AdvisoryMethod />
      <section className="advisory-section"><div className="container advisory-section-intro"><h2>{copy.aboutClosing}</h2><Link className="advisory-button" href="/contact">{copy.contact} <span aria-hidden="true">↗</span></Link></div></section>
    </>
  );
}

export function AdvisoryServices() {
  const { locale } = useTranslation();
  const copy = advisoryCopy[locale];
  return (
    <>
      <section className="advisory-section advisory-services-hero"><div className="container">
        <span className="advisory-eyebrow">ZeVi | Capital · Real Estate & Investment Advisory</span>
        <h1>{copy.solutionsTitle}</h1>
        <p className="advisory-lead">{copy.solutionsText}</p>
        <Link className="advisory-button" href="/contact">{copy.contact} <span aria-hidden="true">↗</span></Link>
      </div></section>
      <section className="advisory-section"><div className="container"><DivisionCards /></div></section>
      <AdvisoryMethod />
    </>
  );
}

export function DivisionContent({ division }: { division: Division }) {
  const { locale } = useTranslation();
  const copy = advisoryCopy[locale];
  const content = division[locale];
  return (
    <>
      <section className="advisory-section advisory-services-hero"><div className="container">
        <nav aria-label={locale === "es" ? "Ruta de navegación" : locale === "fr" ? "Fil d’Ariane" : "Breadcrumb"} className="advisory-breadcrumb"><Link href="/">{copy.home}</Link><span aria-hidden="true">/</span><Link href="/services">{copy.services}</Link><span aria-hidden="true">/</span><span aria-current="page">{division.title}</span></nav>
        <span className="advisory-eyebrow">{division.title}</span>
        <h1>{content.heading}</h1>
        <p className="advisory-lead">{content.summary}</p>
        <Link className="advisory-button" href={`/contact?service=${division.slug}`}>{copy.contact} <span aria-hidden="true">↗</span></Link>
      </div></section>
      <section className="advisory-section"><div className="container advisory-section-intro">
        <div><h2>{copy.scope}</h2><p>{content.text}</p><p className="advisory-note">{content.note}</p></div>
        <ul className="advisory-deliverables">{content.items.map(item => <li key={item}>{item}</li>)}</ul>
      </div></section>
      <section className="advisory-section advisory-related"><div className="container"><h2>{copy.related}</h2><div className="advisory-related-links">{divisions.filter(item => item.slug !== division.slug).map(item => <Link key={item.slug} href={item.href}>{item.title} <span aria-hidden="true">↗</span></Link>)}</div><Link className="advisory-text-link" href="/services">{copy.back} <span aria-hidden="true">→</span></Link></div></section>
    </>
  );
}
