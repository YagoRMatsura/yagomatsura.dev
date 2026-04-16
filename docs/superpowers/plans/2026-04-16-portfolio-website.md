# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a bilingual (PT primary, EN secondary) portfolio site for Yago Matsura at `yagomatsura.dev`, built with Astro + MDX + Tailwind CSS v4 and deployed on Vercel — positioned for legal tech / IP / tech policy recruiters.

**Architecture:** Single-page home with anchor-linked sections, plus a dedicated blog area at `/blog`. Astro content collections (typed with Zod) hold blog posts, projects, and experience entries. Astro's built-in i18n routing serves the PT default at `/` and EN at `/en/`. Near-zero JavaScript ships — only the language toggle is interactive.

**Tech Stack:** Astro v5, MDX, Tailwind CSS v4, TypeScript, Fontsource (Inter + JetBrains Mono), Shiki, `@astrojs/sitemap`, `@astrojs/rss`, Vercel hosting, GitHub Actions CI.

**Spec:** [`docs/superpowers/specs/2026-04-16-portfolio-website-design.md`](../specs/2026-04-16-portfolio-website-design.md)

**Working directory:** `/Users/yagomatsura/Projetos/opus47/`

---

## Reference: useful docs

- Astro v5: https://docs.astro.build
- Astro content collections: https://docs.astro.build/en/guides/content-collections/
- Astro i18n: https://docs.astro.build/en/guides/internationalization/
- Tailwind CSS v4: https://tailwindcss.com/docs/v4-beta
- Vercel Astro deploy: https://vercel.com/docs/frameworks/astro

---

## Phase 1 — Project scaffold

### Task 1: Initialize the Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `README.md`

- [ ] **Step 1: Initialize Astro with the minimal template**

Run from `/Users/yagomatsura/Projetos/opus47/`:

```bash
npm create astro@latest . -- --template minimal --typescript strict --install --no-git
```

Choose **"Yes"** if prompted about "directory is not empty" (the spec and plan files are in `docs/`, which we want to keep).

- [ ] **Step 2: Verify Astro scaffolded correctly**

Run:

```bash
npm run dev
```

Expected: dev server starts at `http://localhost:4321` and shows the default minimal Astro page. Stop it with Ctrl+C once verified.

- [ ] **Step 3: Create `.gitignore`**

Write `/Users/yagomatsura/Projetos/opus47/.gitignore`:

```
# dependencies
node_modules/

# build output
dist/
.astro/
.vercel/

# env
.env
.env.local
.env.production

# OS
.DS_Store

# editor
.vscode/
.idea/

# brainstorming workspace (local tooling, not source)
.superpowers/
```

- [ ] **Step 4: Initialize git repo and make first commit**

```bash
git init
git add .
git commit -m "chore: initial Astro scaffold"
```

- [ ] **Step 5: Sanity check**

Run `ls -la` and verify: `src/`, `public/`, `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `docs/` are all present.

---

### Task 2: Install integrations and set up Astro config

**Files:**
- Modify: `astro.config.mjs`
- Create/Modify: installs add to `package.json`

- [ ] **Step 1: Add MDX integration**

Run:

```bash
npx astro add mdx --yes
```

This installs `@astrojs/mdx` and updates `astro.config.mjs`.

- [ ] **Step 2: Add Tailwind CSS v4**

Run:

```bash
npm install tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Add sitemap integration**

Run:

```bash
npx astro add sitemap --yes
```

- [ ] **Step 4: Install RSS, fonts, and image helper packages**

Run:

```bash
npm install @astrojs/rss
npm install @fontsource-variable/inter @fontsource-variable/jetbrains-mono
npm install -D @astrojs/check typescript
```

- [ ] **Step 5: Write `astro.config.mjs`**

Replace the contents of `/Users/yagomatsura/Projetos/opus47/astro.config.mjs`:

```js
// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://yagomatsura.dev',

  integrations: [
    mdx(),
    sitemap(),
  ],

  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 6: Verify the config compiles**

Run:

```bash
npx astro check
```

Expected: no errors (there may be a warning about missing content — fine, we'll add content later).

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "chore: add MDX, Tailwind v4, sitemap, i18n, fonts"
```

---

## Phase 2 — Styling foundation

### Task 3: Define Tailwind theme and globals

**Files:**
- Create: `src/styles/globals.css`

- [ ] **Step 1: Write `src/styles/globals.css`**

Create `/Users/yagomatsura/Projetos/opus47/src/styles/globals.css`:

```css
@import "tailwindcss";

@import "@fontsource-variable/inter";
@import "@fontsource-variable/jetbrains-mono";

@theme {
  --color-bg: #0d0f13;
  --color-surface: #151923;
  --color-surface-hover: #1a1e27;
  --color-border: #1e222b;
  --color-text-primary: #e8eaf0;
  --color-text-secondary: #9aa0ab;
  --color-text-muted: #6b7280;
  --color-accent: #7aa2ff;
  --color-accent-hover: #9cb8ff;
  --color-success: #4ade80;

  --font-sans: "Inter Variable", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, "SF Mono", monospace;

  --tracking-hero: -0.02em;
}

/* Base resets */
html {
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
}

body {
  line-height: 1.65;
  min-height: 100vh;
}

/* Focus ring for keyboard navigation */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Section fade-in (only for users without reduced motion) */
@media (prefers-reduced-motion: no-preference) {
  .fade-in {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 400ms ease-out, transform 400ms ease-out;
  }
  .fade-in.is-visible {
    opacity: 1;
    transform: none;
  }
}

/* Shiki code block baseline (Astro's default) */
pre.astro-code {
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.6;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/globals.css
git commit -m "feat(style): add Tailwind theme, fonts, and global styles"
```

---

## Phase 3 — Content collections

### Task 4: Define content collections with Zod schemas

**Files:**
- Create: `src/content.config.ts`

- [ ] **Step 1: Write `src/content.config.ts`**

Create `/Users/yagomatsura/Projetos/opus47/src/content.config.ts`:

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(1),
    date: z.coerce.date(),
    lang: z.enum(['pt', 'en']),
    tags: z.array(z.string()).default([]),
    excerpt: z.string().min(1),
    draft: z.boolean().default(false),
    translationOf: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.object({
      pt: z.string().min(1),
      en: z.string().min(1),
    }),
    stack: z.array(z.string()).default([]),
    githubUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/experience' }),
  schema: z.object({
    company: z.string().min(1),
    role: z.object({
      pt: z.string().min(1),
      en: z.string().min(1),
    }),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    location: z.string().default('Remoto'),
    bullets: z.object({
      pt: z.array(z.string()),
      en: z.array(z.string()),
    }),
    chips: z.array(z.string()).default([]),
    group: z.enum(['tech', 'law']).default('tech'),
    order: z.number().default(0),
  }),
});

export const collections = { blog, projects, experience };
```

- [ ] **Step 2: Create empty content directories so globs resolve**

```bash
mkdir -p src/content/blog/en
mkdir -p src/content/projects
mkdir -p src/content/experience
```

- [ ] **Step 3: Run `astro check`**

```bash
npx astro check
```

Expected: passes with zero errors. It's fine that no content files exist yet.

- [ ] **Step 4: Commit**

```bash
git add src/content.config.ts src/content
git commit -m "feat(content): define blog, projects, experience collections"
```

---

## Phase 4 — i18n infrastructure

### Task 5: Create i18n dictionaries and helper

**Files:**
- Create: `src/i18n/pt.ts`, `src/i18n/en.ts`, `src/i18n/index.ts`

- [ ] **Step 1: Write `src/i18n/pt.ts`**

```ts
export const pt = {
  nav: {
    experience: 'Experiência',
    projects: 'Projetos',
    writing: 'Escritos',
    about: 'Sobre',
    contact: 'Contato',
    blog: 'Blog',
  },
  hero: {
    tagline: 'Em transição para tecnologia, com base analítica no direito.',
    location: 'Maringá · remote-ready',
    links: {
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'Email',
      cv: 'Currículo',
    },
  },
  sections: {
    experience: 'Experiência',
    projects: 'Projetos',
    writing: 'Escritos',
    about: 'Sobre',
    contact: 'Contato',
  },
  experience: {
    earlyCareerGroup: 'Início no Direito',
    earlyCareerNote: 'Estágios em advocacia e cartório (2018–2021).',
    present: 'presente',
    showMore: 'Ver mais',
    showLess: 'Ver menos',
  },
  projects: {
    viewGithub: 'GitHub',
    viewDemo: 'Demo',
    emptyState: 'Em breve',
    emptyCta: 'Ver GitHub',
  },
  writing: {
    viewAll: 'Ver todos →',
    readingTime: (min: number) => `${min} min de leitura`,
    emptyState: 'Em breve',
  },
  about: {
    englishLabel: 'Inglês',
    englishLevel: 'C2 Proficient (EF SET 74/100)',
    educationLabel: 'Educação',
    skillsLabel: 'Habilidades técnicas',
    concluding: (year: number) => `conclusão prevista em ${year}`,
  },
  contact: {
    emailLabel: 'Email',
    cvLabel: 'Baixar currículo (PDF)',
  },
  blog: {
    title: 'Blog',
    translationAvailable: 'Read in English →',
    readingTime: (min: number) => `${min} min de leitura`,
    prev: '← Anterior',
    next: 'Próximo →',
  },
  footer: {
    builtWith: 'Feito com Astro · código no GitHub',
  },
  notFound: {
    title: 'Página não encontrada',
    body: 'A página que você procurou não existe.',
    home: '← Voltar ao início',
  },
} as const;

export type Dict = typeof pt;
```

- [ ] **Step 2: Write `src/i18n/en.ts`**

```ts
import type { Dict } from './pt';

