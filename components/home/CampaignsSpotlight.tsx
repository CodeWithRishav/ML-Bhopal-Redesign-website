"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Trophy, ExternalLink, Sparkles, Layers } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Campaign } from "@/lib/types";

export function CampaignsSpotlight({ campaigns }: { campaigns: Campaign[] }) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!campaigns || campaigns.length === 0) return null;

  const currentCamp = campaigns[selectedIdx] || campaigns[0];
  const otherCampaigns = campaigns.filter((_, idx) => idx !== selectedIdx);

  return (
    <section className="relative py-20 sm:py-28 bg-[#FAFAFA] dark:bg-[#0F172A] border-b border-[#D1D5DB] dark:border-[#334155] transition-colors">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primary dark:text-[#FF9A3D] mb-2 block">
              INITIATIVES
            </span>
            <h2 className="font-display font-black tracking-tight text-ink-primary dark:text-[#F8FAFC] text-3xl sm:text-4xl lg:text-5xl uppercase">
              Current Campaigns<span className="text-google-blue">.</span>
            </h2>
          </div>

          <Link
            href="/campaigns"
            className="text-xs font-semibold uppercase tracking-wider text-google-blue dark:text-[#60A5FA] hover:text-google-blue-dark dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1.5"
          >
            <span>View All Campaigns</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ============================================================== */}
        {/* FEATURED CAMPAIGN SPLIT HERO COMPOSITION (Not a small card)     */}
        {/* ============================================================== */}
        <div className="rounded-2xl bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] overflow-hidden shadow-subtle mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 lg:p-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Status & Deadline Pills */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-google-green-light dark:bg-[#1E3B27] text-google-green dark:text-[#81C995] text-xs font-mono font-bold border border-green-200 dark:border-green-900">
                  <span className="w-1.5 h-1.5 rounded-full bg-google-green animate-pulse" />
                  ACTIVE
                </span>
                {currentCamp.deadline && (
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-ink-secondary dark:text-[#94A3B8]">
                    <Clock className="w-3 h-3 text-google-blue dark:text-[#60A5FA]" />
                    <span>Deadline: {currentCamp.deadline}</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-ink-primary dark:text-[#F8FAFC] tracking-tight leading-tight mb-4">
                {currentCamp.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-sm sm:text-base text-ink-secondary dark:text-[#94A3B8] leading-relaxed mb-6 max-w-xl">
                {currentCamp.description || currentCamp.shortDescription}
              </p>

              {/* Metadata Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {(currentCamp.metadata?.tracks || currentCamp.tracks || []).map((t: string) => (
                  <Tag key={t} variant="domain">{t}</Tag>
                ))}
              </div>

              {/* Incentives Strip */}
              {(currentCamp.metadata?.incentives || currentCamp.incentives) && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAFAFA] dark:bg-[#0F172A] border border-[#D1D5DB] dark:border-[#334155] text-xs text-ink-secondary dark:text-[#94A3B8] mb-8 w-full max-w-lg">
                  <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>
                    <strong className="text-ink-primary dark:text-[#F8FAFC] font-semibold">Perks:</strong>{" "}
                    {currentCamp.metadata?.incentives || currentCamp.incentives}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <PrimaryButton
                  href={currentCamp.actionUrl || currentCamp.registrationUrl || "https://commudle.com/communities/ml-bhopal"}
                  isExternal
                  size="md"
                  icon={<ExternalLink className="w-3.5 h-3.5" />}
                >
                  Enroll on Commudle
                </PrimaryButton>

                <SecondaryButton
                  href={`/campaigns/${currentCamp.slug}`}
                  size="md"
                >
                  View Campaign Details
                </SecondaryButton>
              </div>
            </div>

            {/* Right Large Visual Artwork Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#D1D5DB] dark:border-[#334155] shadow-elevation-1 bg-slate-900 group">
                <Image
                  src={currentCamp.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"}
                  alt={currentCamp.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Overlay Metadata */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-google-yellow font-semibold block">
                    {currentCamp.category || "Campaign"}
                  </span>
                  <span className="text-sm font-semibold truncate block">
                    {currentCamp.shortDescription || currentCamp.title}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* COMPACT HORIZONTAL SELECTOR / OTHER CAMPAIGNS STRIP             */}
        {/* ============================================================== */}
        {otherCampaigns.length > 0 && (
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-tertiary dark:text-[#64748B] block mb-3">
              Other Active &amp; Upcoming Initiatives:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherCampaigns.map((camp, idx) => (
                <div
                  key={camp.id}
                  onClick={() => setSelectedIdx(campaigns.findIndex(c => c.id === camp.id))}
                  className="p-4 rounded-xl bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] hover:border-google-blue dark:hover:border-[#60A5FA] transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-mono uppercase font-semibold text-google-blue dark:text-[#60A5FA]">
                        {camp.category || "Initiative"}
                      </span>
                      <span className="text-[10px] font-mono text-ink-tertiary">
                        {camp.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-display font-bold text-ink-primary dark:text-[#F8FAFC] group-hover:text-google-blue dark:group-hover:text-[#60A5FA] transition-colors line-clamp-1 mb-1">
                      {camp.title}
                    </h4>
                    <p className="text-xs text-ink-secondary dark:text-[#94A3B8] line-clamp-2 leading-relaxed">
                      {camp.shortDescription || camp.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-[#D1D5DB]/60 dark:border-[#334155]/60 flex items-center justify-between text-[11px] font-medium text-google-blue dark:text-[#60A5FA]">
                    <span>View Spotlight</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </Container>
    </section>
  );
}
