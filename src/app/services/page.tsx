import Services from "@/components/inner-pages/strategic-services"
import Wrapper from "@/layouts/Wrapper"

export const metadata = {
  title: "Servicios de Expansión Empresarial y Manejo de Activos | ZeVi Capital",
  description: "Consultoría inmobiliaria corporativa, inmuebles industriales, expansión comercial, manejo de activos, inteligencia de mercado y coordinación transaccional.",
  keywords: ["servicios inmobiliarios México", "expansión empresarial", "manejo de activos", "comercialización inmobiliaria", "marketing inmobiliario", "asesoría legal inmobiliaria"],
  alternates: { canonical: "https://www.zevicapital.com/services" },
}

export default function ServicesPage() {
  return <Wrapper><Services /></Wrapper>
}
