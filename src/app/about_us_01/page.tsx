import AboutUsOne from "@/components/inner-pages/about-us/about-us-one";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "ZeVi Capital | Consultoría Inmobiliaria Estratégica en México",
   description: "Conoce ZeVi Capital, firma especializada en expansión empresarial, inversión inmobiliaria, manejo de activos y comercialización estratégica de propiedades en México.",
   keywords: ["ZeVi Capital", "consultoría inmobiliaria México", "expansión empresarial México", "manejo de activos inmobiliarios", "inversión inmobiliaria estratégica"],
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
