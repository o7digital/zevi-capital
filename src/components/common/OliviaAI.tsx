"use client";

import { FormEvent, useMemo, useState } from "react";
import { useTranslation } from "@/contexts/TranslationContext";

const API = "https://suitesmine-bot.vercel.app/api";

const copy = {
  es: {
    subtitle: "Asistente de ZeVi Capital",
    online: "En línea",
    teaser: "¿Hablamos de tu proyecto?",
    welcome: "Hola, soy Olivia AI. Puedo orientarte sobre inversión inmobiliaria y expansión empresarial en México.",
    consent: "Acepto compartir mis datos con ZeVi Capital para recibir atención.",
    placeholder: "Escribe tu pregunta…",
    send: "Enviar",
    fallback: "No pude responder ahora. Escríbenos a info@zevicapital.com.",
  },
  en: {
    subtitle: "ZeVi Capital Assistant",
    online: "Online",
    teaser: "Let’s discuss your project",
    welcome: "Hello, I’m Olivia AI. I can guide you on real estate investment and business expansion in Mexico.",
    consent: "I agree to share my data with ZeVi Capital to receive assistance.",
    placeholder: "Write your question…",
    send: "Send",
    fallback: "I’m unable to answer right now. Email us at info@zevicapital.com.",
  },
  fr: {
    subtitle: "Assistante ZeVi Capital",
    online: "En ligne",
    teaser: "Parlons de votre projet",
    welcome: "Bonjour, je suis Olivia AI. Je peux vous orienter sur l’investissement immobilier et l’expansion d’entreprise au Mexique.",
    consent: "J’accepte de partager mes données avec ZeVi Capital afin d’être accompagné.",
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
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([{ role: "ai", content: text.welcome }]);
  const visitorId = useMemo(() => {
    if (typeof window === "undefined") return "";
    const saved = localStorage.getItem("zevicapital-visitor-id");
    const id = saved || crypto.randomUUID();
    localStorage.setItem("zevicapital-visitor-id", id);
    return id;
  }, []);

  async function send(event: FormEvent) {
    event.preventDefault();
    const message = input.trim();
    if (!message || !consent || loading) return;
    setInput("");
    setMessages((items) => [...items, { role: "user", content: message }]);
    setLoading(true);
    try {
      await fetch(`${API}/widget/conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientCode: "zevicapital", visitorId, content: message, source: "website", language: locale,
          metadata: { page: location.pathname, site: "zevicapital.com" },
        }),
      });
      const response = await fetch(`${API}/olivia/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, language: locale, clientCode: "zevicapital", metadata: { page: location.pathname } }),
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
      <header><div><strong>Olivia AI</strong><small>{text.subtitle} · {text.online}</small></div><button onClick={() => setOpen(false)} aria-label="Close">×</button></header>
      <div className="zevi-olivia__messages">
        {messages.map((message, index) => <p key={index} className={message.role}>{message.content}</p>)}
        {loading && <p className="ai">…</p>}
      </div>
      <form onSubmit={send}>
        <label><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} /> {text.consent}</label>
        <div><input value={input} onChange={(e) => setInput(e.target.value)} placeholder={text.placeholder} disabled={!consent || loading} /><button disabled={!consent || loading}>{text.send}</button></div>
      </form>
    </section>}
    {!open && <button className="zevi-olivia__teaser" onClick={() => setOpen(true)}><b>O</b>{text.teaser}</button>}
    <style jsx>{`
      .zevi-olivia{position:fixed;right:24px;bottom:24px;z-index:99999;font:14px/1.4 Arial,sans-serif}
      .zevi-olivia__teaser{display:flex;align-items:center;gap:10px;padding:10px 16px;border:1px solid #c8a96b;border-radius:999px;background:#0d1a1c;color:#fff;box-shadow:0 16px 42px #0007}
      .zevi-olivia__teaser b{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:#c8a96b;color:#0d1a1c}
      .zevi-olivia__panel{width:min(390px,calc(100vw - 28px));overflow:hidden;border:1px solid #c8a96b;border-radius:16px;background:#0d1a1c;color:#fff;box-shadow:0 24px 70px #0008}
      header{display:flex;justify-content:space-between;padding:16px 18px;background:linear-gradient(135deg,#0d1a1c,#183235)}
      header strong{display:block;font-family:Georgia,serif;font-size:20px;color:#d7bd87} header small{display:block;color:#c7d1d0}
      header button{border:0;background:transparent;color:#fff;font-size:22px}.zevi-olivia__messages{height:280px;overflow:auto;padding:15px;background:#f4f1eb;color:#162325}
      .zevi-olivia__messages p{max-width:86%;padding:10px 12px;border-radius:12px;background:#fff;white-space:pre-wrap}.zevi-olivia__messages .user{margin-left:auto;background:#eadfc9}
      form{padding:13px}label{display:flex;gap:7px;font-size:11px;color:#d7dfde}form div{display:flex;gap:8px;margin-top:11px}
      form div input{min-width:0;flex:1;padding:11px;border:0;border-radius:8px}form div button{border:0;border-radius:8px;padding:0 14px;background:#c8a96b;color:#0d1a1c;font-weight:700}
      button:disabled,input:disabled{opacity:.6}@media(max-width:560px){.zevi-olivia{right:14px;bottom:14px}}
    `}</style>
  </div>;
}
