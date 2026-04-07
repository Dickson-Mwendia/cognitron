"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";

const academyLinks = [
  { href: "/academy/coding", label: "Coding & App Development" },
  { href: "/academy/ai", label: "AI for kids" },
  { href: "/academy/chess", label: "Chess & strategy" },
];

const protectLinks = [
  { href: "/protect/family", label: "Family Digital Safety" },
  { href: "/protect/executive", label: "Executive Cyber Protection" },
];

const aboutLinks = [
  { href: "/about", label: "About Cognitron" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [academyOpen, setAcademyOpen] = useState(false);
  const [protectOpen, setProtectOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <nav className="bg-navy text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Logo variant="full" size="md" on="dark" />
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
              href="/blog"
              className="text-sm font-medium hover:text-gold transition-colors"
            >
              Blog
            </Link>

            {/* About Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <Link
                href="/about"
                className="flex items-center gap-1 text-sm font-medium hover:text-gold transition-colors py-5"
              >
                About <ChevronDown className="w-3 h-3" />
              </Link>
              {aboutOpen && (
                <div className="absolute top-full left-0 bg-white text-navy rounded-lg shadow-xl py-2 min-w-[200px]">
                  {aboutLinks.map((link) => (
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
              href="/login"
              className="text-sm font-medium hover:text-gold transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/contact"
              className="bg-gold text-navy px-5 py-2 rounded-full text-sm font-semibold hover:bg-gold-light transition-colors"
            >
              Get Started
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
      <div
        className={`md:hidden bg-navy-light border-t border-white/10 px-4 overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[calc(100dvh-4rem)] pb-4 opacity-100" : "max-h-0 pb-0 opacity-0"
        }`}
      >
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
              href="/blog"
              className="block py-2 text-sm hover:text-gold"
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>
          </div>
          <div className="py-3 border-t border-white/10">
            <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-2">
              About
            </p>
            {aboutLinks.map((link) => (
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
          <div className="flex gap-3 mt-3">
            <Link
              href="/login"
              className="flex-1 text-center border border-white/30 text-white px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="/contact"
              className="flex-1 text-center bg-gold text-navy px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-gold-light transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
    </nav>
  );
}
