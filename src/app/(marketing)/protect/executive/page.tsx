import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: "Executive Cyber Protection Nairobi | Cognitron Protect",
  description:
    "Personal cybersecurity for Nairobi business owners, executives, and high-profile individuals. Dark web monitoring, device hardening, incident response.",
  openGraph: {
    title: "Executive Cyber Protection Nairobi | Cognitron Protect",
    description:
      "Personal cybersecurity for Nairobi business owners, executives, and high-profile individuals. Dark web monitoring, device hardening, incident response.",
    url: "/protect/executive",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Cognitron Protect — Executive Cyber Protection in Nairobi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive Cyber Protection Nairobi | Cognitron Protect",
    description:
      "Personal cybersecurity for Nairobi business owners, executives, and high-profile individuals. Dark web monitoring, device hardening, incident response.",
    images: ["/og-image.jpg"],
  },
};

export default function ExecutiveProtectPage() {
  return (
    <>
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-gold" />
            </div>
            <span className="text-xs font-semibold text-gold uppercase tracking-wider">
              Cognitron Protect
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Executive Cyber Protection
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            High-profile individuals are high-value targets. We provide
            personal cybersecurity tailored for business leaders and
            diplomats based in Nairobi.
          </p>
        </div>
      </section>

      {/* The Risk */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-4">
            The risk is real
          </h2>
          <p className="text-slate max-w-2xl leading-relaxed mb-10">
            Business owners, C-suite executives, and public figures are
            disproportionately targeted by social engineering, identity theft,
            and data breaches. Your personal digital life is often the weakest
            link in your overall security.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stat: "12x",
                label: "Higher risk of targeted attacks for HNW individuals",
              },
              {
                stat: "73%",
                label: "Of breaches start with compromised personal accounts",
              },
              {
                stat: "$4.5M",
                label: "Average cost of a data breach globally in 2025",
              },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-gold">{item.stat}</p>
                <p className="mt-2 text-sm text-slate">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-10">
            What&apos;s included
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Personal device hardening",
                desc: "Full security configuration for your personal phones, laptops, and tablets. Encryption, access controls, and secure backups.",
              },
              {
                title: "Dark web monitoring",
                desc: "Continuous monitoring for your personal information (emails, passwords, financial data) on dark web marketplaces.",
              },
              {
                title: "Secure communications",
                desc: "Setup of encrypted messaging, secure email, and private browsing for sensitive communications.",
              },
              {
                title: "Social media audit",
                desc: "Review and lockdown of all social media accounts. Remove exposed personal data, tighten privacy settings.",
              },
              {
                title: "Incident response",
                desc: "If a breach or threat is detected, our team responds immediately to contain and remediate.",
              },
              {
                title: "Quarterly security review",
                desc: "Ongoing assessment of your threat landscape with updated recommendations and adjustments.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 border border-navy/5"
              >
                <Lock className="w-8 h-8 text-gold mb-3" />
                <h3 className="font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-slate leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold">
            Protect your personal digital life
          </h2>
          <p className="mt-4 text-white/60">
            Schedule a confidential assessment. We&apos;ll evaluate your exposure
            and build a tailored protection plan.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 mt-8 w-full sm:w-auto bg-gold text-navy px-6 sm:px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
          >
            Schedule a confidential assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
