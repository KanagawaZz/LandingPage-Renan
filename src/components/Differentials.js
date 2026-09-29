import lawyer from '../data/lawyer.js';
import Icon from './Icon.js';

const descriptions = {
  Sigilo: 'Informações pessoais e jurídicas tratadas com discrição e conforme os deveres profissionais.',
  'Atenção individual': 'Cada situação é considerada a partir de suas particularidades.',
  'Comunicação clara': 'Explicações em linguagem acessível, sem excesso de termos técnicos.',
  Respeito: 'Uma conversa cuidadosa e respeitosa com quem busca compreender a situação.',
};

const icons = ['lock', 'person', 'clarity', 'heart'];

export default function Differentials() {
  const items = lawyer.values
    .map(
      (value, index) => `
        <article class="value-item reveal" style="--reveal-order:${index}">
          <span class="value-icon">${Icon(icons[index])}</span>
          <h3>${value}</h3>
          <p>${descriptions[value]}</p>
        </article>`,
    )
    .join('');

  return `
    <section class="section section-dark values-section">
      <div class="container">
        <div class="section-heading section-heading-light reveal">
          <p class="eyebrow"><span></span> Compromissos no atendimento</p>
          <h2>Uma relação profissional baseada em <em>confiança.</em></h2>
        </div>
        <div class="values-grid">${items}</div>
      </div>
    </section>`;
}
