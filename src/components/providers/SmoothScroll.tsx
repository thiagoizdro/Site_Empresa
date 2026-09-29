import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/utils/gsap';
import { prefersReducedMotion } from '@/utils/env';

interface ScrollApi {
  lenis: Lenis | null;
  /** Rola até um seletor, elemento ou posição, compensando o header fixo. */
  scrollTo: (target: string | HTMLElement | number, opts?: { immediate?: boolean }) => void;
  stop: () => void;
  start: () => void;
}

const ScrollContext = createContext<ScrollApi | null>(null);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });
    instance.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);
    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  const scrollTo = useCallback<ScrollApi['scrollTo']>(
    (target, opts = {}) => {
      const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
      if (el === null) return;
      // O desconto do header fixo vem do CSS (scroll-padding-top no html / scroll-margin-top no alvo),
      // respeitado tanto pelo Lenis quanto pelo scroll nativo.
      if (lenis) {
        // Após troca de rota o Lenis ainda guarda a altura da página anterior; recalcula antes de rolar
        lenis.resize();
        lenis.scrollTo(el, { immediate: opts.immediate, duration: 1.4 });
        return;
      }
      const behavior = opts.immediate || prefersReducedMotion() ? 'auto' : 'smooth';
      if (typeof el === 'number') window.scrollTo({ top: el, behavior });
      else el.scrollIntoView({ behavior, block: 'start' });
    },
    [lenis],
  );

  const api = useMemo<ScrollApi>(
    () => ({ lenis, scrollTo, stop: () => lenis?.stop(), start: () => lenis?.start() }),
    [lenis, scrollTo],
  );

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>;
}

export function useSmoothScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error('useSmoothScroll deve ser usado dentro de SmoothScrollProvider');
  return ctx;
}
