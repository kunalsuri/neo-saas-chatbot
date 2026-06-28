/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React from 'react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Badge } from '@/shared/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { 
  Search, 
  SortAsc, 
  SortDesc, 
  Filter,
  X,
  Database
} from 'lucide-react';
import ModelCard from './ModelCard';
import type { LocalModel } from '@/shared/types/model-management';
import { useModelSearch } from '../../hooks';
import { cn } from '../../utils';

interface ModelListProps {
  readonly models: readonly LocalModel[];
  readonly onTestModel?: (modelId: string) => void;
  readonly onLoadModel?: (modelId: string) => void;
  readonly onUnloadModel?: (modelId: string) => void;
  readonly onViewModelDetails?: (modelId: string) => void;
  readonly isLoading?: boolean;
  readonly className?: string;
}

function ModelList({
  models,
  onTestModel,
  onLoadModel,
  onUnloadModel,
  onViewModelDetails,
  isLoading = false,
  className
}: ModelListProps) {
  const {
    filteredModels,
    searchQuery,
    sortBy,
    sortOrder,
    setSearchQuery,
    setSortBy,
    toggleSortOrder,
    clearSearch,
    searchStats
  } = useModelSearch({ models });

  const hasFilters = searchStats.hasActiveFilters;
  const isEmpty = models.length === 0;
  const isFiltered = searchStats.filtered < searchStats.total;

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  function handleSortChange(value: string) {
    setSortBy(value as 'name' | 'size' | 'modified' | 'status');
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search and Filter Controls */}
      {!isEmpty && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search models by name, publisher, or type..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 pr-10"
                />
                {searchQuery && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                    <span className="sr-only">Clear search</span>
                  </Button>
                )}
              </div>

              {/* Sort Controls */}
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="size">Size</SelectItem>
                    <SelectItem value="modified">Modified</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={toggleSortOrder}
                  className="px-3"
                >
                  {sortOrder === 'asc' ? (
                    <SortAsc className="w-4 h-4" />
                  ) : (
                    <SortDesc className="w-4 h-4" />
                  )}
                  <span className="sr-only">Toggle sort order</span>
                </Button>

                {hasFilters && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={clearSearch}
                    className="flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Results Summary */}
            {(isFiltered || hasFilters) && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Database className="w-4 h-4" />
                  <span>
                    Showing {searchStats.filtered} of {searchStats.total} models
                  </span>
                  {isFiltered && (
                    <Badge variant="secondary" className="text-xs">
                      Filtered
                    </Badge>
                  )}
                </div>
                
                {hasFilters && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={clearSearch}
                    className="text-xs"
                  >
                    Show all models
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Models Grid */}
      {(() => {
        if (isEmpty) {
          return (
            <Card>
              <CardContent className="p-8 text-center">
                <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Models Found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  No models are currently available. Make sure your server is running and models are installed.
                </p>
              </CardContent>
            </Card>
          );
        }

        if (filteredModels.length === 0) {
          return (
            <Card>
              <CardContent className="p-8 text-center">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Matching Models</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-4">
                  No models match your current search criteria. Try adjusting your search terms or clearing filters.
                </p>
                <Button variant="outline" onClick={clearSearch}>
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          );
        }

        return (
          <div className="grid gap-4">
            {filteredModels.map((model: LocalModel, index: number) => (
              <ModelCard
                key={`${model.id}-${index}`}
                model={model}
                index={index}
                {...(onTestModel && { onTest: onTestModel })}
                {...(onLoadModel && { onLoad: onLoadModel })}
                {...(onUnloadModel && { onUnload: onUnloadModel })}
                {...(onViewModelDetails && { onViewDetails: onViewModelDetails })}
                isLoading={isLoading}
              />
            ))}
          </div>
        );
      })()}

      {/* Loading State Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
            <p className="text-sm text-muted-foreground">Loading models...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(ModelList);
