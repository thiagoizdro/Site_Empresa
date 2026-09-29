import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { Img } from '@/components/ui/Img';
import { SplitText } from '@/components/ui/SplitText';
import { Counter } from '@/components/ui/Counter';
import { TLink } from '@/components/ui/TLink';
import { aboutPoints, processSteps, propertyTypes } from '@/data/content';
import { services } from '@/data/services';
import { pad2 } from '@/utils/format';
import './About.css';

export function About({ showLink = true, eyebrow = '01 — A empresa' }: { showLink?: boolean; eyebrow?: string }) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} className="section about" id="empresa" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__media">
          <figure className="about__frame about__frame--main" data-clip data-cursor="zoom">
            <div className="about__parallax" data-parallax="6">
              <Img name="sobre-aplicacao" alt="Profissional posicionando manta de impermeabilização sobre laje" sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          </figure>
          <figure className="about__frame about__frame--detail" data-clip="left" data-cursor="zoom">
            <Img name="sobre-detalhe" alt="Detalhe de rolo de manta asfáltica" sizes="(min-width: 1024px) 20vw, 40vw" />
          </figure>
          <p className="about__vlabel mono" aria-hidden="true">
            Proteção · Durabilidade · Engenharia
          </p>
        </div>

        <div className="about__content">
          <p className="eyebrow" data-reveal>
            {eyebrow}
          </p>
          <SplitText as="h2" id="about-title" className="title-xl about__title" text={'Especialistas em\nproteção e *durabilidade*'} />
          <p className="lead" data-reveal>
            A Construtora MI &amp; Serviços EIRELI atua em impermeabilização e serviços de construção civil, com um objetivo claro:
            impedir que a água comprometa a estrutura, o conforto e o valor do seu imóvel.
          </p>
          <p className="about__text" data-reveal>
            Cada atendimento começa pela avaliação do local. Identificamos a origem da umidade, as condições da superfície e o uso da área
            para indicar o sistema adequado — seja para prevenir infiltrações em uma obra nova, seja para tratar um problema existente.
          </p>

          <ul className="about__points" data-stagger>
            {aboutPoints.map((p, i) => (
              <li key={p.title}>
                <span className="about__pn mono">{pad2(i + 1)}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>

          <dl className="about__stats" data-stagger>
            <div>
              <dt>Soluções em impermeabilização</dt>
              <dd>
                <Counter value={services.length} />
              </dd>
            </div>
            <div>
              <dt>Etapas de execução</dt>
              <dd>
                <Counter value={processSteps.length} />
              </dd>
            </div>
            <div>
              <dt>Perfis de imóvel atendidos</dt>
              <dd>
                <Counter value={propertyTypes.length} />
              </dd>
            </div>
            <div>
              {/* PLACEHOLDER: substituir pelo número real quando informado */}
              <dt>Projetos realizados</dt>
              <dd className="about__placeholder">[XX]</dd>
            </div>
          </dl>

          {showLink && (
            <TLink to="/empresa" className="link-underline about__link" data-reveal>
              Conheça a empresa <ArrowRight width={18} height={18} aria-hidden />
            </TLink>
          )}
        </div>
      </div>
    </section>
  );
}
