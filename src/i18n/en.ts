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
