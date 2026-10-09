import lawyer from '../data/lawyer.js';
import siteConfig from '../data/siteConfig.js';

export function setStructuredData() {
  const imageUrl = siteConfig.seo.url
    ? new URL(siteConfig.seo.ogImage, siteConfig.seo.url).href
    : siteConfig.seo.ogImage;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `${lawyer.name} - Advocacia Criminal`,
    alternateName: lawyer.name,
    description: siteConfig.seo.description,
    telephone: `+${lawyer.whatsappNumber}`,
    email: lawyer.email,
    image: imageUrl,
    areaServed: {
      '@type': 'Country',
      name: 'Brasil',
    },
    knowsAbout: [
      'Direito Penal',
      'Execução Penal',
      'Audiência de Custódia',
      'Prisão em Flagrante',
      'Habeas Corpus',
      'Crimes Tributários',
      'Recursos Criminais',
    ],
    sameAs: [lawyer.instagramUrl],
    employee: {
      '@type': 'Person',
      name: lawyer.name,
      jobTitle: lawyer.profession,
      alumniOf: 'Centro Universitário de Várzea Grande (UNIVAG)',
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Registro Profissional',
        name: 'OAB/MT 37.334',
      },
    },
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.append(script);

  if (siteConfig.seo.url) {
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = siteConfig.seo.url;
    document.head.append(canonical);

    const openGraphUrl = document.createElement('meta');
    openGraphUrl.setAttribute('property', 'og:url');
    openGraphUrl.content = siteConfig.seo.url;
    document.head.append(openGraphUrl);
  }
}
