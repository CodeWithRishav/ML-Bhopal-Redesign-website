"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum rotation in degrees (default 5deg)
  perspective?: number; // CSS perspective in pixels (default 1000px)
  glareEffect?: boolean;
}

/**
 * Reusable 3D Tilt Card component with physics-based spring damping.
 * Automatically respects prefers-reduced-motion and touch device constraints.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 5,
  perspective = 1000,
  glareEffect = false,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates relative to center (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring configuration to prevent jitter
  const springConfig = { stiffness: 240, damping: 22 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Map mouse coordinate to rotation angles (inverted for natural 3D tilt)
  const rotateX = useTransform(smoothY, [-1, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-1, 1], [-maxTilt, maxTilt]);

  // Subtle glare coordinates
  const glareX = useTransform(smoothX, [-1, 1], ["0%", "100%"]);
  const glareY = useTransform(smoothY, [-1, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized position from center: range -1 to 1
    const x = ((e.clientX - rect.left) / width) * 2 - 1;
    const y = ((e.clientY - rect.top) / height) * 2 - 1;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // If user prefers reduced motion, render without 3D transforms
  if (shouldReduceMotion) {
    return (
      <div className={cn("relative transition-transform duration-200", className)} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
      className={cn(
        "relative transition-[box-shadow,border-color] duration-200 will-change-transform",
        className
      )}
      {...props}
    >
      <div style={{ transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>

      {glareEffect && isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden"
          style={{
            background: `radial-gradient(circle 240px at ${glareX} ${glareY}, rgba(26, 115, 232, 0.08), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}
