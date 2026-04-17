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

A local form-based admin for blog and project entries is available at
`http://localhost:4321/keystatic` while `npm run dev` is running. It writes
directly to the MDX files under `src/content/` — commit the changes as usual.
The admin is excluded from production builds.

## Deploy

- Push to `main` → Vercel deploys automatically
- Pull requests get preview URLs from Vercel
- Custom domain `yagomatsura.dev` configured in the Vercel dashboard
