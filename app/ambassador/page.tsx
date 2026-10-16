import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Building2,
  Users,
  Zap,
  Sparkles,
  Calendar,
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
import { CampusDirectory } from "@/components/ambassador/CampusDirectory";
import { AmbassadorForm } from "@/components/ambassador/AmbassadorForm";

export const metadata: Metadata = {
  title: "Campus Ambassador Program — ML Bhopal",
  description:
    "Lead the AI movement on your campus. Establish an authorized ML Bhopal Campus Chapter at your college, recruit student teams, and host hands-on workshops with Google for Developers support.",
  alternates: {
    canonical: "/ambassador",
  },
  openGraph: {
    title: "ML Bhopal Campus Ambassador Program",
    description:
      "Empower your college with student-led machine learning chapters, Google developer resources, and hands-on workshops.",
    url: "https://mlbhopal.tech/ambassador",
    type: "website",
  },
};

const STEPS = [
  {
    num: "01",
    title: "Apply & Leadership Screening",
    desc: "Submit your profile and chapter vision below. Shortlisted applicants participate in a 1-on-1 strategy call with ML Bhopal Core Leads to evaluate alignment and initiative.",
    timeline: "Week 1",
  },
  {
    num: "02",
    title: "College Connect & Official MoU",
    desc: "ML Bhopal provides official Letters of Support, chapter charters, and faculty briefing documents for you to present to your HoD, Dean, or Principal to secure authorized campus recognition.",
    timeline: "Week 2–3",
  },
  {
    num: "03",
    title: "Assemble Campus Core Team",
    desc: "Recruit an internal 5–8 member student executive board (Tech Lead, Operations Lead, Design & Media Lead, and Outreach Lead) to share responsibilities.",
    timeline: "Week 3–4",
  },
  {
    num: "04",
    title: "Activate & Host AI Events",
    desc: "Launch your chapter with hands-on coding workshops, study circles, and mini-hackathons powered by ML Bhopal's open-source repositories, workshop kits, and industry speakers.",
    timeline: "Ongoing",
  },
];

const RESPONSIBILITIES = [
  {
    title: "Lead the Campus Chapter",
    description: "Serve as the authorized collegiate point of contact for ML Bhopal at your university.",
    icon: GraduationCap,
  },
  {
    title: "College Administration Liaison",
    description: "Coordinate with faculty advisors and management to reserve event halls, computer labs, and obtain notices.",
    icon: Building2,
  },
  {
    title: "Build Your Student Executive Board",
    description: "Recruit and guide an enthusiastic 5–8 member team across development, operations, design, and outreach.",
    icon: Users,
  },
  {
    title: "Host Hands-On AI Workshops",
    description: "Organize practical sessions, codelabs, and study circles focusing on code and models rather than passive slides.",
    icon: Zap,
  },
  {
    title: "Mobilize Student Builders",
    description: "Drive campus participation for flagship community initiatives such as AI Day, Build with AI, and hackathons.",
    icon: Sparkles,
  },
  {
    title: "Bi-Weekly Community Sync",
    description: "Attend bi-weekly coordination calls with ML Bhopal organizers to share updates and request event resources.",
    icon: Calendar,
  },
];

const AMBASSADOR_BENEFITS = [
  "Official designation as Authorized ML Bhopal Campus Chapter Lead",
  "Access to open-source workshop curricula, Google for Developers codelabs, and slide templates",
  "Direct assistance in inviting industry speakers and GDEs for on-campus events",
  "VIP passes and reserved seating at flagship regional summits like AI Day",
  "Official Ambassador Swag Kit (exclusive chapter badges, stickers, and developer gear)",
  "Featured visibility for your campus chapter across the 3,600+ ML Bhopal developer network",
];

const COLLEGE_BENEFITS = [
  "Official institutional partnership recognition as an authorized ML Bhopal Campus Hub",
  "Free industry keynote speakers and technical mentorship for college tech fests and symposia",
  "Bridge connecting student researchers and engineers with regional AI ecosystem partners",
  "Hands-on technical workshops that supplement university computer science curriculum",
  "Opportunities for student open-source projects to be showcased on regional conference stages",
];

const EXPECTATIONS = [
  {
    metric: "3–5 hrs/week",
    label: "Time Commitment",
    desc: "Dedicated time during active college semester weeks for chapter coordination and event prep.",
  },
  {
    metric: "1–2 Sessions",
    label: "Per Semester",
    desc: "Organize at least one major workshop, code sprint, or hackathon per academic term.",
  },
  {
    metric: "Code Over Slides",
    label: "Hands-on Focus",
    desc: "Prioritize interactive coding, Colab notebooks, and terminal sessions over purely theoretical decks.",
  },
  {
    metric: "100% Free",
    label: "Open Community",
    desc: "All campus chapter sessions must remain completely free and accessible for all enrolled students.",
  },
];

