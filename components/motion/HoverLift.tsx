"use client";

import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoverLiftProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  liftY?: number; // Pixels to lift on hover (default -5px)
}

/**
 * Standard tactile lift wrapper for cards and surfaces.
 * Respects reduced-motion and touch device behavior.
 */
export function HoverLift({
  children,
  className,
  liftY = -5,
  ...props
}: HoverLiftProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={cn("transition-colors duration-150", className)} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: liftY }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      className={cn("will-change-transform", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
