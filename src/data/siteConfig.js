const siteConfig = {
  contact: {
    whatsappDefaultMessage:
      'Olá, Dr. Renan. Vim pelo seu site e gostaria de conversar sobre um caso.',
    whatsappUrgentMessage:
      'Olá, Dr. Renan. Vim pelo seu site e preciso de orientação sobre uma prisão em flagrante / audiência de custódia.',
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
    lastUpdated: '23 de outubro de 2026',
  },
  seo: {
    title: 'Renan Moraes | Advogado Criminalista · OAB/MT 37.334 · Cuiabá e Várzea Grande',
    description:
      'Advogado criminalista OAB/MT 37.334 em Cuiabá e Várzea Grande. Execução Penal, audiência de custódia, prisão em flagrante e habeas corpus. Atendimento online em todo o Brasil.',
    // Quando o domínio próprio entrar no ar, troque só esta URL: canonical, og:image,
    // JSON-LD, robots.txt e sitemap.xml são gerados a partir dela no build.
    url: 'https://landing-page-renan.vercel.app',
    ogImage: '/images/og-renan-moraes.jpg',
    ogImageAlt: 'Renan Moraes - Advogado Criminalista OAB/MT 37.334',
  },
};

export default siteConfig;
