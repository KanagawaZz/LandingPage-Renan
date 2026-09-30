import lawyer from '../data/lawyer.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

export default function About() {
  return `
    <section class="section about-section section-paper" id="sobre">
      <div class="container about-layout">
        <figure class="about-photo about-photo-themis reveal">
          <div class="about-photo-frame">
            <img src="/images/themis.webp" alt="Representação artística de Têmis com a balança da justiça e uma espada." width="768" height="1152" loading="lazy" decoding="async" />
          </div>
        </figure>
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
