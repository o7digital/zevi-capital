import 'server-only';
import { cache } from 'react';
import type { DirectusProperty } from './directusProperties';
import { propertyPlainText } from './propertySeo';

const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL?.replace(/\/$/, '');
const publicFields = ['id', 'title', 'description', 'price', 'location', 'address', 'status', 'listing_status', 'tag', 'tag_bg', 'sqft', 'bedrooms', 'bathrooms', 'price_text', 'easybroker_id', 'property_type', 'operation_type', 'currency', 'public_url', 'latitude', 'longitude'] as const;

function publicProperty(value: Record<string, any>): DirectusProperty {
  const property: Record<string, unknown> = {};
  for (const field of publicFields) if (value[field] !== undefined) property[field] = value[field];
  const file = (v: any) => typeof v === 'string' ? v : v?.id ? { id: String(v.id) } : undefined;
  for (const field of ['cover_image', 'image']) if (value[field]) property[field] = file(value[field]);
  for (const field of ['photos', 'images', 'property_images']) if (Array.isArray(value[field])) {
    property[field] = value[field].map((image: any) => typeof image === 'string' ? image : ({ id: image.id, image: file(image.image), directus_files_id: file(image.directus_files_id) }));
  }
  return property as unknown as DirectusProperty;
}

async function request(path: string) {
  if (!baseUrl || !/^https?:\/\//.test(baseUrl)) throw new Error('The public property backend is not configured.');
  const response = await fetch(baseUrl + path, { headers: { Accept: 'application/json' }, next: { revalidate: 300 }, signal: AbortSignal.timeout(20000) });
  if ([403, 404].includes(response.status)) return null;
  if (!response.ok) throw new Error(`Property backend returned ${response.status}`);
  return response.json();
}

export const getPublishedProperties = cache(async (): Promise<DirectusProperty[]> => {
  const params = new URLSearchParams({ fields: [...publicFields, 'cover_image', 'image'].join(','), limit: '-1', sort: '-id', 'filter[status][_eq]': 'published', 'filter[cover_image][_nnull]': 'true' });
  const payload = await request(`/items/properties?${params}`);
  // A backend outage must not publish an empty sitemap or empty collections.
  if (!Array.isArray(payload?.data)) throw new Error('Published property inventory is unavailable.');
  return payload.data.filter((p: any) => p.status === 'published' && propertyPlainText(p.title || '')).map(publicProperty);
});

export const getPublishedProperty = cache(async (id: string): Promise<DirectusProperty | null> => {
  if (!/^(?:[1-9]\d*|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i.test(id)) return null;
  const params = new URLSearchParams({ fields: [...publicFields, 'cover_image.id', 'image.id', 'photos.id', 'photos.image.id', 'photos.sort_order'].join(','), 'deep[photos][_sort]': 'sort_order' });
  const payload = await request(`/items/properties/${encodeURIComponent(id)}?${params}`);
  const property = payload?.data;
  if (!property || property.status !== 'published' || !propertyPlainText(property.title || '')) return null;
  return publicProperty(property);
});
