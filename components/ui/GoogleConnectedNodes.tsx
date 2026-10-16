"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GoogleConnectedNodesProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function GoogleConnectedNodes({ className, size = "md" }: GoogleConnectedNodesProps) {
  const scale = size === "sm" ? 0.6 : size === "lg" ? 1.2 : 1;
  const shouldReduceMotion = useReducedMotion();

  // Gentle floating animation variants for individual nodes
  const floatAnim = (yOffset: number, duration: number, delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          animate: {
            y: [-yOffset, yOffset, -yOffset],
            transition: {
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut" as const,
            },
          },
        };

  return (
    <div
      className={cn("relative flex items-center justify-center select-none pointer-events-none", className)}
      aria-hidden="true"
    >
      <svg
        width={360 * scale}
        height={180 * scale}
        viewBox="0 0 360 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[360px] h-auto drop-shadow-sm overflow-visible"
      >
        {/* Connective Curves */}
        <path
          d="M60 90 C 110 30, 150 150, 180 90"
          stroke="#D1D5DB"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M180 90 C 210 30, 260 150, 300 90"
          stroke="#D1D5DB"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M120 45 C 180 20, 220 20, 240 45"
          stroke="#F8FAFC"
          strokeWidth="1.5"
        />
        <path
          d="M120 135 C 180 160, 220 160, 240 135"
          stroke="#F8FAFC"
          strokeWidth="1.5"
        />

        {/* Node 1: Blue - Technology */}
        <motion.g
          transform="translate(60, 90)"
          {...floatAnim(4, 3.2, 0)}
        >
          <circle r="18" fill="#E8F0FE" />
          <circle r="8" fill="#4285F4" />
        </motion.g>

        {/* Node 2: Red - Experimentation */}
        <motion.g
          transform="translate(140, 45)"
          {...floatAnim(3, 2.8, 0.4)}
        >
          <circle r="14" fill="#FCE8E6" />
          <circle r="6" fill="#EA4335" />
        </motion.g>

        {/* Center Hub Node: Google Blue / Community Hub */}
        <motion.g
          transform="translate(180, 90)"
          {...floatAnim(2, 3.8, 0.2)}
        >
          <circle r="22" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.5" />
          <circle r="10" fill="#4285F4" />
        </motion.g>

        {/* Node 3: Yellow - Learning */}
        <motion.g
          transform="translate(220, 135)"
          {...floatAnim(3.5, 3.4, 0.6)}
        >
          <circle r="14" fill="#FEF7E0" />
          <circle r="6" fill="#FBBC05" />
        </motion.g>

        {/* Node 4: Green - Community */}
        <motion.g
          transform="translate(300, 90)"
          {...floatAnim(4, 3.0, 0.3)}
        >
          <circle r="18" fill="#E6F4EA" />
          <circle r="8" fill="#34A853" />
        </motion.g>
      </svg>
    </div>
  );
}

/**
 * 4-Color Semantic Legend Pill (Optional / Simplified)
 */
export function GoogleColorPillRow({ className }: { className?: string }) {
  return null;
}
