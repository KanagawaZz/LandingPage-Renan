import practiceAreas from '../data/practiceAreas.js';
import lawyer from '../data/lawyer.js';
import Icon from './Icon.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

export default function PracticeAreas() {
  const cardsHtml = practiceAreas
    .map((area, index) => {
      const isUrgent = area.id === 'flagrante-custodia';

      return `
        <article
          class="bento-card ${area.gridClass} ${area.featured ? 'is-featured' : ''} reveal"
          style="--stagger: ${index + 1}"
          data-bento-card
        >
          <div class="card-spotlight" aria-hidden="true"></div>
          
          <div class="bento-card-header">
            <span class="bento-number">${area.number}</span>
            <div class="bento-icon-wrapper ${isUrgent ? 'icon-urgent' : ''}">
              ${Icon(area.icon, 'bento-icon')}
            </div>
          </div>

          <div class="bento-card-body">
            <span class="bento-tag">${area.tag}</span>
            <h3 class="bento-title">${area.title}</h3>
            <p class="bento-description">${area.description}</p>
          </div>

          <div class="bento-card-footer">
            <span class="bento-badge">${area.badge}</span>
            <a
              href="${createWhatsAppLink('custom', area.whatsappMessage)}"
              class="bento-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="${area.btnLabel}"
            >
              <span>${area.btnLabel}</span>
              ${Icon('arrow-up-right', 'link-icon')}
            </a>
          </div>
        </article>
      `;
    })
    .join('');

  return `
    <section class="practice-section" id="areas" aria-labelledby="practice-title">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-badge">Áreas de atuação</span>
          <h2 id="practice-title" class="section-title">
            Atuação técnica nas etapas da esfera criminal
          </h2>
          <p class="section-subtitle">
            Defesa técnica, com explicações claras em cada etapa, na defesa de direitos fundamentais.
          </p>
          <p class="practice-audience-tag">
            ${lawyer.targetAudience}
          </p>
        </div>

        <div class="bento-grid">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
}
