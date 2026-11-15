import Link from "next/link";
import HeaderOne from "@/layouts/headers/HeaderOne";

export default function NotFound() {
  return <><HeaderOne /><main className="advisory-section"><div className="container"><span className="advisory-eyebrow">404 · ZeVi | Capital</span><h1>Página no encontrada</h1><p>La página que buscas no está disponible.</p><Link className="advisory-button" href="/">Volver al inicio <span aria-hidden="true">→</span></Link></div></main></>;
}
