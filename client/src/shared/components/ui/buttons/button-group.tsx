/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  spacing?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ 
    children, 
    orientation = 'horizontal', 
    className, 
    spacing = 'md',
    fullWidth = false,
    ...props 
  }, ref) => {
    const spacingClasses = {
      sm: orientation === 'horizontal' ? 'space-x-1' : 'space-y-1',
      md: orientation === 'horizontal' ? 'space-x-2' : 'space-y-2',
      lg: orientation === 'horizontal' ? 'space-x-3' : 'space-y-3',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          spacingClasses[spacing],
          fullWidth && 'w-full',
          orientation === 'horizontal' && fullWidth && '[&>*]:flex-1',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";