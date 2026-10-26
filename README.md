# ML Bhopal

> The official digital headquarters and developer platform for **ML Bhopal** — Central India's premier AI/ML community supported by Google for Developers, connecting 3,600+ engineers, researchers, and student builders.

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4.7-black?style=flat&logo=framer)](https://www.framer.com/motion/)

---

## About ML Bhopal

Founded in February 2024 under the initial banner of **TensorFlow User Group (TFUG) Bhopal**, ML Bhopal has grown into Central India's benchmark technical community. Supported by **Google for Developers** and regional academic partners (MANIT, LNCT, Oriental, IIIT Bhopal, UIT-RGPV), the platform powers technical masterclasses, hackathons, flagship summits, and open-weights AI research circles.

The web platform ([mlbhopal.tech](https://mlbhopal.tech)) provides:
- **Event Chronicles & RSVPs**: Discovery and schedule guides for 22+ verified community gatherings.
- **AI Day Flagship Portal**: Annual conference hub for Central India's premier AI gathering.
- **Sprint & Hackathon Hub**: Structured multi-week campaigns like *Build with AI* and *Kaggle Days*.
- **Technical Knowledge Hub**: In-depth engineering roadmaps, cookbooks, and RAG architectures.
- **Leadership Funnels**: Campus Ambassador, volunteer collective, and partnership applications.

---

## Core Features

- **Google-Inspired Design System**: Built with modern Material Design 3 principles, official Google color hierarchy, high-contrast typography, and refined surface elevations.
- **Awwwards-Caliber Kinetic Hero**: Atmospheric color canvas with fine blueprint telemetry, dynamic live community pulse radar, and an interactive 3D spatial developer console.
- **Material Motion System**: Choreographed hero transitions, ambient floating node animations, animated numerical counters, and layout-aware card re-flow via Framer Motion 12.
- **Events Explorer**: Instant live search and category filtering across meetups, workshops, and flagships with immediate 100% server visibility (zero SSR opacity glitches).
- **AI Day Multi-Edition Switcher**: Interactive gliding tab selector allowing instant browsing between summit editions.
- **Technical Articles & Cookbook**: Markdown-rendered deep dives with sticky Table of Contents, reading progress indicator, and syntax-highlighted code blocks with 1-click copy.
- **Lead Intake & Anti-Spam Pipeline**: Integrated application forms with in-memory IP rate limiting, invisible honeypot spam protection, fast-bot submission detection, and optional SMTP / Google Sheets dispatch.
- **Universal Static Pre-Rendering (SSG)**: All 49 routes are statically pre-rendered at build time for sub-second page loads and zero database bottlenecks.
- **Complete Accessibility & Reduced Motion**: WCAG 2.1 AA compliant, complete keyboard navigation, skip-to-content bypass, and comprehensive `prefers-reduced-motion` safety hooks.
- **Full SEO & Structured Data**: Automated `sitemap.xml`, `robots.txt`, Open Graph previews, and Schema.org `Organization`, `Event`, and `Article` structured data.

---

## Design System & Color Palette

The platform implements a dedicated, high-contrast color system tailored for readability, accessibility, and brand coherence:

| Token Category | Color Name | Hex Code | Purpose & Recommended Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | Primary Orange | `#FF7A00` | Main buttons, primary CTAs, active highlights, important focus rings |
| **Secondary** | Google Blue | `#4285F4` | Links, secondary buttons, interactive icons, active navigation tabs |
| **Accents** | Google Red | `#EA4335` | Urgent badges, live indicators, accent period marks |
| | Google Yellow | `#FBBC05` | Warning tags, keynote badges, accent dots |
| | Google Green | `#34A853` | Verified status pills, active community signals, success states |
| **Dark Base** | Deep Navy | `#0F172A` | Primary dark mode background and dark surface base |
| **Dark Surface**| Slate / Dark Slate | `#334155` / `#1E293B` | Dark cards, modals, elevated panels, and dark mode borders |
| **Light Base** | Off White | `#FAFAFA` | Main light mode page background |
| **Light Surface**| Pure White | `#FFFFFF` | Material cards, dialogs, elevated containers |
| **Borders** | Border Gray | `#D1D5DB` | Clean structural borders and container dividers |
| **Typography** | Slate Primary | `#0F172A` / `#F8FAFC` | Headings and primary copy (Light / Dark) |
| | Slate Secondary| `#334155` / `#94A3B8` | Descriptions, subtitles, and metadata copy (Light / Dark) |

### Signature Gradients
- **Primary Gradient**: `#FF7A00 → #FF9A3D`
- **Google Gradient**: `#4285F4 → #34A853 → #FBBC05 → #EA4335`
- **Hero Ambient Gradient**: `#FFF1E6 → #FAFAFA → #E8F0FE`
- **Premium Dark Gradient**: `#0F172A → #1E293B → #334155`

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router), React 19, TypeScript 5.7 |
| **Styling** | Tailwind CSS 3.4, PostCSS, Autoprefixer |
| **Animation** | Framer Motion 12, Canvas Confetti |
| **Icons** | Lucide React |
| **Typography** | Inter, JetBrains Mono (`next/font/google`) |
| **Form Handling** | Next.js API Routes, Nodemailer (SMTP) |
| **Content Layer** | JSON data stores (`content/*.json`), Static Generation (SSG) |

---

## Project Structure

```text
ml-bhopal-website/
├── app/                  # Next.js App Router (49 SSG Routes, Layouts, API endpoints)
│   ├── about/            # Community background & manifesto
│   ├── ai-day/           # Flagship summit multi-edition portal
│   ├── ambassador/       # Campus Ambassador leadership funnel
│   ├── api/contact/      # Lead intake & anti-spam route handler
│   ├── campaigns/        # Developer sprints & cohort hubs ([slug] dynamic)
│   ├── contact/          # Ingestion form for inquiries & partnerships
│   ├── events/           # Gathering directory & detail views ([slug] dynamic)
│   ├── join/             # Community onboarding & member intake
│   ├── partners/         # Academic & enterprise partner directory
│   ├── resources/        # Engineering guides & cookbooks ([slug] dynamic)
│   └── team/             # Community leads & core team profiles
├── components/           # Reusable React UI & Motion components
│   ├── aiday/            # AI Day edition switcher & summit components
│   ├── campaigns/        # Campaign cards, session schedules, and milestones
│   ├── events/           # Event explorer, filters, cards, and sticky RSVP bar
│   ├── home/             # Homepage modules (Hero, Metrics, Pillars, Spotlight, CTA)
│   ├── layout/           # Header, Footer, Container, Section, Breadcrumbs
│   ├── motion/           # Motion primitives (ScrollReveal, Counters, MagneticButton)
│   ├── resources/        # Article reader, code blocks, and Table of Contents
│   ├── theme/            # ThemeProvider & dark/light ThemeToggle
│   └── ui/               # PrimaryButton, SecondaryButton, Badge, Tag, GoogleElement
├── content/              # Verified data stores (events, campaigns, resources, team, partners)
├── lib/                  # Data loaders (data.ts), types (types.ts), utilities (utils.ts)
└── public/               # Static assets, posters, icons, and social preview banners
```

---

## Getting Started

### Prerequisites
- **Node.js**: `v18.18.0` or higher (Node 20+ recommended)
- **npm** (included with Node.js)

### Installation
```bash
# 1. Clone repository
git clone https://github.com/ml-bhopal/website.git
cd website

# 2. Install dependencies
npm install

# 3. Setup environment variables (optional for local development)
cp .env.example .env.local

# 4. Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## Environment Variables

The application runs fully out-of-the-box in development mode without any environment variables required. Form submissions are saved locally to `content/submissions.json`.

To configure production email dispatch and Google Sheets webhooks, create `.env.local`:

```env
NOTIFICATION_EMAIL=contact@mlbhopal.tech
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-account@gmail.com
SMTP_PASS=your-app-password
```

See [`.env.example`](./.env.example) for complete field descriptions and setup instructions.

---

## Development & Build Commands

```bash
# Start local dev server (http://localhost:3000)
npm run dev

# Run TypeScript type check
npx tsc --noEmit

# Build production static application (49 routes)
npm run build

# Start production server locally
npm run start

# Run linter
npm run lint
```

---

## Documentation

For in-depth architecture specifications, guidelines, and history:
- [**PROJECT_DOCUMENTATION.md**](./PROJECT_DOCUMENTATION.md) — Comprehensive technical reference, design system specs, API endpoints, data models, and operational architecture.
- [**CONTRIBUTING.md**](./CONTRIBUTING.md) — Code style rules, PR process, design system DOs and DONTs, and motion guidelines.
- [**CHANGELOG.md**](./CHANGELOG.md) — Release notes and version history.

---

## Community & Channels

Connect with the community across official platforms:
- **Commudle Hub**: [commudle.com/communities/ml-bhopal](https://www.commudle.com/communities/ml-bhopal)
- **Luma Calendar**: [luma.com/user/mlbhopal](https://luma.com/user/mlbhopal)
- **LinkedIn**: [linkedin.com/company/ml-bhopal](https://www.linkedin.com/company/ml-bhopal)
- **X (Twitter)**: [@ml_bhopal](https://x.com/ml_bhopal)
- **GitHub**: [github.com/ml-bhopal](https://github.com/ml-bhopal)
- **Contact Email**: [contact@mlbhopal.tech](mailto:contact@mlbhopal.tech)

---

## Contributing

Contributions are welcomed! Whether you are fixing typos, improving accessibility, submitting an event update, or proposing a new technical guide, please check out our [Contributing Guidelines](./CONTRIBUTING.md) before opening a pull request.

---

## License

This repository is maintained as a private community codebase for ML Bhopal (`"private": true` in `package.json`). All rights reserved. Supported by Google for Developers.