export const en: Dict = {
  nav: {
    experience: 'Experience',
    projects: 'Projects',
    writing: 'Writing',
    about: 'About',
    contact: 'Contact',
    blog: 'Blog',
  },
  hero: {
    tagline: 'Transitioning into tech, grounded in legal analysis.',
    location: 'Maringá · remote-ready',
    links: {
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'Email',
      cv: 'Resume',
    },
  },
  sections: {
    experience: 'Experience',
    projects: 'Projects',
    writing: 'Writing',
    about: 'About',
    contact: 'Contact',
  },
  experience: {
    earlyCareerGroup: 'Early career in law',
    earlyCareerNote: 'Internships at law firms and a notary registry (2018–2021).',
    present: 'present',
    showMore: 'Show more',
    showLess: 'Show less',
  },
  projects: {
    viewGithub: 'GitHub',
    viewDemo: 'Demo',
    emptyState: 'Coming soon',
    emptyCta: 'View GitHub',
  },
  writing: {
    viewAll: 'See all →',
    readingTime: (min: number) => `${min} min read`,
    emptyState: 'Coming soon',
  },
  about: {
    englishLabel: 'English',
    englishLevel: 'C2 Proficient (EF SET 74/100)',
    educationLabel: 'Education',
    skillsLabel: 'Technical skills',
    concluding: (year: number) => `expected ${year}`,
  },
  contact: {
    emailLabel: 'Email',
    cvLabel: 'Download resume (PDF)',
  },
  blog: {
    title: 'Blog',
    translationAvailable: 'Ler em português →',
    readingTime: (min: number) => `${min} min read`,
    prev: '← Previous',
    next: 'Next →',
  },
  footer: {
    builtWith: 'Built with Astro · source on GitHub',
  },
  notFound: {
    title: 'Page not found',
    body: 'The page you are looking for does not exist.',
    home: '← Back home',
  },
};
```

- [ ] **Step 3: Write `src/i18n/index.ts`**

```ts
import { pt, type Dict } from './pt';
import { en } from './en';

export type Lang = 'pt' | 'en';

const dictionaries: Record<Lang, Dict> = { pt, en };

export function t(lang: Lang): Dict {
  return dictionaries[lang];
}

/**
 * Extract the active language from a URL pathname.
 * `/en/anything` → 'en'. Everything else → 'pt'.
 */
export function langFromPath(pathname: string): Lang {
  return pathname.startsWith('/en/') || pathname === '/en' ? 'en' : 'pt';
}

/**
 * Map the current path to its counterpart in the other language.
 * Example: '/' ↔ '/en/', '/blog' ↔ '/en/blog'.
 * Blog-post slugs do NOT auto-translate — caller must verify existence
 * via `translationOf`. This helper only handles the route prefix.
 */
export function switchLangPath(pathname: string, target: Lang): string {
  const isEn = pathname.startsWith('/en/') || pathname === '/en';
  if (target === 'en') {
    if (isEn) return pathname;
    return pathname === '/' ? '/en/' : `/en${pathname}`;
  }
  // target === 'pt'
  if (!isEn) return pathname;
  const stripped = pathname.replace(/^\/en/, '');
  return stripped === '' ? '/' : stripped;
}

export type { Dict };
```

- [ ] **Step 4: Run `astro check`**

```bash
npx astro check
```

Expected: passes.

- [ ] **Step 5: Commit**

```bash
git add src/i18n
git commit -m "feat(i18n): add PT/EN dictionaries and helpers"
```

---

## Phase 5 — Layout primitives

### Task 6: Create BaseLayout

**Files:**
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Write `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/globals.css';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import type { Lang } from '../i18n';

interface Props {
  title: string;
  description: string;
  lang: Lang;
  ogImage?: string;
  /** When true, the page renders JSON-LD Person schema. Default: false. */
  includePersonSchema?: boolean;
}

const {
  title,
  description,
  lang,
  ogImage = '/og-image.png',
  includePersonSchema = false,
} = Astro.props;

const canonicalUrl = new URL(Astro.url.pathname, Astro.site).toString();
const ogImageUrl = new URL(ogImage, Astro.site).toString();
---
<!DOCTYPE html>
<html lang={lang === 'pt' ? 'pt-BR' : 'en'}>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="dark" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml" />
  <link rel="sitemap" href="/sitemap-index.xml" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content={ogImageUrl} />
  <meta property="og:locale" content={lang === 'pt' ? 'pt_BR' : 'en_US'} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImageUrl} />

  {includePersonSchema && (
    <script type="application/ld+json" set:html={JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Yago Matsura',
      url: 'https://yagomatsura.dev',
      sameAs: [
        'https://github.com/YagoRMatsura',
        'https://linkedin.com/in/yago-matsura/',
      ],
      jobTitle: lang === 'pt'
        ? 'Estudante de Direito e Ciência da Computação'
        : 'Law and Computer Science student',
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'Unicesumar' },
        { '@type': 'CollegeOrUniversity', name: 'Uninter' },
      ],
    })} />
  )}
</head>
<body class="bg-[var(--color-bg)] text-[var(--color-text-primary)]">
  <Nav lang={lang} currentPath={Astro.url.pathname} />
  <main id="main">
    <slot />
  </main>
  <Footer lang={lang} />

  <script>
    // Scroll-triggered fade-in for .fade-in elements
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced && 'IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            obs.unobserve(e.target);
          }
        }
      }, { threshold: 0.1 });
      document.querySelectorAll('.fade-in').forEach((el) => obs.observe(el));
    } else {
      // Reduced motion or no IO support: show immediately
      document.querySelectorAll('.fade-in').forEach((el) => el.classList.add('is-visible'));
    }
  </script>
</body>
</html>
```

Note: `Nav.astro` and `Footer.astro` are created in the next two tasks. `astro check` will error on their imports until those are in place — that's expected; we'll run the check at the end of Task 8.

---

### Task 7: Create Nav and LanguageToggle

**Files:**
- Create: `src/components/Nav.astro`, `src/components/LanguageToggle.astro`

- [ ] **Step 1: Write `src/components/LanguageToggle.astro`**

```astro
---
import { switchLangPath, type Lang } from '../i18n';

interface Props {
  lang: Lang;
  currentPath: string;
}

const { lang, currentPath } = Astro.props;

const ptHref = switchLangPath(currentPath, 'pt');
const enHref = switchLangPath(currentPath, 'en');
---
<div class="flex items-center gap-1 text-xs font-mono uppercase tracking-wider">
  <a
    href={ptHref}
    aria-current={lang === 'pt' ? 'true' : 'false'}
    class:list={[
      'px-2 py-1 rounded transition-colors',
      lang === 'pt'
        ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)]'
        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
    ]}
  >
    PT
  </a>
  <span class="text-[var(--color-text-muted)]">/</span>
  <a
    href={enHref}
    aria-current={lang === 'en' ? 'true' : 'false'}
    class:list={[
      'px-2 py-1 rounded transition-colors',
      lang === 'en'
        ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)]'
        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
    ]}
  >
    EN
  </a>
</div>
```

- [ ] **Step 2: Write `src/components/Nav.astro`**

```astro
---
import LanguageToggle from './LanguageToggle.astro';
import { t, type Lang } from '../i18n';

interface Props {
  lang: Lang;
  currentPath: string;
}

const { lang, currentPath } = Astro.props;
const dict = t(lang);

// On the home page, nav items are anchor links. Elsewhere, they link back to the home page anchors.
const homePath = lang === 'pt' ? '/' : '/en/';
const isHome = currentPath === '/' || currentPath === '/en/' || currentPath === '/en';

const anchors = [
  { href: `${isHome ? '' : homePath}#experience`, label: dict.nav.experience },
  { href: `${isHome ? '' : homePath}#projects`, label: dict.nav.projects },
  { href: `${isHome ? '' : homePath}#writing`, label: dict.nav.writing },
  { href: `${isHome ? '' : homePath}#about`, label: dict.nav.about },
  { href: `${isHome ? '' : homePath}#contact`, label: dict.nav.contact },
];
---
<header class="sticky top-0 z-50 backdrop-blur-md bg-[rgba(13,15,19,0.8)] border-b border-[var(--color-border)]">
  <nav class="max-w-[880px] mx-auto px-5 py-3 flex items-center justify-between gap-4">
    <a href={homePath} class="font-bold text-lg tracking-tight hover:text-[var(--color-accent)] transition-colors">
      Yago Matsura<span class="text-[var(--color-accent)]">.</span>
    </a>
    <div class="flex items-center gap-5">
      <ul class="hidden sm:flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
        {anchors.map(({ href, label }) => (
          <li>
            <a href={href} class="hover:text-[var(--color-text-primary)] transition-colors">{label}</a>
          </li>
        ))}
      </ul>
      <LanguageToggle lang={lang} currentPath={currentPath} />
    </div>
  </nav>
</header>
```

---

### Task 8: Create Footer and run verification

**Files:**
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Write `src/components/Footer.astro`**

```astro
---
import { t, type Lang } from '../i18n';

interface Props {
  lang: Lang;
}

const { lang } = Astro.props;
const dict = t(lang);
const year = new Date().getFullYear();
---
<footer class="border-t border-[var(--color-border)] mt-24 py-8">
  <div class="max-w-[880px] mx-auto px-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-[var(--color-text-muted)]">
    <p>© {year} Yago Matsura</p>
    <p>
      {dict.footer.builtWith.split('·')[0]}·
      <a
        href="https://github.com/YagoRMatsura/yagomatsura.dev"
        class="hover:text-[var(--color-text-primary)] transition-colors"
        rel="noopener"
      >
        {dict.footer.builtWith.split('·')[1]?.trim()}
      </a>
    </p>
  </div>
