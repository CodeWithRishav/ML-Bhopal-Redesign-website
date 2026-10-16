"use client";

import React, { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PointerGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: "blue" | "subtle";
  glowRadius?: number;
}

/**
 * Renders a subtle cursor-following radial highlight within desktop cards.
 * Provides a tactile, premium surface feel without neon or rainbow effects.
 * Optimized with direct CSS variable updates via RAF — zero React re-renders on mousemove.
 * Disabled on touch screens and when prefers-reduced-motion is active.
 */
export function PointerGlow({
  children,
  className,
  glowColor = "blue",
  glowRadius = 180,
  ...props
}: PointerGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Early return if motion is reduced or on touch-only devices
    if (shouldReduceMotion) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    const el = containerRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;

    const handleMouseEnter = () => {
      glow.style.opacity = "1";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glow.style.setProperty("--x", `${x}px`);
        glow.style.setProperty("--y", `${y}px`);
        rafId.current = null;
      });
    };

    const handleMouseLeave = () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      glow.style.opacity = "0";
    };

    el.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shouldReduceMotion]);

  const colorStyle =
    glowColor === "blue"
      ? "radial-gradient(circle var(--radius) at var(--x, 50%) var(--y, 50%), rgba(26, 115, 232, 0.07), transparent 70%)"
      : "radial-gradient(circle var(--radius) at var(--x, 50%) var(--y, 50%), rgba(0, 0, 0, 0.04), transparent 70%)";

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden group", className)}
      {...props}
    >
      {/* Soft radial pointer glow (desktop only, zero-re-render RAF CSS-driven) */}
      {!shouldReduceMotion && (
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-200 opacity-0 hidden sm:block z-0"
          style={
            {
              "--radius": `${glowRadius}px`,
              background: colorStyle,
            } as React.CSSProperties
          }
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 w-full h-full flex flex-col">{children}</div>
    </div>
  );
}
