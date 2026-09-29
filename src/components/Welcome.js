import { createWhatsAppLink } from '../utils/whatsapp.js';
import Icon from './Icon.js';

export default function Welcome() {
  return `
    <section class="welcome-section section-green">
      <div class="container welcome-layout">
        <div class="welcome-mark reveal" aria-hidden="true"><span>“</span><i></i></div>
        <div class="welcome-copy reveal">
          <p class="eyebrow"><span></span> Para familiares</p>
          <h2>Uma decisão ou mudança na pena pode deixar a família sem saber <em>o que fazer.</em></h2>
          <p>Entender em que etapa o processo está ajuda a identificar o que precisa ser conferido e quais dúvidas levar ao advogado. Você pode começar contando o que já sabe.</p>
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
