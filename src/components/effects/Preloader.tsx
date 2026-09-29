import { useRef, useState } from 'react';
import { gsap, useGSAP } from '@/utils/gsap';
import { prefersReducedMotion } from '@/utils/env';
import { useIntro } from '@/components/providers/Intro';
import { BrandMark } from '@/components/ui/BrandMark';
import './Preloader.css';

/** O HTML pré-renderizado já traz o preloader como splash estático (logo + nome). */
const isPrerendered = () => typeof document !== 'undefined' && document.documentElement.hasAttribute('data-prerendered');

/**
 * Entrada (~1,4s): as barras do símbolo MI sobem, o ponto laranja cai,
 * uma linha laranja atravessa a composição, surge "CONSTRUTORA MI" e a tela se abre.
 * Exibida uma vez por sessão; nas visitas seguintes o splash apenas se abre.
 */
export function Preloader() {
  const { play, finish } = useIntro();
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(() => !play && !isPrerendered());

  useGSAP(
    () => {
      if (gone || !root.current) return;
      document.documentElement.style.overflow = 'hidden';
      const release = () => {
        document.documentElement.style.overflow = '';
      };
      const q = gsap.utils.selector(root);
      const done = () => setGone(true);
      const open = (tl: gsap.core.Timeline, at: number) =>
        tl
          .to(q('.pl__center'), { y: -24, autoAlpha: 0, duration: 0.35, ease: 'power2.in' }, at)
          .to(q('.pl__line'), { scaleX: 0, transformOrigin: '100% 50%', duration: 0.35, ease: 'power2.in' }, at)
          .add(() => {
            release();
            finish();
          }, at + 0.12)
          .to(q('.pl__panel--top'), { yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, at + 0.1)
          .to(q('.pl__panel--bottom'), { yPercent: 100, duration: 0.7, ease: 'power4.inOut' }, at + 0.1);

      // Sem movimento: some rapidamente
      if (prefersReducedMotion()) {
        gsap.to(root.current, { autoAlpha: 0, duration: 0.3, delay: play ? 0.35 : 0, onStart: () => (release(), finish()), onComplete: done });
        return release;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: done });

      // Visita repetida com splash pré-renderizado: só abre a tela
      if (!play) {
        open(tl, 0);
        return release;
      }

      // Splash estático já visível: continua a partir dele (linha + abertura), sem reconstruir o símbolo
      if (isPrerendered()) {
        tl.fromTo(q('.pl__line'), { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, 0);
        open(tl, 0.75);
        return release;
      }

      tl.from(q('.mark-bar, .mark-stem'), { scaleY: 0, transformOrigin: '50% 100%', duration: 0.5, stagger: 0.06, ease: 'power3.inOut' })
        .from(q('.mark-dot'), { y: -60, autoAlpha: 0, duration: 0.45, ease: 'back.out(2)' }, 0.3)
        .fromTo(q('.pl__line'), { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, 0.25)
        .from(q('.pl__word'), { yPercent: 110, duration: 0.55, stagger: 0.07 }, 0.45);
      open(tl, 1.0);
      return release;
    },
    { scope: root },
  );

  if (gone) return null;
  return (
    <div ref={root} className="pl" role="presentation" aria-hidden="true">
      <div className="pl__panel pl__panel--top" />
      <div className="pl__panel pl__panel--bottom" />
      <span className="pl__line" />
      <div className="pl__center">
        <BrandMark className="pl__mark" />
        <p className="pl__title">
          <span className="pl__mask">
            <span className="pl__word">Construtora</span>
          </span>{' '}
          <span className="pl__mask">
            <span className="pl__word pl__word--accent">MI</span>
          </span>
        </p>
      </div>
    </div>
  );
}
