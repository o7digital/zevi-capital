"use client";
import Link from "next/link";
import { useState } from "react";
import NavMenu from "./Menu/NavMenu";
import { useTranslation } from "@/contexts/TranslationContext";

export default function HeaderOne({ style }: { style?: boolean }) {
  const { locale, setLocale, t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="zevi-header">
      <div className="container zevi-header__inner">
        <Link href="/" className="zevi-brand" aria-label="ZeVi Capital — Inicio">
          <strong>ZeVi | CAPITAL</strong>
          <small>Real Estate & Investment Advisory</small>
        </Link>
        <nav className="zevi-navigation" aria-label={locale === "es" ? "Navegación principal" : locale === "fr" ? "Navigation principale" : "Main navigation"}>
          <button className="zevi-menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-controls="zeviNavigation" aria-expanded={menuOpen} aria-label={locale === "es" ? "Alternar menú" : locale === "fr" ? "Afficher ou masquer le menu" : "Toggle menu"}>{menuOpen ? "×" : "☰"}</button>
          <div className={`zevi-menu${menuOpen ? " is-open" : ""}`} id="zeviNavigation" onClick={event => {
            if ((event.target as Element).closest("a")) {
              setMenuOpen(false);
              event.currentTarget.querySelectorAll("details").forEach(details => { details.open = false; });
            }
          }}><NavMenu /></div>
        </nav>
        <div className="zevi-header__tools">
          <select value={locale} onChange={event => setLocale(event.target.value as "es" | "en" | "fr")} aria-label={locale === "es" ? "Idioma" : locale === "fr" ? "Langue" : "Language"}>
            <option value="es">ES</option><option value="en">EN</option><option value="fr">FR</option>
          </select>
          <Link href="https://zevicapital-directus-backend-lc-inmobiliaria.up.railway.app/admin" target="_blank" rel="noopener noreferrer" className="zevi-admin-link" aria-label={t("nav.login")} title={t("nav.login")}><i className="fa-regular fa-lock" aria-hidden="true" /></Link>
        </div>
      </div>
    </header>
  );
}
