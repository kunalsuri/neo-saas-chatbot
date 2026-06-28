/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

// Main component
export { default } from './components/TranslateLocalPage';

// Components
export { LanguageSelector, LanguagePairSelector } from './components/LanguageSelector';
export { TranslationInterface } from './components/TranslationInterface';
export { TranslationHistory } from './components/TranslationHistory';

// Hooks
export { useTranslation } from './hooks/useTranslation';
export { useTranslationHistory } from './hooks/useTranslationHistory';
export { useTranslationConfig } from './hooks/useTranslationConfig';

// Types
export type {
  Language,
  TranslationRequest,
  TranslationResponse,
  TranslationHistoryItem,
  MutableTranslationHistoryItem,
  AIProvider,
  TranslationMode,
  ServerHealth,
  TranslationConfig,
  TranslationState,
} from './types';

// Utils
export {
  findLanguage,
  getLanguageDisplay,
  isRTLLanguage,
  validateTranslationText,
  formatTokenCount,
  estimateReadingTime,
  generateSearchKeywords,
  sortTranslations,
  detectPotentialLanguage,
  truncateText,
  copyToClipboard,
} from './lib/utils';

// Constants
export {
  SUPPORTED_LANGUAGES,
  DEFAULT_CONFIG,
  UI_CONSTANTS,
  KEYBOARD_SHORTCUTS,
  ERROR_MESSAGES,
} from './lib/constants';

// API
export { translationService } from './lib/api';