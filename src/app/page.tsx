import HomeOne from "@/components/homes/home-one";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Bienes raices e inversion inmobiliaria en Mexico",
  description: "ZeVi Capital asesora compra, venta, renta e inversion inmobiliaria en Ciudad de Mexico y las principales ciudades del pais.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ZeVi Capital | Bienes raices en Mexico",
    description: "Asesoria inmobiliaria estrategica para compra, venta, renta e inversion en Mexico.",
    url: "/",
    siteName: "ZeVi Capital",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ZeVi Capital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeVi Capital | Bienes raices en Mexico",
    description: "Compra, venta, renta e inversion inmobiliaria en Mexico.",
    images: ["/logo.png"],
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
