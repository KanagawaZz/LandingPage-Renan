import navigation from '../data/navigation.js';
import lawyer from '../data/lawyer.js';
import Icon from './Icon.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

export default function Header() {
  const navLinks = navigation
    .map(
      (item) => `
      <li>
        <a href="${item.href}" class="nav-link">${item.label}</a>
      </li>
    `
    )
    .join('');

  return `
    <header class="site-header" id="siteHeader">
      <div class="container header-inner">
        <a href="#" class="brand" aria-label="Renan Moraes - Página Inicial">
          <div class="brand-monogram">
            <span>RM</span>
          </div>
          <div class="brand-text">
            <span class="brand-name">Renan Moraes</span>
            <span class="brand-title">Advocacia Criminal · ${lawyer.oab}</span>
          </div>
        </a>

        <nav class="desktop-nav" aria-label="Navegação Principal">
          <ul class="nav-list">
            ${navLinks}
          </ul>
        </nav>

        <div class="header-actions">
          <a
            href="${createWhatsAppLink('default')}"
            class="button button-header"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp com o Dr. Renan"
          >
            <span class="btn-pulse" aria-hidden="true"></span>
            ${Icon('whatsapp', 'btn-icon')}
            <span>Falar no WhatsApp</span>
          </a>

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
      </div>

      <div class="mobile-nav" id="mobileNav" hidden aria-label="Navegação Mobile">
        <div class="mobile-nav-inner container">
          <ul class="mobile-nav-list">
            ${navLinks}
          </ul>
          <div class="mobile-nav-footer">
            <a
              href="${createWhatsAppLink('default')}"
              class="button button-primary button-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${Icon('whatsapp', 'btn-icon')}
              <span>Falar no WhatsApp</span>
            </a>
            <p class="mobile-nav-caption">
              ${Icon('clock', 'caption-icon')} Atendimento em plantão
            </p>
          </div>
        </div>
      </div>
    </header>
  `;
}
