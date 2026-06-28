/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React, { ReactNode, useState } from "react";
import { ModernSidebar } from "./ModernSidebar";
import { TopBar } from "./TopBar";
import { useLocation } from "wouter";
import { Button } from "@/shared/components/ui/button";
import { cn } from '@/lib/utils';
import { 
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";

interface AppLayoutProps {
  readonly children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [, navigate] = useLocation();

  const handleCreatePost = () => {
    navigate("/create-post");
  };

  const handleShowNotifications = () => {
    // For now, we'll just log notifications - future enhancement can add a proper notification panel
    console.log("Show notifications panel");
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Skip Links for Keyboard Navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <a
          href="#sidebar-nav"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-32 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to navigation
        </a>
        
        <ModernSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
            <div className="flex-1">
              <TopBar 
                onCreatePost={handleCreatePost} 
                onShowNotifications={handleShowNotifications}
              />
            </div>
          </header>
          <main 
            id="main-content"
            className={cn(
              "flex-1 overflow-auto transition-all duration-300",
              // Responsive padding with better spacing
              "p-4 lg:p-6 xl:p-8"
            )}
            role="main"
            aria-label="Main content area"
          >
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
