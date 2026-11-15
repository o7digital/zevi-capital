import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "@/contexts/TranslationContext"

const SidebarInfo = () => {
   const { t } = useTranslation()

   return (
      <>
         <Image src="/logo.png" alt="ZeVi Capital"
            width={120}
            height={120}
            className="lazy-img rounded-circle ms-auto me-auto mt-3 avatar" />
         <div className="text-center mt-25">
            <h6 className="name">ZeVi Capital</h6>
            <p className="fs-16">{t("listingDetails.agent.role")}</p>
            <ul className="style-none d-flex align-items-center justify-content-center social-icon">
               <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
               <li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
               <li><Link href="#"><i className="fa-brands fa-linkedin"></i></Link></li>
            </ul>
         </div>
         <div className="divider-line mt-40 mb-45 pt-20">
            <ul className="style-none">
               <li>{t("listingDetails.agent.location")}: <span>Zona Esmeralda, Estado de México</span></li>
               <li>Email: <span><Link href="mailto:contacto@zevicapital.com">contacto@zevicapital.com</Link></span>
               </li>
            </ul>
         </div>
         <Link href="/contact" className="btn-nine text-uppercase rounded-3 w-100 mb-10">{t("listingDetails.agent.cta")}</Link>
      </>
   )
}

export default SidebarInfo
