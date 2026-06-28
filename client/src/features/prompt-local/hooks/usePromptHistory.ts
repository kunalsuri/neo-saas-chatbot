/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/shared/hooks/use-toast';
import { apiClient } from '../lib/api';
import { 
  UsePromptHistoryReturn, 
  PromptHistoryItem, 
  MutablePromptHistoryItem 
} from '../types';
import { 
  searchHistory, 
  sortHistory, 
  filterHistory, 
  getErrorMessage,
  saveToLocalStorage,
  loadFromLocalStorage 
} from '../lib/utils';
import { STORAGE_KEYS, LIMITS } from '../lib/constants';

export function usePromptHistory(): UsePromptHistoryReturn {
  const { toast } = useToast();
  
  // State
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load history from API on mount
  const loadHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await apiClient.getHistory();
      setHistory(data);
      
      // Cache locally
      saveToLocalStorage(STORAGE_KEYS.history, data);
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      setError(errorMsg);
      
      // Try to load from local cache as fallback
      const cachedHistory = loadFromLocalStorage<PromptHistoryItem[]>(STORAGE_KEYS.history, []);
      if (cachedHistory.length > 0) {
        setHistory(cachedHistory);
        toast({
          title: 'Using Cached History',
          description: 'Loaded history from local cache due to network error',
          variant: 'default',
        });
      } else {
        toast({
          title: 'Failed to Load History',
          description: errorMsg,
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Add item to history
  const addToHistory = useCallback(async (
    item: Omit<PromptHistoryItem, 'id' | 'timestamp'>
  ): Promise<void> => {
    try {
      const savedItem = await apiClient.saveToHistory(item);
      
      setHistory(prev => {
        const updated = [savedItem, ...prev].slice(0, LIMITS.maxHistoryItems);
        saveToLocalStorage(STORAGE_KEYS.history, updated);
        return updated;
      });
      
      toast({
        title: 'Saved to History',
        description: 'Prompt improvement saved successfully',
      });
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      toast({
        title: 'Save Failed',
        description: errorMsg,
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast]);

  // Remove item from history
  const removeFromHistory = useCallback(async (id: string): Promise<void> => {
    try {
      await apiClient.deleteFromHistory(id);
      
      setHistory(prev => {
        const updated = prev.filter(item => item.id !== id);
        saveToLocalStorage(STORAGE_KEYS.history, updated);
        return updated;
      });
      
      toast({
        title: 'Deleted',
        description: 'Item removed from history',
      });
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      toast({
        title: 'Delete Failed',
        description: errorMsg,
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast]);

  // Toggle bookmark status
  const toggleBookmark = useCallback(async (id: string): Promise<void> => {
    try {
      // Optimistically update UI
      setHistory(prev => {
        const updated = prev.map(item => {
          if (item.id === id) {
            const mutableItem = item as MutablePromptHistoryItem;
            mutableItem.isBookmarked = !item.isBookmarked;
            return mutableItem;
          }
          return item;
        });
        
        saveToLocalStorage(STORAGE_KEYS.history, updated);
        return updated;
      });

      // Update on server
      const updatedItem = await apiClient.toggleBookmark(id);
      
      // Sync with server response
      setHistory(prev => {
        const updated = prev.map(item => 
          item.id === id ? updatedItem : item
        );
        saveToLocalStorage(STORAGE_KEYS.history, updated);
        return updated;
      });
      
      toast({
        title: updatedItem.isBookmarked ? 'Bookmarked' : 'Bookmark Removed',
        description: updatedItem.isBookmarked 
          ? 'Added to bookmarks' 
          : 'Removed from bookmarks',
      });
    } catch (error) {
      // Revert optimistic update on error
      setHistory(prev => {
        const reverted = prev.map(item => {
          if (item.id === id) {
            const mutableItem = item as MutablePromptHistoryItem;
            mutableItem.isBookmarked = !item.isBookmarked; // Revert
            return mutableItem;
          }
          return item;
        });
        saveToLocalStorage(STORAGE_KEYS.history, reverted);
        return reverted;
      });
      
      const errorMsg = getErrorMessage(error);
      toast({
        title: 'Bookmark Failed',
        description: errorMsg,
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast]);

  // Clear all history
  const clearHistory = useCallback(async (): Promise<void> => {
    try {
      // Delete all items from server
      await Promise.all(history.map(item => apiClient.deleteFromHistory(item.id)));
      
      setHistory([]);
      saveToLocalStorage(STORAGE_KEYS.history, []);
      
      toast({
        title: 'History Cleared',
        description: 'All history items have been deleted',
      });
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      toast({
        title: 'Clear Failed',
        description: errorMsg,
        variant: 'destructive',
      });
      throw error;
    }
  }, [history, toast]);

  // Search history
  const searchHistoryItems = useCallback((query: string): PromptHistoryItem[] => {
    return searchHistory(history, query);
  }, [history]);

  // Get history item by ID
  const getHistoryById = useCallback((id: string): PromptHistoryItem | null => {
    return history.find(item => item.id === id) || null;
  }, [history]);

  // Load history on mount
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return {
    history,
    isLoading,
    error,
    addToHistory,
    removeFromHistory,
    toggleBookmark,
    clearHistory,
    searchHistory: searchHistoryItems,
    getHistoryById,
  };
}

// Extended hook with filtering and sorting
export function usePromptHistoryWithFilters() {
  const baseHook = usePromptHistory();
  const [sortBy, setSortBy] = useState<'timestamp' | 'confidence' | 'tokens' | 'alphabetical'>('timestamp');
  const [filter, setFilter] = useState<'all' | 'bookmarked' | 'recent' | 'high-confidence'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedHistory = useCallback(() => {
    let result = baseHook.history;
    
    // Apply search filter
    if (searchQuery.trim()) {
      result = searchHistory(result, searchQuery);
    }
    
    // Apply category filter
    result = filterHistory(result, filter);
    
    // Apply sorting
    result = sortHistory(result, sortBy);
    
    return result;
  }, [baseHook.history, searchQuery, filter, sortBy]);

  return {
    ...baseHook,
    filteredHistory: filteredAndSortedHistory(),
    sortBy,
    setSortBy,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
  };
}