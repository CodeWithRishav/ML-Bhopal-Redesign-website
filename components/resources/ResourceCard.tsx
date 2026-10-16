"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { ResourceArticle } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

interface ResourceCardProps {
  article: ResourceArticle;
}

const CATEGORY_BADGES: Record<string, "amber" | "violet" | "cyan" | "google"> = {
  Guides: "amber",
  Roadmaps: "cyan",
  "Technical Deep Dives": "violet",
  "Community Recaps": "google",
};

export function ResourceCard({ article }: ResourceCardProps) {
  const badgeVariant = CATEGORY_BADGES[article.category] || "outline";

  return (
    <div className="flex flex-col justify-between p-6 sm:p-7 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] hover:border-google-blue dark:hover:border-[#60A5FA] shadow-subtle hover:shadow-elevation-2 hover:-translate-y-1.5 active:scale-[0.99] transition-all duration-200 group h-full">
      <div>
        {/* Category & Reading Time */}
        <div className="flex items-center justify-between gap-3 mb-3.5">
          <Badge variant={badgeVariant}>
            {article.category}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs font-sans text-ink-secondary dark:text-[#94A3B8]">
            <Clock className="w-3.5 h-3.5 text-gray-400 dark:text-[#64748B] transition-transform duration-200 group-hover:scale-110" />
            <span>{article.readingTime}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/resources/${article.slug}`} className="block focus:outline-none">
          <h3 className="text-lg sm:text-xl font-display font-semibold text-ink-primary dark:text-[#F8FAFC] group-hover:text-google-blue dark:group-hover:text-[#60A5FA] transition-colors leading-snug mb-2.5">
            {article.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs sm:text-sm text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed line-clamp-3 mb-5">
          {article.description}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {article.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded text-[11px] font-sans bg-[#F1F3F4] dark:bg-[#1E293B] text-ink-secondary dark:text-[#94A3B8] border border-transparent transition-colors group-hover:border-[#D1D5DB] dark:group-hover:border-[#5F6368]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Author, Date, CTA */}
      <div className="pt-4 border-t border-[#D1D5DB] dark:border-[#334155] flex items-center justify-between gap-4 mt-auto">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-ink-primary dark:text-[#F8FAFC]">
            {article.author.name}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-ink-secondary dark:text-[#94A3B8] font-sans">
            <Calendar className="w-3 h-3 text-gray-400 dark:text-[#64748B]" />
            <span>{article.displayDate}</span>
          </div>
        </div>

        <Link
          href={`/resources/${article.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-google-blue dark:text-[#60A5FA] hover:text-google-blue-dark dark:hover:text-blue-300 transition-colors"
          aria-label={`Read article: ${article.title}`}
        >
          <span>Read</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1.5" />
        </Link>
      </div>
    </div>
  );
}