const FAQS = [
  {
    q: "Who is eligible to apply as a Campus Ambassador?",
    a: "Any undergraduate or postgraduate student enrolled in an accredited degree program (B.Tech, BE, BCA, MCA, BSc in CS/IT/AI/Data Science) at colleges across Madhya Pradesh and Central India from 1st to 4th year.",
  },
  {
    q: "Can our college apply if we already have an existing tech society or club?",
    a: "Yes. An ML Bhopal Campus Chapter can either operate independently or collaborate as the dedicated Artificial Intelligence & Machine Learning wing of your college's existing technical club.",
  },
  {
    q: "How will ML Bhopal assist with college administration permissions?",
    a: "We provide formal letters of support, official MoU frameworks, and chapter charters addressed to your Dean, Principal, or Head of Department confirming the non-profit, student-benefit nature of the community.",
  },
  {
    q: "Is there any registration fee or cost required to apply or operate a chapter?",
    a: "No. The ML Bhopal Campus Ambassador Program is 100% free of charge. We strictly adhere to our non-profit open-source mission. All student workshops, kits, and speaker sessions are provided at zero cost.",
  },
  {
    q: "What happens after I submit my application?",
    a: "Our community team reviews applications within 5–7 business days. Shortlisted candidates are invited for an informal video call to discuss your campus ecosystem and guide you through the MoU onboarding kit.",
  },
];

