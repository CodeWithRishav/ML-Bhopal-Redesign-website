"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Calendar,
  Sparkles,
  BookOpen,
  Users,
  Award,
  ArrowRight,
  ExternalLink,
  Flame,
  Home,
  HeartHandshake,
  Mail,
  X,
} from "lucide-react";
import { getEvents, getCampaigns, getResourceArticles } from "@/lib/data";

interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Pages" | "Events" | "Cohorts & Hackathons" | "Resources" | "Quick Actions";
  url: string;
  isExternal?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

const STATIC_PAGES: SearchItem[] = [
  { id: "page-home", title: "Home", subtitle: "ML Bhopal community homepage", category: "Pages", url: "/", icon: Home },
  { id: "page-events", title: "Events Explorer", subtitle: "Browse 17+ workshops, hackathons & meetups", category: "Pages", url: "/events", icon: Calendar },
  { id: "page-aiday", title: "AI Day Bhopal 2.0", subtitle: "Central India's premier annual AI conference", category: "Pages", url: "/ai-day", icon: Sparkles },
  { id: "page-campaigns", title: "Campaigns & Cohorts", subtitle: "Intensive build programs and hackathons", category: "Pages", url: "/campaigns", icon: Flame },
  { id: "page-resources", title: "Knowledge Hub & Resources", subtitle: "Production guides, cookbooks and curricula", category: "Pages", url: "/resources", icon: BookOpen },
  { id: "page-ambassador", title: "Campus Ambassador Program", subtitle: "Lead AI initiatives at your university", category: "Pages", url: "/ambassador", icon: Award },
  { id: "page-team", title: "Core Team & Mentors", subtitle: "Meet the organizers, leads and volunteers", category: "Pages", url: "/team", icon: Users },
  { id: "page-partners", title: "Academic & Ecosystem Partners", subtitle: "Partner universities, sponsors and platforms", category: "Pages", url: "/partners", icon: HeartHandshake },
  { id: "page-about", title: "About ML Bhopal", subtitle: "Mission, origin story, and community pillars", category: "Pages", url: "/about", icon: BookOpen },
  { id: "page-contact", title: "Contact Leadership", subtitle: "Get in touch with organizers for partnerships", category: "Pages", url: "/contact", icon: Mail },
  { id: "action-commudle", title: "Official Commudle Chapter", subtitle: "Join the community & claim event tickets", category: "Quick Actions", url: "https://commudle.com/communities/ml-bhopal", isExternal: true, icon: ExternalLink },
];

export function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input whenever opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Build searchable index from real data
  const searchIndex = useMemo<SearchItem[]>(() => {
    const items: SearchItem[] = [...STATIC_PAGES];

    // Events
    try {
      const events = getEvents();
      events.slice(0, 8).forEach((e) => {
        items.push({
          id: `event-${e.slug}`,
          title: e.title,
          subtitle: `${e.date} • ${e.venue}`,
          category: "Events",
          url: `/events/${e.slug}`,
          icon: Calendar,
        });
      });
    } catch {}

    // Campaigns
    try {
      const campaigns = getCampaigns();
      campaigns.forEach((c) => {
        items.push({
          id: `campaign-${c.slug}`,
          title: c.title,
          subtitle: `${c.category} • ${c.shortDescription || c.description}`,
          category: "Cohorts & Hackathons",
          url: `/campaigns#${c.slug}`,
          icon: Flame,
        });
      });
    } catch {}

    // Resources
    try {
      const articles = getResourceArticles();
      articles.forEach((a) => {
        items.push({
          id: `res-${a.slug}`,
          title: a.title,
          subtitle: `${a.category} • by ${a.author.name}`,
          category: "Resources",
          url: `/resources/${a.slug}`,
          icon: BookOpen,
        });
      });
    } catch {}

    return items;
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    if (!query.trim()) return searchIndex.slice(0, 12);
    const q = query.toLowerCase().trim();
    return searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query, searchIndex]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        selectItem(filteredItems[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  const selectItem = (item: SearchItem) => {
    onClose();
    if (item.isExternal) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.url);
    }
  };

  // Group filtered results by category
  const groupedResults = useMemo(() => {
    const groups: Record<string, { item: SearchItem; globalIndex: number }[]> = {};
    filteredItems.forEach((item, index) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push({ item, globalIndex: index });
    });
    return groups;
  }, [filteredItems]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command search palette"
      className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#0F172A] rounded-card border border-[#D1D5DB] dark:border-[#334155] shadow-elevation-3 overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#D1D5DB] dark:border-[#334155] gap-3">
          <Search className="w-5 h-5 text-google-blue dark:text-[#60A5FA] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type to search events, cohorts, blueprints, campuses..."
            className="w-full bg-transparent text-sm sm:text-base text-ink-primary dark:text-[#F8FAFC] placeholder:text-ink-secondary dark:placeholder:text-gray-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-ink-secondary hover:text-ink-primary dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[11px] font-mono text-gray-500 bg-gray-100 dark:bg-[#1E293B] dark:text-gray-400 border border-gray-200 dark:border-gray-700">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto p-2 divide-y divide-transparent flex-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-ink-secondary dark:text-gray-400">
              <p>No results found for &ldquo;<span className="text-ink-primary dark:text-[#F8FAFC]">{query}</span>&rdquo;</p>
              <p className="text-xs mt-1 text-gray-400">Try searching for &quot;events&quot;, &quot;Gemma&quot;, &quot;RAG&quot;, or &quot;ambassador&quot;.</p>
            </div>
          ) : (
            Object.entries(groupedResults).map(([category, items]) => (
              <div key={category} className="py-1.5">
                <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-secondary dark:text-gray-400 block">
                  {category}
                </span>
                <div className="space-y-0.5 mt-0.5">
                  {items.map(({ item, globalIndex }) => {
                    const isSelected = globalIndex === selectedIndex;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => selectItem(item)}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-control text-left transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-google-blue-light/70 dark:bg-blue-950/50 text-google-blue dark:text-[#60A5FA]"
                            : "hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B] text-ink-primary dark:text-[#F8FAFC]"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-2">
                          <div
                            className={`w-7 h-7 rounded-control flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "bg-google-blue dark:bg-[#60A5FA] text-white dark:text-[#0F172A]"
                                : "bg-gray-100 dark:bg-[#1E293B] text-ink-secondary dark:text-gray-300"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0 truncate">
                            <span className="text-sm font-medium block truncate">
                              {item.title}
                            </span>
                            {item.subtitle && (
                              <span className="text-xs text-ink-secondary dark:text-gray-400 block truncate">
                                {item.subtitle}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-1.5 text-xs">
                          {item.isExternal ? (
                            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                          ) : (
                            <ArrowRight
                              className={`w-3.5 h-3.5 transition-transform ${
                                isSelected ? "translate-x-0.5 opacity-100" : "opacity-0"
                              }`}
                            />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="px-4 py-2.5 bg-[#FAFAFA] dark:bg-[#1E293B] border-t border-[#D1D5DB] dark:border-[#334155] flex items-center justify-between text-[11px] text-ink-secondary dark:text-gray-400">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <kbd className="font-mono bg-white dark:bg-[#0F172A] border border-[#D1D5DB] dark:border-[#334155] rounded px-1 py-0.5">↑↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="font-mono bg-white dark:bg-[#0F172A] border border-[#D1D5DB] dark:border-[#334155] rounded px-1 py-0.5">↵</kbd>
              <span>to select</span>
            </span>
          </div>
          <span className="font-sans">ML Bhopal Developer Ecosystem</span>
        </div>
      </div>
    </div>
  );
}
