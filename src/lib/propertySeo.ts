import type { DirectusProperty } from './directusProperties';

export const SITE_URL = 'https://www.zevicapital.com';
export const CATALOG_PATH = '/propiedades';
// An editorial guard for automatically generated collections, not a Google requirement.
export const MIN_INDEXABLE_COLLECTION_SIZE = 3;

const states = ['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Estado de México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas', 'Ciudad de México'];
const entities: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó', uacute: 'ú', ntilde: 'ñ', uuml: 'ü', Aacute: 'Á', Eacute: 'É', Iacute: 'Í', Oacute: 'Ó', Uacute: 'Ú', Ntilde: 'Ñ', Uuml: 'Ü', ndash: '–', mdash: '—', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', hellip: '…', bull: '•', sup2: '²' };

export function propertyPlainText(value = ''): string {
  return value.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z0-9]+);/gi, (match, entity: string) => {
      if (!entity.startsWith('#')) return entities[entity] ?? match;
      const code = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : Number(entity.slice(1));
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : '';
    }).replace(/\s+/g, ' ').trim();
}

export function seoSlug(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function propertyGeography(property: DirectusProperty) {
  const location = propertyPlainText(property.location || property.address || '');
  const parts = location.split(',').map(part => part.trim()).filter(Boolean);
  if (parts.length > 1 && seoSlug(parts[parts.length - 1]) === 'mexico') parts.pop();
  const statePart = parts[parts.length - 1] || '';
  const state = seoSlug(statePart) === 'cdmx' ? 'Ciudad de México' : states.find(name => seoSlug(name) === seoSlug(statePart));
  if (!state) return { location, state: '', city: '', stateSlug: '', citySlug: '' };
  const city = parts.length > 1 ? parts[parts.length - 2] : state === 'Ciudad de México' ? state : '';
  return { location, state, city, stateSlug: seoSlug(state), citySlug: seoSlug(city) };
}

export function propertyTransactions(property: DirectusProperty): string[] {
  // The operation field takes precedence over old template tags such as FOR SALE.
  const explicit = propertyPlainText(property.operation_type || '');
  const text = seoSlug(explicit || [property.tag, property.listing_status].filter(Boolean).join(' '));
  const result: string[] = [];
  if (/venta|sale|sell/.test(text)) result.push('venta');
  if (/renta|rent|alquiler/.test(text)) result.push('renta');
  return result;
}

export const seoPropertyTypes = [
  { slug: 'terrenos', label: 'Terrenos', pattern: /terreno|\bland\b|\blote/ },
  { slug: 'oficinas', label: 'Oficinas', pattern: /oficina|office/ },
  { slug: 'bodegas-y-naves-industriales', label: 'Bodegas y naves industriales', pattern: /bodega|nave|warehouse|desarrollo-industrial/ },
  { slug: 'locales-comerciales', label: 'Locales comerciales', pattern: /local|retail/ },
  { slug: 'casas-y-departamentos', label: 'Casas y departamentos', pattern: /casa|departamento|apartamento|residencial|residential|house|apartment|condo/ },
  { slug: 'edificios', label: 'Edificios', pattern: /edificio|building/ },
  { slug: 'centros-comerciales', label: 'Centros comerciales', pattern: /centro-comercial|shopping|mall/ },
  { slug: 'hoteles', label: 'Hoteles', pattern: /hotel/ },
] as const;

export function propertyTypes(property: DirectusProperty) {
  const explicit = propertyPlainText(property.property_type || '');
  const text = seoSlug(!explicit || explicit === 'Desarrollo' ? property.title || '' : explicit);
  return seoPropertyTypes.filter(type => type.pattern.test(text));
}

export function propertyPath(property: Pick<DirectusProperty, 'id'>) {
  return `/listing_details_01?id=${encodeURIComponent(String(property.id))}`;
}

export function propertySearchPhrases(property: DirectusProperty) {
  const geo = propertyGeography(property);
  const kind = propertyPlainText(property.property_type || '');
  if (!kind || !geo.state) return [];
  const operations = propertyTransactions(property);
  const places = [...new Set([geo.city && `${geo.city}, ${geo.state}`, geo.state].filter(Boolean))];
  return (operations.length ? operations : ['']).flatMap(operation => places.map(place => `${kind.toLowerCase()}${operation ? ` en ${operation}` : ''} en ${place}`));
}

export function propertySeo(property: DirectusProperty) {
  const geo = propertyGeography(property);
  const original = propertyPlainText(property.title || 'Propiedad');
  const kind = propertyPlainText(property.property_type || '');
  let title = original;
  if (kind && !seoSlug(title).includes(seoSlug(kind).split('-')[0])) title = `${kind}: ${title}`;
  if (geo.city && !seoSlug(title).includes(geo.citySlug)) title += ` en ${geo.city}`;
  if (geo.state && !seoSlug(title).includes(geo.stateSlug)) title += `, ${geo.state}`;
  title += ' | ZeVi Capital';
  const transactions = propertyTransactions(property).join(' y ');
  const fallback = `${kind || 'Propiedad'}${transactions ? ` en ${transactions}` : ''}${geo.location ? ` en ${geo.location}` : ''}. Consulta características, disponibilidad y asesoría con ZeVi Capital.`;
  const text = propertyPlainText(property.description || '') || fallback;
  const description = text.length <= 160 ? text : text.slice(0, 157).replace(/\s+\S*$/, '') + '…';
  return { title, description, url: SITE_URL + propertyPath(property), searchPhrases: propertySearchPhrases(property) };
}

export type CatalogLink = { label: string; path: string; count?: number };
export type PropertyCatalog = { path: string; heading: string; description: string; properties: DirectusProperty[]; breadcrumbs: CatalogLink[]; indexable: boolean };

export function buildPropertyCatalogs(properties: DirectusProperty[]): Map<string, PropertyCatalog> {
  const catalogs = new Map<string, PropertyCatalog>();
  const root: CatalogLink = { label: 'Propiedades en México', path: CATALOG_PATH };
  const add = (path: string, heading: string, items: DirectusProperty[], breadcrumbs: CatalogLink[]) => {
    if (!items.length && path !== CATALOG_PATH) return;
    const types = [...new Set(items.map(item => propertyPlainText(item.property_type || '')).filter(Boolean))];
    const operations = [...new Set(items.flatMap(propertyTransactions))];
    const scope = operations.length ? `Opciones de ${operations.join(' y ')} según cada anuncio.` : 'Consulta la modalidad y disponibilidad de cada anuncio.';
    const description = `${items.length} ${items.length === 1 ? 'propiedad publicada' : 'propiedades publicadas'}. ${scope}${types.length ? ` Encuentra ${types.slice(0, 4).map(type => type.toLowerCase()).join(', ')}.` : ''}`;
    catalogs.set(path, { path, heading, description, properties: items, breadcrumbs, indexable: items.length >= MIN_INDEXABLE_COLLECTION_SIZE });
  };
  add(CATALOG_PATH, 'Propiedades en venta y renta en México', properties, [root]);
  for (const type of seoPropertyTypes) {
    const path = `${CATALOG_PATH}/tipo/${type.slug}`;
    add(path, `${type.label} en México`, properties.filter(p => propertyTypes(p).some(t => t.slug === type.slug)), [root, { label: type.label, path }]);
  }
  for (const state of states) {
    const stateItems = properties.filter(p => propertyGeography(p).state === state);
    if (!stateItems.length) continue;
    const statePath = `${CATALOG_PATH}/${seoSlug(state)}`;
    const stateCrumbs = [root, { label: state, path: statePath }];
    add(statePath, `Propiedades en ${state}`, stateItems, stateCrumbs);
    const scopes = [{ path: statePath, label: state, items: stateItems, crumbs: stateCrumbs }];
    const cities = [...new Set(stateItems.map(p => propertyGeography(p).city).filter(Boolean))];
    for (const city of cities) {
      const path = `${statePath}/${seoSlug(city)}`;
      const items = stateItems.filter(p => propertyGeography(p).city === city);
      const crumbs = [...stateCrumbs, { label: city, path }];
      add(path, `Propiedades en ${city}, ${state}`, items, crumbs);
      scopes.push({ path, label: `${city}, ${state}`, items, crumbs });
    }
    for (const scope of scopes) for (const type of seoPropertyTypes) {
      const path = `${scope.path}/tipo/${type.slug}`;
      add(path, `${type.label} en ${scope.label}`, scope.items.filter(p => propertyTypes(p).some(t => t.slug === type.slug)), [...scope.crumbs, { label: type.label, path }]);
    }
  }
  return catalogs;
}

export function propertyGeographicLinks(property: DirectusProperty): CatalogLink[] {
  const geo = propertyGeography(property);
  const type = propertyTypes(property)[0];
  return [
    ...(type ? [{ label: type.label, path: `${CATALOG_PATH}/tipo/${type.slug}` }] : []),
    ...(geo.state ? [{ label: geo.state, path: `${CATALOG_PATH}/${geo.stateSlug}` }] : []),
    ...(geo.city ? [{ label: geo.city, path: `${CATALOG_PATH}/${geo.stateSlug}/${geo.citySlug}` }] : []),
  ];
}

export function catalogChildLinks(catalog: PropertyCatalog, catalogs: Map<string, PropertyCatalog>): CatalogLink[] {
  return [...catalogs.values()].filter(item => item.path !== catalog.path && item.breadcrumbs[item.breadcrumbs.length - 2]?.path === catalog.path)
    .map(item => ({ label: item.breadcrumbs[item.breadcrumbs.length - 1].label, path: item.path, count: item.properties.length }));
}

export function serializeSeoJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function propertyListingSchema(property: DirectusProperty, images: string[]) {
  const seo = propertySeo(property);
  const geo = propertyGeography(property);
  const price = Number(property.price);
  const numericPriceIsTotal = !/(?:por|per|\/)\s*m[²2]/i.test(property.price_text || '');
  const operations = propertyTransactions(property);
  const latitude = Number(property.latitude), longitude = Number(property.longitude);
  const hasCoordinates = property.latitude != null && property.longitude != null && String(property.latitude).trim() !== '' && String(property.longitude).trim() !== '' && Number.isFinite(latitude) && Number.isFinite(longitude) && Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180;
  return {
    '@context': 'https://schema.org', '@type': 'RealEstateListing', '@id': seo.url + '#listing', url: seo.url,
    name: propertyPlainText(property.title || ''), description: seo.description, inLanguage: 'es-MX', image: images,
    about: { '@type': 'Place', name: propertyPlainText(property.title || ''), ...(geo.state ? { address: { '@type': 'PostalAddress', addressRegion: geo.state, ...(geo.city ? { addressLocality: geo.city } : {}), addressCountry: 'MX' } } : {}), ...(hasCoordinates ? { geo: { '@type': 'GeoCoordinates', latitude, longitude } } : {}) },
    ...(price > 0 && numericPriceIsTotal && operations.length === 1 && /^[A-Z]{3}$/.test(property.currency || '') ? { offers: { '@type': 'Offer', price, priceCurrency: property.currency, businessFunction: operations[0] === 'renta' ? 'http://purl.org/goodrelations/v1#LeaseOut' : 'http://purl.org/goodrelations/v1#Sell', url: seo.url } } : {}),
  };
}
