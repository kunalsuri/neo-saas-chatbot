/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/shared/hooks/use-toast';
import { translationService } from '../lib/api';
import { TranslationHistoryItem } from '../types';
import { sortTranslations } from '../lib/utils';
import { ERROR_MESSAGES } from '../lib/constants';

interface UseTranslationHistoryOptions {
  initialPageSize?: number;
  enableSearch?: boolean;
}

export function useTranslationHistory(options: UseTranslationHistoryOptions = {}) {
  const { initialPageSize = 20, enableSearch = true } = options;
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Local state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<TranslationHistoryItem | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    item: TranslationHistoryItem | null;
  }>({ isOpen: false, item: null });

  // Query key factory
  const queryKey = ['translation-history', { search: searchQuery, pageSize: initialPageSize }];

  // Fetch history
  const historyQuery = useQuery({
    queryKey,
    queryFn: () => {
      const options: {
        limit: number;
        search?: string;
      } = { limit: initialPageSize };
      
      if (enableSearch && searchQuery) {
        options.search = searchQuery;
      }
      
      return translationService.getHistory(options);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Save to history mutation
  const saveToHistoryMutation = useMutation({
    mutationFn: (translation: Omit<TranslationHistoryItem, 'id' | 'timestamp'>) =>
      translationService.saveToHistory(translation),
    onSuccess: (newItem) => {
      // Update cache with new item
      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return { items: [newItem], total: 1, hasMore: false };
        return {
          ...oldData,
          items: [newItem, ...oldData.items],
          total: oldData.total + 1,
        };
      });
      
      toast({
        title: "Translation Saved",
        description: "Translation has been saved to history",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Save Failed",
        description: error.message || ERROR_MESSAGES.saveHistoryFailed,
        variant: "destructive",
      });
    },
  });

  // Delete from history mutation
  const deleteFromHistoryMutation = useMutation({
    mutationFn: (id: string) => translationService.deleteFromHistory(id),
    onSuccess: (_, deletedId) => {
      // Update cache by removing deleted item
      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          items: oldData.items.filter((item: TranslationHistoryItem) => item.id !== deletedId),
          total: Math.max(0, oldData.total - 1),
        };
      });
      
      // Clear selection if deleted item was selected
      if (selectedItem?.id === deletedId) {
        setSelectedItem(null);
      }
      
      toast({
        title: "Translation Deleted",
        description: "Translation has been removed from history",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete translation",
        variant: "destructive",
      });
    },
  });

  // Toggle bookmark mutation
  const toggleBookmarkMutation = useMutation({
    mutationFn: (id: string) => translationService.toggleBookmark(id),
    onSuccess: (updatedItem) => {
      // Update cache with updated item
      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          items: oldData.items.map((item: TranslationHistoryItem) =>
            item.id === updatedItem.id ? updatedItem : item
          ),
        };
      });
      
      const action = updatedItem.isBookmarked ? 'bookmarked' : 'removed bookmark from';
      toast({
        title: "Bookmark Updated",
        description: `Translation ${action}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Bookmark Failed",
        description: error.message || "Failed to update bookmark",
        variant: "destructive",
      });
    },
  });

  // Handlers
  const saveToHistory = useCallback(
    (translation: Omit<TranslationHistoryItem, 'id' | 'timestamp'>) => {
      saveToHistoryMutation.mutate(translation);
    },
    [saveToHistoryMutation]
  );

  const deleteFromHistory = useCallback((id: string) => {
    deleteFromHistoryMutation.mutate(id);
  }, [deleteFromHistoryMutation]);

  const toggleBookmark = useCallback((id: string) => {
    toggleBookmarkMutation.mutate(id);
  }, [toggleBookmarkMutation]);

  const openDeleteConfirmation = useCallback((item: TranslationHistoryItem) => {
    setDeleteConfirmation({ isOpen: true, item });
  }, []);

  const closeDeleteConfirmation = useCallback(() => {
    setDeleteConfirmation({ isOpen: false, item: null });
  }, []);

  const confirmDelete = useCallback(() => {
    if (deleteConfirmation.item) {
      deleteFromHistory(deleteConfirmation.item.id);
      closeDeleteConfirmation();
    }
  }, [deleteConfirmation.item, deleteFromHistory, closeDeleteConfirmation]);

  const selectItem = useCallback((item: TranslationHistoryItem) => {
    setSelectedItem(item);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedItem(null);
  }, []);

  // Computed values
  const sortedHistory = historyQuery.data?.items 
    ? sortTranslations(historyQuery.data.items, searchQuery)
    : [];

  return {
    // Data
    history: sortedHistory,
    total: historyQuery.data?.total || 0,
    hasMore: historyQuery.data?.hasMore || false,
    selectedItem,
    searchQuery,
    
    // Loading states
    isLoading: historyQuery.isLoading,
    isSaving: saveToHistoryMutation.isPending,
    isDeleting: deleteFromHistoryMutation.isPending,
    isUpdatingBookmark: toggleBookmarkMutation.isPending,
    
    // Error states
    error: historyQuery.error,
    
    // Actions
    saveToHistory,
    deleteFromHistory,
    toggleBookmark,
    selectItem,
    clearSelection,
    setSearchQuery,
    
    // Delete confirmation dialog
    deleteConfirmation,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    confirmDelete,
    
    // Refetch
    refetch: historyQuery.refetch,
  };
}