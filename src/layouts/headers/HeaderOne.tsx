"use client"
import NavMenu from "./Menu/NavMenu"
import Link from "next/link"
import Image from "next/image"
import UseSticky from "@/hooks/UseSticky"
import LoginModal from "@/modals/LoginModal"
import { useTranslation } from "@/contexts/TranslationContext"
import { useEffect, useRef, useState } from "react"

const HeaderOne = ({ style }: any) => {
   
   const { sticky } = UseSticky();
   const { t, locale, setLocale } = useTranslation();
   const [langOpen, setLangOpen] = useState(false);
   const langRef = useRef<HTMLDivElement>(null);

   const languages = [
      { code: 'fr' as const, label: 'FR', title: 'Français' },
      { code: 'en' as const, label: 'EN', title: 'English' },
      { code: 'es' as const, label: 'ES', title: 'Español' },
   ];

   const activeLanguage = languages.find((lang) => lang.code === locale) ?? languages[2];

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (langRef.current && !langRef.current.contains(event.target as Node)) {
            setLangOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   return (
      <>
         <header
            className={`theme-main-menu menu-style-one sticky-menu ${sticky ? "fixed" : ""}`}
            style={{ background: "#ffffff", borderBottom: "1px solid #e9ecef" }}
         >
            <div className="inner-content gap-one">
               <div className="top-header position-relative">
                  <div className="d-flex align-items-center justify-content-between">
                     <div className="logo order-lg-0" style={{ position: "relative", zIndex: 1000 }}>
                        <Link href="/" className="d-flex align-items-center gap-2 gap-lg-3 text-decoration-none">
                           <Image
                              src="/logo.png"
                              alt="ZEVI CAPITAL logo"
                              width={400}
                              height={100}
                              style={{ width: "auto", height: "60px" }}
                              className="d-lg-none"
                              priority
                           />
                           <Image
                              src="/logo.png"
                              alt="ZEVI CAPITAL logo"
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
                                    color: "#111111",
                                    fontFamily: "'Montserrat', 'Arial', sans-serif"
                                 }}
                              >
                                 ZEVI
                              </span>
                              <span 
                                 className="text-uppercase" 
                                 style={{ 
                                    fontSize: "clamp(14px, 2vw, 20px)",
                                    fontWeight: "300",
                                    letterSpacing: "3px",
                                    color: "#111111",
                                    fontFamily: "'Montserrat', 'Arial', sans-serif"
                                 }}
                              >
                                 CAPITAL
                              </span>
                           </div>
                        </Link>
                     </div>
                     <div className="right-widget ms-auto ms-lg-0 me-3 me-lg-0 order-lg-3">
                        <ul className="d-flex align-items-center style-none">
                           <li className="me-3">
                              <div className="language-switch" ref={langRef}>
                                 <button
                                    type="button"
                                    className="language-switch-btn"
                                    onClick={() => setLangOpen((prev) => !prev)}
                                    aria-label="Select language"
                                    aria-expanded={langOpen}
                                 >
                                    <span>{activeLanguage.label}</span>
                                    <span className={`language-switch-chevron ${langOpen ? "open" : ""}`}>▾</span>
                                 </button>
                                 <div className={`language-switch-dropdown ${langOpen ? "open" : ""}`}>
                                    {languages
                                       .filter((lang) => lang.code !== locale)
                                       .map((lang) => (
                                          <button
                                             type="button"
                                             key={lang.code}
                                             className="language-switch-item"
                                             onClick={() => {
                                                setLocale(lang.code);
                                                setLangOpen(false);
                                             }}
                                             title={lang.title}
                                          >
                                             {lang.label}
                                          </button>
                                       ))}
                                 </div>
                              </div>
                           </li>
                           <li className="d-none d-lg-block">
                              <Link href="#" data-bs-toggle="modal" data-bs-target="#loginModal" className="btn-one" style={{ background: 'rgb(48, 92, 115)', borderColor: 'rgb(48, 92, 115)', color: '#ffffff' }}><i className="fa-regular fa-lock"></i> <span>{t('nav.login')}</span></Link>
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
            <style jsx global>{`
               .theme-main-menu .nav-item .nav-link {
                  color: #111111 !important;
               }
               .theme-main-menu .nav-item .nav-link:hover {
                  color: rgb(48, 92, 115) !important;
               }
               .theme-main-menu.fixed {
                  background: #ffffff !important;
                  border-bottom: 1px solid #e9ecef !important;
               }
               .theme-main-menu .navbar-toggler span,
               .theme-main-menu .navbar-toggler::before,
               .theme-main-menu .navbar-toggler::after {
                  background: #111111 !important;
               }
               .language-switch {
                  position: relative;
                  min-width: 62px;
               }
               .language-switch-btn {
                  border: none;
                  background: transparent;
                  color: #111111;
                  font-size: 18px;
                  font-weight: 500;
                  letter-spacing: 0.02em;
                  display: inline-flex;
                  align-items: center;
                  gap: 6px;
                  line-height: 1;
                  padding: 4px 0;
               }
               .language-switch-chevron {
                  font-size: 13px;
                  transition: transform 0.2s ease;
                  transform-origin: center;
               }
               .language-switch-chevron.open {
                  transform: rotate(180deg);
               }
               .language-switch-dropdown {
                  position: absolute;
                  top: calc(100% + 6px);
                  left: 0;
                  z-index: 1200;
                  min-width: 62px;
                  border: 1px solid #e3e3e3;
                  border-radius: 8px;
                  background: #ffffff;
                  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
                  padding: 4px 0;
                  opacity: 0;
                  visibility: hidden;
                  transform: translateY(-6px);
                  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
               }
               .language-switch-dropdown.open {
                  opacity: 1;
                  visibility: visible;
                  transform: translateY(0);
               }
               .language-switch-item {
                  width: 100%;
                  border: none;
                  background: transparent;
                  color: #111111;
                  font-size: 16px;
                  font-weight: 500;
                  text-align: left;
                  padding: 8px 12px;
                  line-height: 1;
               }
               .language-switch-item:hover {
                  background: #f5f7fa;
               }
               @media (max-width: 991px) {
                  .language-switch-btn,
                  .language-switch-item {
                     font-size: 15px;
                  }
               }
            `}</style>
         </header>
         <LoginModal />
      </>
   )
}

export default HeaderOne
