import lawyer from '../data/lawyer.js';
import navigation from '../data/navigation.js';
import Brand from './Brand.js';
import Icon from './Icon.js';
import siteConfig from '../data/siteConfig.js';

// O contato completo fica na seção logo acima; o rodapé traz marca, navegação e aviso ético.
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
      <div class="footer-monogram" aria-hidden="true"></div>
      <div class="container footer-inner">
        <div class="footer-top-grid">
          <div class="footer-brand-col">
            ${Brand({ variant: 'stacked', label: 'Renan Moraes, Advogado — Voltar ao início' })}
            <p class="footer-tagline">
              Advocacia criminal e assistência jurídica.<br />
              ${lawyer.cities}.
            </p>
            <div class="footer-social-links">
              <a
                href="${lawyer.instagramUrl}"
                class="social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram do ${lawyer.displayName} (abre em nova aba)"
              >
                ${Icon('instagram')}
              </a>
              <a
                href="mailto:${lawyer.email}"
                class="social-link"
                aria-label="Enviar e-mail para ${lawyer.email}"
              >
                ${Icon('mail')}
              </a>
            </div>
            <!-- Discreto e para quem já foi atendido: sem incentivo nem pedido de nota
                 (regras do Google e publicidade da OAB) -->
            <a
              href="${lawyer.googleReviewUrl}"
              class="footer-review-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Já foi atendido? Avalie no Google (abre em nova aba)"
            >
              ${Icon('star', 'footer-review-icon')}
              <span>Já foi atendido? Avalie no Google</span>
              ${Icon('arrow-up-right', 'link-icon-sm')}
            </a>
          </div>

          <div class="footer-nav-col desktop-only">
            <h2 class="footer-heading">Navegação</h2>
            <ul class="footer-nav-list">
              ${navLinks}
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
            <p>© ${currentYear} Renan Moraes Advogado · Todos os direitos reservados.</p>
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
