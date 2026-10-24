import lawyer from '../data/lawyer.js';
import Icon from './Icon.js';

export default function About() {
  return `
    <section class="about-section" id="sobre" aria-labelledby="about-title">
      <div class="container">
        <div class="about-avatar reveal desktop-only" data-reveal="zoom">
          <div class="about-avatar-ring">
            <picture>
              <source srcset="${lawyer.photoHeroWebp}" type="image/webp" />
              <img
                src="${lawyer.photoHero}"
                alt="Renan Moraes - Advogado Criminalista OAB/MT 37.334"
                class="about-avatar-img"
                width="208"
                height="208"
                loading="lazy"
              />
            </picture>
          </div>
        </div>

        <div class="about-row">
          <div class="about-content reveal" data-reveal="from-left">
            <span class="section-badge">Sobre mim</span>
            <h2 id="about-title" class="section-title">Quem conduz o seu caso</h2>

            <div class="about-text">
              <p>
                Sou <strong>Renan Moraes</strong>, advogado criminalista com foco em execução penal e na defesa de pessoas presas.
              </p>
              <!-- REVISAR COM O ADVOGADO: confirmar que o atendimento é sempre feito diretamente por ele -->
              <p>
                O atendimento é feito diretamente comigo, do primeiro contato ao acompanhamento do caso. Você fala com quem está, de fato, cuidando da sua defesa.
              </p>
            </div>
          </div>

          <div class="about-credentials reveal" data-reveal="from-right" style="--stagger: 1">
              <div class="credential-item">
                <span class="credential-icon">${Icon('shield-check')}</span>
                <div>
                  <strong>Registro Profissional</strong>
                  <p>
                    ${lawyer.oab} ·
                    <!-- CONFIRMAR LINK DIRETO DO CNA -->
                    <a
                      href="${lawyer.oabConsultUrl}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="oab-verify-link"
                      aria-label="Consultar registro de Renan Moraes no Cadastro Nacional dos Advogados (CNA/OAB)"
                    >
                      <span>Consultar no Cadastro Nacional da OAB (CNA)</span>
                      ${Icon('arrow-up-right', 'link-icon-sm')}
                    </a>
                  </p>
                </div>
              </div>
              <div class="credential-item">
                <span class="credential-icon">${Icon('document')}</span>
                <div>
                  <strong>Formação Acadêmica</strong>
                  <p>${lawyer.education.undergrad}</p>
                </div>
              </div>
              <div class="credential-item">
                <span class="credential-icon">${Icon('scale')}</span>
                <div>
                  <strong>Pós-graduação</strong>
                  <p>${lawyer.education.postgrad1} · ${lawyer.education.postgrad2}</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
