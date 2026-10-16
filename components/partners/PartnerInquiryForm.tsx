"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
  Mail,
  ShieldCheck,
} from "lucide-react";

const PARTNERSHIP_TIERS = [
  "Gold Tier Sponsor (₹50,000)",
  "Silver Tier Sponsor (₹25,000)",
  "Bronze Tier Sponsor (₹10,000)",
  "Academic MoU / Campus Venue Partner",
  "Community & Technical Ally",
  "Custom Corporate / Hiring Sponsorship",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function PartnerInquiryForm() {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    tier: "Gold Tier Sponsor (₹50,000)",
    portfolio: "",
    message: "",
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

    if (!formData.company.trim()) {
      errors.company = "Please enter your organization or company name.";
    }

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Please enter the primary contact name (at least 2 characters).";
    }

    if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = "Please enter a valid official work email address.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Please provide details regarding your collaboration goals (at least 10 characters).";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (loading) return;

    setErrorMessage("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "partner",
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          company: formData.company.trim(),
          tier: formData.tier,
          portfolio: formData.portfolio.trim(),
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
        setErrorMessage("Network error: Unable to connect to the server. Please check your internet connection and try again.");
      } else {
        setErrorMessage(err.message || "An unexpected error occurred while submitting your proposal.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-12 rounded-surface bg-white border border-[#D1D5DB] shadow-elevation-1 text-center">
        <div className="w-14 h-14 rounded-full bg-green-50 text-google-green flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-display font-bold text-ink-primary mb-2">
          Partnership Proposal Received!
        </h3>
        <p className="text-sm text-ink-secondary font-sans leading-relaxed max-w-lg mx-auto mb-6">
          Thank you for reaching out on behalf of <strong className="text-ink-primary">{formData.company}</strong>. Our partnerships lead will review your inquiry for <strong className="text-ink-primary">{formData.tier}</strong> and respond directly to <strong className="text-ink-primary">{formData.email}</strong> with an official prospectus and schedule.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              company: "",
              name: "",
              email: "",
              phone: "",
              tier: "Gold Tier Sponsor (₹50,000)",
              portfolio: "",
              message: "",
              hp_field: "",
            });
            setFieldErrors({});
          }}
          className="px-5 py-2.5 rounded-control text-xs font-semibold uppercase bg-[#F1F3F4] text-google-blue hover:bg-blue-50 border border-[#D1D5DB] transition-colors cursor-pointer"
        >
          Submit Another Proposal
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 rounded-surface bg-white border border-[#D1D5DB] shadow-elevation-1">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-google-blue flex items-center justify-center">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-ink-primary">
            Partnership & Sponsorship Inquiries
          </h3>
          <p className="text-xs text-ink-secondary font-sans">
            Directly transmitted to the ML Bhopal Executive Committee
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Failure State Banner */}
        {errorMessage && (
          <div
            role="alert"
            aria-live="polite"
            className="p-4 rounded-control bg-red-50 border border-red-200 flex items-center gap-3 text-google-red text-xs font-medium"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Spam Protection Honeypot Field */}
        <div
          aria-hidden="true"
          style={{ display: "none", position: "absolute", left: "-9999px" }}
        >
          <label htmlFor="partner-hp">Do not fill this field</label>
          <input
            type="text"
            id="partner-hp"
            name="hp_field"
            tabIndex={-1}
            value={formData.hp_field}
            onChange={(e) => setFormData({ ...formData, hp_field: e.target.value })}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Organization / Company Name */}
          <div>
            <label
              htmlFor="partner-company"
              className="text-xs font-semibold uppercase tracking-wider text-ink-secondary block mb-1.5"
            >
              Organization / Company <span className="text-google-red">*</span>
            </label>
            <input
              id="partner-company"
              type="text"
              required
              aria-required="true"
              aria-invalid={Boolean(fieldErrors.company)}
              aria-describedby={fieldErrors.company ? "partner-company-error" : undefined}
              value={formData.company}
              onChange={(e) => {
                setFormData({ ...formData, company: e.target.value });
                if (fieldErrors.company) setFieldErrors({ ...fieldErrors, company: "" });
              }}
              placeholder="e.g. Acme AI Labs / LNCT Group"
              className={`w-full px-4 py-2.5 rounded-control bg-white border text-ink-primary text-base sm:text-sm focus:outline-none transition-colors placeholder:text-ink-disabled ${
                fieldErrors.company
                  ? "border-google-red focus:border-google-red"
                  : "border-[#D1D5DB] focus:border-google-blue focus:ring-1 focus:ring-google-blue"
              }`}
            />
            {fieldErrors.company && (
              <span id="partner-company-error" className="text-xs text-google-red mt-1 block">
                {fieldErrors.company}
              </span>
            )}
          </div>

          {/* Contact Person Name */}
          <div>
            <label
              htmlFor="partner-name"
              className="text-xs font-semibold uppercase tracking-wider text-ink-secondary block mb-1.5"
            >
              Contact Person <span className="text-google-red">*</span>
            </label>
            <input
              id="partner-name"
              type="text"
              required
              aria-required="true"
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "partner-name-error" : undefined}
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: "" });
              }}
              placeholder="e.g. Alex Sharma (Head of Talent)"
              className={`w-full px-4 py-2.5 rounded-control bg-white border text-ink-primary text-base sm:text-sm focus:outline-none transition-colors placeholder:text-ink-disabled ${
                fieldErrors.name
                  ? "border-google-red focus:border-google-red"
                  : "border-[#D1D5DB] focus:border-google-blue focus:ring-1 focus:ring-google-blue"
              }`}
            />
            {fieldErrors.name && (
              <span id="partner-name-error" className="text-xs text-google-red mt-1 block">
                {fieldErrors.name}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Work Email */}
          <div>
            <label
              htmlFor="partner-email"
              className="text-xs font-semibold uppercase tracking-wider text-ink-secondary block mb-1.5"
            >
              Work Email Address <span className="text-google-red">*</span>
            </label>
            <input
              id="partner-email"
              type="email"
              required
              aria-required="true"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "partner-email-error" : undefined}
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
              }}
              placeholder="partnerships@company.com"
              className={`w-full px-4 py-2.5 rounded-control bg-white border text-ink-primary text-base sm:text-sm focus:outline-none transition-colors placeholder:text-ink-disabled ${
                fieldErrors.email
                  ? "border-google-red focus:border-google-red"
                  : "border-[#D1D5DB] focus:border-google-blue focus:ring-1 focus:ring-google-blue"
              }`}
            />
            {fieldErrors.email && (
              <span id="partner-email-error" className="text-xs text-google-red mt-1 block">
                {fieldErrors.email}
              </span>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="partner-phone"
              className="text-xs font-semibold uppercase tracking-wider text-ink-secondary block mb-1.5"
            >
              Phone / WhatsApp (Optional)
            </label>
            <input
              id="partner-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-2.5 rounded-control bg-white border border-[#D1D5DB] text-ink-primary text-base sm:text-sm focus:outline-none focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-colors placeholder:text-ink-disabled"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Partnership Tier / Model */}
          <div>
            <label
              htmlFor="partner-tier"
              className="text-xs font-semibold uppercase tracking-wider text-ink-secondary block mb-1.5"
            >
              Partnership Interest <span className="text-google-red">*</span>
            </label>
            <select
              id="partner-tier"
              value={formData.tier}
              onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
              className="w-full px-4 py-2.5 rounded-control bg-white border border-[#D1D5DB] text-ink-primary text-base sm:text-sm focus:outline-none focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-colors"
            >
              {PARTNERSHIP_TIERS.map((tierOption) => (
                <option key={tierOption} value={tierOption}>
                  {tierOption}
                </option>
              ))}
            </select>
          </div>

          {/* Website / LinkedIn */}
          <div>
            <label
              htmlFor="partner-portfolio"
              className="text-xs font-semibold uppercase tracking-wider text-ink-secondary block mb-1.5"
            >
              Website or LinkedIn URL
            </label>
            <input
              id="partner-portfolio"
              type="url"
              value={formData.portfolio}
              onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
              placeholder="https://company.com"
              className="w-full px-4 py-2.5 rounded-control bg-white border border-[#D1D5DB] text-ink-primary text-base sm:text-sm focus:outline-none focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-colors placeholder:text-ink-disabled"
            />
          </div>
        </div>

        {/* Message / Objectives */}
        <div>
          <label
            htmlFor="partner-message"
            className="text-xs font-semibold uppercase tracking-wider text-ink-secondary block mb-1.5"
          >
            Collaboration Scope & Goals <span className="text-google-red">*</span>
          </label>
          <textarea
            id="partner-message"
            rows={3}
            required
            aria-required="true"
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "partner-message-error" : undefined}
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
              if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: "" });
            }}
            placeholder="Tell us about your organization's sponsorship goals, target developer audience, campus MoU plans, or speaker recommendations..."
            className={`w-full px-4 py-2.5 rounded-control bg-white border text-ink-primary text-base sm:text-sm focus:outline-none transition-colors placeholder:text-ink-disabled resize-none ${
              fieldErrors.message
                ? "border-google-red focus:border-google-red"
                : "border-[#D1D5DB] focus:border-google-blue focus:ring-1 focus:ring-google-blue"
            }`}
          />
          {fieldErrors.message && (
            <span id="partner-message-error" className="text-xs text-google-red mt-1 block">
              {fieldErrors.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-control text-sm font-semibold tracking-wide text-white bg-google-blue hover:bg-google-blue-hover shadow-elevation-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transmitting Proposal...</span>
              </>
            ) : (
              <>
                <span>Transmit Partnership Proposal</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between text-xs text-ink-secondary pt-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-google-green" />
            <span>Encrypted dispatch directly to organizers</span>
          </div>
          <span>Typical response: 24–48 hours</span>
        </div>
      </form>
    </div>
  );
}
