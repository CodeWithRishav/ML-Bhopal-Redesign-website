import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  Code2,
  Globe2,
  Users,
  Compass,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Calendar,
  Building2,
  Heart,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { HeroGridBackground } from "@/components/ui/HeroGridBackground";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { CommunityNetwork3D } from "@/components/3d/CommunityNetwork3D";

export const metadata: Metadata = {
  title: "Our Story & Philosophy — Central India's AI Journey",
  description:
    "The journey of ML Bhopal: from TFUG Bhopal in 2024 to Central India's largest community of 3,600+ AI developers, researchers, and student builders. Code Over Slides, Radical Openness.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About ML Bhopal — The Story of Central India's AI Community",
    description:
      "Code Over Slides. Radical Openness. Ecosystem First. Regional Builder Density. 3,600+ AI developers and students.",
    url: "https://mlbhopal.tech/about",
    type: "website",
    images: [
      {
        url: "/posters/ml-bhopal-banner.png",
        width: 1200,
        height: 630,
        alt: "About ML Bhopal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About ML Bhopal — The Story of Central India's AI Community",
    description:
      "Code Over Slides. Radical Openness. Ecosystem First. Regional Builder Density. 3,600+ AI developers and students.",
    images: ["/posters/ml-bhopal-banner.png"],
  },
};

const CORE_PRINCIPLES = [
  {
    id: "code-over-slides",
    title: "Code Over Slides",
    icon: <Code2 className="w-5 h-5" />,
    badge: "Principle 01",
    description:
      "We believe genuine engineering understanding is forged at the terminal. Every workshop, hackathon, and meetup is anchored in executable code, open-weight fine-tuning, and production system architecture rather than abstract marketing decks.",
  },
  {
    id: "radical-openness",
    title: "Radical Openness",
    icon: <Globe2 className="w-5 h-5" />,
    badge: "Principle 02",
    description:
      "Zero gatekeeping, zero paywalls. Every gathering, roadmap, slide deck, and codebase is 100% free and open-access. Knowledge belongs to the entire ecosystem, welcoming anyone with curiosity and a laptop.",
  },
  {
    id: "ecosystem-first",
    title: "Ecosystem First",
    icon: <Users className="w-5 h-5" />,
    badge: "Principle 03",
    description:
      "Communities thrive when colleges, tech companies, and developers lift each other up. We partner closely with institutes like LNCT, Oriental, and RGPV, alongside Google for Developers and OWASP Bhopal, creating durable bridges for students.",
  },
  {
    id: "builder-density",
    title: "Regional Builder Density",
    icon: <Compass className="w-5 h-5" />,
    badge: "Principle 04",
    description:
      "We reject the idea that developers must migrate to tier-1 metros to build frontier AI. By gathering hundreds of dedicated builders in Bhopal, we are cultivating a dense, world-class machine learning hub right here in Madhya Pradesh.",
  },
];

const HISTORICAL_MILESTONES = [
  {
    year: "February 2024",
    title: "The Genesis: TFUG Bhopal & OWASP Bhopal Launch",
    description:
      "Founded by volunteers, ML Bhopal began on Feb 21, 2024 with the intro of TFUG Bhopal and OWASP Bhopal, plus a TensorFlow workshop at RGPV. That first event laid the cornerstone for the region's builder movement.",
  },
  {
    year: "2024",
    title: "Cross-Disciplinary Security & Code CTFs",
    description:
      "Partnered with OWASP Bhopal to host machine learning security workshops and CTF challenges. Shifted from foundational classification models to practical LLM customization, prompt engineering, and adversarial testing.",
  },
  {
    year: "2025",
    title: "Evolution to ML Bhopal & Flagship Summits",
    description:
      "Formally evolved from TFUG to ML Bhopal with Google for Developers support, reflecting modern GenAI, Vertex AI, and Cloud TPU workflows. Hosted AI Day 2025 (739 registrations at OIST) and Build with AI Edition II (926 registrations).",
  },
  {
    year: "2026",
    title: "AI Day 2.0 & Scaling Across 9+ Institutes",
    description:
      "Hosted AI Day 2.0 at LNCT Group of Colleges with 500+ builders and guaranteed internship pipelines. The community crossed 3,600+ members.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative pt-24 pb-24 bg-background dark:bg-[#0F172A] transition-colors overflow-hidden">
      {/* Blueprint Grid Background Pattern */}
      <HeroGridBackground withElements withTopBorder />

      <Container className="relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: "Community", href: "/about" },
              { label: "About ML Bhopal", href: "/about" },
            ]}
          />
        </div>

        {/* 1. Hero: Human Story Opening */}
        <ScrollReveal>
          <section aria-labelledby="about-hero-title" className="mb-16">
            <div className="relative rounded-surface bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] p-6 sm:p-10 lg:p-14 overflow-hidden shadow-subtle">
              {/* Blueprint Grid inside about hero surface */}
              <div className="absolute inset-0 blueprint-grid opacity-30 dark:opacity-15 pointer-events-none" />

              {/* Google 4-color accent top strip */}
              <div className="absolute top-0 inset-x-0 h-1 flex">
                <span className="h-full flex-1 bg-google-blue" />
                <span className="h-full flex-1 bg-google-red" />
                <span className="h-full flex-1 bg-google-yellow" />
                <span className="h-full flex-1 bg-google-green" />
              </div>

            <div className="max-w-3xl pt-2">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="relative h-8 w-28">
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
                <div className="flex items-center gap-2 pl-3 border-l border-[#D1D5DB] dark:border-[#334155]">
                  <span className="text-[11px] font-sans text-ink-secondary">backed by</span>
                  <div className="relative h-3.5 w-28">
                    <Image
                      src="/logos/google-developers-light.png"
                      alt="Google for Developers"
                      fill
                      sizes="112px"
                      className="object-contain object-left dark:hidden"
                    />
                    <Image
                      src="/logos/google-developers-dark.png"
                      alt="Google for Developers"
                      fill
                      sizes="112px"
                      className="object-contain object-left hidden dark:block"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#F1F3F4] text-ink-secondary border border-[#D1D5DB] inline-flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-google-red" />
                  OUR PURPOSE & ORIGIN
                </span>
                <span className="text-xs font-medium text-ink-secondary">EST. FEB 2024</span>
              </div>

              <h1
                id="about-hero-title"
                className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-ink-primary tracking-tight leading-[1.08] mb-5 sm:mb-6 break-words"
              >
                Building Central India’s Frontier AI Community.
              </h1>

              <p className="font-sans text-base sm:text-lg text-ink-secondary leading-relaxed mb-6 sm:mb-8">
                ML Bhopal is a grassroots collective of 3,600+ developers, student engineers, researchers, and founders learning, shipping, and connecting through applied artificial intelligence.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <PrimaryButton
                  href="/team"
                  size="md"
                  className="w-full sm:w-auto justify-center"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Meet the Core Team
                </PrimaryButton>
                <SecondaryButton
                  href="/partners"
                  size="md"
                  className="w-full sm:w-auto justify-center"
                >
                  Explore Partners & Colleges
                </SecondaryButton>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

        {/* 2. Verified Impact Strip with Google 4-Color Accents */}
        <section aria-labelledby="impact-heading" className="mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-card bg-white border border-[#D1D5DB] border-t-2 border-t-google-blue shadow-subtle">
              <span className="text-ink-secondary block text-[11px] font-medium uppercase tracking-wider">COMMUNITY BUILDERS</span>
              <span className="text-2xl sm:text-3xl font-bold font-display text-ink-primary block mt-0.5">3,600+</span>
              <span className="text-ink-secondary text-xs">Verified on Commudle</span>
            </div>
            <div className="p-5 rounded-card bg-white border border-[#D1D5DB] border-t-2 border-t-google-green shadow-subtle">
              <span className="text-ink-secondary block text-[11px] font-medium uppercase tracking-wider">IN-PERSON SESSIONS</span>
              <span className="text-2xl sm:text-3xl font-bold font-display text-google-green block mt-0.5">21+</span>
              <span className="text-ink-secondary text-xs">Workshops, summits & CTFs</span>
            </div>
            <div className="p-5 rounded-card bg-white border border-[#D1D5DB] border-t-2 border-t-google-yellow shadow-subtle">
              <span className="text-ink-secondary block text-[11px] font-medium uppercase tracking-wider">COLLEGES REACHED</span>
              <span className="text-2xl sm:text-3xl font-bold font-display text-ink-primary block mt-0.5">9+</span>
              <span className="text-ink-secondary text-xs">Campuses where ML Bhopal events take place</span>
            </div>
            <div className="p-5 rounded-card bg-white border border-[#D1D5DB] border-t-2 border-t-google-red shadow-subtle">
              <span className="text-ink-secondary block text-[11px] font-medium uppercase tracking-wider">ADMISSION MODEL</span>
              <span className="text-2xl sm:text-3xl font-bold font-display text-ink-primary block mt-0.5">100% Free</span>
              <span className="text-ink-secondary text-xs">Zero paywalls or fees</span>
            </div>
          </div>
        </section>

        {/* 3. The 4 Foundational Concepts with 4 Google Accent Colors */}
        <section aria-labelledby="principles-heading" className="mb-20">
          <ScrollReveal>
            <div className="max-w-2xl mb-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
                Guiding Philosophy
              </span>
              <h2 id="principles-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary tracking-tight">
                The Four Pillars of ML Bhopal
              </h2>
              <p className="text-sm text-ink-secondary mt-2 leading-relaxed">
                These principles govern every initiative we run, from intimate classroom code sessions to flagship conferences.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CORE_PRINCIPLES.map((principle, idx) => {
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
                <TiltCard key={principle.id} maxTilt={3} perspective={1000} className="h-full rounded-card">
                  <div
                    className={`p-6 sm:p-8 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] border-t-4 ${borderColors[idx % 4]} shadow-subtle hover:shadow-elevation-2 hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between h-full`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${badgeColors[idx % 4]}`}>
                          {principle.badge}
                        </span>
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconColors[idx % 4]}`}>
                          {principle.icon}
                        </div>
                      </div>

                      <h3 className="text-xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] mb-2.5">
                        {principle.title}
                      </h3>

                      <p className="text-sm text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* Interactive Community Network Ecosystem Visualization */}
        <section aria-labelledby="network-heading" className="mb-20">
          <ScrollReveal>
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-google-blue dark:text-[#60A5FA] block mb-1">
                Ecosystem Topology
              </span>
              <h2 id="network-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight">
                Interactive Community Node Network
              </h2>
              <p className="text-sm text-ink-secondary dark:text-[#94A3B8] mt-2 leading-relaxed">
                Move your cursor to explore how ML Bhopal connects student communities, open weights, AI Day summits, and global technology partners.
              </p>
            </div>
          </ScrollReveal>

          <CommunityNetwork3D />
        </section>

        {/* 4. Real History Timeline */}
        <section aria-labelledby="timeline-heading" className="mb-20">
          <ScrollReveal>
            <div className="max-w-2xl mb-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
                Historical Timeline
              </span>
              <h2 id="timeline-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary tracking-tight">
                Our Journey from TFUG to ML Bhopal
              </h2>
              <p className="text-sm text-ink-secondary mt-2 leading-relaxed">
                Documented milestones showing how voluntary developer efforts evolved into Central India's benchmark technical community.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {HISTORICAL_MILESTONES.map((milestone, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-card bg-white border border-[#D1D5DB] shadow-subtle flex flex-col sm:flex-row sm:items-start gap-6 hover:shadow-elevation-1 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-1 shrink-0 sm:w-36">
                  <span className="text-xs font-semibold text-google-blue">
                    {milestone.year}
                  </span>
                  <span className="text-[11px] text-ink-secondary uppercase">
                    Milestone 0{idx + 1}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-display font-bold text-ink-primary mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-ink-secondary font-sans leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Community Invitation Callout */}
        <ScrollReveal>
          <section aria-labelledby="join-heading">
            <div className="p-8 sm:p-12 rounded-surface bg-white border border-[#D1D5DB] text-center flex flex-col items-center shadow-subtle relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-google-blue" />

              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F1F3F4] text-ink-secondary border border-[#D1D5DB] mb-4">
                JOIN THE MOVEMENT
              </span>

              <h2 id="join-heading" className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-ink-primary tracking-tight mb-4">
                Be Part of Bhopal’s AI Story
              </h2>

              <p className="text-sm sm:text-base text-ink-secondary max-w-xl mb-8 leading-relaxed font-sans">
                Whether you are an undergraduate exploring your first neural network or an engineer architecting autonomous multi-agent pipelines, there is a seat for you at ML Bhopal.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <MagneticButton maxDistance={6}>
                  <PrimaryButton
                    href="https://commudle.com/communities/ml-bhopal"
                    isExternal
                    size="lg"
                    icon={<ExternalLink className="w-4 h-4" />}
                  >
                    Join Commudle Chapter
                  </PrimaryButton>
                </MagneticButton>

                <SecondaryButton href="/events" size="lg">
                  Explore Upcoming Gatherings
                </SecondaryButton>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </Container>
    </div>
  );
}
