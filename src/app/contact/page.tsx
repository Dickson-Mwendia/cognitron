import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Cognitron",
  description:
    "Book a free consultation or get in touch with the Cognitron team. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Let&apos;s <span className="text-gold">Talk</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            Ready to invest in your child&apos;s future or protect your
            family&apos;s digital life? Book a free consultation or reach out
            directly.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">
                Book a free consultation
              </h2>
              <form className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-navy mb-1.5"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-navy/10 bg-off-white text-navy text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-navy mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-navy/10 bg-off-white text-navy text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-navy mb-1.5"
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 rounded-lg border border-navy/10 bg-off-white text-navy text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="+254 7XX XXX XXX"
                  />
                </div>
                <div>
                  <label
                    htmlFor="interest"
                    className="block text-sm font-medium text-navy mb-1.5"
                  >
                    I&apos;m interested in
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    className="w-full px-4 py-3 rounded-lg border border-navy/10 bg-off-white text-navy text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  >
                    <option value="">Select an option</option>
                    <option value="coding">Coding & app development</option>
                    <option value="ai">AI for kids</option>
                    <option value="chess">Chess & strategy</option>
                    <option value="family-protect">
                      Family Digital Safety
                    </option>
                    <option value="exec-protect">
                      Executive Cyber Protection
                    </option>
                    <option value="platinum">
                      Platinum (Academy + Protect)
                    </option>
                    <option value="other">Other / not sure</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-navy mb-1.5"
                  >
                    Message (optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-navy/10 bg-off-white text-navy text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                    placeholder="Tell us about your child or your needs..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold text-navy py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
                >
                  Book my free consultation
                </button>
                <p className="text-xs text-slate text-center">
                  We&apos;ll respond within 24 hours. No spam, ever.
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">
                Get in touch directly
              </h2>
              <div className="space-y-6">
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
                    <Phone className="w-5 h-5 text-gold-dark" />
                  </div>
                  <div>
                    <p className="font-medium text-navy">Phone</p>
                    <p className="text-sm text-slate">+254 700 000 000</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-gold-dark" />
                  </div>
                  <div>
                    <p className="font-medium text-navy">WhatsApp</p>
                    <p className="text-sm text-slate">+254 700 000 000</p>
                    <p className="text-xs text-slate-light mt-0.5">
                      Chat with us directly for the fastest response
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gold-dark" />
                  </div>
                  <div>
                    <p className="font-medium text-navy">Location</p>
                    <p className="text-sm text-slate">
                      Nairobi, Kenya
                    </p>
                    <p className="text-xs text-slate-light mt-0.5">
                      Online-first with home coaching across Nairobi
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="mt-10 bg-off-white rounded-xl p-6 border border-navy/5">
                <h3 className="font-bold text-navy mb-3">Office hours</h3>
                <div className="space-y-1.5 text-sm text-slate">
                  <div className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span className="text-navy font-medium">
                      8:00 AM – 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-navy font-medium">
                      9:00 AM – 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-slate-light">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
