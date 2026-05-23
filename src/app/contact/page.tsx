import Contact from "@/components/inner-pages/contact";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Contacto",
   description: "Contacta a ZeVi Capital para recibir asesoria sobre compra, venta, renta o inversion inmobiliaria en Mexico.",
   alternates: { canonical: "/contact" },
};
const index = () => {
   return (
      <Wrapper>
         <Contact />
      </Wrapper>
   )
}

export default index
