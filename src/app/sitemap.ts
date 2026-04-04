import type { MetadataRoute } from "next";

const BASE_URL = "https://cognitron.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    "",
    "/academy",
    "/academy/coding",
    "/academy/ai",
    "/academy/chess",
    "/pricing",
    "/about",
    "/contact",
    "/how-it-works",
    "/protect",
    "/protect/family",
    "/protect/executive",
    "/blog",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/contact" ? 0.9 : 0.8,
  }));
}
