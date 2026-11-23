import Contact from "@/components/inner-pages/contact";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Contacto | Consultoría Inmobiliaria ZeVi Capital",
   description: "Contacta a ZeVi Capital en Zona Esmeralda, Estado de México. Asesoría inmobiliaria corporativa, expansión comercial, inversión y acompañamiento transaccional.",
   alternates: { canonical: "https://www.zevicapital.com/contact" },
};
const index = () => {
   return (
      <Wrapper>
         <Contact />
      </Wrapper>
   )
}

export default index
