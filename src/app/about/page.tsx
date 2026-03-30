import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Cognitron",
  description:
    "Our mission is to empower ambitious families through world-class tech education and digital protection.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Our Mission: <span className="text-gold">Empower Families</span>{" "}
            Through Technology
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            Cognitron was founded on a simple belief: every child deserves access
            to world-class tech education, and every family deserves to feel safe
            in the digital world.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-6">Our story</h2>
          <div className="prose prose-lg text-slate max-w-none space-y-5 leading-relaxed">
            <p>
              We saw a gap: the brightest children in our city were consuming
              technology every day, but few had the opportunity to truly
              understand and create it. Meanwhile, their parents, many of whom
              are business leaders, diplomats, and professionals, were
              increasingly vulnerable to digital threats they couldn&apos;t see.
            </p>
            <p>
              Cognitron exists to bridge both gaps. Our Academy gives children
              the skills to build the future, not just watch it unfold. Our
              Protect services give families the confidence that their digital
              lives are secure.
            </p>
            <p>
              We combine Silicon Valley-standard curricula with a deep
              understanding of our local context. Our coaches are working
              technologists who come to you, online or at your home, and our
              approach is always project-based, personal, and premium.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-12 text-center">
            What we stand for
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Excellence",
                desc: "We hold ourselves to the highest standards in our teaching, our security practices, and our service.",
              },
              {
                title: "Real outcomes",
                desc: "We measure success by what students build and what families are protected from, not hours logged.",
              },
              {
                title: "Family first",
                desc: "Every decision we make starts with one question: is this best for the family we serve?",
              },
              {
                title: "Integrity",
                desc: "We're honest about what we can deliver, transparent in our pricing, and trustworthy with your data.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="text-lg font-bold text-navy">{value.title}</h3>
                <p className="mt-2 text-slate text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 md:py-28 bg-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
            Our Vision
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            To raise a generation of young builders, thinkers, and leaders who
            shape Africa&apos;s digital future.
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 mt-10 w-full sm:w-auto bg-gold text-navy px-6 sm:px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
          >
            Join the Cognitron family <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
