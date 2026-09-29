import { useRef } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { SplitText } from '@/components/ui/SplitText';
import { BeforeAfter } from '@/components/ui/BeforeAfter';
import './BeforeAfterSection.css';

export function BeforeAfterSection() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section ref={root} className="section section--gray bas" aria-labelledby="bas-title">
      <div className="container bas__grid">
        <div className="bas__text">
          <p className="eyebrow" data-reveal>
            05 — Resultado
          </p>
          <SplitText as="h2" id="bas-title" className="title-xl" text={'Antes *|*\nDepois'} />
          <p className="lead" data-reveal>
            Uma superfície preparada e protegida muda a forma como a estrutura envelhece. Arraste a barra para comparar.
          </p>
          <p className="bas__note" data-reveal>
            <span className="demo-badge">Imagens demonstrativas</span>
            <span>Serão substituídas por registros reais de obras da Construtora MI.</span>
          </p>
        </div>
        <div className="bas__media" data-reveal>
          <BeforeAfter
            before="antes"
            after="depois"
            beforeAlt="Antes: superfície de concreto com manchas de umidade (imagem demonstrativa)"
            afterAlt="Depois: aplicação do sistema de impermeabilização (imagem demonstrativa)"
          />
        </div>
      </div>
    </section>
  );
}
