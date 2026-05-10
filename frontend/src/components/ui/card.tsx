import * as React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'light' | 'dark';
}

export function Card({ className, tone = 'light', ...props }: CardProps) {
  return <div className={cn('gl-card', tone === 'dark' && 'gl-card-dark', className)} {...props} />;
}
