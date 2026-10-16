# Contributing to ML Bhopal

Thank you for your interest in contributing to the **ML Bhopal Platform**! We welcome code contributions, technical documentation, event data updates, and accessibility enhancements from community members, student ambassadors, and developers.

This guide provides guidelines and technical requirements to ensure that your contributions align with our design system, motion standards, accessibility targets, and performance budgets.

---

## 1. Code of Conduct & Ethos

- **Community-First**: Treat every contributor, attendee, and student with patience, warmth, and respect.
- **Code Over Slides**: Value production-tested, clean code over decorative fluff or speculative features.
- **Radical Openness**: Keep materials accessible, open-source, and free for the Central India developer ecosystem.

---

## 2. Development Setup

### Prerequisites
- **Node.js**: `v18.18.0` or higher (Node 20+ recommended)
- **Package Manager**: `npm` (packaged with Node.js)
- **Git**

### Installation
```bash
# 1. Fork and clone the repository
git clone https://github.com/ml-bhopal/website.git
cd website

# 2. Install dependencies
npm install

# 3. Set up environment variables (optional for local development)
cp .env.example .env.local

# 4. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 3. Branching & Commit Conventions

### Branch Naming
- `feat/feature-name`: New features or sections (e.g. `feat/event-calendar-export`)
- `fix/issue-description`: Bug fixes (e.g. `fix/mobile-menu-scroll-lock`)
- `docs/topic`: Documentation updates (e.g. `docs/api-guide`)
- `refactor/component-name`: Code cleanups without behavior changes
- `content/item-name`: Adding or modifying events, resources, or team entries

### Commit Messages
Follow Conventional Commits:
```
feat(events): add calendar ics export button
fix(navigation): prevent layout shift on mobile dropdown
docs(readme): update quickstart instructions
content(events): add nextgen apps 2026 meetup
```

---

## 4. Code Style & Architecture Conventions

### Architecture Rules
1. **Server Components by Default**:
   Keep pages (`page.tsx`) as React Server Components (RSC) whenever possible for optimal SEO and small client bundle sizes. Only add `"use client";` to interactive leaf components or motion wrappers.
2. **Path Aliases**:
   Always use `@/*` to reference root directories:
   - `@/components/*`
   - `@/lib/*`
   - `@/content/*`
   - `@/app/*`
3. **Icons**:
   Use `lucide-react` icons. Do not import third-party icon fonts or SVG packs.
4. **Styling**:
   Use Tailwind CSS utility classes adhering to the token system in `tailwind.config.ts`. Avoid arbitrary values (`w-[137px]`) unless strictly necessary for third-party embeds.

---

## 5. Design System Guidelines

ML Bhopal follows a **modern Google-inspired design language** based on Material Design 3 and Google Developer platforms.

### DO:
- Use semantic color tokens:
  - `bg-google-blue` (`#1A73E8`) for primary CTAs and interactive highlights.
  - `text-google-green` (`#34A853`) for success metrics, verified badges, and open calls.
  - `text-amber-700` / `bg-google-yellow` (`#FBBC04`) for warnings and tracks.
  - `text-google-red` (`#EA4335`) for alerts and critical dates.
- Use established surface radii:
  - `rounded-control` (8px) for buttons, inputs, chips, and small tags.
  - `rounded-card` (16px) for event, resource, and pillar cards.
  - `rounded-surface` (24px) for hero containers, large spotlight panels, and modals.
- Maintain high typography contrast:
  - `text-ink-primary` (`#202124`) for headings and primary titles.
  - `text-ink-secondary` (`#5F6368`) for body descriptions.
  - `text-ink-tertiary` (`#80868B`) for subtle dates and metadata.
  - `border-[#DADCE0]` for dividers and borders.

### DO NOT:
- Do NOT introduce unbranded neon gradients, purple shadows, or dark cyberpunk aesthetics.
- Do NOT create custom button components; always reuse `PrimaryButton` and `SecondaryButton`.
- Do NOT copy Google logos or brand marks directly (respect Google Developer community brand policies).
- Do NOT create inconsistent border radii on cards.

---

## 6. Motion & Animation Guidelines

Animation must communicate hierarchy, state, and interaction — never mere decoration.

### When to Animate:
- **Viewport Entrance**: Staggered grid cards and hero elements using `ScrollReveal` or `StaggerContainer`.
- **State Changes**: Collapsible accordions, active tab pill slides (`layoutId`), and filter transitions.
- **Physical Touch Feedback**: Button presses (`active:scale-[0.98]`) and card hover lifts (`hover:-translate-y-1`).

### When NOT to Animate:
- Avoid continuous looping rotations, glowing pulse borders, or visual distractions while users read text.
- Do not add animations longer than 650ms.

### Reduced Motion Requirement:
Every animation component **must** respect `prefers-reduced-motion`:
- For Framer Motion: Call `const shouldReduceMotion = useReducedMotion();` and zero out transforms and durations.
- For CSS: Rely on the universal override rule in `app/globals.css`.
- For Canvas: Set `disableForReducedMotion: true`.

---

## 7. Adding or Updating Content

All site content is strictly data-driven and lives in JSON files under `content/`:

| Content Type | File Location | Key Identifier |
| :--- | :--- | :--- |
| **Events** | `content/events.json` | `slug` (used in `/events/[slug]`) |
| **Campaigns** | `content/campaigns.json` | `slug` (used in `/campaigns/[slug]`) |
| **Resources** | `content/resources.json` | `slug` (used in `/resources/[slug]`) |
| **Team** | `content/team.json` | Array in `leads` or `core` |
| **Partners** | `content/partners.json` | Array in `current` or `past` |
| **Site Copy** | `content/site.json` | Section keys (`hero`, `about`, `faqs`, etc.) |

*Note: Never invent fake speakers, partners, or registration numbers. Keep metrics authentic to community records.*

---

## 8. Verification & Pull Request Checklist

Before submitting a Pull Request, run the following verification steps locally:

1. **Type Check**:
   ```bash
   npx tsc --noEmit
   ```
   *Must exit with code 0 (zero TypeScript errors).*

2. **Production Build**:
   ```bash
   npm run build
   ```
   *Must compile all 48 routes successfully without hydration errors or broken links.*

3. **Accessibility**:
   - Verify keyboard navigation using `Tab` and `Shift + Tab`.
   - Verify focus rings are visible (`focus-visible:ring-2 focus-visible:ring-google-blue`).
   - Ensure all interactive elements have accessible names and semantic markup.

4. **PR Description**:
   - Briefly describe what changed and why.
   - Attach screenshots or recordings for UI/motion modifications.
