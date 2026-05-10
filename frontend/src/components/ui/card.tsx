import * as React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'feature' | 'pricing';
  isPopular?: boolean;
}

export function Card({ className, variant = 'default', isPopular, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'gl-card',
        variant === 'feature' && 'gl-card-feature',
        variant === 'pricing' && 'gl-card-pricing',
        isPopular && 'is-popular',
        className
      )}
      {...props}
    />
  );
}
