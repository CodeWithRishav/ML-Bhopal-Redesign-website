"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { DURATION, EASING } from "@/lib/motion";

export interface AccordionItemData {
  id?: string;
  question: string;
  answer: string | React.ReactNode;
}

interface AnimatedAccordionProps {
  items: AccordionItemData[];
  className?: string;
  allowMultiple?: boolean;
}

export function AnimatedAccordion({
  items,
  className,
  allowMultiple = false,
}: AnimatedAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);
  const shouldReduceMotion = useReducedMotion();

  const toggleIndex = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div
            key={item.id || index}
            className="rounded-card bg-white border border-[#D1D5DB] overflow-hidden shadow-subtle transition-colors hover:border-google-blue"
          >
            <button
              type="button"
              onClick={() => toggleIndex(index)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue"
              aria-expanded={isOpen}
            >
              <span className="text-base sm:text-lg font-display font-semibold text-ink-primary">
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : DURATION.small,
                  ease: EASING.standard,
                }}
                className="shrink-0 text-ink-secondary"
              >
                <ChevronDown className="w-5 h-5 text-google-blue" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : DURATION.medium,
                    ease: EASING.decelerate,
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-sm text-ink-secondary font-sans leading-relaxed border-t border-[#F1F3F4]">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
