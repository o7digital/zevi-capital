"use client"
import Image, { StaticImageData } from "next/image"
import Slider from 'react-slick'
import { useTranslation } from "@/contexts/TranslationContext"

import rating from "@/assets/images/assets/rating_01.png";
import feadbackImg_1 from "@/assets/images/media/img_01.jpg";
import feadbackImg_2 from "@/assets/images/media/img_02.jpg";
import feadbackImg_3 from "@/assets/images/media/img_03.jpg";

interface DataType {
   id: number;
   img: StaticImageData;
   testimonialKey: string;
}

const feedback_data: DataType[] = [
   {
      id: 1,
      img: feadbackImg_1,
      testimonialKey: "testimonials.testimonial1"
   },
   {
      id: 2,
      img: feadbackImg_2,
      testimonialKey: "testimonials.testimonial2"
   },
   {
      id: 3,
      img: feadbackImg_3,
      testimonialKey: "testimonials.testimonial3"
   },
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
                              <Image src={item.img} alt="" className="rounded-circle m-auto avatar" />
                              <h6 className="fs-20 m0 pt-10">{t(`${item.testimonialKey}.name`)}</h6>
                              <span className="fs-16">{t(`${item.testimonialKey}.location`)}</span>
                           </div>
                           <div className="col-md-6">
                              <blockquote>{t(`${item.testimonialKey}.text`)}</blockquote>
                           </div>
                           <div className="col-md-3">
                              <Image src={rating} alt="" className="lazy-img m-auto" />
                              <p className="text-center m0 pt-10"><span className="fw-500 color-dark">{t(`${item.testimonialKey}.rating`)}</span> {t(`${item.testimonialKey}.ratingScore`)}</p>
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
