import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/admin",
        "/coach",
        "/parent",
        "/pending-approval",
        "/api/",
        "/auth/",
      ],
    },
    sitemap: "https://cognitron.tech/sitemap.xml",
  };
}
