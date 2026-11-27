import { defenseStages } from '../data/practiceAreas.js';
import Icon from './Icon.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

const pad = (n) => String(n).padStart(2, '0');

export default function PracticeAreas() {
  const total = pad(defenseStages.length);

  const stages = defenseStages
    .map(({ title, situation, activities, topics }, index) => {
      const topicsHtml = topics.length
        ? `<ul class="journey-topics" aria-label="Inclui">
            ${topics.map((topic) => `<li>${topic}</li>`).join('')}
          </ul>`
        : '';

      return `
        <li class="journey-stage" data-journey-stage data-index="${pad(index + 1)}">
          <span class="journey-node" aria-hidden="true"></span>
          <span class="journey-index" aria-hidden="true">${pad(index + 1)}</span>
          <h3 class="journey-title">${title}</h3>
          <p class="journey-situation">“${situation}”</p>
          ${activities.map((activity) => `<p class="journey-activity">${activity}</p>`).join('')}
          ${topicsHtml}
        </li>
      `;
    })
    .join('');

  // REVISAR COM O ADVOGADO: chamada do rodapé da jornada ("Não sabe em que etapa...")
  return `
    <section class="journey-section" id="areas" aria-labelledby="practice-title">
      <div class="container journey-layout">
        <div class="journey-aside">
          <div class="journey-aside-inner">
            <p class="eyebrow">Áreas de atuação</p>
            <h2 id="practice-title" class="section-title">Atuação criminal do início ao fim.</h2>
            <p class="journey-note">
              Cada caso tem seu próprio percurso. A atuação pode começar em qualquer uma destas etapas.
            </p>

            <div class="journey-counter" aria-hidden="true">
              <span class="journey-counter-num" data-journey-counter>01</span>
              <span class="journey-counter-total">/ ${total}</span>
            </div>
          </div>
        </div>

        <div class="journey" data-journey>
          <span class="journey-track" aria-hidden="true"><span class="journey-progress"></span></span>
          <ol class="journey-list">
            ${stages}
          </ol>
        </div>

        <div class="journey-footer">
          <p class="journey-footer-text">Não sabe em que etapa está o seu caso?</p>
          <a href="${createWhatsAppLink()}" class="button button-primary" target="_blank" rel="noopener noreferrer">
            ${Icon('whatsapp', 'btn-icon')}
            <span>Conversar sobre meu caso</span>
          </a>
        </div>
      </div>
    </section>
  `;
}
