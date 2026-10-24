import faq from '../data/faq.js';
import Icon from './Icon.js';

export default function FAQ() {
  const faqItems = faq
    .map(
      (item, index) => `
      <details class="faq-item reveal" style="--stagger: ${index % 4}">
        <summary class="faq-summary">
          <span class="faq-question">${item.question}</span>
          <span class="faq-toggle-icon" aria-hidden="true">
            ${Icon('chevron-down')}
          </span>
        </summary>
        <div class="faq-answer">
          <p>${item.answer}</p>
        </div>
      </details>
    `
    )
    .join('');

  return `
    <!-- REVISAR COM O ADVOGADO -->
    <section class="faq-section desktop-only" id="faq" aria-labelledby="faq-title">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-badge">Perguntas Frequentes</span>
          <h2 id="faq-title" class="section-title">
            Dúvidas comuns
          </h2>
          <p class="section-subtitle">
            Respostas curtas e informativas. Cada caso concreto depende da leitura dos documentos.
          </p>
        </div>

        <div class="faq-list">
          ${faqItems}
        </div>

        <div class="faq-help-box reveal">
          <div class="help-box-content">
            <span class="help-icon-box">${Icon('dialog')}</span>
            <div class="help-text">
              <h3>Tem outra dúvida que não foi listada aqui?</h3>
              <p>Envie sua pergunta pelos canais de contato logo abaixo.</p>
            </div>
          </div>
          <a href="#contato" class="button button-secondary">
            <span>Enviar minha dúvida</span>
            ${Icon('arrow', 'btn-arrow')}
          </a>
        </div>
      </div>
    </section>
  `;
}
