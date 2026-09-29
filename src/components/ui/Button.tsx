import { useRef, type ReactNode, type ButtonHTMLAttributes } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { TLink } from './TLink';
import { useMagnetic } from '@/hooks/useMagnetic';
import { cn } from '@/utils/cn';
import './Button.css';

type Variant = 'primary' | 'outline' | 'outline-dark' | 'navy';
type Size = 'md' | 'lg' | 'xl';

interface Base {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode | false;
  magnetic?: boolean;
  className?: string;
  'aria-label'?: string;
}

type AsLink = Base & { to: string; href?: never; onClick?: () => void };
type AsAnchor = Base & { href: string; to?: never; onClick?: () => void; external?: boolean };
type AsButton = Base & { to?: never; href?: never; loading?: boolean } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>;

export type ButtonProps = AsLink | AsAnchor | AsButton;

export function Button(props: ButtonProps) {
  const { children, variant = 'primary', size = 'md', icon, magnetic = false, className } = props;
  const wrap = useRef<HTMLSpanElement>(null);
  useMagnetic(wrap, 0.22, magnetic);

  const loading = 'loading' in props && props.loading;
  const iconNode = icon === false ? null : loading ? <Loader2 className="btn__spin" aria-hidden /> : (icon ?? <ArrowRight aria-hidden />);
  const inner = (
    <>
      <span className="btn__fill" aria-hidden="true" />
      <span className="btn__label">{children}</span>
      {iconNode && <span className="btn__icon">{iconNode}</span>}
    </>
  );
  const cls = cn('btn', `btn--${variant}`, `btn--${size}`, loading && 'is-loading', className);

  let el: ReactNode;
  if ('to' in props && props.to) {
    el = (
      <TLink to={props.to} className={cls} onClick={props.onClick} aria-label={props['aria-label']}>
        {inner}
      </TLink>
    );
  } else if ('href' in props && props.href) {
    const ext = props.external ?? /^https?:/.test(props.href);
    el = (
      <a
        href={props.href}
        className={cls}
        onClick={props.onClick}
        aria-label={props['aria-label']}
        {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    );
  } else {
    const { children: _c, variant: _v, size: _s, icon: _i, magnetic: _m, className: _cl, loading: _l, type = 'button', disabled, ...rest } = props as AsButton;
    el = (
      <button type={type} className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
        {inner}
      </button>
    );
  }

  return (
    <span ref={wrap} className="btn-wrap">
      {el}
    </span>
  );
}
