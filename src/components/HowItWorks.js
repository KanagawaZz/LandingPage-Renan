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
          <h2 id="how-title" class="section-title">
            Como funciona o atendimento
          </h2>
        </div>

        <div class="timeline-grid">
          ${stepsHtml}
        </div>
      </div>
    </section>
  `;
}
