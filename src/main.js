import './styles/variables.css';
import './styles/global.css';
import './styles/responsive.css';
import Header from './components/Header.js';
import Hero from './components/Hero.js';
import PracticeAreas from './components/PracticeAreas.js';
import Welcome from './components/Welcome.js';
import HowItWorks from './components/HowItWorks.js';
import BeforeContact from './components/BeforeContact.js';
import About from './components/About.js';
import Differentials from './components/Differentials.js';
import FAQ from './components/FAQ.js';
import FinalCTA from './components/FinalCTA.js';
import Footer from './components/Footer.js';
import WhatsAppButton from './components/WhatsAppButton.js';
import siteConfig from './data/siteConfig.js';
import { setStructuredData } from './utils/seo.js';

document.documentElement.classList.add('js-enabled');
document.title = siteConfig.seo.title;
document.querySelector('meta[name="description"]').content = siteConfig.seo.description;
document.querySelector('meta[property="og:title"]').content = siteConfig.seo.title;
document.querySelector('meta[property="og:description"]').content = siteConfig.seo.description;
document.querySelector('meta[property="og:image"]').content = siteConfig.seo.url
  ? new URL(siteConfig.seo.ogImage, siteConfig.seo.url).href
  : siteConfig.seo.ogImage;
document.querySelector('meta[name="twitter:title"]').content = siteConfig.seo.title;
document.querySelector('meta[name="twitter:description"]').content = siteConfig.seo.description;
document.querySelector('meta[name="twitter:image"]').content = document.querySelector(
  'meta[property="og:image"]',
).content;

document.querySelector('#app').innerHTML = `
  ${Header()}
  <main>
    ${Hero()}
    ${PracticeAreas()}
    ${Welcome()}
    ${HowItWorks()}
    ${BeforeContact()}
    ${About()}
    ${Differentials()}
    ${FAQ()}
    ${FinalCTA()}
  </main>
  ${Footer()}
  ${WhatsAppButton()}
`;

setStructuredData();

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobileNav');

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  mobileNav.hidden = true;
}

menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  menuToggle.setAttribute('aria-label', isExpanded ? 'Abrir menu' : 'Fechar menu');
  mobileNav.hidden = isExpanded;
});

mobileNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const header = document.querySelector('#siteHeader');
const scrollProgress = document.querySelector('.scroll-progress');

function updateScrollDecorations() {
  const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableDistance > 0 ? window.scrollY / scrollableDistance : 0;
  scrollProgress.style.transform = `scaleX(${progress})`;
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}

window.addEventListener('scroll', updateScrollDecorations, { passive: true });
updateScrollDecorations();

const revealElements = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

const floatingWhatsApp = document.querySelector('.whatsapp-float');
const mobileViewport = window.matchMedia('(max-width: 768px)');
const lowerViewportActions = new Set();

function updateFloatingWhatsApp() {
  floatingWhatsApp.classList.toggle(
    'is-obscured',
    mobileViewport.matches && lowerViewportActions.size > 0,
  );
}

if ('IntersectionObserver' in window) {
  const actionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          lowerViewportActions.add(entry.target);
        } else {
          lowerViewportActions.delete(entry.target);
        }
      });

      updateFloatingWhatsApp();
    },
    { rootMargin: '-72% 0px 0px 0px', threshold: 0 },
  );

  document.querySelectorAll('main a.button').forEach((button) => {
    actionObserver.observe(button);
  });

  mobileViewport.addEventListener('change', updateFloatingWhatsApp);
}

document.querySelectorAll('.faq-item').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      document.querySelectorAll('.faq-item[open]').forEach((openItem) => {
        if (openItem !== item) openItem.open = false;
      });
    }
  });
});
