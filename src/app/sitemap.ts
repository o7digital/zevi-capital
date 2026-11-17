import type { MetadataRoute } from "next";
import { getPublishedProperties } from "@/lib/publishedProperties.server";
import { buildPropertyCatalogs, propertyPath, SITE_URL } from "@/lib/propertySeo";
import { directusPropertyImages } from "@/lib/directusProperties";

export const revalidate = 300;

const routes = [
  "",
  "/about_us_01",
  "/services",
  "/insurance",
  "/insights",
  "/contact",
  "/faq",
  "/privacy-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getPublishedProperties();
  const staticRoutes: MetadataRoute.Sitemap = routes.map((route, index) => ({
    url: `https://www.zevicapital.com${route}`,
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.8,
  }));
  const listings: MetadataRoute.Sitemap = properties.map(property => ({
    url: SITE_URL + propertyPath(property), changeFrequency: 'weekly', priority: 0.7,
    images: directusPropertyImages(property).slice(0, 1).map(image => image.img),
  }));
  const catalogs: MetadataRoute.Sitemap = [...buildPropertyCatalogs(properties).values()].filter(catalog => catalog.indexable).map(catalog => ({
    url: SITE_URL + catalog.path, changeFrequency: 'weekly', priority: 0.6,
  }));
  return [...staticRoutes, ...listings, ...catalogs];
}
