import Insurance from "@/components/inner-pages/insurance";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Due Diligence Inmobiliario y Certeza Patrimonial | ZeVi Capital",
   description: "ZeVi Capital acompaña operaciones inmobiliarias con análisis documental, evaluación de riesgos, asesoría estratégica y coordinación legal para mayor certeza.",
   keywords: ["due diligence inmobiliario", "revisión documental inmobiliaria", "certeza patrimonial", "análisis de riesgo inmobiliario"],
};
const index = () => {
   return (
      <Wrapper>
         <Insurance />
      </Wrapper>
   )
}

export default index
