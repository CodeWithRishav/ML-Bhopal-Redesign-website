"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Sparkles,
  MapPin,
  Users,
  Terminal,
  Cpu,
  Zap,
  Calendar,
  Command,
  Activity,
  Layers,
} from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { GoogleElement } from "@/components/ui/GoogleElement";
import { MagneticButton } from "@/components/motion/MagneticButton";

const TICKER_ITEMS = [
  { label: "3,600+ ACTIVE BUILDERS", color: "text-primary" },
  { label: "AI DAY 2.0 ANNUAL SUMMIT", color: "text-google-red" },
  { label: "BY GOOGLE FOR DEVELOPERS", color: "text-google-blue" },
  { label: "45+ CAMPUSES IN MADHYA PRADESH", color: "text-google-green" },
  { label: "AGENTIC AI & GEMINI 2.5", color: "text-google-yellow" },
  { label: "PRODUCTION RAG ARCHITECTURES", color: "text-primary" },
  { label: "GEMMA 2 OPEN WEIGHTS", color: "text-google-blue" },
  { label: "100% VOLUNTEER-DRIVEN", color: "text-google-green" },
];

export function HomeHero() {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // High-performance spring physics for 3D spatial tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 20, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Rotation transforms for the interactive console stage
  const rotateX = useTransform(smoothY, [-1, 1], [9, -9]);
  const rotateY = useTransform(smoothX, [-1, 1], [-9, 9]);

  // Differential parallax layers (Antigravity depth)
  const layerDeepX = useTransform(smoothX, [-1, 1], [-14, 14]);
  const layerDeepY = useTransform(smoothY, [-1, 1], [-14, 14]);

  const layerMidX = useTransform(smoothX, [-1, 1], [-22, 22]);
  const layerMidY = useTransform(smoothY, [-1, 1], [-22, 22]);

  const layerPopX = useTransform(smoothX, [-1, 1], [26, -26]);
  const layerPopY = useTransform(smoothY, [-1, 1], [26, -26]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const openCommandPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        metaKey: true,
        ctrlKey: true,
        bubbles: true,
      })
    );
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 sm:pt-32 pb-0 overflow-hidden bg-gradient-to-br from-[#FFF1E6]/70 via-[#FAFAFA] to-[#E8F0FE]/70 dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#334155] border-b border-[#D1D5DB] dark:border-[#334155] transition-colors"
    >
      {/* ==================================================================== */}
      {/* 1. CINEMATIC ATMOSPHERE & AMBIENT AURA CANVAS                        */}
      {/* ==================================================================== */}

      {/* Dynamic Ambient Color Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Google Blue Glow - Top Left */}
        <div className="absolute -top-40 -left-20 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#4285F4]/15 via-indigo-500/10 to-transparent blur-[120px] dark:from-[#4285F4]/20 dark:via-blue-500/10" />

        {/* Primary Orange Glow - Center Right */}
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#FF7A00]/15 via-orange-500/5 to-transparent blur-[130px] dark:from-[#FF7A00]/15 dark:via-transparent" />

        {/* Google Green/Emerald Sub-glow - Bottom Left */}
        <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#34A853]/10 via-emerald-500/5 to-transparent blur-[140px] dark:from-[#34A853]/15 dark:via-transparent" />

        {/* High-precision blueprint grid overlay */}
        <div className="absolute inset-0 blueprint-grid opacity-60 dark:opacity-20" />

        {/* Gentle radial vignette for text clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAFAFA]/50 to-[#FAFAFA] dark:via-[#0F172A]/60 dark:to-[#0F172A]" />

        {/* Micro Telemetry Coordinates */}
        <div className="hidden xl:flex items-center justify-between absolute top-28 left-8 right-8 text-[10px] font-mono tracking-widest text-[#334155]/60 dark:text-[#94A3B8]/50 select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-google-green animate-ping" />
            <span>GEO: 23.2599° N, 77.4126° E // REGION: CENTRAL INDIA</span>
          </div>
          <div>
            <span>COMMUNITY NODE: BHO-CORE-01 // STATUS: ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Floating Google brand vectors */}
      <motion.div
        style={{ x: layerDeepX, y: layerDeepY }}
        className="absolute top-36 right-12 z-0 hidden lg:block pointer-events-none opacity-60 dark:opacity-40"
      >
        <GoogleElement type="slashes-blue" size="lg" animate={false} />
      </motion.div>
      <motion.div
        style={{ x: layerPopX, y: layerPopY }}
        className="absolute bottom-28 left-10 z-0 hidden lg:block pointer-events-none opacity-60 dark:opacity-40"
      >
        <GoogleElement type="plus-red" size="md" animate={false} />
      </motion.div>

      {/* ==================================================================== */}
      {/* 2. HERO CONTENT GRID (Left: Typography & CTAs | Right: 3D Stage)     */}
      {/* ==================================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-2 sm:pt-4 pb-12 sm:pb-16 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">

          {/* ------------------------------------------------------------------ */}
          {/* LEFT COLUMN: Editorial Monumental Typography & Actions (7 cols)    */}
          {/* ------------------------------------------------------------------ */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">

            {/* Awwwards Live Status Capsule */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-white/90 dark:bg-[#1E293B]/90 backdrop-blur-md border border-[#D1D5DB] dark:border-[#334155] shadow-sm mb-6 group cursor-default transition-all duration-300 hover:border-primary/60"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-google-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-google-green" />
              </span>
              <span className="text-primary font-semibold text-[11px] tracking-wider uppercase">
                Active Community
              </span>
              <span className="text-[#D1D5DB] dark:text-[#475569]">•</span>
              <span className="text-ink-secondary dark:text-[#94A3B8] text-[11px]">
                Central India&apos;s AI Core
              </span>
              <span className="hidden sm:inline-flex items-center text-[10px] text-primary font-mono group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </motion.div>

            {/* Monumental Headline with Full Google Multi-Color Gradient Treatment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <h1 className="font-display font-black tracking-[-0.035em] text-5xl sm:text-6xl md:text-7xl xl:text-[80px] leading-[0.96] uppercase mb-6">
                <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] bg-clip-text text-transparent inline-block">
                  Where Bhopal <br />
                  Builds Applied AI
                </span>
                <span className="text-[#34A853]">.</span>
              </h1>
            </motion.div>

            {/* Editorial Subtitle with Domain Tags */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="font-sans text-base sm:text-lg text-ink-secondary dark:text-[#94A3B8] leading-relaxed max-w-xl mb-8 font-normal"
            >
              Central India&apos;s premier developer community of{" "}
              <strong className="text-ink-primary dark:text-[#F8FAFC] font-semibold">
                3,600+ engineers, researchers, and founders
              </strong>
              . Moving beyond surface prompts to architecting autonomous agent
              systems, fine-tuning open weights, and deploying on Google Cloud.
            </motion.p>

            {/* Action Cluster (Magnetic CTA + Secondary + Command Palette) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-9"
            >
              <MagneticButton maxDistance={6}>
                <PrimaryButton
                  href="https://commudle.com/communities/ml-bhopal"
                  isExternal
                  size="lg"
                  className="px-8 shadow-md hover:shadow-lg w-full sm:w-auto relative group overflow-hidden"
                  icon={<ExternalLink className="w-4 h-4 text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
                >
                  <span className="relative z-10">Join 3,600+ Builders</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </PrimaryButton>
              </MagneticButton>

              <SecondaryButton
                href="/events"
                size="lg"
                className="px-7 w-full sm:w-auto"
                icon={<ArrowRight className="w-4 h-4 text-google-blue dark:text-[#60A5FA]" />}
              >
                Explore Gatherings
              </SecondaryButton>

              {/* Quick Search Shortcut Pill */}
              <button
                type="button"
                onClick={openCommandPalette}
                className="hidden xl:inline-flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-mono text-ink-secondary dark:text-[#94A3B8] bg-white/60 dark:bg-[#0F172A]/60 hover:bg-white dark:hover:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] transition-colors"
                title="Open Command Search"
              >
                <Command className="w-3.5 h-3.5 text-google-blue dark:text-[#60A5FA]" />
                <span>Search</span>
                <kbd className="px-1.5 py-0.5 rounded bg-[#F1F3F4] dark:bg-[#1E293B] text-[10px] text-ink-primary dark:text-[#F8FAFC] border border-[#D1D5DB] dark:border-[#334155]">
                  ⌘K
                </kbd>
              </button>
            </motion.div>

            {/* Social Proof Strip with Live Community Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4 pt-4 border-t border-[#D1D5DB]/80 dark:border-[#334155] w-full max-w-xl"
            >
              {/* Stacked Builder Avatars */}
              <div className="flex -space-x-2.5 overflow-hidden py-1">
                <div className="relative w-9 h-9 rounded-full ring-2 ring-white dark:ring-[#0F172A] overflow-hidden shrink-0 shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                    alt="ML Bhopal community builder"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div className="relative w-9 h-9 rounded-full ring-2 ring-white dark:ring-[#0F172A] overflow-hidden shrink-0 shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                    alt="ML Bhopal AI researcher"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div className="relative w-9 h-9 rounded-full ring-2 ring-white dark:ring-[#0F172A] overflow-hidden shrink-0 shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
                    alt="ML Bhopal student lead"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div className="relative w-9 h-9 rounded-full ring-2 ring-white dark:ring-[#0F172A] overflow-hidden shrink-0 shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
                    alt="ML Bhopal system architect"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="text-xs font-sans text-ink-secondary dark:text-[#94A3B8] leading-snug">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-ink-primary dark:text-[#F1F3F4]">
                    3,600+ Builders &amp; Researchers
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-google-blue inline-block" />
                </div>
                <span className="text-[11px] text-ink-tertiary dark:text-[#64748B]">
                  Across 45+ universities &amp; tech incubators in MP
                </span>
              </div>
            </motion.div>
          </div>

          {/* ------------------------------------------------------------------ */}
          {/* RIGHT COLUMN: Interactive Spatial 3D Dev Console (5 cols)          */}
          {/* Awwwards-grade multi-layer depth with real physics tilt            */}
          {/* ------------------------------------------------------------------ */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center pt-4 lg:pt-0">
            
            {/* 3D Perspective Canvas Container */}
            <div
              style={{ perspective: 1200 }}
              className="relative w-full max-w-[480px] lg:max-w-[500px]"
            >
              <motion.div
                style={{
                  rotateX: shouldReduceMotion ? 0 : rotateX,
                  rotateY: shouldReduceMotion ? 0 : rotateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative w-full transition-transform duration-200 ease-out will-change-transform"
              >
                {/* ------------------------------------------------------------ */}
                {/* 1. MAIN CONSOLE CHASSIS (The Central Visual Portal)          */}
                {/* ------------------------------------------------------------ */}
                <div className="relative w-full rounded-2xl overflow-hidden bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-2xl transition-all duration-300">
                  
                  {/* Console Top Window Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#E5E7EB]/80 dark:bg-[#334155]/80 border-b border-[#D1D5DB] dark:border-[#334155]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-medium text-[#334155] dark:text-[#94A3B8]">
                      <Terminal className="w-3 h-3 text-google-blue dark:text-[#60A5FA]" />
                      <span>RUNTIME // ML_BHO_CORE</span>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] font-mono text-google-green">
                      <span className="w-1.5 h-1.5 rounded-full bg-google-green animate-pulse" />
                      <span>LIVE</span>
                    </div>
                  </div>

                  {/* Main High-Definition Stage Image with Vignette */}
                  <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden group">
                    <Image
                      src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop"
                      alt="ML Bhopal Annual Flagship AI Summit Auditorium"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 500px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                    {/* Live Telemetry Waveform Badge Overlay (Top Left of Image) */}
                    <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-white">
                      <Cpu className="w-3.5 h-3.5 text-google-blue" />
                      <span className="text-[10px] font-mono font-semibold tracking-wider">
                        gemma-2-9b • 48.6 tok/s
                      </span>
                      {/* Dancing Frequency Bars */}
                      <div className="flex items-end gap-0.5 h-3 ml-1">
                        <span className="w-0.5 h-2 bg-google-green animate-pulse" />
                        <span className="w-0.5 h-3 bg-google-blue animate-pulse" style={{ animationDelay: "150ms" }} />
                        <span className="w-0.5 h-1.5 bg-google-yellow animate-pulse" style={{ animationDelay: "300ms" }} />
                        <span className="w-0.5 h-2.5 bg-google-red animate-pulse" style={{ animationDelay: "200ms" }} />
                      </div>
                    </div>

                    {/* Stage Title Overlay (Bottom of Image) */}
                    <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-google-yellow font-bold block mb-0.5">
                          FLAGSHIP SUMMIT
                        </span>
                        <span className="text-base font-display font-bold leading-tight block">
                          AI Day Summit • LNCT Campus
                        </span>
                      </div>
                      <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white shrink-0">
                        500+ Attendees
                      </span>
                    </div>
                  </div>

                  {/* Console Footer Status Strip */}
                  <div className="px-4 py-2.5 bg-white dark:bg-[#1E293B] border-t border-[#D1D5DB] dark:border-[#334155] flex items-center justify-between text-xs font-mono text-[#334155] dark:text-[#94A3B8]">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[11px]">Free &amp; Open Weights</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-google-blue dark:text-[#60A5FA]">
                      <span>Google for Developers</span>
                    </div>
                  </div>
                </div>

                {/* ------------------------------------------------------------ */}
                {/* 2. FLOATING SATELLITE 1: Next Event Spotlight (Bottom Left)  */}
                {/* ------------------------------------------------------------ */}
                <motion.div
                  style={{
                    x: shouldReduceMotion ? 0 : layerPopX,
                    y: shouldReduceMotion ? 0 : layerPopY,
                    translateZ: shouldReduceMotion ? 0 : 50,
                  }}
                  className="absolute -bottom-6 -left-4 sm:-left-8 z-30 w-[84%] sm:w-[78%] rounded-xl p-3.5 bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-xl border border-[#D1D5DB] dark:border-[#334155] shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <Link href="/events/build-with-ai-agents-2026" className="block group">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-google-blue dark:text-[#60A5FA] uppercase tracking-wider">
                        <Calendar className="w-3 h-3 text-google-blue" />
                        <span>Next Gathering • Oct 24</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-google-green-light dark:bg-[#1E4620]/60 text-google-green font-semibold">
                        RSVP Open
                      </span>
                    </div>

                    <h4 className="text-xs font-display font-bold text-ink-primary dark:text-[#F8FAFC] truncate group-hover:text-primary transition-colors mb-2">
                      Build with AI: Agentic AI Summit
                    </h4>

                    {/* Registration Capacity Micro Bar */}
                    <div className="w-full">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#334155] dark:text-[#94A3B8] mb-1">
                        <span>450 / 500 RSVPs</span>
                        <span className="text-primary font-semibold">90% Full</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#E5E7EB] dark:bg-[#334155] overflow-hidden">
                        <div className="h-full bg-primary rounded-full w-[90%]" />
                      </div>
                    </div>
                  </Link>
                </motion.div>

                {/* ------------------------------------------------------------ */}
                {/* 3. FLOATING SATELLITE 2: Live Builder Radar (Top Right)      */}
                {/* ------------------------------------------------------------ */}
                <motion.div
                  style={{
                    x: shouldReduceMotion ? 0 : layerMidX,
                    y: shouldReduceMotion ? 0 : layerMidY,
                    translateZ: shouldReduceMotion ? 0 : 35,
                  }}
                  className="absolute -top-6 -right-3 sm:-right-6 z-20 px-3.5 py-2.5 rounded-xl bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-xl border border-[#D1D5DB] dark:border-[#334155] shadow-lg flex items-center gap-3"
                >
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#FFF1E6] dark:bg-primary/20 text-primary">
                    <Users className="w-4 h-4" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-google-green ring-2 ring-white dark:ring-[#1E293B]" />
                  </div>
                  <div>
                    <div className="text-xs font-display font-bold text-ink-primary dark:text-[#F8FAFC]">
                      3,600+ Builders
                    </div>
                    <div className="text-[10px] font-mono text-ink-secondary dark:text-[#94A3B8]">
                      45+ MP Campuses
                    </div>
                  </div>
                </motion.div>

                {/* ------------------------------------------------------------ */}
                {/* 4. FLOATING SATELLITE 3: Tech Stack Badge (Top Left)         */}
                {/* ------------------------------------------------------------ */}
                <motion.div
                  style={{
                    x: shouldReduceMotion ? 0 : layerDeepX,
                    y: shouldReduceMotion ? 0 : layerDeepY,
                    translateZ: shouldReduceMotion ? 0 : 25,
                  }}
                  className="hidden sm:flex absolute -top-4 left-6 z-10 items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-md border border-[#D1D5DB] dark:border-[#334155] text-[10px] font-mono text-[#334155] dark:text-[#94A3B8] shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-google-blue" />
                  <span>Gemini 2.5</span>
                  <span className="text-[#D1D5DB] dark:text-[#475569]">•</span>
                  <span>Vertex AI</span>
                  <span className="text-[#D1D5DB] dark:text-[#475569]">•</span>
                  <span>TPU v5e</span>
                </motion.div>

              </motion.div>
            </div>

          </div>

        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. AWWWARDS KINETIC TELEMETRY MARQUEE TICKER (Bottom Strip)          */}
      {/* ==================================================================== */}
      <div className="relative z-20 w-full overflow-hidden border-t border-[#D1D5DB] dark:border-[#334155] bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-md py-3 select-none">
        {/* Subtle Top 4-Color Accent Border */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] flex">
          <span className="h-full flex-1 bg-google-blue" />
          <span className="h-full flex-1 bg-google-red" />
          <span className="h-full flex-1 bg-google-yellow" />
          <span className="h-full flex-1 bg-google-green" />
        </div>

        {/* Continuous Horizontal Ticker (Double array for seamless loop) */}
        <div className="animate-marquee">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 mx-4 sm:mx-6 text-[11px] sm:text-xs font-mono font-medium tracking-wider text-ink-secondary dark:text-[#94A3B8]"
            >
              <span className={item.color}>✦</span>
              <span className="whitespace-nowrap">{item.label}</span>
              <span className="text-[#D1D5DB] dark:text-[#475569]">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
