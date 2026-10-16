"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, MapPin, Calendar, Users, Award } from "lucide-react";
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
              <span>ANNUAL FLAGSHIP SUMMIT • 2026 EDITION</span>
            </div>

            {/* Monumental Typography: AI DAY 2.0 */}
            <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.92] uppercase mb-4 text-white">
              AI DAY <br />
              <span className="text-primary dark:text-[#FF9A3D]">2.0</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-gray-300 leading-relaxed mb-8 max-w-lg">
              Central India&apos;s benchmark artificial intelligence gathering. Bringing together 500+ developers, researchers, and technology leaders across autonomous agent architectures, model fine-tuning, and applied multimodal vision.
            </p>

            {/* Typographic Key Metrics Strip — No individual boxes */}
            <div className="grid grid-cols-3 gap-6 py-6 border-t border-b border-white/15 w-full max-w-md mb-8">
              <div>
                <span className="text-3xl sm:text-4xl font-display font-black text-google-blue block">4+</span>
                <span className="text-xs font-mono text-gray-400 uppercase">Tracks</span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-display font-black text-google-green block">500+</span>
                <span className="text-xs font-mono text-gray-400 uppercase">Builders</span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-display font-black text-google-red block">12+</span>
                <span className="text-xs font-mono text-gray-400 uppercase">Keynotes</span>
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
                Explore AI Day 2.0 Portal
              </PrimaryButton>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT: Large Stage / Auditorium Image (6 cols)                 */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-elevation-3 group">
              <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop"
                alt="AI Day Flagship Keynote Stage"
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
                    LNCT Campus Auditorium • Bhopal
                  </span>
                  <span className="text-sm font-semibold text-white">
                    Multi-Track Technical Sprints &amp; Demo Day
                  </span>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white shrink-0">
                  Guaranteed Internships
                </span>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
