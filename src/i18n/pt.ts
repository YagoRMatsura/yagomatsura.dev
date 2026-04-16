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
};

export type Dict = typeof pt;
