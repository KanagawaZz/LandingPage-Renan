// Filme de abertura do hero (roda a cada carregamento da página)
// - O filme roda em tela cheia com o conteúdo oculto e a rolagem travada no topo.
// - Aos REVEAL_AT segundos, ou no primeiro gesto (rolar, deslizar, tocar, teclar), o conteúdo
//   entra pelas laterais: textos pela esquerda, foto pela direita.
// - A rolagem só é liberada quando essa entrada termina, para que ela seja vista por inteiro.
// - Ao terminar, o filme fica parado no último quadro, como fundo do hero.
// - Sem vídeo (erro, autoplay bloqueado, rede lenta) ou com "reduzir movimento":
//   o conteúdo aparece sobre o último quadro (imagem), sem travar a rolagem.
const REVEAL_AT = 3; // segundo do filme em que o conteúdo começa a entrar
const START_TIMEOUT = 2500; // se o filme não começar até aqui (ms), revela sem ele
const ENTRANCE_DURATION = 3000; // duração da entrada do conteúdo (ms) antes de liberar a rolagem
const INTERRUPTIONS = ['wheel', 'touchmove', 'keydown', 'pointerdown'];

export function initHeroFilm({ lockScroll = () => {}, unlockScroll = () => {} } = {}) {
  const hero = document.querySelector('#hero');
  const video = document.querySelector('#heroFilm');
  // O index.html já liga a abertura no primeiro quadro; daqui em diante este módulo a controla
  clearTimeout(window.__heroFilmFallback);
  if (!hero || !video) {
    document.documentElement.classList.remove('hero-film-intro');
    return;
  }

  const heroItems = hero.querySelectorAll('.reveal');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    heroItems.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const root = document.documentElement;
  let revealed = false;
  let startTimer;

  // Recarregar a página volta ao topo, onde a abertura acontece
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  function unlock() {
    root.classList.remove('hero-film-lock');
    unlockScroll();
  }

  function reveal() {
    if (revealed) return;
    revealed = true;
    clearTimeout(startTimer);
    INTERRUPTIONS.forEach((type) => window.removeEventListener(type, reveal));

    root.classList.remove('hero-film-intro');
    // Dois quadros para o navegador registrar o estado oculto antes da transição
    requestAnimationFrame(() =>
      requestAnimationFrame(() => heroItems.forEach((el) => el.classList.add('is-visible')))
    );
    setTimeout(unlock, ENTRANCE_DURATION);
  }

  function dropVideo() {
    hero.classList.remove('film-playing');
    video.removeAttribute('src');
    video.load();
    reveal();
  }

  root.classList.add('hero-film-intro', 'hero-film-lock');
  hero.classList.add('film-playing');
  lockScroll();

  video.src = isMobile ? video.dataset.srcMobile : video.dataset.srcDesktop;
  video.addEventListener('timeupdate', () => {
    if (video.currentTime >= REVEAL_AT) reveal();
  });
  video.addEventListener('ended', reveal, { once: true });
  video.addEventListener('error', dropVideo, { once: true });

  INTERRUPTIONS.forEach((type) => window.addEventListener(type, reveal, { passive: true }));

  startTimer = setTimeout(() => {
    if (video.currentTime < 0.1) dropVideo();
  }, START_TIMEOUT);

  const playing = video.play();
  if (playing) playing.catch(dropVideo);
}
