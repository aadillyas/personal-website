# Aadil — Personal Website

Personal site. Builder-first personal brand. Single page, static, zero build step.

## Local Development

No build tools needed. Just open `index.html` in a browser, or run a local server for best results:

```bash
# Option 1: Python (usually pre-installed)
python3 -m http.server 3000

# Option 2: Node
npx serve .

# Option 3: VS Code
# Install "Live Server" extension → right-click index.html → Open with Live Server
```

Then visit `http://localhost:3000`.

## Adding Content

### New Project
Edit `data/projects.json` and add an object:
```json
{
  "id": "my-project",
  "title": "Project Name",
  "description": "One or two sentence description of what it does and why.",
  "status": "live",
  "tags": ["AI", "Web"],
  "url": "https://myproject.com",
  "github": "https://github.com/aadil/my-project",
  "year": 2025
}
```
Status options: `"live"` | `"in-progress"` | `"concept"`

### New Writing Post
Edit `data/writing.json` and add an object:
```json
{
  "id": "my-post",
  "title": "Post Title",
  "summary": "A short teaser that makes people want to click.",
  "date": "2025-06-01",
  "url": "https://yoursubstack.substack.com/p/my-post",
  "readingTime": "4 min"
}
```

### Updating Your Photo
Replace `assets/images/photo.jpg` with your headshot. Keep the filename. Recommended: square crop, minimum 400×400px.

### Updating Personal Details
Open `assets/js/main.js` and update the config block at the top:
```js
const CONFIG = {
  email: 'your@email.com',
  linkedin: 'https://linkedin.com/in/yourhandle',
  github: 'https://github.com/yourhandle',
  twitter: '',        // leave blank to hide
  substack: '',       // leave blank to hide
};
```

## Deployment (Vercel)

### First time setup
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Select this repo
4. Framework: **Other** (no framework)
5. Build command: leave blank
6. Output directory: leave blank (root)
7. Deploy

Every `git push` to `main` auto-deploys after that.

### Custom Domain
Vercel Dashboard → Your Project → Settings → Domains → Add domain.

## Upgrading the Contact Form

Currently the form uses `mailto:` which opens the user's email client. To handle submissions server-side:

1. Sign up at [formspree.io](https://formspree.io) (free tier works)
2. Create a form, get your endpoint URL
3. In `index.html`, find the `<form>` tag and change:
   - `action="mailto:..."` → `action="https://formspree.io/f/YOUR_ID"`
   - `method=""` → `method="POST"`
4. In `assets/js/main.js`, remove the `handleFormSubmit` function override

## Design Changes

All design decisions are documented in `DESIGN.md`. Read that before changing colors, fonts, or layout. Update the Decisions Log when you make a change.

## File Structure

```
personal-website/
├── CLAUDE.md              Agent instructions for AI-assisted development
├── DESIGN.md              Living design specification
├── README.md              This file
├── index.html             Main page
├── assets/
│   ├── css/style.css      All styles
│   ├── js/main.js         All interactivity
│   └── images/photo.jpg   Headshot
├── data/
│   ├── projects.json      Project cards (edit to add/remove projects)
│   └── writing.json       Writing cards (edit to add/remove posts)
└── components/            Reserved for future HTML partials
```
