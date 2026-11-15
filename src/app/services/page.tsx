import Services from "@/components/inner-pages/strategic-services"
import Wrapper from "@/layouts/Wrapper"

export const metadata = {
  title: "Consultoría Inmobiliaria Corporativa y Activos | ZeVi Capital",
  description: "Asesoría inmobiliaria para empresas: naves y terrenos industriales, expansión comercial, activos de inversión, análisis de mercado y due diligence.",
  keywords: ["servicios inmobiliarios México", "expansión empresarial", "manejo de activos", "comercialización inmobiliaria", "marketing inmobiliario", "asesoría legal inmobiliaria", "consultoría inmobiliaria corporativa", "renta de naves industriales", "terrenos industriales", "build to suit México", "site selection México", "ubicaciones para franquicias", "inversión inmobiliaria comercial", "adquisición de activos inmobiliarios", "análisis de mercado inmobiliario", "due diligence inmobiliario"],
  alternates: { canonical: "https://www.zevicapital.com/services" },
}

export default function ServicesPage() {
  return <Wrapper><Services /></Wrapper>
}
