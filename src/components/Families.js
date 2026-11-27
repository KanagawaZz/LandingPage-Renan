import Icon from './Icon.js';
import siteConfig from '../data/siteConfig.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

// <!-- REVISAR COM O ADVOGADO -->
const checklist = [
  { title: 'Nome completo', description: 'Da pessoa presa ou investigada.' },
  { title: 'Número do processo', description: 'Se você tiver essa informação.' },
  { title: 'Unidade prisional ou delegacia', description: 'Onde a pessoa está no momento.' },
  { title: 'Última decisão ou notícia', description: 'Uma foto do documento ou um breve relato.' },
  { title: 'Seu nome e parentesco', description: 'Para saber com quem estou falando.' },
];

const points = [
  'Explicação da situação do processo e da fase da execução da pena',
  'Orientação sobre os documentos e as informações que ajudam na análise',
  'Visitas à unidade prisional, conforme o caso e a localidade',
];

export default function Families() {
  const checklistHtml = checklist
    .map(
      (item, index) => `
      <li>
        <span class="families-check-num" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
        <div>
          <strong>${item.title}</strong>
          <span>${item.description}</span>
        </div>
      </li>
    `
    )
    .join('');

  const pointsHtml = points.map((point) => `<li><span class="families-dash" aria-hidden="true"></span><span>${point}</span></li>`).join('');

  return `
    <section class="families-section" id="familiares" aria-labelledby="families-title">
      <div class="container families-grid">
        <div class="families-content reveal">
          <p class="eyebrow">Presos e familiares</p>
          <h2 id="families-title" class="section-title">Orientação para quem tem um familiar preso</h2>
          <p class="families-lead">
            Você pode entrar em contato em nome de um familiar preso para entender o que está acontecendo e quais são os próximos passos.
          </p>
          <ul class="families-points">
            ${pointsHtml}
          </ul>
          <a
            href="${createWhatsAppLink(siteConfig.contact.whatsappFamilyMessage)}"
            class="button button-primary button-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${Icon('whatsapp', 'btn-icon')}
            <span>Falar sobre um familiar preso</span>
            ${Icon('arrow-up-right', 'btn-arrow')}
          </a>
        </div>

        <div class="families-card reveal" style="--stagger: 1">
          <p class="families-card-label">Para a primeira conversa</p>
          <h3>O que ajuda na análise</h3>
          <ul class="families-checklist">
            ${checklistHtml}
          </ul>
          <p class="families-note">
            Não tem todas as informações? Entre em contato mesmo assim. A análise começa com o que você tiver.
          </p>
        </div>
      </div>
    </section>
  `;
}
