"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { MagneticButton } from "@/components/motion/MagneticButton";

export function FinalCTA() {
  const triggerConfetti = async () => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    try {
      const confetti = (await import("canvas-confetti")).default;
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      confetti({
        particleCount: isMobile ? 25 : 45,
        spread: isMobile ? 40 : 60,
        origin: { y: 0.8 },
        colors: ["#FF7A00", "#4285F4", "#34A853", "#FBBC05", "#EA4335"],
        disableForReducedMotion: true,
      });
    } catch {
      // Ignore if canvas-confetti fails to load
    }
  };

  return (
    <section className="relative py-24 sm:py-32 bg-[#FAFAFA] dark:bg-[#0F172A] border-t border-[#D1D5DB] dark:border-[#334155] overflow-hidden transition-colors">
      {/* Top Google-Inspired Gradient Accent Strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4285F4] via-[#34A853] via-[#FBBC05] to-[#EA4335]" />

      {/* Engineering Blueprint Grid Background */}
      <div className="absolute inset-0 blueprint-grid opacity-40 dark:opacity-15 pointer-events-none" />

      <Container size="lg">
        {/* Full-Width Editorial Closing Statement */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-primary bg-primary-light border border-orange-200 dark:border-orange-900/40 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-google-yellow" />
            <span>THE MOVEMENT IS EXPANDING</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink-primary dark:text-[#F8FAFC] tracking-tight leading-[0.95] uppercase mb-6">
            Ready to Build <br />
            the Future of AI <br />
            <span className="text-primary dark:text-[#FF9A3D]">in Central India</span><span className="text-google-red">?</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-ink-secondary dark:text-[#94A3B8] leading-relaxed mb-10 max-w-xl">
            Join 3,600+ developers, student innovators, researchers, and founders shipping production models, competing in hackathons, and leading campus chapters.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
            <MagneticButton maxDistance={6}>
              <PrimaryButton
                href="https://commudle.com/communities/ml-bhopal"
                isExternal
                size="lg"
                className="w-full sm:w-auto px-8 shadow-elevation-1 hover:shadow-elevation-2"
                icon={<ExternalLink className="w-4 h-4 text-white/90" />}
                onClick={triggerConfetti}
              >
                Join ML Bhopal on Commudle
              </PrimaryButton>
            </MagneticButton>

            <SecondaryButton
              href="/join"
              size="lg"
              className="w-full sm:w-auto px-8"
              icon={<ArrowRight className="w-4 h-4 text-google-blue dark:text-[#60A5FA]" />}
            >
              Apply to Volunteer Core
            </SecondaryButton>
          </div>

          {/* Trust and Regional Footprint */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono text-ink-tertiary dark:text-[#64748B] text-center pt-6 border-t border-[#D1D5DB] dark:border-[#334155] w-full max-w-md">
            <span className="flex items-center gap-1.5 text-ink-secondary dark:text-[#94A3B8]">
              <span className="w-2 h-2 rounded-full bg-google-green" />
              100% Free Community
            </span>
            <span>•</span>
            <span>Supported by Google for Developers</span>
            <span>•</span>
            <span>Bhopal, MP</span>
          </div>

        </div>
      </Container>
    </section>
  );
}
