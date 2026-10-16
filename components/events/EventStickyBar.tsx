"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ExternalLink, ArrowRight, CheckCircle2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface EventStickyBarProps {
  title: string;
  date: string;
  isUpcoming: boolean;
  registrationUrl: string;
  categoryLabel: string;
}

export function EventStickyBar({
  title,
  date,
  isUpcoming,
  registrationUrl,
  categoryLabel,
}: EventStickyBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 380);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Quick event actions"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#D1D5DB] py-3 px-4 sm:px-6 shadow-elevation-2 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Event Snapshot */}
        <div className="min-w-0 flex-1 flex items-center gap-3">
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-sans font-medium text-google-blue uppercase tracking-wider">
              {categoryLabel} • {isUpcoming ? "Upcoming Gathering" : "Concluded Event"}
            </span>
            <span className="text-sm font-display font-semibold text-ink-primary truncate max-w-md">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-sans text-ink-secondary sm:border-l sm:border-[#D1D5DB] sm:pl-3">
            <Calendar className="w-3.5 h-3.5 text-google-blue shrink-0" />
            <span className="truncate">{formatDate(date)}</span>
          </div>
        </div>

        {/* Right Action Button */}
        <div className="flex items-center gap-2 shrink-0">
          {isUpcoming ? (
            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-google-blue hover:bg-google-blue-dark active:bg-[#0842A0] text-white text-xs sm:text-sm font-medium rounded-control shadow-subtle transition-all inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span className="hidden sm:inline">Register Free on Commudle</span>
              <span className="sm:hidden">Register Free</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="hidden md:inline-flex items-center gap-1 text-xs font-sans text-ink-secondary">
                <CheckCircle2 className="w-3.5 h-3.5 text-google-green" />
                <span>Concluded</span>
              </span>
              <a
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#F1F3F4] hover:bg-gray-200 text-ink-primary border border-[#D1D5DB] text-xs font-medium rounded-control transition-colors inline-flex items-center gap-1"
              >
                <span>Chronicle</span>
                <ExternalLink className="w-3 h-3 text-ink-secondary" />
              </a>
              <Link
                href="/events"
                className="px-3 py-1.5 bg-google-blue-light hover:bg-blue-100 text-google-blue border border-blue-200 text-xs font-medium rounded-control transition-colors inline-flex items-center gap-1"
              >
                <span>Events</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
