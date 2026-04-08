import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

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
    "/login",
    "/signup",
  ];

  const staticRoutes = routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
    changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: route === "" ? 1 : route === "/contact" ? 0.9 : 0.8,
  }));

  // Add blog post URLs
  const posts = getAllPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
