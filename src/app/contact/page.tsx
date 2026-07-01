import Contact from "@/components/inner-pages/contact";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Contacto | Consultoría Inmobiliaria ZeVi Capital",
   description: "Contacta a ZeVi Capital en Ciudad de México para proyectos de expansión empresarial, inversión, comercialización y manejo de activos inmobiliarios.",
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
