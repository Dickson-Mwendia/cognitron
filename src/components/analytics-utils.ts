export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";
export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || "XXXXXXXXXX";

/* ---------- Type declarations ---------- */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/* ---------- Google Analytics helpers ---------- */

export function gtagPageView(url: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
  }
}

export function gtagEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
}

/* ---------- Meta Pixel helpers ---------- */

export function fbqTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, params);
  }
}

/* ---------- Unified event tracker ---------- */

/**
 * Track a custom event across all analytics platforms.
 * Use for: form_submit, whatsapp_click, cta_click, etc.
 */
export function trackEvent(
  eventName: "form_submit" | "whatsapp_click" | "cta_click" | (string & {}),
  params?: Record<string, unknown>
) {
  gtagEvent(eventName, params);
  fbqTrack(eventName, params);
}
