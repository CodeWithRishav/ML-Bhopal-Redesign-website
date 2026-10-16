"use client";

import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const TOPICS = [
  "General Community Question",
  "Speaker & Workshop Nomination",
  "Event Sponsorship & Partnering",
  "Hackathon & CTF Collaboration",
  "College Chapter MoU Inquiry",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Community Question",
    message: "",
    // Honeypot field for bot protection
    hp_field: "",
  });

  const [mountTime, setMountTime] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMountTime(Date.now());
  }, []);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Please enter your full name (at least 2 characters).";
    }

    if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Please enter a message with at least 10 characters.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (loading) return;

    setErrorMessage("");

    // Client-side validation check
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: formData.subject,
          message: formData.message.trim(),
          hp_field: formData.hp_field,
          _submittedAt: mountTime,
        }),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        throw new Error(data.error || `Server responded with status ${res.status}.`);
      }

      setSubmitted(true);
    } catch (err: any) {
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setErrorMessage("Network error: Unable to reach server. Please check your internet connection and try again.");
      } else {
        setErrorMessage(err.message || "An unexpected error occurred while dispatching your message.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 rounded-surface bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-elevation-1">
      {submitted ? (
        <div className="text-center py-10">
          <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-950/40 text-google-green flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] mb-2">
            Message Dispatched Successfully!
          </h3>
          <p className="text-sm text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed max-w-md mx-auto mb-6">
            Thank you, <strong className="text-ink-primary dark:text-white">{formData.name}</strong>. Your message regarding &ldquo;{formData.subject}&rdquo; has been securely forwarded to ML Bhopal organizers. We will review and reply to <strong className="text-ink-primary dark:text-white">{formData.email}</strong> shortly.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "General Community Question",
                message: "",
                hp_field: "",
              });
              setFieldErrors({});
            }}
            className="px-5 py-2.5 rounded-control text-xs font-semibold uppercase bg-[#F1F3F4] dark:bg-[#334155] text-google-blue dark:text-[#60A5FA] hover:bg-blue-50 dark:hover:bg-[#334155] border border-[#D1D5DB] dark:border-[#5F6368] transition-colors cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Failure Alert Banner */}
          {errorMessage && (
            <div
              role="alert"
              aria-live="polite"
              className="p-4 rounded-control bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 flex items-center gap-3 text-google-red text-xs font-medium"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Honeypot Spam Trap (Hidden from real users) */}
          <div
            aria-hidden="true"
            style={{ display: "none", position: "absolute", left: "-9999px" }}
          >
            <label htmlFor="contact-hp">Do not fill this field</label>
            <input
              type="text"
              id="contact-hp"
              name="hp_field"
              tabIndex={-1}
              value={formData.hp_field}
              onChange={(e) => setFormData({ ...formData, hp_field: e.target.value })}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label
                htmlFor="contact-name"
                className="text-xs font-semibold uppercase tracking-wider text-ink-secondary dark:text-[#94A3B8] block mb-1.5"
              >
                Full Name <span className="text-google-red">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                aria-required="true"
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? "name-error" : undefined}
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: "" });
                }}
                placeholder="e.g. Priyanshu Sharma"
                className={`w-full px-4 py-2.5 rounded-control bg-white dark:bg-[#0F172A] border text-ink-primary dark:text-[#F8FAFC] text-base sm:text-sm focus:outline-none transition-colors placeholder:text-ink-disabled ${
                  fieldErrors.name
                    ? "border-google-red focus:border-google-red"
                    : "border-[#D1D5DB] dark:border-[#334155] focus:border-google-blue focus:ring-1 focus:ring-google-blue"
                }`}
              />
              {fieldErrors.name && (
                <span id="name-error" className="text-xs text-google-red mt-1 block">
                  {fieldErrors.name}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="contact-email"
                className="text-xs font-semibold uppercase tracking-wider text-ink-secondary dark:text-[#94A3B8] block mb-1.5"
              >
                Email Address <span className="text-google-red">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                required
                aria-required="true"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
                }}
                placeholder="priyanshu@example.com"
                className={`w-full px-4 py-2.5 rounded-control bg-white dark:bg-[#0F172A] border text-ink-primary dark:text-[#F8FAFC] text-base sm:text-sm focus:outline-none transition-colors placeholder:text-ink-disabled ${
                  fieldErrors.email
                    ? "border-google-red focus:border-google-red"
                    : "border-[#D1D5DB] dark:border-[#334155] focus:border-google-blue focus:ring-1 focus:ring-google-blue"
                }`}
              />
              {fieldErrors.email && (
                <span id="email-error" className="text-xs text-google-red mt-1 block">
                  {fieldErrors.email}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone (Optional) */}
            <div>
              <label
                htmlFor="contact-phone"
                className="text-xs font-semibold uppercase tracking-wider text-ink-secondary dark:text-[#94A3B8] block mb-1.5"
              >
                Phone / WhatsApp (Optional)
              </label>
              <input
                id="contact-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-control bg-white dark:bg-[#0F172A] border border-[#D1D5DB] dark:border-[#334155] text-ink-primary dark:text-[#F8FAFC] text-base sm:text-sm focus:outline-none focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-colors placeholder:text-ink-disabled"
              />
            </div>

            {/* Subject Topic */}
            <div>
              <label
                htmlFor="contact-subject"
                className="text-xs font-semibold uppercase tracking-wider text-ink-secondary dark:text-[#94A3B8] block mb-1.5"
              >
                Topic / Inquiry Type <span className="text-google-red">*</span>
              </label>
              <select
                id="contact-subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-control bg-white dark:bg-[#0F172A] border border-[#D1D5DB] dark:border-[#334155] text-ink-primary dark:text-[#F8FAFC] text-base sm:text-sm focus:outline-none focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-colors"
              >
                {TOPICS.map((topic, i) => (
                  <option key={i} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="contact-message"
              className="text-xs font-semibold uppercase tracking-wider text-ink-secondary dark:text-[#94A3B8] block mb-1.5"
            >
              Message & Details <span className="text-google-red">*</span>
            </label>
            <textarea
              id="contact-message"
              rows={4}
              required
              aria-required="true"
              aria-invalid={Boolean(fieldErrors.message)}
              aria-describedby={fieldErrors.message ? "message-error" : undefined}
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: "" });
              }}
              placeholder="Tell us about your proposal, question, or talk topic..."
              className={`w-full px-4 py-2.5 rounded-control bg-white dark:bg-[#0F172A] border text-ink-primary dark:text-[#F8FAFC] text-base sm:text-sm focus:outline-none transition-colors placeholder:text-ink-disabled resize-none ${
                fieldErrors.message
                  ? "border-google-red focus:border-google-red"
                  : "border-[#D1D5DB] dark:border-[#334155] focus:border-google-blue focus:ring-1 focus:ring-google-blue"
              }`}
            />
            {fieldErrors.message && (
              <span id="message-error" className="text-xs text-google-red mt-1 block">
                {fieldErrors.message}
              </span>
            )}
          </div>

          {/* Submit Button with Loading & Double Submission Protection */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-control text-sm font-semibold tracking-wide text-white bg-google-blue hover:bg-google-blue-hover shadow-elevation-1 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Dispatching Message...</span>
              </>
            ) : (
              <>
                <span>Send Message to Leadership</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
