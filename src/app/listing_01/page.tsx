import ListingOne from "@/components/inner-listing/listing-01";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Ventas y propiedades",
   description: "Explora propiedades y oportunidades inmobiliarias para venta, renta e inversion en las principales ciudades de Mexico.",
   alternates: { canonical: "/listing_01" },
};
const index = () => {
   return (
      <Wrapper>
         <ListingOne />
      </Wrapper>
   )
}

export default index
