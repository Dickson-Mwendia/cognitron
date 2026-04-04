import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: "Terms of Service | Cognitron",
  description:
    "Cognitron's terms of service. Rules governing use of our educational platform for children and teens in Nairobi, Kenya.",
};

export default function TermsOfServicePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Terms of Service
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            Please read these terms carefully before using Cognitron&apos;s
            services. They govern your relationship with us and your use of
            our platform.
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
            {/* 1. Service Description */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 1
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Service Description
              </h2>
              <p className="text-slate leading-relaxed">
                Cognitron Technologies (&quot;Cognitron,&quot; &quot;we,&quot;
                &quot;us,&quot; or &quot;our&quot;) provides a premium
                educational platform offering coding, artificial intelligence,
                and chess coaching to children and teens aged 5–17 in Nairobi,
                Kenya. Our services include:
              </p>
              <ul className="mt-4 space-y-2 text-slate text-sm leading-relaxed list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Live coaching sessions (in-home or online) in groups of
                    up to four students.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    A digital learning platform with progress tracking,
                    dashboards, and achievement systems.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Digital safety and cybersecurity services for families
                    and executives (Cognitron Protect).
                  </span>
                </li>
              </ul>
            </div>

            {/* 2. Eligibility */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 2
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Eligibility
              </h2>
              <p className="text-slate leading-relaxed">
                Our educational services are designed for children aged 5–17.
                The following eligibility requirements apply:
              </p>
              <div className="bg-off-white rounded-xl p-6 border border-navy/5 mt-4">
                <h3 className="font-bold text-navy text-base mb-3">
                  Parental Consent Required
                </h3>
                <p className="text-sm text-slate leading-relaxed">
                  Users under the age of 16 must have a parent or legal
                  guardian create and manage their account. By registering a
                  child, the parent or guardian confirms they have authority
                  to consent on the child&apos;s behalf, in accordance with
                  Section 33 of the Kenya Data Protection Act 2019.
                </p>
              </div>
              <ul className="mt-4 space-y-2 text-slate text-sm leading-relaxed list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Users aged 16–17 may register independently but are
                    encouraged to involve a parent or guardian.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Parent and coach accounts must be held by individuals aged
                    18 or older.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    We reserve the right to verify the age and identity of
                    account holders at any time.
                  </span>
                </li>
              </ul>
            </div>

            {/* 3. Account Responsibilities */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 3
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Account Responsibilities
              </h2>
              <p className="text-slate leading-relaxed mb-4">
                When you create an account with Cognitron, you agree to:
              </p>
              <ul className="space-y-2 text-slate text-sm leading-relaxed list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Provide accurate, current, and complete information during
                    registration and keep it updated.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Keep your login credentials secure and confidential. You
                    are responsible for all activity under your account.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Notify us immediately at{" "}
                    <a
                      href="mailto:legal@cognitron.tech"
                      className="text-gold-dark font-semibold hover:underline"
                    >
                      legal@cognitron.tech
                    </a>{" "}
                    if you suspect any unauthorised use of your account.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Not share your account with others or allow multiple
                    individuals to use a single account.
                  </span>
                </li>
              </ul>
              <p className="text-slate leading-relaxed mt-4">
                We reserve the right to suspend or terminate accounts that
                violate these responsibilities or that pose a risk to the
                security and well-being of other users.
              </p>
            </div>

            {/* 4. Acceptable Use */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 4
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Acceptable Use
              </h2>
              <p className="text-slate leading-relaxed mb-4">
                You agree to use Cognitron&apos;s platform and services only
                for lawful purposes and in a manner consistent with these
                Terms. You must not:
              </p>
              <ul className="space-y-2 text-slate text-sm leading-relaxed list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Use the platform to harass, bully, threaten, or harm any
                    user, including students, parents, and coaches.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Attempt to gain unauthorised access to other users&apos;
                    accounts, data, or any part of our systems.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Upload or transmit malicious code, viruses, or any
                    material that could disrupt the platform.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Use automated tools, bots, or scraping mechanisms to
                    access or extract data from the platform.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Reproduce, redistribute, or commercially exploit any
                    Cognitron content without written permission.
                  </span>
                </li>
              </ul>
              <p className="text-slate leading-relaxed mt-4">
                Violations may result in immediate suspension or termination
                of your account without prior notice.
              </p>
            </div>

            {/* 5. Intellectual Property */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 5
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Intellectual Property
              </h2>
              <p className="text-slate leading-relaxed">
                All content on the Cognitron platform — including but not
                limited to curriculum materials, lesson plans, branding,
                website design, software code, graphics, and text — is the
                intellectual property of Cognitron Technologies and is
                protected under Kenyan and international intellectual property
                laws.
              </p>
              <ul className="mt-4 space-y-2 text-slate text-sm leading-relaxed list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    You may not copy, modify, distribute, or create derivative
                    works from our content without prior written consent.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Students retain ownership of the projects, apps, and
                    creative works they build during sessions. Cognitron may
                    showcase anonymised examples with parental consent.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Feedback and suggestions you provide to us may be used to
                    improve our services without obligation to you.
                  </span>
                </li>
              </ul>
            </div>

            {/* 6. Payments and Refunds */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 6
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Payments and Refunds
              </h2>
              <p className="text-slate leading-relaxed">
                All fees are agreed upon during enrolment and are payable
                in advance. Specific payment terms, schedules, and refund
                policies will be communicated to you at the time of
                registration and are part of your individual enrolment
                agreement.
              </p>
              <ul className="mt-4 space-y-2 text-slate text-sm leading-relaxed list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Fees are non-refundable except where explicitly stated in
                    your enrolment agreement or required by law.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    We reserve the right to adjust pricing with 30 days&apos;
                    written notice before the start of a new billing cycle.
                  </span>
                </li>
              </ul>
            </div>

            {/* 7. Limitation of Liability */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 7
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Limitation of Liability
              </h2>
              <p className="text-slate leading-relaxed">
                To the maximum extent permitted by Kenyan law:
              </p>
              <ul className="mt-4 space-y-2 text-slate text-sm leading-relaxed list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Cognitron provides its services on an &quot;as is&quot;
                    and &quot;as available&quot; basis. We do not guarantee
                    specific educational outcomes or results.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    We shall not be liable for any indirect, incidental,
                    special, consequential, or punitive damages arising from
                    your use of or inability to use our services.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    Our total liability for any claim arising from these Terms
                    shall not exceed the total fees you have paid to Cognitron
                    in the 12 months preceding the claim.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    We are not liable for any loss or damage resulting from
                    events beyond our reasonable control, including but not
                    limited to internet failures, power outages, or force
                    majeure events.
                  </span>
                </li>
              </ul>
            </div>

            {/* 8. Termination */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 8
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Termination
              </h2>
              <p className="text-slate leading-relaxed">
                Either party may terminate the service relationship:
              </p>
              <ul className="mt-4 space-y-2 text-slate text-sm leading-relaxed list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-navy">By you:</strong> You may
                    cancel your account at any time by contacting us. Your
                    data will be handled in accordance with our{" "}
                    <Link
                      href="/privacy"
                      className="text-gold-dark font-semibold hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-navy">By Cognitron:</strong> We
                    may suspend or terminate your access if you violate these
                    Terms, fail to pay fees, or engage in conduct that we
                    reasonably believe harms other users or our platform.
                  </span>
                </li>
              </ul>
              <p className="text-slate leading-relaxed mt-4">
                Upon termination, your right to use the platform ceases
                immediately. Provisions that by their nature should survive
                termination (including intellectual property, limitation of
                liability, and governing law) will remain in effect.
              </p>
            </div>

            {/* 9. Governing Law */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 9
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Governing Law and Dispute Resolution
              </h2>
              <p className="text-slate leading-relaxed">
                These Terms are governed by and construed in accordance with
                the laws of the Republic of Kenya. Any disputes arising from
                or in connection with these Terms shall be resolved as
                follows:
              </p>
              <ul className="mt-4 space-y-2 text-slate text-sm leading-relaxed list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-navy">Informal resolution:</strong>{" "}
                    We encourage you to contact us first to resolve any
                    dispute amicably.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <span>
                    <strong className="text-navy">Jurisdiction:</strong> If
                    informal resolution fails, disputes shall be submitted to
                    the exclusive jurisdiction of the courts of Kenya, sitting
                    in Nairobi.
                  </span>
                </li>
              </ul>
            </div>

            {/* 10. Changes to These Terms */}
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Section 10
              </p>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Changes to These Terms
              </h2>
              <p className="text-slate leading-relaxed">
                We may update these Terms from time to time. When we make
                material changes, we will notify you via email or a prominent
                notice on our website at least 14 days before the changes take
                effect. Your continued use of our services after the effective
                date constitutes acceptance of the updated Terms. If you do
                not agree with the changes, you must stop using our services
                and close your account.
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
                If you have questions about these Terms of Service, please
                contact us:
              </p>
              <div className="bg-off-white rounded-xl p-6 border border-navy/5 mt-4">
                <p className="text-sm text-navy font-semibold">
                  Cognitron Technologies
                </p>
                <p className="text-sm text-slate mt-1">
                  Email:{" "}
                  <a
                    href="mailto:legal@cognitron.tech"
                    className="text-gold-dark font-semibold hover:underline"
                  >
                    legal@cognitron.tech
                  </a>
                </p>
                <p className="text-sm text-slate mt-1">Nairobi, Kenya</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-navy text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Questions about our terms?
          </h2>
          <p className="mt-3 text-white/60">
            We believe in transparency. If anything is unclear, reach out
            and we&apos;ll explain.
          </p>
          <a
            href="mailto:legal@cognitron.tech"
            className="inline-flex items-center justify-center gap-2 mt-6 w-full sm:w-auto bg-gold text-navy px-6 sm:px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
          >
            Contact our legal team
          </a>
        </div>
      </section>
    </>
  );
}
