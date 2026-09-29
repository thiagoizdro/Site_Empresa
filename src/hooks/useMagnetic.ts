import { useEffect, type RefObject } from 'react';
import { gsap } from '@/utils/gsap';
import { canHover, prefersReducedMotion } from '@/utils/env';

/** Efeito magnético discreto: o elemento acompanha levemente o ponteiro. */
export function useMagnetic<T extends HTMLElement>(ref: RefObject<T | null>, strength = 0.28, enabled = true) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || !canHover() || prefersReducedMotion()) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [ref, strength, enabled]);
}
