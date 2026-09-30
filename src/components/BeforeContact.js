import contactChecklist from '../data/contactChecklist.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';
import Icon from './Icon.js';

export default function BeforeContact() {
  const items = contactChecklist
    .map(
      (item, index) => `
        <article class="practice-card reveal" style="--reveal-order:${index}">
          <div class="practice-card-top"><span>${item.number}</span>${Icon(item.icon)}</div>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </article>`,
    )
    .join('');

  return `
    <section class="section section-paper" id="antes-de-chamar">
      <div class="container">
        <div class="section-heading reveal">
          <p class="eyebrow eyebrow-dark">Para começar a conversa</p>
          <h2>Antes de <em>chamar</em></h2>
          <p class="section-intro">Se tiver, deixe estes dados por perto. Eles podem ajudar a localizar informações do processo, mas não são necessários para iniciar a conversa.</p>
        </div>
        <div class="practice-grid checklist-grid">${items}</div>
        <div class="checklist-note reveal">
          <p><strong>Não tem todos os dados do processo? Tudo bem.</strong> Você pode iniciar a conversa contando o que já sabe sobre a situação.</p>
          <a class="button button-primary" href="${createWhatsAppLink()}" target="_blank" rel="noopener noreferrer">
            Conversar no WhatsApp ${Icon('arrow')}
          </a>
        </div>
      </div>
    </section>`;
}
