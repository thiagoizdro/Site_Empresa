import { site } from '@/config/site';

/** Monta o link do WhatsApp com mensagem pré-preenchida. */
export function whatsappUrl(message: string = site.whatsappMessage): string {
  const text = encodeURIComponent(message);
  return site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${text}` : `https://wa.me/?text=${text}`;
}

export function openWhatsApp(message?: string) {
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
}
