"use client"
import { useEffect, useRef } from "react"
import Slider from "react-slick"
import DropdownOne from "@/components/search-dropdown/home-dropdown/DropdownOne"

const Banner = () => {
   const sliderRef = useRef<Slider | null>(null)

   const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 1000,
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
   }

   useEffect(() => {
      const slider = sliderRef.current
      if (slider) {
         slider.slickPlay()
      }
   }, [])

   return (
      <div className="hero-banner-one z-1 pt-225 xl-pt-200 pb-250 xl-pb-150 lg-pb-100 position-relative" style={{ overflow: 'hidden', minHeight: '800px' }}>
         {/* Background Slider */}
         <div className="hero-slider-wrapper position-absolute" style={{ 
            top: 0, 
            left: 0, 
            width: '100%',
            height: '100%',
            zIndex: 0
         }}>
            <Slider ref={sliderRef} {...settings}>
               <div style={{ height: '100%', width: '100%' }}>
                  <img 
                     src="/slider/cdmx.png"
                     alt="villa de luxe Mexico immobilier premium exclusif"
                     style={{
                        width: '100%',
                        height: '800px',
                        objectFit: 'cover',
                        objectPosition: 'center'
                     }}
                  />
               </div>
               <div style={{ height: '100%', width: '100%' }}>
                  <img 
                     src="/slider/montreal2.jpg"
                     alt="Mexico penthouse luxury real estate"
                     style={{
                        width: '100%',
                        height: '800px',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        transform: 'translateY(-60px)'
                     }}
                  />
               </div>
            </Slider>
         </div>

         <div className="container position-relative" style={{ zIndex: 1 }}>
            {/* Search bar avec effet hover/touch - transparent par défaut */}
            <div className="row">
               <div className="col-xxl-10 m-auto">
                  <div 
                     className="booking-hover-zone" 
                     tabIndex={0} 
                     style={{ outline: 'none' }}
                     id="booking-hover-container"
                  >
                     <div 
                        className="search-wrapper-one layout-one bg position-relative booking-bar-inner"
                        id="booking-bar-container"
                     >
                        <div className="bg-wrapper">
                           <DropdownOne style={false} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <style jsx>{`
            .hero-slider-wrapper :global(.slick-slider),
            .hero-slider-wrapper :global(.slick-list),
            .hero-slider-wrapper :global(.slick-track) {
               height: 100% !important;
            }
            .hero-slider-wrapper :global(.slick-slide) {
               height: 100% !important;
            }
            .hero-slider-wrapper :global(.slick-slide) > div {
               height: 100% !important;
               display: block !important;
            }
            /* Technique d'affichage au survol/touch - Complètement caché */
            .booking-hover-zone {
               cursor: pointer;
            }

            .booking-bar-inner {
               opacity: 0;
               visibility: hidden;
               pointer-events: none;
               transform: scale(0.95);
               transition: opacity 0.5s ease, transform 0.5s ease, visibility 0.5s ease, backdrop-filter 0.5s ease;
               backdrop-filter: blur(0px);
            }

            .booking-bar-inner :global(.bg-wrapper) {
               background: rgba(255, 255, 255, 0) !important;
               transition: background 0.5s ease;
            }

            /* États hover et focus pour desktop */
            .booking-hover-zone:hover .booking-bar-inner,
            .booking-hover-zone:focus-within .booking-bar-inner {
               opacity: 1;
               visibility: visible;
               pointer-events: auto;
               transform: scale(1);
               backdrop-filter: blur(8px);
            }

            .booking-hover-zone:hover .booking-bar-inner :global(.bg-wrapper),
            .booking-hover-zone:focus-within .booking-bar-inner :global(.bg-wrapper) {
               background: rgba(255, 255, 255, 0.95) !important;
            }

            /* Support mobile/tablette */
            @media (max-width: 991px) {
               .booking-bar-inner {
                  opacity: 0;
                  visibility: hidden;
                  transform: scale(0.95);
               }

               .booking-hover-zone:active .booking-bar-inner,
               .booking-hover-zone:focus-within .booking-bar-inner {
                  opacity: 1;
                  visibility: visible;
                  pointer-events: auto;
                  transform: scale(1);
               }
            }
         `}</style>

         <script dangerouslySetInnerHTML={{
            __html: `
               // Support tactile/mobile - Complètement caché
               if (typeof window !== 'undefined') {
                  setTimeout(() => {
                     const box = document.getElementById('booking-hover-container');
                     const barContainer = document.getElementById('booking-bar-container');
                     
                     if (box && barContainer) {
                        let hideTimeout;
                        
                        box.addEventListener('touchstart', () => {
                           barContainer.style.opacity = '1';
                           barContainer.style.visibility = 'visible';
                           barContainer.style.pointerEvents = 'auto';
                           barContainer.style.transform = 'scale(1)';
                           barContainer.style.backdropFilter = 'blur(8px)';
                           
                           clearTimeout(hideTimeout);
                           
                           hideTimeout = setTimeout(() => {
                              barContainer.style.opacity = '0';
                              barContainer.style.visibility = 'hidden';
                              barContainer.style.pointerEvents = 'none';
                              barContainer.style.transform = 'scale(0.95)';
                              barContainer.style.backdropFilter = 'blur(0px)';
                           }, 5000);
                        });
                     }
                  }, 100);
               }
            `
         }} />
      </div>
   )
}

export default Banner
