import lawyer from '../data/lawyer.js';
import siteConfig from '../data/siteConfig.js';

// Sem argumento usa a mensagem padrão; seções específicas podem passar a própria.
export function createWhatsAppLink(message = siteConfig.contact.whatsappDefaultMessage) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${lawyer.whatsappNumber}?text=${text}`;
}
