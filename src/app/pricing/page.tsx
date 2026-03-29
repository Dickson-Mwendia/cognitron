import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Cognitron",
  description:
    "Transparent pricing for Cognitron Academy and Protect services. From $520/month.",
};

const academyPlans = [
  {
    name: "Explorer",
    price: "$520",
    priceKES: "KES 78,000",
    period: "/month",
    description: "1 child, 1 track, online only",
    features: [
      "2 sessions per week (8/month)",
      "Choose: Coding, AI, or Chess",
      "Live online classes",
      "Progress reports for parents",
      "Access to student community",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Innovator",
    price: "$780",
    priceKES: "KES 117,000",
    period: "/month",
    description: "1 child, 2+ tracks, hybrid delivery",
    features: [
      "3 sessions per week (12/month)",
      "Multiple tracks included",
      "Online + home coaching",
      "Priority coach matching",
      "Quarterly showcase events",
      "Progress reports for parents",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Family",
    price: "$1,300",
    priceKES: "from KES 195,000",
    period: "/month",
    description: "Up to 3 children, all tracks, hybrid",
    features: [
      "3–4 sessions per child, per week",
      "All tracks for every child",
      "Online + home coaching",
      "Parent technology workshops",
      "Dedicated family coordinator",
      "Priority booking & scheduling",
    ],
    cta: "Book a Consultation",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Simple, <span className="text-gold">Transparent</span> Pricing
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            Invest in your child&apos;s future with a plan that fits your
            family. All plans include expert coaches, real projects, and
            personalized attention.
          </p>
          <p className="mt-3 text-sm text-white/40">
            Base rate: $65 per session. All prices in USD. KES equivalents shown
            for reference.
          </p>
        </div>
      </section>

      {/* Academy Plans */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Cognitron Academy
          </p>
          <h2 className="text-3xl font-bold text-navy mb-12">
            Academy Plans
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {academyPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 md:p-8 border ${
                  plan.highlighted
                    ? "border-gold bg-navy text-white shadow-xl md:scale-[1.02]"
                    : "border-navy/10 bg-off-white"
                }`}
              >
                {plan.highlighted && (
                  <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-4">
                    Most Popular
                  </p>
                )}
                <h3
                  className={`text-xl font-bold ${
                    plan.highlighted ? "text-white" : "text-navy"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    plan.highlighted ? "text-white/60" : "text-slate"
                  }`}
                >
                  {plan.description}
                </p>
                <div className="mt-6">
                  <span
                    className={`text-4xl font-bold ${
                      plan.highlighted ? "text-gold" : "text-navy"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${
                      plan.highlighted ? "text-white/50" : "text-slate"
                    }`}
                  >
                    {plan.period}
                  </span>
                  <p
                    className={`text-xs mt-1 ${
                      plan.highlighted ? "text-white/40" : "text-slate-light"
                    }`}
                  >
                    {plan.priceKES}
                  </p>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2 text-sm ${
                        plan.highlighted ? "text-white/80" : "text-navy"
                      }`}
                    >
                      <Check
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          plan.highlighted ? "text-gold" : "text-gold"
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`inline-flex items-center justify-center gap-2 mt-8 w-full py-3 rounded-full font-semibold text-sm transition-colors ${
                    plan.highlighted
                      ? "bg-gold text-navy hover:bg-gold-light"
                      : "bg-navy text-white hover:bg-navy-light"
                  }`}
                >
                  {plan.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platinum */}
      <section className="py-16 bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-2xl p-8 md:p-12 text-white text-center">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              For The Complete Family
            </p>
            <h2 className="text-3xl font-bold">Platinum</h2>
            <p className="mt-3 text-white/60 max-w-xl mx-auto">
              Everything in the Family plan, plus Cognitron Protect (family
              cybersecurity + executive protection), private 1-on-1 coaching,
              and priority support for the entire household.
            </p>
            <p className="mt-6 text-4xl font-bold text-gold">
              $2,500+<span className="text-lg text-white/50">/month</span>
            </p>
            <p className="text-xs text-white/40 mt-1">
              Custom pricing based on family size and needs
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-8 bg-gold text-navy px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
            >
              Book a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Protect Pricing */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Cognitron Protect
          </p>
          <h2 className="text-3xl font-bold text-navy mb-12">
            Protection Plans
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-navy/10 bg-off-white p-8">
              <h3 className="text-xl font-bold text-navy">
                Family Digital Safety
              </h3>
              <p className="mt-1 text-sm text-slate">
                Protect your children and home network
              </p>
              <p className="mt-4 text-3xl font-bold text-navy">
                From $170<span className="text-sm text-slate">/month</span>
              </p>
              <p className="text-xs text-slate-light">From KES 25,000/month</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-6 bg-navy text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-navy-light transition-colors"
              >
                Book an Assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="rounded-2xl border border-navy/10 bg-off-white p-8">
              <h3 className="text-xl font-bold text-navy">
                Executive Cyber Protection
              </h3>
              <p className="mt-1 text-sm text-slate">
                Personal cybersecurity for business leaders
              </p>
              <p className="mt-4 text-3xl font-bold text-navy">Custom</p>
              <p className="text-xs text-slate-light">
                Tailored to your risk profile
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-6 bg-navy text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-navy-light transition-colors"
              >
                Schedule a Consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Not Sure Which Plan Is Right?
          </h2>
          <p className="mt-3 text-white/60">
            Book a free consultation and we&apos;ll recommend the perfect plan
            for your family.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 mt-6 w-full sm:w-auto bg-gold text-navy px-6 sm:px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
          >
            Get Personalized Advice <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
