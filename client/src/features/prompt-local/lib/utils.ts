/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { PromptHistoryItem, PromptValidation, PromptMode, OutputFormat } from '../types';
import { LIMITS, CONFIDENCE_THRESHOLDS } from './constants';

// Validation Functions
export function validatePromptText(text: string): PromptValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // Length validation
  if (text.length < LIMITS.minPromptLength) {
    errors.push(`Prompt must be at least ${LIMITS.minPromptLength} characters long`);
  }

  if (text.length > LIMITS.maxPromptLength) {
    errors.push(`Prompt must be less than ${LIMITS.maxPromptLength} characters`);
  }

  // Content validation
  if (text.trim().length === 0) {
    errors.push('Prompt cannot be empty');
  }

  // Quality warnings
  if (text.length < 50) {
    warnings.push('Short prompts may produce less detailed improvements');
  }

  if (text.split(' ').length < 5) {
    warnings.push('Consider adding more context for better results');
  }

  // Check for common issues
  if (text.toLowerCase().includes('improve') || text.toLowerCase().includes('enhance')) {
    suggestions.push('Try to be more specific about what kind of improvement you want');
  }

  if (!text.includes('?') && !text.includes('.') && !text.includes('!')) {
    suggestions.push('Consider adding punctuation for better structure');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    suggestions,
  };
}

// Text Processing Functions
export function estimateTokens(text: string): number {
  // Rough estimation: ~4 characters per token
  return Math.ceil(text.length / 4);
}

export function estimateReadingTime(text: string): number {
  // Average reading speed: 200 words per minute
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 200);
}

export function formatTokenCount(tokens: number): string {
  if (tokens < 1000) {
    return `${tokens} tokens`;
  }
  return `${(tokens / 1000).toFixed(1)}K tokens`;
}

export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength - 3)}...`;
}

export function generateSearchKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2)
    .slice(0, 10);
}

// History Management Functions
export function sortHistory(
  history: PromptHistoryItem[],
  sortBy: 'timestamp' | 'confidence' | 'tokens' | 'alphabetical' = 'timestamp'
): PromptHistoryItem[] {
  return [...history].sort((a, b) => {
    switch (sortBy) {
      case 'timestamp':
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      case 'confidence':
        return (b.confidence || 0) - (a.confidence || 0);
      case 'tokens':
        return b.tokens - a.tokens;
      case 'alphabetical':
        return a.original.localeCompare(b.original);
      default:
        return 0;
    }
  });
}

export function filterHistory(
  history: PromptHistoryItem[],
  filter: 'all' | 'bookmarked' | 'recent' | 'high-confidence' = 'all'
): PromptHistoryItem[] {
  switch (filter) {
    case 'bookmarked':
      return history.filter(item => item.isBookmarked);
    case 'recent': {
      // Last 7 days
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return history.filter(item => new Date(item.timestamp) > weekAgo);
    }
    case 'high-confidence':
      return history.filter(item => (item.confidence || 0) >= CONFIDENCE_THRESHOLDS.high);
    default:
      return history;
  }
}

export function searchHistory(history: PromptHistoryItem[], query: string): PromptHistoryItem[] {
  if (!query.trim()) return history;

  const searchTerm = query.toLowerCase();
  return history.filter(item => 
    item.original.toLowerCase().includes(searchTerm) ||
    item.improved.toLowerCase().includes(searchTerm) ||
    item.model.toLowerCase().includes(searchTerm) ||
    item.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

// Mode and Format Functions
export function getModeDescription(mode: PromptMode): string {
  const descriptions = {
    enhancement: 'Improve clarity, detail, and effectiveness of your prompt',
    optimization: 'Reduce token usage while maintaining prompt quality',
    structure: 'Organize your prompt with clear sections and steps',
    clarity: 'Simplify language and remove ambiguity from your prompt',
  };
  return descriptions[mode];
}

export function getFormatDescription(format: OutputFormat): string {
  const descriptions = {
    text: 'Clean, readable plain text format',
    markdown: 'Structured format with headers, lists, and formatting',
    structured: 'Professional template with clearly defined sections',
  };
  return descriptions[format];
}

// Confidence and Quality Functions
export function getConfidenceLevel(confidence: number): 'high' | 'medium' | 'low' {
  if (confidence >= CONFIDENCE_THRESHOLDS.high) return 'high';
  if (confidence >= CONFIDENCE_THRESHOLDS.medium) return 'medium';
  return 'low';
}

export function getConfidenceColor(confidence: number): string {
  const level = getConfidenceLevel(confidence);
  const colors = {
    high: 'text-green-600 dark:text-green-400',
    medium: 'text-yellow-600 dark:text-yellow-400',
    low: 'text-red-600 dark:text-red-400',
  };
  return colors[level];
}

export function calculateImprovementMetrics(original: string, improved: string) {
  const originalLength = original.length;
  const improvedLength = improved.length;
  const improvementRatio = improvedLength / originalLength;

  return {
    originalLength,
    improvedLength,
    improvementRatio,
    lengthChange: improvedLength - originalLength,
    percentageChange: ((improvedLength - originalLength) / originalLength) * 100,
  };
}

// Local Storage Functions
export function saveToLocalStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
    return defaultValue;
  }
}

export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to remove from localStorage:', error);
  }
}

// Clipboard Functions
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    } catch (fallbackError) {
      console.warn('Failed to copy to clipboard:', fallbackError);
      return false;
    }
  }
}

// Debounce Utility
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle Utility
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Date and Time Utilities
export function formatRelativeTime(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return date.toLocaleDateString();
}

export function formatDateTime(timestamp: string): string {
  return new Date(timestamp).toLocaleString();
}

// URL and Query Parameters
export function updateUrlParams(params: Record<string, string>): void {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
  });
  window.history.replaceState({}, '', url.toString());
}

export function getUrlParam(key: string): string | null {
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
}

// Error Handling
export function isNetworkError(error: unknown): boolean {
  return error instanceof Error && (
    error.message.includes('NetworkError') ||
    error.message.includes('fetch') ||
    error.message.includes('ECONNREFUSED')
  );
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
}