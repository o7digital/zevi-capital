"use client"
import { useEffect, useRef } from "react"
import Slider from "react-slick"
import DropdownOne from "@/components/search-dropdown/home-dropdown/DropdownOne"

const PrevArrow = (props: any) => {
   const { className, style, onClick } = props
   return (
      <button
         type="button"
         aria-label="Photo précédente"
         className={`hero-slider-arrow hero-slider-arrow-prev ${className || ""}`}
         style={style}
         onClick={onClick}
      >
         <span />
      </button>
   )
}

const NextArrow = (props: any) => {
   const { className, style, onClick } = props
   return (
      <button
         type="button"
         aria-label="Photo suivante"
         className={`hero-slider-arrow hero-slider-arrow-next ${className || ""}`}
         style={style}
         onClick={onClick}
      >
         <span />
      </button>
   )
}

const slides = [
   { src: "/slider/cdmx.webp", alt: "Panorama nocturno de Ciudad de México", position: "center" },
   { src: "/slider/alexander-schimmeck-O8JJ72b4a1Y-unsplash.webp", alt: "Ciudad mexicana con vista al volcán", position: "center" },
   { src: "/slider/arturo-ochoa-wB84N1jrfiM-unsplash.webp", alt: "Centro histórico y arquitectura mexicana", position: "center" },
   { src: "/slider/gerson-repreza-PW3tJkRkSy8-unsplash.webp", alt: "Oportunidades inmobiliarias frente al mar en Cancún", position: "center" },
   { src: "/slider/jorge-gardner-6YkqE50Gin0-unsplash.webp", alt: "Paisaje urbano mexicano al atardecer", position: "center" },
   { src: "/slider/loris-boulinguez-9AFMVXjp5ik-unsplash.webp", alt: "Calle histórica y propiedades comerciales en México", position: "center" },
   { src: "/slider/sergio-rodriguez-2EOHVbvum9w-unsplash.webp", alt: "Desarrollo urbano y espacios corporativos en México", position: "center" },
   { src: "/slider/spencer-watson-ioy3bN5Irew-unsplash.webp", alt: "Activo hotelero y playa premium en México", position: "center" },
   { src: "/slider/vania-medina-N6MQuEBohZA-unsplash.webp", alt: "Inversión inmobiliaria en Los Cabos", position: "center" },
   { src: "/slider/IMG_5868.webp", alt: "Villa de lujo en México con vista premium", position: "center" },
   { src: "/slider/IMG_5869.webp", alt: "Propiedad exclusiva en México", position: "center" },
   { src: "/slider/IMG_5870.webp", alt: "Residencia de lujo en México", position: "center" },
   { src: "/slider/IMG_5871.webp", alt: "Inmueble premium en México", position: "center" },
   { src: "/slider/IMG_5872.webp", alt: "Propiedad de inversión en México", position: "center" },
   { src: "/slider/IMG_5873.webp", alt: "Vista exclusiva de propiedad en México", position: "center" },
]

const Banner = () => {
   const sliderRef = useRef<Slider | null>(null)

   const settings = {
      dots: true,
      arrows: true,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
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
               {slides.map((slide, index) => (
                  <div key={slide.src} style={{ height: '100%', width: '100%' }}>
                     <img
                        src={slide.src}
                        alt={slide.alt}
                        loading={index === 0 ? "eager" : "lazy"}
                     style={{
                        width: '100%',
                        height: '800px',
                        objectFit: 'cover',
                           objectPosition: slide.position
                     }}
                  />
               </div>
               ))}
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

            /* Flèches et pastilles restent cliquables malgré le pointer-events:none du wrapper */
            .hero-slider-wrapper :global(.slick-arrow),
            .hero-slider-wrapper :global(.slick-dots) {
               pointer-events: auto;
            }

            .hero-slider-wrapper :global(.hero-slider-arrow) {
               position: absolute;
               top: 50%;
               z-index: 3;
               width: 44px;
               height: 44px;
               border-radius: 50%;
               background: rgba(0, 0, 0, 0.35);
               border: none;
               display: flex;
               align-items: center;
               justify-content: center;
               cursor: pointer;
               transition: background 0.3s ease;
            }

            .hero-slider-wrapper :global(.hero-slider-arrow:hover) {
               background: rgba(0, 0, 0, 0.6);
            }

            .hero-slider-wrapper :global(.hero-slider-arrow-prev) {
               left: 24px;
            }

            .hero-slider-wrapper :global(.hero-slider-arrow-next) {
               right: 24px;
            }

            .hero-slider-wrapper :global(.hero-slider-arrow span) {
               display: block;
               width: 10px;
               height: 10px;
               border-top: 2px solid #fff;
               border-right: 2px solid #fff;
            }

            .hero-slider-wrapper :global(.hero-slider-arrow-prev span) {
               transform: rotate(-135deg);
               margin-left: 3px;
            }

            .hero-slider-wrapper :global(.hero-slider-arrow-next span) {
               transform: rotate(45deg);
               margin-right: 3px;
            }

            .hero-slider-wrapper :global(.slick-dots) {
               position: absolute;
               bottom: 24px;
               left: 0;
               right: 0;
               z-index: 3;
               display: flex !important;
               align-items: center;
               justify-content: center;
               gap: 8px;
               list-style: none;
               margin: 0;
               padding: 0;
            }

            .hero-slider-wrapper :global(.slick-dots li) {
               margin: 0;
            }

            .hero-slider-wrapper :global(.slick-dots li button) {
               width: 10px;
               height: 10px;
               padding: 0;
               border: none;
               border-radius: 50%;
               background: rgba(255, 255, 255, 0.5);
               text-indent: -9999px;
               cursor: pointer;
               transition: background 0.3s ease, transform 0.3s ease;
            }

            .hero-slider-wrapper :global(.slick-dots li.slick-active button) {
               background: #fff;
               transform: scale(1.2);
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
