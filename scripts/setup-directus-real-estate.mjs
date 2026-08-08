const directusUrl = process.env.DIRECTUS_URL?.replace(/\/$/, "");
const token = process.env.DIRECTUS_ADMIN_TOKEN;

if (!directusUrl || !token) {
  console.error("Usage: DIRECTUS_URL=https://... DIRECTUS_ADMIN_TOKEN=... node scripts/setup-directus-real-estate.mjs");
  process.exit(1);
}

async function directus(path, options = {}) {
  const response = await fetch(`${directusUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (response.status === 204) return null;

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.errors?.[0]?.message || response.statusText;
    throw new Error(`${options.method || "GET"} ${path}: ${response.status} ${message}`);
  }

  return payload;
}

async function ensureCollection(collection, meta = {}) {
  const existing = await fetch(`${directusUrl}/collections/${collection}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (existing.ok) {
    await directus(`/collections/${collection}`, {
      method: "PATCH",
      body: JSON.stringify({
        meta: {
          collection,
          ...meta,
        },
      }),
    });
    return;
  }

  await directus("/collections", {
    method: "POST",
    body: JSON.stringify({
      collection,
      meta: {
        collection,
        icon: "home_work",
        note: null,
        display_template: "{{title}}",
        hidden: false,
        singleton: false,
        ...meta,
      },
      schema: {},
    }),
  });
}

async function ensureField(collection, field, type, schema = {}, meta = {}) {
   const existing = await fetch(`${directusUrl}/fields/${collection}/${field}`, {
      headers: { Authorization: `Bearer ${token}` },
   });

  if (existing.ok) {
    await directus(`/fields/${collection}/${field}`, {
      method: "PATCH",
      body: JSON.stringify({
        meta: {
          field,
          ...meta,
        },
      }),
    });
    return;
  }

  await directus(`/fields/${collection}`, {
    method: "POST",
    body: JSON.stringify({
      field,
      type,
      schema: schema === null ? null : {
        name: field,
        ...schema,
      },
      meta: {
        field,
        interface: "input",
        ...meta,
      },
    }),
  });
}

async function ensureRelation(collectionMany, fieldMany, collectionOne, fieldOne, options = {}) {
  const relations = await directus(`/relations/${collectionMany}`);
  const existing = relations?.data?.find((relation) => relation.field === fieldMany || relation.meta?.many_field === fieldMany);
  const payload = {
    collection: collectionMany,
    field: fieldMany,
    related_collection: collectionOne,
    meta: {
      many_collection: collectionMany,
      many_field: fieldMany,
      one_collection: collectionOne,
      one_field: fieldOne,
      ...options,
    },
  };

  if (existing) {
    await directus(`/relations/${collectionMany}/${fieldMany}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    return;
  }

  await directus("/relations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

async function publicRoleId() {
  const payload = await directus("/roles?filter[name][_eq]=Public&limit=1");
  return payload?.data?.[0]?.id || null;
}

async function publicPolicyId() {
  const payload = await directus("/policies?limit=100");
  const publicPolicy = payload?.data?.find((policy) => policy.name === "$t:public_label" || policy.icon === "public");
  return publicPolicy?.id || null;
}

async function allowPublicRead(collection) {
  const role = await publicRoleId();
  const policy = await publicPolicyId();
  const existing = await directus(`/permissions?filter[collection][_eq]=${collection}&filter[action][_eq]=read&limit=100`);
  if (existing?.data?.some((permission) => permission.role === role || permission.policy === policy)) return;

  await directus("/permissions", {
    method: "POST",
    body: JSON.stringify({
      role,
      policy,
      collection,
      action: "read",
      permissions: {},
      validation: {},
      presets: null,
      fields: ["*"],
    }),
  });
}

await ensureCollection("properties", {
  icon: "villa",
  note: "Propiedades visibles en el sitio ZeVi Capital",
  display_template: "{{title}} - {{easybroker_id}}",
});
await ensureField("properties", "title", "string", { is_nullable: false }, { interface: "input", required: true, width: "full", sort: 1, translations: [{ language: "es-MX", translation: "Titulo" }] });
await ensureField("properties", "description", "text", {}, { interface: "input-rich-text-html", width: "full", sort: 8, translations: [{ language: "es-MX", translation: "Descripcion" }] });
await ensureField("properties", "price", "decimal", { numeric_precision: 12, numeric_scale: 2 }, { interface: "input", width: "half", sort: 4, translations: [{ language: "es-MX", translation: "Precio" }] });
await ensureField("properties", "location", "string", {}, { width: "half", sort: 2, translations: [{ language: "es-MX", translation: "Zona" }] });
await ensureField("properties", "address", "string", {}, { width: "half", sort: 3, translations: [{ language: "es-MX", translation: "Direccion" }] });
await ensureField("properties", "status", "string", { default_value: "draft" }, {
  interface: "select-dropdown",
  width: "half",
  sort: 5,
  options: { choices: [{ text: "Published", value: "published" }, { text: "Draft", value: "draft" }, { text: "Archived", value: "archived" }] },
});
await ensureField("properties", "listing_status", "string", { default_value: "FOR SALE" }, { width: "half", sort: 6, translations: [{ language: "es-MX", translation: "Operacion visible" }] });
await ensureField("properties", "tag", "string", {}, { width: "half", sort: 7, hidden: true });
await ensureField("properties", "tag_bg", "string", {}, { width: "half", sort: 7, hidden: true });
await ensureField("properties", "sqft", "integer", {}, { width: "half", sort: 9, translations: [{ language: "es-MX", translation: "Superficie" }] });
await ensureField("properties", "bedrooms", "integer", {}, { width: "half", sort: 10, translations: [{ language: "es-MX", translation: "Recamaras" }] });
await ensureField("properties", "bathrooms", "integer", {}, { width: "half", sort: 11, translations: [{ language: "es-MX", translation: "Banos" }] });
await ensureField("properties", "price_text", "string", {}, { width: "half", sort: 12, translations: [{ language: "es-MX", translation: "Precio texto" }] });
await ensureField("properties", "easybroker_id", "string", {}, { width: "half", sort: 13, readonly: true, translations: [{ language: "es-MX", translation: "ID EasyBroker" }] });
await ensureField("properties", "property_type", "string", {}, { width: "half", sort: 14, translations: [{ language: "es-MX", translation: "Tipo" }] });
await ensureField("properties", "operation_type", "string", {}, { width: "half", sort: 15, translations: [{ language: "es-MX", translation: "Operacion" }] });
await ensureField("properties", "currency", "string", {}, { width: "half", sort: 16, translations: [{ language: "es-MX", translation: "Moneda" }] });
await ensureField("properties", "public_url", "string", {}, { width: "half", sort: 17, readonly: true, translations: [{ language: "es-MX", translation: "URL publica" }] });
await ensureField("properties", "latitude", "decimal", { numeric_precision: 10, numeric_scale: 7 }, { interface: "input", width: "half", sort: 18, translations: [{ language: "es-MX", translation: "Latitud" }] });
await ensureField("properties", "longitude", "decimal", { numeric_precision: 10, numeric_scale: 7 }, { interface: "input", width: "half", sort: 19, translations: [{ language: "es-MX", translation: "Longitud" }] });
await ensureField("properties", "cover_image", "uuid", { foreign_key_table: "directus_files", foreign_key_column: "id" }, {
  interface: "file-image",
  width: "half",
  sort: 20,
  translations: [{ language: "es-MX", translation: "Foto principal" }],
  note: "Imagen principal visible en tarjetas, listados y detalle.",
});
await ensureField("properties", "image", "uuid", { foreign_key_table: "directus_files", foreign_key_column: "id" }, { interface: "file-image", hidden: true });

await ensureCollection("property_images", {
  icon: "image",
  note: "Fotos vinculadas a propiedades",
  display_template: "{{sort_order}} - {{image.title}}",
  hidden: true,
});
await ensureField("property_images", "property_id", "integer", { foreign_key_table: "properties", foreign_key_column: "id" }, { interface: "select-dropdown-m2o", special: ["m2o"], hidden: true });
await ensureField("property_images", "image", "uuid", { foreign_key_table: "directus_files", foreign_key_column: "id" }, {
  interface: "file-image",
  width: "full",
  sort: 1,
  required: true,
  translations: [{ language: "es-MX", translation: "Foto" }],
});
await ensureField("property_images", "sort_order", "integer", {}, {
  width: "half",
  sort: 2,
  translations: [{ language: "es-MX", translation: "Orden" }],
  note: "Numero bajo = aparece antes en la galeria.",
});
await ensureField("property_images", "source_url", "string", {}, { width: "half", sort: 3, readonly: true, hidden: true });
await ensureField("properties", "photos", "alias", null, {
  interface: "list-o2m",
  special: ["o2m"],
  width: "full",
  sort: 21,
  translations: [{ language: "es-MX", translation: "Fotos de la propiedad" }],
  note: "Sube, revisa y ordena aqui las fotos que se muestran en el sitio.",
  options: {
    enableCreate: true,
    enableSelect: true,
    fields: ["image", "sort_order"],
    layout: "cards",
    template: "{{sort_order}} - {{image.title}}",
  },
});
await ensureRelation("property_images", "property_id", "properties", "photos", {
  sort_field: "sort_order",
  one_deselect_action: "delete",
});

await ensureCollection("leads", { icon: "contact_mail", note: "Website contact and property inquiries" });
await ensureField("leads", "name", "string");
await ensureField("leads", "email", "string");
await ensureField("leads", "phone", "string");
await ensureField("leads", "message", "text");
await ensureField("leads", "property_id", "integer", { foreign_key_table: "properties", foreign_key_column: "id" }, { interface: "select-dropdown-m2o", special: ["m2o"] });

await allowPublicRead("properties");
await allowPublicRead("property_images");
await allowPublicRead("directus_files");

console.log("Directus real estate collections and public read permissions are ready.");
