"use client";

import React, { useEffect, useState } from "react";
import { List, ChevronDown } from "lucide-react";
import { ResourceTocItem } from "@/lib/types";

interface TableOfContentsProps {
  items: ResourceTocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileExpanded, setMobileExpanded] = useState<boolean>(false);

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <>
      {/* Mobile Collapsible TOC */}
      <div className="lg:hidden my-6 p-4 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-subtle">
        <button
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-ink-primary dark:text-[#F8FAFC] cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <List className="w-3.5 h-3.5 text-google-blue dark:text-[#60A5FA]" />
            <span>Table of Contents ({items.length} sections)</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-ink-secondary transition-transform ${
              mobileExpanded ? "rotate-180 text-google-blue dark:text-[#60A5FA]" : ""
            }`}
          />
        </button>

        {mobileExpanded && (
          <ul className="mt-4 pt-3 border-t border-[#D1D5DB] dark:border-[#334155] space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMobileExpanded(false)}
                  className={`text-xs font-sans block py-1 transition-colors ${
                    activeId === item.id
                      ? "text-google-blue dark:text-[#60A5FA] font-semibold"
                      : "text-ink-secondary hover:text-ink-primary dark:hover:text-[#F8FAFC]"
                  }`}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop Sticky Sidebar TOC */}
      <aside className="hidden lg:block sticky top-28 w-64 xl:w-72 shrink-0">
        <div className="p-5 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-subtle">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-secondary dark:text-gray-400 mb-4 pb-3 border-b border-[#D1D5DB] dark:border-[#334155]">
            <List className="w-3.5 h-3.5 text-google-blue dark:text-[#60A5FA]" />
            <span>Contents</span>
          </div>

          <ul className="space-y-1.5 text-xs font-sans">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`block py-1.5 px-3 rounded-control transition-all leading-snug ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-950/40 text-google-blue dark:text-[#60A5FA] font-semibold border-l-2 border-google-blue dark:border-[#60A5FA]"
                        : "text-ink-secondary dark:text-gray-400 hover:text-ink-primary dark:hover:text-[#F8FAFC] hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B]"
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
