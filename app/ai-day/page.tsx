import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  Mic,
  Sparkles,
  Users,
  Building2,
  CheckCircle2,
  Layers,
  ArrowRight,
  Bot,
  Cpu,
  Eye,
  ShieldCheck,
  Trophy,
  History,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { HeroGridBackground } from "@/components/ui/HeroGridBackground";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { AIDayEditionSwitcher } from "@/components/aiday/AIDayEditionSwitcher";
import { AIDayNav } from "@/components/aiday/AIDayNav";
import { AIDayFAQ } from "@/components/aiday/AIDayFAQ";
import { getAIDayEvents, getEvents } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AI Day Bhopal — Flagship AI Builder Summit",
  description:
    "Central India's premier annual artificial intelligence summit. Multi-track keynotes, applied workshops, AI-Thon, and startup demo days by ML Bhopal and Google for Developers.",
  alternates: {
    canonical: "/ai-day",
  },
  openGraph: {
    title: "AI Day Bhopal — Flagship AI Builder Summit | ML Bhopal",
    description:
      "500+ builders, Google Developer Experts, multi-track masterclasses, and applied AI innovation in Bhopal.",
    url: "https://mlbhopal.tech/ai-day",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "AI Day Bhopal Summit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Day Bhopal — Flagship AI Builder Summit | ML Bhopal",
    description:
      "500+ builders, Google Developer Experts, multi-track masterclasses, and applied AI innovation in Bhopal.",
    images: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200"],
  },
};

// Documented Tracks
const DOCUMENTED_TRACKS = [
  {
    id: "agentic-ai",
    title: "Agentic AI",
    icon: <Bot className="w-5 h-5" />,
    badge: "Track 01",
    description:
      "Autonomous systems, self-reflection loops, multi-agent swarms, tool-calling execution, and production reasoning frameworks.",
    topics: ["Autonomous Agents", "LangGraph", "Tool Orchestration", "CrewAI"],
  },
  {
    id: "llmops",
    title: "LLMOps & Infra",
    icon: <Cpu className="w-5 h-5" />,
    badge: "Track 02",
    description:
      "Low-latency model serving, AWQ & GGUF quantization, vLLM inference clusters, and high-throughput vector retrieval architectures.",
    topics: ["vLLM Clusters", "Quantization", "Model Serving", "Hybrid RAG"],
  },
  {
    id: "multimodal-vision",
    title: "Multimodal Vision",
    icon: <Eye className="w-5 h-5" />,
    badge: "Track 03",
    description:
      "Vision-Language Models, real-time spatial computing, audio-visual tokenization, and edge inference on mobile hardware.",
    topics: ["Gemini Multimodal", "VLM Fine-tuning", "Edge Vision", "Spatial AI"],
  },
  {
    id: "ai-security",
    title: "AI Security & CTF",
    icon: <ShieldCheck className="w-5 h-5" />,
    badge: "Track 04",
    description:
      "Red-teaming generative models, prompt injection defense, adversarial robustness, and Capture The Flag security challenges.",
    topics: ["Red-Teaming", "Adversarial Robustness", "CTF Challenges", "OWASP AI"],
  },
];

// Documented Schedule Blueprint
const SUMMIT_SCHEDULE = [
  {
    time: "09:30 AM",
    title: "Keynote & Opening Address: The State of Applied AI",
    speaker: "Community Leadership & Google Developer Experts",
    type: "Keynote",
  },
  {
    time: "11:00 AM",
    title: "Parallel Track A: Agentic Swarms & Autonomous Reasoning",
    speaker: "Technical Session & Architecture Walkthrough",
    type: "Deep Dive",
  },
  {
    time: "11:00 AM",
    title: "Parallel Track B: Production LLMOps & vLLM Clusters",
    speaker: "Inference Benchmark & Serving Workshop",
    type: "Workshop",
  },
  {
    time: "01:00 PM",
    title: "Networking Lunch & Community Builder Expo",
    speaker: "Project showcases, team matchmaking & mentor lounges",
    type: "Networking",
  },
  {
    time: "02:00 PM",
    title: "AI-Thon 12-Hour Sprint & Live Code Challenge",
    speaker: "Supervised by GDE Mentors across 5 domains",
    type: "Hackathon",
  },
  {
    time: "04:30 PM",
    title: "Fireside Panel: Bridging Student Builders to AI Careers",
    speaker: "Industry Leaders & Startup Founders",
    type: "Panel",
  },
  {
    time: "05:30 PM",
    title: "AI-Thon Finalist Demos, Awards & Internship Announcements",
    speaker: "Guaranteed internship referrals & closing ceremony",
    type: "Awards",
  },
];

