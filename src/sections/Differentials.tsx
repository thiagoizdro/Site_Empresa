import { useRef } from 'react';
import { differentials } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { BrandMark } from '@/components/ui/BrandMark';
import { pad2 } from '@/utils/format';
import './Differentials.css';

export function Differentials({ eyebrow = '07 — Diferenciais' }: { eyebrow?: string }) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section ref={root} className="section section--dark diff" id="diferenciais" aria-labelledby="diff-title">
      <BrandMark className="diff__watermark" />
      <div className="container">
        <SectionHeader
          eyebrow={eyebrow}
          title={'Por que escolher\na *Construtora MI?*'}
          id="diff-title"
          lead="Impermeabilização exige método. Nosso trabalho é organizado para que cada detalhe da execução seja tratado com o cuidado que a estrutura exige."
        />
        <ul className="diff__grid" data-stagger>
          {differentials.map((d, i) => {
            const Icon = d.icon;
            return (
              <li key={d.title} className="diff__item">
                <span className="diff__line" aria-hidden="true" />
                <div className="diff__top">
                  <span className="diff__n mono">{pad2(i + 1)}</span>
                  <span className="diff__icon" aria-hidden="true">
                    <Icon strokeWidth={1.5} />
                  </span>
                </div>
                <h3 className="diff__title">{d.title}</h3>
                <p className="diff__text">{d.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
