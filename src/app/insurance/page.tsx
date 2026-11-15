import Insurance from "@/components/inner-pages/insurance";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Due Diligence Inmobiliario y Certeza Patrimonial | ZeVi Capital",
   description: "Due diligence inmobiliario, revisión documental y coordinación jurídica para arrendamientos, compraventas y negociación inmobiliaria corporativa.",
   keywords: ["due diligence inmobiliario", "revisión documental inmobiliaria", "certeza patrimonial", "análisis de riesgo inmobiliario", "asesoría en arrendamiento comercial", "negociación inmobiliaria corporativa", "asesoría transaccional"],
   alternates: { canonical: "https://www.zevicapital.com/insurance" },
};
const index = () => {
   return (
      <Wrapper>
         <Insurance />
      </Wrapper>
   )
}

export default index
