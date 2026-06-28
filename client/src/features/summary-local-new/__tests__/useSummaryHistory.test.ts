/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useSummaryHistory } from '../useSummaryHistory';
import { summaryApi } from '../api';

// Mock the API
vi.mock('../api');

const mockSummaryApi = summaryApi as any;

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('useSummaryHistory', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  describe('initialization', () => {
    it('should handle undefined response from API', async () => {
      mockSummaryApi.getHistory.mockResolvedValue(undefined);

      const { result } = renderHook(() => useSummaryHistory());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Should default to empty array
      expect(result.current.history).toEqual([]);
    });

    it('should handle null response from API', async () => {
      mockSummaryApi.getHistory.mockResolvedValue(null);

      const { result } = renderHook(() => useSummaryHistory());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Should default to empty array
      expect(result.current.history).toEqual([]);
    });

    it('should handle non-array response from API', async () => {
      mockSummaryApi.getHistory.mockResolvedValue('not an array');

      const { result } = renderHook(() => useSummaryHistory());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Should default to empty array
      expect(result.current.history).toEqual([]);
    });

    it('should handle valid array response from API', async () => {
      const mockHistory = [
        {
          id: '1',
          prompt: 'Test prompt',
          originalText: 'Test content',
          summary: 'Test summary',
          model: 'test-model',
          tokens: 100,
          timestamp: new Date().toISOString()
        }
      ];

      mockSummaryApi.getHistory.mockResolvedValue(mockHistory);

      const { result } = renderHook(() => useSummaryHistory());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.history).toEqual(mockHistory);
    });

    it('should fallback to localStorage when API fails', async () => {
      const mockStoredHistory = [
        {
          id: '1',
          prompt: 'Stored prompt',
          originalText: 'Stored content',
          summary: 'Stored summary',
          model: 'stored-model',
          tokens: 50,
          timestamp: new Date().toISOString()
        }
      ];

      mockSummaryApi.getHistory.mockRejectedValue(new Error('API Error'));
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockStoredHistory));

      const { result } = renderHook(() => useSummaryHistory());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.history).toEqual(mockStoredHistory);
    });

    it('should handle invalid localStorage data', async () => {
      mockSummaryApi.getHistory.mockRejectedValue(new Error('API Error'));
      mockLocalStorage.getItem.mockReturnValue('invalid json');

      const { result } = renderHook(() => useSummaryHistory());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Should default to empty array when both API and localStorage fail
      expect(result.current.history).toEqual([]);
    });

    it('should handle non-array localStorage data', async () => {
      mockSummaryApi.getHistory.mockRejectedValue(new Error('API Error'));
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify('not an array'));

      const { result } = renderHook(() => useSummaryHistory());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Should default to empty array when localStorage contains non-array
      expect(result.current.history).toEqual([]);
    });
  });

  describe('loadSummaryHistory', () => {
    it('should handle undefined response and set empty array', async () => {
      mockSummaryApi.getHistory.mockResolvedValue(undefined);

      const { result } = renderHook(() => useSummaryHistory());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Call loadSummaryHistory manually
      await result.current.loadSummaryHistory();

      expect(result.current.history).toEqual([]);
    });

    it('should re-throw on API error and leave history as an empty array', async () => {
      mockSummaryApi.getHistory.mockRejectedValue(new Error('API Error'));

      const { result } = renderHook(() => useSummaryHistory());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // loadSummaryHistory re-throws on error (by design) so the UI can react;
      // history stays the empty array from the initial localStorage fallback.
      await expect(result.current.loadSummaryHistory()).rejects.toThrow('API Error');

      expect(result.current.history).toEqual([]);
    });
  });
});