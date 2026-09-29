import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/utils/gsap';
import { canHover, prefersReducedMotion } from '@/utils/env';
import './Cursor.css';

type Mode = 'default' | 'link' | 'view' | 'zoom' | 'text' | 'hidden';

const INTERACTIVE = 'a, button, [role="button"], label, select, summary, input[type="checkbox"], input[type="radio"], input[type="range"], input[type="file"]';

/**
 * Cursor minimalista (somente dispositivos com mouse).
 *  data-cursor="view"  → exibe "VER"   (projetos)
 *  data-cursor="zoom"  → exibe "+"     (imagens)
 *  data-cursor="hide"  → oculta o cursor customizado
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [enabled] = useState(() => typeof window !== 'undefined' && canHover());
  const [mode, setMode] = useState<Mode>('default');
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled || !dot.current) return;
    const el = dot.current;
    document.documentElement.classList.add('has-cursor');
    const reduced = prefersReducedMotion();
    const xTo = gsap.quickTo(el, 'x', { duration: reduced ? 0 : 0.28, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: reduced ? 0 : 0.28, ease: 'power3.out' });

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      xTo(e.clientX);
      yTo(e.clientY);
      setVisible(true);
    };
    const over = (e: Event) => {
      const t = e.target as Element | null;
      if (!t?.closest) return;
      const tagged = t.closest<HTMLElement>('[data-cursor]');
      if (tagged) {
        const v = tagged.dataset.cursor;
        setMode(v === 'view' ? 'view' : v === 'zoom' ? 'zoom' : v === 'hide' ? 'hidden' : 'link');
        return;
      }
      if (t.closest('input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=file]), textarea')) return setMode('text');
      setMode(t.closest(INTERACTIVE) ? 'link' : 'default');
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={dot}
      className="cursor"
      data-mode={mode}
      data-pressed={pressed || undefined}
      data-visible={visible || undefined}
      aria-hidden="true"
    >
      <span className="cursor__ring">
        <span className="cursor__label">{mode === 'view' ? 'Ver' : mode === 'zoom' ? '+' : ''}</span>
      </span>
    </div>
  );
}
