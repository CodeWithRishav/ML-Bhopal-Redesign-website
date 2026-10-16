import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, Instagram, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0F172A] border-t border-[#D1D5DB] dark:border-[#334155] text-ink-secondary dark:text-[#94A3B8] font-sans pt-14 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#D1D5DB] dark:border-[#334155]">
          {/* Institutional Anchor */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="inline-flex items-center gap-3 mb-3 group" aria-label="ML Bhopal Home">
              <div className="relative h-9 w-28 transition-transform group-hover:scale-[1.02]">
                <Image
                  src="/logos/ml-bhopal-light.png"
                  alt="ML Bhopal"
                  fill
                  sizes="112px"
                  className="object-contain object-left dark:hidden"
                />
                <Image
                  src="/logos/ml-bhopal-dark.png"
                  alt="ML Bhopal"
                  fill
                  sizes="112px"
                  className="object-contain object-left hidden dark:block"
                />
              </div>
            </Link>
            <p className="text-sm text-ink-secondary dark:text-[#94A3B8] leading-relaxed mb-4 max-w-sm">
              Central India&apos;s premier community of 3,600+ AI developers, researchers, and student innovators learning, building, and connecting through applied artificial intelligence.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sans bg-[#FAFAFA] dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] text-ink-secondary dark:text-[#94A3B8] mb-6">
              <span className="w-2 h-2 rounded-full bg-google-green shrink-0" />
              <span>Supported by</span>
              <div className="relative h-3 w-24 shrink-0">
                <Image
                  src="/logos/google-developers-light.png"
                  alt="Google for Developers"
                  fill
                  sizes="96px"
                  className="object-contain dark:hidden"
                />
                <Image
                  src="/logos/google-developers-dark.png"
                  alt="Google for Developers"
                  fill
                  sizes="96px"
                  className="object-contain hidden dark:block"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="https://linkedin.com/company/mlbhopal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-control bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] flex items-center justify-center text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] hover:border-google-blue dark:hover:border-[#60A5FA] transition-colors shadow-subtle"
                aria-label="ML Bhopal LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/mlbhopal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-control bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] flex items-center justify-center text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] hover:border-google-blue dark:hover:border-[#60A5FA] transition-colors shadow-subtle"
                aria-label="ML Bhopal Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/mlbhopal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-control bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] flex items-center justify-center text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] hover:border-google-blue dark:hover:border-[#60A5FA] transition-colors shadow-subtle"
                aria-label="ML Bhopal GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://commudle.com/communities/ml-bhopal"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 h-9 rounded-control bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] flex items-center gap-1.5 text-xs font-sans font-medium text-ink-primary dark:text-[#F8FAFC] hover:text-primary dark:hover:text-[#FF9A3D] hover:border-google-blue dark:hover:border-[#60A5FA] transition-colors shadow-subtle"
              >
                <span>Commudle</span>
                <ExternalLink className="w-3 h-3 text-google-blue dark:text-[#60A5FA]" />
              </a>
            </div>
          </div>

          {/* Directory Column 1: Events */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="text-xs font-semibold text-ink-primary dark:text-[#F8FAFC] uppercase tracking-wider">Events</span>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link href="/events" className="text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] transition-colors">Upcoming Meetups</Link></li>
              <li><Link href="/events" className="text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] transition-colors">Workshops & Labs</Link></li>
              <li><Link href="/events" className="text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] transition-colors">Hackathon CTFs</Link></li>
              <li><Link href="/ai-day" className="text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] transition-colors">AI Day 2.0 (2026)</Link></li>
              <li><Link href="/events" className="text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] transition-colors">All 21+ Events</Link></li>
            </ul>
          </div>

          {/* Directory Column 2: Campaigns */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="text-xs font-semibold text-ink-primary dark:text-[#F8FAFC] uppercase tracking-wider">Campaigns</span>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link href="/campaigns" className="text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] transition-colors">Build with AI</Link></li>
              <li><Link href="/campaigns" className="text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] transition-colors">Gen AI Hackathon</Link></li>
              <li><Link href="/campaigns" className="text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] transition-colors">TPU Learning Cohort</Link></li>
              <li><Link href="/campaigns" className="text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] transition-colors">Kaggle Days Bhopal</Link></li>
            </ul>
          </div>

          {/* Directory Column 3: Programs */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="text-xs font-semibold text-ink-primary dark:text-[#F8FAFC] uppercase tracking-wider">Programs</span>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link href="/ambassador" className="text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] transition-colors">Campus Ambassadors</Link></li>
              <li><Link href="/ambassador#roadmap" className="text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] transition-colors">College Chapter MoUs</Link></li>
              <li><Link href="/join" className="text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] transition-colors">Volunteer Core</Link></li>
              <li><Link href="/contact" className="text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] transition-colors">Speaker Submissions</Link></li>
            </ul>
          </div>

          {/* Directory Column 4: Community */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="text-xs font-semibold text-ink-primary dark:text-[#F8FAFC] uppercase tracking-wider">Community</span>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link href="/about" className="text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] transition-colors">About Story</Link></li>
              <li><Link href="/team" className="text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] transition-colors">Core Team & Leads</Link></li>
              <li><Link href="/partners" className="text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] transition-colors">Academic Network</Link></li>
              <li><Link href="/resources" className="text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] transition-colors">Resources & Code</Link></li>
              <li><Link href="/contact" className="text-ink-secondary dark:text-[#94A3B8] hover:text-primary dark:hover:text-[#FF9A3D] transition-colors">Contact Desk</Link></li>
            </ul>
          </div>
        </div>

        {/* Sub-footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 text-xs text-ink-tertiary dark:text-[#64748B] font-sans text-center sm:text-left">
          <div className="max-w-md">
            © {new Date().getFullYear()} ML Bhopal. An AI/ML Developer Community supported by Google for Developers.
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 sm:gap-6">
            <span>Bhopal, Madhya Pradesh, India</span>
            <span>•</span>
            <a href="mailto:tfug.bhopal@gmail.com" className="hover:text-primary dark:hover:text-[#FF9A3D] transition-colors">
              tfug.bhopal@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
