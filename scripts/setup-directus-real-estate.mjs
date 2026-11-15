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
  if (!role && !policy) {
    console.warn(`Skipping public read permission for ${collection}: public role/policy not found.`);
    return;
  }

  await directus("/permissions", {
    method: "POST",
    body: JSON.stringify({
      ...(role ? { role } : {}),
      ...(policy ? { policy } : {}),
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
  options: { choices: [{ text: "Published", value: "published" }, { text: "Draft", value: "draft" }, { text: "Archived", value: "archived" }] },
});
await ensureField("properties", "listing_status", "string", { default_value: "FOR SALE" });
await ensureField("properties", "tag", "string");
await ensureField("properties", "tag_bg", "string");
await ensureField("properties", "sqft", "integer");
await ensureField("properties", "bedrooms", "integer");
await ensureField("properties", "bathrooms", "integer");
await ensureField("properties", "price_text", "string");
await ensureField("properties", "seller_commission_rate", "decimal", { numeric_precision: 8, numeric_scale: 6 }, {
  interface: "input",
  note: "Internal. Seller commission rate as decimal. Example: 0.01 = 1%.",
  width: "half",
});
await ensureField("properties", "seller_commission_amount", "decimal", { numeric_precision: 14, numeric_scale: 2 }, {
  interface: "input",
  note: "Internal. Property price multiplied by seller commission rate.",
  width: "half",
  readonly: true,
});
await ensureField("properties", "team_contribution_rate", "decimal", { numeric_precision: 8, numeric_scale: 6 }, {
  interface: "input",
  note: "Internal. Share of seller commission allocated to the socios/team pool. Example: 0.10 = 10%.",
  width: "half",
});
await ensureField("properties", "team_contribution_amount", "decimal", { numeric_precision: 14, numeric_scale: 2 }, {
  interface: "input",
  note: "Internal. Amount allocated to the socios/team pool.",
  width: "half",
  readonly: true,
});
await ensureField("properties", "team_contribution_monthly", "decimal", { numeric_precision: 14, numeric_scale: 2 }, {
  interface: "input",
  note: "Internal. Team contribution divided by 12 for annualized planning.",
  width: "half",
  readonly: true,
});
await ensureField("properties", "commission_status", "string", { default_value: "pending" }, {
  interface: "select-dropdown",
  options: {
    choices: [
      { text: "Pending", value: "pending" },
      { text: "Agreed", value: "agreed" },
      { text: "Paid", value: "paid" },
      { text: "Cancelled", value: "cancelled" },
    ],
  },
  width: "half",
});
await ensureField("properties", "commission_notes", "text", {}, {
  interface: "input-multiline",
  note: "Internal notes about commission and socios/team allocation.",
});
await ensureField("properties", "cover_image", "uuid", { foreign_key_table: "directus_files", foreign_key_column: "id" }, { interface: "file-image" });
await ensureField("properties", "image", "uuid", { foreign_key_table: "directus_files", foreign_key_column: "id" }, { interface: "file-image" });

await ensureCollection("team_members", { icon: "groups", note: "Internal socios and team members participating in commission distribution", display_template: "{{name}}" });
await ensureField("team_members", "name", "string", { is_nullable: false }, { interface: "input", required: true });
await ensureField("team_members", "role", "string");
await ensureField("team_members", "email", "string");
await ensureField("team_members", "active", "boolean", { default_value: true }, { interface: "boolean", width: "half" });
await ensureField("team_members", "default_share_rate", "decimal", { numeric_precision: 8, numeric_scale: 6 }, {
  interface: "input",
  note: "Default share of the team pool for this member. Example: 0.25 = 25%.",
  width: "half",
});

await ensureCollection("property_commission_shares", {
  icon: "payments",
  note: "Internal per-property distribution of the socios/team contribution",
  display_template: "{{property_id}} - {{team_member_id}}",
});
await ensureField("property_commission_shares", "property_id", "integer", { foreign_key_table: "properties", foreign_key_column: "id" }, { interface: "select-dropdown-m2o", special: ["m2o"] });
await ensureField("property_commission_shares", "team_member_id", "integer", { foreign_key_table: "team_members", foreign_key_column: "id" }, { interface: "select-dropdown-m2o", special: ["m2o"] });
await ensureField("property_commission_shares", "share_rate", "decimal", { numeric_precision: 8, numeric_scale: 6 }, {
  interface: "input",
  note: "Share of the team pool assigned to this member. Example: 0.50 = 50%.",
  width: "half",
});
await ensureField("property_commission_shares", "share_amount", "decimal", { numeric_precision: 14, numeric_scale: 2 }, {
  interface: "input",
  note: "Calculated amount for this member from the team contribution.",
  width: "half",
  readonly: true,
});
await ensureField("property_commission_shares", "status", "string", { default_value: "pending" }, {
  interface: "select-dropdown",
  options: {
    choices: [
      { text: "Pending", value: "pending" },
      { text: "Approved", value: "approved" },
      { text: "Paid", value: "paid" },
      { text: "Cancelled", value: "cancelled" },
    ],
  },
  width: "half",
});
await ensureField("property_commission_shares", "notes", "text", {}, { interface: "input-multiline" });

await ensureCollection("property_images", { icon: "image", note: "Images attached to public real estate listings" });
await ensureField("property_images", "property_id", "uuid", { foreign_key_table: "properties", foreign_key_column: "id" }, { interface: "select-dropdown-m2o", special: ["m2o"] });
await ensureField("property_images", "image", "uuid", { foreign_key_table: "directus_files", foreign_key_column: "id" }, { interface: "file-image" });
await ensureField("property_images", "sort_order", "integer");

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
