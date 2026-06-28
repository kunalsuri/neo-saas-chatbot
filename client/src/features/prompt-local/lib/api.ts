/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { secureGet, securePost, secureDelete } from "@/features/auth/utils/secureApi";
import { PromptHistoryItem, PromptRequest, PromptResponse } from '../types';

// API Endpoints
const ENDPOINTS = {
  improve: '/api/prompt-improver/improve',
  history: '/api/prompt-improver/history',
  historyById: (id: string) => `/api/prompt-improver/history/${id}`,
} as const;

// API Client
export const promptLocalApi = {
  // Improve a prompt
  improve: async (params: {
    prompt: string;
    model: string;
    mode?: string;
    outputMode?: 'text' | 'markdown';
  }): Promise<{ improved: string; tokens: number }> => {
    const response = await securePost<{
      originalPrompt: string;
      improvedPrompt: string;
      metadata: { model: string; style: string };
    }>(ENDPOINTS.improve, params);

    if (!response.success) {
      throw new Error(response.error || 'Failed to improve prompt');
    }
    if (!response.data) {
      throw new Error('No data received from server');
    }
    
    // Transform server response to expected format
    return {
      improved: response.data.improvedPrompt,
      tokens: Math.ceil(response.data.improvedPrompt.length / 4) // Rough token estimate
    };
  },

  // Get prompt history
  getHistory: async (): Promise<PromptHistoryItem[]> => {
    const response = await secureGet<PromptHistoryItem[]>(ENDPOINTS.history);
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch history');
    }
    return response.data || [];
  },

  // Get specific prompt by ID
  getById: async (id: string): Promise<PromptHistoryItem> => {
    const response = await secureGet<PromptHistoryItem>(ENDPOINTS.historyById(id));
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch prompt');
    }
    if (!response.data) {
      throw new Error('Prompt not found');
    }
    return response.data;
  },

  // Save prompt to history
  save: async (data: Omit<PromptHistoryItem, 'id' | 'timestamp'>): Promise<PromptHistoryItem> => {
    const response = await securePost<PromptHistoryItem>(ENDPOINTS.history, data);
    if (!response.success) {
      throw new Error(response.error || 'Failed to save prompt improvement');
    }
    if (!response.data) {
      throw new Error('No data received from server');
    }
    return response.data;
  },

  // Delete prompt from history
  delete: async (id: string): Promise<{ success: boolean }> => {
    const response = await secureDelete<{ success: boolean }>(ENDPOINTS.historyById(id));
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete prompt');
    }
    return response.data || { success: true };
  },

  // Toggle bookmark status
  toggleBookmark: async (id: string): Promise<PromptHistoryItem> => {
    const response = await securePost<PromptHistoryItem>(`/api/prompt-improver/history/${id}/bookmark`, {});
    if (!response.success) {
      throw new Error(response.error || 'Failed to toggle bookmark');
    }
    if (!response.data) {
      throw new Error('No data received from server');
    }
    return response.data;
  },
};

// Enhanced API client with better error handling and retry logic
export class PromptLocalApiClient {
  private readonly maxRetries = 3;
  private readonly retryDelay = 1000;

  async improvePrompt(
    request: Omit<PromptRequest, 'userId'>
  ): Promise<PromptResponse> {
    return this.withRetry(async () => {
      const response = await promptLocalApi.improve({
        prompt: request.original,
        model: request.model,
        mode: request.mode,
        outputMode: request.outputFormat === 'markdown' ? 'markdown' : 'text',
      });

      return {
        improved: response.improved,
        tokens: response.tokens,
        confidence: this.calculateConfidence(request.original, response.improved),
        metadata: this.calculateMetrics(request.original, response.improved),
      };
    });
  }

  async getHistory(): Promise<PromptHistoryItem[]> {
    return this.withRetry(() => promptLocalApi.getHistory());
  }

  async saveToHistory(
    item: Omit<PromptHistoryItem, 'id' | 'timestamp'>
  ): Promise<PromptHistoryItem> {
    return this.withRetry(() => promptLocalApi.save(item));
  }

  async deleteFromHistory(id: string): Promise<void> {
    await this.withRetry(() => promptLocalApi.delete(id));
  }

  async toggleBookmark(id: string): Promise<PromptHistoryItem> {
    return this.withRetry(() => promptLocalApi.toggleBookmark(id));
  }

  private async withRetry<T>(operation: () => Promise<T>): Promise<T> {
    let lastError = new Error('Operation failed after retries');
    
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        // Don't retry on authentication errors
        if (lastError.message.includes('authentication') || 
            lastError.message.includes('unauthorized')) {
          throw lastError;
        }
        
        // Wait before retrying
        if (attempt < this.maxRetries - 1) {
          await this.delay(this.retryDelay * Math.pow(2, attempt));
        }
      }
    }
    
    throw lastError;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private calculateConfidence(original: string, improved: string): number {
    // Simple confidence calculation based on improvement ratio
    const lengthRatio = improved.length / original.length;
    const hasStructure = improved.includes('\n') || improved.includes('##') || improved.includes('**');
    const hasSpecificTerms = /\b(implement|create|analyze|specific|detailed)\b/i.test(improved);
    
    let confidence = 0.5; // Base confidence
    
    // Penalize too short improvements
    if (lengthRatio < 0.8) confidence -= 0.2;
    // Reward reasonable expansion
    if (lengthRatio > 1.2 && lengthRatio < 3) confidence += 0.2;
    // Reward structure
    if (hasStructure) confidence += 0.15;
    // Reward specific language
    if (hasSpecificTerms) confidence += 0.15;
    
    return Math.max(0, Math.min(1, confidence));
  }

  private calculateMetrics(original: string, improved: string) {
    const originalLength = original.length;
    const improvedLength = improved.length;
    const improvementRatio = improvedLength / originalLength;

    return {
      originalLength,
      improvedLength,
      improvementRatio,
    };
  }
}

// Default instance
export const apiClient = new PromptLocalApiClient();