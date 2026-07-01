import Insights from "@/components/inner-pages/insights"
import Wrapper from "@/layouts/Wrapper"

export const metadata = {
  title: "Insights de Expansión e Inversión Inmobiliaria | ZeVi Capital",
  description: "Análisis y perspectivas de ZeVi Capital sobre expansión empresarial, selección de ubicaciones, activos inmobiliarios e inversión estratégica en México.",
  keywords: ["insights inmobiliarios", "expansión empresarial México", "selección de ubicaciones", "activos inmobiliarios", "inversión inmobiliaria estratégica"],
  alternates: { canonical: "https://www.zevicapital.com/insights" },
}

export default function InsightsPage() {
  return <Wrapper><Insights /></Wrapper>
}
