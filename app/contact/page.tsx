import React from "react";
import { Metadata } from "next";
import {
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Linkedin,
  Github,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { HeroGridBackground } from "@/components/ui/HeroGridBackground";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Leadership & Inquiries — ML Bhopal",
  description:
    "Connect directly with ML Bhopal organizers for speaker nominations, event partnerships, hackathon sponsorships, and campus chapter inquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact ML Bhopal — Community Leadership Inquiries",
    description:
      "Direct channels for speaking, event partnerships, sponsorship, and college chapter leadership.",
    url: "https://mlbhopal.tech/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#0F172A] text-ink-primary dark:text-[#F8FAFC] pt-24 pb-20 relative overflow-hidden transition-colors">
      {/* Header Section with Blueprint Grid */}
      <div className="relative overflow-hidden border-b border-[#D1D5DB] dark:border-[#334155] py-12 sm:py-16">
        <HeroGridBackground withElements withTopBorder />

        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: "Community", href: "/#community" },
              { label: "Contact Desk", href: "/contact" },
            ]}
          />

          <ScrollReveal>
            <div className="mt-8 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1F3F4] dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#5F6368] text-xs font-medium text-ink-secondary dark:text-[#94A3B8] uppercase tracking-wider mb-6">
                <Mail className="w-3.5 h-3.5 text-google-blue dark:text-[#60A5FA]" />
                <span>Communication Desk • Leadership Inquiries</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-ink-primary dark:text-[#F8FAFC] mb-6 leading-tight">
                Get in Touch with <br className="hidden sm:inline" />
                <span className="text-google-blue dark:text-[#60A5FA]">ML Bhopal Leadership.</span>
              </h1>

              <p className="text-base sm:text-lg text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed mb-8 max-w-3xl">
                Have a question about upcoming events, interested in presenting an applied AI workshop, looking to sponsor our hackathons, or establishing a campus chapter? Connect with our organizers below.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </div>

      <Section spacing="lg" background="subtle">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Direct Contact Info & Verification */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-subtle space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-google-blue dark:text-[#60A5FA] block mb-1">
                    Direct Channels
                  </span>
                  <h2 className="text-xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] mb-2">
                    Official Inboxes
                  </h2>
                  <p className="text-xs text-ink-secondary dark:text-[#94A3B8] leading-relaxed font-sans">
                    All inquiries are directly forwarded to the core leadership team.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#D1D5DB] dark:border-[#334155] text-sm font-sans">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-google-blue dark:text-[#60A5FA] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-ink-secondary dark:text-[#94A3B8] block">General & Partnerships</span>
                      <a href="mailto:contact@mlbhopal.tech" className="text-ink-primary dark:text-[#F8FAFC] hover:text-google-blue dark:hover:text-[#60A5FA] transition-colors font-medium">
                        contact@mlbhopal.tech
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-google-blue dark:text-[#60A5FA] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-ink-secondary dark:text-[#94A3B8] block">Headquarters</span>
                      <span className="text-ink-primary dark:text-[#F8FAFC]">Bhopal, Madhya Pradesh, India</span>
                    </div>
                  </div>
                </div>

                {/* Social Profiles */}
                <div className="pt-4 border-t border-[#D1D5DB] dark:border-[#334155]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink-secondary dark:text-[#94A3B8] block mb-3">
                    Community Channels
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://linkedin.com/company/mlbhopal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-control bg-[#F1F3F4] dark:bg-[#334155] border border-[#D1D5DB] dark:border-[#5F6368] flex items-center justify-center text-ink-secondary dark:text-[#F8FAFC] hover:text-google-blue hover:bg-blue-50 dark:hover:bg-[#334155] transition-colors"
                      aria-label="ML Bhopal LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href="https://github.com/mlbhopal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-control bg-[#F1F3F4] dark:bg-[#334155] border border-[#D1D5DB] dark:border-[#5F6368] flex items-center justify-center text-ink-secondary dark:text-[#F8FAFC] hover:text-google-blue hover:bg-blue-50 dark:hover:bg-[#334155] transition-colors"
                      aria-label="ML Bhopal GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href="https://commudle.com/communities/ml-bhopal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 h-9 rounded-control bg-[#F1F3F4] dark:bg-[#334155] border border-[#D1D5DB] dark:border-[#5F6368] flex items-center gap-1.5 text-xs font-medium text-ink-secondary dark:text-[#F8FAFC] hover:text-google-blue hover:bg-blue-50 dark:hover:bg-[#334155] transition-colors"
                    >
                      <span>Commudle Hub</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Security & Spam Notice */}
              <div className="p-5 sm:p-6 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-subtle flex items-start gap-3.5">
                <ShieldCheck className="w-5 h-5 text-google-green shrink-0 mt-0.5" />
                <div className="text-xs font-sans text-ink-secondary dark:text-[#94A3B8] leading-relaxed">
                  <strong className="text-ink-primary dark:text-[#F8FAFC] block mb-0.5">Encrypted Transmission</strong>
                  Messages submitted here are validated server-side, protected against spam crawlers, and delivered directly to leadership inboxes via TLS.
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Contact Form Island */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
