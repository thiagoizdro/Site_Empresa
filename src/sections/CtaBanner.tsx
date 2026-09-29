import { useRef } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { Img } from '@/components/ui/Img';
import { Button } from '@/components/ui/Button';
import { SplitText } from '@/components/ui/SplitText';
import { whatsappUrl } from '@/utils/whatsapp';
import './CtaBanner.css';

export function CtaBanner() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section ref={root} className="cta on-dark" aria-labelledby="cta-title">
      <div className="cta__media" aria-hidden="true">
        <div className="cta__parallax" data-parallax="10">
          <Img name="cta-obra" alt="" sizes="100vw" />
        </div>
      </div>
      <div className="cta__overlay" aria-hidden="true" />
      <div className="container cta__inner">
        <p className="eyebrow" data-reveal>
          Avaliação técnica
        </p>
        <SplitText as="h2" id="cta-title" className="cta__title" text={'Sua estrutura apresenta\nsinais de *infiltração?*'} />
        <p className="cta__text" data-reveal>
          Converse com nossa equipe e solicite uma avaliação.
        </p>
        <div data-reveal data-delay="0.1">
          <Button href={whatsappUrl()} size="xl" magnetic>
            Falar com um especialista
          </Button>
        </div>
      </div>
    </section>
  );
}
