"use client";

import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface AmbassadorFormProps {
  initialCollege?: string;
}

export function AmbassadorForm({ initialCollege = "" }: AmbassadorFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: initialCollege,
    branch: "",
    year: "3rd Year",
    portfolio: "",
    experience: "",
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

  useEffect(() => {
    if (initialCollege) {
      setFormData((prev) => ({ ...prev, college: initialCollege }));
    }
  }, [initialCollege]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Please enter your full name (at least 2 characters).";
    }

    if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      errors.phone = "Please enter a valid contact phone or WhatsApp number.";
    }

    if (!formData.college.trim()) {
      errors.college = "Please enter your college or institute name.";
    }

    if (!formData.branch.trim()) {
      errors.branch = "Please specify your branch or degree program.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Please share your motivation and chapter vision (at least 10 characters).";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
          type: "ambassador",
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          college: formData.college.trim(),
          branch: formData.branch.trim(),
          year: formData.year,
          portfolio: formData.portfolio.trim(),
          experience: formData.experience.trim(),
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
        throw new Error(data.error || `Server returned status ${res.status}.`);
      }

      setSubmitted(true);
    } catch (err: any) {
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setErrorMessage("Network error: Unable to reach server. Please check your internet connection.");
      } else {
        setErrorMessage(err.message || "An error occurred while submitting your application.");
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
            Application Submitted Successfully!
          </h3>
          <p className="text-sm text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed max-w-md mx-auto mb-6">
            Thank you, <strong className="text-ink-primary dark:text-white">{formData.name}</strong>. Your application to lead an ML Bhopal Campus Chapter at <strong className="text-ink-primary dark:text-white">{formData.college}</strong> has been received by the organizing leads. We will review your vision and reach out via email/WhatsApp.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                college: "",
                branch: "",
                year: "3rd Year",
                portfolio: "",
                experience: "",
                message: "",
                hp_field: "",
              });
            }}
            className="px-5 py-2.5 rounded-control text-xs font-semibold uppercase bg-[#F1F3F4] dark:bg-[#334155] text-google-blue dark:text-[#60A5FA] hover:bg-blue-50 dark:hover:bg-[#334155] border border-[#D1D5DB] dark:border-[#5F6368] transition-colors cursor-pointer"
          >
            Submit Another Application
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
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

          {/* Honeypot Spam Trap */}
          <div
            aria-hidden="true"
            style={{ display: "none", position: "absolute", left: "-9999px" }}
          >
            <label htmlFor="ambassador-hp">Do not fill this field</label>
            <input
              type="text"
              id="ambassador-hp"
              name="hp_field"
              tabIndex={-1}
              value={formData.hp_field}
              onChange={(e) => setFormData({ ...formData, hp_field: e.target.value })}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="ambassador-name"
                className="text-xs font-semibold uppercase tracking-wider text-ink-secondary dark:text-[#94A3B8] block mb-1.5"
              >
                Full Name <span className="text-google-red">*</span>
              </label>
              <input
                id="ambassador-name"
                type="text"
                required
                aria-required="true"
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? "amb-name-error" : undefined}
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: "" });
                }}
                placeholder="e.g. Yash Vardhan"
                className={`w-full px-4 py-2.5 rounded-control bg-white dark:bg-[#0F172A] border text-ink-primary dark:text-[#F8FAFC] text-base sm:text-sm focus:outline-none transition-colors placeholder:text-ink-disabled ${
                  fieldErrors.name ? "border-google-red focus:border-google-red" : "border-[#D1D5DB] dark:border-[#334155] focus:border-google-blue focus:ring-1 focus:ring-google-blue"
                }`}
              />
              {fieldErrors.name && (
                <span id="amb-name-error" className="text-xs text-google-red mt-1 block">
                  {fieldErrors.name}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="ambassador-email"
                className="text-xs font-semibold uppercase tracking-wider text-ink-secondary dark:text-[#94A3B8] block mb-1.5"
              >
                Email Address <span className="text-google-red">*</span>
              </label>
              <input
                id="ambassador-email"
                type="email"
                required
                aria-required="true"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "amb-email-error" : undefined}
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
                }}
                placeholder="yash@example.com"
                className={`w-full px-4 py-2.5 rounded-control bg-white dark:bg-[#0F172A] border text-ink-primary dark:text-[#F8FAFC] text-base sm:text-sm focus:outline-none transition-colors placeholder:text-ink-disabled ${
                  fieldErrors.email ? "border-google-red focus:border-google-red" : "border-[#D1D5DB] dark:border-[#334155] focus:border-google-blue focus:ring-1 focus:ring-google-blue"
                }`}
              />
              {fieldErrors.email && (
                <span id="amb-email-error" className="text-xs text-google-red mt-1 block">
                  {fieldErrors.email}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="ambassador-phone"
                className="text-xs font-semibold uppercase tracking-wider text-ink-secondary dark:text-[#94A3B8] block mb-1.5"
              >
                Phone / WhatsApp <span className="text-google-red">*</span>
              </label>
              <input
                id="ambassador-phone"
                type="tel"
                required
                aria-required="true"
                aria-invalid={Boolean(fieldErrors.phone)}
                aria-describedby={fieldErrors.phone ? "amb-phone-error" : undefined}
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: "" });
                }}
                placeholder="+91 98765 43210"
                className={`w-full px-4 py-2.5 rounded-control bg-white dark:bg-[#0F172A] border text-ink-primary dark:text-[#F8FAFC] text-base sm:text-sm focus:outline-none transition-colors placeholder:text-ink-disabled ${
                  fieldErrors.phone ? "border-google-red focus:border-google-red" : "border-[#D1D5DB] dark:border-[#334155] focus:border-google-blue focus:ring-1 focus:ring-google-blue"
                }`}
              />
              {fieldErrors.phone && (
                <span id="amb-phone-error" className="text-xs text-google-red mt-1 block">
                  {fieldErrors.phone}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="ambassador-year"
                className="text-xs font-semibold uppercase tracking-wider text-ink-secondary dark:text-[#94A3B8] block mb-1.5"
              >
                Current Year of Study <span className="text-google-red">*</span>
              </label>
              <select
                id="ambassador-year"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-4 py-2.5 rounded-control bg-white dark:bg-[#0F172A] border border-[#D1D5DB] dark:border-[#334155] text-ink-primary dark:text-[#F8FAFC] text-base sm:text-sm focus:outline-none focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-colors"
              >
                <option value="1st Year">1st Year (Freshman)</option>
                <option value="2nd Year">2nd Year (Sophomore)</option>
                <option value="3rd Year">3rd Year (Junior)</option>
                <option value="4th Year">4th Year (Senior)</option>
                <option value="Postgraduate / MCA / M.Tech">Postgraduate / MCA / M.Tech</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="ambassador-college"
                className="text-xs font-semibold uppercase tracking-wider text-ink-secondary dark:text-[#94A3B8] block mb-1.5"
              >
                College / Institute Name <span className="text-google-red">*</span>
              </label>
              <input
                id="ambassador-college"
                type="text"
                required
                aria-required="true"
                aria-invalid={Boolean(fieldErrors.college)}
                aria-describedby={fieldErrors.college ? "amb-college-error" : undefined}
                value={formData.college}
                onChange={(e) => {
                  setFormData({ ...formData, college: e.target.value });
                  if (fieldErrors.college) setFieldErrors({ ...fieldErrors, college: "" });
                }}
                placeholder="e.g. LNCT, MANIT, Oriental, VIT Bhopal"
                className={`w-full px-4 py-2.5 rounded-control bg-white dark:bg-[#0F172A] border text-ink-primary dark:text-[#F8FAFC] text-base sm:text-sm focus:outline-none transition-colors placeholder:text-ink-disabled ${
                  fieldErrors.college ? "border-google-red focus:border-google-red" : "border-[#D1D5DB] dark:border-[#334155] focus:border-google-blue focus:ring-1 focus:ring-google-blue"
                }`}
              />
              {fieldErrors.college && (
                <span id="amb-college-error" className="text-xs text-google-red mt-1 block">
                  {fieldErrors.college}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="ambassador-branch"
                className="text-xs font-semibold uppercase tracking-wider text-ink-secondary dark:text-[#94A3B8] block mb-1.5"
              >
                Branch / Degree <span className="text-google-red">*</span>
              </label>
              <input
                id="ambassador-branch"
                type="text"
                required
                aria-required="true"
                aria-invalid={Boolean(fieldErrors.branch)}
                aria-describedby={fieldErrors.branch ? "amb-branch-error" : undefined}
                value={formData.branch}
                onChange={(e) => {
                  setFormData({ ...formData, branch: e.target.value });
                  if (fieldErrors.branch) setFieldErrors({ ...fieldErrors, branch: "" });
                }}
                placeholder="e.g. B.Tech Computer Science / AI / IT"
                className={`w-full px-4 py-2.5 rounded-control bg-white dark:bg-[#0F172A] border text-ink-primary dark:text-[#F8FAFC] text-base sm:text-sm focus:outline-none transition-colors placeholder:text-ink-disabled ${
                  fieldErrors.branch ? "border-google-red focus:border-google-red" : "border-[#D1D5DB] dark:border-[#334155] focus:border-google-blue focus:ring-1 focus:ring-google-blue"
                }`}
              />
              {fieldErrors.branch && (
                <span id="amb-branch-error" className="text-xs text-google-red mt-1 block">
                  {fieldErrors.branch}
                </span>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="ambassador-portfolio"
              className="text-xs font-semibold uppercase tracking-wider text-ink-secondary dark:text-[#94A3B8] block mb-1.5"
            >
              LinkedIn / GitHub / Portfolio (Optional)
            </label>
            <input
              id="ambassador-portfolio"
              type="url"
              value={formData.portfolio}
              onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
              placeholder="https://linkedin.com/in/..."
              className="w-full px-4 py-2.5 rounded-control bg-white dark:bg-[#0F172A] border border-[#D1D5DB] dark:border-[#334155] text-ink-primary dark:text-[#F8FAFC] text-base sm:text-sm focus:outline-none focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-colors placeholder:text-ink-disabled"
            />
          </div>

          <div>
            <label
              htmlFor="ambassador-experience"
              className="text-xs font-semibold uppercase tracking-wider text-ink-secondary dark:text-[#94A3B8] block mb-1.5"
            >
              Past Leadership & Club Experience
            </label>
            <textarea
              id="ambassador-experience"
              rows={2}
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="Mention any college societies, GDG, hackathons, or event organizing roles you have held..."
              className="w-full px-4 py-2.5 rounded-control bg-white dark:bg-[#0F172A] border border-[#D1D5DB] dark:border-[#334155] text-ink-primary dark:text-[#F8FAFC] text-base sm:text-sm focus:outline-none focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-colors placeholder:text-ink-disabled resize-none"
            />
          </div>

          <div>
            <label
              htmlFor="ambassador-vision"
              className="text-xs font-semibold uppercase tracking-wider text-ink-secondary dark:text-[#94A3B8] block mb-1.5"
            >
              Vision & Motivation for Your Campus Chapter <span className="text-google-red">*</span>
            </label>
            <textarea
              id="ambassador-vision"
              rows={3}
              required
              aria-required="true"
              aria-invalid={Boolean(fieldErrors.message)}
              aria-describedby={fieldErrors.message ? "amb-vision-error" : undefined}
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: "" });
              }}
              placeholder="Why do you want to start an ML Bhopal chapter in your college? What kind of sessions or activities will you run?"
              className={`w-full px-4 py-2.5 rounded-control bg-white dark:bg-[#0F172A] border text-ink-primary dark:text-[#F8FAFC] text-base sm:text-sm focus:outline-none transition-colors placeholder:text-ink-disabled resize-none ${
                fieldErrors.message ? "border-google-red focus:border-google-red" : "border-[#D1D5DB] dark:border-[#334155] focus:border-google-blue focus:ring-1 focus:ring-google-blue"
              }`}
            />
            {fieldErrors.message && (
              <span id="amb-vision-error" className="text-xs text-google-red mt-1 block">
                {fieldErrors.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-control text-sm font-semibold tracking-wide text-white bg-google-blue hover:bg-google-blue-hover shadow-elevation-1 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Application...</span>
              </>
            ) : (
              <>
                <span>Submit Campus Lead Application</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
