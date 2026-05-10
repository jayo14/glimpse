'use client';

import { Monitor, Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

const options = [
  { key: 'light', label: 'Light', icon: Sun },
  { key: 'dark', label: 'Dark', icon: Moon },
  { key: 'system', label: 'System', icon: Monitor },
] as const;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={cn('gl-theme-toggle', className)} role="radiogroup" aria-label="Theme mode">
      {options.map((option) => {
        const Icon = option.icon;
        const active = theme === option.key;

        return (
          <button
            key={option.key}
            type="button"
            onClick={() => setTheme(option.key)}
            role="radio"
            aria-checked={active}
            className={cn('gl-theme-toggle-option', active && 'is-active')}
          >
            <Icon size={16} weight={active ? 'bold' : 'regular'} />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
