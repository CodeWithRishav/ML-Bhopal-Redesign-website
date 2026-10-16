"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GoogleElement, GoogleElementType } from "@/components/ui/GoogleElement";

export interface GridElementConfig {
  type: GoogleElementType;
  position: string;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

interface HeroGridBackgroundProps {
  className?: string;
  pattern?: "blueprint" | "dots" | "cross" | "code";
  opacity?: string;
  withTopBorder?: boolean;
  withElements?: boolean;
  elements?: GridElementConfig[];
}

export function HeroGridBackground({
  className,
  pattern = "blueprint",
  opacity = "opacity-70 dark:opacity-25",
  withTopBorder = false,
  withElements = false,
  elements,
}: HeroGridBackgroundProps) {
  const patternClass = {
    blueprint: "blueprint-grid",
    dots: "google-dot-grid",
    cross: "google-cross-grid",
    code: "google-code-grid",
  }[pattern];

  const defaultElements: GridElementConfig[] = [
    { type: "brackets-yellow", position: "top-10 left-6 lg:left-14", size: "md", animate: true },
    { type: "slashes-blue", position: "top-12 right-6 lg:right-16", size: "md", animate: true },
    { type: "plus-red", position: "bottom-10 left-12 lg:left-24", size: "sm", animate: true },
    { type: "hash-green", position: "bottom-8 right-12 lg:right-24", size: "sm", animate: true },
  ];

  const activeElements = elements || defaultElements;

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      {/* Google 4-Color Accent Top Bar */}
      {withTopBorder && (
        <div className="absolute top-0 inset-x-0 h-1 flex z-20">
          <span className="h-full flex-1 bg-google-blue" />
          <span className="h-full flex-1 bg-google-red" />
          <span className="h-full flex-1 bg-google-yellow" />
          <span className="h-full flex-1 bg-google-green" />
        </div>
      )}

      {/* Grid Canvas */}
      <div className={cn("absolute inset-0", patternClass, opacity)} />

      {/* Soft Radial Fade for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background dark:via-[#0F172A]/40 dark:to-[#0F172A]" />

      {/* Floating Google Brand Vectors */}
      {withElements &&
        activeElements.map((item, idx) => (
          <div key={idx} className={cn("absolute z-10 hidden md:block opacity-85", item.position)}>
            <GoogleElement
              type={item.type}
              size={item.size || "md"}
              animate={item.animate !== false}
            />
          </div>
        ))}
    </div>
  );
}
