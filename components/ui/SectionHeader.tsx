import React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
  as: HeadingTag = "h2",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col mb-8 lg:mb-10",
        align === "center" ? "items-center text-center max-w-2xl mx-auto" : "items-start",
        className
      )}
    >
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-wider text-google-blue mb-2 block">
          {eyebrow}
        </span>
      ) : null}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
        <HeadingTag className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-ink-primary tracking-tight leading-tight">
          {title}
        </HeadingTag>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {description ? (
        <p className="mt-3 text-base text-ink-secondary font-sans leading-relaxed max-w-2xl">
          {description}
        </p>
      ) : null}
    </div>
  );
}
