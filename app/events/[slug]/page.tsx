import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Users,
  Mic,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Navigation,
  Building2,
  Share2,
  Laptop,
  Trophy,
  Layers,
  MessageSquare,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { HeroGridBackground } from "@/components/ui/HeroGridBackground";
import { EventCard } from "@/components/events/EventCard";
import { EventStickyBar } from "@/components/events/EventStickyBar";
import { AddToCalendar } from "@/components/events/AddToCalendar";
import { EventShare } from "@/components/events/EventShare";
import { EventPhotoGallery } from "@/components/events/EventPhotoGallery";
import { getEventBySlug, getEvents, getRelatedEvents } from "@/lib/data";
import { formatDate, getEventImage } from "@/lib/utils";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const events = getEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found | ML Bhopal",
      description: "The requested event could not be found.",
    };
  }

  const image = getEventImage(event.type, event.image, event.bannerImage);

  return {
    title: `${event.title} — Event Details`,
    description: event.description,
    alternates: {
      canonical: `/events/${event.slug}`,
    },
    openGraph: {
      title: `${event.title} | ML Bhopal Event`,
      description: event.description,
      url: `https://mlbhopal.tech/events/${event.slug}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} | ML Bhopal Event`,
      description: event.description,
      images: [image],
    },
  };
}

