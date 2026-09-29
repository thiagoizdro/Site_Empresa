import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/data/services';
import { TLink } from '@/components/ui/TLink';
import { Img } from '@/components/ui/Img';
import { pad2 } from '@/utils/format';
import { cn } from '@/utils/cn';
import './ServiceCard.css';

interface Props {
  service: Service;
  index: number;
  total: number;
  wide?: boolean;
  headingLevel?: 'h3' | 'h2';
}

export function ServiceCard({ service, index, total, wide, headingLevel: H = 'h3' }: Props) {
  return (
    <article className={cn('scard', wide && 'scard--wide')}>
      <TLink to={`/servicos/${service.slug}`} className="scard__link">
        <div className="scard__media" aria-hidden="true">
          <Img name={service.image} alt="" sizes={wide ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 42vw, 100vw'} />
        </div>
        <span className="scard__shade" aria-hidden="true" />
        <span className="scard__line" aria-hidden="true" />
        <span className="scard__index mono" aria-hidden="true">
          {pad2(index + 1)} / {pad2(total)}
        </span>
        <span className="scard__arrow" aria-hidden="true">
          <ArrowUpRight />
        </span>
        <div className="scard__body">
          <H className="scard__title">{service.title}</H>
          <p className="scard__text">{service.summary}</p>
          <span className="scard__more mono">Saiba mais</span>
        </div>
      </TLink>
    </article>
  );
}
