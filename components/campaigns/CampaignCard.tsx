"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import { TiltCard } from "@/components/motion/TiltCard";
import { Campaign } from "@/lib/types";

export interface CampaignCardProps {
  campaign: Campaign;
  featured?: boolean;
}

export function CampaignCard({ campaign, featured = false }: CampaignCardProps) {
  const statusLower = campaign.status.toLowerCase();
  const isActive = statusLower === "active";
  const isUpcoming = statusLower === "upcoming";

  const statusVariant = isActive
    ? "live"
    : isUpcoming
    ? "upcoming"
    : "past";

  const dateDisplay =
    campaign.startDate && campaign.endDate
      ? `${campaign.startDate} – ${campaign.endDate}`
      : campaign.deadline
      ? `Closes ${campaign.deadline}`
      : null;

  return (
    <TiltCard
      maxTilt={5}
      perspective={1000}
      glareEffect
      className="h-full rounded-card"
    >
      <Link
        href={`/campaigns/${campaign.slug}`}
        className="group flex flex-col h-full bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] hover:border-google-blue dark:hover:border-[#60A5FA] rounded-card overflow-hidden shadow-subtle hover:shadow-elevation-2 active:scale-[0.99] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Cover Image Banner (Depth: 4px) */}
        <div
          className="relative aspect-[16/9] w-full bg-[#F1F3F4] dark:bg-[#0F172A] overflow-hidden"
          style={{ transform: "translateZ(4px)" }}
        >
          <Image
            src={
              campaign.coverImage ||
              "/posters/build-with-ai-agents-banner.png"
            }
            alt={campaign.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <Badge variant={statusVariant} pulse={isActive}>
              {campaign.status.toUpperCase()}
            </Badge>
            <span className="px-2 py-0.5 rounded text-[11px] font-sans font-medium bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-sm text-ink-secondary dark:text-[#94A3B8] border border-gray-200 dark:border-gray-700">
              {campaign.category}
            </span>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="flex flex-col flex-1 p-6" style={{ transformStyle: "preserve-3d" }}>
          {dateDisplay ? (
            <div className="flex items-center gap-1.5 text-xs text-ink-secondary dark:text-[#94A3B8] mb-2.5">
              <Calendar className="w-3.5 h-3.5 text-google-blue dark:text-[#60A5FA]" />
              <span>{dateDisplay}</span>
            </div>
          ) : null}

          {/* Title (Depth: 8px) */}
          <h3
            className="text-xl font-display font-semibold text-ink-primary dark:text-[#F8FAFC] group-hover:text-google-blue dark:group-hover:text-[#60A5FA] transition-colors mb-2"
            style={{ transform: "translateZ(8px)" }}
          >
            {campaign.title}
          </h3>

          <p className="text-sm text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed mb-6 flex-1 line-clamp-3">
            {campaign.shortDescription || campaign.subtitle || campaign.description}
          </p>

          {/* Tracks / Badges */}
          {(campaign.metadata?.tracks || campaign.tracks) ? (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {(campaign.metadata?.tracks || campaign.tracks || []).slice(0, 3).map((track) => (
                <Tag key={track} variant="domain">{track}</Tag>
              ))}
            </div>
          ) : null}

          {/* Footer / CTA Trigger (Depth: 12px) */}
          <div
            className="pt-4 border-t border-[#D1D5DB] dark:border-[#334155] flex items-center justify-between text-xs"
            style={{ transform: "translateZ(12px)" }}
          >
            {(campaign.metadata?.incentives || campaign.incentives) ? (
              <span className="flex items-center gap-1.5 text-ink-secondary dark:text-[#94A3B8] font-sans truncate max-w-[200px]">
                <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">{campaign.metadata?.incentives || campaign.incentives}</span>
              </span>
            ) : <span />}

            <span className="inline-flex items-center gap-1 text-google-blue dark:text-[#60A5FA] font-medium transition-transform group-hover:translate-x-1.5">
              <span>Explore Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
