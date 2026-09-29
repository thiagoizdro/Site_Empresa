export function isActive(to: string, pathname: string, hash: string) {
  if (to.includes('#')) return pathname === '/' && hash === to.slice(1);
  if (to === '/') return pathname === '/' && !['#diferenciais', '#faq'].includes(hash);
  return pathname === to || pathname.startsWith(`${to}/`);
}

/** Destino do CTA de orçamento: formulário da página atual quando existir. */
export function quoteTarget(pathname: string) {
  return pathname === '/' ? '/#orcamento' : '/contato#orcamento';
}
