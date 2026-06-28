/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React from 'react';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { 
  Play, 
  Square, 
  Activity, 
  HardDrive, 
  Calendar, 
  User, 
  Layers,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import type { LocalModel } from '@/shared/types/model-management';
import { 
  cn, 
  formatFileSize, 
  formatDate, 
  formatNumber, 
  getModelStatusVariant,
  generateModelKey 
} from '../../utils';

interface ModelCardProps {
  readonly model: LocalModel;
  readonly index: number;
  readonly onTest?: (modelId: string) => void;
  readonly onLoad?: (modelId: string) => void;
  readonly onUnload?: (modelId: string) => void;
  readonly onViewDetails?: (modelId: string) => void;
  readonly isLoading?: boolean;
  readonly className?: string;
}

function ModelCard({
  model,
  index,
  onTest,
  onLoad,
  onUnload,
  onViewDetails,
  isLoading = false,
  className
}: ModelCardProps) {
  const isActive = model.status.status === 'active';
  const isLoadingState = model.status.status === 'loading' || isLoading;
  const isError = model.status.status === 'error';

  function handleLoad() {
    if (onLoad && !isActive && !isLoadingState) {
      onLoad(model.id);
    }
  }

  function handleUnload() {
    if (onUnload && isActive && !isLoadingState) {
      onUnload(model.id);
    }
  }

  function handleTest() {
    if (onTest && isActive && !isLoadingState) {
      onTest(model.id);
    }
  }

  function handleViewDetails() {
    if (onViewDetails) {
      onViewDetails(model.id);
    }
  }

  const cardKey = generateModelKey(model, index);

  return (
    <Card 
      key={cardKey}
      className={cn(
        'group transition-all duration-200 hover:shadow-md hover:shadow-primary/5',
        'border-border/50 hover:border-border',
        isError && 'border-destructive/30 bg-destructive/5',
        isActive && 'ring-1 ring-primary/20 bg-primary/5',
        className
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          {/* Model Info */}
          <div className="min-w-0 flex-1 space-y-3">
            {/* Header */}
            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {model.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge 
                    variant={getModelStatusVariant(model.status.status)}
                    className="text-xs"
                  >
                    {model.status.state || model.status.status}
                  </Badge>
                  {model.type && (
                    <Badge variant="outline" className="text-xs">
                      <Layers className="w-3 h-3 mr-1" />
                      {model.type.toUpperCase()}
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-1">
                {isActive && !isLoadingState && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleTest}
                    className="h-8 px-2"
                    disabled={!onTest}
                  >
                    <Play className="w-3 h-3" />
                    <span className="sr-only">Test model</span>
                  </Button>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 opacity-60 group-hover:opacity-100"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                      <span className="sr-only">Model actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {!isActive && !isLoadingState && onLoad && (
                      <DropdownMenuItem onClick={handleLoad}>
                        <Play className="w-4 h-4 mr-2" />
                        Load Model
                      </DropdownMenuItem>
                    )}
                    {isActive && !isLoadingState && onUnload && (
                      <DropdownMenuItem onClick={handleUnload}>
                        <Square className="w-4 h-4 mr-2" />
                        Unload Model
                      </DropdownMenuItem>
                    )}
                    {isActive && !isLoadingState && onTest && (
                      <DropdownMenuItem onClick={handleTest}>
                        <Activity className="w-4 h-4 mr-2" />
                        Test Model
                      </DropdownMenuItem>
                    )}
                    {onViewDetails && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleViewDetails}>
                          View Details
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
              {model.publisher && (
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{model.publisher}</span>
                </div>
              )}
              
              {model.quantization && (
                <div className="flex items-center gap-1">
                  <Layers className="w-3 h-3 flex-shrink-0" />
                  <span>{model.quantization}</span>
                </div>
              )}
              
              {model.size && (
                <div className="flex items-center gap-1">
                  <HardDrive className="w-3 h-3 flex-shrink-0" />
                  <span>{formatFileSize(model.size)}</span>
                </div>
              )}
              
              {model.maxContext && (
                <div className="flex items-center gap-1">
                  <Activity className="w-3 h-3 flex-shrink-0" />
                  <span>{formatNumber(model.maxContext)} tokens</span>
                </div>
              )}
              
              {model.modified && (
                <div className="flex items-center gap-1 sm:col-span-2">
                  <Calendar className="w-3 h-3 flex-shrink-0" />
                  <span>{formatDate(model.modified, { relative: true })}</span>
                </div>
              )}
            </div>

            {/* Memory Usage (if available) */}
            {model.status.memoryUsage && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Activity className="w-3 h-3" />
                <span>Memory: {formatFileSize(model.status.memoryUsage)}</span>
              </div>
            )}

            {/* Last Used (if available) */}
            {model.status.lastUsed && (
              <div className="text-xs text-muted-foreground">
                Last used: {formatDate(model.status.lastUsed, { relative: true })}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default React.memo(ModelCard);
