import lawyer from '../data/lawyer.js';
import siteConfig from '../data/siteConfig.js';

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const absoluteUrl = (path) => (siteConfig.seo.url ? new URL(path, siteConfig.seo.url).href : path);

function structuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `${lawyer.name} - Advocacia Criminal`,
    alternateName: lawyer.name,
    description: siteConfig.seo.description,
    url: siteConfig.seo.url || undefined,
    telephone: `+${lawyer.whatsappNumber}`,
    email: lawyer.email,
    image: absoluteUrl(siteConfig.seo.ogImage),
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
        name: lawyer.oab,
      },
    },
  };
}

// Gera as tags de SEO no build (pré-renderização), a partir de siteConfig.
export function renderSeoHead() {
  const { title, description, ogImage, ogImageAlt, url } = siteConfig.seo;
  const image = absoluteUrl(ogImage);

  return `
    <title>${title}</title>
    <meta name="description" content="${escapeAttr(description)}" />
    ${url ? `<link rel="canonical" href="${url}" />` : ''}

    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="${escapeAttr(lawyer.name)} Advocacia Criminal" />
    <meta property="og:title" content="${escapeAttr(title)}" />
    <meta property="og:description" content="${escapeAttr(description)}" />
    ${url ? `<meta property="og:url" content="${url}" />` : ''}
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeAttr(ogImageAlt)}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(title)}" />
    <meta name="twitter:description" content="${escapeAttr(description)}" />
    <meta name="twitter:image" content="${image}" />

    <script type="application/ld+json">${JSON.stringify(structuredData())}</script>
  `;
}
