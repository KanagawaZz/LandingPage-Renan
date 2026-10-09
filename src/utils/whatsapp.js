import lawyer from '../data/lawyer.js';
import siteConfig from '../data/siteConfig.js';

export function createWhatsAppLink(type = 'default', customText = null) {
  let message = siteConfig.contact.whatsappDefaultMessage;
  if (customText) {
    message = customText;
  } else if (type === 'urgent') {
    message = siteConfig.contact.whatsappUrgentMessage;
  }
  const text = encodeURIComponent(message);
  return `https://wa.me/${lawyer.whatsappNumber}?text=${text}`;
}
