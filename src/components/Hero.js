import lawyer from '../data/lawyer.js';
import Icon from './Icon.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

export default function Hero() {
  return `
    <section class="hero-section" id="hero" aria-labelledby="hero-title">
      <div class="hero-film" aria-hidden="true">
        <video class="hero-film-video" muted playsinline preload="none" disablepictureinpicture></video>
      </div>
      <div class="container hero-container">
        <div class="hero-content">
          <h1 id="hero-title" class="hero-title">
            Defesa criminal com <span class="text-accent">orientação clara</span> em cada etapa.
          </h1>

          <p class="hero-description">
            Atuação em execução penal, investigações e processos criminais. Orientação a pessoas presas e seus familiares sobre os próximos passos.
          </p>

          <div class="hero-actions">
            <a
              href="${createWhatsAppLink()}"
              class="button button-primary button-lg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Conversar com o Dr. Renan no WhatsApp"
            >
              ${Icon('whatsapp', 'btn-icon')}
              <span>Conversar no WhatsApp</span>
              ${Icon('arrow-up-right', 'btn-arrow')}
            </a>

            <a href="#areas" class="button button-secondary button-lg">
              <span>Ver áreas de atuação</span>
              ${Icon('arrow', 'btn-arrow')}
            </a>
          </div>
          <p class="hero-coverage">Atendimento online em todo o Brasil</p>
        </div>

        <div class="hero-media">
          <div class="hero-portrait">
            <div class="portrait-wireframe" aria-hidden="true"></div>

            <div class="portrait-frame">
              <img
                src="${lawyer.photoHeroWebp}"
                alt="Renan Moraes - Advogado Criminalista OAB/MT 37.334"
                class="portrait-img"
                width="480"
                height="580"
                fetchpriority="high"
                loading="eager"
              />
              <div class="portrait-fade" aria-hidden="true"></div>
            </div>

            <div class="hero-floating-card">
              <div class="floating-card-icon">
                ${Icon('shield', 'card-icon')}
              </div>
              <div class="floating-card-text">
                <span class="floating-card-title">${lawyer.name}</span>
                <a
                  href="${lawyer.oabConsultUrl}"
                  class="floating-card-subtitle floating-card-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ${lawyer.oab} · Consultar no CNA ${Icon('arrow-up-right', 'link-icon-sm')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
