"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { rateLimit } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";

// --- Helpers ---

/** Strip HTML tags to prevent stored XSS */
function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "");
}

// --- Zod Schema ---

const contactFormSchema = z.object({
  name: z
    .string()
    .transform((v) => stripHtml(v.trim()))
    .pipe(z.string().min(2, "Name is required (at least 2 characters).")),
  phone: z
    .string()
    .transform((v) => v.trim())
    .pipe(z.string().min(8, "A valid phone number is required.")),
  email: z
    .string()
    .email("Please provide a valid email address.")
    .optional()
    .or(z.literal("")),
  childAge: z
    .string()
    .transform((v) => v.trim())
    .optional()
    .or(z.literal("")),
  interest: z
    .string()
    .transform((v) => v.trim())
    .optional()
    .or(z.literal("")),
  format: z
    .string()
    .transform((v) => v.trim())
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .transform((v) => stripHtml(v.trim()))
    .optional()
    .or(z.literal("")),
});

// --- Types ---

type ContactFormInput = z.input<typeof contactFormSchema>;

interface ContactFormResult {
  success: boolean;
  message: string;
}

// --- Server Action ---

export async function submitContactForm(
  data: ContactFormInput
): Promise<ContactFormResult> {
  // Rate limiting — 5 submissions per minute per IP
  try {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headersList.get("x-real-ip") ??
      "unknown";
    const limiter = rateLimit(`contact:${ip}`, {
      windowSeconds: 60,
      maxRequests: 5,
    });
    if (!limiter.success) {
      return {
        success: false,
        message:
          "Too many submissions. Please wait a minute and try again.",
      };
    }
  } catch {
    // If headers() fails (e.g. in tests), skip rate limiting
  }

  // Validate with Zod
  const parsed = contactFormSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid input.";
    return { success: false, message: firstError };
  }

  try {
    // Attempt to persist to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = await createClient();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from("contact_submissions").insert({
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        child_age: parsed.data.childAge || null,
        interest: parsed.data.interest || null,
        format: parsed.data.format || null,
        message: parsed.data.message || null,
      });

      if (error) {
        console.error("Supabase insert error:", error.message);
        return {
          success: false,
          message:
            "Something went wrong. Please try again or WhatsApp us directly.",
        };
      }
    } else {
      // Dev mode — no Supabase configured, log to console
      console.log("=== NEW CONTACT FORM SUBMISSION ===");
      console.log(JSON.stringify(parsed.data, null, 2));
      console.log("===================================");
    }

    return {
      success: true,
      message: "Thank you! We'll reach out within 2 hours via WhatsApp.",
    };
  } catch {
    console.error("Contact form error: failed to process submission");
    return {
      success: false,
      message: "Something went wrong. Please try again or WhatsApp us directly.",
    };
  }
}
