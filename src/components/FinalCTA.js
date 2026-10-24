import lawyer from '../data/lawyer.js';
import Icon from './Icon.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

export default function FinalCTA() {
  return `
    <section class="final-cta-section" id="contato" aria-labelledby="cta-title">
      <div class="container">
        <div class="final-cta-card reveal" data-reveal="zoom">
          <div class="cta-backdrop-glow" aria-hidden="true"></div>
          
          <div class="cta-inner">
            <span class="section-badge badge-center">Contato</span>
            <h2 id="cta-title" class="cta-title">
              Entenda os próximos passos da sua situação jurídica
            </h2>
            <p class="cta-description">
              Conte o que aconteceu e combine a primeira conversa.
            </p>

            <div class="cta-highlight-pills">
              <!-- REVISAR COM O ADVOGADO: manter o prazo só se for sustentável no dia a dia -->
              <span class="highlight-pill">${Icon('clock')} Em geral, retorno em até 30 minutos</span>
              <span class="highlight-pill">${Icon('lock')} Sigilo profissional</span>
            </div>

            <div class="cta-main-action">
              <a
                href="${createWhatsAppLink('default')}"
                class="button button-primary button-xl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar com o Dr. Renan no WhatsApp"
              >
                ${Icon('whatsapp', 'btn-icon-lg')}
                <span>Falar no WhatsApp</span>
                ${Icon('arrow-up-right', 'btn-arrow')}
              </a>
              <p class="cta-urgent-line mobile-only">
                ${Icon('alert-triangle')}
                <span><strong>Prisão em flagrante ou custódia?</strong> Informe isso logo na primeira mensagem.</span>
              </p>
            </div>

            <div class="cta-channels-grid">
              <div class="channel-item channel-static">
                <div class="channel-icon-box whatsapp-bg">
                  ${Icon('whatsapp')}
                </div>
                <div class="channel-info">
                  <span class="channel-label">WhatsApp</span>
                  <span class="channel-value">${lawyer.whatsappDisplay}</span>
                </div>
              </div>

              <a
                href="mailto:${lawyer.email}"
                class="channel-item"
                aria-label="Enviar e-mail para ${lawyer.email}"
              >
                <div class="channel-icon-box email-bg">
                  ${Icon('mail')}
                </div>
                <div class="channel-info">
                  <span class="channel-label">E-mail</span>
                  <span class="channel-value">${lawyer.email}</span>
                </div>
              </a>

              <a
                href="${lawyer.instagramUrl}"
                class="channel-item"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Acessar Instagram ${lawyer.instagram}"
              >
                <div class="channel-icon-box instagram-bg">
                  ${Icon('instagram')}
                </div>
                <div class="channel-info">
                  <span class="channel-label">Instagram</span>
                  <span class="channel-value">${lawyer.instagram}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
