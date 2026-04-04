import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Cognitron Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

const categoryColors: Record<string, string> = {
  Coding: "bg-blue-100 text-blue-700",
  AI: "bg-purple-100 text-purple-700",
  Chess: "bg-green-100 text-green-700",
  Parenting: "bg-amber-100 text-amber-700",
  Protect: "bg-red-100 text-red-700",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mdxComponents: Record<string, React.ComponentType<any>> = {
  h2: (props) => (
    <h2
      className="text-2xl font-bold text-navy mt-10 mb-4 font-heading"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-xl font-bold text-navy mt-8 mb-3 font-heading"
      {...props}
    />
  ),
  p: (props) => (
    <p className="text-foreground/80 leading-relaxed mb-4 text-lg" {...props} />
  ),
  ul: (props) => (
    <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground/80" {...props} />
  ),
  ol: (props) => (
    <ol
      className="list-decimal pl-6 mb-4 space-y-2 text-foreground/80"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed text-lg" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-gold pl-4 italic text-slate my-6"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-navy" {...props} />
  ),
  em: (props) => <em className="italic" {...props} />,
  a: (props) => (
    <a
      className="text-gold-dark font-semibold hover:text-gold transition-colors underline underline-offset-2"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="bg-navy/5 text-navy px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-navy/10" />,
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[post.category] ?? "bg-gray-100 text-gray-700"}`}
          >
            {post.category}
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-heading">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-white/60">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-KE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <MDXRemote source={post.content} components={mdxComponents} />
        </article>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold font-heading">
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
