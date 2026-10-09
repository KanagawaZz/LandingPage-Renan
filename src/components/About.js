import lawyer from '../data/lawyer.js';
import Icon from './Icon.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

export default function About() {
  const pillarsHtml = lawyer.pillars
    .map(
      (pillar, index) => `
      <div class="pillar-card reveal" style="--stagger: ${index + 1}" data-pillar-num="0${index + 1}">
        <div class="pillar-icon-box">
          ${Icon(pillar.icon, 'pillar-icon')}
        </div>
        <h4 class="pillar-title">${pillar.title}</h4>
        <p class="pillar-description">${pillar.description}</p>
      </div>
    `
    )
    .join('');

  return `
    <section class="about-section" id="sobre" aria-labelledby="about-title">
      <div class="container">
        <div class="about-grid">
          <div class="about-media reveal">
            <div class="about-photo-wrapper">
              <div class="about-photo-frame">
                <img
                  src="${lawyer.photo}"
                  alt="Renan Moraes - Advogado Criminalista OAB/MT 37.334"
                  class="about-photo"
                  width="440"
                  height="520"
                  loading="lazy"
                />
              </div>
              <div class="about-photo-badge">
                <span class="badge-accent">${lawyer.oab}</span>
                <span class="badge-sub">${lawyer.cities}</span>
              </div>
            </div>
          </div>

          <div class="about-content reveal">
            <span class="section-badge">Sobre o Advogado</span>
            <h2 id="about-title" class="section-title">
              Defesa técnica, com explicações claras em cada etapa
            </h2>
            
            <div class="about-text">
              <p>
                Sou <strong>Renan Moraes</strong>, advogado criminalista inscrito na OAB/MT 37.334. Minha atuação é pautada no rigor técnico da lei e no compromisso com um atendimento humano e transparente com quem confia no meu trabalho.
              </p>
              <p>
                <strong>${lawyer.targetAudience}</strong>
              </p>
              <p>
                Concluí minha graduação em Direito pelo Centro Universitário de Várzea Grande (UNIVAG) em 2018. Sou pós-graduado em Direito Penal e Processual Penal e pós-graduando em Licitações Públicas e Contratos Administrativos.
              </p>
              <!-- CONFIRMAR COM O ADVOGADO: em quais cidades/regiões atende presencialmente -->
              <p>
                Realizo atendimento online em todo o Brasil; atendimento presencial, incluindo visitas a unidades prisionais, conforme o caso e a localidade.
              </p>
            </div>

            <div class="about-credentials">
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

            <div class="about-cta">
              <a
                href="${createWhatsAppLink('default')}"
                class="button button-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                ${Icon('whatsapp', 'btn-icon')}
                <span>Conversar com o Dr. Renan no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div class="pillars-container">
          <div class="pillars-header reveal">
            <h3 class="pillars-main-title">Três pilares que norteiam toda a minha atuação</h3>
            <p class="pillars-main-subtitle">
              Princípios aplicados desde o primeiro contato até o encerramento do processo.
            </p>
          </div>
          <div class="pillars-grid">
            ${pillarsHtml}
          </div>
        </div>
      </div>
    </section>
  `;
}
