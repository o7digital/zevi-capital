"use client"
import Image from "next/image"

import titleShape from "@/assets/images/shape/title_shape_07.svg";
import { useTranslation } from "@/contexts/TranslationContext"

const StrategicContentSection = () => {
   const { t } = useTranslation();

   const services = [
      {
         id: "01",
         titleKey: "servicesSection.service1Title",
         descKey: "servicesSection.service1Desc",
      },
      {
         id: "02",
         titleKey: "servicesSection.service2Title",
         descKey: "servicesSection.service2Desc",
      },
      {
         id: "03",
         titleKey: "servicesSection.service3Title",
         descKey: "servicesSection.service3Desc",
      },
   ];

   const analysisPoints = [
      "expansionSection.analysis1",
      "expansionSection.analysis2",
      "expansionSection.analysis3",
      "expansionSection.analysis4",
   ];

   return (
      <section className="strategic-content-section pt-120 xl-pt-100 lg-pt-80 pb-120 xl-pb-100 lg-pb-80">
         <div className="container">
            <div className="row align-items-end">
               <div className="col-lg-7">
                  <div className="title-one mb-55 lg-mb-30">
                     <div className="upper-title">{t("servicesSection.eyebrow")}</div>
                     <h3>
                        {t("servicesSection.title")}{" "}
                        <span>
                           <Image src={titleShape} alt="" className="lazy-img" />
                        </span>
                     </h3>
                     <p className="fs-22 mt-30 mb-0">{t("servicesSection.lead")}</p>
                  </div>
               </div>
               <div className="col-lg-5">
                  <p className="fs-22 lh-lg color-dark ps-xl-4 mb-0">{t("servicesSection.supportingText")}</p>
               </div>
            </div>

            <div className="row">
               {services.map((service) => (
                  <div key={service.id} className="col-lg-4 col-md-6 d-flex">
                     <div className="service-card wow fadeInUp w-100">
                        <span className="service-index">{service.id}</span>
                        <h5 className="mt-30 mb-20">{t(service.titleKey)}</h5>
                        <p className="mb-0">{t(service.descKey)}</p>
                     </div>
                  </div>
               ))}
            </div>

            <div className="row gx-xl-5 align-items-start mt-110 xl-mt-90">
               <div className="col-lg-6">
                  <div className="title-one mb-35 lg-mb-25">
                     <div className="upper-title">{t("expansionSection.eyebrow")}</div>
                     <h3>{t("expansionSection.title")}</h3>
                  </div>
                  <p className="fs-22 lh-lg">{t("expansionSection.paragraph1")}</p>
                  <p className="fs-22 lh-lg mt-25">{t("expansionSection.paragraph2")}</p>
                  <p className="fs-22 lh-lg mt-25 mb-0">{t("expansionSection.paragraph3")}</p>
               </div>

               <div className="col-lg-6">
                  <div className="expansion-panel md-mt-40">
                     <h5>{t("expansionSection.analysisTitle")}</h5>
                     <ul className="style-none analysis-list mt-30 mb-0">
                        {analysisPoints.map((itemKey, index) => (
                           <li key={itemKey} className="analysis-item">
                              <span className="analysis-bullet">0{index + 1}</span>
                              <span>{t(itemKey)}</span>
                           </li>
                        ))}
                     </ul>
                     <p className="fs-22 lh-lg mt-35 mb-0">{t("expansionSection.closing")}</p>
                  </div>
               </div>
            </div>
         </div>

         <style jsx>{`
            .service-card {
               margin-top: 30px;
               padding: 36px 30px;
               border-radius: 28px;
               background: #ffffff;
               box-shadow: 0 20px 60px rgba(13, 26, 28, 0.08);
            }
            .service-index,
            .analysis-bullet {
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
            .expansion-panel {
               padding: 42px 36px;
               border-radius: 28px;
               background: linear-gradient(180deg, #f5f8fa 0%, #ffffff 100%);
               box-shadow: 0 20px 60px rgba(13, 26, 28, 0.08);
            }
            .analysis-item {
               display: flex;
               align-items: flex-start;
               gap: 16px;
               margin-top: 18px;
               color: #0d1a1c;
               font-size: 20px;
               line-height: 1.6;
            }
            .analysis-item:first-child {
               margin-top: 0;
            }
            @media (max-width: 991px) {
               .service-card,
               .expansion-panel {
                  padding: 30px 24px;
               }
               .analysis-item {
                  font-size: 18px;
               }
            }
         `}</style>
      </section>
   )
}

export default StrategicContentSection
