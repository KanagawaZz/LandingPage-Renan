import lawyer from '../data/lawyer.js';
import Icon from './Icon.js';

export default function About() {
  const portrait = lawyer.institutionalPortrait;
  const srcset = portrait.widths.map((width) => `${portrait.base}-${width}.webp ${width}w`).join(', ');

  // CONFIRMAR LINK DIRETO DO CNA (lawyer.oabConsultUrl abre a busca geral)
  // REVISAR COM O ADVOGADO: segundo parágrafo montado com os dados de lawyer.js

  return `
    <section class="about-section" id="sobre" aria-labelledby="about-title">
      <div class="container about-layout">
        <figure class="about-visual reveal">
          <div class="about-frame">
            <img
              src="${portrait.base}-800.webp"
              srcset="${srcset}"
              sizes="(max-width: 768px) min(92vw, 440px), (max-width: 1200px) 37vw, 440px"
              width="${portrait.width}"
              height="${portrait.height}"
              alt="${portrait.alt}"
              class="about-portrait-image"
              loading="lazy"
              decoding="async"
            />
            <span class="about-frame-reflection" aria-hidden="true"></span>
          </div>
        </figure>

        <div class="about-main reveal" style="--stagger: 2">
          <p class="eyebrow">Quem conduz o seu caso</p>
          <h2 id="about-title" class="about-name">${lawyer.displayName}</h2>
          <p class="about-oab">
            <span>Advogado</span>
            <span class="about-oab-sep" aria-hidden="true"></span>
            <span>${lawyer.oab}</span>
            <a
              href="${lawyer.oabConsultUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="oab-verify-link"
              aria-label="Consultar o registro do ${lawyer.displayName} no Cadastro Nacional dos Advogados (abre em nova aba)"
            >
              <span>Consultar no CNA</span>
              ${Icon('arrow-up-right', 'link-icon-sm')}
            </a>
          </p>

          <div class="about-text">
            <p class="about-lead">
              Meu compromisso é conduzir a defesa com responsabilidade técnica e respeito à ética profissional.
            </p>
            <p>
              ${lawyer.targetAudience} O atendimento é online em todo o Brasil e presencial em Cuiabá e Várzea Grande,
              incluindo visitas a unidades prisionais, conforme o caso e a localidade.
            </p>
          </div>
        </div>

        <dl class="about-credentials reveal" style="--stagger: 2">
          <div class="credential-item">
            <dt>Formação</dt>
            <dd>${lawyer.education.undergrad}</dd>
          </div>
          <div class="credential-item">
            <dt>Pós-graduação</dt>
            <dd>${lawyer.education.postgrad1}</dd>
          </div>
          <div class="credential-item">
            <dt>Em formação</dt>
            <dd>${lawyer.education.postgrad2}</dd>
          </div>
        </dl>
      </div>
    </section>
  `;
}
