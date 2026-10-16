"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, SlidersHorizontal, BookOpen, ExternalLink, Github, Sparkles } from "lucide-react";
import { ResourceArticle, ResourceItem } from "@/lib/types";
import { ResourceCard } from "./ResourceCard";

interface ResourcesExplorerProps {
  articles: ResourceArticle[];
  toolsAndRepos: ResourceItem[];
}

const CATEGORIES = [
  "All",
  "Guides",
  "Roadmaps",
  "Technical Deep Dives",
  "Community Recaps",
];

export function ResourcesExplorer({ articles, toolsAndRepos }: ResourcesExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Category filter
      if (selectedCategory !== "All" && article.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = article.title.toLowerCase().includes(query);
        const matchesDesc = article.description.toLowerCase().includes(query);
        const matchesAuthor = article.author.name.toLowerCase().includes(query);
        const matchesTags = article.tags.some((t) => t.toLowerCase().includes(query));
        return matchesTitle || matchesDesc || matchesAuthor || matchesTags;
      }

      return true;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: articles.length };
    CATEGORIES.slice(1).forEach((cat) => {
      counts[cat] = articles.filter((a) => a.category === cat).length;
    });
    return counts;
  }, [articles]);

  return (
    <div className="space-y-12">
      {/* Search and Filters Toolbar */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-ink-secondary absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="text"
              aria-label="Search guides, roadmaps, authors, or topics"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, roadmaps, authors, or topics (e.g. RAG, Gemma, TensorFlow)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-control bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] text-ink-primary dark:text-[#F8FAFC] text-base sm:text-sm focus:outline-none focus:border-google-blue dark:focus:border-[#60A5FA] focus:ring-1 focus:ring-google-blue transition-colors placeholder:text-ink-disabled dark:placeholder:text-gray-500 shadow-subtle"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-secondary hover:text-ink-primary"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Active Results Summary */}
          <div className="flex items-center gap-3 text-xs text-ink-secondary" aria-live="polite">
            <span>
              Showing <strong className="text-ink-primary">{filteredArticles.length}</strong> of{" "}
              {articles.length} publications
            </span>
            {(searchQuery || selectedCategory !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-google-blue hover:underline cursor-pointer font-medium"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="group" aria-label="Filter by resource category">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            const count = categoryCounts[category] || 0;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-google-blue text-white font-semibold shadow-elevation-1"
                    : "bg-[#F1F3F4] border border-[#D1D5DB] text-ink-secondary hover:bg-slate-200 hover:text-ink-primary"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-white/20 text-white font-bold"
                      : "bg-white text-ink-secondary border border-[#D1D5DB]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article) => (
              <motion.div
                key={article.slug}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
              >
                <ResourceCard article={article} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-16 p-8 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] max-w-xl mx-auto shadow-subtle">
          <BookOpen className="w-10 h-10 text-ink-disabled dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-display font-semibold text-ink-primary dark:text-[#F8FAFC] mb-2">
            No matching resources found
          </h3>
          <p className="text-xs text-ink-secondary dark:text-gray-300 font-sans mb-6">
            We couldn&apos;t find any articles matching &ldquo;{searchQuery}&rdquo; in the{" "}
            {selectedCategory} category.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="px-4 py-2 rounded-control text-xs font-semibold uppercase bg-[#F1F3F4] dark:bg-[#0F172A] text-google-blue dark:text-[#60A5FA] hover:bg-blue-50 dark:hover:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] transition-colors cursor-pointer"
          >
            Clear Search & Filters
          </button>
        </div>
      )}

      {/* Curated Toolkits & Open-Source Repositories */}
      <div className="pt-12 border-t border-[#D1D5DB]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
              Curated Starter Kits
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-ink-primary">
              Open-Source Blueprints & Repositories
            </h2>
          </div>
          <a
            href="https://github.com/mlbhopal"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-google-blue hover:underline transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>View GitHub Organization</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {toolsAndRepos.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-card bg-white border border-[#D1D5DB] hover:border-google-blue hover:shadow-elevation-1 transition-all flex flex-col justify-between group shadow-subtle"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-google-blue bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    {item.category}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-ink-secondary group-hover:text-google-blue transition-colors" />
                </div>
                <h4 className="text-sm font-display font-bold text-ink-primary group-hover:text-google-blue transition-colors mb-1.5 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-ink-secondary font-sans leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 mt-4 pt-3 border-t border-[#D1D5DB]">
                {item.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-[11px] text-ink-secondary">
                    #{tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
