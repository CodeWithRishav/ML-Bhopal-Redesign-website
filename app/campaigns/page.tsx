import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Sparkles, Trophy, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { HeroGridBackground } from "@/components/ui/HeroGridBackground";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import {
  getCampaigns,
  getFeaturedCampaign,
  getActiveCampaigns,
  getUpcomingCampaigns,
  getCompletedCampaigns,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Campaigns & Cohorts — Engineering Sprints",
  description:
    "Explore active cohorts, developer sprints, and community initiatives including Build with AI, Kaggle Days, and TPU Learning by ML Bhopal.",
  alternates: {
    canonical: "/campaigns",
  },
  openGraph: {
    title: "Campaigns & Initiatives — ML Bhopal",
    description:
      "Explore active engineering sprints, hackathons, and research cohorts operated under the ML Bhopal ecosystem.",
    url: "https://mlbhopal.tech/campaigns",
    type: "website",
    images: [
      {
        url: "/posters/build-with-ai-agents-banner.png",
        width: 1200,
        height: 630,
        alt: "ML Bhopal Campaigns & Initiatives",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Campaigns & Initiatives — ML Bhopal",
    description:
      "Explore active engineering sprints, hackathons, and research cohorts operated under the ML Bhopal ecosystem.",
    images: ["/posters/build-with-ai-agents-banner.png"],
  },
};

export default function CampaignsPage() {
  const featured = getFeaturedCampaign();
  const activeCampaigns = getActiveCampaigns();
  const upcomingCampaigns = getUpcomingCampaigns();
  const completedCampaigns = getCompletedCampaigns();

  return (
    <div className="relative pt-24 pb-20 bg-background dark:bg-[#0F172A] transition-colors overflow-hidden">
      {/* Blueprint Grid Background Pattern */}
      <HeroGridBackground withElements withTopBorder />

      <Container className="relative z-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: "Campaigns", href: "/campaigns" }]} />

        {/* Section Header */}
        <ScrollReveal>
          <div className="my-8">
            <SectionHeader
              as="h1"
              eyebrow="Community Initiatives"
              title="Campaigns & Engineering Sprints"
              description="Time-bound challenges, hackathons, and compute cohorts operated by ML Bhopal to foster high-density applied AI builders."
            />
          </div>
        </ScrollReveal>

        {/* 1. Featured Campaign Spotlight (Hero Card) */}
        {featured ? (
          <ScrollReveal delay={0.1}>
            <div className="mb-14">
              <div className="relative rounded-surface bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-card">
                {/* Blueprint grid inside featured card */}
                <div className="absolute inset-0 blueprint-grid opacity-30 dark:opacity-15 pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Details */}
                  <div className="lg:col-span-7 flex flex-col items-start">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="live" pulse>
                        FEATURED CAMPAIGN
                      </Badge>
                      <span className="text-xs font-sans font-medium text-ink-secondary dark:text-[#94A3B8]">
                        {featured.category}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight leading-tight mb-4">
                      {featured.title}
                    </h2>

                    <p className="text-base text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed mb-6 max-w-xl">
                      {featured.description}
                    </p>

                    {/* Highlights Bar */}
                    <div className="flex flex-wrap items-center gap-6 py-4 mb-6 border-y border-[#D1D5DB] dark:border-[#334155] text-xs font-sans w-full">
                    {featured.deadline ? (
                      <div>
                        <span className="text-ink-secondary block text-[11px] uppercase">SUBMISSION DEADLINE</span>
                        <span className="text-ink-primary font-bold text-sm">{featured.deadline}</span>
                      </div>
                    ) : null}
                    {(featured.metadata?.incentives || featured.incentives) ? (
                      <div>
                        <span className="text-ink-secondary block text-[11px] uppercase">AWARDS & GRANTS</span>
                        <span className="text-google-blue font-bold text-sm">
                          {featured.metadata?.incentives || featured.incentives}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {/* Tracks */}
                  {(featured.metadata?.tracks || featured.tracks) ? (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {(featured.metadata?.tracks || featured.tracks || []).map((t) => (
                        <Tag key={t} variant="domain">{t}</Tag>
                      ))}
                    </div>
                  ) : null}

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
                    <PrimaryButton
                      href={`/campaigns/${featured.slug}`}
                      size="lg"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Explore Campaign & Tracks
                    </PrimaryButton>

                    {featured.registrationUrl ? (
                      <SecondaryButton
                        href={featured.registrationUrl}
                        isExternal
                        size="lg"
                      >
                        Enroll on Commudle
                      </SecondaryButton>
                    ) : null}
                  </div>
                </div>

                {/* Right Column: Visual Preview */}
                <div className="lg:col-span-5 relative aspect-video lg:aspect-square w-full rounded-card overflow-hidden border border-[#D1D5DB] dark:border-[#334155] bg-[#F1F3F4] dark:bg-[#0F172A] shadow-subtle">
                  <Image
                    src={featured.coverImage || "/posters/build-with-ai-agents-banner.png"}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>
        ) : null}

        {/* 2. Active Campaigns Grid with Stagger Animation */}
        {activeCampaigns.length > 0 ? (
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#D1D5DB] dark:border-[#334155]">
              <span className="w-2.5 h-2.5 rounded-full bg-google-green animate-pulse" />
              <h3 className="text-xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight">
                Active Campaigns ({activeCampaigns.length})
              </h3>
            </div>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCampaigns.map((camp) => (
                <StaggerItem key={camp.id}>
                  <CampaignCard campaign={camp} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        ) : null}

        {/* 3. Upcoming Campaigns Grid with Stagger Animation */}
        {upcomingCampaigns.length > 0 ? (
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#D1D5DB] dark:border-[#334155]">
              <span className="w-2.5 h-2.5 rounded-full bg-google-blue" />
              <h3 className="text-xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight">
                Upcoming Initiatives ({upcomingCampaigns.length})
              </h3>
            </div>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingCampaigns.map((camp) => (
                <StaggerItem key={camp.id}>
                  <CampaignCard key={camp.id} campaign={camp} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        ) : null}

        {/* 4. Completed Campaigns Archive */}
        {completedCampaigns.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#D1D5DB] dark:border-[#334155]">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
              <h3 className="text-xl font-display font-bold text-ink-secondary dark:text-[#94A3B8] tracking-tight">
                Campaign Archive ({completedCampaigns.length})
              </h3>
            </div>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedCampaigns.map((camp) => (
                <StaggerItem key={camp.id}>
                  <CampaignCard key={camp.id} campaign={camp} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
