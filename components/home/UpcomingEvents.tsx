import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, MapPin, Users, ExternalLink, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Tag } from "@/components/ui/Tag";
import { Event } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface UpcomingEventsProps {
  upcomingEvents?: Event[];
  recentEvents?: Event[];
  events?: Event[];
}

export function UpcomingEvents({
  upcomingEvents,
  recentEvents,
  events,
}: UpcomingEventsProps) {
  const upcoming = upcomingEvents || (events ? events.filter((e) => e.status?.toLowerCase() === "upcoming") : []);
  const featured = upcoming[0];
  const displayRecent = recentEvents || (events ? events.filter((e) => e.status?.toLowerCase() !== "upcoming").slice(0, 3) : []);

  return (
    <section className="relative py-20 sm:py-28 bg-white dark:bg-[#0F172A] border-b border-[#D1D5DB] dark:border-[#334155] transition-colors">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primary dark:text-[#FF9A3D] mb-2 block">
              COMMUNITY GATHERINGS
            </span>
            <h2 className="font-display font-black tracking-tight text-ink-primary dark:text-[#F8FAFC] text-3xl sm:text-4xl lg:text-5xl uppercase">
              Upcoming &amp; Past Summits<span className="text-google-green">.</span>
            </h2>
          </div>

          <Link
            href="/events"
            className="text-xs font-semibold uppercase tracking-wider text-google-blue dark:text-[#60A5FA] hover:text-google-blue-dark dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1.5"
          >
            <span>Explore Complete Archive (22+ Gatherings)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ============================================================== */}
        {/* 1. LARGE FEATURED UPCOMING EVENT SPOTLIGHT                       */}
        {/* ============================================================== */}
        {featured && (
          <div className="rounded-2xl bg-[#FAFAFA] dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] overflow-hidden shadow-subtle mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 lg:p-12 items-center">
              
              {/* Event Poster / Photography (5 cols) */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#D1D5DB] dark:border-[#334155] shadow-elevation-1 bg-slate-900 group">
                  <Image
                    src={featured.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop"}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-google-green text-white text-xs font-mono font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>NEXT UPCOMING</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-xs font-mono uppercase text-google-yellow font-medium block">
                      {featured.location || "Bhopal, MP"}
                    </span>
                    <span className="text-sm font-semibold truncate block">
                      {featured.venue}
                    </span>
                  </div>
                </div>
              </div>

              {/* Event Metadata & Narrative (7 cols) */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-mono font-bold text-google-blue dark:text-[#60A5FA] bg-google-blue-light/60 dark:bg-[#1A3A6E]/50 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900">
                    Flagship Summit
                  </span>
                  <span className="text-xs font-mono text-ink-secondary dark:text-[#94A3B8]">
                    Registration Open
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-ink-primary dark:text-[#F8FAFC] tracking-tight leading-tight mb-4">
                  {featured.title}
                </h3>

                <p className="font-sans text-sm sm:text-base text-ink-secondary dark:text-[#94A3B8] leading-relaxed mb-6">
                  {featured.description || featured.tagline}
                </p>

                {/* Logistics Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 w-full max-w-lg text-xs font-sans">
                  <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white dark:bg-[#0F172A] border border-[#D1D5DB] dark:border-[#334155] text-ink-primary dark:text-[#F8FAFC]">
                    <Calendar className="w-4 h-4 text-google-blue shrink-0" />
                    <span className="font-medium">{formatDate(featured.date)}</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white dark:bg-[#0F172A] border border-[#D1D5DB] dark:border-[#334155] text-ink-primary dark:text-[#F8FAFC]">
                    <Clock className="w-4 h-4 text-google-yellow shrink-0" />
                    <span className="font-medium">{featured.time || "10:00 AM - 05:00 PM IST"}</span>
                  </div>
                </div>

                {/* Focus Topics */}
                {featured.topics && (
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {featured.topics.map((t: string, idx: number) => (
                      <Tag key={idx} variant="domain">{t}</Tag>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#D1D5DB] dark:border-[#334155] w-full">
                  <PrimaryButton
                    href={featured.commudleUrl || "https://www.commudle.com/communities/ml-bhopal"}
                    isExternal
                    size="md"
                    icon={<ExternalLink className="w-3.5 h-3.5" />}
                  >
                    RSVP on Commudle
                  </PrimaryButton>

                  <SecondaryButton
                    href={`/events/${featured.slug}`}
                    size="md"
                  >
                    View Agenda &amp; Speakers
                  </SecondaryButton>

                  {featured.registrations && (
                    <div className="flex items-center gap-1.5 text-xs text-ink-secondary dark:text-[#94A3B8] ml-auto">
                      <Users className="w-3.5 h-3.5 text-google-blue" />
                      <span>{featured.registrations}+ registered</span>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 2. RECENT GATHERINGS ARCHIVE (Horizontal Editorial Rows)       */}
        {/* Not repeated cards — IMAGE | EVENT INFORMATION rows            */}
        {/* ============================================================== */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#D1D5DB] dark:border-[#334155]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink-primary dark:text-[#F8FAFC]">
              Recent Community Sprints &amp; Workshops
            </span>
            <span className="text-xs text-ink-tertiary font-mono">
              Archived Sessions
            </span>
          </div>

          <div className="flex flex-col divide-y divide-[#D1D5DB] dark:divide-[#334155]">
            {displayRecent.map((event) => (
              <div
                key={event.id}
                className="py-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 group hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B]/50 px-2 sm:px-4 rounded-xl transition-colors duration-200"
              >
                {/* Event Photo Thumbnail */}
                <div className="relative w-full sm:w-44 aspect-[16/10] rounded-lg overflow-hidden border border-[#D1D5DB] dark:border-[#334155] bg-slate-900 shrink-0">
                  <Image
                    src={event.image || "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop"}
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 176px"
                    className="object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Event Narrative & Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-ink-secondary dark:text-[#94A3B8] mb-1.5">
                    <span className="font-semibold text-google-blue dark:text-[#60A5FA]">
                      {formatDate(event.date)}
                    </span>
                    <span>•</span>
                    <span className="truncate">{event.venue}</span>
                    {event.registrations && (
                      <>
                        <span>•</span>
                        <span className="text-ink-tertiary">{event.registrations} Attendees</span>
                      </>
                    )}
                  </div>

                  <h4 className="text-base sm:text-lg font-display font-bold text-ink-primary dark:text-[#F8FAFC] group-hover:text-google-blue dark:group-hover:text-[#60A5FA] transition-colors mb-1 line-clamp-1">
                    {event.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-ink-secondary dark:text-[#94A3B8] font-sans line-clamp-2 leading-relaxed">
                    {event.description || event.tagline}
                  </p>
                </div>

                {/* View Details Link */}
                <Link
                  href={`/events/${event.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-primary dark:text-[#F8FAFC] group-hover:text-google-blue dark:group-hover:text-[#60A5FA] shrink-0 sm:self-center transition-colors"
                >
                  <span>Recap &amp; Slides</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}
