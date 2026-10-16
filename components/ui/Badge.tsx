import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "google" | "blue" | "orange" | "live" | "upcoming" | "past" | "amber" | "violet" | "cyan" | "outline";
  pulse?: boolean;
  children: React.ReactNode;
}

const variantClasses = {
  google: "bg-[#E8F0FE] dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800 text-google-blue dark:text-[#60A5FA] font-sans",
  blue: "bg-[#E8F0FE] dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800 text-google-blue dark:text-[#60A5FA] font-sans",
  orange: "bg-[#FFF1E6] dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-800 text-primary dark:text-[#FF9A3D] font-sans",
  live: "bg-google-green-light dark:bg-green-950/40 border border-green-200/80 dark:border-green-800 text-google-green dark:text-[#81C995] font-sans",
  upcoming: "bg-[#FFF1E6] dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-800 text-primary dark:text-[#FF9A3D] font-sans",
  past: "bg-[#E5E7EB] dark:bg-[#334155] border border-[#D1D5DB] dark:border-[#475569] text-ink-secondary dark:text-[#94A3B8] font-sans",
  amber: "bg-[#FEF7E0] dark:bg-amber-950/40 border border-yellow-200/80 dark:border-yellow-800 text-amber-900 dark:text-[#FBBC05] font-sans",
  violet: "bg-purple-50 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-sans",
  cyan: "bg-sky-50 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-800 text-sky-800 dark:text-sky-300 font-sans",
  outline: "bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] text-ink-secondary dark:text-[#94A3B8] font-sans",
};

export function Badge({ variant = "outline", pulse, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-normal select-none",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {pulse ? (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-90 animate-pulse" />
      ) : null}
      {children}
    </span>
  );
}
