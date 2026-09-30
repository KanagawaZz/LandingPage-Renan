import { createWhatsAppLink } from '../utils/whatsapp.js';
import Icon from './Icon.js';

export default function Welcome() {
  return `
    <section class="welcome-section section-green">
      <div class="container welcome-layout">
        <div class="welcome-mark reveal" aria-hidden="true"><span>“</span><i></i></div>
        <div class="welcome-copy reveal">
          <p class="eyebrow"><span></span> Para familiares</p>
          <h2>Uma decisão judicial ou mudança no cumprimento da pena pode gerar dúvidas para <em>toda a família.</em></h2>
          <p>Conhecer a etapa do processo ajuda a identificar quais informações devem ser conferidas e quais dúvidas podem ser levadas ao advogado. Você pode começar contando o que já sabe.</p>
          <a class="button button-light" href="${createWhatsAppLink()}" target="_blank" rel="noopener noreferrer">Conversar sobre a situação ${Icon('arrow')}</a>
        </div>
        <div class="welcome-aside reveal">
          <span class="aside-number">01</span>
          <p>Uma conversa ajuda a organizar as informações. A análise jurídica vem depois, com atenção ao processo.</p>
          <span class="aside-rule"></span>
        </div>
      </div>
    </section>`;
}
