import HomeOne from "@/components/homes/home-one";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "O7 REALESTATES | Site officiel - Agence immobilière Montreal - Paris - Los Angeles - Mexico - Londres",
  description: "O7 REALESTATES, site officiel de l'agence immobilière internationale présente à Montreal, Paris, Los Angeles, Mexico et Londres pour villas, penthouses et investissements premium.",
  openGraph: {
    title: "O7 REALESTATES | Site officiel - Agence immobilière Montreal - Paris - Los Angeles - Mexico - Londres",
    description: "O7 REALESTATES, site officiel de l'agence immobilière internationale présente à Montreal, Paris, Los Angeles, Mexico et Londres pour villas, penthouses et investissements premium.",
    url: "https://o7realestates.vercel.app/",
    siteName: "O7 REALESTATES - Site officiel",
    type: "website",
    images: [
      {
        url: "/images/assets/ogg.png",
        width: 1200,
        height: 630,
        alt: "O7 REALESTATES | Site officiel",
      },
    ],
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
