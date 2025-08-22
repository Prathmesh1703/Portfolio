import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface/30 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 hover:bg-surface/40",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}