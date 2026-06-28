/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { useMemo, useState, useCallback } from 'react';
import type { LocalModel } from '@/shared/types/model-management';
import { filterModels, sortModels } from '../utils';

type SortField = 'name' | 'size' | 'modified' | 'status';
type SortOrder = 'asc' | 'desc';

interface UseModelSearchProps {
  readonly models: readonly LocalModel[];
  readonly initialSortBy?: SortField;
  readonly initialSortOrder?: SortOrder;
}

interface UseModelSearchReturn {
  readonly filteredModels: readonly LocalModel[];
  readonly searchQuery: string;
  readonly sortBy: SortField;
  readonly sortOrder: SortOrder;
  readonly setSearchQuery: (query: string) => void;
  readonly setSortBy: (sortBy: SortField) => void;
  readonly setSortOrder: (order: SortOrder) => void;
  readonly toggleSortOrder: () => void;
  readonly clearSearch: () => void;
  readonly searchStats: {
    readonly total: number;
    readonly filtered: number;
    readonly hasActiveFilters: boolean;
  };
}

/**
 * Custom hook for searching, filtering, and sorting models
 */
export function useModelSearch({
  models,
  initialSortBy = 'name',
  initialSortOrder = 'asc'
}: UseModelSearchProps): UseModelSearchReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortField>(initialSortBy);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder);

  // Toggle sort order
  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  }, []);

  // Clear search and reset filters
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSortBy('name');
    setSortOrder('asc');
  }, []);

  // Apply filters and sorting
  const filteredModels = useMemo(() => {
    if (!models.length) return [];

    // First apply search filter
    const searched = filterModels(models, searchQuery);
    
    // Then apply sorting
    const sorted = sortModels(searched, sortBy, sortOrder === 'asc');
    
    return sorted;
  }, [models, searchQuery, sortBy, sortOrder]);

  // Calculate search statistics
  const searchStats = useMemo(() => ({
    total: models.length,
    filtered: filteredModels.length,
    hasActiveFilters: searchQuery.trim().length > 0 || sortBy !== 'name' || sortOrder !== 'asc',
  }), [models.length, filteredModels.length, searchQuery, sortBy, sortOrder]);

  return {
    filteredModels,
    searchQuery,
    sortBy,
    sortOrder,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    toggleSortOrder,
    clearSearch,
    searchStats,
  };
}
