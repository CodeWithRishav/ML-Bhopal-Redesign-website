import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Users, Mic, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Event } from "@/lib/types";
import { formatDate, getEventImage } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  priority?: boolean;
}

export function EventCard({ event, priority = false }: EventCardProps) {
  const isUpcoming = event.status?.toLowerCase() === "upcoming";
  const displayImage = getEventImage(event.type, event.image, event.bannerImage);

  // Category styling based on event type
  const typeLower = event.type?.toLowerCase() || "";
  let categoryBadgeVariant: "google" | "live" | "amber" | "violet" | "cyan" | "outline" | "orange" = "outline";
  if (typeLower.includes("workshop") || typeLower.includes("codelab")) {
    categoryBadgeVariant = "google"; // Blue
  } else if (typeLower.includes("hackathon") || typeLower.includes("sprint")) {
    categoryBadgeVariant = "orange"; // Orange
  } else if (typeLower.includes("meetup") || typeLower.includes("community")) {
    categoryBadgeVariant = "live"; // Green
  } else if (typeLower.includes("conference") || typeLower.includes("summit") || typeLower.includes("flagship")) {
    categoryBadgeVariant = "amber"; // Yellow
  }

  const categoryLabel = event.type
    ? event.type.charAt(0).toUpperCase() + event.type.slice(1)
    : "Event";

  return (
    <Link
      href={`/events/${event.slug}`}
      aria-label={`View details for ${event.title}`}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A00] focus-visible:ring-offset-2 rounded-2xl"
    >
      <article className="flex flex-col h-full bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] group-hover:border-[#4285F4] dark:group-hover:border-[#60A5FA] rounded-2xl overflow-hidden shadow-subtle group-hover:shadow-card-hover group-hover:-translate-y-1 transition-all duration-200">
        {/* 16:9 Image Container */}
        <div className="relative aspect-video w-full bg-[#E5E7EB] dark:bg-[#0F172A] overflow-hidden">
          <Image
            src={displayImage}
            alt={event.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap z-10">
            <Badge variant={categoryBadgeVariant}>
              {categoryLabel}
            </Badge>
            {isUpcoming && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-[#34A853] text-white shadow-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                UPCOMING
              </span>
            )}
            {event.featured && !isUpcoming && (
              <span className="inline-flex items-center gap-1 text-[11px] font-sans font-medium px-2 py-0.5 rounded-full bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-sm text-[#4285F4] dark:text-[#60A5FA] border border-[#D1D5DB] dark:border-[#334155] shadow-subtle">
                <Sparkles className="w-3 h-3 text-[#FBBC05]" />
                Featured
              </span>
            )}
          </div>

          {/* Verified Registration Count pill */}
          {typeof event.registrations === "number" && event.registrations > 0 && (
            <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-sans text-[#334155] dark:text-[#94A3B8] flex items-center gap-1.5 border border-[#D1D5DB] dark:border-[#334155] shadow-subtle z-10">
              <Users className="w-3 h-3 text-[#4285F4] dark:text-[#60A5FA]" />
              <span>{event.registrations}+ registered</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="flex flex-col flex-1 p-5">
          {/* Date and Time meta */}
          <div className="flex items-center gap-2 text-xs font-sans text-[#334155] dark:text-[#94A3B8] mb-2">
            <Calendar className="w-3.5 h-3.5 text-[#4285F4] dark:text-[#60A5FA] shrink-0" />
            <time dateTime={event.date}>{formatDate(event.date)}</time>
            {event.time && <span>• {event.time}</span>}
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-display font-bold text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#4285F4] dark:group-hover:text-[#60A5FA] transition-colors line-clamp-2 leading-snug mb-2">
            {event.title}
          </h3>

          {/* Description / Tagline */}
          <p className="text-xs sm:text-sm text-[#334155] dark:text-[#94A3B8] line-clamp-2 leading-relaxed mb-4 flex-1">
            {event.tagline || event.description}
          </p>

          {/* Speakers Snippet (if verified) */}
          {event.speakers && event.speakers.length > 0 && (
            <div className="mb-3.5 flex items-center gap-1.5 text-xs text-[#334155] dark:text-[#94A3B8] font-sans">
              <Mic className="w-3 h-3 text-[#34A853] shrink-0" />
              <span className="truncate">
                {event.speakers.length === 1
                  ? typeof event.speakers[0] === "string"
                    ? event.speakers[0]
                    : event.speakers[0].name
                  : `${typeof event.speakers[0] === "string" ? event.speakers[0] : event.speakers[0].name} +${event.speakers.length - 1} more`}
              </span>
            </div>
          )}

          {/* Footer Meta: Venue & CTA */}
          <div className="pt-3 border-t border-[#D1D5DB] dark:border-[#334155] flex items-center justify-between text-xs text-[#334155] dark:text-[#94A3B8] gap-2">
            <span className="flex items-center gap-1.5 truncate max-w-[200px]" title={event.venue}>
              <MapPin className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
              <span className="truncate">{event.venue}</span>
            </span>
            <span
              className={`font-semibold inline-flex items-center gap-1 shrink-0 ${
                isUpcoming
                  ? "text-[#FF7A00] group-hover:text-[#FF9A3D]"
                  : "text-[#4285F4] dark:text-[#60A5FA]"
              }`}
            >
              <span>{isUpcoming ? "Register Now" : "Chronicle"}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
