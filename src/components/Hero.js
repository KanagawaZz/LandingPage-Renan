import lawyer from '../data/lawyer.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';
import Icon from './Icon.js';

export default function Hero() {
  const details = [
    lawyer.oab ? `OAB ${lawyer.oab}` : '',
    lawyer.city && !lawyer.city.startsWith('[') ? lawyer.city : '',
  ].filter(Boolean);

  return `
    <section class="hero section-dark" id="inicio">
      <div class="hero-grain" aria-hidden="true"></div>
      <div class="container hero-layout">
        <div class="hero-copy reveal">
          <p class="eyebrow"><span></span> ${lawyer.focus}</p>
          <h1>Um familiar está preso?<br /><em>Vamos entender o caso.</em></h1>
          <p class="hero-description">
            Uma decisão ou mudança no cumprimento da pena pode gerar dúvidas.
            A conversa inicial ajuda a apresentar o contexto e identificar quais informações são importantes para avaliar o caso.
          </p>
          <div class="hero-actions">
            <a class="button button-primary" href="${createWhatsAppLink()}" target="_blank" rel="noopener noreferrer">
              Conversar sobre a situação ${Icon('arrow')}
            </a>
            <a class="text-link" href="#sobre">Conhecer o advogado <span aria-hidden="true">↓</span></a>
          </div>
          <p class="hero-note"><span class="note-rule"></span> Você pode iniciar a conversa sem ter todos os dados do processo</p>
          ${details.length ? `<div class="lawyer-details">${details.map((detail) => `<span>${detail}</span>`).join('')}</div>` : ''}
        </div>
        <div class="hero-portrait reveal">
          <div class="portrait-frame">
            <img src="${lawyer.photo}" alt="Retrato de ${lawyer.name}" width="640" height="640" fetchpriority="high" />
          </div>
          <span class="portrait-index" aria-hidden="true">01 / 04</span>
        </div>
      </div>
      <a class="hero-scroll" href="#atuacao"><span aria-hidden="true"></span> Explore a página</a>
    </section>`;
}
