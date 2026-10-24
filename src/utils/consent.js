import '../styles/consent.css';

// Aviso de cookies (LGPD): Google Analytics e Microsoft Clarity só carregam após "Aceitar".
// Sem nenhum ID configurado em siteConfig.analytics, não há aviso nem carregamento.
// A escolha fica no localStorage do visitante; o link [data-cookie-prefs] reabre o aviso.
const STORAGE_KEY = 'rm-cookie-consent';
const POLICY_URL = '/politica-de-privacidade.html';

function readChoice() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveChoice(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Sem armazenamento (aba anônima restrita): a escolha vale só para esta visita
  }
}

let analyticsLoaded = false;

function loadAnalytics({ googleAnalyticsId, clarityId }) {
  if (analyticsLoaded) return;
  analyticsLoaded = true;

  if (googleAnalyticsId) {
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', googleAnalyticsId);
  }

  if (clarityId) {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', clarityId);
  }
}

function toolNames({ googleAnalyticsId, clarityId }) {
  return [googleAnalyticsId && 'Google Analytics', clarityId && 'Microsoft Clarity'].filter(Boolean).join(' e ');
}

function hideBanner() {
  document.querySelector('#cookieBanner')?.remove();
}

function showBanner(analytics) {
  if (document.querySelector('#cookieBanner')) return;

  const banner = document.createElement('div');
  banner.id = 'cookieBanner';
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-live', 'polite');
  banner.setAttribute('aria-label', 'Aviso de cookies');
  banner.innerHTML = `
    <p class="cookie-banner-text">
      Usamos cookies de análise (${toolNames(analytics)}) para entender como a página é usada e melhorá-la.
      Eles só são ativados com a sua autorização.
      <a href="${POLICY_URL}">Política de Privacidade</a>
    </p>
    <div class="cookie-banner-actions">
      <button type="button" class="cookie-btn cookie-btn-outline" data-cookie-choice="denied">Recusar</button>
      <button type="button" class="cookie-btn cookie-btn-primary" data-cookie-choice="granted">Aceitar</button>
    </div>
  `;

  banner.addEventListener('click', (event) => {
    const button = event.target.closest('[data-cookie-choice]');
    if (!button) return;

    const previous = readChoice();
    const choice = button.dataset.cookieChoice;
    saveChoice(choice);
    hideBanner();

    if (choice === 'granted') {
      loadAnalytics(analytics);
    } else if (previous === 'granted' && analyticsLoaded) {
      // Scripts já carregados não podem ser descarregados: recarrega sem eles
      window.location.reload();
    }
  });

  document.body.appendChild(banner);
}

export function initConsent(analytics) {
  if (!analytics.googleAnalyticsId && !analytics.clarityId) return;

  const choice = readChoice();

  if (choice === 'granted') {
    loadAnalytics(analytics);
  } else if (!choice) {
    showBanner(analytics);
  }

  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-cookie-prefs]')) return;
    event.preventDefault();
    showBanner(analytics);
  });
}
