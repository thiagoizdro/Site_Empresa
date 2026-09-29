import { useRef, useState } from 'react';
import { useSeo } from '@/hooks/useSeo';
import { useReveal } from '@/hooks/useReveal';
import { projectCategories, projects } from '@/data/projects';
import { PageHero } from '@/components/layout/PageHero';
import { ProjectGrid } from '@/sections/Projects';
import { CtaBanner } from '@/sections/CtaBanner';
import { cn } from '@/utils/cn';
import './Projetos.css';

const ALL = 'Todos';

export default function Projetos() {
  useSeo({
    title: 'Projetos',
    path: '/projetos',
    description: 'Portfólio de projetos de impermeabilização e construção civil da Construtora MI.',
  });
  const [filter, setFilter] = useState(ALL);
  const root = useRef<HTMLElement>(null);
  useReveal(root, [filter]);
  const list = filter === ALL ? projects : projects.filter((p) => p.category === filter);
  const hasDemo = projects.some((p) => p.demo);

  return (
    <>
      <PageHero
        eyebrow="Portfólio"
        title={'Projetos\n*realizados*'}
        lead="Cada projeto registra o problema encontrado, o diagnóstico, a solução aplicada e o resultado entregue."
        image="pagina-projetos"
        crumbs={[{ label: 'Início', to: '/' }, { label: 'Projetos' }]}
      />
      <section ref={root} className="section" aria-label="Lista de projetos">
        <div className="container">
          {hasDemo && (
            <p className="projlist__notice" data-reveal>
              <span className="demo-badge">Conteúdo demonstrativo</span>
              Os projetos exibidos são exemplos de estrutura e serão substituídos pelas obras reais da Construtora MI.
            </p>
          )}
          <div className="projlist__filters" role="group" aria-label="Filtrar por categoria" data-reveal>
            {[ALL, ...projectCategories].map((c) => (
              <button
                key={c}
                type="button"
                className={cn('projlist__filter', filter === c && 'is-active')}
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div key={filter} className="projlist__grid">
            <ProjectGrid items={list} />
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
