import { useEffect, useState } from 'react';
import { ScrollTrigger } from '@/utils/gsap';

type Idle = (cb: () => void, opts?: { timeout: number }) => number;

/**
 * Monta itens progressivamente (um por tarefa ociosa do navegador).
 * Usado na Home para dividir a renderização das seções abaixo da dobra
 * em tarefas curtas, reduzindo o bloqueio da thread principal no mobile.
 */
export function useProgressiveMount(total: number, initial = 1) {
  const [count, setCount] = useState(Math.min(initial, total));

  useEffect(() => {
    if (count >= total) {
      // Todas as seções montadas: recalcula posições de gatilhos de scroll
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }
    const ric: Idle = window.requestIdleCallback?.bind(window) ?? ((cb) => window.setTimeout(cb, 16));
    const cancel = window.cancelIdleCallback?.bind(window) ?? window.clearTimeout;
    const id = ric(() => setCount((c) => c + 1), { timeout: 150 });
    return () => cancel(id);
  }, [count, total]);

  return count;
}
