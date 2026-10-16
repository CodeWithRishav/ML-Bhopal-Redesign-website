import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Users,
  Code2,
  Megaphone,
  Camera,
  Calendar,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Badge } from "@/components/ui/Badge";
import { HeroGridBackground } from "@/components/ui/HeroGridBackground";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { AnimatedAccordion } from "@/components/motion/AnimatedAccordion";
import { JoinForm } from "@/components/join/JoinForm";

export const metadata: Metadata = {
  title: "Volunteer & Join Core Team — ML Bhopal",
  description:
    "Join the organizing team behind Central India's premier AI developer community. Apply across Event Operations, Technical Mentorship, Media & Design, and Campus Outreach.",
  alternates: {
    canonical: "/join",
  },
  openGraph: {
    title: "Join ML Bhopal Organizing Team — Volunteer Opportunities",
    description:
      "Help build and run developer summits, workshops, and AI hackathons across Bhopal and Central India.",
    url: "https://mlbhopal.tech/join",
    type: "website",
  },
};

const TRACKS = [
  {
    id: "ops",
    title: "Event Operations & Logistics",
    roleLabel: "Event Management & Operations",
    icon: Calendar,
    description: "Manage venue staging, attendee check-in desks, stage AV tech, schedule timing, and speaker hospitality during conferences and meetups.",
    responsibilities: [
      "On-ground attendee registration and badge distribution",
      "Stage coordination, projector setup, and microphone management",
      "Speaker hospitality and VIP guest coordination",
      "Venue signage and crowd flow management",
    ],
  },
  {
    id: "tech",
    title: "Technical Mentorship & Code",
    roleLabel: "Technical Mentorship & Workshops",
    icon: Code2,
    description: "Assist attendees during live coding sessions, debug Colab environments, build community web tools, and mentor hackathon teams.",
    responsibilities: [
      "Hands-on technical troubleshooting during workshops",
      "Reviewing and testing workshop sample notebooks",
      "Contributing to the open-source ML Bhopal website and tools",
      "Mentoring beginner builders during hackathon sprints",
    ],
  },
  {
    id: "media",
    title: "Media, Design & Brand",
    roleLabel: "Design & Content Creation",
    icon: Camera,
    description: "Design event flyers, produce stage keynote decks, film conference recap reels, manage photo archives, and run community social handles.",
    responsibilities: [
      "Designing banners, badges, and social media announcements",
      "Photography and video recording during live summits",
      "Editing quick post-event recap reels and highlight videos",
      "Authoring LinkedIn, Twitter, and Commudle event updates",
    ],
  },
  {
    id: "outreach",
    title: "Community Outreach & Campuses",
    roleLabel: "Sponsorship & Campus Outreach",
    icon: Megaphone,
    description: "Connect with college societies, coordinate with student leads, manage community groups on WhatsApp/Discord, and distribute hackathon materials.",
    responsibilities: [
      "Liaising with campus ambassadors across Madhya Pradesh",
      "Answering community questions in official discussion groups",
      "Spreading CFP and registration notices across tech forums",
      "Onboarding new members into working groups",
    ],
  },
];

const PERKS = [
  {
    title: "Leadership Experience",
    desc: "Direct hands-on experience running large-scale conferences with 500+ attendees and high-profile industry speakers.",
    icon: Award,
  },
  {
    title: "Direct Network Access",
    desc: "Interact directly with Google Developer Experts (GDEs), founders, engineering leads, and university department chairs.",
    icon: Users,
  },
  {
    title: "Official Recommendation",
    desc: "Letters of recommendation, LinkedIn recommendations, and verified community certificates from ML Bhopal Organizers.",
    icon: ShieldCheck,
  },
  {
    title: "VIP Summit Access",
    desc: "Free VIP passes, backstage organizer badges, and exclusive speaker dinner invitations for all ML Bhopal flagship events.",
    icon: Sparkles,
  },
];

const SELECTION_STEPS = [
  {
    num: "01",
    title: "Submit Profile",
    desc: "Fill in the volunteer interest form below with your track preference, GitHub/LinkedIn links, and background.",
  },
  {
    num: "02",
    title: "Alignment Sync",
    desc: "Shortlisted candidates are invited for a quick 15-minute video call to discuss availability and track goals.",
  },
  {
    num: "03",
    title: "Team Onboarding",
    desc: "Get added to the private ML Bhopal organizing Discord/WhatsApp channels and receive your first event assignment.",
  },
  {
    num: "04",
    title: "Build & Execute",
    desc: "Collaborate with seasoned organizers, lead sub-tracks, and gain genuine event management or technical leadership experience.",
  },
];

