"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import MediaGallery from "./MediaGallery"
import Sidebar from "./Sidebar"
import CommonBanner from "../listing-details-common/CommonBanner"
import CommonPropertyOverview from "../listing-details-common/CommonPropertyOverview"
import { DirectusProperty, directusPropertyImages, fetchDirectusProperty } from "@/lib/directusProperties"
import { useTranslation } from "@/contexts/TranslationContext"

const ListingDetailsOneArea = () => {
   const searchParams = useSearchParams();
   const propertyId = searchParams.get("id") || "";
   const [property, setProperty] = useState<DirectusProperty | null>(null);
   const { t } = useTranslation();

   useEffect(() => {
      let isMounted = true;

      fetchDirectusProperty(propertyId).then((directusProperty) => {
         if (isMounted) {
            setProperty(directusProperty);
         }
      });

      return () => {
         isMounted = false;
      };
   }, [propertyId]);

   const galleryImages = property
      ? directusPropertyImages(property).map((image, index) => ({
         url: image.img,
         alt: `${property.title || "Propiedad"} ${index + 1}`,
      }))
      : [];

   const detailRows = [
      { label: t("listingDetails.details.bedrooms"), value: property?.bedrooms },
      { label: t("listingDetails.details.bathrooms"), value: property?.bathrooms },
      { label: t("listingDetails.details.area"), value: property?.sqft ? `${property.sqft} sqft` : undefined },
      { label: t("listingDetails.details.type"), value: property?.property_type },
      { label: t("listingDetails.details.operation"), value: property?.operation_type === "rental" ? t("listingDetails.rent") : t("listingDetails.sale") },
      { label: t("listingDetails.details.status"), value: property?.listing_status || property?.tag },
      { label: t("listingDetails.details.location"), value: property?.location },
      { label: t("listingDetails.details.easybroker"), value: property?.easybroker_id },
   ].filter((row) => row.value !== undefined && row.value !== null && row.value !== "");

   return (
      <div className="listing-details-one theme-details-one bg-pink pt-180 lg-pt-150 pb-150 xl-pb-120">
         <div className="container">
            <Link href="/#properties" className="d-inline-flex align-items-center mb-35 fw-500 color-dark">
               <i className="bi bi-arrow-left me-2"></i>
               {t("listingDetails.backToList")}
            </Link>
            <CommonBanner property={property} />
            <MediaGallery images={galleryImages} />
            <div className="property-feature-list bg-white shadow4 border-20 p-40 mt-50 mb-60">
               <h4 className="sub-title-one mb-40 lg-mb-20">{t("listingDetails.overview.title")}</h4>
               <CommonPropertyOverview property={property} />
            </div>
            <div className="row">
               <div className="col-xl-8">
                  <div className="property-overview mb-50 bg-white shadow4 border-20 p-40">
                     <h4 className="mb-20">{t("listingDetails.description")}</h4>
                     <p className="fs-20 lh-lg" style={{ whiteSpace: "pre-line" }}>{property?.description || t("listingDetails.descriptionFallback")}</p>
                  </div>
                  <div className="property-feature-accordion bg-white shadow4 border-20 p-40 mb-50">
                     <h4 className="mb-30">{t("listingDetails.details.title")}</h4>
                     <div className="feature-list-two">
                        <ul className="style-none d-flex flex-wrap justify-content-between">
                           {detailRows.map((row) => (
                              <li key={row.label}>
                                 <span>{row.label}</span>
                                 <span className="fw-500 color-dark">{row.value}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
                  <Link href="/#properties" className="btn-four d-inline-flex align-items-center justify-content-center rounded-circle">
                     <i className="bi bi-arrow-left"></i>
                  </Link>
                  <Link href="/#properties" className="fw-500 color-dark ms-3">
                     {t("listingDetails.backToList")}
                  </Link>
               </div>
               <Sidebar property={property} />
            </div>
         </div>
      </div>
   )
}

export default ListingDetailsOneArea
