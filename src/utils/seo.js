import lawyer from '../data/lawyer.js';
import siteConfig from '../data/siteConfig.js';

export function setStructuredData() {
  const imageUrl = siteConfig.seo.url
    ? new URL(siteConfig.seo.ogImage, siteConfig.seo.url).href
    : siteConfig.seo.ogImage;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    name: lawyer.name,
    telephone: `+${lawyer.whatsappNumber}`,
    image: imageUrl,
    description: siteConfig.seo.description,
  };

  if (siteConfig.seo.url) {
    structuredData.url = siteConfig.seo.url;
  }

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
