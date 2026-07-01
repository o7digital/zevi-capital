import PrivacyPolicy from "@/components/inner-pages/privacy-policy"
import Wrapper from "@/layouts/Wrapper"

export const metadata = {
  title: "Política de Privacidad | ZeVi Capital",
  description: "Política de privacidad y tratamiento de datos personales de ZeVi Capital.",
}

export default function PrivacyPolicyPage() {
  return <Wrapper><PrivacyPolicy /></Wrapper>
}
