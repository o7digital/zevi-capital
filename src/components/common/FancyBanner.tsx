"use client"
import { FormEvent, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "@/contexts/TranslationContext";
import titleShape from "@/assets/images/shape/title_shape_06.svg"

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjgqaakv";

const FancyBanner = ({ style }: any) => {
   const { t } = useTranslation();
   const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email") || "").trim();
      if (!email || status === "sending") return;

      setStatus("sending");
      try {
         const response = await fetch(FORMSPREE_ENDPOINT, {
            method: "POST",
            headers: {
               "Accept": "application/json",
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               email,
               form: "journey-newsletter",
               source: typeof window !== "undefined" ? window.location.href : "zevicapital.com",
            }),
         });

         if (!response.ok) throw new Error("Formspree submission failed");
         event.currentTarget.reset();
         setStatus("sent");
      } catch {
         setStatus("error");
      }
   };
   
   return (
      <div className="fancy-banner-two position-relative z-1 pt-90 lg-pt-50 pb-90 lg-pb-50">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-6">
                  <div className="title-one text-center text-lg-start md-mb-40 pe-xl-5">
                     <h3 className="text-white m0">{t('journeySection.title')} <span>{style ? "" : <Image src={titleShape} alt="" className="lazy-img" />}</span> {t('journeySection.asRetailer')}</h3>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="form-wrapper me-auto ms-auto me-lg-0">
                     <form onSubmit={handleSubmit}>
                        <input name="email" type="email" placeholder={t('journeySection.emailPlaceholder')} className={style ? "rounded-0" : ""} required />
                        <button className={style ? "rounded-0" : ""} disabled={status === "sending"}>
                           {status === "sending" ? "..." : t('journeySection.getStarted')}
                        </button>
                     </form>
                     {status === "sent" && <div className="fs-16 mt-10 text-white">Solicitud enviada.</div>}
                     {status === "error" && <div className="fs-16 mt-10 text-white">No se pudo enviar. Intenta de nuevo.</div>}
                     <div className="fs-16 mt-10 text-white">{t('journeySection.alreadyAgent')} <Link href="#" data-bs-toggle="modal" data-bs-target="#loginModal">{t('journeySection.signIn')}</Link></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FancyBanner
