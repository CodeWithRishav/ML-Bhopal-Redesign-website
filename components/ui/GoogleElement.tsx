"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type GoogleElementType =
  | "arrow-yellow"
  | "plus-red"
  | "plus-blue"
  | "hash-green"
  | "cross-pink"
  | "cloud-pink"
  | "brackets-yellow"
  | "braces-green"
  | "slashes-blue"
  | "semicolon-yellow"
  | "quotes-green"
  | "dots-green"
  | "equals-blue"
  | "wireframe-globe"
  | "wireframe-asterisk";

interface GoogleElementProps {
  type: GoogleElementType;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
  alt?: string;
}

const ELEMENT_MAP: Record<GoogleElementType, { src: string; width: number; height: number; alt: string }> = {
  "arrow-yellow": {
    src: "/elements/arrow-yellow.png",
    width: 719,
    height: 452,
    alt: "Google Build With AI Arrow",
  },
  "plus-red": {
    src: "/elements/plus-red.png",
    width: 532,
    height: 524,
    alt: "Google Plus Red",
  },
  "plus-blue": {
    src: "/elements/plus-blue.png",
    width: 406,
    height: 383,
    alt: "Google Plus Blue",
  },
  "hash-green": {
    src: "/elements/hash-green.png",
    width: 531,
    height: 524,
    alt: "Google Code Hash Green",
  },
  "cross-pink": {
    src: "/elements/cross-pink.png",
    width: 526,
    height: 526,
    alt: "Google Cross Pink",
  },
  "cloud-pink": {
    src: "/elements/cloud-pink.png",
    width: 1219,
    height: 454,
    alt: "Google Pill Cloud Pink",
  },
  "brackets-yellow": {
    src: "/elements/brackets-yellow-pair.png",
    width: 600,
    height: 540,
    alt: "Google Code Brackets Yellow",
  },
  "braces-green": {
    src: "/elements/brace-left-green.png",
    width: 281,
    height: 664,
    alt: "Google Code Braces Green",
  },
  "slashes-blue": {
    src: "/elements/slashes-blue-pair.png",
    width: 670,
    height: 680,
    alt: "Google Code Slashes Blue",
  },
  "semicolon-yellow": {
    src: "/elements/semicolon-yellow.png",
    width: 240,
    height: 600,
    alt: "Google Code Semicolon Yellow",
  },
  "quotes-green": {
    src: "/elements/quotes-green.png",
    width: 550,
    height: 200,
    alt: "Google Code Quotes Green",
  },
  "dots-green": {
    src: "/elements/dots-green.png",
    width: 800,
    height: 270,
    alt: "Google Code Dots Green",
  },
  "equals-blue": {
    src: "/elements/equals-blue.png",
    width: 430,
    height: 400,
    alt: "Google Equals Blue",
  },
  "wireframe-globe": {
    src: "/elements/wireframe-globe.png",
    width: 491,
    height: 452,
    alt: "Google Developer Globe",
  },
  "wireframe-asterisk": {
    src: "/elements/wireframe-asterisk.png",
    width: 271,
    height: 271,
    alt: "Google Developer Asterisk",
  },
};

const SIZE_MAP = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

export function GoogleElement({
  type,
  className,
  size = "md",
  animate = false,
  alt,
}: GoogleElementProps) {
  const item = ELEMENT_MAP[type] || ELEMENT_MAP["plus-blue"];

  const content = (
    <div
      className={cn(
        "relative inline-flex items-center justify-center shrink-0 select-none pointer-events-none drop-shadow-sm",
        SIZE_MAP[size],
        className
      )}
    >
      <Image
        src={item.src}
        alt={alt || item.alt}
        width={item.width}
        height={item.height}
        className="w-full h-full object-contain"
        unoptimized
      />
    </div>
  );

  if (animate) {
    return (
      <motion.div
        animate={{
          y: [-4, 4, -4],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="inline-block"
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
