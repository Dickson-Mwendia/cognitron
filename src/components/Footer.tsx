import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="text-gold">C</span>ognitron
            </Link>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Building Sharper Minds.
              <br />
              Safer Futures.
            </p>
          </div>

          {/* Academy */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gold mb-4">
              Academy
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/academy/coding"
                  className="text-sm text-white/70 hover:text-gold transition-colors"
                >
                  Coding & App Development
                </Link>
              </li>
              <li>
                <Link
                  href="/academy/ai"
                  className="text-sm text-white/70 hover:text-gold transition-colors"
                >
                  AI for Kids
                </Link>
              </li>
              <li>
                <Link
                  href="/academy/chess"
                  className="text-sm text-white/70 hover:text-gold transition-colors"
                >
                  Chess & Strategy
                </Link>
              </li>
            </ul>
          </div>

          {/* Protect */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gold mb-4">
              Protect
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/protect/family"
                  className="text-sm text-white/70 hover:text-gold transition-colors"
                >
                  Family Digital Safety
                </Link>
              </li>
              <li>
                <Link
                  href="/protect/executive"
                  className="text-sm text-white/70 hover:text-gold transition-colors"
                >
                  Executive Cyber Protection
                </Link>
              </li>
            </ul>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gold mb-4 mt-8">
              Company
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/70 hover:text-gold transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-white/70 hover:text-gold transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-white/70 hover:text-gold transition-colors"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gold mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="w-4 h-4 text-gold" />
                hello@cognitron.tech
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="w-4 h-4 text-gold" />
                +254 700 000 000
              </li>
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="w-4 h-4 text-gold mt-0.5" />
                Nairobi, Kenya
              </li>
            </ul>
            <Link
              href="/contact"
              className="inline-block mt-6 bg-gold text-navy px-5 py-2 rounded-full text-sm font-semibold hover:bg-gold-light transition-colors"
            >
              Book a Consultation
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} Cognitron Technologies. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