</footer>
```

- [ ] **Step 2: Replace default `src/pages/index.astro` with a minimal smoke test**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { t } from '../i18n';

const lang = 'pt' as const;
const dict = t(lang);
---
<BaseLayout title="Yago Matsura" description={dict.hero.tagline} lang={lang}>
  <div class="max-w-[880px] mx-auto px-5 py-12">
    <h1 class="text-4xl font-bold">Smoke test</h1>
    <p class="text-[var(--color-text-secondary)] mt-2">{dict.hero.tagline}</p>
  </div>
</BaseLayout>
```

- [ ] **Step 3: Run `astro check`**

```bash
npx astro check
```

Expected: passes with zero errors.

- [ ] **Step 4: Start dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:4321/`. Verify:
- Dark background renders correctly
- Nav shows "Yago Matsura." with language toggle and anchors
- Inter font loads (no serif fallback flash)
- Footer shows at the bottom
- No console errors

Stop server with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add src/layouts src/components src/pages/index.astro
git commit -m "feat(layout): add BaseLayout, Nav, LanguageToggle, Footer"
```

---

## Phase 6 — Section components

### Task 9: Create Hero component

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Write `src/components/Hero.astro`**

```astro
---
import { t, type Lang } from '../i18n';

interface Props {
  lang: Lang;
}

const { lang } = Astro.props;
const dict = t(lang);

const links = [
  { href: 'https://github.com/YagoRMatsura', label: dict.hero.links.github, external: true },
  { href: 'https://linkedin.com/in/yago-matsura/', label: dict.hero.links.linkedin, external: true },
  { href: 'mailto:yagomatsuraswe@gmail.com', label: dict.hero.links.email, external: false },
  { href: '/resume.pdf', label: dict.hero.links.cv, external: false },
];
---
<section class="fade-in py-20 sm:py-28">
  <div class="max-w-[880px] mx-auto px-5">
    <p class="text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-4">
      {dict.hero.location}
    </p>
    <h1 class="text-4xl sm:text-6xl font-bold tracking-[-0.02em] leading-[1.05] mb-6">
      Yago Matsura<span class="text-[var(--color-accent)]">.</span>
    </h1>
    <p class="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-[640px] leading-relaxed">
      {dict.hero.tagline}
    </p>
    <ul class="flex flex-wrap gap-x-5 gap-y-2 mt-8 text-sm">
      {links.map(({ href, label, external }) => (
        <li>
          <a
            href={href}
            class="text-[var(--color-text-primary)] hover:text-[var(--color-accent)] underline underline-offset-4 decoration-[var(--color-border)] hover:decoration-[var(--color-accent)] transition-colors"
            {...external ? { rel: 'noopener', target: '_blank' } : {}}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat(components): add Hero"
```

---

### Task 10: Create TagChip and ExperienceCard

**Files:**
- Create: `src/components/TagChip.astro`, `src/components/ExperienceCard.astro`

- [ ] **Step 1: Write `src/components/TagChip.astro`**

```astro
---
interface Props {
  label: string;
}
const { label } = Astro.props;
---
<span class="inline-block font-mono text-[11px] uppercase tracking-wider px-2 py-1 rounded border border-[var(--color-border)] text-[var(--color-text-secondary)]">
  {label}
</span>
```

- [ ] **Step 2: Write `src/components/ExperienceCard.astro`**

```astro
---
import TagChip from './TagChip.astro';
import { t, type Lang } from '../i18n';

interface Props {
  lang: Lang;
  company: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  location: string;
  bullets: string[];
  chips: string[];
  /** Start expanded? Default true. */
  defaultOpen?: boolean;
}

const {
  lang,
  company,
  role,
  startDate,
  endDate,
  location,
  bullets,
  chips,
  defaultOpen = true,
} = Astro.props;

const dict = t(lang);

const formatMonthYear = (d: Date) => {
  const months = lang === 'pt'
    ? ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
};

const dateRange = `${formatMonthYear(startDate)} – ${endDate ? formatMonthYear(endDate) : dict.experience.present}`;
---
<details class="group rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden" open={defaultOpen}>
  <summary class="cursor-pointer list-none p-5 flex items-start justify-between gap-4 hover:bg-[var(--color-surface-hover)] transition-colors">
    <div class="flex-1 min-w-0">
      <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 class="text-lg font-semibold">{company}</h3>
        <span class="text-sm text-[var(--color-text-secondary)]">· {role}</span>
      </div>
      <p class="text-xs font-mono text-[var(--color-text-muted)] mt-1">
        {dateRange} · {location}
      </p>
    </div>
    <span class="text-[var(--color-text-muted)] shrink-0 font-mono text-sm group-open:rotate-180 transition-transform">⌄</span>
  </summary>
  <div class="px-5 pb-5 pt-0">
    <ul class="space-y-2 text-sm text-[var(--color-text-secondary)] leading-relaxed list-disc list-outside pl-5">
      {bullets.map((b) => <li>{b}</li>)}
    </ul>
    {chips.length > 0 && (
      <div class="flex flex-wrap gap-2 mt-4">
        {chips.map((c) => <TagChip label={c} />)}
      </div>
    )}
  </div>
</details>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/TagChip.astro src/components/ExperienceCard.astro
git commit -m "feat(components): add TagChip and ExperienceCard"
```

---

### Task 11: Create ProjectCard

**Files:**
- Create: `src/components/ProjectCard.astro`

- [ ] **Step 1: Write `src/components/ProjectCard.astro`**

```astro
---
import TagChip from './TagChip.astro';
import { t, type Lang } from '../i18n';

interface Props {
  lang: Lang;
  title: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  demoUrl?: string;
}

const { lang, title, description, stack, githubUrl, demoUrl } = Astro.props;
const dict = t(lang);
---
<article class="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-5 flex flex-col gap-3 hover:border-[var(--color-accent)] transition-colors">
  <h3 class="text-lg font-semibold">{title}</h3>
  <p class="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1">{description}</p>
  {stack.length > 0 && (
    <div class="flex flex-wrap gap-2">
      {stack.map((s) => <TagChip label={s} />)}
    </div>
  )}
  {(githubUrl || demoUrl) && (
    <div class="flex gap-4 text-sm font-mono uppercase tracking-wider pt-1">
      {githubUrl && (
        <a href={githubUrl} rel="noopener" target="_blank" class="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">
          {dict.projects.viewGithub} →
        </a>
      )}
      {demoUrl && (
        <a href={demoUrl} rel="noopener" target="_blank" class="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">
          {dict.projects.viewDemo} →
        </a>
      )}
    </div>
  )}
</article>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectCard.astro
git commit -m "feat(components): add ProjectCard"
```

---

### Task 12: Create reading-time utility and BlogPostTeaser

**Files:**
- Create: `src/lib/reading-time.ts`, `src/components/BlogPostTeaser.astro`

- [ ] **Step 1: Write `src/lib/reading-time.ts`**

```ts
/**
 * Estimate reading time in minutes for prose text.
 * Assumes ~200 words per minute. Always returns at least 1.
 *
 * @example
 *   readingTimeMinutes("word ".repeat(400)) // → 2
 */
export function readingTimeMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
```

- [ ] **Step 2: Write `src/components/BlogPostTeaser.astro`**

```astro
---
import TagChip from './TagChip.astro';
import { t, type Lang } from '../i18n';

interface Props {
  lang: Lang;
  title: string;
  date: Date;
  readingTime: number;
  excerpt: string;
  tags: string[];
  href: string;
}

const { lang, title, date, readingTime, excerpt, tags, href } = Astro.props;
const dict = t(lang);

const dateStr = date.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});
---
<article class="py-5 border-b border-[var(--color-border)] last:border-b-0">
  <a href={href} class="block group">
    <div class="flex items-baseline gap-3 text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
      <time datetime={date.toISOString()}>{dateStr}</time>
      <span>·</span>
      <span>{dict.blog.readingTime(readingTime)}</span>
    </div>
    <h3 class="text-lg font-semibold group-hover:text-[var(--color-accent)] transition-colors">{title}</h3>
    <p class="text-sm text-[var(--color-text-secondary)] leading-relaxed mt-2">{excerpt}</p>
    {tags.length > 0 && (
      <div class="flex flex-wrap gap-2 mt-3">
        {tags.map((tg) => <TagChip label={tg} />)}
      </div>
    )}
  </a>
</article>
```

- [ ] **Step 3: Run `astro check`**

```bash
npx astro check
```

Expected: passes.

- [ ] **Step 4: Commit**

```bash
git add src/lib src/components/BlogPostTeaser.astro
git commit -m "feat(components): add reading-time util and BlogPostTeaser"
```

---

### Task 13: Create section wrapper + empty-state component

**Files:**
- Create: `src/components/Section.astro`, `src/components/EmptyState.astro`

- [ ] **Step 1: Write `src/components/Section.astro`**

```astro
---
interface Props {
  id: string;
  title: string;
}
const { id, title } = Astro.props;
---
<section id={id} class="fade-in py-12 sm:py-16">
  <div class="max-w-[880px] mx-auto px-5">
    <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight mb-8">{title}</h2>
    <slot />
  </div>
</section>
```

- [ ] **Step 2: Write `src/components/EmptyState.astro`**

```astro
---
interface Props {
  label: string;
  ctaLabel?: string;
  ctaHref?: string;
}
const { label, ctaLabel, ctaHref } = Astro.props;
---
<div class="rounded-lg border border-dashed border-[var(--color-border)] p-8 text-center">
  <p class="text-[var(--color-text-muted)] font-mono text-sm uppercase tracking-wider">{label}</p>
  {ctaLabel && ctaHref && (
    <a href={ctaHref} rel="noopener" target="_blank" class="inline-block mt-3 text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">
      {ctaLabel} →
    </a>
  )}
</div>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Section.astro src/components/EmptyState.astro
git commit -m "feat(components): add Section wrapper and EmptyState"
```

