import type { MetadataRoute } from "next";

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

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: `https://www.zevicapital.com${route}`,
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
