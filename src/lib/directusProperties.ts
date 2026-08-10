import propertyIcon_1 from "@/assets/images/icon/icon_04.svg";
import propertyIcon_2 from "@/assets/images/icon/icon_05.svg";
import propertyIcon_3 from "@/assets/images/icon/icon_06.svg";

export interface DirectusPropertyCard {
   id: number | string;
   href?: string;
   tag: string;
   tag_bg?: string;
   title: string;
   address: string;
   property_info: {
      icon: any;
      feature: string;
      total_feature: number;
   }[];
   price: number;
   price_text?: string;
   currency?: string;
   carousel: string;
   data_delay_time?: string;
   carousel_thumb: {
      id?: string;
      img: string;
      active?: string;
   }[];
}

interface DirectusFileValue {
   id?: string;
   directus_files_id?: string | { id?: string };
   image?: string | { id?: string };
}

export interface DirectusProperty {
   id: number | string;
   title?: string;
   description?: string;
   price?: number | string;
   location?: string;
   address?: string;
   status?: string;
   listing_status?: string;
   tag?: string;
   tag_bg?: string;
   sqft?: number | string;
   bedrooms?: number | string;
   bathrooms?: number | string;
   price_text?: string;
   cover_image?: string | { id?: string };
   image?: string | { id?: string };
   images?: DirectusFileValue[];
   property_images?: DirectusFileValue[];
   photos?: DirectusFileValue[];
   easybroker_id?: string;
   property_type?: string;
   operation_type?: string;
   currency?: string;
   public_url?: string;
   latitude?: number | string;
   longitude?: number | string;
}

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL?.replace(/\/$/, "");

function toNumber(value: number | string | undefined, fallback = 0) {
   const numberValue = Number(value);
   return Number.isFinite(numberValue) ? numberValue : fallback;
}

function fileId(value: DirectusFileValue | string | { id?: string } | undefined) {
   if (!value) return undefined;
   if (typeof value === "string") return value;
   if ("directus_files_id" in value) {
      const file = value.directus_files_id;
      return typeof file === "string" ? file : file?.id;
   }
   if ("image" in value) {
      const image = value.image;
      return typeof image === "string" ? image : image?.id;
   }
   if ("id" in value && value.id) return value.id;
}

function assetUrl(value: DirectusFileValue | string | { id?: string } | undefined) {
   const id = fileId(value);
   return id && DIRECTUS_URL ? `${DIRECTUS_URL}/assets/${id}?format=webp&quality=82` : undefined;
}

export function directusPropertyImages(property: DirectusProperty) {
   const relatedImages = [...(property.photos || []), ...(property.images || []), ...(property.property_images || [])];
   const urls = [
      assetUrl(property.cover_image),
      assetUrl(property.image),
      ...relatedImages.map(assetUrl),
   ].filter((url): url is string => Boolean(url));

   const uniqueUrls = Array.from(new Set(urls));

   return uniqueUrls.map((url, index) => ({
      id: `${property.id}-${index}`,
      img: url,
      active: index === 0 ? "active" : undefined,
   }));
}

export function directusAssetUrl(value: DirectusFileValue | string | { id?: string } | undefined) {
   return assetUrl(value);
}

export function mapDirectusPropertyCard(property: DirectusProperty, index = 0): DirectusPropertyCard {
   return {
      id: property.id,
      href: `/listing_details_01?id=${property.id}`,
      tag: property.tag || property.listing_status || "FOR SALE",
      tag_bg: property.tag_bg,
      title: property.title || "Untitled property",
      address: property.address || property.location || "",
      property_info: [
         { icon: propertyIcon_1, feature: "sqft", total_feature: toNumber(property.sqft) },
         { icon: propertyIcon_2, feature: "bed", total_feature: toNumber(property.bedrooms) },
         { icon: propertyIcon_3, feature: "bath", total_feature: toNumber(property.bathrooms) },
      ],
      price: toNumber(property.price),
      price_text: property.price_text,
      currency: property.currency || "MXN",
      carousel: `directus-${property.id || index}`,
      carousel_thumb: directusPropertyImages(property),
   };
}

export async function fetchDirectusProperties(): Promise<DirectusPropertyCard[]> {
   if (!DIRECTUS_URL) return [];

   const params = new URLSearchParams({
      fields: "*,photos.*,photos.image.*,images.*,property_images.*,property_images.image.*",
      limit: "-1",
      sort: "-id",
   });
   params.set("filter[status][_eq]", "published");
   params.set("filter[cover_image][_nnull]", "true");

   const response = await fetch(`${DIRECTUS_URL}/items/properties?${params.toString()}`, {
      headers: { Accept: "application/json" },
   });

   if (!response.ok) {
      throw new Error(`Directus properties request failed: ${response.status} ${response.statusText}`);
   }

   const payload = await response.json();
   const items = Array.isArray(payload?.data) ? payload.data : [];

   return items.map(mapDirectusPropertyCard).filter((property: DirectusPropertyCard) => property.carousel_thumb.length > 0);
}

export async function fetchDirectusProperty(id: string): Promise<DirectusProperty | null> {
   if (!DIRECTUS_URL || !id) return null;

   try {
      const params = new URLSearchParams({
         fields: "*,cover_image.*,image.*,photos.*,photos.image.*,property_images.*,property_images.image.*",
      });
      params.set("deep[photos][_sort]", "sort_order");
      params.set("deep[property_images][_sort]", "sort_order");

      const response = await fetch(`${DIRECTUS_URL}/items/properties/${id}?${params.toString()}`, {
         headers: { Accept: "application/json" },
      });

      if (!response.ok) return null;

      const payload = await response.json();
      return payload?.data || null;
   } catch {
      return null;
   }
}
