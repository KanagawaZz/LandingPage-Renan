import faq from '../data/faq.js';

export default function FAQ() {
  const items = faq
    .map(
      (item, index) => `
        <details class="faq-item reveal" ${index === 0 ? 'open' : ''}>
          <summary><span class="faq-index">0${index + 1}</span><span class="faq-question">${item.question}</span><span class="faq-plus" aria-hidden="true"></span></summary>
          <div class="faq-answer"><p>${item.answer}</p></div>
        </details>`,
    )
    .join('');

  return `
    <section class="section section-paper faq-section" id="duvidas">
      <div class="container faq-layout">
        <div class="faq-heading reveal">
          <p class="eyebrow eyebrow-dark">Informação com clareza</p>
          <h2>Dúvidas que podem <em>aparecer.</em></h2>
          <p>As respostas abaixo são gerais. A orientação para cada caso depende da análise das circunstâncias e dos documentos envolvidos.</p>
        </div>
        <div class="faq-list">${items}</div>
      </div>
    </section>`;
}
