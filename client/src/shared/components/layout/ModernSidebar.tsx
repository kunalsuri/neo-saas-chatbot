/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React from "react";
import { useLocation, Link } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import {
  LayoutDashboard,
  Settings,
  MessageSquare,
  Languages,
  Sparkles,
  Cpu,
  Bot,
  Users,
  User,
  LogOut,
  ChevronUp,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { useAuthContext, canManageUsers, validateRole } from "@/features/auth";

// Navigation data structure
const navigationData = {
  dashboard: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
  ],
  aiTools: [
    {
      title: "AI Chat (Local)",
      url: "/ai-chatbot-local",
      icon: MessageSquare,
    },
    {
      title: "Translation",
      url: "/translate-local",
      icon: Languages,
    },
    {
      title: "Prompt Improver",
      url: "/prompt-local",
      icon: Sparkles,
    },
    {
      title: "Summary",
      url: "/summary-local",
      icon: Sparkles,
    },
    {
      title: "Text Manipulation",
      url: "/text-manipulation",
      icon: FileText,
    },
  ],
  externalAI: [
    {
      title: "AI Chat (External)",
      url: "/ai-chatbot-external",
      icon: Bot,
    },
    {
      title: "Chat Demo",
      url: "/chat-demo",
      icon: MessageSquare,
    },
  ],
  modelManagement: [
    {
      title: "Local Model Management",
      url: "/local-model-mgmt",
      icon: Cpu,
    },
    {
      title: "External Model Management",
      url: "/external-model-mgmt",
      icon: Bot,
    },
  ],
  settings: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};

export function ModernSidebar() {
  const [location] = useLocation();
  const { user: currentUser, logout } = useAuthContext();
  
  // Get validated user role
  const userRole = validateRole(currentUser?.role as string | undefined);
  
  // Add user management for admin users
  const settingsItems = [...navigationData.settings];
  if (canManageUsers(userRole)) {
    settingsItems.unshift({
      title: "User Management",
      url: "/user-management",
      icon: Users,
    });
  }

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Bot className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">AI ChatBot SaaS</span>
                  <span className="truncate text-xs text-muted-foreground">AI-Powered Platform</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Dashboard Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.dashboard.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* AI Tools (Local) Section */}
        <SidebarGroup>
          <SidebarGroupLabel>AI Tools (Local)</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.aiTools.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* AI Tools (External API) Section */}
        <SidebarGroup>
          <SidebarGroupLabel>AI Tools (External API)</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.externalAI.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Model Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Model Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.modelManagement.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex items-center w-full">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={currentUser?.avatar} alt={currentUser?.name || "User"} />
                      <AvatarFallback className="rounded-lg">
                        {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                      <span className="truncate font-semibold">
                        {currentUser?.name || "John Doe"}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {typeof currentUser?.email === 'string' ? currentUser.email : "john@example.com"}
                      </span>
                    </div>
                    <ChevronUp className="ml-auto size-4" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <User />
                    Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}