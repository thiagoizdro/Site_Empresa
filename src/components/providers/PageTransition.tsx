import { createContext, useCallback, useContext, useLayoutEffect, useRef, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap, ScrollTrigger } from '@/utils/gsap';
import { prefersReducedMotion } from '@/utils/env';
import { useSmoothScroll } from './SmoothScroll';
import { BrandMark } from '@/components/ui/BrandMark';
import './PageTransition.css';

type Go = (to: string) => void;
const TransitionContext = createContext<Go>(() => {});

/** Espera o elemento do hash existir (páginas carregadas sob demanda). */
function waitFor(selector: string, timeout = 3000): Promise<HTMLElement | null> {
  return new Promise((resolve) => {
    const start = performance.now();
    const tick = () => {
      const el = document.querySelector<HTMLElement>(selector);
      if (el || performance.now() - start > timeout) return resolve(el);
      requestAnimationFrame(tick);
    };
    tick();
  });
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollTo } = useSmoothScroll();
  const overlay = useRef<HTMLDivElement>(null);
  const covered = useRef(false);
  const busy = useRef(false);
  const first = useRef(true);

  const go = useCallback<Go>(
    (to) => {
      const url = new URL(to, window.location.origin);
      const samePage = url.pathname === window.location.pathname;
      if (samePage) {
        if (url.hash) {
          scrollTo(url.hash);
          history.replaceState(null, '', url.pathname + url.hash);
        } else scrollTo(0);
        return;
      }
      if (busy.current) return;
      if (prefersReducedMotion() || !overlay.current) {
        navigate(to);
        return;
      }
      busy.current = true;
      const el = overlay.current;
      gsap
        .timeline({
          onComplete: () => {
            covered.current = true;
            navigate(to);
          },
        })
        .set(el, { visibility: 'visible' })
        .fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: 'power3.inOut' })
        .fromTo(el.querySelector('.pt__line'), { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'power2.inOut' }, 0.2)
        .fromTo(el.querySelector('.pt__mark'), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.25);
    },
    [navigate, scrollTo],
  );

  // A cada mudança de rota: posiciona o scroll e revela a nova página
  useLayoutEffect(() => {
    const isFirst = first.current;
    first.current = false;
    // Primeiro carregamento: só precisa agir se a URL tiver âncora (ex.: /#faq)
    if (isFirst && !location.hash) return;
    let cancelled = false;
    const run = async () => {
      if (location.hash) {
        const target = await waitFor(location.hash);
        if (cancelled) return;
        if (target) scrollTo(target, { immediate: true });
      } else {
        scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
      }
      requestAnimationFrame(() => ScrollTrigger.refresh());

      const el = overlay.current;
      if (!covered.current || !el) return;
      gsap
        .timeline({
          delay: 0.1,
          onComplete: () => {
            covered.current = false;
            busy.current = false;
            gsap.set(el, { visibility: 'hidden' });
          },
        })
        .to(el.querySelector('.pt__mark'), { autoAlpha: 0, y: -10, duration: 0.25, ease: 'power2.in' })
        .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.7, ease: 'power3.inOut' }, 0.1);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [location.pathname, location.hash, location.key, scrollTo]);

  return (
    <TransitionContext.Provider value={go}>
      {children}
      <div ref={overlay} className="pt" aria-hidden="true">
        <div className="pt__mark">
          <BrandMark className="pt__logo" />
        </div>
        <span className="pt__line" />
      </div>
    </TransitionContext.Provider>
  );
}

export const useTransitionNavigate = () => useContext(TransitionContext);
