import type { Metadata } from "next";

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: "Privacy Policy | Cognitron",
  description:
    "Cognitron's privacy policy. How we collect, use, and protect your data. Compliant with the Kenya Data Protection Act 2019.",
  openGraph: {
    title: "Privacy Policy | Cognitron",
    description:
      "Cognitron's privacy policy. How we collect, use, and protect your data. Compliant with the Kenya Data Protection Act 2019.",
    url: "/privacy",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Cognitron — Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Cognitron",
    description:
      "Cognitron's privacy policy. How we collect, use, and protect your data. Compliant with the Kenya Data Protection Act 2019.",
    images: ["/og-image.jpg"],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            Your family&apos;s privacy matters to us. This policy explains what
            data we collect, how we use it, and the rights you have under the
            Kenya Data Protection Act 2019.
          </p>
          <p className="mt-4 text-sm text-white/40">
            Last updated: April 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none space-y-14">
            {/* 1. Introduction */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 1
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Introduction
              </h2>
              <p className="text-slate leading-relaxed">
                Cognitron Technologies (&quot;Cognitron,&quot; &quot;we,&quot;
                &quot;us,&quot; or &quot;our&quot;) operates an educational
                platform providing coding, artificial intelligence, and chess
                coaching to children and teens aged 5–17 in Nairobi, Kenya.
                This Privacy Policy describes how we collect, use, store, and
                protect personal data in compliance with the{" "}
                <strong>Kenya Data Protection Act, 2019</strong> (the
                &quot;DPA&quot;) and its subsidiary regulations.
              </p>
              <p className="text-slate leading-relaxed mt-4">
                By using our services—whether through our website, dashboard,
                or in-person coaching sessions—you agree to the practices
                outlined in this policy. If you do not agree, please do not
                use our services.
              </p>
            </div>

            {/* 2. Data We Collect */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 2
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Data We Collect
              </h2>
              <p className="text-slate leading-relaxed mb-4">
                We collect only the data necessary to deliver and improve our
                educational services. This includes:
              </p>
              <div className="space-y-4">
                <div className="bg-off-white rounded-xl p-5 border border-navy/5">
                  <h3 className="font-bold text-navy text-base">
                    Account Information
                  </h3>
                  <p className="text-sm text-slate mt-1 leading-relaxed">
                    Parent/guardian name, email address, phone number, and
                    password. Student name, date of birth, and age.
                  </p>
                </div>
                <div className="bg-off-white rounded-xl p-5 border border-navy/5">
                  <h3 className="font-bold text-navy text-base">
                    Parent–Child Relationships
                  </h3>
                  <p className="text-sm text-slate mt-1 leading-relaxed">
                    We record which parent/guardian accounts are linked to
                    which student accounts to manage consent and access
                    controls.
                  </p>
                </div>
                <div className="bg-off-white rounded-xl p-5 border border-navy/5">
                  <h3 className="font-bold text-navy text-base">
                    Learning Progress Data
                  </h3>
                  <p className="text-sm text-slate mt-1 leading-relaxed">
                    Session attendance, track enrolments (coding, AI, chess),
                    skill assessments, XP earned, achievements unlocked,
                    project submissions, and coach notes.
                  </p>
                </div>
                <div className="bg-off-white rounded-xl p-5 border border-navy/5">
                  <h3 className="font-bold text-navy text-base">
                    Technical Data
                  </h3>
                  <p className="text-sm text-slate mt-1 leading-relaxed">
                    IP address, browser type, device type, and pages visited
                    on our website. This data is collected automatically when
                    you access our platform.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. How We Use Your Data */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 3
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                How We Use Your Data
              </h2>
              <p className="text-slate leading-relaxed mb-4">
                We use personal data for the following purposes:
              </p>
              <ul className="space-y-2 text-slate text-sm leading-relaxed list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-navy">Personalised learning:</strong>{" "}
                    Tailoring session content, difficulty, and pacing to each
                    student&apos;s level and interests.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-navy">
                      Progress tracking and reporting:
                    </strong>{" "}
                    Providing parents and coaches with progress dashboards,
                    session summaries, and achievement records.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-navy">
                      Account management:
                    </strong>{" "}
                    Creating and maintaining user accounts, authenticating
                    logins, and managing subscriptions.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-navy">Communication:</strong>{" "}
                    Sending session reminders, progress updates, and
                    important service announcements via email or WhatsApp.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-navy">Service improvement:</strong>{" "}
                    Analysing aggregated, anonymised usage data to improve our
                    curriculum, platform, and coaching methods.
                  </span>
                </li>
              </ul>
            </div>

            {/* 4. Children's Privacy */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 4
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Children&apos;s Privacy
              </h2>
              <p className="text-slate leading-relaxed">
                Cognitron serves children aged 5–17. We take the privacy of
                minors extremely seriously.
              </p>
              <div className="bg-off-white rounded-xl p-6 border border-navy/5 mt-4">
                <h3 className="font-bold text-navy text-base mb-3">
                  Parental Consent (Section 33, Kenya DPA)
                </h3>
                <p className="text-sm text-slate leading-relaxed">
                  In accordance with <strong>Section 33</strong> of the Kenya
                  Data Protection Act 2019, we require verifiable parental
                  or guardian consent before collecting, processing, or
                  storing any personal data from children under the age of 16.
                  A parent or guardian must create the child&apos;s account
                  and provide explicit consent during the registration
                  process.
                </p>
              </div>
              <ul className="mt-4 space-y-2 text-slate text-sm leading-relaxed list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Children cannot create accounts independently. All
                    student accounts must be linked to a verified parent or
                    guardian account.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    We collect only the minimum data required to provide
                    educational services to the child.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    We do not display any advertising to children, nor do we
                    use children&apos;s data for marketing purposes.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Students aged 16–17 may provide their own consent but
                    are still encouraged to involve a parent or guardian.
                  </span>
                </li>
              </ul>
            </div>

            {/* 5. Data Sharing */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 5
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Data Sharing
              </h2>
              <p className="text-slate leading-relaxed">
                <strong className="text-navy">
                  We do not sell, rent, or trade your personal data.
                </strong>{" "}
                We share data only in the following limited circumstances:
              </p>
              <ul className="mt-4 space-y-2 text-slate text-sm leading-relaxed list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-navy">Service providers:</strong>{" "}
                    We use Supabase as our data processor for database
                    hosting, authentication, and storage. Supabase processes
                    data solely on our instructions and under strict
                    contractual obligations.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-navy">Legal obligations:</strong>{" "}
                    If required by Kenyan law, court order, or regulatory
                    authority, we may disclose personal data to the extent
                    legally required.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-navy">With your consent:</strong>{" "}
                    We may share data with third parties only if you provide
                    explicit, informed consent in advance.
                  </span>
                </li>
              </ul>
            </div>

            {/* 6. Data Security */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 6
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Data Security
              </h2>
              <p className="text-slate leading-relaxed mb-4">
                We implement appropriate technical and organisational measures
                to protect your personal data, including:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Encryption",
                    desc: "All data is encrypted in transit (TLS/SSL) and at rest.",
                  },
                  {
                    title: "Access Controls",
                    desc: "Role-based access ensures only authorised personnel can view personal data.",
                  },
                  {
                    title: "Secure Authentication",
                    desc: "Passwords are hashed. We support secure authentication flows via Supabase Auth.",
                  },
                  {
                    title: "Regular Reviews",
                    desc: "We periodically review our security practices and update them as needed.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-off-white rounded-xl p-5 border border-navy/5"
                  >
                    <h3 className="font-bold text-navy text-sm">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Data Retention & Deletion */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 7
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Data Retention and Deletion
              </h2>
              <p className="text-slate leading-relaxed">
                We retain personal data only for as long as necessary to
                fulfil the purposes described in this policy, or as required
                by law. Specifically:
              </p>
              <ul className="mt-4 space-y-2 text-slate text-sm leading-relaxed list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Active accounts: data is retained for the duration of the
                    account&apos;s active use plus 12 months after the last
                    login.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Inactive accounts: data is deleted or anonymised within 24
                    months of the last activity, after providing 30 days&apos;
                    notice to the account holder.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    You may request deletion of your data at any time by
                    contacting us. We will process deletion requests within 30
                    days, subject to any legal retention obligations.
                  </span>
                </li>
              </ul>
            </div>

            {/* 8. Parent/Guardian Rights */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 8
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Parent and Guardian Rights
              </h2>
              <p className="text-slate leading-relaxed mb-4">
                As a parent or legal guardian of a student enrolled at
                Cognitron, you have the right to:
              </p>
              <ul className="space-y-2 text-slate text-sm leading-relaxed list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-navy">Access</strong> all personal
                    data we hold about your child.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-navy">Correct</strong> any
                    inaccurate or incomplete data.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-navy">Delete</strong> your
                    child&apos;s account and all associated data.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-navy">Withdraw consent</strong>{" "}
                    for data processing at any time.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-navy">Export</strong> your
                    child&apos;s learning data in a portable format.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-navy">Object</strong> to specific
                    types of data processing.
                  </span>
                </li>
              </ul>
              <p className="text-slate leading-relaxed mt-4">
                To exercise any of these rights, contact us at{" "}
                <a
                  href="mailto:privacy@cognitron.tech"
                  className="text-gold-dark font-semibold hover:underline"
                >
                  privacy@cognitron.tech
                </a>
                . We will respond within 30 days.
              </p>
            </div>

            {/* 9. Cookies and Analytics */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 9
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Cookies and Analytics
              </h2>
              <p className="text-slate leading-relaxed">
                Our website uses cookies and similar technologies to:
              </p>
              <ul className="mt-4 space-y-2 text-slate text-sm leading-relaxed list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-navy">Essential cookies:</strong>{" "}
                    Maintain your session, remember login state, and ensure
                    the platform functions properly.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-navy">Analytics:</strong> We use
                    privacy-respecting analytics to understand how families
                    use our website, helping us improve the experience. We do
                    not use analytics to track individual children.
                  </span>
                </li>
              </ul>
              <p className="text-slate leading-relaxed mt-4">
                You can manage cookie preferences through your browser
                settings. Disabling essential cookies may affect the
                functionality of the platform.
              </p>
            </div>

            {/* 10. Changes to This Policy */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 10
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Changes to This Policy
              </h2>
              <p className="text-slate leading-relaxed">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or legal requirements. When we make
                material changes, we will notify you via email or a prominent
                notice on our website at least 14 days before the changes take
                effect. Your continued use of our services after the effective
                date constitutes acceptance of the updated policy.
              </p>
            </div>

            {/* 11. Contact */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 11
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Contact Us
              </h2>
              <p className="text-slate leading-relaxed">
                If you have questions, concerns, or requests regarding this
                Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-off-white rounded-xl p-6 border border-navy/5 mt-4">
                <p className="text-sm text-navy font-semibold">
                  Cognitron Technologies
                </p>
                <p className="text-sm text-slate mt-1">
                  Email:{" "}
                  <a
                    href="mailto:privacy@cognitron.tech"
                    className="text-gold-dark font-semibold hover:underline"
                  >
                    privacy@cognitron.tech
                  </a>
                </p>
                <p className="text-sm text-slate mt-1">Nairobi, Kenya</p>
              </div>
              <p className="text-slate leading-relaxed mt-4 text-sm">
                You also have the right to lodge a complaint with the{" "}
                <strong className="text-navy">
                  Office of the Data Protection Commissioner (ODPC)
                </strong>{" "}
                of Kenya if you believe your data protection rights have been
                violated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-navy text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Have questions about your data?
          </h2>
          <p className="mt-3 text-white/60">
            We&apos;re committed to transparency. Reach out and we&apos;ll
            respond within 30 days.
          </p>
          <a
            href="mailto:privacy@cognitron.tech"
            className="inline-flex items-center justify-center gap-2 mt-6 w-full sm:w-auto bg-gold text-navy px-6 sm:px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
          >
            Contact our privacy team
          </a>
        </div>
      </section>
    </>
  );
}
