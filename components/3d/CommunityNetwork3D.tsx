"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NodeData {
  id: string;
  name: string;
  category: string;
  color: string;
  bgLight: string;
  bgDark: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  radius: number;
}

const NODES: NodeData[] = [
  {
    id: "hub",
    name: "ML Bhopal Hub",
    category: "Community Core",
    color: "#4285F4",
    bgLight: "#E8F0FE",
    bgDark: "#1A3A6E",
    x: 50,
    y: 50,
    radius: 28,
  },
  {
    id: "aiday",
    name: "AI Day 2.0",
    category: "Flagship Summit",
    color: "#FBBC05",
    bgLight: "#FEF7E0",
    bgDark: "#3A3010",
    x: 22,
    y: 28,
    radius: 20,
  },
  {
    id: "campaigns",
    name: "Agent Hackathons",
    category: "Sprints & Builds",
    color: "#EA4335",
    bgLight: "#FCE8E6",
    bgDark: "#3C1F1E",
    x: 78,
    y: 26,
    radius: 20,
  },
  {
    id: "campuses",
    name: "45+ Campuses",
    category: "Student Chapters",
    color: "#34A853",
    bgLight: "#E6F4EA",
    bgDark: "#1B3B26",
    x: 20,
    y: 74,
    radius: 20,
  },
  {
    id: "resources",
    name: "Open Weights & Labs",
    category: "Developer Assets",
    color: "#4285F4",
    bgLight: "#E8F0FE",
    bgDark: "#1A3A6E",
    x: 80,
    y: 74,
    radius: 20,
  },
  {
    id: "partners",
    name: "Google for Developers",
    category: "Ecosystem Partner",
    color: "#4285F4",
    bgLight: "#E8F0FE",
    bgDark: "#1F2D40",
    x: 50,
    y: 16,
    radius: 18,
  },
];

const CONNECTIONS: [string, string][] = [
  ["hub", "aiday"],
  ["hub", "campaigns"],
  ["hub", "campuses"],
  ["hub", "resources"],
  ["hub", "partners"],
  ["aiday", "partners"],
  ["campaigns", "resources"],
  ["campuses", "aiday"],
];

interface CommunityNetwork3DProps {
  className?: string;
}

/**
 * Interactive 3D Community Ecosystem Network Visualization.
 * Lightweight, high-performance Canvas/SVG renderer with mouse parallax and interactive node hover.
 * Zero CPU overhead; respects reduced-motion.
 */
export function CommunityNetwork3D({ className }: CommunityNetwork3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const rafId = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    
    if (rafId.current !== null) return;
    
    rafId.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMouseOffset({ x: x * 14, y: y * 14 });
      rafId.current = null;
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    setMouseOffset({ x: 0, y: 0 });
    setActiveNode(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-full aspect-[16/9] max-w-4xl mx-auto rounded-surface bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] p-4 sm:p-8 overflow-hidden shadow-subtle select-none transition-colors",
        className
      )}
      style={{ perspective: "1000px" }}
    >
      {/* Blueprint Grid Background inside Canvas */}
      <div className="absolute inset-0 blueprint-grid opacity-30 dark:opacity-15 pointer-events-none" />

      {/* 3D Moving Network Container */}
      <motion.div
        animate={{
          rotateX: shouldReduceMotion ? 0 : -mouseOffset.y * 0.4,
          rotateY: shouldReduceMotion ? 0 : mouseOffset.x * 0.4,
          x: shouldReduceMotion ? 0 : mouseOffset.x * 0.6,
          y: shouldReduceMotion ? 0 : mouseOffset.y * 0.6,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full overflow-visible pointer-events-none"
        >
          {/* Connection Lines */}
          {CONNECTIONS.map(([sourceId, targetId]) => {
            const source = NODES.find((n) => n.id === sourceId);
            const target = NODES.find((n) => n.id === targetId);
            if (!source || !target) return null;

            const isHighlighted =
              activeNode === sourceId || activeNode === targetId || activeNode === "hub";

            return (
              <line
                key={`${sourceId}-${targetId}`}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={isHighlighted ? "#4285F4" : "#D1D5DB"}
                strokeWidth={isHighlighted ? 0.7 : 0.4}
                strokeDasharray={isHighlighted ? "none" : "1.5 1"}
                className="transition-all duration-300 dark:stroke-[#334155]"
              />
            );
          })}
        </svg>

        {/* Nodes Layer with HTML Positioning */}
        {NODES.map((node) => {
          const isCenter = node.id === "hub";
          const isHovered = activeNode === node.id;
          const isConnected =
            activeNode === "hub" ||
            activeNode === node.id ||
            CONNECTIONS.some(
              ([a, b]) =>
                (a === activeNode && b === node.id) || (b === activeNode && a === node.id)
            );

          return (
            <div
              key={node.id}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: `translate(-50%, -50%) translateZ(${isHovered ? "24px" : isCenter ? "12px" : "4px"})`,
              }}
              className={cn(
                "absolute cursor-pointer transition-transform duration-200 z-10 flex flex-col items-center group pointer-events-auto",
                isHovered ? "scale-110 z-30" : "scale-100"
              )}
            >
              {/* Circular Node Symbol */}
              <div
                className={cn(
                  "relative rounded-full flex items-center justify-center transition-all duration-200 border-2 shadow-subtle",
                  isCenter ? "w-14 h-14 sm:w-16 sm:h-16" : "w-10 h-10 sm:w-12 sm:h-12"
                )}
                style={{
                  borderColor: isHovered || isConnected ? node.color : "#D1D5DB",
                  backgroundColor: isHovered ? node.color : undefined,
                }}
              >
                <div
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-transform duration-200 group-hover:scale-125"
                  style={{
                    backgroundColor: isHovered ? "#FFFFFF" : node.color,
                  }}
                />
              </div>

              {/* Node Badge / Label */}
              <div
                className={cn(
                  "mt-2 px-2.5 py-1 rounded-full text-center transition-all duration-200 backdrop-blur-md border shadow-subtle whitespace-nowrap",
                  isHovered || isCenter
                    ? "bg-white dark:bg-[#0F172A] border-google-blue dark:border-[#60A5FA] shadow-elevation-1"
                    : "bg-white/90 dark:bg-[#1E293B]/90 border-[#D1D5DB] dark:border-[#334155]"
                )}
              >
                <span
                  className={cn(
                    "block text-[11px] sm:text-xs font-semibold tracking-tight leading-none",
                    isHovered
                      ? "text-google-blue dark:text-[#60A5FA]"
                      : "text-ink-primary dark:text-[#F8FAFC]"
                  )}
                >
                  {node.name}
                </span>
                <span className="block text-[9px] sm:text-[10px] text-ink-tertiary dark:text-[#64748B] mt-0.5">
                  {node.category}
                </span>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
