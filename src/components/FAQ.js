import faq from '../data/faq.js';
import Icon from './Icon.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

export default function FAQ() {
  const faqItems = faq
    .map(
      (item, index) => `
      <details class="faq-item reveal" style="--stagger: ${index + 1}">
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
    <section class="faq-section" id="faq" aria-labelledby="faq-title">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-badge">Perguntas Frequentes</span>
          <h2 id="faq-title" class="section-title">
            Dúvidas comuns sobre a atuação penal
          </h2>
          <p class="section-subtitle">
            Orientações claras para ajudar você e sua família a compreenderem melhor os passos jurídicos. Cada situação concreta exige análise detalhada.
          </p>
        </div>

        <div class="faq-list">
          ${faqItems}
        </div>

        <div class="faq-help-box reveal">
          <div class="help-box-content">
            <span class="help-icon-box">${Icon('dialog')}</span>
            <div class="help-text">
              <h4>Tem outra dúvida que não foi listada aqui?</h4>
              <p>Envie sua mensagem diretamente para entender a situação específica do seu caso.</p>
            </div>
          </div>
          <a
            href="${createWhatsAppLink('default')}"
            class="button button-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${Icon('whatsapp', 'btn-icon')}
            <span>Tirar dúvidas no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  `;
}
