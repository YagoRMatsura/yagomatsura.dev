# Portfolio Website — Design Spec

**Owner:** Yago Matsura
**Domain:** yagomatsura.dev
**Date:** 2026-04-16
**Status:** Approved design, ready for implementation planning

---

## 1. Goal & Audience

Build a personal portfolio site that positions Yago — a dual law + computer science student transitioning from law into tech after a two-year Support Engineer internship at Atlassian — for **legal tech, IP law, and tech policy internships and early-career roles**.

The hybrid background (law + CS) is the differentiator and must be visible within the first five seconds of a page view. The site itself is a work sample: the codebase is public and the stack choices demonstrate technical competence.

**Primary audience:** recruiters and hiring managers at legal tech companies, IP-focused firms, and tech policy organizations. They skim on mobile between meetings; the site must communicate its full pitch in under 30 seconds without requiring any clicks.

**Secondary audience:** professors, collaborators, and anyone Googling Yago's name.

---

## 2. Information Architecture

Single-page home plus a dedicated blog area.

```
/                       Single-page home (PT default)
/en/                    Single-page home (EN)
/blog                   Blog listing (PT)
/blog/<slug>            Individual blog post (PT)
/en/blog                Blog listing (EN)
/en/blog/<slug>         Individual blog post (EN)
/resume.pdf             Static CV download
/rss.xml                RSS feed
/sitemap-index.xml      Sitemap (auto-generated)
404                     Custom 404 page
```

Both language variants are fully translated. Posts live in one language; when a translation exists, the two are linked via a `translationOf` frontmatter field.

---

## 3. Home Page Sections

Rendered as a single scrollable page with anchor-linked nav. Section order is optimized for recruiter skim: the Atlassian credential is surfaced before student projects because it carries more weight.

1. **Hero**
   - Name (large, typographic).
   - One-line pitch in the active language. PT: "Em transição para tecnologia, com base analítica no direito." EN: "Transitioning into tech, grounded in legal analysis."
   - Location tag: "Maringá · remote-ready".
   - Quick links: GitHub, LinkedIn, Email, CV (download).
   - Language toggle visible in the header nav.

2. **Experiência / Experience**
   - Card list, newest first.
   - **Atlassian** — Support Engineer Intern, Jun 2023 – Abr 2025 — expanded by default, highlights Apple and Warner Bros. Games clients.
   - **Softplan** — IT Analyst I + earlier intern role, 2021–2022 — expanded by default.
   - **Início no Direito / Early Career in Law** — collapsed block grouping Advog Empresarial, Serviço de Registro de Imóveis de Maringá, and Bellinati Perez (2018–2021). Expands on click.
   - Each card shows: company, role, dates, 2–4 bullet highlights, technology/skill chips.

3. **Projetos / Projects**
   - 3–6 curated project cards. Starts with whatever Yago has to showcase today; grows over time via MDX files.
   - Each card: title, one-line description, tech chips, GitHub link, live demo link (when applicable).
   - Responsive grid: 1 column mobile, 2 columns at ≥768px.
   - **Empty state (zero projects):** section renders a short placeholder ("Em breve · Coming soon") and a direct link to GitHub.

4. **Escritos / Writing** — teaser
   - Latest three blog post titles with date and estimated reading time.
   - "Ver todos →" / "See all →" link to `/blog` (or `/en/blog`).
   - **Empty state (zero posts):** section renders "Em breve · Coming soon" and is not linked to `/blog`.

5. **Sobre / About**
   - Narrative: the law-to-tech transition, why legal tech is the sweet spot, how the law background compounds with engineering skill.
   - Optional photo.
   - Education: Direito (Unicesumar, 2027) + Ciência da Computação (Uninter, 2028).
   - English proficiency badge: EF SET 74/100 (C2).
   - Technical skills grid: Git, Bitbucket, SQL, Linux, macOS, Docker, SSL/SSH/HTTP, Python, Bash, Jira, Scrum, Kanban.

6. **Contato / Contact**
   - Email: `yagomatsuraswe@gmail.com` (mailto link).
   - LinkedIn: `linkedin.com/in/yago-matsura/`.
   - GitHub: `github.com/YagoRMatsura`.
   - CV download button.
   - Minimal footer: copyright year, "Built with Astro · source on GitHub".

---

## 4. Blog Structure

### Listing page (`/blog`, `/en/blog`)

