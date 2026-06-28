/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { summaryApi } from '../api';
import { secureGet, securePost, secureDelete } from '@/features/auth/utils/secureApi';

// Mock the secure API functions
vi.mock('@/features/auth/utils/secureApi');

const mockSecureGet = secureGet as any;
const mockSecurePost = securePost as any;
const mockSecureDelete = secureDelete as any;

describe('summaryApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getHistory', () => {
    it('should return empty array when response.data is undefined', async () => {
      mockSecureGet.mockResolvedValue({
        success: true,
        data: undefined, // This should not cause a crash
        timestamp: new Date().toISOString()
      });

      const result = await summaryApi.getHistory();
      expect(result).toEqual([]);
    });

    it('should return empty array when response.data is null', async () => {
      mockSecureGet.mockResolvedValue({
        success: true,
        data: null, // This should not cause a crash
        timestamp: new Date().toISOString()
      });

      const result = await summaryApi.getHistory();
      expect(result).toEqual([]);
    });

    it('should return empty array when response.data is not an array', async () => {
      mockSecureGet.mockResolvedValue({
        success: true,
        data: 'not an array', // This should not cause a crash
        timestamp: new Date().toISOString()
      });

      const result = await summaryApi.getHistory();
      expect(result).toEqual([]);
    });

    it('should transform server items to client format for a valid array', async () => {
      const timestamp = new Date().toISOString();
      // Server format uses 'content'; client format uses 'originalText' + 'userId'.
      const serverData = [
        {
          id: '1',
          prompt: 'Test prompt',
          content: 'Test content',
          summary: 'Test summary',
          model: 'test-model',
          provider: 'ollama',
          tokens: 100,
          timestamp
        }
      ];

      mockSecureGet.mockResolvedValue({
        success: true,
        data: serverData,
        timestamp
      });

      const result = await summaryApi.getHistory();
      expect(result).toEqual([
        {
          id: '1',
          prompt: 'Test prompt',
          originalText: 'Test content',
          summary: 'Test summary',
          model: 'test-model',
          tokens: 100,
          timestamp,
          userId: 'local-user'
        }
      ]);
    });

    it('should propagate the error when the API call fails', async () => {
      mockSecureGet.mockRejectedValue(new Error('Network error'));

      // getHistory does not swallow request failures — it propagates them so the
      // useSummaryHistory hook can fall back to localStorage.
      await expect(summaryApi.getHistory()).rejects.toThrow('Network error');
    });
  });

  describe('getById', () => {
    it('should throw error when response.data is undefined', async () => {
      mockSecureGet.mockResolvedValue({
        success: true,
        data: undefined,
        timestamp: new Date().toISOString()
      });

      await expect(summaryApi.getById('test-id')).rejects.toThrow('Summary not found');
    });

    it('should return data when response.data is valid', async () => {
      const mockData = {
        id: '1',
        prompt: 'Test prompt',
        originalText: 'Test content',
        summary: 'Test summary',
        model: 'test-model',
        tokens: 100,
        timestamp: new Date().toISOString()
      };

      mockSecureGet.mockResolvedValue({
        success: true,
        data: mockData,
        timestamp: new Date().toISOString()
      });

      const result = await summaryApi.getById('1');
      expect(result).toEqual(mockData);
    });
  });

  describe('delete', () => {
    it('should return default success false when response.data is undefined', async () => {
      mockSecureDelete.mockResolvedValue({
        success: true,
        data: undefined,
        timestamp: new Date().toISOString()
      });

      const result = await summaryApi.delete('test-id');
      expect(result).toEqual({ success: false });
    });

    it('should return response.data when it exists', async () => {
      const mockData = { success: true };

      mockSecureDelete.mockResolvedValue({
        success: true,
        data: mockData,
        timestamp: new Date().toISOString()
      });

      const result = await summaryApi.delete('test-id');
      expect(result).toEqual(mockData);
    });
  });

  describe('generate', () => {
    it('should throw error when response.data is undefined', async () => {
      mockSecurePost.mockResolvedValue({
        success: true,
        data: undefined,
        timestamp: new Date().toISOString()
      });

      await expect(summaryApi.generate({
        prompt: 'test',
        content: 'test',
        model: 'test-model',
        provider: 'ollama'
      })).rejects.toThrow('No data received from server');
    });

    it('should throw error when response.success is false', async () => {
      mockSecurePost.mockResolvedValue({
        success: false,
        error: 'Test error',
        timestamp: new Date().toISOString()
      });

      await expect(summaryApi.generate({
        prompt: 'test',
        content: 'test',
        model: 'test-model',
        provider: 'ollama'
      })).rejects.toThrow('Test error');
    });

    it('should return data when response is valid', async () => {
      const mockData = { summary: 'Test summary', tokens: 100 };

      mockSecurePost.mockResolvedValue({
        success: true,
        data: mockData,
        timestamp: new Date().toISOString()
      });

      const result = await summaryApi.generate({
        prompt: 'test',
        content: 'test',
        model: 'test-model',
        provider: 'ollama'
      });

      expect(result).toEqual(mockData);
    });
  });
});