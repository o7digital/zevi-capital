import HomeOne from "@/components/homes/home-one";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "O7 REALESTATES | Luxury Real Estate – Los Angeles • Montreal • Paris • Mexico",
  description: "O7 Realestates – International luxury real estate agency. High-end properties, investment opportunities, premium buyers network. Presence in Los Angeles, Montreal, Paris, Mexico. Luxury villas, penthouses, waterfront estates, investment deals.",
  openGraph: {
    title: "O7 Realestates | International Luxury Real Estate",
    description: "Premium real estate agency with global presence: Los Angeles, Montreal, Paris, Mexico. Exclusive luxury properties, investment portfolios and private deals.",
    url: "https://o7realestates.vercel.app/",
    siteName: "O7 Realestates",
    type: "website",
    images: [
      {
        url: "/images/assets/ogg.png",
        width: 1200,
        height: 630,
        alt: "O7 Realestates | International Luxury Real Estate",
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
