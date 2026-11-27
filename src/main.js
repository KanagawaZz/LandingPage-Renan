// Ponto de entrada das interações da landing. O HTML é pré-renderizado por src/render.js.
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { initHeroVideo } from './interactions/heroVideo.js';
import { createJourneyUpdater } from './interactions/journey.js';
import { initNavigation } from './interactions/navigation.js';
import siteConfig from './data/siteConfig.js';
import { initConsent } from './utils/consent.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

initHeroVideo();

let lenis = null;
if (!prefersReducedMotion) {
  lenis = new Lenis({
    duration: 0.75,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.15,
    touchMultiplier: 1.1,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

initNavigation({ lenis, prefersReducedMotion, updateJourney: createJourneyUpdater(prefersReducedMotion) });

// Anima cada seção uma vez ao entrar na tela.
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      target.classList.add('is-visible');
      revealObserver.unobserve(target);
    });
  }, { threshold: 0.08 });

  document.documentElement.classList.add('js');
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
}

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
  });
});

// Aviso de cookies: carrega GA4/Clarity só após o consentimento (sem IDs, não faz nada)
initConsent(siteConfig.analytics);

// Rastreamento de cliques no WhatsApp (ativo quando GA4 e/ou Meta Pixel estiverem instalados)
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="https://wa.me/"]');
  if (!link) return;

  const section = link.closest('section, header, footer, .whatsapp-float-container');
  const location = section?.id || section?.className.split(' ')[0] || 'desconhecido';

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'whatsapp_click', { link_location: location });
  }
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Contact', { content_name: location });
  }
});
