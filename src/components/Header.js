import navigation from '../data/navigation.js';
import Brand from './Brand.js';
import Icon from './Icon.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

const link = (item) => `
  <li>
    <a href="${item.href}" class="nav-link" data-nav-link>${item.label}</a>
  </li>
`;

export default function Header() {
  const cta = navigation.find((item) => item.cta);
  const desktopLinks = navigation.filter((item) => !item.cta).map(link).join('');
  const mobileLinks = navigation.map(link).join('');

  return `
    <header class="site-header" id="siteHeader">
      <div class="container header-inner">
        ${Brand()}

        <nav class="desktop-nav" aria-label="Navegação principal">
          <ul class="nav-list">
            ${desktopLinks}
          </ul>
          ${cta ? `<a href="${cta.href}" class="nav-cta" data-nav-link>${cta.label}</a>` : ''}
        </nav>

        <button
          class="menu-toggle"
          type="button"
          aria-expanded="false"
          aria-controls="mobileNav"
          aria-label="Abrir menu de navegação"
        >
          <span class="menu-toggle-icon icon-open">${Icon('menu')}</span>
          <span class="menu-toggle-icon icon-close">${Icon('close')}</span>
        </button>
      </div>

      <nav class="mobile-nav" id="mobileNav" hidden aria-label="Navegação no celular" data-lenis-prevent>
        <div class="mobile-nav-inner container">
          <ul class="mobile-nav-list">
            ${mobileLinks}
          </ul>
          <a
            href="${createWhatsAppLink()}"
            class="button button-primary button-lg mobile-nav-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${Icon('whatsapp', 'btn-icon')}
            <span>Falar no WhatsApp</span>
            ${Icon('arrow-up-right', 'btn-arrow')}
          </a>
        </div>
      </nav>
    </header>
  `;
}
