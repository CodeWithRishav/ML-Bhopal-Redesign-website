"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export function AIDaySpotlight() {
  return (
    <section className="relative py-20 sm:py-28 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] text-white overflow-hidden transition-colors">
      {/* Blueprint Grid Accent */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />

      {/* Top Google-Inspired Gradient Strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4285F4] via-[#34A853] via-[#FBBC05] to-[#EA4335]" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* ============================================================== */}
          {/* LEFT: Typographic Treatment & Flagship Narrative (6 cols)      */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider text-google-yellow bg-yellow-950/40 border border-yellow-800/60 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ANNUAL FLAGSHIP • MAY 16, 2026</span>
            </div>

            {/* Monumental Typography: AI DAY 2.0 */}
            <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.92] uppercase mb-4 text-white">
              AI DAY <br />
              <span className="text-primary dark:text-[#FF9A3D]">2.0</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-gray-300 leading-relaxed mb-8 max-w-lg">
              Our annual flagship, held at LNCT Group of Colleges, Bhopal. A full day of talks, live demos, an introduction to Gemma 4 and open models, and a Buildathon &amp; Prompt War — backed by Google for Developers.
            </p>

            {/* Typographic Key Metrics Strip — No individual boxes */}
            <div className="grid grid-cols-3 gap-6 py-6 border-t border-b border-white/15 w-full max-w-md mb-8">
              <div>
                <span className="text-3xl sm:text-4xl font-display font-black text-google-blue block">2</span>
                <span className="text-xs font-mono text-gray-400 uppercase">Editions</span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-display font-black text-google-green block">363</span>
                <span className="text-xs font-mono text-gray-400 uppercase">Registered</span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-display font-black text-google-red block">9–5</span>
                <span className="text-xs font-mono text-gray-400 uppercase">IST · one day</span>
              </div>
            </div>

            {/* Direct CTA to dedicated portal */}
            <div className="flex items-center gap-4">
              <PrimaryButton
                href="/ai-day"
                size="lg"
                className="px-7 shadow-elevation-1"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore AI Day 2.0
              </PrimaryButton>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT: Large Stage / Auditorium Image (6 cols)                 */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-elevation-3 group">
              <Image
                src="/images/ai-day/full-house-2025.jpg"
                alt="Full auditorium at AI Day Bhopal 2025"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Bottom Stage Callout */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-xs font-mono text-google-yellow font-semibold block mb-0.5">
                    AI Day 2025 • OIST, Bhopal
                  </span>
                  <span className="text-sm font-semibold text-white">
                    Photo from the previous edition
                  </span>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white shrink-0">
                  May 16, 2026
                </span>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
