import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: "Family Digital Safety Nairobi | Cognitron Protect",
  description:
    "Protect your children online and secure your home network in Nairobi. Device security, parental controls, Wi-Fi audits, and ongoing monitoring.",
  openGraph: {
    title: "Family Digital Safety Nairobi | Cognitron Protect",
    description:
      "Protect your children online and secure your home network in Nairobi. Device security, parental controls, Wi-Fi audits, and ongoing monitoring.",
    url: "/protect/family",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Cognitron Protect — Family Digital Safety in Nairobi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Family Digital Safety Nairobi | Cognitron Protect",
    description:
      "Protect your children online and secure your home network in Nairobi. Device security, parental controls, Wi-Fi audits, and ongoing monitoring.",
    images: ["/og-image.jpg"],
  },
};

export default function FamilyProtectPage() {
  return (
    <>
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-gold" />
            </div>
            <span className="text-xs font-semibold text-gold uppercase tracking-wider">
              Cognitron Protect
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Family Digital Safety
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            Your children are online every day. We ensure they&apos;re safe,
            your devices are secure, and your home network is locked down.
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-10">
            What&apos;s included
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Device security setup",
                desc: "We secure every device in your household: phones, tablets, laptops. Antivirus, encryption, and safe browsing configured.",
              },
              {
                title: "Parental controls",
                desc: "Age-appropriate content filters, screen time limits, and app restrictions, configured and managed for you.",
              },
              {
                title: "Online safety training",
                desc: "Interactive sessions with your children about online safety, privacy, recognizing scams, and responsible digital citizenship.",
              },
              {
                title: "Home network audit",
                desc: "We assess your Wi-Fi security, smart devices, and router configuration. Vulnerabilities are identified and fixed.",
              },
              {
                title: "Monthly support",
                desc: "Ongoing monitoring, updates to security settings, and a monthly check-in to address new concerns.",
              },
              {
                title: "Incident response",
                desc: "If something goes wrong (a breach, suspicious activity, or online threat) we respond immediately.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-off-white rounded-xl p-6 border border-navy/5"
              >
                <ShieldCheck className="w-8 h-8 text-gold mb-3" />
                <h3 className="font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-slate leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-10 text-center">
            How it works
          </h2>
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Security assessment",
                desc: "We audit your family's digital footprint: devices, accounts, online habits, and home network.",
              },
              {
                step: "2",
                title: "Setup & hardening",
                desc: "We configure security on all devices, set up parental controls, and secure your network. Typically completed in one visit or session.",
              },
              {
                step: "3",
                title: "Ongoing protection",
                desc: "Monthly monitoring, security updates, and support. As threats evolve, your protection evolves.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-navy text-gold flex items-center justify-center flex-shrink-0 text-lg font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-1 text-slate text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold">Protect your family now</h2>
          <p className="mt-4 text-white/60">
            Book a free family security assessment. We&apos;ll evaluate your risk
            and recommend a protection plan.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 mt-8 bg-gold text-navy px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
          >
            Book a free assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
