import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { MoveHorizontal } from 'lucide-react';
import type { ImageName } from '@/assets/images';
import { Img } from './Img';
import './BeforeAfter.css';

interface Props {
  before: ImageName;
  after: ImageName;
  beforeAlt: string;
  afterAlt: string;
  initial?: number;
}

/**
 * Comparador de imagens. Arraste (mouse/touch), clique em qualquer ponto ou use as setas do teclado.
 * Para trocar pelas fotos reais, basta alterar `before` e `after`.
 */
export function BeforeAfter({ before, after, beforeAlt, afterAlt, initial = 50 }: Props) {
  const [pos, setPos] = useState(initial);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    update(e.clientX);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => dragging.current && update(e.clientX);
  const onUp = () => {
    dragging.current = false;
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') setPos((p) => Math.max(0, p - step));
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') setPos((p) => Math.min(100, p + step));
    else if (e.key === 'Home') setPos(0);
    else if (e.key === 'End') setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={box}
      className="ba"
      style={{ ['--pos' as string]: `${pos}%` }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      data-cursor="hide"
    >
      <Img name={after} alt={afterAlt} className="ba__img" sizes="(min-width: 1024px) 60vw, 100vw" draggable={false} />
      <div className="ba__before">
        <Img name={before} alt={beforeAlt} className="ba__img" sizes="(min-width: 1024px) 60vw, 100vw" draggable={false} />
      </div>
      <span className="ba__tag ba__tag--before mono">Antes</span>
      <span className="ba__tag ba__tag--after mono">Depois</span>
      <div
        className="ba__handle"
        role="slider"
        tabIndex={0}
        aria-label="Comparar antes e depois"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% da imagem "antes" visível`}
        onKeyDown={onKey}
      >
        <span className="ba__knob">
          <MoveHorizontal aria-hidden />
        </span>
      </div>
    </div>
  );
}
