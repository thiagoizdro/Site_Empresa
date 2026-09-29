import { ArrowRight, MapPin } from 'lucide-react';
import type { Project } from '@/data/projects';
import { TLink } from '@/components/ui/TLink';
import { Img } from '@/components/ui/Img';
import { pad2 } from '@/utils/format';
import './ProjectCard.css';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="pcard">
      <TLink to={`/projetos/${project.slug}`} className="pcard__link" data-cursor="view">
        <figure className="pcard__media" data-clip>
          <Img name={project.cover} alt={project.coverAlt} sizes="(min-width: 1024px) 50vw, 100vw" />
          <span className="pcard__overlay" aria-hidden="true" />
          {project.demo && <span className="demo-badge pcard__badge">Projeto demonstrativo</span>}
        </figure>
        <div className="pcard__meta">
          <span className="pcard__n mono" aria-hidden="true">
            {pad2(index + 1)}
          </span>
          <div className="pcard__info">
            <p className="pcard__cat mono">{project.category}</p>
            <h3 className="pcard__title">{project.title}</h3>
            <p className="pcard__loc">
              <MapPin aria-hidden width={14} height={14} />
              {project.location ?? <span className="placeholder-text">[Localização a definir]</span>}
            </p>
          </div>
          <span className="pcard__cta mono">
            Ver projeto <ArrowRight aria-hidden width={16} height={16} />
          </span>
        </div>
      </TLink>
    </article>
  );
}
