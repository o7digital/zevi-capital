"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "@/contexts/TranslationContext";

const API = "https://olivia-ai.o7digital.com/api";
type Locale = "es" | "en" | "fr";
type Message = { role: "ai" | "user"; content: string };
type Lead = { firstName: string; lastName: string; email: string; phone: string; reason: string };

const copy = {
  es: {
    subtitle: "Asistente de inversión · En línea", teaser: "¿Hablamos de tu proyecto?",
    welcome: "Hola, soy Olivia AI, asistente digital de ZeVi Capital. Puedo orientarte sobre inversión inmobiliaria y expansión empresarial en México.",
    consent: "Acepto el Aviso de Privacidad para recibir atención de ZeVi Capital.", privacy: "Aviso de Privacidad", privacyTitle: "Aviso de Privacidad · Olivia AI",
    privacyBody: "Al usar este chat autorizas a ZeVi Capital a tratar los datos personales que compartas, incluyendo nombre, datos de contacto, mensajes, idioma, página visitada e información de tu proyecto, para atender tu solicitud, dar seguimiento comercial y contactarte por medios electrónicos. Puedes ejercer tus derechos ARCO, revocar tu consentimiento o limitar el uso de tus datos escribiendo a info@zevicapital.com.",
    accept: "Aceptar y continuar", placeholder: "Escribe tu pregunta…", close: "Cerrar Olivia AI", fallback: "No pude responder ahora. Escríbenos a info@zevicapital.com.",
    formTitle: "Sigamos con tu proyecto", formIntro: "Déjanos tus datos para que un asesor prepare un seguimiento personalizado.", firstName: "Nombre", lastName: "Apellido", email: "Correo electrónico", phone: "Teléfono", reason: "Motivo de tu consulta", formSend: "Solicitar seguimiento", formThanks: "Gracias. Un asesor de ZeVi Capital dará seguimiento a tu solicitud.",
    actions: [["Propiedades", "Quiero ver las propiedades disponibles"], ["Invertir", "Busco una oportunidad de inversión"], ["Expansión", "Quiero expandir mi empresa en México"]],
  },
  en: {
    subtitle: "Investment assistant · Online", teaser: "Let’s discuss your project",
    welcome: "Hello, I’m Olivia AI, ZeVi Capital’s digital assistant. I can guide you on real estate investment and business expansion in Mexico.",
    consent: "I accept the Privacy Notice to receive assistance from ZeVi Capital.", privacy: "Privacy Notice", privacyTitle: "Privacy Notice · Olivia AI",
    privacyBody: "By using this chat, you authorize ZeVi Capital to process the personal data you provide, including contact details, messages, language, visited page and project information, to answer your request, provide commercial follow-up and contact you electronically. You may exercise ARCO rights, revoke consent or limit data use by writing to info@zevicapital.com.",
    accept: "Accept and continue", placeholder: "Write your question…", close: "Close Olivia AI", fallback: "I’m unable to answer right now. Email us at info@zevicapital.com.",
    formTitle: "Let’s move your project forward", formIntro: "Leave your details so an advisor can prepare a personalized follow-up.", firstName: "First name", lastName: "Last name", email: "Email", phone: "Phone", reason: "Reason for your inquiry", formSend: "Request a follow-up", formThanks: "Thank you. A ZeVi Capital advisor will follow up on your request.",
    actions: [["Properties", "Show me the available properties"], ["Invest", "I am looking for an investment opportunity"], ["Expansion", "I want to expand my business in Mexico"]],
  },
  fr: {
    subtitle: "Assistante en investissement · En ligne", teaser: "Parlons de votre projet",
    welcome: "Bonjour, je suis Olivia AI, l’assistante digitale de ZeVi Capital. Je peux vous orienter sur l’investissement immobilier et l’expansion d’entreprise au Mexique.",
    consent: "J’accepte l’avis de confidentialité pour recevoir l’assistance de ZeVi Capital.", privacy: "Avis de confidentialité", privacyTitle: "Avis de confidentialité · Olivia AI",
    privacyBody: "En utilisant ce chat, vous autorisez ZeVi Capital à traiter les données personnelles que vous partagez, notamment vos coordonnées, messages, langue, page visitée et informations relatives à votre projet, afin de répondre à votre demande et assurer un suivi commercial. Vous pouvez exercer vos droits ARCO, révoquer votre consentement ou limiter l’utilisation de vos données en écrivant à info@zevicapital.com.",
    accept: "Accepter et continuer", placeholder: "Écrivez votre question…", close: "Fermer Olivia AI", fallback: "Je ne peux pas répondre maintenant. Écrivez-nous à info@zevicapital.com.",
    formTitle: "Faisons avancer votre projet", formIntro: "Laissez-nous vos coordonnées afin qu’un conseiller prépare un suivi personnalisé.", firstName: "Prénom", lastName: "Nom", email: "E-mail", phone: "Téléphone", reason: "Motif de votre demande", formSend: "Demander un suivi", formThanks: "Merci. Un conseiller ZeVi Capital assurera le suivi de votre demande.",
    actions: [["Propriétés", "Montrez-moi les propriétés disponibles"], ["Investir", "Je cherche une opportunité d’investissement"], ["Expansion", "Je souhaite développer mon entreprise au Mexique"]],
  },
} as const;

