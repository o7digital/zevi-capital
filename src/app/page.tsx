import HomeOne from "@/components/homes/home-one";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Expansión Empresarial e Inversión Inmobiliaria en México | ZeVi Capital",
  description: "ZeVi Capital conecta empresas, propietarios e inversionistas con oportunidades inmobiliarias estratégicas en México. Expansión empresarial, manejo de activos, venta, renta e inversión inmobiliaria.",
  keywords: ["expansión empresarial México", "inversión inmobiliaria México", "consultoría inmobiliaria México", "manejo de activos inmobiliarios", "propiedades comerciales México", "venta de inmuebles comerciales", "renta de propiedades comerciales", "ZeVi Capital"],
  alternates: { canonical: "https://www.zevicapital.com/" },
  openGraph: {
    title: "Expansión Empresarial e Inversión Inmobiliaria en México | ZeVi Capital",
    description: "Expansión empresarial, manejo de activos, venta, renta e inversión inmobiliaria en México.",
    url: "https://www.zevicapital.com/",
    siteName: "ZeVi Capital",
    type: "website",
    images: [
      {
        url: "/images/assets/ogg.png",
        width: 1200,
        height: 630,
        alt: "ZeVi Capital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expansión Empresarial e Inversión Inmobiliaria en México | ZeVi Capital",
    description: "Expansión empresarial, manejo de activos, venta, renta e inversión inmobiliaria en México.",
    images: ["/images/assets/ogg.png"],
  },
};
const index = () => {
  return (
    <Wrapper>
      <HomeOne />
    </Wrapper>
  )
}

export default index
