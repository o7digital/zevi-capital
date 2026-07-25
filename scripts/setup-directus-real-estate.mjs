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

  if (existing.ok) return;

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

  if (existing.ok) return;

  await directus(`/fields/${collection}`, {
    method: "POST",
    body: JSON.stringify({
      field,
      type,
      schema: {
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

async function publicRoleId() {
  const payload = await directus("/roles?filter[name][_eq]=Public&limit=1");
  return payload?.data?.[0]?.id || null;
}

async function allowPublicRead(collection) {
  const role = await publicRoleId();
  const existing = await directus(`/permissions?filter[collection][_eq]=${collection}&filter[action][_eq]=read&limit=100`);
  if (existing?.data?.some((permission) => permission.role === role)) return;

  await directus("/permissions", {
    method: "POST",
    body: JSON.stringify({
      role,
      collection,
      action: "read",
      permissions: {},
      validation: {},
      presets: null,
      fields: ["*"],
    }),
  });
}

await ensureCollection("properties", { icon: "villa", note: "Public real estate listings" });
await ensureField("properties", "title", "string", { is_nullable: false }, { interface: "input", required: true });
await ensureField("properties", "description", "text", {}, { interface: "input-rich-text-html" });
await ensureField("properties", "price", "decimal", { numeric_precision: 12, numeric_scale: 2 }, { interface: "input" });
await ensureField("properties", "location", "string");
await ensureField("properties", "address", "string");
await ensureField("properties", "status", "string", { default_value: "draft" }, {
  interface: "select-dropdown",
  options: { choices: [{ text: "Published", value: "published" }, { text: "Draft", value: "draft" }] },
});
await ensureField("properties", "listing_status", "string", { default_value: "FOR SALE" });
await ensureField("properties", "sqft", "integer");
await ensureField("properties", "bedrooms", "integer");
await ensureField("properties", "bathrooms", "integer");
await ensureField("properties", "cover_image", "uuid", { foreign_key_table: "directus_files", foreign_key_column: "id" }, { interface: "file-image" });

await ensureCollection("property_images", { icon: "image", note: "Images attached to public real estate listings" });
await ensureField("property_images", "property_id", "integer", { foreign_key_table: "properties", foreign_key_column: "id" }, { interface: "select-dropdown-m2o", special: ["m2o"] });
await ensureField("property_images", "image", "uuid", { foreign_key_table: "directus_files", foreign_key_column: "id" }, { interface: "file-image" });
await ensureField("property_images", "sort", "integer");

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
