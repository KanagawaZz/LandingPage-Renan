import lawyer from '../data/lawyer.js';
import navigation from '../data/navigation.js';
import Icon from './Icon.js';
import siteConfig from '../data/siteConfig.js';

const hasAnalytics = ({ analytics }) => Boolean(analytics.googleAnalyticsId || analytics.clarityId);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = navigation
    .map(
      (item) => `
      <li>
        <a href="${item.href}" class="footer-link">${item.label}</a>
      </li>
    `
    )
    .join('');

  return `
    <footer class="site-footer" id="rodape">
      <div class="container footer-inner">
        <div class="footer-top-grid">
          <div class="footer-brand-col">
            <a href="#" class="brand" aria-label="Voltar ao início">
              <div class="brand-monogram">
                <span>RM</span>
              </div>
              <div class="brand-text">
                <span class="brand-name">Renan Moraes</span>
                <span class="brand-title">Advocacia Criminal</span>
              </div>
            </a>
            <p class="footer-tagline">
              Advogado criminalista com atendimento online e presencial.
            </p>
            <div class="footer-social-links">
              <a
                href="${lawyer.instagramUrl}"
                class="social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Renan Moraes"
              >
                ${Icon('instagram')}
              </a>
              <a
                href="mailto:${lawyer.email}"
                class="social-link"
                aria-label="E-mail ${lawyer.email}"
              >
                ${Icon('mail')}
              </a>
            </div>
          </div>

          <div class="footer-nav-col desktop-only">
            <h2 class="footer-heading">Navegação Rápida</h2>
            <ul class="footer-nav-list">
              ${navLinks}
            </ul>
          </div>

          <div class="footer-contact-col desktop-only">
            <h2 class="footer-heading">Atendimento e Plantão</h2>
            <ul class="footer-info-list">
              <li>
                <span class="info-icon">${Icon('map-pin')}</span>
                <span><strong>Cidades-Base:</strong> ${lawyer.cities}</span>
              </li>
              <li>
                <span class="info-icon">${Icon('clock')}</span>
                <span><strong>Plantão:</strong> Flagrantes e Custódias</span>
              </li>
              <li>
                <span class="info-icon">${Icon('whatsapp')}</span>
                <span><strong>WhatsApp:</strong> ${lawyer.whatsappDisplay}</span>
              </li>
              <li>
                <span class="info-icon">${Icon('mail')}</span>
                <span><strong>E-mail:</strong> ${lawyer.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer-legal-bar">
          <div class="footer-ethical-notice">
            <p>
              <strong>Aviso ético:</strong> Conteúdo informativo, elaborado com base no Código de Ética e Disciplina da OAB e no Provimento nº 205/2021 do CFOAB, sem promessa de resultado. Renan Moraes, Advogado, ${lawyer.oab}.
            </p>
          </div>

          <div class="footer-copyright-bar">
            <p>© ${currentYear} Renan Moraes Advocacia Criminal · Todos os direitos reservados.</p>
            <nav class="footer-legal-links" aria-label="Privacidade">
              <a href="/politica-de-privacidade.html">Política de privacidade</a>
              ${hasAnalytics(siteConfig) ? '<a href="#" data-cookie-prefs>Preferências de cookies</a>' : ''}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  `;
}