function RichMessage({ content }: { content: string }) {
  const inline = (value: string) => value.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : part.replace(/\*\*/g, "")
  );
  return <>{content.split("\n").map((line, index) => {
    const bullet = line.match(/^\s*[-•*]\s+(.+)/);
    if (bullet) return <span className="message-list-item" key={index}><i>•</i><span>{inline(bullet[1])}</span></span>;
    if (!line.trim()) return <span className="message-space" key={index} />;
    return <span className="message-line" key={index}>{inline(line)}</span>;
  })}</>;
}

function withoutPrematureFormRequest(answer: string, userTurn: number) {
  if (userTurn >= 2) return answer;
  return answer.split(/\n\n+/).filter(paragraph => !/(nombre y apellido.*correo.*tel[eé]fono|name.*e-?mail.*phone|nom.*e-?mail.*t[eé]l[eé]phone|comp[aá]rteme.*correo|share.*contact details)/i.test(paragraph)).join("\n\n").trim();
}

export default function OliviaAI() {
  const { locale } = useTranslation();
  const language = (["es", "en", "fr"].includes(locale) ? locale : "es") as Locale;
  const text = copy[language];
  const [open, setOpen] = useState(false), [consent, setConsent] = useState(false), [privacyOpen, setPrivacyOpen] = useState(false);
  const [input, setInput] = useState(""), [loading, setLoading] = useState(false), [identity, setIdentity] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ role: "ai", content: text.welcome }]);
  const [lead, setLead] = useState<Lead>({ firstName: "", lastName: "", email: "", phone: "", reason: "" });
  const [leadSubmitted, setLeadSubmitted] = useState(false), [leadLoading, setLeadLoading] = useState(false);
  const messageEnd = useRef<HTMLDivElement>(null);
  const userTurns = messages.filter(message => message.role === "user").length;
  const visitorId = useMemo(() => {
    if (typeof window === "undefined") return "";
    const id = localStorage.getItem("zevicapital-visitor-id") || crypto.randomUUID();
    localStorage.setItem("zevicapital-visitor-id", id); return id;
  }, []);

  useEffect(() => {
    setConsent(localStorage.getItem("oliviaConsent:zevicapital") === "accepted");
    fetch(`${API}/widget/identity`, { cache: "no-store" }).then(r => r.ok ? r.json() : Promise.reject())
      .then(data => data.clientCode === "zevicapital" && setIdentity(data.identity)).catch(() => setIdentity(""));
  }, []);
  useEffect(() => setMessages(items => items.length === 1 ? [{ role: "ai", content: text.welcome }] : items), [text.welcome]);
  useEffect(() => messageEnd.current?.scrollIntoView({ behavior: "smooth" }), [messages, loading]);

  const pageContext = () => ({ page: location.pathname, pageUrl: location.href, pageTitle: document.title,
    pageContent: document.body.innerText.replace(/\s+/g, " ").slice(0, 5000), site: "zevicapital.com", dataConsent: consent,
    dataConsentAt: localStorage.getItem("oliviaConsentAt:zevicapital") || undefined, consentVersion: "zevicapital-privacy-chat-2026-07-01" });

  async function submit(message: string) {
    const content = message.trim(); if (!content || !consent || !identity || loading) return;
    setInput(""); setMessages(items => [...items, { role: "user", content }]); setLoading(true);
    const headers = { "Content-Type": "application/json", "X-Olivia-Widget-Identity": identity };
    try {
      const metadata = pageContext();
      await fetch(`${API}/widget/conversations`, { method: "POST", headers, body: JSON.stringify({ clientCode: "zevicapital", visitorId, content, source: "website", language, metadata }) });
      const response = await fetch(`${API}/olivia/chat`, { method: "POST", headers, body: JSON.stringify({ message: content, language, clientCode: "zevicapital", visitorId, metadata }) });
      if (!response.ok) throw new Error(); const data = await response.json(); const answer = withoutPrematureFormRequest(data.reply || text.fallback, userTurns + 1) || text.fallback;
      setMessages(items => [...items, { role: "ai", content: answer }]);
      await fetch(`${API}/widget/conversations`, { method: "PATCH", headers, body: JSON.stringify({ clientCode: "zevicapital", visitorId, content: answer, model: data.mode || "olivia-v2" }) });
    } catch { setMessages(items => [...items, { role: "ai", content: text.fallback }]); } finally { setLoading(false); }
  }
  function send(event: FormEvent) { event.preventDefault(); void submit(input); }
  function acceptPrivacy() { localStorage.setItem("oliviaConsent:zevicapital", "accepted"); localStorage.setItem("oliviaConsentAt:zevicapital", new Date().toISOString()); setConsent(true); setPrivacyOpen(false); }
  async function submitLead(event: FormEvent) {
    event.preventDefault(); if (leadLoading || !identity) return; setLeadLoading(true);
    const headers = { "Content-Type": "application/json", "X-Olivia-Widget-Identity": identity };
    try {
      await fetch(`${API}/widget/conversations`, { method: "POST", headers, body: JSON.stringify({
        clientCode: "zevicapital", visitorId, source: "website", language,
        content: `${lead.firstName} ${lead.lastName} · ${lead.reason}`,
        visitorName: `${lead.firstName} ${lead.lastName}`, email: lead.email, phone: lead.phone,
        metadata: { ...pageContext(), lead }
      }) });
      setLeadSubmitted(true); setMessages(items => [...items, { role: "ai", content: text.formThanks }]);
    } finally { setLeadLoading(false); }
  }

  return <div className="zevi-olivia">
    {open && <section className="panel" aria-label="Olivia AI"><header><div className="avatar">O<i /></div><div className="heading"><strong>Olivia AI <em>v2</em></strong><small><i />{text.subtitle}</small></div><button className="close" onClick={() => setOpen(false)} aria-label={text.close}>×</button></header>
      <div className="messages" aria-live="polite"><div className="date">ZEVI CAPITAL · CONCIERGE DIGITAL</div>{messages.map((m, i) => <div key={i} className={`bubble ${m.role}`}><span><RichMessage content={m.content} /></span></div>)}{loading && <div className="bubble ai"><span className="typing"><i /><i /><i /></span></div>}
        {userTurns >= 2 && !leadSubmitted && !loading && <form className="lead-form" onSubmit={submitLead}><div className="lead-title"><b>{text.formTitle}</b><small>{text.formIntro}</small></div><div className="lead-grid"><input required value={lead.firstName} onChange={e => setLead({...lead, firstName:e.target.value})} placeholder={text.firstName} /><input required value={lead.lastName} onChange={e => setLead({...lead, lastName:e.target.value})} placeholder={text.lastName} /><input required type="email" value={lead.email} onChange={e => setLead({...lead, email:e.target.value})} placeholder={text.email} /><input required type="tel" value={lead.phone} onChange={e => setLead({...lead, phone:e.target.value})} placeholder={text.phone} /><textarea required value={lead.reason} onChange={e => setLead({...lead, reason:e.target.value})} placeholder={text.reason} /></div><button disabled={leadLoading}>{leadLoading ? "…" : text.formSend}<span>→</span></button></form>}<div ref={messageEnd} /></div>
      {messages.length === 1 && <div className="actions">{text.actions.map(([label, value]) => <button key={label} disabled={!consent || !identity} onClick={() => void submit(value)}>{label}<span>↗</span></button>)}</div>}
      <form onSubmit={send}>{!consent && <label><input type="checkbox" checked={consent} onChange={e => e.target.checked ? acceptPrivacy() : setConsent(false)} /><span>{text.consent} <button type="button" className="privacy-link" onClick={() => setPrivacyOpen(true)}>{text.privacy}</button></span></label>}<div className="composer"><input value={input} onChange={e => setInput(e.target.value)} placeholder={text.placeholder} disabled={!consent || !identity || loading} /><button disabled={!input.trim() || !consent || !identity || loading} aria-label="Send">➤</button></div><small className="signature">Propulsé par O7 Digital · Olivia AI v2</small></form>
    </section>}
    {privacyOpen && <div className="privacy" role="dialog" aria-modal="true"><div><button className="x" onClick={() => setPrivacyOpen(false)}>×</button><b className="seal">O</b><h3>{text.privacyTitle}</h3><p>{text.privacyBody}</p><button onClick={acceptPrivacy}>{text.accept}</button></div></div>}
    {!open && <button className="teaser" onClick={() => setOpen(true)}><b>O<i /></b><span>{text.teaser}<small>Olivia AI v2 · Online</small></span><em>↗</em></button>}
    <style jsx>{`
      .zevi-olivia{position:fixed;right:24px;bottom:24px;z-index:99999;font:14px/1.45 Arial,sans-serif;color:#162325}.zevi-olivia button{font:inherit;cursor:pointer}.teaser{display:flex;align-items:center;gap:11px;padding:9px 12px 9px 9px;border:1px solid #d3b979;border-radius:999px;background:linear-gradient(145deg,#0b191b,#142d30);color:#fff;box-shadow:0 24px 46px -18px #000b,inset 0 1px #ffffff20;animation:float 5.5s ease-in-out infinite}.teaser b,.avatar{position:relative;display:grid;place-items:center;width:42px;height:42px;flex:0 0 auto;border-radius:50%;background:radial-gradient(circle at 35% 25%,#ead9ae,#c8a96b 55%,#90733b);color:#102326;font:700 24px Georgia,serif;box-shadow:inset 0 1px #fff9,0 5px 15px #0006}.teaser b i,.avatar>i{position:absolute;right:0;bottom:1px;width:10px;height:10px;border:2px solid #102326;border-radius:50%;background:#39d98a;box-shadow:0 0 9px #39d98a}.teaser>span{text-align:left;font-weight:700}.teaser small{display:block;color:#b9c8c6;font-size:10px;font-weight:400}.teaser em{color:#d7bd87;font-style:normal;font-size:18px}
      .panel{width:min(408px,calc(100vw - 28px));overflow:hidden;border:1px solid #b99b5d;border-radius:26px;background:#0d1a1c;box-shadow:0 46px 78px -28px #000c,0 22px 38px -26px #0009,inset 0 1px #ffffff22;animation:open .28s ease-out}.panel header{display:flex;align-items:center;gap:12px;padding:17px 18px;background:radial-gradient(circle at 10% 0,#234246,#0d1a1c 62%);border-bottom:1px solid #ffffff12}.avatar{width:46px;height:46px}.heading{flex:1}.heading strong{display:block;color:#f1e7cd;font:600 20px Georgia,serif}.heading em{padding:2px 6px;border:1px solid #c8a96b66;border-radius:999px;color:#d7bd87;font:700 9px Arial}.heading small{display:flex;align-items:center;gap:6px;color:#b8c5c3;font-size:11px}.heading small i{width:7px;height:7px;border-radius:50%;background:#39d98a;box-shadow:0 0 8px #39d98a}.close{width:34px;height:34px;border:1px solid #ffffff18;border-radius:50%;background:#ffffff09;color:#fff;font-size:23px}
      .messages{height:360px;overflow:auto;padding:15px 16px;background:linear-gradient(#f7f4ed,#f0ece2)}.date{text-align:center;color:#8c897f;font-size:8px;letter-spacing:1.35px;margin:2px 0 15px}.bubble{display:flex;margin:0 0 10px}.bubble>span{max-width:86%;padding:11px 13px;border-radius:6px 16px 16px 16px;background:#fff;box-shadow:0 7px 20px -15px #0008}.bubble :global(.message-line){display:block}.bubble :global(.message-space){display:block;height:9px}.bubble :global(.message-list-item){display:flex;gap:8px;margin:5px 0}.bubble :global(.message-list-item>i){color:#b08d4c;font-style:normal;font-weight:800}.bubble :global(strong){color:#10282a;font-weight:750}.bubble.user{justify-content:flex-end}.bubble.user>span{border-radius:16px 6px 16px 16px;background:#173437;color:#f7f1e2}.bubble.user :global(strong){color:#fff}.typing{display:flex!important;gap:4px;padding:15px!important}.typing i{width:6px;height:6px;border-radius:50%;background:#b5975d;animation:dot 1s infinite}.typing i:nth-child(2){animation-delay:.15s}.typing i:nth-child(3){animation-delay:.3s}
      .lead-form{margin:14px 0 4px;padding:16px!important;border:1px solid #cfb573;background:#fff!important;border-radius:18px!important;box-shadow:0 16px 34px -24px #000}.lead-title b{display:block;color:#10282a;font:600 18px Georgia,serif}.lead-title small{display:block;margin:4px 0 12px;color:#65706e;font-size:11px}.lead-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.lead-grid input,.lead-grid textarea{width:100%;min-width:0;border:1px solid #ded9ce;border-radius:10px;background:#faf9f6;padding:9px 10px;outline:none;font:12px Arial}.lead-grid input:focus,.lead-grid textarea:focus{border-color:#b7995e;box-shadow:0 0 0 3px #c8a96b22}.lead-grid textarea{grid-column:1/-1;min-height:66px;resize:vertical}.lead-form>button{display:flex;justify-content:space-between;width:100%;margin-top:9px;border:0;border-radius:999px;background:#10282a;color:#fff;padding:10px 14px;font-size:12px;font-weight:700}.lead-form>button span{color:#d9c286}
      .actions{display:flex;gap:7px;overflow:auto;padding:10px 13px 0}.actions button{flex:1;white-space:nowrap;border:1px solid #c8a96b55;border-radius:999px;background:#ffffff08;color:#e8dcc0;padding:7px 9px;font-size:11px}.actions span{color:#c8a96b}form{padding:11px 13px 12px}form label{display:flex;gap:7px;margin:0 2px 9px;color:#c5cfcd;font-size:10px}form label input{accent-color:#c8a96b}.privacy-link{border:0;background:transparent;color:#dec58c;text-decoration:underline;padding:0}.composer{display:flex;align-items:center;gap:8px;padding:5px 5px 5px 14px;border-radius:999px;background:#fff}.composer input{min-width:0;flex:1;border:0;outline:0;padding:8px 0}.composer button{width:38px;height:38px;border:0;border-radius:50%;background:#c8a96b;color:#102326}.signature{display:block;margin-top:7px;text-align:center;color:#748381;font-size:8px}
      .privacy{position:fixed;inset:0;z-index:100000;display:grid;place-items:center;background:#061012cc;backdrop-filter:blur(7px);padding:18px}.privacy>div{position:relative;max-width:560px;border:1px solid #c8a96b;border-radius:24px;background:#f7f4ed;padding:27px;box-shadow:0 34px 80px #000b}.privacy h3{margin:9px 0 12px;font:600 22px Georgia}.privacy p{font-size:13px;line-height:1.65}.privacy button{border:0;border-radius:999px;background:#10282a;color:#fff;padding:11px 17px}.privacy .x{position:absolute;right:15px;top:12px;background:transparent;color:#10282a;font-size:23px;padding:0}.seal{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;background:#c8a96b;font:700 21px Georgia}button:disabled,input:disabled{opacity:.5;cursor:not-allowed}@keyframes open{from{opacity:0;transform:translateY(15px) scale(.97)}}@keyframes float{50%{transform:translateY(-7px)}}@keyframes dot{30%{opacity:1;transform:translateY(-3px)}0%,60%,100%{opacity:.35}}
      @media(max-width:560px){.zevi-olivia{right:max(10px,env(safe-area-inset-right));bottom:max(10px,env(safe-area-inset-bottom));left:max(10px,env(safe-area-inset-left))}.panel{width:100%;max-height:calc(100dvh - max(20px,env(safe-area-inset-top)) - max(20px,env(safe-area-inset-bottom)));display:flex;flex-direction:column;border-radius:24px}.panel header{flex:0 0 auto;padding:14px 15px}.avatar{width:43px;height:43px}.heading strong{font-size:19px}.heading small{font-size:10px}.messages{height:auto;min-height:220px;flex:1 1 auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}.actions{flex:0 0 auto}.panel>form{flex:0 0 auto;padding-bottom:max(12px,env(safe-area-inset-bottom))}.composer input,.lead-grid input,.lead-grid textarea{font-size:16px}.lead-grid{grid-template-columns:1fr}.lead-grid textarea{grid-column:1}.teaser{max-width:100%;padding:8px 11px 8px 8px}.teaser>span{display:block;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.teaser>em{display:block}.privacy{padding:max(14px,env(safe-area-inset-top)) max(14px,env(safe-area-inset-right)) max(14px,env(safe-area-inset-bottom)) max(14px,env(safe-area-inset-left));overflow:auto}.privacy>div{max-height:calc(100dvh - 28px);overflow:auto;padding:23px}}
      @media(max-width:360px){.teaser>em{display:none}.teaser{gap:8px}.teaser b{width:38px;height:38px}.teaser>span{font-size:12px}.teaser small{font-size:9px}.heading strong{font-size:18px}.panel header{gap:9px}}
    `}</style>
  </div>;
}
