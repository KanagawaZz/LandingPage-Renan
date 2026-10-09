import Icon from './Icon.js';

export default function TrustMarquee() {
  const items = [
    { text: 'Atendimento online em todo o Brasil', icon: 'scale' },
    { text: 'Atendimento a pessoas presas e familiares', icon: 'person' },
    { text: 'Atendimento em regime de plantão', icon: 'lock' },
    { text: 'Pós-graduado em Direito Penal e Processual Penal', icon: 'document' },
    { text: 'Visitas a unidades prisionais conforme a localidade', icon: 'shield-check' },
    { text: 'Formação pelo UNIVAG (2018)', icon: 'document' },
  ];

  const marqueeTrack = items
    .map(
      (item) => `
      <div class="marquee-item">
        ${Icon(item.icon, 'marquee-icon')}
        <span class="marquee-text">${item.text}</span>
        <span class="marquee-separator" aria-hidden="true">✦</span>
      </div>
    `
    )
    .join('');

  return `
    <section class="trust-marquee-section" aria-label="Informações de atendimento">
      <div class="marquee-container">
        <div class="marquee-track" aria-hidden="true">
          ${marqueeTrack}
          ${marqueeTrack}
        </div>
      </div>
    </section>
  `;
}
