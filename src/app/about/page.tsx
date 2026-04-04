import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Cognitron | Nairobi's Tech Academy for Kids & Teens",
  description:
    "Founded by Dickson Mwendia in Nairobi. Tech skills for kids, taught by someone who knows your child. Coding, AI, Chess - at your home.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Built in Nairobi.{" "}
            <span className="text-gold">For Nairobi families.</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            Cognitron exists because every ambitious child in this city deserves
            real tech skills, taught by someone who knows your child.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-32 h-32 rounded-full bg-navy flex items-center justify-center shrink-0">
              <span className="text-4xl font-bold text-gold">DM</span>
            </div>
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                From the Founder
              </p>
              <h2 className="text-3xl font-bold text-navy mb-6">
                Dickson Mwendia
              </h2>
              <div className="prose prose-lg text-slate max-w-none space-y-5 leading-relaxed">
                <p>
                  I started Cognitron because I saw a gap that frustrated me
                  personally. The brightest children in Nairobi were consuming technology every
                  single day. They were fluent in apps, games, and social media.
                  But almost none of them had the opportunity to truly
                  understand how any of it worked, let alone build something
                  of their own.
                </p>
                <p>
                  Their schools offered basic ICT. YouTube had tutorials. But
                  none of that gave a child what they actually need: a coach
                  who sits beside them, watches how they think, adapts in real
                  time, and pushes them to build something they never thought
                  possible. That&apos;s what the best tech education in the
                  world looks like - and I believed Nairobi families deserved
                  exactly that.
                </p>
                <p>
                  So I built it. Cognitron combines coding, AI, and chess with
                  a coaching model designed for how kids actually learn:
                  small groups of four, real projects from week one, and
                  coaches who come to your home because I know what Nairobi
                  traffic does to a family&apos;s schedule.
                </p>
                <p>
                  Every child who walks through our programme leaves with
                  something tangible: an app they built, a model they trained,
                  a game they won. But more than that - they leave knowing they
                  can build things. That confidence changes everything.
                </p>
              </div>
              <a
                href="https://wa.me/254710643847?text=Hi%20Dickson%2C%20I%27d%20like%20to%20learn%20about%20Cognitron"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-gold-dark font-semibold text-sm hover:gap-3 transition-all"
              >
                <MessageCircle className="w-4 h-4" /> Message Dickson directly
              </a>
            </div>
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
                title: "Real outcomes over hours logged",
                desc: "We measure success by what students build - apps deployed, models trained, tournaments played - not by time spent in a seat.",
              },
              {
                title: "Every child by name",
                desc: "Max 4 students per session. Your child isn't a number. Their coach adapts to their pace, interests, and learning style.",
              },
              {
                title: "Built for Nairobi families",
                desc: "Home coaching. WhatsApp-first communication. Schedules that work around school terms, traffic, and family life.",
              },
              {
                title: "Honest about everything",
                desc: "Transparent pricing, realistic expectations, and honest progress reports. If Cognitron isn't the right fit, we'll tell you.",
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
            shape Africa&apos;s digital future - starting right here in Nairobi.
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 mt-10 w-full sm:w-auto bg-gold text-navy px-6 sm:px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
          >
            Book your child&apos;s free first lesson{" "}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
