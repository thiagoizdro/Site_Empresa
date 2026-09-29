import { useRef } from 'react';
import { services } from '@/data/services';
import { useReveal } from '@/hooks/useReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Button } from '@/components/ui/Button';
import './Services.css';

/** Padrão assimétrico: largo/estreito alternando a cada linha */
const isWide = (i: number) => (Math.floor(i / 2) % 2 === 0 ? i % 2 === 0 : i % 2 === 1);

export function Services({ limit, showHeader = true, eyebrow = '02 — Serviços' }: { limit?: number; showHeader?: boolean; eyebrow?: string }) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const list = limit ? services.slice(0, limit) : services;

  return (
    <section ref={root} className="section section--gray services" id="servicos" aria-labelledby="services-title">
      <div className="container">
        {showHeader && (
          <SectionHeader
            eyebrow={eyebrow}
            title={'Nossas\n*soluções*'}
            id="services-title"
            lead="Sistemas de impermeabilização e serviços especializados para cada área da edificação — sempre definidos a partir da avaliação do local."
          />
        )}
        <div className="services__grid" data-stagger>
          {list.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} total={services.length} wide={isWide(i)} />
          ))}
        </div>
        {limit && limit < services.length && (
          <div className="services__more" data-reveal>
            <Button to="/servicos" variant="outline-dark">
              Ver todos os serviços
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
