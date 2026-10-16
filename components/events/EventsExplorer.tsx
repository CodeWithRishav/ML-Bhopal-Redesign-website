"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Event } from "@/lib/types";
import { EventCard } from "./EventCard";
import { EventFilters, FilterState } from "./EventFilters";
import {
  CalendarX,
  Sparkles,
  ExternalLink,
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Clock,
  Mic,
} from "lucide-react";
import { formatDate, getEventImage } from "@/lib/utils";

interface EventsExplorerProps {
  initialEvents: Event[];
}

export function EventsExplorer({ initialEvents }: EventsExplorerProps) {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    status: "all",
    category: "all",
  });

  // Extract unique categories from initial events
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialEvents.forEach((e) => {
      if (e.type) set.add(e.type.toLowerCase());
    });
    return Array.from(set).sort();
  }, [initialEvents]);

  // Compute filtered events
  const filteredEvents = useMemo(() => {
    return initialEvents.filter((event) => {
      // 1. Status Filter
      if (filters.status !== "all") {
        const eventStatus = (event.status || "past").toLowerCase();
        if (eventStatus !== filters.status) {
          return false;
        }
      }

      // 2. Category Filter
      if (filters.category !== "all") {
        const eventCat = (event.type || "").toLowerCase();
        if (eventCat !== filters.category.toLowerCase()) {
          return false;
        }
      }

      // 3. Search Query Filter (title, description, venue, speakers, collaborators)
      if (filters.searchQuery.trim() !== "") {
        const query = filters.searchQuery.toLowerCase().trim();
        const titleMatch = event.title?.toLowerCase().includes(query);
        const descMatch = event.description?.toLowerCase().includes(query);
        const venueMatch = event.venue?.toLowerCase().includes(query);
        const speakerMatch = event.speakers?.some((s) => {
          if (typeof s === "string") return s.toLowerCase().includes(query);
          return s.name?.toLowerCase().includes(query);
        });
        const collabMatch = event.collaborators?.some((c) =>
          c.toLowerCase().includes(query)
        );

        if (!titleMatch && !descMatch && !venueMatch && !speakerMatch && !collabMatch) {
          return false;
        }
      }

      return true;
    });
  }, [initialEvents, filters]);

  // Featured event spotlight (when viewing all without active filters)
  const isDefaultView =
    filters.searchQuery === "" &&
    filters.status === "all" &&
    filters.category === "all";

  const featuredSpotlight = useMemo(() => {
    if (!isDefaultView) return null;
    return (
      initialEvents.find((e) => e.status?.toLowerCase() === "upcoming") ||
      initialEvents.find((e) => e.featured) ||
      initialEvents[0]
    );
  }, [initialEvents, isDefaultView]);

  const spotlightImage = featuredSpotlight
    ? getEventImage(
        featuredSpotlight.type,
        featuredSpotlight.image,
        featuredSpotlight.bannerImage
      )
    : "";

  return (
    <div>
      {/* Featured / Upcoming Spotlight Header Banner */}
      {featuredSpotlight && (
        <section
          aria-label="Featured Event Spotlight"
          className="mb-10 rounded-2xl bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] relative overflow-hidden shadow-card"
        >
          {/* Google 4-Color Gradient Accent Top Line */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#4285F4] via-[#34A853] via-[#FBBC05] to-[#EA4335] z-20" />

          {/* Blueprint Grid Watermark */}
          <div className="absolute inset-0 blueprint-grid opacity-30 dark:opacity-15 pointer-events-none" />

          <div className="relative z-10 p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Event Intel & Actions (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-4">
              {/* Badges Bar */}
              <div className="flex flex-wrap items-center gap-2">
                {featuredSpotlight.status?.toLowerCase() === "upcoming" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F4EA] dark:bg-[#1E3B27] text-[#137333] dark:text-[#81C995] text-xs font-sans font-bold border border-[#A8DAB5] dark:border-green-800 shadow-subtle">
                    <span className="w-2 h-2 rounded-full bg-[#34A853] animate-ping" />
                    UPCOMING FLAGSHIP
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0FE] dark:bg-[#1A3A6E] text-[#4285F4] dark:text-[#60A5FA] text-xs font-semibold border border-[#D1D5DB] dark:border-blue-900 shadow-subtle">
                    <Sparkles className="w-3.5 h-3.5 text-[#FBBC05]" />
                    Featured Gathering
                  </span>
                )}
                <span className="text-xs font-mono font-semibold text-[#334155] dark:text-[#94A3B8] uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#FAFAFA] dark:bg-[#0F172A] border border-[#D1D5DB] dark:border-[#334155]">
                  {featuredSpotlight.type}
                </span>
                {featuredSpotlight.city && (
                  <span className="text-xs font-sans text-[#334155] dark:text-[#94A3B8]">
                    📍 {featuredSpotlight.city}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-tight">
                <Link
                  href={`/events/${featuredSpotlight.slug}`}
                  className="hover:text-[#4285F4] dark:hover:text-[#60A5FA] transition-colors"
                >
                  {featuredSpotlight.title}
                </Link>
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#334155] dark:text-[#94A3B8] leading-relaxed line-clamp-3">
                {featuredSpotlight.description}
              </p>

              {/* Key Metadata Row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#334155] dark:text-[#94A3B8] pt-1">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-[#4285F4] dark:text-[#60A5FA]" />
                  {formatDate(featuredSpotlight.date)}
                </span>
                {featuredSpotlight.time && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#FBBC05]" />
                    {featuredSpotlight.time}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#EA4335]" />
                  {featuredSpotlight.venue}
                </span>
              </div>

              {/* Live Capacity Bar (if upcoming) */}
              {featuredSpotlight.capacity && (
                <div className="w-full max-w-md pt-1">
                  <div className="flex justify-between items-center text-xs font-sans mb-1.5">
                    <span className="text-[#334155] dark:text-[#94A3B8] font-medium flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#34A853]" />
                      Seat Capacity Status
                    </span>
                    <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                      {featuredSpotlight.registrations || 0} / {featuredSpotlight.capacity} RSVPs
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E5E7EB] dark:bg-[#0F172A] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FF9A3D]"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round(
                            ((featuredSpotlight.registrations || 0) /
                              featuredSpotlight.capacity) *
                              100
                          )
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Speakers Badge */}
              {featuredSpotlight.speakers && featuredSpotlight.speakers.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-[#334155] dark:text-[#94A3B8] pt-1">
                  <Mic className="w-4 h-4 text-[#34A853] shrink-0" />
                  <span>
                    Keynote by{" "}
                    <strong className="text-[#0F172A] dark:text-[#F8FAFC]">
                      {typeof featuredSpotlight.speakers[0] === "string"
                        ? featuredSpotlight.speakers[0]
                        : featuredSpotlight.speakers[0].name}
                    </strong>
                    {featuredSpotlight.speakers.length > 1 &&
                      ` + ${featuredSpotlight.speakers.length - 1} more`}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link
                  href={`/events/${featuredSpotlight.slug}`}
                  className="px-6 py-3 rounded-xl bg-[#FF7A00] hover:bg-[#FF9A3D] active:bg-[#E66E00] text-white font-sans font-semibold text-sm inline-flex items-center gap-2 shadow-subtle hover:shadow-card-hover transition-all duration-150"
                >
                  <span>{featuredSpotlight.status === "upcoming" ? "Register Now" : "View Details"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {featuredSpotlight.commudleUrl && (
                  <a
                    href={featuredSpotlight.commudleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-white dark:bg-[#0F172A] border border-[#D1D5DB] dark:border-[#334155] hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] font-sans font-medium text-sm inline-flex items-center gap-2 transition-colors shadow-subtle"
                  >
                    <span>RSVP on Commudle</span>
                    <ExternalLink className="w-4 h-4 text-[#4285F4] dark:text-[#60A5FA]" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Visual Poster Card (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <Link
                href={`/events/${featuredSpotlight.slug}`}
                className="group block relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden border border-[#D1D5DB] dark:border-[#334155] shadow-card hover:shadow-card-hover transition-shadow"
              >
                <Image
                  src={spotlightImage}
                  alt={featuredSpotlight.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/80 block">
                    Featured Edition
                  </span>
                  <p className="text-sm font-display font-bold truncate">
                    {featuredSpotlight.title}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Filter Toolbar */}
      <EventFilters
        filters={filters}
        onFilterChange={setFilters}
        categories={categories}
        totalCount={initialEvents.length}
        filteredCount={filteredEvents.length}
      />

      {/* Grid of Event Cards — 100% visible immediately without SSR opacity 0 bug */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, idx) => (
            <div key={event.id || event.slug} className="h-full">
              <EventCard event={event} priority={idx < 3} />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 px-6 text-center rounded-2xl bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] max-w-lg mx-auto my-8 shadow-card">
          <div className="w-12 h-12 rounded-full bg-[#FAFAFA] dark:bg-[#0F172A] border border-[#D1D5DB] dark:border-[#334155] flex items-center justify-center mx-auto mb-4 text-[#334155] dark:text-[#94A3B8]">
            <CalendarX className="w-6 h-6 text-[#4285F4] dark:text-[#60A5FA]" />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-2 font-display">
            No events found
          </h3>
          <p className="text-sm text-[#334155] dark:text-[#94A3B8] mb-6 leading-relaxed font-sans">
            {filters.status === "upcoming"
              ? "There are currently no upcoming events matching this filter. Check out our past event chronicles or follow our social channels for new announcements."
              : "No events match your current filter settings. Try adjusting your search query or reset your filters to see all events."}
          </p>
          <button
            type="button"
            onClick={() =>
              setFilters({
                searchQuery: "",
                status: "all",
                category: "all",
              })
            }
            className="px-6 py-2.5 bg-[#FF7A00] hover:bg-[#FF9A3D] active:bg-[#E66E00] text-white font-sans font-semibold text-sm rounded-xl transition-colors shadow-subtle cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00]"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
