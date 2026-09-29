import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { gsap, useGSAP } from '@/utils/gsap';
import { MQ } from '@/utils/env';
import { useIntro } from '@/components/providers/Intro';
import { useSmoothScroll } from '@/components/providers/SmoothScroll';
import { Img } from '@/components/ui/Img';
import { Button } from '@/components/ui/Button';
import { SplitText } from '@/components/ui/SplitText';
import './Hero.css';

const layers = ['Base regularizada', 'Imprimação', 'Sistema impermeável', 'Proteção mecânica'];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const intro = useRef<gsap.core.Timeline | null>(null);
  const { done } = useIntro();
  const doneRef = useRef(done);
  doneRef.current = done;
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;
        const q = gsap.utils.selector(root);

        // Entrada — fica pausada até o fim do preloader
        const tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } });
        tl.from(q('.hero__img'), { scale: 1.18, duration: 2.2, ease: 'power3.out' })
          .from(q('.hero__title .split-inner'), { yPercent: 118, duration: 1.2, stagger: 0.07 }, 0.1)
          .from(q('.hero__eyebrow'), { autoAlpha: 0, x: -20, duration: 0.8 }, 0.35)
          .from(q('.hero__lead'), { y: 28, duration: 1.1 }, 0.45) // só transform: o texto é pintado logo (elemento LCP)
          .from(q('.hero__ctas > *'), { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.08 }, 0.65)
          .from(q('.hero__tags li'), { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.06 }, 0.8)
          .from(q('.hero__rule'), { scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'power3.inOut' }, 0.6)
          .from(q('.hero__spec'), { autoAlpha: 0, x: 30, duration: 0.9 }, 0.9)
          .from(q('.hero__spec li'), { autoAlpha: 0, x: 16, duration: 0.5, stagger: 0.07 }, 1.0);
        intro.current = tl;
        if (doneRef.current) tl.play();

        // Zoom lento e parallax durante o scroll
        gsap.to(q('.hero__media'), {
          yPercent: desktop ? 18 : 8,
          scale: desktop ? 1.12 : 1.05,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
        if (desktop) {
          gsap.to(q('.hero__inner'), {
            yPercent: -12,
            autoAlpha: 0.2,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: '30% top', end: 'bottom top', scrub: true },
          });
        }
        return () => {
          intro.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  useEffect(() => {
    if (done) intro.current?.play();
  }, [done]);

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <Img name="hero-manta" alt="" priority className="hero__img" sizes="100vw" />
      </div>
      <div className="hero__overlay" aria-hidden="true" />
      <div className="tech-grid" aria-hidden="true" />

      <div className="container hero__inner">
        <p className="eyebrow hero__eyebrow">Impermeabilização · Construção civil</p>
        <SplitText as="h1" id="hero-title" className="hero__title" text={'Proteção que começa\nna estrutura*.*'} manual />
        <p className="hero__lead">
          Soluções profissionais em impermeabilização para proteger sua obra contra infiltrações, umidade e deterioração.
        </p>
        <div className="hero__ctas">
          <Button to="/#orcamento" size="lg" magnetic>
            Solicitar orçamento
          </Button>
          <Button variant="outline" size="lg" icon={<ArrowDown />} onClick={() => scrollTo('#servicos')}>
            Conhecer serviços
          </Button>
        </div>
      </div>

      <aside className="hero__spec" aria-label="Camadas típicas de um sistema de impermeabilização">
        <p className="hero__spec-title mono">Sistema de proteção</p>
        <ol>
          {layers.map((l, i) => (
            <li key={l}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              {l}
            </li>
          ))}
        </ol>
      </aside>

      <div className="container hero__bottom">
        <span className="hero__rule" aria-hidden="true" />
        <ul className="hero__tags">
          <li>Impermeabilização</li>
          <li aria-hidden="true">•</li>
          <li>Construção Civil</li>
          <li aria-hidden="true">•</li>
          <li>Serviços Especializados</li>
        </ul>
        <span className="hero__scroll mono" aria-hidden="true">
          Role
          <span className="hero__scroll-line" />
        </span>
      </div>
    </section>
  );
}
