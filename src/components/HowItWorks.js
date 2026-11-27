import steps from '../data/steps.js';

// Quatro passos ligados por um fio que se desenha quando a seção entra na tela
export default function HowItWorks() {
  const stepsHtml = steps
    .map(
      (item, index) => `
      <li class="step reveal" style="--stagger: ${index + 1}">
        <span class="step-node" aria-hidden="true"></span>
        <span class="step-number" aria-hidden="true">${item.step}</span>
        <h3 class="step-title">${item.title}</h3>
        <p class="step-description">${item.description}</p>
      </li>
    `
    )
    .join('');

  return `
    <section class="how-it-works-section theme-ivory" id="atendimento" aria-labelledby="how-title">
      <div class="container">
        <div class="section-header reveal">
          <p class="eyebrow eyebrow-center">Atendimento</p>
          <h2 id="how-title" class="section-title">Como funciona o atendimento</h2>
        </div>

        <div class="steps">
          <span class="steps-line reveal" data-reveal="draw" aria-hidden="true"></span>
          <ol class="steps-grid">
            ${stepsHtml}
          </ol>
        </div>
      </div>
    </section>
  `;
}
