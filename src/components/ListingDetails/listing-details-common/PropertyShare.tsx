"use client"
import { useEffect, useRef, useState } from 'react';
import { DirectusProperty } from '@/lib/directusProperties';
import { useTranslation } from '@/contexts/TranslationContext';
import { formatPropertyPrice, propertyCopy, propertyShareUrl } from '@/lib/propertyPresentation';
import styles from './PropertyShare.module.css';

export default function PropertyShare({ property }: { property: DirectusProperty }) {
  const { locale } = useTranslation();
  const copy = propertyCopy[locale];
  const dialog = useRef<HTMLDialogElement>(null);
  const linkInput = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');
  const [nativeAvailable, setNativeAvailable] = useState(false);
  useEffect(() => { setNativeAvailable(typeof navigator.share === 'function'); }, []);
  const url = propertyShareUrl(property.id);
  const title = property.title || 'ZeVi Capital';
  const text = [title, property.address || property.location, formatPropertyPrice(property, locale)].filter(Boolean).join('\n');

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setMessage(copy.copied);
    } catch {
      linkInput.current?.focus();
      linkInput.current?.select();
      setMessage(copy.copyError);
    }
  }
  async function nativeShare() {
    try { await navigator.share({ title, text, url }); }
    catch (error) {
      if (!(error instanceof Error && error.name === 'AbortError')) setMessage(copy.copyError);
    }
  }
  return <>
    <button type="button" className={styles.trigger} onClick={() => { setMessage(''); dialog.current?.showModal(); }}>
      <i className="bi bi-share" aria-hidden="true" />{copy.share}
    </button>
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="property-share-title" onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}>
      <div className={styles.header}>
        <h4 id="property-share-title">{copy.share}</h4>
        <button type="button" className={styles.close} aria-label={copy.close} onClick={() => dialog.current?.close()}>×</button>
      </div>
      <p><strong>{title}</strong></p>
      <p>{copy.shareHelp}</p>
      <div className={styles.actions}>
        <a href={`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`} target="_blank" rel="noopener noreferrer"><i className="bi bi-whatsapp" aria-hidden="true" />WhatsApp</a>
        <a href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`}><i className="bi bi-envelope" aria-hidden="true" />{copy.email}</a>
        <button type="button" onClick={copyLink}><i className="bi bi-link-45deg" aria-hidden="true" />{copy.copy}</button>
        {nativeAvailable && <button type="button" onClick={nativeShare}><i className="bi bi-share" aria-hidden="true" />{copy.nativeShare}</button>}
      </div>
      <input ref={linkInput} aria-label={copy.copy} value={url} readOnly onFocus={event => event.target.select()} />
      <p className={styles.status} role="status" aria-live="polite">{message}</p>
    </dialog>
  </>;
}