---

## Phase 7 — Assemble the home page

### Task 14: Build the PT home page

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/components/sections/AboutSection.astro`, `src/components/sections/ContactSection.astro`

- [ ] **Step 1: Write `src/components/sections/AboutSection.astro`**

```astro
---
import TagChip from '../TagChip.astro';
import Section from '../Section.astro';
import { t, type Lang } from '../../i18n';

interface Props {
  lang: Lang;
}
const { lang } = Astro.props;
const dict = t(lang);

const narrative = {
  pt: [
    'Estudante de Direito (Unicesumar) e Ciência da Computação (Uninter), atualmente em transição consolidada para tecnologia. Dois anos como Support Engineer na Atlassian, atendendo clientes como Apple e Warner Bros. Games, me deram a base técnica em Git, Linux, automação e troubleshooting.',
    'A formação jurídica não é um detour — é uma vantagem competitiva para legal tech, propriedade intelectual e tech policy, áreas onde entender direito e engenharia é raro e valioso.',
  ],
  en: [
    'Law (Unicesumar) and Computer Science (Uninter) dual-major student, currently transitioning into tech. Two years as a Support Engineer at Atlassian — serving clients like Apple and Warner Bros. Games — built my technical foundation in Git, Linux, automation, and deep troubleshooting.',
    'The law background is not a detour — it is a competitive edge for legal tech, IP, and tech policy, fields where understanding both law and engineering is rare and valuable.',
  ],
}[lang];

const skills = [
  'Git', 'Bitbucket', 'SQL', 'Linux', 'macOS', 'Docker',
  'SSL', 'SSH', 'HTTP', 'Python', 'Bash', 'Jira', 'Scrum', 'Kanban',
];

const education = [
  { name: 'Direito · Unicesumar', year: 2027 },
  { name: 'Ciência da Computação · Uninter', year: 2028 },
];
---
<Section id="about" title={dict.sections.about}>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div class="md:col-span-2 space-y-4 text-[var(--color-text-secondary)] leading-relaxed">
      {narrative.map((p) => <p>{p}</p>)}
    </div>
    <aside class="space-y-6 text-sm">
      <div>
        <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-2">{dict.about.englishLabel}</p>
        <p class="text-[var(--color-text-primary)]">{dict.about.englishLevel}</p>
      </div>
      <div>
        <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-2">{dict.about.educationLabel}</p>
        <ul class="space-y-1 text-[var(--color-text-secondary)]">
          {education.map((e) => <li>{e.name} <span class="text-[var(--color-text-muted)]">({dict.about.concluding(e.year)})</span></li>)}
        </ul>
      </div>
    </aside>
  </div>
  <div class="mt-10">
    <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-3">{dict.about.skillsLabel}</p>
    <div class="flex flex-wrap gap-2">
      {skills.map((s) => <TagChip label={s} />)}
    </div>
  </div>
</Section>
```

- [ ] **Step 2: Write `src/components/sections/ContactSection.astro`**

```astro
---
import Section from '../Section.astro';
import { t, type Lang } from '../../i18n';

interface Props { lang: Lang; }
const { lang } = Astro.props;
const dict = t(lang);

const links = [
  { label: dict.contact.emailLabel, href: 'mailto:yagomatsuraswe@gmail.com', text: 'yagomatsuraswe@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/yago-matsura/', text: 'linkedin.com/in/yago-matsura' },
  { label: 'GitHub', href: 'https://github.com/YagoRMatsura', text: 'github.com/YagoRMatsura' },
];
---
<Section id="contact" title={dict.sections.contact}>
  <ul class="space-y-4 text-sm sm:text-base">
    {links.map(({ label, href, text }) => (
      <li class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
        <span class="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)] w-24 shrink-0">{label}</span>
        <a href={href} rel="noopener" class="text-[var(--color-text-primary)] hover:text-[var(--color-accent)] underline underline-offset-4 decoration-[var(--color-border)] hover:decoration-[var(--color-accent)] transition-colors">{text}</a>
      </li>
    ))}
  </ul>
  <a
    href="/resume.pdf"
    class="inline-flex items-center gap-2 mt-8 rounded border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors"
  >
    ↓ {dict.contact.cvLabel}
  </a>
</Section>
```

- [ ] **Step 3: Rewrite `src/pages/index.astro` as the PT home**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import Section from '../components/Section.astro';
import ExperienceCard from '../components/ExperienceCard.astro';
import ProjectCard from '../components/ProjectCard.astro';
import BlogPostTeaser from '../components/BlogPostTeaser.astro';
import EmptyState from '../components/EmptyState.astro';
import AboutSection from '../components/sections/AboutSection.astro';
import ContactSection from '../components/sections/ContactSection.astro';
import { getCollection } from 'astro:content';
import { readingTimeMinutes } from '../lib/reading-time.ts';
import { t } from '../i18n';

const lang = 'pt' as const;
const dict = t(lang);

// Experience entries, newest first
const allExperience = (await getCollection('experience'))
  .sort((a, b) => b.data.startDate.getTime() - a.data.startDate.getTime());
const tech = allExperience.filter((e) => e.data.group === 'tech');
const law = allExperience.filter((e) => e.data.group === 'law');

// Projects — featured first, then by `order`
const projects = (await getCollection('projects'))
  .sort((a, b) =>
    Number(b.data.featured) - Number(a.data.featured) || a.data.order - b.data.order
  );

// Latest 3 blog posts in PT (excluding drafts in production)
const isProd = import.meta.env.PROD;
const allPosts = (await getCollection('blog'))
  .filter((p) => p.data.lang === 'pt')
  .filter((p) => !isProd || !p.data.draft)
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
const latestPosts = allPosts.slice(0, 3);

// Compute reading times
const latestWithTime = await Promise.all(latestPosts.map(async (p) => {
  const { body } = p;
  return { post: p, readingTime: readingTimeMinutes(body ?? '') };
}));
---
<BaseLayout
  title="Yago Matsura — Direito + Computação"
  description={dict.hero.tagline}
  lang={lang}
  includePersonSchema
>
  <Hero lang={lang} />

  <Section id="experience" title={dict.sections.experience}>
    <div class="space-y-3">
      {tech.map((e) => (
        <ExperienceCard
          lang={lang}
          company={e.data.company}
          role={e.data.role.pt}
          startDate={e.data.startDate}
          endDate={e.data.endDate}
          location={e.data.location}
          bullets={e.data.bullets.pt}
          chips={e.data.chips}
          defaultOpen={true}
        />
      ))}
      {law.length > 0 && (
        <details class="group rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
          <summary class="cursor-pointer list-none p-5 flex items-start justify-between gap-4 hover:bg-[var(--color-surface-hover)] transition-colors">
            <div>
              <h3 class="text-lg font-semibold">{dict.experience.earlyCareerGroup}</h3>
              <p class="text-sm text-[var(--color-text-secondary)] mt-1">{dict.experience.earlyCareerNote}</p>
            </div>
            <span class="text-[var(--color-text-muted)] font-mono text-sm group-open:rotate-180 transition-transform">⌄</span>
          </summary>
          <div class="px-5 pb-5 pt-0 space-y-3">
            {law.map((e) => (
              <ExperienceCard
                lang={lang}
                company={e.data.company}
                role={e.data.role.pt}
                startDate={e.data.startDate}
                endDate={e.data.endDate}
                location={e.data.location}
                bullets={e.data.bullets.pt}
                chips={e.data.chips}
                defaultOpen={false}
              />
            ))}
          </div>
        </details>
      )}
    </div>
  </Section>

  <Section id="projects" title={dict.sections.projects}>
    {projects.length === 0 ? (
      <EmptyState lang={lang} label={dict.projects.emptyState} ctaLabel={dict.projects.emptyCta} ctaHref="https://github.com/YagoRMatsura" />
    ) : (
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <ProjectCard
            lang={lang}
            title={p.data.title}
            description={p.data.description.pt}
            stack={p.data.stack}
            githubUrl={p.data.githubUrl}
            demoUrl={p.data.demoUrl}
          />
        ))}
      </div>
    )}
  </Section>

  <Section id="writing" title={dict.sections.writing}>
    {latestWithTime.length === 0 ? (
      <EmptyState lang={lang} label={dict.writing.emptyState} />
    ) : (
      <>
        <div>
          {latestWithTime.map(({ post, readingTime }) => (
            <BlogPostTeaser
              lang={lang}
              title={post.data.title}
              date={post.data.date}
              readingTime={readingTime}
              excerpt={post.data.excerpt}
              tags={post.data.tags}
              href={`/blog/${post.id}/`}
            />
          ))}
        </div>
        <p class="mt-6">
          <a href="/blog" class="font-mono text-sm uppercase tracking-wider text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">
            {dict.writing.viewAll}
          </a>
        </p>
      </>
    )}
  </Section>

  <AboutSection lang={lang} />
  <ContactSection lang={lang} />
</BaseLayout>
```

Note: the `<EmptyState>` component doesn't currently accept `lang`. I'll fix that by passing it through in the next step.

- [ ] **Step 4: Update `src/components/EmptyState.astro` to accept `lang` (unused but consistent API)**

Replace the file:

```astro
---
import type { Lang } from '../i18n';
interface Props {
  lang: Lang;
  label: string;
  ctaLabel?: string;
  ctaHref?: string;
}
const { label, ctaLabel, ctaHref } = Astro.props;
---
<div class="rounded-lg border border-dashed border-[var(--color-border)] p-8 text-center">
  <p class="text-[var(--color-text-muted)] font-mono text-sm uppercase tracking-wider">{label}</p>
  {ctaLabel && ctaHref && (
    <a href={ctaHref} rel="noopener" target="_blank" class="inline-block mt-3 text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">
      {ctaLabel} →
    </a>
  )}
</div>
```

