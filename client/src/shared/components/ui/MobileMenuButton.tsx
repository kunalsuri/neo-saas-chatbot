/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { SidebarTrigger } from "@/shared/components/ui/sidebar";

interface MobileMenuButtonProps {
  readonly className?: string;
}

export function MobileMenuButton({ className }: MobileMenuButtonProps) {
  // Using SidebarTrigger from shadcn/ui sidebar
  return (
    <SidebarTrigger 
      className={cn(
        "p-2 rounded-lg text-foreground hover:bg-accent/50 transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "md:hidden", // Only show on mobile
        className
      )}
    />
  );
}
