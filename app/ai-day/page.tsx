import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  Clock,
  ExternalLink,
  Mic,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { HeroGridBackground } from "@/components/ui/HeroGridBackground";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { AIDayEditionSwitcher } from "@/components/aiday/AIDayEditionSwitcher";
import { AIDayNav } from "@/components/aiday/AIDayNav";
import { AIDayFAQ } from "@/components/aiday/AIDayFAQ";
import { getAIDayEvents } from "@/lib/data";
import { formatDate } from "@/lib/utils";

const OG_IMAGE = "https://mlbhopal.tech/images/ai-day/full-house-2025.jpg";
const PAGE_DESCRIPTION =
  "AI Day Bhopal 2.0 — May 16, 2026 at LNCT, Bhopal. Talks, live demos, an intro to Gemma 4 and open models, and a Buildathon & Prompt War by ML Bhopal.";

export const metadata: Metadata = {
  title: "AI Day Bhopal 2.0 — May 16, 2026 at LNCT, Bhopal",
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/ai-day",
  },
  openGraph: {
    title: "AI Day Bhopal 2.0 — May 16, 2026 at LNCT, Bhopal | ML Bhopal",
    description: PAGE_DESCRIPTION,
    url: "https://mlbhopal.tech/ai-day",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        alt: "Full auditorium at AI Day Bhopal 2025, OIST",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Day Bhopal 2.0 — May 16, 2026 at LNCT, Bhopal | ML Bhopal",
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

// AI Day Bhopal 2.0 agenda (May 16, 2026, IST)
const SUMMIT_SCHEDULE = [
  { time: "09:00 AM", title: "Registration Opens", speaker: "Doors swing open. Grab your badge, kit, and chai.", type: "Registration" },
  { time: "09:30 AM", title: "Pre-Event Networking, Check-ins & Activities", speaker: "Warm up the room. Find your people before the talks start.", type: "Networking" },
  { time: "10:00 AM", title: "Official Kickoff & Opening Note", speaker: "ML Bhopal kicks things off and sets the tone for the day.", type: "Opening" },
  { time: "10:25 AM", title: "Launch of Radius", speaker: "AI Day Bhopal's networking & community platform — unveiled live, on the spot.", type: "Launch" },
  { time: "10:35 AM", title: "Keynote Session", speaker: "The headline talk that frames the year ahead in AI.", type: "Keynote" },
  { time: "10:55 AM", title: "Introduction to AI Agents & Building Real-World Agentic Apps with Google ADK and Gemini", speaker: "By Dr. Anukriti Bansal — from agent-loop fundamentals to shipping production agents.", type: "Talk" },
  { time: "11:50 AM", title: "Product Showcase & Live Demos", speaker: "Products, AI tools, and projects built by the community. By Anurag Mishra & Rishabh Gupta.", type: "Demos" },
  { time: "12:25 PM", title: "Building Voice AI Products from Scratch: The Klariqo Journey", speaker: "By Ansh Deb — what it actually takes to ship voice AI that calls, qualifies, and converts.", type: "Talk" },
  { time: "01:00 PM", title: "Lunch Break", speaker: "Lunch and chai on us. Use the hour — the best deals happen between courses.", type: "Break" },
  { time: "02:00 PM", title: "Introduction to Gemma 4 & Open Models", speaker: "By Rishiraj Acharya — what's new, what's possible, what to ship with it.", type: "Talk" },
  { time: "02:50 PM", title: "Buildathon & Prompt War Begins", speaker: "Heads down, terminals open. Build something real, ship something fast.", type: "Buildathon" },
  { time: "03:50 PM", title: "Winners Announcement & Prize Distribution", speaker: "Top builds, loudest cheers, biggest cheques.", type: "Awards" },
  { time: "04:05 PM", title: "Closing Remarks", speaker: "What we built, who we met, what's next. Quick and sincere.", type: "Closing" },
  { time: "04:15 PM", title: "Swag Distribution, Pictures & Networking", speaker: "Stickers, hoodies, group photos, and that one introduction that changes everything.", type: "Networking" },
];

// AI Day Bhopal 2.0 speakers
const SPEAKERS = [
  { name: "Dr. Anukriti Bansal", role: "Google Developer Expert · AI", org: "LNMIIT Jaipur" },
  { name: "Rishiraj Acharya", role: "ML Engineer @ IntelliTek Health", org: "GDE · AI · Cloud · Kaggle" },
  { name: "Ansh Deb", role: "CEO & Cofounder @ Klariqo", org: "Voice AI · Enterprise · BPO" },
];

// Photos from AI Day Bhopal 2025 (Auditorium Hall, OIST)
const GALLERY_PHOTOS = [
  {
    url: "/images/ai-day/anubhav-talk.jpg",
    caption: "Anubhav's full session on RAG · AI Day Bhopal 2025 · OIST",
  },
  {
    url: "/images/ai-day/full-house-2025.jpg",
    caption: "Full house in the auditorium · AI Day Bhopal 2025 · OIST",
  },
  {
    url: "/images/ai-day/vertex-ai-walkthrough.jpg",
    caption: "Live Vertex AI walkthrough on stage · AI Day Bhopal 2025 · OIST",
  },
];

export default function AIDayPage() {
  const aiDayEvents = getAIDayEvents();

  const sortedEditions = [...aiDayEvents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const totalEditions = sortedEditions.length;
  const latestEdition = sortedEditions[0];
  const latestRegistrations =
    typeof latestEdition?.registrations === "number" ? latestEdition.registrations : null;
  const aiDaySchema = latestEdition
    ? {
        "@context": "https://schema.org",
        "@type": "EducationEvent",
        name: "AI Day Bhopal 2.0",
        description: PAGE_DESCRIPTION,
        startDate: latestEdition.date ? `${latestEdition.date}T09:00:00+05:30` : undefined,
        endDate: latestEdition.date ? `${latestEdition.date}T17:00:00+05:30` : undefined,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: "LNCT Group of Colleges",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bhopal",
            addressRegion: "Madhya Pradesh",
            addressCountry: "IN",
          },
        },
        image: [
          OG_IMAGE,
        ],
        organizer: {
          "@type": "Organization",
          name: "ML Bhopal",
          url: "https://mlbhopal.tech",
        },
        performer: SPEAKERS.map((speaker) => ({
          "@type": "Person",
          name: speaker.name,
        })),
      }
    : null;

  return (
    <div className="relative pt-24 pb-24 bg-background dark:bg-[#0F172A] transition-colors overflow-hidden">
      {/* Blueprint Grid Background Pattern */}
      <HeroGridBackground withElements withTopBorder />

      {aiDaySchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aiDaySchema) }}
        />
      )}
      <Container className="relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: "Community", href: "/about" },
              { label: "AI Day", href: "/ai-day" },
            ]}
          />
        </div>

        {/* 1. Hero Section with ScrollReveal */}
        <ScrollReveal>
          <section aria-labelledby="aiday-hero-title" className="mb-16">
            <div className="relative rounded-surface bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] p-6 sm:p-10 lg:p-16 overflow-hidden shadow-subtle">
              {/* Blueprint Grid inside AI Day Hero */}
              <div className="absolute inset-0 blueprint-grid opacity-30 dark:opacity-15 pointer-events-none" />

              {/* Google 4-color accent top strip */}
              <div className="absolute top-0 inset-x-0 h-1 flex">
                <span className="h-full flex-1 bg-google-blue" />
                <span className="h-full flex-1 bg-google-red" />
                <span className="h-full flex-1 bg-google-yellow" />
                <span className="h-full flex-1 bg-google-green" />
              </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center pt-2">
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#F1F3F4] text-ink-secondary border border-[#D1D5DB]">
                  <span className="w-2 h-2 rounded-full bg-google-blue inline-block" />
                  ML BHOPAL • BHOPAL, MADHYA PRADESH
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-google-blue bg-blue-50 border border-blue-200">
                  AI DAY 2.0
                </span>
              </div>

              <h1
                id="aiday-hero-title"
                className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-ink-primary leading-[1.08] mb-5 sm:mb-6 break-words"
              >
                AI DAY BHOPAL
              </h1>

              <p className="font-sans text-base sm:text-lg md:text-xl text-ink-secondary leading-relaxed max-w-2xl mb-8 sm:mb-10 text-balance">
                AI Day Bhopal 2.0 on Saturday, May 16, 2026 at LNCT Group of Colleges, Bhopal. Talks, live demos, an introduction to Gemma 4 and open models, and a Buildathon & Prompt War, organised by ML Bhopal.
              </p>

              {/* Core Statistics Bar with Google 4-color top borders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mb-8 sm:mb-10 text-left">
                <div className="p-4 rounded-card bg-[#FAFAFA] border border-[#D1D5DB] border-t-2 border-t-google-blue">
                  <span className="text-ink-secondary block text-[11px] font-medium uppercase tracking-wider">EDITIONS</span>
                  <span className="text-2xl font-bold font-display text-ink-primary block mt-0.5">
                    {totalEditions}
                  </span>
                  <span className="text-ink-secondary text-xs">2025 and 2.0</span>
                </div>
                <div className="p-4 rounded-card bg-[#FAFAFA] border border-[#D1D5DB] border-t-2 border-t-google-green">
                  <span className="text-ink-secondary block text-[11px] font-medium uppercase tracking-wider">REGISTRATIONS</span>
                  <span className="text-2xl font-bold font-display text-google-green block mt-0.5">
                    {latestRegistrations !== null ? latestRegistrations.toLocaleString() : "—"}
                  </span>
                  <span className="text-ink-secondary text-xs">AI Day 2.0, per Commudle</span>
                </div>
                <div className="p-4 rounded-card bg-[#FAFAFA] border border-[#D1D5DB] border-t-2 border-t-google-yellow">
                  <span className="text-ink-secondary block text-[11px] font-medium uppercase tracking-wider">DATE</span>
                  <span className="text-2xl font-bold font-display text-ink-primary block mt-0.5">
                    May 16, 2026
                  </span>
                  <span className="text-ink-secondary text-xs">9:00 AM – 5:00 PM IST</span>
                </div>
                <div className="p-4 rounded-card bg-[#FAFAFA] border border-[#D1D5DB] border-t-2 border-t-google-red">
                  <span className="text-ink-secondary block text-[11px] font-medium uppercase tracking-wider">VENUE</span>
                  <span className="text-2xl font-bold font-display text-ink-primary block mt-0.5">
                    LNCT
                  </span>
                  <span className="text-ink-secondary text-xs">LNCT Group of Colleges, Bhopal</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <PrimaryButton
                  href="#editions"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Current Edition
                </PrimaryButton>

                <SecondaryButton
                  href="https://www.commudle.com/communities/ml-bhopal/events"
                  isExternal
                  size="lg"
                  icon={<ExternalLink className="w-4 h-4 text-ink-secondary" />}
                >
                  Commudle Hub
                </SecondaryButton>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* In-page Sticky Navigation */}
        <AIDayNav />

        {/* 2. Current Edition & Interactive Edition Switcher */}
        <section id="editions" aria-labelledby="editions-heading" className="mb-20 scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
                Editions
              </span>
              <h2 id="editions-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight">
                AI Day Bhopal 2.0 and 2025
              </h2>
            </div>
            <p className="text-sm text-ink-secondary dark:text-gray-400 max-w-md font-sans">
              Switch between the 2.0 and 2025 editions to see the date and venue of each.
            </p>
          </div>

          <AIDayEditionSwitcher editions={aiDayEvents} />
        </section>

        {/* 3. About AI Day Section */}
        <section id="overview" aria-labelledby="about-aiday-heading" className="mb-20 scroll-mt-28">
          <div className="p-8 sm:p-12 rounded-surface bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-subtle">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-google-blue" />
              <span className="text-xs font-semibold uppercase tracking-wider text-google-blue">
                About
              </span>
            </div>
            <h2 id="about-aiday-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] mb-6">
              About AI Day Bhopal
            </h2>
            <div className="max-w-none text-base text-ink-secondary font-sans leading-relaxed space-y-4">
              <p>
                AI Day Bhopal is a one-day community event by ML Bhopal. The 2025 edition was held on March 30, 2025 at the Auditorium Hall, Oriental Institute of Science & Technology (OIST), Bhopal.
              </p>
              <p>
                AI Day Bhopal 2.0 followed on Saturday, May 16, 2026 at LNCT Group of Colleges, Bhopal, from 9:00 AM to 5:00 PM IST, with 363 registrations on Commudle.
              </p>
            </div>

            {/* Impact Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pt-8 border-t border-[#D1D5DB]">
              <div className="p-5 rounded-card bg-[#FAFAFA] border border-[#D1D5DB] border-t-2 border-t-google-blue">
                <span className="text-xs font-semibold text-google-blue uppercase tracking-wider block mb-1">On the agenda</span>
                <h3 className="text-base font-display font-semibold text-ink-primary mb-2">Talks & Live Demos</h3>
                <p className="text-xs text-ink-secondary leading-relaxed font-sans">
                  AI agents with Google ADK and Gemini, building voice AI products, and a product showcase with live demos.
                </p>
              </div>

              <div className="p-5 rounded-card bg-[#FAFAFA] border border-[#D1D5DB] border-t-2 border-t-google-green">
                <span className="text-xs font-semibold text-google-green uppercase tracking-wider block mb-1">On the agenda</span>
                <h3 className="text-base font-display font-semibold text-ink-primary mb-2">Gemma 4 & Open Models</h3>
                <p className="text-xs text-ink-secondary leading-relaxed font-sans">
                  An introduction to Gemma 4 and open models by Rishiraj Acharya.
                </p>
              </div>

              <div className="p-5 rounded-card bg-[#FAFAFA] border border-[#D1D5DB] border-t-2 border-t-google-yellow">
                <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block mb-1">On the agenda</span>
                <h3 className="text-base font-display font-semibold text-ink-primary mb-2">Buildathon & Prompt War</h3>
                <p className="text-xs text-ink-secondary leading-relaxed font-sans">
                  A hands-on Buildathon and Prompt War, followed by the winners announcement and prize distribution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Featured Speakers Section */}
        {SPEAKERS.length > 0 && (
          <section id="speakers" aria-labelledby="speakers-heading" className="mb-20 scroll-mt-28">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
                  AI Day Bhopal 2.0
                </span>
                <h2 id="speakers-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary tracking-tight">
                  Speakers
                </h2>
              </div>
              <span className="text-xs font-medium text-ink-secondary">
                May 16, 2026
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {SPEAKERS.map((speaker, idx) => {
                const initials = speaker.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                const avatarBgs = [
                  "bg-blue-100 text-google-blue",
                  "bg-green-100 text-google-green",
                  "bg-amber-100 text-amber-700",
                  "bg-red-100 text-google-red",
                ];

                return (
                  <div
                    key={idx}
                    className="p-5 rounded-card bg-white border border-[#D1D5DB] hover:shadow-elevation-1 transition-all flex items-center gap-3.5"
                  >
                    <div className={`w-11 h-11 rounded-full ${avatarBgs[idx % 4]} flex items-center justify-center font-bold text-sm shrink-0`}>
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-display font-semibold text-ink-primary truncate">
                        {speaker.name}
                      </h3>
                      <p className="text-xs text-ink-secondary truncate">
                        {speaker.role}
                      </p>
                      <p className="text-xs text-ink-secondary truncate">
                        {speaker.org}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 6. AI Day Bhopal 2.0 Schedule */}
        <section id="schedule" aria-labelledby="schedule-heading" className="mb-20 scroll-mt-28">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
              Run of show
            </span>
            <h2 id="schedule-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight">
              Summit Schedule Blueprint
            </h2>
            <p className="text-sm text-ink-secondary mt-1 max-w-xl">
              The agenda for May 16, 2026. All times IST.
            </p>
          </div>

          <div className="space-y-3">
            {SUMMIT_SCHEDULE.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-card bg-white border border-[#D1D5DB] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-subtle transition-all"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-google-blue bg-blue-50 px-3 py-1.5 rounded-control border border-blue-100 shrink-0">
                    <Clock className="w-3.5 h-3.5 text-google-blue" />
                    <span>{item.time}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-display font-semibold text-ink-primary">
                      {item.title}
                    </h3>
                    <p className="text-xs text-ink-secondary mt-0.5">
                      {item.speaker}
                    </p>
                  </div>
                </div>

                <span className="self-start sm:self-auto px-2.5 py-1 rounded-full text-xs font-medium bg-[#F1F3F4] text-ink-secondary border border-[#D1D5DB]">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Registration Section */}
        <section aria-labelledby="registration-heading" className="mb-20">
          <div className="p-8 sm:p-14 rounded-surface bg-white border border-[#D1D5DB] text-center flex flex-col items-center shadow-subtle relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-google-blue" />

            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-google-green border border-emerald-200 mb-4">
              ML BHOPAL ON COMMUDLE
            </span>

            <h2 id="registration-heading" className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-ink-primary tracking-tight mb-4">
              AI Day Bhopal 2.0 on Commudle
            </h2>

            <p className="text-base text-ink-secondary max-w-xl mb-8 leading-relaxed font-sans">
              AI Day registrations are hosted on the ML Bhopal community page on Commudle, where 363 people registered for AI Day Bhopal 2.0.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <MagneticButton maxDistance={6}>
                <PrimaryButton
                  href="https://www.commudle.com/communities/ml-bhopal/events"
                  isExternal
                  size="lg"
                  icon={<ExternalLink className="w-4 h-4" />}
                >
                  ML Bhopal on Commudle
                </PrimaryButton>
              </MagneticButton>

              <SecondaryButton
                href="/events"
                size="lg"
              >
                Browse All Community Events
              </SecondaryButton>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-ink-secondary pt-4 border-t border-[#D1D5DB]">
              <span>LNCT Group of Colleges, Bhopal, Madhya Pradesh</span>
            </div>
          </div>
        </section>

        {/* 8. Gallery Section */}
        <section id="gallery" aria-labelledby="gallery-heading" className="mb-20 scroll-mt-28">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
              Visual Chronicle
            </span>
            <h2 id="gallery-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight">
              AI Day Visual Chronicle
            </h2>
            <p className="text-sm text-ink-secondary dark:text-gray-400 mt-1">
              Photos from AI Day Bhopal 2025, held at the Auditorium Hall, OIST, Bhopal.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_PHOTOS.map((photo, idx) => (
              <div
                key={idx}
                tabIndex={0}
                aria-label={photo.caption}
                className="group relative aspect-video rounded-card overflow-hidden border border-[#D1D5DB] dark:border-[#334155] bg-[#FAFAFA] dark:bg-[#0F172A] shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue"
              >
                <Image
                  src={photo.url}
                  alt={photo.caption}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus:opacity-100 transition-opacity flex items-end p-3 pointer-events-none">
                  <span className="text-xs font-medium text-white">
                    {photo.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8.5. Frequently Asked Questions */}
        <AIDayFAQ />

        {/* 9. Previous Editions Archive Table */}
        <section aria-labelledby="archive-heading" className="pt-8 border-t border-[#D1D5DB]">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
                Archive
              </span>
              <h2 id="archive-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary tracking-tight">
                Editions
              </h2>
            </div>
            <Link
              href="/events?category=flagship"
              className="text-xs font-medium text-google-blue hover:underline inline-flex items-center gap-1"
            >
              <span>Explore Flagships</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#D1D5DB] rounded-card overflow-hidden bg-white shadow-subtle">
              <thead className="bg-[#FAFAFA] border-b border-[#D1D5DB] text-ink-secondary">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">EDITION</th>
                  <th className="py-3.5 px-4 font-semibold">DATE</th>
                  <th className="py-3.5 px-4 font-semibold">VENUE</th>
                  <th className="py-3.5 px-4 font-semibold">REGISTRATIONS</th>
                  <th className="py-3.5 px-4 font-semibold text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D1D5DB] text-ink-primary">
                {sortedEditions.map((edition) => (
                  <tr key={edition.slug} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-4 px-4 font-display font-semibold text-ink-primary">
                      {edition.title}
                    </td>
                    <td className="py-4 px-4 text-ink-secondary">{formatDate(edition.date)}</td>
                    <td className="py-4 px-4 text-ink-secondary">{edition.venue}</td>
                    <td className="py-4 px-4">
                      {edition.registrations ? (
                        <span className="text-google-green font-semibold">{edition.registrations} (Commudle)</span>
                      ) : (
                        <span className="text-ink-secondary">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        href={`/events/${edition.slug}`}
                        className="text-google-blue hover:underline inline-flex items-center gap-1 font-semibold"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Container>
    </div>
  );
}