- Reverse-chronological list of posts in the currently active language.
- Each entry: title, publication date, reading time, 1-line excerpt, tag chips.
- No pagination until the post count exceeds 20.
- Language filter is implicit (posts in the other language live on the other language's route).

### Individual post (`/blog/<slug>`, `/en/blog/<slug>`)

- Title, publication date, auto-calculated reading time, language badge.
- MDX body with Shiki syntax highlighting.
- Previous / next post navigation at the bottom.
- Links back to GitHub and LinkedIn at the end (no social share buttons).
- If `translationOf` points to an existing post in the other language, show a small "Read in English" / "Ler em português" link near the title.

### Content model (MDX frontmatter)

```yaml
---
title: "Título do post"
date: 2026-04-16
lang: pt                  # 'pt' | 'en'
tags: ["legal-tech", "carreira"]
excerpt: "Resumo de uma linha…"
draft: false              # drafts hidden in production builds
translationOf: ""         # optional: slug of the same post in the other language
---
```

Enforced by a Zod schema on the `blog` content collection — invalid frontmatter fails the build.

### Authoring flow

1. Create `src/content/blog/<slug>.mdx` (PT) or `src/content/blog/en/<slug>.mdx` (EN).
2. Fill in frontmatter and body.
3. Commit and push. Vercel auto-deploys within 1–2 minutes.
4. No CMS or external service.

---

## 5. Visual System

### Typography

- **Inter** — variable font, weights 400 / 500 / 600 / 700. Used for all UI and body copy.
- **JetBrains Mono** — code blocks, tag chips, small labels, monospaced accents.
- Both fonts loaded via `@fontsource-variable/*` packages (self-hosted — no Google Fonts request).

Scale (approximate, Tailwind classes will pin exact values):

| Role | Size desktop | Size mobile | Weight |
|---|---|---|---|
| Hero name | 56px | 36px | 700 |
| Section heading | 32px | 24px | 600 |
| Card title | 20px | 18px | 600 |
| Body | 16px | 16px | 400 |
| Small label / tag | 12px | 12px | 500 mono |

Body line-height 1.65. Hero tracking slightly tighter (−0.02em).

### Color tokens

```
--bg               #0d0f13
--surface          #151923
--surface-hover    #1a1e27
--border           #1e222b
--text-primary     #e8eaf0
--text-secondary   #9aa0ab
--text-muted       #6b7280
--accent           #7aa2ff
--accent-hover     #9cb8ff
--success          #4ade80
```

All pairings checked for WCAG AA contrast at 16px body size.

### Spacing & layout

- Tailwind default spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px.
- Content max-width: 720–880px on desktop for a focused-reading feel.
- Mobile-first breakpoints: sm 640, md 768, lg 1024.
- No hamburger menu — the nav has ≤5 anchors and fits inline on mobile.

### Motion

- Fade-in on scroll for sections (Intersection Observer, ~300ms).
- No parallax, no fancy hover animations.
- `prefers-reduced-motion: reduce` disables all scroll-triggered motion.

### Accessibility

- WCAG AA contrast minimum.
- Semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>`, landmark roles).
- All interactive elements keyboard-navigable with visible focus rings.
- Alt text required on every image via Zod schema validation.
- Language attribute set on `<html>` per-route.

---

## 6. Component Inventory

Primitives, each with a single responsibility and a clear interface:

| Component | Responsibility | Inputs |
|---|---|---|
| `BaseLayout` | HTML shell, meta tags, fonts, nav, footer | title, description, lang, slot |
| `BlogPostLayout` | Article-specific layout with reading-time + prev/next | frontmatter, slot |
| `Nav` | Section anchors + language toggle | activeLang, currentPath |
| `LanguageToggle` | Swap between PT and EN routes | currentPath |
| `Hero` | Name, tagline, links | name, tagline, links[] |
| `ExperienceCard` | One role entry | company, role, dates, bullets[], chips[], expanded |
| `ProjectCard` | One project entry | title, description, stack[], githubUrl, demoUrl |
| `BlogPostTeaser` | List entry on `/blog` or home teaser | title, date, readingTime, excerpt, slug |
| `TagChip` | Tag label | label |
| `CodeBlock` | Shiki-rendered code (auto via MDX) | — |
| `Footer` | Minimal credits | — |

Each component lives in its own `.astro` file under `src/components/`. Components receive typed props; no component reads global state other than the active language, which is derived from the URL.

---

## 7. Tech Stack

| Concern | Choice |
|---|---|
| Framework | Astro v5 |
| Content | MDX via `@astrojs/mdx` |
| Styling | Tailwind CSS v4 |
| Type safety | TypeScript strict mode |
| Syntax highlighting | Shiki (bundled with Astro) |
| Fonts | Fontsource (Inter Variable + JetBrains Mono Variable) |
| Content validation | Zod schemas on Astro content collections |
| Sitemap | `@astrojs/sitemap` |
| RSS | `@astrojs/rss` |
| Analytics | Vercel Analytics |
| Hosting | Vercel (free tier) |
| CI | GitHub Actions (`astro check` on PR) |

### Repository structure

```
portfolio/
├── src/
│   ├── content/
│   │   ├── blog/              # PT posts (*.mdx)
│   │   │   └── en/            # EN posts (*.mdx)
│   │   ├── projects/          # Project case studies
│   │   └── experience/        # Company/role entries
│   ├── components/            # .astro components
│   ├── layouts/               # BaseLayout, BlogPostLayout
│   ├── pages/
│   │   ├── index.astro        # PT home
│   │   ├── blog/
│   │   │   ├── index.astro    # PT blog listing
│   │   │   └── [slug].astro   # PT blog post
│   │   └── en/
│   │       ├── index.astro    # EN home
│   │       └── blog/
│   │           ├── index.astro
│   │           └── [slug].astro
│   ├── i18n/
│   │   ├── pt.ts              # PT UI strings
│   │   └── en.ts              # EN UI strings
│   └── styles/
│       └── globals.css
├── public/
│   ├── resume.pdf
│   ├── og-image.png
│   └── favicon.svg
├── astro.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 8. i18n Strategy

- Default language: **Portuguese (pt)**, served at `/`.
- Secondary language: **English (en)**, served at `/en/`.
- Astro's built-in i18n routing handles the split.
- The `LanguageToggle` component maps the current PT path to its EN equivalent (or vice versa) and navigates there on click. If the target post does not exist, it falls back to the EN/PT home.
- Static UI strings live in `src/i18n/pt.ts` and `src/i18n/en.ts` as typed string records. Components read via a `t(key, lang)` helper.
- Blog posts carry a `lang` field; listing pages filter to the active language. The `translationOf` field optionally links to the counterpart post.

---

## 9. SEO & Sharing

- Per-page `<title>` and meta description.
- Open Graph meta tags on every page:
  - Home: single branded OG image (`/og-image.png`).
  - Blog posts: either a custom image via frontmatter `ogImage`, or the default branded image.
- JSON-LD `Person` schema on the home page (name, alternateName, url, sameAs for LinkedIn + GitHub).
- `robots.txt` allowing all crawlers.
- Sitemap and RSS feed linked from `<head>`.

---

## 10. Performance Targets

- Lighthouse ≥ 95 in all four categories on desktop and mobile.
- Largest Contentful Paint < 1s on wired connections.
- Cumulative Layout Shift = 0.
- Total JavaScript shipped < 10kb (Astro islands only for the language toggle; everything else is static HTML).
- Images served via Astro's built-in image optimization pipeline (AVIF/WebP with fallbacks).
- Fonts preloaded, `font-display: swap`.

---

## 11. Deployment & Domain

- GitHub repository, public, linked to Vercel.
- Every push to `main` triggers a production deploy.
- Every pull request gets a preview deployment with a unique URL.
- Custom domain `yagomatsura.dev` configured in Vercel:
  - `A` records at the domain registrar pointing to Vercel IPs (per Vercel docs at deploy time), or
  - `CNAME` for a subdomain pointing to `cname.vercel-dns.com`.
- Vercel handles TLS certificate issuance and renewal.
- `.gitignore` excludes `node_modules/`, `.astro/`, `dist/`, `.vercel/`, and `.superpowers/`.

### Developer workflow

```
npm install
npm run dev       # local dev at http://localhost:4321
npm run build     # production build
npm run preview   # preview the build locally
astro check       # typecheck + content-collection validation
```

### CI

A single GitHub Action runs on pull requests:

1. `npm ci`
2. `npm run build` (also runs `astro check` implicitly)
3. Block merge on failure.

No other automation — Vercel handles deploy previews and production deploys.

---

## 12. Success Criteria

The site is considered complete and ready to share publicly when all of the following hold:

- [ ] Site is live at `https://yagomatsura.dev` with valid TLS.
- [ ] Both `/` (PT) and `/en/` (EN) render the full home page with all six sections.
- [ ] Language toggle works from every route, landing on the counterpart route.
- [ ] Experience section displays Atlassian, Softplan, and the grouped law-internship block with expand/collapse.
- [ ] Projects and Writing sections render correctly with zero entries (empty-state copy) and with one or more entries.
- [ ] `/resume.pdf` downloads the provided CV.
- [ ] RSS feed validates; sitemap lists all pages.
- [ ] Lighthouse ≥ 95 on all four categories, mobile + desktop.
- [ ] WCAG AA contrast verified on all pages.
- [ ] Site is keyboard-navigable end to end with visible focus states.
- [ ] `prefers-reduced-motion: reduce` disables scroll-triggered animations.
- [ ] GitHub repo is public and linked from the footer.

---

## 13. Out of Scope (for v1)

To keep v1 shippable, the following are intentionally deferred:

- Comments on blog posts.
- Social share buttons.
- Newsletter signup.
- Full-text search across posts.
- Dynamic OG image generation.
- A CMS or admin interface.
- Unit tests (content-collection Zod validation and `astro check` cover v1's correctness needs).
- Dark/light theme toggle — the site ships dark-only.
- A landing page variant for specific recruiter campaigns.

Any of these can be added later as discrete follow-up work.
