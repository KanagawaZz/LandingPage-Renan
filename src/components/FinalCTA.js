import lawyer from '../data/lawyer.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';
import Icon from './Icon.js';

export default function FinalCTA() {
  return `
    <section class="final-cta section-green">
      <div class="container final-cta-inner reveal">
        <p class="eyebrow"><span></span> ${lawyer.focus}</p>
        <h2>Quer saber o que pode ser analisado na sua <em>situação?</em></h2>
        <p>Conte brevemente o que está acontecendo. Se faltar algum dado, isso pode ser conversado no primeiro contato.</p>
        <a class="button button-light" href="${createWhatsAppLink()}" target="_blank" rel="noopener noreferrer">
          Conversar no WhatsApp ${Icon('arrow')}
        </a>
        <span class="final-note">A análise e os próximos passos dependem das informações do caso.</span>
      </div>
    </section>`;
}
