import lawyer from '../data/lawyer.js';
import siteConfig from '../data/siteConfig.js';
import { defenseStages } from '../data/practiceAreas.js';

// Gera no build (pré-renderização) as tags de SEO e os dados estruturados da página
// inicial, a partir de siteConfig e lawyer. A URL base vem de SITE_URL (ver siteConfig),
// então nenhum endereço fica fixo aqui. Decisões e validações: SEO.md.

const escapeHtml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const home = `${siteConfig.seo.url}/`;
const absoluteUrl = (path) => new URL(path, home).href;
const nodeId = (name) => `${home}#${name}`;
// O nome de exibição usa espaço sem quebra ("Dr. Renan"); nos dados, espaço comum.
const plainText = (value) => value.replace(/ /g, ' ');

// Região de atuação: cidades de atendimento presencial e o Brasil, pelo atendimento online.
// Sem endereço físico: o profissional não tem escritório aberto ao público.
const matoGrosso = {
  '@type': 'State',
  name: 'Mato Grosso',
  sameAs: 'https://pt.wikipedia.org/wiki/Mato_Grosso',
};

const areaServed = [
  {
    '@type': 'City',
    name: 'Cuiabá',
    containedInPlace: matoGrosso,
    sameAs: 'https://pt.wikipedia.org/wiki/Cuiab%C3%A1',
  },
  {
    '@type': 'City',
    name: 'Várzea Grande',
    containedInPlace: matoGrosso,
    sameAs: 'https://pt.wikipedia.org/wiki/V%C3%A1rzea_Grande_(Mato_Grosso)',
  },
  matoGrosso,
  { '@type': 'Country', name: 'Brasil' },
];

// Assuntos que a página apresenta: áreas do Direito e os tópicos de cada etapa da jornada
const knowsAbout = [
  ...new Set([
    'Direito Penal',
    'Processo Penal',
    'Execução Penal',
    ...defenseStages.flatMap(({ topics }) => topics),
  ]),
];

function structuredData() {
  const { title, description, ogImage } = siteConfig.seo;
  const portrait = lawyer.institutionalPortrait;
  const telephone = `+${lawyer.whatsappNumber}`;
  const whatsappUrl = `https://wa.me/${lawyer.whatsappNumber}`;

  const person = {
    '@type': 'Person',
    '@id': nodeId('pessoa'),
    name: lawyer.name,
    honorificPrefix: 'Dr.',
    alternateName: plainText(lawyer.displayName),
    jobTitle: lawyer.profession,
    description: lawyer.bio,
    url: home,
    image: {
      '@type': 'ImageObject',
      url: absoluteUrl(`${portrait.base}-${portrait.width}.webp`),
      caption: portrait.alt,
    },
    telephone,
    email: lawyer.email,
    sameAs: [lawyer.instagramUrl],
    knowsAbout,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Centro Universitário de Várzea Grande (UNIVAG)',
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Registro profissional',
        name: lawyer.oab,
        recognizedBy: {
          '@type': 'Organization',
          name: 'Ordem dos Advogados do Brasil, Seccional de Mato Grosso (OAB/MT)',
          url: 'https://www.oabmt.org.br/',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Pós-graduação',
        name: 'Pós-graduação em Direito Penal e Processual Penal',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'atendimento jurídico',
      telephone,
      email: lawyer.email,
      url: whatsappUrl,
      areaServed,
      availableLanguage: 'pt-BR',
    },
  };

  const service = {
    '@type': 'Service',
    '@id': nodeId('advocacia-criminal'),
    name: 'Advocacia criminal',
    serviceType: 'Defesa criminal e assistência jurídica criminal',
    description: `${lawyer.focus}. ${lawyer.coverage}.`,
    provider: { '@id': person['@id'] },
    areaServed,
    availableChannel: {
      '@type': 'ServiceChannel',
      name: 'WhatsApp',
      serviceUrl: whatsappUrl,
      availableLanguage: 'pt-BR',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Atuação criminal do início ao fim',
      itemListElement: defenseStages.map((stage) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: stage.title,
          description: stage.activities.join(' '),
        },
      })),
    },
  };

  const website = {
    '@type': 'WebSite',
    '@id': nodeId('site'),
    url: home,
    name: `${lawyer.name} Advogado`,
    alternateName: plainText(lawyer.displayName),
    inLanguage: 'pt-BR',
    publisher: { '@id': person['@id'] },
  };

  const webpage = {
    '@type': 'WebPage',
    '@id': nodeId('pagina'),
    url: home,
    name: title,
    description,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': website['@id'] },
    about: { '@id': person['@id'] },
    mainEntity: { '@id': service['@id'] },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl(ogImage),
      caption: siteConfig.seo.ogImageAlt,
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [webpage, website, person, service],
  };
}

export function renderSeoHead() {
  const { title, description, ogImage, ogImageAlt } = siteConfig.seo;
  const image = absoluteUrl(ogImage);
  // "<" escapado dentro do JSON para nenhum texto encerrar o <script> antes da hora
  const jsonLd = JSON.stringify(structuredData()).replace(/</g, '\\u003c');

  return `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${home}" />

    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="${escapeHtml(lawyer.name)} Advogado" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${home}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(ogImageAlt)}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="${escapeHtml(ogImageAlt)}" />

    <script type="application/ld+json">${jsonLd}</script>
  `;
}
