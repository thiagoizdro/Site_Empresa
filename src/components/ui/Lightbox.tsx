import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { ImageName } from '@/assets/images';
import { Img } from './Img';
import { useSmoothScroll } from '@/components/providers/SmoothScroll';
import { usePresence } from '@/hooks/usePresence';
import { pad2 } from '@/utils/format';
import './Lightbox.css';

interface Props {
  items: { image: ImageName; alt: string }[];
  index: number | null;
  onChange: (i: number | null) => void;
}

/** Visualizador de imagens em tela cheia (Esc fecha, setas navegam). */
export function Lightbox({ items, index, onChange }: Props) {
  const { stop, start } = useSmoothScroll();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const { mounted, visible } = usePresence(open, 350);
  // Mantém a última imagem durante a animação de saída
  const lastIndex = useRef(0);
  if (index !== null) lastIndex.current = index;
  const current = index ?? lastIndex.current;
  const indexRef = useRef(current);
  indexRef.current = current;

  useEffect(() => {
    if (!open) return;
    stop();
    document.documentElement.style.overflow = 'hidden';
    const prevFocus = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => closeBtn.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      const i = indexRef.current;
      if (e.key === 'Escape') onChange(null);
      if (e.key === 'ArrowRight') onChange((i + 1) % items.length);
      if (e.key === 'ArrowLeft') onChange((i - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      start();
      document.documentElement.style.overflow = '';
      prevFocus?.focus();
    };
  }, [open, items.length, onChange, stop, start]);

  if (!mounted) return null;
  const item = items[current];
  return (
    <div
      className={visible ? 'lb is-open' : 'lb'}
      role="dialog"
      aria-modal="true"
      aria-label="Galeria de imagens"
      onClick={(e) => e.target === e.currentTarget && onChange(null)}
    >
      <figure key={current} className="lb__figure">
        <Img name={item.image} alt={item.alt} sizes="90vw" />
        <figcaption className="mono">
          {pad2(current + 1)} / {pad2(items.length)} — {item.alt}
        </figcaption>
      </figure>
      <button ref={closeBtn} type="button" className="lb__btn lb__close" onClick={() => onChange(null)} aria-label="Fechar galeria">
        <X aria-hidden />
      </button>
      {items.length > 1 && (
        <>
          <button type="button" className="lb__btn lb__prev" onClick={() => onChange((current - 1 + items.length) % items.length)} aria-label="Imagem anterior">
            <ArrowLeft aria-hidden />
          </button>
          <button type="button" className="lb__btn lb__next" onClick={() => onChange((current + 1) % items.length)} aria-label="Próxima imagem">
            <ArrowRight aria-hidden />
          </button>
        </>
      )}
    </div>
  );
}
