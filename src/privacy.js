// Página de Política de Privacidade: o HTML é gerado no build (src/utils/privacyPage.js)
// e os estilos são carregados no <head> de politica-de-privacidade.html.
import siteConfig from './data/siteConfig.js';
import { initConsent } from './utils/consent.js';

initConsent(siteConfig.analytics);
