/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { Button } from "@/shared/components/ui/button";
import { useLocation } from "wouter";
import { Bell, Plus } from "lucide-react";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

interface TopBarProps {
  readonly onCreatePost?: () => void;
  readonly onShowNotifications?: () => void;
}

export function TopBar({ onCreatePost, onShowNotifications }: TopBarProps) {
  const [location] = useLocation();

  const getBreadcrumb = () => {
    const paths = {
      "/": "Overview",
      "/create-post": "Create Post",
      "/create-post-ollama": "Create Post (Ollama)",
      "/calendar": "Content Calendar",
      "/templates": "Template Library",
      "/settings": "Settings",
      "/chat": "AI Chat",
      "/translation": "Translation",
      "/prompt-improver": "Prompt Improver",
      "/external-ai-chat": "External AI Chat",
      "/content-generator": "Content Generator",
      "/local-llms": "Local LLMs",
      "/external-model-mgmt": "External Model Management",
      "/user-management": "User Management",
    };
    
    return {
      section: "Dashboard",
      page: paths[location as keyof typeof paths] || "Overview",
    };
  };

  const breadcrumb = getBreadcrumb();

  return (
    <div className="flex h-full items-center justify-between px-4">
      {/* Breadcrumb */}
      <div className={cn(
        "flex items-center space-x-2 text-sm",
        "hidden sm:flex" // Hide on very small screens
      )} data-testid="breadcrumb">
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground font-medium">{breadcrumb.section}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-semibold">{breadcrumb.page}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        {onCreatePost && (
          <Button
            onClick={onCreatePost}
            size="sm"
            className="gap-2"
            data-testid="button-create-post"
          >
            <Plus className="w-4 h-4" />
            Create
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onShowNotifications}
          className="relative"
          data-testid="button-notifications"
        >
          <Bell className="w-4 h-4" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
        
        <ThemeToggle />
      </div>
    </div>
  );
}
