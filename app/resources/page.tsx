import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getResourceArticles, getResources } from "@/lib/data";
import { ResourcesExplorer } from "@/components/resources/ResourcesExplorer";
import { HeroGridBackground } from "@/components/ui/HeroGridBackground";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Technical Knowledge Hub & Guides",
  description:
    "Curated learning roadmaps, engineering deep dives, hands-on tutorials, and community chronicles produced by ML Bhopal engineers.",
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "Technical Knowledge Hub & Guides | ML Bhopal",
    description:
      "Curated learning roadmaps, engineering deep dives, hands-on tutorials, and community chronicles produced by ML Bhopal engineers.",
    url: "https://mlbhopal.tech/resources",
    type: "website",
    images: [
      {
        url: "/posters/ml-bhopal-banner.png",
        width: 1200,
        height: 630,
        alt: "ML Bhopal Technical Knowledge Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Knowledge Hub & Guides | ML Bhopal",
    description:
      "Curated learning roadmaps, engineering deep dives, hands-on tutorials, and community chronicles produced by ML Bhopal engineers.",
    images: ["/posters/ml-bhopal-banner.png"],
  },
};

export default function ResourcesPage() {
  const articles = getResourceArticles();
  const toolsAndRepos = getResources();

  return (
    <div className="min-h-screen bg-background dark:bg-[#0F172A] text-ink-primary dark:text-[#F8FAFC] pt-24 pb-20 relative overflow-hidden transition-colors">
      {/* Header Section with Blueprint Grid */}
      <div className="relative overflow-hidden border-b border-[#D1D5DB] dark:border-[#334155] py-12 sm:py-16">
        <HeroGridBackground withElements withTopBorder />

        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: "Resources", href: "/resources" },
            ]}
          />

          <ScrollReveal>
            <div className="mt-8 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1F3F4] dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#5F6368] text-xs font-medium text-ink-secondary dark:text-[#94A3B8] uppercase tracking-wider mb-6">
                <BookOpen className="w-3.5 h-3.5 text-google-blue dark:text-[#60A5FA]" />
                <span>Knowledge Hub • Code & Architecture</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-ink-primary dark:text-[#F8FAFC] mb-6 leading-tight">
                Technical Guides, Roadmaps <br className="hidden sm:inline" />
                <span className="text-google-blue dark:text-[#60A5FA]">& Deep Dives.</span>
              </h1>

              <p className="text-base sm:text-lg text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed max-w-3xl">
                A peer-reviewed knowledge hub of production tutorials, framework benchmarks, and learning paths curated by ML Bhopal leads and engineering mentors. Built on our &ldquo;Code Over Slides&rdquo; philosophy.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </div>

      {/* Explorer Section: Search, Category Filters, Cards, Toolkits */}
      <Section spacing="lg" background="subtle">
        <Container>
          <ResourcesExplorer articles={articles} toolsAndRepos={toolsAndRepos} />
        </Container>
      </Section>
    </div>
  );
}
