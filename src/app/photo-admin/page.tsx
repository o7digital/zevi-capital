"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

type DirectusFile = {
   id?: string;
   title?: string;
};

type PhotoRelation = {
   id: number | string;
   sort_order?: number | null;
   image?: string | DirectusFile;
};

type PropertyRecord = {
   id: number | string;
   title?: string;
   easybroker_id?: string;
   location?: string;
   address?: string;
   status?: string;
   cover_image?: string | DirectusFile;
   photos?: PhotoRelation[];
   property_images?: PhotoRelation[];
};

type PhotoItem = {
   id: number | string;
   fileId: string;
   title: string;
   sortOrder: number;
   url: string;
};

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL?.replace(/\/$/, "");

function fileId(value?: string | DirectusFile) {
   if (!value) return "";
   return typeof value === "string" ? value : value.id || "";
}

function fileTitle(value?: string | DirectusFile) {
   if (!value || typeof value === "string") return "Foto";
   return value.title || value.id || "Foto";
}

function assetUrl(id: string) {
   return directusUrl && id ? `${directusUrl}/assets/${id}?format=webp&quality=82` : "";
}

function propertyPhotos(property?: PropertyRecord | null) {
   if (!property) return [];
   const seen = new Set<string>();
   return [...(property.photos || []), ...(property.property_images || [])]
      .map((photo, index) => {
         const id = fileId(photo.image);
         if (!id || seen.has(`${photo.id}-${id}`)) return null;
         seen.add(`${photo.id}-${id}`);
         return {
            id: photo.id,
            fileId: id,
            title: fileTitle(photo.image),
            sortOrder: Number(photo.sort_order || index + 1),
            url: assetUrl(id),
         };
      })
      .filter((photo): photo is PhotoItem => Boolean(photo))
      .sort((a, b) => a.sortOrder - b.sortOrder);
}

async function api(path: string, options: RequestInit = {}) {
   const response = await fetch(path, options);
   const payload = await response.json().catch(() => null);
   if (!response.ok) {
      throw new Error(payload?.error || "Erreur admin photo");
   }
   return payload;
}

