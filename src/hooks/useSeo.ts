import { useEffect } from 'react';
import { defaultSeo, site } from '@/config/site';

interface Seo {
  title?: string;
  description?: string;
  path: string;
  image?: string;
  noindex?: boolean;
}

export interface ResolvedSeo {
  title: string;
  description: string;
  url: string;
  image: string;
  robots: string;
}

/** Durante a pré-renderização (SSR) a página registra aqui os metadados para o HTML estático. */
export const ssrSeo: { current: ResolvedSeo | null } = { current: null };

function resolve({ title, description = defaultSeo.description, path, image = defaultSeo.image, noindex }: Seo): ResolvedSeo {
  return {
    title: title ? `${title} | Construtora MI` : defaultSeo.title,
    description,
    url: `${site.url}${path}`,
    image: image.startsWith('http') ? image : `${site.url}${image}`,
    robots: noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
  };
}

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta') as HTMLMetaElement;
    const m = selector.match(/\[(name|property|rel)="([^"]+)"\]/);
    if (m) el.setAttribute(m[1], m[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/** Atualiza title, description, canonical, Open Graph e Twitter Cards por página. */
export function useSeo(seo: Seo) {
  if (import.meta.env.SSR) ssrSeo.current = resolve(seo);
  const { title, description, path, image, noindex } = seo;
  useEffect(() => {
    const r = resolve({ title, description, path, image, noindex });
    document.title = r.title;
    setMeta('meta[name="description"]', 'content', r.description);
    setMeta('meta[name="robots"]', 'content', r.robots);
    setMeta('link[rel="canonical"]', 'href', r.url);
    setMeta('meta[property="og:title"]', 'content', r.title);
    setMeta('meta[property="og:description"]', 'content', r.description);
    setMeta('meta[property="og:url"]', 'content', r.url);
    setMeta('meta[property="og:image"]', 'content', r.image);
    setMeta('meta[name="twitter:title"]', 'content', r.title);
    setMeta('meta[name="twitter:description"]', 'content', r.description);
    setMeta('meta[name="twitter:image"]', 'content', r.image);
  }, [title, description, path, image, noindex]);
}
