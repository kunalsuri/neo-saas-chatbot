/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { Language, TranslationHistoryItem } from '../types';
import { SUPPORTED_LANGUAGES } from './constants';

/**
 * Find language by code
 */
export function findLanguage(code: string): Language | undefined {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code);
}

/**
 * Get language display name with flag
 */
export function getLanguageDisplay(code: string): string {
  const language = findLanguage(code);
  return language ? `${language.flag} ${language.name}` : code;
}

/**
 * Check if language is RTL
 */
export function isRTLLanguage(code: string): boolean {
  const language = findLanguage(code);
  return language?.rtl ?? false;
}

/**
 * Validate translation text
 */
export function validateTranslationText(text: string): { isValid: boolean; error?: string } {
  if (!text.trim()) {
    return { isValid: false, error: 'Text cannot be empty' };
  }
  
  if (text.length > 10000) {
    return { isValid: false, error: 'Text is too long (max 10,000 characters)' };
  }
  
  return { isValid: true };
}

/**
 * Format token count
 */
export function formatTokenCount(tokens: number): string {
  if (tokens < 1000) {
    return `${tokens} tokens`;
  }
  return `${(tokens / 1000).toFixed(1)}k tokens`;
}

/**
 * Calculate reading time estimate
 */
export function estimateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  if (minutes < 1) {
    return '< 1 min read';
  }
  
  return `${minutes} min read`;
}

/**
 * Generate search keywords for translation history
 */
export function generateSearchKeywords(item: TranslationHistoryItem): string {
  return [
    item.original,
    item.translated,
    findLanguage(item.sourceLang)?.name,
    findLanguage(item.targetLang)?.name,
    item.model,
  ].filter(Boolean).join(' ').toLowerCase();
}

/**
 * Sort translations by relevance and recency
 */
export function sortTranslations(
  translations: TranslationHistoryItem[],
  searchQuery?: string
): TranslationHistoryItem[] {
  if (!searchQuery) {
    return [...translations].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }
  
  const query = searchQuery.toLowerCase();
  
  return [...translations]
    .filter(item => generateSearchKeywords(item).includes(query))
    .sort((a, b) => {
      // Prioritize exact matches in original or translated text
      const aExactMatch = a.original.toLowerCase().includes(query) || 
                         a.translated.toLowerCase().includes(query);
      const bExactMatch = b.original.toLowerCase().includes(query) || 
                         b.translated.toLowerCase().includes(query);
      
      if (aExactMatch && !bExactMatch) return -1;
      if (!aExactMatch && bExactMatch) return 1;
      
      // Then sort by recency
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
}

/**
 * Detect potential language from text (basic heuristics)
 */
export function detectPotentialLanguage(text: string): string | null {
  // Basic character-based detection
  const hasArabic = /[\u0600-\u06FF]/.test(text);
  const hasChinese = /[\u4e00-\u9fff]/.test(text);
  const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF]/.test(text);
  const hasKorean = /[\uAC00-\uD7AF]/.test(text);
  const hasHebrew = /[\u0590-\u05FF]/.test(text);
  const hasCyrillic = /[\u0400-\u04FF]/.test(text);
  
  if (hasArabic) return 'ar';
  if (hasChinese) return 'zh';
  if (hasJapanese) return 'ja';
  if (hasKorean) return 'ko';
  if (hasHebrew) return 'he';
  if (hasCyrillic) return 'ru';
  
  // Default to English for Latin script
  return 'en';
}

/**
 * Truncate text for display
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Copy text to clipboard with fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    
    // Using document.execCommand which is deprecated but widely supported
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    return successful;
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
}