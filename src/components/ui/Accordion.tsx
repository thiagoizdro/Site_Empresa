import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { pad2 } from '@/utils/format';
import './Accordion.css';

interface Item {
  q: string;
  a: string;
}

/** Accordion acessível (botões com aria-expanded + regiões rotuladas). */
export function Accordion({ items, defaultOpen = 0 }: { items: Item[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  return (
    <div className="acc">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btn = `${base}-b${i}`;
        const panel = `${base}-p${i}`;
        return (
          <div key={item.q} className={isOpen ? 'acc__item is-open' : 'acc__item'}>
            <h3 className="acc__heading">
              <button
                id={btn}
                type="button"
                className="acc__btn"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="acc__n mono">{pad2(i + 1)}</span>
                <span className="acc__q">{item.q}</span>
                <span className="acc__icon" aria-hidden="true">
                  <Plus />
                </span>
              </button>
            </h3>
            <div id={panel} role="region" aria-labelledby={btn} className="acc__panel" inert={!isOpen}>
              <div className="acc__inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
