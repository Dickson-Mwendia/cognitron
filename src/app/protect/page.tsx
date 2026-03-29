import Link from "next/link";
import { ShieldCheck, Home, Lock, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protect — Cognitron",
  description:
    "Comprehensive digital safety for families and personal cybersecurity for executives. Protect your digital life.",
};

export default function ProtectPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
            Cognitron Protect
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Your Family&apos;s Digital Life,{" "}
            <span className="text-gold">Secured</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            From your children&apos;s online safety to your personal
            cybersecurity as an executive, we protect what matters most.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Family */}
            <div className="rounded-2xl border border-navy/10 bg-off-white p-8 md:p-10">
              <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center mb-6">
                <Home className="w-7 h-7 text-gold" />
              </div>
              <h2 className="text-2xl font-bold text-navy">
                Family Digital Safety
              </h2>
              <p className="mt-3 text-slate leading-relaxed">
                Keep your children safe online and your home network secure. We
                handle the technology so you can focus on family.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Device security setup for the whole family",
                  "Parental controls & online activity monitoring",
                  "Online safety education for children",
                  "Home Wi-Fi network security audit",
                  "Monthly check-in and ongoing support",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-navy"
                  >
                    <ShieldCheck className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/protect/family"
                className="inline-flex items-center gap-2 mt-8 text-gold-dark font-semibold text-sm hover:gap-3 transition-all"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Executive */}
            <div className="rounded-2xl border border-navy/10 bg-off-white p-8 md:p-10">
              <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center mb-6">
                <Lock className="w-7 h-7 text-gold" />
              </div>
              <h2 className="text-2xl font-bold text-navy">
                Executive Cyber Protection
              </h2>
              <p className="mt-3 text-slate leading-relaxed">
                High-profile individuals face higher risks. We provide
                personal-level cybersecurity typically reserved for Fortune
                500 executives.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Personal device hardening & encryption",
                  "Dark web monitoring for your personal data",
                  "Secure communications setup",
                  "Social media privacy audit & lockdown",
                  "Incident response & 24/7 support",
                  "Quarterly security review",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-navy"
                  >
                    <ShieldCheck className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/protect/executive"
                className="inline-flex items-center gap-2 mt-8 text-gold-dark font-semibold text-sm hover:gap-3 transition-all"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy">
            Why Digital Protection Matters
          </h2>
          <p className="mt-6 text-slate text-lg leading-relaxed max-w-2xl mx-auto">
            Your children spend hours online every day. Your personal data is a
            target. Cybercrime in Kenya grew 300% in the last three years.
            Protection isn&apos;t optional. It&apos;s essential.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { stat: "3+ hrs/day", label: "Average screen time for Kenyan teens" },
              { stat: "300%", label: "Growth in cybercrime in Kenya since 2022" },
              { stat: "12x", label: "Higher targeting risk for HNW individuals" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-3xl sm:text-4xl font-bold text-gold">{item.stat}</p>
                <p className="mt-2 text-sm text-slate">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 bg-navy text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Secure Your Family Today
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            Book a confidential security assessment. We&apos;ll evaluate your
            risk and recommend a protection plan.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 mt-8 w-full sm:w-auto bg-gold text-navy px-6 sm:px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
          >
            Book a Security Assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
