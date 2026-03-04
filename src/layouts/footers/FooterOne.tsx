"use client"
import Image from "next/image"
import Link from "next/link"
import footer_data from "@/data/home-data/FooterData"
import { useTranslation } from "@/contexts/TranslationContext"
import FooterKeywords from "./FooterKeywords"

import footerShape_1 from "@/assets/images/shape/shape_32.svg"
import footerShape_2 from "@/assets/images/shape/shape_33.svg"

const icon_1: string[] = ["facebook", "twitter", "instagram"]

const FooterOne = ({ style }: any) => {
   const { t } = useTranslation();
   const isDark = Boolean(style);
   const footerBackground = isDark ? "#0D1A1C" : "#e6e6e6";
   const introBackground = isDark ? "transparent" : "#3a3a3a";
   const navTitleColor = isDark ? "#ffffff" : "#111111";
   const navLinkColor = isDark ? "#ffffff" : "#222222";
   const navHoverColor = isDark ? "rgb(48, 92, 115)" : "#2f617a";
   
   return (
      <div className={`footer-one ${isDark ? "dark-bg" : ""}`} style={{ background: footerBackground }}>
         <div className="position-relative z-1">
            <div className="container">
               <div className="row justify-content-between">
                  <div className="col-lg-4">
                     <div className={`footer-intro ${isDark ? "position-relative z-1" : ""}`}>
                        <div className="bg-wrapper" style={!isDark ? { background: introBackground } : undefined}>
                           <div className="logo mb-20">
                              <Link href="/" className="d-flex align-items-center gap-3 text-decoration-none">
                                 <Image src="/logo.jpeg" alt="ZEVI CAPITAL logo" width={80} height={80} style={{ width: "auto", height: "80px" }} />
                                 <span className="fw-semibold text-uppercase fs-5" style={{ color: '#ffffff' }}>ZEVI CAPITAL</span>
                              </Link>
                           </div>
                           <p className="mb-60 lg-mb-40 md-mb-20" style={{ color: '#ffffff' }}>{t('footer.address')}</p>
                           <h6 style={{ color: '#ffffff' }}>{t('footer.contact')}</h6>
                           <Link href="mailto:info@zevicapital.com" className={`email tran3s mb-70 lg-mb-50 ${isDark ? "font-garamond" : "fs-24 text-decoration-underline"}`} style={{ color: '#ffffff' }}>info@zevicapital.com</Link>
                           <ul className="style-none d-flex align-items-center social-icon">
                              {icon_1.map((icon, i) => (
                                 <li key={i}><Link href="#"><i className={`fa-brands fa${isDark ? "" : "-square"}-${icon}`}></i></Link></li>
                              ))}
                           </ul>
                        </div>
                        {isDark && <Image src={footerShape_1} alt="" className="lazy-img shapes shape_01" />}
                     </div>
                  </div>

                  <div className="col-lg-8">
                     <div className={`d-flex flex-wrap ${isDark ? "h-100" : ""}`}>
                        {footer_data.filter((items) => items.page === "home_1").map((item) => (
                           <div key={item.id} className={`footer-nav mt-100 lg-mt-80 ${item.widget_class}`}>
                              <h5 className="footer-title" style={{ color: navTitleColor }}>{item.widget_title_key ? t(item.widget_title_key) : item.widget_title}</h5>
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
            {isDark && <Image src={footerShape_2} alt="" className="lazy-img shapes shape_02" />}
         </div>
         <style jsx>{`
            .footer-one .footer-nav-link a {
               color: ${navLinkColor} !important;
            }
            .footer-one .footer-nav-link a:hover {
               color: ${navHoverColor} !important;
            }
            .footer-one .social-icon a {
               color: #ffffff !important;
            }
         `}</style>
      </div>
   )
}

export default FooterOne
