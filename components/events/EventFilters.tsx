"use client";

import React from "react";
import { Search, X, SlidersHorizontal, RotateCcw } from "lucide-react";

export interface FilterState {
  searchQuery: string;
  status: "all" | "upcoming" | "past";
  category: string;
}

interface EventFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
  totalCount: number;
  filteredCount: number;
}

export function EventFilters({
  filters,
  onFilterChange,
  categories,
  totalCount,
  filteredCount,
}: EventFiltersProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const handleClearSearch = () => {
    onFilterChange({ ...filters, searchQuery: "" });
  };

  const handleStatusChange = (status: "all" | "upcoming" | "past") => {
    onFilterChange({ ...filters, status });
  };

  const handleCategoryChange = (category: string) => {
    onFilterChange({ ...filters, category });
  };

  const handleReset = () => {
    onFilterChange({
      searchQuery: "",
      status: "all",
      category: "all",
    });
  };

  const isFiltered =
    filters.searchQuery.trim() !== "" ||
    filters.status !== "all" ||
    filters.category !== "all";

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar & Status Tabs */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <label htmlFor="event-search" className="sr-only">
            Search events
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="event-search"
            type="text"
            value={filters.searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title, topic, speaker, or venue..."
            className="w-full pl-10 pr-9 py-2.5 bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] rounded-xl text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#4285F4] dark:focus:border-[#60A5FA] focus:ring-2 focus:ring-[#4285F4]/20 transition-colors font-sans shadow-subtle"
          />
          {filters.searchQuery && (
            <button
              onClick={handleClearSearch}
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#64748B] hover:text-[#0F172A] dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status Toggle Pills */}
        <div
          role="radiogroup"
          aria-label="Filter events by status"
          className="inline-flex w-full sm:w-auto items-center p-1 bg-[#FAFAFA] dark:bg-[#0F172A] border border-[#D1D5DB] dark:border-[#334155] rounded-xl justify-between sm:justify-start gap-1 shadow-subtle"
        >
          <button
            type="button"
            role="radio"
            aria-checked={filters.status === "all"}
            onClick={() => handleStatusChange("all")}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-sans font-medium text-center transition-all cursor-pointer ${
              filters.status === "all"
                ? "bg-white dark:bg-[#1E293B] text-[#FF7A00] font-bold shadow-subtle border border-[#D1D5DB] dark:border-[#334155]"
                : "text-[#334155] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]"
            }`}
          >
            All Gatherings ({totalCount})
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={filters.status === "upcoming"}
            onClick={() => handleStatusChange("upcoming")}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-sans font-medium text-center transition-all cursor-pointer ${
              filters.status === "upcoming"
                ? "bg-white dark:bg-[#1E293B] text-[#34A853] font-bold shadow-subtle border border-[#D1D5DB] dark:border-[#334155]"
                : "text-[#334155] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]"
            }`}
          >
            Upcoming
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={filters.status === "past"}
            onClick={() => handleStatusChange("past")}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-sans font-medium text-center transition-all cursor-pointer ${
              filters.status === "past"
                ? "bg-white dark:bg-[#1E293B] text-[#4285F4] dark:text-[#60A5FA] font-bold shadow-subtle border border-[#D1D5DB] dark:border-[#334155]"
                : "text-[#334155] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]"
            }`}
          >
            Chronicles & Past
          </button>
        </div>
      </div>

      {/* Category Pills & Results Summary */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#D1D5DB] dark:border-[#334155]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-sans text-[#334155] dark:text-[#94A3B8] mr-1 flex items-center gap-1 font-medium">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#4285F4]" />
            <span>Category:</span>
          </span>

          <button
            type="button"
            aria-pressed={filters.category === "all"}
            onClick={() => handleCategoryChange("all")}
            className={`px-3 py-1 rounded-full text-xs font-sans font-semibold transition-colors cursor-pointer ${
              filters.category === "all"
                ? "bg-[#FF7A00] text-white shadow-subtle"
                : "bg-white dark:bg-[#1E293B] text-[#334155] dark:text-[#94A3B8] border border-[#D1D5DB] dark:border-[#334155] hover:border-[#4285F4] dark:hover:border-[#60A5FA] hover:text-[#4285F4] dark:hover:text-[#60A5FA]"
            }`}
          >
            All Tracks
          </button>

          {categories.map((cat) => {
            const formattedCat = cat.charAt(0).toUpperCase() + cat.slice(1);
            const isSelected = filters.category.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1 rounded-full text-xs font-sans font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#FF7A00] text-white font-semibold shadow-subtle"
                    : "bg-white dark:bg-[#1E293B] text-[#334155] dark:text-[#94A3B8] border border-[#D1D5DB] dark:border-[#334155] hover:border-[#4285F4] dark:hover:border-[#60A5FA] hover:text-[#4285F4] dark:hover:text-[#60A5FA]"
                }`}
              >
                {formattedCat}
              </button>
            );
          })}
        </div>

        {/* Status Count & Clear Action */}
        <div className="flex items-center gap-3 text-xs font-sans text-[#334155] dark:text-[#94A3B8]">
          <span>
            Showing <strong className="text-[#0F172A] dark:text-[#F8FAFC]">{filteredCount}</strong> of{" "}
            {totalCount} events
          </span>
          {isFiltered && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-[#FF7A00] hover:underline text-xs font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
