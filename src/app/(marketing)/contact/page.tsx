import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Trial Lesson | Cognitron | Nairobi Kids Coding & Chess",
  description:
    "Book your child's free first coding, AI, or chess lesson with Cognitron in Nairobi. WhatsApp us on +254 710 643 847. Home coaching or online.",
  openGraph: {
    title: "Book a Free Trial Lesson | Cognitron",
    description:
      "Book your child's free first coding, AI, or chess lesson in Nairobi. Home coaching or online. WhatsApp +254 710 643 847.",
    url: "https://cognitron.tech/contact",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Book your child&apos;s{" "}
            <span className="text-gold">free first lesson</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            Your child tries a real session - coding, AI, or chess - with
            zero commitment. If they love it, we&apos;ll build their learning
            plan together. Most families hear back within 2 hours.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-2">
                Tell us about your child
              </h2>
              <p className="text-slate text-sm mb-6">
                We&apos;ll match them with the right track and coach.
              </p>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">
                Or reach out directly
              </h2>

              {/* WhatsApp Prominent */}
              <a
                href="https://wa.me/254710643847?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20trial%20lesson%20for%20my%20child"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#25D366]/10 border border-[#25D366]/20 rounded-xl p-5 hover:bg-[#25D366]/15 transition-colors mb-6"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-navy">
                    WhatsApp us - fastest response
                  </p>
                  <p className="text-sm text-slate">+254 710 643 847</p>
                  <p className="text-xs text-[#25D366] font-medium mt-0.5">
                    Tap to chat with Dickson directly →
                  </p>
                </div>
              </a>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-gold-dark" />
                  </div>
                  <div>
                    <p className="font-medium text-navy">Call us</p>
                    <p className="text-sm text-slate">+254 710 643 847</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-gold-dark" />
                  </div>
                  <div>
                    <p className="font-medium text-navy">Email</p>
                    <p className="text-sm text-slate">hello@cognitron.tech</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gold-dark" />
                  </div>
                  <div>
                    <p className="font-medium text-navy">Nairobi, Kenya</p>
                    <p className="text-xs text-slate mt-0.5">
                      Home coaching available across Nairobi
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="mt-8 bg-off-white rounded-xl p-6 border border-navy/5">
                <h3 className="font-bold text-navy mb-3">Coaching hours</h3>
                <div className="space-y-1.5 text-sm text-slate">
                  <div className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span className="text-navy font-medium">
                      3:00 PM – 7:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-navy font-medium">
                      9:00 AM – 5:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-navy font-medium">
                      10:00 AM – 2:00 PM
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-light mt-3">
                  Enquiries answered 7 days a week via WhatsApp
                </p>
              </div>

              {/* What to Expect */}
              <div className="mt-6 bg-navy rounded-xl p-6 text-white">
                <h3 className="font-bold mb-3">What happens next?</h3>
                <ol className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">1.</span>
                    We reply within 2 hours to schedule the trial
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">2.</span>
                    Your child tries a real session - free, no strings
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">3.</span>
                    If they love it, we build a personalised learning plan
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
