# Design Specification — Aadil's Personal Website

> This is the living design source of truth. If something changes here, the site should reflect it. Claude agents should read this file before making any design decisions.

---

## Visual Identity

### Vibe
Warm & approachable personal brand. Feels handcrafted but polished. Not corporate, not startup-generic. Like a smart person's well-kept home.

### Typography
- **Display / Hero**: `Lora` (serif, Google Fonts) — used for name, section headings, and pull quotes. Gives warmth and editorial quality.
- **Body / UI**: `DM Sans` (sans-serif, Google Fonts) — clean, readable, modern without being cold.
- **Monospace accents**: `DM Mono` — used sparingly for tags, status badges, code snippets.

### Color Palette

#### Light Mode (default)
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#FAFAF8` | Page background (warm off-white, not pure white) |
| `--bg-subtle` | `#F2F1EE` | Card backgrounds, subtle sections |
| `--border` | `#E5E3DE` | Borders, dividers |
| `--text-primary` | `#1A1917` | Headings, primary text |
| `--text-secondary` | `#6B6860` | Secondary text, metadata |
| `--text-muted` | `#A8A49E` | Placeholders, tertiary info |
| `--accent` | `#D97757` | Terracotta — CTAs, highlights, hover states, active nav |
| `--accent-subtle` | `#FDF0EB` | Accent background tints |

#### Dark Mode
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#141412` | Page background |
| `--bg-subtle` | `#1E1D1B` | Card backgrounds |
| `--border` | `#2A2926` | Borders |
| `--text-primary` | `#F0EDE8` | Headings |
| `--text-secondary` | `#9A948C` | Secondary text |
| `--text-muted` | `#5A5650` | Tertiary |
| `--accent` | `#E08868` | Slightly lighter terracotta for dark bg |
| `--accent-subtle` | `#2A1F1A` | Accent tint on dark |

### Accent Color Rationale
Terracotta (`#D97757`) was chosen because:
- Warm, human, approachable — not a cold tech blue
- Distinctive without being loud
- Works on both light and dark backgrounds
- Feels intentional, not default

---

## Layout

### Structure
Single-page scrollable. Sections in order:
1. **Nav** — fixed top, logo/name left, links right, dark mode toggle
2. **Hero** — name, tagline, short bio, photo, social links
3. **Writing** — Substack post cards (data-driven from `data/writing.json`)
4. **Projects** — project cards (data-driven from `data/projects.json`)
5. **Work With Me** — AI advisory offering + contact form
6. **Footer** — minimal, name + socials

### Spacing System
- Base unit: `8px`
- Section padding: `120px` top/bottom on desktop, `64px` on mobile
- Max content width: `1100px`, centered
- Card gap: `24px`

### Responsive Breakpoints
- Mobile: `< 640px`
- Tablet: `640px – 1024px`
- Desktop: `> 1024px`

---

## Components

### Nav
- Fixed top, blurred glass background (`backdrop-filter: blur`)
- Scrolls into "compact" mode after 60px
- Active section highlighted in accent color
- Dark mode toggle: sun/moon icon, smooth transition
- Mobile: hamburger collapses to drawer

### Hero
- Two-column on desktop: text left, photo right
- Photo: circular crop, subtle shadow, slight warm tint overlay on hover
- Tagline: Lora italic, large — the one memorable line
- Social icons: LinkedIn, GitHub, (X/Twitter optional)

### Cards (Writing & Projects)
- Clean white/subtle background card
- Hover: lifts with shadow + slight translate Y
- Status badge on project cards (Live / In Progress / Concept)
- All data loaded from JSON — no hardcoded cards in HTML

### Contact Form
- Name, Email, Message fields
- Submits via `mailto:` (upgradeable to Formspree later)
- Fields animate border color to accent on focus

---

## Motion & Polish

### Scroll Animations
- Elements fade up into view as they enter the viewport
- Staggered delays on card grids (0ms, 100ms, 200ms per card)
- Implemented via `IntersectionObserver` — no library dependency

### Micro-interactions
- Nav links: underline slides in from left on hover
- Cards: smooth `transform: translateY(-4px)` on hover
- Dark mode toggle: rotates icon on switch
- Email copy button: brief "Copied!" confirmation state
- Form submit button: loading → success state

### Transitions
- Color/theme transitions: `200ms ease`
- Card hovers: `250ms ease`
- Page scroll: native smooth scroll via CSS

---

## Content Tone

### Hero Bio Direction
- **Builder first** — lead with what you make, not your job title
- Contrast with LinkedIn which leads professional/career story
- Short, punchy, first person
- Reference Colombo — it's part of who you are

### Writing Section
- Intro line: positions writing as thinking-out-loud, not content marketing

### Work With Me
- Warm, direct, no jargon
- Clear on what you offer: org-level AI assessment, upskilling, advisory
- Not "consulting" vibes — more like "let's figure this out together"

---

## Data Schema

### `data/projects.json`
```json
[
  {
    "id": "unique-slug",
    "title": "Project Name",
    "description": "One or two sentence description.",
    "status": "live | in-progress | concept",
    "tags": ["AI", "Sri Lanka"],
    "url": "https://...",          // optional
    "github": "https://...",       // optional
    "year": 2025
  }
]
```

### `data/writing.json`
```json
[
  {
    "id": "unique-slug",
    "title": "Post Title",
    "summary": "Short teaser, 1-2 sentences.",
    "date": "2025-01-15",
    "url": "https://substack.com/...",
    "readingTime": "5 min"
  }
]
```

---

## Deployment

- **Host**: Vercel
- **Repo**: GitHub (`personal-website`)
- **Deploy trigger**: push to `main` → auto-deploy
- **Custom domain**: plug in when ready via Vercel dashboard
- **No build step required** — pure HTML/CSS/JS, Vercel serves static files directly

---

## Decisions Log

| Date | Decision | Reason |
|---|---|---|
| 2025-04 | Single page over multi-page | Simpler to maintain, better for personal brand scale |
| 2025-04 | Pure HTML/CSS/JS over React/Next.js | No build step, easier to maintain, faster load |
| 2025-04 | Data-driven cards via JSON | Can add/remove projects/posts without touching HTML |
| 2025-04 | Terracotta accent | Warm, distinctive, on-brand — not a tech cliché |
| 2025-04 | Lora + DM Sans type pairing | Editorial warmth (Lora) + clean readability (DM Sans) |
| 2025-04 | No AI chat widget | Keep focus on content and feel, not features |
