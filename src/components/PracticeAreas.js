import practiceAreas from '../data/practiceAreas.js';
import Icon from './Icon.js';

export default function PracticeAreas() {
  const cards = practiceAreas
    .map(
      (area, index) => `
        <article class="practice-card reveal" style="--reveal-order:${index}">
          <div class="practice-card-top"><span>${area.number}</span>${Icon(area.icon)}</div>
          <h3>${area.title}</h3>
          <p>${area.description}</p>
          <a class="card-link" href="#atendimento" aria-label="Saiba como funciona o atendimento sobre ${area.title}">${Icon('arrow')}</a>
        </article>`,
    )
    .join('');

  return `
    <section class="section section-paper" id="atuacao">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow eyebrow-dark">Áreas de atuação</p>
          <h2>Em que podemos <em>ajudar</em></h2>
          <p class="section-intro">Cada situação exige uma análise individual. Estas são algumas das principais frentes de atuação.</p>
        </div>
        <div class="practice-grid">${cards}</div>
      </div>
    </section>`;
}
