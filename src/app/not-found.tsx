import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-off-white">
      <div className="text-center px-4">
        <p className="text-8xl font-bold text-gold mb-4">404</p>
        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
          Page not found
        </h1>
        <p className="text-slate text-lg max-w-md mx-auto mb-8">
          We couldn&apos;t find what you were looking for. It might have moved,
          or perhaps the URL has a typo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-gold text-navy px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border-2 border-navy text-navy px-8 py-3.5 rounded-full font-semibold hover:bg-navy hover:text-white transition-colors"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
