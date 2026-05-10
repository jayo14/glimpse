import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

export function Input({ className, label, hint, id, ...props }: InputProps) {
  const inputId = id || props.name;

  return (
    <label className="gl-input-wrap" htmlFor={inputId}>
      {label ? <span className="gl-label">{label}</span> : null}
      <input id={inputId} className={cn('gl-input', className)} {...props} />
      {hint ? <span className="gl-input-hint">{hint}</span> : null}
    </label>
  );
}
