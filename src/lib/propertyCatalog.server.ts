import 'server-only';
import { cache } from 'react';
import type { Metadata } from 'next';
import { getPublishedProperties } from './publishedProperties.server';
import { buildPropertyCatalogs, SITE_URL, type PropertyCatalog } from './propertySeo';

export const getPropertyCatalogs = cache(async () => buildPropertyCatalogs(await getPublishedProperties()));

export function catalogMetadata(catalog: PropertyCatalog): Metadata {
  const title = `${catalog.heading} | ZeVi Capital`;
  const description = `${catalog.heading}. ${catalog.description}`.slice(0, 160);
  return {
    title, description, alternates: { canonical: SITE_URL + catalog.path },
    robots: { index: catalog.indexable, follow: true },
    openGraph: { title, description, url: SITE_URL + catalog.path, siteName: 'ZeVi Capital', type: 'website' },
  };
}
