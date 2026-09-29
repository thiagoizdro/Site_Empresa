import { BrandMark } from './BrandMark';
import { cn } from '@/utils/cn';
import './Logo.css';

interface Props {
  variant?: 'light' | 'color';
  className?: string;
  compact?: boolean;
}

/** Assinatura horizontal: símbolo + "CONSTRUTORA / & SERVIÇOS EIRELI" */
export function Logo({ variant = 'light', className, compact }: Props) {
  return (
    <span className={cn('logo', `logo--${variant}`, compact && 'logo--compact', className)}>
      <BrandMark className="logo__mark" variant={variant} />
      <span className="logo__text" aria-hidden="true">
        <span className="logo__name">Construtora</span>
        <span className="logo__sub">&amp; Serviços EIRELI</span>
      </span>
      <span className="visually-hidden">Construtora MI &amp; Serviços EIRELI</span>
    </span>
  );
}