- [ ] **Step 5: Run `astro check`**

```bash
npx astro check
```

Expected: passes. Content collections are empty, so most sections render their empty states.

- [ ] **Step 6: Visual check**

```bash
npm run dev
```

Open `http://localhost:4321/`. Verify:
- Hero renders with correct tagline and links
- Experience section shows empty state (no content yet — fine)
- Projects shows empty state with "Em breve · Ver GitHub"
- Writing shows empty state
- About renders with narrative, skills, education
- Contact renders with three link rows and CV button
- Nav anchors (#experience, etc.) scroll smoothly to sections

Stop with Ctrl+C.

- [ ] **Step 7: Commit**

```bash
git add src/pages/index.astro src/components
git commit -m "feat(home): assemble PT home page with all sections"
```

---

### Task 15: Build the EN home page

**Files:**
- Create: `src/pages/en/index.astro`

- [ ] **Step 1: Write `src/pages/en/index.astro`**

This is a near-duplicate of the PT home with `lang = 'en'` and EN-keyed content. Copy the entirety of `src/pages/index.astro` into `src/pages/en/index.astro`, then change:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Hero from '../../components/Hero.astro';
import Section from '../../components/Section.astro';
import ExperienceCard from '../../components/ExperienceCard.astro';
import ProjectCard from '../../components/ProjectCard.astro';
import BlogPostTeaser from '../../components/BlogPostTeaser.astro';
import EmptyState from '../../components/EmptyState.astro';
import AboutSection from '../../components/sections/AboutSection.astro';
import ContactSection from '../../components/sections/ContactSection.astro';
import { getCollection } from 'astro:content';
import { readingTimeMinutes } from '../../lib/reading-time.ts';
import { t } from '../../i18n';

const lang = 'en' as const;
const dict = t(lang);

const allExperience = (await getCollection('experience'))
  .sort((a, b) => b.data.startDate.getTime() - a.data.startDate.getTime());
const tech = allExperience.filter((e) => e.data.group === 'tech');
const law = allExperience.filter((e) => e.data.group === 'law');

const projects = (await getCollection('projects'))
  .sort((a, b) =>
    Number(b.data.featured) - Number(a.data.featured) || a.data.order - b.data.order
  );

const isProd = import.meta.env.PROD;
const allPosts = (await getCollection('blog'))
  .filter((p) => p.data.lang === 'en')
  .filter((p) => !isProd || !p.data.draft)
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
const latestPosts = allPosts.slice(0, 3);

const latestWithTime = await Promise.all(latestPosts.map(async (p) => ({
  post: p,
  readingTime: readingTimeMinutes(p.body ?? ''),
})));
---
<BaseLayout
  title="Yago Matsura — Law + Computer Science"
  description={dict.hero.tagline}
  lang={lang}
  includePersonSchema
>
  <Hero lang={lang} />

  <Section id="experience" title={dict.sections.experience}>
    <div class="space-y-3">
      {tech.map((e) => (
        <ExperienceCard
          lang={lang}
          company={e.data.company}
          role={e.data.role.en}
          startDate={e.data.startDate}
          endDate={e.data.endDate}
          location={e.data.location}
          bullets={e.data.bullets.en}
          chips={e.data.chips}
          defaultOpen={true}
        />
      ))}
      {law.length > 0 && (
        <details class="group rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
          <summary class="cursor-pointer list-none p-5 flex items-start justify-between gap-4 hover:bg-[var(--color-surface-hover)] transition-colors">
            <div>
              <h3 class="text-lg font-semibold">{dict.experience.earlyCareerGroup}</h3>
              <p class="text-sm text-[var(--color-text-secondary)] mt-1">{dict.experience.earlyCareerNote}</p>
            </div>
            <span class="text-[var(--color-text-muted)] font-mono text-sm group-open:rotate-180 transition-transform">⌄</span>
          </summary>
          <div class="px-5 pb-5 pt-0 space-y-3">
            {law.map((e) => (
              <ExperienceCard
                lang={lang}
                company={e.data.company}
                role={e.data.role.en}
                startDate={e.data.startDate}
                endDate={e.data.endDate}
                location={e.data.location}
                bullets={e.data.bullets.en}
                chips={e.data.chips}
                defaultOpen={false}
              />
            ))}
          </div>
        </details>
      )}
    </div>
  </Section>

  <Section id="projects" title={dict.sections.projects}>
    {projects.length === 0 ? (
      <EmptyState lang={lang} label={dict.projects.emptyState} ctaLabel={dict.projects.emptyCta} ctaHref="https://github.com/YagoRMatsura" />
    ) : (
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <ProjectCard
            lang={lang}
            title={p.data.title}
            description={p.data.description.en}
            stack={p.data.stack}
            githubUrl={p.data.githubUrl}
            demoUrl={p.data.demoUrl}
          />
        ))}
      </div>
    )}
  </Section>

  <Section id="writing" title={dict.sections.writing}>
    {latestWithTime.length === 0 ? (
      <EmptyState lang={lang} label={dict.writing.emptyState} />
    ) : (
      <>
        <div>
          {latestWithTime.map(({ post, readingTime }) => (
            <BlogPostTeaser
              lang={lang}
              title={post.data.title}
              date={post.data.date}
              readingTime={readingTime}
              excerpt={post.data.excerpt}
              tags={post.data.tags}
              href={`/en/blog/${post.id.replace(/^en\//, '')}/`}
            />
          ))}
        </div>
        <p class="mt-6">
          <a href="/en/blog" class="font-mono text-sm uppercase tracking-wider text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">
            {dict.writing.viewAll}
          </a>
        </p>
      </>
    )}
  </Section>

  <AboutSection lang={lang} />
  <ContactSection lang={lang} />
</BaseLayout>
```

- [ ] **Step 2: Run `astro check`**

```bash
npx astro check
```

Expected: passes.

- [ ] **Step 3: Visual check**

```bash
npm run dev
```

Open `http://localhost:4321/en/`. Verify all English strings render correctly. Toggle to PT and back via the header. Verify the toggle lands on the right counterpart page.

Stop with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add src/pages/en
git commit -m "feat(home): add EN home page"
```

---

## Phase 8 — Blog

### Task 16: Create BlogPostLayout

**Files:**
- Create: `src/layouts/BlogPostLayout.astro`

- [ ] **Step 1: Write `src/layouts/BlogPostLayout.astro`**

```astro
---
import BaseLayout from './BaseLayout.astro';
import TagChip from '../components/TagChip.astro';
import { t, type Lang } from '../i18n';

interface Props {
  lang: Lang;
  title: string;
  date: Date;
  readingTime: number;
  tags: string[];
  excerpt: string;
  ogImage?: string;
  /** Path to the counterpart post in the other language (if any). */
  translationHref?: string;
  /** Prev/next navigation. */
  prev?: { href: string; title: string };
  next?: { href: string; title: string };
}

const {
  lang,
  title,
  date,
  readingTime,
  tags,
  excerpt,
  ogImage,
  translationHref,
  prev,
  next,
} = Astro.props;

const dict = t(lang);
const dateStr = date.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
---
<BaseLayout title={title} description={excerpt} lang={lang} ogImage={ogImage}>
  <article class="max-w-[720px] mx-auto px-5 py-12">
    <header class="mb-10">
      <div class="flex items-baseline gap-3 text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
        <time datetime={date.toISOString()}>{dateStr}</time>
        <span>·</span>
        <span>{dict.blog.readingTime(readingTime)}</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15]">{title}</h1>
      {tags.length > 0 && (
        <div class="flex flex-wrap gap-2 mt-5">
          {tags.map((tg) => <TagChip label={tg} />)}
        </div>
      )}
      {translationHref && (
        <p class="mt-5">
          <a href={translationHref} class="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">
            {dict.blog.translationAvailable}
          </a>
        </p>
      )}
    </header>
    <div class="prose-article">
      <slot />
    </div>
    <hr class="my-12 border-[var(--color-border)]" />
    <nav class="flex items-center justify-between gap-4 text-sm">
      {prev ? (
        <a href={prev.href} class="flex flex-col gap-1 hover:text-[var(--color-accent)] transition-colors max-w-[48%]">
          <span class="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{dict.blog.prev}</span>
          <span>{prev.title}</span>
        </a>
      ) : <span />}
      {next ? (
        <a href={next.href} class="flex flex-col gap-1 items-end text-right hover:text-[var(--color-accent)] transition-colors max-w-[48%]">
          <span class="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{dict.blog.next}</span>
          <span>{next.title}</span>
        </a>
      ) : <span />}
    </nav>
  </article>
</BaseLayout>

