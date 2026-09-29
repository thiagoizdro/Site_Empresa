import { useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';
import { useReveal } from '@/hooks/useReveal';
import { getProject, projects } from '@/data/projects';
import { PLACEHOLDER } from '@/config/site';
import { PageHero } from '@/components/layout/PageHero';
import { Img } from '@/components/ui/Img';
import { Lightbox } from '@/components/ui/Lightbox';
import { TLink } from '@/components/ui/TLink';
import { SplitText } from '@/components/ui/SplitText';
import { CtaBanner } from '@/sections/CtaBanner';
import { pad2 } from '@/utils/format';
import NotFound from './NotFound';
import './ProjetoDetalhe.css';

export default function ProjetoDetalhe() {
  const { slug = '' } = useParams();
  const project = getProject(slug);
  const root = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const onLightbox = useCallback((i: number | null) => setLightbox(i), []);
  useReveal(root, [slug]);
  useSeo({
    title: project ? `${project.title}${project.demo ? ' (demonstrativo)' : ''}` : undefined,
    description: project?.summary,
    path: `/projetos/${slug}`,
    // Projetos demonstrativos não devem ser indexados
    noindex: !project || project.demo,
  });

  if (!project) return <NotFound />;

  const i = projects.indexOf(project);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  const story = [
    { label: 'Problema', text: project.problem },
    { label: 'Diagnóstico', text: project.diagnosis },
    { label: 'Solução', text: project.solution },
  ];

  return (
    <>
      <PageHero
        key={slug}
        eyebrow={project.category}
        title={project.title}
        lead={project.summary}
        image={project.cover}
        imageAlt={project.coverAlt}
        crumbs={[{ label: 'Início', to: '/' }, { label: 'Projetos', to: '/projetos' }, { label: project.title }]}
      >
        {project.demo && <span className="demo-badge">Projeto demonstrativo</span>}
      </PageHero>

      <div ref={root} key={`body-${slug}`}>
        <section className="pdet__meta-bar" aria-label="Ficha do projeto">
          <dl className="container pdet__meta" data-stagger>
            <div>
              <dt className="mono">Categoria</dt>
              <dd>{project.category}</dd>
            </div>
            <div>
              <dt className="mono">Localização</dt>
              <dd>{project.location ?? <span className="placeholder-text">{PLACEHOLDER}</span>}</dd>
            </div>
            <div>
              <dt className="mono">Ano</dt>
              <dd>{project.year ?? <span className="placeholder-text">{PLACEHOLDER}</span>}</dd>
            </div>
            <div>
              <dt className="mono">Status</dt>
              <dd>{project.demo ? 'Conteúdo demonstrativo' : 'Concluído'}</dd>
            </div>
          </dl>
        </section>

        <section className="section" aria-labelledby="pdet-story">
          <div className="container">
            <p className="eyebrow" data-reveal>
              Descrição
            </p>
            <SplitText as="h2" id="pdet-story" className="title-xl pdet__title" text={'Do diagnóstico\nà *solução*'} />
            <div className="pdet__story" data-stagger>
              {story.map((s, n) => (
                <article key={s.label} className="pdet__block">
                  <span className="pdet__n mono">{pad2(n + 1)}</span>
                  <h3>{s.label}</h3>
                  <p>{s.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--gray" aria-labelledby="pdet-process">
          <div className="container pdet__process">
            <div>
              <p className="eyebrow" data-reveal>
                Processo
              </p>
              <h2 id="pdet-process" className="title-xl pdet__title" data-reveal>
                Etapas executadas
              </h2>
            </div>
            <ol className="pdet__steps" data-stagger>
              {project.process.map((p, n) => (
                <li key={p}>
                  <span className="mono">{pad2(n + 1)}</span>
                  {p}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section pdet__result" aria-labelledby="pdet-result">
          <div className="container pdet__result-grid">
            <p className="eyebrow" data-reveal>
              Resultado
            </p>
            <div>
              <h2 id="pdet-result" className="visually-hidden">
                Resultado
              </h2>
              <p className="pdet__result-text" data-reveal>
                {project.result}
              </p>
            </div>
          </div>
        </section>

        <section className="section pdet__gallery-sec" aria-labelledby="pdet-gallery">
          <div className="container">
            <div className="pdet__gallery-head">
              <h2 id="pdet-gallery" className="title-xl pdet__title" data-reveal>
                Galeria
              </h2>
              {project.demo && <span className="demo-badge">Imagens ilustrativas</span>}
            </div>
            <ul className="pdet__gallery">
              {project.gallery.map((g, n) => (
                <li key={n}>
                  <button type="button" className="pdet__thumb" onClick={() => setLightbox(n)} data-cursor="zoom" aria-label={`Ampliar imagem: ${g.alt}`}>
                    <span data-clip className="pdet__thumb-frame">
                      <Img name={g.image} alt={g.alt} sizes="(min-width: 1024px) 33vw, 100vw" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <nav className="pdet__nav container" aria-label="Outros projetos">
          <TLink to={`/projetos/${prev.slug}`} className="pdet__nav-link">
            <ArrowLeft aria-hidden />
            <span>
              <span className="mono">Anterior</span>
              {prev.title}
            </span>
          </TLink>
          <TLink to={`/projetos/${next.slug}`} className="pdet__nav-link pdet__nav-link--next">
            <span>
              <span className="mono">Próximo</span>
              {next.title}
            </span>
            <ArrowRight aria-hidden />
          </TLink>
        </nav>
      </div>

      <Lightbox items={project.gallery} index={lightbox} onChange={onLightbox} />
      <CtaBanner />
    </>
  );
}
