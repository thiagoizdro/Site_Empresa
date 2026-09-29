import type { LucideIcon } from 'lucide-react';
import { ClipboardCheck, Compass, Droplets, HardHat, Layers, MessagesSquare, ScanSearch, ShieldCheck, Hammer, PackageCheck, Wrench } from 'lucide-react';

/* ------------------------------------------------------------------
 * CONTEÚDOS INSTITUCIONAIS EDITÁVEIS
 * ------------------------------------------------------------------ */

export const navigation = [
  { label: 'Início', to: '/' },
  { label: 'Empresa', to: '/empresa' },
  { label: 'Serviços', to: '/servicos' },
  { label: 'Projetos', to: '/projetos' },
  { label: 'Diferenciais', to: '/#diferenciais' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Contato', to: '/contato' },
] as const;

/** Problema → Solução */
export const problemStages = [
  { n: '01', title: 'Umidade', text: 'A água se acumula na superfície e começa a penetrar pelos poros do material.' },
  { n: '02', title: 'Infiltração', text: 'Sem barreira, a umidade avança pelo concreto e alcança os ambientes internos.' },
  { n: '03', title: 'Degradação', text: 'Surgem manchas, mofo, eflorescências e o revestimento começa a se desprender.' },
  { n: '04', title: 'Danos à estrutura', text: 'A água chega às armaduras, inicia a corrosão e compromete a vida útil da estrutura.' },
] as const;

/** Processo */
export interface ProcessStep { n: string; title: string; text: string; icon: LucideIcon }
export const processSteps: ProcessStep[] = [
  { n: '01', title: 'Diagnóstico', text: 'Visita técnica para identificar a origem do problema, as condições da superfície e o uso da área.', icon: ScanSearch },
  { n: '02', title: 'Preparação', text: 'Limpeza, reparos, regularização da base e tratamento dos pontos críticos antes da aplicação.', icon: Hammer },
  { n: '03', title: 'Impermeabilização', text: 'Execução do sistema indicado, com atenção a emendas, arremates, ralos e encontros.', icon: Layers },
  { n: '04', title: 'Inspeção', text: 'Verificação da execução e, quando aplicável, testes de estanqueidade antes do acabamento.', icon: ClipboardCheck },
  { n: '05', title: 'Entrega', text: 'Liberação da área com orientações de uso e cuidados para preservar o sistema aplicado.', icon: PackageCheck },
];

/** Diferenciais — edite livremente */
export interface Differential { title: string; text: string; icon: LucideIcon }
export const differentials: Differential[] = [
  { title: 'Equipe especializada', text: 'Profissionais dedicados à impermeabilização e aos detalhes de execução que evitam falhas.', icon: HardHat },
  { title: 'Atendimento técnico', text: 'Cada orçamento parte de uma avaliação do local, não de uma solução padronizada.', icon: Compass },
  { title: 'Soluções contra infiltrações', text: 'Foco na origem do problema, para que o tratamento não seja apenas superficial.', icon: Droplets },
  { title: 'Planejamento da execução', text: 'Etapas, prazos e condições de trabalho definidos antes do início do serviço.', icon: Wrench },
  { title: 'Foco em durabilidade', text: 'Preparação correta da base e escolha de sistemas compatíveis com o uso da área.', icon: ShieldCheck },
  { title: 'Atendimento personalizado', text: 'Comunicação direta durante todo o serviço, do primeiro contato à entrega.', icon: MessagesSquare },
];

/**
 * DEPOIMENTOS — PLACEHOLDERS
 * Nenhum dos itens abaixo é um depoimento real. Substitua pelos
 * depoimentos autorizados pelos clientes e defina `placeholder: false`.
 */
export const testimonials = [
  { placeholder: true, rating: 5, text: 'Espaço reservado para o depoimento de um cliente. Substitua por uma avaliação real, com autorização de uso.', name: '[Nome do cliente]', service: 'Impermeabilização de laje' },
  { placeholder: true, rating: 5, text: 'Espaço reservado para o depoimento de um cliente. Substitua por uma avaliação real, com autorização de uso.', name: '[Nome do cliente]', service: 'Tratamento de infiltração' },
  { placeholder: true, rating: 5, text: 'Espaço reservado para o depoimento de um cliente. Substitua por uma avaliação real, com autorização de uso.', name: '[Nome do cliente]', service: 'Manta asfáltica' },
  { placeholder: true, rating: 5, text: 'Espaço reservado para o depoimento de um cliente. Substitua por uma avaliação real, com autorização de uso.', name: '[Nome do cliente]', service: 'Áreas molhadas' },
];

/** FAQ */
export const faq = [
  {
    q: 'Como identificar sinais de infiltração?',
    a: 'Os sinais mais comuns são manchas escuras em paredes e tetos, pintura descascando ou estufando, mofo e bolor, cheiro de umidade, manchas esbranquiçadas (eflorescências) e gotejamento após chuvas. Nem sempre a mancha aparece no mesmo ponto de entrada da água, por isso a avaliação no local é importante.',
  },
  {
    q: 'Quais áreas podem receber impermeabilização?',
    a: 'Lajes, coberturas, terraços, sacadas, banheiros, cozinhas, lavanderias, piscinas, reservatórios, jardineiras, fundações e muros de arrimo, entre outras. O sistema adequado depende do tipo de área, da exposição à água e do uso previsto.',
  },
  {
    q: 'Quanto tempo pode levar um serviço de impermeabilização?',
    a: 'O prazo varia conforme o tamanho da área, o estado da superfície, o sistema escolhido, os tempos de cura dos materiais e as condições climáticas. Após a avaliação, informamos um cronograma estimado para o seu caso.',
  },
  {
    q: 'Como funciona a avaliação?',
    a: 'Você entra em contato, descreve o problema e, se possível, envia fotos. Em seguida, agendamos uma visita para verificar o local, identificar a origem da umidade e as condições da superfície. Com isso, indicamos a solução e elaboramos o orçamento.',
  },
  {
    q: 'Como solicitar orçamento?',
    a: 'Pelo WhatsApp ou pelo formulário deste site. Quanto mais informações você enviar — tipo de imóvel, área afetada, fotos —, mais objetivo será o primeiro atendimento.',
  },
  {
    q: 'Quais sistemas de impermeabilização podem ser utilizados?',
    a: 'Entre os sistemas mais comuns estão mantas asfálticas, mantas líquidas, argamassas poliméricas e membranas de diferentes composições. A escolha depende de cada situação e só deve ser feita após avaliação técnica do local.',
  },
];

/** Tipos de imóvel atendidos (formulário) */
export const propertyTypes = ['Residencial', 'Comercial', 'Condomínio', 'Obra'] as const;

export const aboutPoints = [
  { title: 'Impermeabilização', text: 'Sistemas indicados para cada área e condição de uso.' },
  { title: 'Prevenção de infiltrações', text: 'Atuação antes que a umidade vire dano.' },
  { title: 'Proteção de estruturas', text: 'Concreto e armaduras preservados ao longo do tempo.' },
  { title: 'Atendimento especializado', text: 'Avaliação técnica antes de qualquer orçamento.' },
] as const;

