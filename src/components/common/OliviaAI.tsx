"use client";

import { FormEvent, useMemo, useState } from "react";
import { useTranslation } from "@/contexts/TranslationContext";

const API = "https://olivia-ai.o7digital.com/api";
const OFFLINE = false;
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjgqaakv";

const copy = {
  es: {
    subtitle: "Asistente de ZeVi Capital",
    online: "En línea",
    teaser: "¿Hablamos de tu proyecto?",
    welcome: "Hola, soy Olivia AI. Puedo orientarte sobre inversión inmobiliaria y expansión empresarial en México.",
    consent: "He leído y acepto el Aviso de Privacidad para recibir atención de ZeVi Capital.",
    privacy: "Aviso de Privacidad",
    privacyTitle: "Aviso de Privacidad - Olivia AI",
    privacyBody: "Al usar este chat autorizas a ZeVi Capital a tratar los datos personales que compartas, incluyendo nombre, datos de contacto, mensajes, idioma, página visitada e información de tu proyecto, con la finalidad de atender tu solicitud, dar seguimiento comercial y contactarte por medios electrónicos. Tus datos serán tratados conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares. Puedes ejercer tus derechos ARCO, revocar tu consentimiento o limitar el uso de tus datos escribiendo a info@zevicapital.com.",
    privacyAccept: "He leído y acepto",
    placeholder: "Escribe tu pregunta…",
    send: "Enviar",
    fallback: "No pude responder ahora. Escríbenos a info@zevicapital.com.",
  },
  en: {
    subtitle: "ZeVi Capital Assistant",
    online: "Online",
    teaser: "Let’s discuss your project",
    welcome: "Hello, I’m Olivia AI. I can guide you on real estate investment and business expansion in Mexico.",
    consent: "I have read and accept the Privacy Notice to receive assistance from ZeVi Capital.",
    privacy: "Privacy Notice",
    privacyTitle: "Privacy Notice - Olivia AI",
    privacyBody: "By using this chat, you authorize ZeVi Capital to process the personal data you provide, including name, contact details, messages, language, visited page and project information, to answer your request, provide commercial follow-up and contact you by electronic means. Your data will be processed under Mexico’s Federal Law on Protection of Personal Data Held by Private Parties. You may exercise ARCO rights, revoke consent or limit data use by writing to info@zevicapital.com.",
    privacyAccept: "I have read and accept",
    placeholder: "Write your question…",
    send: "Send",
    fallback: "I’m unable to answer right now. Email us at info@zevicapital.com.",
  },
  fr: {
    subtitle: "Assistante ZeVi Capital",
    online: "En ligne",
    teaser: "Parlons de votre projet",
    welcome: "Bonjour, je suis Olivia AI. Je peux vous orienter sur l’investissement immobilier et l’expansion d’entreprise au Mexique.",
    consent: "J’ai lu et j’accepte l’avis de confidentialité pour recevoir l’assistance de ZeVi Capital.",
    privacy: "Avis de confidentialité",
    privacyTitle: "Avis de confidentialité - Olivia AI",
    privacyBody: "En utilisant ce chat, vous autorisez ZeVi Capital à traiter les données personnelles que vous partagez, notamment nom, coordonnées, messages, langue, page visitée et informations relatives à votre projet, afin de répondre à votre demande, assurer un suivi commercial et vous contacter par voie électronique. Vos données seront traitées conformément à la loi mexicaine applicable à la protection des données personnelles. Vous pouvez exercer vos droits ARCO, révoquer votre consentement ou limiter l’utilisation de vos données en écrivant à info@zevicapital.com.",
    privacyAccept: "J’ai lu et j’accepte",
    placeholder: "Écrivez votre question…",
    send: "Envoyer",
    fallback: "Je ne peux pas répondre maintenant. Écrivez-nous à info@zevicapital.com.",
  },
};

