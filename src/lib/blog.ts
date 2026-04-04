import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export type PostCategory = "Coding" | "AI" | "Chess" | "Parenting" | "Protect";

export interface PostMeta {
  title: string;
  excerpt: string;
  category: PostCategory;
  date: string;
  author: string;
  readTime: string;
  coverImage?: string;
  slug: string;
}

export interface Post extends PostMeta {
  content: string;
}

/**
 * Returns all blog posts sorted by date (newest first).
 * Reads .mdx files from content/blog/ at build time.
 */
export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const posts: PostMeta[] = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(CONTENT_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    return {
      title: data.title,
      excerpt: data.excerpt,
      category: data.category,
      date: data.date,
      author: data.author,
      readTime: stats.text,
      coverImage: data.coverImage ?? undefined,
      slug,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Returns a single blog post by slug, including raw MDX content.
 */
export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    title: data.title,
    excerpt: data.excerpt,
    category: data.category,
    date: data.date,
    author: data.author,
    readTime: stats.text,
    coverImage: data.coverImage ?? undefined,
    slug,
    content,
  };
}
