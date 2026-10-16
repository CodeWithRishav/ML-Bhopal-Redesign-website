import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EventsExplorer } from "@/components/events/EventsExplorer";
import { HeroGridBackground } from "@/components/ui/HeroGridBackground";
import { getEvents } from "@/lib/data";
import { Calendar, Users, ExternalLink, Sparkles, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Events & Workshops — Learn, Build & Connect",
  description:
    "Learn, build and connect through community-led experiences. Browse upcoming meetups, hands-on workshops, hackathons, and flagship AI summits in Central India.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Events & Workshops — ML Bhopal",
    description:
      "Learn, build and connect through community-led experiences. Central India's premier AI/ML community gatherings.",
    url: "https://mlbhopal.tech/events",
    type: "website",
    images: [
      {
        url: "/posters/build-with-ai-agents-banner.png",
        width: 1200,
        height: 630,
        alt: "ML Bhopal Events & Workshops",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events & Workshops — ML Bhopal",
    description:
      "Learn, build and connect through community-led experiences. Central India's premier AI/ML community gatherings.",
    images: ["/posters/build-with-ai-agents-banner.png"],
  },
};

export default function EventsPage() {
  const events = getEvents();

  // Aggregate verified event metrics
  const totalEvents = events.length;
  const totalRegistrations = events.reduce((acc, curr) => {
    return acc + (typeof curr.registrations === "number" ? curr.registrations : 0);
  }, 0);

  return (
    <div className="relative pt-24 pb-20 bg-[#FAFAFA] dark:bg-[#0F172A] transition-colors overflow-hidden">
      {/* Blueprint Grid Background Pattern */}
      <HeroGridBackground withElements withTopBorder />

      <Container className="relative z-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: "Events", href: "/events" }]} />

        {/* Page Header */}
        <div className="my-8">
          <SectionHeader
            as="h1"
            eyebrow="Community Gatherings"
            title="Events, Summits & Code Sprints"
            description="Learn, build and connect through community-led experiences across Central India. From flagship AI Day summits to weekend code labs."
            action={
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://www.commudle.com/communities/ml-bhopal/events"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] hover:border-[#4285F4] dark:hover:border-[#60A5FA] text-xs font-sans font-medium text-[#0F172A] dark:text-[#F8FAFC] hover:text-[#4285F4] dark:hover:text-[#60A5FA] transition-colors inline-flex items-center gap-1.5 shadow-subtle"
                >
                  <span>Commudle Chapter</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#4285F4] dark:text-[#60A5FA]" />
                </a>
                <a
                  href="https://luma.com/user/mlbhopal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] hover:border-[#4285F4] dark:hover:border-[#60A5FA] text-xs font-sans font-medium text-[#0F172A] dark:text-[#F8FAFC] hover:text-[#4285F4] dark:hover:text-[#60A5FA] transition-colors inline-flex items-center gap-1.5 shadow-subtle"
                >
                  <span>Luma Hub</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#4285F4] dark:text-[#60A5FA]" />
                </a>
              </div>
            }
          />
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-subtle mb-10 text-xs font-sans">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F0FE] dark:bg-[#1A3A6E] text-[#4285F4] dark:text-[#60A5FA] flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[#334155] dark:text-[#94A3B8] block text-[11px] font-mono uppercase">Total Gatherings</span>
              <span className="text-[#0F172A] dark:text-[#F8FAFC] font-bold text-sm truncate block">{totalEvents} Editions</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E6F4EA] dark:bg-[#1E3B27] text-[#34A853] dark:text-[#81C995] flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[#334155] dark:text-[#94A3B8] block text-[11px] font-mono uppercase">Verified Builders</span>
              <span className="text-[#0F172A] dark:text-[#F8FAFC] font-bold text-sm truncate block">{totalRegistrations.toLocaleString()}+</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FEF7E0] dark:bg-[#3D3217] text-[#FBBC05] dark:text-[#FDD663] flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[#334155] dark:text-[#94A3B8] block text-[11px] font-mono uppercase">Tracks</span>
              <span className="text-[#0F172A] dark:text-[#F8FAFC] font-bold text-sm truncate block">5 Formats</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FCE8E6] dark:bg-[#3B1E1E] text-[#EA4335] dark:text-[#F87171] flex items-center justify-center shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#EA4335] animate-pulse" />
            </div>
            <div className="min-w-0">
              <span className="text-[#334155] dark:text-[#94A3B8] block text-[11px] font-mono uppercase">Open Access</span>
              <span className="text-[#0F172A] dark:text-[#F8FAFC] font-bold text-sm truncate block">100% Free & Community-Led</span>
            </div>
          </div>
        </div>

        {/* Interactive Event Explorer (Search, Filter, Grid, Spotlight) */}
        <EventsExplorer initialEvents={events} />
      </Container>
    </div>
  );
}
