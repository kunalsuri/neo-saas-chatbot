/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

// AI Providers
export type AIProvider = 'ollama' | 'lmstudio';

// Prompt Improvement Mode
export type PromptMode = 'enhancement' | 'optimization' | 'structure' | 'clarity';
export type OutputFormat = 'text' | 'markdown' | 'structured';

// Server Health
export interface ServerHealth {
  isOnline: boolean;
  responseTime?: number;
  lastChecked: string;
  error?: string;
}

// Prompt Improvement Configuration
export interface PromptConfig {
  provider: AIProvider;
  model: string;
  mode: PromptMode;
  outputFormat: OutputFormat;
  autoSave: boolean;
  preserveContext: boolean;
}

// Prompt Improvement Request
export interface PromptRequest {
  original: string;
  provider: AIProvider;
  model: string;
  mode: PromptMode;
  outputFormat: OutputFormat;
  userId: string;
}

// Prompt Improvement Response
export interface PromptResponse {
  improved: string;
  tokens: number;
  confidence?: number;
  suggestions?: string[];
  metadata?: {
    originalLength: number;
    improvedLength: number;
    improvementRatio: number;
  };
}

// History Item (Base)
export interface PromptHistoryItem {
  readonly id: string;
  readonly original: string;
  readonly improved: string;
  readonly model: string;
  readonly provider: AIProvider;
  readonly mode: PromptMode;
  readonly outputFormat: OutputFormat;
  readonly tokens: number;
  readonly confidence?: number;
  readonly timestamp: string;
  readonly userId: string;
  readonly isBookmarked?: boolean;
  readonly tags?: string[];
}

// Mutable version for internal use
export interface MutablePromptHistoryItem extends Omit<PromptHistoryItem, 'isBookmarked'> {
  isBookmarked: boolean;
}

// State Management
export interface PromptState {
  isImproving: boolean;
  serverHealth: ServerHealth;
  config: PromptConfig;
  availableModels: string[];
  error?: string;
}

// Hook Return Types
export interface UsePromptReturn {
  improve: (request: Omit<PromptRequest, 'userId'>) => Promise<void>;
  cancel: () => void;
  isImproving: boolean;
  improved: string | null;
  tokens: number | null;
  confidence: number | null;
  error: string | null;
}

export interface UsePromptHistoryReturn {
  history: PromptHistoryItem[];
  isLoading: boolean;
  error: string | null;
  addToHistory: (item: Omit<PromptHistoryItem, 'id' | 'timestamp'>) => Promise<void>;
  removeFromHistory: (id: string) => Promise<void>;
  toggleBookmark: (id: string) => Promise<void>;
  clearHistory: () => Promise<void>;
  searchHistory: (query: string) => PromptHistoryItem[];
  getHistoryById: (id: string) => PromptHistoryItem | null;
}

export interface UsePromptConfigReturn {
  config: PromptConfig;
  serverHealth: ServerHealth;
  availableModels: string[];
  isHealthChecking: boolean;
  setProvider: (provider: AIProvider) => void;
  setModel: (model: string) => void;
  setMode: (mode: PromptMode) => void;
  setOutputFormat: (format: OutputFormat) => void;
  toggleAutoSave: () => void;
  togglePreserveContext: () => void;
  checkServerHealth: () => Promise<void>;
  isServerOnline: boolean;
  hasAvailableModels: boolean;
}

// Utility Types
export type PromptHistoryFilter = 'all' | 'bookmarked' | 'recent' | 'high-confidence';
export type PromptHistorySort = 'timestamp' | 'confidence' | 'tokens' | 'alphabetical';

// Validation
export interface PromptValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

// API Types
export interface PromptApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

// Component Props
export interface PromptInterfaceProps {
  originalPrompt: string;
  improvedPrompt: string;
  onOriginalChange: (text: string) => void;
  onImprove: () => void;
  onClear: () => void;
  isImproving: boolean;
  disabled?: boolean;
  tokens?: number;
  confidence?: number;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}

export interface PromptHistoryProps {
  history: PromptHistoryItem[];
  isLoading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelect: (item: PromptHistoryItem) => void;
  onDelete: (id: string) => Promise<void>;
  onToggleBookmark: (id: string) => Promise<void>;
  selectedItem?: PromptHistoryItem | null;
  filter?: PromptHistoryFilter;
  onFilterChange?: (filter: PromptHistoryFilter) => void;
}

export interface ModesSelectorProps {
  mode: PromptMode;
  outputFormat: OutputFormat;
  onModeChange: (mode: PromptMode) => void;
  onFormatChange: (format: OutputFormat) => void;
  disabled?: boolean;
}