// Verified Gallery Images
const GALLERY_PHOTOS = [
  {
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
    caption: "AI Day Keynote Hall",
  },
  {
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800",
    caption: "Main Stage Technical Keynote",
  },
  {
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800",
    caption: "AI-Thon Collaborative Sprint",
  },
  {
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800",
    caption: "Hands-on Code Mentorship",
  },
  {
    url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800",
    caption: "Community Builder Networking",
  },
  {
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800",
    caption: "Awards & Project Showcase",
  },
];

export default function AIDayPage() {
  const aiDayEvents = getAIDayEvents();

  // Aggregate stats across all documented AI Day editions
  const totalEditions = aiDayEvents.length;
  const totalAttendees = aiDayEvents.reduce((acc, curr) => {
    return acc + (typeof curr.registrations === "number" ? curr.registrations : 0);
  }, 0);

  // Distinct verified speakers across all AI Day editions
  const allSpeakers = Array.from(
    new Set(
      aiDayEvents.flatMap((e) =>
        (e.speakers || []).map((s) => (typeof s === "string" ? s : s.name))
      )
    )
  );

  const latestEdition = aiDayEvents[0];
  const aiDaySchema = latestEdition
    ? {
        "@context": "https://schema.org",
        "@type": "EducationEvent",
        name: "AI Day Bhopal — Flagship AI Builder Summit",
        description:
          "Central India's premier annual artificial intelligence summit. Multi-track keynotes, applied workshops, AI-Thon, and startup demo days by ML Bhopal and Google for Developers.",
        startDate: latestEdition.date ? `${latestEdition.date}T09:30:00+05:30` : undefined,
        endDate: latestEdition.date ? `${latestEdition.date}T18:30:00+05:30` : undefined,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: latestEdition.venue || "LNCT Group of Colleges",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bhopal",
            addressRegion: "Madhya Pradesh",
            addressCountry: "IN",
          },
        },
        image: [
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200",
        ],
        organizer: {
          "@type": "Organization",
          name: "ML Bhopal",
          url: "https://mlbhopal.tech",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: latestEdition.registrationUrl || "https://www.commudle.com/communities/ml-bhopal/events",
        },
        performer: allSpeakers.map((speaker) => ({
          "@type": "Person",
          name: speaker,
        })),
      }
    : null;

  return (
    <div className="relative pt-24 pb-24 bg-background dark:bg-[#0F172A] transition-colors overflow-hidden">
      {/* Blueprint Grid Background Pattern */}
      <HeroGridBackground withElements withTopBorder />

      {aiDaySchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aiDaySchema) }}
        />
      )}
      <Container className="relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: "Community", href: "/about" },
              { label: "AI Day", href: "/ai-day" },
            ]}
          />
        </div>

        {/* 1. Hero Section with ScrollReveal */}
        <ScrollReveal>
          <section aria-labelledby="aiday-hero-title" className="mb-16">
            <div className="relative rounded-surface bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] p-6 sm:p-10 lg:p-16 overflow-hidden shadow-subtle">
              {/* Blueprint Grid inside AI Day Hero */}
              <div className="absolute inset-0 blueprint-grid opacity-30 dark:opacity-15 pointer-events-none" />

              {/* Google 4-color accent top strip */}
              <div className="absolute top-0 inset-x-0 h-1 flex">
                <span className="h-full flex-1 bg-google-blue" />
                <span className="h-full flex-1 bg-google-red" />
                <span className="h-full flex-1 bg-google-yellow" />
                <span className="h-full flex-1 bg-google-green" />
              </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center pt-2">
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#F1F3F4] text-ink-secondary border border-[#D1D5DB]">
                  <span className="w-2 h-2 rounded-full bg-google-blue inline-block" />
                  FLAGSHIP ANNUAL SUMMIT • CENTRAL INDIA
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-google-blue bg-blue-50 border border-blue-200">
                  AI DAY 2.0
                </span>
              </div>

              <h1
                id="aiday-hero-title"
                className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-ink-primary leading-[1.08] mb-5 sm:mb-6 break-words"
              >
                AI DAY BHOPAL
              </h1>

              <p className="font-sans text-base sm:text-lg md:text-xl text-ink-secondary leading-relaxed max-w-2xl mb-8 sm:mb-10 text-balance">
                Central India’s benchmark artificial intelligence gathering. Uniting 500+ builders, researchers, and tech leaders for multi-track keynotes, hands-on workshops, and competitive AI-Thons.
              </p>

              {/* Core Statistics Bar with Google 4-color top borders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mb-8 sm:mb-10 text-left">
                <div className="p-4 rounded-card bg-[#FAFAFA] border border-[#D1D5DB] border-t-2 border-t-google-blue">
                  <span className="text-ink-secondary block text-[11px] font-medium uppercase tracking-wider">TOTAL EDITIONS</span>
                  <span className="text-2xl font-bold font-display text-ink-primary block mt-0.5">
                    {totalEditions} Summits
                  </span>
                  <span className="text-ink-secondary text-xs">Since April 2023</span>
                </div>
                <div className="p-4 rounded-card bg-[#FAFAFA] border border-[#D1D5DB] border-t-2 border-t-google-green">
                  <span className="text-ink-secondary block text-[11px] font-medium uppercase tracking-wider">VERIFIED ATTENDEES</span>
                  <span className="text-2xl font-bold font-display text-google-green block mt-0.5">
                    {totalAttendees.toLocaleString()}+
                  </span>
                  <span className="text-ink-secondary text-xs">Total registrations</span>
                </div>
                <div className="p-4 rounded-card bg-[#FAFAFA] border border-[#D1D5DB] border-t-2 border-t-google-yellow">
                  <span className="text-ink-secondary block text-[11px] font-medium uppercase tracking-wider">TECHNICAL TRACKS</span>
                  <span className="text-2xl font-bold font-display text-ink-primary block mt-0.5">
                    4 Tracks
                  </span>
                  <span className="text-ink-secondary text-xs">Agents, Ops, Vision, Sec</span>
                </div>
                <div className="p-4 rounded-card bg-[#FAFAFA] border border-[#D1D5DB] border-t-2 border-t-google-red">
                  <span className="text-ink-secondary block text-[11px] font-medium uppercase tracking-wider">ACCESS STATUS</span>
                  <span className="text-2xl font-bold font-display text-ink-primary block mt-0.5">
                    Open & Free
                  </span>
                  <span className="text-ink-secondary text-xs">Google Supported</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <PrimaryButton
                  href="#editions"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Current Edition
                </PrimaryButton>

                <SecondaryButton
                  href="https://www.commudle.com/communities/ml-bhopal/events"
                  isExternal
                  size="lg"
                  icon={<ExternalLink className="w-4 h-4 text-ink-secondary" />}
                >
                  Commudle Hub
                </SecondaryButton>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* In-page Sticky Navigation */}
        <AIDayNav />

        {/* 2. Current Edition & Interactive Edition Switcher */}
        <section id="editions" aria-labelledby="editions-heading" className="mb-20 scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
                Summit Archives & Editions
              </span>
              <h2 id="editions-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight">
                Current Edition & Historical Timeline
              </h2>
            </div>
            <p className="text-sm text-ink-secondary dark:text-gray-400 max-w-md font-sans">
              Switch between documented editions to examine keynote recordings, participant counts, and speaker rosters.
            </p>
          </div>

          <AIDayEditionSwitcher editions={aiDayEvents} />
        </section>

        {/* 3. About AI Day Section */}
        <section id="overview" aria-labelledby="about-aiday-heading" className="mb-20 scroll-mt-28">
          <div className="p-8 sm:p-12 rounded-surface bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-subtle">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-google-blue" />
              <span className="text-xs font-semibold uppercase tracking-wider text-google-blue">
                Foundational Mission
              </span>
            </div>
            <h2 id="about-aiday-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] mb-6">
              About AI Day Bhopal
            </h2>
            <div className="max-w-none text-base text-ink-secondary font-sans leading-relaxed space-y-4">
              <p>
                Launched on April 15, 2023 under the former TFUG Bhopal banner, AI Day was created to solve a critical regional challenge: providing developers, researchers, and students in Central India with access to tier-one artificial intelligence training, Google Developer Experts, and production engineering practices without needing to relocate to metropolitan hubs.
              </p>
              <p>
                What began as a single-day gathering of 300 enthusiasts at Bhopal has since scaled into the region’s signature AI summit. Each edition unites academic institutions including LNCT Group of Colleges, Oriental Institute of Science & Technology, and SATI with global ecosystems like Google for Developers and OWASP.
              </p>
            </div>

            {/* Impact Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pt-8 border-t border-[#D1D5DB]">
              <div className="p-5 rounded-card bg-[#FAFAFA] border border-[#D1D5DB] border-t-2 border-t-google-blue">
                <span className="text-xs font-semibold text-google-blue uppercase tracking-wider block mb-1">Pillar 01</span>
                <h3 className="text-base font-display font-semibold text-ink-primary mb-2">Production AI Labs</h3>
                <p className="text-xs text-ink-secondary leading-relaxed font-sans">
                  Real-time model training, open-source weight fine-tuning, and vLLM cluster deployments rather than superficial slide presentations.
                </p>
              </div>

              <div className="p-5 rounded-card bg-[#FAFAFA] border border-[#D1D5DB] border-t-2 border-t-google-green">
                <span className="text-xs font-semibold text-google-green uppercase tracking-wider block mb-1">Pillar 02</span>
                <h3 className="text-base font-display font-semibold text-ink-primary mb-2">Competitive AI-Thon</h3>
                <p className="text-xs text-ink-secondary leading-relaxed font-sans">
                  12-hour builder sprints solving actual challenges across HealthTech, FinTech, CyberSecurity, and EduTech with direct mentor feedback.
                </p>
              </div>

              <div className="p-5 rounded-card bg-[#FAFAFA] border border-[#D1D5DB] border-t-2 border-t-google-yellow">
                <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block mb-1">Pillar 03</span>
                <h3 className="text-base font-display font-semibold text-ink-primary mb-2">Career & Founder Pipeline</h3>
                <p className="text-xs text-ink-secondary leading-relaxed font-sans">
                  Guaranteed interview screenings, startup partner sponsorships, and direct networking with hiring engineering teams.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Documented Tracks Section with 4 Google Accent Colors */}
        <section id="tracks" aria-labelledby="tracks-heading" className="mb-20 scroll-mt-28">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
              Curriculum Architecture
            </span>
            <h2 id="tracks-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight">
              Documented Technical Tracks
            </h2>
            <p className="text-sm text-ink-secondary mt-1 max-w-xl">
              Engineered across four core disciplines to deliver deep, hands-on architectural competence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DOCUMENTED_TRACKS.map((track, idx) => {
              const borderColors = [
                "border-t-google-blue",
                "border-t-google-red",
                "border-t-google-yellow",
                "border-t-google-green",
              ];
              const badgeColors = [
                "bg-blue-50 text-google-blue border-blue-200",
                "bg-red-50 text-google-red border-red-200",
                "bg-amber-50 text-amber-700 border-amber-200",
                "bg-green-50 text-google-green border-green-200",
              ];
              const iconColors = [
                "bg-blue-50 text-google-blue",
                "bg-red-50 text-google-red",
                "bg-amber-50 text-amber-600",
                "bg-green-50 text-google-green",
              ];

              return (
                <TiltCard key={track.id} maxTilt={4} perspective={1000} glareEffect className="h-full rounded-card">
                  <div
                    className={`p-6 sm:p-8 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] border-t-4 ${borderColors[idx % 4]} hover:shadow-elevation-2 transition-all flex flex-col justify-between h-full`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${badgeColors[idx % 4]}`}>
                          {track.badge}
                        </span>
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconColors[idx % 4]}`}>
                          {track.icon}
                        </div>
                      </div>

                      <h3
                        className="text-xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] mb-2"
                        style={{ transform: "translateZ(8px)" }}
                      >
                        {track.title}
                      </h3>

                      <p className="text-sm text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed mb-6">
                        {track.description}
                      </p>
                    </div>

                    <div
                      className="pt-4 border-t border-[#D1D5DB] dark:border-[#334155] flex flex-wrap gap-1.5"
                      style={{ transform: "translateZ(6px)" }}
                    >
                      {track.topics.map((topic, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full text-xs bg-[#F1F3F4] dark:bg-[#1E293B] text-ink-secondary dark:text-[#94A3B8] border border-[#D1D5DB] dark:border-[#5F6368]"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* 5. Featured Speakers Section */}
        {allSpeakers.length > 0 && (
          <section id="speakers" aria-labelledby="speakers-heading" className="mb-20 scroll-mt-28">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
                  Distinguished Voices
                </span>
                <h2 id="speakers-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary tracking-tight">
                  Verified Keynote Speakers & Mentors
                </h2>
              </div>
              <span className="text-xs font-medium text-ink-secondary">
                GDEs & Industry Practitioners
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {allSpeakers.map((speaker, idx) => {
                const initials = (typeof speaker === "string" ? speaker : String(speaker))
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                const avatarBgs = [
                  "bg-blue-100 text-google-blue",
                  "bg-green-100 text-google-green",
                  "bg-amber-100 text-amber-700",
                  "bg-red-100 text-google-red",
                ];

                return (
                  <div
                    key={idx}
                    className="p-5 rounded-card bg-white border border-[#D1D5DB] hover:shadow-elevation-1 transition-all flex items-center gap-3.5"
                  >
                    <div className={`w-11 h-11 rounded-full ${avatarBgs[idx % 4]} flex items-center justify-center font-bold text-sm shrink-0`}>
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-display font-semibold text-ink-primary truncate">
                        {speaker}
                      </h3>
                      <p className="text-xs text-ink-secondary truncate">
                        AI Day Speaker / GDE
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 6. Summit Schedule Blueprint */}
        <section id="schedule" aria-labelledby="schedule-heading" className="mb-20 scroll-mt-28">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
              Conference Flow
            </span>
            <h2 id="schedule-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight">
              Summit Schedule Blueprint
            </h2>
            <p className="text-sm text-ink-secondary mt-1 max-w-xl">
              Typical itinerary across AI Day editions including parallel tracks and AI-Thon milestones.
            </p>
          </div>

          <div className="space-y-3">
            {SUMMIT_SCHEDULE.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-card bg-white border border-[#D1D5DB] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-subtle transition-all"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-google-blue bg-blue-50 px-3 py-1.5 rounded-control border border-blue-100 shrink-0">
                    <Clock className="w-3.5 h-3.5 text-google-blue" />
                    <span>{item.time}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-display font-semibold text-ink-primary">
                      {item.title}
                    </h3>
                    <p className="text-xs text-ink-secondary mt-0.5">
                      {item.speaker}
                    </p>
                  </div>
                </div>

                <span className="self-start sm:self-auto px-2.5 py-1 rounded-full text-xs font-medium bg-[#F1F3F4] text-ink-secondary border border-[#D1D5DB]">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Registration Section */}
        <section aria-labelledby="registration-heading" className="mb-20">
          <div className="p-8 sm:p-14 rounded-surface bg-white border border-[#D1D5DB] text-center flex flex-col items-center shadow-subtle relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-google-blue" />

            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-google-green border border-emerald-200 mb-4">
              CENTRAL INDIA CHAPTER
            </span>

            <h2 id="registration-heading" className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-ink-primary tracking-tight mb-4">
              Access the Next AI Day Edition
            </h2>

            <p className="text-base text-ink-secondary max-w-xl mb-8 leading-relaxed font-sans">
              All AI Day registrations are hosted through our verified Commudle chapter. Tickets include entry to all four technical tracks, hands-on lab access, and the competitive AI-Thon.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <MagneticButton maxDistance={6}>
                <PrimaryButton
                  href="https://www.commudle.com/communities/ml-bhopal/events"
                  isExternal
                  size="lg"
                  icon={<ExternalLink className="w-4 h-4" />}
                >
                  Claim Pass on Commudle
                </PrimaryButton>
              </MagneticButton>

              <SecondaryButton
                href="/events"
                size="lg"
              >
                Browse All Community Events
              </SecondaryButton>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-ink-secondary pt-4 border-t border-[#D1D5DB]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-google-green" />
                100% Free & Open Access
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <span>Supported by</span>
                <div className="relative h-3 w-24">
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
              </span>
              <span>•</span>
              <span>Bhopal, Madhya Pradesh</span>
            </div>
          </div>
        </section>

        {/* 8. Gallery Section */}
        <section id="gallery" aria-labelledby="gallery-heading" className="mb-20 scroll-mt-28">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
              Visual Chronicle
            </span>
            <h2 id="gallery-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight">
              AI Day Visual Chronicle
            </h2>
            <p className="text-sm text-ink-secondary dark:text-gray-400 mt-1">
              Moments from lecture halls, collaborative sprints, and keynote stages across editions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_PHOTOS.map((photo, idx) => (
              <div
                key={idx}
                tabIndex={0}
                aria-label={photo.caption}
                className="group relative aspect-video rounded-card overflow-hidden border border-[#D1D5DB] dark:border-[#334155] bg-[#FAFAFA] dark:bg-[#0F172A] shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue"
              >
                <Image
                  src={photo.url}
                  alt={photo.caption}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus:opacity-100 transition-opacity flex items-end p-3 pointer-events-none">
                  <span className="text-xs font-medium text-white">
                    {photo.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8.5. Frequently Asked Questions */}
        <AIDayFAQ />

        {/* 9. Previous Editions Archive Table */}
        <section aria-labelledby="archive-heading" className="pt-8 border-t border-[#D1D5DB]">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
                Chronicle & Evolution
              </span>
              <h2 id="archive-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary tracking-tight">
                Historical Editions Matrix
              </h2>
            </div>
            <Link
              href="/events?category=flagship"
              className="text-xs font-medium text-google-blue hover:underline inline-flex items-center gap-1"
            >
              <span>Explore Flagships</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#D1D5DB] rounded-card overflow-hidden bg-white shadow-subtle">
              <thead className="bg-[#FAFAFA] border-b border-[#D1D5DB] text-ink-secondary">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">EDITION</th>
                  <th className="py-3.5 px-4 font-semibold">DATE</th>
                  <th className="py-3.5 px-4 font-semibold">VENUE</th>
                  <th className="py-3.5 px-4 font-semibold">VERIFIED ATTENDEES</th>
                  <th className="py-3.5 px-4 font-semibold text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D1D5DB] text-ink-primary">
                {aiDayEvents.map((edition) => (
                  <tr key={edition.slug} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-4 px-4 font-display font-semibold text-ink-primary">
                      {edition.title}
                    </td>
                    <td className="py-4 px-4 text-ink-secondary">{formatDate(edition.date)}</td>
                    <td className="py-4 px-4 text-ink-secondary">{edition.venue}</td>
                    <td className="py-4 px-4">
                      {edition.registrations ? (
                        <span className="text-google-green font-semibold">{edition.registrations}+ Registered</span>
                      ) : (
                        <span className="text-ink-secondary">Documented Milestone</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        href={`/events/${edition.slug}`}
                        className="text-google-blue hover:underline inline-flex items-center gap-1 font-semibold"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Container>
    </div>
  );
}