<style is:global>
  .prose-article { color: var(--color-text-secondary); line-height: 1.75; font-size: 1.0625rem; }
  .prose-article h2 { color: var(--color-text-primary); font-size: 1.5rem; font-weight: 600; margin-top: 2.5rem; margin-bottom: 1rem; letter-spacing: -0.01em; }
  .prose-article h3 { color: var(--color-text-primary); font-size: 1.25rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem; }
  .prose-article p { margin-bottom: 1.25rem; }
  .prose-article a { color: var(--color-accent); text-decoration: underline; text-underline-offset: 3px; }
  .prose-article a:hover { color: var(--color-accent-hover); }
  .prose-article ul, .prose-article ol { padding-left: 1.5rem; margin-bottom: 1.25rem; }
  .prose-article li { margin-bottom: 0.5rem; }
  .prose-article code:not(pre code) { background: var(--color-surface); padding: 2px 6px; border-radius: 4px; font-size: 0.875em; color: var(--color-text-primary); }
  .prose-article blockquote { border-left: 2px solid var(--color-accent); padding-left: 1rem; margin: 1.5rem 0; color: var(--color-text-secondary); font-style: italic; }
  .prose-article img { border-radius: 8px; margin: 1.5rem 0; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/BlogPostLayout.astro
git commit -m "feat(blog): add BlogPostLayout"
```

---

### Task 17: Blog listing pages (PT + EN)

**Files:**
- Create: `src/pages/blog/index.astro`, `src/pages/en/blog/index.astro`

- [ ] **Step 1: Write `src/pages/blog/index.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BlogPostTeaser from '../../components/BlogPostTeaser.astro';
import EmptyState from '../../components/EmptyState.astro';
import { getCollection } from 'astro:content';
import { readingTimeMinutes } from '../../lib/reading-time.ts';
import { t } from '../../i18n';

const lang = 'pt' as const;
const dict = t(lang);

const isProd = import.meta.env.PROD;
const posts = (await getCollection('blog'))
  .filter((p) => p.data.lang === 'pt')
  .filter((p) => !isProd || !p.data.draft)
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

const postsWithTime = posts.map((p) => ({
  post: p,
  readingTime: readingTimeMinutes(p.body ?? ''),
}));
---
<BaseLayout title="Blog — Yago Matsura" description="Ensaios sobre direito, tecnologia e a interseção." lang={lang}>
  <div class="max-w-[720px] mx-auto px-5 py-12">
    <h1 class="text-3xl sm:text-4xl font-bold tracking-tight mb-10">{dict.blog.title}</h1>
    {postsWithTime.length === 0 ? (
      <EmptyState lang={lang} label={dict.writing.emptyState} />
    ) : (
      <div>
        {postsWithTime.map(({ post, readingTime }) => (
          <BlogPostTeaser
            lang={lang}
            title={post.data.title}
            date={post.data.date}
            readingTime={readingTime}
            excerpt={post.data.excerpt}
            tags={post.data.tags}
            href={`/blog/${post.id}/`}
          />
        ))}
      </div>
    )}
  </div>
</BaseLayout>
```

- [ ] **Step 2: Write `src/pages/en/blog/index.astro`**

```astro
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import BlogPostTeaser from '../../../components/BlogPostTeaser.astro';
import EmptyState from '../../../components/EmptyState.astro';
import { getCollection } from 'astro:content';
import { readingTimeMinutes } from '../../../lib/reading-time.ts';
import { t } from '../../../i18n';

const lang = 'en' as const;
const dict = t(lang);

const isProd = import.meta.env.PROD;
const posts = (await getCollection('blog'))
  .filter((p) => p.data.lang === 'en')
  .filter((p) => !isProd || !p.data.draft)
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

const postsWithTime = posts.map((p) => ({
  post: p,
  readingTime: readingTimeMinutes(p.body ?? ''),
}));
---
<BaseLayout title="Blog — Yago Matsura" description="Essays on law, technology, and the intersection." lang={lang}>
  <div class="max-w-[720px] mx-auto px-5 py-12">
    <h1 class="text-3xl sm:text-4xl font-bold tracking-tight mb-10">{dict.blog.title}</h1>
    {postsWithTime.length === 0 ? (
      <EmptyState lang={lang} label={dict.writing.emptyState} />
    ) : (
      <div>
        {postsWithTime.map(({ post, readingTime }) => (
          <BlogPostTeaser
            lang={lang}
            title={post.data.title}
            date={post.data.date}
            readingTime={readingTime}
            excerpt={post.data.excerpt}
            tags={post.data.tags}
            href={`/en/blog/${post.id.replace(/^en\//, '')}/`}
          />
        ))}
      </div>
    )}
  </div>
</BaseLayout>
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/blog src/pages/en/blog
git commit -m "feat(blog): add PT and EN blog listing pages"
```

---

### Task 18: Individual blog post routes (PT + EN)

**Files:**
- Create: `src/pages/blog/[...slug].astro`, `src/pages/en/blog/[...slug].astro`

- [ ] **Step 1: Write `src/pages/blog/[...slug].astro`**

```astro
---
import BlogPostLayout from '../../layouts/BlogPostLayout.astro';
import { getCollection, render } from 'astro:content';
import { readingTimeMinutes } from '../../lib/reading-time.ts';
import type { GetStaticPaths } from 'astro';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  // PT posts: ids that do NOT start with "en/"
  const ptPosts = posts.filter((p) => p.data.lang === 'pt');
  const sorted = ptPosts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return sorted.map((post, i) => ({
    params: { slug: post.id },
    props: {
      post,
      prev: sorted[i + 1] ?? null,  // older post = "previous" in chronological reading
      next: sorted[i - 1] ?? null,
    },
  }));
};

const { post, prev, next } = Astro.props;
const { Content } = await render(post);

const readingTime = readingTimeMinutes(post.body ?? '');

// If translation exists (post with matching `translationOf` in EN), build its href.
let translationHref: string | undefined;
if (post.data.translationOf) {
  translationHref = `/en/blog/${post.data.translationOf}/`;
}

const prevNav = prev ? { href: `/blog/${prev.id}/`, title: prev.data.title } : undefined;
const nextNav = next ? { href: `/blog/${next.id}/`, title: next.data.title } : undefined;
---
<BlogPostLayout
  lang="pt"
  title={post.data.title}
  date={post.data.date}
  readingTime={readingTime}
  tags={post.data.tags}
  excerpt={post.data.excerpt}
  ogImage={post.data.ogImage}
  translationHref={translationHref}
  prev={prevNav}
  next={nextNav}
>
  <Content />
