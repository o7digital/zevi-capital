import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/about_us_01", "/services", "/insurance", "/insights", "/contact", "/faq", "/privacy-policy"],
      disallow: [
        "/dashboard/",
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
