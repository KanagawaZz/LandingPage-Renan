import Icon from './Icon.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

export default function UrgencyBanner() {
  return `
    <section class="urgency-section" id="urgencia" aria-labelledby="urgency-title">
      <div class="container">
        <div class="urgency-card reveal">
          <div class="urgency-ambient" aria-hidden="true"></div>
          
          <div class="urgency-header">
            <div class="urgency-badge">
              <span class="urgency-pulse" aria-hidden="true"></span>
              <span>Plantão Criminal</span>
            </div>
          </div>

          <div class="urgency-body">
            <h2 id="urgency-title" class="urgency-title">
              Prisão em flagrante ou audiência de custódia?
            </h2>
            <p class="urgency-subtitle">
              Atendimento em regime de plantão para medidas urgentes decorrentes de flagrante e audiência de custódia.
            </p>
            <div class="urgency-points">
              <div class="urgency-point">
                ${Icon('check', 'point-icon')}
                <span>Atendimento em plantão para flagrantes e audiências de custódia</span>
              </div>
              <div class="urgency-point">
                ${Icon('check', 'point-icon')}
                <span>Requerimento de liberdade provisória e relaxamento de prisão</span>
              </div>
              <div class="urgency-point">
                ${Icon('check', 'point-icon')}
                <span>Defesa dos direitos do custodiado</span>
              </div>
            </div>
          </div>

          <div class="urgency-actions">
            <a
              href="${createWhatsAppLink('urgent')}"
              class="button button-urgency button-lg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Acionar plantão de urgência no WhatsApp"
            >
              ${Icon('whatsapp', 'btn-icon')}
              <span>Falar no plantão de urgência</span>
              ${Icon('arrow-up-right', 'btn-arrow')}
            </a>
            <span class="urgency-disclaimer">
              ${Icon('clock', 'disclaimer-icon')} Em geral, retorno em até 30 minutos
            </span>
          </div>
        </div>
      </div>
    </section>
  `;
}
