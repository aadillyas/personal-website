# CLAUDE.md — Agent Instructions for personal-website

> Read this file first before making any changes to this project. This is the constitution.

---

## What This Project Is

A personal website for Aadil — Analytics Lead by day, builder by night, based in Colombo, Sri Lanka. The site is his primary public presence as a builder and thinker, separate from his LinkedIn which leads with the professional/career story.

**Key framing**: This site leads with the builder persona. Visitors should leave feeling like they've met someone who makes things, thinks deeply about AI, and is worth following.

---

## Before You Change Anything

1. **Read `DESIGN.md`** — all color, font, spacing, and component decisions live there. Do not deviate without updating DESIGN.md first.
2. **Check `data/`** — projects and writing are loaded from JSON. Adding content = editing JSON, not HTML.
3. **Do not hardcode content** that belongs in `data/projects.json` or `data/writing.json`.
4. **Preserve the modular structure** — each section in `index.html` is clearly commented and self-contained.

---

## File Map

```
personal-website/
├── CLAUDE.md              ← You are here
├── DESIGN.md              ← Design system, palette, decisions log
├── README.md              ← Setup & deploy instructions
├── index.html             ← Single page entry point
├── assets/
│   ├── css/
│   │   └── style.css      ← All styles, uses CSS variables from DESIGN.md
│   ├── js/
│   │   └── main.js        ← Scroll animations, dark mode, nav, form, card rendering
│   └── images/
│       └── photo.jpg      ← Headshot (replace with real photo, keep filename)
├── data/
│   ├── projects.json      ← Project cards data
│   └── writing.json       ← Substack post cards data
└── components/            ← Reserved for future HTML partials if needed
```

---

## Rules for Changes

### Adding a new project
→ Edit `data/projects.json` only. Follow the schema in `DESIGN.md`. Do not touch HTML or JS.

### Adding a new writing post
→ Edit `data/writing.json` only. Follow the schema in `DESIGN.md`.

### Changing colors
→ Update CSS variables in `assets/css/style.css` under `:root` and `[data-theme="dark"]`. Update `DESIGN.md` decisions log.

### Adding a new section
→ Add section HTML to `index.html` following the existing section comment pattern. Add nav link. Add scroll animation class. Update `DESIGN.md` structure.

### Changing the contact form
→ Currently uses `mailto:`. To upgrade to Formspree: replace the form `action` attribute and remove the `handleFormSubmit` JS function override. Update `README.md`.

---

## What NOT to Do

- Do not add external JS libraries without a strong reason (currently zero dependencies by design)
- Do not remove the `data-animate` scroll classes — they drive the entrance animations
- Do not change font families without updating `DESIGN.md` and checking both light/dark modes
- Do not hardcode the owner's email in multiple places — it's set once in `main.js` as `CONTACT_EMAIL`
- Do not break the dark mode by using hardcoded color values — always use CSS variables

---

## Owner Details (update as needed)

```
Name:        Aadil
Role:        Analytics Delivery Lead, Octave @ JKH
Location:    Colombo, Sri Lanka
Email:       [INSERT EMAIL]
LinkedIn:    [INSERT URL]
GitHub:      [INSERT URL]
Twitter/X:   [INSERT URL — optional]
Substack:    [INSERT URL — when live]
```

---

## Tech Stack

- Pure HTML5 / CSS3 / Vanilla JS — no framework, no build step
- Google Fonts: Lora + DM Sans (loaded in `<head>`)
- Hosted on Vercel via GitHub auto-deploy
- Data layer: static JSON files in `data/`

---

## Deployment

Push to `main` on GitHub → Vercel auto-deploys. No build command needed. Output directory is root `/`.

If adding a custom domain: Vercel Dashboard → Project → Settings → Domains.

---

## Decisions Already Made (don't revisit without good reason)

- Single page over multi-page routing
- No framework (plain HTML) for zero build complexity
- Terracotta accent color (`#D97757`) — warm, distinctive
- Lora serif for display, DM Sans for body
- JSON-driven cards for projects and writing
- No AI chat widget (decided against in initial scope)
- Dark mode via `data-theme` attribute on `<html>`, toggled by JS
