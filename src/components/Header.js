import navigation from '../data/navigation.js';
import lawyer from '../data/lawyer.js';
import Icon from './Icon.js';

export default function Header() {
  const renderLinks = (items) =>
    items
      .map(
        (item) => `
      <li>
        <a href="${item.href}" class="nav-link">${item.label}</a>
      </li>
    `
      )
      .join('');

  const navLinks = renderLinks(navigation);
  const mobileNavLinks = renderLinks(navigation.filter((item) => item.mobile));

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

      <nav class="mobile-nav" id="mobileNav" hidden aria-label="Navegação Mobile">
        <div class="mobile-nav-inner container">
          <ul class="mobile-nav-list">
            ${mobileNavLinks}
          </ul>
        </div>
      </nav>
    </header>
  `;
}
