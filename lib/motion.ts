/**
 * ML Bhopal Motion Design System
 * Inspired by Google Material Design 3 Motion Principles:
 * - Responsive: Fast reaction to user input
 * - Natural: Eased curves that feel grounded in real-world physics
 * - Intentional: Motion guides user focus and clarifies spatial relationships
 */

// ============================================================================
// 1. DURATION TOKENS (Milliseconds)
// ============================================================================
export const DURATION = {
  /** Micro-interactions: button presses, icon nudges, toggle switches */
  micro: 0.14, // 140ms
  /** Small transitions: tooltips, chips, hover elevations */
  small: 0.2, // 200ms
  /** Medium transitions: dropdown menus, accordions, card reveals */
  medium: 0.32, // 320ms
  /** Large transitions: modal dialogs, full page section reveals */
  large: 0.48, // 480ms
  /** Hero & Choreographed: staggered entrance animations */
  hero: 0.65, // 650ms
} as const;

// ============================================================================
// 2. EASING CURVES (Material 3 Motion Specs)
// ============================================================================
export const EASING = {
  /** Standard: for elements that begin and end on screen */
  standard: [0.2, 0, 0, 1] as const, // cubic-bezier(0.2, 0, 0, 1)
  /** Emphasized Decelerate: for elements entering the viewport */
  decelerate: [0.05, 0.7, 0.1, 1] as const, // cubic-bezier(0.05, 0.7, 0.1, 1)
  /** Emphasized Accelerate: for elements leaving the viewport */
  accelerate: [0.3, 0, 0.8, 0.15] as const,
  /** Gentle Spring for micro-bounces */
  spring: { type: "spring", stiffness: 350, damping: 28 },
  /** Bouncy Spring for playful community moments */
  springBouncy: { type: "spring", stiffness: 420, damping: 22 },
  /** Snappy Spring for tabs and segmented controls */
  springSnappy: { type: "spring", stiffness: 500, damping: 35 },
} as const;

// ============================================================================
// 3. STAGGER DELAY PRESETS
// ============================================================================
export const STAGGER = {
  fast: 0.05, // 50ms between items
  normal: 0.08, // 80ms between items
  slow: 0.12, // 120ms between items
} as const;

// ============================================================================
// 4. REUSABLE ANIMATION VARIANTS (Framer Motion)
// ============================================================================

/** Fade Up Variant for Page Content */
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.medium,
      ease: EASING.decelerate,
    },
  },
};

/** Stagger Container Variant */
export const staggerContainerVariant = {
  hidden: { opacity: 0 },
  visible: (staggerDelay = STAGGER.normal) => ({
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.05,
    },
  }),
};

/** Card Item Variant for Staggered Grids */
export const cardItemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.medium,
      ease: EASING.decelerate,
    },
  },
};

/** Scale In Variant for Badges & Modals */
export const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.small,
      ease: EASING.decelerate,
    },
  },
};

/** Slide in from Top for Dropdowns & Alerts */
export const slideDownVariant = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.small,
      ease: EASING.decelerate,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: DURATION.micro,
      ease: EASING.accelerate,
    },
  },
};
