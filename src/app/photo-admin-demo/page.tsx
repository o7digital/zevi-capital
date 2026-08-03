const photos = [
   "/assets/images/listing/img_61.jpg",
   "/assets/images/listing/img_62.jpg",
   "/assets/images/listing/img_63.jpg",
   "/assets/images/listing/img_64.jpg",
   "/assets/images/listing/img_65.jpg",
   "/assets/images/listing/img_66.jpg",
   "/assets/images/listing/img_67.jpg",
   "/assets/images/listing/img_68.jpg",
];

export default function PhotoAdminDemoPage() {
   return (
      <main className="photo-demo">
         <aside className="photo-sidebar">
            <div className="photo-brand">
               <img src="/logo.png" alt="ZeVi Capital" />
               <div>
                  <strong>ZeVi Capital</strong>
                  <span>Back-office immobilier</span>
               </div>
            </div>
            <nav>
               <a href="#">⌂ Propiedades</a>
               <a className="active" href="#">▦ Fotos</a>
               <a href="#">◎ Leads</a>
               <a href="#">◷ Comisiones</a>
               <a href="#">☷ Equipo</a>
            </nav>
         </aside>

         <section className="photo-main">
            <div className="photo-topbar">
               <div>
                  <h1>Fotos de la propiedad</h1>
                  <p>Apartamento amueblado en Polanco - EB-WA8314</p>
               </div>
               <div className="photo-actions">
                  <button>Vista previa</button>
                  <button className="gold">Reordenar</button>
                  <button className="primary">Subir fotos</button>
               </div>
            </div>

            <div className="photo-layout">
               <section className="panel">
                  <header className="panel-head">
                     <h2>Galeria visual</h2>
                     <span>10 fotos listas</span>
                  </header>

                  <div className="hero-photo">
                     <div className="cover">
                        <img src={photos[0]} alt="" />
                        <span className="badge">Foto principal</span>
                        <div className="cover-meta">
                           <strong>EB-WA8314-cover.jpg</strong>
                           <small>Visible como imagen principal en el sitio web</small>
                        </div>
                     </div>

                     <div className="dropzone">
                        <div>+</div>
                        <strong>Arrastra nuevas fotos aqui</strong>
                        <span>Upload multiple, vista previa inmediata y orden automatico por posicion.</span>
                     </div>
                  </div>

                  <div className="gallery">
                     {photos.map((photo, index) => (
                        <article className="thumb" key={photo}>
                           <img src={photo} alt="" />
                           <span className="number">{index + 1}</span>
                           <div className="tools">
                              <span>{index === 0 ? "★" : "☆"}</span>
                              <span>↕</span>
                              <span className="danger">⌫</span>
                           </div>
                        </article>
                     ))}
                  </div>
               </section>

               <aside className="panel summary">
                  <h3>Resumen de mejora</h3>
                  <dl>
                     <div><dt>Fotos</dt><dd>10</dd></div>
                     <div><dt>Principal</dt><dd>Definida</dd></div>
                     <div><dt>Orden</dt><dd>Drag & drop</dd></div>
                     <div><dt>Almacenamiento</dt><dd>Directus/Railway</dd></div>
                  </dl>

                  <ul>
                     <li><b>✓</b> Galeria visual con miniaturas grandes.</li>
                     <li><b>✓</b> Seleccion clara de la foto principal.</li>
                     <li><b>✓</b> Acciones rapidas para ordenar, ver y eliminar.</li>
                     <li><b>✓</b> Sin Google Drive ni herramientas pagadas al inicio.</li>
                  </ul>

                  <div className="proposal">
                     <span>Costo plugin</span>
                     <strong>$1,499 MXN</strong>
                     <p>Licencia/configuracion inicial para mejorar la gestion visual de fotos.</p>
                  </div>
               </aside>
            </div>
         </section>

         <style>{`
            .photo-demo {
               --bg: #f3f5f7;
               --panel: #ffffff;
               --ink: #18202a;
               --muted: #6e7783;
               --line: #dfe4ea;
               --brand: #153f3a;
               --gold: #b68639;
               --danger: #bd3041;
               min-height: 100vh;
               display: grid;
               grid-template-columns: 260px 1fr;
               background: var(--bg);
               color: var(--ink);
               font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            }
            .photo-sidebar { background: #111821; color: white; padding: 24px 18px; }
            .photo-brand { display: flex; gap: 12px; align-items: center; padding-bottom: 24px; margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,.1); }
            .photo-brand img { width: 48px; height: 48px; object-fit: contain; background: white; border-radius: 6px; padding: 4px; }
            .photo-brand strong, .photo-brand span { display: block; }
            .photo-brand span { color: #9aa5b1; font-size: 13px; }
            .photo-sidebar a { display: flex; gap: 12px; color: #c9d1d9; text-decoration: none; padding: 12px 14px; border-radius: 8px; margin-bottom: 6px; font-weight: 700; font-size: 14px; }
            .photo-sidebar a.active { color: white; background: rgba(182,134,57,.22); outline: 1px solid rgba(182,134,57,.32); }
            .photo-main { padding: 28px; }
            .photo-topbar { display: flex; justify-content: space-between; align-items: center; gap: 18px; margin-bottom: 22px; }
            .photo-topbar h1 { margin: 0 0 8px; font-size: 28px; line-height: 1.15; letter-spacing: 0; }
            .photo-topbar p { margin: 0; color: var(--muted); font-size: 14px; }
            .photo-actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
            .photo-demo button { border: 0; border-radius: 8px; padding: 11px 14px; font-weight: 800; color: var(--ink); background: white; box-shadow: inset 0 0 0 1px var(--line); }
            .photo-demo button.primary { background: var(--brand); color: white; box-shadow: none; }
            .photo-demo button.gold { background: var(--gold); color: white; box-shadow: none; }
            .photo-layout { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 22px; align-items: start; }
            .panel { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; box-shadow: 0 14px 34px rgba(24,32,42,.08); overflow: hidden; }
            .panel-head { padding: 18px 20px; border-bottom: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center; gap: 12px; }
            .panel-head h2 { margin: 0; font-size: 17px; }
            .panel-head span { background: #eef4f2; color: var(--brand); border-radius: 999px; padding: 7px 10px; font-size: 12px; font-weight: 900; }
            .hero-photo { padding: 20px; display: grid; grid-template-columns: 1.1fr .9fr; gap: 18px; }
            .cover { position: relative; min-height: 320px; overflow: hidden; border-radius: 8px; background: #d7dde3; }
            .cover img, .thumb img { width: 100%; height: 100%; display: block; object-fit: cover; }
            .badge { position: absolute; left: 14px; top: 14px; background: var(--gold); color: white; border-radius: 999px; padding: 8px 11px; font-size: 12px; font-weight: 900; }
            .cover-meta { position: absolute; left: 0; right: 0; bottom: 0; padding: 18px; background: linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,.72)); color: white; }
            .cover-meta strong { display: block; font-size: 18px; margin-bottom: 5px; }
            .cover-meta small { color: rgba(255,255,255,.78); font-size: 13px; }
            .dropzone { border: 2px dashed #b8c3ce; border-radius: 8px; min-height: 320px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 28px; background: #fafbfc; }
            .dropzone div { width: 58px; height: 58px; border-radius: 50%; display: grid; place-items: center; background: #eef4f2; color: var(--brand); font-size: 28px; margin-bottom: 16px; }
            .dropzone strong { font-size: 18px; margin-bottom: 8px; }
            .dropzone span { color: var(--muted); font-size: 13px; line-height: 1.5; max-width: 240px; }
            .gallery { padding: 20px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
            .thumb { position: relative; height: 158px; border-radius: 8px; overflow: hidden; border: 1px solid var(--line); background: #d7dde3; }
            .thumb::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,.62)); }
            .number { position: absolute; z-index: 2; top: 9px; left: 9px; width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; background: rgba(255,255,255,.94); color: var(--ink); font-weight: 900; font-size: 13px; }
            .tools { position: absolute; z-index: 2; right: 8px; bottom: 8px; display: flex; gap: 6px; }
            .tools span { width: 31px; height: 31px; border-radius: 7px; display: grid; place-items: center; background: rgba(255,255,255,.95); color: var(--ink); font-size: 14px; font-weight: 900; }
            .tools .danger { color: var(--danger); }
            .summary { padding: 18px; }
            .summary h3 { margin: 0 0 14px; font-size: 16px; }
            .summary dl { margin: 0; }
            .summary dl div { display: flex; justify-content: space-between; gap: 12px; padding: 13px 0; border-bottom: 1px solid var(--line); color: var(--muted); font-size: 14px; }
            .summary dd { margin: 0; color: var(--ink); font-weight: 900; }
            .summary ul { margin: 18px 0 0; padding: 0; list-style: none; }
            .summary li { display: flex; gap: 10px; margin-bottom: 12px; font-size: 14px; color: #3c4652; line-height: 1.35; }
            .summary b { flex: 0 0 auto; width: 20px; height: 20px; border-radius: 50%; display: grid; place-items: center; background: #eef4f2; color: var(--brand); font-size: 12px; }
            .proposal { margin-top: 18px; background: #17211f; color: white; border-radius: 8px; padding: 17px; }
            .proposal span { color: #bdc8c4; font-size: 12px; text-transform: uppercase; font-weight: 900; letter-spacing: .04em; }
            .proposal strong { display: block; margin-top: 6px; font-size: 25px; }
            .proposal p { margin: 8px 0 0; color: #dce4e1; font-size: 13px; line-height: 1.45; }
            @media (max-width: 1100px) { .photo-demo { grid-template-columns: 1fr; } .photo-sidebar { display: none; } .photo-layout { grid-template-columns: 1fr; } }
            @media (max-width: 760px) { .photo-main { padding: 18px; } .photo-topbar { align-items: flex-start; flex-direction: column; } .photo-actions { justify-content: flex-start; } .hero-photo { grid-template-columns: 1fr; } .gallery { grid-template-columns: repeat(2, minmax(0, 1fr)); } .cover, .dropzone { min-height: 250px; } }
         `}</style>
      </main>
   );
}
