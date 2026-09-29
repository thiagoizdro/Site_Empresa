import { site } from '@/config/site';
import { whatsappUrl } from './whatsapp';

export interface QuoteData {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  property: string;
  message: string;
}

export type QuoteErrors = Partial<Record<keyof QuoteData | 'files' | 'consent', string>>;

export const MAX_FILES = 6;
export const MAX_FILE_MB = 10;

export function validateQuote(d: QuoteData, consent: boolean): QuoteErrors {
  const e: QuoteErrors = {};
  if (d.name.trim().length < 3) e.name = 'Informe seu nome completo.';
  const digits = d.phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 11) e.phone = 'Informe um WhatsApp válido com DDD.';
  if (d.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = 'E-mail inválido.';
  if (d.city.trim().length < 2) e.city = 'Informe a cidade do imóvel.';
  if (!d.service) e.service = 'Selecione o tipo de serviço.';
  if (!d.property) e.property = 'Selecione o tipo de imóvel.';
  if (d.message.trim().length < 15) e.message = 'Descreva o problema em pelo menos 15 caracteres.';
  if (!consent) e.consent = 'É necessário concordar para prosseguir.';
  return e;
}

export function buildQuoteMessage(d: QuoteData, photoCount: number) {
  const lines = [
    'Olá! Vim pelo site da Construtora MI e gostaria de solicitar uma avaliação.',
    '',
    `*Nome:* ${d.name.trim()}`,
    `*WhatsApp:* ${d.phone}`,
    d.email.trim() ? `*E-mail:* ${d.email.trim()}` : null,
    `*Cidade:* ${d.city.trim()}`,
    `*Serviço:* ${d.service}`,
    `*Imóvel:* ${d.property}`,
    '',
    `*Descrição do problema:*`,
    d.message.trim(),
    photoCount ? `\n(Tenho ${photoCount} foto(s) do problema e vou enviá-las nesta conversa.)` : null,
  ];
  return lines.filter((l) => l !== null).join('\n');
}

export const quoteWhatsappUrl = (d: QuoteData, photoCount: number) => whatsappUrl(buildQuoteMessage(d, photoCount));

/**
 * Envio para API própria (opcional). Configure VITE_QUOTE_API_URL.
 * Envia multipart/form-data com os campos e as fotos em `photos[]`.
 */
export async function submitQuoteApi(d: QuoteData, files: File[]) {
  if (!site.quoteApiUrl) throw new Error('API de orçamento não configurada');
  const body = new FormData();
  Object.entries(d).forEach(([k, v]) => body.append(k, v));
  files.forEach((f) => body.append('photos[]', f, f.name));
  const res = await fetch(site.quoteApiUrl, { method: 'POST', body });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}
