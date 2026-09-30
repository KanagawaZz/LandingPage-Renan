import lawyer from '../data/lawyer.js';
import siteConfig from '../data/siteConfig.js';

export function setStructuredData() {
  const imageUrl = new URL(
    siteConfig.seo.ogImage,
    siteConfig.seo.url || window.location.origin,
  ).href;
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
    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = siteConfig.seo.url;
    if (!canonical.isConnected) document.head.append(canonical);

    const openGraphUrl =
      document.querySelector('meta[property="og:url"]') || document.createElement('meta');
    openGraphUrl.setAttribute('property', 'og:url');
    openGraphUrl.content = siteConfig.seo.url;
    if (!openGraphUrl.isConnected) document.head.append(openGraphUrl);
  }
}
