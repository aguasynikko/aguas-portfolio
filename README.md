# Ynikko Arzee Neo Aguas — Portfolio

A personal portfolio built on the **Noir Executive** design system: strictly
monochrome, serif headlines, monospace labels, film grain, and slow reveals.

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Resend

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

Other scripts:

| Command             | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Dev server with hot reload            |
| `npm run build`     | Production build                      |
| `npm start`         | Serve the production build locally    |
| `npm run typecheck` | TypeScript, no emit                   |
| `npm run lint`      | ESLint                                |
| `npm run format`    | Prettier write                        |

---

## Environment variables

Copy `.env.example` to `.env.local`. Nothing here is required to *run* the
site — only the contact form needs configuring.

| Variable               | Required   | Notes                                                        |
| ---------------------- | ---------- | ------------------------------------------------------------ |
| `RESEND_API_KEY`       | For email  | Create at [resend.com/api-keys](https://resend.com/api-keys) |
| `CONTACT_TO_EMAIL`     | For email  | Where submissions are delivered                              |
| `CONTACT_FROM_EMAIL`   | Optional   | Defaults to Resend's shared `onboarding@resend.dev` sender    |
| `NEXT_PUBLIC_SITE_URL` | For deploy | No trailing slash. Drives canonical URLs, sitemap, OG images  |

Without `RESEND_API_KEY`, the form still validates and submits, but the API
returns a clear "not configured yet" message instead of failing silently.

**Sending from your own address** requires verifying a domain in Resend. Until
then the shared sender works fine — replies still go to whoever wrote in,
because the route sets `replyTo` to their address.

---

## ⚠️ Before you deploy

Open `data/resume.ts` and search for `TODO`. Each one is a value I could not
source from your CV:

1. **GitHub URL** — currently a guess (`github.com/ynikko-aguas`). A wrong link
   in the nav is worse than no link, so fix or delete this entry.
2. **"E-Portfolio" link** — your CV references one; point it somewhere real or
   remove the social entry.
3. **Publication co-authors** — only your name is listed. Citations are
   incomplete until the full author list is in, in citation order.
4. **Publication venues, DOIs, and IEEE Xplore links** — venues currently read
   just "IEEE". With no `doi`/`link`/`pdfUrl`, the Read Paper buttons simply
   don't render; Copy Citation still works.
5. **Publication abstracts** — written from your CV bullets. Swap in the real
   abstracts when convenient.
6. **Project demo and repo links** — none were on your CV, so no project card
   currently shows link buttons.
7. **Skill `level` / `years`** — my estimates. These drive the hover tooltips.

Two deliberate choices worth knowing about:

- **Your phone number is not rendered anywhere on the site.** It lives in
  `person.phone` and in the PDF, but public phone numbers get harvested by
  scrapers. To display it anyway, add it to the contact section yourself.
- **Your two IEEE papers appear in Publications only**, not in Projects, so a
  recruiter doesn't read the same kidney-CT work twice. The deployed
  Streamlit app *is* listed as a project, which is a different artifact.

---

## Updating your content

Everything lives in **`data/resume.ts`**. You should never need to edit a
component to change what the site says. Types are in `data/types.ts`, so a
mistake shows up as a TypeScript error rather than a broken page.

### Add a skill

```ts
// data/resume.ts → skills[]
{ name: "PyTorch", icon: "PyTorch", category: "AI & ML", level: "Proficient", years: 2 }
```

Then register the logo in `lib/icons.ts`:

```ts
import { SiPytorch } from "react-icons/si";
// ...
export const iconMap = {
  PyTorch: SiPytorch,
  // ...
};
```

**If the logo doesn't exist** in Simple Icons — or you just skip the `icon`
field — the tile automatically renders a monospace monogram instead ("PY").
That's the intended fallback, not a bug. `Matplotlib`, `FAISS`, `nnU-Net`,
`VS Code`, and `ChromaDB` all use it today, because Simple Icons has no mark
for them.

Categories come from the `SkillCategory` union in `data/types.ts`. Adding a new
one means adding it there and to `CATEGORY_ORDER` in
`components/sections/skills.tsx`, which controls display order.

### Add a project

```ts
// data/resume.ts → projects[]
{
  slug: "my-project",          // must be unique
  title: "My Project",
  year: "2026",
  blurb: "One sentence a recruiter reads in three seconds.",
  highlights: ["Metric-led bullet.", "Another one."],
  tech: ["Python", "React"],   // these feed the filter chips
  image: "/projects/my-project.webp",  // optional
  demo: "https://…",           // optional — button appears only if present
  repo: "https://…",           // optional
  featured: true,              // sorts to the front
}
```

Filter chips are generated automatically, and only appear for technologies used
by **more than one** project — so a filter never narrows to a single card.

**Images** are optional. Without one, the card draws a generated plate with the
project's initials and case number, which keeps the grid uniform. To add real
thumbnails, drop 16:10 images (WebP, ~1200×750) into `public/projects/`.
Screenshots of the Streamlit apps, Vault, and MyApt would all work well here.

### Add a publication

```ts
// data/resume.ts → publications[]
{
  id: "unique-id",
  title: "Paper Title",
  authors: ["Co Author", "Ynikko Arzee Neo Aguas"],  // citation order
  venue: "IEEE International Conference on …",
  publisher: "IEEE",
  year: 2026,
  type: "Conference",      // Journal | Conference | Preprint | Article | Thesis
  abstract: "…",
  highlights: ["…"],       // optional, shown inside the expanded abstract
  doi: "10.1109/XXXXX",    // optional
  link: "https://ieeexplore.ieee.org/document/…",  // optional
  pdfUrl: "/papers/my-paper.pdf",                  // optional
}
```

Your name is bolded in the author list by **exact string match** against
`person.name`. If it renders unbolded, the spelling differs somewhere.

Records sort newest-first automatically. The homepage shows the latest four;
the rest live at `/publications`, where a type filter appears once you have
more than one type. Copy Citation generates APA and BibTeX from these fields —
the more fields you fill, the more complete the citation.

### Change the rotating hero title

```ts
// data/resume.ts → person
title: "AI Engineer",      // canonical — SEO, OG image, JSON-LD. Never animates.
titles: ["AI Engineer", "Data Scientist", "Software Engineer"],
```

`titles` is what cycles in the hero; the first entry paints first and holds
longest. `title` is the single, stable string used for metadata — keeping them
separate means search results and share cards always say one thing.

To stop the rotation entirely, set `titles: ["AI Engineer"]`.

---

## Deploy to Vercel

1. Push this folder to a **new GitHub repository**.
2. At [vercel.com/new](https://vercel.com/new), import that repo. Vercel detects
   Next.js — no build settings to change.
3. Add the environment variables from `.env.example` under
   **Settings → Environment Variables**. Set `NEXT_PUBLIC_SITE_URL` to your real
   deployed URL (e.g. `https://ynikko.dev`), with no trailing slash.
4. Deploy. Every push to `main` ships automatically; pull requests get preview
   URLs.

**Analytics** work as soon as you enable them under the project's Analytics tab
— `@vercel/analytics` is already wired into the root layout.

**Custom domain:** add it under Settings → Domains, then update
`NEXT_PUBLIC_SITE_URL` and redeploy so canonical URLs, `sitemap.xml`, and the
Open Graph image all point at the right host.

---

## Project structure

```
app/
  layout.tsx              fonts, theme provider, grain, navbar/footer, JSON-LD
  page.tsx                homepage — composes all eight sections
  globals.css             design tokens, grain, spotlight, hero keyframes
  opengraph-image.tsx     generated 1200×630 share card
  sitemap.ts · robots.ts
  not-found.tsx           "No record found."
  publications/           full archive with type filter
  api/contact/route.ts    Resend handler — validation, honeypot, rate limit
components/
  layout/                 navbar, footer, theme toggle, grain overlay
  sections/               one file per homepage section
  ui/                     button, input, badge, tooltip, reveal, magnetic,
                          rotating-title, section, json-ld
data/
  resume.ts               ← all content lives here
  types.ts                the content model
lib/
  icons.ts                logo registry + monogram fallback
  citation.ts             APA and BibTeX formatting
  jsonld.ts               Person, WebSite, ScholarlyArticle schemas
  contact-schema.ts       Zod schema shared by client form and API route
public/
  ynikko-aguas.jpg · resume.pdf · projects/
```

## Notes on the implementation

**Accessibility.** Semantic landmarks throughout, a skip link, visible focus
rings on every interactive element, `aria-expanded`/`aria-controls` on the
abstract toggles and mobile menu, and `aria-pressed` on filter chips. Logo-only
tiles carry accessible names. Body text is #D4D4D4 on #0A0A0A (~13:1) and muted
text #8A8A8A (~6.3:1) — both clear WCAG AA.

**Motion.** `prefers-reduced-motion` is honored in two layers: a global CSS rule
collapses durations, and components branch on `useReducedMotion()`. With it on,
the hero title stops cycling and renders as a static dot-separated list rather
than disappearing.

**Performance.** The hero reveal is CSS keyframes, not Framer Motion, because
the headline is the LCP element — a JS-driven `initial` would serialize to
`opacity: 0` and stay invisible until hydration. The rotating title reserves the
widest string's width in a CSS grid cell, so cycling causes zero layout shift.
Icons are named imports so unused logos are tree-shaken.

**Contact security.** The Zod schema is shared between client and server, so
validation can't drift. The route adds a honeypot field, a per-IP rate limit
(3 per 10 minutes), and HTML-escapes all input before it reaches the email body.
The rate limit is per serverless instance — fine as a speed bump, but swap in
Upstash Redis if you ever need a real guarantee.

**MDX case studies** were scoped out. The spec listed them as optional, and
they'd need long-form writeups that don't exist yet; the highlight bullets carry
the cards on their own. If you want them later, the `Project` type already has a
`slug`, so adding `app/projects/[slug]/page.tsx` is straightforward.
