import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { navigation } from '@/data/content';
import { TLink } from '@/components/ui/TLink';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';
import { useSmoothScroll } from '@/components/providers/SmoothScroll';
import { cn } from '@/utils/cn';
import { isActive, quoteTarget } from './navState';
import './Header.css';

export function Header() {
  const { pathname, hash } = useLocation();
  const { stop, start } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      // Oculta ao rolar para baixo, reaparece ao rolar para cima
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 520);
        last = y;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname, hash]);

  useEffect(() => {
    if (open) {
      stop();
      document.documentElement.style.overflow = 'hidden';
    } else {
      start();
      document.documentElement.style.overflow = '';
    }
  }, [open, stop, start]);

  return (
    <>
      <header
        className={cn('header', scrolled && 'is-scrolled', hidden && !open && 'is-hidden', open && 'is-open')}
      >
        <div className="container header__inner">
          <TLink to="/" className="header__brand">
            <Logo compact />
          </TLink>

          <nav className="header__nav" aria-label="Navegação principal">
            <ul>
              {navigation.map((item) => {
                const active = isActive(item.to, pathname, hash);
                return (
                  <li key={item.to}>
                    <TLink to={item.to} className={cn('header__link', active && 'is-active')} aria-current={active ? 'page' : undefined}>
                      {item.label}
                    </TLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header__actions">
            <Button to={quoteTarget(pathname)} className="header__cta" magnetic>
              Solicitar orçamento
            </Button>
            <button
              type="button"
              className="burger"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
