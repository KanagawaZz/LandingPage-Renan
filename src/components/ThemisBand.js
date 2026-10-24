export default function ThemisBand() {
  return `
    <section class="themis-band" aria-labelledby="themis-title">
      <div class="container themis-grid">
        <div class="themis-text reveal">
          <span class="themis-rule" aria-hidden="true"></span>
          <h2 id="themis-title" class="themis-quote">
            Cada fase do processo tem seus prazos e seus caminhos.
          </h2>
          <p class="themis-caption">Entender em que ponto o caso está é o primeiro passo da defesa.</p>
        </div>

        <figure class="themis-figure reveal" style="--stagger: 2">
          <div class="themis-frame">
            <img
              src="/images/themis.webp"
              alt="Estátua de Têmis, símbolo da Justiça, segurando a balança e a espada"
              class="themis-img"
              width="1024"
              height="682"
              loading="lazy"
            />
          </div>
        </figure>
      </div>
    </section>
  `;
}
