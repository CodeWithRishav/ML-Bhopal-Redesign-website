"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown, Download, ExternalLink, Check } from "lucide-react";

interface AddToCalendarProps {
  title: string;
  description: string;
  date: string;
  time?: string;
  venue: string;
  slug: string;
  className?: string;
}

export function AddToCalendar({
  title,
  description,
  date,
  time,
  venue,
  slug,
  className = "",
}: AddToCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Compute dates for GCal & ICS
  const parseStartAndEndDates = () => {
    let startDate: Date;
    try {
      startDate = new Date(date);
      if (isNaN(startDate.getTime())) {
        startDate = new Date();
      }
    } catch {
      startDate = new Date();
    }

    // Parse time if present (e.g., "10:00 AM - 4:00 PM" or "10:00 AM")
    let startHour = 10;
    let startMin = 0;
    let endHour = 14;
    let endMin = 0;

    if (time) {
      const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
      if (match) {
        let h = parseInt(match[1], 10);
        const m = parseInt(match[2], 10);
        const meridian = match[3]?.toUpperCase();
        if (meridian === "PM" && h < 12) h += 12;
        if (meridian === "AM" && h === 12) h = 0;
        startHour = h;
        startMin = m;
        endHour = h + 3; // default 3 hours
      }
    }

    const start = new Date(startDate);
    start.setHours(startHour, startMin, 0, 0);

    const end = new Date(start);
    end.setHours(endHour, endMin, 0, 0);

    return { start, end };
  };

  const { start, end } = parseStartAndEndDates();

  const toGCalISO = (d: Date) => {
    return d.toISOString().replace(/-|:|\.\d\d\d/g, "");
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${toGCalISO(start)}/${toGCalISO(end)}&details=${encodeURIComponent(
    description + "\n\nOrganized by ML Bhopal Developer Ecosystem.\nhttps://mlbhopal.tech/events/" + slug
  )}&location=${encodeURIComponent(venue + ", Bhopal, Madhya Pradesh, India")}`;

  const downloadIcs = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//ML Bhopal//Developer Community Platform//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${slug}-${start.getTime()}@mlbhopal.tech`,
      `DTSTAMP:${toGCalISO(new Date())}`,
      `DTSTART:${toGCalISO(start)}`,
      `DTEND:${toGCalISO(end)}`,
      `SUMMARY:${title.replace(/,/g, "\\,")}`,
      `DESCRIPTION:${description.replace(/,/g, "\\,").replace(/\n/g, "\\n")}`,
      `LOCATION:${venue.replace(/,/g, "\\,")}\\, Bhopal\\, Madhya Pradesh\\, India`,
      `URL:https://mlbhopal.tech/events/${slug}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${slug}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
      setIsOpen(false);
    }, 1500);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium font-sans text-ink-primary dark:text-[#F8FAFC] bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] rounded-control hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B] hover:border-google-blue dark:hover:border-[#60A5FA] shadow-subtle transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Calendar className="w-3.5 h-3.5 text-google-blue dark:text-[#60A5FA]" />
        <span>Add to Calendar</span>
        <ChevronDown className={`w-3.5 h-3.5 text-ink-secondary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-56 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-elevation-2 z-30 py-1 divide-y divide-gray-100 dark:divide-gray-800 animate-in fade-in zoom-in-95 duration-150">
          <div className="py-1">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 text-xs text-ink-primary dark:text-[#F8FAFC] hover:bg-google-blue-light/50 dark:hover:bg-blue-950/40 hover:text-google-blue dark:hover:text-[#60A5FA] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-google-blue" />
                <span>Google Calendar</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-ink-secondary" />
            </a>
          </div>

          <div className="py-1">
            <button
              type="button"
              onClick={downloadIcs}
              className="w-full flex items-center justify-between px-4 py-2.5 text-xs text-ink-primary dark:text-[#F8FAFC] hover:bg-gray-50 dark:hover:bg-[#1E293B] transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <Download className="w-3.5 h-3.5 text-ink-secondary" />
                <span>Apple Calendar / Outlook (.ics)</span>
              </div>
              {downloaded && <Check className="w-3.5 h-3.5 text-google-green" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