// Format-adaptive metadata helper
function getFormatMetadata(type?: string) {
  const t = (type || "").toLowerCase();
  switch (t) {
    case "workshop":
      return {
        label: "Workshop",
        icon: <Laptop className="w-3.5 h-3.5" />,
        hint: "Hands-on Code Sprint • Bring Your Laptop",
        badgeText: "Hands-on Workshop",
      };
    case "hackathon":
      return {
        label: "Hackathon",
        icon: <Trophy className="w-3.5 h-3.5" />,
        hint: "Time-bound Builder Sprint • Team Competition",
        badgeText: "AI Hackathon & CTF",
      };
    case "conference":
    case "flagship":
      return {
        label: "Conference",
        icon: <Layers className="w-3.5 h-3.5" />,
        hint: "Multi-Track Summit • Keynotes & Demos",
        badgeText: "Flagship AI Summit",
      };
    case "meetup":
    default:
      return {
        label: "Meetup",
        icon: <MessageSquare className="w-3.5 h-3.5" />,
        hint: "Community Gathering • Talks & Networking",
        badgeText: "Community Meetup",
      };
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const isUpcoming = event.status?.toLowerCase() === "upcoming";
  const displayImage = getEventImage(event.type, event.image, event.bannerImage);
  const formatMeta = getFormatMetadata(event.type);
  const relatedEvents = getRelatedEvents(event.slug, event.type, 3);

  const externalRegistrationUrl =
    event.registrationUrl ||
    event.commudleUrl ||
    "https://www.commudle.com/communities/ml-bhopal/events";

  const mapQueryUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    event.venue + ", Bhopal, Madhya Pradesh"
  )}`;

  // Event Schema.org JSON-LD
  const eventStartIso = event.date ? `${event.date}T10:00:00+05:30` : undefined;
  const eventEndIso = event.date ? `${event.date}T17:00:00+05:30` : undefined;
  const eventLdJson = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: eventStartIso,
    endDate: eventEndIso,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bhopal",
        addressRegion: "Madhya Pradesh",
        addressCountry: "IN",
      },
    },
    image: [displayImage],
    organizer: {
      "@type": "Organization",
      name: "ML Bhopal",
      url: "https://mlbhopal.tech",
    },
    offers: {
      "@type": "Offer",
      url: externalRegistrationUrl,
      price: "0",
      priceCurrency: "INR",
      availability: isUpcoming
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
    },
    ...(event.speakers && event.speakers.length > 0
      ? {
          performer: event.speakers.map((s) => ({
            "@type": "Person",
            name: typeof s === "string" ? s : s.name,
          })),
        }
      : {}),
  };

  return (
    <div className="relative pt-24 pb-24 bg-background dark:bg-[#0F172A] transition-colors overflow-hidden">
      {/* Blueprint Grid Background Pattern */}
      <HeroGridBackground withElements withTopBorder />

      {/* Schema.org Event Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLdJson) }}
      />

      {/* Sticky Action Bar */}
      <EventStickyBar
        title={event.title}
        date={event.date}
        isUpcoming={isUpcoming}
        registrationUrl={externalRegistrationUrl}
        categoryLabel={formatMeta.label}
      />

      <Container className="relative z-10">
        {/* 1. Event Discovery & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <Breadcrumbs
            items={[
              { label: "Events", href: "/events" },
              { label: formatMeta.label, href: `/events?category=${event.type}` },
              { label: event.title, href: `/events/${event.slug}` },
            ]}
          />

          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs font-sans text-ink-secondary dark:text-[#94A3B8] hover:text-google-blue dark:hover:text-[#60A5FA] transition-colors self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Gatherings</span>
          </Link>
        </div>

        {/* 2. Hero Section */}
        <section aria-labelledby="event-hero-title" className="mb-12">
          <div className="relative rounded-surface bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] p-6 sm:p-10 overflow-hidden shadow-card">
            {/* Blueprint Grid inside detail card */}
            <div className="absolute inset-0 blueprint-grid opacity-30 dark:opacity-15 pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Hero Left: Details & Actions */}
              <div className="lg:col-span-7 flex flex-col items-start">
                {/* Status & Format Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {isUpcoming ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-medium bg-google-green-light text-google-green border border-green-200">
                      <span className="w-2 h-2 rounded-full bg-google-green" />
                      REGISTRATION ACTIVE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-medium bg-[#F1F3F4] text-ink-secondary border border-[#D1D5DB]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-google-green" />
                      EVENT CONCLUDED
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-sans bg-google-blue-light text-google-blue border border-blue-200">
                    {formatMeta.icon}
                    <span>{formatMeta.badgeText}</span>
                  </span>

                  {event.featured && (
                    <span className="inline-flex items-center gap-1 text-xs font-sans font-medium px-2 py-0.5 rounded-full bg-google-yellow-light text-amber-900 border border-yellow-200">
                      <Sparkles className="w-3 h-3 text-google-yellow" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Event Title (H1) */}
                <h1
                  id="event-hero-title"
                  className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-ink-primary tracking-tight leading-[1.1] mb-4"
                >
                  {event.title}
                </h1>

                {/* Subtitle / Tagline */}
                <p className="text-base sm:text-lg text-ink-secondary font-sans leading-relaxed mb-6 max-w-xl">
                  {event.tagline || event.description}
                </p>

                {/* Date, Time & Venue Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 mb-8 border-y border-[#D1D5DB] text-xs font-sans w-full">
                  <div className="flex items-start gap-2.5 text-ink-primary">
                    <Calendar className="w-4 h-4 text-google-blue shrink-0 mt-0.5" />
                    <div>
                      <span className="text-ink-secondary block text-[11px] uppercase">
                        {isUpcoming ? "Scheduled Date" : "Concluded On"}
                      </span>
                      <strong className="text-ink-primary text-sm block">
                        {formatDate(event.date)}
                      </strong>
                      <span className="text-ink-secondary text-xs">
                        {event.time || "See schedule on Commudle"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-ink-primary">
                    <MapPin className="w-4 h-4 text-google-red shrink-0 mt-0.5" />
                    <div>
                      <span className="text-ink-secondary block text-[11px] uppercase">
                        Physical Venue
                      </span>
                      <strong className="text-ink-primary text-sm block truncate max-w-[240px]" title={event.venue}>
                        {event.venue}
                      </strong>
                      <span className="text-ink-secondary text-xs">Bhopal, Madhya Pradesh</span>
                    </div>
                  </div>
                </div>

                {/* Registration CTA or Past Event Navigation */}
                {isUpcoming ? (
                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <PrimaryButton
                      href={externalRegistrationUrl}
                      isExternal
                      size="lg"
                      icon={<ExternalLink className="w-4 h-4" />}
                    >
                      Register on Commudle
                    </PrimaryButton>

                    <AddToCalendar
                      title={event.title}
                      description={event.description}
                      date={event.date}
                      time={event.time}
                      venue={event.venue}
                      slug={event.slug}
                    />

                    <EventShare
                      title={event.title}
                      description={event.description}
                    />

                    <SecondaryButton href="#about" size="lg">
                      Event Overview
                    </SecondaryButton>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <SecondaryButton
                      href={externalRegistrationUrl}
                      isExternal
                      size="lg"
                      icon={<ExternalLink className="w-4 h-4" />}
                    >
                      View on Commudle Hub
                    </SecondaryButton>

                    <Link
                      href="/events"
                      className="px-4 py-2 rounded-control text-xs sm:text-sm font-medium font-sans text-google-blue hover:text-google-blue-dark border border-[#D1D5DB] dark:border-[#334155] hover:border-google-blue bg-white dark:bg-[#1E293B] shadow-subtle transition-colors text-center inline-flex items-center justify-center gap-1.5"
                    >
                      <span>Browse Upcoming Events</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <EventShare
                      title={event.title}
                      description={event.description}
                    />
                  </div>
                )}

                {/* Free admission & platform endorsement */}
                <div className="flex flex-wrap items-center gap-2 mt-4 text-xs font-sans text-ink-secondary">
                  <span>Community Gathering</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span>Supported by</span>
                    <span className="relative h-3 w-24 inline-block">
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
                    </span>
                  </span>
                </div>
              </div>

              {/* Hero Right: 16:9 Banner Image */}
              <div className="lg:col-span-5 w-full">
                <div className="relative aspect-video w-full rounded-card overflow-hidden border border-[#D1D5DB] bg-[#F1F3F4] shadow-subtle">
                  <Image
                    src={displayImage}
                    alt={event.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  
                  {/* Verified Attendance Chip */}
                  {typeof event.registrations === "number" && event.registrations > 0 && (
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-sans font-medium text-ink-secondary flex items-center gap-1.5 border border-[#D1D5DB] shadow-subtle">
                      <Users className="w-3.5 h-3.5 text-google-blue" />
                      <span>{event.registrations}+ Verified Builders</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 p-3.5 rounded-card bg-[#FAFAFA] border border-[#D1D5DB] text-xs text-ink-secondary font-sans flex items-center justify-between">
                  <span className="truncate">Format: {formatMeta.hint}</span>
                  <a
                    href={mapQueryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-google-blue hover:underline inline-flex items-center gap-1 shrink-0 ml-2 font-medium"
                  >
                    <span>Directions</span>
                    <Navigation className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Past Event Recap Notice Banner */}
        {!isUpcoming && (
          <div className="mb-12 p-6 rounded-card bg-white border border-[#D1D5DB] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-subtle">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-control bg-google-green-light text-google-green flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-display font-semibold text-ink-primary">
                  Event Archive & Recap
                </h2>
                <p className="text-xs sm:text-sm text-ink-secondary font-sans leading-relaxed">
                  This event has concluded. See the overview below or visit our Commudle chapter.
                </p>
              </div>
            </div>

            <a
              href={externalRegistrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#FAFAFA] hover:bg-gray-100 text-ink-primary text-xs font-medium rounded-control transition-colors border border-[#D1D5DB] inline-flex items-center gap-1.5 shrink-0"
            >
              <span>Commudle Chronicle</span>
              <ExternalLink className="w-3.5 h-3.5 text-ink-secondary" />
            </a>
          </div>
        )}

        {/* 3. Event Metadata Grid */}
        <section aria-labelledby="event-metadata-heading" className="mb-12">
          <h2 id="event-metadata-heading" className="sr-only">
            Event Specifications
          </h2>
          <div className="p-6 rounded-card bg-white border border-[#D1D5DB] shadow-subtle grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-sans">
            <div>
              <span className="text-ink-secondary block mb-1 text-[11px] uppercase tracking-wider">
                Event Date & Time
              </span>
              <span className="text-ink-primary font-semibold block text-sm">
                {formatDate(event.date)}
              </span>
              <span className="text-ink-secondary text-xs">
                {event.time || "100% In-Person"}
              </span>
            </div>

            <div>
              <span className="text-ink-secondary block mb-1 text-[11px] uppercase tracking-wider">
                Format & Track
              </span>
              <span className="text-ink-primary font-semibold block text-sm">
                {formatMeta.label}
              </span>
              <span className="text-ink-secondary text-xs">{formatMeta.badgeText}</span>
            </div>

            <div>
              <span className="text-ink-secondary block mb-1 text-[11px] uppercase tracking-wider">
                Venue Location
              </span>
              <span className="text-ink-primary font-semibold block text-sm truncate" title={event.venue}>
                {event.venue}
              </span>
              <span className="text-ink-secondary text-xs">Bhopal, MP, India</span>
            </div>

            <div>
              <span className="text-ink-secondary block mb-1.5 text-[11px] uppercase tracking-wider">
                Organized By
              </span>
              <div className="relative h-6 w-24 mb-1">
                <Image
                  src="/logos/ml-bhopal-light.png"
                  alt="ML Bhopal"
                  fill
                  sizes="96px"
                  className="object-contain object-left dark:hidden"
                />
                <Image
                  src="/logos/ml-bhopal-dark.png"
                  alt="ML Bhopal"
                  fill
                  sizes="96px"
                  className="object-contain object-left hidden dark:block"
                />
              </div>
              <div className="inline-flex items-center gap-1.5 mt-1">
                <span className="text-ink-secondary text-[11px]">backed by</span>
                <div className="relative h-3 w-20">
                  <Image
                    src="/logos/google-developers-light.png"
                    alt="Google for Developers"
                    fill
                    sizes="80px"
                    className="object-contain object-left dark:hidden"
                  />
                  <Image
                    src="/logos/google-developers-dark.png"
                    alt="Google for Developers"
                    fill
                    sizes="80px"
                    className="object-contain object-left hidden dark:block"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. About & Briefing Section */}
        <section id="about" aria-labelledby="about-event-heading" className="mb-12">
          <div className="p-8 rounded-card bg-white border border-[#D1D5DB] shadow-subtle">
            <span className="text-xs font-semibold uppercase tracking-wider text-google-blue mb-2 block">
              Event Briefing
            </span>
            <h2 id="about-event-heading" className="text-2xl font-display font-bold text-ink-primary mb-4">
              About {event.title}
            </h2>
            <div className="text-base text-ink-secondary font-sans leading-relaxed whitespace-pre-line">
              <p>{event.longDescription || event.description}</p>
            </div>
          </div>
        </section>

        {/* 5. Agenda & Schedule */}
        {event.schedule && event.schedule.length > 0 && (
          <section aria-labelledby="agenda-heading" className="mb-12">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
                Timeline
              </span>
              <h2 id="agenda-heading" className="text-2xl font-display font-bold text-ink-primary">
                Event Agenda
              </h2>
            </div>
            <div className="space-y-3">
              {event.schedule.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-card bg-white border border-[#D1D5DB] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-google-blue transition-colors shadow-subtle"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs font-sans font-medium text-google-blue bg-google-blue-light px-3 py-1.5 rounded-control border border-blue-200 shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.time}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-display font-semibold text-ink-primary">
                        {item.title}
                      </h3>
                      {item.speaker && (
                        <p className="text-xs font-sans text-ink-secondary mt-0.5">
                          Speaker: {item.speaker}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. Speakers & Mentors */}
        {event.speakers && event.speakers.length > 0 && (
          <section aria-labelledby="speakers-heading" className="mb-12">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
                Distinguished Voices
              </span>
              <h2 id="speakers-heading" className="text-2xl font-display font-bold text-ink-primary">
                Featured Speakers & Mentors ({event.speakers.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {event.speakers.map((speaker, idx) => {
                const name = typeof speaker === "string" ? speaker : speaker.name;
                const role = typeof speaker === "object" ? speaker.role : "Speaker / Mentor";
                const initials = name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <div
                    key={idx}
                    className="p-5 rounded-card bg-white border border-[#D1D5DB] flex items-center gap-3.5 hover:border-google-blue transition-colors shadow-subtle"
                  >
                    <div className="w-11 h-11 rounded-full bg-google-blue-light border border-blue-200 text-google-blue flex items-center justify-center font-sans font-bold text-sm shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-display font-semibold text-ink-primary truncate">
                        {name}
                      </h3>
                      <p className="text-xs font-sans text-ink-secondary truncate">
                        {role}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 7. Partners & Collaborators */}
        {event.collaborators && event.collaborators.length > 0 && (
          <section aria-labelledby="partners-heading" className="mb-12">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
                Ecosystem
              </span>
              <h2 id="partners-heading" className="text-2xl font-display font-bold text-ink-primary">
                Partners & Collaborators
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {event.collaborators.map((collab, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-card bg-white border border-[#D1D5DB] flex items-center gap-3 shadow-subtle"
                >
                  <div className="w-10 h-10 rounded-control bg-google-blue-light text-google-blue flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-semibold text-ink-primary">
                      {collab}
                    </h3>
                    <p className="text-xs font-sans text-ink-secondary">Collaborating Organization</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. Highlights */}
        {event.highlights && event.highlights.length > 0 && (
          <section aria-labelledby="highlights-heading" className="mb-12">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
                Key Takeaways
              </span>
              <h2 id="highlights-heading" className="text-2xl font-display font-bold text-ink-primary">
                Event Highlights
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {event.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-card bg-white border border-[#D1D5DB] flex items-start gap-3 shadow-subtle"
                >
                  <CheckCircle2 className="w-5 h-5 text-google-green shrink-0 mt-0.5" />
                  <p className="text-sm text-ink-secondary font-sans leading-relaxed">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8.5. Past Event Photo Gallery Chronicle */}
        {!isUpcoming && (
          <EventPhotoGallery eventTitle={event.title} />
        )}

        {/* 9. Venue Logistics */}
        <section aria-labelledby="venue-heading" className="mb-12">
          <div className="p-8 rounded-card bg-white border border-[#D1D5DB] shadow-subtle">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-google-blue mb-2 block">
                  Location & Logistics
                </span>
                <h2 id="venue-heading" className="text-2xl font-display font-bold text-ink-primary mb-2">
                  Event Venue
                </h2>
                <div className="flex items-center gap-2 text-base text-ink-primary font-sans mb-2">
                  <MapPin className="w-4 h-4 text-google-red shrink-0" />
                  <span>{event.venue}</span>
                </div>
                <p className="text-xs text-ink-secondary max-w-xl leading-relaxed">
                  See the Commudle event page for the latest venue and entry details.
                </p>
              </div>

              <a
                href={mapQueryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-google-blue-light hover:bg-blue-100 border border-blue-200 text-xs font-medium text-google-blue rounded-control transition-colors inline-flex items-center gap-2 self-start md:self-center shrink-0"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </section>

        {/* 10. Final Action Banner */}
        <section aria-labelledby="cta-heading" className="mb-16">
          <div className="p-8 sm:p-12 rounded-surface bg-white border border-[#D1D5DB] text-center flex flex-col items-center shadow-card">
            {isUpcoming ? (
              <>
                <Badge variant="live" className="mb-4">
                  REGISTRATIONS OPEN
                </Badge>
                <h2 id="cta-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary mb-3">
                  Register for {event.title}
                </h2>
                <p className="text-sm text-ink-secondary max-w-xl mb-6 leading-relaxed">
                  Register for this event through the official ML Bhopal chapter on Commudle.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3.5">
                  <PrimaryButton
                    href={externalRegistrationUrl}
                    isExternal
                    size="lg"
                    icon={<ExternalLink className="w-4 h-4" />}
                  >
                    Register on Commudle
                  </PrimaryButton>
                  <SecondaryButton href="/events" size="lg">
                    Browse All Events
                  </SecondaryButton>
                </div>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-google-green-light text-google-green flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h2 id="cta-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary mb-3">
                  {event.title} has Concluded
                </h2>
                <p className="text-sm text-ink-secondary max-w-xl mb-6 leading-relaxed">
                  Visit the ML Bhopal chapter on Commudle to see more events.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3.5">
                  <SecondaryButton
                    href={externalRegistrationUrl}
                    isExternal
                    size="lg"
                    icon={<ExternalLink className="w-4 h-4" />}
                  >
                    View Chronicle on Commudle
                  </SecondaryButton>
                  <PrimaryButton href="/events" size="lg">
                    <span>Explore Upcoming Sprints</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </PrimaryButton>
                </div>
              </>
            )}
          </div>
        </section>

        {/* 11. Related Events */}
        {relatedEvents.length > 0 && (
          <section aria-labelledby="related-events-heading" className="pt-8 border-t border-[#D1D5DB]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
                  Keep Exploring
                </span>
                <h2 id="related-events-heading" className="text-2xl font-display font-bold text-ink-primary">
                  More Events from ML Bhopal
                </h2>
              </div>
              <Link
                href="/events"
                className="text-xs font-semibold text-google-blue hover:text-google-blue-dark transition-colors inline-flex items-center gap-1"
              >
                <span>View Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedEvents.map((evt) => (
                <EventCard key={evt.id || evt.slug} event={evt} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
