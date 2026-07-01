import Faq from "@/components/inner-pages/faq";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Preguntas Frecuentes | ZeVi Capital",
   description: "Respuestas sobre expansión empresarial, comercialización de activos, inversión y due diligence inmobiliario con ZeVi Capital.",
};
const index = () => {
   return (
      <Wrapper>
         <Faq />
      </Wrapper>
   )
}

export default index
