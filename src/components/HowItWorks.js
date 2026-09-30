import steps from '../data/steps.js';

export default function HowItWorks() {
  const items = steps
    .map(
      (step, index) => `
        <article class="step-card reveal" style="--reveal-order:${index}">
          <span class="step-number">${step.number}</span>
          <span class="step-dot" aria-hidden="true"></span>
          <h3>${step.title}</h3>
          <p>${step.description}</p>
        </article>`,
    )
    .join('');

  return `
    <section class="section section-sand" id="atendimento">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow eyebrow-dark">Etapas do atendimento</p>
          <h2>Como funciona o <em>atendimento</em></h2>
          <p class="section-intro">Veja o que acontece depois da primeira mensagem.</p>
        </div>
        <div class="steps-grid">${items}</div>
      </div>
    </section>`;
}
