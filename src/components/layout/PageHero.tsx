import { useRef, type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import type { ImageName } from '@/assets/images';
import { gsap, useGSAP } from '@/utils/gsap';
import { MQ } from '@/utils/env';
import { Img } from '@/components/ui/Img';
import { SplitText } from '@/components/ui/SplitText';
import { TLink } from '@/components/ui/TLink';
import './PageHero.css';

interface Crumb {
  label: string;
  to?: string;
}

interface Props {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  image: ImageName;
  imageAlt?: string;
  crumbs: Crumb[];
  children?: ReactNode;
}

/** Hero das páginas internas: imagem com overlay, breadcrumb e título com text reveal. */
export function PageHero({ eyebrow, title, lead, image, imageAlt = '', crumbs, children }: Props) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;
        const q = gsap.utils.selector(root);
        gsap
          .timeline({ delay: 0.45, defaults: { ease: 'power4.out' } })
          .from(q('.phero__img'), { scale: 1.15, duration: 1.8, ease: 'power3.out' }, 0)
          .from(q('.phero__title .split-inner'), { yPercent: 115, duration: 1.1, stagger: 0.06 }, 0.05)
          .from(q('.phero__fade'), { autoAlpha: 0, y: 20, duration: 0.8, stagger: 0.08 }, 0.3);
        if (desktop) {
          gsap.to(q('.phero__media'), {
            yPercent: 14,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
          });
        }
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="phero" aria-labelledby="page-title">
      <div className="phero__media" aria-hidden={imageAlt ? undefined : true}>
        <Img name={image} alt={imageAlt} priority className="phero__img" sizes="100vw" />
      </div>
      <div className="phero__overlay" aria-hidden="true" />
      <div className="tech-grid" aria-hidden="true" />
      <div className="container phero__inner">
        <nav aria-label="Você está em" className="phero__fade">
          <ol className="crumbs">
            {crumbs.map((c, i) => (
              <li key={i}>
                {c.to ? <TLink to={c.to}>{c.label}</TLink> : <span aria-current="page">{c.label}</span>}
                {i < crumbs.length - 1 && <ChevronRight aria-hidden width={14} height={14} />}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow phero__fade">{eyebrow}</p>
        <SplitText as="h1" id="page-title" className="phero__title" text={title} manual />
        {lead && <p className="lead phero__lead phero__fade">{lead}</p>}
        {children && <div className="phero__extra phero__fade">{children}</div>}
      </div>
    </section>
  );
}
