"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md";
}

export function ThemeToggle({ className, size = "md" }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center border",
        "bg-white/80 hover:bg-[#F1F3F4] text-ink-secondary hover:text-ink-primary border-[#D1D5DB]",
        "dark:bg-[#1E293B] dark:hover:bg-[#1E293B] dark:text-[#F8FAFC] dark:border-[#334155] dark:hover:border-[#5F6368]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue",
        size === "sm" ? "w-8 h-8" : "w-9 h-9",
        className
      )}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center text-google-yellow"
          >
            <Sun className={size === "sm" ? "w-4 h-4" : "w-4.5 h-4.5"} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center text-google-blue"
          >
            <Moon className={size === "sm" ? "w-4 h-4" : "w-4.5 h-4.5"} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
