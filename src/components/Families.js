import Icon from './Icon.js';

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
      (item) => `
      <li>
        ${Icon('check')}
        <div>
          <strong>${item.title}</strong>
          <span>${item.description}</span>
        </div>
      </li>
    `
    )
    .join('');

  const pointsHtml = points.map((point) => `<li>${Icon('check')}<span>${point}</span></li>`).join('');

  return `
    <section class="families-section desktop-only" id="familiares" aria-labelledby="families-title">
      <div class="container families-grid">
        <div class="families-content reveal" data-reveal="from-left">
          <span class="section-badge">Presos e familiares</span>
          <h2 id="families-title" class="section-title">Orientação para quem tem um familiar preso</h2>
          <p class="families-lead">
            Você pode entrar em contato em nome de um familiar preso para entender o que está acontecendo e quais são os próximos passos.
          </p>
          <ul class="families-points">
            ${pointsHtml}
          </ul>
          <a href="#contato" class="button button-secondary">
            <span>Falar sobre um familiar preso</span>
            ${Icon('arrow', 'btn-arrow')}
          </a>
        </div>

        <div class="families-card reveal" data-reveal="from-right" style="--stagger: 1">
          <h3>O que ajuda na primeira conversa</h3>
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
