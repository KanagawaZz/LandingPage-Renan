import lawyer from '../data/lawyer.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';
import Icon from './Icon.js';

export default function FinalCTA() {
  return `
    <section class="final-cta section-green">
      <div class="container final-cta-inner reveal">
        <p class="eyebrow"><span></span> ${lawyer.focus}</p>
        <h2>Tem dúvidas sobre uma situação de <em>Execução Penal?</em></h2>
        <p>Conte brevemente o que está acontecendo. Mesmo sem todas as informações do processo, você pode iniciar a conversa e esclarecer quais dados podem ser necessários.</p>
        <a class="button button-light" href="${createWhatsAppLink()}" target="_blank" rel="noopener noreferrer">
          Conversar sobre a situação ${Icon('arrow')}
        </a>
        <span class="final-note">A análise e os próximos passos dependem das informações do caso.</span>
      </div>
    </section>`;
}
