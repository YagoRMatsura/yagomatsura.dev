import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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
    githubUrl: z.url().optional(),
    demoUrl: z.url().optional(),
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
