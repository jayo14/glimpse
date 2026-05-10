import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'face-found' | 'processing' | 'uploading' | 'event-live';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'gl-badge',
  'face-found': 'gl-badge gl-badge-face-found',
  processing: 'gl-badge gl-badge-processing',
  uploading: 'gl-badge gl-badge-uploading',
  'event-live': 'gl-badge gl-badge-event-live',
};

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return <span className={cn(variantStyles[variant], className)} {...props} />;
}
