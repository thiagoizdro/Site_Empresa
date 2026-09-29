import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/utils/gsap';
import { MQ } from '@/utils/env';
import { useReveal } from '@/hooks/useReveal';
import { processSteps } from '@/data/content';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cn } from '@/utils/cn';
import './Process.css';

export function Process({ eyebrow = '04 — Processo' }: { eyebrow?: string }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);
  useReveal(root);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const total = processSteps.length;
      const mm = gsap.matchMedia();

      // Desktop: seção "grudada" enquanto a linha laranja percorre as etapas
      mm.add(MQ.desktop, () => {
        const fill = q('.process__fill');
        gsap.set(fill, { scaleX: 0, scaleY: 1 });
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            gsap.set(fill, { scaleX: self.progress });
            setActive(Math.min(total - 1, Math.floor(self.progress * total * 0.999 + 0.15)));
          },
        });
      });

      // Mobile/tablet: timeline vertical preenchida conforme a rolagem
      mm.add(MQ.mobile, () => {
        const fill = q('.process__fill');
        gsap.set(fill, { scaleY: 0, scaleX: 1 });
        ScrollTrigger.create({
          trigger: q('.process__list')[0],
          start: 'top 65%',
          end: 'bottom 65%',
          scrub: true,
          onUpdate: (self) => {
            gsap.set(fill, { scaleY: self.progress });
            setActive(Math.min(total - 1, Math.floor(self.progress * total * 0.999 + 0.2)));
          },
        });
      });

      mm.add(MQ.reduced, () => setActive(total - 1));
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="process" aria-labelledby="process-title">
      <div className="process__sticky">
        <div className="container process__inner">
          <SectionHeader
            eyebrow={eyebrow}
            title={'Da análise à\n*proteção* final'}
            id="process-title"
            lead="Um método claro, do diagnóstico à entrega. Cada etapa é ajustada às condições reais do local."
          />

          <div className="process__timeline">
            <span className="process__track" aria-hidden="true">
              <span className="process__fill" />
            </span>
            <ol className="process__list">
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <li key={step.n} className={cn('process__step', i <= active && 'is-done', i === active && 'is-current')}>
                    <span className="process__node" aria-hidden="true">
                      <Icon />
                    </span>
                    <span className="process__n mono">{step.n}</span>
                    <h3 className="process__title">{step.title}</h3>
                    <p className="process__text">{step.text}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
