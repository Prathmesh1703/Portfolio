import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95";
  
  const variants = {
    primary: "bg-primary/90 backdrop-blur-sm text-black hover:bg-primary shadow-lg hover:shadow-primary/25",
    secondary: "bg-transparent backdrop-blur-sm border border-primary/50 text-white hover:bg-primary/20 hover:border-primary",
    outline: "border border-primary text-primary hover:bg-primary hover:text-black"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg"
  };
  
  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}