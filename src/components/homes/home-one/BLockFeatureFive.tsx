"use client"
import Image from "next/image"
import { useTranslation } from "@/contexts/TranslationContext";

import titleShape from "@/assets/images/shape/title_shape_07.svg";
import featureShape_1 from "@/assets/images/shape/shape_07.svg";
import featureShape_2 from "@/assets/images/shape/shape_08.svg";

const BLockFeatureFive = ({ style }: any) => {
   const { t } = useTranslation();

   const features = [
      {
         id: "01",
         titleKey: "stepsSection.step1Title",
         descKey: "stepsSection.step1Desc",
      },
      {
         id: "02",
         titleKey: "stepsSection.step2Title",
         descKey: "stepsSection.step2Desc",
      },
      {
         id: "03",
         titleKey: "stepsSection.step3Title",
         descKey: "stepsSection.step3Desc",
      },
      {
         id: "04",
         titleKey: "stepsSection.step4Title",
         descKey: "stepsSection.step4Desc",
      },
      {
         id: "05",
         titleKey: "stepsSection.step5Title",
         descKey: "stepsSection.step5Desc",
      },
      {
         id: "06",
         titleKey: "stepsSection.step6Title",
         descKey: "stepsSection.step6Desc",
      }
   ];
   
   return (
      <div className={`block-feature-five position-relative z-1 pb-130 xl-pb-100 lg-pb-80 ${style ? " pt-170 xl-pt-120" : "bg-pink pt-100 lg-pt-80 mt-225 xl-mt-200 lg-mt-150"}`}>
         <div className="container">
            <div className="row">
               <div className="col-xl-8 m-auto">
                  <div className="title-one text-center mb-35 lg-mb-20">
                     <h3>{t('stepsSection.title')} <br /> {t('stepsSection.subtitle')} <span><Image src={titleShape} alt="" className="lazy-img" /></span></h3>
                     <p className="fs-24 color-dark">{t('stepsSection.easyStart')}</p>
                  </div>
               </div>
            </div>

            <div className="row justify-content-between">
               <div className="col-xxl-11 m-auto">
                  <div className="row gx-xl-5 justify-content-center">
                     {features.map((item) => (
                        <div key={item.id} className="col-lg-4 col-md-6 d-flex">
                           <div className="card-style-one step-card wow fadeInUp mt-40 w-100">
                              <span className="step-index">{item.id}</span>
                              <h5 className="mt-30 mb-15">{t(item.titleKey)}</h5>
                              <p className="mb-0">{t(item.descKey)}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
         <Image src={featureShape_1} alt="" className="lazy-img shapes shape_01" />
         <Image src={featureShape_2} alt="" className="lazy-img shapes shape_02" />
         <style jsx>{`
            .step-card {
               padding: 34px 28px;
               border-radius: 28px;
               text-align: left;
               box-shadow: 0 20px 60px rgba(13, 26, 28, 0.08);
            }
            .step-index {
               display: inline-flex;
               align-items: center;
               justify-content: center;
               min-width: 56px;
               height: 56px;
               border-radius: 18px;
               background: rgba(48, 92, 115, 0.12);
               color: rgb(48, 92, 115);
               font-size: 20px;
               font-weight: 600;
               letter-spacing: 0.04em;
            }
         `}</style>
      </div>
   )
}

export default BLockFeatureFive
