import { useEffect, useState } from 'react';

/**
 * Mantém um elemento montado durante a animação de saída.
 * `mounted` controla a renderização; `visible` liga a classe de estado aberto
 * no quadro seguinte à montagem, para que a transição CSS de entrada aconteça.
 */
export function usePresence(open: boolean, exitMs: number) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }
    setVisible(false);
    const t = window.setTimeout(() => setMounted(false), exitMs);
    return () => window.clearTimeout(t);
  }, [open, exitMs]);

  return { mounted, visible };
}
