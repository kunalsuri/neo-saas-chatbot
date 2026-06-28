/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { PromptMode, OutputFormat } from '../types';

// Prompt Improvement Modes
export const PROMPT_MODES: Array<{
  value: PromptMode;
  label: string;
  description: string;
  icon: string;
}> = [
  {
    value: 'enhancement',
    label: 'Enhancement',
    description: 'Improve clarity, detail, and effectiveness',
    icon: '✨',
  },
  {
    value: 'optimization',
    label: 'Optimization',
    description: 'Reduce tokens while maintaining quality',
    icon: '⚡',
  },
  {
    value: 'structure',
    label: 'Structure',
    description: 'Organize with clear sections and steps',
    icon: '📋',
  },
  {
    value: 'clarity',
    label: 'Clarity',
    description: 'Simplify language and remove ambiguity',
    icon: '🎯',
  },
];

// Output Formats
export const OUTPUT_FORMATS: Array<{
  value: OutputFormat;
  label: string;
  description: string;
  icon: string;
}> = [
  {
    value: 'text',
    label: 'Plain Text',
    description: 'Simple, readable text format',
    icon: '📝',
  },
  {
    value: 'markdown',
    label: 'Markdown',
    description: 'Structured format with headers and lists',
    icon: '📄',
  },
  {
    value: 'structured',
    label: 'Structured',
    description: 'Professional template with sections',
    icon: '🏗️',
  },
];

// AI Providers
export const AI_PROVIDERS = [
  {
    value: 'ollama' as const,
    label: 'Ollama',
    description: 'Local Ollama models',
    icon: '🦙',
  },
  {
    value: 'lmstudio' as const,
    label: 'LM Studio',
    description: 'LM Studio local models',
    icon: '🏠',
  },
];

// Common prompt templates for quick start
export const PROMPT_TEMPLATES = [
  {
    category: 'coding',
    name: 'Code Review Request',
    template: 'Please review this code for best practices, potential bugs, and improvements:\n\n[Insert your code here]',
  },
  {
    category: 'coding',
    name: 'Feature Implementation',
    template: 'Implement a new feature that:\n- [Requirement 1]\n- [Requirement 2]\n- [Requirement 3]\n\nTechnical requirements:\n[Insert details]',
  },
  {
    category: 'writing',
    name: 'Content Creation',
    template: 'Create engaging content about [topic] that:\n- Is informative and accurate\n- Appeals to [target audience]\n- Includes actionable insights',
  },
  {
    category: 'analysis',
    name: 'Data Analysis',
    template: 'Analyze the provided data and:\n1. Identify key patterns and trends\n2. Highlight significant insights\n3. Provide actionable recommendations\n\nData: [Insert data or description]',
  },
  {
    category: 'creative',
    name: 'Creative Brief',
    template: 'Create a creative concept for [project] that:\n- Aligns with brand values\n- Engages the target audience\n- Achieves [specific goal]\n\nConstraints: [List any limitations]',
  },
];

// Error Messages
export const ERROR_MESSAGES = {
  noModel: 'No AI model is currently available. Please check your local AI service.',
  serverOffline: 'AI service is offline. Please ensure your local AI server is running.',
  emptyPrompt: 'Please enter a prompt to improve.',
  improvementFailed: 'Failed to improve prompt. Please try again.',
  historyLoadFailed: 'Failed to load prompt history.',
  historySaveFailed: 'Failed to save to history.',
  networkError: 'Network error. Please check your connection.',
  invalidInput: 'Invalid input. Please check your prompt and try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  promptImproved: 'Prompt improved successfully!',
  savedToHistory: 'Saved to history',
  bookmarkAdded: 'Added to bookmarks',
  bookmarkRemoved: 'Removed from bookmarks',
  historyCleared: 'History cleared',
  copiedToClipboard: 'Copied to clipboard',
} as const;

// Default Configuration
export const DEFAULT_CONFIG = {
  provider: 'ollama' as const,
  model: 'llama3.2',
  mode: 'enhancement' as const,
  outputFormat: 'text' as const,
  autoSave: true,
  preserveContext: true,
};

// Limits and Constraints
export const LIMITS = {
  maxPromptLength: 10000,
  minPromptLength: 10,
  maxHistoryItems: 1000,
  maxSearchResults: 50,
  defaultPageSize: 20,
  maxRetries: 3,
  retryDelay: 1000,
  healthCheckInterval: 30000,
  autoSaveDelay: 2000,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  config: 'prompt-local-config',
  lastUsedModel: 'prompt-local-last-model',
  history: 'prompt-local-history',
  bookmarks: 'prompt-local-bookmarks',
  preferences: 'prompt-local-preferences',
} as const;

// Animation Variants for Framer Motion
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
} as const;

// Keyboard Shortcuts
export const KEYBOARD_SHORTCUTS = {
  improve: 'Ctrl+Enter',
  clear: 'Ctrl+Shift+K',
  save: 'Ctrl+S',
  copy: 'Ctrl+C',
  newPrompt: 'Ctrl+N',
  focusSearch: 'Ctrl+F',
} as const;

// Confidence Thresholds
export const CONFIDENCE_THRESHOLDS = {
  high: 0.8,
  medium: 0.6,
  low: 0.4,
} as const;

// Color Schemes for Different Modes
export const MODE_COLORS = {
  enhancement: 'from-blue-500 to-purple-600',
  optimization: 'from-green-500 to-teal-600',
  structure: 'from-orange-500 to-red-600',
  clarity: 'from-indigo-500 to-blue-600',
} as const;

// Default Empty States
export const EMPTY_STATES = {
  noHistory: {
    title: 'No prompts improved yet',
    description: 'Start by entering a prompt above to see your improvement history here.',
    icon: '📝',
  },
  noResults: {
    title: 'No results found',
    description: 'Try adjusting your search terms or filters.',
    icon: '🔍',
  },
  serverOffline: {
    title: 'AI service offline',
    description: 'Please start your local AI server to begin improving prompts.',
    icon: '🔌',
  },
} as const;