import type { ImageName } from '@/assets/images';

/**
 * PROJETOS — CONTEÚDO DEMONSTRATIVO
 * ------------------------------------------------------------------
 * Todos os projetos abaixo são EXEMPLOS DE ESTRUTURA (`demo: true`).
 * Eles NÃO representam obras reais da Construtora MI.
 * Ao cadastrar um projeto real: substitua textos e imagens, preencha
 * `location` e defina `demo: false` para remover o selo "Projeto demonstrativo".
 */
export interface Project {
  slug: string;
  demo: boolean;
  title: string;
  category: string;
  location: string | null;
  year: string | null;
  cover: ImageName;
  coverAlt: string;
  summary: string;
  problem: string;
  diagnosis: string;
  solution: string;
  process: string[];
  result: string;
  gallery: { image: ImageName; alt: string }[];
}

const DEMO_NOTE = 'Texto demonstrativo — substituir pela descrição real do projeto.';

export const projects: Project[] = [
  {
    slug: 'projeto-demonstrativo-laje-cobertura',
    demo: true,
    title: 'Laje de cobertura',
    category: 'Manta asfáltica',
    location: null,
    year: null,
    cover: 'projeto-03',
    coverAlt: 'Aplicação de manta asfáltica em laje de cobertura (imagem ilustrativa)',
    summary: `Exemplo de apresentação de um projeto de impermeabilização de laje de cobertura. ${DEMO_NOTE}`,
    problem: 'Descreva aqui o problema encontrado: por exemplo, manchas no teto do último pavimento após períodos de chuva.',
    diagnosis: 'Descreva aqui o que foi identificado na avaliação técnica: origem da infiltração, estado da base, pontos críticos.',
    solution: 'Descreva aqui o sistema escolhido e o motivo da escolha para esta situação específica.',
    process: ['Avaliação no local', 'Regularização da base', 'Imprimação', 'Aplicação do sistema', 'Inspeção final'],
    result: 'Descreva aqui o resultado entregue ao cliente, sem números ou garantias que não possam ser comprovados.',
    gallery: [
      { image: 'projeto-03', alt: 'Imagem ilustrativa de aplicação' },
      { image: 'cta-obra', alt: 'Imagem ilustrativa de manta asfáltica' },
      { image: 'depois', alt: 'Imagem ilustrativa de acabamento' },
    ],
  },
  {
    slug: 'projeto-demonstrativo-fundacao',
    demo: true,
    title: 'Proteção de fundação',
    category: 'Proteção de estruturas',
    location: null,
    year: null,
    cover: 'projeto-01',
    coverAlt: 'Obra com armaduras de fundação (imagem ilustrativa)',
    summary: `Exemplo de apresentação de um projeto de proteção de estruturas em contato com o solo. ${DEMO_NOTE}`,
    problem: 'Descreva aqui o contexto da obra e o risco identificado.',
    diagnosis: 'Descreva aqui as condições de solo, umidade e exposição avaliadas.',
    solution: 'Descreva aqui o sistema de proteção indicado.',
    process: ['Avaliação do projeto', 'Preparação das superfícies', 'Aplicação do sistema', 'Proteção mecânica', 'Liberação da etapa'],
    result: 'Descreva aqui o resultado entregue.',
    gallery: [
      { image: 'projeto-01', alt: 'Imagem ilustrativa de fundação' },
      { image: 'servico-estruturas', alt: 'Imagem ilustrativa de armação' },
      { image: 'pagina-projetos', alt: 'Imagem ilustrativa de obra' },
    ],
  },
  {
    slug: 'projeto-demonstrativo-edificio-residencial',
    demo: true,
    title: 'Edifício residencial',
    category: 'Áreas molhadas',
    location: null,
    year: null,
    cover: 'projeto-02',
    coverAlt: 'Edifício residencial em construção (imagem ilustrativa)',
    summary: `Exemplo de apresentação de um projeto em edifício com várias unidades. ${DEMO_NOTE}`,
    problem: 'Descreva aqui o escopo: por exemplo, impermeabilização de áreas molhadas em diversas unidades.',
    diagnosis: 'Descreva aqui as particularidades avaliadas no projeto.',
    solution: 'Descreva aqui o sistema e o planejamento da execução por etapas.',
    process: ['Levantamento das áreas', 'Planejamento por pavimento', 'Execução', 'Testes de estanqueidade', 'Entrega por etapa'],
    result: 'Descreva aqui o resultado entregue.',
    gallery: [
      { image: 'projeto-02', alt: 'Imagem ilustrativa do edifício' },
      { image: 'servico-areas-molhadas', alt: 'Imagem ilustrativa de área molhada' },
      { image: 'pagina-empresa', alt: 'Imagem ilustrativa de estrutura' },
    ],
  },
  {
    slug: 'projeto-demonstrativo-estrutura-concreto',
    demo: true,
    title: 'Estrutura de concreto',
    category: 'Recuperação estrutural',
    location: null,
    year: null,
    cover: 'projeto-04',
    coverAlt: 'Estrutura de concreto aparente (imagem ilustrativa)',
    summary: `Exemplo de apresentação de um projeto de recuperação e proteção de concreto. ${DEMO_NOTE}`,
    problem: 'Descreva aqui as patologias encontradas.',
    diagnosis: 'Descreva aqui o mapeamento realizado e o acompanhamento técnico envolvido.',
    solution: 'Descreva aqui o tratamento aplicado.',
    process: ['Mapeamento', 'Remoção do concreto degradado', 'Tratamento das armaduras', 'Recomposição', 'Proteção superficial'],
    result: 'Descreva aqui o resultado entregue.',
    gallery: [
      { image: 'projeto-04', alt: 'Imagem ilustrativa de estrutura' },
      { image: 'textura-fissura', alt: 'Imagem ilustrativa de fissura' },
      { image: 'projeto-07', alt: 'Imagem ilustrativa de pilares' },
    ],
  },
  {
    slug: 'projeto-demonstrativo-piscina',
    demo: true,
    title: 'Piscina residencial',
    category: 'Piscinas',
    location: null,
    year: null,
    cover: 'projeto-05',
    coverAlt: 'Piscina residencial (imagem ilustrativa)',
    summary: `Exemplo de apresentação de um projeto de impermeabilização de piscina. ${DEMO_NOTE}`,
    problem: 'Descreva aqui o problema relatado pelo cliente.',
    diagnosis: 'Descreva aqui o que foi verificado na avaliação.',
    solution: 'Descreva aqui o sistema indicado.',
    process: ['Esvaziamento e avaliação', 'Preparação da base', 'Aplicação', 'Cura', 'Enchimento e verificação'],
    result: 'Descreva aqui o resultado entregue.',
    gallery: [
      { image: 'projeto-05', alt: 'Imagem ilustrativa de piscina' },
      { image: 'servico-piscinas', alt: 'Imagem ilustrativa de piscina' },
    ],
  },
  {
    slug: 'projeto-demonstrativo-obra-comercial',
    demo: true,
    title: 'Obra comercial',
    category: 'Construção civil',
    location: null,
    year: null,
    cover: 'projeto-06',
    coverAlt: 'Obra comercial em andamento (imagem ilustrativa)',
    summary: `Exemplo de apresentação de uma obra com serviços de construção civil. ${DEMO_NOTE}`,
    problem: 'Descreva aqui o escopo da obra.',
    diagnosis: 'Descreva aqui o planejamento e as condições do local.',
    solution: 'Descreva aqui os serviços executados.',
    process: ['Planejamento', 'Mobilização', 'Execução', 'Inspeção', 'Entrega'],
    result: 'Descreva aqui o resultado entregue.',
    gallery: [
      { image: 'projeto-06', alt: 'Imagem ilustrativa de obra' },
      { image: 'projeto-07', alt: 'Imagem ilustrativa de estrutura' },
      { image: 'pagina-projetos', alt: 'Imagem ilustrativa de fundação' },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectCategories = Array.from(new Set(projects.map((p) => p.category)));
