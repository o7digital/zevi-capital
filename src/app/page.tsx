import HomeOne from "@/components/homes/home-one";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Inversión Inmobiliaria en Zona Esmeralda y Estado de México | ZeVi Capital",
  description: "Consultoría e inversión inmobiliaria en Zona Esmeralda, Atizapán, Naucalpan y Huixquilucan. Compra, venta, renta, expansión empresarial y manejo de activos.",
  keywords: ["inversión inmobiliaria Zona Esmeralda", "inmobiliaria Zona Esmeralda", "propiedades Estado de México", "bienes raíces Atizapán", "inmuebles Naucalpan", "inversión inmobiliaria Huixquilucan", "locales comerciales Zona Esmeralda", "manejo de activos inmobiliarios", "consultoría inmobiliaria corporativa", "asesoría inmobiliaria para empresas", "corporate real estate México", "renta de naves industriales", "parques industriales", "terrenos industriales", "build to suit México", "logística inmobiliaria", "expansión comercial", "site selection México", "ubicaciones para franquicias", "inversión inmobiliaria comercial", "adquisición de activos inmobiliarios", "comercialización de terrenos", "due diligence inmobiliario", "negociación inmobiliaria corporativa", "ZeVi Capital"],
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
const index = ({ searchParams }: { searchParams?: { sector?: string } }) => {
  return (
    <Wrapper>
      <HomeOne sector={searchParams?.sector} />
    </Wrapper>
  )
}

export default index
