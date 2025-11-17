export const translations = {
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      work: 'Work',
      contact: 'Contact',
    },
    hero: {
      name: 'Andrei Dodu',
      title: 'Full-Stack Developer',
      tagline: 'Crafting elegant solutions at the intersection of technology and finance',
      cta: 'Get In Touch',
      viewWork: 'View Work',
    },
    skills: {
      title: 'Skills & Expertise',
      subtitle: 'Technologies and tools I work with',
    },
    work: {
      title: 'Selected Work',
      subtitle: 'Recent projects and collaborations',
      projects: [
        {
          title: 'Swedish Accounting System',
          description: 'Full-featured accounting platform compliant with Swedish BAS standards and Bokföringsnämnden regulations',
          tech: ['React', 'Ruby on Rails', 'PostgreSQL', 'BankID'],
          year: '2025',
        },
        {
          title: 'Financial Analytics Platform',
          description: 'Real-time investment tracking and portfolio optimization system',
          tech: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
          year: '2024',
        },
        {
          title: 'Enterprise SaaS Application',
          description: 'Multi-tenant platform with advanced collaboration features',
          tech: ['Next.js', 'TypeScript', 'Redis', 'Docker'],
          year: '2023',
        },
        {
          title: 'E-Commerce Solution',
          description: 'High-performance platform with seamless payment integration',
          tech: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
          year: '2023',
        },
      ],
    },
    contact: {
      title: 'Get In Touch',
      subtitle: "Let's discuss your next project",
      email: 'Email',
      location: 'Location',
      locationValue: 'Göteborg, Sweden',
    },
    footer: {
      copyright: 'Andrei Dodu',
      location: 'Göteborg, Sweden',
    },
  },
  sv: {
    nav: {
      about: 'Om',
      skills: 'Kompetens',
      work: 'Projekt',
      contact: 'Kontakt',
    },
    hero: {
      name: 'Andrei Dodu',
      title: 'Full-Stack Utvecklare',
      tagline: 'Skapar eleganta lösningar i skärningspunkten mellan teknologi och finans',
      cta: 'Kontakta Mig',
      viewWork: 'Se Projekt',
    },
    skills: {
      title: 'Kompetens & Expertis',
      subtitle: 'Teknologier och verktyg jag arbetar med',
    },
    work: {
      title: 'Utvalda Projekt',
      subtitle: 'Senaste projekt och samarbeten',
      projects: [
        {
          title: 'Svenskt Bokföringssystem',
          description: 'Komplett bokföringsplattform i enlighet med svenska BAS-standarder och Bokföringsnämndens regler',
          tech: ['React', 'Ruby on Rails', 'PostgreSQL', 'BankID'],
          year: '2025',
        },
        {
          title: 'Finansiell Analysplattform',
          description: 'Realtidsspårning av investeringar och portföljoptimeringssystem',
          tech: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
          year: '2024',
        },
        {
          title: 'Företags SaaS-Applikation',
          description: 'Multi-tenant plattform med avancerade samarbetsfunktioner',
          tech: ['Next.js', 'TypeScript', 'Redis', 'Docker'],
          year: '2023',
        },
        {
          title: 'E-handelslösning',
          description: 'Högpresterande plattform med sömlös betalningsintegration',
          tech: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
          year: '2023',
        },
      ],
    },
    contact: {
      title: 'Kontakta Mig',
      subtitle: 'Låt oss diskutera ditt nästa projekt',
      email: 'E-post',
      location: 'Plats',
      locationValue: 'Göteborg, Sverige',
    },
    footer: {
      copyright: 'Andrei Dodu',
      location: 'Göteborg, Sverige',
    },
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = typeof translations.en;
