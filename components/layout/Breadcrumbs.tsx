import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://mlbhopal.tech",
      },
      ...items.map((item, index) => {
        const entry: Record<string, any> = {
          "@type": "ListItem",
          position: index + 2,
          name: item.label,
        };
        if (item.href) {
          entry.item = item.href.startsWith("http")
            ? item.href
            : `https://mlbhopal.tech${item.href}`;
        }
        return entry;
      }),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className={cn("flex items-center text-xs font-sans text-[#5F6368] dark:text-[#94A3B8] py-3", className)}>
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-[#4285F4] dark:hover:text-[#60A5FA] transition-colors flex items-center gap-1" aria-label="Home">
              <Home className="w-3.5 h-3.5" />
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center space-x-2">
                <ChevronRight className="w-3 h-3 text-[#94A3B8] dark:text-[#5F6368]" aria-hidden="true" />
                {isLast || !item.href ? (
                  <span className="text-[#0F172A] dark:text-[#F8FAFC] font-semibold truncate max-w-[200px]" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-[#4285F4] dark:hover:text-[#60A5FA] transition-colors truncate max-w-[150px]">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
