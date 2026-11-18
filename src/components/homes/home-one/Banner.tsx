"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/contexts/TranslationContext";
import { advisoryCopy, sectors } from "./advisoryContent";
import SectorIcon from "./SectorIcon";
import styles from "./Banner.module.scss";

export default function Banner() {
  const { locale } = useTranslation();
  const copy = advisoryCopy[locale];

  return (
    <section className={styles.hero} aria-labelledby="advisory-title">
      <Image src="/images/advisory-office-dusk.webp" alt="" fill priority sizes="100vw" className={styles.background} />
      <div className={styles.shade} />
      <div className={styles.content}>
        <p className={styles.eyebrow}>Real Estate &amp; Investment Advisory<span /></p>
        <h1 id="advisory-title" lang="en">Real estate decisions.<br /><em>Strategic outcomes.</em></h1>
        <p className={styles.description}>{copy.description}</p>
        <div className={styles.actions}>
          <Link href="/#properties" className={styles.primary}>{copy.explore}<span aria-hidden="true">⟶</span></Link>
          <Link href="/services" className={styles.secondary}>{copy.ourServices}</Link>
        </div>
      </div>
      <nav className={styles.sectors} aria-label={copy.sectorLabel} id="sectors">
        {sectors.map((sector, index) => (
          <Link href={sector.href} key={sector.id} className={styles.sector}>
            <SectorIcon name={sector.icon} />
            <span className={styles.sectorTitle}>{copy.sectorNames[index]}</span>
            <span className={styles.sectorDescription}>{copy.sectorDescriptions[index]}</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
