"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const academyLinks = [
  { href: "/academy/coding", label: "Coding & App Development" },
  { href: "/academy/ai", label: "AI for kids" },
  { href: "/academy/chess", label: "Chess & strategy" },
];

const protectLinks = [
  { href: "/protect/family", label: "Family Digital Safety" },
  { href: "/protect/executive", label: "Executive Cyber Protection" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [academyOpen, setAcademyOpen] = useState(false);
  const [protectOpen, setProtectOpen] = useState(false);

  return (
    <nav className="bg-navy text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-gold">C</span>ognitron
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {/* Academy Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setAcademyOpen(true)}
              onMouseLeave={() => setAcademyOpen(false)}
            >
              <Link
                href="/academy"
                className="flex items-center gap-1 text-sm font-medium hover:text-gold transition-colors py-5"
              >
                Academy <ChevronDown className="w-3 h-3" />
              </Link>
              {academyOpen && (
                <div className="absolute top-full left-0 bg-white text-navy rounded-lg shadow-xl py-2 min-w-[240px]">
                  {academyLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm hover:bg-off-white hover:text-gold-dark transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Protect Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setProtectOpen(true)}
              onMouseLeave={() => setProtectOpen(false)}
            >
              <Link
                href="/protect"
                className="flex items-center gap-1 text-sm font-medium hover:text-gold transition-colors py-5"
              >
                Protect <ChevronDown className="w-3 h-3" />
              </Link>
              {protectOpen && (
                <div className="absolute top-full left-0 bg-white text-navy rounded-lg shadow-xl py-2 min-w-[240px]">
                  {protectLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm hover:bg-off-white hover:text-gold-dark transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/how-it-works"
              className="text-sm font-medium hover:text-gold transition-colors"
            >
              How it works
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium hover:text-gold transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-gold transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="bg-gold text-navy px-5 py-2 rounded-full text-sm font-semibold hover:bg-gold-light transition-colors"
            >
              Book a consultation
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-light border-t border-white/10 px-4 pb-4 max-h-[calc(100dvh-4rem)] overflow-y-auto">
          <div className="py-3">
            <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-2">
              Academy
            </p>
            {academyLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 pl-3 text-sm text-white/80 hover:text-gold"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="py-3 border-t border-white/10">
            <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-2">
              Protect
            </p>
            {protectLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 pl-3 text-sm text-white/80 hover:text-gold"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="py-3 border-t border-white/10 space-y-2">
            <Link
              href="/how-it-works"
              className="block py-2 text-sm hover:text-gold"
              onClick={() => setMobileOpen(false)}
            >
              How it works
            </Link>
            <Link
              href="/pricing"
              className="block py-2 text-sm hover:text-gold"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="block py-2 text-sm hover:text-gold"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
          </div>
          <Link
            href="/contact"
            className="block mt-3 text-center bg-gold text-navy px-5 py-2.5 rounded-full text-sm font-semibold"
            onClick={() => setMobileOpen(false)}
          >
            Book a consultation
          </Link>
        </div>
      )}
    </nav>
  );
}
