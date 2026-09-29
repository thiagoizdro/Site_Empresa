import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';
import { testimonials } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { pad2 } from '@/utils/format';
import { prefersReducedMotion } from '@/utils/env';
import './Testimonials.css';

const visibleCount = () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 700 ? 2 : 1);

export function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [max, setMax] = useState(testimonials.length - 1);
  const [paused, setPaused] = useState(false);
  const drag = useRef<{ x: number; id: number } | null>(null);
  useReveal(root);

  const go = useCallback((i: number) => setIndex(() => Math.max(0, Math.min(i, max))), [max]);

  // Posiciona a trilha no slide atual (e recalcula ao redimensionar)
  useEffect(() => {
    const place = () => {
      const m = Math.max(0, testimonials.length - visibleCount());
      setMax(m);
      const i = Math.min(index, m);
      const slide = track.current?.children[i] as HTMLElement | undefined;
      if (track.current && slide) track.current.style.transform = `translate3d(${-slide.offsetLeft}px,0,0)`;
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [index]);

  // Avanço automático suave, pausado com hover/foco e desativado sem movimento
  useEffect(() => {
    if (paused || prefersReducedMotion() || max === 0) return;
    const t = window.setInterval(() => setIndex((i) => (i >= max ? 0 : i + 1)), 6500);
    return () => window.clearInterval(t);
  }, [paused, max]);

  const onDown = (e: PointerEvent) => {
    drag.current = { x: e.clientX, id: e.pointerId };
  };
  const onUp = (e: PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    drag.current = null;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <section ref={root} className="section testi" aria-labelledby="testi-title">
      <div className="container">
        <SectionHeader
          eyebrow="08 — Avaliações"
          title={'O que dizem\nnossos *clientes*'}
          id="testi-title"
          lead="Espaço dedicado às avaliações de clientes atendidos. Os depoimentos serão publicados somente com autorização."
          aside={
            <div className="testi__nav">
              <button type="button" className="testi__btn" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Depoimento anterior">
                <ArrowLeft aria-hidden />
              </button>
              <span className="testi__count mono" aria-live="polite">
                {pad2(index + 1)} / {pad2(max + 1)}
              </span>
              <button type="button" className="testi__btn" onClick={() => go(index + 1)} disabled={index >= max} aria-label="Próximo depoimento">
                <ArrowRight aria-hidden />
              </button>
            </div>
          }
        />

        <div
          className="testi__viewport"
          onPointerDown={onDown}
          onPointerUp={onUp}
          onPointerCancel={() => (drag.current = null)}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          data-reveal
        >
          <ul ref={track} className="testi__track" aria-roledescription="carrossel">
            {testimonials.map((t, i) => (
              <li
                key={i}
                className="testi__card"
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${testimonials.length}`}
                aria-hidden={i < index || i > index + (testimonials.length - 1 - max) ? true : undefined}
              >
                {/* PLACEHOLDER — substituir por depoimento real autorizado (src/data/content.ts) */}
                <div className="testi__head">
                  <span className="testi__stars" aria-label={`${t.rating} de 5 estrelas`}>
                    {Array.from({ length: 5 }, (_, s) => (
                      <Star key={s} aria-hidden fill={s < t.rating ? 'currentColor' : 'none'} />
                    ))}
                  </span>
                  {t.placeholder && <span className="demo-badge">Depoimento demonstrativo</span>}
                </div>
                <Quote className="testi__quote" aria-hidden />
                <blockquote className="testi__text">“{t.text}”</blockquote>
                <footer className="testi__author">
                  <span className="testi__avatar" aria-hidden="true">
                    {t.name.replace(/[^A-Za-zÀ-ÿ]/g, '').slice(0, 1) || 'C'}
                  </span>
                  <span>
                    <strong className={t.placeholder ? 'placeholder-text' : undefined}>{t.name}</strong>
                    <span className="testi__service">{t.service}</span>
                  </span>
                </footer>
              </li>
            ))}
          </ul>
        </div>

        <div className="testi__dots" role="tablist" aria-label="Selecionar depoimento">
          {Array.from({ length: max + 1 }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Ir para o depoimento ${i + 1}`}
              className={i === index ? 'testi__dot is-active' : 'testi__dot'}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
