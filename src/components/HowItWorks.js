import steps from '../data/steps.js';
import Icon from './Icon.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

export default function HowItWorks() {
  const stepsHtml = steps
    .map(
      (item, index) => `
      <div class="timeline-step reveal" style="--stagger: ${index + 1}">
        <div class="timeline-marker">
          <span class="timeline-number">${item.step}</span>
          <div class="timeline-line" aria-hidden="true"></div>
        </div>
        <div class="timeline-content">
          <div class="timeline-icon-box">
            ${Icon(item.icon, 'timeline-icon')}
          </div>
          <span class="timeline-subtitle">${item.subtitle}</span>
          <h3 class="timeline-title">${item.title}</h3>
          <p class="timeline-description">${item.description}</p>
        </div>
      </div>
    `
    )
    .join('');

  return `
    <section class="how-it-works-section" id="atendimento" aria-labelledby="how-title">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-badge">Etapas do atendimento</span>
          <h2 id="how-title" class="section-title">
            Como funciona o atendimento, passo a passo
          </h2>
          <p class="section-subtitle">
            Um processo transparente, atencioso e claro para orientar você e sua família.
          </p>
        </div>

        <div class="timeline-grid">
          ${stepsHtml}
        </div>

        <!-- REVISAR COM O ADVOGADO -->
        <div class="checklist-section-wrapper reveal">
          <div class="checklist-intro-header">
            <span class="section-badge">Orientações Iniciais</span>
            <h3 class="checklist-main-title">O que enviar no primeiro contato</h3>
            <p class="checklist-main-subtitle">Para agilizar a compreensão da situação e orientar os caminhos possíveis, tenha em mãos se possível:</p>
          </div>

          <div class="checklist-grid">
            <div class="editorial-checklist-card">
              <div class="card-top-row">
                <span class="card-index-num">01</span>
                <span class="card-top-icon">${Icon('person')}</span>
              </div>
              <h4 class="card-item-title">Nome completo</h4>
              <p class="card-item-desc">Da pessoa envolvida no processo ou inquérito.</p>
            </div>

            <div class="editorial-checklist-card">
              <div class="card-top-row">
                <span class="card-index-num">02</span>
                <span class="card-top-icon">${Icon('document')}</span>
              </div>
              <h4 class="card-item-title">Número do processo</h4>
              <p class="card-item-desc">Se você tiver essa informação em mãos.</p>
            </div>

            <div class="editorial-checklist-card">
              <div class="card-top-row">
                <span class="card-index-num">03</span>
                <span class="card-top-icon">${Icon('shield')}</span>
              </div>
              <h4 class="card-item-title">Unidade prisional</h4>
              <p class="card-item-desc">Onde a pessoa está custodiada, ou delegacia, se for o caso.</p>
            </div>

            <div class="editorial-checklist-card">
              <div class="card-top-row">
                <span class="card-index-num">04</span>
                <span class="card-top-icon">${Icon('dialog')}</span>
              </div>
              <h4 class="card-item-title">Última decisão</h4>
              <p class="card-item-desc">Ou uma breve descrição da notícia mais recente.</p>
            </div>

            <div class="editorial-checklist-card">
              <div class="card-top-row">
                <span class="card-index-num">05</span>
                <span class="card-top-icon">${Icon('heart')}</span>
              </div>
              <h4 class="card-item-title">Seu nome e relação</h4>
              <p class="card-item-desc">Seu nome e a relação com a pessoa (para familiares).</p>
            </div>
          </div>
        </div>

        <div class="timeline-footer reveal">
          <div class="timeline-cta-box">
            <div class="cta-box-text">
              <h4>Precisa de uma orientação para o seu caso?</h4>
              <p>Primeira conversa gratuita e, em geral, retorno em até 30 minutos.</p>
            </div>
            <a
              href="${createWhatsAppLink('default')}"
              class="button button-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${Icon('whatsapp', 'btn-icon')}
              <span>Conversar com o Dr. Renan no WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}
