export default function SectorIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {name === "industrial" && <><path d="M6 48V27l16-8v9l15-8v28M37 30h11v18M41 30l2-21h6l2 39M43 9h6M3 48h50M14 48V37h8v11M29 48V37h8" /><path d="M44 5c-4-3 4-3 1-6" /></>}
      {name === "offices" && <><path d="M5 48h46M8 48V22h10v26M22 48V8h17v40M43 48V22h8v26M27 13h2m4 0h2M27 18h2m4 0h2M27 23h2m4 0h2M27 28h2m4 0h2M27 33h2m4 0h2M27 38h2m4 0h2M28 48v-5h6v5" /></>}
      {name === "retail" && <><path d="M8 24l5-14h30l5 14M7 24h42M11 28v21h34V28M6 49h44M16 10l-3 14m10-14-1 14m10-14 1 14m7-14 3 14M24 49V35h9v14M15 33v7h4v-7z" /><path d="M7 24c0 6 8 6 8 0 0 6 8 6 8 0 0 6 9 6 9 0 0 6 8 6 8 0 0 6 9 6 9 0" /></>}
      {name === "land" && <><path d="M15 29H9L4 49h48l-5-20h-6M12 44h32M28 40S15 25 15 17a13 13 0 0 1 26 0c0 8-13 23-13 23Z" /><circle cx="28" cy="17" r="5" /></>}
      {name === "residential" && <><path d="M5 26 28 6l23 20M10 25v24h14V34h10v15h12V25M2 23 28 1l26 22M38 10V3h8v14" /></>}
      {name === "developments" && <><path d="m5 15 23-12 23 12-23 12L5 15Zm0 11 23 12 23-12M5 37l23 12 23-12" /></>}
    </svg>
  );
}
