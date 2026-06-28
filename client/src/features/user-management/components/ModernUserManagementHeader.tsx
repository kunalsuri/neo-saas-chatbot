/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

/**
 * Modernized User Management Header with enhanced UI components
 */

import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Separator } from '@/shared/components/ui/separator';
import { Plus, BarChart3, Users, Wifi, WifiOff } from 'lucide-react';

interface ModernUserManagementHeaderProps {
  wsConnected: boolean;
  showAnalytics: boolean;
  userCount?: number;
  onToggleAnalytics: () => void;
  onCreateUser: () => void;
}

export const ModernUserManagementHeader = React.memo<ModernUserManagementHeaderProps>(({
  wsConnected,
  showAnalytics,
  userCount,
  onToggleAnalytics,
  onCreateUser,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            {userCount !== undefined && (
              <Badge variant="secondary" className="text-sm">
                <Users className="mr-1 h-3 w-3" />
                {userCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1.5">
              {wsConnected ? (
                <Wifi className="h-3 w-3 text-green-500" />
              ) : (
                <WifiOff className="h-3 w-3 text-red-500" />
              )}
              <span className="text-sm text-muted-foreground">
                {wsConnected ? 'Real-time updates active' : 'Offline mode'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onToggleAnalytics}
            className="gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
          </Button>
          <Button 
            onClick={onCreateUser}
            size="sm"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>
      
      <Separator />
    </div>
  );
});

ModernUserManagementHeader.displayName = 'ModernUserManagementHeader';