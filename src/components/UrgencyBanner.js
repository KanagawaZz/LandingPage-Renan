import Icon from './Icon.js';

export default function UrgencyBanner() {
  return `
    <section class="urgency-section desktop-only" id="urgencia" aria-labelledby="urgency-title">
      <div class="container">
        <div class="urgency-card reveal" data-reveal="zoom">
          <div class="urgency-ambient" aria-hidden="true"></div>
          
          <div class="urgency-header">
            <div class="urgency-badge">
              <span class="urgency-pulse" aria-hidden="true"></span>
              <span>Plantão Criminal</span>
            </div>
          </div>

          <div class="urgency-body">
            <h2 id="urgency-title" class="urgency-title">
              Prisão em flagrante ou audiência de custódia?
            </h2>
            <p class="urgency-subtitle">
              Atendimento em regime de plantão para medidas urgentes decorrentes de flagrante e audiência de custódia.
            </p>
            <div class="urgency-points">
              <div class="urgency-point">
                ${Icon('check', 'point-icon')}
                <span>Atendimento em plantão para flagrantes e audiências de custódia</span>
              </div>
              <div class="urgency-point">
                ${Icon('check', 'point-icon')}
                <span>Requerimento de liberdade provisória e relaxamento de prisão</span>
              </div>
              <div class="urgency-point">
                ${Icon('check', 'point-icon')}
                <span>Defesa dos direitos do custodiado</span>
              </div>
            </div>
          </div>

          <div class="urgency-actions">
            <a href="#contato" class="button button-urgency button-lg">
              <span>Informar uma prisão em flagrante</span>
              ${Icon('arrow', 'btn-arrow')}
            </a>
            <span class="urgency-disclaimer">
              ${Icon('map-pin', 'disclaimer-icon')} Informe a cidade e onde a pessoa está detida
            </span>
          </div>
        </div>
      </div>
    </section>
  `;
}
