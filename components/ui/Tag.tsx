import React from "react";
import { cn } from "@/lib/utils";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "domain" | "research" | "system" | "neutral" | "accent" | "orange";
  children: React.ReactNode;
}

const variantClasses = {
  domain: "bg-[#E5E7EB] dark:bg-[#334155] border border-transparent text-ink-secondary dark:text-[#CBD5E1] hover:border-[#D1D5DB] dark:hover:border-[#475569] hover:text-ink-primary dark:hover:text-white",
  research: "bg-[#E8F0FE] dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-google-blue dark:text-[#60A5FA]",
  system: "bg-google-green-light/50 dark:bg-green-950/40 border border-green-100 dark:border-green-900 text-google-green dark:text-[#81C995]",
  neutral: "bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] text-ink-secondary dark:text-[#94A3B8]",
  accent: "bg-[#E8F0FE] dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-google-blue dark:text-[#60A5FA] font-medium",
  orange: "bg-[#FFF1E6] dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900 text-primary dark:text-[#FF9A3D] font-medium",
};

export function Tag({ variant = "domain", className, children, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-control text-xs font-sans tracking-normal transition-colors select-none",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
