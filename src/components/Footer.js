import lawyer from '../data/lawyer.js';
import navigation from '../data/navigation.js';
import Icon from './Icon.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

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
                <span class="brand-title">Advocacia Criminal · ${lawyer.oab}</span>
              </div>
            </a>
            <p class="footer-tagline">
              Atuação técnica em Execução Penal, audiências de custódia e processos criminais.
            </p>
            <div class="footer-social-links">
              <a
                href="${createWhatsAppLink('default')}"
                class="social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de Renan Moraes"
              >
                ${Icon('whatsapp')}
              </a>
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
                aria-label="E-mail renanmoraes.advogado@gmail.com"
              >
                ${Icon('mail')}
              </a>
            </div>
          </div>

          <div class="footer-nav-col">
            <h4 class="footer-heading">Navegação Rápida</h4>
            <ul class="footer-nav-list">
              ${navLinks}
            </ul>
          </div>

          <div class="footer-contact-col">
            <h4 class="footer-heading">Atendimento e Plantão</h4>
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
            <!-- CONFIRMAR LINK DIRETO DO CNA -->
            <p>
              <strong>Aviso de Conformidade Ética:</strong> Publicidade de caráter exclusivamente informativo, em estrita conformidade com o Código de Ética e Disciplina da OAB e o Provimento nº 205/2021 do CFOAB. Renan Moraes, Advogado, ${lawyer.oab} (<a href="${lawyer.oabConsultUrl}" target="_blank" rel="noopener noreferrer" class="footer-oab-link">Consultar no Cadastro Nacional dos Advogados - CNA/OAB</a>).
            </p>
            <p class="footer-privacy-text">
              <strong>Privacidade e Dados (LGPD):</strong> Os contatos e dados compartilhados são estritamente sigilosos, protegidos pelo sigilo profissional da advocacia (Lei nº 8.906/94) e pela LGPD (Lei nº 13.709/18).
            </p>
          </div>

          <div class="footer-copyright-bar">
            <p>© ${currentYear} Renan Moraes Advocacia Criminal · Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  `;
}
