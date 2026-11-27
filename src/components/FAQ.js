import faq from '../data/faq.js';
import siteConfig from '../data/siteConfig.js';
import Icon from './Icon.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

// Layout assimétrico: título e ajuda à esquerda, perguntas à direita
export default function FAQ() {
  const faqItems = faq
    .map(
      (item, index) => `
      <details class="faq-item reveal" style="--stagger: ${index % 4}">
        <summary class="faq-summary">
          <span class="faq-question">${item.question}</span>
          <span class="faq-toggle-icon" aria-hidden="true"></span>
        </summary>
        <div class="faq-answer">
          <p>${item.answer}</p>
        </div>
      </details>
    `
    )
    .join('');

  // REVISAR COM O ADVOGADO
  return `
    <section class="faq-section" id="faq" aria-labelledby="faq-title">
      <div class="container faq-layout">
        <div class="faq-aside reveal">
          <p class="eyebrow">Perguntas frequentes</p>
          <h2 id="faq-title" class="section-title">Dúvidas comuns</h2>
          <p class="faq-subtitle">
            Respostas curtas e informativas. Cada caso concreto depende da leitura dos documentos.
          </p>
          <div class="faq-help">
            <p>Tem outra dúvida que não foi listada aqui? Envie sua pergunta pelo WhatsApp.</p>
            <a
              href="${createWhatsAppLink(siteConfig.contact.whatsappQuestionMessage)}"
              class="text-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enviar minha dúvida pelo WhatsApp (abre em nova aba)"
            >
              <span>Enviar minha dúvida</span>
              ${Icon('arrow-up-right', 'btn-arrow')}
            </a>
          </div>
        </div>

        <div class="faq-list">
          ${faqItems}
        </div>
      </div>
    </section>
  `;
}
