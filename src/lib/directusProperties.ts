import propertyIcon_1 from "@/assets/images/icon/icon_04.svg";
import propertyIcon_2 from "@/assets/images/icon/icon_05.svg";
import propertyIcon_3 from "@/assets/images/icon/icon_06.svg";

export interface DirectusPropertyCard {
   id: number | string;
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

interface DirectusProperty {
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
}

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL?.replace(/\/$/, "");

function toNumber(value: number | string | undefined, fallback = 0) {
   const numberValue = Number(value);
   return Number.isFinite(numberValue) ? numberValue : fallback;
}

function fileId(value: DirectusFileValue | string | { id?: string } | undefined) {
   if (!value) return undefined;
   if (typeof value === "string") return value;
   if ("id" in value && value.id) return value.id;
   if ("directus_files_id" in value) {
      const file = value.directus_files_id;
      return typeof file === "string" ? file : file?.id;
   }
   if ("image" in value) {
      const image = value.image;
      return typeof image === "string" ? image : image?.id;
   }
}

function assetUrl(value: DirectusFileValue | string | { id?: string } | undefined) {
   const id = fileId(value);
   return id && DIRECTUS_URL ? `${DIRECTUS_URL}/assets/${id}` : undefined;
}

function propertyImages(property: DirectusProperty) {
   const relatedImages = [...(property.images || []), ...(property.property_images || [])];
   const urls = [
      assetUrl(property.cover_image),
      assetUrl(property.image),
      ...relatedImages.map(assetUrl),
   ].filter((url): url is string => Boolean(url));

   return urls.map((url, index) => ({
      id: `${property.id}-${index}`,
      img: url,
      active: index === 0 ? "active" : undefined,
   }));
}

export async function fetchDirectusProperties(): Promise<DirectusPropertyCard[]> {
   if (!DIRECTUS_URL) return [];

   try {
      const params = new URLSearchParams({
         fields: "*,images.*,property_images.*,property_images.image.*",
         limit: "6",
         sort: "-date_created",
      });
      params.set("filter[status][_eq]", "published");

      const response = await fetch(`${DIRECTUS_URL}/items/properties?${params.toString()}`, {
         headers: { Accept: "application/json" },
      });

      if (!response.ok) return [];

      const payload = await response.json();
      const items = Array.isArray(payload?.data) ? payload.data : [];

      return items.map((property: DirectusProperty, index: number) => ({
         id: property.id,
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
         carousel: `directus-${property.id || index}`,
         carousel_thumb: propertyImages(property),
      })).filter((property: DirectusPropertyCard) => property.carousel_thumb.length > 0);
   } catch {
      return [];
   }
}
