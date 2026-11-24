import lawyer from '../data/lawyer.js';
import siteConfig from '../data/siteConfig.js';

export function createWhatsAppLink() {
  const text = encodeURIComponent(siteConfig.contact.whatsappDefaultMessage);
  return `https://wa.me/${lawyer.whatsappNumber}?text=${text}`;
}
