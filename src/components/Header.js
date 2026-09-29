import lawyer from '../data/lawyer.js';
import navigation from '../data/navigation.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';
import Icon from './Icon.js';

export default function Header() {
  const links = navigation
    .map((item) => `<a class="nav-link" href="${item.href}">${item.label}</a>`)
    .join('');

  return `
    <header class="site-header" id="siteHeader">
      <div class="header-inner container">
        <a class="wordmark" href="#inicio" aria-label="${lawyer.name}, início">
          <span class="wordmark-monogram" aria-hidden="true">RB</span>
          <span class="wordmark-copy"><strong>${lawyer.name}</strong><small>${lawyer.profession}</small></span>
        </a>
        <nav class="desktop-nav" aria-label="Navegação principal">${links}</nav>
        <a class="button button-small button-outline header-contact" href="${createWhatsAppLink()}" target="_blank" rel="noopener noreferrer">
          Conversar no WhatsApp ${Icon('arrow')}
        </a>
        <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobileNav">
          ${Icon('menu', 'menu-icon')}
          ${Icon('close', 'close-icon')}
        </button>
      </div>
      <nav class="mobile-nav" id="mobileNav" aria-label="Navegação mobile" hidden>
        ${links}
        <a class="button button-small button-outline" href="${createWhatsAppLink()}" target="_blank" rel="noopener noreferrer">Conversar no WhatsApp ${Icon('arrow')}</a>
      </nav>
    </header>`;
}
