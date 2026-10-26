"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Mic,
  Building2,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Event } from "@/lib/types";
import { formatDate, getEventImage } from "@/lib/utils";
import { DURATION, EASING } from "@/lib/motion";

interface AIDayEditionSwitcherProps {
  editions: Event[];
}

export function AIDayEditionSwitcher({ editions }: AIDayEditionSwitcherProps) {
  const shouldReduceMotion = useReducedMotion();
  // Sort editions chronologically descending (2026, 2025)
  const sortedEditions = [...editions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const [selectedSlug, setSelectedSlug] = useState<string>(
    sortedEditions[0]?.slug || ""
  );

  const activeEdition =
    sortedEditions.find((e) => e.slug === selectedSlug) || sortedEditions[0];

  if (!activeEdition) return null;

  const displayImage = getEventImage(
    activeEdition.type,
    activeEdition.image,
    activeEdition.bannerImage
  );

  const isLatest = activeEdition.slug === sortedEditions[0].slug;

  return (
    <div className="space-y-6">
      {/* Interactive Edition Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-1.5 rounded-control bg-white border border-[#D1D5DB] shadow-subtle select-none">
        <div
          role="tablist"
          aria-label="Select AI Day Edition"
          className="flex flex-wrap items-center gap-1.5"
        >
          {sortedEditions.map((edition, idx) => {
            const isSelected = edition.slug === activeEdition.slug;
            const year = edition.date.split("-")[0] || new Date(edition.date).getFullYear();
            const label = idx === 0 ? `AI Day 2.0 (${year})` : `AI Day ${year}`;

            return (
              <button
                key={edition.slug}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedSlug(edition.slug)}
                className={`relative px-3.5 py-1.5 rounded-control text-xs font-sans font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue ${
                  isSelected
                    ? "text-white"
                    : "text-ink-secondary hover:text-ink-primary hover:bg-[#F1F3F4]"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId={shouldReduceMotion ? undefined : "activeEditionTab"}
                    transition={{
                      duration: shouldReduceMotion ? 0 : DURATION.small,
                      ease: EASING.standard,
                    }}
                    className="absolute inset-0 bg-google-blue rounded-control shadow-subtle -z-0"
                  />
                )}
                <span className="relative z-10 flex items-center">
                  {label}
                  {idx === 0 && (
                    <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-white/20 text-white font-sans lowercase">
                      latest
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <span className="text-xs font-sans text-ink-secondary hidden sm:inline-block px-3">
          3 Documented Flagship Editions
        </span>
      </div>

      {/* Selected Edition Spotlight Panel with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeEdition.slug}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: DURATION.small, ease: EASING.decelerate }}
          className="relative rounded-surface bg-white border border-[#D1D5DB] p-6 sm:p-10 overflow-hidden shadow-card"
        >
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-google-blue via-google-yellow to-google-green" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Details */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-full text-xs font-sans font-medium bg-google-blue-light text-google-blue border border-blue-200 inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-google-yellow" />
                {isLatest ? "Flagship Edition 2026" : "Historical Chronicle"}
              </span>

              {typeof activeEdition.registrations === "number" &&
                activeEdition.registrations > 0 && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-sans text-ink-secondary bg-[#F1F3F4] border border-[#D1D5DB] inline-flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-google-blue" />
                    <span>{activeEdition.registrations}+ Registered Builders</span>
                  </span>
                )}
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-ink-primary tracking-tight leading-tight mb-3">
              {activeEdition.title}
            </h3>

            <p className="text-sm sm:text-base text-ink-secondary font-sans leading-relaxed mb-6 max-w-xl">
              {activeEdition.description}
            </p>

            {/* Quick Metadata Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 mb-6 border-y border-[#D1D5DB] text-xs font-sans w-full">
              <div className="flex items-start gap-2.5 text-ink-primary">
                <Calendar className="w-4 h-4 text-google-blue shrink-0 mt-0.5" />
                <div>
                  <span className="text-ink-secondary block text-[10px] uppercase">Summit Date</span>
                  <span className="text-ink-primary font-semibold">{formatDate(activeEdition.date)}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-ink-primary">
                <MapPin className="w-4 h-4 text-google-red shrink-0 mt-0.5" />
                <div>
                  <span className="text-ink-secondary block text-[10px] uppercase">Venue Location</span>
                  <span className="text-ink-primary font-semibold truncate max-w-[240px]" title={activeEdition.venue}>
                    {activeEdition.venue}
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Speakers Snippet if present */}
            {activeEdition.speakers && activeEdition.speakers.length > 0 && (
              <div className="mb-6 w-full">
                <span className="text-xs font-sans font-semibold uppercase tracking-wider text-ink-secondary block mb-2">
                  Featured Keynotes & Mentors
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeEdition.speakers.map((spk, i) => {
                    const name = typeof spk === "string" ? spk : spk.name;
                    return (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-control text-xs font-sans bg-[#F1F3F4] text-ink-primary border border-transparent inline-flex items-center gap-1.5"
                      >
                        <Mic className="w-3 h-3 text-google-blue" />
                        <span>{name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Collaborators Snippet if present */}
            {activeEdition.collaborators && activeEdition.collaborators.length > 0 && (
              <div className="mb-8 w-full">
                <span className="text-xs font-sans font-semibold uppercase tracking-wider text-ink-secondary block mb-2">
                  Partner Ecosystem
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeEdition.collaborators.map((collab, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-control text-xs font-sans bg-[#F1F3F4] text-ink-secondary border border-transparent inline-flex items-center gap-1.5"
                    >
                      <Building2 className="w-3 h-3 text-ink-secondary" />
                      <span>{collab}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Link
                href={`/events/${activeEdition.slug}`}
                className="px-5 py-2.5 bg-google-blue hover:bg-google-blue-dark text-white text-xs sm:text-sm font-sans font-medium rounded-control text-center transition-colors shadow-subtle inline-flex items-center justify-center gap-2"
              >
                <span>View Full Event Chronicle</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {activeEdition.commudleUrl && (
                <a
                  href={activeEdition.commudleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-white border border-[#D1D5DB] hover:border-google-blue text-xs sm:text-sm font-sans font-medium text-ink-primary hover:text-google-blue rounded-control text-center transition-colors inline-flex items-center justify-center gap-1.5 shadow-subtle"
                >
                  <span>Commudle Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                </a>
              )}
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 w-full">
            <div className="relative aspect-video lg:aspect-[4/3] w-full rounded-card overflow-hidden border border-[#D1D5DB] bg-[#F1F3F4] shadow-subtle">
              <Image
                src={displayImage}
                alt={activeEdition.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            <div className="mt-3 p-3.5 rounded-card bg-[#FAFAFA] border border-[#D1D5DB] text-xs text-ink-secondary font-sans flex items-center justify-between">
              <span>Host Institute: {activeEdition.venue}</span>
              <span className="text-ink-secondary">• Central India</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
);
}
