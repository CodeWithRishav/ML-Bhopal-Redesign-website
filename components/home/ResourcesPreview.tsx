import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Terminal, Code2, ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Tag } from "@/components/ui/Tag";
import { ResourceItem } from "@/lib/types";

export function ResourcesPreview({ resources }: { resources: ResourceItem[] }) {
  const featured = resources.find((r) => r.title.toLowerCase().includes("rag")) || resources[1] || resources[0];
  const additional = resources.filter((r) => r.id !== featured?.id);

  return (
    <section className="relative py-20 sm:py-28 bg-[#FAFAFA] dark:bg-[#0F172A] border-b border-[#D1D5DB] dark:border-[#334155] transition-colors">
      <Container>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primary dark:text-[#FF9A3D] mb-2 block">
              KNOWLEDGE &amp; BLUEPRINTS
            </span>
            <h2 className="font-display font-black tracking-tight text-ink-primary dark:text-[#F8FAFC] text-3xl sm:text-4xl lg:text-5xl uppercase">
              Developer Toolkits &amp; Guides<span className="text-google-blue">.</span>
            </h2>
          </div>

          <Link
            href="/resources"
            className="text-xs font-semibold uppercase tracking-wider text-google-blue dark:text-[#60A5FA] hover:text-google-blue-dark dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1.5"
          >
            <span>Explore All Resources</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ============================================================== */}
        {/* EDITORIAL COMPOSITION: ONE FEATURED RESOURCE + COMPACT LIST     */}
        {/* No 4-card repetition                                           */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT: Featured Resource (6 cols) */}
          {featured && (
            <div className="lg:col-span-6 p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-subtle flex flex-col justify-between group">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-google-blue dark:text-[#60A5FA] bg-google-blue-light/60 dark:bg-[#1A3A6E]/50 border border-blue-200 dark:border-blue-900">
                    Featured Architecture Blueprint
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-ink-primary dark:text-[#F8FAFC] tracking-tight leading-tight mb-4 group-hover:text-google-blue dark:group-hover:text-[#60A5FA] transition-colors">
                  {featured.title}
                </h3>

                <p className="font-sans text-sm sm:text-base text-ink-secondary dark:text-[#94A3B8] leading-relaxed mb-6">
                  {featured.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-8">
                  {featured.tags.map((t) => (
                    <Tag key={t} variant="domain">{t}</Tag>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#D1D5DB] dark:border-[#334155]">
                <Link
                  href={featured.url}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-google-blue dark:text-[#60A5FA] hover:text-google-blue-dark dark:hover:text-blue-300 transition-colors"
                >
                  <span>Read Complete Blueprint</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          )}

          {/* RIGHT: Compact Editorial List of Additional Resources (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between divide-y divide-[#D1D5DB] dark:divide-[#334155]">
            {additional.map((res) => {
              const isExternal = res.url.startsWith("http");
              const ItemWrapper = isExternal ? "a" : Link;
              const linkProps = isExternal
                ? { href: res.url, target: "_blank", rel: "noopener noreferrer" }
                : { href: res.url };

              return (
                <ItemWrapper
                  key={res.id}
                  {...(linkProps as any)}
                  className="py-5 sm:py-6 first:pt-0 last:pb-0 flex items-start justify-between gap-4 group"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-ink-tertiary mb-1">
                      <span className="uppercase">{res.category}</span>
                      <span>•</span>
                      <span>{res.tags[0]}</span>
                    </div>

                    <h4 className="text-base sm:text-lg font-display font-bold text-ink-primary dark:text-[#F8FAFC] group-hover:text-google-blue dark:group-hover:text-[#60A5FA] transition-colors mb-1.5">
                      {res.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-ink-secondary dark:text-[#94A3B8] font-sans line-clamp-2 leading-relaxed">
                      {res.description}
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-full border border-[#D1D5DB] dark:border-[#334155] flex items-center justify-center shrink-0 group-hover:border-google-blue dark:group-hover:border-[#60A5FA] group-hover:bg-google-blue-light/40 dark:group-hover:bg-[#1A3A6E]/40 transition-colors">
                    {isExternal ? (
                      <ArrowUpRight className="w-3.5 h-3.5 text-ink-secondary group-hover:text-google-blue dark:group-hover:text-[#60A5FA] transition-colors" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-ink-secondary group-hover:text-google-blue dark:group-hover:text-[#60A5FA] transition-colors" />
                    )}
                  </div>
                </ItemWrapper>
              );
            })}
          </div>

        </div>

      </Container>
    </section>
  );
}
