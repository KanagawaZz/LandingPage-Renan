import Header from './components/Header.js';
import Hero from './components/Hero.js';
import TrustMarquee from './components/TrustMarquee.js';
import PracticeAreas from './components/PracticeAreas.js';
import About from './components/About.js';
import HowItWorks from './components/HowItWorks.js';
import UrgencyBanner from './components/UrgencyBanner.js';
import FAQ from './components/FAQ.js';
import FinalCTA from './components/FinalCTA.js';
import Footer from './components/Footer.js';
import WhatsAppButton from './components/WhatsAppButton.js';
import siteConfig from './data/siteConfig.js';
import { setStructuredData } from './utils/seo.js';

// Set Document Meta & SEO
document.title = siteConfig.seo.title;
const metaDescription = document.querySelector('meta[name="description"]');
if (metaDescription) metaDescription.content = siteConfig.seo.description;

const ogTitle = document.querySelector('meta[property="og:title"]');
if (ogTitle) ogTitle.content = siteConfig.seo.title;

const ogDescription = document.querySelector('meta[property="og:description"]');
if (ogDescription) ogDescription.content = siteConfig.seo.description;

const ogImage = document.querySelector('meta[property="og:image"]');
if (ogImage) ogImage.content = siteConfig.seo.ogImage;

// Render Full App
const appElement = document.querySelector('#app');
appElement.innerHTML = `
  <a href="#hero" class="skip-link">Pular para o conteúdo principal</a>
  ${Header()}
  <main id="mainContent">
    ${Hero()}
    ${TrustMarquee()}
    ${PracticeAreas()}
    ${About()}
    ${HowItWorks()}
    ${UrgencyBanner()}
    ${FAQ()}
    ${FinalCTA()}
  </main>
  ${Footer()}
  ${WhatsAppButton()}
`;

// Inject JSON-LD Schema
setStructuredData();

// ==========================================================================
// INTERACTIVE FEATURES & ANIMATIONS
// ==========================================================================

// 1. Mobile Menu Toggle
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

// 2. Scroll Progress & Header Scroll state (RAF Throttled for 120fps)
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

// 3. Scroll Triggered Reveals (Framer-Style Staggered Entrance)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

// 4. Bento Grid Interactive Spotlight Effect
const bentoCards = document.querySelectorAll('[data-bento-card]');
bentoCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// 5. Accordion Exclusive Toggle
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

// 6. Smooth anchor scrolling with offset
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      const offset = 80;
      const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  });
});
