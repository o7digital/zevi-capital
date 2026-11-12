"use client"
import PropertyShare from "./PropertyShare"
import { formatPropertyPrice, propertyCopy, propertyOperations } from "@/lib/propertyPresentation"
import { DirectusProperty } from "@/lib/directusProperties"
import { useTranslation } from "@/contexts/TranslationContext"

const CommonBanner = ({ style_3, property }: { style_3?: boolean; property?: DirectusProperty | null }) => {
   const { t, locale } = useTranslation();
   const copy = propertyCopy[locale];
   const listingStatus = property ? propertyOperations(property).map(operation => operation === 'sale' ? copy.sale : copy.rent).join(' / ') || property.listing_status || property.tag : '';

   return (
      <div className="row">
         <div className="col-lg-6">
            <h3 className="property-titlee">{property?.title || t("listingDetails.titleFallback")}</h3>
            <div className="d-flex flex-wrap mt-10">
               <div className={`list-type text-uppercase mt-15 me-3 ${style_3 ? "bg-white text-dark fw-500" : "text-uppercase border-20"}`}>{listingStatus}</div>
               <div className="address mt-15"><i className="bi bi-geo-alt"></i> {property?.address || property?.location || "Estado de México"}
               </div>
            </div>
         </div>
         <div className="col-lg-6 text-lg-end">
            <div className="d-inline-block md-mt-40">
               <div className="price color-dark fw-500" style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.4, overflowWrap: "anywhere" }}>{t("listingDetails.price")}: {formatPropertyPrice(property, locale)}</div>
               <div className="est-price fs-20 mt-25 mb-35 md-mb-30">{property?.property_type || t("listingDetails.propertyFallback")}</div>
               {property && <PropertyShare property={property} />}
            </div>
         </div>
      </div>
   )
}

export default CommonBanner
