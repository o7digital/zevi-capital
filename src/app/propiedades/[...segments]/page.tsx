import { notFound } from 'next/navigation';
import PropertyCatalog from '@/components/property-seo/PropertyCatalog';
import { getPropertyCatalogs, catalogMetadata } from '@/lib/propertyCatalog.server';
import { CATALOG_PATH } from '@/lib/propertySeo';

export const revalidate = 300;
type Props = { params: { segments: string[] } };

export async function generateMetadata({ params }: Props) {
  const catalog = (await getPropertyCatalogs()).get(`${CATALOG_PATH}/${params.segments.join('/')}`);
  return catalog ? catalogMetadata(catalog) : { title: 'Selección no disponible | ZeVi Capital', robots: { index: false, follow: true } };
}

export default async function GeographicCatalogPage({ params }: Props) {
  const catalogs = await getPropertyCatalogs();
  const catalog = catalogs.get(`${CATALOG_PATH}/${params.segments.join('/')}`);
  if (!catalog) notFound();
  return <PropertyCatalog catalog={catalog} catalogs={catalogs} />;
}