</BlogPostLayout>
```

- [ ] **Step 2: Write `src/pages/en/blog/[...slug].astro`**

```astro
---
import BlogPostLayout from '../../../layouts/BlogPostLayout.astro';
import { getCollection, render } from 'astro:content';
import { readingTimeMinutes } from '../../../lib/reading-time.ts';
import type { GetStaticPaths } from 'astro';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  const enPosts = posts.filter((p) => p.data.lang === 'en');
  const sorted = enPosts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return sorted.map((post, i) => ({
    // Strip leading "en/" from the id when building the URL param
    params: { slug: post.id.replace(/^en\//, '') },
    props: {
      post,
      prev: sorted[i + 1] ?? null,
      next: sorted[i - 1] ?? null,
    },
  }));
};

const { post, prev, next } = Astro.props;
const { Content } = await render(post);
const readingTime = readingTimeMinutes(post.body ?? '');

let translationHref: string | undefined;
if (post.data.translationOf) {
  translationHref = `/blog/${post.data.translationOf}/`;
}

const prevNav = prev ? { href: `/en/blog/${prev.id.replace(/^en\//, '')}/`, title: prev.data.title } : undefined;
const nextNav = next ? { href: `/en/blog/${next.id.replace(/^en\//, '')}/`, title: next.data.title } : undefined;
---
<BlogPostLayout
  lang="en"
  title={post.data.title}
  date={post.data.date}
  readingTime={readingTime}
  tags={post.data.tags}
  excerpt={post.data.excerpt}
  ogImage={post.data.ogImage}
  translationHref={translationHref}
  prev={prevNav}
  next={nextNav}
>
  <Content />
</BlogPostLayout>
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/blog/\[...slug\].astro src/pages/en/blog/\[...slug\].astro
git commit -m "feat(blog): add PT and EN individual blog post routes"
```

---

## Phase 9 — Seed content

### Task 19: Seed experience entries

**Files:**
- Create: `src/content/experience/atlassian.mdx`, `src/content/experience/softplan-analyst.mdx`, `src/content/experience/softplan-intern.mdx`, `src/content/experience/advog-empresarial.mdx`, `src/content/experience/cartorio-imoveis.mdx`, `src/content/experience/bellinati-perez.mdx`

- [ ] **Step 1: Write `src/content/experience/atlassian.mdx`**

```mdx
---
company: Atlassian
role:
  pt: "Support Engineer Intern"
  en: "Support Engineer Intern"
startDate: 2023-06-01
endDate: 2025-04-30
location: Remoto
group: tech
order: 1
chips:
  - Git
  - Bitbucket
  - Linux
  - macOS
  - Docker
  - Python
  - Bash
  - Jira
bullets:
  pt:
    - "Suporte técnico especializado para Bitbucket e sistemas de controle de versão para clientes corporativos como Apple e Warner Bros. Games."
    - "Troubleshooting e análise de causa raiz em Linux e macOS, investigando incidentes com Git, Docker, SQL, SSL, SSH, HTTP e automações em Python e Bash."
    - "Gerenciei filas de atendimento e documentação técnica no Jira, colaborando com times globais de engenharia e produto."
    - "Chamadas técnicas em inglês com clientes internacionais, traduzindo problemas complexos em ações objetivas de resolução."
  en:
    - "Specialized technical support for Bitbucket and version control systems for enterprise clients including Apple and Warner Bros. Games."
    - "Root-cause analysis and troubleshooting on Linux and macOS, investigating incidents involving Git, Docker, SQL, SSL, SSH, HTTP, and Python/Bash automation."
    - "Managed support queues and technical documentation in Jira, collaborating with global engineering and product teams."
    - "Conducted technical calls in English with international clients, translating complex problems into clear remediation actions."
---
```

- [ ] **Step 2: Write `src/content/experience/softplan-analyst.mdx`**

```mdx
---
company: Softplan
role:
  pt: "Analista de TI I"
  en: "IT Analyst I"
startDate: 2021-08-01
endDate: 2022-02-28
location: Remoto
group: tech
order: 2
chips:
  - SQL
  - "Log analysis"
  - Scrum
  - Kanban
bullets:
  pt:
    - "Suporte N2 com investigação de chamados via consultas em banco de dados, análise de logs e entendimento jurídico-funcional da plataforma SAJ."
    - "Apoio à resolução de problemas com metodologias ágeis (Kanban, Scrum, OKRs)."
    - "Conexão de contexto técnico e regras de negócio para agilizar diagnósticos."
  en:
    - "L2 support investigating tickets via database queries, log analysis, and functional understanding of the SAJ legal platform."
    - "Drove issue resolution using agile methodologies (Kanban, Scrum, OKRs)."
    - "Bridged technical context and business rules to accelerate diagnostics."
---
```

- [ ] **Step 3: Write `src/content/experience/softplan-intern.mdx`**

```mdx
---
company: Softplan
role:
  pt: "Estagiário"
  en: "Intern"
startDate: 2021-05-01
endDate: 2021-08-01
location: Remoto
group: tech
order: 3
chips:
  - SQL
  - Scrum
  - Kanban
bullets:
  pt:
    - "Conclusão do programa TJ League para a plataforma judicial SAJ."
    - "Consultas SQL e análise de logs para apoiar troubleshooting e suporte."
    - "Suporte ao Tribunal de Justiça de São Paulo em demandas relacionadas à plataforma."
  en:
    - "Completed the TJ League training program for the SAJ judicial platform."
    - "SQL queries and log analysis to support troubleshooting and support workflows."
    - "Supported Tribunal de Justiça de São Paulo on platform-related issues."
---
```

- [ ] **Step 4: Write `src/content/experience/advog-empresarial.mdx`**

```mdx
---
company: Advog Empresarial
role:
  pt: "Estagiário"
  en: "Legal Intern"
startDate: 2020-03-01
endDate: 2021-05-01
location: Maringá, PR
group: law
order: 4
chips: []
bullets:
  pt:
    - "Elaborei peças processuais, conduzi diligências em autarquias municipais e revisei contratos empresariais."
    - "Assumi responsabilidades próximas às de um advogado júnior, com autonomia operacional sob supervisão."
  en:
    - "Drafted procedural documents, handled inquiries at municipal agencies, and reviewed business contracts."
    - "Took on responsibilities comparable to a junior attorney, with operational autonomy under supervision."
---
```

- [ ] **Step 5: Write `src/content/experience/cartorio-imoveis.mdx`**

```mdx
---
company: 1º Serviço de Registro de Imóveis de Maringá
role:
  pt: "Estagiário"
  en: "Intern"
startDate: 2019-08-01
endDate: 2020-02-01
location: Maringá, PR
group: law
order: 5
chips: []
bullets:
  pt:
    - "Análise de matrículas, correções cadastrais, digitalização em sistema e apoio a registros e averbações imobiliárias."
    - "Atuação com alto nível de precisão em rotinas documentais e validação de informações."
  en:
    - "Analysis of real-estate records, cadastral corrections, digitization, and support for property registrations."
    - "High-precision execution of document workflows and information validation."
---
```

- [ ] **Step 6: Write `src/content/experience/bellinati-perez.mdx`**

```mdx
---
company: Bellinati Perez
role:
  pt: "Estagiário"
  en: "Legal Intern"
startDate: 2018-03-01
endDate: 2018-08-01
location: Maringá, PR
group: law
order: 6
chips: []
bullets:
  pt:
    - "Acompanhamento processual e emissão de guias de recolhimento de custas judiciais."
    - "Contribuí para a organização das rotinas jurídicas e o andamento adequado dos processos."
  en:
    - "Case tracking and issuance of court-fee collection documents."
    - "Contributed to the organization of legal workflows and case progression."
---
```

- [ ] **Step 7: Run `astro check` and visual verification**

```bash
npx astro check && npm run dev
```

Open `http://localhost:4321/` and `http://localhost:4321/en/`. Verify the Experience section now shows Atlassian (expanded), both Softplan roles (expanded), and a collapsed "Início no Direito" / "Early career in law" block that expands to show the three legal internships.

Stop with Ctrl+C.

- [ ] **Step 8: Commit**

```bash
git add src/content/experience
git commit -m "content: seed experience entries (Atlassian, Softplan, law internships)"
```

---

### Task 20: Seed one sample project

**Files:**
- Create: `src/content/projects/yagomatsura-dev.mdx`

- [ ] **Step 1: Write `src/content/projects/yagomatsura-dev.mdx`**

```mdx
---
title: "yagomatsura.dev"
description:
  pt: "Este site. Astro + MDX + Tailwind, zero-JS por padrão, bilíngue, deploy contínuo no Vercel."
  en: "This site. Astro + MDX + Tailwind, zero-JS by default, bilingual, continuous deploy on Vercel."
stack:
  - Astro
  - TypeScript
  - Tailwind
  - MDX
  - Vercel
githubUrl: "https://github.com/YagoRMatsura/yagomatsura.dev"
featured: true
order: 1
---
```

- [ ] **Step 2: Commit**

```bash
git add src/content/projects
git commit -m "content: seed sample project (yagomatsura.dev)"
```

---

### Task 21: Seed one sample blog post in each language

**Files:**
- Create: `src/content/blog/bem-vindo.mdx`, `src/content/blog/en/hello.mdx`

- [ ] **Step 1: Write `src/content/blog/bem-vindo.mdx`**

```mdx
---
title: "Por que direito e código conversam mais do que parece"
date: 2026-04-16
lang: pt
tags:
  - legal-tech
  - carreira
excerpt: "Direito e engenharia compartilham o mesmo músculo: ler com atenção, modelar sistemas e pensar sobre casos extremos."
draft: false
translationOf: hello
---

## Duas disciplinas, um mesmo músculo

Direito e engenharia parecem mundos separados, mas operam sobre a mesma habilidade:
ler com atenção, modelar sistemas e pensar sobre casos extremos.

Este blog é onde vou explorar essa interseção.

## O que esperar

- Notas sobre legal tech.
- Pequenos estudos de caso de ferramentas e contratos.
- Reflexões sobre carreira em transição.
```

- [ ] **Step 2: Write `src/content/blog/en/hello.mdx`**

```mdx
---
title: "Why law and code have more in common than they seem"
date: 2026-04-16
lang: en
tags:
  - legal-tech
  - career
excerpt: "Law and engineering share the same muscle: close reading, system modeling, and thinking about edge cases."
draft: false
translationOf: bem-vindo
---

## Two fields, one muscle

Law and engineering look like separate worlds, but they rely on the same skill:
close reading, system modeling, and thinking about edge cases.

This blog is where I explore that overlap.

## What to expect

- Notes on legal tech.
- Small case studies of tools and contracts.
- Reflections on a career in transition.
```

- [ ] **Step 3: Run `astro check` and visual verification**

```bash
npx astro check && npm run dev
```

Visit:
- `http://localhost:4321/blog` — should list the PT post
- `http://localhost:4321/blog/bem-vindo/` — should render the post with reading time, tags, "Read in English" link
- `http://localhost:4321/en/blog` — should list the EN post
- `http://localhost:4321/en/blog/hello/` — should render the EN post with "Ler em português" link
- Home page PT writing teaser should show the post
- Home page EN writing teaser should show the EN post

Stop with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add src/content/blog
git commit -m "content: seed welcome blog post in PT and EN"
```

---

## Phase 10 — SEO, RSS, 404, static assets

### Task 22: RSS feed

**Files:**
- Create: `src/pages/rss.xml.ts`

- [ ] **Step 1: Write `src/pages/rss.xml.ts`**

```ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const isProd = import.meta.env.PROD;
  const posts = (await getCollection('blog'))
    .filter((p) => !isProd || !p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'Yago Matsura',
    description: 'Ensaios sobre direito, tecnologia e legal tech. Essays on law, tech, and the intersection.',
    site: context.site!,
    items: posts.map((p) => {
      const isEn = p.data.lang === 'en';
      const slug = isEn ? p.id.replace(/^en\//, '') : p.id;
      const link = isEn ? `/en/blog/${slug}/` : `/blog/${slug}/`;
      return {
        title: p.data.title,
        pubDate: p.data.date,
        description: p.data.excerpt,
        link,
        categories: p.data.tags,
      };
    }),
    customData: '<language>pt-BR</language>',
  });
}
```

- [ ] **Step 2: Run build and verify the feed**

```bash
npm run build
```

Expected: build succeeds, and `dist/rss.xml` exists. Inspect it with:

```bash
head -40 dist/rss.xml
```

Expected: valid RSS 2.0 XML listing both posts.

- [ ] **Step 3: Commit**

```bash
git add src/pages/rss.xml.ts
git commit -m "feat(seo): add RSS feed"
```

---

### Task 23: 404 page

**Files:**
- Create: `src/pages/404.astro`

- [ ] **Step 1: Write `src/pages/404.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { t } from '../i18n';

// Default to PT; a smarter heuristic would inspect Accept-Language, but
// Vercel static 404s don't have request context. PT is acceptable.
const lang = 'pt' as const;
const dict = t(lang);
---
<BaseLayout title="404" description={dict.notFound.body} lang={lang}>
  <div class="max-w-[720px] mx-auto px-5 py-24 text-center">
    <p class="font-mono text-6xl text-[var(--color-accent)] mb-4">404</p>
    <h1 class="text-2xl font-semibold mb-3">{dict.notFound.title}</h1>
    <p class="text-[var(--color-text-secondary)] mb-8">{dict.notFound.body}</p>
    <a href="/" class="font-mono text-sm uppercase tracking-wider text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">
      {dict.notFound.home}
    </a>
  </div>
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/404.astro
git commit -m "feat(seo): add custom 404 page"
```

---

### Task 24: Add static assets (favicon, OG image, resume, robots)

**Files:**
- Create: `public/favicon.svg`, `public/robots.txt`, `public/og-image.png`, `public/resume.pdf`

- [ ] **Step 1: Write `public/favicon.svg`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#0d0f13"/>
  <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle"
        font-family="ui-monospace, 'SF Mono', monospace" font-size="32" font-weight="700" fill="#7aa2ff">Y</text>
</svg>
```

