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
          <p class="section-intro">Se tiver, deixe estes dados por perto. Eles ajudam a localizar as informações do processo.</p>
        </div>
        <div class="practice-grid checklist-grid">${items}</div>
        <div class="checklist-note reveal">
          <p>Não tem esses dados agora? Você ainda pode chamar e contar o que sabe.</p>
          <a class="button button-primary" href="${createWhatsAppLink()}" target="_blank" rel="noopener noreferrer">
            Conversar no WhatsApp ${Icon('arrow')}
          </a>
        </div>
      </div>
    </section>`;
}
