/** Detecção de ambiente para decidir a intensidade das animações. */
export const canHover = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isDesktop = () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;

/** Media queries usadas pelo gsap.matchMedia */
export const MQ = {
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
  motion: '(prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
} as const;