export default function AmbassadorPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#0F172A] text-ink-primary dark:text-[#F8FAFC] pt-24 pb-20 relative overflow-hidden transition-colors">
      {/* 1. Hero Section with Blueprint Grid */}
      <div className="relative overflow-hidden border-b border-[#D1D5DB] dark:border-[#334155] py-16 sm:py-24">
        <HeroGridBackground withElements withTopBorder />

        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: "Programs", href: "/#programs" },
              { label: "Campus Ambassador Program", href: "/ambassador" },
            ]}
          />

          <ScrollReveal>
            <div className="mt-8 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1F3F4] dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#5F6368] text-xs font-medium text-ink-secondary dark:text-[#94A3B8] uppercase tracking-wider mb-6">
                <GraduationCap className="w-3.5 h-3.5 text-google-blue dark:text-[#60A5FA]" />
                <span>Collegiate Leadership Initiative • 2025 Cohort</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-ink-primary dark:text-[#F8FAFC] mb-6 leading-tight">
                Lead the AI Movement <br className="hidden sm:inline" />
                <span className="text-google-blue dark:text-[#60A5FA]">On Your Campus.</span>
              </h1>

              <p className="text-base sm:text-lg text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed mb-8 max-w-3xl">
                Establish an authorized <strong className="text-ink-primary dark:text-white font-semibold">ML Bhopal Campus Chapter</strong> at your college or university. Recruit your student core team, liaise with faculty leadership, and deliver production AI workshops, hackathons, and Google for Developers resources directly to your peers.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <PrimaryButton href="#apply" size="lg">
                  Apply as Campus Lead
                </PrimaryButton>
                <SecondaryButton href="#roadmap" size="lg">
                  View 4-Step Roadmap
                </SecondaryButton>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </div>

      {/* 2. What It Is & Who It Is For */}
      <Section spacing="md" background="subtle">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* What it is */}
            <div className="p-6 sm:p-8 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-google-blue dark:text-[#60A5FA] flex items-center justify-center mb-5">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-google-blue dark:text-[#60A5FA] block mb-1">
                  Program Overview
                </span>
                <h2 className="text-2xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] mb-4">
                  What is the Campus Chapter Program?
                </h2>
                <p className="text-sm text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed mb-4">
                  The ML Bhopal Campus Ambassador Program is the official student leadership framework for establishing decentralized, collegiate machine learning chapters across Central India.
                </p>
                <p className="text-sm text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed">
                  Backed by Google for Developers support, each chapter acts as an on-campus launchpad where students gain direct access to industry-curated codelabs, external speaker sessions, and collaborative hackathons.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-[#D1D5DB] dark:border-[#334155] flex items-center gap-2 text-xs text-ink-secondary dark:text-[#94A3B8]">
                <CheckCircle2 className="w-4 h-4 text-google-green shrink-0" />
                <span>Non-profit, 100% free community access for all students</span>
              </div>
            </div>

            {/* Who it is for */}
            <div className="p-6 sm:p-8 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-950/40 text-google-green flex items-center justify-center mb-5">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-google-green block mb-1">
                  Target Audience
                </span>
                <h2 className="text-2xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] mb-4">
                  Who is this program for?
                </h2>
                <ul className="space-y-3 text-sm text-ink-secondary dark:text-[#94A3B8] font-sans">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-google-blue mt-2 shrink-0" />
                    <span>Undergraduate and postgraduate students (1st through 4th year, B.Tech, BE, BCA, MCA, BSc in CS/IT/AI).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-google-blue mt-2 shrink-0" />
                    <span>Enthusiastic builders who want to create a hands-on technical community at their university.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-google-blue mt-2 shrink-0" />
                    <span>Current leads or coordinators of college societies looking to integrate an authorized AI/ML track.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-google-blue mt-2 shrink-0" />
                    <span>Students based in Bhopal, Indore, Jabalpur, Gwalior, and across Madhya Pradesh and Central India.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-6 border-t border-[#D1D5DB] dark:border-[#334155] flex items-center gap-2 text-xs text-ink-secondary dark:text-[#94A3B8]">
                <CheckCircle2 className="w-4 h-4 text-google-green shrink-0" />
                <span>No advanced ML research required — initiative and drive matter most</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Chapter Formation Roadmap (Process) */}
      <Section id="roadmap" spacing="lg">
        <Container>
          <SectionHeader
            eyebrow="Chapter Roadmap"
            title="From Application to Active Campus Chapter"
            description="Our structured 4-step induction process helps you secure official college permissions, build your internal executive team, and run high-impact developer events."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, index) => {
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
                  key={index}
                  className={`flex flex-col p-6 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] border-t-4 ${borderColors[index % 4]} shadow-subtle hover:shadow-elevation-1 transition-all`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-2xl font-bold font-display ${numColors[index % 4]}`}>
                      {s.num}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F1F3F4] dark:bg-[#334155] text-ink-secondary dark:text-[#F8FAFC] border border-[#D1D5DB] dark:border-[#5F6368]">
                      {s.timeline}
                    </span>
                  </div>
                  <h3 className="text-base font-display font-semibold text-ink-primary dark:text-[#F8FAFC] mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 4. Responsibilities */}
      <Section spacing="md" background="subtle">
        <Container>
          <SectionHeader
            eyebrow="Key Responsibilities"
            title="What You Will Do as Campus Lead"
            description="Clear, practical responsibilities to guide your campus chapter and support fellow student engineers."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESPONSIBILITIES.map((r, i) => {
              const Icon = r.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-subtle hover:shadow-elevation-1 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-google-blue dark:text-[#60A5FA] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-display font-semibold text-ink-primary dark:text-[#F8FAFC] mb-2">
                    {r.title}
                  </h3>
                  <p className="text-xs text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed">
                    {r.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 5. Benefits: 2-Column Comparison */}
      <Section spacing="lg">
        <Container>
          <SectionHeader
            eyebrow="Dual Impact"
            title="Benefits for You & Your Institution"
            description="Leading a campus chapter brings tangible career acceleration for student organizers and academic recognition for partner colleges."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For the Ambassador */}
            <div className="p-6 sm:p-8 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] border-t-4 border-t-google-blue shadow-subtle">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-google-blue dark:text-[#60A5FA] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-ink-primary dark:text-[#F8FAFC]">
                    For the Campus Ambassador
                  </h3>
                  <p className="text-xs text-ink-secondary dark:text-[#94A3B8]">Leadership & Career Perks</p>
                </div>
              </div>

              <ul className="space-y-3.5">
                {AMBASSADOR_BENEFITS.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-google-blue dark:text-[#60A5FA] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* For the College */}
            <div className="p-6 sm:p-8 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] border-t-4 border-t-google-green shadow-subtle">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-950/40 text-google-green flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-ink-primary dark:text-[#F8FAFC]">
                    For Your College & Institute
                  </h3>
                  <p className="text-xs text-ink-secondary dark:text-[#94A3B8]">Academic & Ecosystem Impact</p>
                </div>
              </div>

              <ul className="space-y-3.5">
                {COLLEGE_BENEFITS.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-google-green shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. Expectations */}
      <Section spacing="md" background="subtle">
        <Container>
          <SectionHeader
            eyebrow="Commitment"
            title="What We Expect From Ambassadors"
            description="Clear expectations to ensure chapter sustainability, authentic community learning, and student success."
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

      {/* 6.5. Participating Campuses Directory */}
      <Section id="campuses" spacing="lg">
        <Container>
          <CampusDirectory />
        </Container>
      </Section>

      {/* 7. Application Form */}
      <Section id="apply" spacing="lg">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <Badge variant="blue" className="mb-3">
                Official Application
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight mb-3">
                Apply for Your Campus
              </h2>
              <p className="text-sm text-ink-secondary dark:text-[#94A3B8] font-sans max-w-xl mx-auto">
                Fill in your details below to establish an ML Bhopal Campus Chapter at your institution. Applications are reviewed on a rolling basis by the core organizing team.
              </p>
            </div>

            <AmbassadorForm />
          </div>
        </Container>
      </Section>

      {/* 8. FAQs */}
      <Section spacing="lg" background="subtle">
        <Container>
          <SectionHeader
            eyebrow="Clarifications"
            title="Frequently Asked Questions"
            description="Clear answers regarding chapter operations, administration support, and eligibility."
          />

          <div className="max-w-3xl mx-auto">
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