export default function PhotoAdminPage() {
   const fileInput = useRef<HTMLInputElement>(null);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [properties, setProperties] = useState<PropertyRecord[]>([]);
   const [selectedId, setSelectedId] = useState<string>("");
   const [selected, setSelected] = useState<PropertyRecord | null>(null);
   const [search, setSearch] = useState("");
   const [loading, setLoading] = useState(false);
   const [saving, setSaving] = useState(false);
   const [error, setError] = useState("");

   const photos = useMemo(() => propertyPhotos(selected), [selected]);
   const coverId = fileId(selected?.cover_image);
   const coverPhoto = photos.find((photo) => photo.fileId === coverId) || photos[0];

   const loadProperties = useCallback(async (query = search) => {
      setLoading(true);
      setError("");
      try {
         const params = new URLSearchParams();
         if (query.trim()) params.set("search", query.trim());
         const payload = await api(`/api/photo-admin/properties?${params.toString()}`);
         const items = Array.isArray(payload.data) ? payload.data : [];
         setProperties(items);
         setIsLoggedIn(true);
         if (!selectedId && items[0]?.id) setSelectedId(String(items[0].id));
      } catch (err) {
         setError(err instanceof Error ? err.message : "Connexion Directus requise");
         setIsLoggedIn(false);
      } finally {
         setLoading(false);
      }
   }, [search, selectedId]);

   const loadProperty = useCallback(async (id: string) => {
      if (!id) return;
      setLoading(true);
      setError("");
      try {
         const payload = await api(`/api/photo-admin/properties/${id}`);
         setSelected(payload.data || null);
      } catch (err) {
         setError(err instanceof Error ? err.message : "Impossible de charger la propriété");
      } finally {
         setLoading(false);
      }
   }, []);

   useEffect(() => {
      loadProperties("");
   }, []);

   useEffect(() => {
      if (selectedId) loadProperty(selectedId);
   }, [selectedId, loadProperty]);

   const login = async (event: FormEvent) => {
      event.preventDefault();
      setSaving(true);
      setError("");
      try {
         await api("/api/photo-admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
         });
         setPassword("");
         await loadProperties("");
      } catch (err) {
         setError(err instanceof Error ? err.message : "Login Directus invalide");
      } finally {
         setSaving(false);
      }
   };

   const uploadPhotos = async (files: FileList | File[]) => {
      if (!selectedId || files.length === 0) return;
      setSaving(true);
      setError("");
      try {
         const form = new FormData();
         Array.from(files).forEach((file) => form.append("files", file));
         await api(`/api/photo-admin/properties/${selectedId}/photos`, {
            method: "POST",
            body: form,
         });
         await loadProperty(selectedId);
      } catch (err) {
         setError(err instanceof Error ? err.message : "Upload impossible");
      } finally {
         setSaving(false);
      }
   };

   const reorder = async (nextPhotos: PhotoItem[]) => {
      if (!selectedId) return;
      setSaving(true);
      setError("");
      try {
         await api(`/api/photo-admin/properties/${selectedId}/photos/reorder`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               items: nextPhotos.map((photo, index) => ({ id: photo.id, sort_order: index + 1 })),
            }),
         });
         await loadProperty(selectedId);
      } catch (err) {
         setError(err instanceof Error ? err.message : "Ordre impossible à enregistrer");
      } finally {
         setSaving(false);
      }
   };

   const movePhoto = (photo: PhotoItem, direction: -1 | 1) => {
      const index = photos.findIndex((item) => item.id === photo.id);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= photos.length) return;
      const next = [...photos];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      reorder(next);
   };

   const setCover = async (photo: PhotoItem) => {
      if (!selectedId) return;
      setSaving(true);
      setError("");
      try {
         await api(`/api/photo-admin/properties/${selectedId}/cover`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fileId: photo.fileId }),
         });
         await loadProperty(selectedId);
      } catch (err) {
         setError(err instanceof Error ? err.message : "Photo principale impossible à enregistrer");
      } finally {
         setSaving(false);
      }
   };

   const deletePhoto = async (photo: PhotoItem) => {
      if (!selectedId) return;
      setSaving(true);
      setError("");
      try {
         await api(`/api/photo-admin/photos/${photo.id}`, { method: "DELETE" });
         await loadProperty(selectedId);
      } catch (err) {
         setError(err instanceof Error ? err.message : "Suppression impossible");
      } finally {
         setSaving(false);
      }
   };

   if (!isLoggedIn && !loading) {
      return (
         <main className="photo-admin-login">
            <form onSubmit={login}>
               <img src="/logo.png" alt="ZeVi Capital" />
               <h1>Admin photos ZeVi</h1>
               <input type="email" placeholder="Email Directus" value={email} onChange={(event) => setEmail(event.target.value)} required />
               <input type="password" placeholder="Mot de passe Directus" value={password} onChange={(event) => setPassword(event.target.value)} required />
               {error && <p>{error}</p>}
               <button disabled={saving}>{saving ? "Connexion..." : "Se connecter"}</button>
            </form>
            <style>{styles}</style>
         </main>
      );
   }

   return (
      <main className="photo-admin">
         <aside className="photo-admin-sidebar">
            <div className="photo-admin-brand">
               <img src="/logo.png" alt="ZeVi Capital" />
               <div>
                  <strong>ZeVi Capital</strong>
                  <span>Gestion visuelle des photos</span>
               </div>
            </div>
            <form className="photo-admin-search" onSubmit={(event) => { event.preventDefault(); loadProperties(search); }}>
               <i className="bi bi-search"></i>
               <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar propiedad" />
            </form>
            <div className="photo-admin-list">
               {properties.map((property) => {
                  const itemPhotos = propertyPhotos(property);
                  const itemCover = fileId(property.cover_image);
                  const thumb = assetUrl(itemCover) || itemPhotos[0]?.url;
                  return (
                     <button key={property.id} className={String(property.id) === selectedId ? "active" : ""} onClick={() => setSelectedId(String(property.id))}>
                        {thumb ? <img src={thumb} alt="" /> : <span className="empty-thumb"><i className="bi bi-image"></i></span>}
                        <span>
                           <strong>{property.title || "Propiedad sin título"}</strong>
                           <small>{property.easybroker_id || property.location || property.id}</small>
                        </span>
                     </button>
                  );
               })}
            </div>
         </aside>

         <section className="photo-admin-main">
            <header className="photo-admin-topbar">
               <div>
                  <span className="eyebrow">Fotos de la propiedad</span>
                  <h1>{selected?.title || "Selecciona una propiedad"}</h1>
                  <p>{selected?.easybroker_id || selected?.address || selected?.location || "Directus / ZeVi Capital"}</p>
               </div>
               <div className="photo-admin-actions">
                  <a href={selectedId ? `/listing_details_01?id=${selectedId}` : "/"} target="_blank" rel="noreferrer">
                     <i className="bi bi-eye"></i>
                     Vista previa
                  </a>
                  <button onClick={() => fileInput.current?.click()} disabled={!selectedId || saving}>
                     <i className="bi bi-cloud-arrow-up"></i>
                     Subir fotos
                  </button>
               </div>
            </header>

            {error && <div className="photo-admin-error">{error}</div>}

            <div className="photo-admin-grid">
               <section className="photo-admin-panel">
                  <div className="panel-head">
                     <h2>Galería visual</h2>
                     <span>{photos.length} fotos</span>
                  </div>

                  <div className="photo-admin-hero">
                     <div className="cover">
                        {coverPhoto ? <img src={coverPhoto.url} alt="" /> : <div className="cover-empty"><i className="bi bi-image"></i></div>}
                        <span className="badge">Foto principal</span>
                        <div className="cover-meta">
                           <strong>{coverPhoto?.title || "Sin foto principal"}</strong>
                           <small>Visible en tarjetas, listados y detalle</small>
                        </div>
                     </div>

                     <button
                        className="dropzone"
                        onClick={() => fileInput.current?.click()}
                        onDrop={(event) => {
                           event.preventDefault();
                           uploadPhotos(event.dataTransfer.files);
                        }}
                        onDragOver={(event) => event.preventDefault()}
                        disabled={!selectedId || saving}
                     >
                        <i className="bi bi-cloud-arrow-up"></i>
                        <strong>Arrastra nuevas fotos aquí</strong>
                        <span>Upload multiple, vista previa inmediata y orden editable.</span>
                     </button>
                  </div>

                  <input
                     ref={fileInput}
                     type="file"
                     accept="image/*"
                     multiple
                     hidden
                     onChange={(event) => {
                        if (event.target.files) uploadPhotos(event.target.files);
                        event.currentTarget.value = "";
                     }}
                  />

                  <div className="photo-admin-gallery">
                     {photos.map((photo, index) => (
                        <article className="thumb" key={photo.id}>
                           <img src={photo.url} alt="" />
                           <span className="number">{index + 1}</span>
                           <div className="tools">
                              <button title="Foto principal" onClick={() => setCover(photo)} className={photo.fileId === coverId ? "active" : ""}>
                                 <i className="bi bi-star-fill"></i>
                              </button>
                              <button title="Monter" onClick={() => movePhoto(photo, -1)} disabled={index === 0}>
                                 <i className="bi bi-arrow-up"></i>
                              </button>
                              <button title="Descendre" onClick={() => movePhoto(photo, 1)} disabled={index === photos.length - 1}>
                                 <i className="bi bi-arrow-down"></i>
                              </button>
                              <button title="Supprimer" onClick={() => deletePhoto(photo)} className="danger">
                                 <i className="bi bi-trash"></i>
                              </button>
                           </div>
                           <strong>{photo.title}</strong>
                        </article>
                     ))}
                     {photos.length === 0 && (
                        <button className="empty-gallery" onClick={() => fileInput.current?.click()}>
                           <i className="bi bi-images"></i>
                           <strong>Aucune photo liée</strong>
                           <span>Ajoute les photos ici au lieu de passer par la liste Directus.</span>
                        </button>
                     )}
                  </div>
               </section>

               <aside className="photo-admin-panel summary">
                  <h3>Resumen</h3>
                  <dl>
                     <div><dt>Propiedad</dt><dd>{selected?.easybroker_id || selected?.id || "-"}</dd></div>
                     <div><dt>Fotos</dt><dd>{photos.length}</dd></div>
                     <div><dt>Principal</dt><dd>{coverId ? "Definida" : "Pendiente"}</dd></div>
                     <div><dt>Estado</dt><dd>{saving ? "Guardando" : "Listo"}</dd></div>
                  </dl>
                  <button onClick={() => loadProperty(selectedId)} disabled={!selectedId || loading}>
                     <i className="bi bi-arrow-clockwise"></i>
                     Refrescar
                  </button>
                  <button onClick={() => api("/api/photo-admin/logout", { method: "POST" }).then(() => location.reload())}>
                     <i className="bi bi-box-arrow-right"></i>
                     Salir
                  </button>
               </aside>
            </div>
         </section>
         <style>{styles}</style>
      </main>
   );
}

