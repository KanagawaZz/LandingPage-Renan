const name = 'Renan Moraes';
// Espaço que não quebra: o "Dr." nunca fica sozinho no fim de uma linha.
const honorific = 'Dr. ';
const displayName = `${honorific}${name}`;

const lawyer = {
  // Nome civil: marca, aviso ético e política de privacidade.
  name,
  // Como o site se refere a ele nos textos, rótulos e descrições de imagem.
  displayName,
  shortName: `${honorific}Renan`,
  profession: 'Advogado Criminalista',
  focus: 'Direito Penal e Processo Penal, da investigação à execução penal',
  oab: 'OAB/MT 37.334',
  oabConsultUrl: 'https://cna.oab.org.br/',
  cities: 'Cuiabá e Várzea Grande, Mato Grosso',
  coverage: 'Atendimento online em todo o Brasil; atendimento presencial conforme o caso e a localidade',
  targetAudience: 'Atendo investigados, réus, pessoas presas e seus familiares.',
  whatsappNumber: '5565999365185',
  whatsappDisplay: '(65) 99936-5185',
  instagram: '@renaanmoraes',
  instagramUrl: 'https://www.instagram.com/renaanmoraes',
  // Perfil da Empresa no Google (endereço permanente pelo CID). Vai no sameAs dos dados
  // estruturados para o Google ligar o site e o perfil como o mesmo profissional.
  googleBusinessProfileUrl: 'https://www.google.com/maps?cid=13907588790021713486',
  email: 'renanmoraes.advogado@gmail.com',
  // Retrato aprovado em brand/originais. Versões web geradas em public/images.
  portrait: {
    alt: `${displayName}, advogado, de camisa branca e gravata azul, em retrato sobre fundo escuro`,
    desktop: { base: '/images/renan-retrato-recorte', widths: [560, 840, 1086], width: 1086, height: 1340 },
    mobile: { base: '/images/renan-retrato-recorte-mobile', widths: [480, 800], width: 800, height: 1000 },
    fallback: '/images/renan-retrato-recorte-840.webp',
  },
  institutionalPortrait: {
    base: '/images/renan-retrato-institucional',
    widths: [480, 800, 1199],
    width: 1199,
    height: 1312,
    alt: `${displayName}, de terno e gravata, ao telefone e com o olhar voltado para a direita, em preto e branco`,
  },
  // Logo oficial (fundo removido, sem redesenho). Versões "-sm" no tamanho de exibição;
  // os recortes em resolução original ficam ao lado (rm-monograma.png etc.).
  brand: {
    monogram: { src: '/images/brand/rm-monograma-sm', width: 84, height: 88 },
    signature: { src: '/images/brand/rm-assinatura-sm', width: 366, height: 72 },
    logo: { src: '/images/brand/rm-logo-sm', width: 420, height: 316 },
  },
  education: {
    undergrad: 'Bacharel em Direito pelo Centro Universitário de Várzea Grande (UNIVAG), concluído em 2018',
    postgrad1: 'Pós-graduado em Direito Penal e Processual Penal',
    postgrad2: 'Pós-graduando em Licitações Públicas e Contratos Administrativos',
  },
  bio: 'Advogado criminalista (OAB/MT 37.334) formado pela UNIVAG em 2018, pós-graduado em Direito Penal e Processual Penal e pós-graduando em Licitações Públicas e Contratos Administrativos. Realiza atendimento online em todo o Brasil e atendimento presencial, incluindo visitas a unidades prisionais, conforme o caso e a localidade.',
};

export default lawyer;
