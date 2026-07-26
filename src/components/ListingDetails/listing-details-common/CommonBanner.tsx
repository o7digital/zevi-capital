import Link from "next/link"
import { DirectusProperty } from "@/lib/directusProperties"

const formatPrice = (property?: DirectusProperty | null) => {
   const price = Number(property?.price);
   if (!Number.isFinite(price)) return "Precio a consultar";
   return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: property?.currency || "MXN",
      maximumFractionDigits: 0,
   }).format(price);
};

const CommonBanner = ({ style_3, property }: { style_3?: boolean; property?: DirectusProperty | null }) => {
   return (
      <div className="row">
         <div className="col-lg-6">
            <h3 className="property-titlee">{property?.title || "Propiedad ZeVi Capital"}</h3>
            <div className="d-flex flex-wrap mt-10">
               <div className={`list-type text-uppercase mt-15 me-3 ${style_3 ? "bg-white text-dark fw-500" : "text-uppercase border-20"}`}>{property?.listing_status || property?.tag || "FOR SALE"}</div>
               <div className="address mt-15"><i className="bi bi-geo-alt"></i> {property?.address || property?.location || "Estado de México"}
               </div>
            </div>
         </div>
         <div className="col-lg-6 text-lg-end">
            <div className="d-inline-block md-mt-40">
               <div className="price color-dark fw-500">Precio: {formatPrice(property)}</div>
               <div className="est-price fs-20 mt-25 mb-35 md-mb-30">{property?.property_type || "Inmueble"}</div>
               <ul className="style-none d-flex align-items-center action-btns">
                  <li className="me-auto fw-500 color-dark"><i className="fa-sharp fa-regular fa-share-nodes me-2"></i>
                     Share</li>
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
