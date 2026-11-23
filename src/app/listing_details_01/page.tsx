import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ListingDetailsOne from '@/components/ListingDetails/listing-details-1';
import PropertySeoLinks from '@/components/property-seo/PropertySeoLinks';
import Wrapper from '@/layouts/Wrapper';
import { getPublishedProperty } from '@/lib/publishedProperties.server';
import { directusPropertyImages } from '@/lib/directusProperties';
import { propertyListingSchema, propertySeo, serializeSeoJson } from '@/lib/propertySeo';

type Props = { searchParams?: { id?: string | string[] } };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const property = await getPublishedProperty(typeof searchParams?.id === 'string' ? searchParams.id : '');
  if (!property) return { title: 'Propiedad no disponible | ZeVi Capital', robots: { index: false, follow: true } };
  const seo = propertySeo(property);
  const images = directusPropertyImages(property).slice(0, 1).map(image => ({ url: image.img, alt: property.title }));
  return {
    title: seo.title, description: seo.description, alternates: { canonical: seo.url },
    openGraph: { title: seo.title, description: seo.description, url: seo.url, siteName: 'ZeVi Capital', type: 'website', images },
    twitter: { card: 'summary_large_image', title: seo.title, description: seo.description, images: images.map(image => image.url) },
  };
}

export default async function PropertyPage({ searchParams }: Props) {
  const property = await getPublishedProperty(typeof searchParams?.id === 'string' ? searchParams.id : '');
  if (!property) notFound();
  const schema = propertyListingSchema(property, directusPropertyImages(property).map(image => image.img));
  return (
    <Wrapper>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSeoJson(schema) }} />
      <ListingDetailsOne property={property} seoLinks={<PropertySeoLinks property={property} />} />
    </Wrapper>
  );
}
