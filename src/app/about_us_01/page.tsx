import AboutUsOne from "@/components/inner-pages/about-us/about-us-one";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "ZeVi Capital | Consultoría Inmobiliaria Estratégica en México",
   description: "Conoce ZeVi Capital: asesoría inmobiliaria corporativa e inversión, análisis de mercado y coordinación transaccional desde Zona Esmeralda, Estado de México.",
   keywords: ["ZeVi Capital", "consultoría inmobiliaria México", "expansión empresarial México", "manejo de activos inmobiliarios", "inversión inmobiliaria estratégica", "asesoría inmobiliaria para empresas", "consultoría inmobiliaria corporativa", "análisis de mercado inmobiliario"],
   alternates: { canonical: "https://www.zevicapital.com/about_us_01" },
};
const index = () => {
   return (
      <Wrapper>
         <AboutUsOne />
      </Wrapper>
   )
}

export default index
