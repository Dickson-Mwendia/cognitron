"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-off-white">
      <div className="text-center px-4">
        <div className="w-20 h-20 rounded-full bg-navy/10 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-navy"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
          Something went wrong
        </h1>
        <p className="text-slate text-lg max-w-md mx-auto mb-8">
          We hit an unexpected error. Please try again, or reach out to us on
          WhatsApp if this keeps happening.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center bg-gold text-navy px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
          >
            Try again
          </button>
          <a
            href="https://wa.me/254710643847?text=Hi%2C%20I%20encountered%20an%20error%20on%20the%20Cognitron%20website"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border-2 border-navy text-navy px-8 py-3.5 rounded-full font-semibold hover:bg-navy hover:text-white transition-colors"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
