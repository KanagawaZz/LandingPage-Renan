// O HTML da página é gerado no build (src/render.js + vite.config.js).
// Aqui ficam apenas os estilos e a interatividade.
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './styles/variables.css';
import './styles/global.css';
import './styles/responsive.css';
import siteConfig from './data/siteConfig.js';
import { initConsent } from './utils/consent.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ==========================================================================
// INTERACTIVE FEATURES & ANIMATIONS
// ==========================================================================

// 1. Smooth scroll (Lenis), desligado para quem prefere menos movimento
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

// 2. Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobileNav');

function closeMenu() {
  if (!menuToggle || !mobileNav) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
  mobileNav.hidden = true;
}

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    menuToggle.setAttribute('aria-label', isExpanded ? 'Abrir menu de navegação' : 'Fechar menu de navegação');
    mobileNav.hidden = isExpanded;
  });

  mobileNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

// 3. Scroll Progress & Header Scroll state (RAF Throttled)
const header = document.querySelector('#siteHeader');
const scrollProgress = document.querySelector('.scroll-progress');
let ticking = false;

function updateScrollState() {
  const scrollY = window.scrollY;
  const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableDistance > 0 ? scrollY / scrollableDistance : 0;

  if (scrollProgress) {
    scrollProgress.style.transform = `scaleX(${progress}) translateZ(0)`;
  }
  if (header) {
    header.classList.toggle('is-scrolled', scrollY > 24);
  }
  ticking = false;
}

window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollState);
      ticking = true;
    }
  },
  { passive: true }
);
updateScrollState();

// 4. Scroll Triggered Reveals (o conteúdo só é ocultado quando há JS: classe .js no <html>)
const revealElements = document.querySelectorAll('.reveal');

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add('is-visible'));
}

// 5. Bento Grid Interactive Spotlight Effect
const bentoCards = document.querySelectorAll('[data-bento-card]');
bentoCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
});

// 6. Accordion Exclusive Toggle
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

// 7. Smooth anchor scrolling with offset (usa o Lenis quando ativo, para não haver conflito)
const HEADER_OFFSET = 80;

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    const targetEl = targetId === '#' ? document.body : document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(targetEl, { offset: -HEADER_OFFSET });
    } else {
      const top = targetId === '#' ? 0 : targetEl.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  });
});

// 8. Aviso de cookies: carrega GA4/Clarity só após o consentimento (sem IDs, não faz nada)
initConsent(siteConfig.analytics);

// 9. Rastreamento de cliques no WhatsApp (ativo quando GA4 e/ou Meta Pixel estiverem instalados)
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