export default function OliviaAI() {
  const { locale } = useTranslation();
  const text = copy[locale] || copy.es;
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(
    OFFLINE
      ? [{ role: "ai", content: "Offline" }]
      : [{ role: "ai", content: text.welcome }]
  );
  const visitorId = useMemo(() => {
    if (typeof window === "undefined") return "";
    const saved = localStorage.getItem("zevicapital-visitor-id");
    const id = saved || crypto.randomUUID();
    localStorage.setItem("zevicapital-visitor-id", id);
    return id;
  }, []);

  const pageContext = () => ({
    page: location.pathname,
    pageUrl: location.href,
    pageTitle: document.title,
    pageContent: document.body.innerText.replace(/\s+/g, " ").slice(0, 5000),
    site: "zevicapital.com",
    dataConsent: consent,
    consentVersion: "zevicapital-privacy-chat-2026-07-01",
  });

  async function send(event: FormEvent) {
    event.preventDefault();
    if (OFFLINE) return;
    const message = input.trim();
    if (!message || !consent || loading) return;
    setInput("");
    setMessages((items) => [...items, { role: "user", content: message }]);
    setLoading(true);
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          language: locale,
          visitorId,
          form: "olivia-ai-chat",
          source: "zevicapital.com",
          metadata: pageContext(),
        }),
      }).catch(() => null);

      await fetch(`${API}/widget/conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientCode: "zevicapital", visitorId, content: message, source: "website", language: locale,
          metadata: pageContext(),
        }),
      });
      const response = await fetch(`${API}/olivia/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, language: locale, clientCode: "zevicapital", visitorId, metadata: pageContext() }),
      });
      if (!response.ok) throw new Error("Chat failed");
      const data = await response.json();
      const answer = data.reply || text.fallback;
      setMessages((items) => [...items, { role: "ai", content: answer }]);
      await fetch(`${API}/widget/conversations`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientCode: "zevicapital", visitorId, content: answer, model: data.mode || "olivia-ai" }),
      });
    } catch {
      setMessages((items) => [...items, { role: "ai", content: text.fallback }]);
    } finally {
      setLoading(false);
    }
  }

  return <div className="zevi-olivia">
    {open && <section className="zevi-olivia__panel">
      <header><div><strong>Olivia AI</strong><small>{OFFLINE ? "Offline" : `${text.subtitle} · ${text.online}`}</small></div><button onClick={() => setOpen(false)} aria-label="Close">×</button></header>
      <div className="zevi-olivia__messages">
        {messages.map((message, index) => <p key={index} className={message.role}>{message.content}</p>)}
        {loading && <p className="ai">…</p>}
      </div>
      <form onSubmit={send}>
        {!OFFLINE && <label><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} /> <span>{text.consent} <button type="button" className="privacy-link" onClick={() => setPrivacyOpen(true)}>{text.privacy}</button></span></label>}
        <div><input value={input} onChange={(e) => setInput(e.target.value)} placeholder={OFFLINE ? "Offline" : text.placeholder} disabled={OFFLINE || !consent || loading} /><button disabled={OFFLINE || !consent || loading}>{text.send}</button></div>
      </form>
    </section>}
    {!OFFLINE && privacyOpen && <div className="zevi-olivia__privacy" role="dialog" aria-modal="true" aria-label={text.privacyTitle}>
      <div><button type="button" onClick={() => setPrivacyOpen(false)} aria-label="Close">×</button><h3>{text.privacyTitle}</h3><p>{text.privacyBody}</p><button type="button" onClick={() => { setConsent(true); setPrivacyOpen(false); }}>{text.privacyAccept}</button></div>
    </div>}
    {!open && <button className="zevi-olivia__teaser" onClick={() => setOpen(true)}><b>O</b>{OFFLINE ? "Offline" : text.teaser}</button>}
    <style jsx>{`
      .zevi-olivia{position:fixed;right:24px;bottom:24px;z-index:99999;font:14px/1.4 Arial,sans-serif}
      .zevi-olivia__teaser{display:flex;align-items:center;gap:10px;padding:10px 16px;border:1px solid #c8a96b;border-radius:999px;background:#0d1a1c;color:#fff;box-shadow:0 16px 42px #0007}
      .zevi-olivia__teaser b{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:#c8a96b;color:#0d1a1c}
      .zevi-olivia__panel{width:min(390px,calc(100vw - 28px));overflow:hidden;border:1px solid #c8a96b;border-radius:16px;background:#0d1a1c;color:#fff;box-shadow:0 24px 70px #0008}
      header{display:flex;justify-content:space-between;padding:16px 18px;background:linear-gradient(135deg,#0d1a1c,#183235)}
      header strong{display:block;font-family:Georgia,serif;font-size:20px;color:#d7bd87} header small{display:block;color:#c7d1d0}
      header button{border:0;background:transparent;color:#fff;font-size:22px}.zevi-olivia__messages{height:280px;overflow:auto;padding:15px;background:#f4f1eb;color:#162325}
      .zevi-olivia__messages p{max-width:86%;padding:10px 12px;border-radius:12px;background:#fff;white-space:pre-wrap}.zevi-olivia__messages .user{margin-left:auto;background:#eadfc9}
      form{padding:13px}label{display:flex;gap:7px;font-size:11px;color:#d7dfde}.privacy-link{border:0;background:transparent;color:#d7bd87;text-decoration:underline;padding:0;font:inherit}form div{display:flex;gap:8px;margin-top:11px}
      form div input{min-width:0;flex:1;padding:11px;border:0;border-radius:8px}form div button{border:0;border-radius:8px;padding:0 14px;background:#c8a96b;color:#0d1a1c;font-weight:700}
      .zevi-olivia__privacy{position:fixed;inset:0;z-index:100000;display:grid;place-items:center;background:#0008;padding:18px}.zevi-olivia__privacy>div{position:relative;max-width:560px;border:1px solid #c8a96b;border-radius:18px;background:#f4f1eb;color:#162325;padding:24px;box-shadow:0 24px 70px #0008}.zevi-olivia__privacy h3{margin:0 0 12px;font-family:Georgia,serif;color:#0d1a1c}.zevi-olivia__privacy p{font-size:14px;line-height:1.55}.zevi-olivia__privacy button{border:0;border-radius:10px;background:#0d1a1c;color:#fff;padding:10px 14px}.zevi-olivia__privacy button:first-child{position:absolute;right:12px;top:10px;background:transparent;color:#0d1a1c;font-size:22px;padding:0}
      button:disabled,input:disabled{opacity:.6}@media(max-width:560px){.zevi-olivia{right:14px;bottom:14px}}
    `}</style>
  </div>;
}
