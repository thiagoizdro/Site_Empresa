import { useRef } from 'react';
import { gsap, useGSAP } from '@/utils/gsap';
import { MQ } from '@/utils/env';
import { pad2 } from '@/utils/format';

/** Número animado de 0 até `value` quando entra na tela. */
export function Counter({ value, className }: { value: number; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const obj = { v: 0 };
        if (el.current) el.current.textContent = pad2(0);
        gsap.to(obj, {
          v: value,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el.current, start: 'top 92%', once: true },
          onUpdate: () => {
            if (el.current) el.current.textContent = pad2(Math.round(obj.v));
          },
        });
      });
      return () => mm.revert();
    },
    { dependencies: [value] },
  );
  return (
    <span ref={el} className={className}>
      {pad2(value)}
    </span>
  );
}
