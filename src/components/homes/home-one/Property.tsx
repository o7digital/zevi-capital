"use client"
import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "@/contexts/TranslationContext";
import { DirectusPropertyCard, fetchDirectusProperties, shouldDisplayPropertyPrice } from "@/lib/directusProperties";

import titleShape from "@/assets/images/shape/title_shape_03.svg";
import { advisoryCopy, sectors } from "./advisoryContent";

const Property = ({ initialProperties = [], sector }: { initialProperties?: DirectusPropertyCard[]; sector?: string }) => {
   const { t, locale } = useTranslation();
   const copy = advisoryCopy[locale];
   const hasDirectusConfig = Boolean(process.env.NEXT_PUBLIC_DIRECTUS_URL);
   const [isLoading, setIsLoading] = useState(hasDirectusConfig && initialProperties.length === 0);
   const [loadError, setLoadError] = useState(false);
   const [properties, setProperties] = useState<DirectusPropertyCard[]>(initialProperties);
   const formatCardPrice = (item: DirectusPropertyCard) => {
      const currency = item.currency || "MXN";
      const amount = item.price.toLocaleString("es-MX", {
         minimumFractionDigits: item.price_text ? 0 : 2,
         maximumFractionDigits: 2,
      });

      return `$${amount} ${currency}`;
   };
   const propertyHref = (item: DirectusPropertyCard) => item.href || "/listing_details_01";
   const sectorPatterns: Record<string, RegExp> = {
      industrial: /industrial|bodega|nave|warehouse|logistic/i,
      offices: /oficina|office|corporativ/i,
      retail: /local|comercial|retail|commerc/i,
      land: /terreno|land|lote|lot\b/i,
      residential: /casa|departamento|residenc|condominio|house|apartment|villa|penthouse/i,
   };
   const activeSector = typeof sector === "string" && Object.prototype.hasOwnProperty.call(sectorPatterns, sector) ? sector : undefined;
   const visibleProperties = activeSector
      ? properties.filter(item => sectorPatterns[activeSector].test(item.property_type || item.title))
      : properties;

   useEffect(() => {
      if (!hasDirectusConfig) return;

      let isMounted = true;

      fetchDirectusProperties()
         .then((directusProperties) => {
            if (isMounted) {
               setProperties(directusProperties);
               setLoadError(false);
            }
         })
         .catch((error) => {
            console.error(error);
            if (isMounted) {
               setLoadError(true);
            }
         })
         .finally(() => {
            if (isMounted) {
               setIsLoading(false);
            }
         });

      return () => {
         isMounted = false;
      };
   }, [hasDirectusConfig]);
   
   return (
      <div id="properties" className="property-listing-one bg-pink-two mt-150 xl-mt-120 pt-140 xl-pt-120 lg-pt-80 pb-180 xl-pb-120 lg-pb-100">
         <div className="container">
            <div className="position-relative">
               <div className="title-one text-center text-lg-start mb-45 xl-mb-30 lg-mb-20 wow fadeInUp">
                  <h2>{t('property.featured')} <span>{t('property.properties')} <Image src={titleShape} alt="" className="lazy-img" /></span></h2>
                  <p className="fs-22 mt-xs">{t('property.subtitle')}</p>
               </div>

               <nav className="advisory-property-filters" aria-label={copy.sectorLabel}>
                  <Link href="/#properties" aria-current={!activeSector ? "page" : undefined}>{copy.all}</Link>
                  {sectors.filter(item => item.id !== "developments").map((item, index) => (
                     <Link key={item.id} href={item.href} aria-current={activeSector === item.id ? "page" : undefined}>{copy.sectorNames[index]}</Link>
                  ))}
               </nav>
               <div className="row gx-xxl-5" aria-live="polite">
                  {visibleProperties.length === 0 && (
                     <div className="col-12">
                        <p className="fs-20 mb-0">{isLoading ? t("property.loading") : loadError ? t("property.loadError") : activeSector ? copy.noResults : t("property.empty")}</p>
                        {activeSector && <Link href="/#properties" className="advisory-clear-filter">{copy.clear} ⟶</Link>}
                     </div>
                  )}
                  {visibleProperties.map((item) => (
                     <div key={item.id} className="col-lg-4 col-md-6 d-flex mt-40 wow fadeInUp" data-wow-delay={item.data_delay_time}>
                        <div className="listing-card-one border-25 h-100 w-100">
                           <div className="img-gallery p-15">
                              <div className="position-relative border-25 overflow-hidden">
                                 <div className={`tag border-25 ${item.tag_bg}`}>{item.tag}</div>
                                 <div id={`carousel${item.carousel}`} className="carousel slide">
                                    <div className="carousel-indicators">
                                       <button type="button" data-bs-target={`#carousel${item.carousel}`} data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                       <button type="button" data-bs-target={`#carousel${item.carousel}`} data-bs-slide-to="1" aria-label="Slide 2"></button>
                                       <button type="button" data-bs-target={`#carousel${item.carousel}`} data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    </div>
                                    <div className="carousel-inner">
                                       {item.carousel_thumb.map((image, i) => (
                                          <div key={i} className={`carousel-item ${image.active}`} data-bs-interval="1000000">
                                             <Link href={propertyHref(item)} className="d-block"><Image src={image.img} className="w-100" alt={item.title} width={410} height={280} /></Link>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="property-info p-25">
                              <Link href={propertyHref(item)} className="title tran3s">{item.title}</Link>
                              <div className="address">{item.address}</div>
                              <ul className="style-none feature d-flex flex-wrap align-items-center justify-content-between">
                                 {item.property_info.map((info, index) => (
                                    <li key={index} className="d-flex align-items-center">
                                       <Image src={info.icon} alt="" className="lazy-img icon me-2" />
                                       <span className="fs-16">{info.total_feature} {info.feature}</span>
                                    </li>
                                 ))}
                              </ul>
                              <div className="pl-footer top-border d-flex align-items-center justify-content-between">
                                 <strong className="price fw-500 color-dark">
                                    {shouldDisplayPropertyPrice(item) ? (
                                       <>{formatCardPrice(item)}{item.price_text && <>/<sub>m</sub></>}</>
                                    ) : (
                                       t("property.priceOnRequest")
                                    )}
                                 </strong>
                                 <Link href={propertyHref(item)} className="btn-four rounded-circle"><i className="bi bi-arrow-up-right"></i></Link>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}

export default Property;
