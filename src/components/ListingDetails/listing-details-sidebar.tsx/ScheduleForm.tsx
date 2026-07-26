"use client"
import { FormEvent, useState } from "react"
import { DirectusProperty } from "@/lib/directusProperties"
import { useTranslation } from "@/contexts/TranslationContext"

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL?.replace(/\/$/, "")

const ScheduleForm = ({ property }: { property?: DirectusProperty | null }) => {
   const { t } = useTranslation()
   const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (!DIRECTUS_URL) {
         setStatus("error")
         return
      }

      const formData = new FormData(event.currentTarget)
      const lead = {
         name: String(formData.get("name") || ""),
         email: String(formData.get("email") || ""),
         phone: String(formData.get("phone") || ""),
         message: String(formData.get("message") || ""),
         property_id: property?.id ? Number(property.id) : undefined,
      }

      setStatus("sending")
      try {
         const response = await fetch(`${DIRECTUS_URL}/items/leads`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lead),
         })

         if (!response.ok) throw new Error("Lead submission failed")
         event.currentTarget.reset()
         setStatus("sent")
      } catch {
         setStatus("error")
      }
   }

   return (
      <form onSubmit={handleSubmit}>
         <div className="input-box-three mb-25">
            <div className="label">{t("listingDetails.form.name")}</div>
            <input name="name" type="text" placeholder={t("listingDetails.form.namePlaceholder")} className="type-input" required />
         </div>
         <div className="input-box-three mb-25">
            <div className="label">{t("listingDetails.form.email")}</div>
            <input name="email" type="email" placeholder={t("listingDetails.form.emailPlaceholder")} className="type-input" required />
         </div>
         <div className="input-box-three mb-25">
            <div className="label">{t("listingDetails.form.phone")}</div>
            <input name="phone" type="tel" placeholder={t("listingDetails.form.phonePlaceholder")} className="type-input" />
         </div>
         <div className="input-box-three mb-15">
            <div className="label">{t("listingDetails.form.message")}</div>
            <textarea
               name="message"
               placeholder={`${t("listingDetails.form.messagePlaceholder")} ${property?.title || t("listingDetails.propertyFallback")}`}
            ></textarea>
         </div>
         <button className="btn-nine text-uppercase rounded-3 w-100 mb-10" disabled={status === "sending"}>
            {status === "sending" ? t("listingDetails.form.sending") : t("listingDetails.form.submit")}
         </button>
         {status === "sent" && <p className="m0 text-center color-dark">{t("listingDetails.form.success")}</p>}
         {status === "error" && <p className="m0 text-center text-danger">{t("listingDetails.form.error")}</p>}
      </form>
   )
}

export default ScheduleForm
