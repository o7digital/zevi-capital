import AboutUsOne from "@/components/inner-pages/about-us/about-us-one";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Nosotros",
   description: "Conoce a ZeVi Capital, firma de asesoria inmobiliaria enfocada en expansion, comercializacion y valor patrimonial en Mexico.",
   alternates: { canonical: "/about_us_01" },
};
const index = () => {
   return (
      <Wrapper>
         <AboutUsOne />
      </Wrapper>
   )
}

export default index
