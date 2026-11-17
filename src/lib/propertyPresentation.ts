export type PropertyLocale = 'es' | 'en' | 'fr';

export const propertyCategories = [
  { id: 'buildings', icon: 'bi-buildings', labels: { es: 'Edificios', en: 'Buildings', fr: 'Immeubles' } },
  { id: 'offices', icon: 'bi-building', labels: { es: 'Oficinas', en: 'Offices', fr: 'Bureaux' } },
  { id: 'warehouses', icon: 'bi-box-seam', labels: { es: 'Bodegas', en: 'Warehouses', fr: 'Entrepôts' } },
  { id: 'retail', icon: 'bi-shop', labels: { es: 'Locales', en: 'Retail spaces', fr: 'Locaux commerciaux' } },
  { id: 'land', icon: 'bi-map', labels: { es: 'Terrenos', en: 'Land', fr: 'Terrains' } },
  { id: 'shopping', icon: 'bi-shop-window', labels: { es: 'Centros Comerciales', en: 'Shopping centers', fr: 'Centres commerciaux' } },
  { id: 'otherRegions', icon: 'bi-geo-alt', labels: { es: 'Foráneos', en: 'Other regions', fr: 'Autres régions' } },
  { id: 'residential', icon: 'bi-house-door', labels: { es: 'Residencial', en: 'Residential', fr: 'Résidentiel' } },
] as const;

export const propertyCopy = {
  es: {
    search: 'Buscar por nombre, ciudad o referencia', operation: 'Operación', allOperations: 'Venta y renta', sale: 'Venta', rent: 'Renta',
    type: 'Tipo de inmueble', allTypes: 'Todos los tipos', location: 'Ubicación', allLocations: 'Todas las ubicaciones',
    minPrice: 'Precio mínimo', maxPrice: 'Precio máximo', currency: 'Moneda', allCurrencies: 'Todas', basis: 'Modalidad de precio',
    allBases: 'Todas las modalidades', total: 'Importe total', perArea: 'Por m²', sort: 'Ordenar por', newest: 'Más recientes',
    priceAsc: 'Precio: menor a mayor', priceDesc: 'Precio: mayor a menor', areaDesc: 'Mayor superficie', reset: 'Limpiar filtros',
    results: 'propiedades', noResults: 'Ninguna propiedad coincide con tus filtros.', more: 'Ver más propiedades', loading: 'Cargando propiedades…',
    loadError: 'No se pueden cargar las propiedades en este momento.', retry: 'Volver a intentar', consult: 'Precio a consultar',
    priceHelp: 'Los importes pueden ser totales o por m². Filtra por moneda y modalidad para compararlos.',
    share: 'Compartir', copy: 'Copiar enlace', copied: '¡Enlace copiado!', email: 'Correo electrónico', nativeShare: 'Más opciones',
    close: 'Cerrar', shareHelp: 'Comparte esta propiedad con su enlace directo.', copyError: 'Selecciona y copia el enlace de abajo.',
    bedrooms: 'rec.', bathrooms: 'baños', view: 'Ver propiedad',
    allCategories: 'Todos', otherRegionsHelp: 'Propiedades fuera de Ciudad de México y Estado de México',
  },
  en: {
    search: 'Search by name, city or reference', operation: 'Transaction', allOperations: 'Sale and rent', sale: 'For sale', rent: 'For rent',
    type: 'Property type', allTypes: 'All types', location: 'Location', allLocations: 'All locations',
    minPrice: 'Minimum price', maxPrice: 'Maximum price', currency: 'Currency', allCurrencies: 'All', basis: 'Price basis',
    allBases: 'All price bases', total: 'Total amount', perArea: 'Per m²', sort: 'Sort by', newest: 'Most recent',
    priceAsc: 'Price: low to high', priceDesc: 'Price: high to low', areaDesc: 'Largest area', reset: 'Clear filters',
    results: 'properties', noResults: 'No properties match your filters.', more: 'Show more properties', loading: 'Loading properties…',
    loadError: 'Properties could not be loaded. Please try again.', retry: 'Try again', consult: 'Price on request',
    priceHelp: 'Amounts may be totals or per m². Filter by currency and price basis to compare them.',
    share: 'Share', copy: 'Copy link', copied: 'Link copied!', email: 'Email', nativeShare: 'More options',
    close: 'Close', shareHelp: 'Share this property using its direct link.', copyError: 'Select and copy the link below.',
    bedrooms: 'beds', bathrooms: 'baths', view: 'View property',
    allCategories: 'All', otherRegionsHelp: 'Properties outside Mexico City and the State of Mexico',
  },
  fr: {
    search: 'Rechercher par nom, ville ou référence', operation: 'Transaction', allOperations: 'Vente et location', sale: 'Vente', rent: 'Location',
    type: 'Type de bien', allTypes: 'Tous les types', location: 'Localisation', allLocations: 'Toutes les localisations',
    minPrice: 'Prix minimum', maxPrice: 'Prix maximum', currency: 'Devise', allCurrencies: 'Toutes', basis: 'Base du prix',
    allBases: 'Toutes les bases', total: 'Montant total', perArea: 'Par m²', sort: 'Trier par', newest: 'Plus récents',
    priceAsc: 'Prix croissant', priceDesc: 'Prix décroissant', areaDesc: 'Plus grande surface', reset: 'Effacer les filtres',
    results: 'biens', noResults: 'Aucun bien ne correspond à tes filtres.', more: 'Voir plus de biens', loading: 'Chargement des biens…',
    loadError: 'Impossible de charger les biens pour le moment.', retry: 'Réessayer', consult: 'Prix sur demande',
    priceHelp: 'Les montants peuvent être totaux ou au m². Filtre par devise et base du prix pour les comparer.',
    share: 'Partager', copy: 'Copier le lien', copied: 'Lien copié !', email: 'E-mail', nativeShare: 'Autres options',
    close: 'Fermer', shareHelp: 'Partage ce bien avec son lien direct.', copyError: 'Sélectionne et copie le lien ci-dessous.',
    bedrooms: 'ch.', bathrooms: 'sdb', view: 'Voir le bien',
    allCategories: 'Tous', otherRegionsHelp: 'Biens hors de Mexico et de l’État de Mexico',
  },
};

