import lawyer from '../data/lawyer.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

export default function About() {
  return `
    <section class="section about-section section-paper" id="sobre">
      <div class="container about-layout">
        <div class="about-photo reveal">
          <div class="about-photo-frame">
            <img src="${lawyer.photo}" alt="Retrato de ${lawyer.name}" width="640" height="640" loading="lazy" />
          </div>
          <span class="about-photo-label">Direito Criminal · Execução Penal</span>
        </div>
        <div class="about-copy reveal">
          <p class="eyebrow eyebrow-dark">Sobre o advogado</p>
          <h2>Conheça a trajetória de <em>${lawyer.name}.</em></h2>
          <p class="about-name">${lawyer.name}<span>${lawyer.profession}</span></p>
          <p class="about-bio">${lawyer.bio}</p>
          ${(lawyer.oab || (lawyer.city && !lawyer.city.startsWith('['))) ? `<p class="pending-detail">${lawyer.oab ? `OAB ${lawyer.oab}` : ''}${lawyer.oab && lawyer.city ? ' · ' : ''}${lawyer.city && !lawyer.city.startsWith('[') ? lawyer.city : ''}</p>` : ''}
          <a class="text-link text-link-dark" href="${createWhatsAppLink()}" target="_blank" rel="noopener noreferrer">Falar com o advogado <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>`;
}
