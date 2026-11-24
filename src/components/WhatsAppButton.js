import Icon from './Icon.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

export default function WhatsAppButton() {
  return `
    <div class="whatsapp-float-container is-suppressed" id="whatsappFloat">
      <a
        href="${createWhatsAppLink()}"
        class="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversa no WhatsApp com Renan Moraes"
      >
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
