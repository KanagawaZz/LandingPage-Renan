export function initNavigation({ lenis, prefersReducedMotion, updateJourney }) {
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

  const header = document.querySelector('#siteHeader');
  const scrollProgress = document.querySelector('.scroll-progress');
  const heroContact = document.querySelector('.hero-actions .button-primary');
  const floatingContact = document.querySelector('#whatsappFloat');
  let ticking = false;

  // Indicador da seção ativa no menu (a seção que cruza a faixa a 35% da altura da tela)
  const navLinks = [...document.querySelectorAll('[data-nav-link]')];
  const navSections = [...new Set(navLinks.map((a) => a.getAttribute('href')))]
    .map((href) => document.querySelector(href))
    .filter(Boolean);

  function updateActiveNav() {
    const line = window.innerHeight * 0.35;
    const current = navSections.find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= line && rect.bottom > line;
    });
    const href = current ? `#${current.id}` : null;
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === href;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

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
    if (heroContact && floatingContact) {
      const passedContact = heroContact.getBoundingClientRect().bottom <= (header?.getBoundingClientRect().bottom ?? 0);
      floatingContact.classList.toggle('is-suppressed', !passedContact);
    }
    updateJourney?.();
    updateActiveNav();
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
  window.addEventListener('resize', updateScrollState);
  window.addEventListener('pageshow', updateScrollState);
  updateScrollState();

  // Mantém a seção de destino abaixo do cabeçalho fixo.
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
}
