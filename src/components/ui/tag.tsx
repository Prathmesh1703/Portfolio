import React from 'react';
import { cn } from '@/lib/utils';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
}

export function Tag({ children, variant = 'default', className }: TagProps) {
  const variants = {
    default: "bg-surface border border-border-color text-text-secondary",
    primary: "bg-primary/10 border border-primary/30 text-primary",
    secondary: "bg-secondary/10 border border-secondary/30 text-secondary"
  };

  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}