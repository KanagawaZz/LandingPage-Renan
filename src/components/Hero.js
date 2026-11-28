import lawyer from '../data/lawyer.js';
import siteConfig from '../data/siteConfig.js';
import Icon from './Icon.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

const srcset = ({ base, widths }) => widths.map((w) => `${base}-${w}.webp ${w}w`).join(', ');

function Portrait() {
  const { desktop, mobile, fallback, alt } = lawyer.portrait;
  const mobileSizes = 'min(100vw, 640px)';
  const desktopSizes = '(width > 900px) min(50vw, 720px), min(100vw, 640px)';

  return `
    <picture>
      <source media="(max-width: 768px)" srcset="${srcset(mobile)}" sizes="${mobileSizes}" />
      <img
        src="${fallback}"
        srcset="${srcset(desktop)}"
        sizes="${desktopSizes}"
        alt="${alt}"
        class="hero-portrait-img"
        width="${desktop.width}"
        height="${desktop.height}"
        fetchpriority="high"
        loading="eager"
      />
    </picture>
  `;
}

function HeroFilm() {
  const film = siteConfig.heroFilm;

  return `
    <div class="hero-film" aria-hidden="true">
      <picture>
        <source media="(max-width: 900px)" srcset="${film.posterSmall}" />
        <img class="hero-film-poster" src="${film.poster}" alt="" width="1280" height="720"
          decoding="async" fetchpriority="low" />
      </picture>
      <video
        class="hero-film-video"
        autoplay
        muted
        playsinline
        preload="none"
        disablepictureinpicture
        data-src="${film.video}"
      ></video>
    </div>
  `;
}

export default function Hero() {
  return `
    <section
      class="hero-section"
      id="hero"
      aria-labelledby="hero-title"
    >
      ${HeroFilm()}

      <div class="hero-media">
        <div class="hero-portrait">
          ${Portrait()}
        </div>
      </div>

      <div class="container hero-container">
        <div class="hero-content">
          <!-- O H1 reúne a linha "Dr. Renan Moraes · Advogado criminalista" e o título:
               quem é, a especialidade e a proposta, sem mudar nenhum texto visível. -->
          <h1 id="hero-title" class="hero-heading">
            <span class="hero-eyebrow hero-step" style="--step: 0">
              <span>${lawyer.displayName}</span>
              <span class="hero-eyebrow-sep" aria-hidden="true">·</span>
              <span>Advogado criminalista</span>
            </span>
            <span class="hero-title">
              <span class="hero-line"><span class="hero-line-inner" style="--step: 1">Sua defesa começa</span></span>
              <span class="hero-line"><span class="hero-line-inner text-accent" style="--step: 2">antes mesmo do&nbsp;processo.</span></span>
            </span>
          </h1>

          <p class="hero-description hero-step" style="--step: 4">
            Defesa técnica e acompanhamento jurídico em todas as etapas de um caso criminal.
          </p>

          <div class="hero-actions hero-step" style="--step: 5">
            <a
              href="${createWhatsAppLink()}"
              class="button button-primary button-lg"
              target="_blank"
              rel="noopener noreferrer"
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

          <p class="hero-meta hero-step" style="--step: 6">
            <a
              href="${lawyer.oabConsultUrl}"
              class="hero-oab-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="${lawyer.oab}: consultar no Cadastro Nacional dos Advogados (abre em nova aba)"
            >
              ${lawyer.oab} · Consultar no CNA ${Icon('arrow-up-right', 'link-icon-sm')}
            </a>
            <span>Cuiabá e Várzea Grande · Online em todo o Brasil</span>
          </p>
        </div>
      </div>
    </section>
  `;
}
