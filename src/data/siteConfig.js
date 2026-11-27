const siteConfig = {
  contact: {
    whatsappDefaultMessage:
      'Olá, Dr. Renan. Vim pelo seu site e gostaria de conversar sobre um caso.',
    // Botão da seção "Presos e familiares"
    whatsappFamilyMessage:
      'Olá, Dr. Renan. Vim pelo seu site. Tenho um familiar preso e gostaria de orientação.',
    // Link "Enviar minha dúvida" das Perguntas frequentes
    whatsappQuestionMessage:
      'Olá, Dr. Renan. Vim pelo seu site e tenho uma dúvida que não está nas perguntas frequentes.',
  },
  heroFilm: {
    video: '/videos/hero-ambiente.mp4',
    poster: '/images/hero-ambiente-1280.webp',
    posterSmall: '/images/hero-ambiente-640.webp',
  },
  // Ferramentas de análise: só carregam depois do "Aceitar" no aviso de cookies.
  // Enquanto os dois IDs estiverem vazios, nenhum aviso aparece e nada é carregado.
  analytics: {
    googleAnalyticsId: '',
    clarityId: '',
  },
  // LGPD: responsável pelos dados (usado na Política de Privacidade)
  privacy: {
    controller: 'Renan Moraes',
    controllerId: 'advogado inscrito na OAB/MT sob o nº 37.334',
    email: 'renanmoraes.advogado@gmail.com',
    lastUpdated: '26 de novembro de 2026',
  },
  seo: {
    title: 'Dr. Renan Moraes | Advogado Criminalista · OAB/MT 37.334 · Cuiabá e Várzea Grande',
    description:
      'Advogado criminalista OAB/MT 37.334 em Cuiabá e Várzea Grande. Defesa criminal em delegacias, investigações, audiências, recursos e execução penal. Atendimento online em todo o Brasil.',
    // Endereço público do site: canonical, og:image, JSON-LD, robots.txt e sitemap.xml saem
    // dele no build. Em produção vem da variável SITE_URL (aba Environment do Dokploy);
    // o valor abaixo vale para o build local. Este arquivo também vai para o navegador,
    // onde `process` não existe, por isso a verificação de tipo.
    // new URL(...).origin tira a barra final e converte domínio com acento, ç ou æ para o
    // formato de DNS e certificados (punycode): renan.advogado.værion.tech vira
    // renan.advogado.xn--vrion-sra.tech, forma que Google e WhatsApp leem sem erro.
    url: new URL(
      (typeof process !== 'undefined' && process.env.SITE_URL) || 'https://renan.advogado.xn--vrion-sra.tech'
    ).origin,
    ogImage: '/images/og-renan-moraes-2026.jpg',
    ogImageAlt: 'Dr. Renan Moraes, advogado, OAB/MT 37.334, ao lado da logo RM Renan Moraes Advogado',
  },
};

export default siteConfig;
