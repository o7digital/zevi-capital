import Insurance from "@/components/inner-pages/insurance";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Seguros inmobiliarios",
   description: "Soluciones de seguro para proteger propiedades e inversiones inmobiliarias en Mexico con asesoria especializada.",
   alternates: { canonical: "/insurance" },
};
const index = () => {
   return (
      <Wrapper>
         <Insurance />
      </Wrapper>
   )
}

export default index
