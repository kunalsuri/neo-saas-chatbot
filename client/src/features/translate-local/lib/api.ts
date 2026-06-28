/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { secureGet, securePost, secureDelete } from "@/features/auth/utils/secureApi";
import { TranslationRequest, TranslationResponse, TranslationHistoryItem, AIProvider } from '../types';

export class TranslationService {
  /**
   * Translate text using the specified provider and model
   */
  async translate(
    request: TranslationRequest,
    provider: AIProvider = 'ollama',
    _signal?: AbortSignal
  ): Promise<TranslationResponse> {
    const endpoint = provider === 'ollama' ? '/api/translate' : '/api/lmstudio/translate';
    
    // Validate request before sending
    if (!request.model) {
      throw new Error('Model is required for translation');
    }
    
    console.warn(`Sending translation request with model: ${request.model} to endpoint: ${endpoint}`);
    
    const response = await securePost(endpoint, {
      text: request.text,
      targetLang: request.targetLang,
      sourceLang: request.sourceLang,
      model: request.model,
      isCasual: request.isCasual,
      maxTokens: request.maxTokens,
    });

    // Handle different response formats
    const data = response.data || response;
    return {
      translation: data.translation || '',
      tokens: data.tokens || 0,
      confidence: data.confidence,
      detectedLanguage: data.detectedLanguage,
    };
  }

  /**
   * Get translation history with pagination and filtering
   */
  async getHistory(options?: {
    page?: number;
    limit?: number;
    search?: string;
    sourceLang?: string;
    targetLang?: string;
  }): Promise<{
    items: TranslationHistoryItem[];
    total: number;
    hasMore: boolean;
  }> {
    const params = new URLSearchParams();
    
    if (options?.page) params.append('page', options.page.toString());
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.search) params.append('search', options.search);
    if (options?.sourceLang) params.append('sourceLang', options.sourceLang);
    if (options?.targetLang) params.append('targetLang', options.targetLang);

    const queryString = params.toString();
    const endpoint = queryString 
      ? `/api/translate/history?${queryString}` 
      : '/api/translate/history';
    
    const response = await secureGet<TranslationHistoryItem[] | {
      items: TranslationHistoryItem[];
      total: number;
      hasMore: boolean;
    }>(endpoint);

    // Handle different response formats
    if (Array.isArray(response.data)) {
      return {
        items: response.data,
        total: response.data.length,
        hasMore: false,
      };
    }

    return response.data!;
  }

  /**
   * Get a specific translation by ID
   */
  async getById(id: string): Promise<TranslationHistoryItem> {
    const response = await secureGet<TranslationHistoryItem>(`/api/translate/history/${id}`);
    return response.data!;
  }

  /**
   * Save translation to history
   */
  async saveToHistory(
    translation: Omit<TranslationHistoryItem, 'id' | 'timestamp'>
  ): Promise<TranslationHistoryItem> {
    const response = await securePost<TranslationHistoryItem>("/api/translate/history", translation);
    return response.data!;
  }

  /**
   * Delete translation from history
   */
  async deleteFromHistory(id: string): Promise<{ success: boolean }> {
    const response = await secureDelete<{ success: boolean }>(`/api/translate/history/${id}`);
    return response.data!;
  }

  /**
   * Bulk delete translations
   */
  async bulkDeleteFromHistory(ids: string[]): Promise<{ success: boolean; deleted: number }> {
    const response = await securePost<{ success: boolean; deleted: number }>(
      "/api/translate/history/bulk-delete", 
      { ids }
    );
    return response.data!;
  }

  /**
   * Toggle bookmark status
   */
  async toggleBookmark(id: string): Promise<TranslationHistoryItem> {
    const response = await securePost<TranslationHistoryItem>(
      `/api/translate/history/${id}/bookmark`, 
      {}
    );
    return response.data!;
  }

  /**
   * Get translation statistics
   */
  async getStats(): Promise<{
    totalTranslations: number;
    totalTokens: number;
    languagePairs: Array<{
      sourceLang: string;
      targetLang: string;
      count: number;
    }>;
    topModels: Array<{
      model: string;
      count: number;
    }>;
  }> {
    const response = await secureGet<{
      totalTranslations: number;
      totalTokens: number;
      languagePairs: Array<{
        sourceLang: string;
        targetLang: string;
        count: number;
      }>;
      topModels: Array<{
        model: string;
        count: number;
      }>;
    }>("/api/translate/stats");
    
    return response.data!;
  }
}

// Singleton instance
export const translationService = new TranslationService();