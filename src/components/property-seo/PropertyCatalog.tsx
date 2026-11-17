import Image from 'next/image';
import Link from 'next/link';
import HeaderOne from '@/layouts/headers/HeaderOne';
import FooterOne from '@/layouts/footers/FooterOne';
import Wrapper from '@/layouts/Wrapper';
import { directusPropertyImages } from '@/lib/directusProperties';
import { formatPropertyPrice } from '@/lib/propertyPresentation';
import { catalogChildLinks, propertyPath, propertyTransactions, serializeSeoJson, SITE_URL, type PropertyCatalog as Catalog } from '@/lib/propertySeo';
import styles from './PropertyCatalog.module.css';

export default function PropertyCatalog({ catalog, catalogs }: { catalog: Catalog; catalogs: Map<string, Catalog> }) {
  const links = catalogChildLinks(catalog, catalogs);
  const crumbs = [{ label: 'Inicio', path: '/' }, ...catalog.breadcrumbs];
  const schema = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: crumbs.map((link, i) => ({ '@type': 'ListItem', position: i + 1, name: link.label, item: SITE_URL + link.path })) },
      { '@type': 'ItemList', name: catalog.heading, numberOfItems: catalog.properties.length, itemListElement: catalog.properties.map((property, i) => ({ '@type': 'ListItem', position: i + 1, name: property.title, url: SITE_URL + propertyPath(property) })) },
    ],
  };
  return (
    <Wrapper>
      <HeaderOne style={false} />
      <main className={styles.main}>
        <div className="container">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSeoJson(schema) }} />
          <nav aria-label="Ruta de navegación" className={styles.breadcrumbs}>
            {crumbs.map((link, i) => <span key={link.path}>{i > 0 && <span aria-hidden="true"> / </span>}{i === crumbs.length - 1 ? <span aria-current="page">{link.label}</span> : <Link href={link.path}>{link.label}</Link>}</span>)}
          </nav>
          <header className={styles.heading}>
            <p className={styles.eyebrow}>ZEVI CAPITAL · MÉXICO</p>
            <h1>{catalog.heading}</h1>
            <p>{catalog.description}</p>
            <p className={styles.intro}>Revisa las características, fotografías, ubicación y condiciones de cada inmueble. Contacta a ZeVi Capital para confirmar disponibilidad y recibir asesoría sobre la propiedad que te interesa.</p>
          </header>
          {links.length > 0 && <section className={styles.explore} aria-labelledby="explore-title">
            <h2 id="explore-title">Explora por ubicación y tipo de inmueble</h2>
            <nav className={styles.tags} aria-label="Ubicaciones y tipos de inmueble">
              {links.map(link => <Link key={link.path} href={link.path}>{link.label} <span>({link.count})</span></Link>)}
            </nav>
          </section>}
          <section aria-labelledby="available-title">
            <h2 id="available-title" className={styles.results}>{catalog.properties.length} {catalog.properties.length === 1 ? 'propiedad publicada' : 'propiedades publicadas'}</h2>
            <div className={styles.grid}>
              {catalog.properties.map((property, i) => {
                const image = directusPropertyImages(property)[0];
                const href = propertyPath(property);
                const transaction = propertyTransactions(property).map(value => value === 'renta' ? 'Renta' : 'Venta').join(' / ');
                return <article key={property.id} className={styles.card}>
                  {image && <Link href={href} className={styles.image}><Image src={image.img} alt={property.title || 'Propiedad'} width={410} height={280} sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 33vw" priority={i === 0} /></Link>}
                  <div className={styles.cardBody}>
                    {(transaction || property.property_type) && <p className={styles.kind}>{[transaction, property.property_type].filter(Boolean).join(' · ')}</p>}
                    <h3><Link href={href}>{property.title}</Link></h3>
                    {(property.location || property.address) && <p className={styles.address}>{property.location || property.address}</p>}
                    <p className={styles.price}>{formatPropertyPrice(property)}</p>
                    <Link href={href} className={styles.view}>Ver propiedad <span aria-hidden="true">↗</span></Link>
                  </div>
                </article>;
              })}
            </div>
          </section>
          <div className={styles.contact}><p>¿Buscas una propiedad con características específicas?</p><Link href="/contact">Cuéntanos qué necesitas</Link></div>
        </div>
      </main>
      <FooterOne style={false} />
    </Wrapper>
  );
}
