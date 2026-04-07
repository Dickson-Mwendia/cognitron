import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blog | Cognitron | Kids Coding, AI & Chess Nairobi",
  description:
    "Insights on coding education, AI literacy, chess strategy, and digital safety for kids in Nairobi. Tips for parents navigating technology with their children.",
  openGraph: {
    title: "Blog | Cognitron | Kids Coding, AI & Chess Nairobi",
    description:
      "Insights on coding education, AI literacy, chess strategy, and digital safety for kids in Nairobi. Tips for parents navigating technology with their children.",
    url: "/blog",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Cognitron Blog — Insights on Kids' Tech Education in Nairobi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Cognitron | Kids Coding, AI & Chess Nairobi",
    description:
      "Insights on coding education, AI literacy, chess strategy, and digital safety for kids in Nairobi. Tips for parents navigating technology with their children.",
    images: ["/og-image.jpg"],
  },
};

const categoryColors: Record<string, string> = {
  Coding: "bg-blue-100 text-blue-700",
  AI: "bg-purple-100 text-purple-700",
  Chess: "bg-green-100 text-green-700",
  Parenting: "bg-amber-100 text-amber-700",
  Protect: "bg-red-100 text-red-700",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Insights for{" "}
            <span className="text-gold">thoughtful parents</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            Practical advice on coding education, AI literacy, chess, and
            keeping your family safe in the digital age.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-navy/10 bg-off-white p-8 md:p-12">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[posts[0].category]}`}
            >
              {posts[0].category}
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-navy">
              {posts[0].title}
            </h2>
            <p className="mt-3 text-slate text-lg max-w-2xl">
              {posts[0].excerpt}
            </p>
            <div className="flex items-center gap-4 mt-4 text-sm text-slate">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(posts[0].date).toLocaleDateString("en-KE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {posts[0].readTime}
              </span>
            </div>
            <Link
              href={`/blog/${posts[0].slug}`}
              className="inline-flex items-center gap-2 mt-6 bg-gold text-navy px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gold-light transition-colors"
            >
              Read article <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 md:py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-10">
            All articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post) => (
              <article
                key={post.slug}
                className="rounded-2xl border border-navy/10 bg-white p-6 hover:shadow-lg transition-shadow"
              >
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[post.category]}`}
                >
                  {post.category}
                </span>
                <h3 className="mt-3 text-lg font-bold text-navy">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-slate leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 mt-4 text-xs text-slate">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString("en-KE", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-gold hover:text-gold-dark transition-colors"
                >
                  Read more <ArrowRight className="w-3 h-3" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to invest in your child&apos;s future?
          </h2>
          <p className="mt-3 text-white/60">
            Book a free trial lesson and see the difference.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 mt-6 w-full sm:w-auto bg-gold text-navy px-6 sm:px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
          >
            Get started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