- [ ] **Step 2: Write `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://yagomatsura.dev/sitemap-index.xml
```

- [ ] **Step 3: Copy Yago's existing resume to `public/resume.pdf`**

```bash
cp /Users/yagomatsura/Downloads/main.pdf public/resume.pdf
```

Verify it exists:

```bash
ls -la public/resume.pdf
```

- [ ] **Step 4: Create `public/og-image.png` placeholder**

For a v1 launch, use a simple 1200×630 PNG with the tagline. Generate with ImageMagick (if installed) or create by hand with any tool and save to `public/og-image.png`. If ImageMagick is available:

```bash
if command -v magick >/dev/null 2>&1; then
  magick -size 1200x630 xc:'#0d0f13' \
    -fill '#e8eaf0' -font 'Helvetica-Bold' -pointsize 84 -gravity North -annotate +0+220 'Yago Matsura' \
    -fill '#9aa0ab' -font 'Helvetica' -pointsize 36 -gravity North -annotate +0+360 'Law + Computer Science' \
    -fill '#7aa2ff' -font 'Helvetica' -pointsize 24 -gravity South -annotate +0+120 'yagomatsura.dev' \
    public/og-image.png
else
  echo "ImageMagick not installed — place a 1200x630 PNG at public/og-image.png manually."
fi
```

If ImageMagick isn't installed, create any 1200×630 PNG with the tagline and place it at `public/og-image.png`. The build won't fail without it, but social previews will 404 for the image.

- [ ] **Step 5: Build to verify all assets serve**

```bash
npm run build
```

Expected: build succeeds. Inspect `dist/`:

```bash
ls dist/ | grep -E "(favicon|robots|og-image|resume)"
```

Expected: all four files present.

- [ ] **Step 6: Commit**

```bash
git add public
git commit -m "chore: add favicon, robots.txt, og-image, and resume.pdf"
```

---

## Phase 11 — Polish pass

### Task 25: README with deploy instructions

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Write `README.md`**

```markdown
# yagomatsura.dev

Personal portfolio for Yago Matsura — law + computer science student, transitioning into tech, focused on legal tech / IP / tech policy.

Built with [Astro](https://astro.build) · Tailwind CSS · MDX · deployed on Vercel.

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build → dist/
npm run preview   # preview production build
npx astro check   # typecheck + content-collection validation
```

## Content

All content lives in `src/content/`:

- `blog/` — Portuguese posts as `.mdx` files
- `blog/en/` — English posts as `.mdx` files
- `projects/` — project case studies
- `experience/` — company/role entries

Frontmatter is validated at build time by Zod schemas in `src/content.config.ts`.
Drafts (`draft: true`) are visible in development and hidden in production builds.

## Deploy

- Push to `main` → Vercel deploys automatically
- Pull requests get preview URLs from Vercel
- Custom domain `yagomatsura.dev` configured in the Vercel dashboard
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with dev and deploy instructions"
```

---

### Task 26: Final verification pass

- [ ] **Step 1: Run full build + check**

```bash
npx astro check && npm run build
```

Expected: zero errors, build succeeds.

- [ ] **Step 2: Preview the production build locally**

```bash
npm run preview
```

Open `http://localhost:4321/`. Click through every page:
- `/` PT home
- `/en/` EN home
- `/blog` PT blog listing
- `/blog/bem-vindo/` PT post
- `/en/blog` EN blog listing
- `/en/blog/hello/` EN post
- `/resume.pdf` download works
- `/rss.xml` renders valid XML
- `/sitemap-index.xml` lists all pages
- `/404` or any invalid URL shows the 404 page

Stop with Ctrl+C.

- [ ] **Step 3: Lighthouse audit**

In Chrome DevTools → Lighthouse, run both Mobile and Desktop audits against `http://localhost:4321/` (with `npm run preview` active). Record the four scores.

**Target: ≥95 on all four (Performance, Accessibility, Best Practices, SEO).**

If any score is <95, investigate the report:
- Performance: check for render-blocking resources, unused CSS, image sizes
- Accessibility: contrast, missing alt, missing labels — fix inline
- Best Practices: HTTPS (irrelevant locally), console errors, deprecated APIs
- SEO: meta tags, crawlable links

Fix issues and re-run. Commit any fixes.

- [ ] **Step 4: Accessibility manual check**

With keyboard only (Tab, Shift+Tab, Enter), navigate from the top of the page through every interactive element. Verify:
- Every link and button is reachable
- Focus ring is visible on every element
- Experience cards open/close with Enter/Space
- Skip-to-content works (if added)
- No keyboard trap

If issues, fix and commit.

---

## Phase 12 — Deploy

### Task 27: Create GitHub repository and push

- [ ] **Step 1: Create a public repo on GitHub**

Option A, gh CLI (preferred):

```bash
gh repo create YagoRMatsura/yagomatsura.dev --public --source=. --remote=origin --description "Personal portfolio · law + CS · yagomatsura.dev"
```

Option B, web: go to https://github.com/new, create `yagomatsura.dev` as a public repo under `YagoRMatsura`, then:

```bash
git remote add origin https://github.com/YagoRMatsura/yagomatsura.dev.git
```

- [ ] **Step 2: Push `main` to GitHub**

```bash
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Verify**

Open `https://github.com/YagoRMatsura/yagomatsura.dev`. Verify all files are present and README renders.

---

### Task 28: Add GitHub Actions CI

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Write `.github/workflows/ci.yml`**

```yaml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npx astro check
      - run: npm run build
```

- [ ] **Step 2: Commit and push**

```bash
git add .github
git commit -m "ci: add GitHub Actions check and build workflow"
git push
```

- [ ] **Step 3: Verify the workflow runs green**

Open the Actions tab on GitHub. The CI workflow should appear and turn green within 1–2 minutes. If it fails, inspect the logs, fix locally, push again.

---

### Task 29: Deploy to Vercel

These steps use the Vercel dashboard (UI) because they involve account-level authorization. The repo setup is automatic once connected.

- [ ] **Step 1: Connect the repo to Vercel**

Go to https://vercel.com/new. Import `YagoRMatsura/yagomatsura.dev`.
- Framework preset: Astro (auto-detected).
- Root directory: `./`.
- Build command: `npm run build` (default).
- Output directory: `dist` (default).
- Click **Deploy**.

Wait for the first deploy to complete. Note the temporary URL (something like `yagomatsura-dev-xxxx.vercel.app`) and verify the site works.

- [ ] **Step 2: Add Vercel Analytics**

In the Vercel dashboard for the project → Analytics → Enable. No code changes required; it uses the default zero-config mode.

- [ ] **Step 3: Configure the custom domain `yagomatsura.dev`**

In the Vercel dashboard → Project → Settings → Domains. Add `yagomatsura.dev` and `www.yagomatsura.dev`.

Vercel will show the required DNS records. Typically:

- `A` record: `@` → `76.76.21.21` (or the IP Vercel shows)
- `CNAME`: `www` → `cname.vercel-dns.com`

Add these records at your domain registrar for `yagomatsura.dev`.

- [ ] **Step 4: Wait for DNS + TLS**

DNS usually propagates within 5–30 minutes. Vercel then issues a TLS certificate automatically.

When the domain shows "Valid Configuration" in Vercel and `https://yagomatsura.dev` serves the site, you're live.

- [ ] **Step 5: Set `www` → root redirect (if both domains added)**

In Vercel → Domains, set `www.yagomatsura.dev` to redirect to `yagomatsura.dev` (root).

---

### Task 30: Post-deploy verification

- [ ] **Step 1: Visit the live site**

Check each of these on `https://yagomatsura.dev`:

- [ ] `/` PT home loads, nav anchors work
- [ ] `/en/` EN home loads
- [ ] Language toggle works both ways
- [ ] `/blog` and `/en/blog` list posts
- [ ] Blog posts render with syntax highlighting
- [ ] `/resume.pdf` downloads
- [ ] `/rss.xml` loads valid XML
- [ ] `/sitemap-index.xml` lists all pages
- [ ] 404 for a nonsense URL
- [ ] Social preview: paste the URL into LinkedIn's post composer — OG image, title, description show correctly

- [ ] **Step 2: Run Lighthouse against the production URL**

Desktop + Mobile. Target ≥ 95 all four categories. Record the scores.

- [ ] **Step 3: Tag v1**

```bash
git tag -a v1.0.0 -m "Portfolio v1 launch"
git push --tags
```

---

## Success criteria (final check against the spec)

Verify all items from the spec's Section 12:

- [ ] Site is live at `https://yagomatsura.dev` with valid TLS
- [ ] Both `/` (PT) and `/en/` (EN) render the full home page with all six sections
- [ ] Language toggle works from every route, landing on the counterpart route
- [ ] Experience section displays Atlassian, Softplan, and the grouped law-internship block with expand/collapse
- [ ] Projects and Writing sections render correctly with zero entries (empty-state copy) and with one or more entries
- [ ] `/resume.pdf` downloads the provided CV
- [ ] RSS feed validates; sitemap lists all pages
- [ ] Lighthouse ≥ 95 on all four categories, mobile + desktop
- [ ] WCAG AA contrast verified on all pages
- [ ] Site is keyboard-navigable end to end with visible focus states
- [ ] `prefers-reduced-motion: reduce` disables scroll-triggered animations
- [ ] GitHub repo is public and linked from the footer

When all boxes are checked, the portfolio is v1-complete and ready to share.
