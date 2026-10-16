"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Tag } from "@/components/ui/Tag";

const PILLARS = [
  {
    num: "01",
    title: "Architecture Masterclasses & Codelabs",
    description: "Deep-dive weekend coding sessions focused on production RAG, vector retrieval, model quantization, and agentic tool-use.",
    tags: ["LLMOps", "PyTorch", "RAG"],
    href: "/events",
    color: "text-primary dark:text-[#FF9A3D]",
    barColor: "bg-primary",
  },
  {
    num: "02",
    title: "Hackathons & 36-Hour Sprints",
    description: "Fast-paced build marathons solving real-world challenge tracks with dedicated compute credits, expert mentorship, and prize pools.",
    tags: ["Build Sprints", "Prototypes", "Prizes"],
    href: "/campaigns",
    color: "text-google-red dark:text-[#F28B82]",
    barColor: "bg-google-red",
  },
  {
    num: "03",
    title: "Flagship AI Day Summits",
    description: "Central India's benchmark annual conference uniting 500+ builders, industry keynotes, and multi-track technical workshops.",
    tags: ["Annual Summit", "Keynotes", "Expos"],
    href: "/ai-day",
    color: "text-[#D97706] dark:text-[#FBBC05]",
    barColor: "bg-google-yellow",
  },
  {
    num: "04",
    title: "Campus Chapters & University MoUs",
    description: "Partnering formally with university administrations (MANIT, LNCT, OIST, RGPV) to deliver Google-backed curricula and student chapters.",
    tags: ["College MoUs", "Ambassadors", "Workshops"],
    href: "/ambassador",
    color: "text-google-green dark:text-[#81C995]",
    barColor: "bg-google-green",
  },
  {
    num: "05",
    title: "Open Weights Research Pods",
    description: "Hands-on study circles and compute pods exploring open-weights foundation models like Google Gemma, JAX, and Cloud TPUs.",
    tags: ["Gemma 2", "JAX/Flax", "TPU Pods"],
    href: "/resources",
    color: "text-google-blue dark:text-[#60A5FA]",
    barColor: "bg-google-blue",
  },
  {
    num: "06",
    title: "Open Knowledge & Production Blueprints",
    description: "100% free open-source GitHub repositories, starter boilerplates, and step-by-step production cookbooks with zero paywalls.",
    tags: ["Open Source", "Cookbooks", "Blueprints"],
    href: "/resources",
    color: "text-google-green dark:text-[#81C995]",
    barColor: "bg-google-green",
  },
];

export function WhatWeDo() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative py-20 sm:py-28 bg-white dark:bg-[#0F172A] border-b border-[#D1D5DB] dark:border-[#334155] transition-colors">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ============================================================== */}
          {/* LEFT: Large Editorial Heading & Operating Manifesto (5 cols)   */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primary mb-4 block">
              OPERATING MODEL
            </span>

            <h2 className="font-display font-black tracking-tight text-ink-primary dark:text-[#F8FAFC] text-4xl sm:text-5xl lg:text-6xl leading-[0.98] uppercase mb-6">
              How We <br />
              <span className="text-primary dark:text-[#FF9A3D]">Advance</span> <br />
              Applied AI<span className="text-google-red">.</span>
            </h2>

            <p className="text-sm sm:text-base text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed mb-8 max-w-md">
              We prioritize code over slides and radical openness. We connect regional builders directly to production tooling, open foundation models, and Google Cloud infrastructure without theoretical gatekeeping.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-google-blue dark:text-[#60A5FA] hover:text-google-blue-dark dark:hover:text-blue-300 transition-colors group"
            >
              <span>Explore Our Story &amp; Philosophy</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* ============================================================== */}
          {/* RIGHT: Vertically Connected Numbered List (7 cols)             */}
          {/* Editorial manifesto structure — Zero boxed card grid           */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-[#D1D5DB]/80 dark:divide-[#334155]/80 border-t border-b border-[#D1D5DB]/80 dark:border-[#334155]/80">
            {PILLARS.map((pillar, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <Link
                  key={idx}
                  href={pillar.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="group py-6 sm:py-8 px-2 sm:px-4 flex items-start gap-5 sm:gap-8 transition-colors duration-200 hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B]/60 relative"
                >
                  {/* Subtle left active bar indicator on hover */}
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-1 ${pillar.barColor} transition-opacity duration-200 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* 2-Digit Editorial Number */}
                  <span
                    className={`text-2xl sm:text-3xl font-mono font-bold tracking-tight transition-colors duration-200 shrink-0 mt-0.5 ${
                      isHovered ? pillar.color : "text-ink-tertiary dark:text-[#64748B]"
                    }`}
                  >
                    {pillar.num}
                  </span>

                  {/* Item Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3
                        className={`text-lg sm:text-xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] transition-colors duration-200 ${
                          isHovered ? pillar.color : ""
                        }`}
                      >
                        {pillar.title}
                      </h3>
                      <ArrowUpRight
                        className={`w-4 h-4 text-ink-tertiary transition-all duration-200 shrink-0 ${
                          isHovered
                            ? "text-google-blue dark:text-[#60A5FA] translate-x-0.5 -translate-y-0.5"
                            : "opacity-40"
                        }`}
                      />
                    </div>

                    <p className="text-xs sm:text-sm text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed mb-3.5">
                      {pillar.description}
                    </p>

                    {/* Clean Inline Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {pillar.tags.map((tag) => (
                        <Tag key={tag} variant="domain">{tag}</Tag>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}
