"use client"

import { useEffect, useId, useRef, useState } from "react"
import { useTranslation } from "@/contexts/TranslationContext"
import { SITE_URL } from "@/lib/propertySeo"
import { propertyCopy } from "@/lib/propertyPresentation"
import styles from "./PropertyShare.module.css"

export default function PropertyShare({ title, url: canonicalUrl }: { title: string; url?: string }) {
   const { t, locale } = useTranslation()
   const labels = propertyCopy[locale]
   const panelId = useId()
   const containerRef = useRef<HTMLDivElement>(null)
   const triggerRef = useRef<HTMLButtonElement>(null)
   const inputRef = useRef<HTMLInputElement>(null)
   const [open, setOpen] = useState(false)
   const [url, setUrl] = useState(canonicalUrl || "")
   const [status, setStatus] = useState<"copied" | "copyError" | null>(null)
   const [canShare, setCanShare] = useState(false)

   useEffect(() => {
      setUrl(canonicalUrl || new URL(window.location.pathname + window.location.search, SITE_URL).href)
      setCanShare(typeof navigator.share === "function")
   }, [canonicalUrl])

   useEffect(() => {
      if (!open) return
      const dismiss = (event: PointerEvent) => {
         if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
      }
      const onKeyDown = (event: KeyboardEvent) => {
         if (event.key === "Escape") {
            setOpen(false)
            triggerRef.current?.focus()
         }
      }
      document.addEventListener("pointerdown", dismiss)
      document.addEventListener("keydown", onKeyDown)
      return () => {
         document.removeEventListener("pointerdown", dismiss)
         document.removeEventListener("keydown", onKeyDown)
      }
   }, [open])

   const copyLink = async () => {
      try {
         await navigator.clipboard.writeText(url)
         setStatus("copied")
      } catch {
         inputRef.current?.focus()
         inputRef.current?.select()
         try {
            setStatus(document.execCommand("copy") ? "copied" : "copyError")
         } catch {
            setStatus("copyError")
         }
      }
   }

   const shareNative = async () => {
      try {
         await navigator.share({ title, url })
         setOpen(false)
      } catch (error) {
         if (error instanceof Error && error.name === "AbortError") return
         setStatus("copyError")
      }
   }

   return (
      <div ref={containerRef} className={styles.share}>
         <button ref={triggerRef} type="button" className={styles.trigger} aria-expanded={open} aria-controls={panelId}
            onClick={() => { setOpen(!open); setStatus(null) }}>
            <i className="bi bi-share" aria-hidden="true" />
            {t("listingDetails.share")}
         </button>
         {open && (
            <div id={panelId} className={styles.panel} role="group" aria-label={t("listingDetails.share")}>
               <button type="button" className={styles.option} onClick={copyLink}>
                  <i className="bi bi-link-45deg" aria-hidden="true" /> {labels.copy}
               </button>
               <a className={styles.option} href={`https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`} target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-whatsapp" aria-hidden="true" /> WhatsApp
               </a>
               <a className={styles.option} href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n${url}`)}`}>
                  <i className="bi bi-envelope" aria-hidden="true" /> {labels.email}
               </a>
               {canShare && <button type="button" className={styles.option} onClick={shareNative}>
                  <i className="bi bi-share" aria-hidden="true" /> {labels.nativeShare}
               </button>}
               <input ref={inputRef} className={styles.link} type="text" value={url} readOnly aria-label={labels.shareHelp} onFocus={event => event.currentTarget.select()} />
               <span className={styles.status} role="status">{status ? labels[status] : ""}</span>
            </div>
         )}
      </div>
   )
}
