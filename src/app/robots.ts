import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/about_us_01",
        "/services",
        "/insurance",
        "/contact",
        "/faq",
        "/privacy-policy",
        "/listing_details_01",
      ],
      disallow: [
        "/dashboard/",
        "/insights",
        "/home-",
        "/listing_",
        "/listing_details_",
        "/agency",
        "/agent",
        "/compare",
        "/pricing_",
        "/project_",
        "/service_",
        "/blog_",
      ],
    },
    sitemap: "https://www.zevicapital.com/sitemap.xml",
    host: "https://www.zevicapital.com",
  };
}
