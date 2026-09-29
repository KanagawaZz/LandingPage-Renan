import lawyer from '../data/lawyer.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';
import Icon from './Icon.js';

export default function Footer() {
  const instagram = lawyer.instagramUrl
    ? `<a href="${lawyer.instagramUrl}" target="_blank" rel="noopener noreferrer">${Icon('instagram')} Instagram</a>`
    : '';
  const contacts = [
    lawyer.oab ? `<span>OAB ${lawyer.oab}</span>` : '',
    lawyer.city && !lawyer.city.startsWith('[') ? `<span>${lawyer.city}</span>` : '',
  ].filter(Boolean);

  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-main">
          <div class="footer-brand">
            <a class="wordmark footer-wordmark" href="#inicio">
              <span class="wordmark-monogram" aria-hidden="true">RB</span>
              <span class="wordmark-copy"><strong>${lawyer.name}</strong><small>${lawyer.profession}</small></span>
            </a>
            <div class="footer-meta">${contacts.join('')}</div>
          </div>
          <div class="footer-contact">
            <span class="footer-label">Contato</span>
            <a href="${createWhatsAppLink()}" target="_blank" rel="noopener noreferrer">WhatsApp ${Icon('arrow')}</a>
            ${instagram}
          </div>
          <div class="footer-legal">
            <span class="footer-label">Informação</span>
            <p>Este site tem caráter meramente informativo, nos termos do Provimento 205/2021 da OAB.</p>
            <p>Publicidade em conformidade com as normas aplicáveis à advocacia.</p>
          </div>
        </div>
        <div class="footer-bottom footer-bottom-simple">
          <span>© ${new Date().getFullYear()} ${lawyer.name}</span>
        </div>
      </div>
    </footer>`;
}
