import type { Metadata } from 'next';
import ListingDetailsOne from '@/components/ListingDetails/listing-details-1';
import Wrapper from '@/layouts/Wrapper';
import { directusPropertyImages, fetchDirectusProperty } from '@/lib/directusProperties';
import { formatPropertyPrice, propertyShareUrl } from '@/lib/propertyPresentation';

export async function generateMetadata({ searchParams }: { searchParams: { id?: string } }): Promise<Metadata> {
   const property = searchParams.id ? await fetchDirectusProperty(searchParams.id) : null;
   if (!property) return { title: 'Propiedad | ZeVi Capital' };
   const title = `${property.title || 'Propiedad'} | ZeVi Capital`;
   const description = [property.location || property.address, formatPropertyPrice(property), property.description].filter(Boolean).join(' · ').slice(0, 200);
   const url = propertyShareUrl(property.id);
   const image = directusPropertyImages(property)[0]?.img;
   return {
      title, description,
      alternates: { canonical: url },
      openGraph: { title, description, url, siteName: 'ZeVi Capital', type: 'website', ...(image ? { images: [{ url: image, alt: property.title }] } : {}) },
      twitter: { card: image ? 'summary_large_image' : 'summary', title, description, ...(image ? { images: [image] } : {}) },
   };
}

export default function PropertyDetailsPage() {
   return <Wrapper><ListingDetailsOne /></Wrapper>;
}
