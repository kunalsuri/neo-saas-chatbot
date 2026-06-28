/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { 
  LocalModel, 
  ConnectionState, 
  ModelStatusType,
  ProviderType 
} from '@/shared/types/model-management';

/**
 * Utility function for merging Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format file size to human readable format
 */
export function formatFileSize(bytes: string | number | undefined): string {
  if (!bytes) return 'Unknown';
  
  const size = typeof bytes === 'string' ? parseFloat(bytes) : bytes;
  if (isNaN(size)) return bytes.toString();
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;
  let formattedSize = size;
  
  while (formattedSize >= 1024 && unitIndex < units.length - 1) {
    formattedSize /= 1024;
    unitIndex++;
  }
  
  return `${formattedSize.toFixed(1)} ${units[unitIndex]}`;
}

/**
 * Format number with locale-specific separators
 */
export function formatNumber(num: number | undefined): string {
  if (typeof num !== 'number') return 'N/A';
  return num.toLocaleString();
}

/**
 * Format date to relative time or absolute date
 */
export function formatDate(date: string | Date | undefined, options?: {
  relative?: boolean;
  includeTime?: boolean;
}): string {
  if (!date) return 'Never';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const { relative = false, includeTime = false } = options ?? {};
  
  if (relative) {
    const now = new Date();
    const diffInMs = now.getTime() - dateObj.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
  }
  
  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...(includeTime && {
      hour: '2-digit',
      minute: '2-digit'
    })
  };
  
  return dateObj.toLocaleDateString(undefined, formatOptions);
}

/**
 * Get connection state based on server status
 */
export function getConnectionState(
  connected: boolean,
  isOnline: boolean | undefined,
  isConnecting: boolean,
  error?: string
): ConnectionState {
  if (isConnecting) return 'connecting';
  if (error) return 'error';
  if (connected && isOnline) return 'connected';
  return 'disconnected';
}

/**
 * Get badge variant for model status
 */
export function getModelStatusVariant(status: ModelStatusType): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'active':
      return 'default';
    case 'loading':
      return 'secondary';
    case 'error':
      return 'destructive';
    case 'inactive':
    default:
      return 'outline';
  }
}

/**
 * Get connection status badge variant
 */
export function getConnectionStatusVariant(state: ConnectionState): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (state) {
    case 'connected':
      return 'default';
    case 'connecting':
      return 'secondary';
    case 'error':
      return 'destructive';
    case 'disconnected':
    default:
      return 'outline';
  }
}

/**
 * Calculate latency color for visual indicators
 */
export function getLatencyColor(latency: number | undefined): string {
  if (!latency) return 'text-muted-foreground';
  if (latency < 100) return 'text-green-600';
  if (latency < 500) return 'text-yellow-600';
  return 'text-red-600';
}

/**
 * Filter models by search query
 */
export function filterModels(models: readonly LocalModel[], query: string): LocalModel[] {
  if (!query.trim()) return [...models];
  
  const lowercaseQuery = query.toLowerCase();
  return models.filter(model => 
    model.name.toLowerCase().includes(lowercaseQuery) ||
    model.publisher?.toLowerCase().includes(lowercaseQuery) ||
    model.type?.toLowerCase().includes(lowercaseQuery)
  );
}

/**
 * Sort models by various criteria
 */
export function sortModels(
  models: readonly LocalModel[], 
  sortBy: 'name' | 'size' | 'modified' | 'status' = 'name',
  ascending = true
): LocalModel[] {
  const sorted = [...models].sort((a, b) => {
    let aValue: string | number | Date;
    let bValue: string | number | Date;
    
    switch (sortBy) {
      case 'size':
        aValue = parseFloat(a.size || '0');
        bValue = parseFloat(b.size || '0');
        break;
      case 'modified':
        aValue = new Date(a.modified || 0);
        bValue = new Date(b.modified || 0);
        break;
      case 'status':
        aValue = a.status.status;
        bValue = b.status.status;
        break;
      case 'name':
      default:
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
    }
    
    if (aValue < bValue) return ascending ? -1 : 1;
    if (aValue > bValue) return ascending ? 1 : -1;
    return 0;
  });
  
  return sorted;
}

/**
 * Validate provider configuration
 */
export function validateProviderConfig(
  config: { baseUrl: string; timeout: number },
  providerType: ProviderType
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate base URL
  try {
    const url = new URL(config.baseUrl);
    
    // Check protocol
    if (!['http:', 'https:'].includes(url.protocol)) {
      errors.push('Base URL must use HTTP or HTTPS protocol');
    }
    
    // Provider-specific validations
    if (providerType === 'ollama' && url.port && url.port !== '11434') {
      console.warn('Ollama typically runs on port 11434');
    }
    
    if (providerType === 'lmstudio' && url.port && url.port !== '1234') {
      console.warn('LM Studio typically runs on port 1234');
    }
  } catch {
    errors.push('Invalid base URL format');
  }
  
  // Validate timeout
  if (config.timeout < 1000) {
    errors.push('Timeout must be at least 1000ms');
  }
  
  if (config.timeout > 60000) {
    errors.push('Timeout should not exceed 60000ms');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Generate unique key for React list items
 */
export function generateModelKey(model: LocalModel, index: number): string {
  return model.id || model.digest || `${model.name}-${index}`;
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
