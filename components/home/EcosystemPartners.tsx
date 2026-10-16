"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Handshake } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Partner } from "@/lib/types";

export function EcosystemPartners({ partners }: { partners: Partner[] }) {
  return (
    <section className="relative py-20 sm:py-28 bg-white dark:bg-[#0F172A] border-b border-[#D1D5DB] dark:border-[#334155] transition-colors">
      <Container>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14 sm:mb-20">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primary dark:text-[#FF9A3D] mb-2 block">
              ECOSYSTEM NETWORK
            </span>
            <h2 className="font-display font-black tracking-tight text-ink-primary dark:text-[#F8FAFC] text-3xl sm:text-4xl lg:text-5xl uppercase max-w-xl leading-[0.98]">
              Collaborating Across Industry &amp; Academia<span className="text-google-yellow">.</span>
            </h2>
          </div>

          <Link
            href="/partners"
            className="text-xs font-semibold uppercase tracking-wider text-google-blue dark:text-[#60A5FA] hover:text-google-blue-dark dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1.5"
          >
            <span>Explore Partner Network</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ============================================================== */}
        {/* CLEAN ECOSYSTEM LOGO WALL (Zero heavy card borders)            */}
        {/* Subtle grayscale with hover to full visibility                 */}
        {/* ============================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 sm:gap-12 items-center justify-items-center mb-16">
          {partners.map((partner, index) => (
            <a
              key={`${partner.name}-${index}`}
              href={partner.url || "/partners"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 text-center group w-full transition-transform duration-300 hover:scale-105"
            >
              {partner.logo ? (
                <div className="relative h-10 w-32 mb-2 flex items-center justify-center grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:contrast-100 transition-all duration-300">
                  {partner.name.toLowerCase().includes("google") ? (
                    <>
                      <Image
                        src="/logos/google-developers-light.png"
                        alt={partner.name}
                        fill
                        sizes="128px"
                        className="object-contain dark:hidden"
                      />
                      <Image
                        src="/logos/google-developers-dark.png"
                        alt={partner.name}
                        fill
                        sizes="128px"
                        className="object-contain hidden dark:block"
                      />
                    </>
                  ) : (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      sizes="128px"
                      className="object-contain dark:brightness-110"
                    />
                  )}
                </div>
              ) : (
                <span className="font-display font-bold text-sm text-ink-primary dark:text-[#F8FAFC] group-hover:text-google-blue dark:group-hover:text-[#60A5FA] transition-colors line-clamp-1">
                  {partner.name}
                </span>
              )}

              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-tertiary dark:text-[#64748B] group-hover:text-ink-secondary transition-colors">
                {partner.type}
              </span>
            </a>
          ))}
        </div>

        {/* Minimal Ecosystem Invite Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#D1D5DB] dark:border-[#334155] text-xs font-sans text-ink-secondary dark:text-[#94A3B8]">
          <span>
            Partnering with institutions across Bhopal, Indore, Jabalpur, and Gwalior.
          </span>
          <Link
            href="/contact?type=partner"
            className="font-semibold text-google-blue dark:text-[#60A5FA] hover:text-google-blue-dark dark:hover:text-blue-300 inline-flex items-center gap-1 transition-colors"
          >
            <span>Become an Ecosystem Partner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </Container>
    </section>
  );
}
