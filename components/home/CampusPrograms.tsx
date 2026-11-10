"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

const ROADMAP_STEPS = [
  {
    num: "01",
    label: "DISCOVER",
    title: "Apply",
    description: "Fill in the ambassador form with your college, branch and why you want to bring ML Bhopal to your campus.",
    color: "text-google-blue dark:text-[#60A5FA]",
    dotColor: "bg-google-blue",
  },
  {
    num: "02",
    label: "CONNECT",
    title: "Get in Touch",
    description: "The core team reaches out to understand what your campus needs.",
    color: "text-google-green dark:text-[#81C995]",
    dotColor: "bg-google-green",
  },
  {
    num: "03",
    label: "BUILD",
    title: "Plan Together",
    description: "Pick a format with us (workshop, meetup or hackathon) and fix a date.",
    color: "text-amber-600 dark:text-[#FDD663]",
    dotColor: "bg-google-yellow",
  },
  {
    num: "04",
    label: "LEAD",
    title: "Host the Session",
    description: "The core team and volunteers help you run it on your campus.",
    color: "text-google-red dark:text-[#F28B82]",
    dotColor: "bg-google-red",
  },
];

export function CampusPrograms() {
  return (
    <section className="relative py-20 sm:py-28 bg-white dark:bg-[#0F172A] border-b border-[#D1D5DB] dark:border-[#334155] transition-colors">
      <Container>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14 sm:mb-20">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primary dark:text-[#FF9A3D] mb-2 block">
              CAMPUS PROGRAM
            </span>
            <h2 className="font-display font-black tracking-tight text-ink-primary dark:text-[#F8FAFC] text-3xl sm:text-4xl lg:text-5xl uppercase">
              Bring ML Bhopal to Your Campus<span className="text-google-green">.</span>
            </h2>
          </div>

          <Link
            href="/ambassador"
            className="text-xs font-semibold uppercase tracking-wider text-google-blue dark:text-[#60A5FA] hover:text-google-blue-dark dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1.5"
          >
            <span>Campus Ambassador Program</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ============================================================== */}
        {/* VISUAL ROADMAP JOURNEY (Not repeated cards)                    */}
        {/* Horizontal connecting line on desktop, vertical on mobile      */}
        {/* ============================================================== */}
        <div className="relative mb-16 sm:mb-20">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-[#D1D5DB] dark:bg-[#334155] z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {ROADMAP_STEPS.map((step, idx) => (
              <div key={idx} className="flex flex-col items-start text-left group">
                {/* Step Node & Number */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-[#FAFAFA] dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] flex items-center justify-center font-mono font-bold text-lg ${step.color} shadow-subtle group-hover:scale-105 transition-transform duration-200`}>
                    {step.num}
                  </div>
                  <span className={`text-xs font-mono font-bold tracking-widest ${step.color}`}>
                    {step.label}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-display font-bold text-ink-primary dark:text-[#F8FAFC] mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* CALL TO ACTION — PROGRAM ORIENTED                              */}
        {/* ============================================================== */}
        <div className="p-6 sm:p-10 rounded-2xl bg-[#FAFAFA] dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-subtle">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-google-green text-white flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-display font-bold text-ink-primary dark:text-[#F8FAFC]">
                Want ML Bhopal at your college?
              </h4>
              <p className="text-xs sm:text-sm text-ink-secondary dark:text-[#94A3B8] mt-0.5 max-w-xl">
                Apply as a campus ambassador and help bring workshops, meetups and hackathons to your campus.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <PrimaryButton
              href="/ambassador#apply"
              size="md"
              className="w-full sm:w-auto justify-center"
            >
              Become a Campus Ambassador
            </PrimaryButton>
            <SecondaryButton
              href="/ambassador#campuses"
              size="md"
              className="w-full sm:w-auto justify-center"
            >
              See 9+ Campuses
            </SecondaryButton>
          </div>
        </div>

      </Container>
    </section>
  );
}
