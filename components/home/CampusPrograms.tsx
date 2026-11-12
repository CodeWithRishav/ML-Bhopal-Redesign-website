"use client";

import React from "react";
import Image from "next/image";
import { Check, FileText, Handshake, CalendarCheck, Presentation } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

const ROADMAP_STEPS = [
  {
    num: "01",
    label: "APPLY",
    description: "Fill in the ambassador form with your college, branch and why you want to bring ML Bhopal to your campus.",
    icon: FileText,
    color: "text-google-blue dark:text-[#60A5FA]",
    dotColor: "bg-google-blue",
    hoverBorder: "group-hover:border-google-blue",
    iconHover: "group-hover:text-google-blue dark:group-hover:text-[#60A5FA]",
  },
  {
    num: "02",
    label: "CONNECT",
    description: "The core team reaches out to understand your campus, interests and requirements.",
    icon: Handshake,
    color: "text-google-green dark:text-[#81C995]",
    dotColor: "bg-google-green",
    hoverBorder: "group-hover:border-google-green",
    iconHover: "group-hover:text-google-green dark:group-hover:text-[#81C995]",
  },
  {
    num: "03",
    label: "PLAN TOGETHER",
    description: "Choose a format — workshop, meetup or hackathon — and plan the event with the ML Bhopal team.",
    icon: CalendarCheck,
    color: "text-amber-600 dark:text-[#FDD663]",
    dotColor: "bg-google-yellow",
    hoverBorder: "group-hover:border-google-yellow",
    iconHover: "group-hover:text-amber-600 dark:group-hover:text-[#FDD663]",
  },
  {
    num: "04",
    label: "HOST THE SESSION",
    description: "Bring the experience to your campus with guidance and support from the core team and community volunteers.",
    icon: Presentation,
    color: "text-google-red dark:text-[#F28B82]",
    dotColor: "bg-google-red",
    hoverBorder: "group-hover:border-google-red",
    iconHover: "group-hover:text-google-red dark:group-hover:text-[#F28B82]",
  },
];

const HIGHLIGHTS = [
  "Organise AI & developer workshops",
  "Build a tech community in your college",
  "Connect with experienced developers & community leads",
  "Collaborate with other campus ambassadors",
  "Own meaningful technical initiatives",
];

export function CampusPrograms() {
  return (
    <section className="relative py-20 sm:py-28 bg-white dark:bg-[#0F172A] border-b border-[#D1D5DB] dark:border-[#334155] transition-colors overflow-hidden">
      <Container>
        {/* Editorial intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 sm:mb-20">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primary dark:text-[#FF9A3D] mb-2 block">
              CAMPUS PROGRAM
            </span>
            <h2 className="font-display font-black tracking-tight text-ink-primary dark:text-[#F8FAFC] text-3xl sm:text-4xl lg:text-5xl uppercase mb-5">
              Bring ML Bhopal to Your Campus<span className="text-google-green">.</span>
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed mb-6 max-w-xl">
              Turn your campus into a space for learning, collaboration and innovation. Lead a community of curious builders, organise hands-on AI sessions, and connect students with the wider ML Bhopal ecosystem.
            </p>
            <ul className="space-y-2.5">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-sans text-ink-primary dark:text-[#F8FAFC]">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-google-green dark:text-[#81C995]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <figure className="m-0">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#D1D5DB] dark:border-[#334155] bg-[#FAFAFA] dark:bg-[#1E293B]">
              <Image
                src="/images/ai-day/vertex-ai-walkthrough.jpg"
                alt="Two volunteers at the podium with a laptop during a Vertex AI walkthrough at AI Day Bhopal 2025"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 text-[11px] font-mono uppercase tracking-widest text-ink-secondary dark:text-[#94A3B8]">
              Vertex AI walkthrough / AI Day Bhopal 2025
            </figcaption>
          </figure>
        </div>

        {/* Step journey */}
        <div className="relative mb-16 sm:mb-20">
          {/* Desktop connector */}
          <div className="hidden lg:block absolute top-7 left-7 right-7 h-px bg-[#D1D5DB] dark:bg-[#334155] z-0" />

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-0 sm:gap-y-10 lg:gap-6 relative z-10 list-none p-0 m-0">
            {ROADMAP_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === ROADMAP_STEPS.length - 1;
              return (
                <li key={step.num} className="group relative flex gap-4 lg:block pb-8 sm:pb-0 text-left">
                  {/* Mobile vertical connector */}
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="sm:hidden absolute left-7 top-14 bottom-0 w-px -translate-x-1/2 bg-[#D1D5DB] dark:bg-[#334155]"
                    />
                  )}
                  <div
                    className={`relative shrink-0 w-14 h-14 rounded-2xl bg-[#FAFAFA] dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] ${step.hoverBorder} flex items-center justify-center font-mono font-bold text-lg ${step.color} shadow-subtle group-hover:-translate-y-0.5 transition-all duration-200 lg:mb-4`}
                  >
                    {step.num}
                    <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${step.dotColor}`} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-2 min-h-14 lg:min-h-0 lg:mt-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 text-ink-secondary dark:text-[#94A3B8] transition-colors duration-200 ${step.iconHover}`}
                        aria-hidden="true"
                      />
                      <h3 className={`text-xs font-mono font-bold tracking-widest ${step.color}`}>
                        {step.label}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed -mt-2 sm:mt-0 lg:mt-0">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* CTA strip */}
        <div className="p-6 sm:p-10 rounded-2xl bg-[#FAFAFA] dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 shadow-subtle">
          <div>
            <h4 className="text-lg sm:text-xl font-display font-bold text-ink-primary dark:text-[#F8FAFC]">
              Want ML Bhopal at your college?
            </h4>
            <p className="text-xs sm:text-sm text-ink-secondary dark:text-[#94A3B8] mt-1 max-w-xl">
              Apply as a campus ambassador and help bring workshops, meetups and hackathons to your campus.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <PrimaryButton href="/ambassador#apply" size="md" className="w-full sm:w-auto justify-center min-h-11">
              Become a Campus Ambassador →
            </PrimaryButton>
            <SecondaryButton href="/ambassador#campuses" size="md" className="w-full sm:w-auto justify-center min-h-11">
              See 9+ Campuses →
            </SecondaryButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
