"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "@/contexts/TranslationContext";
import { divisions } from "@/data/advisory";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjgqaakv";
const copy = {
  es: { title: "Cuéntanos sobre tu proyecto", name: "Nombre", email: "Correo electrónico", message: "¿Qué objetivo inmobiliario quieres resolver?", submit: "Enviar consulta", sending: "Enviando…", sent: "Consulta enviada. Gracias por contactarnos.", error: "No se pudo enviar la consulta. Intenta de nuevo.", required: "Este campo es obligatorio.", invalidEmail: "Introduce un correo válido." },
  en: { title: "Tell us about your project", name: "Name", email: "Email", message: "What real estate objective would you like to address?", submit: "Send inquiry", sending: "Sending…", sent: "Inquiry sent. Thank you for contacting us.", error: "Your inquiry could not be sent. Please try again.", required: "This field is required.", invalidEmail: "Enter a valid email." },
  fr: { title: "Parlez-nous de votre projet", name: "Nom", email: "Adresse courriel", message: "Quel objectif immobilier souhaitez-vous concrétiser ?", submit: "Envoyer la demande", sending: "Envoi…", sent: "Demande envoyée. Merci de nous avoir contactés.", error: "La demande n’a pas pu être envoyée. Réessayez.", required: "Ce champ est obligatoire.", invalidEmail: "Saisissez un courriel valide." },
};
interface FormData { user_name: string; user_email: string; message: string; }

export default function ContactForm() {
  const { locale } = useTranslation();
  const text = copy[locale];
  const schema = yup.object({ user_name: yup.string().trim().required(text.required), user_email: yup.string().trim().required(text.required).email(text.invalidEmail), message: yup.string().trim().required(text.required) }).required();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) });
  const [sending, setSending] = useState(false);
  const sendEmail = async (data: FormData) => {
    if (sending) return;
    setSending(true);
    const service = new URLSearchParams(window.location.search).get("service");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.user_name, email: data.user_email, message: data.message, form: "contact", source: window.location.href, language: locale, service: divisions.find(item => item.slug === service)?.title || "Consulta general" }),
      });
      if (!response.ok) throw new Error("Formspree submission failed");
      toast(text.sent, { position: "top-center" });
      reset();
    } catch {
      toast(text.error, { position: "top-center", type: "error" });
    } finally { setSending(false); }
  };
  return (
    <form id="contact-form" onSubmit={handleSubmit(sendEmail)}>
      <h2 className="fs-32">{text.title}</h2>
      <div className="row controls">
        <div className="col-12"><div className="input-group-meta form-group mb-30">
          <label htmlFor="contact-name">{text.name} *</label>
          <input id="contact-name" type="text" autoComplete="name" {...register("user_name")} placeholder={text.name} aria-invalid={Boolean(errors.user_name)} aria-describedby={errors.user_name ? "contact-name-error" : undefined} />
          {errors.user_name && <p id="contact-name-error" className="form_error" role="alert">{errors.user_name.message}</p>}
        </div></div>
        <div className="col-12"><div className="input-group-meta form-group mb-30">
          <label htmlFor="contact-email">{text.email} *</label>
          <input id="contact-email" type="email" autoComplete="email" {...register("user_email")} placeholder={text.email} aria-invalid={Boolean(errors.user_email)} aria-describedby={errors.user_email ? "contact-email-error" : undefined} />
          {errors.user_email && <p id="contact-email-error" className="form_error" role="alert">{errors.user_email.message}</p>}
        </div></div>
        <div className="col-12"><div className="input-group-meta form-group mb-30">
          <label htmlFor="contact-message">{text.message} *</label>
          <textarea id="contact-message" {...register("message")} placeholder={text.message} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />
          {errors.message && <p id="contact-message-error" className="form_error" role="alert">{errors.message.message}</p>}
        </div></div>
        <div className="col-12"><button type="submit" className="advisory-button w-100" disabled={sending}>{sending ? text.sending : text.submit}</button></div>
      </div>
    </form>
  );
}
