import practiceAreas from '../data/practiceAreas.js';
import Icon from './Icon.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

// Entrada de cada card conforme a coluna que ocupa no grid de 3 colunas
const cardReveal = [
  { direction: 'card-center', column: 0 },
  { direction: 'card-left', column: 0 },
  { direction: 'card-center', column: 1 },
  { direction: 'card-right', column: 2 },
  { direction: 'card-left', column: 0 },
  { direction: 'card-right', column: 1 },
];

export default function PracticeAreas() {
  const cardsHtml = practiceAreas
    .map((area, index) => {
      const isUrgent = area.id === 'flagrante-custodia';
      const reveal = cardReveal[index] || { direction: 'card-center', column: 0 };
      const highlightsHtml = area.highlights
        ? `<ul class="bento-highlights">
            ${area.highlights.map((item) => `<li>${Icon('check', 'bento-highlight-icon')}<span>${item}</span></li>`).join('')}
          </ul>`
        : '';

      return `
        <article
          class="bento-card ${area.gridClass} reveal"
          data-reveal="${reveal.direction}"
          style="--stagger: ${reveal.column}"
          data-bento-card
        >
          <div class="card-spotlight" aria-hidden="true"></div>

          <div class="bento-card-header">
            <div class="bento-icon-wrapper ${isUrgent ? 'icon-urgent' : ''}">
              ${Icon(area.icon, 'bento-icon')}
            </div>
          </div>

          <div class="bento-card-body">
            <div class="bento-card-text">
              <span class="bento-tag">${area.tag}</span>
              <h3 class="bento-title">${area.title}</h3>
              <p class="bento-description">${area.description}</p>
            </div>
            ${highlightsHtml}
          </div>

          <div class="bento-card-footer">
            <span class="bento-badge">${area.badge}</span>
            <a
              href="${createWhatsAppLink('custom', area.whatsappMessage)}"
              class="bento-link"
              target="_blank"
              rel="noopener noreferrer"
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
            Da investigação ao cumprimento da pena
          </h2>
          <p class="section-subtitle desktop-only">
            Se o seu caso for diferente destes, vale conversar mesmo assim.
          </p>
        </div>

        <div class="bento-grid">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
}
