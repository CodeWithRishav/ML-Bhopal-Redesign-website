"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";

const STATS = [
  {
    value: "3,800+",
    label: "Members",
    sublabel: "Students, developers & researchers on Commudle",
    color: "text-primary dark:text-[#FF9A3D]",
    accent: "bg-primary",
  },
  {
    value: "20+",
    label: "Events",
    sublabel: "Workshops, hackathons, meetups & AI Day since 2024",
    color: "text-google-blue dark:text-[#60A5FA]",
    accent: "bg-google-blue",
  },
  {
    value: "9+",
    label: "Institutes",
    sublabel: "Partner colleges across Bhopal",
    color: "text-[#D97706] dark:text-[#FBBC05]",
    accent: "bg-google-yellow",
  },
  {
    value: "100%",
    label: "Volunteer-Led",
    sublabel: "Run entirely by community volunteers",
    color: "text-google-green dark:text-[#34A853]",
    accent: "bg-google-green",
  },
];

export function CommunityMetrics() {
  return (
    <section className="relative py-12 sm:py-16 bg-[#FAFAFA] dark:bg-[#0F172A] border-b border-[#D1D5DB] dark:border-[#334155] transition-colors">
      <Container>
        {/* Editorial Horizontal Statistics Strip — Zero Boxed Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#D1D5DB] dark:divide-[#334155]">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col px-4 sm:px-8 py-6 lg:py-2 ${
                idx % 2 === 1 ? "pl-6 sm:pl-10" : ""
              } ${idx < 2 ? "pb-8" : "pt-8 lg:pt-2"}`}
            >
              {/* Massive Typographic Number */}
              <div className="flex items-baseline gap-1 mb-1">
                <span className={`text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight ${stat.color}`}>
                  <AnimatedCounter value={stat.value} duration={1.2} />
                </span>
              </div>

              {/* Bold Label */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`w-2 h-2 rounded-full ${stat.accent}`} />
                <span className="text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-ink-primary dark:text-[#F8FAFC]">
                  {stat.label}
                </span>
              </div>

              {/* Concise Subtitle */}
              <p className="text-xs text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed max-w-[220px]">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
