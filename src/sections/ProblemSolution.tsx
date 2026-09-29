import { useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '@/utils/gsap';
import { MQ } from '@/utils/env';
import { useReveal } from '@/hooks/useReveal';
import { problemStages } from '@/data/content';
import { SplitText } from '@/components/ui/SplitText';
import { SlabDiagram } from '@/components/effects/SlabDiagram';
import { cn } from '@/utils/cn';
import './ProblemSolution.css';

const stageNames = ['', 'Umidade', 'Infiltração', 'Degradação', 'Danos à estrutura', 'Proteção'];

export function ProblemSolution({ eyebrow = '03 — O problema' }: { eyebrow?: string }) {
  const root = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);
  useReveal(root);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const steps = q('.ps__step') as HTMLElement[];
      // Cada etapa ativa o estágio correspondente ao cruzar o centro da tela
      steps.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 60%',
          onToggle: (self) => self.isActive && setStage(i + 1),
        });
      });
      ScrollTrigger.create({
        trigger: q('.ps__steps')[0],
        start: 'top 75%',
        onLeaveBack: () => setStage(0),
      });

      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          q('.ps__progress-fill'),
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: q('.ps__steps')[0], start: 'top 60%', end: 'bottom 60%', scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const all = [...problemStages, { n: '05', title: 'Proteção', text: 'Uma barreira contínua impede a passagem da água e preserva o concreto e as armaduras.' }];

  return (
    <section ref={root} className="section section--deep ps" aria-labelledby="ps-title">
      <div className="container">
        <div className="ps__head">
          <p className="eyebrow" data-reveal>
            {eyebrow}
          </p>
          <SplitText as="h2" id="ps-title" className="title-xl ps__title" text={'Infiltração não é\napenas uma *mancha.*'} />
          <p className="lead ps__lead" data-reveal>
            A mancha na parede é só o sinal visível. Por trás dela, a água segue um caminho que, sem tratamento, avança até a estrutura.
          </p>
        </div>

        <div className="ps__body">
          <div className="ps__visual">
            <div className="ps__visual-inner">
              <div className="ps__status mono" aria-live="polite">
                <span className={cn('ps__dot', stage === 5 && 'is-safe')} aria-hidden="true" />
                {stage === 0 ? 'Estrutura seca' : `${String(stage).padStart(2, '0')} · ${stageNames[stage]}`}
              </div>
              <SlabDiagram stage={stage} />
            </div>
          </div>

          <div className="ps__steps">
            <span className="ps__progress" aria-hidden="true">
              <span className="ps__progress-fill" />
            </span>
            <ol className="ps__list">
            {all.map((s, i) => (
              <li key={s.n} className={cn('ps__step', stage === i + 1 && 'is-active', i === 4 && 'ps__step--solution')}>
                <span className="ps__n mono">{i === 4 ? <ShieldCheck aria-hidden /> : s.n}</span>
                <h3 className="ps__step-title">{s.title}</h3>
                <p className="ps__step-text">{s.text}</p>
              </li>
            ))}
            </ol>
          </div>
        </div>

        <div className="ps__final">
          <span className="ps__final-rule" data-line aria-hidden="true" />
          <SplitText as="p" className="ps__final-text" text={'A impermeabilização atua\nna *origem* do problema.'} />
        </div>
      </div>
    </section>
  );
}
