// src/Auth/components/HorizontalAlert.tsx
import React from 'react';
import { cn } from '../../lib/utils'; // Adjust path as needed
import {
  AlertCircle, // Corresponds to faCircleExclamation (error)
  AlertTriangle, // Corresponds to faTriangleExclamation (warning)
  Info, // Corresponds to faCircleInfo (info)
  LucideIcon, // Type for Lucide icons
} from 'lucide-react';

// Define allowed types and display styles
type AlertType = 'error' | 'warning' | 'info';
type DisplayType = 'row' | 'col';

// Define the props interface
interface InfoboxProps {
  message: React.ReactNode;
  type: AlertType; // Use the defined type
  children?: React.ReactNode;
  display?: DisplayType; // Use the defined type, default to 'row'
  className?: string; // Allow passing additional classes
}

// Map alert types to Lucide icons and styles
const alertConfig: Record<
  AlertType,
  { icon: LucideIcon; styleClass: string }
> = {
  error: {
    icon: AlertCircle,
    styleClass: 'bg-gradient-to-b from-red-100 text-red-400', // Using bg-gradient-* instead of bg-linear-*
  },
  warning: {
    icon: AlertTriangle,
    styleClass: ' border-red-400',
  },
  info: {
    icon: Info,
    styleClass: 'bg-gradient-to-b from-blue-100 text-blue-400',
  },
};

export default function Infobox({
  message,
  type,
  children,
  display = 'row',
  className, 
}: InfoboxProps) {
  const config = alertConfig[type];
  const IconComponent = config.icon;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border p-2', // Base styles
        config.styleClass, 
        className 
      )}
      role={type === 'error' || type === 'warning' ? 'alert' : 'status'}
    >
      <div
        className={cn(
          'flex items-center gap-2', 
          display === 'col' && 'my-2 flex-col' 
        )}
      >
        {/* Render Lucide Icon */}
        <IconComponent
          className={cn(
            'h-5 w-5 flex-shrink-0', 
            display === 'col' && 'h-6 w-6' 
          )}
          aria-hidden="true"
        />
        <p className="text-center text-neutral-900">{message}</p>
      </div>

      {/* Optional Children Area */}
      {children && (
        <div className="flex basis-full items-center justify-center gap-4 py-2">
          {children}
        </div>
      )}
    </div>
  );
}
