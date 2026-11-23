import PropertyCatalog from '@/components/property-seo/PropertyCatalog';
import { getPropertyCatalogs, catalogMetadata } from '@/lib/propertyCatalog.server';
import { CATALOG_PATH } from '@/lib/propertySeo';

export const revalidate = 300;

export async function generateMetadata() {
  const catalogs = await getPropertyCatalogs();
  return catalogMetadata(catalogs.get(CATALOG_PATH)!);
}

export default async function CatalogPage() {
  const catalogs = await getPropertyCatalogs();
  return <PropertyCatalog catalog={catalogs.get(CATALOG_PATH)!} catalogs={catalogs} />;
}