const EXPECTATIONS = [
  {
    metric: "2–4 hrs/week",
    label: "Time Commitment",
    desc: "Flexible remote tasks during regular weeks; increased availability on event days.",
  },
  {
    metric: "Prompt Sync",
    label: "Communication",
    desc: "Check-in on organizing channels regularly and flag blockers early.",
  },
  {
    metric: "Ownership",
    label: "Execution",
    desc: "Follow through on your assigned task without needing micro-management.",
  },
  {
    metric: "Respect",
    label: "Community Spirit",
    desc: "Maintain an inclusive, welcoming atmosphere for attendees of all technical backgrounds.",
  },
];

const FAQS = [
  {
    q: "Do I need to be an expert in Machine Learning to volunteer?",
    a: "Not at all. While the Technical Track benefits from coding proficiency, our Operations, Media, and Outreach tracks need organizational, communication, and creative skills rather than deep learning math.",
  },
  {
    q: "Can college students apply, or is this only for working professionals?",
    a: "Both! Students and working professionals are equally welcome. Many of our core leads began as 2nd or 3rd year student volunteers and went on to head entire summit operations.",
  },
  {
    q: "Is volunteering a paid position?",
    a: "No. ML Bhopal is a voluntary, non-profit community. Volunteers do not receive cash remuneration, but receive free event access, official merchandise, organizer certificates, and high-impact networking.",
  },
  {
    q: "How many hours per week am I expected to dedicate?",
    a: "Typically 2 to 4 hours per week during planning phases, with dedicated on-ground participation required during summit days.",
  },
];

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#0F172A] text-ink-primary dark:text-[#F8FAFC] pt-24 pb-20 relative overflow-hidden transition-colors">
      {/* 1. Hero Section with Blueprint Grid */}
      <div className="relative overflow-hidden border-b border-[#D1D5DB] dark:border-[#334155] py-16 sm:py-24">
        <HeroGridBackground withElements withTopBorder />

        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: "Community", href: "/#community" },
              { label: "Join Organizing Team", href: "/join" },
            ]}
          />

          <ScrollReveal>
            <div className="mt-8 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1F3F4] dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#5F6368] text-xs font-medium text-ink-secondary dark:text-[#94A3B8] uppercase tracking-wider mb-6">
                <Users className="w-3.5 h-3.5 text-google-blue dark:text-[#60A5FA]" />
                <span>Community Builders • Open Volunteer Application</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-ink-primary dark:text-[#F8FAFC] mb-6 leading-tight">
                Help Us Build the <br className="hidden sm:inline" />
                <span className="text-google-blue dark:text-[#60A5FA]">AI Ecosystem of Central India.</span>
              </h1>

              <p className="text-base sm:text-lg text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed mb-8 max-w-3xl">
                ML Bhopal is 100% volunteer-led. Behind every conference, workshop, and hackathon is a dedicated team of engineers, designers, and organizers. Join us to build real leadership experience while serving the local developer community.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <PrimaryButton href="#apply" size="lg">
                  Apply to Volunteer
                </PrimaryButton>
                <SecondaryButton href="#tracks" size="lg">
                  Explore Volunteer Tracks
                </SecondaryButton>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </div>

      {/* 2. Tracks Overview */}
      <Section id="tracks" spacing="lg">
        <Container>
          <SectionHeader
            eyebrow="Specializations"
            title="Choose Your Track"
            description="Find the role that fits your strengths, whether you love stage management, hands-on debugging, or visual design."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TRACKS.map((track, idx) => {
              const Icon = track.icon;
              const borderColors = [
                "border-t-google-blue",
                "border-t-google-red",
                "border-t-google-yellow",
                "border-t-google-green",
              ];
              const iconColors = [
                "bg-blue-50 dark:bg-blue-950/40 text-google-blue dark:text-[#60A5FA]",
                "bg-red-50 dark:bg-red-950/40 text-google-red dark:text-[#F28B82]",
                "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-[#FDD663]",
                "bg-green-50 dark:bg-green-950/40 text-google-green dark:text-[#81C995]",
              ];

              return (
                <div
                  key={track.id}
                  className={`p-6 sm:p-8 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] border-t-4 ${borderColors[idx % 4]} shadow-subtle hover:shadow-elevation-1 transition-all flex flex-col justify-between`}
                >
                  <div>
                    <div className={`w-10 h-10 rounded-lg ${iconColors[idx % 4]} flex items-center justify-center mb-5`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] mb-3">
                      {track.title}
                    </h3>

                    <p className="text-sm text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed mb-6">
                      {track.description}
                    </p>

                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-primary dark:text-[#F8FAFC] block mb-3">
                      Key Responsibilities
                    </span>

                    <ul className="space-y-2.5">
                      {track.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-ink-secondary dark:text-[#94A3B8] font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-google-green dark:text-[#81C995] shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#D1D5DB] dark:border-[#334155]">
                    <a
                      href="#apply"
                      className="text-xs font-semibold uppercase tracking-wider text-google-blue dark:text-[#60A5FA] hover:text-google-blue-dark dark:hover:text-[#AECBFA] transition-colors inline-flex items-center gap-1"
                    >
                      <span>Apply for this track</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 3. Volunteer Perks & Recognition */}
      <Section spacing="md" background="subtle">
        <Container>
          <SectionHeader
            eyebrow="Why Volunteer"
            title="Benefits & Community Recognition"
            description="Giving back to the community is mutually rewarding. Here is what we offer our dedicated organizers."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-subtle hover:shadow-elevation-1 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-google-blue dark:text-[#60A5FA] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-display font-semibold text-ink-primary dark:text-[#F8FAFC] mb-2">
                      {perk.title}
                    </h3>
                    <p className="text-xs text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed">
                      {perk.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 4. Selection Process */}
      <Section spacing="lg">
        <Container>
          <SectionHeader
            eyebrow="Onboarding"
            title="How We Select Volunteers"
            description="Our simple, respectful 4-step onboarding journey for prospective organizers."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SELECTION_STEPS.map((s, idx) => {
              const borderColors = [
                "border-t-google-blue",
                "border-t-google-red",
                "border-t-google-yellow",
                "border-t-google-green",
              ];
              const numColors = [
                "text-google-blue dark:text-[#60A5FA]",
                "text-google-red dark:text-[#F28B82]",
                "text-amber-600 dark:text-[#FDD663]",
                "text-google-green dark:text-[#81C995]",
              ];

              return (
                <div
                  key={idx}
                  className={`p-6 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] border-t-4 ${borderColors[idx % 4]} shadow-subtle hover:shadow-elevation-1 transition-all flex flex-col justify-between`}
                >
                  <div>
                    <span className={`text-2xl font-display font-bold ${numColors[idx % 4]} block mb-3`}>
                      {s.num}
                    </span>
                    <h3 className="text-base font-display font-semibold text-ink-primary dark:text-[#F8FAFC] mb-2">
                      {s.title}
                    </h3>
                    <p className="text-xs text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 5. Expectations */}
      <Section spacing="md" background="subtle">
        <Container>
          <SectionHeader
            eyebrow="Commitment"
            title="What We Expect From Volunteers"
            description="Clear expectations to ensure seamless event operations and respectful community interaction."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPECTATIONS.map((exp, i) => (
              <div
                key={i}
                className="p-6 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] block mb-1">
                    {exp.metric}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-google-blue dark:text-[#60A5FA] block mb-3">
                    {exp.label}
                  </span>
                  <p className="text-xs text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Application Form */}
      <Section id="apply" spacing="lg">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <Badge variant="blue" className="mb-3">
                Volunteer Form
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight mb-3">
                Join the Organizing Team
              </h2>
              <p className="text-sm text-ink-secondary dark:text-[#94A3B8] font-sans max-w-lg mx-auto">
                Submit your profile and track preference below. Our team reviews submissions continuously and schedules short alignment syncs.
              </p>
            </div>

            <JoinForm />
          </div>
        </Container>
      </Section>

      {/* 7. FAQs */}
      <Section spacing="lg" background="subtle">
        <Container>
          <SectionHeader
            eyebrow="Clarifications"
            title="Frequently Asked Questions"
            description="Clear answers regarding time commitments, eligibility, and tracks."
          />

          <div className="max-w-2xl mx-auto">
            <AnimatedAccordion
              items={FAQS.map((faq) => ({
                question: faq.q,
                answer: faq.a,
              }))}
            />
          </div>
        </Container>
      </Section>
    </div>
  );
}
