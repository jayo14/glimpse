import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  pill?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'gl-btn gl-btn-primary',
  secondary: 'gl-btn gl-btn-secondary',
  outline: 'gl-btn gl-btn-outline',
  ghost: 'gl-btn gl-btn-ghost',
};

export function Button({
  className,
  variant = 'primary',
  fullWidth = false,
  pill = true,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        variantStyles[variant],
        fullWidth && 'w-full',
        !pill && 'rounded-[12px]', // Fallback for specific cases if needed, but DESIGN.md favors pill
        className
      )}
      {...props}
    />
  );
}
