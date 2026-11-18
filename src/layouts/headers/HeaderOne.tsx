"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/contexts/TranslationContext";
import AdvisoryBrand from "@/components/common/AdvisoryBrand";
import LoginModal from "@/modals/LoginModal";
import { advisoryCopy, sectors } from "@/components/homes/home-one/advisoryContent";
import styles from "./HeaderOne.module.scss";

const HeaderOne = (_props: { style?: boolean }) => {
  const { locale, setLocale, t } = useTranslation();
  const copy = advisoryCopy[locale];
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const closeMenus = () => {
    setMenuOpen(false);
    headerRef.current?.querySelectorAll("details[open]").forEach(item => item.removeAttribute("open"));
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenus();
        headerRef.current?.querySelector<HTMLButtonElement>("[aria-controls='advisory-navigation']")?.focus();
      }
    };
    const onOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) closeMenus();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, []);

  return (
    <>
      <header ref={headerRef} className={styles.header}>
        <div className={styles.inner}>
          <AdvisoryBrand />
          <button type="button" className={styles.toggle} aria-expanded={menuOpen}
            aria-controls="advisory-navigation" aria-label={copy.menu} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
          <nav id="advisory-navigation" className={`${styles.nav} ${menuOpen ? styles.open : ""}`} aria-label={copy.navigation}>
            <details className={styles.dropdown}>
              <summary>{copy.services}<span className={styles.chevron} /></summary>
              <div className={styles.panel}>
                <Link href="/services" onClick={closeMenus}>{copy.advisory}</Link>
                <Link href="/insurance" onClick={closeMenus}>Legal & Transaction Advisory</Link>
                <Link href="/faq" onClick={closeMenus}>{t("nav.faq")}</Link>
              </div>
            </details>
            <details className={styles.dropdown}>
              <summary>{copy.properties}<span className={styles.chevron} /></summary>
              <div className={styles.panel}>
                <Link href="/#properties" onClick={closeMenus}>{copy.allProperties}</Link>
                <Link href="/contact" onClick={closeMenus}>{copy.listProperty}</Link>
              </div>
            </details>
            <details className={styles.dropdown}>
              <summary>{copy.sectors}<span className={styles.chevron} /></summary>
              <div className={styles.panel}>
                {sectors.map((sector, index) => <Link href={sector.href} key={sector.id} onClick={closeMenus}>{copy.sectorNames[index]}</Link>)}
              </div>
            </details>
            <Link href="/about_us_01" onClick={closeMenus}>{copy.about}</Link>
            <Link href="/insights" onClick={closeMenus}>Insights</Link>
            <details className={`${styles.dropdown} ${styles.language}`}>
              <summary aria-label={copy.language}>{locale.toUpperCase()}<span className={styles.chevron} /></summary>
              <div className={styles.panel}>
                {([['es', 'Español'], ['en', 'English'], ['fr', 'Français']] as const).map(([code, label]) => (
                  <button type="button" key={code} lang={code} aria-pressed={locale === code}
                    onClick={() => { setLocale(code); closeMenus(); }}>{label}</button>
                ))}
              </div>
            </details>
            <Link href="/contact" onClick={closeMenus} className={styles.contact}>{copy.contact}<span aria-hidden="true">⟶</span></Link>
          </nav>
        </div>
      </header>
      <LoginModal />
    </>
  );
};

export default HeaderOne;
