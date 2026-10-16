"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DURATION, EASING } from "@/lib/motion";

export interface TabOption {
  id: string;
  label: string;
  count?: number;
  badge?: string;
}

interface AnimatedTabsProps {
  tabs: TabOption[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  layoutId?: string;
}

export function AnimatedTabs({
  tabs,
  activeId,
  onChange,
  className,
  layoutId = "activeTabIndicator",
}: AnimatedTabsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      role="tablist"
      className={cn(
        "flex flex-wrap items-center gap-1.5 p-1.5 rounded-control bg-white border border-[#D1D5DB] shadow-subtle select-none",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative px-3.5 py-1.5 rounded-control text-xs font-sans font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue",
              isActive
                ? "text-white"
                : "text-ink-secondary hover:text-ink-primary hover:bg-[#F1F3F4]"
            )}
          >
            {/* Animated Active Pill Indicator */}
            {isActive && (
              <motion.div
                layoutId={shouldReduceMotion ? undefined : layoutId}
                transition={{
                  duration: shouldReduceMotion ? 0 : DURATION.small,
                  ease: EASING.standard,
                }}
                className="absolute inset-0 bg-google-blue rounded-control shadow-subtle -z-0"
              />
            )}

            <span className="relative z-10 flex items-center gap-1.5">
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-full",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#F1F3F4] text-ink-secondary"
                  )}
                >
                  {tab.count}
                </span>
              )}
              {tab.badge && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-blue-50 text-google-blue"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
