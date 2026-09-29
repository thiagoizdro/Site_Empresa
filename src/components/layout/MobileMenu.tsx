import { useEffect, useRef, type CSSProperties } from 'react';
import { useLocation } from 'react-router-dom';
import { navigation } from '@/data/content';
import { TLink } from '@/components/ui/TLink';
import { Button } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';
import { usePresence } from '@/hooks/usePresence';
import { whatsappUrl } from '@/utils/whatsapp';
import { pad2 } from '@/utils/format';
import { cn } from '@/utils/cn';
import { isActive, quoteTarget } from './navState';
import './MobileMenu.css';

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pathname, hash } = useLocation();
  const panel = useRef<HTMLDivElement>(null);
  const { mounted, visible } = usePresence(open, 650);

  // Esc fecha; Tab circula entre os itens do menu e o botão de fechar
  useEffect(() => {
    if (!open) return;
    const burger = () => document.querySelector<HTMLElement>('.burger');
    const t = window.setTimeout(() => panel.current?.querySelector<HTMLElement>('a')?.focus(), 300);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        burger()?.focus();
        return;
      }
      if (e.key !== 'Tab' || !panel.current) return;
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>('a, button'));
      const b = burger();
      const cycle = b ? [b, ...items] : items;
      const idx = cycle.indexOf(document.activeElement as HTMLElement);
      e.preventDefault();
      const next = e.shiftKey ? (idx <= 0 ? cycle.length - 1 : idx - 1) : (idx + 1) % cycle.length;
      cycle[next]?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!mounted) return null;
  return (
    <div id="mobile-menu" ref={panel} className={cn('mmenu', visible && 'is-open')} role="dialog" aria-modal="true" aria-label="Menu">
      <div className="mmenu__grid" aria-hidden="true" />
      <nav className="container mmenu__inner" aria-label="Menu de navegação">
        <ul className="mmenu__list">
          {navigation.map((item, i) => (
            <li key={item.to} className="mmenu__item" style={{ '--i': i } as CSSProperties}>
              <TLink
                to={item.to}
                className={isActive(item.to, pathname, hash) ? 'mmenu__link is-active' : 'mmenu__link'}
                onClick={onClose}
              >
                <span className="mmenu__n mono">{pad2(i + 1)}</span>
                {item.label}
              </TLink>
            </li>
          ))}
        </ul>
        <div className="mmenu__foot">
          <Button to={quoteTarget(pathname)} size="lg" onClick={onClose}>
            Solicitar orçamento
          </Button>
          <a className="mmenu__wa" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon width={20} height={20} /> Conversar no WhatsApp
          </a>
        </div>
      </nav>
    </div>
  );
}
