import { Link, type LinkProps } from 'react-router-dom';
import type { MouseEvent } from 'react';
import { useTransitionNavigate } from '@/components/providers/PageTransition';

/** Link interno com transição de página e rolagem suave para âncoras. */
export function TLink({ to, onClick, ...rest }: LinkProps & { to: string }) {
  const go = useTransitionNavigate();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    go(to);
  };
  return <Link to={to} onClick={handle} {...rest} />;
}
