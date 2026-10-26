"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Twitter, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { TeamMember } from "@/lib/types";

export function CommunityPeople({ team }: { team: TeamMember[] }) {
  const displayMembers = team.slice(0, 4);

  return (
    <section className="relative py-20 sm:py-28 bg-[#FAFAFA] dark:bg-[#0F172A] border-b border-[#D1D5DB] dark:border-[#334155] transition-colors">
      <Container>
        
        {/* ============================================================== */}
        {/* TOP: Asymmetric Split — Statement & Human Photographic Collage  */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left: Confident Human Statement (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primary dark:text-[#FF9A3D] mb-3 block">
              COMMUNITY LEADERSHIP
            </span>

            <h2 className="font-display font-black tracking-tight text-ink-primary dark:text-[#F8FAFC] text-4xl sm:text-5xl lg:text-6xl leading-[0.96] uppercase mb-6">
              Built by Volunteers, <br />
              <span className="text-google-blue dark:text-[#60A5FA]">For Builders</span><span className="text-google-red">.</span>
            </h2>

            <p className="text-sm sm:text-base text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed mb-6">
              ML Bhopal is run by volunteers: working engineers and students who organise workshops, hackathons and AI Day in their spare time.
            </p>

            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-google-blue dark:text-[#60A5FA] hover:text-google-blue-dark dark:hover:text-blue-300 transition-colors group"
            >
              <span>Meet the Organizing Team</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right: Overlapping Community Photography (7 cols) */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            <div className="relative w-full max-w-[520px] aspect-[16/10]">
              
              {/* Primary Photo: Organizers & Stage */}
              <div className="relative w-[85%] h-[90%] rounded-2xl overflow-hidden border border-[#D1D5DB] dark:border-[#334155] shadow-elevation-2 bg-slate-900 group">
                <Image
                  src="/images/ai-day/anubhav-talk.jpg"
                  alt="A speaker presenting at AI Day Bhopal 2025"
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-[10px] font-mono uppercase text-google-green font-semibold block">
                    Volunteer-Led
                  </span>
                  <span className="text-xs font-semibold">
                    Volunteer organizers · AI Day 2025
                  </span>
                </div>
              </div>

              {/* Smaller Overlapping Photo: Mentor & Hands-on Discussion */}
              <div className="absolute -bottom-3 -right-2 sm:-right-4 w-[48%] aspect-[4/3] rounded-xl overflow-hidden border-2 border-white dark:border-[#1E293B] shadow-elevation-3 bg-slate-900 z-10 group">
                <Image
                  src="/images/ai-day/vertex-ai-walkthrough.jpg"
                  alt="Vertex AI walkthrough session at AI Day Bhopal 2025"
                  fill
                  sizes="(max-width: 640px) 160px, 220px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 text-white">
                  <span className="text-[10px] font-semibold block truncate">
                    Hands-on sessions
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* BOTTOM: Minimal Horizontal People Strip (Zero Boxed Cards)     */}
        {/* ============================================================== */}
        <div className="pt-8 border-t border-[#D1D5DB] dark:border-[#334155]">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-tertiary dark:text-[#64748B] block mb-6">
            Featured Community Leads:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayMembers.map((member) => (
              <div
                key={member.name}
                className="flex items-center gap-3.5 group"
              >
                {/* Clean round avatar */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#D1D5DB] dark:border-[#334155] shrink-0 bg-[#F1F3F4] dark:bg-[#1E293B]">
                  {member.avatar ? (
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      sizes="48px"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <span className="flex items-center justify-center h-full text-xs font-bold text-google-blue">
                      {member.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Identity info */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-display font-bold text-ink-primary dark:text-[#F8FAFC] group-hover:text-google-blue dark:group-hover:text-[#60A5FA] transition-colors truncate">
                    {member.name}
                  </h4>
                  <span className="text-xs font-medium text-google-blue dark:text-[#60A5FA] block truncate">
                    {member.role}
                  </span>
                  {member.company && (
                    <span className="text-[11px] text-ink-tertiary dark:text-[#64748B] block truncate">
                      {member.company}
                    </span>
                  )}
                </div>

                {/* Direct LinkedIn / GitHub link */}
                <div className="flex items-center gap-1.5 text-ink-tertiary">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 hover:text-google-blue transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 hover:text-google-blue transition-colors"
                      aria-label={`${member.name} GitHub`}
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}
