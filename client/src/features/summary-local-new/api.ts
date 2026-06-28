/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { secureGet, securePost, secureDelete } from "@/features/auth/utils/secureApi";
import { SummaryHistoryItem } from './types';

export const summaryApi = {
  getHistory: async (): Promise<SummaryHistoryItem[]> => {
    interface ServerSummaryItem {
      id: string;
      prompt: string;
      content: string; // Server uses 'content'
      summary: string;
      model: string;
      provider: string;
      timestamp: string;
      tokens: number;
    }
    
    const response = await secureGet<ServerSummaryItem[]>('/api/summary/history');
    
    // Ensure we always return an array, even if response.data is undefined
    if (!Array.isArray(response.data)) {
      return [];
    }
    
    // Transform server format to client format
    return response.data.map((serverItem): SummaryHistoryItem => ({
      id: serverItem.id,
      prompt: serverItem.prompt,
      originalText: serverItem.content, // Transform 'content' to 'originalText'
      summary: serverItem.summary,
      model: serverItem.model,
      tokens: serverItem.tokens || 0,
      timestamp: serverItem.timestamp,
      userId: 'local-user' // Default value
    }));
  },

  getById: async (id: string): Promise<SummaryHistoryItem> => {
    const response = await secureGet<SummaryHistoryItem>(`/api/summary/history/${id}`);
    if (!response.data) {
      throw new Error('Summary not found');
    }
    return response.data;
  },

  save: async (data: Omit<SummaryHistoryItem, 'id' | 'timestamp'>): Promise<SummaryHistoryItem> => {
    const response = await securePost<SummaryHistoryItem>('/api/summary/history', data);
    if (!response.success) {
      throw new Error(response.error || 'Failed to save summary');
    }
    if (!response.data) {
      throw new Error('No data received from server');
    }
    return response.data;
  },

  // Add a new method to save with complete server data
  saveWithFullData: async (params: {
    prompt: string;
    content: string;
    summary: string;
    model: string;
    provider: 'ollama' | 'lmstudio';
    tokens: number;
  }): Promise<SummaryHistoryItem> => {
    interface ServerSummaryItem {
      id: string;
      prompt: string;
      content: string;
      summary: string;
      model: string;
      provider: string;
      timestamp: string;
      tokens: number;
    }
    
    const response = await securePost<ServerSummaryItem>('/api/summary/history', params);
    if (!response.success) {
      throw new Error(response.error || 'Failed to save summary');
    }
    if (!response.data) {
      throw new Error('No data received from server');
    }
    
    // Transform server response to client format
    const serverItem = response.data;
    const clientItem: SummaryHistoryItem = {
      id: serverItem.id,
      prompt: serverItem.prompt,
      originalText: serverItem.content,
      summary: serverItem.summary,
      model: serverItem.model,
      tokens: serverItem.tokens,
      timestamp: serverItem.timestamp,
      userId: 'local-user' // Default value
    };
    
    return clientItem;
  },

  delete: async (id: string): Promise<{ success: boolean }> => {
    const response = await secureDelete<{ success: boolean }>(`/api/summary/history/${id}`);
    return response.data || { success: false };
  },

  generate: async (params: {
    prompt: string;
    content: string;
    model: string;
    provider: 'ollama' | 'lmstudio';
  }): Promise<{ summary: string; tokens: number }> => {
    const response = await securePost<{ summary: string; tokens: number }>('/api/summary/generate', params);
    if (!response.success) {
      throw new Error(response.error || 'Failed to generate summary');
    }
    if (!response.data) {
      throw new Error('No data received from server');
    }
    return response.data;
  },
};