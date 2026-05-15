import * as React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'feature' | 'pricing' | 'glass';
  isPopular?: boolean;
}

export function Card({ className, variant = 'default', isPopular, ...props }: CardProps) {
  return (
    <div
      className={cn(
        variant === 'default' && 'gl-card',
        variant === 'feature' && 'gl-card-feature shadow-md',
        variant === 'pricing' && 'gl-card-pricing shadow-lg',
        variant === 'glass' && 'gl-glass rounded-[24px] shadow-photo',
        isPopular && 'is-popular',
        className
      )}
      {...props}
    />
  );
}
