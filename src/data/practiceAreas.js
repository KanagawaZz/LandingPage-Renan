// Jornada da defesa criminal: as 6 atividades informadas pelo cliente, distribuídas
// pelas etapas. Os serviços que já existiam no site entram como tópicos de cada etapa.
// "situation": a situação na voz de quem procura o advogado, para o visitante se reconhecer.
// <!-- REVISAR COM O ADVOGADO: textos de "situation" e a etapa de cada tópico -->
export const defenseStages = [
  {
    title: 'Delegacias e diligências',
    situation: 'Alguém foi preso em flagrante.',
    activities: ['Acompanhamento em delegacias e procedimentos investigativos.'],
    topics: ['Prisão em flagrante e audiência de custódia', 'Habeas corpus'],
  },
  {
    title: 'Investigação e inquérito policial',
    situation: 'Recebi uma intimação para depor.',
    activities: ['Defesa e assistência durante inquéritos policiais.'],
    topics: ['Crimes tributários'],
  },
  {
    title: 'Processo criminal e audiências',
    situation: 'Recebi a citação de um processo criminal.',
    activities: ['Atuação em audiências e processos criminais.'],
    topics: [],
  },
  {
    title: 'Julgamento, recursos e tribunais',
    situation: 'Fui condenado e quero recorrer.',
    activities: ['Elaboração de pedidos, manifestações e recursos.', 'Atuação em tribunais.'],
    topics: ['Recursos criminais', 'Revisão criminal'],
  },
  {
    title: 'Execução penal',
    situation: 'Um familiar está cumprindo pena.',
    activities: ['Acompanhamento na execução penal e requerimento de benefícios previstos em lei.'],
    topics: [
      'Progressão de regime',
      'Livramento condicional',
      'Remição por trabalho ou estudo',
      'Indulto e comutação',
      'Revisão do cálculo de pena',
      'Agravo em execução',
    ],
  },
];

export default defenseStages;
