import lawyer from '../data/lawyer.js';
import Icon from './Icon.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

export default function Hero() {
  return `
    <section class="hero-section has-film" id="hero" aria-labelledby="hero-title">
      <!-- Filme de abertura: o src é definido em src/utils/heroFilm.js (versão de computador ou de celular).
           Sem JavaScript, ou depois da primeira visita, fica o último quadro como imagem de fundo. -->
      <div class="hero-film" aria-hidden="true">
        <video
          class="hero-film-video"
          id="heroFilm"
          muted
          playsinline
          preload="none"
          disablepictureinpicture
          data-src-desktop="/videos/hero-film.mp4"
          data-src-mobile="/videos/hero-film-mobile.mp4"
        ></video>
        <div class="hero-film-veil"></div>
      </div>

      <div class="container hero-container">
        <div class="hero-content">
          <div class="hero-badge reveal" data-reveal="from-left" style="--stagger: 0">
            <span class="status-dot" aria-hidden="true"></span>
            <span class="badge-text">Atendimento online em todo o Brasil</span>
          </div>

          <p class="hero-meta reveal" data-reveal="from-left" style="--stagger: 1">
            ${lawyer.profession}
          </p>

          <h1 id="hero-title" class="hero-title reveal" data-reveal="from-left" style="--stagger: 2">
            Defesa criminal com <span class="text-accent">orientação clara</span> em cada etapa.
          </h1>

          <p class="hero-description reveal" data-reveal="from-left" style="--stagger: 3">
            Atuação em execução penal, investigações e processos criminais, com acompanhamento técnico e atendimento a pessoas presas e seus familiares.
          </p>

          <div class="hero-actions reveal" data-reveal="from-left" style="--stagger: 4">
            <a
              href="${createWhatsAppLink('default')}"
              class="button button-primary button-lg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Conversar com o Dr. Renan no WhatsApp"
            >
              ${Icon('whatsapp', 'btn-icon')}
              <span>Conversar no WhatsApp</span>
              ${Icon('arrow-up-right', 'btn-arrow')}
            </a>

            <a href="#areas" class="button button-secondary button-lg desktop-only">
              <span>Ver áreas de atuação</span>
              ${Icon('arrow', 'btn-arrow')}
            </a>
          </div>
        </div>

        <div class="hero-media reveal" data-reveal="from-right" style="--stagger: 2">
          <div class="hero-portrait">
            <div class="portrait-wireframe" aria-hidden="true"></div>

            <div class="portrait-frame">
              <img
                src="${lawyer.photoHero}"
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
