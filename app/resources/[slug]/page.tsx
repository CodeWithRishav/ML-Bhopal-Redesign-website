import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, Share2, Tag, BookOpen, ChevronRight } from "lucide-react";
import { getResourceArticles, getResourceArticleBySlug, getRelatedResourceArticles } from "@/lib/data";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { TableOfContents } from "@/components/resources/TableOfContents";
import { ArticleContentRenderer } from "@/components/resources/ArticleContentRenderer";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { HeroGridBackground } from "@/components/ui/HeroGridBackground";
import dynamic from "next/dynamic";

const ReadingProgress = dynamic(
  () => import("@/components/resources/ReadingProgress").then((mod) => mod.ReadingProgress)
);

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getResourceArticles();
  return articles.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getResourceArticleBySlug(slug);

  if (!article) {
    return {
      title: "Resource Not Found",
    };
  }

  const ogImage = "/posters/build-with-ai-agents-banner.png";

  return {
    title: `${article.title} — Technical Guide`,
    description: article.description,
    alternates: {
      canonical: `/resources/${article.slug}`,
    },
    openGraph: {
      title: `${article.title} | ML Bhopal Knowledge Hub`,
      description: article.description,
      url: `https://mlbhopal.tech/resources/${article.slug}`,
      type: "article",
      publishedTime: article.date,
      authors: [article.author.name],
      tags: article.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | ML Bhopal Knowledge Hub`,
      description: article.description,
      images: [ogImage],
    },
  };
}

const CATEGORY_BADGES: Record<string, "amber" | "violet" | "cyan" | "google"> = {
  Guides: "amber",
  Roadmaps: "cyan",
  "Technical Deep Dives": "violet",
  "Community Recaps": "google",
};

export default async function ResourceArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getResourceArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedResourceArticles(slug, article.category, 3);
  const badgeVariant = CATEGORY_BADGES[article.category] || "outline";

  const articleLdJson = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "ML Bhopal",
      url: "https://mlbhopal.tech",
      logo: {
        "@type": "ImageObject",
        url: "https://mlbhopal.tech/posters/build-with-ai-agents-banner.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://mlbhopal.tech/resources/${article.slug}`,
    },
    keywords: article.tags?.join(", "),
    articleSection: article.category,
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#0F172A] text-ink-primary dark:text-[#F8FAFC] pt-24 pb-24 relative overflow-hidden transition-colors">
      {/* Blueprint Grid Background Pattern */}
      <HeroGridBackground withElements withTopBorder />

      {/* Schema.org TechArticle Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLdJson) }}
      />

      {/* 1. Reading Progress Bar */}
      <ReadingProgress />

      <Section spacing="sm">
        <Container className="relative z-10">
          {/* Breadcrumb Navigation */}
          <Breadcrumbs
            items={[
              { label: "Resources", href: "/resources" },
              { label: article.category, href: "/resources" },
              { label: article.title, href: `/resources/${article.slug}` },
            ]}
          />

          <div className="mt-6 mb-8">
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-secondary hover:text-google-blue transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Knowledge Hub</span>
            </Link>
          </div>

          {/* 2. Article Header */}
          <header className="max-w-4xl pb-10 border-b border-[#D1D5DB] mb-12">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <Badge variant={badgeVariant} className="text-xs font-semibold uppercase tracking-wider">
                {article.category}
              </Badge>
              {article.tags.slice(0, 2).map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-full text-xs bg-[#F1F3F4] text-ink-secondary border border-[#D1D5DB]"
                >
                  #{t}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-ink-primary leading-tight mb-4">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary font-sans leading-relaxed mb-8 max-w-3xl">
              {article.description}
            </p>

            {/* Author and Metadata Bar */}
            <div className="p-4 sm:p-5 rounded-card bg-white border border-[#D1D5DB] shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-google-blue font-bold text-xs">
                  {article.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <span className="text-sm font-semibold text-ink-primary block">
                    {article.author.name}
                  </span>
                  <span className="text-xs text-ink-secondary">
                    {article.author.role}
                  </span>
                </div>
              </div>

              {/* Date & Reading Time */}
              <div className="flex items-center gap-5 text-xs text-ink-secondary">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-ink-secondary" />
                  <span>{article.displayDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-google-blue" />
                  <span className="text-google-blue font-medium">{article.readingTime}</span>
                </div>
              </div>
            </div>
          </header>

          {/* 3. Main Reading Area with Table of Contents */}
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-start">
            {/* Left/Center: Clean Article Content */}
            <main className="flex-1 min-w-0 max-w-3xl">
              <ArticleContentRenderer content={article.content} />
            </main>

            {/* Right: Table of Contents */}
            {article.tableOfContents && article.tableOfContents.length > 0 && (
              <TableOfContents items={article.tableOfContents} />
            )}
          </div>
        </Container>
      </Section>

      {/* 4. Related Resources Section */}
      {relatedArticles.length > 0 && (
        <Section spacing="lg" background="subtle" className="mt-16">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#D1D5DB]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-google-blue block mb-1">
                  Continue Learning
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink-primary">
                  Related Technical Resources
                </h2>
              </div>
              <Link
                href="/resources"
                className="text-xs font-semibold text-google-blue hover:underline transition-colors flex items-center gap-1"
              >
                <span>Browse all publications</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <ResourceCard key={rel.slug} article={rel} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </div>
  );
}
