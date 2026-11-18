import Image from "next/image";
import Link from "next/link";
import styles from "./AdvisoryBrand.module.scss";

export default function AdvisoryBrand() {
  return (
    <Link href="/" className={styles.brand} aria-label="ZeVi Capital — Inicio">
      <span className={styles.symbol} aria-hidden="true">
        <Image src="/logo.png" alt="" width={865} height={699} priority />
      </span>
      <span className={styles.wordmark}>
        <span>ZeVi <span className={styles.divider}>|</span> Capital</span>
        <small>Where vision meets strategy</small>
      </span>
    </Link>
  );
}
