// <!-- REVISAR COM O ADVOGADO: frases "Para quem..." -->
const practiceAreas = [
  {
    id: 'execucao-penal',
    icon: 'path',
    tag: 'Área principal',
    title: 'Execução Penal',
    gridClass: 'bento-feature',
    description:
      'Para quem cumpre pena e quer saber se já tem direito a progressão, livramento ou outro benefício.',
    highlights: [
      'Progressão de regime',
      'Livramento condicional',
      'Remição por trabalho ou estudo',
      'Indulto e comutação',
      'Revisão do cálculo de pena',
      'Agravo em execução',
    ],
    badge: 'Pessoas presas e familiares',
    btnLabel: 'Falar sobre execução penal',
    whatsappMessage: 'Olá, Dr. Renan. Vim pelo seu site e gostaria de conversar sobre um caso de execução penal.',
  },
  {
    id: 'flagrante-custodia',
    icon: 'lock',
    tag: 'Situações urgentes',
    title: 'Prisão em Flagrante e Audiência de Custódia',
    gridClass: 'bento-highlight-urgent',
    description:
      'Para quem teve um familiar preso nas últimas horas e precisa saber o que acontece agora.',
    badge: 'Plantão criminal',
    btnLabel: 'Falar sobre flagrante',
    whatsappMessage: 'Olá, Dr. Renan. Vim pelo seu site e preciso de orientação sobre uma prisão em flagrante / audiência de custódia.',
  },
  {
    id: 'inquerito-processo',
    icon: 'dialog',
    tag: 'Investigação e processo',
    title: 'Inquérito Policial e Processo Criminal',
    gridClass: 'bento-standard',
    description:
      'Para quem recebeu uma intimação, foi chamado a depor ou responde a um processo criminal.',
    badge: 'Esfera policial e judicial',
    btnLabel: 'Falar sobre inquérito ou processo',
    whatsappMessage: 'Olá, Dr. Renan. Vim pelo seu site e gostaria de conversar sobre um inquérito/processo criminal.',
  },
  {
    id: 'habeas-corpus',
    icon: 'shield',
    tag: 'Direitos fundamentais',
    title: 'Habeas Corpus',
    gridClass: 'bento-standard',
    description:
      'Para quem está preso sem fundamento legal ou há mais tempo do que a lei permite.',
    badge: 'Tribunais e Cortes Superiores',
    btnLabel: 'Falar sobre habeas corpus',
    whatsappMessage: 'Olá, Dr. Renan. Vim pelo seu site e gostaria de uma orientação sobre habeas corpus.',
  },
  {
    id: 'crimes-tributarios',
    icon: 'document',
    tag: 'Direito Penal Tributário',
    title: 'Crimes Tributários',
    gridClass: 'bento-standard',
    description:
      'Para empresários e gestores investigados por sonegação ou outros crimes contra a ordem tributária.',
    badge: 'Consultoria e defesa',
    btnLabel: 'Falar sobre crimes tributários',
    whatsappMessage: 'Olá, Dr. Renan. Vim pelo seu site e gostaria de conversar sobre um caso de crime tributário.',
  },
  {
    id: 'recursos',
    icon: 'scale',
    tag: 'Todas as instâncias',
    title: 'Recursos e Revisão Criminal',
    gridClass: 'bento-highlight-wide',
    description:
      'Para quem foi condenado e quer saber se a decisão ainda pode ser revista.',
    badge: 'Esferas recursais',
    btnLabel: 'Falar sobre recursos',
    whatsappMessage: 'Olá, Dr. Renan. Vim pelo seu site e gostaria de conversar sobre um recurso / revisão criminal.',
  },
];

export default practiceAreas;
