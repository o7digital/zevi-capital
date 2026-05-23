import Faq from "@/components/inner-pages/faq";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Preguntas frecuentes",
   description: "Respuestas sobre el proceso de asesoria, comercializacion, compra, renta e inversion inmobiliaria con ZeVi Capital.",
   alternates: { canonical: "/faq" },
};
const index = () => {
   return (
      <Wrapper>
         <Faq />
      </Wrapper>
   )
}

export default index
