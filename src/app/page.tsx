import HomeOne from "@/components/homes/home-one";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Inversión Inmobiliaria en Zona Esmeralda y Estado de México | ZeVi Capital",
  description: "Consultoría e inversión inmobiliaria en Zona Esmeralda, Atizapán, Naucalpan y Huixquilucan. Compra, venta, renta, expansión empresarial y manejo de activos.",
  keywords: ["inversión inmobiliaria Zona Esmeralda", "inmobiliaria Zona Esmeralda", "propiedades Estado de México", "bienes raíces Atizapán", "inmuebles Naucalpan", "inversión inmobiliaria Huixquilucan", "locales comerciales Zona Esmeralda", "manejo de activos inmobiliarios", "ZeVi Capital"],
  alternates: { canonical: "https://www.zevicapital.com/" },
  openGraph: {
    title: "Inversión Inmobiliaria en Zona Esmeralda y Estado de México | ZeVi Capital",
    description: "Compra, venta, renta e inversión inmobiliaria en Zona Esmeralda, Atizapán, Naucalpan y Huixquilucan.",
    url: "https://www.zevicapital.com/",
    siteName: "ZeVi Capital",
    type: "website",
    images: [
      {
        url: "/slider/cdmx.webp",
        width: 2400,
        height: 1611,
        alt: "ZeVi Capital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inversión Inmobiliaria en Zona Esmeralda y Estado de México | ZeVi Capital",
    description: "Compra, venta, renta e inversión inmobiliaria en Zona Esmeralda, Atizapán, Naucalpan y Huixquilucan.",
    images: ["/slider/cdmx.webp"],
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
