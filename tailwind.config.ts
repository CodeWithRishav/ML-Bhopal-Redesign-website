import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Orange: #FF7A00 (Buttons, CTAs, highlights, active states)
        primary: {
          DEFAULT: "#FF7A00",
          hover: "#FF9A3D",
          active: "#E66E00",
          light: "#FFF1E6",
          gradient: "#FF9A3D",
        },
        // Secondary: #4285F4 (Links, secondary buttons, icons, interactive)
        secondary: {
          DEFAULT: "#4285F4",
          hover: "#2B72E5",
          light: "#E8F0FE",
        },
        // Google Brand Accents
        google: {
          blue: "#4285F4",
          "blue-dark": "#2B72E5",
          "blue-light": "#E8F0FE",
          "blue-surface": "#F1F5FD",
          green: "#34A853",
          "green-light": "#E6F4EA",
          yellow: "#FBBC05",
          "yellow-light": "#FEF7E0",
          red: "#EA4335",
          "red-light": "#FCE8E6",
        },
        // Dark Colors Palette
        navy: {
          DEFAULT: "#0F172A", // Deep Navy
          deep: "#0F172A",
          surface: "#1E293B",
        },
        slate: {
          DEFAULT: "#334155", // Slate
          border: "#334155",
        },
        // Light / Background Palette
        offwhite: "#FAFAFA",
        softgray: "#E5E7EB",
        "light-orange": "#FFF1E6",
        "pale-blue": "#E8F0FE",
        bordergray: "#D1D5DB",

        // Semantic Backgrounds & Surfaces (Theme-aware)
        background: {
          DEFAULT: "var(--background)",
          subtle: "var(--surface-secondary)",
          pure: "var(--surface)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          secondary: "var(--surface-secondary)",
          soft: "var(--surface-secondary)",
          elevated: "var(--surface-elevated)",
        },
        // Typography Colors
        ink: {
          primary: "var(--text-primary)",     // #0F172A in light
          secondary: "var(--text-secondary)", // #334155 in light
          tertiary: "var(--text-tertiary)",   // #64748B
          disabled: "#94A3B8",
          inverse: "#FFFFFF",
        },
        // Borders
        border: {
          DEFAULT: "var(--border)", // #D1D5DB in light
          light: "var(--border-light)",
          subtle: "var(--surface-secondary)",
          focus: "var(--primary)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Roboto", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Roboto", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "elevation-0": "none",
        "elevation-1": "0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)",
        "elevation-2": "0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15)",
        "elevation-3": "0 4px 8px 3px rgba(60, 64, 67, 0.15), 0 1px 3px 0 rgba(60, 64, 67, 0.3)",
        "subtle": "0 1px 2px 0 rgba(60, 64, 67, 0.1), 0 1px 3px 0 rgba(60, 64, 67, 0.08)",
        "card": "0 1px 2px 0 rgba(60, 64, 67, 0.1), 0 2px 6px 0 rgba(60, 64, 67, 0.06)",
        "card-hover": "0 4px 12px 0 rgba(60, 64, 67, 0.12), 0 1px 3px 0 rgba(60, 64, 67, 0.1)",
      },
      borderRadius: {
        control: "8px",
        card: "16px",
        surface: "24px",
      },
    },
  },
  plugins: [],
} satisfies Config;
