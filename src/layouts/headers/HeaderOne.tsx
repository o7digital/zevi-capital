"use client"
import NavMenu from "./Menu/NavMenu"
import Link from "next/link"
import Image from "next/image"
import UseSticky from "@/hooks/UseSticky"
import LoginModal from "@/modals/LoginModal"
import { useTranslation } from "@/contexts/TranslationContext"

const HeaderOne = ({ style }: any) => {
   
   const { sticky } = UseSticky();
   const { t, locale, setLocale } = useTranslation();

   return (
      <>
         <header className={`theme-main-menu menu-style-one sticky-menu ${sticky ? "fixed" : ""}`}>
            <div className="inner-content gap-one">
               <div className="top-header position-relative">
                  <div className="d-flex align-items-center justify-content-between">
                     <div className="logo order-lg-0" style={{ position: "relative", zIndex: 1000 }}>
                        <Link href="/" className="d-flex align-items-center gap-2 gap-lg-3 text-decoration-none">
                           <Image
                              src="/logo/logo o7.jpg"
                              alt="O7 REALESTATES logo"
                              width={400}
                              height={100}
                              style={{ width: "auto", height: "60px" }}
                              className="d-lg-none"
                              priority
                           />
                           <Image
                              src="/logo/logo o7.jpg"
                              alt="O7 REALESTATES logo"
                              width={400}
                              height={100}
                              style={{ width: "auto", height: "100px" }}
                              className="d-none d-lg-block"
                              priority
                           />
                           <div className="d-flex flex-column" style={{ lineHeight: "1.1", marginLeft: "20px" }}>
                              <span 
                                 className="text-uppercase" 
                                 style={{ 
                                    fontSize: "clamp(16px, 2.5vw, 24px)",
                                    fontWeight: "700",
                                    letterSpacing: "2px",
                                    color: "#1a1a1a",
                                    fontFamily: "'Montserrat', 'Arial', sans-serif"
                                 }}
                              >
                                 O7
                              </span>
                              <span 
                                 className="text-capitalize" 
                                 style={{ 
                                    fontSize: "clamp(14px, 2vw, 20px)",
                                    fontWeight: "300",
                                    letterSpacing: "3px",
                                    color: "#1a1a1a",
                                    fontFamily: "'Montserrat', 'Arial', sans-serif"
                                 }}
                              >
                                 Realestates
                              </span>
                           </div>
                        </Link>
                     </div>
                     <div className="right-widget ms-auto ms-lg-0 me-3 me-lg-0 order-lg-3">
                        <ul className="d-flex align-items-center style-none">
                           <li className="me-3">
                              <button 
                                 onClick={() => {
                                    const newLocale = locale === 'en' ? 'fr' : 'en';
                                    console.log('Changing locale from', locale, 'to', newLocale);
                                    setLocale(newLocale);
                                 }}
                                 className="btn btn-sm d-flex align-items-center gap-1"
                                 style={{ 
                                    border: '1px solid #000',
                                    padding: '6px 15px',
                                    borderRadius: '5px',
                                    background: 'transparent',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    cursor: 'pointer'
                                 }}
                                 title={locale === 'en' ? 'Passer en français' : 'Switch to English'}
                              >
                                 {locale === 'en' ? '🇫🇷 FR' : '🇬🇧 EN'}
                              </button>
                           </li>
                           <li className="d-none d-lg-block">
                              <Link href="#" data-bs-toggle="modal" data-bs-target="#loginModal" className="btn-one"><i className="fa-regular fa-lock"></i> <span>{t('nav.login')}</span></Link>
                           </li>
                        </ul>
                     </div>
                     <nav className="navbar navbar-expand-lg p0 order-lg-2">
                        <button className="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="collapse"
                           data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                           aria-label="Toggle navigation">
                           <span></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                           <NavMenu />
                        </div>
                     </nav>
                  </div>
               </div>
            </div>
         </header>
         <LoginModal />
      </>
   )
}

export default HeaderOne
