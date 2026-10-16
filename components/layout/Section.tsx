import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "sm" | "md" | "lg" | "xl" | "none";
  background?: "base" | "subtle" | "surface" | "soft" | "transparent";
  children: React.ReactNode;
}

const spacingClasses = {
  none: "py-0",
  sm: "py-8 sm:py-12",
  md: "py-12 sm:py-16 lg:py-20",
  lg: "py-16 sm:py-20 lg:py-24",
  xl: "py-20 sm:py-24 lg:py-28",
};

const backgroundClasses = {
  transparent: "bg-transparent",
  base: "bg-background",
  subtle: "bg-white dark:bg-[#0F172A] border-y border-[#D1D5DB] dark:border-[#334155]",
  surface: "bg-white dark:bg-[#1E293B]",
  soft: "bg-[#F1F3F4] dark:bg-[#1A1A1C] border-y border-[#D1D5DB] dark:border-[#334155]",
};

export function Section({
  spacing = "lg",
  background = "transparent",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("relative w-full overflow-hidden", spacingClasses[spacing], backgroundClasses[background], className)}
      {...props}
    >
      {children}
    </section>
  );
}
