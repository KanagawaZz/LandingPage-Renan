// Faixa marfim logo após a abertura: título em largura total (uma frase por linha
// no desktop) e, abaixo de um fio, o texto em duas colunas, sem disputar com o título.
export default function DefenseOverview() {
  return `
    <section class="overview-section theme-ivory" id="defesa" aria-labelledby="defense-title">
      <div class="container overview-grid">
        <header class="reveal">
          <p class="eyebrow">Advocacia criminal</p>
          <h2 id="defense-title" class="section-title overview-title">
            <span>Cada etapa exige estratégia.</span>
            <span>Cada direito merece proteção.</span>
          </h2>
        </header>

        <div class="overview-copy">
          <p class="overview-lead reveal">
            A atuação criminal exige atenção desde os primeiros momentos de uma investigação. As decisões tomadas em cada etapa podem influenciar os próximos passos do caso.
          </p>
          <p class="overview-body reveal" style="--stagger: 1">
            Conduzo a defesa com atenção aos fatos e respeito aos direitos e às garantias fundamentais de cada pessoa que acompanho.
          </p>
        </div>
      </div>
    </section>
  `;
}
