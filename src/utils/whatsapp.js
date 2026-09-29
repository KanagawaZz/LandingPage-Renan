import lawyer from '../data/lawyer.js';
import siteConfig from '../data/siteConfig.js';

export function createWhatsAppLink(message = siteConfig.contact.whatsappMessage) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${lawyer.whatsappNumber}?text=${text}`;
}
