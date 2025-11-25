"use client"
import Image from "next/image"
import Link from "next/link"
import footer_data from "@/data/home-data/FooterData"
import { useTranslation } from "@/contexts/TranslationContext"
import FooterKeywords from "./FooterKeywords"

import footerLogo_1 from "@/assets/images/logo/logo_01.svg"
import footerLogo_2 from "@/assets/images/logo/logo_03.svg"
import footerShape_1 from "@/assets/images/shape/shape_32.svg"
import footerShape_2 from "@/assets/images/shape/shape_33.svg"

const icon_1: string[] = ["facebook", "twitter", "instagram"]

const FooterOne = ({ style }: any) => {
   const { t } = useTranslation();
   
   return (
      <div className={`footer-one ${style ? "dark-bg" : ""}`}>
         <div className="position-relative z-1">
            <div className="container">
               <div className="row justify-content-between">
                  <div className="col-lg-4">
                     <div className={`footer-intro ${style ? "position-relative z-1" : ""}`}>
                        <div className="bg-wrapper">
                           <div className="logo mb-20">
                              <Link href="/" className="d-flex align-items-center gap-3 text-decoration-none">
                                 <Image src="/images/logo.svg" alt="O7 REALESTATES logo" width={80} height={80} style={{ width: "auto", height: "80px" }} />
                                 <span className="fw-semibold text-uppercase fs-5">O7 REALESTATES</span>
                              </Link>
                           </div>
                           <p className="mb-60 lg-mb-40 md-mb-20">{t('footer.address')}</p>
                           <h6>{t('footer.contact')}</h6>
                           <Link href="mailto:info@o7realestates.com" className={`email tran3s mb-70 lg-mb-50 ${style ? "font-garamond" : "fs-24 text-decoration-underline"}`}>info@o7realestates.com</Link>
                           <ul className="style-none d-flex align-items-center social-icon">
                              {icon_1.map((icon, i) => (
                                 <li key={i}><Link href="#"><i className={`fa-brands fa${style ? "" : "-square"}-${icon}`}></i></Link></li>
                              ))}
                           </ul>
                        </div>
                        {style && <Image src={footerShape_1} alt="" className="lazy-img shapes shape_01" />}
                     </div>
                  </div>

                  <div className="col-lg-8">
                     <div className={`d-flex flex-wrap ${style ? "h-100" : ""}`}>
                        {footer_data.filter((items) => items.page === "home_1").map((item) => (
                           <div key={item.id} className={`footer-nav mt-100 lg-mt-80 ${item.widget_class}`}>
                              <h5 className={`footer-title ${style ? "text-white" : ''}`}>{item.widget_title_key ? t(item.widget_title_key) : item.widget_title}</h5>
                              <ul className="footer-nav-link style-none">
                                 {item.footer_link.map((li, i) => (
                                    <li key={i}><Link href={li.link}>{li.link_title_key ? t(li.link_title_key) : li.link_title}</Link></li>
                                 ))}
                              </ul>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
               <FooterKeywords />
            </div>
            {style && <Image src={footerShape_2} alt="" className="lazy-img shapes shape_02" />}
         </div>
      </div>
   )
}

export default FooterOne
