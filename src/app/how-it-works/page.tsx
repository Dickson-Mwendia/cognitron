import Link from "next/link";
import {
  ArrowRight,
  Phone,
  ClipboardList,
  Rocket,
  ShieldCheck,
  Settings,
  RefreshCcw,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works — Cognitron",
  description:
    "Getting started with Cognitron Academy or Cognitron Protect in three simple steps.",
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Getting Started Is <span className="text-gold">Simple</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            Whether you&apos;re enrolling your child in our Academy or
            protecting your family&apos;s digital life, we make the process
            effortless.
          </p>
        </div>
      </section>

      {/* Academy Process */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Cognitron Academy
          </p>
          <h2 className="text-3xl font-bold text-navy mb-12">
            Enrol your child in 3 steps
          </h2>
          <div className="space-y-10">
            {[
              {
                icon: Phone,
                step: "1",
                title: "Book a free discovery call",
                desc: "Tell us about your child: their age, interests, current skill level, and goals. We'll recommend the best track and format (online, home coaching, or hybrid).",
              },
              {
                icon: ClipboardList,
                step: "2",
                title: "Receive a personalized plan",
                desc: "We create a tailored learning plan with a curriculum, schedule, and assigned coach. You review and approve before we start.",
              },
              {
                icon: Rocket,
                step: "3",
                title: "Start building from week one",
                desc: "No theory overload. Your child begins working on real projects from the very first session. You receive progress updates after every class.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-full bg-navy text-gold flex items-center justify-center flex-shrink-0 text-xl font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-slate leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protect Process */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Cognitron Protect
          </p>
          <h2 className="text-3xl font-bold text-navy mb-12">
            Secure your family in 3 steps
          </h2>
          <div className="space-y-10">
            {[
              {
                icon: ShieldCheck,
                step: "1",
                title: "Security assessment",
                desc: "We audit your family's complete digital footprint: devices, accounts, online habits, home network, and potential vulnerabilities.",
              },
              {
                icon: Settings,
                step: "2",
                title: "Setup & hardening",
                desc: "We configure security across all devices, implement parental controls, secure your network, and address every vulnerability found. Typically completed in one visit.",
              },
              {
                icon: RefreshCcw,
                step: "3",
                title: "Ongoing protection",
                desc: "Monthly monitoring, proactive updates, and dedicated support. As new threats emerge, your protection evolves with them.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-full bg-navy text-gold flex items-center justify-center flex-shrink-0 text-xl font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-slate leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 bg-navy text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to get started?
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            Book a free 15-minute consultation. No pressure, just a
            conversation about what&apos;s possible for your family.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 mt-8 bg-gold text-navy px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
          >
            Book a free consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
