import Link from "next/link";
import { ArrowRight, Check, Users, Home as HomeIcon, Monitor, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Cognitron",
  description:
    "Transparent pricing for Cognitron Academy and Protect. Every plan is built around your family.",
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Invest in Your Child.{" "}
            <span className="text-gold">Know What It Costs.</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            Every Cognitron plan is built around your family: your child&apos;s
            age, interests, and goals. We&apos;ll recommend the right fit
            during a free consultation. Here&apos;s what to expect.
          </p>
        </div>
      </section>

      {/* Anchor Pricing */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              Cognitron Academy
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Straightforward pricing
            </h2>
            <p className="mt-4 text-slate text-lg max-w-2xl mx-auto">
              Plans are tailored to your family: the number of sessions,
              tracks, and children enrolled.
            </p>
          </div>

          {/* The Anchor */}
          <div className="bg-off-white border border-navy/10 rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto">
            <p className="text-slate text-sm uppercase tracking-wider font-semibold mb-2">
              Starting From
            </p>
            <p className="text-5xl md:text-6xl font-bold text-navy">
              $65
            </p>
            <p className="text-slate text-sm mt-1">per session</p>
            <p className="text-slate text-sm mt-2">
              Approximately KES 8,500 per session
            </p>
            <div className="mt-8 pt-8 border-t border-navy/10">
              <p className="text-sm text-slate mb-4">
                Most families start with 2 sessions per week
              </p>
              <p className="text-2xl font-bold text-navy">
                From $520<span className="text-sm text-slate font-normal">/month</span>
              </p>
              <p className="text-xs text-slate mt-1">
                8 sessions per month, 1 child, 1 track
              </p>
            </div>
          </div>

          {/* What's Included */}
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Max 4 per session",
                desc: "Small groups so your child gets real attention, not just screen time.",
              },
              {
                icon: Monitor,
                title: "Online or at home",
                desc: "Live sessions via Zoom, or a coach comes to your home in Nairobi.",
              },
              {
                icon: Check,
                title: "Progress reports",
                desc: "Regular updates on what your child is building and where they're heading.",
              },
              {
                icon: HomeIcon,
                title: "Flexible scheduling",
                desc: "After-school, weekends, holidays. Sessions fit your family's calendar.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-bold text-navy text-sm">{item.title}</h3>
                <p className="mt-1 text-xs text-slate leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* How Plans Scale */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-navy text-center mb-10">
              How your plan scales
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  label: "One child, one track",
                  sessions: "2 sessions/week",
                  price: "From $520/mo",
                  example: "e.g. Coding only, online",
                },
                {
                  label: "One child, multiple tracks",
                  sessions: "3+ sessions/week",
                  price: "From $780/mo",
                  example: "e.g. Coding + Chess, hybrid",
                },
                {
                  label: "Multiple children",
                  sessions: "Custom schedule",
                  price: "From $1,300/mo",
                  example: "e.g. 2–3 kids, all tracks",
                },
              ].map((tier) => (
                <div
                  key={tier.label}
                  className="rounded-xl border border-navy/10 bg-off-white p-6 text-center"
                >
                  <p className="font-bold text-navy">{tier.label}</p>
                  <p className="text-xs text-slate mt-1">{tier.sessions}</p>
                  <p className="text-2xl font-bold text-navy mt-4">
                    {tier.price}
                  </p>
                  <p className="text-xs text-slate mt-1">{tier.example}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-slate mt-8">
              Home coaching, additional sessions, and multi-track enrolment
              are all discussed during your consultation. Every plan is tailored.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-gold text-navy px-6 sm:px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
            >
              Book a free consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Protect Pricing */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              Cognitron Protect
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Digital protection for your family
            </h2>
            <p className="mt-4 text-slate text-lg max-w-2xl mx-auto">
              Every family&apos;s risk profile is different. We start with a
              confidential assessment and build a protection plan from there.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-navy/10 bg-white p-6 md:p-8">
              <ShieldCheck className="w-8 h-8 text-gold mb-4" />
              <h3 className="text-xl font-bold text-navy">
                Family Digital Safety
              </h3>
              <p className="mt-2 text-sm text-slate leading-relaxed">
                Device security, parental controls, home network protection,
                and ongoing monitoring for the whole household.
              </p>
              <p className="mt-6 text-2xl font-bold text-navy">
                From $170<span className="text-sm text-slate font-normal">/month</span>
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-6 bg-navy text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-navy-light transition-colors"
              >
                Book an assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="rounded-2xl border border-navy/10 bg-white p-6 md:p-8">
              <ShieldCheck className="w-8 h-8 text-gold mb-4" />
              <h3 className="text-xl font-bold text-navy">
                Executive Cyber Protection
              </h3>
              <p className="mt-2 text-sm text-slate leading-relaxed">
                Personal device hardening, dark web monitoring, secure
                communications, and incident response for high-profile
                individuals.
              </p>
              <p className="mt-6 text-2xl font-bold text-navy">Custom</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-6 bg-navy text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-navy-light transition-colors"
              >
                Schedule a consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-navy text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Every family is different
          </h2>
          <p className="mt-3 text-white/60">
            Tell us about your children and your goals. We&apos;ll build a plan
            that fits your family and walk the journey together.
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
