"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: string | number;
  duration?: number; // duration in seconds
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 1.2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  const stringVal = String(value);
  // Extract number and suffix/prefix (e.g. "3,600+" -> number: 3600, suffix: "+", prefix: "")
  const cleanedStr = stringVal.replace(/,/g, "");
  const match = cleanedStr.match(/^([^0-9]*)(\d+)(.*)$/);

  const prefix = match ? match[1] : "";
  const targetNumber = match ? parseInt(match[2], 10) : NaN;
  const suffix = match ? match[3] : "";

  const [currentNumber, setCurrentNumber] = useState<number>(
    shouldReduceMotion || isNaN(targetNumber) ? targetNumber : 0
  );

  useEffect(() => {
    if (shouldReduceMotion || isNaN(targetNumber) || !isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Material deceleration easing: 1 - (1 - progress)^3
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const nextVal = Math.round(easeOut * targetNumber);

      setCurrentNumber(nextVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, targetNumber, duration, shouldReduceMotion]);

  if (isNaN(targetNumber) || shouldReduceMotion) {
    return <span ref={ref} className={className}>{stringVal}</span>;
  }

  // Format with commas if original had comma or target >= 1000
  const formattedNumber =
    stringVal.includes(",") || targetNumber >= 1000
      ? currentNumber.toLocaleString()
      : String(currentNumber);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
}
