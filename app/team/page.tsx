import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  Linkedin,
  Twitter,
  Github,
  Building2,
  Heart,
  ArrowRight,
  ExternalLink,
  Users,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { HeroGridBackground } from "@/components/ui/HeroGridBackground";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { getTeamLeads, getCoreTeam } from "@/lib/data";
import { TeamMember } from "@/lib/types";

export const metadata: Metadata = {
  title: "Team & Organizers — Community Leadership",
  description:
    "Meet the volunteer organizers, community leads, and student engineers powering ML Bhopal and Google for Developers initiatives across Central India.",
  alternates: {
    canonical: "/team",
  },
  openGraph: {
    title: "ML Bhopal Team — Community Leads & Core Organizers",
    description:
      "Volunteer practitioners, software engineers, and student builders dedicated to democratizing AI education.",
    url: "https://mlbhopal.tech/team",
    type: "website",
    images: [
      {
        url: "/posters/build-with-ai-agents-banner.png",
        width: 1200,
        height: 630,
        alt: "ML Bhopal Team & Organizers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ML Bhopal Team — Community Leads & Core Organizers",
    description:
      "Volunteer practitioners, software engineers, and student builders dedicated to democratizing AI education.",
    images: ["/posters/build-with-ai-agents-banner.png"],
  },
};

function MemberCard({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <TiltCard maxTilt={4} perspective={1000} className="h-full rounded-card">
      <article className="h-full flex flex-col p-6 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] hover:border-google-blue dark:hover:border-[#60A5FA] hover:shadow-elevation-2 hover:-translate-y-1.5 transition-all duration-200 shadow-subtle group">
        {/* Avatar & Header */}
        <div className="flex items-center gap-3.5 sm:gap-4 mb-4">
          {member.avatar ? (
            <div className="relative w-14 sm:w-16 h-14 sm:h-16 rounded-full overflow-hidden border-2 border-[#D1D5DB] dark:border-[#334155] group-hover:border-google-blue dark:group-hover:border-[#60A5FA] bg-[#FAFAFA] dark:bg-[#1E293B] shrink-0 transition-colors shadow-sm">
              <Image
                src={member.avatar}
                alt={member.name}
                fill
                sizes="64px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-blue-50 dark:bg-[#1A3A6E] border-2 border-blue-200 dark:border-blue-800 text-google-blue dark:text-[#60A5FA] font-display font-bold text-sm sm:text-base flex items-center justify-center shrink-0">
              {initials}
            </div>
          )}

          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-display font-bold text-ink-primary dark:text-[#F8FAFC] group-hover:text-google-blue dark:group-hover:text-[#60A5FA] transition-colors truncate">
              {member.name}
            </h3>
            <span className="text-xs font-semibold text-google-blue dark:text-[#60A5FA] block">
              {member.role}
            </span>
            {member.company && (
              <span className="text-xs text-ink-secondary dark:text-[#94A3B8] block truncate" title={member.company}>
                {member.company}
              </span>
            )}
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs sm:text-sm text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed mb-6 flex-1">
          {member.bio}
        </p>

        {/* Verified Social Links Strip */}
        <div className="pt-4 border-t border-[#D1D5DB] dark:border-[#334155] flex items-center gap-2">
          {member.linkedin ? (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-control bg-[#F1F3F4] dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#5F6368] flex items-center justify-center text-ink-secondary dark:text-[#94A3B8] hover:text-google-blue dark:hover:text-[#60A5FA] hover:bg-blue-50 dark:hover:bg-[#1A3A6E] transition-all hover:scale-110 active:scale-95"
              aria-label={`${member.name} LinkedIn`}
            >
              <Linkedin className="w-4 h-4" />
            </a>
          ) : null}

          {member.twitter ? (
            <a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-control bg-[#F1F3F4] dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#5F6368] flex items-center justify-center text-ink-secondary dark:text-[#94A3B8] hover:text-google-blue dark:hover:text-[#60A5FA] hover:bg-blue-50 dark:hover:bg-[#1A3A6E] transition-all hover:scale-110 active:scale-95"
              aria-label={`${member.name} X/Twitter`}
            >
              <Twitter className="w-4 h-4" />
            </a>
          ) : null}

          {member.github ? (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-control bg-[#F1F3F4] dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#5F6368] flex items-center justify-center text-ink-secondary dark:text-[#94A3B8] hover:text-google-blue dark:hover:text-[#60A5FA] hover:bg-blue-50 dark:hover:bg-[#1A3A6E] transition-all hover:scale-110 active:scale-95"
              aria-label={`${member.name} GitHub`}
            >
              <Github className="w-4 h-4" />
            </a>
          ) : null}

          {!member.linkedin && !member.twitter && !member.github && (
            <span className="text-xs text-ink-secondary">
              ML Bhopal Volunteer
            </span>
          )}
        </div>
      </article>
    </TiltCard>
  );
}

export default function TeamPage() {
  const leads = getTeamLeads();
  const core = getCoreTeam();

  return (
    <div className="relative pt-24 pb-24 bg-background dark:bg-[#0F172A] transition-colors overflow-hidden">
      {/* Blueprint Grid Background Pattern */}
      <HeroGridBackground withElements withTopBorder />

      <Container className="relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: "Community", href: "/about" },
              { label: "Team & Organizers", href: "/team" },
            ]}
          />
        </div>

        {/* 1. Header with ScrollReveal */}
        <ScrollReveal>
          <section aria-labelledby="team-hero-title" className="mb-16">
            <div className="relative rounded-surface bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] p-6 sm:p-10 lg:p-14 overflow-hidden shadow-subtle">
              {/* Blueprint Grid inside team hero card */}
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
                    <Users className="w-3.5 h-3.5 text-google-blue dark:text-[#60A5FA]" />
                    THE HUMANS OF ML BHOPAL
                  </span>
                  <span className="text-xs font-medium text-ink-secondary dark:text-[#94A3B8]">100% VOLUNTEER DRIVEN</span>
                </div>

              <h1
                id="team-hero-title"
                className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-ink-primary tracking-tight leading-[1.08] mb-6"
              >
                The Builders Behind the Movement.
              </h1>

              <p className="font-sans text-lg sm:text-xl text-ink-secondary leading-relaxed max-w-2xl mb-8">
                ML Bhopal is organized entirely by engineers, researchers, and student volunteers who dedicate their nights and weekends to creating world-class AI opportunities in Central India.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-ink-secondary">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-google-green" />
                  <span>Supported by</span>
                  <div className="relative h-3.5 w-24">
                    <Image
                      src="/logos/google-developers-light.png"
                      alt="Google for Developers"
                      fill
                      sizes="96px"
                      className="object-contain dark:hidden"
                    />
                    <Image
                      src="/logos/google-developers-dark.png"
                      alt="Google for Developers"
                      fill
                      sizes="96px"
                      className="object-contain hidden dark:block"
                    />
                  </div>
                </span>
                <span>•</span>
                <span>Bhopal, Madhya Pradesh</span>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* 2. Community Leads Section */}
        <section aria-labelledby="leads-heading" className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
              Chapter Leadership
            </span>
            <h2 id="leads-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary tracking-tight">
              Community Leads
            </h2>
            <p className="text-sm text-ink-secondary mt-1 max-w-xl">
              Driving curriculum design, institutional partnerships, speaker coordination, and community operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {leads.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        {/* 3. Core Team & Student Volunteers */}
        <section aria-labelledby="core-heading" className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-google-blue dark:text-[#60A5FA] block mb-1">
              Engineers & Campus Organizers
            </span>
            <h2 id="core-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight">
              Core Team & Volunteers
            </h2>
            <p className="text-sm text-ink-secondary dark:text-[#94A3B8] mt-1 max-w-xl">
              Student chapter leads, web developers, and event coordinators building community infrastructure across Central India colleges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {core.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        {/* 4. Volunteer Callout */}
        <section aria-labelledby="volunteer-heading">
          <div className="p-8 sm:p-12 rounded-surface bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] text-center flex flex-col items-center shadow-subtle relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-google-blue dark:bg-[#60A5FA]" />

            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F1F3F4] dark:bg-[#1E293B] text-ink-secondary dark:text-[#94A3B8] border border-[#D1D5DB] dark:border-[#5F6368] mb-4">
              JOIN THE CORE TEAM
            </span>

            <h2 id="volunteer-heading" className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight mb-4">
              Want to Help Build ML Bhopal?
            </h2>

            <p className="text-sm sm:text-base text-ink-secondary dark:text-[#94A3B8] max-w-xl mb-8 leading-relaxed font-sans">
              We are always looking for passionate builders to join operations, technical content development, campus chapter outreach, and graphic design.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <PrimaryButton
                href="/join"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Apply to Volunteer Collective
              </PrimaryButton>

              <SecondaryButton
                href="mailto:contact@mlbhopal.tech"
                isExternal
                size="lg"
              >
                Email Organizers
              </SecondaryButton>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
