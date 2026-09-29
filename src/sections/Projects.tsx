import { useRef } from 'react';
import { projects, type Project } from '@/data/projects';
import { useReveal } from '@/hooks/useReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { Button } from '@/components/ui/Button';
import './Projects.css';

export function ProjectGrid({ items }: { items: Project[] }) {
  return (
    <div className="pgrid">
      {items.map((p, i) => (
        <ProjectCard key={p.slug} project={p} index={i} />
      ))}
    </div>
  );
}

export function Projects() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section ref={root} className="section projects" id="projetos" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader
          eyebrow="06 — Projetos"
          title={'Projetos\n*realizados*'}
          id="projects-title"
          lead="Espaço reservado para o portfólio da Construtora MI. Os projetos abaixo são demonstrativos e mostram como cada obra será apresentada."
        />
        <ProjectGrid items={projects.slice(0, 4)} />
        <div className="projects__more" data-reveal>
          <Button to="/projetos" variant="outline-dark">
            Ver todos os projetos
          </Button>
        </div>
      </div>
    </section>
  );
}
