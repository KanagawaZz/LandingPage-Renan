import Icon from './Icon.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

export default function WhatsAppButton() {
  return `
    <div class="whatsapp-float-container" id="whatsappFloat">
      <a
        href="${createWhatsAppLink('default')}"
        class="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversa no WhatsApp com Renan Moraes"
      >
        <span class="float-pulse-ring" aria-hidden="true"></span>
        <span class="float-pulse-core" aria-hidden="true"></span>
        <div class="whatsapp-float-icon">
          ${Icon('whatsapp')}
        </div>
        <div class="whatsapp-float-tooltip">
          <span class="tooltip-title">Falar no WhatsApp</span>
        </div>
      </a>
    </div>
  `;
}
