import type { ImageName } from '@/assets/images';

/**
 * SERVIÇOS — conteúdo editável
 * ------------------------------------------------------------------
 * Para remover um serviço que a empresa não oferece, basta apagar o
 * objeto correspondente. Para adicionar, copie um bloco e ajuste
 * `slug` (usado na URL /servicos/<slug>), textos e imagem.
 * A ordem do array é a ordem de exibição.
 */
export interface Service {
  slug: string;
  title: string;
  /** Título curto para menus e selects */
  short: string;
  summary: string;
  description: string[];
  /** Situações em que o serviço costuma ser indicado */
  indications: string[];
  /** Pontos considerados na avaliação técnica */
  considerations: string[];
  image: ImageName;
  imageAlt: string;
}

export const services: Service[] = [
  {
    slug: 'impermeabilizacao-de-lajes',
    title: 'Impermeabilização de Lajes',
    short: 'Lajes',
    summary: 'Proteção de lajes expostas e cobertas contra a passagem de água, preservando o concreto e os ambientes abaixo.',
    description: [
      'A laje é uma das áreas mais expostas de uma edificação: recebe chuva, sol e variações de temperatura durante todo o ano. Sem um sistema de impermeabilização adequado, a água encontra caminhos pelo concreto e chega aos ambientes inferiores.',
      'Avaliamos o estado da laje, os pontos de escoamento, ralos, rodapés e juntas para definir o sistema mais adequado a cada situação — considerando uso da área, exposição e tipo de acabamento previsto.',
    ],
    indications: ['Manchas ou gotejamento no teto do pavimento inferior', 'Lajes expostas sem proteção ou com sistema desgastado', 'Novas construções, antes do contrapiso e acabamento', 'Áreas com empoçamento recorrente de água'],
    considerations: ['Caimento e pontos de escoamento', 'Estado da superfície e presença de fissuras', 'Tipo de uso: transitável ou não transitável', 'Detalhes críticos: ralos, rodapés, juntas e soleiras'],
    image: 'servico-lajes',
    imageAlt: 'Equipe trabalhando sobre laje de concreto em obra',
  },
  {
    slug: 'manta-asfaltica',
    title: 'Manta Asfáltica',
    short: 'Manta asfáltica',
    summary: 'Aplicação de manta asfáltica com execução cuidadosa de emendas, arremates e pontos críticos.',
    description: [
      'A manta asfáltica é um dos sistemas mais utilizados em lajes, coberturas e terraços. Seu desempenho depende diretamente da preparação da superfície, da imprimação e da qualidade das emendas e arremates.',
      'Trabalhamos com atenção aos detalhes que costumam originar falhas: sobreposições, cantos, ralos, tubulações passantes e encontros com paredes.',
    ],
    indications: ['Lajes de cobertura e terraços', 'Áreas externas expostas a intempéries', 'Substituição de mantas antigas ou danificadas', 'Estruturas que exigem sistema flexível'],
    considerations: ['Regularização e limpeza da base', 'Imprimação adequada ao sistema', 'Sobreposição e soldagem das emendas', 'Proteção mecânica quando necessária'],
    image: 'servico-manta',
    imageAlt: 'Profissional aplicando manta asfáltica com maçarico sobre laje',
  },
  {
    slug: 'telhados-e-coberturas',
    title: 'Impermeabilização de Telhados e Coberturas',
    short: 'Telhados e coberturas',
    summary: 'Tratamento de coberturas, calhas e rufos para evitar infiltrações que comprometem forros e estruturas.',
    description: [
      'Infiltrações em coberturas nem sempre têm origem nas telhas. Calhas, rufos, platibandas e encontros com paredes são pontos frequentes de entrada de água.',
      'Realizamos a inspeção da cobertura para identificar a origem do problema e indicar o tratamento adequado para cada elemento.',
    ],
    indications: ['Goteiras e manchas em forros', 'Calhas e rufos com vazamentos', 'Platibandas com umidade aparente', 'Coberturas planas e marquises'],
    considerations: ['Identificação da origem da infiltração', 'Estado de calhas, rufos e condutores', 'Compatibilidade dos materiais', 'Acesso e segurança para execução'],
    image: 'servico-telhados',
    imageAlt: 'Profissional inspecionando telhado de residência',
  },
  {
    slug: 'piscinas',
    title: 'Impermeabilização de Piscinas',
    short: 'Piscinas',
    summary: 'Sistemas para piscinas novas ou em reforma, pensados para a pressão da água e o contato permanente.',
    description: [
      'Piscinas trabalham sob pressão hidrostática constante. Falhas na impermeabilização podem causar perda de água, danos ao revestimento e umidade em áreas vizinhas.',
      'A escolha do sistema considera o tipo de estrutura, o revestimento previsto e as condições do entorno, sempre a partir de avaliação no local.',
    ],
    indications: ['Construção de novas piscinas', 'Perda de água sem vazamento hidráulico identificado', 'Reforma com troca de revestimento', 'Umidade em paredes próximas à piscina'],
    considerations: ['Tipo de estrutura e revestimento', 'Pressão da água e lençol freático', 'Tratamento de juntas e dispositivos', 'Tempo de cura antes do enchimento'],
    image: 'servico-piscinas',
    imageAlt: 'Piscina residencial com deck e paisagismo',
  },
  {
    slug: 'reservatorios',
    title: 'Impermeabilização de Reservatórios',
    short: 'Reservatórios',
    summary: 'Proteção de caixas d’água e reservatórios, com sistemas compatíveis com o armazenamento de água.',
    description: [
      'Reservatórios exigem sistemas adequados ao contato com a água armazenada e à pressão exercida sobre as paredes e o fundo.',
      'Antes da execução, avaliamos a estrutura, a presença de fissuras e as condições de acesso para indicar o tratamento compatível com o uso do reservatório.',
    ],
    indications: ['Reservatórios elevados ou enterrados', 'Vazamentos ou umidade nas paredes externas', 'Reservatórios novos antes do enchimento', 'Estruturas com fissuras aparentes'],
    considerations: ['Compatibilidade com água armazenada', 'Tratamento prévio de fissuras', 'Limpeza e esvaziamento programados', 'Ventilação e segurança durante a execução'],
    image: 'servico-reservatorios',
    imageAlt: 'Caixa d’água instalada sobre edificação',
  },
  {
    slug: 'areas-molhadas',
    title: 'Impermeabilização de Áreas Molhadas',
    short: 'Áreas molhadas',
    summary: 'Banheiros, cozinhas, lavanderias e sacadas protegidos antes do revestimento, onde a falha é invisível.',
    description: [
      'Em áreas molhadas, a impermeabilização fica escondida sob o piso e o revestimento. Uma falha nessa etapa costuma aparecer apenas depois, como manchas no teto do vizinho de baixo ou nas paredes adjacentes.',
      'Executamos a impermeabilização com atenção a ralos, box, rodapés e soleiras — os pontos onde a água mais se acumula.',
    ],
    indications: ['Reformas de banheiros e cozinhas', 'Sacadas e varandas', 'Lavanderias e áreas de serviço', 'Manchas no teto do pavimento inferior'],
    considerations: ['Altura de subida nas paredes e box', 'Tratamento de ralos e tubulações', 'Teste de estanqueidade quando aplicável', 'Compatibilidade com o revestimento'],
    image: 'servico-areas-molhadas',
    imageAlt: 'Banheiro com revestimento claro e boa iluminação natural',
  },
  {
    slug: 'tratamento-de-infiltracoes',
    title: 'Tratamento de Infiltrações',
    short: 'Infiltrações',
    summary: 'Diagnóstico da origem da umidade e tratamento direcionado, em vez de soluções apenas superficiais.',
    description: [
      'Pintar sobre uma mancha de umidade não resolve o problema. A infiltração continua agindo por trás do acabamento, e o dano tende a aumentar.',
      'Nosso trabalho começa pela identificação da origem: água de chuva, umidade ascendente, vazamentos ou falhas em sistemas existentes. A partir disso, indicamos o tratamento adequado.',
    ],
    indications: ['Manchas, bolor ou mofo em paredes e tetos', 'Pintura descascando ou estufando', 'Umidade na base das paredes', 'Eflorescências (manchas esbranquiçadas)'],
    considerations: ['Origem da umidade', 'Extensão do dano no revestimento e no substrato', 'Necessidade de reparos antes do tratamento', 'Ventilação do ambiente'],
    image: 'servico-infiltracoes',
    imageAlt: 'Parede com reboco deteriorado por umidade e infiltração',
  },
  {
    slug: 'recuperacao-de-estruturas',
    title: 'Recuperação e Proteção de Estruturas',
    short: 'Recuperação estrutural',
    summary: 'Tratamento de fissuras, armaduras expostas e concreto degradado, com proteção para prolongar a vida útil.',
    description: [
      'A água que atravessa o concreto pode alcançar as armaduras e iniciar processos de corrosão. Com o tempo, isso leva ao desplacamento do concreto e à perda de desempenho da estrutura.',
      'Atuamos na recuperação de elementos degradados e na aplicação de sistemas de proteção. Casos que envolvam segurança estrutural são avaliados com o acompanhamento técnico adequado.',
    ],
    indications: ['Fissuras e trincas em elementos de concreto', 'Armaduras aparentes ou com sinais de corrosão', 'Concreto desplacando', 'Estruturas expostas a umidade constante'],
    considerations: ['Mapeamento das patologias', 'Necessidade de laudo ou responsável técnico', 'Tratamento das armaduras', 'Sistema de proteção após a recuperação'],
    image: 'servico-estruturas',
    imageAlt: 'Armação de aço preparada para concretagem em obra',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