const styles = `
   .photo-admin, .photo-admin-login { --bg: #f3f5f7; --panel: #fff; --ink: #18202a; --muted: #6e7783; --line: #dfe4ea; --brand: #153f3a; --gold: #b68639; --danger: #bd3041; min-height: 100vh; color: var(--ink); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
   .photo-admin { display: grid; grid-template-columns: 330px 1fr; background: var(--bg); }
   .photo-admin button, .photo-admin a, .photo-admin-login button { border: 0; border-radius: 8px; font-weight: 800; cursor: pointer; text-decoration: none; }
   .photo-admin-sidebar { background: #111821; color: white; padding: 22px 15px; overflow: auto; max-height: 100vh; }
   .photo-admin-brand { display: flex; align-items: center; gap: 12px; padding-bottom: 20px; margin-bottom: 18px; border-bottom: 1px solid rgba(255,255,255,.1); }
   .photo-admin-brand img { width: 50px; height: 50px; object-fit: contain; background: white; border-radius: 6px; padding: 4px; }
   .photo-admin-brand strong, .photo-admin-brand span { display: block; }
   .photo-admin-brand span { color: #9aa5b1; font-size: 13px; }
   .photo-admin-search { height: 44px; display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.1); border-radius: 8px; padding: 0 12px; margin-bottom: 14px; }
   .photo-admin-search input { min-width: 0; flex: 1; background: transparent; border: 0; outline: 0; color: white; font-weight: 700; }
   .photo-admin-list { display: grid; gap: 8px; }
   .photo-admin-list button { display: grid; grid-template-columns: 58px 1fr; align-items: center; gap: 12px; min-height: 72px; padding: 8px; text-align: left; color: #d7dee7; background: transparent; }
   .photo-admin-list button.active { background: rgba(182,134,57,.22); outline: 1px solid rgba(182,134,57,.32); color: white; }
   .photo-admin-list img, .empty-thumb { width: 58px; height: 56px; border-radius: 7px; object-fit: cover; background: #26303b; display: grid; place-items: center; color: #8b97a5; }
   .photo-admin-list strong { display: block; font-size: 13px; line-height: 1.25; }
   .photo-admin-list small { display: block; margin-top: 5px; color: #9aa5b1; font-size: 12px; }
   .photo-admin-main { padding: 28px; overflow: auto; }
   .photo-admin-topbar { display: flex; justify-content: space-between; align-items: flex-start; gap: 18px; margin-bottom: 22px; }
   .eyebrow { color: var(--gold); font-size: 12px; font-weight: 900; text-transform: uppercase; }
   .photo-admin-topbar h1 { margin: 6px 0 8px; font-size: 28px; line-height: 1.15; letter-spacing: 0; }
   .photo-admin-topbar p { margin: 0; color: var(--muted); font-size: 14px; }
   .photo-admin-actions { display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; }
   .photo-admin-actions a, .photo-admin-actions button, .summary button { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 43px; padding: 0 14px; color: var(--ink); background: white; box-shadow: inset 0 0 0 1px var(--line); }
   .photo-admin-actions button { background: var(--brand); color: white; box-shadow: none; }
   .photo-admin-error { margin-bottom: 16px; padding: 13px 15px; border-radius: 8px; background: #fff0f2; color: var(--danger); font-weight: 800; }
   .photo-admin-grid { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 22px; align-items: start; }
   .photo-admin-panel { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; box-shadow: 0 14px 34px rgba(24,32,42,.08); overflow: hidden; }
   .panel-head { padding: 18px 20px; border-bottom: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center; gap: 12px; }
   .panel-head h2 { margin: 0; font-size: 17px; }
   .panel-head span { background: #eef4f2; color: var(--brand); border-radius: 999px; padding: 7px 10px; font-size: 12px; font-weight: 900; }
   .photo-admin-hero { padding: 20px; display: grid; grid-template-columns: 1.1fr .9fr; gap: 18px; }
   .cover { position: relative; min-height: 320px; overflow: hidden; border-radius: 8px; background: #d7dde3; }
   .cover img, .thumb img { width: 100%; height: 100%; display: block; object-fit: cover; }
   .cover-empty { height: 100%; min-height: 320px; display: grid; place-items: center; color: #798594; font-size: 46px; }
   .badge { position: absolute; left: 14px; top: 14px; background: var(--gold); color: white; border-radius: 999px; padding: 8px 11px; font-size: 12px; font-weight: 900; }
   .cover-meta { position: absolute; left: 0; right: 0; bottom: 0; padding: 18px; background: linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,.72)); color: white; }
   .cover-meta strong { display: block; font-size: 18px; margin-bottom: 5px; }
   .cover-meta small { color: rgba(255,255,255,.78); font-size: 13px; }
   .dropzone { border: 2px dashed #b8c3ce !important; min-height: 320px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 28px; background: #fafbfc; color: var(--ink); }
   .dropzone i { width: 58px; height: 58px; border-radius: 50%; display: grid; place-items: center; background: #eef4f2; color: var(--brand); font-size: 28px; margin-bottom: 16px; }
   .dropzone strong { font-size: 18px; margin-bottom: 8px; }
   .dropzone span { color: var(--muted); font-size: 13px; line-height: 1.5; max-width: 240px; }
   .photo-admin-gallery { padding: 20px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
   .thumb { position: relative; min-height: 190px; border-radius: 8px; overflow: hidden; border: 1px solid var(--line); background: #d7dde3; }
   .thumb img { height: 158px; }
   .thumb::after { content: ""; position: absolute; inset: 0 0 32px; background: linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,.62)); pointer-events: none; }
   .number { position: absolute; z-index: 2; top: 9px; left: 9px; width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; background: rgba(255,255,255,.94); color: var(--ink); font-weight: 900; font-size: 13px; }
   .tools { position: absolute; z-index: 2; right: 8px; bottom: 40px; display: flex; gap: 6px; }
   .tools button { width: 31px; height: 31px; border-radius: 7px; display: grid; place-items: center; background: rgba(255,255,255,.95); color: var(--ink); font-size: 13px; padding: 0; }
   .tools button.active { color: var(--gold); }
   .tools button.danger { color: var(--danger); }
   .tools button:disabled { opacity: .45; cursor: not-allowed; }
   .thumb > strong { display: block; padding: 8px 10px; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; background: white; }
   .empty-gallery { grid-column: 1 / -1; min-height: 180px; display: grid; place-items: center; gap: 8px; border: 1px dashed #b8c3ce !important; background: #fafbfc; color: var(--ink); }
   .empty-gallery i { font-size: 34px; color: var(--brand); }
   .empty-gallery span { color: var(--muted); font-size: 13px; }
   .summary { padding: 18px; }
   .summary h3 { margin: 0 0 14px; font-size: 16px; }
   .summary dl { margin: 0 0 18px; }
   .summary dl div { display: flex; justify-content: space-between; gap: 12px; padding: 13px 0; border-bottom: 1px solid var(--line); color: var(--muted); font-size: 14px; }
   .summary dd { margin: 0; color: var(--ink); font-weight: 900; text-align: right; }
   .summary button { width: 100%; margin-top: 10px; }
   .photo-admin-login { display: grid; place-items: center; background: #111821; padding: 20px; }
   .photo-admin-login form { width: min(420px, 100%); background: white; border-radius: 8px; padding: 28px; box-shadow: 0 18px 44px rgba(0,0,0,.28); }
   .photo-admin-login img { width: 64px; height: 64px; object-fit: contain; margin-bottom: 18px; }
   .photo-admin-login h1 { margin: 0 0 20px; font-size: 25px; }
   .photo-admin-login input { width: 100%; height: 48px; border: 1px solid var(--line); border-radius: 8px; padding: 0 13px; margin-bottom: 12px; font-weight: 700; }
   .photo-admin-login p { margin: 0 0 12px; color: var(--danger); font-weight: 800; }
   .photo-admin-login button { width: 100%; height: 48px; background: var(--brand); color: white; }
   @media (max-width: 1180px) { .photo-admin { grid-template-columns: 1fr; } .photo-admin-sidebar { max-height: none; } .photo-admin-list { grid-template-columns: repeat(2, minmax(0, 1fr)); } .photo-admin-grid { grid-template-columns: 1fr; } }
   @media (max-width: 760px) { .photo-admin-main { padding: 18px; } .photo-admin-topbar { flex-direction: column; } .photo-admin-hero { grid-template-columns: 1fr; } .photo-admin-gallery { grid-template-columns: repeat(2, minmax(0, 1fr)); } .photo-admin-list { grid-template-columns: 1fr; } .cover, .dropzone, .cover-empty { min-height: 250px; } }
`;
