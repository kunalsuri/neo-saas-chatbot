/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

// Modern type definitions with branded types and strict validation
export interface Language {
  readonly code: string;
  readonly name: string;
  readonly flag: string;
  readonly rtl?: boolean;
}

export interface TranslationRequest {
  readonly text: string;
  readonly targetLang: string;
  readonly sourceLang: string;
  readonly model: string;
  readonly isCasual: boolean;
  readonly maxTokens?: number;
}

export interface TranslationResponse {
  readonly translation: string;
  readonly tokens?: number;
  readonly confidence?: number;
  readonly detectedLanguage?: string;
}

export interface TranslationHistoryItem {
  readonly id: string;
  readonly original: string;
  readonly translated: string;
  readonly sourceLang: string;
  readonly targetLang: string;
  readonly model: string;
  readonly tokens: number;
  readonly timestamp: string;
  readonly userId?: string;
  readonly confidence?: number;
  readonly isBookmarked?: boolean;
}

// Mutable version for creating new items
export interface MutableTranslationHistoryItem {
  id?: string;
  original: string;
  translated: string;
  sourceLang: string;
  targetLang: string;
  model: string;
  tokens: number;
  timestamp?: string;
  userId?: string;
  confidence?: number;
  isBookmarked?: boolean;
}

export type AIProvider = 'ollama' | 'lmstudio';

export type TranslationMode = 'formal' | 'casual';

export interface ServerHealth {
  readonly isOnline: boolean;
  readonly models: readonly string[];
  readonly error?: string;
  readonly lastChecked?: string;
}

export interface TranslationConfig {
  readonly provider: AIProvider;
  readonly model: string;
  readonly sourceLang: string;
  readonly targetLang: string;
  readonly mode: TranslationMode;
  readonly autoDetect: boolean;
  readonly maxTokens?: number;
}

// UI State types
export interface TranslationState {
  readonly isTranslating: boolean;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly showHistory: boolean;
  readonly selectedTranslation: TranslationHistoryItem | null;
}