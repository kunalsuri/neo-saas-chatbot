/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { useState, useEffect, useCallback } from 'react';
import { SummaryHistoryItem } from './types';
import { summaryApi } from './api';

export type { SummaryHistoryItem };

interface UseSummaryHistoryReturn {
  history: SummaryHistoryItem[];
  isLoading: boolean;
  loadSummaryHistory: () => Promise<void>;
  deleteSummary: (id: string) => Promise<void>;
  addSummary: (summary: Omit<SummaryHistoryItem, 'id' | 'timestamp'>) => Promise<void>;
  clearHistory: () => Promise<void>;
}

export function useSummaryHistory(): UseSummaryHistoryReturn {
  const [history, setHistory] = useState<SummaryHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load history from server API on mount
  useEffect(() => {
    const loadHistory = async () => {
      setIsLoading(true);
      try {
        const serverHistory = await summaryApi.getHistory();
        // Defensive: history must always be an array even if the API yields a non-array
        setHistory(Array.isArray(serverHistory) ? serverHistory : []);
      } catch (error) {
        console.error('Failed to load summary history from server:', error);
        // Fallback to localStorage if server fails (e.g., auth issues, network problems)
        try {
          const stored = localStorage.getItem('summary-history');
          if (stored) {
            const parsed = JSON.parse(stored);
            // Ensure parsed data is an array
            const validParsed = Array.isArray(parsed) ? parsed : [];
            setHistory(validParsed);
          } else {
            setHistory([]);
          }
        } catch (localError) {
          console.error('Failed to load from localStorage too:', localError);
          setHistory([]);
        }
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    if (!isInitialized) {
      loadHistory();
    }
  }, [isInitialized]);

  const loadSummaryHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const serverHistory = await summaryApi.getHistory();
      // Defensive: history must always be an array even if the API yields a non-array
      const safeHistory = Array.isArray(serverHistory) ? serverHistory : [];
      setHistory(safeHistory);
      // Update localStorage cache
      localStorage.setItem('summary-history', JSON.stringify(safeHistory));
    } catch (error) {
      console.error('Failed to manually load summary history from server:', error);
      // Don't fallback to localStorage on manual reload - just re-throw the error
      // so the UI can handle it appropriately (e.g., show login prompt)
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteSummary = useCallback(async (id: string) => {
    try {
      await summaryApi.delete(id);
      
      // Update local state
      setHistory(prev => {
        const updated = prev.filter(item => item.id !== id);
        // Update localStorage
        localStorage.setItem('summary-history', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('Failed to delete summary from server:', error);
      throw error;
    }
  }, []);

  const addSummary = useCallback(async (summary: Omit<SummaryHistoryItem, 'id' | 'timestamp'>) => {
    try {
      await summaryApi.save(summary);

      // Reload the entire history from server to ensure we have the latest data
      await loadSummaryHistory();
    } catch (error) {
      console.error('Failed to save summary to server:', error);
      // Fallback to local-only storage
      const newSummary: SummaryHistoryItem = {
        ...summary,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString()
      };

      setHistory(prev => {
        const newHistory = [newSummary, ...prev];
        return newHistory;
      });
    }
  }, [loadSummaryHistory]);

  const clearHistory = useCallback(async () => {
    try {
      // Clear each item individually since we don't have a bulk delete API
      for (const item of history) {
        await summaryApi.delete(item.id);
      }
      setHistory([]);
      localStorage.removeItem('summary-history');
    } catch (error) {
      console.error('Failed to clear history:', error);
      throw error;
    }
  }, [history]);

  return {
    history,
    isLoading,
    loadSummaryHistory,
    deleteSummary,
    addSummary,
    clearHistory
  };
}