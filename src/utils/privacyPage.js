import siteConfig from '../data/siteConfig.js';

// <!-- REVISAR COM O ADVOGADO: a política deve descrever as práticas reais de tratamento de dados -->
// Gerada no build (vite.config.js). As ferramentas de análise só são citadas quando configuradas.
export function renderPrivacyPage() {
  const { privacy, analytics } = siteConfig;
  const usesGA = Boolean(analytics.googleAnalyticsId);
  const usesClarity = Boolean(analytics.clarityId);
  const usesAnalytics = usesGA || usesClarity;
  const year = new Date().getFullYear();

  const analyticsTools = [
    usesGA &&
      '<li><strong>Google Analytics</strong> (Google): páginas visitadas, tempo de permanência, origem do acesso, tipo de dispositivo e localização aproximada.</li>',
    usesClarity &&
      '<li><strong>Microsoft Clarity</strong> (Microsoft): cliques, rolagem e movimentos na página, inclusive em forma de gravação da sessão. O conteúdo digitado em campos é mascarado pela ferramenta.</li>',
  ]
    .filter(Boolean)
    .join('');

  const cookieRows = [
    usesGA && '<tr><td>Google Analytics</td><td>_ga, _ga_*</td><td>Distinguir visitantes e sessões</td><td>Até 2 anos</td></tr>',
    usesClarity && '<tr><td>Microsoft Clarity</td><td>_clck, _clsk e outros</td><td>Agrupar interações de uma mesma visita</td><td>De 1 dia a 1 ano</td></tr>',
  ]
    .filter(Boolean)
    .join('');

  const navigationSection = usesAnalytics
    ? `
      <h3>Dados de navegação (somente com a sua autorização)</h3>
      <ul>${analyticsTools}</ul>
      <p>Essas ferramentas só são ativadas se você clicar em <strong>“Aceitar”</strong> no aviso de cookies.</p>`
    : '';

  const cookiesSection = usesAnalytics
    ? `
      <p>Cookies são pequenos arquivos salvos no seu navegador. Este site usa:</p>
      <div class="legal-table-wrap">
        <table class="legal-table">
          <thead>
            <tr><th>Ferramenta</th><th>Cookies</th><th>Finalidade</th><th>Duração</th></tr>
          </thead>
          <tbody>${cookieRows}</tbody>
        </table>
      </div>
      <p>
        A sua escolha no aviso de cookies fica salva apenas no seu navegador. Você pode mudar de ideia a qualquer
        momento em <a href="#" data-cookie-prefs>Preferências de cookies</a>.
      </p>`
    : `
      <p>Este site não usa cookies de análise ou de publicidade.</p>`;

  return `
    <header class="legal-header">
      <div class="legal-container legal-header-inner">
        <a href="/" class="legal-brand" aria-label="Voltar para a página inicial">
          <span class="legal-monogram">RM</span>
          <span>Renan Moraes · Advocacia Criminal</span>
        </a>
        <a href="/" class="legal-back">← Voltar ao site</a>
      </div>
    </header>

    <main class="legal-container legal-content">
      <p class="legal-eyebrow">LGPD · Lei nº 13.709/2018</p>
      <h1>Política de Privacidade</h1>
      <p class="legal-updated">Última atualização: ${privacy.lastUpdated}</p>

      <p>
        Esta política explica quais dados pessoais são tratados quando você visita este site ou entra em contato
        pelos canais indicados nele, para que são usados e como você pode exercer os seus direitos.
      </p>

      <h2>1. Quem é o responsável pelos dados</h2>
      <p>
        O controlador dos dados é <strong>${privacy.controller}</strong>, ${privacy.controllerId}.
        Para qualquer assunto relacionado a dados pessoais, escreva para
        <a href="mailto:${privacy.email}">${privacy.email}</a>.
      </p>

      <h2>2. Quais dados são tratados</h2>
      <h3>Dados que você envia</h3>
      <p>
        Ao conversar pelo WhatsApp ou por e-mail, você pode compartilhar nome, telefone, um relato da situação,
        dados de familiares e documentos de inquéritos, processos ou da execução da pena. Esses dados são usados
        apenas para entender o caso e responder ao seu contato, e ficam protegidos pelo
        <strong>sigilo profissional</strong> da advocacia (Lei nº 8.906/94).
      </p>
      ${navigationSection}

      <h3>Dados técnicos</h3>
      <p>
        A empresa de hospedagem (<strong>Vercel</strong>) registra dados técnicos de acesso, como endereço IP e
        navegador, para segurança e funcionamento do site.
      </p>

      <h2>3. Para que os dados são usados e com qual base legal</h2>
      <ul>
        <li>
          <strong>Responder ao seu contato e analisar o caso:</strong> procedimentos preliminares a um eventual
          contrato, a seu pedido (art. 7º, V, da LGPD), e exercício regular de direitos (art. 7º, VI).
        </li>
        ${
          usesAnalytics
            ? '<li><strong>Estatísticas de uso e melhoria do site:</strong> consentimento (art. 7º, I), que pode ser revogado a qualquer momento.</li>'
            : ''
        }
        <li>
          <strong>Segurança e funcionamento do site:</strong> legítimo interesse (art. 7º, IX).
        </li>
      </ul>
      <p>Os dados não são vendidos nem usados para outras finalidades.</p>

      <h2>4. Cookies</h2>
      ${cookiesSection}

      <h2>5. Com quem os dados podem ser compartilhados</h2>
      <p>Apenas com os fornecedores necessários para o funcionamento do site e do atendimento:</p>
      <ul>
        ${usesGA ? '<li>Google (Google Analytics);</li>' : ''}
        ${usesClarity ? '<li>Microsoft (Microsoft Clarity);</li>' : ''}
        <li>Vercel (hospedagem do site);</li>
        <li>Meta (WhatsApp), quando você inicia uma conversa por esse canal.</li>
      </ul>
      <p>
        Alguns desses fornecedores mantêm servidores fora do Brasil. Nesses casos, a transferência internacional
        ocorre conforme o art. 33 da LGPD.
      </p>

      <h2>6. Por quanto tempo os dados são guardados</h2>
      <p>
        Os dados enviados no contato são mantidos pelo tempo necessário ao atendimento e ao cumprimento de
        obrigações legais e éticas da advocacia, incluindo os prazos de guarda e de prescrição aplicáveis.
      </p>

      <h2>7. Seus direitos</h2>
      <p>Pelo art. 18 da LGPD, você pode, a qualquer momento:</p>
      <ul>
        <li>confirmar se os seus dados são tratados e ter acesso a eles;</li>
        <li>corrigir dados incompletos, inexatos ou desatualizados;</li>
        <li>pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários ou excessivos;</li>
        <li>pedir a portabilidade dos dados;</li>
        <li>saber com quem os dados foram compartilhados;</li>
        <li>revogar o consentimento e pedir a eliminação dos dados tratados com base nele.</li>
      </ul>
      <p>
        Para exercer esses direitos, escreva para <a href="mailto:${privacy.email}">${privacy.email}</a>.
        Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados
        (<a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer">ANPD</a>).
      </p>

      <h2>8. Segurança</h2>
      <p>
        São adotadas medidas técnicas e administrativas razoáveis para proteger os dados contra acesso não
        autorizado, perda ou uso indevido. As informações compartilhadas no atendimento são tratadas sob sigilo
        profissional.
      </p>

      <h2>9. Alterações nesta política</h2>
      <p>
        Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A data da última
        atualização fica sempre indicada no início desta página.
      </p>

      <a href="/" class="legal-cta">← Voltar ao site</a>
    </main>

    <footer class="legal-footer">
      <div class="legal-container">
        <p>© ${year} Renan Moraes Advocacia Criminal · OAB/MT 37.334</p>
      </div>
    </footer>
  `;
}
