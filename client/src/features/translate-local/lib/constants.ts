/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { Language } from '../types';

// Enhanced language definitions with flags and RTL support
export const SUPPORTED_LANGUAGES: readonly Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', rtl: true },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'th', name: 'Thai', flag: '🇹🇭' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
  { code: 'no', name: 'Norwegian', flag: '🇳🇴' },
  { code: 'da', name: 'Danish', flag: '🇩🇰' },
  { code: 'fi', name: 'Finnish', flag: '🇫🇮' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'he', name: 'Hebrew', flag: '🇮🇱', rtl: true },
] as const;

// Default configuration
export const DEFAULT_CONFIG = {
  sourceLang: 'en',
  targetLang: 'fr',
  provider: 'ollama' as const,
  mode: 'formal' as const,
  autoDetect: false,
  maxTokens: 4000,
} as const;

// UI Constants
export const UI_CONSTANTS = {
  minTextareaHeight: 120,
  maxTextareaHeight: 300,
  historyPageSize: 20,
  debounceDelay: 300,
  animationDuration: 200,
} as const;

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  translate: 'Ctrl+Enter',
  newTranslation: 'Ctrl+N',
  swapLanguages: 'Ctrl+Shift+S',
  focusInput: 'Ctrl+/',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  noText: 'Please enter text to translate',
  serverOffline: 'Translation server is offline',
  noModel: 'No translation model available',
  translationFailed: 'Translation failed. Please try again.',
  saveHistoryFailed: 'Failed to save translation to history',
  loadHistoryFailed: 'Failed to load translation history',
  authRequired: 'Authentication required to use translation service',
} as const;