export interface PropertySummary {
  id: number | string;
  title: string;
  address: string;
  location?: string;
  property_type?: string;
  operation_type?: string;
  easybroker_id?: string;
  tag?: string;
  listing_status?: string;
  price?: number | string;
  price_text?: string;
  currency?: string;
  area?: number;
}

export function normalizeText(value = '') {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

export function matchesPropertyCategory(property: PropertySummary, category: string) {
  const type = normalizeText(property.property_type || '');
  const text = !type || type === 'desarrollo' ? normalizeText(property.title) : type;
  switch (category) {
    case 'buildings': return /edificio|building/.test(text);
    case 'offices': return /oficina|office/.test(text);
    case 'warehouses': return /bodega|nave|industrial|warehouse/.test(text);
    case 'retail': return /local|retail/.test(text);
    case 'land': return /terreno|\bland\b|\blote/.test(text);
    case 'shopping': return /centro comercial|shopping|\bmall\b/.test(text);
    case 'residential': return /casa|departamento|apartamento|residencial|residential|house|apartment|condo/.test(text);
    case 'otherRegions': {
      const location = normalizeText([property.location, property.address].filter(Boolean).join(' '));
      // Only explicitly identified states qualify; missing locations stay unclassified.
      return /\b(aguascalientes|baja california(?: sur)?|campeche|chiapas|chihuahua|coahuila|colima|durango|guanajuato|guerrero|hidalgo|jalisco|michoacan|morelos|nayarit|nuevo leon|oaxaca|puebla|queretaro|quintana roo|san luis potosi|sinaloa|sonora|tabasco|tamaulipas|tlaxcala|veracruz|yucatan|zacatecas)\b/.test(location)
        && !/ciudad de mexico|cdmx|estado de mexico/.test(location);
    }
    default: return !category;
  }
}

export function propertyOperations(property: { operation_type?: string; tag?: string; listing_status?: string }) {
  const value = normalizeText([property.operation_type, property.tag, property.listing_status].filter(Boolean).join(' '));
  const operations: string[] = [];
  if (/sale|sell|venta/.test(value)) operations.push('sale');
  if (/rent|renta|location|alquiler/.test(value)) operations.push('rent');
  return operations;
}

export function propertyPriceBasis(property: { price_text?: string }) {
  // A total sale price may also mention a secondary per-m² equivalent after “|”.
  const mainPrice = normalizeText((property.price_text || '').split('|')[0]);
  return /(?:por|per|\/)\s*m(?:²|2)|m²\s*(?:al mes|\/)/.test(mainPrice) ? 'perArea' : 'total';
}

export function formatPropertyPrice(property: { price?: number | string; price_text?: string; currency?: string } | null | undefined, locale: PropertyLocale = 'es') {
  if (property?.price_text?.trim()) return property.price_text.trim();
  const price = Number(property?.price);
  if (!Number.isFinite(price) || price <= 0) return propertyCopy[locale].consult;
  const currency = /^[A-Z]{3}$/.test(property?.currency || '') ? property!.currency! : 'MXN';
  return `${new Intl.NumberFormat(locale === 'es' ? 'es-MX' : locale, { maximumFractionDigits: 2 }).format(price)} ${currency}`;
}

export interface PropertyFilters {
  q: string; category: string; operation: string; type: string; location: string; min: string; max: string; currency: string; basis: string; sort: string;
}
export const defaultPropertyFilters: PropertyFilters = { q: '', category: '', operation: '', type: '', location: '', min: '', max: '', currency: '', basis: '', sort: 'newest' };

export function filterProperties<T extends PropertySummary>(properties: T[], filters: PropertyFilters): T[] {
  const words = normalizeText(filters.q).split(/\s+/).filter(Boolean);
  const filtered = properties.filter(property => {
    const text = normalizeText([property.title, property.address, property.location, property.easybroker_id].filter(Boolean).join(' '));
    const price = Number(property.price);
    return words.every(word => text.includes(word))
      && matchesPropertyCategory(property, filters.category)
      && (!filters.operation || propertyOperations(property).includes(filters.operation))
      && (!filters.type || property.property_type === filters.type)
      && (!filters.location || property.location === filters.location)
      && (!filters.currency || property.currency === filters.currency)
      && (!filters.basis || propertyPriceBasis(property) === filters.basis)
      && (!filters.min || (price > 0 && price >= Number(filters.min)))
      && (!filters.max || (price > 0 && price <= Number(filters.max)));
  });
  return filtered.sort((a, b) => {
    if (filters.sort === 'areaDesc') return (b.area || 0) - (a.area || 0);
    if (filters.sort === 'priceAsc' || filters.sort === 'priceDesc') {
      const aPrice = Number(a.price), bPrice = Number(b.price);
      if (!(aPrice > 0)) return bPrice > 0 ? 1 : 0;
      if (!(bPrice > 0)) return -1;
      return filters.sort === 'priceAsc' ? aPrice - bPrice : bPrice - aPrice;
    }
    return Number(b.id) - Number(a.id);
  });
}

export function propertyShareUrl(id: string | number) {
  return `https://www.zevicapital.com/listing_details_01?id=${encodeURIComponent(id)}`;
}
