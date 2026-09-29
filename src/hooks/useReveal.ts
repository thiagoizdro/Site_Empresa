import type { RefObject } from 'react';
import { gsap, useGSAP } from '@/utils/gsap';
import { MQ } from '@/utils/env';

/**
 * Animações declarativas por atributo, aplicadas dentro de `scope`:
 *
 *  data-split            título dividido por <SplitText> → palavras sobem da máscara
 *  data-reveal           fade + deslocamento vertical (data-delay="0.1" opcional)
 *  data-stagger          filhos diretos entram em sequência
 *  data-clip[="left"]    revelação por clip-path + zoom-out da imagem interna
 *  data-parallax="8"     deslocamento em yPercent durante o scroll (somente desktop)
 *  data-line             linha que se desenha (scaleX)
 *
 * Sem movimento (prefers-reduced-motion) nada é animado e o conteúdo fica visível.
 */
export function useReveal(scope: RefObject<HTMLElement | null>, dependencies: unknown[] = []) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion || !scope.current) return;
        const q = gsap.utils.selector(scope.current);
        const st = (trigger: Element, start = 'top 88%') => ({ trigger, start, once: true });

        q('[data-split]:not([data-split-manual])').forEach((el: HTMLElement) => {
          gsap.from(el.querySelectorAll('.split-inner'), {
            yPercent: 115,
            duration: 1.15,
            ease: 'power4.out',
            stagger: 0.055,
            scrollTrigger: st(el, 'top 90%'),
          });
        });

        q('[data-reveal]').forEach((el: HTMLElement) => {
          gsap.from(el, {
            y: desktop ? 46 : 24,
            autoAlpha: 0,
            duration: desktop ? 1.1 : 0.8,
            delay: parseFloat(el.dataset.delay || '0'),
            scrollTrigger: st(el, 'top 92%'),
          });
        });

        q('[data-stagger]').forEach((group: HTMLElement) => {
          gsap.from(group.children, {
            y: desktop ? 40 : 20,
            autoAlpha: 0,
            duration: 0.9,
            stagger: desktop ? 0.09 : 0.06,
            scrollTrigger: st(group, 'top 86%'),
          });
        });

        q('[data-clip]').forEach((el: HTMLElement) => {
          const from = el.dataset.clip === 'left' ? 'inset(0% 100% 0% 0%)' : 'inset(100% 0% 0% 0%)';
          const img = el.querySelector('img');
          const tl = gsap.timeline({ scrollTrigger: st(el, 'top 85%') });
          tl.fromTo(el, { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0%)', duration: desktop ? 1.35 : 1, ease: 'power4.inOut' });
          if (img) tl.from(img, { scale: 1.22, duration: 1.8, ease: 'power3.out' }, 0);
        });

        q('[data-line]').forEach((el: HTMLElement) => {
          gsap.from(el, { scaleX: 0, transformOrigin: 'left center', duration: 1.2, ease: 'power3.inOut', scrollTrigger: st(el, 'top 92%') });
        });

        if (desktop) {
          q('[data-parallax]').forEach((el: HTMLElement) => {
            const amount = parseFloat(el.dataset.parallax || '8');
            gsap.fromTo(
              el,
              { yPercent: -amount },
              {
                yPercent: amount,
                ease: 'none',
                scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
              },
            );
          });
        }
      });
      return () => mm.revert();
    },
    { scope, dependencies },
  );
}
