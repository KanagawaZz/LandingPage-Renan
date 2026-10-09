import lawyer from '../data/lawyer.js';
import Icon from './Icon.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

export default function Hero() {
  return `
    <section class="hero-section" id="hero" aria-labelledby="hero-title">
      <div class="hero-ambient-glow" aria-hidden="true"></div>
      
      <div class="container hero-container">
        <div class="hero-content">
          <div class="hero-badge reveal" style="--stagger: 0">
            <span class="status-dot" aria-hidden="true"></span>
            <span class="badge-text">Atendimento em todo o Brasil · Plantão para flagrantes</span>
          </div>

          <p class="hero-meta reveal" style="--stagger: 1">
            <strong>${lawyer.name}</strong> · ${lawyer.profession} · ${lawyer.oab}
          </p>

          <h1 id="hero-title" class="hero-title reveal" style="--stagger: 2">
            Defesa criminal com <span class="text-accent">clareza</span>, <span class="text-accent">atenção</span> e <span class="text-accent">seriedade</span>, em todo o Brasil.
          </h1>

          <p class="hero-description reveal" style="--stagger: 3">
            Atuação técnica em Execução Penal, audiências de custódia e processos criminais. Informação transparente sobre cada etapa, sem juridiquês e com disponibilidade para atendimento a pessoas presas e seus familiares.
          </p>

          <div class="hero-actions reveal" style="--stagger: 4">
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

            <a
              href="#areas"
              class="button button-secondary button-lg"
              aria-label="Ver todas as áreas de atuação"
            >
              <span>Ver áreas de atuação</span>
              ${Icon('arrow', 'btn-arrow')}
            </a>
          </div>

          <div class="hero-trust-pills reveal" style="--stagger: 5">
            <div class="trust-pill">
              ${Icon('check', 'trust-pill-icon')}
              <span>Primeira conversa gratuita</span>
            </div>
            <div class="trust-pill">
              ${Icon('clock', 'trust-pill-icon')}
              <span>Resposta em até 30 min</span>
            </div>
            <div class="trust-pill">
              ${Icon('shield-check', 'trust-pill-icon')}
              <span>Atendimento em plantão</span>
            </div>
          </div>
        </div>

        <div class="hero-media reveal" style="--stagger: 3">
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
                <span class="floating-card-subtitle">${lawyer.oab} · ${lawyer.cities}</span>
              </div>
            </div>

            <span class="portrait-index" aria-hidden="true">01 / 04 · ADVOCACIA</span>
          </div>
        </div>
      </div>
    </section>
  `;
}
