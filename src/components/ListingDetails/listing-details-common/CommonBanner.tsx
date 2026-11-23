"use client"
import Link from "next/link"
import { DirectusProperty } from "@/lib/directusProperties"
import { useTranslation } from "@/contexts/TranslationContext"
import { propertyPath, propertyTransactions, SITE_URL } from "@/lib/propertySeo"
import { formatPropertyPrice } from "@/lib/propertyPresentation"
import PropertyShare from "./PropertyShare"

const CommonBanner = ({ style_3, property }: { style_3?: boolean; property?: DirectusProperty | null }) => {
   const { t, locale } = useTranslation()
   const listingStatus = property ? propertyTransactions(property).map(operation => t(operation === 'renta' ? "listingDetails.rent" : "listingDetails.sale")).join(' / ') || property.operation_type || '' : ''

   return (
      <div className="row">
         <div className="col-lg-6">
            <h1 className="property-titlee" style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.25 }}>{property?.title || t("listingDetails.titleFallback")}</h1>
            <div className="d-flex flex-wrap mt-10">
               <div className={`list-type text-uppercase mt-15 me-3 ${style_3 ? "bg-white text-dark fw-500" : "text-uppercase border-20"}`}>{listingStatus}</div>
               <div className="address mt-15"><i className="bi bi-geo-alt"></i> {property?.address || property?.location || ''}
               </div>
            </div>
         </div>
         <div className="col-lg-6 text-lg-end">
            <div className="d-inline-block md-mt-40">
               <div className="price color-dark fw-500" style={{ overflowWrap: 'anywhere' }}>{t("listingDetails.price")}: {formatPropertyPrice(property, locale)}</div>
               <div className="est-price fs-20 mt-25 mb-35 md-mb-30">{property?.property_type || t("listingDetails.propertyFallback")}</div>
               <ul className="style-none d-flex align-items-center action-btns">
                  <li className="me-auto fw-500 color-dark">
                     <PropertyShare title={property?.title || t("listingDetails.titleFallback")} url={property ? SITE_URL + propertyPath(property) : undefined} />
                  </li>
                  <li><Link href="#"
                     className={`d-flex align-items-center justify-content-center tran3s ${style_3 ? "" : "rounded-circle"}`}><i
                        className="fa-light fa-heart"></i></Link></li>
                  <li><Link href="#"
                     className={`d-flex align-items-center justify-content-center tran3s ${style_3 ? "" : "rounded-circle"}`}><i
                        className="fa-light fa-bookmark"></i></Link></li>
                  <li><Link href="#"
                     className={`d-flex align-items-center justify-content-center tran3s ${style_3 ? "" : "rounded-circle"}`}><i
                        className="fa-light fa-circle-plus"></i></Link></li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default CommonBanner
