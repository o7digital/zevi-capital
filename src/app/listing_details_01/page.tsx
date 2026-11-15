import ListingDetailsOne from "@/components/ListingDetails/listing-details-1";
import Wrapper from "@/layouts/Wrapper";
import { directusAssetUrl, fetchDirectusProperty } from "@/lib/directusProperties";
import type { Metadata } from "next";

const SITE_URL = "https://www.zevicapital.com";

export async function generateMetadata({
   searchParams,
}: {
   searchParams?: { id?: string };
}): Promise<Metadata> {
   const id = searchParams?.id || "";
   const property = await fetchDirectusProperty(id);

   if (!property) {
      return {
         title: "Propiedades en Zona Esmeralda y Estado de México | ZeVi Capital",
         description: "Consulta propiedades en venta y renta en Zona Esmeralda, Atizapán, Naucalpan y Estado de México con ZeVi Capital.",
         alternates: { canonical: `${SITE_URL}/listing_details_01${id ? `?id=${encodeURIComponent(id)}` : ""}` },
      };
   }

   const location = property.location || property.address || "Estado de México";
   const title = `${property.title} | Propiedad en ${location} | ZeVi Capital`;
   const description = (property.description || `Propiedad en ${location}. Asesoría inmobiliaria ZeVi Capital en Zona Esmeralda y Estado de México.`)
      .replace(/\s+/g, " ")
      .slice(0, 155);
   const image = directusAssetUrl(property.cover_image || property.image);
   const url = `${SITE_URL}/listing_details_01?id=${encodeURIComponent(String(property.id))}`;

   return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
         title,
         description,
         url,
         siteName: "ZeVi Capital",
         type: "website",
         images: image ? [{ url: image, alt: property.title || "Propiedad ZeVi Capital" }] : undefined,
      },
      twitter: {
         card: "summary_large_image",
         title,
         description,
         images: image ? [image] : undefined,
      },
   };
}

const index = () => {
   return (
      <Wrapper>
         <ListingDetailsOne />
      </Wrapper>
   )
}

export default index
