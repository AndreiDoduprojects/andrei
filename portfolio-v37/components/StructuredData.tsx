export default function StructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Andrei Dodu',
    url: 'https://andreidodu.se',
    image: 'https://andreidodu.se/profile.jpg',
    jobTitle: 'Full-Stack Developer & AI Engineer',
    description: 'Full-Stack Developer, AI Engineer, and Value Investor combining technical expertise with financial acumen',
    worksFor: {
      '@type': 'Organization',
      name: 'Self-Employed'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Göteborg',
      addressCountry: 'SE'
    },
    email: 'me@andreidodu.se',
    sameAs: [
      'https://github.com/andreidodu',
      'https://linkedin.com/in/andreidoduse',
      'https://twitter.com/andreidoduse'
    ],
    knowsAbout: [
      'Full-Stack Development',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Machine Learning',
      'ML Training',
      'Model Fine-tuning',
      'ML Optimization',
      'Value Investing',
      'Financial Analysis',
      'Portfolio Management',
      'Product Shipping'
    ],
    knowsLanguage: [
      {
        '@type': 'Language',
        name: 'English',
        alternateName: 'en'
      },
      {
        '@type': 'Language',
        name: 'Swedish',
        alternateName: 'sv'
      }
    ]
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Andrei Dodu Portfolio',
    url: 'https://andreidodu.se',
    description: 'Portfolio of Andrei Dodu, a full-stack developer and value investor based in Göteborg, Sweden',
    author: {
      '@type': 'Person',
      name: 'Andrei Dodu'
    },
    inLanguage: ['en-US', 'sv-SE'],
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Person',
      name: 'Andrei Dodu'
    }
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: new Date('2025-01-17').toISOString(),
    dateModified: new Date().toISOString(),
    mainEntity: {
      '@type': 'Person',
      name: 'Andrei Dodu',
      alternateName: 'Andrei',
      description: 'Full-Stack Developer and Value Investor',
      image: 'https://andreidodu.se/profile.jpg',
      url: 'https://andreidodu.se'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
