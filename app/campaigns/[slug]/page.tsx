import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  HelpCircle,
  Sparkles,
  Terminal,
  Trophy,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { HeroGridBackground } from "@/components/ui/HeroGridBackground";
import { getCampaigns, getCampaignBySlug } from "@/lib/data";

export async function generateStaticParams() {
  const campaigns = getCampaigns();
  return campaigns.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);

  if (!campaign) {
    return {
      title: "Campaign Not Found",
    };
  }

  const desc = campaign.shortDescription || campaign.description;
  const image = campaign.coverImage || "/posters/build-with-ai-agents-banner.png";

  return {
    title: `${campaign.title} — Campaign Initiative`,
    description: desc,
    alternates: {
      canonical: `/campaigns/${campaign.slug}`,
    },
    openGraph: {
      title: `${campaign.title} | ML Bhopal Initiative`,
      description: desc,
      url: `https://mlbhopal.tech/campaigns/${campaign.slug}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: campaign.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${campaign.title} | ML Bhopal Initiative`,
      description: desc,
      images: [image],
    },
  };
}

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);

  if (!campaign) {
    notFound();
  }

  const statusLower = campaign.status.toLowerCase();
  const isActive = statusLower === "active";
  const isUpcoming = statusLower === "upcoming";

  const statusVariant = isActive
    ? "live"
    : isUpcoming
    ? "upcoming"
    : "past";

  const dateRange =
    campaign.startDate && campaign.endDate
      ? `${campaign.startDate} – ${campaign.endDate}`
      : campaign.deadline
      ? `Deadline: ${campaign.deadline}`
      : null;

  return (
    <div className="relative pt-24 pb-20 bg-background dark:bg-[#0F172A] transition-colors overflow-hidden">
      {/* Blueprint Grid Background Pattern */}
      <HeroGridBackground withElements withTopBorder />

      <Container className="relative z-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: "Campaigns", href: "/campaigns" },
            { label: campaign.title, href: `/campaigns/${campaign.slug}` },
          ]}
        />

        {/* Back Link */}
        <div className="my-4">
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-1.5 text-xs font-sans text-ink-secondary dark:text-[#94A3B8] hover:text-google-blue dark:hover:text-[#60A5FA] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Campaigns</span>
          </Link>
        </div>

        {/* 1. Hero Section */}
        <div className="relative rounded-surface bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] p-6 sm:p-10 mb-12 overflow-hidden shadow-card">
          {/* Blueprint Grid inside campaign card */}
          <div className="absolute inset-0 blueprint-grid opacity-30 dark:opacity-15 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Status & Category Pill */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant={statusVariant} pulse={isActive}>
                  {campaign.status.toUpperCase()}
                </Badge>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-sans bg-[#F1F3F4] text-ink-secondary border border-[#D1D5DB]">
                  {campaign.category}
                </span>
                <span className="text-xs font-sans text-ink-secondary">
                  ML Bhopal Initiative
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-ink-primary tracking-tight leading-tight mb-4">
                {campaign.title}
              </h1>

              <p className="text-base sm:text-lg text-ink-secondary font-sans leading-relaxed mb-6 max-w-xl">
                {campaign.shortDescription || campaign.description}
              </p>

              {/* Date & Deadline Info */}
              {dateRange ? (
                <div className="flex items-center gap-2 text-sm font-sans text-ink-secondary mb-6 pb-6 border-b border-[#D1D5DB] w-full">
                  <Calendar className="w-4 h-4 text-google-blue" />
                  <span>{dateRange}</span>
                </div>
              ) : null}

              {/* Tracks */}
              {(campaign.metadata?.tracks || campaign.tracks) ? (
                <div className="flex flex-wrap gap-2 mb-8">
                  {(campaign.metadata?.tracks || campaign.tracks || []).map((track) => (
                    <Tag key={track} variant="domain">{track}</Tag>
                  ))}
                </div>
              ) : null}

              {/* Action Trigger */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
                {campaign.registrationUrl ? (
                  <PrimaryButton
                    href={campaign.registrationUrl}
                    isExternal
                    size="lg"
                    icon={<ExternalLink className="w-4 h-4" />}
                  >
                    Enroll on Commudle
                  </PrimaryButton>
                ) : null}
                <SecondaryButton href="#about" size="lg">
                  Read Initiative Scope
                </SecondaryButton>
              </div>
            </div>

            {/* Hero Right Visual */}
            <div className="lg:col-span-5 relative aspect-video lg:aspect-square w-full rounded-card overflow-hidden border border-[#D1D5DB] bg-[#F1F3F4] shadow-subtle">
              <Image
                src={
                  campaign.coverImage ||
                  "/posters/build-with-ai-agents-banner.png"
                }
                alt={campaign.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3. About Section */}
        <div id="about" className="mb-12 p-6 sm:p-8 rounded-card bg-white border border-[#D1D5DB] shadow-subtle">
          <span className="text-xs font-semibold uppercase tracking-wider text-google-blue mb-2 block">
            Initiative Overview
          </span>
          <h2 className="text-2xl font-display font-bold text-ink-primary mb-4">
            About {campaign.title}
          </h2>
          <p className="text-base text-ink-secondary font-sans leading-relaxed whitespace-pre-line">
            {campaign.description}
          </p>

          {/* Metadata Grid */}
          {campaign.metadata ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#D1D5DB] text-xs font-sans">
              {campaign.metadata.audience ? (
                <div>
                  <span className="text-ink-secondary block mb-1 uppercase font-medium">TARGET AUDIENCE</span>
                  <span className="text-ink-primary font-semibold text-sm">{campaign.metadata.audience}</span>
                </div>
              ) : null}
              {campaign.metadata.prerequisites ? (
                <div>
                  <span className="text-ink-secondary block mb-1 uppercase font-medium">PREREQUISITES</span>
                  <span className="text-ink-primary font-semibold text-sm">{campaign.metadata.prerequisites}</span>
                </div>
              ) : null}
              {campaign.metadata.incentives ? (
                <div>
                  <span className="text-ink-secondary block mb-1 uppercase font-medium">INCENTIVES</span>
                  <span className="text-google-blue font-semibold text-sm">{campaign.metadata.incentives}</span>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* 4. Why This Campaign */}
        {campaign.whyJoin && campaign.whyJoin.length > 0 ? (
          <div className="mb-12">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
                Value Proposition
              </span>
              <h2 className="text-2xl font-display font-bold text-ink-primary">
                Why Participate in This Campaign
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {campaign.whyJoin.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-card bg-white border border-[#D1D5DB] shadow-subtle flex flex-col hover:border-google-blue transition-colors"
                >
                  <span className="text-xl font-display font-bold text-google-blue mb-2 block">
                    0{idx + 1}
                  </span>
                  <h3 className="text-base font-display font-semibold text-ink-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink-secondary font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* 5. What Participants Get */}
        {campaign.benefits && campaign.benefits.length > 0 ? (
          <div className="mb-12 p-6 sm:p-8 rounded-card bg-white border border-[#D1D5DB] shadow-subtle">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
                Participant Incentives
              </span>
              <h2 className="text-2xl font-display font-bold text-ink-primary">
                What You Get
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {campaign.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-control bg-google-green-light text-google-green flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-display font-semibold text-ink-primary mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-ink-secondary font-sans leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* 6. Timeline / Milestones */}
        {campaign.timeline && campaign.timeline.length > 0 ? (
          <div className="mb-12">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
                Schedule & Checkpoints
              </span>
              <h2 className="text-2xl font-display font-bold text-ink-primary">
                Campaign Roadmap & Timeline
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {campaign.timeline.map((item, idx) => {
                const isCurrent = item.status === "current";
                return (
                  <div
                    key={idx}
                    className={`p-6 rounded-card bg-white border ${
                      isCurrent
                        ? "border-google-blue shadow-card"
                        : "border-[#D1D5DB]"
                    } flex flex-col shadow-subtle`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-sans text-google-blue font-semibold">
                        {item.date}
                      </span>
                      {isCurrent ? (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-sans font-medium bg-google-blue-light text-google-blue">
                          Active Phase
                        </span>
                      ) : null}
                    </div>
                    <h3 className="text-base font-display font-semibold text-ink-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-ink-secondary font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* 7. Technical Resources */}
        {campaign.resources && campaign.resources.length > 0 ? (
          <div className="mb-12">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
                Code & Documentation
              </span>
              <h2 className="text-2xl font-display font-bold text-ink-primary">
                Recommended Resources & Toolkits
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campaign.resources.map((res, idx) => (
                <a
                  key={idx}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 rounded-card bg-white border border-[#D1D5DB] hover:border-google-blue transition-all flex items-start justify-between shadow-subtle hover:shadow-card-hover"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-control bg-google-blue-light text-google-blue flex items-center justify-center shrink-0 mt-0.5">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-display font-semibold text-ink-primary group-hover:text-google-blue transition-colors mb-1">
                        {res.title}
                      </h3>
                      {res.description ? (
                        <p className="text-xs text-ink-secondary font-sans leading-relaxed">
                          {res.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-google-blue transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </div>
        ) : null}

        {/* 8. FAQs */}
        {campaign.faqs && campaign.faqs.length > 0 ? (
          <div className="mb-12">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl font-display font-bold text-ink-primary">
                Everything You Need to Know
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {campaign.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-card bg-white border border-[#D1D5DB] shadow-subtle"
                >
                  <h3 className="text-base font-display font-semibold text-ink-primary mb-2 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-google-blue shrink-0" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-sm text-ink-secondary font-sans leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* 9. Final Registration Callout */}
        <div className="p-8 sm:p-12 rounded-surface bg-white border border-[#D1D5DB] text-center flex flex-col items-center shadow-card">
          <Badge variant={isActive ? "live" : "upcoming"} pulse={isActive} className="mb-4">
            {isActive ? "REGISTRATIONS OPEN" : "INITIATIVE DETAILS"}
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink-primary mb-3">
            Participate in {campaign.title}
          </h2>
          <p className="text-sm text-ink-secondary max-w-xl mb-6">
            See the events in this series and register on Commudle.
          </p>
          {campaign.registrationUrl ? (
            <PrimaryButton
              href={campaign.registrationUrl}
              isExternal
              size="lg"
              icon={<ExternalLink className="w-4 h-4" />}
            >
              Enroll on Commudle Chapter
            </PrimaryButton>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
