import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  Building2,
  GraduationCap,
  Users2,
  Handshake,
  ExternalLink,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { HeroGridBackground } from "@/components/ui/HeroGridBackground";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { getAcademicPartners, getCommunityPartners, getPartnersFullData } from "@/lib/data";
import { Partner } from "@/lib/types";
import dynamic from "next/dynamic";

const PartnerInquiryForm = dynamic(
  () => import("@/components/partners/PartnerInquiryForm").then((mod) => mod.PartnerInquiryForm),
  {
    loading: () => (
      <div className="p-8 rounded-surface bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] min-h-[360px] flex items-center justify-center text-ink-secondary dark:text-[#94A3B8] font-sans text-xs animate-pulse">
        Initializing partnership inquiry portal...
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: "Partners & Ecosystem — Colleges, Sponsors & Industry",
  description:
    "Explore our academic network, community collaborators, and technology sponsors supporting 3,600+ AI developers in Central India.",
  alternates: {
    canonical: "/partners",
  },
  openGraph: {
    title: "ML Bhopal Partners — Academic & Ecosystem Collaborators",
    description:
      "LNCT, Oriental, MANIT, IIIT Bhopal, RGPV, Google for Developers, OWASP, and Commudle supporting Central India AI.",
    url: "https://mlbhopal.tech/partners",
    type: "website",
    images: [
      {
        url: "/posters/ml-bhopal-banner.png",
        width: 1200,
        height: 630,
        alt: "ML Bhopal Partners & Ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ML Bhopal Partners — Academic & Ecosystem Collaborators",
    description:
      "LNCT, Oriental, MANIT, IIIT Bhopal, RGPV, Google for Developers, OWASP, and Commudle supporting Central India AI.",
    images: ["/posters/ml-bhopal-banner.png"],
  },
};

function PartnerCard({ partner }: { partner: Partner }) {
  const isGoogle = partner.name.toLowerCase().includes("google");

  return (
    <TiltCard maxTilt={3} perspective={1000} className="h-full rounded-card">
      <article className="h-full flex flex-col rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] hover:border-google-blue dark:hover:border-[#60A5FA] hover:shadow-elevation-2 hover:-translate-y-1.5 transition-all duration-200 shadow-subtle overflow-hidden group">
        {/* Photo Container with overlay & category badge */}
        <div className="relative h-44 sm:h-48 w-full bg-[#F1F3F4] dark:bg-[#1E293B] overflow-hidden">
          {partner.photo ? (
            <Image
              src={partner.photo}
              alt={partner.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-50/50 dark:bg-blue-950/20">
              <Building2 className="w-12 h-12 text-google-blue/30 dark:text-[#60A5FA]/30" />
            </div>
          )}

          {/* Scrim Gradient for Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

          {/* Type / Category Pill */}
          <div className="absolute top-3.5 right-3.5">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase backdrop-blur-md bg-white/90 dark:bg-[#0F172A]/90 text-ink-primary dark:text-[#F8FAFC] border border-white/20 dark:border-white/10 shadow-sm">
              {partner.type}
            </span>
          </div>

          {/* Logo Badge (Floating at bottom-left of photo) */}
          <div className="absolute -bottom-5 left-5 z-10">
            <div className="h-12 min-w-[100px] max-w-[170px] px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0F172A] border border-[#D1D5DB] dark:border-[#334155] shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              {partner.logo ? (
                isGoogle ? (
                  <div className="relative h-6 w-32">
                    <Image
                      src="/logos/google-developers-light.png"
                      alt={partner.name}
                      fill
                      sizes="128px"
                      className="object-contain dark:hidden"
                    />
                    <Image
                      src="/logos/google-developers-dark.png"
                      alt={partner.name}
                      fill
                      sizes="128px"
                      className="object-contain hidden dark:block"
                    />
                  </div>
                ) : (
                  <div className="relative h-7 w-28">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      fill
                      sizes="112px"
                      className="object-contain dark:brightness-110"
                    />
                  </div>
                )
              ) : (
                <span className="text-xs font-bold text-google-blue dark:text-[#60A5FA] font-display">
                  {partner.name.split(" ")[0]}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="pt-8 p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-display font-bold text-ink-primary dark:text-[#F8FAFC] group-hover:text-google-blue dark:group-hover:text-[#60A5FA] transition-colors mb-1 line-clamp-1">
              {partner.name}
            </h3>

            {partner.role && (
              <span className="text-xs font-semibold text-google-blue dark:text-[#60A5FA] block mb-3">
                {partner.role}
              </span>
            )}

            <p className="text-xs sm:text-sm text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed mb-4">
              {partner.note}
            </p>
          </div>

          {/* Action Link Footer */}
          {partner.url ? (
            <div className="pt-3 border-t border-[#D1D5DB] dark:border-[#334155]">
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-google-blue dark:text-[#60A5FA] hover:text-google-blue-dark dark:hover:text-blue-300 inline-flex items-center gap-1.5 transition-colors group/link"
              >
                <span>Visit Partner Website</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            </div>
          ) : (
            <div className="pt-3 border-t border-[#D1D5DB] dark:border-[#334155] text-xs text-ink-secondary dark:text-[#94A3B8] flex items-center justify-between">
              <span>Bhopal, Central India</span>
              <span className="text-[11px] font-medium text-google-blue dark:text-[#60A5FA]">Official Chapter</span>
            </div>
          )}
        </div>
      </article>
    </TiltCard>
  );
}

export default function PartnersPage() {
  const partnersData = getPartnersFullData();
  const academicPartners = getAcademicPartners();
  const communityPartners = getCommunityPartners();

  return (
    <div className="relative pt-24 pb-24 bg-background dark:bg-[#0F172A] transition-colors overflow-hidden">
      {/* Blueprint Grid Background Pattern */}
      <HeroGridBackground withElements withTopBorder />

      <Container className="relative z-10">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: "Community", href: "/about" },
              { label: "Partners & Ecosystem", href: "/partners" },
            ]}
          />
        </div>

        {/* 1. Hero Section with ScrollReveal */}
        <ScrollReveal>
          <section aria-labelledby="partners-hero-title" className="mb-16">
            <div className="relative rounded-surface bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] p-6 sm:p-10 lg:p-14 overflow-hidden shadow-subtle">
              {/* Blueprint Grid inside partner hero card */}
              <div className="absolute inset-0 blueprint-grid opacity-30 dark:opacity-15 pointer-events-none" />

              {/* Google 4-color accent top strip */}
              <div className="absolute top-0 inset-x-0 h-1 flex">
                <span className="h-full flex-1 bg-google-blue" />
                <span className="h-full flex-1 bg-google-red" />
                <span className="h-full flex-1 bg-google-yellow" />
                <span className="h-full flex-1 bg-google-green" />
              </div>

              <div className="relative z-10 max-w-3xl pt-2">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#F1F3F4] dark:bg-[#1E293B] text-ink-secondary dark:text-[#94A3B8] border border-[#D1D5DB] dark:border-[#5F6368] inline-flex items-center gap-1.5">
                    <Handshake className="w-3.5 h-3.5 text-google-blue dark:text-[#60A5FA]" />
                    SYMBIOTIC ECOSYSTEM
                  </span>
                  <span className="text-xs font-medium text-ink-secondary dark:text-[#94A3B8]">15+ PARTNERS • REGIONAL IMPACT</span>
                </div>

                <h1
                  id="partners-hero-title"
                  className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-ink-primary dark:text-[#F8FAFC] tracking-tight leading-[1.08] mb-6"
                >
                  Powered by Academia. Backed by Industry.
                </h1>

                <p className="font-sans text-lg sm:text-xl text-ink-secondary dark:text-[#94A3B8] leading-relaxed mb-8">
                  We collaborate with leading engineering colleges, tech communities, and industry sponsors to bring world-class machine learning education, hackathons, and internship pipelines to Central India.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <PrimaryButton
                    href="#proposal-form"
                    size="md"
                    icon={<Mail className="w-4 h-4" />}
                  >
                    Partner With Us
                  </PrimaryButton>

                  <SecondaryButton
                    href="#sponsorship"
                    size="md"
                  >
                    View Sponsorship Packages
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 2. Academic & Campus Network */}
        <section aria-labelledby="academic-heading" className="mb-20">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="w-4 h-4 text-google-blue dark:text-[#60A5FA]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-google-blue dark:text-[#60A5FA] block">
                Academic Alliances
              </span>
            </div>
            <h2 id="academic-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight">
              Colleges & University Campuses
            </h2>
            <p className="text-sm text-ink-secondary dark:text-[#94A3B8] mt-1 max-w-xl">
              Partner institutions providing auditoriums, high-speed labs, and vibrant student builder chapters across Bhopal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {academicPartners.map((partner) => (
              <PartnerCard key={partner.name} partner={partner} />
            ))}
          </div>
        </section>

        {/* 3. Community & Technology Allies */}
        <section aria-labelledby="community-allies-heading" className="mb-20">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <Users2 className="w-4 h-4 text-google-green dark:text-[#81C995]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-google-green dark:text-[#81C995] block">
                Ecosystem & Platform
              </span>
            </div>
            <h2 id="community-allies-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight">
              Community & Technology Allies
            </h2>
            <p className="text-sm text-ink-secondary dark:text-[#94A3B8] mt-1 max-w-xl">
              Foundational platforms, developer chapters, and industry supporters fueling our operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityPartners.map((partner) => (
              <PartnerCard key={partner.name} partner={partner} />
            ))}
          </div>
        </section>

        {/* 4. Sponsorship Tiers Section */}
        <section id="sponsorship" aria-labelledby="sponsorship-heading" className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-google-blue dark:text-[#60A5FA] block mb-1">
              Event & Summit Support
            </span>
            <h2 id="sponsorship-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight">
              Sponsorship Packages
            </h2>
            <p className="text-sm text-ink-secondary dark:text-[#94A3B8] mt-1 max-w-xl">
              Support Central India’s fastest-growing technical community while connecting directly with top AI engineering talent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(partnersData.sponsorshipTiers || []).map((tier, idx) => {
              const isGold = tier.name === "Gold";
              return (
                <div
                  key={idx}
                  className={`p-6 sm:p-8 rounded-card bg-white dark:bg-[#1E293B] border ${
                    isGold
                      ? "border-2 border-google-blue dark:border-[#60A5FA] shadow-elevation-2"
                      : "border-[#D1D5DB] dark:border-[#334155] shadow-subtle"
                  } flex flex-col justify-between relative`}
                >
                  {isGold && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-[#1A3A6E] text-google-blue dark:text-[#60A5FA] border border-blue-200 dark:border-blue-800 uppercase">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="text-xs font-semibold text-ink-secondary dark:text-[#94A3B8] uppercase tracking-wider block mb-1">
                      {tier.name} Tier
                    </span>
                    <div className="text-3xl font-display font-extrabold text-ink-primary dark:text-[#F8FAFC] mb-6">
                      {tier.price}
                    </div>

                    <ul className="space-y-3 mb-8 text-xs font-sans text-ink-secondary dark:text-[#94A3B8]">
                      {tier.benefits.map((benefit: string, bIdx: number) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-google-green dark:text-[#81C995] shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#proposal-form"
                    className={`w-full py-2.5 rounded-control text-xs font-semibold text-center transition-colors border ${
                      isGold
                        ? "bg-google-blue hover:bg-google-blue-hover text-white border-transparent"
                        : "bg-[#F1F3F4] dark:bg-[#1E293B] hover:bg-slate-200 dark:hover:bg-[#404347] text-ink-primary dark:text-[#F8FAFC] border-[#D1D5DB] dark:border-[#5F6368]"
                    }`}
                  >
                    Select {tier.name} Package
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Interactive Partnership Proposal Form */}
        <section id="proposal-form" aria-labelledby="proposal-heading" className="mb-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-google-blue dark:text-[#60A5FA] block mb-1">
                Collaborative Opportunities
              </span>
              <h2 id="proposal-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight">
                Submit a Partnership or Sponsorship Proposal
              </h2>
              <p className="text-sm text-ink-secondary dark:text-[#94A3B8] mt-2 max-w-xl mx-auto">
                Share your organization&apos;s goals and our team will get back to you with tailored partnership decks and timeline options.
              </p>
            </div>

            <PartnerInquiryForm />
          </div>
        </section>

        {/* 6. Strong Partnership CTA */}
        <section aria-labelledby="cta-heading">
          <div className="p-8 sm:p-14 rounded-surface bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] text-center flex flex-col items-center shadow-subtle relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-google-blue dark:bg-[#60A5FA]" />

            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F1F3F4] dark:bg-[#1E293B] text-ink-secondary dark:text-[#94A3B8] border border-[#D1D5DB] dark:border-[#5F6368] mb-4">
              COLLABORATE WITH ML BHOPAL
            </span>

            <h2 id="cta-heading" className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight mb-4">
              Let’s Build Something Meaningful Together.
            </h2>

            <p className="text-sm sm:text-base text-ink-secondary dark:text-[#94A3B8] max-w-xl mb-8 leading-relaxed font-sans">
              Whether you represent a university looking to launch an AI chapter, a tech company hiring machine learning developers, or a speaker with frontier research to share — we want to hear from you.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <PrimaryButton
                href="#proposal-form"
                size="lg"
                icon={<Mail className="w-4 h-4" />}
              >
                Send Partnership Proposal
              </PrimaryButton>

              <SecondaryButton
                href="/events"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                View Past Events & Turnout
              </SecondaryButton>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-ink-secondary dark:text-[#94A3B8] pt-6 mt-8 border-t border-[#D1D5DB] dark:border-[#334155]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-google-blue" />
                Academic MoUs
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-google-green" />
                Campus Chapter Sponsorships
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-google-yellow" />
                Technical Keynote Nominations
              </span>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
