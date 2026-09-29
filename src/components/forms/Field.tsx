import type { ReactNode } from 'react';
import { AlertCircle, Check } from 'lucide-react';
import { cn } from '@/utils/cn';

interface Props {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  valid?: boolean;
  hint?: string;
  className?: string;
  children: ReactNode;
}

/** Estrutura de campo: rótulo, controle, estados de erro/sucesso e mensagem acessível. */
export function Field({ id, label, optional, error, valid, hint, className, children }: Props) {
  return (
    <div className={cn('field', error && 'has-error', valid && !error && 'is-valid', className)}>
      <label className="field__label" htmlFor={id}>
        {label}
        {optional ? <span className="field__opt"> (opcional)</span> : <span aria-hidden="true" className="field__req"> *</span>}
      </label>
      <div className="field__control">
        {children}
        <span className="field__state" aria-hidden="true">
          {error ? <AlertCircle /> : valid ? <Check /> : null}
        </span>
      </div>
      {error ? (
        <p className="field__msg" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
