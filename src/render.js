import Header from './components/Header.js';
import Hero from './components/Hero.js';
import PracticeAreas from './components/PracticeAreas.js';
import About from './components/About.js';
import HowItWorks from './components/HowItWorks.js';
import Families from './components/Families.js';
import UrgencyBanner from './components/UrgencyBanner.js';
import FAQ from './components/FAQ.js';
import FinalCTA from './components/FinalCTA.js';
import Footer from './components/Footer.js';
import WhatsAppButton from './components/WhatsAppButton.js';
import GoldDivider from './components/GoldDivider.js';
import ThemisBand from './components/ThemisBand.js';

import siteConfig from './data/siteConfig.js';

export { renderSeoHead } from './utils/seo.js';
export { renderPrivacyPage } from './utils/privacyPage.js';
export const siteUrl = siteConfig.seo.url.replace(/\/$/, '');

// Executado no build (vite.config.js): o HTML final já sai com todo o conteúdo.
// Seções com .desktop-only ficam ocultas no celular (ver responsive.css).
export function renderApp() {
  return `
    <a href="#mainContent" class="skip-link">Pular para o conteúdo principal</a>
    ${Header()}
    <main id="mainContent">
      ${Hero()}
      ${GoldDivider('hero')}
      ${PracticeAreas()}
      ${About()}
      ${ThemisBand()}
      ${HowItWorks()}
      ${Families()}
      ${UrgencyBanner()}
      ${FAQ()}
      ${GoldDivider('contato')}
      ${FinalCTA()}
    </main>
    ${Footer()}
    ${WhatsAppButton()}
  `;
}
