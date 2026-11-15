import Faq from "@/components/inner-pages/faq";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "FAQ Consultoría Inmobiliaria Zona Esmeralda | ZeVi Capital",
   description: "Preguntas frecuentes sobre compra, venta, renta, inversión inmobiliaria, expansión empresarial y due diligence en Zona Esmeralda y Estado de México.",
   keywords: ["FAQ inmobiliaria Zona Esmeralda", "consultoría inmobiliaria Zona Esmeralda", "inversión inmobiliaria Estado de México", "due diligence inmobiliario México", "ZeVi Capital"],
   alternates: { canonical: "https://www.zevicapital.com/faq" },
};
const index = () => {
   return (
      <Wrapper>
         <Faq />
      </Wrapper>
   )
}

export default index
