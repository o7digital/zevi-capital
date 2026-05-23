import type { MetadataRoute } from "next";

const siteUrl = "https://zevi-capital-git-main-olivier-steineur.vercel.app";

const routes = [
  "",
  "/about_us_01",
  "/listing_01",
  "/contact",
  "/insurance",
  "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
