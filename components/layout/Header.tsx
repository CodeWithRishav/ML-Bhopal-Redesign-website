"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  Search,
  Award,
  Users,
  BookOpen,
  HeartHandshake,
  Mail,
  Sparkles,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import dynamic from "next/dynamic";

const CommandPalette = dynamic(
  () => import("@/components/ui/CommandPalette").then((mod) => mod.CommandPalette),
  { ssr: false }
);

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [communityDropdownOpen, setCommunityDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const pathname = usePathname();

  const programsRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  const programsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const communityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const moreTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Throttled scroll listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 8;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProgramsDropdownOpen(false);
    setCommunityDropdownOpen(false);
    setMoreDropdownOpen(false);
  }, [pathname]);

  // Close menus when Escape key is pressed or clicked outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setProgramsDropdownOpen(false);
        setCommunityDropdownOpen(false);
        setMoreDropdownOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (programsRef.current && !programsRef.current.contains(target)) {
        setProgramsDropdownOpen(false);
      }
      if (communityRef.current && !communityRef.current.contains(target)) {
        setCommunityDropdownOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(target)) {
        setMoreDropdownOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Hover handlers for accessible desktop dropdowns
  const handleProgramsEnter = () => {
    if (programsTimeoutRef.current) clearTimeout(programsTimeoutRef.current);
    setProgramsDropdownOpen(true);
    setCommunityDropdownOpen(false);
    setMoreDropdownOpen(false);
  };
  const handleProgramsLeave = () => {
    programsTimeoutRef.current = setTimeout(() => {
      setProgramsDropdownOpen(false);
    }, 150);
  };

  const handleCommunityEnter = () => {
    if (communityTimeoutRef.current) clearTimeout(communityTimeoutRef.current);
    setCommunityDropdownOpen(true);
    setProgramsDropdownOpen(false);
    setMoreDropdownOpen(false);
  };
  const handleCommunityLeave = () => {
    communityTimeoutRef.current = setTimeout(() => {
      setCommunityDropdownOpen(false);
    }, 150);
  };

  const handleMoreEnter = () => {
    if (moreTimeoutRef.current) clearTimeout(moreTimeoutRef.current);
    setMoreDropdownOpen(true);
    setProgramsDropdownOpen(false);
    setCommunityDropdownOpen(false);
  };
  const handleMoreLeave = () => {
    moreTimeoutRef.current = setTimeout(() => {
      setMoreDropdownOpen(false);
    }, 150);
  };

  // Route active helpers
  const isEventsActive = pathname.startsWith("/events");
  const isCampaignsActive = pathname.startsWith("/campaigns");
  const isProgramsActive = pathname === "/ambassador" || pathname === "/join";
  const isAiDayActive = pathname === "/ai-day";
  const isResourcesActive = pathname.startsWith("/resources");
  const isCommunityActive =
    pathname === "/about" ||
    pathname === "/team" ||
    pathname === "/partners" ||
    pathname === "/contact";
  const isMoreActive = isAiDayActive || isResourcesActive || isCommunityActive;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b",
        isScrolled
          ? "bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-[#D1D5DB] dark:border-[#334155] py-2.5 shadow-subtle"
          : "bg-white dark:bg-[#0F172A] border-[#D1D5DB] dark:border-[#334155] py-3"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Area: ML Bhopal is Primary, Google for Developers is subtle & secondary */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-control p-0.5 shrink-0"
          aria-label="ML Bhopal Home"
        >
          {/* Official ML Bhopal Logo */}
          <div className="relative h-7 sm:h-8 w-24 sm:w-26 transition-transform group-hover:scale-[1.01]">
            <Image
              src="/logos/ml-bhopal-light.png"
              alt="ML Bhopal"
              fill
              priority
              sizes="104px"
              className="object-contain object-left dark:hidden"
            />
            <Image
              src="/logos/ml-bhopal-dark.png"
              alt="ML Bhopal"
              fill
              priority
              sizes="104px"
              className="object-contain object-left hidden dark:block"
            />
          </div>

          {/* Quiet, Secondary Google Affiliation Label */}
          <span className="hidden 2xl:inline-block text-[11px] font-sans text-ink-tertiary dark:text-[#64748B] pl-2.5 border-l border-[#D1D5DB] dark:border-[#334155] select-none whitespace-nowrap">
            by Google for Developers
          </span>
        </Link>

        {/* Primary Desktop Navigation (1024px and above) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-1 xl:gap-1.5"
        >
          {/* 1. Events */}
          <Link
            href="/events"
            className={cn(
              "relative text-sm font-medium transition-colors px-2.5 py-1.5 rounded-control inline-flex items-center whitespace-nowrap",
              isEventsActive
                ? "text-primary font-semibold"
                : "text-ink-secondary dark:text-[#94A3B8] hover:text-ink-primary dark:hover:text-[#F8FAFC] hover:bg-[#F1F3F4]/80 dark:hover:bg-[#1E293B]"
            )}
          >
            <span>Events</span>
            {isEventsActive && (
              <span
                className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-primary rounded-full pointer-events-none"
                aria-hidden="true"
              />
            )}
          </Link>

          {/* 2. Campaigns */}
          <Link
            href="/campaigns"
            className={cn(
              "relative text-sm font-medium transition-colors px-2.5 py-1.5 rounded-control inline-flex items-center whitespace-nowrap",
              isCampaignsActive
                ? "text-primary font-semibold"
                : "text-ink-secondary dark:text-[#94A3B8] hover:text-ink-primary dark:hover:text-[#F8FAFC] hover:bg-[#F1F3F4]/80 dark:hover:bg-[#1E293B]"
            )}
          >
            <span>Campaigns</span>
            {isCampaignsActive && (
              <span
                className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-primary rounded-full pointer-events-none"
                aria-hidden="true"
              />
            )}
          </Link>

          {/* 3. Programs Dropdown */}
          <div
            className="relative"
            ref={programsRef}
            onMouseEnter={handleProgramsEnter}
            onMouseLeave={handleProgramsLeave}
          >
            <button
              type="button"
              onClick={() => setProgramsDropdownOpen((prev) => !prev)}
              className={cn(
                "relative text-sm font-medium transition-colors inline-flex items-center gap-1 px-2.5 py-1.5 rounded-control cursor-pointer whitespace-nowrap",
                isProgramsActive
                  ? "text-primary font-semibold"
                  : "text-ink-secondary dark:text-[#94A3B8] hover:text-ink-primary dark:hover:text-[#F8FAFC] hover:bg-[#F1F3F4]/80 dark:hover:bg-[#1E293B]"
              )}
              aria-haspopup="true"
              aria-expanded={programsDropdownOpen}
            >
              <span>Programs</span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform duration-150",
                  programsDropdownOpen ? "rotate-180" : ""
                )}
                aria-hidden="true"
              />
              {isProgramsActive && (
                <span
                  className="absolute bottom-0 left-2.5 right-6 h-0.5 bg-primary rounded-full pointer-events-none"
                  aria-hidden="true"
                />
              )}
            </button>

            {programsDropdownOpen && (
              <div className="absolute top-full left-0 w-64 pt-1.5 z-50">
                <div className="p-1.5 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-elevation-2 flex flex-col gap-0.5">
                  <Link
                    href="/ambassador"
                    onClick={() => setProgramsDropdownOpen(false)}
                    className="p-2.5 rounded-control hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B] transition-colors group flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-control bg-google-green-light dark:bg-[#1E3B27] text-google-green dark:text-[#81C995] flex items-center justify-center shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-ink-primary dark:text-[#F8FAFC] group-hover:text-google-blue dark:group-hover:text-[#60A5FA] block">
                        Campus Ambassadors
                      </span>
                      <span className="text-xs text-ink-secondary dark:text-[#94A3B8] block">
                        Lead student chapters at your college
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/join"
                    onClick={() => setProgramsDropdownOpen(false)}
                    className="p-2.5 rounded-control hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B] transition-colors group flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-control bg-google-blue-light dark:bg-[#1A3A6E] text-google-blue dark:text-[#60A5FA] flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-ink-primary dark:text-[#F8FAFC] group-hover:text-google-blue dark:group-hover:text-[#60A5FA] block">
                        Volunteer Core
                      </span>
                      <span className="text-xs text-ink-secondary dark:text-[#94A3B8] block">
                        Join event ops, code, or design team
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 4. AI Day (Evergreen, normal navigation item — NEVER "AI Day 2.0") */}
          <Link
            href="/ai-day"
            className={cn(
              "relative text-sm font-medium transition-colors px-2.5 py-1.5 rounded-control inline-flex items-center whitespace-nowrap",
              isAiDayActive
                ? "text-primary font-semibold"
                : "text-ink-secondary dark:text-[#94A3B8] hover:text-ink-primary dark:hover:text-[#F8FAFC] hover:bg-[#F1F3F4]/80 dark:hover:bg-[#1E293B]"
            )}
          >
            <span>AI Day</span>
            {isAiDayActive && (
              <span
                className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-primary rounded-full pointer-events-none"
                aria-hidden="true"
              />
            )}
          </Link>

          {/* 5. Resources (Always visible on xl; in compact screens tucked into More) */}
          <Link
            href="/resources"
            className={cn(
              "hidden xl:inline-flex relative text-sm font-medium transition-colors px-2.5 py-1.5 rounded-control items-center whitespace-nowrap",
              isResourcesActive
                ? "text-primary font-semibold"
                : "text-ink-secondary dark:text-[#94A3B8] hover:text-ink-primary dark:hover:text-[#F8FAFC] hover:bg-[#F1F3F4]/80 dark:hover:bg-[#1E293B]"
            )}
          >
            <span>Resources</span>
            {isResourcesActive && (
              <span
                className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-primary rounded-full pointer-events-none"
                aria-hidden="true"
              />
            )}
          </Link>

          {/* 6. Community Dropdown (Always visible on xl; in compact screens tucked into More) */}
          <div
            className="hidden xl:block relative"
            ref={communityRef}
            onMouseEnter={handleCommunityEnter}
            onMouseLeave={handleCommunityLeave}
          >
            <button
              type="button"
              onClick={() => setCommunityDropdownOpen((prev) => !prev)}
              className={cn(
                "relative text-sm font-medium transition-colors inline-flex items-center gap-1 px-2.5 py-1.5 rounded-control cursor-pointer whitespace-nowrap",
                isCommunityActive
                  ? "text-primary font-semibold"
                  : "text-ink-secondary dark:text-[#94A3B8] hover:text-ink-primary dark:hover:text-[#F8FAFC] hover:bg-[#F1F3F4]/80 dark:hover:bg-[#1E293B]"
              )}
              aria-haspopup="true"
              aria-expanded={communityDropdownOpen}
            >
              <span>Community</span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform duration-150",
                  communityDropdownOpen ? "rotate-180" : ""
                )}
                aria-hidden="true"
              />
              {isCommunityActive && (
                <span
                  className="absolute bottom-0 left-2.5 right-6 h-0.5 bg-primary rounded-full pointer-events-none"
                  aria-hidden="true"
                />
              )}
            </button>

            {communityDropdownOpen && (
              <div className="absolute top-full right-0 w-60 pt-1.5 z-50">
                <div className="p-1.5 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-elevation-2 flex flex-col gap-0.5">
                  <Link
                    href="/about"
                    onClick={() => setCommunityDropdownOpen(false)}
                    className="p-2 rounded-control hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B] transition-colors text-sm text-ink-primary dark:text-[#F8FAFC] hover:text-google-blue dark:hover:text-[#60A5FA] flex items-center gap-2.5"
                  >
                    <BookOpen className="w-4 h-4 text-google-blue" />
                    <span>About Story & Values</span>
                  </Link>
                  <Link
                    href="/team"
                    onClick={() => setCommunityDropdownOpen(false)}
                    className="p-2 rounded-control hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B] transition-colors text-sm text-ink-primary dark:text-[#F8FAFC] hover:text-google-blue dark:hover:text-[#60A5FA] flex items-center gap-2.5"
                  >
                    <Users className="w-4 h-4 text-google-green" />
                    <span>Core Team & Leads</span>
                  </Link>
                  <Link
                    href="/partners"
                    onClick={() => setCommunityDropdownOpen(false)}
                    className="p-2 rounded-control hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B] transition-colors text-sm text-ink-primary dark:text-[#F8FAFC] hover:text-google-blue dark:hover:text-[#60A5FA] flex items-center gap-2.5"
                  >
                    <HeartHandshake className="w-4 h-4 text-google-yellow" />
                    <span>Academic & Tech Partners</span>
                  </Link>
                  <div className="h-px bg-[#D1D5DB] dark:bg-[#334155] my-1" />
                  <Link
                    href="/contact"
                    onClick={() => setCommunityDropdownOpen(false)}
                    className="p-2 rounded-control hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B] transition-colors text-sm text-ink-primary dark:text-[#F8FAFC] hover:text-google-blue dark:hover:text-[#60A5FA] flex items-center gap-2.5"
                  >
                    <Mail className="w-4 h-4 text-google-red" />
                    <span>Contact Leadership</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Responsive "More ▾" menu (Active only between 1024px and 1279px to prevent navbar wrap) */}
          <div
            className="xl:hidden relative"
            ref={moreRef}
            onMouseEnter={handleMoreEnter}
            onMouseLeave={handleMoreLeave}
          >
            <button
              type="button"
              onClick={() => setMoreDropdownOpen((prev) => !prev)}
              className={cn(
                "relative text-sm font-medium transition-colors inline-flex items-center gap-1 px-2.5 py-1.5 rounded-control cursor-pointer whitespace-nowrap",
                isResourcesActive || isCommunityActive
                  ? "text-primary font-semibold"
                  : "text-ink-secondary dark:text-[#94A3B8] hover:text-ink-primary dark:hover:text-[#F8FAFC] hover:bg-[#F1F3F4]/80 dark:hover:bg-[#1E293B]"
              )}
              aria-haspopup="true"
              aria-expanded={moreDropdownOpen}
            >
              <span>More</span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform duration-150",
                  moreDropdownOpen ? "rotate-180" : ""
                )}
                aria-hidden="true"
              />
              {(isResourcesActive || isCommunityActive) && (
                <span
                  className="absolute bottom-0 left-2.5 right-6 h-0.5 bg-primary rounded-full pointer-events-none"
                  aria-hidden="true"
                />
              )}
            </button>

            {moreDropdownOpen && (
              <div className="absolute top-full right-0 w-60 pt-1.5 z-50">
                <div className="p-1.5 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-elevation-2 flex flex-col gap-0.5">
                  <Link
                    href="/resources"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="p-2 rounded-control hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B] transition-colors text-sm text-ink-primary dark:text-[#F8FAFC] hover:text-google-blue dark:hover:text-[#60A5FA] flex items-center gap-2.5"
                  >
                    <Layers className="w-4 h-4 text-google-blue" />
                    <span>Resources & Roadmaps</span>
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="p-2 rounded-control hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B] transition-colors text-sm text-ink-primary dark:text-[#F8FAFC] hover:text-google-blue dark:hover:text-[#60A5FA] flex items-center gap-2.5"
                  >
                    <BookOpen className="w-4 h-4 text-google-blue" />
                    <span>About Story & Values</span>
                  </Link>
                  <Link
                    href="/team"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="p-2 rounded-control hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B] transition-colors text-sm text-ink-primary dark:text-[#F8FAFC] hover:text-google-blue dark:hover:text-[#60A5FA] flex items-center gap-2.5"
                  >
                    <Users className="w-4 h-4 text-google-green" />
                    <span>Core Team & Leads</span>
                  </Link>
                  <Link
                    href="/partners"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="p-2 rounded-control hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B] transition-colors text-sm text-ink-primary dark:text-[#F8FAFC] hover:text-google-blue dark:hover:text-[#60A5FA] flex items-center gap-2.5"
                  >
                    <HeartHandshake className="w-4 h-4 text-google-yellow" />
                    <span>Academic & Tech Partners</span>
                  </Link>
                  <div className="h-px bg-[#D1D5DB] dark:bg-[#334155] my-1" />
                  <Link
                    href="/contact"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="p-2 rounded-control hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B] transition-colors text-sm text-ink-primary dark:text-[#F8FAFC] hover:text-google-blue dark:hover:text-[#60A5FA] flex items-center gap-2.5"
                  >
                    <Mail className="w-4 h-4 text-google-red" />
                    <span>Contact Leadership</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Cluster: Search, Theme Toggle, Primary CTA & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Quick Search Button (Compact & uncluttered) */}
          <button
            type="button"
            onClick={() => setCommandPaletteOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 h-8 rounded-control text-xs font-sans text-ink-secondary dark:text-[#94A3B8] bg-[#F1F3F4] dark:bg-[#1E293B] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            aria-label="Search site or press Ctrl+K"
            title="Search site (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-ink-secondary dark:text-[#94A3B8]" />
            <span className="hidden xl:inline text-xs">Search</span>
            <kbd className="font-mono text-[10px] bg-white dark:bg-[#0F172A] border border-[#D1D5DB] dark:border-[#334155] rounded px-1.5 py-0.5 text-gray-500 dark:text-gray-400">
              ⌘K
            </kbd>
          </button>

          {/* Search Button for Mobile Viewport */}
          <button
            type="button"
            onClick={() => setCommandPaletteOpen(true)}
            className="sm:hidden w-8 h-8 rounded-control flex items-center justify-center text-ink-secondary dark:text-[#94A3B8] hover:bg-[#F1F3F4] dark:hover:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            aria-label="Search site"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme Toggle (Compact 32px) */}
          <ThemeToggle size="sm" />

          {/* Join Community Primary CTA */}
          <PrimaryButton
            href="https://commudle.com/communities/ml-bhopal"
            isExternal
            size="sm"
            className="hidden sm:inline-flex text-xs px-3.5 h-8 font-medium shadow-none hover:shadow-subtle"
            icon={<ExternalLink className="w-3 h-3 text-white/80" />}
          >
            Join Community
          </PrimaryButton>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden w-8 h-8 rounded-control flex items-center justify-center text-ink-secondary dark:text-[#94A3B8] hover:text-ink-primary dark:hover:text-white hover:bg-[#F1F3F4] dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            className="lg:hidden border-t border-[#D1D5DB] dark:border-[#334155] bg-white dark:bg-[#0F172A] px-4 pt-3 pb-6 space-y-4 shadow-elevation-2 overflow-hidden"
          >
            {/* Nav Links Stack */}
            <div className="flex flex-col space-y-0.5">
              <Link
                href="/events"
                className={cn(
                  "px-3 py-2 rounded-control text-sm font-medium transition-colors",
                  isEventsActive
                    ? "bg-google-blue-light/60 dark:bg-[#1A3A6E]/60 text-primary font-semibold"
                    : "text-ink-primary dark:text-[#F8FAFC] hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B]"
                )}
              >
                Events
              </Link>

              <Link
                href="/campaigns"
                className={cn(
                  "px-3 py-2 rounded-control text-sm font-medium transition-colors",
                  isCampaignsActive
                    ? "bg-google-blue-light/60 dark:bg-[#1A3A6E]/60 text-primary font-semibold"
                    : "text-ink-primary dark:text-[#F8FAFC] hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B]"
                )}
              >
                Campaigns
              </Link>

              {/* Programs Subsection */}
              <div className="pt-2 pb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-tertiary dark:text-[#64748B] px-3">
                  Programs
                </span>
                <div className="mt-1 flex flex-col space-y-0.5 pl-2 border-l-2 border-[#D1D5DB] dark:border-[#334155] ml-3">
                  <Link
                    href="/ambassador"
                    className={cn(
                      "px-3 py-1.5 rounded-control text-sm transition-colors",
                      pathname === "/ambassador"
                        ? "text-primary font-semibold"
                        : "text-ink-secondary dark:text-[#94A3B8] hover:text-ink-primary dark:hover:text-white"
                    )}
                  >
                    Campus Ambassadors
                  </Link>
                  <Link
                    href="/join"
                    className={cn(
                      "px-3 py-1.5 rounded-control text-sm transition-colors",
                      pathname === "/join"
                        ? "text-primary font-semibold"
                        : "text-ink-secondary dark:text-[#94A3B8] hover:text-ink-primary dark:hover:text-white"
                    )}
                  >
                    Volunteer Core
                  </Link>
                </div>
              </div>

              {/* AI Day (Clean, equal visual weight to other links) */}
              <Link
                href="/ai-day"
                className={cn(
                  "px-3 py-2 rounded-control text-sm font-medium transition-colors",
                  isAiDayActive
                    ? "bg-google-blue-light/60 dark:bg-[#1A3A6E]/60 text-primary font-semibold"
                    : "text-ink-primary dark:text-[#F8FAFC] hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B]"
                )}
              >
                AI Day
              </Link>

              <Link
                href="/resources"
                className={cn(
                  "px-3 py-2 rounded-control text-sm font-medium transition-colors",
                  isResourcesActive
                    ? "bg-google-blue-light/60 dark:bg-[#1A3A6E]/60 text-primary font-semibold"
                    : "text-ink-primary dark:text-[#F8FAFC] hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B]"
                )}
              >
                Resources
              </Link>

              {/* Community Subsection */}
              <div className="pt-2 pb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-tertiary dark:text-[#64748B] px-3">
                  Community
                </span>
                <div className="mt-1 flex flex-col space-y-0.5 pl-2 border-l-2 border-[#D1D5DB] dark:border-[#334155] ml-3">
                  <Link
                    href="/about"
                    className={cn(
                      "px-3 py-1.5 rounded-control text-sm transition-colors",
                      pathname === "/about"
                        ? "text-primary font-semibold"
                        : "text-ink-secondary dark:text-[#94A3B8] hover:text-ink-primary dark:hover:text-white"
                    )}
                  >
                    About Story & Values
                  </Link>
                  <Link
                    href="/team"
                    className={cn(
                      "px-3 py-1.5 rounded-control text-sm transition-colors",
                      pathname === "/team"
                        ? "text-primary font-semibold"
                        : "text-ink-secondary dark:text-[#94A3B8] hover:text-ink-primary dark:hover:text-white"
                    )}
                  >
                    Core Team & Leads
                  </Link>
                  <Link
                    href="/partners"
                    className={cn(
                      "px-3 py-1.5 rounded-control text-sm transition-colors",
                      pathname === "/partners"
                        ? "text-primary font-semibold"
                        : "text-ink-secondary dark:text-[#94A3B8] hover:text-ink-primary dark:hover:text-white"
                    )}
                  >
                    Academic & Tech Partners
                  </Link>
                  <Link
                    href="/contact"
                    className={cn(
                      "px-3 py-1.5 rounded-control text-sm transition-colors",
                      pathname === "/contact"
                        ? "text-primary font-semibold"
                        : "text-ink-secondary dark:text-[#94A3B8] hover:text-ink-primary dark:hover:text-white"
                    )}
                  >
                    Contact Leadership
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Theme Toggle & Join CTA */}
            <div className="pt-3 border-t border-[#D1D5DB] dark:border-[#334155] flex flex-col gap-3">
              <div className="flex items-center justify-between px-3 py-1.5 rounded-control bg-[#FAFAFA] dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155]">
                <span className="text-xs font-medium text-ink-primary dark:text-[#F8FAFC]">
                  Appearance Theme
                </span>
                <ThemeToggle size="sm" />
              </div>

              <PrimaryButton
                href="https://commudle.com/communities/ml-bhopal"
                isExternal
                size="md"
                className="w-full"
                icon={<ExternalLink className="w-4 h-4 text-white/80" />}
              >
                Join Community on Commudle
              </PrimaryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Command Palette (Ctrl+K / Cmd+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </header>
  );
}
