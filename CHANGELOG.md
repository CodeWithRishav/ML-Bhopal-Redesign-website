# Changelog

All notable changes to the **ML Bhopal Platform** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-09-25

### Added
- **Motion & Interaction Design System**:
  - Implemented centralized motion tokens in `lib/motion.ts` based on Material Design 3 easing curves and duration tokens (`micro`, `small`, `medium`, `large`, `hero`).
  - Added reusable client motion primitives: `ScrollReveal`, `StaggerContainer`, `StaggerItem`, `AnimatedCounter`, `AnimatedAccordion`, and `AnimatedTabs`.
  - Added choreographed staggered hero entrance in `HomeHero.tsx` with ambient floating node physics in `GoogleConnectedNodes.tsx`.
  - Added layout-aware animated card filtering in `EventsExplorer.tsx` and `ResourcesExplorer.tsx` with `<AnimatePresence mode="popLayout">`.
  - Added interactive sliding tab indicator in `AIDayEditionSwitcher.tsx` using Framer Motion `layoutId`.
  - Added full `prefers-reduced-motion: reduce` hooks and system-level CSS override in `globals.css`.
- **Google-Inspired Material Visual System**:
  - Complete light-first redesign with crisp Google Blue (`#1A73E8`), Green (`#34A853`), Yellow (`#FBBC04`), and Red (`#EA4335`) accents.
  - Surface elevations (`elevation-1`, `elevation-2`, `subtle`, `card`, `card-hover`) replacing heavy obsidian glow effects.
  - Material radius standards: `control` (8px), `card` (16px), `surface` (24px).
  - Modern typography hierarchy utilizing `Inter` and `JetBrains Mono` variable fonts via `next/font/google`.
- **SEO & Structured Data**:
  - Added Schema.org `Organization` structured data in root layout.
  - Added Schema.org `Event` structured data for AI Day 2.0 and dynamic event routes.
  - Added Schema.org `Article` structured data for technical engineering guides.
  - Added dynamic `sitemap.ts` indexing 42 primary, dynamic, and article URLs.
  - Added `robots.ts` with explicit sitemap citation and `/api/` crawl restrictions.
- **Form Infrastructure**:
  - Built comprehensive lead generation forms on `/contact`, `/ambassador`, `/join`, and `/partners`.
  - Implemented client-side validation, server-side length bounds, honeypot spam protection, and sub-second bot submission detection in `app/api/contact/route.ts`.
  - Added local ledger storage (`content/submissions.json`) in development and optional Nodemailer / Google Sheets webhook forwarding in production.

### Changed
- Refactored all page routes (`/`, `/about`, `/ai-day`, `/ambassador`, `/campaigns`, `/campaigns/[slug]`, `/contact`, `/events`, `/events/[slug]`, `/join`, `/partners`, `/resources`, `/resources/[slug]`, `/team`) to static and incremental static generation (SSG).
- Upgraded next.config.ts with strict remote image patterns, AVIF/WebP image formats, and package import optimization for `lucide-react`.
- Replaced custom accordions and static question cards with accessible `AnimatedAccordion` components.
- Modernized event and campaign card interfaces with Google-style calendar chips, venue badges, and high-contrast status pills.

### Fixed
- Fixed text contrast issues on light pastel icon backgrounds in `/ai-day` and `/about`.
- Fixed leftover dark loading skeleton styling in `/partners`.
- Fixed background page displacement during mobile drawer activation by adding body scroll locking.
- Resolved JSX element nesting syntax in `AIDayEditionSwitcher`, `CampusPrograms`, and `FinalCTA`.

---

## [1.0.0] - 2024-02-21

### Added
- Initial community launch as TensorFlow User Group (TFUG) Bhopal.
- Foundation of community meetups and the TFUG Bhopal and OWASP Bhopal launch.
- Community registration pipelines via Commudle.
