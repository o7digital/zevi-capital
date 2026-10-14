"use client"
import Slider from 'react-slick'
import { useTranslation } from "@/contexts/TranslationContext"

const feedback_data = [
   { id: 1, initials: "GL", testimonialKey: "testimonials.testimonial1" },
   { id: 2, initials: "AB", testimonialKey: "testimonials.testimonial2" },
   { id: 3, initials: "SH", testimonialKey: "testimonials.testimonial3" },
   { id: 4, initials: "JS", testimonialKey: "testimonials.testimonial4" },
]

const Feedback = () => {
   const { t } = useTranslation();

   const settings = {
      dots: true,
      arrows: false,
      centerPadding: '0px',
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      autoplay: true,
      autoplaySpeed: 300000
   }

   return (
      <div className="feedback-section-one position-relative z-1 pt-100 md-pt-70 pb-80 md-pb-60">
         <div className="container text-center mb-55 md-mb-35">
            <div className="title-one">
               <h2>{t('testimonials.title')}</h2>
               <p className="fs-20 mt-20 m-auto" style={{ maxWidth: "900px" }}>{t('testimonials.intro')}</p>
            </div>
         </div>
         <div className="main-content m-auto">
            <Slider {...settings} className="feedback-slider-one position-static">
               {feedback_data.map((item) => (
                  <div key={item.id} className="item">
                     <div className="feedback-block-one text-center">
                        <div className="row align-items-center">
                           <div className="col-md-3">
                              <div aria-hidden="true" className="rounded-circle m-auto d-flex align-items-center justify-content-center" style={{ width: 80, height: 80, background: "#305c73", color: "#fff", fontSize: 26 }}>{item.initials}</div>
                              <h6 className="fs-20 m0 pt-10">{t(`${item.testimonialKey}.name`)}</h6>
                              <span className="fs-16">{t(`${item.testimonialKey}.location`)}</span>
                           </div>
                           <div className="col-md-9">
                              <blockquote style={{ fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.6, marginBottom: 0 }}>{t(`${item.testimonialKey}.text`)}</blockquote>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </Slider>
         </div>
      </div>
   )
}

export default Feedback
