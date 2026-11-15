"use client";
import Link from "next/link";
import { useTranslation } from "@/contexts/TranslationContext";
import { advisoryCopy, divisions } from "@/data/advisory";

export default function NavMenu() {
  const { t, locale } = useTranslation();
  const copy = advisoryCopy[locale];
  return (
    <ul className="navbar-nav align-items-lg-center">
      <li className="nav-item"><Link className="nav-link" href="/">{t("nav.home")}</Link></li>
      <li className="nav-item">
        <details className="advisory-service-menu"><summary>{t("nav.sales")}</summary><ul>
          <li><Link href="/services">{copy.back}</Link></li>
          {divisions.map(division => <li key={division.slug}><Link href={division.href}>{division.title}</Link></li>)}
        </ul></details>
      </li>
      <li className="nav-item"><Link className="nav-link" href="/#properties">{locale === "es" ? "Propiedades" : locale === "fr" ? "Propriétés" : "Properties"}</Link></li>
      <li className="nav-item"><Link className="nav-link" href="/about_us_01">{t("nav.aboutUs")}</Link></li>
      <li className="nav-item"><Link className="nav-link" href="/faq">{t("nav.faq")}</Link></li>
      <li className="nav-item"><Link className="nav-link" href="/contact">{t("nav.contactUs")}</Link></li>
    </ul>
  );
}
