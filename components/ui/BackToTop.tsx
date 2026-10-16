"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isPastThreshold = window.scrollY > 400;
          setVisible((prev) => (prev !== isPastThreshold ? isPastThreshold : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white dark:bg-[#1E293B] text-ink-primary dark:text-[#F8FAFC] border border-[#D1D5DB] dark:border-[#334155] shadow-elevation-2 hover:shadow-elevation-3 hover:border-google-blue dark:hover:border-[#60A5FA] hover:text-google-blue dark:hover:text-[#60A5FA] transition-all duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue cursor-pointer animate-in fade-in zoom-in-75 duration-200"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
