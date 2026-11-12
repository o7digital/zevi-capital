"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import property_data from "@/data/home-data/PropertyData";
import { useTranslation } from "@/contexts/TranslationContext";
import { DirectusPropertyCard, fetchDirectusProperties } from "@/lib/directusProperties";
import { defaultPropertyFilters, filterProperties, formatPropertyPrice, PropertyFilters, propertyCopy, propertyOperations } from "@/lib/propertyPresentation";
import titleShape from "@/assets/images/shape/title_shape_03.svg";
import styles from "./Property.module.css";

const PAGE_SIZE = 12;
const fallbackProperties = property_data.filter(item => item.page === "home_1");
type Card = typeof fallbackProperties[number] | DirectusPropertyCard;

function readFilters(): PropertyFilters {
   const params = new URLSearchParams(window.location.search);
   const filters = { ...defaultPropertyFilters };
   for (const key of Object.keys(filters) as (keyof PropertyFilters)[]) {
      filters[key] = params.get(`property_${key}`) || filters[key];
   }
   return filters;
}

const Property = () => {
   const { t, locale } = useTranslation();
   const copy = propertyCopy[locale];
   const hasDirectusConfig = Boolean(process.env.NEXT_PUBLIC_DIRECTUS_URL);
   const [properties, setProperties] = useState<Card[]>(hasDirectusConfig ? [] : fallbackProperties);
   const [isLoading, setIsLoading] = useState(hasDirectusConfig);
   const [loadError, setLoadError] = useState(false);
   const [attempt, setAttempt] = useState(0);
   const [filters, setFilters] = useState<PropertyFilters>(defaultPropertyFilters);
   const [filtersReady, setFiltersReady] = useState(false);
   const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

   useEffect(() => {
      const restore = () => { setFilters(readFilters()); setVisibleCount(PAGE_SIZE); };
      restore();
      setFiltersReady(true);
      window.addEventListener('popstate', restore);
      return () => window.removeEventListener('popstate', restore);
   }, []);

   useEffect(() => {
      if (!filtersReady) return;
      const url = new URL(window.location.href);
      for (const key of Object.keys(filters) as (keyof PropertyFilters)[]) {
         const name = `property_${key}`;
         if (filters[key] && filters[key] !== defaultPropertyFilters[key]) url.searchParams.set(name, filters[key]);
         else url.searchParams.delete(name);
      }
      window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
      try { sessionStorage.setItem('zevi-property-list-url', url.pathname + url.search + '#properties'); } catch { /* Storage may be disabled. */ }
   }, [filters, filtersReady]);

   useEffect(() => {
      if (!hasDirectusConfig) return;
      let isMounted = true;
      setIsLoading(true);
      setLoadError(false);
      fetchDirectusProperties()
         .then(data => { if (isMounted) setProperties(data); })
         .catch(() => { if (isMounted) setLoadError(true); })
         .finally(() => { if (isMounted) setIsLoading(false); });
      return () => { isMounted = false; };
   }, [hasDirectusConfig, attempt]);

   const summaries = useMemo(() => properties.map(item => ({
      ...item,
      location: 'location' in item ? item.location : item.address,
      property_type: 'property_type' in item ? item.property_type : undefined,
      operation_type: 'operation_type' in item ? item.operation_type : undefined,
      currency: 'currency' in item ? item.currency : 'MXN',
      area: 'area' in item ? item.area : item.property_info[0]?.total_feature,
   })), [properties]);
   const filtered = useMemo(() => filterProperties(summaries, filters), [summaries, filters]);
   const uniqueOptions = (key: 'location' | 'property_type' | 'currency') => Array.from(new Set(summaries.map(item => item[key]).filter((value): value is string => Boolean(value)))).sort((a, b) => a.localeCompare(b, locale));
   const change = (key: keyof PropertyFilters, value: string) => { setFilters(current => ({ ...current, [key]: value })); setVisibleCount(PAGE_SIZE); };
   const reset = () => { setFilters({ ...defaultPropertyFilters }); setVisibleCount(PAGE_SIZE); };
   const active = Object.keys(filters).some(key => filters[key as keyof PropertyFilters] !== defaultPropertyFilters[key as keyof PropertyFilters]);
   const select = (key: keyof PropertyFilters, label: string, placeholder: string, options: { value: string; label: string }[]) => (
      <label className={styles.field}>
         {label}
         <select value={filters[key]} onChange={event => change(key, event.target.value)}>
            <option value="">{placeholder}</option>
            {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
         </select>
      </label>
   );

   return (
      <section id="properties" aria-label={t('property.properties')} className="property-listing-one bg-pink-two mt-150 xl-mt-120 pt-140 xl-pt-120 lg-pt-80 pb-180 xl-pb-120 lg-pb-100">
         <div className="container">
            <div className="title-one text-center text-lg-start mb-45 xl-mb-30 lg-mb-20">
               <h3>{t('property.featured')} <span>{t('property.properties')} <Image src={titleShape} alt="" /></span></h3>
               <p className="fs-22 mt-xs">{t('property.subtitle')}</p>
            </div>
            <form className={styles.filters} role="search" onSubmit={event => event.preventDefault()}>
               <div className={styles.fields}>
                  <label className={`${styles.field} ${styles.search}`}>
                     {copy.search}
                     <input type="search" value={filters.q} onChange={event => change('q', event.target.value)} />
                  </label>
                  {select('operation', copy.operation, copy.allOperations, [{ value: 'sale', label: copy.sale }, { value: 'rent', label: copy.rent }])}
                  {select('type', copy.type, copy.allTypes, uniqueOptions('property_type').map(value => ({ value, label: value })))}
                  {select('location', copy.location, copy.allLocations, uniqueOptions('location').map(value => ({ value, label: value })))}
                  {select('currency', copy.currency, copy.allCurrencies, uniqueOptions('currency').map(value => ({ value, label: value })))}
                  <label className={styles.field}>{copy.minPrice}<input type="number" min="0" step="any" inputMode="decimal" value={filters.min} onChange={event => change('min', event.target.value)} /></label>
                  <label className={styles.field}>{copy.maxPrice}<input type="number" min="0" step="any" inputMode="decimal" value={filters.max} onChange={event => change('max', event.target.value)} /></label>
                  {select('basis', copy.basis, copy.allBases, [{ value: 'total', label: copy.total }, { value: 'perArea', label: copy.perArea }])}
                  <label className={styles.field}>{copy.sort}
                     <select value={filters.sort} onChange={event => change('sort', event.target.value)}>
                        <option value="newest">{copy.newest}</option><option value="priceAsc">{copy.priceAsc}</option><option value="priceDesc">{copy.priceDesc}</option><option value="areaDesc">{copy.areaDesc}</option>
                     </select>
                  </label>
               </div>
               <p className={styles.help}>{copy.priceHelp}</p>
            </form>
            <div className={styles.results}>
               <span role="status" aria-live="polite">{isLoading ? copy.loading : loadError ? copy.loadError : `${filtered.length} ${copy.results}`}</span>
               {active && <button type="button" className={styles.reset} onClick={reset}>{copy.reset}</button>}
               {loadError && <button type="button" className={styles.reset} onClick={() => setAttempt(value => value + 1)}>{copy.retry}</button>}
            </div>
            {!isLoading && !loadError && filtered.length === 0 && <p className={styles.empty}>{copy.noResults}</p>}
            <div className="row gx-xxl-5">
               {!isLoading && !loadError && filtered.slice(0, visibleCount).map(item => {
                  const href = 'href' in item && item.href ? item.href : '/listing_details_01';
                  const operations = propertyOperations(item);
                  const tag = operations.map(operation => operation === 'sale' ? copy.sale : copy.rent).join(' / ') || item.tag;
                  return (
                     <div key={item.id} className="col-lg-4 col-md-6 d-flex mt-40">
                        <article className={`listing-card-one border-25 h-100 w-100 ${styles.card}`}>
                           <div className="img-gallery p-15">
                              <div className="position-relative border-25 overflow-hidden">
                                 <div className={`tag border-25 ${item.tag_bg || ''}`}>{tag}</div>
                                 <Link href={href} className="d-block">
                                    <Image src={item.carousel_thumb[0].img} className={styles.image} alt={item.title} width={410} height={280} sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw" />
                                 </Link>
                              </div>
                           </div>
                           <div className={`property-info p-25 ${styles.info}`}>
                              <Link href={href} className="title tran3s">{item.title}</Link>
                              <div className="address">{item.address}</div>
                              <ul className="style-none feature d-flex flex-wrap align-items-center justify-content-between">
                                 {item.property_info.filter(info => info.total_feature > 0).map((info, index) => (
                                    <li key={index} className="d-flex align-items-center">
                                       <Image src={info.icon} alt="" className="icon me-2" />
                                       <span className="fs-16">{info.total_feature.toLocaleString(locale)} {info.feature === 'bed' ? copy.bedrooms : info.feature === 'bath' ? copy.bathrooms : info.feature}</span>
                                    </li>
                                 ))}
                              </ul>
                              <div className={`pl-footer top-border d-flex align-items-center justify-content-between ${styles.footer}`}>
                                 <strong className={`price fw-500 color-dark ${styles.price}`}>{formatPropertyPrice(item, locale)}</strong>
                                 <Link href={href} aria-label={`${copy.view}: ${item.title}`} className="btn-four rounded-circle flex-shrink-0"><i className="bi bi-arrow-up-right" aria-hidden="true"></i></Link>
                              </div>
                           </div>
                        </article>
                     </div>
                  );
               })}
            </div>
            {!isLoading && !loadError && filtered.length > visibleCount && <button type="button" className={styles.more} onClick={() => setVisibleCount(count => count + PAGE_SIZE)}>{copy.more} ({Math.min(visibleCount, filtered.length)}/{filtered.length})</button>}
         </div>
      </section>
   );
};
export default Property;
