import type { MetadataRoute } from "next";
import { fetchDirectusProperties } from "@/lib/directusProperties";

const routes = [
  "",
  "/about_us_01",
  "/services",
  "/insurance",
  "/contact",
  "/faq",
  "/privacy-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = routes.map((route, index) => ({
    url: `https://www.zevicapital.com${route}`,
    changeFrequency: index === 0 ? ("weekly" as const) : ("monthly" as const),
    priority: index === 0 ? 1 : 0.8,
  }));

  const properties = await fetchDirectusProperties();
  const propertyRoutes = properties.map((property) => ({
    url: `https://www.zevicapital.com/listing_details_01?id=${encodeURIComponent(String(property.id))}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
    images: property.carousel_thumb.slice(0, 1).map((image) => image.img),
  }));

  return [...staticRoutes, ...propertyRoutes];
}
