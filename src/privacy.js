// Página de Política de Privacidade: o HTML é gerado no build (src/utils/privacyPage.js).
import './styles/variables.css';
import './styles/legal.css';
import siteConfig from './data/siteConfig.js';
import { initConsent } from './utils/consent.js';

initConsent(siteConfig.analytics);
