"use client";

import { useState, type FormEvent } from "react";
import { submitContactForm } from "@/app/(marketing)/contact/actions";
import { trackEvent } from "@/components/analytics-utils";

interface FormData {
  name: string;
  phone: string;
  email: string;
  childAge: string;
  interest: string;
  format: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

const initialFormData: FormData = {
  name: "",
  phone: "",
  email: "",
  childAge: "",
  interest: "",
  format: "",
  message: "",
};

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!data.phone.trim() || data.phone.trim().length < 8) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  return errors;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    setErrors({});

    try {
      const result = await submitContactForm(formData);

      if (!result.success) {
        setStatus("error");
        setServerMessage(result.message);
        return;
      }

      setStatus("success");
      setServerMessage(result.message);
      setFormData(initialFormData);
      trackEvent("form_submit", { form: "contact", interest: formData.interest });
    } catch {
      setStatus("error");
      setServerMessage(
        "Could not reach our server. Please WhatsApp us directly at +254 710 643 847."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-navy mb-2">You&apos;re all set!</h3>
        <p className="text-slate text-sm leading-relaxed">{serverMessage}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-gold-dark font-semibold hover:underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-navy mb-1.5">
          Your name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-navy/10 bg-off-white text-navy text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          placeholder="Full name"
        />
        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-navy mb-1.5">
          WhatsApp / Phone number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-navy/10 bg-off-white text-navy text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          placeholder="+254 7XX XXX XXX"
        />
        {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-navy/10 bg-off-white text-navy text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          placeholder="you@example.com"
        />
        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="childAge" className="block text-sm font-medium text-navy mb-1.5">
            Child&apos;s age
          </label>
          <input
            type="number"
            id="childAge"
            name="childAge"
            min={6}
            max={17}
            value={formData.childAge}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-navy/10 bg-off-white text-navy text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
            placeholder="e.g. 10"
          />
        </div>
        <div>
          <label htmlFor="interest" className="block text-sm font-medium text-navy mb-1.5">
            Interested in
          </label>
          <select
            id="interest"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-navy/10 bg-off-white text-navy text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          >
            <option value="">Select a track</option>
            <option value="coding">Coding &amp; Apps</option>
            <option value="ai">AI &amp; Machine Learning</option>
            <option value="chess">Chess &amp; Strategy</option>
            <option value="multiple">Multiple tracks</option>
            <option value="not-sure">Not sure yet</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="format" className="block text-sm font-medium text-navy mb-1.5">
          Preferred format
        </label>
        <select
          id="format"
          name="format"
          value={formData.format}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-navy/10 bg-off-white text-navy text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
        >
          <option value="">Select format</option>
          <option value="home">Home coaching (Nairobi)</option>
          <option value="online">Live online</option>
          <option value="hybrid">Mix of both</option>
          <option value="not-sure">Not sure yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-navy mb-1.5">
          Anything else? (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-navy/10 bg-off-white text-navy text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
          placeholder="Your child's experience level, school, specific interests..."
        />
      </div>

      {status === "error" && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {serverMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-gold text-navy py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending…" : "Book our free trial lesson"}
      </button>

      <p className="text-xs text-slate text-center">
        Most families hear back within 2 hours. No spam, ever.
      </p>
    </form>
  );
}
