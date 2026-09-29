/**
 * CONFIGURAÇÃO CENTRAL DO SITE
 * ------------------------------------------------------------------
 * Todos os dados de contato e informações institucionais ficam aqui.
 * Campos com `null` ainda não foram fornecidos pela empresa: o site
 * exibe o placeholder [INFORMAÇÃO A DEFINIR] no lugar e oculta links
 * que dependeriam do dado (ex.: mapa, link de telefone).
 *
 * NÃO preencha com informações inventadas.
 */

export const PLACEHOLDER = '[INFORMAÇÃO A DEFINIR]';

export const site = {
  name: 'Construtora MI',
  legalName: 'Construtora MI & Serviços EIRELI',
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || 'https://SEU-DOMINIO.com.br',

  /**
   * WhatsApp no formato internacional, somente dígitos.
   * Ex.: '5511999999999' (55 = Brasil, 11 = DDD).
   * Enquanto for null, os botões abrem o WhatsApp com a mensagem pronta,
   * mas sem destinatário definido (o usuário escolhe o contato).
   */
  whatsapp: null as string | null,

  whatsappMessage:
    'Olá! Vim pelo site da Construtora MI e gostaria de solicitar um orçamento para impermeabilização.',

  contact: {
    phone: null as string | null, // ex.: '(11) 3333-3333'
    whatsappDisplay: null as string | null, // ex.: '(11) 99999-9999'
    email: null as string | null, // ex.: 'contato@dominio.com.br'
    instagram: null as string | null, // ex.: 'construtorami' (sem @)
    address: null as string | null, // endereço completo — habilita o Google Maps
    hours: null as string | null, // ex.: 'Segunda a sexta, 8h às 18h'
    serviceArea: null as string | null, // cidade/região de atuação — usado também no SEO
  },

  /** Endpoint opcional para o formulário de orçamento (ver .env.example). */
  quoteApiUrl: (import.meta.env.VITE_QUOTE_API_URL as string | undefined) || null,
} as const;

export const defaultSeo = {
  title: 'Construtora MI | Impermeabilização e Serviços de Construção Civil',
  description:
    'Impermeabilização de lajes, manta asfáltica, tratamento de infiltrações e proteção de estruturas. Solicite uma avaliação com a Construtora MI & Serviços EIRELI.',
  image: '/og-image.jpg',
};
