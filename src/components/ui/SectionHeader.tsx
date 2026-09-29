import type { ReactNode } from 'react';
import { SplitText } from './SplitText';
import { cn } from '@/utils/cn';
import './SectionHeader.css';

interface Props {
  eyebrow: string;
  /** "\n" quebra linha, *texto* destaca em laranja */
  title: string;
  lead?: ReactNode;
  aside?: ReactNode;
  id?: string;
  className?: string;
  as?: 'h1' | 'h2';
}

/** Cabeçalho editorial: rótulo técnico + título grande + texto de apoio à direita. */
export function SectionHeader({ eyebrow, title, lead, aside, id, className, as = 'h2' }: Props) {
  return (
    <div className={cn('shead', className)}>
      <div className="shead__main">
        <p className="eyebrow" data-reveal>
          {eyebrow}
        </p>
        <SplitText as={as} text={title} className="title-xl shead__title" id={id} />
      </div>
      {(lead || aside) && (
        <div className="shead__side" data-reveal data-delay="0.15">
          {lead && <p className="lead">{lead}</p>}
          {aside}
        </div>
      )}
    </div>
  );
}
