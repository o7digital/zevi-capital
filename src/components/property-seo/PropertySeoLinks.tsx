import Link from 'next/link';
import type { DirectusProperty } from '@/lib/directusProperties';
import { CATALOG_PATH, propertyGeographicLinks, propertyPath, serializeSeoJson, SITE_URL } from '@/lib/propertySeo';
import styles from './PropertyCatalog.module.css';

export default function PropertySeoLinks({ property }: { property: DirectusProperty }) {
  const links = property.cover_image ? propertyGeographicLinks(property) : [];
  const geographic = links.filter(link => !link.path.includes('/tipo/'));
  const breadcrumbs = [{ label: 'Inicio', path: '/' }, { label: 'Propiedades en México', path: CATALOG_PATH }, ...geographic, { label: property.title || 'Propiedad', path: propertyPath(property) }];
  const schema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((link, index) => ({ '@type': 'ListItem', position: index + 1, name: link.label, item: SITE_URL + link.path })) };
  return (
    <div className={styles.propertyLinks}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSeoJson(schema) }} />
      <nav aria-label="Explorar propiedades relacionadas" className={styles.tags}>
        <Link href={CATALOG_PATH}>Propiedades en México</Link>
        {links.map(link => <Link key={link.path} href={link.path}>{link.label}</Link>)}
      </nav>
    </div>
  );
}
