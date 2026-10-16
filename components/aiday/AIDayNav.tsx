"use client";

import React, { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "editions", label: "Editions" },
  { id: "tracks", label: "Tracks" },
  { id: "schedule", label: "Schedule" },
  { id: "speakers", label: "Speakers" },
  { id: "gallery", label: "Chronicle" },
  { id: "faq", label: "FAQ" },
];

export function AIDayNav() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop - 120;
          if (scrollY >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-[57px] sm:top-[65px] z-30 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-b border-[#D1D5DB] dark:border-[#334155] py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium font-sans whitespace-nowrap transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue ${
                  isActive
                    ? "bg-google-blue text-white shadow-subtle dark:bg-[#60A5FA] dark:text-[#0F172A]"
                    : "text-ink-secondary dark:text-gray-400 hover:text-ink-primary dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1E293B]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
