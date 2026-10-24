import steps from '../data/steps.js';
import Icon from './Icon.js';

const stepReveal = ['card-left', 'card-center', 'card-center', 'card-right'];

export default function HowItWorks() {
  const stepsHtml = steps
    .map(
      (item, index) => `
      <div class="timeline-step reveal" data-reveal="${stepReveal[index] || 'card-center'}" style="--stagger: ${index}">
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
    <section class="how-it-works-section desktop-only" id="atendimento" aria-labelledby="how-title">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-badge">Como funciona</span>
          <h2 id="how-title" class="section-title">
            Uma atuação pautada em método, comunicação e responsabilidade
          </h2>
          <p class="section-subtitle">
            Do primeiro contato ao acompanhamento do caso, você sabe o que está sendo feito e por quê.
          </p>
        </div>

        <div class="timeline-grid">
          ${stepsHtml}
        </div>
      </div>
    </section>
  `;
}
