export function initHeroVideo() {
  const heroVideo = document.querySelector('.hero-film-video');
  if (!heroVideo) return;

  const videoMedia = window.matchMedia(
    '(width > 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  );
  const connection = navigator.connection;
  const canObserve = 'IntersectionObserver' in window;
  let heroInView = !canObserve;
  let heroFinished = false;
  let resumeAt = 0;
  heroVideo.defaultPlaybackRate = 0.9;
  heroVideo.playbackRate = 0.9;

  function updateHeroVideo() {
    heroFinished ||= heroVideo.ended;
    if (!videoMedia.matches || connection?.saveData) {
      if (heroVideo.hasAttribute('src')) {
        resumeAt = heroVideo.currentTime;
        heroVideo.pause();
        heroVideo.classList.remove('is-playing');
        heroVideo.removeAttribute('src');
        heroVideo.load();
      }
      return;
    }

    if (heroFinished) return;

    if (!heroInView) {
      heroVideo.pause();
      return;
    }

    if (!heroVideo.hasAttribute('src')) {
      heroVideo.src = heroVideo.dataset.src;
      if (resumeAt > 0) heroVideo.currentTime = resumeAt;
    }
    if (heroVideo.paused) heroVideo.play().catch(() => {});
  }

  heroVideo.addEventListener('playing', () => heroVideo.classList.add('is-playing'));
  heroVideo.addEventListener('error', () => heroVideo.classList.remove('is-playing'));
  videoMedia.addEventListener('change', updateHeroVideo);
  connection?.addEventListener('change', updateHeroVideo);

  if (canObserve) {
    const observer = new IntersectionObserver(([entry]) => {
      heroInView = entry.isIntersecting;
      updateHeroVideo();
    });
    observer.observe(heroVideo.closest('.hero-section'));
  } else {
    updateHeroVideo();
  }
}
