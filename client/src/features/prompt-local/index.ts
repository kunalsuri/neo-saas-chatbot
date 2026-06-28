/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

// Main component
export { default } from './components/PromptLocalPage';

// Components
export { ModesSelector, CompactModesSelector } from './components/ModesSelector';
export { PromptInterface } from './components/PromptInterface';
export { PromptHistory } from './components/PromptHistory';

// Hooks
export { usePrompt, usePromptWithAutoSave } from './hooks/usePrompt';
export { usePromptHistory, usePromptHistoryWithFilters } from './hooks/usePromptHistory';
export { usePromptConfig, usePromptConfigWithUtils } from './hooks/usePromptConfig';

// Types
export type {
  AIProvider,
  PromptMode,
  OutputFormat,
  ServerHealth,
  PromptConfig,
  PromptRequest,
  PromptResponse,
  PromptHistoryItem,
  MutablePromptHistoryItem,
  PromptState,
  UsePromptReturn,
  UsePromptHistoryReturn,
  UsePromptConfigReturn,
  PromptInterfaceProps,
  PromptHistoryProps,
  ModesSelectorProps,
} from './types';

// Constants
export {
  PROMPT_MODES,
  OUTPUT_FORMATS,
  AI_PROVIDERS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  DEFAULT_CONFIG,
  LIMITS,
  KEYBOARD_SHORTCUTS,
} from './lib/constants';

// Utils
export {
  validatePromptText,
  estimateTokens,
  estimateReadingTime,
  formatTokenCount,
  truncateText,
  generateSearchKeywords,
  sortHistory,
  filterHistory,
  searchHistory,
  getModeDescription,
  getFormatDescription,
  getConfidenceLevel,
  getConfidenceColor,
  calculateImprovementMetrics,
  copyToClipboard,
  formatRelativeTime,
  formatDateTime,
} from './lib/utils';

// API
export { promptLocalApi, PromptLocalApiClient, apiClient } from './lib/api';