// src/Auth/components/ShadowButton.tsx
import React, { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react'; 
import { cn } from '../../lib/utils'; 

// Define the props interface
interface LoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: LucideIcon; // Changed type from IconDefinition to LucideIcon
  children?: React.ReactNode;
  iconColor?: string; // Keep for direct color class on icon, or merge into iconClassName
  iconClassName?: string; // Add a prop specifically for Lucide icon classes (size, stroke-width, etc.)
  iconLocation?: 'left' | 'right';
}

const Button = forwardRef<HTMLButtonElement, LoginButtonProps>(
  (
    {
      onClick,
      icon: IconComponent,
      children,
      iconColor,
      iconClassName, // Destructure the new prop
      iconLocation = 'left',
      className,
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          'rounded-lg p-2', // Base styles
          'flex items-center gap-2', // Flex layout styles
          iconLocation === 'right' && 'flex-row-reverse justify-between',
          !IconComponent && 'justify-center', // Check if IconComponent exists
          className
        )}
        onClick={onClick}
        type={type}
        ref={ref}
        {...props}
      >
        {IconComponent && (
          <div className="flex basis-6 items-center justify-center">
            <IconComponent
              className={cn('h-4 w-4', iconColor, iconClassName)} 
              strokeWidth={2} 
            />
          </div>
        )}
        {children && <p className="whitespace-nowrap">{children}</p>}
      </button>
    );
  }
);


export default Button;
